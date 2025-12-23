'use client';

import { createContext, useContext, useMemo } from 'react';
import type { Locale } from '@/i18n/locales';
import type { LocaleContent } from '@/content/fr';
import { frContent } from '@/content/fr';
import { arContent } from '@/content/ar';
import { enContent } from '@/content/en'; // Import enContent
import { steps as frGuideSteps, type Step } from '@/content/guideSteps';
import { guideStepsEn } from '@/content/guideSteps.en';
import { guideStepsAr } from '@/content/guideSteps.ar';
import { mergeWithFallback } from '@/lib/i18nFallback';

type EnhancedContent = LocaleContent & { guideSteps: Record<string, Step> };

type Ctx = { locale: Locale; content: EnhancedContent };

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const baseContent = useMemo(() => {
    if (locale === 'ar') return arContent;
    if (locale === 'en') return enContent; // Use enContent for 'en' locale
    return frContent;
  }, [locale]);

  // Ajoute les guides détaillés, localisés par langue (fallback FR)
  const localizedGuideSteps: Record<string, Step> =
    locale === 'ar' ? guideStepsAr : locale === 'en' ? guideStepsEn : frGuideSteps;

  const content: EnhancedContent = useMemo(() => {
    // Deep merge with FR as fallback to avoid undefined access at runtime
    const merged = mergeWithFallback<LocaleContent>(baseContent, frContent);
    return { ...merged, guideSteps: localizedGuideSteps };
  }, [baseContent, localizedGuideSteps]);
  const value = useMemo(() => ({ locale, content }), [locale, content]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}