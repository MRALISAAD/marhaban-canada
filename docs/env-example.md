# Variables d'environnement

Ne pas mettre de vraies clés dans ce fichier. Utiliser `.env.local` en local et les variables d'environnement de l'hébergeur en production.

```bash
# Public site metadata
NEXT_PUBLIC_SITE_URL="https://example.com"

# Supabase public browser/auth config
NEXT_PUBLIC_SUPABASE_URL="https://example.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="replace-with-public-anon-key"

# Supabase serveur uniquement. Ne jamais exposer avec NEXT_PUBLIC_.
SUPABASE_SERVICE_ROLE_KEY="replace-with-server-only-service-role-key"

# Admin Supabase Auth allowlist, emails séparés par virgule.
ADMIN_ALLOWED_EMAILS="admin@example.com,second@example.com"

# Sentry basic monitoring. Vide = désactivé.
NEXT_PUBLIC_SENTRY_DSN=""

# Google Analytics, optionnel.
NEXT_PUBLIC_GA_ID=""

# Calendly public links, optionnels.
NEXT_PUBLIC_CALENDLY_DISCOVERY_URL="https://calendly.com/example/discovery"
NEXT_PUBLIC_CALENDLY_ORIENTATION_URL="https://calendly.com/example/orientation"
NEXT_PUBLIC_CALENDLY_ANTI_SCAM_URL="https://calendly.com/example/anti-scam"
```

## Variables serveur futures ou optionnelles

Ces variables sont documentées pour les intégrations futures ou désactivées. Ne les configurer que si le code correspondant est branché.

```bash
RESEND_API_KEY="re_replace_with_api_key"
ADMIN_NOTIFICATION_EMAIL="admin@example.com"

STRIPE_SECRET_KEY="sk_test_replace_with_secret_key"
STRIPE_WEBHOOK_SECRET="whsec_replace_with_webhook_secret"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_replace_with_publishable_key"
```

## Notes de sécurité

- `NEXT_PUBLIC_*` est exposé au navigateur. Ne jamais y mettre de secret.
- `SUPABASE_SERVICE_ROLE_KEY` contourne RLS et doit rester côté serveur uniquement.
- `ADMIN_ALLOWED_EMAILS` doit être non vide en production. Si elle est absente, l'admin est refusé.
- `NEXT_PUBLIC_SENTRY_DSN` peut être public, mais ne doit pas être accompagné d'un token Sentry secret côté client.
- Ne jamais committer `.env.local`, une clé Supabase réelle, un token Sentry, une clé Stripe ou une clé Resend.
