/**
 * CalDAV/iCal subscription feed endpoint.
 * 
 * Business owners can subscribe to this URL in ANY calendar app
 * (Google Calendar, Apple Calendar, Outlook, Thunderbird, etc.)
 * to see all their JustBookMe appointments in real-time.
 * 
 * URL format: /api/calendar/feed/{token}
 * The token is a unique, unguessable per-business key.
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseService } from "@/lib/supabase/server";
import { generateIcsFeed, type IcsEventInput } from "@/lib/calendar/ics";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  if (!token || token.length < 20) {
    return new NextResponse("Invalid feed token", { status: 401 });
  }

  const supabase = getSupabaseService();
  if (!supabase) {
    return new NextResponse("Service unavailable", { status: 503 });
  }

  // Look up business by calendar feed token
  const { data: business } = await supabase
    .from("businesses")
    .select("id, name")
    .eq("calendar_feed_token", token)
    .single();

  if (!business) {
    return new NextResponse("Invalid or expired feed token", { status: 404 });
  }

  // Fetch appointments for the next 90 days and past 30 days
  const now = new Date();
  const past = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const future = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);

  const { data: appointments } = await supabase
    .from("appointments")
    .select("id, customer_name, starts_at, ends_at, status, service_id, notes")
    .eq("business_id", business.id)
    .gte("starts_at", past.toISOString())
    .lte("starts_at", future.toISOString())
    .neq("status", "cancelled")
    .order("starts_at", { ascending: true });

  // Resolve service names
  const serviceIds = [
    ...new Set(
      (appointments ?? [])
        .map((a) => a.service_id)
        .filter(Boolean) as string[]
    ),
  ];

  let serviceMap: Record<string, string> = {};
  if (serviceIds.length > 0) {
    const { data: services } = await supabase
      .from("services")
      .select("id, name")
      .in("id", serviceIds);
    serviceMap = Object.fromEntries(
      (services ?? []).map((s) => [s.id, s.name as string])
    );
  }

  // Convert to ICS events
  const events: IcsEventInput[] = (appointments ?? []).map((appt) => {
    const serviceName = appt.service_id
      ? serviceMap[appt.service_id] ?? "Appointment"
      : "Appointment";

    return {
      uid: appt.id as string,
      summary: `${serviceName} - ${appt.customer_name ?? "Client"}`,
      description: appt.notes ? String(appt.notes) : undefined,
      startsAt: new Date(appt.starts_at as string),
      endsAt: new Date(appt.ends_at as string),
      status: (appt.status === "confirmed" || appt.status === "booked")
        ? "CONFIRMED" as const
        : "TENTATIVE" as const,
    };
  });

  const calendarName = `${business.name ?? "JustBookMe"} Appointments`;
  const icsContent = generateIcsFeed(events, calendarName);

  return new NextResponse(icsContent, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `inline; filename="${business.name ?? "justbookme"}-calendar.ics"`,
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "X-WR-CALNAME": calendarName,
    },
  });
}
