# Checklist production

## Variables d'environnement

- `NEXT_PUBLIC_SITE_URL` pointe vers le domaine de production.
- `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` configurées.
- `SUPABASE_SERVICE_ROLE_KEY` configurée uniquement côté serveur.
- `ADMIN_ALLOWED_EMAILS` contient uniquement les emails admin autorisés.
- `NEXT_PUBLIC_SENTRY_DSN` configuré si le monitoring Sentry est activé.
- `NEXT_PUBLIC_GA_ID` configuré seulement si Analytics est utilisé.
- URLs Calendly publiques configurées ou laissées vides si le formulaire interne est utilisé.

## Supabase

- RLS activée sur `bookings`, `case_files`, `scam_checks`, `resources`, `admin_notes`.
- Aucune policy anon ne donne accès aux tables privées.
- Les insertions publiques passent uniquement par les routes API serveur.
- Les migrations de `docs/supabase-migration-v1.sql` sont appliquées sur l'environnement cible.
- Les données QA de test sont supprimées ou clairement identifiées.

## Admin

- Supabase Auth fonctionne avec les comptes admin attendus.
- `ADMIN_ALLOWED_EMAILS` refuse un compte non listé.
- `/admin/dashboard`, `/admin/bookings`, `/admin/scam-checks`, `/admin/cases`, `/admin/resources` redirigent vers `/admin/login` hors session.
- La déconnexion `/api/admin/logout` invalide la session.

## Admin — production-ready (2026-06-18)

### Mock/local suppression et refresh CRUD

- Toutes les pages admin (`/admin/bookings`, `/admin/scam-checks`, `/admin/cases`, `/admin/resources`) utilisent uniquement des données Supabase.
- `useSyncExternalStore` et local stores supprimés des composants admin (local-booking-store, local-scam-check-store, local-case-store).
- `mock-data.ts` conservé (utilisé par les formulaires publics via `ServiceBookingModal` et `ScamCheckForm` uniquement).
- Chaque route API mutation ajoute `revalidatePath()` après succès et retourne `{ ok: true, item: updatedRow }`.
- Les composants client appellent `router.refresh()` après chaque mutation réussie.
- `export const dynamic = 'force-dynamic'` ajouté sur toutes les pages admin server.
- Badges "Mock data" et "Local" supprimés de l'interface admin.
- États vides ajoutés pour chaque entité quand Supabase est vide.

#### QA admin production-ready
- [ ] `/admin/bookings` — aucun nom fictif visible, données Supabase uniquement
- [ ] Changer le statut d'une réservation → UI mise à jour sans rechargement manuel
- [ ] `/admin/scam-checks` — aucune donnée mock, "Évaluer" persiste en Supabase
- [ ] `/admin/cases` — aucune donnée mock, modifier statut/étape → persisté
- [ ] `/admin/resources` — aucune donnée mock, créer/modifier/supprimer → persisté
- [ ] Aucun badge "Mock data" visible sur aucune page admin
- [ ] Après mutation, la liste se rafraîchit correctement (router.refresh)

## Admin Dashboard — données réelles (2026-06-18)

- Le dashboard `/admin/dashboard` n'utilise plus de données mock/locales.
- Les KPIs et tableaux sont alimentés par Supabase en temps réel (Server Component).
- Aucun localStorage ni mock dans le dashboard — données Supabase uniquement.
- États vides prévus : "Rien à traiter pour le moment.", "Aucune réservation pour le moment.", "Aucune demande anti-arnaque pour le moment."
- Texte "Admin MVP mock/local" supprimé de AdminShell et du dashboard.
- Badge "Mock data" remplacé par "Espace admin sécurisé".
- `requireAdmin()` toujours actif via le layout protégé.

