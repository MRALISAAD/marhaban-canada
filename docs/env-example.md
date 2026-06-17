# Variables d'environnement

Ne pas mettre de vraies clés dans ce fichier. Utiliser `.env.local` en local et les variables d'environnement Vercel en déploiement.

```bash
# Supabase Auth admin — emails autorisés séparés par virgule
ADMIN_ALLOWED_EMAILS="admin@example.com,second@example.com"

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

## Notes de sécurité

- `NEXT_PUBLIC_*` sont exposées au navigateur — ne jamais y mettre de secrets.
- `SUPABASE_SERVICE_ROLE_KEY` donne un accès privilégié à Supabase contournant RLS : ne jamais l'importer dans un composant client, ne jamais la préfixer `NEXT_PUBLIC_`.
- `ADMIN_ALLOWED_EMAILS` est une allowlist serveur : si absente ou vide, l'accès admin est refusé.
- `ADMIN_PREVIEW_PASSWORD` : variable dépréciée, remplacée par Supabase Auth.
- Ne jamais committer `.env.local`.
