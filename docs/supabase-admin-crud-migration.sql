-- ============================================================
-- Marhaban Canada — Migration Admin CRUD v1
-- Ajoute le support soft-delete via status = 'archived' pour
-- bookings et scam_checks.
--
-- NE PAS exécuter sans avoir lu les commentaires.
-- Exécuter dans : Supabase Dashboard > SQL Editor
-- Pré-requis : supabase-migration-v1.sql déjà appliqué.
-- ============================================================

-- ============================================================
-- OBJECTIFS
-- ============================================================
--
-- 1. Ajouter 'archived' dans le CHECK de bookings.status
--    pour permettre l'archivage soft-delete depuis l'admin.
--
-- 2. Ajouter 'archived' dans le CHECK de scam_checks.status
--    idem.
--
-- 3. Ajouter la colonne archived_at (timestamptz) sur bookings
--    et scam_checks pour traçabilité optionnelle.
--
-- Les tables case_files et resources ont déjà 'archived' dans
-- leur CHECK de status — pas de changement nécessaire.
--
-- ============================================================
-- IDEMPOTENCE
-- ============================================================
--
-- La modification d'un CHECK constraint PostgreSQL requiert :
--   DROP CONSTRAINT + ADD CONSTRAINT
-- Ces opérations sont idempotentes grâce aux noms explicites.
--
-- La colonne archived_at est ajoutée via ADD COLUMN IF NOT EXISTS.
--
-- ============================================================

-- ============================================================
-- 1. bookings — ajouter 'archived' au status CHECK
-- ============================================================

ALTER TABLE public.bookings
  DROP CONSTRAINT IF EXISTS bookings_status_check;

ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_status_check
    CHECK (status IN (
      'new',
      'to_contact',
      'slot_proposed',
      'confirmed',
      'completed',
      'cancelled',
      'archived'
    ));

ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS archived_at timestamptz;

CREATE INDEX IF NOT EXISTS bookings_archived_at_idx
  ON public.bookings (archived_at)
  WHERE archived_at IS NOT NULL;


-- ============================================================
-- 2. scam_checks — ajouter 'archived' au status CHECK
-- ============================================================

ALTER TABLE public.scam_checks
  DROP CONSTRAINT IF EXISTS scam_checks_status_check;

ALTER TABLE public.scam_checks
  ADD CONSTRAINT scam_checks_status_check
    CHECK (status IN (
      'new',
      'reviewing',
      'responded',
      'closed',
      'archived'
    ));

ALTER TABLE public.scam_checks
  ADD COLUMN IF NOT EXISTS archived_at timestamptz;

CREATE INDEX IF NOT EXISTS scam_checks_archived_at_idx
  ON public.scam_checks (archived_at)
  WHERE archived_at IS NOT NULL;


-- ============================================================
-- FIN DE LA MIGRATION Admin CRUD v1
-- ============================================================
--
-- Vérification post-migration :
--   SELECT conname, pg_get_constraintdef(oid)
--   FROM pg_constraint
--   WHERE conrelid = 'public.bookings'::regclass
--     AND contype = 'c';
--
--   SELECT conname, pg_get_constraintdef(oid)
--   FROM pg_constraint
--   WHERE conrelid = 'public.scam_checks'::regclass
--     AND contype = 'c';
--
-- Les deux doivent inclure 'archived'.
-- ============================================================
