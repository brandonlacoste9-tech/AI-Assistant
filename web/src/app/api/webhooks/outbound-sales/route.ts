import { NextResponse } from "next/server";
import { createOutboundCall } from "@/lib/vapi/client";
import { getSalesPitchPrompt } from "@/lib/vapi/sales-prompt";
import { BRAND_NAME } from "@/lib/site-config";
import { getSupabaseService } from "@/lib/supabase/server";
import { outboundWebhookAuthorized } from "@/lib/outbound-webhook";

export async function POST(req: Request) {
  try {
    const secret = process.env.OUTBOUND_WEBHOOK_SECRET;
    if (!outboundWebhookAuthorized(req.headers.get("authorization"), secret)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, phone, businessName } = body as {
      name?: string;
      phone?: string;
      businessName?: string;
    };

    if (!name || !phone) {
      return NextResponse.json({ error: "Missing name or phone in payload" }, { status: 400 });
    }

    const phoneNumberId = process.env.VAPI_PHONE_NUMBER_ID?.trim() || "";
    if (!phoneNumberId) {
      return NextResponse.json(
        { error: "VAPI_PHONE_NUMBER_ID is not configured" },
        { status: 503 }
      );
    }

    const bName = businessName || "your salon";
    const db = getSupabaseService();
    if (db) {
      const { error } = await db.from("outreach_prospects").insert({
        business_name: bName,
        contact_name: name,
        phone,
        source: "outbound_sales",
        status: "contacted",
        last_contact: new Date().toISOString(),
      });
      if (error) {
        console.warn("[outbound-sales] prospect insert failed:", error.message);
      }
    }

    const systemPrompt = getSalesPitchPrompt(name, bName);
    const res = await createOutboundCall({
      phoneNumberId,
      assistant: {
        name: "Sarah (Sales AI)",
        model: {
          provider: "openai",
          model: "gpt-4o",
          messages: [{ role: "system", content: systemPrompt }],
        },
        voice: {
          provider: "11labs",
          voiceId: "cgSgspJ2msm6clMCkdW9",
        },
        firstMessage: `Hi ${name}! This is Sarah, the AI receptionist from ${BRAND_NAME}. I'm calling because you just clicked on our Facebook ad for a 7-day free trial!`,
      },
      customer: { number: phone },
    });

    if (res.error) {
      console.error("Vapi outbound call failed:", res.error);
      return NextResponse.json({ error: res.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, callId: res.data?.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Outbound sales webhook error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
