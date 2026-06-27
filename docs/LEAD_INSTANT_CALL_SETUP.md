# Lead → Instant AI Call — Setup Guide

When a prospect fills out your Facebook Lead Ad form, this automation:

1. Receives the lead via Meta Webhooks (within ~5 seconds)
2. Logs them to your Supabase `outreach_prospects` table
3. Waits 10 seconds (configurable) so they can put their phone down
4. Places an outbound AI call via **Vapi** — your JustBookMe AI pitches them personally
5. Fallback to **Twilio + TwiML** if Vapi is unavailable

**Target response time: under 60 seconds from form submit to phone ringing.**

---

## Architecture

```
Meta Lead Ad form submit
  → Meta Webhooks (POST to your Netlify function URL)
  → lead-instant-call.mjs
      → Log to Supabase outreach_prospects
      → Sleep 10s
      → Vapi outbound call API  ──► Prospect's phone rings
          └─ Fallback: Twilio Calls API + TwiML
```

---

## Step 1 — Environment Variables

Add these to your Netlify environment (Site settings → Environment variables):

| Variable | Where to get it |
|---|---|
| `FB_VERIFY_TOKEN` | Make up a random string (e.g. `jbm_verify_2026`) |
| `VAPI_API_KEY` | [vapi.ai](https://vapi.ai) → Dashboard → API Keys |
| `VAPI_ASSISTANT_ID` | Vapi dashboard → your outbound sales assistant |
| `VAPI_PHONE_NUMBER_ID` | Vapi dashboard → Phone Numbers (your Quebec number) |
| `TWILIO_ACCOUNT_SID` | [twilio.com/console](https://console.twilio.com) |
| `TWILIO_AUTH_TOKEN` | Twilio console |
| `TWILIO_FROM_NUMBER` | Your Quebec Twilio number (e.g. `+15141234567`) |
| `TWILIO_TWIML_URL` | URL of your TwiML Bin (see Step 4 below) |
| `SUPABASE_URL` | Already in your env |
| `SUPABASE_SERVICE_ROLE_KEY` | Already in your env |
| `LEAD_CALL_DELAY_SECONDS` | `10` (optional, default 10) |

---

## Step 2 — Create Your Vapi Outbound Assistant

1. Go to [vapi.ai](https://vapi.ai) → **Assistants** → **Create Assistant**
2. Name it: `JustBookMe Outbound Lead Caller`
3. Model: GPT-4o or Claude 3.5 Sonnet
4. Voice: Choose a natural French-Canadian voice (Vapi has `fr-CA` options)
5. The system prompt is **injected dynamically per lead** by the webhook — leave the default system prompt blank or set a basic fallback
6. Enable **End Call Function** so the AI can hang up gracefully
7. Copy the **Assistant ID** → add to env as `VAPI_ASSISTANT_ID`
8. Under **Phone Numbers** → add your Quebec number → copy the **Phone Number ID** → add as `VAPI_PHONE_NUMBER_ID`

---

## Step 3 — Register the Meta Webhook

1. Go to [Meta for Developers](https://developers.facebook.com) → your app → **Webhooks**
2. Click **Add Subscription** → select **leadgen**
3. **Callback URL:** `https://your-site.netlify.app/.netlify/functions/lead-instant-call`
4. **Verify Token:** paste your `FB_VERIFY_TOKEN` value
5. Click **Verify and Save** — Meta will send a GET request to confirm
6. Subscribe to your **Page** under the leadgen subscription

**Alternative (no-code):** Use [Pipedream](https://pipedream.com) as a relay:
- Create a workflow: **Facebook Lead Ads → HTTP POST** to your Netlify function
- Pipedream handles the Meta OAuth and webhook verification for you

---

## Step 4 — Twilio TwiML Fallback (Optional)

If you want a Twilio fallback voice script while Vapi is being set up:

1. Go to [Twilio Console](https://console.twilio.com) → **TwiML Bins** → **Create**
2. Paste this TwiML:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say language="fr-CA" voice="Polly.Lea">
    Bonjour! C'est Brandon de JustBookMe. Vous venez de remplir notre formulaire
    et je voulais vous rejoindre rapidement. Rappellez-nous au 514-XXX-XXXX
    ou visitez justbookme.ca pour réserver votre essai gratuit. Merci et bonne journée!
  </Say>
</Response>
```

3. Save → copy the **TwiML Bin URL** → add as `TWILIO_TWIML_URL`

---

## Step 5 — Facebook Lead Ad Form Setup

When creating your Instant Form in Meta Ads Manager, use these exact field names so the webhook parses them correctly:

| Field label (FR) | Field label (EN) | Field name (internal) |
|---|---|---|
| Prénom | First name | `first_name` |
| Nom | Last name | `last_name` |
| Téléphone | Phone number | `phone_number` |
| Courriel | Email | `email` |
| Nom de l'entreprise | Business name | `business_name` |
| Ville | City | `city` |
| Langue préférée | Preferred language | `preferred_language` |

Keep the form to **4 fields max** for conversion rate. Recommended minimal set:
1. First name (pre-filled by Meta)
2. Phone number (pre-filled by Meta)
3. Business name (custom question)
4. "How many staff do you have?" → dropdown: 1-2 / 3-5 / 6-8

---

## Step 6 — Test the Full Flow

```bash
# Simulate a Meta webhook POST locally (requires Netlify CLI)
netlify dev

curl -X POST http://localhost:8888/.netlify/functions/lead-instant-call \
  -H "Content-Type: application/json" \
  -d '{
    "object": "page",
    "entry": [{
      "changes": [{
        "field": "leadgen",
        "value": {
          "leadgen_id": "test_001",
          "page_id": "your_page_id",
          "form_id": "your_form_id",
          "field_data": [
            {"name": "first_name", "values": ["Marie"]},
            {"name": "phone_number", "values": ["5141234567"]},
            {"name": "business_name", "values": ["Salon Freyja"]},
            {"name": "city", "values": ["Montréal"]},
            {"name": "preferred_language", "values": ["fr"]}
          ]
        }
      }]
    }]
  }'
```

Expected response:
```json
{ "ok": true, "results": [{ "lead": "+15141234567", "status": "fulfilled", "value": { "provider": "vapi", "callId": "..." } }] }
```

---

## Step 7 — Monitor & Improve

### Metrics to track (weekly)
| Metric | Target |
|---|---|
| Leads received | All |
| Calls connected (answered) | > 40% |
| Calls > 60 seconds | > 25% |
| Demo bookings from call | > 10% of connected |
| Cost per booked demo | < $50 CAD |

### Supabase query to check lead pipeline
```sql
SELECT status, COUNT(*) as count
FROM outreach_prospects
WHERE source = 'facebook_lead_ad'
GROUP BY status
ORDER BY count DESC;
```

---

## Frequently Asked Questions

**Q: Is it legal to auto-call leads in Quebec?**
A: Yes — they explicitly consented by filling your lead form. Include consent language in your Instant Form intro: "En soumettant ce formulaire, vous acceptez d'être contacté par JustBookMe par téléphone." This also satisfies CASL.

**Q: What if they don't answer?**
A: Vapi will leave a voicemail automatically. Follow up with an SMS via Twilio 30 minutes later (add a second step to the webhook).

**Q: Can I add an SMS follow-up?**
A: Yes — after the `callViaVapi()` call, add a Twilio SMS:
```js
// Send SMS 30 min after call attempt
await scheduleDelayedSMS(lead, 30 * 60 * 1000);
```

**Q: How do I handle the same lead twice?**
A: The Supabase insert uses `Prefer: resolution=merge-duplicates` — it upserts on phone number, so duplicates are handled.

**Q: Can the AI book a demo directly on the call?**
A: Yes — add a Vapi Tool that calls your Calendly/Cal.com API to check availability and book a slot during the conversation. See Vapi docs → Tools → HTTP Request.
