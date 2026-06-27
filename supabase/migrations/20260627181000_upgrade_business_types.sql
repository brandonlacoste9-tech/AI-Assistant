-- Upgrade business_type check constraint to include all onboarding types
ALTER TABLE public.businesses DROP CONSTRAINT IF EXISTS businesses_business_type_check;
ALTER TABLE public.businesses ADD CONSTRAINT businesses_business_type_check CHECK (business_type IN ('salon', 'barbershop', 'clinic', 'office', 'beauty'));
