/**
 * Generate or retrieve the calendar feed subscription URL for a business.
 * POST: Generate a new token (or regenerate)
 * GET: Get the current feed URL
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseService } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import crypto from "crypto";

async function getBusinessIdFromSession(): Promise<string | null> {
  const supabase = getSupabaseService();
  if (!supabase) return null;

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;
  if (!sessionToken) return null;

  const { data: session } = await supabase
    .from("sessions")
    .select("user_id")
    .eq("token", sessionToken)
    .gt("expires_at", new Date().toISOString())
    .single();

  if (!session?.user_id) return null;

  const { data: user } = await supabase
    .from("users")
    .select("business_id")
    .eq("id", session.user_id)
    .single();

  return (user?.business_id as string) ?? null;
}

export async function GET() {
  const businessId = await getBusinessIdFromSession();
  if (!businessId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseService();
  if (!supabase) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const { data } = await supabase
    .from("businesses")
    .select("calendar_feed_token")
    .eq("id", businessId)
    .single();

  if (!data?.calendar_feed_token) {
    return NextResponse.json({ feedUrl: null });
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://justbookme.ca";
  const feedUrl = `${baseUrl}/api/calendar/feed/${data.calendar_feed_token}`;

  return NextResponse.json({ feedUrl });
}

export async function POST() {
  const businessId = await getBusinessIdFromSession();
  if (!businessId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseService();
  if (!supabase) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  // Generate a secure random token
  const token = crypto.randomBytes(32).toString("hex");

  const { error } = await supabase
    .from("businesses")
    .update({ calendar_feed_token: token })
    .eq("id", businessId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://justbookme.ca";
  const feedUrl = `${baseUrl}/api/calendar/feed/${token}`;

  return NextResponse.json({
    feedUrl,
    instructions: {
      google: `Open Google Calendar → Settings → Add calendar → From URL → Paste: ${feedUrl}`,
      apple: `Open Calendar app → File → New Calendar Subscription → Paste: ${feedUrl}`,
      outlook: `Open Outlook → Add calendar → Subscribe from web → Paste: ${feedUrl}`,
      general: `Copy this URL and add it as a calendar subscription in any calendar app.`,
    },
  });
}
