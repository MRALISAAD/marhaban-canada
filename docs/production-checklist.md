# Checklist production

## Variables d'environnement

- `NEXT_PUBLIC_SITE_URL` pointe vers le domaine de production.
- `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` configurées.
- `SUPABASE_SERVICE_ROLE_KEY` configurée uniquement côté serveur.
- `ADMIN_ALLOWED_EMAILS` contient uniquement les emails admin autorisés.
- `NEXT_PUBLIC_SENTRY_DSN` configuré si le monitoring Sentry est activé.
- `NEXT_PUBLIC_GA_ID` configuré seulement si Analytics est utilisé.
- URLs Calendly publiques configurées ou laissées vides si le formulaire interne est utilisé.

## Supabase

- RLS activée sur `bookings`, `case_files`, `scam_checks`, `resources`, `admin_notes`.
- Aucune policy anon ne donne accès aux tables privées.
- Les insertions publiques passent uniquement par les routes API serveur.
- Les migrations de `docs/supabase-migration-v1.sql` sont appliquées sur l'environnement cible.
- Les données QA de test sont supprimées ou clairement identifiées.

## Admin

- Supabase Auth fonctionne avec les comptes admin attendus.
- `ADMIN_ALLOWED_EMAILS` refuse un compte non listé.
- `/admin/dashboard`, `/admin/bookings`, `/admin/scam-checks`, `/admin/cases`, `/admin/resources` redirigent vers `/admin/login` hors session.
- La déconnexion `/api/admin/logout` invalide la session.

## Formulaires

- `/fr/reserver` crée une réservation Supabase depuis le modal.
- Le fallback localStorage de réservation fonctionne si Supabase est indisponible.
- `/fr/services/anti-arnaque` crée une demande `scam_checks`.
- Les formulaires ne demandent pas NAS/SIN, passeport, carte bancaire, permis ou upload de documents.
- Les validations rejettent les champs sensibles ou inattendus.

## Routes publiques

- `/fr`, `/fr/reserver`, `/fr/services/anti-arnaque`, `/fr/accompagnement`, `/fr/ressources`, `/fr/a-propos` répondent sans 404.
- `/en` et `/ar` répondent sans 404.
- Navigation et CTAs pointent vers les routes finales.
- Mobile vérifié sur accueil, réservation, anti-arnaque et ressources.
- Arabe RTL vérifié sur `/ar`, `/ar/reserver` et `/ar/services/anti-arnaque`.

## Build et CI

- `npm ci` passe depuis un checkout propre.
- `npm run lint` passe.
- `npm run build` passe.
- GitHub Actions `CI` passe sur `push` et `pull_request`.
- Le build production est testé avec Webpack en local si un serveur dev est lancé: `npx next dev --webpack`.

## Monitoring

- Sentry reçoit un événement de test en staging si `NEXT_PUBLIC_SENTRY_DSN` est configuré.
- Aucun contenu complet de formulaire n'est volontairement loggé dans Sentry.
- Aucune clé `SUPABASE_SERVICE_ROLE_KEY`, Stripe, Resend ou autre secret n'est envoyée à Sentry.
- Alertes Sentry configurées pour erreurs serveur et erreurs client critiques.

## Rollback

- Garder le dernier déploiement stable disponible dans l'hébergeur.
- Si le lancement échoue, rollback vers le déploiement stable précédent.
- Désactiver temporairement `NEXT_PUBLIC_SENTRY_DSN` ou les URLs Calendly uniquement si elles causent un incident.
- Conserver une note d'incident avec heure, commit, symptôme, action de rollback et correctif prévu.