### QA dashboard Supabase
- [ ] `/admin/dashboard` charge sans erreur après connexion
- [ ] KPIs affichent des valeurs réelles (0 si tables vides)
- [ ] Section "À traiter en priorité" : items réels ou état vide "Rien à traiter pour le moment."
- [ ] Tableau réservations : données Supabase ou "Aucune réservation pour le moment."
- [ ] Tableau anti-arnaque : données Supabase ou "Aucune demande anti-arnaque pour le moment."
- [ ] Aucun nom fictif (Nadia Benali, Omar Haddad, etc.) visible
- [ ] Aucun badge "Mock data" visible sur le dashboard
- [ ] Hors session → redirige vers `/admin/login`

## Admin CRUD v1

### Migration préalable
- `docs/supabase-admin-crud-migration.sql` appliqué sur l'environnement cible (ajoute 'archived' aux CHECK de bookings et scam_checks).
- Vérifier que les contraintes CHECK ont bien été mises à jour après exécution.

### Fonctionnalités CRUD
- Réservations : mise à jour du statut, note interne, archivage soft-delete — vérifier via `/admin/bookings`
- Demandes anti-arnaque : mise à jour statut, risk_level, notes, recommandation — vérifier via `/admin/scam-checks`
- Dossiers : modification statut, prochaine étape, notes internes — vérifier via `/admin/cases`
- Ressources : créer, modifier, publier/dépublier, archiver, supprimer — vérifier via `/admin/resources`
- Notes internes : créer, modifier, supprimer — vérifier via le panneau notes dans chaque entité

### Sécurité CRUD
- Chaque route `/api/admin/*` retourne 401 si non authentifié, 403 si non autorisé.
- Tester : appel non authentifié à `PATCH /api/admin/bookings/[uuid]` doit retourner 401.
- Tester : email hors allowlist doit retourner 403.
- `SUPABASE_SERVICE_ROLE_KEY` ne doit pas apparaître dans le bundle client (`next build` logs).
- Champs sensibles (NAS, passeport, carte bancaire) rejetés par validation serveur.
- Les actions archive/suppression demandent confirmation `window.confirm()` côté client.

### QA manuel Admin CRUD
- [ ] `/admin/login` redirige correctement après connexion réussie
- [ ] Hors session, toutes les pages `/admin/(protected)/` redirigent vers `/admin/login`
- [ ] Modifier le statut d'une réservation Supabase → persisté après reload
- [ ] Ajouter une note interne sur une réservation → persistée après reload
- [ ] Archiver une réservation → confirmation demandée, statut = 'archived'
- [ ] Modifier risk_level d'un scam check Supabase → persisté après reload
- [ ] Archiver un scam check → confirmation demandée, statut = 'archived'
- [ ] Modifier statut d'un dossier → persisté après reload
- [ ] Créer une ressource → apparaît dans la liste
- [ ] Modifier une ressource → changements persistés
- [ ] Publier/dépublier une ressource → statut mis à jour
- [ ] Supprimer une ressource → confirmation demandée, guide disparu
- [ ] Créer une note interne → apparaît dans le panneau
- [ ] Modifier une note interne → contenu mis à jour
- [ ] Supprimer une note interne → confirmation demandée, note disparue
- [ ] Compte non admin → 403 sur toutes les routes `/api/admin/*`

## Multilingual booking QA

### Routes testées
| Locale | Route | Statut |
|---|---|---|
| FR | `/fr/reserver` | À vérifier |
| EN | `/en/reserver` | À vérifier |
| AR | `/ar/reserver` | À vérifier |

### Flux FR
- [ ] `/fr/reserver` charge (200)
- [ ] H1 "Réservez un appel d'orientation" visible
- [ ] 3 cartes de service visibles
- [ ] Clic sur une carte ouvre la modal
- [ ] Étape 1 : champs requis bloquent l'avancée
- [ ] Étape 2 : consentement requis avant submit
- [ ] Submit → ligne créée dans Supabase `bookings` avec `status=new`
- [ ] Message de succès "Demande envoyée" affiché
- [ ] Admin peut voir la réservation sur `/admin/bookings`

### Flux EN
- [ ] `/en/reserver` charge (200)
- [ ] H1 "Book an orientation call" visible
- [ ] Modal titre "Request a time slot" visible
- [ ] Submit avec `preferred_language=en` → stocké dans Supabase
- [ ] Source stockée `reserver_modal`
- [ ] Admin peut voir la réservation sur `/admin/bookings`

