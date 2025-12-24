import type { Locale } from '@/i18n/locales';

const PLACEHOLDER_TEXT: Record<Locale, string> = {
  fr: 'Contenu manquant',
  en: 'Content coming soon',
  ar: 'المحتوى قريباً',
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

export function fillMissingWithPlaceholders<T>(value: Partial<T> | undefined, template: T, locale: Locale): T {
  const placeholder = PLACEHOLDER_TEXT[locale];

  if (typeof template === 'string') {
    const val = typeof value === 'string' ? value : '';
    return ((val && (val as string).trim().length > 0 ? val : placeholder) as unknown) as T;
  }

  if (typeof template === 'number') {
    const val = typeof value === 'number' ? value : 0;
    return val as T;
  }

  if (typeof template === 'boolean') {
    const val = typeof value === 'boolean' ? value : false;
    return val as T;
  }

  if (Array.isArray(template)) {
    const valArray = Array.isArray(value) ? (value as unknown[]) : [];
    if (template.length === 0) {
      return valArray as T;
    }
    const itemTemplate = template[0];
    const filled = (valArray.length > 0 ? valArray : template).map((item) =>
      fillMissingWithPlaceholders(item as Partial<typeof itemTemplate>, itemTemplate, locale),
    );
    return filled as T;
  }

  if (isPlainObject(template)) {
    const source = isPlainObject(value) ? (value as Record<string, unknown>) : {};
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(template)) {
      result[key] = fillMissingWithPlaceholders(source[key] as Partial<unknown>, (template as Record<string, unknown>)[key], locale);
    }
    return result as T;
  }

  // Fallback for unexpected types
  return (value as T) ?? (placeholder as T);
}

