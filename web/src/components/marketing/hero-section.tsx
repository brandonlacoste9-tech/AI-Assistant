import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/types";
import { DashboardMockup } from "@/components/marketing/dashboard-mockup";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

export function HeroSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const fr = locale === "fr";

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--hero-from)] via-[var(--hero-to)] to-[#2a4f7a]">
      <div className="grain absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,var(--hero-glow)_0%,transparent_50%)]" />
      <div className="absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-[var(--accent)]/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" />
              {dict.hero.trust}
            </div>

            <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              {dict.hero.headline}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              {dict.hero.subhead}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/signup?plan=pro" className="btn-primary px-6 py-3.5 text-sm">
                {dict.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#waitlist"
                className="btn-secondary border-white/20 bg-white/5 px-6 py-3.5 text-sm text-white hover:bg-white/10"
              >
                {dict.hero.ctaSecondary}
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 border-t border-white/10 pt-8">
              {[
                { value: "24/7", label: fr ? "Disponible" : "Available" },
                { value: "FR/EN", label: fr ? "Bilingue" : "Bilingual" },
                { value: "$149", label: fr ? "À partir de" : "Starting at" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-bold text-[var(--accent)]">{stat.value}</p>
                  <p className="text-xs text-white/50">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pl-4">
            <DashboardMockup locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}