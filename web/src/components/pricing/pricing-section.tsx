"use client";

import { getDictionary, PLAN_PRICES } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type PlanKey = keyof typeof PLAN_PRICES;

export function PricingSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const [annual, setAnnual] = useState(false);

  const plans: { key: PlanKey; popular?: boolean }[] = [
    { key: "starter" },
    { key: "pro", popular: true },
    { key: "premium" },
  ];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.pricing.title}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--muted-fg)]">{t.pricing.subtitle}</p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-white p-1">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                !annual && "bg-[var(--primary)] text-white"
              )}
            >
              {t.pricing.monthly}
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                annual && "bg-[var(--primary)] text-white"
              )}
            >
              {t.pricing.annual}
              <span className="ml-1 text-xs opacity-80">({t.pricing.save})</span>
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map(({ key, popular }) => {
            const prices = PLAN_PRICES[key];
            const monthlyDisplay = annual
              ? Math.round(prices.annual / 12)
              : prices.monthly;
            const planCopy = t.pricing.plans[key];

            return (
              <div
                key={key}
                className={cn(
                  "relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm",
                  popular
                    ? "border-[var(--primary)] ring-2 ring-[var(--primary-light)]"
                    : "border-[var(--border)]"
                )}
              >
                {popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--primary)] px-3 py-0.5 text-xs font-medium text-white">
                    {t.pricing.popular}
                  </span>
                )}
                <h2 className="text-lg font-semibold">{planCopy.name}</h2>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">${monthlyDisplay}</span>
                  <span className="text-[var(--muted-fg)]">{t.pricing.perMonth}</span>
                </div>
                {annual && (
                  <p className="mt-1 text-xs text-[var(--muted-fg)]">
                    ${prices.annual} {t.pricing.billedYearly}
                  </p>
                )}
                <ul className="mt-6 flex-1 space-y-3">
                  {planCopy.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/signup?plan=${key}`}
                  className={cn(
                    "mt-6 block rounded-lg py-3 text-center text-sm font-medium transition-colors",
                    popular
                      ? "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]"
                      : "border border-[var(--border)] hover:bg-[var(--muted)]"
                  )}
                >
                  {t.pricing.cta}
                </Link>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-[var(--muted-fg)]">{t.pricing.trialNote}</p>
        <p className="mt-2 text-center text-xs text-[var(--muted-fg)]">{t.pricing.taxNote}</p>

        <div className="mx-auto mt-12 max-w-2xl">
          <h2 className="text-xl font-semibold">{t.pricing.faqTitle}</h2>
          <dl className="mt-4 space-y-4">
            {t.pricing.billingFaq.map((item) => (
              <div key={item.q}>
                <dt className="font-medium">{item.q}</dt>
                <dd className="mt-1 text-sm text-[var(--muted-fg)]">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}