-- Add AI Persona and Bilingual capabilities

ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS ai_personality TEXT NOT NULL DEFAULT 'friendly'
    CHECK (ai_personality IN ('friendly', 'luxury', 'corporate')),
  ADD COLUMN IF NOT EXISTS bilingual_mode BOOLEAN NOT NULL DEFAULT false;
