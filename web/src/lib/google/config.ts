/** Google Calendar OAuth configuration */

export function getGoogleClientId(): string | null {
  return process.env.GOOGLE_CLIENT_ID?.trim() || null;
}

export function getGoogleClientSecret(): string | null {
  return process.env.GOOGLE_CLIENT_SECRET?.trim() || null;
}

export function getGoogleRedirectUri(): string {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ).replace(/\/$/, "");
  return `${base}/api/google/callback`;
}

export function isGoogleConfigured(): boolean {
  return Boolean(getGoogleClientId() && getGoogleClientSecret());
}
