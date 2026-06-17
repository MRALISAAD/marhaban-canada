# Variables d'environnement futures

Ne pas mettre de vraies clés dans ce fichier. Utiliser `.env.local` en local et les variables d'environnement Vercel en déploiement.

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://example-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="replace-with-public-anon-key"
SUPABASE_SERVICE_ROLE_KEY="replace-with-server-only-service-role-key"

# Resend
RESEND_API_KEY="re_replace_with_api_key"
ADMIN_NOTIFICATION_EMAIL="admin@example.com"

# Stripe
STRIPE_SECRET_KEY="sk_test_replace_with_secret_key"
STRIPE_WEBHOOK_SECRET="whsec_replace_with_webhook_secret"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_replace_with_publishable_key"

# Calendly
CALENDLY_DISCOVERY_URL="https://calendly.com/example/discovery"
CALENDLY_ORIENTATION_URL="https://calendly.com/example/orientation"
CALENDLY_SCAM_CHECK_URL="https://calendly.com/example/scam-check"
```

## Notes

- Les variables `NEXT_PUBLIC_*` sont exposées au navigateur.
- `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `STRIPE_SECRET_KEY` et `STRIPE_WEBHOOK_SECRET` doivent rester côté serveur.
- Ne jamais committer `.env.local`.
- Ne pas activer ces intégrations avant que l'admin soit protégé par authentification.
