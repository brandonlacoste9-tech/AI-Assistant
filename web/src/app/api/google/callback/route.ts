import {
  getGoogleClientId,
  getGoogleClientSecret,
  getGoogleRedirectUri,
  isGoogleConfigured,
} from "@/lib/google/config";
import { getSupabaseService } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/google/callback
 * Handles the OAuth callback from Google, exchanges code for tokens,
 * and stores the refresh token in the business record.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const code = searchParams.get("code");
  const state = searchParams.get("state"); // businessId
  const error = searchParams.get("error");

  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ).replace(/\/$/, "");

  if (error) {
    console.error("[google/callback] OAuth error:", error);
    return NextResponse.redirect(
      `${siteUrl}/dashboard/integrations?google=error&reason=${error}`
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      `${siteUrl}/dashboard/integrations?google=error&reason=missing_params`
    );
  }

  if (!isGoogleConfigured()) {
    return NextResponse.redirect(
      `${siteUrl}/dashboard/integrations?google=error&reason=not_configured`
    );
  }

  try {
    // Exchange authorization code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: getGoogleClientId()!,
        client_secret: getGoogleClientSecret()!,
        redirect_uri: getGoogleRedirectUri(),
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      const errBody = await tokenRes.text();
      console.error("[google/callback] Token exchange failed:", errBody);
      return NextResponse.redirect(
        `${siteUrl}/dashboard/integrations?google=error&reason=token_exchange`
      );
    }

    const tokens = await tokenRes.json();
    const { access_token, refresh_token, expires_in } = tokens;

    // Store tokens in the database
    const supabase = getSupabaseService();
    if (!supabase) {
      return NextResponse.redirect(
        `${siteUrl}/dashboard/integrations?google=error&reason=db_unavailable`
      );
    }

    const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

    await supabase
      .from("businesses")
      .update({
        google_access_token: access_token,
        google_refresh_token: refresh_token || null,
        google_token_expires_at: expiresAt,
      })
      .eq("id", state);

    return NextResponse.redirect(
      `${siteUrl}/dashboard/integrations?google=connected`
    );
  } catch (err) {
    console.error("[google/callback] Unexpected error:", err);
    return NextResponse.redirect(
      `${siteUrl}/dashboard/integrations?google=error&reason=unknown`
    );
  }
}
