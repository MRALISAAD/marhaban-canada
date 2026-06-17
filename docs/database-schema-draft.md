# Draft schema Supabase

Ce document est une première proposition de schéma. Rien n'est connecté en production pour l'instant.

## Conventions

- `id`: `uuid`, clé primaire.
- `created_at`: `timestamptz`, valeur par défaut `now()`.
- `updated_at`: `timestamptz`, si la ligne peut être modifiée.
- Les statuts peuvent commencer en `text` avec contrainte, puis devenir des enums Postgres.
- Les données sensibles et documents personnels sont exclus du MVP.

## bookings

Demandes créées depuis la modal `/reserver`.

| Colonne | Type approximatif | Notes |
| --- | --- | --- |
| id | uuid | primary key |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | pour changements de statut |
| full_name | text | prénom et nom |
| email | text | email client |
| phone | text nullable | téléphone optionnel |
| city_province | text | ville / province |
| service_key | text | discovery, orientation, anti_scam |
| service_label | text | libellé affiché |
| duration | text | durée affichée |
| price_label | text | prix affiché |
| client_status | text | student, worker, newcomer, other |
| preferred_language | text | fr, en, ar |
| message | text | situation décrite |
| disclaimer_accepted | boolean | obligatoire |
| status | text | new, to_contact, slot_proposed, confirmed, completed, cancelled |
| source | text | ex: reserver_modal |

## clients

Profil client minimal, créé après qualification ou première demande.

| Colonne | Type approximatif | Notes |
| --- | --- | --- |
| id | uuid | primary key |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | utile pour profil |
| full_name | text | nom client |
| email | text | unique plus tard si pertinent |
| phone | text nullable | optionnel |
| city_province | text nullable | localisation générale |
| preferred_language | text | fr, en, ar |
| client_status | text nullable | student, worker, newcomer, other |
| notes_summary | text nullable | résumé non sensible |
| status | text | active, inactive, archived |

## case_files

Dossiers d'accompagnement côté admin.

| Colonne | Type approximatif | Notes |
| --- | --- | --- |
| id | uuid | primary key |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | pour suivi |
| client_id | uuid nullable | relation future vers clients |
| booking_id | uuid nullable | relation future vers bookings |
| title | text | titre dossier |
| status | text | new, active, waiting_client, next_step, completed, archived |
| next_step | text | prochaine action |
| action_plan | jsonb | liste d'étapes |
| internal_summary | text nullable | résumé interne |
| last_contact_at | timestamptz nullable | dernier contact |

## scam_checks

Demandes d'évaluation informative du risque.

| Colonne | Type approximatif | Notes |
| --- | --- | --- |
| id | uuid | primary key |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | pour traitement |
| requester_name | text | nom demandeur |
| email | text | contact |
| phone | text nullable | optionnel |
| situation | text | explication |
| amount_requested | text nullable | montant affiché, pas calcul financier |
| message_or_link | text nullable | contenu fourni, sans documents sensibles |
| urgency | text | low, normal, high |
| risk_level | text | unreviewed, low, medium, high, urgent |
| status | text | new, reviewing, responded, closed |
| response_summary | text nullable | réponse informative |

## resources

Guides éditoriaux gérés plus tard depuis l'admin.

| Colonne | Type approximatif | Notes |
| --- | --- | --- |
| id | uuid | primary key |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | publication |
| title | text | titre |
| slug | text | slug unique par locale |
| category | text | housing, banking, phone, documents, first_week, students, anti_scam |
| locale | text | fr, en, ar |
| status | text | draft, review, published, archived |
| summary | text | résumé |
| content | jsonb | sections structurées ou markdown plus tard |
| owner | text | responsable |
| published_at | timestamptz nullable | date publication |

## admin_notes

Notes internes liées à une réservation, un dossier, un client ou une demande anti-arnaque.

| Colonne | Type approximatif | Notes |
| --- | --- | --- |
| id | uuid | primary key |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | si note éditable |
| author_id | uuid nullable | futur admin auth |
| target_type | text | booking, client, case_file, scam_check |
| target_id | uuid | id de l'objet lié |
| body | text | note interne |
| status | text | active, archived |

## Sécurité à prévoir

- Activer RLS avant toute mise en production.
- Garder `SUPABASE_SERVICE_ROLE_KEY` côté serveur uniquement.
- Ne pas stocker passeports, permis ou documents dans le MVP.
- Prévoir une politique de rétention des données personnelles.
- Ajouter l'auth admin avant d'exposer `/admin` en production.
