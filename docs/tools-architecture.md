# Architecture future des outils

Ce document prépare les intégrations futures de Marhaban Canada sans les activer. Le MVP actuel reste mock/local : réservation manuelle via modal, admin Supabase Auth, pas de paiement, pas d'email automatique.

## Principes

- Ne pas brancher de service externe avant que le flux manuel soit validé.
- Ne jamais exposer de clé serveur côté client.
- Ne pas demander de documents sensibles dans le MVP.
- Ajouter chaque outil avec une étape de test dédiée avant production.

## Supabase

Usage prévu :
- Base de données pour les demandes de réservation, clients, dossiers, demandes anti-arnaque et ressources.
- Auth admin via Supabase Auth.
- Storage documents plus tard, seulement si un vrai besoin est validé.

## État d'intégration Supabase (2026-06-17)

### Branché et fonctionnel
- `bookings` — POST via `/api/bookings`, lecture Server Component `/admin/bookings`, PATCH admin via `/api/admin/bookings/[id]`
- `scam_checks` — POST via `/api/scam-checks`, lecture Server Component `/admin/scam-checks`, PATCH admin via `/api/admin/scam-checks/[id]`
- `case_files` — POST via `/api/cases`, PATCH admin via `/api/admin/cases/[id]`, lecture Server Component `/admin/cases`
- `resources` — GET/POST admin via `/api/admin/resources`, PATCH/DELETE admin via `/api/admin/resources/[id]`, lecture Server Component `/admin/resources`
- `admin_notes` — GET/POST admin via `/api/admin/notes`, PATCH/DELETE admin via `/api/admin/notes/[id]`, composant AdminNotesPanel
- `Supabase Auth` — login admin via `signInWithPassword`, session SSR via `@supabase/ssr`, allowlist `ADMIN_ALLOWED_EMAILS`, logout via `/api/admin/logout`

## Admin CRUD v1 (2026-06-17)

### Entités supportées
| Entité | Lire | Créer | Modifier | Archiver | Supprimer |
|---|---|---|---|---|---|
| bookings | ✓ | — | ✓ status/note | ✓ soft (status=archived) | — |
| scam_checks | ✓ | — | ✓ status/risk/notes | ✓ soft (status=archived) | — |
| case_files | ✓ | ✓ (depuis booking) | ✓ status/next_step/notes | ✓ soft (status=archived) | — |
| resources | ✓ | ✓ | ✓ tous champs | ✓ soft (status=archived) | ✓ hard delete |
| admin_notes | ✓ | ✓ | ✓ body | — | ✓ hard delete |

### Routes admin protégées (require-admin.ts)
- `src/lib/admin/require-admin.ts` — vérifie session Supabase Auth + ADMIN_ALLOWED_EMAILS
- `src/app/admin/(protected)/layout.tsx` — redirige vers `/admin/login` si non authentifié
- Toutes les routes `/api/admin/*` vérifient l'authentification admin côté serveur

### Règles soft-delete / archive
- `bookings` et `scam_checks` : `status = 'archived'` — nécessite migration `docs/supabase-admin-crud-migration.sql`
- `case_files` : `status = 'archived'` — déjà supporté dans le schema v1
- `resources` : `status = 'archived'` OU suppression définitive possible
- `admin_notes` : suppression définitive uniquement (hard delete)

### Sécurité
- `SUPABASE_SERVICE_ROLE_KEY` uniquement dans les Route Handlers et Server Components
- Chaque route `/api/admin/*` appelle `requireAdmin()` avant toute mutation
- Champs sensibles rejetés : NAS/SIN, passeport, carte bancaire, permis, upload
- Confirmation `window.confirm()` avant archive/suppression
- Les routes publiques `/api/bookings` et `/api/scam-checks` restent pour les formulaires publics

### Pas encore branché
- Supabase Storage — exclu du MVP actuel
- Resend
- Stripe
- Calendly
- Durcissement RLS / rôles admin Supabase

