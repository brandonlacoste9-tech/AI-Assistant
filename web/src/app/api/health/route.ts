import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase/config";
import { getSiteUrl } from "@/lib/site-config";
import { getSupabaseService } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

function supabaseProjectRef(url: string | undefined): string | null {
  if (!url) return null;
  const m = url.match(/^https:\/\/([a-z0-9-]+)\.supabase\.co/i);
  return m?.[1] ?? null;
}

export async function GET() {
  const supabaseUrl = getSupabaseUrl();
  const checks: Record<string, boolean | string | null> = {
    supabase_url: Boolean(supabaseUrl),
    supabase_project_ref: supabaseProjectRef(supabaseUrl),
    supabase_anon: Boolean(getSupabaseAnonKey()),
    supabase_service: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()),
    site_url: getSiteUrl(),
    env_overrides: Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
    ),
    cron_secret: Boolean(process.env.CRON_SECRET?.trim()),
    usage_enforce: process.env.USAGE_ENFORCE?.trim() === "true",
    schema_users_business_id: null,
    schema_businesses: null,
  };

  const db = getSupabaseService();
  if (db) {
    const { error } = await db.from("waitlist_signups").select("id").limit(1);
    checks.database = !error;
    if (error) checks.database_error = error.message;

    // Detect shared/wrong DB: JustBookMe requires public.users.business_id
    const usersProbe = await db.from("users").select("business_id").limit(1);
    if (!usersProbe.error) {
      checks.schema_users_business_id = true;
    } else {
      checks.schema_users_business_id = false;
      checks.schema_users_error = usersProbe.error.message;
    }

    const bizProbe = await db.from("businesses").select("id").limit(1);
    checks.schema_businesses = !bizProbe.error;
    if (bizProbe.error) checks.schema_businesses_error = bizProbe.error.message;
  } else {
    checks.database = false;
  }

  const schemaOk = checks.schema_users_business_id === true && checks.schema_businesses === true;
  const ok =
    checks.supabase_url &&
    checks.supabase_anon &&
    checks.supabase_service &&
    checks.database &&
    schemaOk &&
    checks.cron_secret === true;

  return NextResponse.json(
    {
      status: ok ? "ok" : "degraded",
      checks,
      hint:
        !schemaOk
          ? "Signup needs public.users.business_id — see docs/PILOT_BLOCKERS.md (dedicated Supabase + JUSTBOOKME_FRESH_PROJECT.sql). Shared Wacke/MTL DB will fail."
          : checks.cron_secret !== true
            ? "Set CRON_SECRET on Netlify Production (not only build) and redeploy."
            : null,
    },
    { status: ok ? 200 : 503 }
  );
}