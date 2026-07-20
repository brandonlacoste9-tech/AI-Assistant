-- JustBookMe / RendezVous AI — FRESH PROJECT ONLY
-- Do NOT run on shared Wacke/MTLTrades Supabase (ulbfaxhsbbckotcbmslk).
-- Create a new Supabase project, paste this entire file in SQL Editor, run.
-- Generated for pilot fix 2026-07-20


-- ========== 001_initial.sql ==========
-- RendezVous AI â€” initial schema (Phase 0/1)

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Waitlist (public insert via service role API)
CREATE TABLE IF NOT EXISTS waitlist_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  staff_count TEXT,
  primary_pain TEXT,
  locale TEXT DEFAULT 'fr-CA',
  founder_code TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist_signups (email);

-- Tenancy
CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'America/Montreal',
  default_language TEXT NOT NULL DEFAULT 'fr' CHECK (default_language IN ('fr', 'en')),
  phone_number TEXT,
  stripe_customer_id TEXT UNIQUE,
  plan TEXT NOT NULL DEFAULT 'trial' CHECK (plan IN ('trial', 'starter', 'pro', 'premium')),
  trial_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'owner' CHECK (role IN ('owner', 'manager', 'staff')),
  full_name TEXT,
  phone TEXT,
  email TEXT,
  preferred_language TEXT DEFAULT 'fr',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (business_id, id)
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL UNIQUE REFERENCES businesses(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'trialing',
  plan TEXT NOT NULL DEFAULT 'pro',
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- No public access â€” API uses service role
CREATE POLICY "deny_public_waitlist" ON waitlist_signups FOR ALL USING (false);

CREATE POLICY "users_read_own_business" ON businesses FOR SELECT
  USING (
    id IN (SELECT business_id FROM users WHERE id = auth.uid())
  );

CREATE POLICY "users_read_self" ON users FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "users_read_own_subscription" ON subscriptions FOR SELECT
  USING (
    business_id IN (SELECT business_id FROM users WHERE id = auth.uid())
  );

-- ========== 002_grants_triggers.sql ==========
-- Grants, triggers, and RLS hardening (Phase 0/1)

-- updated_at helper
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER businesses_updated_at
  BEFORE UPDATE ON businesses
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Expose tables to Data API (RLS still applies)
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

GRANT SELECT ON businesses TO authenticated;
GRANT SELECT ON users TO authenticated;
GRANT SELECT ON subscriptions TO authenticated;

-- Service role used by API routes (bypasses RLS)
GRANT ALL ON waitlist_signups TO service_role;
GRANT ALL ON businesses TO service_role;
GRANT ALL ON users TO service_role;
GRANT ALL ON subscriptions TO service_role;

-- Authenticated users can read their profile row
CREATE POLICY "users_update_self" ON users
  FOR UPDATE USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Owners can update their business settings
CREATE POLICY "owners_update_business" ON businesses
  FOR UPDATE USING (
    id IN (
      SELECT business_id FROM users
      WHERE id = auth.uid() AND role IN ('owner', 'manager')
    )
  );

-- ========== 003_waitlist_public_insert.sql ==========
-- Allow anonymous waitlist signups via Data API (insert-only, no read/update/delete)
DROP POLICY IF EXISTS "deny_public_waitlist" ON waitlist_signups;

CREATE POLICY "allow_anon_waitlist_insert" ON waitlist_signups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "deny_anon_waitlist_select" ON waitlist_signups
  FOR SELECT
  TO anon, authenticated
  USING (false);

CREATE POLICY "deny_anon_waitlist_update" ON waitlist_signups
  FOR UPDATE
  TO anon, authenticated
  USING (false);

CREATE POLICY "deny_anon_waitlist_delete" ON waitlist_signups
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- ========== 004_operations.sql ==========
-- Sprint 3: onboarding fields + operations tables

ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS working_hours jsonb DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS onboarding_completed boolean NOT NULL DEFAULT false;

CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  duration_minutes INT NOT NULL DEFAULT 60,
  price_cents INT NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  preferred_language TEXT DEFAULT 'fr',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_customers_phone
  ON customers (business_id, phone) WHERE phone IS NOT NULL;

CREATE TABLE IF NOT EXISTS staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  display_name TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  staff_id UUID REFERENCES staff(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'booked'
    CHECK (status IN ('booked','confirmed','cancelled','no_show','completed')),
  source TEXT NOT NULL DEFAULT 'manual'
    CHECK (source IN ('phone_ai','web_form','manual','reschedule')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_appointments_business_day
  ON appointments (business_id, starts_at);

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  contact_name TEXT NOT NULL,
  contact_phone TEXT,
  source TEXT NOT NULL DEFAULT 'manual',
  pipeline_stage TEXT NOT NULL DEFAULT 'new'
    CHECK (pipeline_stage IN ('new','contacted','booked','lost')),
  notes TEXT,
  captured_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leads_stage ON leads (business_id, pipeline_stage);

-- RLS helper
CREATE OR REPLACE FUNCTION public.user_business_id()
RETURNS uuid AS $$
  SELECT business_id FROM public.users WHERE id = auth.uid()
$$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public;

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- services
CREATE POLICY "services_select" ON services FOR SELECT
  USING (business_id = public.user_business_id());
CREATE POLICY "services_insert" ON services FOR INSERT
  WITH CHECK (business_id = public.user_business_id());
CREATE POLICY "services_update" ON services FOR UPDATE
  USING (business_id = public.user_business_id());
CREATE POLICY "services_delete" ON services FOR DELETE
  USING (business_id = public.user_business_id());

-- customers
CREATE POLICY "customers_select" ON customers FOR SELECT
  USING (business_id = public.user_business_id());
CREATE POLICY "customers_insert" ON customers FOR INSERT
  WITH CHECK (business_id = public.user_business_id());
CREATE POLICY "customers_update" ON customers FOR UPDATE
  USING (business_id = public.user_business_id());

-- staff
CREATE POLICY "staff_select" ON staff FOR SELECT
  USING (business_id = public.user_business_id());
CREATE POLICY "staff_insert" ON staff FOR INSERT
  WITH CHECK (business_id = public.user_business_id());

-- appointments
CREATE POLICY "appointments_select" ON appointments FOR SELECT
  USING (business_id = public.user_business_id());
CREATE POLICY "appointments_insert" ON appointments FOR INSERT
  WITH CHECK (business_id = public.user_business_id());
CREATE POLICY "appointments_update" ON appointments FOR UPDATE
  USING (business_id = public.user_business_id());

-- leads
CREATE POLICY "leads_select" ON leads FOR SELECT
  USING (business_id = public.user_business_id());
CREATE POLICY "leads_insert" ON leads FOR INSERT
  WITH CHECK (business_id = public.user_business_id());
CREATE POLICY "leads_update" ON leads FOR UPDATE
  USING (business_id = public.user_business_id());

GRANT UPDATE ON businesses TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON services TO authenticated;
GRANT SELECT, INSERT, UPDATE ON customers TO authenticated;
GRANT SELECT, INSERT ON staff TO authenticated;
GRANT SELECT, INSERT, UPDATE ON appointments TO authenticated;
GRANT SELECT, INSERT, UPDATE ON leads TO authenticated;

GRANT ALL ON services TO service_role;
GRANT ALL ON customers TO service_role;
GRANT ALL ON staff TO service_role;
GRANT ALL ON appointments TO service_role;
GRANT ALL ON leads TO service_role;

-- ========== 005_conversations.sql ==========
-- Voice/SMS conversation logging (Phase 2 observability)

CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  channel TEXT NOT NULL DEFAULT 'voice'
    CHECK (channel IN ('voice', 'sms', 'web')),
  external_call_id TEXT,
  from_number TEXT,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at TIMESTAMPTZ,
  duration_seconds INT,
  outcome TEXT NOT NULL DEFAULT 'other'
    CHECK (outcome IN ('booked', 'lead_captured', 'transferred', 'dropped', 'other')),
  transcript TEXT,
  summary TEXT,
  recovered_revenue_cents INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_conversations_external_call
  ON conversations (business_id, external_call_id)
  WHERE external_call_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_conversations_business_day
  ON conversations (business_id, started_at DESC);

ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "conversations_select" ON conversations FOR SELECT
  USING (business_id = public.user_business_id());

CREATE POLICY "conversations_insert" ON conversations FOR INSERT
  WITH CHECK (business_id = public.user_business_id());

CREATE POLICY "conversations_update" ON conversations FOR UPDATE
  USING (business_id = public.user_business_id());

GRANT SELECT, INSERT, UPDATE ON conversations TO authenticated;
GRANT ALL ON conversations TO service_role;

CREATE TRIGGER conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ========== 006_business_voice.sql ==========
-- Per-business Vapi voice agent

ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS city TEXT,
  ADD COLUMN IF NOT EXISTS vapi_assistant_id TEXT,
  ADD COLUMN IF NOT EXISTS forward_to_number TEXT;

CREATE INDEX IF NOT EXISTS idx_businesses_vapi_assistant
  ON businesses (vapi_assistant_id) WHERE vapi_assistant_id IS NOT NULL;

-- ========== 007_dashboard_delete.sql ==========
-- Allow business owners to delete dashboard items

CREATE POLICY "appointments_delete" ON appointments FOR DELETE
  USING (business_id = public.user_business_id());

CREATE POLICY "leads_delete" ON leads FOR DELETE
  USING (business_id = public.user_business_id());

CREATE POLICY "conversations_delete" ON conversations FOR DELETE
  USING (business_id = public.user_business_id());

GRANT DELETE ON appointments TO authenticated;
GRANT DELETE ON leads TO authenticated;
GRANT DELETE ON conversations TO authenticated;

-- ========== 008_reminder_columns.sql ==========
-- Track reminder SMS sends without polluting appointment notes

ALTER TABLE appointments
  ADD COLUMN IF NOT EXISTS reminder_24h_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS reminder_2h_sent_at TIMESTAMPTZ;

-- ========== 009_customers_staff_usage.sql ==========
-- Batch C: customers delete, staff update/delete, usage_counters

CREATE POLICY "customers_delete" ON customers FOR DELETE
  USING (business_id = public.user_business_id());

CREATE POLICY "staff_update" ON staff FOR UPDATE
  USING (business_id = public.user_business_id());

CREATE POLICY "staff_delete" ON staff FOR DELETE
  USING (business_id = public.user_business_id());

GRANT DELETE ON customers TO authenticated;
GRANT UPDATE, DELETE ON staff TO authenticated;

CREATE TABLE IF NOT EXISTS usage_counters (
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  period_start DATE NOT NULL,
  bookings_count INT NOT NULL DEFAULT 0,
  sms_count INT NOT NULL DEFAULT 0,
  voice_minutes NUMERIC NOT NULL DEFAULT 0,
  PRIMARY KEY (business_id, period_start)
);

ALTER TABLE usage_counters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "usage_counters_select" ON usage_counters FOR SELECT
  USING (business_id = public.user_business_id());

GRANT SELECT ON usage_counters TO authenticated;
GRANT ALL ON usage_counters TO service_role;

-- ========== 010_google_calendar.sql ==========
-- Google Calendar OAuth tokens per business
ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS google_access_token TEXT,
  ADD COLUMN IF NOT EXISTS google_refresh_token TEXT,
  ADD COLUMN IF NOT EXISTS google_token_expires_at TIMESTAMPTZ;


-- ========== 010_voice_customization.sql ==========
-- Custom AI greeting and instructions per business

ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS voice_greeting TEXT,
  ADD COLUMN IF NOT EXISTS voice_instructions TEXT;

-- ========== 011_business_type.sql ==========
-- Business vertical for onboarding presets and marketing

ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS business_type TEXT NOT NULL DEFAULT 'salon'
    CHECK (business_type IN ('salon', 'trade', 'office'));

-- ========== 011_calendar_sync.sql ==========
-- Calendar Sync: Add columns for Outlook integration, calendar feed, and external event tracking
-- This migration enables bidirectional calendar sync with Google, Outlook, and iCal feeds.

-- â”€â”€â”€ Businesses: Outlook tokens + calendar feed â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

-- â”€â”€â”€ Appointments: External calendar event tracking â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

ALTER TABLE appointments
  ADD COLUMN IF NOT EXISTS external_calendar_id TEXT,
  ADD COLUMN IF NOT EXISTS calendar_provider TEXT CHECK (calendar_provider IN ('google', 'outlook'));

-- Index for looking up appointments by external calendar ID (for webhook-based sync)
CREATE INDEX IF NOT EXISTS idx_appointments_external_calendar_id
  ON appointments (external_calendar_id)
  WHERE external_calendar_id IS NOT NULL;

-- â”€â”€â”€ Update source constraint to include 'calendar_sync' â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

-- Allow appointments created from calendar sync (future: inbound sync from external calendars)
ALTER TABLE appointments
  DROP CONSTRAINT IF EXISTS appointments_source_check;

ALTER TABLE appointments
  ADD CONSTRAINT appointments_source_check
  CHECK (source IN ('phone_ai', 'web_form', 'manual', 'reschedule', 'calendar_sync'));

-- â”€â”€â”€ RLS: Calendar feed is public (token-based auth) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
-- No RLS changes needed since the feed endpoint uses service role client.


-- ========== 012_business_industry.sql ==========
-- Add industry field to businesses table to customize AI persona

ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS industry TEXT;


-- ========== 013_lead_structure.sql ==========
-- Add metadata JSONB column to leads table for structured diagnostic data

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;


-- ========== 014_rls_hardening.sql ==========
-- Fix public.user_business_id() to run safely as the invoker (not SECURITY DEFINER)
-- and add LIMIT 1 for safety.
CREATE OR REPLACE FUNCTION public.user_business_id()
RETURNS uuid AS $$
  SELECT business_id FROM public.users WHERE id = auth.uid() LIMIT 1
$$ LANGUAGE sql STABLE SET search_path = public;

-- Drop the old policy that lacked WITH CHECK
DROP POLICY IF EXISTS "owners_update_business" ON businesses;

-- Recreate with both USING (for the row selection) and WITH CHECK (to validate the new row state)
CREATE POLICY "owners_update_business" ON businesses
  FOR UPDATE USING (
    id IN (
      SELECT business_id FROM users
      WHERE id = auth.uid() AND role IN ('owner', 'manager')
    )
  )
  WITH CHECK (
    id IN (
      SELECT business_id FROM users
      WHERE id = auth.uid() AND role IN ('owner', 'manager')
    )
  );


-- ========== 20260625000000_ai_persona.sql ==========
-- Add AI Persona and Bilingual capabilities

ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS ai_personality TEXT NOT NULL DEFAULT 'friendly'
    CHECK (ai_personality IN ('friendly', 'luxury', 'corporate')),
  ADD COLUMN IF NOT EXISTS bilingual_mode BOOLEAN NOT NULL DEFAULT false;


-- ========== 20260627181000_upgrade_business_types.sql ==========
-- Upgrade business_type check constraint to include all onboarding types
ALTER TABLE public.businesses DROP CONSTRAINT IF EXISTS businesses_business_type_check;
ALTER TABLE public.businesses ADD CONSTRAINT businesses_business_type_check CHECK (business_type IN ('salon', 'barbershop', 'clinic', 'office', 'beauty'));

