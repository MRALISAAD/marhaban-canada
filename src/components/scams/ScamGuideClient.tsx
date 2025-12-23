'use client';

import { useLanguage } from '@/components/LanguageProvider';
import { ScamGuidePage } from '@/components/scams/ScamGuidePage';
import type { ScamGuideContentDetails } from '@/content/contentTypes';

type ScamGuideClientProps = {
  slug: string;
};

export function ScamGuideClient({ slug }: ScamGuideClientProps) {
  const { content, locale } = useLanguage();
  const raw: ScamGuideContentDetails = content.scams?.guides?.[slug] ?? {};

  // Localized titles per slug to avoid FR leaking into EN/AR
  const titleBySlug: Record<
    string,
    { fr: string; en: string; ar: string }
  > = {
    logement: {
      fr: 'Logement',
      en: 'Housing',
      ar: 'السكن',
    },
    emploi: {
      fr: 'Emploi',
      en: 'Employment',
      ar: 'العمل',
    },
    telephone: {
      fr: 'Téléphone / forfaits',
      en: 'Phone / plans',
      ar: 'الهاتف / الباقات',
    },
    banque: {
      fr: 'Banque / cartes / frais',
      en: 'Bank / cards / fees',
      ar: 'البنك / البطاقات / الرسوم',
    },
    immigration: {
      fr: 'Immigration / faux agents',
      en: 'Immigration / fake agents',
      ar: 'الهجرة / وكلاء مزيفون',
    },
    marketplace: {
      fr: 'Marketplace (Kijiji/FB)',
      en: 'Marketplace (Kijiji/FB)',
      ar: 'البيع عبر المنصات',
    },
  };

  const localizedTitleMap = titleBySlug[slug];
  const title =
    raw.title ??
    (localizedTitleMap
      ? localizedTitleMap[locale as keyof typeof localizedTitleMap] ?? localizedTitleMap.fr
      : '');

  const guide = {
    slug,
    title,
    subtitle: raw.subtitle ?? '',
    scenario: raw.scenario ?? [],
    redFlags: raw.redFlags ?? [],
    actions: raw.actions ?? [],
    neverDo: raw.neverDo ?? [],
    mantra: raw.mantra ?? '',
    sources: raw.sources ?? [],
  };

  // If we n'avons vraiment aucun contenu (ni titre ni scenario), ne rend rien
  if (!guide.title && guide.scenario.length === 0) {
    return null;
  }

  return <ScamGuidePage guide={guide} />;
}



