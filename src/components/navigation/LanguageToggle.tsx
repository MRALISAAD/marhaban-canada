'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';
import type { Locale } from '@/i18n/locales';

export function LanguageToggle() {
  const { locale } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    // Replace current locale in pathname with new locale
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'fr' || segments[0] === 'ar') {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    router.push(`/${segments.join('/')}`);
  };

  return (
    <div className="inline-flex items-center gap-2" role="group" aria-label="Changer de langue">
      <button
        type="button"
        onClick={() => switchLocale('fr')}
        className={`pill transition-colors ${locale === 'fr' ? 'border-red-500/30 bg-red-50 text-red-700' : 'hover:bg-zinc-50'}`}
        aria-pressed={locale === 'fr'}
      >
        FR
      </button>
      <button
        type="button"
        onClick={() => switchLocale('ar')}
        className={`pill transition-colors ${locale === 'ar' ? 'border-red-500/30 bg-red-50 text-red-700' : 'hover:bg-zinc-50'}`}
        aria-pressed={locale === 'ar'}
      >
        AR
      </button>
    </div>
  );
}
