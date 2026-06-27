import { getApiUser } from "@/lib/auth/api-auth";
import {
  getGoogleClientId,
  getGoogleRedirectUri,
  isGoogleConfigured,
} from "@/lib/google/config";
import { NextResponse } from "next/server";

/**
 * GET /api/google/connect
 * Redirects the user to Google's OAuth consent screen for Calendar access.
 */
export async function GET() {
  const auth = await getApiUser();
  if ("error" in auth) return auth.error;

  if (!isGoogleConfigured()) {
    return NextResponse.json(
      { error: "Google Calendar integration is not configured." },
      { status: 503 }
    );
  }

  const clientId = getGoogleClientId()!;
  const redirectUri = getGoogleRedirectUri();

  const scopes = [
    "https://www.googleapis.com/auth/calendar.events",
    "https://www.googleapis.com/auth/calendar.readonly",
  ];

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: scopes.join(" "),
    access_type: "offline",
    prompt: "consent",
    state: auth.businessId,
  });

  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  return NextResponse.redirect(url);
}
