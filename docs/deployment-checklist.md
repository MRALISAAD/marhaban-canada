# Deployment Checklist — Marhaban Canada

## Required Env Vars

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_ALLOWED_EMAILS`
- `NEXT_PUBLIC_CALENDLY_FREE_CALL_URL` — optional; if set, the Calendly button appears in the booking form

## Admin Setup

Before the first login, the Supabase auth user must exist:

1. Open Supabase dashboard → **Authentication → Users**
2. Click **Add user** (or **Invite user**)
3. Enter the admin email and a strong password
4. If email confirmation is required: click **Confirm** manually in the Users table, or disable email confirmation in **Authentication → Settings → Email**
5. Add the same email to `ADMIN_ALLOWED_EMAILS` in `.env.local` (and in the hosting platform's env config)
6. Test: open `/admin/login`, sign in — you should land on `/admin/dashboard`

**Dev diagnostics**: in `NODE_ENV=development`, the login page shows detailed Supabase error messages (missing env vars, unconfirmed email, invalid credentials). In production it shows only the generic message.

## Supabase

- Confirm the `booking_preparation_forms` table exists.
- Confirm inserts are accepted from the server API using the service role key.
- Confirm `SUPABASE_SERVICE_ROLE_KEY` is only set server-side and is not exposed to the browser.

## Admin Route Check

- Sign in at `/admin/login` with an email in `ADMIN_ALLOWED_EMAILS`.
- Open `/admin`.
- Open `/admin/bookings`.
- Confirm real `booking_preparation_forms` rows appear with date, status, full name, email, phone, needs, urgency, availability, and preferred contact method.

## Form Submit Check

- Open `/fr/reserver/formulaire`.
- Submit a valid free-call request.
- Confirm the API returns success.
- Confirm a new row appears in `booking_preparation_forms`.
- Confirm the 45-minute orientation offer remains disabled and does not submit or redirect.

## CSP Check

- Build with `NODE_ENV=production`.
- Confirm production CSP does not include `'unsafe-eval'`.
- Confirm `'unsafe-eval'` is only present when `process.env.NODE_ENV === "development"`.

## Production QA Routes

- `/fr`
- `/en`
- `/ar`
- `/fr/reserver`
- `/fr/reserver/formulaire`
- `/fr/ressources`
- `/fr/anti-arnaque`
- `/fr/a-propos`
- `/admin`
- `/admin/bookings`

Check each at 390px, 768px, and 1440px for no horizontal overflow, correct navbar placement, usable modal/form buttons, clean footer, Arabic RTL, disabled 45-minute offer, and free-call modal opening.

## Favicon Check

After deploy, open any page in a private/incognito tab.
The tab icon must show the Marhaban Canada logo, not a red square or blank.

Key files:
- `src/app/favicon.ico` — Next.js special file (overrides everything)
- `public/favicon.ico`, `public/icon.png`, `public/apple-icon.png`

Hard-refresh (`Ctrl+Shift+R`) after deploying if the old icon persists.

## Booking Modal (3-Step Form) Check

The booking modal now collects:
- **Step 1**: Prénom, Email, Téléphone (optional)
- **Step 2**: Situation géographique, Besoins (max 3)
- **Step 3**: Situation (max 1200 chars), Disponibilités (max 600 chars), Mode de contact, Consentements

Fields **not** shown to users but sent to API:
- `last_name: "Non précisé"` (hardcoded)

Fields **removed** from previous version:
- `lastName` (hidden), `generalContext`, `mainQuestion`

## Calendly Status

The booking form offers "Calendly" as a contact method option. Users who select it see either:
- A **"Choose a slot on Calendly"** button (if `NEXT_PUBLIC_CALENDLY_FREE_CALL_URL` is set)
- A **"coming soon"** message (if the env var is empty)

The 45-minute orientation offer remains **disabled** and must not be made bookable without explicit decision.

To activate the Calendly button: set `NEXT_PUBLIC_CALENDLY_FREE_CALL_URL=https://calendly.com/your-username/free-call` in `.env.local` and in the hosting platform env vars.

## Rollback Note

If production form submission or admin verification fails, roll back to the previous deployment and verify Supabase env vars and the `booking_preparation_forms` schema before redeploying.
