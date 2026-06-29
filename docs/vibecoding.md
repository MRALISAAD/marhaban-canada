You are working inside an existing Next.js project: marhaban-canada.

Goal:
Clean the existing codebase and rebuild the public website experience while adapting to the old/current code structure.

Very important:
Do not create a new app from zero.
Do not mass-delete the old code before understanding it.
First inspect the existing project structure, routes, components, locale system, styles, middleware/proxy, admin area, and current bugs.
Then refactor carefully.

Main direction:
Marhaban Canada should become a premium, simple, mobile-first website for newcomers to Canada.

Public website goal:
Help newcomers understand what to do first in Canada, avoid confusion, avoid scams, and get a clear action plan.

Important positioning:
Marhaban Canada gives practical guidance and general information.
It is NOT legal advice.
It is NOT immigration consulting.
Avoid language that sounds like regulated immigration advice.

Required disclaimer:
"Marhaban Canada offre un accompagnement général et informatif. Ce service ne remplace pas un avocat, un consultant réglementé en immigration ou un organisme gouvernemental."

Public platform should NOT include for now:
- Marketplace
- User dashboard
- Public login/auth
- Upload documents
- Complex service system
- Too many offers
- Too many routes
- Overloaded sections

Important exception:
Keep the existing internal admin area if it already exists.

Admin requirements:
- Do not remove admin routes, admin components, or admin logic unless they are clearly broken duplicated files.
- Keep admin protected if authentication/protection already exists.
- Do not show admin links in the public navbar or footer.
- Admin should not affect the public landing page experience.
- Public website = simple 2-offer landing website.
- Admin = internal management area.
- Do not build a huge new admin dashboard now.
- Only preserve, clean, and adapt what already exists.

If there is an existing admin route, keep/adapt it:
- /admin
- /[locale]/admin
- or the current admin route already used in the project

If admin currently manages services, bookings, content, or leads, simplify/adapt labels to match the new model:
1. Free call — 15 min
2. Orientation call — 45 min

Admin can keep:
- Bookings/leads overview
- Contact messages
- Call type management
- Basic content/settings if already present
- Resources/content management if already present

Do not add:
- Marketplace admin
- Multi-provider system
- Complex CRM
- User accounts
- Document upload system

Main locales:
- /fr
- /en
- /ar

Main public routes to keep/build:
- /[locale]
- /[locale]/reserver
- /[locale]/ressources
- /[locale]/anti-arnaque
- /[locale]/a-propos

Old public routes:
Check existing old routes such as:
- /book
- /checklist
- /arnaques
- /blog
- /accompagnement
- /services/orientation
- /commencer
- /parcours

Keep only what is useful.
Redirect old confusing routes to the new clean routes where appropriate.
Do not leave broken routes.
Make sure / redirects correctly to /fr or the default locale.

Two public offers only:

Offer 1:
Name: "Appel gratuit"
Duration: "15 min"
Purpose:
Understand the person's situation and guide them toward the best next step.
This is a trust/diagnosis call, not a full consultation.

Offer 2:
Name: "Appel orientation"
Duration: "45 min"
Purpose:
Explain the person's situation clearly, clarify priorities, and give them a simple action plan.

The free call should not explain everything.
The 45-minute call is the main complete explanation offer.

Design direction:
- Premium editorial
- Warm and human
- Mobile-first
- Desktop friendly
- Big typography
- Strong spacing
- Clean cards
- Smooth hover states
- Soft cream/beige background
- Deep green/brown text
- Strong CTA buttons
- Sticky mobile CTA
- No tiny text
- No clutter
- Inspired by the feeling of Two Leaves Tea, but do not copy it

Mobile requirements:
- One-column layout
- Big readable text
- Full-width buttons
- Cards stacked vertically
- Sticky bottom CTA: "Réserver"
- No heavy animation on mobile
- Navigation simple and clean

Desktop requirements:
- Large editorial hero
- Strong visual hierarchy
- 2-column layouts where useful
- Big cards
- More breathing room
- CTA visible in navbar
- Footer with stronger brand presence

