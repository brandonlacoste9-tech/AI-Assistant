import { requireOnboardedContext } from "@/lib/auth/get-business-context";
import { isGoogleCalendarConnected } from "@/lib/google/calendar";
import { isGoogleConfigured } from "@/lib/google/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";
import { getSupabaseService } from "@/lib/supabase/server";
import { CalendarSyncCard } from "@/components/dashboard/calendar-sync-card";

export default async function IntegrationsPage() {
  const ctx = await requireOnboardedContext();
  const locale = await getLocale();
  const t = getDictionary(locale);

  const googleConfigured = isGoogleConfigured();
  const googleConnected = googleConfigured
    ? await isGoogleCalendarConnected(ctx.businessId)
    : false;

  // Check Outlook connection
  const supabase = getSupabaseService();
  let outlookConnected = false;
  if (supabase) {
    const { data } = await supabase
      .from("businesses")
      .select("outlook_refresh_token")
      .eq("id", ctx.businessId)
      .single();
    outlookConnected = Boolean(data?.outlook_refresh_token);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-4 pt-6 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          {t.dashboard.nav.integrations}
        </h1>
        <p className="mt-1 text-sm text-[var(--muted-fg)]">
          Connect your calendar and scheduling tools so the AI receptionist never
          double-books you.
        </p>
      </div>

      {/* Calendar Sync — the critical integration */}
      <CalendarSyncCard
        googleConnected={googleConnected}
        outlookConnected={outlookConnected}
      />
    </div>
  );
}
