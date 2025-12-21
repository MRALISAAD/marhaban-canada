'use client';

import type { ReactNode } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

export function DirWrapper({ children }: { children: ReactNode }) {
  const { dir, locale } = useLanguage();

  return (
    <div dir={dir} lang={locale} className="min-h-screen">
      {children}
    </div>
  );
}