Public navbar:
- Accueil
- Ressources
- Anti-arnaque
- À propos
- Réserver

Do not show admin in the public navbar.

Footer:
- Brand message
- Main links
- Disclaimer
- Contact/social placeholder if already present
- Clean premium layout

Homepage structure:
1. Hero
2. Problem section
3. Two offer cards
4. What we help with
5. Anti-scam trust section
6. How it works
7. Final CTA
8. Footer

Homepage FR copy:

Hero title:
"Bienvenue au Canada, sans te perdre dans les démarches."

Hero subtitle:
"Marhaban Canada t'aide à comprendre quoi faire, dans quel ordre, et comment éviter les erreurs coûteuses quand tu arrives au Canada."

Hero buttons:
"Réserver un appel gratuit"
"Voir l'appel 45 min"

Problem section title:
"Quand tu arrives, tout arrive en même temps."

Problem text:
"Logement, documents, banque, école, travail, téléphone, assurance, arnaques…
Le problème n'est pas seulement de trouver l'information.
Le vrai problème, c'est de savoir quoi faire en premier."

Offer card 1:
Title: "Appel gratuit"
Duration: "15 min"
Text: "Pour comprendre ta situation et t'orienter vers la bonne prochaine étape."
Extra: "Idéal si tu ne sais pas par où commencer."
CTA: "Réserver gratuitement"

Offer card 2:
Title: "Appel orientation"
Duration: "45 min"
Text: "Pour tout expliquer clairement et créer un plan simple selon ta situation."
Extra: "Idéal si tu veux arrêter de chercher partout et avancer avec confiance."
CTA: "Réserver l'appel 45 min"

What we help with:
Title:
"On peut t'aider à clarifier :"

Items:
- Les premières démarches après l'arrivée
- Le logement et les documents importants
- La banque, téléphone, assurance et transport
- Les erreurs fréquentes à éviter
- Les ressources officielles à utiliser
- Les situations qui semblent douteuses ou risquées

Anti-scam section:
Title:
"Avant de payer quelqu'un, vérifie."

Text:
"Beaucoup de nouveaux arrivants paient trop cher, font confiance trop vite, ou ne savent pas si une offre est normale.
On t'aide à poser les bonnes questions avant de prendre une décision."

CTA:
"Vérifier une situation"

How it works:
1. Tu réserves un appel
2. Tu expliques ta situation
3. On te donne un plan clair

Final CTA:
Title:
"Tu n'as pas besoin de tout comprendre seul."

Text:
"Commence avec un appel gratuit ou réserve directement l'appel 45 min pour clarifier ta situation."

Buttons:
"Appel gratuit"
"Appel 45 min"

Reservation page:
The reservation page should focus only on the 2 calls:
1. Appel gratuit — 15 min
2. Appel orientation — 45 min

Use the internal booking form for the active free-call flow.
Keep Calendly only as a future optional integration; it is not required for active booking.
Do not add unnecessary booking complexity.

Resources page:
Keep it simple.
Show useful newcomer resources.
Use clear cards.
Avoid too much content.
Prioritize official resources and practical guides.

Anti-scam page:
Explain how to verify before paying someone.
Keep the tone simple and protective.
Avoid making legal claims.
Include the disclaimer.

About page:
Explain Marhaban Canada simply:
- Why it exists
- Who it helps
- What it does
- What it does not replace

Code cleanup tasks:
1. Inspect the current app structure before editing.
2. Identify duplicated components, old unused sections, confusing route files, and dead content.
3. Keep useful layout, locale, navbar, footer, button, card, and page hero components.
4. Remove or simplify components that belong to the old complex platform idea.
5. Create a clean centralized content source if useful, for example:
   - lib/site-content.ts
   - lib/content.ts
   - dictionaries/fr.ts
   - dictionaries/en.ts
   - dictionaries/ar.ts
6. Keep copy centralized instead of hardcoding repeated text everywhere.
7. Make sure FR, EN, and AR are supported.
8. For Arabic, keep RTL support if already present. Do not break it.
9. Make navbar simple:
   - Accueil
   - Ressources
   - Anti-arnaque
   - À propos
   - Réserver
