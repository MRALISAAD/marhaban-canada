'use client';

import type { ReactNode } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { getHtmlAttrs } from '@/i18n/locales';

export function DirWrapper({ children }: { children: ReactNode }) {
  const { locale } = useLanguage();
  const { dir } = getHtmlAttrs(locale);

  return (
    <div dir={dir} lang={locale} className="min-h-screen">
      {children}
    </div>
  );
}
