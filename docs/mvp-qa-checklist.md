# MVP QA Checklist — Marhaban Canada
**Date :** 2026-06-17 (mis à jour protection admin)
**Branche :** fix/accompagnement-route
**Portée :** QA globale des deux flux MVP public + admin + protection admin temporaire

---

## Commandes lancées

| Commande | Résultat |
|---|---|
| `npm run lint` | OK — 0 erreur |
| `npm run build` | OK — 61 pages compilées, 0 erreur TypeScript |

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
| `/admin/login` | MANQUANT | MVP sans auth — voir section limitations |

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

## Protection admin temporaire MVP

### Implémentation

| Composant | Fichier | Rôle |
|---|---|---|
| Middleware Next.js | `src/middleware.ts` | Bloque `/admin/*` (sauf `/admin/login`) sans cookie |
| Page login | `src/app/admin/login/page.tsx` | Formulaire standalone (sans sidebar) |
| API verify | `src/app/api/admin/verify/route.ts` | Vérifie `ADMIN_PREVIEW_PASSWORD` côté serveur, pose le cookie |
| API logout | `src/app/api/admin/logout/route.ts` | Vide le cookie, redirige vers `/admin/login` |
| Utilitaire | `src/lib/admin/admin-auth.ts` | `verifyAdminPassword()` pour le formulaire client |
| Sidebar | `src/components/admin/AdminSidebar.tsx` | Bouton "Déconnexion" ajouté |
| Env | `docs/env-example.md` | `ADMIN_PREVIEW_PASSWORD` documenté |
| Route group | `src/app/admin/(protected)/` | Pages protégées isolées — login sans sidebar |

### Checklist protection

- [x] `/admin/login` existe et s'affiche sans sidebar
- [x] `/admin/dashboard` redirige vers `/admin/login` si pas de cookie
- [x] `/admin/bookings`, `/admin/cases`, `/admin/scam-checks` — même protection
- [x] Login réussi pose le cookie `mhb_admin_prev` (httpOnly, SameSite=lax, 8h)
- [x] Login réussi redirige vers `/admin/dashboard`
- [x] Mot de passe vérifié uniquement côté serveur (jamais exposé au client)
- [x] Si `ADMIN_PREVIEW_PASSWORD` non configuré, message explicite sur la page login
- [x] Bouton "Déconnexion" dans la sidebar vide le cookie et redirige vers login
- [x] `npm run lint` — 0 erreur
- [x] `npm run build` — 63 pages compilées, 0 erreur TypeScript

### Rappel — Protection NON production-grade

Cette protection est uniquement pour preview/MVP :
- Cookie `httpOnly` mais pas `Secure` en HTTP local
- Pas de rate limiting sur `/api/admin/verify`
- Pas de rotation de token, pas d'expiration côté serveur
- La vraie protection viendra avec Supabase Auth

### Variable requise

Ajouter dans `.env.local` avant toute utilisation :
```
ADMIN_PREVIEW_PASSWORD="change-me-for-preview"
```

## Limitations MVP restantes (non bloquantes)

| Limitation | Niveau | Action requise avant production |
|---|---|---|
| Protection admin MVP, pas production-grade | Documenté | Remplacer par Supabase Auth |
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
