-- Plan taxonomy: trial | starter | pro. Drop premium / white_glove.
-- Outreach prospects: the sales-call webhook inserts here.

UPDATE public.businesses
SET plan = 'pro'
WHERE plan IN ('premium', 'white_glove');

UPDATE public.businesses
SET plan = 'starter'
WHERE plan IS NULL OR plan NOT IN ('trial', 'starter', 'pro');

UPDATE public.subscriptions
SET plan = 'pro'
WHERE plan IN ('premium', 'white_glove');

UPDATE public.subscriptions
SET plan = 'starter'
WHERE plan IS NULL OR plan NOT IN ('trial', 'starter', 'pro');

ALTER TABLE public.businesses ALTER COLUMN plan SET DEFAULT 'starter';
ALTER TABLE public.subscriptions ALTER COLUMN plan SET DEFAULT 'starter';

DO $$
DECLARE
  cname text;
BEGIN
  SELECT con.conname INTO cname
  FROM pg_constraint con
  JOIN pg_class rel ON rel.oid = con.conrelid
  JOIN pg_namespace nsp ON nsp.oid = rel.relnamespace
  WHERE nsp.nspname = 'public'
    AND rel.relname = 'businesses'
    AND con.contype = 'c'
    AND pg_get_constraintdef(con.oid) ILIKE '%plan%';
  IF cname IS NOT NULL THEN
    EXECUTE format('ALTER TABLE public.businesses DROP CONSTRAINT %I', cname);
  END IF;
END $$;

ALTER TABLE public.businesses
  ADD CONSTRAINT businesses_plan_check
  CHECK (plan IN ('trial', 'starter', 'pro'));

DO $$
DECLARE
  cname text;
BEGIN
  SELECT con.conname INTO cname
  FROM pg_constraint con
  JOIN pg_class rel ON rel.oid = con.conrelid
  JOIN pg_namespace nsp ON nsp.oid = rel.relnamespace
  WHERE nsp.nspname = 'public'
    AND rel.relname = 'subscriptions'
    AND con.contype = 'c'
    AND pg_get_constraintdef(con.oid) ILIKE '%plan%';
  IF cname IS NOT NULL THEN
    EXECUTE format('ALTER TABLE public.subscriptions DROP CONSTRAINT %I', cname);
  END IF;
END $$;

ALTER TABLE public.subscriptions
  DROP CONSTRAINT IF EXISTS subscriptions_plan_check;

ALTER TABLE public.subscriptions
  ADD CONSTRAINT subscriptions_plan_check
  CHECK (plan IN ('trial', 'starter', 'pro'));

CREATE TABLE IF NOT EXISTS public.outreach_prospects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT,
  contact_name TEXT,
  phone TEXT,
  email TEXT,
  city TEXT,
  source TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  last_contact TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS outreach_prospects_phone_unique
  ON public.outreach_prospects (phone)
  WHERE phone IS NOT NULL AND phone <> '';

ALTER TABLE public.outreach_prospects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS deny_public_outreach_prospects ON public.outreach_prospects;
CREATE POLICY deny_public_outreach_prospects ON public.outreach_prospects
  FOR ALL USING (false);
