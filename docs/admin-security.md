# Admin Security — Marhaban Canada

## Auth Model

Admin access uses three independent layers:

| Layer | Mechanism | Where enforced |
|---|---|---|
| 1. Session | Supabase Auth (email + password) | `src/proxy.ts` middleware, `requireAdmin()` |
| 2. Allowlist | `ADMIN_ALLOWED_EMAILS` env var | `src/proxy.ts` middleware, `requireAdmin()` |
| 3. MFA | TOTP verified (AAL2) | `src/proxy.ts` middleware, `requireAdminMfa()` |

All three must pass to access protected admin pages. If any check fails, the user is redirected.

## AAL Levels

Supabase uses Authenticator Assurance Levels:

- **AAL1**: User authenticated with password only
- **AAL2**: User authenticated with password AND verified a TOTP MFA code in this session

Protected admin pages (`/admin/dashboard`, `/admin/bookings`, etc.) require AAL2.

The `/admin/mfa` page only requires AAL1 (session + allowlist), so users can complete MFA setup or verification there.

## Login Flow

```
/admin/login (enter email + password)
    ↓ Supabase Auth signInWithPassword()
    ↓ Check email is in ADMIN_ALLOWED_EMAILS
    ↓ Always redirect to /admin/mfa
        ↓ If user has verified TOTP factor → verify flow
        ↓ If no verified factor → setup flow
            ↓ challengeAndVerify() succeeds → session is AAL2
            ↓ redirect /admin/dashboard
```

## Safer MFA Setup Procedure

The MFA setup flow is gated by a temporary server-side code to prevent a stolen password from being used to enroll a rogue authenticator.

### Steps

1. Create Supabase Auth admin user (Dashboard → Authentication → Users → Add user)
2. Add email to `ADMIN_ALLOWED_EMAILS`
3. Generate a one-time setup code:
   ```
   openssl rand -base64 32
   ```
4. Set in `.env.local` (and hosting env):
   ```
   ADMIN_MFA_SETUP_ENABLED=true
   ADMIN_MFA_SETUP_CODE=<generated-code>
   ```
5. Log in at `/admin/login` with email + password
6. You are redirected to `/admin/mfa` → locked screen appears
7. Enter the setup code → QR code appears
8. Scan QR with authenticator app (Google Authenticator, Authy, 1Password…)
9. Enter the 6-digit TOTP code → click "Vérifier et activer"
10. Immediately set:
    ```
    ADMIN_MFA_SETUP_ENABLED=false
    ADMIN_MFA_SETUP_CODE=
    ```
11. Restart/redeploy
12. Log in again — you should see the verification flow (no QR, code input only)
13. Verify AAL2 in `/admin/settings`

### Recovery (lost authenticator)

1. In Supabase Dashboard → Authentication → Users → find admin → Factors tab → delete TOTP factor
2. Temporarily re-enable setup gate (steps 3–4 above)
3. Log in and re-enroll
4. Disable setup gate again

### Security properties

- Attacker with stolen password cannot enroll their own TOTP (setup gate blocks it)
- `ADMIN_MFA_SETUP_CODE` is never exposed to the browser or logged
- `enroll()` is only called after the setup gate API returns `{ ok: true }`
- After MFA is configured, `ADMIN_MFA_SETUP_ENABLED=false` means the setup screen is permanently locked

## Redirect Matrix

| Situation | Redirect |
|---|---|
| No session, any admin route | `/admin/login` |
| Valid session, email not in allowlist | sign out → `/admin/login?error=unauthorized` |
| Valid session, ADMIN_ALLOWED_EMAILS empty | `/admin/login?error=missing_allowlist` |
| Valid session (AAL1), protected route | `/admin/mfa` |
| Valid session (AAL2), `/admin/login` | `/admin/dashboard` |
| Valid session (AAL1), `/admin/login` | `/admin/mfa` |
| Valid session (AAL2), `/admin/mfa` | `/admin/dashboard` |

