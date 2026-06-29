const calendlyFreeCallUrl = process.env.NEXT_PUBLIC_CALENDLY_FREE_CALL_URL?.trim() || '';
const calendlyOrientationCallUrl = process.env.NEXT_PUBLIC_CALENDLY_ORIENTATION_CALL_URL?.trim() || '';

export const bookingIntegrationLinks = {
  tallyForm: {
    label: 'Calendly – formulaire de réservation',
    href: calendlyFreeCallUrl,
  },
  calendly: {
    label: 'Calendly – appel orientation',
    href: calendlyOrientationCallUrl,
  },
} as const;
