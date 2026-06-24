import { getApiUser } from "@/lib/auth/api-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const auth = await getApiUser();
  if ("error" in auth) return auth.error;
  const { supabase, businessId } = auth;

  const limit = Math.min(Number(new URL(req.url).searchParams.get("limit") ?? 50), 100);

  const { data, error } = await supabase
    .from("conversations")
    .select(
      "id, channel, from_number, started_at, duration_seconds, outcome, summary, transcript, recovered_revenue_cents"
    )
    .eq("business_id", businessId)
    .in("channel", ["voice", "sms"])
    .order("started_at", { ascending: false })
    .limit(limit);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ conversations: data });
}

export async function DELETE(req: Request) {
  const auth = await getApiUser();
  if ("error" in auth) return auth.error;
  const { supabase, businessId } = auth;

  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const { error } = await supabase
    .from("conversations")
    .delete()
    .eq("id", id)
    .eq("business_id", businessId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}