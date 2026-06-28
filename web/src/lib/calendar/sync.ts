/**
 * Calendar Sync Orchestrator
 * 
 * Central module that handles:
 * 1. Outbound sync: Push new bookings to connected calendars (Google, Outlook, .ics)
 * 2. Inbound sync: Check external calendars for busy times during availability checks
 * 3. Cancellation sync: Remove events from connected calendars when bookings are cancelled
 * 
 * This is the single source of truth for all calendar operations.
 */

import { getSupabaseService } from "@/lib/supabase/server";
import { getGoogleCalendarEvents, isGoogleCalendarConnected } from "@/lib/google/calendar";
import { generateIcsEvent, generateIcsCancellation, type IcsEventInput } from "@/lib/calendar/ics";

export type CalendarProvider = "google" | "outlook" | "ics_only" | "none";

export type BusySlot = {
  start: string; // ISO string
  end: string;   // ISO string
  source: "internal" | "google" | "outlook";
};

export type SyncResult = {
  ok: boolean;
  provider: CalendarProvider;
  externalEventId?: string;
  icsContent?: string;
  error?: string;
};

/**
 * Determine which calendar provider a business is using.
 */
export async function getCalendarProvider(businessId: string): Promise<CalendarProvider> {
  const supabase = getSupabaseService();
  if (!supabase) return "none";

  const { data } = await supabase
    .from("businesses")
    .select("google_refresh_token, outlook_refresh_token, calendar_provider")
    .eq("id", businessId)
    .single();

  if (!data) return "none";

  // Explicit provider setting takes priority
  if (data.calendar_provider) return data.calendar_provider as CalendarProvider;

  // Auto-detect from connected tokens
  if (data.google_refresh_token) return "google";
  if (data.outlook_refresh_token) return "outlook";

  return "ics_only";
}

/**
 * Get ALL busy slots for a business on a given day, merging:
 * - Internal appointments (from Supabase)
 * - Google Calendar events (if connected)
 * - Outlook Calendar events (if connected)
 * 
 * This is the key function that prevents double-booking.
 */
export async function getAllBusySlots(
  businessId: string,
  dayStart: string,
  dayEnd: string
): Promise<BusySlot[]> {
  const busySlots: BusySlot[] = [];

  const supabase = getSupabaseService();
  if (!supabase) return busySlots;

  // 1. Internal appointments
  const { data: internalBookings } = await supabase
    .from("appointments")
    .select("starts_at, ends_at")
    .eq("business_id", businessId)
    .gte("starts_at", dayStart)
    .lt("starts_at", dayEnd)
    .neq("status", "cancelled");

  for (const booking of internalBookings ?? []) {
    busySlots.push({
      start: booking.starts_at as string,
      end: booking.ends_at as string,
      source: "internal",
    });
  }

  // 2. Google Calendar (if connected)
  const googleConnected = await isGoogleCalendarConnected(businessId);
  if (googleConnected) {
    try {
      const events = await getGoogleCalendarEvents(businessId, dayStart, dayEnd);
      for (const event of events) {
        const start = event.start.dateTime || event.start.date;
        const end = event.end.dateTime || event.end.date;
        if (start && end) {
          busySlots.push({ start, end, source: "google" });
        }
      }
    } catch (err) {
      console.error("[calendar/sync] Google Calendar fetch failed:", err);
      // Don't block booking if Google is temporarily unavailable
    }
  }

  // 3. Outlook Calendar (if connected)
  const outlookConnected = await isOutlookConnected(businessId);
  if (outlookConnected) {
    try {
      const events = await getOutlookCalendarEvents(businessId, dayStart, dayEnd);
      for (const event of events) {
        busySlots.push({ start: event.start, end: event.end, source: "outlook" });
      }
    } catch (err) {
      console.error("[calendar/sync] Outlook Calendar fetch failed:", err);
    }
  }

  return busySlots;
}

/**
 * Check if a specific time range conflicts with ANY calendar source.
 */
export function hasConflictWithBusySlots(
  busySlots: BusySlot[],
  startMs: number,
  endMs: number
): boolean {
  for (const slot of busySlots) {
    const slotStart = new Date(slot.start).getTime();
    const slotEnd = new Date(slot.end).getTime();
    // Overlap check: two intervals overlap if one starts before the other ends
    if (startMs < slotEnd && endMs > slotStart) {
      return true;
    }
  }
  return false;
}

/**
 * Push a new booking to the business's connected calendar.
 * Returns the .ics content regardless of provider (for SMS/email attachment).
 */
