import { getApiUser } from "@/lib/auth/api-auth";
import { NextResponse } from "next/server";

const STAGES = ["new", "contacted", "booked", "lost"] as const;

export async function GET() {
  const auth = await getApiUser();
  if ("error" in auth) return auth.error;
  const { supabase, businessId } = auth;

  const { data, error } = await supabase
    .from("leads")
    .select("id, contact_name, contact_phone, source, pipeline_stage, notes, captured_at")
    .eq("business_id", businessId)
    .order("captured_at", { ascending: false })
    .limit(100);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ leads: data });
}

export async function POST(req: Request) {
  const auth = await getApiUser();
  if ("error" in auth) return auth.error;
  const { supabase, businessId } = auth;

  const body = await req.json();
  const { contact_name, contact_phone, source = "manual", notes } = body;

  if (!contact_name) {
    return NextResponse.json({ error: "Missing contact name" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("leads")
    .insert({
      business_id: businessId,
      contact_name,
      contact_phone: contact_phone ?? null,
      source,
      pipeline_stage: "new",
      notes: notes ?? null,
    })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, id: data.id });
}

export async function PATCH(req: Request) {
  const auth = await getApiUser();
  if ("error" in auth) return auth.error;
  const { supabase, businessId } = auth;

  const body = await req.json();
  const { id, pipeline_stage } = body;

  if (!id || !pipeline_stage || !STAGES.includes(pipeline_stage)) {
    return NextResponse.json({ error: "Invalid id or stage" }, { status: 400 });
  }

  const { error } = await supabase
    .from("leads")
    .update({ pipeline_stage })
    .eq("id", id)
    .eq("business_id", businessId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}