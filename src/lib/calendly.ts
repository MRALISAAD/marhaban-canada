import type { Locale } from '@/i18n/locales';

export type CalendlyEventKey = 'discovery' | 'orientation' | 'antiScam';

export type CalendlyEvent = {
  key: CalendlyEventKey;
  title: string;
  duration: string;
  description: string;
  url: string | null;
};

const publicUrls = {
  discovery: process.env.NEXT_PUBLIC_CALENDLY_DISCOVERY_URL?.trim() || '',
  orientation: process.env.NEXT_PUBLIC_CALENDLY_ORIENTATION_URL?.trim() || '',
  antiScam: process.env.NEXT_PUBLIC_CALENDLY_ANTI_SCAM_URL?.trim() || '',
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
      title: 'Appel orientation — 30 min',
      duration: '30 min',
      description: 'Clarifier les prochaines étapes et repartir avec un plan simple.',
      url: publicUrls.orientation || null,
    },
    {
      key: 'antiScam',
      title: 'Prévention anti-arnaque — 20/30 min',
      duration: '20-30 min',
      description: 'Vérifier avant de payer ou d’envoyer des documents sensibles.',
      url: publicUrls.antiScam || null,
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
      title: 'Orientation call — 30 min',
      duration: '30 min',
      description: 'Clarify the next steps and leave with a simple plan.',
      url: publicUrls.orientation || null,
    },
    {
      key: 'antiScam',
      title: 'Anti-scam prevention — 20/30 min',
      duration: '20-30 min',
      description: 'Check before paying or sending sensitive documents.',
      url: publicUrls.antiScam || null,
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
      title: 'مكالمة توجيه — 30 دقيقة',
      duration: '30 دقيقة',
      description: 'توضيح الخطوات التالية والخروج بخطة بسيطة.',
      url: publicUrls.orientation || null,
    },
    {
      key: 'antiScam',
      title: 'الوقاية من الاحتيال — 20/30 دقيقة',
      duration: '20-30 دقيقة',
      description: 'التحقق قبل الدفع أو إرسال وثائق حساسة.',
      url: publicUrls.antiScam || null,
    },
  ],
};

export function getCalendlyUrl(locale: Locale, key: CalendlyEventKey) {
  const service = calendlyEvents[locale].find((item) => item.key === key);
  return service?.url ?? null;
}
