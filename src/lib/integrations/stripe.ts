/**
 * Placeholder Stripe.
 *
 * TODO:
 * - Brancher Stripe seulement après validation des offres payantes.
 * - Commencer avec Stripe Checkout ou Payment Links.
 * - Vérifier les webhooks avec STRIPE_WEBHOOK_SECRET côté serveur.
 * - Ne pas mélanger une demande de créneau avec une réservation payée confirmée.
 */

export type StripeProductKey = 'orientation_call' | 'scam_check_call';

export const paidServiceKeys: readonly StripeProductKey[] = ['orientation_call', 'scam_check_call'];