10. Make footer simple but premium.
11. Fix runtime bugs, including issues like:
   - adapterFn is not a function
   - broken middleware/proxy logic
   - broken route redirects
   - 404 on /
12. Make sure / redirects correctly to /fr or default locale.
13. Make sure each route works on desktop and mobile.
14. Make sure the reservation page focuses only on the 2 calls.
15. Keep the internal booking form as the active booking flow; Calendly is optional future work.
16. Remove old "too much platform" wording.
17. Remove claims that sound like legal advice or immigration consulting.
18. Add the disclaimer in the footer and relevant pages.
19. Preserve the existing admin area.
20. Make sure admin routes still work after the rebuild.
21. Keep admin separated from the public website.
22. Do not include admin in the public navigation.
23. If admin has old service labels, adapt them to the two-offer model:
   - Free call — 15 min
   - Orientation call — 45 min
24. If admin is broken, fix it without expanding scope into a huge dashboard.
25. Remove unused imports, unused components, broken files, and duplicated content.
26. Keep the code clean and understandable.

Suggested component structure:
- components/site/Header.tsx
- components/site/Footer.tsx
- components/site/MobileStickyCTA.tsx
- components/home/Hero.tsx
- components/home/ProblemSection.tsx
- components/home/OfferCards.tsx
- components/home/HelpTopics.tsx
- components/home/AntiScamSection.tsx
- components/home/HowItWorks.tsx
- components/home/FinalCTA.tsx
- components/ui/Button.tsx
- components/ui/Card.tsx

Suggested public page structure:
- app/[locale]/page.tsx
- app/[locale]/reserver/page.tsx
- app/[locale]/ressources/page.tsx
- app/[locale]/anti-arnaque/page.tsx
- app/[locale]/a-propos/page.tsx

Admin page structure:
Keep the current admin structure if it already exists.
Do not move admin unless necessary.
Do not break admin auth/protection.

Technical expectations:
- Next.js app router
- TypeScript
- Clean components
- Responsive CSS/Tailwind
- No unnecessary dependencies
- No broken imports
- No unused major files
- No console errors
- Public site mobile-friendly
- Public site desktop-friendly
- Admin preserved
- Build must pass
- Lint must pass

Quality bar:
The final website should feel like a real premium service website, not a school project, not a default template, and not an overloaded platform.

Before finishing, run:
npm run lint
npm run build

Final report must include:
1. What was cleaned
2. Routes changed
3. Components changed
4. Admin status
5. Bugs fixed
6. Files removed or simplified
7. Lint result
8. Build result
9. Any remaining TODOs

---

## Docker — local development

### Files

| File | Purpose |
|---|---|
| `Dockerfile.dev` | Dev image: Node 20 Alpine + npm ci (source mounted at runtime) |
| `docker-compose.dev.yml` | Dev compose: hot reload, port 3000, named volumes for node_modules |
| `.dockerignore` | Keeps secrets and build artifacts out of the Docker build context |

### Quick start

```bash
# First time or after dependency changes — rebuild the image
docker compose -f docker-compose.dev.yml up --build

# Subsequent starts (image already built)
docker compose -f docker-compose.dev.yml up

# Or use the npm shortcut
npm run docker:dev
```

### Other useful commands

```bash
# Stop containers
docker compose -f docker-compose.dev.yml down
# or: npm run docker:down

# Tail logs
docker compose -f docker-compose.dev.yml logs -f

# Rebuild image + wipe named volumes (fresh node_modules install)
docker compose -f docker-compose.dev.yml down -v
docker compose -f docker-compose.dev.yml up --build
# or: npm run docker:clean && npm run docker:dev
```

### Environment variables

Copy `.env.example` to `.env.local` and fill in real values before starting:

```bash
cp .env.example .env.local
# then edit .env.local
```