### Flux AR
- [ ] `/ar/reserver` charge (200)
- [ ] H1 "احجز مكالمة توجيه" visible
- [ ] `html[dir="rtl"]` défini après hydratation client
- [ ] `body.classList` contient `rtl`
- [ ] Labels du formulaire en arabe affichés correctement
- [ ] Modal "طلب موعد" s'ouvre correctement
- [ ] Submit avec `preferred_language=ar` → stocké dans Supabase
- [ ] Message de succès "تم إرسال الطلب" affiché
- [ ] Admin peut voir la réservation sur `/admin/bookings`

### Sécurité API `/api/bookings`
- [ ] Champs sensibles (NAS, passeport, carte, permis, upload) → 400
- [ ] `disclaimer_accepted=false` → 400
- [ ] `preferred_language` hors FR/EN/AR → 400
- [ ] Champ inconnu dans le payload → 400
- [ ] `status` toujours `new` côté serveur (ignoré si envoyé par le client)
- [ ] `next_action` hardcodé côté serveur (non modifiable par le client)
- [ ] Réponse d'erreur ne contient pas `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Réponse d'erreur retourne `{ ok: false, error: string }` en JSON

### Tests automatisés Playwright
- `tests/booking-multilingual.spec.ts` — flux E2E complet FR/EN/AR (require dev server)
- `tests/booking-api-security.spec.ts` — validation API et sécurité (require dev server)
- Exécution : `npx playwright test` (requiert `npm run dev` en parallèle)

### Admin (post-soumissions)
- [ ] `/admin/bookings` affiche les 3 soumissions test FR/EN/AR
- [ ] Colonne `preferred_language` ou source visible
- [ ] Modifier statut d'une réservation → persisté après reload
- [ ] Ajouter une note → persistée après reload
- [ ] Les actions Admin CRUD v1 fonctionnent toujours correctement

## Formulaires

- `/fr/reserver` crée une réservation Supabase depuis le modal.
- Le fallback localStorage de réservation fonctionne si Supabase est indisponible.
- `/fr/services/anti-arnaque` crée une demande `scam_checks`.
- Les formulaires ne demandent pas NAS/SIN, passeport, carte bancaire, permis ou upload de documents.
- Les validations rejettent les champs sensibles ou inattendus.

## Routes publiques

- `/fr`, `/fr/reserver`, `/fr/services/anti-arnaque`, `/fr/accompagnement`, `/fr/ressources`, `/fr/a-propos` répondent sans 404.
- `/en` et `/ar` répondent sans 404.
- Navigation et CTAs pointent vers les routes finales.
- Mobile vérifié sur accueil, réservation, anti-arnaque et ressources.
- Arabe RTL vérifié sur `/ar`, `/ar/reserver` et `/ar/services/anti-arnaque`.

## Build et CI

- `npm ci` passe depuis un checkout propre.
- `npm run lint` passe.
- `npm run build` passe.
- GitHub Actions `CI` passe sur `push` et `pull_request`.
- Le build production est testé avec Webpack en local si un serveur dev est lancé: `npx next dev --webpack`.

## Monitoring

- Sentry reçoit un événement de test en staging si `NEXT_PUBLIC_SENTRY_DSN` est configuré.
- Aucun contenu complet de formulaire n'est volontairement loggé dans Sentry.
- Aucune clé `SUPABASE_SERVICE_ROLE_KEY`, Stripe, Resend ou autre secret n'est envoyée à Sentry.
- Alertes Sentry configurées pour erreurs serveur et erreurs client critiques.

## Rollback

- Garder le dernier déploiement stable disponible dans l'hébergeur.
- Si le lancement échoue, rollback vers le déploiement stable précédent.
- Désactiver temporairement `NEXT_PUBLIC_SENTRY_DSN` ou les URLs Calendly uniquement si elles causent un incident.
- Conserver une note d'incident avec heure, commit, symptôme, action de rollback et correctif prévu.
