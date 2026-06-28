/**
 * Disconnect Microsoft Outlook/365 calendar integration.
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseService } from "@/lib/supabase/server";

export async function POST() {
  const supabase = getSupabaseService();
  if (!supabase) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;
  if (!sessionToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: session } = await supabase
    .from("sessions")
    .select("user_id")
    .eq("token", sessionToken)
    .gt("expires_at", new Date().toISOString())
    .single();

  if (!session?.user_id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: user } = await supabase
    .from("users")
    .select("business_id")
    .eq("id", session.user_id)
    .single();

  if (!user?.business_id) {
    return NextResponse.json({ error: "No business found" }, { status: 404 });
  }

  const { error } = await supabase
    .from("businesses")
    .update({
      outlook_access_token: null,
      outlook_refresh_token: null,
      outlook_token_expires_at: null,
      outlook_email: null,
      calendar_provider: null,
    })
    .eq("id", user.business_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