Required variables for the full experience:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_ALLOWED_EMAILS=
```

Booking flow: users complete `/[locale]/reserver/formulaire`, the server stores the request in Supabase, and the user sees a confirmation message. Calendly is not required for the active free-call booking flow. `NEXT_PUBLIC_CALENDLY_ORIENTATION_CALL_URL` is not required while the 45-minute orientation call is marked coming soon.

The `.env.local` file is loaded by docker-compose via `env_file` — it is never copied into the Docker image.

### Hot reload

Hot reload works out of the box on Linux and WSL2 (project on the Linux filesystem).

If hot reload stops working (e.g. project files on a Windows filesystem via `/mnt/c`), enable polling by uncommenting in `docker-compose.dev.yml`:

```yaml
environment:
  CHOKIDAR_USEPOLLING: "true"
  WATCHPACK_POLLING: "true"
```

### URLs when running

| URL | Description |
|---|---|
| http://localhost:3000/ | Redirects to /fr |
| http://localhost:3000/fr | Homepage (French) |
| http://localhost:3000/en | Homepage (English) |
| http://localhost:3000/ar | Homepage (Arabic) |
| http://localhost:3000/fr/reserver | Booking page |
| http://localhost:3000/fr/reserver/formulaire | Booking form |
| http://localhost:3000/fr/ressources | Resources index |
| http://localhost:3000/fr/anti-arnaque | Anti-scam page |
| http://localhost:3000/fr/a-propos | About page |
| http://localhost:3000/admin | Admin (protected) |
| http://localhost:3000/admin/bookings | Admin bookings list |
| http://localhost:3000/admin/bookings/[id] | Admin booking detail |

## Booking flow

### Active flow (no Calendly)

```
User clicks "Réserver gratuitement"
  → /[locale]/reserver/formulaire
  → User fills the form (4 sections)
  → POST /api/booking-preparation-forms
  → Server validates and saves to Supabase booking_preparation_forms
  → Status: form_submitted
  → User sees confirmation message
  → Admin receives the request in /admin/bookings
  → Admin contacts user manually to confirm a time slot
```

### Optional Calendly flow (when CALENDLY_FREE_CALL_URL is set)

```
Same form submission
  → Server saves to Supabase with status: calendly_pending
  → Server builds Calendly URL with prefill (name, email, utm_content=submissionId)
  → Returns redirectUrl to client
  → Client redirects user to Calendly
  → User books a slot on Calendly
  → Calendly fires webhook to /api/webhooks/calendly
  → Webhook verifies signature (CALENDLY_WEBHOOK_SIGNING_KEY)
  → For invitee.created: updates status to calendly_confirmed
  → For invitee.canceled: updates status to cancelled
  → Admin can see confirmed status in /admin/bookings
