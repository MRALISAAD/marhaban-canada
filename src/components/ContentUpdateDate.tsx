'use client';

import { useLanguage } from '@/components/LanguageProvider';
import { FEATURE_FLAGS } from '@/lib/featureFlags';

// Date de mise à jour du contenu (mois/année)
const CONTENT_UPDATE_DATE = {
  month: 'janvier', // Mettre à jour manuellement
  year: 2025,
};

const CONTENT_UPDATE_DATE_EN = {
  month: 'January',
  year: 2025,
};

const CONTENT_UPDATE_DATE_AR = {
  month: 'يناير',
  year: 2025,
};

export function ContentUpdateDate() {
  const { locale } = useLanguage();

  if (!FEATURE_FLAGS.ENABLE_CONTENT_UPDATE_DATE) {
    return null;
  }

  const labels = {
    fr: 'Dernière mise à jour :',
    en: 'Last updated:',
    ar: 'آخر تحديث:',
  };

  const date =
    locale === 'ar'
      ? `${CONTENT_UPDATE_DATE_AR.month} ${CONTENT_UPDATE_DATE_AR.year}`
      : locale === 'en'
        ? `${CONTENT_UPDATE_DATE_EN.month} ${CONTENT_UPDATE_DATE_EN.year}`
        : `${CONTENT_UPDATE_DATE.month} ${CONTENT_UPDATE_DATE.year}`;

  return (
    <p className="text-xs text-slate-500">
      {labels[locale]} {date}
    </p>
  );
}

