-- Calendar Sync: Add columns for Outlook integration, calendar feed, and external event tracking
-- This migration enables bidirectional calendar sync with Google, Outlook, and iCal feeds.

-- ─── Businesses: Outlook tokens + calendar feed ────────────────────────────────

ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS outlook_access_token TEXT,
  ADD COLUMN IF NOT EXISTS outlook_refresh_token TEXT,
  ADD COLUMN IF NOT EXISTS outlook_token_expires_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS outlook_email TEXT,
  ADD COLUMN IF NOT EXISTS calendar_provider TEXT CHECK (calendar_provider IN ('google', 'outlook', 'ics_only')),
  ADD COLUMN IF NOT EXISTS calendar_feed_token TEXT UNIQUE;

-- Index for feed token lookup (used on every calendar subscription poll)
CREATE INDEX IF NOT EXISTS idx_businesses_calendar_feed_token
  ON businesses (calendar_feed_token)
  WHERE calendar_feed_token IS NOT NULL;

-- ─── Appointments: External calendar event tracking ────────────────────────────

ALTER TABLE appointments
  ADD COLUMN IF NOT EXISTS external_calendar_id TEXT,
  ADD COLUMN IF NOT EXISTS calendar_provider TEXT CHECK (calendar_provider IN ('google', 'outlook'));

-- Index for looking up appointments by external calendar ID (for webhook-based sync)
CREATE INDEX IF NOT EXISTS idx_appointments_external_calendar_id
  ON appointments (external_calendar_id)
  WHERE external_calendar_id IS NOT NULL;

-- ─── Update source constraint to include 'calendar_sync' ───────────────────────

-- Allow appointments created from calendar sync (future: inbound sync from external calendars)
ALTER TABLE appointments
  DROP CONSTRAINT IF EXISTS appointments_source_check;

ALTER TABLE appointments
  ADD CONSTRAINT appointments_source_check
  CHECK (source IN ('phone_ai', 'web_form', 'manual', 'reschedule', 'calendar_sync'));

-- ─── RLS: Calendar feed is public (token-based auth) ───────────────────────────
-- No RLS changes needed since the feed endpoint uses service role client.
