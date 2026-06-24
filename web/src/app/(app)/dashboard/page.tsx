import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";
import { requireOnboardedContext } from "@/lib/auth/get-business-context";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Calendar, Phone, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const ctx = await requireOnboardedContext();
  const locale = await getLocale();
  const t = getDictionary(locale);
  const supabase = await createSupabaseServerClient();

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  let bookingsToday = 0;
  let activeLeads = 0;
  let recoveredCalls = 0;

  if (supabase) {
    const { count: apptCount } = await supabase
      .from("appointments")
      .select("id", { count: "exact", head: true })
      .eq("business_id", ctx.businessId)
      .gte("starts_at", todayStart.toISOString())
      .lte("starts_at", todayEnd.toISOString())
      .neq("status", "cancelled");

    const { count: leadCount } = await supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("business_id", ctx.businessId)
      .in("pipeline_stage", ["new", "contacted"]);

    const { count: missedCount } = await supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("business_id", ctx.businessId)
      .eq("source", "missed_call")
      .eq("pipeline_stage", "booked");

    bookingsToday = apptCount ?? 0;
    activeLeads = leadCount ?? 0;
    recoveredCalls = missedCount ?? 0;
  }

  const stats = [
    {
      label: t.dashboard.stats.bookingsToday,
      value: String(bookingsToday),
      icon: Calendar,
      accent: "text-[var(--primary)]",
      bg: "bg-[var(--primary-light)]",
    },
    {
      label: t.dashboard.stats.activeLeads,
      value: String(activeLeads),
      icon: TrendingUp,
      accent: "text-[var(--teal)]",
      bg: "bg-[var(--teal-light)]",
    },
    {
      label: t.dashboard.stats.recoveredCalls,
      value: String(recoveredCalls),
      icon: Phone,
      accent: "text-[var(--accent-hover)]",
      bg: "bg-[var(--accent-light)]",
    },
  ];

  const trialLabel = ctx.trialEndsAt
    ? new Date(ctx.trialEndsAt).toLocaleDateString(locale === "fr" ? "fr-CA" : "en-CA")
    : "—";

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-[var(--foreground)]">
        {t.dashboard.title}
      </h1>
      <p className="mt-1 text-sm text-[var(--muted-fg)]">{t.dashboard.subtitle}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card p-5">
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.accent}`} />
                </div>
                <span className="font-display text-3xl font-bold text-[var(--foreground)]">
                  {stat.value}
                </span>
              </div>
              <p className="mt-4 text-sm text-[var(--muted-fg)]">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="card mt-8 p-6">
        <h2 className="font-semibold text-[var(--foreground)]">{t.dashboard.trial.title}</h2>
        <p className="mt-2 text-sm text-[var(--muted-fg)]">
          {t.dashboard.trial.plan}: <span className="font-medium capitalize">{ctx.plan}</span>
        </p>
        <p className="mt-1 text-sm text-[var(--muted-fg)]">
          {t.dashboard.trial.ends}: {trialLabel}
        </p>
      </div>
    </div>
  );
}