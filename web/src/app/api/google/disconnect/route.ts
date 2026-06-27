import { getApiUser } from "@/lib/auth/api-auth";
import { disconnectGoogleCalendar } from "@/lib/google/calendar";
import { NextResponse } from "next/server";

/**
 * POST /api/google/disconnect
 * Removes stored Google Calendar tokens for the business.
 */
export async function POST() {
  const auth = await getApiUser();
  if ("error" in auth) return auth.error;

  const success = await disconnectGoogleCalendar(auth.businessId);
  if (!success) {
    return NextResponse.json({ error: "Failed to disconnect" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
