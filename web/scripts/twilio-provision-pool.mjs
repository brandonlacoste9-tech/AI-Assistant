#!/usr/bin/env node
/**
 * twilio-provision-pool.mjs
 *
 * Pre-purchases a pool of Twilio phone numbers for instant assignment to new businesses.
 * Usage: node scripts/twilio-provision-pool.mjs [--count N] [--area-code CODE] [--country CA]
 *
 * Requires env vars: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN
 * Optional: NEXT_PUBLIC_SITE_URL (for SMS webhook URL)
 */

import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    count: { type: "string", default: "5" },
    "area-code": { type: "string", default: "514" },
    country: { type: "string", default: "CA" },
    "dry-run": { type: "boolean", default: false },
  },
});

const COUNT = parseInt(values.count, 10);
const AREA_CODE = values["area-code"];
const COUNTRY = values.country;
const DRY_RUN = values["dry-run"];

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://justbookme.ca").replace(/\/$/, "");

if (!ACCOUNT_SID || !AUTH_TOKEN) {
  console.error("❌ Missing TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN");
  process.exit(1);
}

const headers = {
  Authorization: "Basic " + Buffer.from(`${ACCOUNT_SID}:${AUTH_TOKEN}`).toString("base64"),
};

async function searchNumbers() {
  const url = `https://api.twilio.com/2010-04-01/Accounts/${ACCOUNT_SID}/AvailablePhoneNumbers/${COUNTRY}/Local.json?AreaCode=${AREA_CODE}&Limit=${COUNT}&VoiceEnabled=true&SmsEnabled=true`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    console.error("❌ Search failed:", res.status, await res.text());
    process.exit(1);
  }
  const data = await res.json();
  return data.available_phone_numbers || [];
}

async function buyNumber(phoneNumber) {
  const smsUrl = `${SITE_URL}/api/sms/inbound`;
  const voiceUrl = `${SITE_URL}/api/vapi/webhook`;

  const body = new URLSearchParams({
    PhoneNumber: phoneNumber,
    SmsUrl: smsUrl,
    SmsMethod: "POST",
    VoiceUrl: voiceUrl,
    VoiceMethod: "POST",
    FriendlyName: `JustBookMe Pool - ${phoneNumber}`,
  });

  const url = `https://api.twilio.com/2010-04-01/Accounts/${ACCOUNT_SID}/IncomingPhoneNumbers.json`;
  const res = await fetch(url, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`  ❌ Failed to buy ${phoneNumber}:`, err);
    return null;
  }

  const data = await res.json();
  return data;
}

async function main() {
  console.log(`🔍 Searching for ${COUNT} numbers in area code ${AREA_CODE} (${COUNTRY})...`);
  const available = await searchNumbers();

  if (available.length === 0) {
    console.error(`❌ No numbers available for area code ${AREA_CODE}. Try another.`);
    process.exit(1);
  }

  console.log(`✅ Found ${available.length} available numbers:\n`);
  for (const num of available) {
    console.log(`  ${num.phone_number} — ${num.locality || ""} ${num.region || ""}`);
  }

  if (DRY_RUN) {
    console.log("\n🏁 Dry run — no numbers purchased.");
    return;
  }

  console.log(`\n💳 Purchasing ${available.length} numbers...\n`);
  const purchased = [];

  for (const num of available) {
    const result = await buyNumber(num.phone_number);
    if (result) {
      purchased.push(result.phone_number);
      console.log(`  ✅ ${result.phone_number} (SID: ${result.sid})`);
    }
  }

  console.log(`\n🎉 Done! Purchased ${purchased.length} numbers.`);
  console.log("\nNumbers ready for assignment:");
  for (const p of purchased) {
    console.log(`  ${p}`);
  }

  console.log("\n📝 Next steps:");
  console.log("  1. These numbers are now in your Twilio account");
  console.log("  2. When a new business signs up, assign one via /api/settings/buy-number");
  console.log("  3. Or manually assign in Supabase: UPDATE businesses SET phone_number = '...' WHERE id = '...'");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
