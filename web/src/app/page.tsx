import { WaitlistForm } from "@/components/marketing/waitlist-form";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";
import { Check, Phone, Calendar, MessageSquare, BarChart3, Users } from "lucide-react";
import Link from "next/link";

const featureIcons = [Phone, Calendar, MessageSquare, Users, BarChart3];

export default async function HomePage() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--primary-light)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-medium text-[var(--primary)]">{t.hero.trust}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
            {t.hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--muted-fg)]">{t.hero.subhead}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/signup?plan=pro"
              className="rounded-lg bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white hover:bg-[var(--primary-hover)]"
            >
              {t.hero.ctaPrimary}
            </Link>
            <Link
              href="#waitlist"
              className="rounded-lg border border-[var(--border)] bg-white px-6 py-3 text-sm font-medium hover:bg-[var(--muted)]"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold">{t.howItWorks.title}</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-3">
            {t.howItWorks.steps.map((step, i) => (
              <li
                key={step}
                className="rounded-xl border border-[var(--border)] bg-white p-6 shadow-sm"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary-light)] text-sm font-bold text-[var(--primary)]">
                  {i + 1}
                </span>
                <p className="mt-4 text-[var(--foreground)]">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface)] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold">{t.features.title}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.features.items.map((item, i) => {
              const Icon = featureIcons[i] ?? Phone;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-[var(--border)] bg-white p-6"
                >
                  <Icon className="h-6 w-6 text-[var(--primary)]" />
                  <h3 className="mt-3 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted-fg)]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold">{t.builtForQuebec.title}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {t.builtForQuebec.items.map((item) => (
              <li key={item} className="flex items-center gap-2 text-[var(--foreground)]">
                <Check className="h-5 w-5 text-[var(--primary)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold">{t.roi.title}</h2>
          <div className="mt-6 overflow-hidden rounded-xl border border-[var(--border)]">
            <table className="w-full text-left text-sm">
              <tbody>
                {t.roi.rows.map((row) => (
                  <tr key={row.label} className="border-b border-[var(--border)] last:border-0">
                    <td className="px-4 py-3 text-[var(--muted-fg)]">{row.label}</td>
                    <td className="px-4 py-3 text-right font-semibold">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 font-medium text-[var(--primary)]">{t.roi.punchline}</p>
          <Link href="/pricing" className="mt-4 inline-block text-sm font-medium text-[var(--primary)] hover:underline">
            {locale === "fr" ? "Voir les forfaits →" : "See plans →"}
          </Link>
        </div>
      </section>

      <section id="waitlist" className="py-16 scroll-mt-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold">{t.waitlist.title}</h2>
          <p className="mt-2 text-[var(--muted-fg)]">{t.waitlist.subtitle}</p>
          <div className="mt-8">
            <WaitlistForm dict={t} locale={locale} />
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--surface)] py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold">{t.faq.title}</h2>
          <dl className="mt-8 space-y-6">
            {t.faq.items.map((item) => (
              <div key={item.q} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <dt className="font-semibold">{item.q}</dt>
                <dd className="mt-2 text-sm text-[var(--muted-fg)]">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}