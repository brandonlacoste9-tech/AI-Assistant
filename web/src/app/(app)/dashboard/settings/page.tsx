import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";
import { requireOnboardedContext } from "@/lib/auth/get-business-context";

export default async function SettingsPage() {
  const ctx = await requireOnboardedContext();
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl font-semibold text-[var(--foreground)]">
        {t.dashboard.nav.settings}
      </h1>
      <p className="mt-1 text-sm text-[var(--muted-fg)]">{t.dashboard.settings.subtitle}</p>

      <dl className="card mt-8 divide-y divide-[var(--border)]">
        {[
          { label: t.dashboard.settings.business, value: ctx.businessName },
          { label: t.dashboard.settings.email, value: ctx.email },
          { label: t.dashboard.settings.plan, value: ctx.plan },
          {
            label: t.dashboard.settings.language,
            value: ctx.defaultLanguage === "fr" ? "Français" : "English",
          },
        ].map((row) => (
          <div key={row.label} className="flex justify-between gap-4 px-5 py-4">
            <dt className="text-sm text-[var(--muted-fg)]">{row.label}</dt>
            <dd className="text-sm font-medium text-[var(--foreground)]">{row.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-sm text-[var(--muted-fg)]">{t.dashboard.settings.billingNote}</p>
    </div>
  );
}