export async function pushBookingToCalendar(
  businessId: string,
  appointment: {
    id: string;
    customerName: string;
    serviceName: string;
    startsAt: Date;
    endsAt: Date;
    customerPhone?: string;
    customerEmail?: string;
    notes?: string;
  }
): Promise<SyncResult> {
  const provider = await getCalendarProvider(businessId);
  const supabase = getSupabaseService();

  // Get business info for the event
  const businessName = await getBusinessName(businessId);

  const icsEvent: IcsEventInput = {
    uid: appointment.id,
    summary: `${appointment.serviceName} - ${appointment.customerName}`,
    description: [
      `Customer: ${appointment.customerName}`,
      appointment.customerPhone ? `Phone: ${appointment.customerPhone}` : null,
      appointment.customerEmail ? `Email: ${appointment.customerEmail}` : null,
      appointment.notes ? `Notes: ${appointment.notes}` : null,
      `Booked via JustBookMe`,
    ]
      .filter(Boolean)
      .join("\n"),
    startsAt: appointment.startsAt,
    endsAt: appointment.endsAt,
    organizerName: businessName,
    attendeeName: appointment.customerName,
    attendeeEmail: appointment.customerEmail,
  };

  const icsContent = generateIcsEvent(icsEvent);

  // Push to specific provider
  if (provider === "google") {
    try {
      const eventId = await createGoogleCalendarEvent(businessId, {
        summary: icsEvent.summary,
        description: icsEvent.description ?? "",
        start: appointment.startsAt.toISOString(),
        end: appointment.endsAt.toISOString(),
      });

      // Store external event ID for future updates/deletions
      if (supabase && eventId) {
        await supabase
          .from("appointments")
          .update({ external_calendar_id: eventId, calendar_provider: "google" })
          .eq("id", appointment.id);
      }

      return { ok: true, provider: "google", externalEventId: eventId ?? undefined, icsContent };
    } catch (err) {
      console.error("[calendar/sync] Google push failed:", err);
      return { ok: false, provider: "google", icsContent, error: String(err) };
    }
  }

  if (provider === "outlook") {
    try {
      const eventId = await createOutlookCalendarEvent(businessId, {
        summary: icsEvent.summary,
        description: icsEvent.description ?? "",
        start: appointment.startsAt.toISOString(),
        end: appointment.endsAt.toISOString(),
      });

      if (supabase && eventId) {
        await supabase
          .from("appointments")
          .update({ external_calendar_id: eventId, calendar_provider: "outlook" })
          .eq("id", appointment.id);
      }

      return { ok: true, provider: "outlook", externalEventId: eventId ?? undefined, icsContent };
    } catch (err) {
      console.error("[calendar/sync] Outlook push failed:", err);
      return { ok: false, provider: "outlook", icsContent, error: String(err) };
    }
  }

  // ics_only or none — just return the .ics content for email/SMS
  return { ok: true, provider: "ics_only", icsContent };
}

/**
 * Remove a booking from the business's connected calendar.
 */
export async function removeBookingFromCalendar(
  businessId: string,
  appointmentId: string
): Promise<SyncResult> {
  const supabase = getSupabaseService();
  if (!supabase) return { ok: false, provider: "none", error: "No database" };

  const { data: appointment } = await supabase
    .from("appointments")
    .select("external_calendar_id, calendar_provider, starts_at, ends_at, customer_name, service_id")
    .eq("id", appointmentId)
    .eq("business_id", businessId)
    .single();

  if (!appointment) return { ok: false, provider: "none", error: "Appointment not found" };

  const provider = (appointment.calendar_provider as CalendarProvider) ?? await getCalendarProvider(businessId);
  const externalId = appointment.external_calendar_id as string | null;

  // Generate cancellation .ics
  const icsContent = generateIcsCancellation({
    uid: appointmentId,
    summary: `Cancelled: ${appointment.customer_name ?? "Appointment"}`,
    startsAt: new Date(appointment.starts_at as string),
    endsAt: new Date(appointment.ends_at as string),
    status: "CANCELLED",
  });

  if (provider === "google" && externalId) {
    try {
      await deleteGoogleCalendarEvent(businessId, externalId);
      return { ok: true, provider: "google", icsContent };
    } catch (err) {
      console.error("[calendar/sync] Google delete failed:", err);
      return { ok: false, provider: "google", icsContent, error: String(err) };
    }
  }

  if (provider === "outlook" && externalId) {
    try {
      await deleteOutlookCalendarEvent(businessId, externalId);
      return { ok: true, provider: "outlook", icsContent };
    } catch (err) {
      console.error("[calendar/sync] Outlook delete failed:", err);
      return { ok: false, provider: "outlook", icsContent, error: String(err) };
    }
  }

  return { ok: true, provider: "ics_only", icsContent };
}

// ─── Google Calendar Helpers ───────────────────────────────────────────────────

async function createGoogleCalendarEvent(
  businessId: string,
  event: { summary: string; description: string; start: string; end: string }
): Promise<string | null> {
  const token = await getGoogleToken(businessId);
  if (!token) return null;

  const res = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary: event.summary,
        description: event.description,
        start: { dateTime: event.start, timeZone: "America/Montreal" },
        end: { dateTime: event.end, timeZone: "America/Montreal" },
        reminders: { useDefault: false, overrides: [{ method: "popup", minutes: 30 }] },
      }),
    }
  );

  if (!res.ok) {
    console.error("[calendar/sync] Google create event failed:", res.status);
    return null;
  }

  const data = await res.json();
  return data.id ?? null;
}

