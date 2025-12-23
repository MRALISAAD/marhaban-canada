import fr from '../locales/fr.json';
import en from '../locales/en.json';
import ar from '../locales/ar.json';

export type Lang = 'fr' | 'en' | 'ar';

const locales = { fr, en, ar };

export function getLocale(lang: Lang) {
  return locales[lang] || locales['fr'];
}

export function isRTL(lang: Lang) {
  return lang === 'ar';
}
