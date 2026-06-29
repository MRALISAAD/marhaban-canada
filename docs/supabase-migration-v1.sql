-- ============================================================
-- Marhaban Canada — Migration Supabase v1
-- Tables : bookings, case_files, scam_checks, resources, admin_notes
--
-- NE PAS exécuter sans avoir lu la section RISQUES ci-dessous.
-- Exécuter dans : Supabase Dashboard > SQL Editor
-- Ordre requis : bookings → case_files → scam_checks → resources → admin_notes
-- ============================================================

-- ============================================================
-- RISQUES AVANT EXÉCUTION
-- ============================================================
--
-- 1. DONNÉES PERSONNELLES
--    bookings, case_files et scam_checks stockent des noms, emails,
--    téléphones et situations personnelles. S'assurer que la politique de
--    rétention est définie et documentée avant d'y insérer des données réelles.
--
-- 2. RLS PAR DÉFAUT = TOUT BLOQUÉ (SAUF service_role)
--    RLS est activée sur toutes les tables. Sans policy explicite, la clé
--    anon ne peut ni lire ni écrire. Seul SUPABASE_SERVICE_ROLE_KEY contourne
--    la RLS — ne jamais l'exposer côté client.
--
-- 3. EXCEPTION : resources — une policy "lecture publique" est définie
--    pour les ressources publiées. Vérifier que le contenu de resources
--    ne contiendra jamais de données personnelles.
--
-- 4. CLÉS ÉTRANGÈRES — ORDRE DE MIGRATION
--    case_files.booking_id → bookings.id
--    Migrer les bookings AVANT les case_files.
--    Les IDs localStorage (local_booking_*, local_scam_*) sont des strings,
--    pas des UUID valides. Une étape d'insertion avec de nouveaux UUID sera
--    nécessaire si on migre des données existantes depuis localStorage.
--
-- 5. CHAMP disclaimer_accepted
--    Le type TypeScript Booking n'inclut pas ce champ.
--    Il est défini dans le schema draft mais pas encore collecté dans le formulaire.
--    La colonne est créée avec DEFAULT false — sans impact immédiat.
--
-- 6. IDEMPOTENCE
--    Toutes les instructions utilisent IF NOT EXISTS / CREATE OR REPLACE.
--    Réexécuter le script ne duplique pas les tables ni les triggers.
--
-- ============================================================


-- ============================================================
-- 0. Fonction trigger shared — updated_at automatique
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
-- 1. bookings
-- Correspond à : src/types/admin.ts > Booking + LocalBooking
-- Source : /fr/reserver → modal ServiceBookingModal
-- ============================================================

CREATE TABLE IF NOT EXISTS public.bookings (
  id                  uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at          timestamptz   NOT NULL DEFAULT now(),
  updated_at          timestamptz   NOT NULL DEFAULT now(),

  -- Identité demandeur
  full_name           text          NOT NULL,
  email               text          NOT NULL,
  phone               text,
  city_province       text          NOT NULL,

  -- Service demandé
  service             text          NOT NULL
    CHECK (service IN ('discovery', 'orientation', 'anti_scam')),
  service_label       text          NOT NULL,
  duration            text          NOT NULL,
  price_label         text          NOT NULL,

  -- Profil client
  client_status       text          NOT NULL
    CHECK (client_status IN ('student', 'worker', 'newcomer', 'other')),
  preferred_language  text          NOT NULL
    CHECK (preferred_language IN ('fr', 'en', 'ar')),

  -- Contenu demande
  message             text          NOT NULL,
  next_action         text,
  internal_note       text,
  disclaimer_accepted boolean       NOT NULL DEFAULT false,

  -- Workflow
  status              text          NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'to_contact', 'slot_proposed', 'confirmed', 'completed', 'cancelled')),
  source              text          NOT NULL DEFAULT 'reserver_modal'
);

CREATE INDEX IF NOT EXISTS bookings_email_idx       ON public.bookings (email);
CREATE INDEX IF NOT EXISTS bookings_status_idx      ON public.bookings (status);
CREATE INDEX IF NOT EXISTS bookings_created_at_idx  ON public.bookings (created_at DESC);

DROP TRIGGER IF EXISTS bookings_set_updated_at ON public.bookings;
CREATE TRIGGER bookings_set_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
-- Aucune policy anon : seul service_role a accès.


-- ============================================================
-- 2. case_files
-- Correspond à : src/types/admin.ts > CaseFile
-- Créés depuis /admin/bookings → "Créer dossier"
-- ============================================================

