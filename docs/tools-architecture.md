# Architecture future des outils

Ce document prépare les intégrations futures de Marhaban Canada sans les activer. Le MVP actuel reste mock/local : réservation manuelle via modal, admin mock/local, pas d'authentification, pas de paiement, pas d'email automatique.

## Principes

- Ne pas brancher de service externe avant que le flux manuel soit validé.
- Ne jamais exposer de clé serveur côté client.
- Ne pas demander de documents sensibles dans le MVP.
- Garder l'admin comme mock/local tant qu'une authentification solide n'est pas en place.
- Ajouter chaque outil avec une étape de test dédiée avant production.

## Supabase

Usage prévu :
- Base de données pour les demandes de réservation, clients, dossiers, demandes anti-arnaque et ressources.
- Auth admin plus tard.
- Storage documents plus tard, seulement si un vrai besoin est validé.

## État d'intégration Supabase (2026-06-17)

### Branché et fonctionnel
- `bookings` — POST via `/api/bookings`, lecture Server Component `/admin/bookings`
- `scam_checks` — POST via `/api/scam-checks`, lecture Server Component `/admin/scam-checks`
- `case_files` — POST via `/api/cases`, PATCH via `/api/cases/[id]`, lecture Server Component `/admin/cases`
- `resources` — GET via `/api/resources`, POST via `/api/resources`, PATCH via `/api/resources/[id]`, lecture Server Component `/admin/resources`
- `admin_notes` — POST via `/api/admin-notes`, GET via `/api/admin-notes`, PATCH via `/api/admin-notes/[id]`, composant AdminNotesPanel

### Pas encore branché
- Supabase Auth — admin sans authentification réelle pour l'instant
- Supabase Storage — exclu du MVP actuel

### Sécurité
- `SUPABASE_SERVICE_ROLE_KEY` utilisé uniquement dans les Route Handlers et Server Components.
- RLS activée sur toutes les tables. Aucune policy anon sauf `resources` (lecture publique des publiées).
- Aucun secret dans les composants client.

Risques :
- Exposition accidentelle de `SUPABASE_SERVICE_ROLE_KEY`.
- Admin public sans auth.
- Stockage de données personnelles sans règles d'accès strictes.
- Upload de documents avant d'avoir une politique de sécurité.

## Resend

Usage prévu :
- Email de confirmation au client.
- Notification admin lors d'une nouvelle demande.
- Résumé après appel plus tard.

Phase d'intégration :
1. Après stockage fiable des `bookings` dans Supabase.
2. Commencer par une notification admin simple.
3. Ajouter ensuite confirmation client et templates multilingues.

Exclu du MVP actuel :
- Emails automatiques.
- Templates transactionnels.
- Résumés après appel.

Risques :
- Envoi d'informations personnelles dans des emails trop détaillés.
- Mauvaise configuration SPF/DKIM/DMARC.
- Spam ou envois répétés si les webhooks sont mal gérés.

## Calendly

Usage prévu :
- Réservation automatique de créneaux.
- Synchronisation ou redirection vers les événements Calendly selon le service.

Phase d'intégration :
1. Après validation du flux manuel "demande d'abord".
2. Ajouter des liens par service.
3. Évaluer ensuite les webhooks Calendly si nécessaire.

Exclu du MVP actuel :
- Embed Calendly obligatoire.
- Confirmation automatique.
- Synchronisation calendrier.

Risques :
- Perte de contrôle sur la qualification des demandes.
- Créneaux réservés avant validation du besoin.
- Boucles ou états divergents entre Calendly et l'admin.

## Stripe

Usage prévu :
- Paiement des appels payants.
- Stripe Checkout ou Payment Links.
- Webhooks pour marquer une réservation comme payée.

Phase d'intégration :
1. Après validation des offres payantes.
2. Commencer par Payment Links ou Checkout.
3. Ajouter webhooks seulement quand le stockage Supabase est prêt.

Exclu du MVP actuel :
- Paiement.
- Facturation automatisée.
- Webhooks Stripe.

Risques :
- Mauvais traitement des remboursements.
- Webhooks non vérifiés.
- Confusion entre demande gratuite, demande payante et réservation confirmée.

## Vercel Analytics

Usage prévu :
- Suivi des visites.
- Suivi des conversions vers `/reserver`.
- Mesure des clics sur les packs et demandes envoyées.

Phase d'intégration :
1. Après stabilisation des pages publiques.
2. Ajouter les événements de conversion minimaux.
3. Éviter tout suivi de données personnelles.

Exclu du MVP actuel :
- Tracking détaillé utilisateur.
- Envoi de champs de formulaire à l'analytics.

Risques :
- Collecte involontaire de données personnelles.
- Mesures trop nombreuses et peu actionnables.

## Ordre recommandé

1. Finaliser la modal de réservation manuelle.
2. Finaliser l'admin mock/local.
3. Connecter les demandes de la modal à une couche mock admin.
4. Ajouter Supabase pour `bookings`.
5. Ajouter Resend pour notification admin.
6. Ajouter confirmation client Resend.
7. Ajouter Supabase pour `clients`, `case_files`, `scam_checks`.
8. Ajouter Stripe pour offres payantes validées.
9. Ajouter Calendly quand le flux manuel est éprouvé.
10. Ajouter Vercel Analytics sans données personnelles.

## Non prêt production

L'admin actuel est MVP mock/local seulement. Il ne doit pas être considéré prêt production sans authentification, règles d'accès, audit des données personnelles et revue des secrets d'environnement.
