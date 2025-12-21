'use client';

import { useLanguage } from '@/components/LanguageProvider';

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="inline-flex items-center gap-2" role="group" aria-label="Changer de langue">
      <button
        type="button"
        onClick={() => setLocale('fr')}
        className={`pill transition-colors ${locale === 'fr' ? 'border-red-500/30 bg-red-50 text-red-700' : 'hover:bg-zinc-50'}`}
      >
        FR
      </button>
      <button
        type="button"
        onClick={() => setLocale('en')}
        className={`pill transition-colors ${locale === 'en' ? 'border-red-500/30 bg-red-50 text-red-700' : 'hover:bg-zinc-50'}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale('ar')}
        className={`pill transition-colors ${locale === 'ar' ? 'border-red-500/30 bg-red-50 text-red-700' : 'hover:bg-zinc-50'}`}
      >
        AR
      </button>
    </div>
  );
}
