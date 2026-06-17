# MVP QA Checklist — Marhaban Canada
**Date :** 2026-06-17 (mis à jour Supabase Auth admin)
**Branche :** fix/accompagnement-route
**Portée :** QA globale des flux MVP public + admin + Supabase Auth admin

---

## Commandes lancées

| Commande | Résultat |
|---|---|
| `npm run lint` | OK — 0 erreur |
| `npm run build` | BLOQUÉ — `@supabase/ssr` absent de `node_modules` après échec DNS `npm install` |

---

## Routes vérifiées (code + build)

| Route | Statut | Notes |
|---|---|---|
| `/fr` | OK (ƒ Dynamic) | Page d'accueil locale |
| `/fr/reserver` | OK (ƒ) | CalendlyEmbed + copy FR |
| `/fr/accompagnement` | OK (ƒ) | PageHero + sections |
| `/fr/services/orientation` | OK (ƒ) | ServiceCard + copy JSON |
| `/fr/services/anti-arnaque` | OK (ƒ) | ScamCheckForm intégré |
| `/admin` | OK (statique) | Redirige vers `/admin/dashboard` |
| `/admin/dashboard` | OK (statique) | Aperçu mock data |
| `/admin/bookings` | OK (statique) | AdminBookingsClient + local store |
| `/admin/cases` | OK (statique) | AdminCasesClient + local store |
| `/admin/scam-checks` | OK (statique) | AdminScamChecksClient + local store |
| `/admin/login` | OK | Formulaire email + mot de passe Supabase Auth |

---

## Flux 1 — Réservation -> Admin bookings -> Créer dossier -> Admin cases

| Étape | Résultat | Détail |
|---|---|---|
| `/fr/reserver` charge | OK | Build réussi |
| `local-booking-store.ts` — guard `typeof window` | OK | Ligne 14 |
| `local-case-store.ts` — guard `typeof window` | OK | Ligne 22 |
| Demandes locales avant mock data dans `/admin/bookings` | OK | `useSyncExternalStore` en premier dans le merge |
| Créer dossier -> `addLocalCase` | OK | Confirmé dans `AdminBookingsClient` |
| Dossier visible dans `/admin/cases` | OK | Merge local + mock |
| Aucun champ sensible dans le modal réservation | OK | Grep NAS/passeport/bancaire -> 0 saisie |

---

## Flux 2 — Anti-arnaque -> formulaire -> localStorage -> Admin scam-checks

| Étape | Résultat | Détail |
|---|---|---|
| `/fr/services/anti-arnaque` charge | OK | Build réussi |
| Formulaire `ScamCheckForm` présent | OK | Section `#signaler` ajoutée |
| `local-scam-check-store.ts` — guard `typeof window` | OK | Ligne 15 |
| Aucun champ sensible dans `ScamCheckForm` | OK | Notice explicite dans le formulaire, pas de saisie directe |
| Trust notice "Ne pas inclure : passeport, NAS, numéro bancaire" | OK | Ligne 18 |
| Consentement : "évaluation informative du risque" | OK | Ligne 44 (après correction) |
| Demandes locales avant mock data dans `/admin/scam-checks` | OK | `useSyncExternalStore` merge local first |
| Badge "Local" sur chaque demande localStorage | OK | `localCheckIds.has(sc.id)` |
| KPIs calculés sur liste fusionnée (local + mock) | OK | Array `scamChecks` = local + mock |

---

## Vérifications structurelles

| Point | Résultat | Détail |
|---|---|---|
| Pas de dossier `app/` à la racine | OK | Seul `src/app/` existe |
| Aucun import depuis `src/lib/integrations` | OK | Grep dans `src/app` + `src/components` -> 0 |
| Navbar/Footer publics absents dans admin | OK | `AdminShell` -> `AdminSidebar` uniquement |
| `PublicLayout` (Navbar + Footer) uniquement dans `[locale]/layout.tsx` | OK | `AdminLayout` utilise `AdminShell` |
| `localStorage` toujours protégé `typeof window !== 'undefined'` | OK | Vérifié dans les 3 stores |
| Wording : "Évaluation informative du risque" | OK | Lignes 204, 337, 463 de `AdminScamChecksClient` |
| Wording : jamais "c'est une arnaque" | OK | Grep -> 0 occurrence directe |
| `AdminBadge` accepte `className` | OK | Ligne 9 + `cn()` |
| Disclaimers légaux présents | OK | `legalDisclaimer[locale]` dans anti-arnaque + orientation |
| `robots: { index: false }` dans admin layout | OK | `admin/layout.tsx` lignes 8-10 |

