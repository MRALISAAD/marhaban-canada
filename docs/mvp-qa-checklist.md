# MVP QA checklist

Date: 2026-06-17

## Routes testees

Controle HTTP sur `npm run start` apres `npm run build`:

- `/fr` -> 200
- `/fr/reserver` -> 200
- `/fr/accompagnement` -> 200
- `/fr/services/orientation` -> 200
- `/fr/services/anti-arnaque` -> 200
- `/admin/dashboard` -> 200
- `/admin/bookings` -> 200
- `/admin/cases` -> 200

Bug trouve pendant la QA:

- `/admin/*` etait redirige vers `/:locale/admin/*`, ce qui donnait un 404 apres redirection.
- Correction faite dans `middleware.ts`: exclusion de `/admin` du middleware de localisation.

## Resultat lint

Commande:

```bash
npm run lint
```

Resultat: OK.

## Resultat build

Commande:

```bash
npm run build
```

Resultat: OK.

Le build liste bien les routes MVP:

- `/[locale]/reserver`
- `/[locale]/accompagnement`
- `/[locale]/services/orientation`
- `/[locale]/services/anti-arnaque`
- `/admin/dashboard`
- `/admin/bookings`
- `/admin/cases`

## Flux teste par inspection

Flux coeur:

```text
/fr/reserver -> modal reservation -> localStorage bookings -> /admin/bookings -> Creer dossier -> localStorage cases -> /admin/cases
```

Points verifies par inspection du code:

- La modal de reservation sauvegarde une demande locale via `addLocalBooking`.
- `local-booking-store.ts` protege `localStorage` avec `typeof window !== "undefined"`.
- `/admin/bookings` fusionne les demandes locales avant les `mockBookings`.
- Le bouton `Creer dossier` cree un dossier local via `addLocalCase`.
- Le store cases deduplique par `sourceBookingId` / `bookingId`.
- `/admin/cases` fusionne les dossiers locaux avant les `mockCases`.
- `local-case-store.ts` protege `localStorage` avec `typeof window !== "undefined"`.
- L'admin utilise `AdminShell` et n'importe pas la Navbar/Footer publics.
- Aucun import depuis `src/lib/integrations` dans le flux admin inspecte.
- Aucun champ sensible n'est demande dans la modal: pas de passeport, permis, upload ou document.
- Le disclaimer modal precise un accompagnement general et informatif, pas un conseil juridique ou d'immigration reglemente.
- Le wording anti-arnaque reste informatif.

## UX verifiee par inspection

- `/fr/reserver` garde des espacements top/bottom explicites autour des sections.
- CTA principal hero, CTA mobile discret et CTA final visibles dans le code.
- Modal responsive: bottom sheet mobile via `items-end`, centree desktop via `sm:items-center`.
- Admin desktop/tablette: `AdminShell` en grille sidebar + contenu, fond `marhaban-cream`.
- Cards admin: `AdminCard`, `rounded-[1.75rem]`, `shadow-warm-sm`.
- Badges statuts/risques centralises dans `AdminBadge`.
- Pas de contraste faible evident repere dans les zones inspectees; les textes critiques utilisent `marhaban-forestDark`, `marhaban-ink`, `marhaban-muted` ou blanc sur fond sombre.

## Bugs trouves

1. Route admin localisee par erreur

- Symptome: `/admin/dashboard`, `/admin/bookings`, `/admin/cases` retournaient 307 vers `/fr/admin/...`, puis 404.
- Cause: `middleware.ts` ajoutait une locale a toutes les routes sans locale, y compris `/admin`.
- Correction: ajouter `pathname.startsWith('/admin')` aux exclusions du middleware.

## Corrections faites

- `middleware.ts`: exclusion de `/admin` du middleware i18n.
- `docs/mvp-qa-checklist.md`: creation de cette checklist QA.

## Points a tester manuellement dans le navigateur

Le controle navigateur headless Playwright n'a pas pu etre termine dans cet environnement: Chromium Playwright n'etait pas installe et `npx playwright install chromium` est reste bloque apres telechargement. A verifier manuellement:

- Console navigateur sans erreurs sur les 8 routes testees.
- Mobile `/fr/reserver`: navbar ne chevauche pas le contenu, CTA sticky visible.
- Mobile modal: ouverture, focus premier champ, fermeture par X, overlay et Escape.
- Soumission modal: demande visible dans `/admin/bookings` apres rafraichissement.
- `/admin/bookings`: `Voir`, `Marquer contacte`, `Confirmer`, `Resume`, `Creer dossier`.
- `/admin/cases`: dossier cree visible en premier, detail ouvrable, sauvegarde statut/priorite/prochaine etape/notes.
- Arabe `/ar/reserver`: direction RTL correcte et modal non cassee.
