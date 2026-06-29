-- ============================================================
-- Marhaban Canada — Migration Supabase — Admin Upgrade
-- Compatibilité : admin back-office v2 (juin 2026)
--
-- Prérequis : migration v1 déjà appliquée (supabase-migration-v1.sql)
-- Sécurité : toutes les tables ont RLS activée.
--             Seul SUPABASE_SERVICE_ROLE_KEY contourne la RLS.
-- Idempotence : toutes les instructions utilisent IF NOT EXISTS.
--               Ce script peut être réexécuté sans risque.
-- ============================================================


-- ============================================================
-- 1. booking_preparation_forms — table principale des demandes
-- ============================================================
-- Cette table reçoit les soumissions du BookingWizardCore (modal public).
-- Elle n'existait pas en v1 et doit être créée si absente.

CREATE TABLE IF NOT EXISTS booking_preparation_forms (
  id                         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at                 TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                 TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at                 TIMESTAMPTZ,

  -- Identité
  first_name                 TEXT NOT NULL,
  email                      TEXT NOT NULL,
  phone                      TEXT,

  -- Besoins et contact
  needs                      TEXT[]  NOT NULL DEFAULT '{}',
  preferred_contact_method   TEXT    NOT NULL DEFAULT 'no_preference',

  -- Consentement
  privacy_notice_accepted    BOOLEAN NOT NULL DEFAULT TRUE,
  marketing_consent          BOOLEAN NOT NULL DEFAULT FALSE,

  -- Statut de traitement admin
  status                     TEXT    NOT NULL DEFAULT 'form_submitted',
  source                     TEXT    NOT NULL DEFAULT 'booking_modal',

  -- Notes libres admin
  admin_notes                TEXT
);

-- Trigger updated_at (réutilise la fonction définie en v1)
CREATE OR REPLACE TRIGGER booking_preparation_forms_updated_at
  BEFORE UPDATE ON booking_preparation_forms
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Index performances
CREATE INDEX IF NOT EXISTS idx_bpf_status    ON booking_preparation_forms (status);
CREATE INDEX IF NOT EXISTS idx_bpf_created   ON booking_preparation_forms (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bpf_email     ON booking_preparation_forms (email);
CREATE INDEX IF NOT EXISTS idx_bpf_deleted   ON booking_preparation_forms (deleted_at) WHERE deleted_at IS NULL;

-- RLS
ALTER TABLE booking_preparation_forms ENABLE ROW LEVEL SECURITY;

-- Permet l'insertion publique (clé anon) depuis le modal
-- Pas de lecture via anon : admin only (service_role)
DROP POLICY IF EXISTS "public_insert_prep_forms" ON booking_preparation_forms;
CREATE POLICY "public_insert_prep_forms"
  ON booking_preparation_forms FOR INSERT
  TO anon
  WITH CHECK (true);


-- ============================================================
-- 2. Colonnes optionnelles à ajouter en toute sécurité
-- ============================================================
-- Ces colonnes peuvent manquer si la table a été créée manuellement.
-- ADD COLUMN IF NOT EXISTS est idempotent.

ALTER TABLE booking_preparation_forms
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS marketing_consent BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS privacy_notice_accepted BOOLEAN NOT NULL DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS admin_notes TEXT;


-- ============================================================
-- 3. admin_notes — enrichissements v2
-- ============================================================
-- La table admin_notes existe depuis v1. On ajoute target_type 'booking'
-- à la check constraint si elle existe, sinon rien à faire
-- (Supabase ne permet pas ALTER CONSTRAINT facilement — voir note ci-dessous).

-- Note : si une CHECK constraint limite target_type, vérifier qu'elle
-- inclut 'booking'. Si besoin, la supprimer et la recréer :
--
--   ALTER TABLE admin_notes DROP CONSTRAINT IF EXISTS admin_notes_target_type_check;
--   ALTER TABLE admin_notes ADD CONSTRAINT admin_notes_target_type_check
--     CHECK (target_type IN ('booking','case_file','scam_check','resource'));
--
-- Sinon ignorer — la colonne est TEXT et accepte tout sans constraint.


-- ============================================================
-- 4. case_files — colonnes supplémentaires v2
-- ============================================================

ALTER TABLE case_files
  ADD COLUMN IF NOT EXISTS prep_form_id UUID REFERENCES booking_preparation_forms(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS internal_tags TEXT[] DEFAULT '{}';

CREATE INDEX IF NOT EXISTS idx_cf_prep_form ON case_files (prep_form_id) WHERE prep_form_id IS NOT NULL;


-- ============================================================
-- 5. bookings — soft-delete si absent
-- ============================================================

ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_bookings_deleted ON bookings (deleted_at) WHERE deleted_at IS NULL;


-- ============================================================
-- 6. scam_checks — colonnes statut enrichi
-- ============================================================

ALTER TABLE scam_checks
  ADD COLUMN IF NOT EXISTS resolved_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS resolved_by TEXT;

CREATE INDEX IF NOT EXISTS idx_scam_resolved ON scam_checks (resolved_at) WHERE resolved_at IS NOT NULL;


-- ============================================================
-- 7. Rechargement du cache de schéma Supabase
-- ============================================================
-- À exécuter si PostgREST retourne PGRST205 (table not found)
-- après la création de booking_preparation_forms.
-- Supabase Dashboard > SQL Editor :

NOTIFY pgrst, 'reload schema';

-- Alternative via API REST (depuis un terminal) :
--   curl -X POST https://<project-ref>.supabase.co/rest/v1/rpc/reload_schema \
--        -H "apikey: <SUPABASE_SERVICE_ROLE_KEY>"
--
-- Ou : Supabase Dashboard > Settings > API > "Reload schema cache"


-- ============================================================
-- FIN DE MIGRATION
-- ============================================================
-- Vérification après exécution :
--   SELECT table_name FROM information_schema.tables
--     WHERE table_schema = 'public' ORDER BY table_name;
--
-- Tester l'accès (remplacer l'URL et la clé) :
--   curl "https://<ref>.supabase.co/rest/v1/booking_preparation_forms?select=id&limit=1" \
--        -H "apikey: <ANON_KEY>"        -- doit retourner [] ou 401 (pas 404)
-- ============================================================
