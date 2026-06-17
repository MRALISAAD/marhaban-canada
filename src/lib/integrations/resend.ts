/**
 * Placeholder Resend.
 *
 * TODO:
 * - Installer Resend quand les bookings seront stockés en base.
 * - Envoyer une notification admin à ADMIN_NOTIFICATION_EMAIL.
 * - Ajouter ensuite les confirmations client multilingues.
 * - Ne jamais inclure de documents sensibles dans les emails.
 */

export type EmailTemplateKey = 'admin_booking_notification' | 'client_booking_confirmation' | 'call_summary';

export const plannedEmailTemplates: readonly EmailTemplateKey[] = [
  'admin_booking_notification',
  'client_booking_confirmation',
  'call_summary',
];
