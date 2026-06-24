import {
  getTwilioAccountSid,
  getTwilioAuthToken,
  getTwilioMessagingServiceSid,
  getTwilioPhoneNumber,
  isTwilioConfigured,
} from "@/lib/twilio/config";
import twilio from "twilio";

export function getTwilioClient() {
  const accountSid = getTwilioAccountSid();
  const authToken = getTwilioAuthToken();
  if (!accountSid || !authToken) return null;
  return twilio(accountSid, authToken);
}

export type SendSmsResult =
  | { ok: true; sid: string }
  | { ok: false; error: string };

export async function sendSms(to: string, body: string): Promise<SendSmsResult> {
  if (!isTwilioConfigured()) {
    return { ok: false, error: "Twilio not configured" };
  }

  const client = getTwilioClient();
  if (!client) {
    return { ok: false, error: "Invalid Twilio credentials" };
  }

  const messagingServiceSid = getTwilioMessagingServiceSid();
  const fromNumber = getTwilioPhoneNumber();

  try {
    const message = await client.messages.create({
      to,
      body,
      ...(messagingServiceSid
        ? { messagingServiceSid }
        : { from: fromNumber! }),
    });
    return { ok: true, sid: message.sid };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "SMS send failed";
    return { ok: false, error: msg };
  }
}