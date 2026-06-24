"use client";

import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type BillingState = {
  plan: string;
  trialEndsAt: string | null;
  subscriptionStatus: string | null;
  currentPeriodEnd: string | null;
  hasStripeCustomer: boolean;
  stripeConfigured: boolean;
};

export function BillingCard({
  dict,
  locale,
  billing,
}: {
  dict: Dictionary;
  locale: string;
  billing: BillingState;
}) {
  const searchParams = useSearchParams();
  const canceled = searchParams.get("billing") === "canceled";
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [interval, setInterval] = useState<"month" | "year">("month");
  const t = dict.dashboard.billing;

  const trialEndLabel = billing.trialEndsAt
    ? new Date(billing.trialEndsAt).toLocaleDateString(locale === "fr" ? "fr-CA" : "en-CA")
    : null;

  const periodEndLabel = billing.currentPeriodEnd
    ? new Date(billing.currentPeriodEnd).toLocaleDateString(locale === "fr" ? "fr-CA" : "en-CA")
    : null;

  async function startCheckout(plan: string) {
    setStatus("loading");
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan, interval }),
    });
    const data = await res.json();
    if (!res.ok || !data.url) {
      setStatus("error");
      return;
    }
    window.location.href = data.url;
  }

  async function openPortal() {
    setStatus("loading");
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    const data = await res.json();
    if (!res.ok || !data.url) {
      setStatus("error");
      return;
    }
    window.location.href = data.url;
  }

  const isPastDue = billing.subscriptionStatus === "past_due";
  const hasStripeBilling =
    billing.hasStripeCustomer &&
    (billing.subscriptionStatus === "active" || billing.subscriptionStatus === "trialing");

  return (
    <div className="card mt-8 w-full min-w-0 p-6">
      <h2 className="font-semibold text-[var(--foreground)]">{t.title}</h2>
      <p className="mt-1 text-sm text-[var(--muted-fg)]">{t.subtitle}</p>

      {!billing.stripeConfigured && (
        <p className="mt-4 text-sm text-[var(--muted-fg)]">{t.notConfigured}</p>
      )}

      {billing.stripeConfigured && (
        <>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="grid gap-1 sm:grid-cols-[auto_1fr] sm:gap-4">
              <dt className="text-[var(--muted-fg)]">{t.currentPlan}</dt>
              <dd className="font-medium capitalize text-[var(--foreground)]">{billing.plan}</dd>
            </div>
            {trialEndLabel && !billing.hasStripeCustomer && (
              <div className="grid gap-1 sm:grid-cols-[auto_1fr] sm:gap-4">
                <dt className="text-[var(--muted-fg)]">{t.trialEnds}</dt>
                <dd className="font-medium text-[var(--foreground)]">{trialEndLabel}</dd>
              </div>
            )}
            {periodEndLabel && hasStripeBilling && (
              <div className="grid gap-1 sm:grid-cols-[auto_1fr] sm:gap-4">
                <dt className="text-[var(--muted-fg)]">{t.nextBilling}</dt>
                <dd className="font-medium text-[var(--foreground)]">{periodEndLabel}</dd>
              </div>
            )}
            {billing.subscriptionStatus && (
              <div className="grid gap-1 sm:grid-cols-[auto_1fr] sm:gap-4">
                <dt className="text-[var(--muted-fg)]">{t.status}</dt>
                <dd className="font-medium capitalize text-[var(--foreground)]">
                  {t.statuses[billing.subscriptionStatus as keyof typeof t.statuses] ??
                    billing.subscriptionStatus}
                </dd>
              </div>
            )}
          </dl>

          {canceled && (
            <p className="mt-4 text-sm text-[var(--muted-fg)]">{t.checkoutCanceled}</p>
          )}

          {isPastDue && (
            <p className="mt-4 text-sm font-medium text-red-600">{t.pastDue}</p>
          )}

          {!billing.hasStripeCustomer && !isPastDue && trialEndLabel && (
            <p className="mt-4 text-sm text-amber-700">{t.trialBanner}</p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className={`rounded-lg px-3 py-1.5 text-sm ${interval === "month" ? "bg-[var(--primary)] text-white" : "bg-[var(--muted)]"}`}
              onClick={() => setInterval("month")}
            >
              {t.monthly}
            </button>
            <button
              type="button"
              className={`rounded-lg px-3 py-1.5 text-sm ${interval === "year" ? "bg-[var(--primary)] text-white" : "bg-[var(--muted)]"}`}
              onClick={() => setInterval("year")}
            >
              {t.annual}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {billing.hasStripeCustomer ? (
              <Button type="button" variant="secondary" disabled={status === "loading"} onClick={openPortal}>
                {t.manageBilling}
              </Button>
            ) : (
              <>
                {(["starter", "pro", "premium"] as const).map((plan) => (
                  <Button
                    key={plan}
                    type="button"
                    variant={plan === "pro" ? "primary" : "secondary"}
                    disabled={status === "loading"}
                    onClick={() => startCheckout(plan)}
                  >
                    {t.subscribe} {plan}
                  </Button>
                ))}
              </>
            )}
          </div>

          {status === "error" && <p className="mt-3 text-sm text-red-600">{t.error}</p>}
        </>
      )}
    </div>
  );
}