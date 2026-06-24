/** Public Supabase project — anon key is client-safe (RLS enforced). */
export const SUPABASE_PROJECT_URL = "https://ulbfaxhsbbckotcbmslk.supabase.co";

export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsYmZheGhzYmJja290Y2Jtc2xrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyOTc0MzksImV4cCI6MjA5MTg3MzQzOX0.8gw_5O7cK5ZQEdM5E8F0E4hFqB-bPtOGA0mB2u-LV18";

export function getSupabaseUrl(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || SUPABASE_PROJECT_URL;
}

export function getSupabaseAnonKey(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || SUPABASE_ANON_KEY;
}