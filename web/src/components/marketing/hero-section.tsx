import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/types";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

export function HeroSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const fr = locale === "fr";

  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* Full-width faded background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
        style={{ backgroundImage: "url('/bg-barbershop.jpg')" }}
      />
      
      {/* Gradients to fade into the content below and ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-slate-950/70 to-slate-950/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/60" />

      <div className="relative mx-auto max-w-4xl px-4 pb-28 pt-24 text-center sm:px-6 sm:pb-36 sm:pt-32">
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur-md">
            <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" />
            {dict.hero.trust}
          </div>

          <h1 className="font-display mt-8 text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-[4rem] text-balance">
            {dict.hero.headline}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl text-balance">
            {dict.hero.subhead}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link 
              href="/signup" 
              className="btn-primary relative overflow-hidden px-8 py-4 text-base shadow-[0_0_40px_-10px_rgba(212,175,55,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_60px_-15px_rgba(212,175,55,0.6)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                {dict.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </span>
              <div className="absolute inset-0 z-0 animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-16 border-t border-white/10 pt-10">
            {[
              { value: "24/7", label: fr ? "Disponible" : "Available" },
              { value: "FR/EN", label: fr ? "Bilingue" : "Bilingual" },
              { value: "$149", label: fr ? "À partir de" : "Starting at" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-bold text-[var(--accent)] drop-shadow-md">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-white/70 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}