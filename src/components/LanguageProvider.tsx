'use client';

import { createContext, useCallback, useContext, useLayoutEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Locale, LocaleContent } from '@/content/siteContent';
import { defaultLocale, getContent, locales } from '@/content/siteContent';
import { useLocalStorageState } from '@/lib/useLocalStorageState';

type LanguageContextValue = {
  locale: Locale;
  changeLocale: () => void;
  setLocale: (next: Locale) => void;
  content: LocaleContent;
  dir: 'ltr' | 'rtl';
};

const LanguageContext = createContext<LanguageContextValue>({
  locale: defaultLocale,
  changeLocale: () => {},
  setLocale: () => {},
  content: getContent(defaultLocale),
  dir: getContent(defaultLocale).dir,
});

const STORAGE_KEY = 'mc-lang';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useLocalStorageState<Locale>(STORAGE_KEY, {
    defaultValue: defaultLocale,
    parse: (value) => value as Locale,
    serialize: (value) => value,
    validate: (value) => locales.includes(value),
  });

  const changeLocale = useCallback(() => {
    setLocale((current) => {
      const currentIndex = locales.indexOf(current);
      const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % locales.length;
      return locales[nextIndex];
    });
  }, [setLocale]);

  const setLocaleExplicit = useCallback((next: Locale) => {
    setLocale(next);
  }, [setLocale]);

  const content = getContent(locale);
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    document.documentElement.lang = locale;
    document.documentElement.dir = content.dir;
    document.documentElement.setAttribute('data-locale', locale);
  }, [locale, content.dir]);

  const value = useMemo(
    () => ({
      locale,
      changeLocale,
      setLocale: setLocaleExplicit,
      content,
      dir: content.dir,
    }),
    [locale, content, changeLocale, setLocaleExplicit],
  );

  return (
    <LanguageContext.Provider value={value}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={locale}
          dir={content.dir}
          lang={locale}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
