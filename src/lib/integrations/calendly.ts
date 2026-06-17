/**
 * Placeholder Calendly.
 *
 * TODO:
 * - Garder le flux manuel "demande d'abord" pendant le MVP.
 * - Ajouter les URLs Calendly par service après validation du parcours.
 * - Évaluer les webhooks seulement si l'admin doit synchroniser automatiquement les créneaux.
 */

export type CalendlyServiceKey = 'discovery' | 'orientation' | 'scam_check';

export const calendlyServiceKeys: readonly CalendlyServiceKey[] = ['discovery', 'orientation', 'scam_check'];
