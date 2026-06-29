-- ============================================================
-- Marhaban Canada — Migration Supabase v2
-- Table : booking_preparation_forms
--
-- Exécuter dans : Supabase Dashboard > SQL Editor
-- Pré-requis : Migration v1 déjà exécutée (fonction update_updated_at)
-- ============================================================

-- ============================================================
-- RISQUES AVANT EXÉCUTION
-- ============================================================
--
-- 1. DONNÉES PERSONNELLES
--    Cette table stocke des noms, emails, téléphones et situations personnelles.
--    S'assurer que la politique de rétention est définie avant d'insérer des données réelles.
--
-- 2. RLS PAR DÉFAUT = TOUT BLOQUÉ (SAUF service_role)
--    RLS est activée. Les insertions publiques passent par l'API route Next.js
--    qui utilise SUPABASE_SERVICE_ROLE_KEY côté serveur uniquement.
--    Ne jamais exposer SUPABASE_SERVICE_ROLE_KEY côté client.
--
-- 3. IDEMPOTENCE
--    Le script utilise IF NOT EXISTS / DO $$ ... IF NOT EXISTS.
--    Réexécuter le script ne duplique pas les tables ni les triggers.
--
-- ============================================================


-- ============================================================
-- 0. Ensure shared trigger function exists (idempotent)
-- ============================================================

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


-- ============================================================
-- 1. booking_preparation_forms
-- Source : /[locale]/reserver/formulaire
-- Flow : form → Supabase → optional Calendly redirect → webhook update
-- ============================================================

CREATE TABLE IF NOT EXISTS public.booking_preparation_forms (
  id                          uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at                  timestamptz   NOT NULL DEFAULT now(),
  updated_at                  timestamptz,

  -- Locale
  locale                      text          NOT NULL DEFAULT 'fr'
    CHECK (locale IN ('fr', 'en', 'ar')),

  -- Section 1: Identité
  first_name                  text          NOT NULL,
  last_name                   text          NOT NULL,
  email                       text          NOT NULL,
  phone                       text,

  -- Section 2: Situation
  location_status             text          NOT NULL,
  general_status              text,
  needs                       text[]        NOT NULL,
  situation                   text          NOT NULL,

  -- Section 3: Appel
  main_question               text,
  urgency                     text,
  availability                text          NOT NULL,
  preferred_contact_method    text          NOT NULL,

  -- Section 4: Consentement
  consent                     boolean       NOT NULL DEFAULT false,
  marketing_consent           boolean       NOT NULL DEFAULT false,
  privacy_notice_accepted     boolean       NOT NULL DEFAULT false,

  -- Metadata
  source                      text          NOT NULL DEFAULT 'booking_form',
  ip_hash                     text,         -- SHA-256 hash of client IP, never raw
  user_agent                  text,

  -- Data retention (Law 25 / PIPEDA — review and delete/anonymize after this date)
  retention_until             timestamptz,  -- set to created_at + 12 months at insert time
  deleted_at                  timestamptz,  -- soft-delete marker

  -- Workflow
  status                      text          NOT NULL DEFAULT 'form_submitted'
    CHECK (status IN (
      'form_submitted',
      'calendly_pending',
      'calendly_confirmed',
      'contacted',
      'confirmed_manually',
      'completed',
      'cancelled',
      'no_show'
    )),

  -- Calendly integration
  calendly_enabled            boolean       NOT NULL DEFAULT false,
  calendly_event_uri          text,
  calendly_invitee_uri        text,
  calendly_event_start_time   timestamptz,
  calendly_event_end_time     timestamptz,
  calendly_invitee_email      text,
  calendly_invitee_name       text,
  calendly_cancel_url         text,
  calendly_reschedule_url     text,
  calendly_raw_payload        jsonb
);


-- ============================================================
-- 1b. Add privacy columns to existing table (idempotent)
-- Run even if the table was created above — ALTER IF NOT EXISTS is safe.
-- ============================================================

