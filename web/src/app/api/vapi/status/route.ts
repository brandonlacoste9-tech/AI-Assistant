import { getVapiPublicKey, isVapiConfigured } from "@/lib/vapi/config";
import { listAssistants } from "@/lib/vapi/client";
import { NextResponse } from "next/server";

export async function GET() {
  if (!isVapiConfigured()) {
    return NextResponse.json({
      configured: false,
      public_key_set: Boolean(getVapiPublicKey()),
    });
  }

  const { data, error, status } = await listAssistants();

  return NextResponse.json({
    configured: true,
    public_key_set: Boolean(getVapiPublicKey()),
    api_reachable: !error && status === 200,
    assistant_count: Array.isArray(data) ? data.length : 0,
    error: error ?? undefined,
  });
}