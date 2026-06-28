/**
 * Microsoft Outlook/365 OAuth2 connect route.
 * Redirects the user to Microsoft's consent screen.
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseService } from "@/lib/supabase/server";

const OUTLOOK_CLIENT_ID = process.env.OUTLOOK_CLIENT_ID ?? "";
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/outlook/callback`;

export async function GET() {
  // Verify user is authenticated
  const supabase = getSupabaseService();
  if (!supabase) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"));
  }

  if (!OUTLOOK_CLIENT_ID) {
    return NextResponse.json(
      { error: "Outlook integration not configured" },
      { status: 500 }
    );
  }

  const scopes = [
    "Calendars.ReadWrite",
    "offline_access",
    "User.Read",
  ].join(" ");

  const params = new URLSearchParams({
    client_id: OUTLOOK_CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: scopes,
    response_mode: "query",
    state: sessionToken, // Use session token as state for CSRF protection
  });

  const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${params}`;

  return NextResponse.redirect(authUrl);
}
