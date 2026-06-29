import type { Locale } from '@/i18n/locales';

export type CalendlyEventKey = 'discovery' | 'orientation';

export type CalendlyEvent = {
  key: CalendlyEventKey;
  title: string;
  duration: string;
  description: string;
  url: string | null;
};

const publicUrls = {
  discovery: process.env.NEXT_PUBLIC_CALENDLY_FREE_CALL_URL?.trim() || '',
  orientation: process.env.NEXT_PUBLIC_CALENDLY_ORIENTATION_CALL_URL?.trim() || '',
} as const;

export const calendlyEvents: Record<Locale, readonly CalendlyEvent[]> = {
  fr: [
    {
      key: 'discovery',
      title: 'Appel découverte gratuit — 15 min',
      duration: '15 min',
      description: 'Comprendre la situation rapidement avant de choisir le bon format.',
      url: publicUrls.discovery || null,
    },
    {
      key: 'orientation',
      title: 'Appel orientation — 45 min',
      duration: '45 min',
      description: 'Clarifier les prochaines étapes et repartir avec un plan simple.',
      url: publicUrls.orientation || null,
    },
  ],
  en: [
    {
      key: 'discovery',
      title: 'Free discovery call — 15 min',
      duration: '15 min',
      description: 'Understand the situation quickly before choosing the right format.',
      url: publicUrls.discovery || null,
    },
    {
      key: 'orientation',
      title: 'Orientation call — 45 min',
      duration: '45 min',
      description: 'Clarify the next steps and leave with a simple plan.',
      url: publicUrls.orientation || null,
    },
  ],
  ar: [
    {
      key: 'discovery',
      title: 'مكالمة تعريفية مجانية — 15 دقيقة',
      duration: '15 دقيقة',
      description: 'فهم سريع للوضع قبل اختيار الصيغة المناسبة.',
      url: publicUrls.discovery || null,
    },
    {
      key: 'orientation',
      title: 'مكالمة توجيه — 45 دقيقة',
      duration: '45 دقيقة',
      description: 'توضيح الخطوات التالية والخروج بخطة بسيطة.',
      url: publicUrls.orientation || null,
    },
  ],
};

export function getCalendlyUrl(locale: Locale, key: CalendlyEventKey) {
  const service = calendlyEvents[locale].find((item) => item.key === key);
  return service?.url ?? null;
}
