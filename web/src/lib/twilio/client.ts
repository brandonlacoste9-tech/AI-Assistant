import {
  getTwilioAccountSid,
  getTwilioApiKeySecret,
  getTwilioApiKeySid,
  getTwilioAuthToken,
  getTwilioMessagingServiceSid,
  getTwilioPhoneNumber,
  hasTwilioCredentials,
  isTwilioConfigured,
} from "@/lib/twilio/config";
import twilio from "twilio";

export function getTwilioClient() {
  const accountSid = getTwilioAccountSid();
  if (!accountSid || !hasTwilioCredentials()) return null;

  const authToken = getTwilioAuthToken();
  if (authToken) return twilio(accountSid, authToken);

  const apiKeySid = getTwilioApiKeySid();
  const apiKeySecret = getTwilioApiKeySecret();
  if (apiKeySid && apiKeySecret) {
    return twilio(apiKeySid, apiKeySecret, { accountSid });
  }

  return null;
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