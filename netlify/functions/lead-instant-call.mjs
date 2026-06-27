/**
 * lead-instant-call.mjs
 * Netlify serverless function (Edge-compatible)
 *
 * Trigger: Facebook Lead Ads webhook (via Meta Webhooks or Pipedream relay)
 * Action:  Within 60 seconds of form submission, place an outbound AI call
 *          to the prospect via Vapi (primary) or Twilio + TwiML (fallback).
 *
 * Environment variables required:
 *   VAPI_API_KEY          — from vapi.ai dashboard
 *   VAPI_ASSISTANT_ID     — your JustBookMe outbound sales assistant ID
 *   TWILIO_ACCOUNT_SID    — fallback if Vapi unavailable
 *   TWILIO_AUTH_TOKEN
 *   TWILIO_FROM_NUMBER    — your Quebec Twilio number e.g. +15141234567
 *   TWILIO_TWIML_URL      — URL of your TwiML bin for the fallback script
 *   FB_VERIFY_TOKEN       — random secret for Meta webhook verification
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   LEAD_CALL_DELAY_SECONDS — delay before calling (default: 10)
 */

const VAPI_BASE = "https://api.vapi.ai";
const DELAY_SECONDS = parseInt(process.env.LEAD_CALL_DELAY_SECONDS ?? "10", 10);

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------
export default async function handler(req, context) {
  const url = new URL(req.url);

  // --- Meta webhook verification handshake (GET) ---
  if (req.method === "GET") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    if (mode === "subscribe" && token === process.env.FB_VERIFY_TOKEN) {
      console.log("[lead-instant-call] Webhook verified by Meta.");
      return new Response(challenge, { status: 200 });
    }
    return new Response("Forbidden", { status: 403 });
  }

  // --- Lead event payload (POST) ---
  if (req.method === "POST") {
    let body;
    try {
      body = await req.json();
    } catch {
      return new Response("Bad request", { status: 400 });
    }

    // Extract lead data from Meta webhook payload
    // Shape: { object: "page", entry: [{ changes: [{ value: { leadgen_id, page_id, form_id, field_data } }] }] }
    const leads = extractLeads(body);

    if (!leads.length) {
      return new Response(JSON.stringify({ ok: true, processed: 0 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const results = await Promise.allSettled(leads.map(processLead));
    const summary = results.map((r, i) => ({
      lead: leads[i].phone ?? leads[i].email,
      status: r.status,
      value: r.status === "fulfilled" ? r.value : r.reason?.message,
    }));

    return new Response(JSON.stringify({ ok: true, results: summary }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response("Method not allowed", { status: 405 });
}

// ---------------------------------------------------------------------------
// Extract leads from Meta webhook body
// ---------------------------------------------------------------------------
function extractLeads(body) {
  const leads = [];
  for (const entry of body?.entry ?? []) {
    for (const change of entry?.changes ?? []) {
      const val = change?.value;
      if (change?.field !== "leadgen" || !val) continue;

      const fields = {};
      for (const f of val?.field_data ?? []) {
        fields[f.name] = f.values?.[0] ?? "";
      }

      leads.push({
        leadgenId: val.leadgen_id,
        pageId: val.page_id,
        formId: val.form_id,
        firstName: fields["first_name"] ?? fields["prenom"] ?? "",
        lastName: fields["last_name"] ?? fields["nom"] ?? "",
        phone: normalizePhone(fields["phone_number"] ?? fields["telephone"] ?? ""),
        email: fields["email"] ?? "",
        businessName: fields["business_name"] ?? fields["nom_entreprise"] ?? "",
        city: fields["city"] ?? fields["ville"] ?? "",
        staffCount: fields["staff_count"] ?? fields["nombre_employes"] ?? "",
        language: fields["preferred_language"] ?? fields["langue"] ?? "fr", // default FR
        createdAt: new Date().toISOString(),
      });
    }
  }
  return leads;
}

// ---------------------------------------------------------------------------
// Process a single lead: log to Supabase, then place AI call
// ---------------------------------------------------------------------------
async function processLead(lead) {
  console.log(`[lead-instant-call] Processing lead: ${lead.firstName} ${lead.lastName} | ${lead.phone}`);

  // 1. Log to Supabase outreach_prospects table
  await logToSupabase(lead);

  // 2. Guard: no phone = can't call
  if (!lead.phone) {
    console.warn("[lead-instant-call] No phone number — skipping call, will email instead.");
    return { action: "email_only", reason: "no_phone" };
  }

  // 3. Short delay (configurable) so the lead has time to put their phone down
  await sleep(DELAY_SECONDS * 1000);

  // 4. Place outbound AI call via Vapi (preferred)
  if (process.env.VAPI_API_KEY && process.env.VAPI_ASSISTANT_ID) {
    return await callViaVapi(lead);
  }

  // 5. Fallback: Twilio + TwiML
  if (process.env.TWILIO_ACCOUNT_SID) {
    return await callViaTwilio(lead);
  }

  throw new Error("No call provider configured (VAPI_API_KEY or TWILIO_ACCOUNT_SID required).");
}

// ---------------------------------------------------------------------------
// Vapi outbound call
// ---------------------------------------------------------------------------
async function callViaVapi(lead) {
  const isFrench = lead.language?.toLowerCase().startsWith("fr");

  const payload = {
    assistantId: process.env.VAPI_ASSISTANT_ID,
    customer: {
      number: lead.phone,
      name: `${lead.firstName} ${lead.lastName}`.trim(),
    },
    // Inject lead context so the assistant can personalize the call
    assistantOverrides: {
      variableValues: {
        prospect_first_name: lead.firstName || (isFrench ? "là" : "there"),
        prospect_business: lead.businessName || (isFrench ? "votre salon" : "your business"),
        prospect_city: lead.city || "Montréal",
        call_language: isFrench ? "fr-CA" : "en-CA",
      },
      // Greeting script injected as system context
      model: {
        messages: [
          {
            role: "system",
            content: isFrench
              ? buildFrenchSystemPrompt(lead)
              : buildEnglishSystemPrompt(lead),
          },
        ],
      },
    },
    phoneNumberId: process.env.VAPI_PHONE_NUMBER_ID ?? undefined,
  };

  const resp = await fetch(`${VAPI_BASE}/call`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Vapi error ${resp.status}: ${text}`);
  }

  const data = await resp.json();
  console.log(`[lead-instant-call] Vapi call initiated. Call ID: ${data.id}`);
  return { provider: "vapi", callId: data.id };
}

// ---------------------------------------------------------------------------
// Twilio fallback outbound call
// ---------------------------------------------------------------------------
async function callViaTwilio(lead) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const url = process.env.TWILIO_TWIML_URL;

  const body = new URLSearchParams({
    To: lead.phone,
    From: from,
    Url: url,
    StatusCallback: `${process.env.NEXT_PUBLIC_SITE_URL}/api/twilio/call-status`,
    StatusCallbackMethod: "POST",
  });

  const resp = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Calls.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    }
  );

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Twilio error ${resp.status}: ${text}`);
  }

  const data = await resp.json();
  console.log(`[lead-instant-call] Twilio call initiated. SID: ${data.sid}`);
  return { provider: "twilio", callSid: data.sid };
}

// ---------------------------------------------------------------------------
// Log lead to Supabase
// ---------------------------------------------------------------------------
async function logToSupabase(lead) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return;

  try {
    const resp = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/outreach_prospects`,
      {
        method: "POST",
        headers: {
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates",
        },
        body: JSON.stringify({
          business_name: lead.businessName,
          contact_name: `${lead.firstName} ${lead.lastName}`.trim(),
          phone: lead.phone,
          email: lead.email,
          city: lead.city,
          source: "facebook_lead_ad",
          status: "contacted",
          last_contact: lead.createdAt,
          notes: `FB Lead Ad — staff: ${lead.staffCount}, lang: ${lead.language}, form: ${lead.formId}`,
        }),
      }
    );
    if (!resp.ok) {
      console.warn("[lead-instant-call] Supabase insert failed:", await resp.text());
    }
  } catch (err) {
    console.error("[lead-instant-call] Supabase error:", err);
  }
}

// ---------------------------------------------------------------------------
// AI assistant system prompts
// ---------------------------------------------------------------------------
function buildFrenchSystemPrompt(lead) {
  return `Tu es l'assistant IA de JustBookMe, un réceptionniste IA bilingue pour les salons et barbershops au Québec.
Tu appelles ${lead.firstName || "le/la propriétaire"} de ${lead.businessName || "leur entreprise"} à ${lead.city || "Montréal"}.
Ils viennent de remplir un formulaire sur notre publicité Facebook — ils sont CHAUDS comme prospect.

OBJECTIF DE L'APPEL:
1. Confirme leur intérêt en 1-2 phrases
2. Pose UNE question de qualification: "Combien d'appels tu manques par semaine environ?"
3. Propose un essai gratuit de 14 jours et offre de réserver une démo de 15 minutes
4. Si intéressé: confirme leur courriel et dis-leur qu'on leur envoie le lien de démo

STYLE: Chaleureux, québécois, informel (tu). Pas de pitch agressif. Pas plus de 2 minutes.
TRANSFERT: Si ils demandent à parler à Brandon directement, dis que tu vas lui envoyer un message et qu'il rappellera dans l'heure.`;
}

function buildEnglishSystemPrompt(lead) {
  return `You are JustBookMe's AI assistant — a bilingual AI receptionist platform for Quebec salons and barbershops.
You are calling ${lead.firstName || "the owner"} from ${lead.businessName || "their business"} in ${lead.city || "Montreal"}.
They just filled out a form on our Facebook ad — they are a HOT lead.

CALL OBJECTIVE:
1. Confirm their interest in 1-2 sentences
2. Ask ONE qualification question: "Roughly how many calls do you miss per week?"
3. Offer the free 14-day trial and propose booking a 15-minute demo
4. If interested: confirm their email and let them know you'll send the demo booking link

STYLE: Warm, conversational, Canadian casual. No hard sell. Keep it under 2 minutes.
TRANSFER: If they ask to speak with Brandon directly, let them know you'll flag it and he'll call back within the hour.`;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function normalizePhone(raw) {
  if (!raw) return "";
  // Strip everything except digits and leading +
  const digits = raw.replace(/[^\d+]/g, "");
  // Add +1 if Canadian/US number without country code
  if (digits.startsWith("1") && digits.length === 11) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  return digits.startsWith("+") ? digits : `+${digits}`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
