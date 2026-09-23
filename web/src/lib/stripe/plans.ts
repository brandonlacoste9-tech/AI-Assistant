export type PlanId = "starter" | "pro";
export type BillingInterval = "month" | "year";

/**
 * Paid tiers: Starter $49 and Pro $149, both self-serve.
 * Pro keeps the White Glove Stripe price env names — those are the price IDs
 * this app already reads. STRIPE_PRICE_PRO_* and STRIPE_PRICE_PREMIUM_* are unused.
 */
const PRICE_ENV: Record<PlanId, Record<BillingInterval, string>> = {
  starter: {
    month: "STRIPE_PRICE_STARTER_MONTHLY",
    year: "STRIPE_PRICE_STARTER_ANNUAL",
  },
  pro: {
    month: "STRIPE_PRICE_WHITE_GLOVE_MONTHLY",
    year: "STRIPE_PRICE_WHITE_GLOVE_ANNUAL",
  },
};

/** Plan written on signup. Trial length is trial_ends_at (7 days), not a third paid tier. */
export const SIGNUP_PLAN: PlanId = "starter";

export function getPriceId(plan: PlanId, interval: BillingInterval): string | null {
  const envKey = PRICE_ENV[plan]?.[interval];
  if (!envKey) return null;
  return process.env[envKey]?.trim() || null;
}

export function planFromPriceId(priceId: string): PlanId | null {
  for (const plan of Object.keys(PRICE_ENV) as PlanId[]) {
    for (const interval of ["month", "year"] as BillingInterval[]) {
      if (getPriceId(plan, interval) === priceId) return plan;
    }
  }
  return null;
}

export function isValidPlan(plan: string): plan is PlanId {
  return plan === "starter" || plan === "pro";
}

/** Map checkout/query input onto a billable plan. Legacy names buy Pro. */
export function coercePlan(raw: string | null | undefined): PlanId | null {
  if (!raw) return null;
  if (raw === "starter") return "starter";
  if (raw === "pro" || raw === "white_glove" || raw === "premium") return "pro";
  return null;
}

/** Value safe to persist on businesses.plan / subscriptions.plan. */
export function persistablePlan(raw: string | null | undefined): PlanId {
  return coercePlan(raw) ?? "starter";
}

export function remainingTrialDays(trialEndsAt: string | null): number {
  if (!trialEndsAt) return 0;
  const end = new Date(trialEndsAt).getTime();
  const now = Date.now();
  if (end <= now) return 0;
  return Math.ceil((end - now) / 86_400_000);
}
