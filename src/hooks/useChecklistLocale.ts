'use client';

import { useCallback, useMemo } from 'react';
import type { ChecklistLocale } from '@/content/checklistOffline';
import { useLocalStorageState } from '@/lib/useLocalStorageState';

const locales: ChecklistLocale[] = ['fr', 'en', 'ar'];

export function useChecklistLocale() {
  const [locale, setLocale] = useLocalStorageState<ChecklistLocale>('mc_checklist_locale', {
    defaultValue: 'fr',
    parse: (value) => value as ChecklistLocale,
    serialize: (value) => value,
    validate: (value) => locales.includes(value),
  });

  const setChecklistLocale = useCallback((next: ChecklistLocale) => {
    setLocale(next);
  }, [setLocale]);

  const dir = useMemo(() => (locale === 'ar' ? 'rtl' : 'ltr'), [locale]);

  return { locale, dir, setChecklistLocale };
}
