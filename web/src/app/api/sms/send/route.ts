import { getApiUser } from "@/lib/auth/api-auth";
import { sendSms } from "@/lib/twilio/client";
import { bookingConfirmationSms, bookingReminderSms } from "@/lib/twilio/templates";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const auth = await getApiUser();
  if ("error" in auth) return auth.error;
  const { supabase, businessId } = auth;

  const body = await req.json();
  const { booking_id, template = "confirmation", to } = body;

  if (!to && !booking_id) {
    return NextResponse.json({ error: "Provide booking_id or to + message flow" }, { status: 400 });
  }

  const { data: business } = await supabase
    .from("businesses")
    .select("name, default_language")
    .eq("id", businessId)
    .single();

  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  const locale = business.default_language === "en" ? "en" : "fr";
  let phone = to as string | undefined;
  let customerName = "Client";
  let startsAt = new Date();
  let serviceName: string | null = null;

  if (booking_id) {
    const { data: booking, error } = await supabase
      .from("appointments")
      .select("customer_name, starts_at, services(name), customers(phone)")
      .eq("id", booking_id)
      .eq("business_id", businessId)
      .single();

    if (error || !booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    customerName = booking.customer_name as string;
    startsAt = new Date(booking.starts_at as string);
    const svc = booking.services as { name: string } | { name: string }[] | null;
    serviceName = Array.isArray(svc) ? (svc[0]?.name ?? null) : (svc?.name ?? null);

    const cust = booking.customers as { phone: string | null } | { phone: string | null }[] | null;
    const custPhone = Array.isArray(cust) ? cust[0]?.phone : cust?.phone;
    phone = phone ?? custPhone ?? undefined;
  }

  if (!phone) {
    return NextResponse.json({ error: "No phone number for this booking" }, { status: 400 });
  }

  const normalized = phone.replace(/\D/g, "");
  const e164 =
    normalized.length === 10
      ? `+1${normalized}`
      : normalized.startsWith("1")
        ? `+${normalized}`
        : phone.startsWith("+")
          ? phone
          : `+${normalized}`;

  const smsBody =
    template === "reminder"
      ? bookingReminderSms({
          businessName: business.name,
          customerName,
          startsAt,
          serviceName,
          locale,
        })
      : bookingConfirmationSms({
          businessName: business.name,
          customerName,
          startsAt,
          serviceName,
          locale,
        });

  const result = await sendSms(e164, smsBody);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 503 });
  }

  return NextResponse.json({ ok: true, sid: result.sid, to: e164 });
}