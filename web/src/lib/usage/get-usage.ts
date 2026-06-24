import { getPlanLimits } from "@/lib/usage/plan-limits";
import type { SupabaseClient } from "@supabase/supabase-js";

export type UsageSnapshot = {
  periodStart: string;
  bookings: number;
  sms: number;
  voiceMinutes: number;
  staff: number;
  limits: ReturnType<typeof getPlanLimits>;
};

function currentPeriodStart(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}-01`;
}

function periodEndIso(periodStart: string): string {
  const [y, m] = periodStart.split("-").map(Number);
  const end = new Date(y, m, 1);
  return end.toISOString();
}

export async function getUsageSnapshot({
  supabase,
  businessId,
  plan,
}: {
  supabase: SupabaseClient;
  businessId: string;
  plan: string;
}): Promise<UsageSnapshot> {
  const periodStart = currentPeriodStart();
  const periodEnd = periodEndIso(periodStart);

  const { data: counter } = await supabase
    .from("usage_counters")
    .select("bookings_count, sms_count, voice_minutes")
    .eq("business_id", businessId)
    .eq("period_start", periodStart)
    .maybeSingle();

  let bookings = counter?.bookings_count ?? 0;
  let sms = counter?.sms_count ?? 0;
  let voiceMinutes = Number(counter?.voice_minutes ?? 0);

  if (!counter) {
    const [{ count: bookingCount }, { count: smsCount }, { data: voiceRows }, { count: staffCount }] =
      await Promise.all([
        supabase
          .from("appointments")
          .select("id", { count: "exact", head: true })
          .eq("business_id", businessId)
          .gte("created_at", periodStart)
          .lt("created_at", periodEnd)
          .neq("status", "cancelled"),
        supabase
          .from("conversations")
          .select("id", { count: "exact", head: true })
          .eq("business_id", businessId)
          .eq("channel", "sms")
          .gte("started_at", periodStart)
          .lt("started_at", periodEnd),
        supabase
          .from("conversations")
          .select("duration_seconds")
          .eq("business_id", businessId)
          .eq("channel", "voice")
          .gte("started_at", periodStart)
          .lt("started_at", periodEnd),
        supabase
          .from("staff")
          .select("id", { count: "exact", head: true })
          .eq("business_id", businessId)
          .eq("active", true),
      ]);

    bookings = bookingCount ?? 0;
    sms = smsCount ?? 0;
    voiceMinutes =
      (voiceRows ?? []).reduce((sum, r) => sum + (Number(r.duration_seconds) || 0), 0) / 60;
    return {
      periodStart,
      bookings,
      sms,
      voiceMinutes: Math.round(voiceMinutes * 10) / 10,
      staff: staffCount ?? 0,
      limits: getPlanLimits(plan),
    };
  }

  const { count: staffCount } = await supabase
    .from("staff")
    .select("id", { count: "exact", head: true })
    .eq("business_id", businessId)
    .eq("active", true);

  return {
    periodStart,
    bookings,
    sms,
    voiceMinutes: Math.round(voiceMinutes * 10) / 10,
    staff: staffCount ?? 0,
    limits: getPlanLimits(plan),
  };
}