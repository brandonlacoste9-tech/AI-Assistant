import type { SupabaseClient } from "@supabase/supabase-js";
import { limitPlan } from "@/lib/usage/plan-limits";

export async function resolveBusinessPlan(
  supabase: SupabaseClient,
  businessId: string
): Promise<string> {
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("plan, status")
    .eq("business_id", businessId)
    .maybeSingle();

  // Trial window uses the trial caps, even if they clicked Pro before paying.
  if (sub?.status === "trialing") return "trial";

  if (sub?.plan && sub.status === "active") {
    return limitPlan(sub.plan);
  }

  const { data: biz } = await supabase
    .from("businesses")
    .select("plan")
    .eq("id", businessId)
    .single();

  return limitPlan(biz?.plan ?? "trial");
}