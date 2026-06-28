import { requireOnboardedContext } from "@/lib/auth/get-business-context";
import { isGoogleCalendarConnected } from "@/lib/google/calendar";
import { isGoogleConfigured } from "@/lib/google/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";
import { Code, CalendarDays, Webhook } from "lucide-react";
import { CalendarSyncCard } from "@/components/dashboard/calendar-sync-card";
import { getSupabaseService } from "@/lib/supabase/server";

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
  let currentProvider: "google" | "outlook" | "ics_only" | "none" = "none";
  if (supabase) {
    const { data } = await supabase
      .from("businesses")
      .select("outlook_refresh_token, calendar_provider")
      .eq("id", ctx.businessId)
      .single();
    outlookConnected = Boolean(data?.outlook_refresh_token);
    if (data?.calendar_provider) {
      currentProvider = data.calendar_provider as typeof currentProvider;
    } else if (googleConnected) {
      currentProvider = "google";
    } else if (outlookConnected) {
      currentProvider = "outlook";
    }
  }

  const integrations = [
    {
      id: "square",
      name: "Square Appointments",
      description:
        "Allow the AI to read your Square schedule and create appointments directly in your Square POS.",
      icon: Code,
      status: "coming_soon" as const,
      actionText: "Request Integration",
    },
    {
      id: "boulevard",
      name: "Boulevard",
      description:
        "Sync seamlessly with Boulevard for premium salon scheduling and front-desk automation.",
      icon: Code,
      status: "coming_soon" as const,
      actionText: "Request Integration",
    },
    {
      id: "phorest",
      name: "Phorest",
      description:
        "Connect to Phorest to manage your salon's availability and client records automatically.",
      icon: Code,
      status: "coming_soon" as const,
      actionText: "Request Integration",
    },
    {
      id: "acuity",
      name: "Acuity Scheduling",
      description:
        "Sync your Acuity calendar so the AI can book directly into your existing system.",
      icon: CalendarDays,
      status: "coming_soon" as const,
      actionText: "Request Integration",
    },
    {
      id: "webhook",
      name: "Custom Webhook",
      description:
        "Connect your own custom software via HTTP webhooks to verify slots and push bookings.",
      icon: Webhook,
      status: "coming_soon" as const,
      actionText: "Request API Docs",
    },
  ];

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
        currentProvider={currentProvider}
      />

      {/* Other integrations */}
      <div>
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
          Industry Scheduling Tools
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((integration) => (
            <div key={integration.id} className="card flex flex-col p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-light)] text-[var(--primary)]">
                  <integration.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-[var(--foreground)]">
                  {integration.name}
                </h3>
              </div>

              <p className="mt-3 flex-1 text-sm text-[var(--muted-fg)]">
                {integration.description}
              </p>

              <div className="mt-5">
                <button
                  type="button"
                  className="w-full rounded-md bg-[var(--muted)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--border)]"
                >
                  {integration.actionText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
