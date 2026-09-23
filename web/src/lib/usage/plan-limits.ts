export type UsageMetric = "bookings" | "sms" | "voiceMinutes" | "staff";

export type PlanLimits = {
  /** null = unlimited */
  bookings: number | null;
  sms: number | null;
  voiceMinutes: number | null;
  staff: number | null;
};

/**
 * Trial caps apply while the subscription status is trialing (7 days).
 * Starter $49 and Pro $149 are the only paid tiers.
 */
const PLAN_LIMITS = {
  trial: { bookings: 40, sms: 80, voiceMinutes: 30, staff: 1 },
  starter: { bookings: 100, sms: 500, voiceMinutes: 200, staff: 2 },
  pro: { bookings: null, sms: 5000, voiceMinutes: 2500, staff: null },
} as const satisfies Record<"trial" | "starter" | "pro", PlanLimits>;

export type LimitPlan = keyof typeof PLAN_LIMITS;

export function limitPlan(plan: string | null | undefined): LimitPlan {
  if (plan === "starter") return "starter";
  if (plan === "pro" || plan === "white_glove" || plan === "premium") return "pro";
  return "trial";
}

export function getPlanLimits(plan: string | null): PlanLimits {
  return PLAN_LIMITS[limitPlan(plan)];
}

export function usagePercent(used: number, limit: number | null): number | null {
  if (limit === null || limit <= 0) return null;
  return Math.min(100, Math.round((used / limit) * 100));
}

/** Unset USAGE_ENFORCE is on. Set USAGE_ENFORCE=false to disable (local only). */
export function isUsageEnforcementEnabled(): boolean {
  const raw = process.env.USAGE_ENFORCE?.trim().toLowerCase();
  if (!raw) return true;
  return raw !== "false" && raw !== "0" && raw !== "off";
}