ALTER TABLE public.booking_preparation_forms
  ADD COLUMN IF NOT EXISTS marketing_consent         boolean     NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS privacy_notice_accepted   boolean     NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS ip_hash                   text,
  ADD COLUMN IF NOT EXISTS user_agent                text,
  ADD COLUMN IF NOT EXISTS retention_until           timestamptz,
  ADD COLUMN IF NOT EXISTS deleted_at                timestamptz;


-- ============================================================
-- 2. Auto-update updated_at
-- ============================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'booking_preparation_forms_updated_at'
  ) THEN
    CREATE TRIGGER booking_preparation_forms_updated_at
      BEFORE UPDATE ON public.booking_preparation_forms
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
  END IF;
END;
$$;


-- ============================================================
-- 3. Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_bpf_created_at
  ON public.booking_preparation_forms (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_bpf_email
  ON public.booking_preparation_forms (email);

CREATE INDEX IF NOT EXISTS idx_bpf_urgency
  ON public.booking_preparation_forms (urgency)
  WHERE urgency IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_bpf_status
  ON public.booking_preparation_forms (status);

CREATE INDEX IF NOT EXISTS idx_bpf_calendly_invitee_uri
  ON public.booking_preparation_forms (calendly_invitee_uri)
  WHERE calendly_invitee_uri IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_bpf_calendly_event_uri
  ON public.booking_preparation_forms (calendly_event_uri)
  WHERE calendly_event_uri IS NOT NULL;

-- Index for data retention cleanup (find records past their retention date)
CREATE INDEX IF NOT EXISTS idx_bpf_retention_until
  ON public.booking_preparation_forms (retention_until)
  WHERE retention_until IS NOT NULL AND deleted_at IS NULL;

-- Index to filter out soft-deleted records
CREATE INDEX IF NOT EXISTS idx_bpf_active
  ON public.booking_preparation_forms (created_at DESC)
  WHERE deleted_at IS NULL;


-- ============================================================
-- 4. RLS — Row Level Security
-- ============================================================

ALTER TABLE public.booking_preparation_forms ENABLE ROW LEVEL SECURITY;

-- No public read: admin uses service_role only.
-- No public update or delete.
-- Public insert is handled server-side via service_role key.
-- No explicit policies needed for anon role — RLS blocks everything by default.
-- The service_role key bypasses RLS.


-- ============================================================
-- DONE
-- ============================================================
--
-- Webhook endpoint (configure in Calendly dashboard):
--   Local  : http://localhost:3000/api/webhooks/calendly
--   Prod   : https://marhabancanada.ca/api/webhooks/calendly
--
-- Events to subscribe to:
--   invitee.created
--   invitee.canceled
--
-- Signing key: CALENDLY_WEBHOOK_SIGNING_KEY env var
--
-- ─── Data retention (PIPEDA / Law 25) ────────────────────────────────────────
--
-- retention_until is set to created_at + 12 months at insert time.
-- TODO: schedule a periodic cleanup job that soft-deletes (sets deleted_at) or
-- hard-deletes rows where retention_until < now() and status IN
-- ('completed', 'cancelled', 'no_show').
--
-- To soft-delete expired records:
--   UPDATE public.booking_preparation_forms
--     SET deleted_at = now()
--     WHERE retention_until < now() AND deleted_at IS NULL;
--
-- To hard-delete after confirmation:
--   DELETE FROM public.booking_preparation_forms
--     WHERE deleted_at < now() - interval '30 days';
--
-- ─── Breach readiness ────────────────────────────────────────────────────────
--
-- TODO: maintain an internal incident log for any data access anomaly.
-- Under PIPEDA and Law 25, a breach creating real risk of significant harm
-- must be reported to the Privacy Commissioner of Canada and/or the
-- Commission d'accès à l'information du Québec, and affected individuals
-- must be notified.
-- ============================================================
