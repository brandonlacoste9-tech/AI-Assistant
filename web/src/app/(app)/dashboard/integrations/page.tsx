import { requireOnboardedContext } from "@/lib/auth/get-business-context";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";
import { Calendar, Code, CalendarDays, Webhook } from "lucide-react";

export default async function IntegrationsPage() {
  const ctx = await requireOnboardedContext();
  const locale = await getLocale();
  const t = getDictionary(locale);

  // We are using hardcoded english strings here for MVP speed, 
  // but they could be moved to dictionaries later.
  const integrations = [
    {
      id: "google-calendar",
      name: "Google Calendar",
      description: "Sync your Google Calendar to prevent double booking. The AI will check your availability before confirming appointments.",
      icon: Calendar,
      status: "available",
      actionText: "Connect Google",
    },
    {
      id: "square",
      name: "Square Appointments",
      description: "Allow the AI to read your Square schedule and create appointments directly in your Square POS.",
      icon: Code,
      status: "coming_soon",
      actionText: "Request Integration",
    },
    {
      id: "boulevard",
      name: "Boulevard",
      description: "Sync seamlessly with Boulevard for premium salon scheduling and front-desk automation.",
      icon: Code,
      status: "coming_soon",
      actionText: "Request Integration",
    },
    {
      id: "phorest",
      name: "Phorest",
      description: "Connect to Phorest to manage your salon's availability and client records automatically.",
      icon: Code,
      status: "coming_soon",
      actionText: "Request Integration",
    },
    {
      id: "acuity",
      name: "Acuity Scheduling",
      description: "Sync your Acuity calendar so the AI can book directly into your existing system.",
      icon: CalendarDays,
      status: "coming_soon",
      actionText: "Request Integration",
    },
    {
      id: "webhook",
      name: "Custom Webhook",
      description: "Connect your own custom software via HTTP webhooks to verify slots and push bookings.",
      icon: Webhook,
      status: "coming_soon",
      actionText: "Request API Docs",
    }
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-4 pt-6 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          {t.dashboard.nav.integrations}
        </h1>
        <p className="mt-1 text-sm text-[var(--muted-fg)]">
          Connect your existing scheduling software so the AI receptionist never double-books you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <div key={integration.id} className="card flex flex-col p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-light)] text-[var(--primary)]">
                <integration.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-[var(--foreground)]">{integration.name}</h3>
            </div>
            
            <p className="mt-3 flex-1 text-sm text-[var(--muted-fg)]">
              {integration.description}
            </p>
            
            <div className="mt-5">
              <button 
                type="button"
                className={`w-full rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  integration.status === "available"
                    ? "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]"
                    : "bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--border)]"
                }`}
              >
                {integration.actionText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