async function deleteGoogleCalendarEvent(
  businessId: string,
  eventId: string
): Promise<void> {
  const token = await getGoogleToken(businessId);
  if (!token) return;

  await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

async function getGoogleToken(businessId: string): Promise<string | null> {
  // Re-use the existing token refresh logic
  const { getGoogleClientId, getGoogleClientSecret } = await import("@/lib/google/config");
  const supabase = getSupabaseService();
  if (!supabase) return null;

  const { data } = await supabase
    .from("businesses")
    .select("google_access_token, google_refresh_token, google_token_expires_at")
    .eq("id", businessId)
    .single();

  if (!data?.google_access_token) return null;

  // Check if token is still valid
  if (data.google_token_expires_at) {
    const expiresAt = new Date(data.google_token_expires_at).getTime();
    if (Date.now() < expiresAt - 5 * 60 * 1000) {
      return data.google_access_token;
    }
  }

  // Refresh
  if (!data.google_refresh_token) return null;
  const clientId = getGoogleClientId();
  const clientSecret = getGoogleClientSecret();
  if (!clientId || !clientSecret) return null;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: data.google_refresh_token,
      grant_type: "refresh_token",
    }),
  });

  if (!res.ok) return null;
  const { access_token, expires_in } = await res.json();
  const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

  await supabase
    .from("businesses")
    .update({ google_access_token: access_token, google_token_expires_at: expiresAt })
    .eq("id", businessId);

  return access_token;
}

// ─── Outlook Calendar Helpers ──────────────────────────────────────────────────

async function isOutlookConnected(businessId: string): Promise<boolean> {
  const supabase = getSupabaseService();
  if (!supabase) return false;

  const { data } = await supabase
    .from("businesses")
    .select("outlook_refresh_token")
    .eq("id", businessId)
    .single();

  return Boolean(data?.outlook_refresh_token);
}

async function getOutlookCalendarEvents(
  businessId: string,
  timeMin: string,
  timeMax: string
): Promise<{ start: string; end: string }[]> {
  const token = await getOutlookToken(businessId);
  if (!token) return [];

  const params = new URLSearchParams({
    startDateTime: timeMin,
    endDateTime: timeMax,
    $select: "start,end,subject",
    $top: "50",
  });

  const res = await fetch(
    `https://graph.microsoft.com/v1.0/me/calendarview?${params}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Prefer: 'outlook.timezone="America/Montreal"',
      },
    }
  );

  if (!res.ok) return [];
  const data = await res.json();

  return (data.value ?? []).map((e: { start: { dateTime: string }; end: { dateTime: string } }) => ({
    start: e.start.dateTime + "Z",
    end: e.end.dateTime + "Z",
  }));
}

async function createOutlookCalendarEvent(
  businessId: string,
  event: { summary: string; description: string; start: string; end: string }
): Promise<string | null> {
  const token = await getOutlookToken(businessId);
  if (!token) return null;

  const res = await fetch("https://graph.microsoft.com/v1.0/me/events", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subject: event.summary,
      body: { contentType: "text", content: event.description },
      start: { dateTime: event.start, timeZone: "America/Montreal" },
      end: { dateTime: event.end, timeZone: "America/Montreal" },
      reminderMinutesBeforeStart: 30,
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.id ?? null;
}

async function deleteOutlookCalendarEvent(
  businessId: string,
  eventId: string
): Promise<void> {
  const token = await getOutlookToken(businessId);
  if (!token) return;

  await fetch(`https://graph.microsoft.com/v1.0/me/events/${eventId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

async function getOutlookToken(businessId: string): Promise<string | null> {
  const supabase = getSupabaseService();
  if (!supabase) return null;

  const { data } = await supabase
    .from("businesses")
    .select("outlook_access_token, outlook_refresh_token, outlook_token_expires_at")
    .eq("id", businessId)
    .single();

  if (!data?.outlook_access_token) return null;

  // Check if token is still valid
  if (data.outlook_token_expires_at) {
    const expiresAt = new Date(data.outlook_token_expires_at).getTime();
    if (Date.now() < expiresAt - 5 * 60 * 1000) {
      return data.outlook_access_token;
    }
  }

  // Refresh
  if (!data.outlook_refresh_token) return null;
  const clientId = process.env.OUTLOOK_CLIENT_ID;
  const clientSecret = process.env.OUTLOOK_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  const res = await fetch("https://login.microsoftonline.com/common/oauth2/v2.0/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: data.outlook_refresh_token,
      grant_type: "refresh_token",
      scope: "Calendars.ReadWrite offline_access",
    }),
  });

  if (!res.ok) return null;
  const { access_token, expires_in } = await res.json();
  const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

  await supabase
    .from("businesses")
    .update({
      outlook_access_token: access_token,
      outlook_token_expires_at: expiresAt,
    })
    .eq("id", businessId);

  return access_token;
}

// ─── Utility ───────────────────────────────────────────────────────────────────

async function getBusinessName(businessId: string): Promise<string> {
  const supabase = getSupabaseService();
  if (!supabase) return "JustBookMe";

  const { data } = await supabase
    .from("businesses")
    .select("name")
    .eq("id", businessId)
    .single();

  return (data?.name as string) ?? "JustBookMe";
}
