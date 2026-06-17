# Integrations

Ce dossier prépare les futures intégrations externes. Rien ici ne doit appeler une API réelle pour le moment.

## Ordre prévu

1. Supabase sera branché après stabilisation de l'admin mock/local.
2. Resend sera branché après l'écriture fiable des `bookings` dans Supabase.
3. Stripe sera branché après validation des offres payantes.
4. Calendly sera branché après validation du flux manuel de demande de créneau.

## Règles

- Pas de clés API dans le code.
- Pas de dépendances externes tant que l'intégration n'est pas active.
- Pas de documents sensibles dans le MVP.
- Admin mock/local uniquement tant que l'auth n'est pas créée.