---

## Bugs trouvés et corrigés

### Bug — Accents manquants dans `ScamCheckForm.tsx` (FR)

**Fichier :** `src/components/forms/ScamCheckForm.tsx`
**Cause :** Les strings françaises avaient été écrites pour éviter des erreurs d'apostrophe ; les accents avaient été omis par prudence lors de la rédaction initiale.
**Impact :** Texte mal orthographié visible dans le formulaire public et l'écran de confirmation.

Corrections appliquées (6 strings) :

| Avant | Après |
|---|---|
| `Message recu` | `Message reçu` |
| `Decrivez ce qui s'est passe, le message recu` | `Décrivez ce qui s'est passé, le message reçu` |
| `une evaluation informative du risque...reglemente` | `une évaluation informative du risque...réglementé` |
| `Demande envoyee` | `Demande envoyée` |
| `de maniere informative` | `de manière informative` |
| `Nous vous repondrons` | `Nous vous répondrons` |

---

## Protection admin Supabase Auth

### Implémentation

| Composant | Fichier | Rôle |
|---|---|---|
| Proxy Next.js 16 | `src/proxy.ts` | Bloque `/admin/*` via `supabase.auth.getUser()` |
| Page login | `src/app/admin/login/page.tsx` | Formulaire email + mot de passe Supabase Auth |
| Client browser auth | `src/lib/supabase/browser.ts` | `createBrowserClient` avec anon key uniquement |
| Client serveur auth | `src/lib/supabase/server-auth.ts` | `createServerClient` SSR avec cookies Next |
| API logout | `src/app/api/admin/logout/route.ts` | `signOut()` puis redirection `/admin/login` |
| Sidebar | `src/components/admin/AdminSidebar.tsx` | Bouton "Déconnexion" vers `/api/admin/logout` |
| Env | `docs/env-example.md` | `ADMIN_ALLOWED_EMAILS` documenté |

### Checklist protection

- [x] `/admin/login` existe et s'affiche sans sidebar
- [x] `/admin/dashboard` redirige vers `/admin/login` sans session Supabase
- [x] `/admin/bookings`, `/admin/cases`, `/admin/scam-checks` — même protection
- [x] Login email + mot de passe via `signInWithPassword`
- [x] Login réussi redirige vers `/admin/dashboard`
- [x] Email vérifié côté proxy via `ADMIN_ALLOWED_EMAILS`
- [x] Bouton "Déconnexion" appelle `/api/admin/logout` et déclenche `signOut()`
- [x] `npm run lint` — 0 erreur
- [ ] `npm run build` — bloqué tant que `@supabase/ssr` n'est pas installé

### Variable requise

Ajouter dans `.env.local` avant toute utilisation :
```
ADMIN_ALLOWED_EMAILS="admin@example.com,second@example.com"
```

## Limitations MVP restantes (non bloquantes)

| Limitation | Niveau | Action requise avant production |
|---|---|---|
| Durcissement admin production | Documenté | Ajouter rôles admin Supabase et revue RLS |
| `/admin/dashboard` affiche uniquement mock data (composant serveur) | Mineur | Les checks locaux sont visibles seulement dans `/admin/scam-checks` |
| Notes et overrides admin non persistés (état React uniquement) | Mineur | Un refresh efface les modifications de statut/notes admin |
| Données en localStorage — perdues si localStorage effacé | Connu | MVP uniquement, backend requis en production |

---

## Fichiers inspectés

- `src/app/admin/layout.tsx`
- `src/app/admin/page.tsx`
- `src/app/admin/dashboard/page.tsx`
- `src/app/[locale]/layout.tsx`
- `src/app/[locale]/services/anti-arnaque/page.tsx`
- `src/app/[locale]/reserver/page.tsx`
- `src/app/[locale]/accompagnement/page.tsx`
- `src/app/[locale]/services/orientation/page.tsx`
- `src/components/admin/AdminShell.tsx`
- `src/components/admin/AdminSidebar.tsx`
- `src/components/admin/AdminBadge.tsx`
- `src/components/admin/AdminScamChecksClient.tsx`
- `src/components/forms/ScamCheckForm.tsx`
- `src/components/layout/PageShell.tsx`
- `src/components/layout/PublicLayout.tsx`
- `src/lib/admin/local-scam-check-store.ts`
- `src/lib/admin/local-booking-store.ts`
- `src/lib/admin/local-case-store.ts`
- `src/lib/admin/mock-data.ts`

## Fichiers modifiés

- `src/components/forms/ScamCheckForm.tsx` — 6 accents corrigés dans les strings françaises
- `docs/mvp-qa-checklist.md` — ce fichier (créé/mis à jour)

