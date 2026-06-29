# Deployment Checklist — Marhaban Canada

## Required Env Vars

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_ALLOWED_EMAILS`
- `NEXT_PUBLIC_CALENDLY_FREE_CALL_URL` — optional; if set, the Calendly button appears in the booking form

## Admin Setup (First Deploy)

Before the first login, the Supabase auth user must exist:

1. Open Supabase dashboard → **Authentication → Users**
2. Click **Add user** (or **Invite user**)
3. Enter the admin email and a strong password
4. If email confirmation is required: click **Confirm** manually in the Users table, or disable email confirmation in **Authentication → Settings → Email**
5. Add the same email to `ADMIN_ALLOWED_EMAILS` in `.env.local` (and in the hosting platform's env config)
6. Make sure Supabase MFA is enabled: **Authentication → Settings → Multi-Factor Authentication → Enable TOTP**

## Admin MFA Setup (Mandatory — First Deploy)

Admin access requires password + MFA (TOTP AAL2). The QR code is gated by a temporary setup code to prevent rogue enrollment.

### One-time setup

1. Create Supabase Auth admin user (Dashboard → Authentication → Users → Add user + Confirm)
2. Add email to `ADMIN_ALLOWED_EMAILS` in `.env.local` and hosting env
3. Enable Supabase TOTP: **Authentication → Settings → Multi-Factor Authentication → Enable TOTP**
4. Generate setup code: `openssl rand -base64 32`
5. In `.env.local` (and hosting env):
   ```
   ADMIN_MFA_SETUP_ENABLED=true
   ADMIN_MFA_SETUP_CODE=<generated>
   ```
6. Open `/admin/login` → sign in with email + password
7. Redirected to `/admin/mfa` → enter setup code → QR code appears
8. Scan QR with authenticator app → enter 6-digit code → "Vérifier et activer"
9. Redirected to `/admin/dashboard` ✓
10. **Immediately** set:
    ```
    ADMIN_MFA_SETUP_ENABLED=false
    ADMIN_MFA_SETUP_CODE=
    ```
11. Restart/redeploy
12. Log in again: email/password → `/admin/mfa` code entry only → dashboard
13. Check `/admin/settings`: MFA = Activée, AAL2, Setup gate = Désactivé

### Emergency MFA reset

1. Supabase Dashboard → Authentication → Users → admin user → Factors tab → delete TOTP factor
2. Temporarily re-enable setup gate (steps 4–5 above)
3. Complete setup flow again
4. Disable setup gate (step 10)

## Security Checks

- `SUPABASE_SERVICE_ROLE_KEY` must be server-only. Never prefix with `NEXT_PUBLIC_`.
- No secret should appear in browser DevTools → Network → any response body
- MFA TOTP secret (QR code) is never logged to server console
- Admin routes require AAL2 — attempting to reach `/admin/dashboard` with only AAL1 redirects to `/admin/mfa`

## Supabase

- Confirm the `booking_preparation_forms` table exists.
- Confirm inserts are accepted from the server API using the service role key.
- Confirm `SUPABASE_SERVICE_ROLE_KEY` is only set server-side and is not exposed to the browser.
- Confirm MFA/TOTP is enabled in Supabase Auth Settings.

## Admin Route Check

- Sign in at `/admin/login` → redirected to `/admin/mfa` → enter TOTP code → reach `/admin/dashboard`
- Open `/admin/bookings` (requires AAL2 — confirm no redirect to MFA page)
- Open `/admin/settings` — confirm MFA shows Activée + AAL2

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
- `/admin` (redirects to `/admin/login` if no session)
- `/admin/bookings` (requires AAL2)

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
