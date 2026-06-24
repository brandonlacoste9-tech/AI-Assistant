import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase/config";
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  if (!url || !anonKey) return null;
  return createBrowserClient(url, anonKey);
}

export function isSupabaseConfigured(): boolean {
  return Boolean(getSupabaseUrl() && getSupabaseAnonKey());
}