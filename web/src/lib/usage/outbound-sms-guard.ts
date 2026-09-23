import { computeUsageFromSource } from "@/lib/usage/compute-usage";
import { getPlanLimits, isUsageEnforcementEnabled } from "@/lib/usage/plan-limits";
import { resolveBusinessPlan } from "@/lib/usage/resolve-plan";
import { getSupabaseService } from "@/lib/supabase/server";

const ENFORCE_MULTIPLIER = 2;

export { isUsageEnforcementEnabled };

export type OutboundSmsGuardResult =
  | { allowed: true }
  | { allowed: false; reason: "sms_limit"; used: number; limit: number };

/**
 * Outbound-only guard. Inbound SMS is unaffected.
 * Enforcement is on unless USAGE_ENFORCE=false. Blocks at 200% of the plan SMS cap.
 * A null cap is unlimited. A zero cap blocks — it is not a silent unlimited fallback.
 */
export async function checkOutboundSmsAllowed(
  businessId: string
): Promise<OutboundSmsGuardResult> {
  if (!isUsageEnforcementEnabled()) return { allowed: true };

  const db = getSupabaseService();
  if (!db) return { allowed: true };

  const plan = await resolveBusinessPlan(db, businessId);
  const smsLimit = getPlanLimits(plan).sms;
  if (smsLimit === null) return { allowed: true };
  if (smsLimit <= 0) {
    return { allowed: false, reason: "sms_limit", used: 0, limit: smsLimit };
  }

  const computed = await computeUsageFromSource(db, businessId);
  const { data: counter } = await db
    .from("usage_counters")
    .select("sms_count")
    .eq("business_id", businessId)
    .eq("period_start", computed.periodStart)
    .maybeSingle();

  const used = computed.inboundSms + (counter?.sms_count ?? 0);
  const threshold = smsLimit * ENFORCE_MULTIPLIER;

  if (used >= threshold) {
    console.warn(
      `[usage] Outbound SMS blocked for ${businessId}: ${used}/${smsLimit} (enforce @ ${ENFORCE_MULTIPLIER}x)`
    );
    return { allowed: false, reason: "sms_limit", used, limit: smsLimit };
  }

  return { allowed: true };
}

export type VoiceGuardResult =
  | { allowed: true }
  | { allowed: false; reason: "voice_limit"; used: number; limit: number };

/** Block new voice minutes once usage is at 200% of the plan cap. */
export async function checkVoiceMinutesAllowed(
  businessId: string
): Promise<VoiceGuardResult> {
  if (!isUsageEnforcementEnabled()) return { allowed: true };

  const db = getSupabaseService();
  if (!db) return { allowed: true };

  const plan = await resolveBusinessPlan(db, businessId);
  const voiceLimit = getPlanLimits(plan).voiceMinutes;
  if (voiceLimit === null) return { allowed: true };
  if (voiceLimit <= 0) {
    return { allowed: false, reason: "voice_limit", used: 0, limit: voiceLimit };
  }

  const computed = await computeUsageFromSource(db, businessId);
  const { data: counter } = await db
    .from("usage_counters")
    .select("voice_minutes")
    .eq("business_id", businessId)
    .eq("period_start", computed.periodStart)
    .maybeSingle();

  const used = Number(counter?.voice_minutes ?? computed.voiceMinutes);
  const threshold = voiceLimit * ENFORCE_MULTIPLIER;
  if (used >= threshold) {
    console.warn(
      `[usage] Voice minutes blocked for ${businessId}: ${used}/${voiceLimit} (enforce @ ${ENFORCE_MULTIPLIER}x)`
    );
    return { allowed: false, reason: "voice_limit", used, limit: voiceLimit };
  }
  return { allowed: true };
}