CREATE TABLE IF NOT EXISTS public.case_files (
  id                  uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at          timestamptz   NOT NULL DEFAULT now(),
  updated_at          timestamptz   NOT NULL DEFAULT now(),
  opened_at           timestamptz   NOT NULL DEFAULT now(),
  last_contact_at     timestamptz,

  -- Relation booking (optionnelle)
  booking_id          uuid          REFERENCES public.bookings(id) ON DELETE SET NULL,

  -- Identité client (dénormalisée pour MVP — pas de table clients séparée en v1)
  client_name         text          NOT NULL,
  email               text          NOT NULL,
  city_province       text          NOT NULL,
  preferred_language  text          NOT NULL
    CHECK (preferred_language IN ('fr', 'en', 'ar')),

  -- Suivi dossier
  status              text          NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'active', 'waiting_client', 'next_step', 'completed', 'archived')),
  next_step           text          NOT NULL DEFAULT '',
  action_plan         text[]        NOT NULL DEFAULT '{}',
  internal_notes      text[]        NOT NULL DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS case_files_email_idx       ON public.case_files (email);
CREATE INDEX IF NOT EXISTS case_files_status_idx      ON public.case_files (status);
CREATE INDEX IF NOT EXISTS case_files_booking_id_idx  ON public.case_files (booking_id);
CREATE INDEX IF NOT EXISTS case_files_opened_at_idx   ON public.case_files (opened_at DESC);

DROP TRIGGER IF EXISTS case_files_set_updated_at ON public.case_files;
CREATE TRIGGER case_files_set_updated_at
  BEFORE UPDATE ON public.case_files
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

ALTER TABLE public.case_files ENABLE ROW LEVEL SECURITY;
-- Aucune policy anon : seul service_role a accès.


-- ============================================================
-- 3. scam_checks
-- Correspond à : src/types/admin.ts > ScamCheck + LocalScamCheck
-- Source : /fr/services/anti-arnaque → formulaire ScamCheckForm
-- ============================================================

CREATE TABLE IF NOT EXISTS public.scam_checks (
  id                  uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at          timestamptz   NOT NULL DEFAULT now(),
  updated_at          timestamptz   NOT NULL DEFAULT now(),

  -- Identité demandeur
  requester_name      text          NOT NULL,
  email               text          NOT NULL,
  phone               text,
  city_province       text,

  -- Contenu signalement (jamais de documents sensibles)
  situation           text          NOT NULL,
  amount_requested    text,

  -- Évaluation informative
  urgency             text          NOT NULL DEFAULT 'normal'
    CHECK (urgency IN ('low', 'normal', 'high')),
  risk_level          text          NOT NULL DEFAULT 'unreviewed'
    CHECK (risk_level IN ('unreviewed', 'low', 'medium', 'high', 'urgent')),
  status              text          NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'reviewing', 'responded', 'closed')),

  -- Notes et réponse admin
  notes               text[]        NOT NULL DEFAULT '{}',
  recommendation      text,
  response_summary    text
);

CREATE INDEX IF NOT EXISTS scam_checks_email_idx       ON public.scam_checks (email);
CREATE INDEX IF NOT EXISTS scam_checks_status_idx      ON public.scam_checks (status);
CREATE INDEX IF NOT EXISTS scam_checks_risk_level_idx  ON public.scam_checks (risk_level);
CREATE INDEX IF NOT EXISTS scam_checks_created_at_idx  ON public.scam_checks (created_at DESC);

DROP TRIGGER IF EXISTS scam_checks_set_updated_at ON public.scam_checks;
CREATE TRIGGER scam_checks_set_updated_at
  BEFORE UPDATE ON public.scam_checks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

ALTER TABLE public.scam_checks ENABLE ROW LEVEL SECURITY;
-- Aucune policy anon : seul service_role a accès.


-- ============================================================
-- 4. resources
-- Correspond à : src/types/admin.ts > ResourceGuide
-- Géré depuis /admin/resources (futur)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.resources (
  id                  uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at          timestamptz   NOT NULL DEFAULT now(),
  updated_at          timestamptz   NOT NULL DEFAULT now(),
  published_at        timestamptz,

  -- Contenu
  title               text          NOT NULL,
  slug                text          NOT NULL,
  locale              text          NOT NULL
    CHECK (locale IN ('fr', 'en', 'ar')),
  category            text          NOT NULL
    CHECK (category IN ('housing', 'banking', 'phone', 'documents', 'first_week', 'students', 'anti_scam')),
  summary             text          NOT NULL DEFAULT '',
  content             jsonb         NOT NULL DEFAULT '{}',

  -- Workflow
  status              text          NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'review', 'published', 'archived')),
  owner               text          NOT NULL DEFAULT 'Marhaban Canada',

  UNIQUE (slug, locale)
);

