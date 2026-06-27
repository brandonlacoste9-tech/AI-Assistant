import {
  getGoogleClientId,
  getGoogleClientSecret,
} from "@/lib/google/config";
import { getSupabaseService } from "@/lib/supabase/server";

type CalendarEvent = {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
};

/**
 * Refresh the Google access token using the stored refresh token.
 */
async function refreshAccessToken(businessId: string): Promise<string | null> {
  const supabase = getSupabaseService();
  if (!supabase) return null;

  const { data: business } = await supabase
    .from("businesses")
    .select("google_refresh_token")
    .eq("id", businessId)
    .single();

  if (!business?.google_refresh_token) return null;

  const clientId = getGoogleClientId();
  const clientSecret = getGoogleClientSecret();
  if (!clientId || !clientSecret) return null;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: business.google_refresh_token,
      grant_type: "refresh_token",
    }),
  });

  if (!res.ok) {
    console.error("[google/calendar] Token refresh failed:", await res.text());
    return null;
  }

  const { access_token, expires_in } = await res.json();
  const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

  await supabase
    .from("businesses")
    .update({
      google_access_token: access_token,
      google_token_expires_at: expiresAt,
    })
    .eq("id", businessId);

  return access_token;
}

/**
 * Get a valid access token for the business, refreshing if needed.
 */
async function getValidToken(businessId: string): Promise<string | null> {
  const supabase = getSupabaseService();
  if (!supabase) return null;

  const { data: business } = await supabase
    .from("businesses")
    .select("google_access_token, google_token_expires_at")
    .eq("id", businessId)
    .single();

  if (!business?.google_access_token) return null;

  // Check if token is still valid (with 5-minute buffer)
  if (business.google_token_expires_at) {
    const expiresAt = new Date(business.google_token_expires_at).getTime();
    if (Date.now() < expiresAt - 5 * 60 * 1000) {
      return business.google_access_token;
    }
  }

  // Token expired, refresh it
  return refreshAccessToken(businessId);
}

/**
 * Check if a business has Google Calendar connected.
 */
export async function isGoogleCalendarConnected(
  businessId: string
): Promise<boolean> {
  const supabase = getSupabaseService();
  if (!supabase) return false;

  const { data } = await supabase
    .from("businesses")
    .select("google_refresh_token")
    .eq("id", businessId)
    .single();

  return Boolean(data?.google_refresh_token);
}

/**
 * Fetch events from the user's primary Google Calendar for a given time range.
 */
export async function getGoogleCalendarEvents(
  businessId: string,
  timeMin: string,
  timeMax: string
): Promise<CalendarEvent[]> {
  const token = await getValidToken(businessId);
  if (!token) return [];

  const params = new URLSearchParams({
    timeMin,
    timeMax,
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "50",
  });

  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) {
    console.error("[google/calendar] Events fetch failed:", res.status);
    return [];
  }

  const data = await res.json();
  return (data.items || []) as CalendarEvent[];
}

/**
 * Check if a specific time slot conflicts with Google Calendar events.
 */
export async function hasGoogleCalendarConflict(
  businessId: string,
  startTime: string,
  endTime: string
): Promise<boolean> {
  const events = await getGoogleCalendarEvents(businessId, startTime, endTime);
  return events.length > 0;
}

/**
 * Disconnect Google Calendar by clearing tokens.
 */
export async function disconnectGoogleCalendar(
  businessId: string
): Promise<boolean> {
  const supabase = getSupabaseService();
  if (!supabase) return false;

  const { error } = await supabase
    .from("businesses")
    .update({
      google_access_token: null,
      google_refresh_token: null,
      google_token_expires_at: null,
    })
    .eq("id", businessId);

  return !error;
}
