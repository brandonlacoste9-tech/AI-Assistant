import { getSupabaseService } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const checks: Record<string, boolean | string> = {
    supabase_url: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()),
    supabase_anon: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()),
    supabase_service: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()),
    site_url: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "missing",
  };

  const db = getSupabaseService();
  if (db) {
    const { error } = await db.from("waitlist_signups").select("id").limit(1);
    checks.database = !error;
    if (error) checks.database_error = error.message;
  } else {
    checks.database = false;
  }

  const ok = checks.supabase_url && checks.supabase_anon && checks.supabase_service && checks.database;

  return NextResponse.json(
    { status: ok ? "ok" : "degraded", checks },
    { status: ok ? 200 : 503 }
  );
}