"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

interface Props {
  fr: boolean;
}

export function RoiCalculator({ fr }: Props) {
  const [avgService, setAvgService] = useState(65);
  const [missedPerWeek, setMissedPerWeek] = useState(5);

  const monthlyLost = avgService * missedPerWeek * 4;
  const plan = 149;
  const recovered = Math.round(monthlyLost * 0.6); // AI recovers ~60%
  const roi = recovered - plan;

  const format = (n: number) =>
    new Intl.NumberFormat(fr ? "fr-CA" : "en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="card overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* Left: Quebec card */}
        <div className="bg-gradient-to-br from-[var(--primary)] to-[#2a5080] p-8 sm:p-10">
          <Sparkles className="h-6 w-6 text-[var(--accent)]" />
          <h2 className="font-display mt-4 text-2xl font-semibold text-white sm:text-3xl">
            {fr ? "Conçu pour le Québec" : "Built for Quebec"}
          </h2>
          <ul className="mt-8 space-y-4">
            {(fr
              ? [
                  "Bilingue FR/EN avec une voix naturelle",
                  "Prix en CAD, facturation TPS/TVQ",
                  "Conforme à la Loi 25",
                  "Soutien local, heures d'affaires EST/EDT",
                ]
              : [
                  "Bilingual FR/EN with native-quality voice",
                  "CAD pricing, PST/QST invoicing",
                  "Compliant with Quebec privacy law (Law 25)",
                  "Local support, business hours in EST/EDT",
                ]
            ).map((item) => (
              <li key={item} className="flex items-start gap-3 text-white/90">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                <span className="text-sm leading-relaxed sm:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: interactive calculator */}
        <div className="bg-[var(--surface)] p-8 sm:p-10">
          <SectionHeading
            title={
              fr
                ? "Combien perdez-vous par mois?"
                : "How much are you losing per month?"
            }
          />

          <div className="mt-6 space-y-5">
            {/* Avg service price */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-[var(--foreground)]">
                  {fr ? "Prix moyen par service" : "Avg. service price"}
                </label>
                <span className="text-sm font-bold text-[var(--primary)]">{format(avgService)}</span>
              </div>
              <input
                type="range"
                min={20}
                max={300}
                step={5}
                value={avgService}
                onChange={(e) => setAvgService(Number(e.target.value))}
                className="w-full accent-[var(--accent)]"
              />
              <div className="flex justify-between text-xs text-[var(--muted-fg)]">
                <span>{format(20)}</span><span>{format(300)}</span>
              </div>
            </div>

            {/* Missed calls per week */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-[var(--foreground)]">
                  {fr ? "Appels manqués / semaine" : "Missed calls / week"}
                </label>
                <span className="text-sm font-bold text-[var(--primary)]">{missedPerWeek}</span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={missedPerWeek}
                onChange={(e) => setMissedPerWeek(Number(e.target.value))}
                className="w-full accent-[var(--accent)]"
              />
              <div className="flex justify-between text-xs text-[var(--muted-fg)]">
                <span>1</span><span>30</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-xl px-4 py-3 bg-[var(--muted)]">
              <span className="text-sm text-[var(--muted-fg)]">
                {fr ? "Perdu chaque mois" : "Lost every month"}
              </span>
              <span className="font-display font-semibold text-[var(--foreground)]">
                {format(monthlyLost)}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl px-4 py-3 bg-[var(--muted)]">
              <span className="text-sm text-[var(--muted-fg)]">
                {fr ? "Récupéré par l'IA (~60%)" : "Recovered by AI (~60%)"}
              </span>
              <span className="font-display font-semibold text-[var(--foreground)]">
                {format(recovered)}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl px-4 py-3 bg-[var(--muted)]">
              <span className="text-sm text-[var(--muted-fg)]">JustBookMe</span>
              <span className="font-display font-semibold text-[var(--foreground)]">
                {format(plan)}{fr ? "/mois" : "/mo"}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl px-4 py-3 bg-[var(--teal-light)] border border-[var(--teal)]/20">
              <span className="text-sm text-[var(--muted-fg)] font-semibold">
                {fr ? "Votre gain net" : "Your net gain"}
              </span>
              <span className="font-display font-bold text-xl text-[var(--teal)]">
                {format(roi)}{fr ? "/mois" : "/mo"}
              </span>
            </div>
          </div>

          <p className="mt-4 text-xs font-medium text-[var(--primary)]">
            {fr
              ? "Un seul appel récupéré paie l'abonnement."
              : "A single recovered call pays for the subscription."}
          </p>
          <Link
            href="#pricing"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent-hover)] hover:underline"
          >
            {fr ? "Voir les forfaits" : "See plans"}
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
