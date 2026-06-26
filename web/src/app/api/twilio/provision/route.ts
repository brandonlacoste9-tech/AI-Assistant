import { NextResponse } from "next/server";
import { getApiUser } from "@/lib/auth/api-auth";
import { provisionVoiceForBusiness } from "@/lib/vapi/provision-service";
import { getTwilioPhoneNumber } from "@/lib/twilio/config";

export async function POST() {
  const auth = await getApiUser();
  if ("error" in auth) return auth.error;
  const { businessId, supabase } = auth;

  try {
    // 1. Check if they already have a phone number in the DB
    const { data: business } = await supabase
      .from("businesses")
      .select("phone_number")
      .eq("id", businessId)
      .single();

    if (business?.phone_number) {
      return NextResponse.json({ ok: true, phoneNumber: business.phone_number });
    }

    // 2. If not, provision the voice assistant which will also attach the shared Twilio number
    const result = await provisionVoiceForBusiness(businessId);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    // 3. Get the shared Twilio number that was just assigned
    const twilioPhone = getTwilioPhoneNumber();
    if (!twilioPhone) {
      return NextResponse.json(
        { error: "No Twilio phone number configured on the server." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, phoneNumber: twilioPhone });
  } catch (error) {
    console.error("[POST /api/twilio/provision] Error:", error);
    return NextResponse.json(
      { error: "Failed to provision phone number." },
      { status: 500 }
    );
  }
}