CREATE INDEX IF NOT EXISTS resources_locale_idx      ON public.resources (locale);
CREATE INDEX IF NOT EXISTS resources_status_idx      ON public.resources (status);
CREATE INDEX IF NOT EXISTS resources_category_idx    ON public.resources (category);
CREATE INDEX IF NOT EXISTS resources_updated_at_idx  ON public.resources (updated_at DESC);

DROP TRIGGER IF EXISTS resources_set_updated_at ON public.resources;
CREATE TRIGGER resources_set_updated_at
  BEFORE UPDATE ON public.resources
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Policy : ressources publiées lisibles publiquement (clé anon)
-- Les resources ne contiennent pas de données personnelles.
CREATE POLICY "resources_public_read"
  ON public.resources
  FOR SELECT
  TO anon
  USING (status = 'published');


-- ============================================================
-- 5. admin_notes
-- Notes internes liées à n'importe quel objet admin
-- Correspond à : docs/database-schema-draft.md > admin_notes
-- ============================================================

CREATE TABLE IF NOT EXISTS public.admin_notes (
  id                  uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at          timestamptz   NOT NULL DEFAULT now(),
  updated_at          timestamptz   NOT NULL DEFAULT now(),

  -- Cible polymorphe
  target_type         text          NOT NULL
    CHECK (target_type IN ('booking', 'case_file', 'scam_check', 'resource')),
  target_id           uuid          NOT NULL,

  -- Contenu
  body                text          NOT NULL,
  status              text          NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'archived')),

  -- Auteur (futur : relation vers auth.users)
  author_id           uuid
);

CREATE INDEX IF NOT EXISTS admin_notes_target_idx     ON public.admin_notes (target_type, target_id);
CREATE INDEX IF NOT EXISTS admin_notes_created_at_idx ON public.admin_notes (created_at DESC);
CREATE INDEX IF NOT EXISTS admin_notes_status_idx     ON public.admin_notes (status);

DROP TRIGGER IF EXISTS admin_notes_set_updated_at ON public.admin_notes;
CREATE TRIGGER admin_notes_set_updated_at
  BEFORE UPDATE ON public.admin_notes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

ALTER TABLE public.admin_notes ENABLE ROW LEVEL SECURITY;
-- Aucune policy anon : seul service_role a accès.


-- ============================================================
-- 6. booking_preparation_forms
-- Demandes de réservation pour l'appel gratuit
-- Source : /fr/reserver/formulaire
-- ============================================================

CREATE TABLE IF NOT EXISTS public.booking_preparation_forms (
  id                  uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at          timestamptz   NOT NULL DEFAULT now(),

  locale              text          NOT NULL CHECK (locale IN ('fr', 'en', 'ar')),
  first_name          text          NOT NULL,
  last_name           text          NOT NULL,
  email               text          NOT NULL,
  phone               text,

  location_status     text          NOT NULL,
  general_status      text,
  needs               text[]        NOT NULL DEFAULT '{}',
  situation           text          NOT NULL,
  main_question       text,
  urgency             text,
  availability        text          NOT NULL,
  preferred_contact_method text     NOT NULL,
  consent             boolean       NOT NULL DEFAULT false,
  source              text          NOT NULL DEFAULT 'booking_form',
  status              text          NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'contacted', 'confirmed', 'completed', 'cancelled'))
);

-- Safe updates when the table already exists from an earlier draft.
ALTER TABLE public.booking_preparation_forms
  ADD COLUMN IF NOT EXISTS availability text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS preferred_contact_method text NOT NULL DEFAULT 'any',
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new';

ALTER TABLE public.booking_preparation_forms
  ALTER COLUMN source SET DEFAULT 'booking_form';

CREATE INDEX IF NOT EXISTS booking_preparation_forms_created_at_idx ON public.booking_preparation_forms (created_at DESC);
CREATE INDEX IF NOT EXISTS booking_preparation_forms_email_idx      ON public.booking_preparation_forms (email);
CREATE INDEX IF NOT EXISTS booking_preparation_forms_urgency_idx    ON public.booking_preparation_forms (urgency);
CREATE INDEX IF NOT EXISTS booking_preparation_forms_status_idx     ON public.booking_preparation_forms (status);

ALTER TABLE public.booking_preparation_forms ENABLE ROW LEVEL SECURITY;
-- Aucune policy anon : insertion/lecture via routes serveur avec service_role uniquement.


-- ============================================================
-- FIN DE LA MIGRATION v1
-- ============================================================
--
-- Vérification après exécution :
--   SELECT table_name FROM information_schema.tables
--   WHERE table_schema = 'public'
--   ORDER BY table_name;
--
-- Attendu : admin_notes, booking_preparation_forms, bookings, case_files, resources, scam_checks
--
-- Vérifier que RLS est activée :
--   SELECT tablename, rowsecurity
--   FROM pg_tables
--   WHERE schemaname = 'public';
--
-- ============================================================
