# Variables d'environnement futures

Ne pas mettre de vraies clés dans ce fichier. Utiliser `.env.local` en local et les variables d'environnement Vercel en déploiement.

```bash
# Admin MVP preview (protection temporaire, pas production-grade)
# Valeur libre — à changer avant tout déploiement preview
ADMIN_PREVIEW_PASSWORD="change-me-for-preview"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://example-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="replace-with-public-anon-key"
# ATTENTION: clé serveur uniquement. Ne jamais exposer dans un fichier client ou avec NEXT_PUBLIC_.
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
- `SUPABASE_SERVICE_ROLE_KEY` donne un accès privilégié à Supabase : ne jamais l'importer dans un composant client, ne jamais la préfixer `NEXT_PUBLIC_`.
- Ne jamais committer `.env.local`.
- Ne pas activer ces intégrations avant que l'admin soit protégé par authentification.
