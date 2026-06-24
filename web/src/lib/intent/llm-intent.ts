import { ollamaChat } from "@/lib/llm/ollama";
import type {
  BookingIntentAction,
  IntentStatus,
  SalonBookingIntent,
  SalonService,
} from "@/lib/intent/salon-intent-bridge";

const VALID_ACTIONS: BookingIntentAction[] = [
  "booking.create",
  "booking.reschedule",
  "booking.cancel",
  "transfer.human",
  "none",
];

const VALID_SERVICES: SalonService[] = [
  "coupe",
  "coloration",
  "balayage",
  "manucure",
  "pedicure",
  "soins_visage",
  "barbe",
  "autre",
];

const SYSTEM_PROMPT = `You extract booking intent from salon/barbershop customer messages in Quebec (French or English).
Respond with JSON only, no markdown:
{
  "action": "booking.create" | "booking.reschedule" | "booking.cancel" | "transfer.human" | "none",
  "service": "coupe" | "coloration" | "balayage" | "manucure" | "pedicure" | "soins_visage" | "barbe" | "autre" | null,
  "service_label": string | null,
  "start_description": string | null,
  "locale": "fr" | "en",
  "summary": string
}
Rules:
- "fade", "line-up", "skin fade", "buzz cut" → service "coupe", label "fade / coupe homme"
- If not a salon booking request, action "none"
- start_description: human-readable time like "demain à 14h" or "Friday at 2pm"
- summary: one sentence for the salon owner`;

type LlmIntentJson = {
  action?: string;
  service?: string | null;
  service_label?: string | null;
  start_description?: string | null;
  locale?: string;
  summary?: string;
};

function parseJsonResponse(raw: string): LlmIntentJson | null {
  try {
    return JSON.parse(raw) as LlmIntentJson;
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]) as LlmIntentJson;
    } catch {
      return null;
    }
  }
}

function toSalonIntent(parsed: LlmIntentJson, message: string): SalonBookingIntent | null {
  const action = VALID_ACTIONS.includes(parsed.action as BookingIntentAction)
    ? (parsed.action as BookingIntentAction)
    : "none";

  if (action === "none") return null;

  const locale = parsed.locale === "en" ? "en" : "fr";
  const service =
    parsed.service && VALID_SERVICES.includes(parsed.service as SalonService)
      ? (parsed.service as SalonService)
      : null;

  let status: IntentStatus = "needs_input";
  let confidence: "high" | "medium" | "low" = "medium";

  if (action === "transfer.human") {
    status = "executed";
    confidence = "high";
  } else if (action === "booking.create") {
    const hasService = Boolean(service);
    const hasTime = Boolean(parsed.start_description?.trim());
    if (hasService && hasTime) {
      status = "executed";
      confidence = "high";
    } else if (hasService || hasTime) {
      status = "needs_input";
      confidence = "medium";
    } else {
      status = "needs_input";
      confidence = "low";
    }
  } else {
    status = "needs_input";
    confidence = "medium";
  }

  return {
    action,
    status,
    service,
    serviceLabel: parsed.service_label?.trim() || null,
    startDescription: parsed.start_description?.trim() || null,
    startIso: null,
    locale,
    confidence,
    summary:
      parsed.summary?.trim() ||
      (locale === "fr" ? "Intention détectée par IA." : "Intent detected by AI."),
    raw: message.trim(),
  };
}

export async function parseSalonIntentWithLlm(
  message: string
): Promise<SalonBookingIntent | null> {
  const raw = message.trim();
  if (!raw) return null;

  const content = await ollamaChat(
    [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Today is ${new Date().toISOString().slice(0, 10)}. Message: "${raw}"`,
      },
    ],
    { format: "json" }
  );

  if (!content) return null;

  const parsed = parseJsonResponse(content);
  if (!parsed) return null;

  return toSalonIntent(parsed, raw);
}