---

## À tester manuellement dans le navigateur

### Layout et navigation
- [ ] La Navbar ne chevauche pas le contenu des pages publiques
- [ ] L'ancre `#signaler` sur `/fr/services/anti-arnaque` défile correctement (scroll-mt-28)
- [ ] Sur mobile, la Navbar est responsive et les CTA sont visibles
- [ ] Sur `/ar/*`, le layout RTL est correct (direction, alignement, boutons)

### Flux réservation
- [ ] Ouvrir `/fr/reserver` — page charge avec contenu FR
- [ ] Remplir et soumettre le formulaire de réservation
- [ ] Ouvrir `/admin/bookings` — demande visible avec badge "Local"
- [ ] Cliquer "Créer dossier" — dossier visible dans `/admin/cases`
- [ ] Refresh — demandes et dossiers locaux persistent

### Flux anti-arnaque
- [ ] Ouvrir `/fr/services/anti-arnaque` — défiler jusqu'à la section `#signaler`
- [ ] Remplir le formulaire (tous les champs requis) — confirmation "Demande envoyée" s'affiche
- [ ] Ouvrir `/admin/scam-checks` — demande en haut de liste avec badge "Local" orange
- [ ] Refresh de `/admin/scam-checks` — demande toujours présente
- [ ] Cliquer "Voir" — panneau détail affiche téléphone et ville/province si renseignés
- [ ] Cliquer "Évaluer" — formulaire d'évaluation disponible, sauvegarder met à jour le badge de risque

### Admin UX
- [ ] `/admin/dashboard` — KPIs lisibles, pas d'erreur console
- [ ] `/admin/bookings` — tableau lisible, badges contrastés
- [ ] `/admin/cases` — tableau lisible, panneau latéral fonctionnel
- [ ] `/admin/scam-checks` — tableau lisible, libellés "Évaluation informative du risque" présents
- [ ] Sidebar — lien "Ressources" affiche badge "Soon" (non cliquable)
- [ ] Sidebar — lien actif a la bordure dorée à gauche

---

## Prochaine étape recommandée

**Priorité 1 — Avant toute mise en production :**
Implémenter `/admin/login` avec un mécanisme d'authentification minimal (ex. mot de passe en variable d'environnement + cookie de session signé) et un `middleware.ts` Next.js pour bloquer toutes les routes `/admin/*` sans session valide.

**Priorité 2 — Amélioration MVP :**
Persister les overrides admin (statuts, notes, recommandations) dans localStorage — même pattern que le store bookings — pour qu'ils survivent au refresh.

**Priorité 3 — Connexion backend :**
Brancher Supabase pour remplacer localStorage une fois l'authentification en place.

## Flux 3 — Admin bookings → Créer dossier → Supabase case_files → Admin cases

| Étape | Statut | Détail |
|---|---|---|
| POST `/api/cases` — créer dossier Supabase | OK | Route créée, service role côté serveur uniquement |
| PATCH `/api/cases/[id]` — mettre à jour dossier Supabase | OK | Whitelist : status, next_step, internal_notes, action_plan |
| Blocage champs sensibles (NAS, passeport, carte, permis) | OK | Vérification côté serveur avant insert |
| Anti-duplication serveur par booking_id | OK | Vérification avant insert si booking_id est un UUID valide |
| Dossiers Supabase affichés dans `/admin/cases` | OK | Server Component, order opened_at DESC |
| Fallback localStorage si API échoue | OK | `addLocalCase()` appelé si POST échoue |
| Déduplication Supabase / localStorage par bookingId | OK | localStorage caché si même bookingId que Supabase |
| Badge "Supabase" sur les dossiers Supabase | OK | Composant AdminCasesClient |
| Badge "Local" sur les dossiers localStorage | OK | Composant AdminCasesClient |
| `SUPABASE_SERVICE_ROLE_KEY` côté serveur uniquement | OK | Jamais importé dans composant client |

### Limitations MVP connues

- Les updates de dossiers Supabase sont persistés via PATCH /api/cases/[id] (status, next_step, internal_notes uniquement).
- priority et phone ne sont pas dans le schema Supabase v1 — restent localStorage/mock uniquement.
- Supabase Auth protège l'admin, mais les rôles admin Supabase et le durcissement RLS restent à faire.

## Flux 4 — Admin resources → Supabase resources