## MFA Implementation

Uses Supabase Auth TOTP via `@supabase/supabase-js` v2 MFA API:

- `POST /api/admin/mfa/setup-gate` — checks session + allowlist and validates the temporary setup code without requiring AAL2
- `supabase.auth.mfa.enroll({ factorType: 'totp' })` — creates new TOTP enrollment, returns QR code and secret after the setup gate passes
- `supabase.auth.mfa.listFactors()` — lists all factors with their status (`unverified` | `verified`)
- `supabase.auth.mfa.challengeAndVerify({ factorId, code })` — convenience for challenge + verify in one call
- `supabase.auth.mfa.getAuthenticatorAssuranceLevel()` — returns `currentLevel` (`aal1` | `aal2`)

Setup and verification happen client-side in `AdminMfaClient.tsx`, but first-time setup is locked until the server-side setup gate returns `{ ok: true }`. The TOTP secret and QR code are:
- Never logged to the server console
- Never stored in the database or cookies
- Only displayed transiently in the browser after the setup gate passes

## Key Files

| File | Role |
|---|---|
| `src/proxy.ts` | Edge middleware — first auth gate for all `/admin/*` routes |
| `src/lib/admin/require-admin.ts` | `requireAdmin()` (AAL1 check) and `requireAdminMfa()` (AAL2 check) |
| `src/app/admin/(protected)/layout.tsx` | Layout-level AAL2 guard — defense in depth after middleware |
| `src/app/admin/mfa/page.tsx` | Server component — determines setup vs verify mode |
| `src/components/admin/AdminMfaClient.tsx` | Client component — handles enroll, challenge, verify |
| `src/app/admin/login/LoginFormClient.tsx` | Client login form — redirects to `/admin/mfa` after password auth |
| `src/app/api/admin/logout/route.ts` | GET — signs out session, safe redirect to `/admin/*` only |

## What Is NOT Exposed

- `SUPABASE_SERVICE_ROLE_KEY` — server-only, never `NEXT_PUBLIC_` prefixed
- MFA TOTP secret — only shown transiently in browser during setup
- QR code data URL — only shown transiently in browser during setup
- Full session tokens — never logged to console
- Admin email list — masked in settings UI (`b****r@domain.com`)

## Allowlist

`ADMIN_ALLOWED_EMAILS` is a comma-separated list of emails in `.env.local` (and hosting env):

```
ADMIN_ALLOWED_EMAILS=contact@marhabancanada.ca,businesssvvd@gmail.com
```

Parsing: `.split(',').map(e => e.trim().toLowerCase()).filter(Boolean)`

The middleware and `requireAdmin()` both independently parse and check this list.

**Important:** Do NOT commit `.env.local`. Keep the allowlist in the hosting platform's environment variable config (Vercel, Netlify, Docker env, etc.).

## Recovering from Lost MFA Access

If an admin loses access to their authenticator app:

1. Go to **Supabase Dashboard → Authentication → Users**
2. Find the admin user and click the row
3. In the **Factors** tab, delete the TOTP factor
4. Temporarily re-enable the setup gate with a new `ADMIN_MFA_SETUP_CODE`
5. The admin can log in with password, enter the setup code at `/admin/mfa`, and enroll a new TOTP factor
6. Disable the setup gate again immediately after enrollment

There are no manual recovery codes — Supabase Dashboard is the authority for MFA management.

## What NOT to Do

- Do not commit `.env.local` or any file containing `SUPABASE_SERVICE_ROLE_KEY`
- Do not prefix service role key with `NEXT_PUBLIC_`
- Do not log TOTP secrets, QR codes, or session tokens to console
- Do not disable MFA requirement by removing the AAL2 check
- Do not expose admin routes publicly (they should 404 or redirect for non-admins)
- Do not implement manual recovery codes (use Supabase Dashboard instead)
- Do not activate the Calendly webhook without explicit review