```

### Supabase table: booking_preparation_forms

Run migration: docs/supabase-migration-v2-booking-forms.sql

Status values: form_submitted → contacted → confirmed_manually → completed | cancelled | no_show
With Calendly: form_submitted → calendly_pending → calendly_confirmed → ...

### Calendly webhook setup

1. Go to Calendly dashboard → Integrations → Webhooks
2. Add webhook URL:
   - Local: http://localhost:3000/api/webhooks/calendly (use ngrok or similar)
   - Production: https://marhabancanada.ca/api/webhooks/calendly
3. Subscribe to events: invitee.created, invitee.canceled
4. Copy the signing key to CALENDLY_WEBHOOK_SIGNING_KEY env var

### Env vars

Required for booking form:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

Optional for Calendly redirect:
- CALENDLY_FREE_CALL_URL (server-side only, never NEXT_PUBLIC_)
- CALENDLY_WEBHOOK_SIGNING_KEY

### 45-minute orientation call

NOT bookable. Shown as "Bientôt disponible" / "Coming soon" / "قريباً" on /reserver.
No Calendly link. Button is disabled.

### Admin status management

Admin can update preparation form status from /admin/bookings or /admin/bookings/[id]:
- contacted
- confirmed_manually
- completed
- cancelled
- no_show

---

## Privacy & compliance (PIPEDA / Loi 25 / CASL)

### Data collected in booking_preparation_forms

| Field | Purpose | Collected |
|---|---|---|
| first_name, last_name | Identify user for call | Yes |
| email | Contact to confirm call | Yes |
| phone | Optional contact | Yes (optional) |
| location_status | Understand situation | Yes |
| general_status | Soft general context for preparation (studies/work/family/settlement), not immigration status | Yes (optional) |
| needs | Topics to prepare | Yes |
| situation | Free text context | Yes (max 2000 chars) |
| main_question | Focus of call | Yes (optional) |
| urgency | Scheduling priority | Yes (optional) |
| availability | Scheduling | Yes |
| preferred_contact_method | Call setup | Yes |
| consent | Legal + informational disclaimer | Yes (required) |
| marketing_consent | Newsletter opt-in | Yes (optional, CASL) |
| ip_hash | Abuse prevention (SHA-256) | Yes (hashed, not raw) |
| user_agent | Abuse prevention | Yes (first 512 chars) |
| retention_until | Data retention deadline | Yes (created_at + 12 months) |

### Data NOT collected (by design)

- SIN / NAS
- Passport numbers
- Permit numbers
- Date of birth
- Bank information, including bank account or credit card information
- Passwords
- Medical details
- Immigration status
- Immigration file numbers
- File uploads of any kind

### Purpose statement (shown on form)

"Les informations demandées servent uniquement à préparer ton appel gratuit, comprendre ta situation générale et te contacter pour confirmer un créneau."

The booking preparation form is for general orientation purposes only. It is not designed to collect immigration status, identity document numbers, financial credentials, passwords, or document uploads.

### Privacy notice (shown on form)

"Tes informations sont utilisées pour gérer ta demande d'appel. Elles ne sont pas vendues. Elles ne sont accessibles qu'à l'équipe autorisée de Marhaban Canada."

### Sensitive data notice (shown on form)

"Important : ne partage pas de NAS, numéro de passeport, numéro de permis, informations bancaires, mots de passe ou documents sensibles dans ce formulaire."

### Who can access data

- Admin team only, authenticated via Supabase Auth + ADMIN_ALLOWED_EMAILS email allowlist
- API routes use SUPABASE_SERVICE_ROLE_KEY server-side only; it is never exposed to client code and must never be prefixed with NEXT_PUBLIC_
- No public read access — RLS blocks all anon reads
- No public update or delete

### CASL / marketing emails

- Transactional emails about the booking request are allowed (service messages)
- Marketing/newsletter emails require marketing_consent = true
- Do not auto-subscribe users to marketing lists
- Include unsubscribe mechanism before sending any marketing message
- marketing_consent defaults to false

### Data retention (TODO)

- retention_until is set to created_at + 12 months at form submission
- Review and delete/anonymize records past their retention date
- Suggested schedule: monthly cleanup job or manual review
- SQL in migration: see docs/supabase-migration-v2-booking-forms.sql footer
- Records with status completed/cancelled/no_show are priority for cleanup

### Breach readiness

- Under PIPEDA: breaches creating real risk of significant harm must be reported to the Privacy Commissioner of Canada
- Under Law 25 (Québec): same reporting obligation + notify affected individuals
- Maintain an internal incident log for any data access anomaly
- This is an operational responsibility — no automated reporting is wired

### Security controls

- Honeypot field: bots that fill it get a fake 200 — submission is dropped
- Server-side allowed-value validation for all select fields
- Needs validated against an allowed set
- Max lengths enforced server-side for all text fields
- Basic rate limit: max 3 submissions per email per 15 minutes (via Supabase count query)
- TODO: replace rate limit with Upstash or middleware-level rate limiting in production
- Generic error messages — no DB errors, stack traces, or internal details exposed to the client
- No sensitive data logged (no phone, situation text, or personal details in logs)

### Required env vars

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   ← NEVER prefix with NEXT_PUBLIC_

# Admin access
ADMIN_ALLOWED_EMAILS=admin@example.com

# Calendly (optional, server-side only)
# CALENDLY_FREE_CALL_URL=
# CALENDLY_WEBHOOK_SIGNING_KEY=   ← NEVER prefix with NEXT_PUBLIC_
```

### Legal disclaimer (required on relevant pages)

"Marhaban Canada offre un accompagnement général et informatif. Ce service ne remplace pas un avocat, un consultant réglementé en immigration ou un organisme gouvernemental."