### Sécurité
- `SUPABASE_SERVICE_ROLE_KEY` utilisé uniquement dans les Route Handlers et Server Components.
- RLS activée sur toutes les tables. Aucune policy anon sauf `resources` (lecture publique des publiées).
- Aucun secret dans les composants client.

Risques :
- Exposition accidentelle de `SUPABASE_SERVICE_ROLE_KEY`.
- Mauvaise configuration de `ADMIN_ALLOWED_EMAILS`.
- Stockage de données personnelles sans règles d'accès strictes.
- Upload de documents avant d'avoir une politique de sécurité.

## Resend

Usage prévu :
- Email de confirmation au client.
- Notification admin lors d'une nouvelle demande.
- Résumé après appel plus tard.

Phase d'intégration :
1. Après stockage fiable des `bookings` dans Supabase.
2. Commencer par une notification admin simple.
3. Ajouter ensuite confirmation client et templates multilingues.

Exclu du MVP actuel :
- Emails automatiques.
- Templates transactionnels.
- Résumés après appel.

Risques :
- Envoi d'informations personnelles dans des emails trop détaillés.
- Mauvaise configuration SPF/DKIM/DMARC.
- Spam ou envois répétés si les webhooks sont mal gérés.

## Calendly

Usage prévu :
- Réservation automatique de créneaux.
- Synchronisation ou redirection vers les événements Calendly selon le service.

Phase d'intégration :
1. Après validation du flux manuel "demande d'abord".
2. Ajouter des liens par service.
3. Évaluer ensuite les webhooks Calendly si nécessaire.

Exclu du MVP actuel :
- Embed Calendly obligatoire.
- Confirmation automatique.
- Synchronisation calendrier.

Risques :
- Perte de contrôle sur la qualification des demandes.
- Créneaux réservés avant validation du besoin.
- Boucles ou états divergents entre Calendly et l'admin.

## Stripe

Usage prévu :
- Paiement des appels payants.
- Stripe Checkout ou Payment Links.
- Webhooks pour marquer une réservation comme payée.

Phase d'intégration :
1. Après validation des offres payantes.
2. Commencer par Payment Links ou Checkout.
3. Ajouter webhooks seulement quand le stockage Supabase est prêt.

Exclu du MVP actuel :
- Paiement.
- Facturation automatisée.
- Webhooks Stripe.

Risques :
- Mauvais traitement des remboursements.
- Webhooks non vérifiés.
- Confusion entre demande gratuite, demande payante et réservation confirmée.

## Vercel Analytics

Usage prévu :
- Suivi des visites.
- Suivi des conversions vers `/reserver`.
- Mesure des clics sur les packs et demandes envoyées.

Phase d'intégration :
1. Après stabilisation des pages publiques.
2. Ajouter les événements de conversion minimaux.
3. Éviter tout suivi de données personnelles.

Exclu du MVP actuel :
- Tracking détaillé utilisateur.
- Envoi de champs de formulaire à l'analytics.

Risques :
- Collecte involontaire de données personnelles.
- Mesures trop nombreuses et peu actionnables.

## Ordre recommandé

1. Finaliser la modal de réservation manuelle.
2. Finaliser l'admin mock/local.
3. Connecter les demandes de la modal à une couche mock admin.
4. Ajouter Supabase pour `bookings`.
5. Ajouter Resend pour notification admin.
6. Ajouter confirmation client Resend.
7. Ajouter Supabase pour `clients`, `case_files`, `scam_checks`.
8. Ajouter Stripe pour offres payantes validées.
9. Ajouter Calendly quand le flux manuel est éprouvé.
10. Ajouter Vercel Analytics sans données personnelles.

## Non prêt production

L'admin actuel utilise Supabase Auth mais ne doit pas être considéré prêt production sans durcissement RLS, rôles admin Supabase, audit des données personnelles et revue des secrets d'environnement.
