import { getSupabaseService } from "@/lib/supabase/server";
import { sendSms } from "@/lib/twilio/client";
import { bookingReminderSms } from "@/lib/twilio/templates";
import { montrealDayBoundsIso } from "@/lib/vapi/timezone";
import { NextResponse } from "next/server";

function authorize(req: Request): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return process.env.NODE_ENV !== "production";
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${secret}`;
}

function tomorrowMontrealIso(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toLocaleDateString("en-CA", { timeZone: "America/Montreal" });
}

export async function GET(req: Request) {
  if (!authorize(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseService();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const date = tomorrowMontrealIso();
  const bounds = montrealDayBoundsIso(date);
  if (!bounds) {
    return NextResponse.json({ error: "Invalid date" }, { status: 500 });
  }

  const { data: appts, error } = await supabase
    .from("appointments")
    .select(
      "id, customer_name, starts_at, notes, business_id, businesses(name, default_language), customers(phone), services(name)"
    )
    .gte("starts_at", bounds.start)
    .lt("starts_at", bounds.end)
    .in("status", ["booked", "confirmed"])
    .not("notes", "ilike", "%reminder_sent%");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let sent = 0;
  let skipped = 0;

  for (const appt of appts ?? []) {
    const biz = appt.businesses as { name: string; default_language: string } | { name: string; default_language: string }[] | null;
    const business = Array.isArray(biz) ? biz[0] : biz;
    const cust = appt.customers as { phone: string | null } | { phone: string | null }[] | null;
    const phone = Array.isArray(cust) ? cust[0]?.phone : cust?.phone;
    if (!phone) {
      skipped++;
      continue;
    }

    const locale = business?.default_language === "en" ? "en" : "fr";
    const svc = appt.services as { name: string } | { name: string }[] | null;
    const serviceName = Array.isArray(svc) ? svc[0]?.name : svc?.name;

    const body = bookingReminderSms({
      businessName: business?.name ?? "JustBookMe",
      customerName: appt.customer_name as string,
      startsAt: new Date(appt.starts_at as string),
      serviceName: serviceName ?? null,
      locale,
    });

    const result = await sendSms(phone, body);
    if (result.ok) {
      sent++;
      const stamp = `reminder_sent ${new Date().toISOString()}`;
      const prev = (appt.notes as string | null) ?? "";
      await supabase
        .from("appointments")
        .update({ notes: prev ? `${prev}\n${stamp}` : stamp })
        .eq("id", appt.id as string);
    } else {
      skipped++;
    }
  }

  return NextResponse.json({ ok: true, date, sent, skipped });
}