"use client";

import type { Locale } from "@/lib/i18n/types";
import { Quote, ShieldCheck, Clock, Globe, Star } from "lucide-react";

export function SocialProof({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  const trustBadges = fr
    ? [
        { icon: ShieldCheck, label: "Conforme à la Loi 25" },
        { icon: Clock, label: "Disponible 24h/24, 7j/7" },
        { icon: Globe, label: "Bilingue FR/EN" },
        { icon: Star, label: "Essai 14 jours sans carte" },
      ]
    : [
        { icon: ShieldCheck, label: "Law 25 Compliant" },
        { icon: Clock, label: "Available 24/7" },
        { icon: Globe, label: "FR/EN Bilingual" },
        { icon: Star, label: "14-day free trial, no card" },
      ];

  return (
    <section className="border-y border-[var(--border)] bg-[var(--surface)] py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pb-12 border-b border-[var(--border)]">
          {trustBadges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-[var(--muted-fg)] font-medium">
              <Icon className="h-4 w-4 text-[var(--accent)] shrink-0" />
              {label}
            </div>
          ))}
        </div>

        {/* Stats */}
        <p className="section-label text-center mt-10">
          {fr ? "Salons, barbershops, cliniques & plus" : "Salons, barbershops, clinics & more"}
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            {
              stat: "25–40%",
              label: fr ? "Appels manqués en heures de pointe" : "Missed calls at peak hours",
            },
            {
              stat: "$1 600",
              label: fr ? "Perdus par mois (5 appels/semaine)" : "Lost per month (5 calls/week)",
            },
            {
              stat: "14 j",
              label: fr ? "Essai gratuit, sans carte" : "Free trial, no card",
            },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="font-display text-3xl font-bold text-[var(--primary)]">{item.stat}</p>
              <p className="mt-2 text-sm text-[var(--muted-fg)]">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="card mx-auto max-w-2xl p-6 w-full">
            <Quote className="h-5 w-5 text-[var(--accent)]" />
            <p className="mt-3 text-[var(--foreground)] italic leading-relaxed">
              {fr
                ? "« On manque 5 à 8 appels par jour quand le salon est plein. Si l'IA en récupère la moitié, ça paie l'abonnement en une semaine. »"
                : "« We miss 5–8 calls a day when we're fully booked. If AI recovers half, the subscription pays for itself in a week. »"}
            </p>
            <p className="mt-3 text-sm text-[var(--muted-fg)]">
              — {fr ? "Propriétaire de salon, Montréal" : "Salon owner, Montreal"}
              <span className="ml-2 rounded-md bg-[var(--muted)] px-2 py-0.5 text-xs">
                {fr ? "Entrevue pilote" : "Pilot interview"}
              </span>
            </p>
          </div>
          <div className="card mx-auto max-w-2xl p-6 w-full">
            <Quote className="h-5 w-5 text-[var(--accent)]" />
            <p className="mt-3 text-[var(--foreground)] italic leading-relaxed">
              {fr
                ? "« Ma clinique reçoit des appels après 18h que je ne pouvais pas prendre. Maintenant l'IA répond et réserve directement. »"
                : "« My clinic gets calls after 6pm I couldn't answer. Now the AI picks up and books directly. »"}
            </p>
            <p className="mt-3 text-sm text-[var(--muted-fg)]">
              — {fr ? "Clinique dentaire, Laval" : "Dental clinic, Laval"}
              <span className="ml-2 rounded-md bg-[var(--muted)] px-2 py-0.5 text-xs">
                {fr ? "Entrevue pilote" : "Pilot interview"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
