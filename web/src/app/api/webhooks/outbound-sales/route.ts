import { NextResponse } from "next/server";
import { createOutboundCall } from "@/lib/vapi/client";
import { getSalesPitchPrompt } from "@/lib/vapi/sales-prompt";
import { BRAND_NAME } from "@/lib/site-config";

// You can generate a random secure string for this and put it in your environment variables.
const OUTBOUND_WEBHOOK_SECRET = process.env.OUTBOUND_WEBHOOK_SECRET || "justbookme-sales-secret";

export async function POST(req: Request) {
  try {
    // 1. Authenticate the request (so people can't spam your API)
    const authHeader = req.headers.get("authorization");
    if (!authHeader || authHeader !== `Bearer ${OUTBOUND_WEBHOOK_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse the Zapier payload
    const body = await req.json();
    const { name, phone, businessName } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Missing name or phone in payload" }, { status: 400 });
    }

    const bName = businessName || "your salon";

    // 3. Construct the dynamic system prompt
    const systemPrompt = getSalesPitchPrompt(name, bName);

    // 4. Dispatch the call via Vapi
    // Note: If you don't have a default assistant ID, you can configure an inline assistant.
    const res = await createOutboundCall({
      // We assume your Vapi phone number ID is set in env vars, 
      // or we can pass a hardcoded one if you have it. You need to put VAPI_PHONE_ID in .env
      phoneNumberId: process.env.VAPI_PHONE_ID || "", 
      assistant: {
        name: "Sarah (Sales AI)",
        model: {
          provider: "openai",
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
          ],
        },
        voice: {
          provider: "11labs",
          voiceId: "cgSgspJ2msm6clMCkdW9", // Sarah voice
        },
        firstMessage: `Hi ${name}! This is Sarah, the AI receptionist from ${BRAND_NAME}. I'm calling because you just clicked on our Facebook ad for a 14-day free trial!`,
      },
      customer: {
        number: phone,
      },
    });

    if (res.error) {
      console.error("Vapi outbound call failed:", res.error);
      return NextResponse.json({ error: res.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, callId: res.data?.id });
  } catch (err: unknown) {
    console.error("Outbound sales webhook error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
