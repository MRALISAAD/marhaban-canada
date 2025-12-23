'use client';

import { provinceOptions, useProvince } from '@/components/ProvinceProvider';
import { useLanguage } from '@/components/LanguageProvider';

type ProvinceSelectorProps = {
  label?: string;
};

export function ProvinceSelector({ label }: ProvinceSelectorProps) {
  const { province, setProvince } = useProvince();
  const { locale } = useLanguage();

  const defaultLabelByLocale: Record<string, string> = {
    fr: "Où t'installes-tu ?",
    en: 'Where are you settling?',
    ar: 'أين ستستقر؟',
  };

  const helperByLocale: Record<string, string> = {
    fr: 'Ta sélection adapte automatiquement les étapes locales du parcours.',
    en: 'Your selection automatically adapts the journey steps to your province.',
    ar: 'اختيارك يضبط خطوات الرحلة تلقائيًا حسب المقاطعة.',
  };

  const effectiveLabel = label ?? defaultLabelByLocale[locale] ?? defaultLabelByLocale.fr;
  const helperText = helperByLocale[locale] ?? helperByLocale.fr;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <label htmlFor="province" className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {effectiveLabel}
      </label>
      <select
        id="province"
        value={province}
        onChange={(event) => setProvince(event.target.value as typeof province)}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
      >
        {provinceOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p className="mt-2 text-xs text-slate-600">{helperText}</p>
    </div>
  );
}
