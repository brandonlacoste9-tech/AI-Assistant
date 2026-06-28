/**
 * Microsoft Outlook/365 OAuth2 callback route.
 * Exchanges the auth code for tokens and stores them.
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseService } from "@/lib/supabase/server";

const OUTLOOK_CLIENT_ID = process.env.OUTLOOK_CLIENT_ID ?? "";
const OUTLOOK_CLIENT_SECRET = process.env.OUTLOOK_CLIENT_SECRET ?? "";
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/outlook/callback`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/dashboard/integrations`;

  if (error) {
    console.error("[outlook/callback] OAuth error:", error, searchParams.get("error_description"));
    return NextResponse.redirect(`${dashboardUrl}?outlook=error&reason=${error}`);
  }

  if (!code || !state) {
    return NextResponse.redirect(`${dashboardUrl}?outlook=error&reason=missing_params`);
  }

  const supabase = getSupabaseService();
  if (!supabase) {
    return NextResponse.redirect(`${dashboardUrl}?outlook=error&reason=service_unavailable`);
  }

  // Verify session from state parameter
  const { data: session } = await supabase
    .from("sessions")
    .select("user_id")
    .eq("token", state)
    .gt("expires_at", new Date().toISOString())
    .single();

  if (!session?.user_id) {
    return NextResponse.redirect(`${dashboardUrl}?outlook=error&reason=invalid_session`);
  }

  // Get user's business
  const { data: user } = await supabase
    .from("users")
    .select("business_id")
    .eq("id", session.user_id)
    .single();

  if (!user?.business_id) {
    return NextResponse.redirect(`${dashboardUrl}?outlook=error&reason=no_business`);
  }

  // Exchange code for tokens
  const tokenRes = await fetch("https://login.microsoftonline.com/common/oauth2/v2.0/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: OUTLOOK_CLIENT_ID,
      client_secret: OUTLOOK_CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
      scope: "Calendars.ReadWrite offline_access User.Read",
    }),
  });

  if (!tokenRes.ok) {
    const errBody = await tokenRes.text();
    console.error("[outlook/callback] Token exchange failed:", errBody);
    return NextResponse.redirect(`${dashboardUrl}?outlook=error&reason=token_exchange_failed`);
  }

  const tokens = await tokenRes.json();
  const { access_token, refresh_token, expires_in } = tokens;
  const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

  // Get user's email from Microsoft Graph
  let outlookEmail = "";
  try {
    const profileRes = await fetch("https://graph.microsoft.com/v1.0/me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    if (profileRes.ok) {
      const profile = await profileRes.json();
      outlookEmail = profile.mail || profile.userPrincipalName || "";
    }
  } catch {
    // Non-critical
  }

  // Store tokens
  const { error: updateErr } = await supabase
    .from("businesses")
    .update({
      outlook_access_token: access_token,
      outlook_refresh_token: refresh_token,
      outlook_token_expires_at: expiresAt,
      outlook_email: outlookEmail,
      calendar_provider: "outlook",
    })
    .eq("id", user.business_id);

  if (updateErr) {
    console.error("[outlook/callback] Token storage failed:", updateErr);
    return NextResponse.redirect(`${dashboardUrl}?outlook=error&reason=storage_failed`);
  }

  return NextResponse.redirect(`${dashboardUrl}?outlook=connected`);
}