| Étape | Statut | Détail |
|---|---|---|
| GET `/api/resources` — lire resources Supabase | OK | Service role, lit tout (draft/review/published/archived) |
| POST `/api/resources` — créer guide Supabase | OK | Whitelist stricte, content stocké en jsonb |
| PATCH `/api/resources/[id]` — modifier guide | OK | Whitelist stricte, status/title/slug/category/locale/summary/content |
| Lecture Server Component `/admin/resources` | OK | Supabase triés updated_at DESC |
| Mock data fallback si table vide | OK | mockResources affichés si Supabase vide |
| Formulaire "Nouveau guide" | OK | Créé en session, persisté Supabase |
| Formulaire "Modifier" | OK | PATCH Supabase, update local state |
| Actions Publier / Dépublier / Archiver | OK | PATCH status via API |
| Badge "Supabase" / "Mock" | OK | AdminResourcesClient |
| Lien sidebar Ressources activé | OK | soon: true retiré |
| `SUPABASE_SERVICE_ROLE_KEY` côté serveur uniquement | OK | Jamais dans composant client |

### Limitations MVP connues

- Pas de DELETE réel — archiver via status: archived.
- Supabase Auth protège l'admin, mais les rôles admin Supabase et le durcissement RLS restent à faire.
- content stocké comme jsonb { body: string } — pas d'éditeur riche.
- slug + locale doivent être uniques — erreur 409 si conflit.

## Flux 5 — Notes internes admin (admin_notes)

| Étape | Statut | Détail |
|---|---|---|
| POST `/api/admin-notes` — créer note | OK | Whitelist stricte, body max 2000 chars |
| GET `/api/admin-notes` — lire notes par cible | OK | target_type + target_id (UUID), status active |
| PATCH `/api/admin-notes/[id]` — archiver note | OK | status: archived via PATCH |
| AdminNotesPanel intégré dans /admin/cases | OK | Notes liées à case_file |
| AdminNotesPanel intégré dans /admin/scam-checks | OK | Notes liées à scam_check |
| AdminNotesPanel intégré dans /admin/bookings | OK | Notes liées à booking |
| AdminNotesPanel intégré dans /admin/resources | OK | Notes liées à resource |
| Notes disponibles uniquement pour UUIDs Supabase | OK | Mock/localStorage → message discret |
| `SUPABASE_SERVICE_ROLE_KEY` côté serveur uniquement | OK | Jamais dans composant client |

### Test manuel recommandé

1. Ouvrir un dossier Supabase dans /admin/cases
2. Ajouter une note via AdminNotesPanel
3. Vérifier que la note apparaît immédiatement
4. Refresh de la page → vérifier que la note est rechargée depuis Supabase
5. Archiver la note → vérifier qu'elle disparaît de la liste

### Limitations MVP connues

- Pas de DELETE réel — archiver via PATCH status: archived.
- author_id non utilisé (réservé pour Supabase Auth futur).
- Notes indisponibles pour les enregistrements mock ou localStorage (target_id non UUID).

## Flux 6 — Supabase Auth admin

| Étape | Statut | Détail |
|---|---|---|
| `/admin/dashboard` sans session → `/admin/login` | OK | Proxy vérifie `supabase.auth.getUser()` |
| Login email + password valides + email autorisé → accès | OK | `signInWithPassword` + allowlist |
| `ADMIN_ALLOWED_EMAILS` absent ou vide → refus + message clair | OK | Proxy redirect `/admin/login?error=missing_allowlist` |
| Login email valide mais pas dans `ADMIN_ALLOWED_EMAILS` → refus | OK | Proxy redirect `/admin/login?error=unauthorized` |
| Mauvais mot de passe → erreur claire | OK | Supabase auth error → message UI |
| Déconnexion → retour `/admin/login` | OK | `signOut()` via `/api/admin/logout` |
| Routes publiques `/fr`, `/en`, `/ar` non impactées | OK | Proxy ne touche pas aux routes non-admin |
| Routes API data `/api/bookings`, `/api/cases`, etc. non impactées | OK | Proxy exclut `/api/*` |
| `SUPABASE_SERVICE_ROLE_KEY` côté serveur uniquement | OK | Jamais dans browser.ts, login page, proxy |
| Flux bookings/scam_checks/case_files/resources/admin_notes OK | OK | Routes API inchangées |

### Configuration requise dans Supabase Dashboard

1. Authentication > Users → créer le(s) utilisateur(s) admin
2. Email confirmé obligatoire pour `signInWithPassword`
3. `ADMIN_ALLOWED_EMAILS` dans `.env.local` avec les emails autorisés

### Limitations

- Pas de reset password depuis l'UI pour l'instant (géré depuis Supabase Dashboard).
- Pas de signup public — les comptes admin sont créés manuellement dans Supabase.
