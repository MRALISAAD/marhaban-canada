'use client';

import { useChecklistLocale } from '@/hooks/useChecklistLocale';

export function ChecklistLanguageSelector() {
  const { locale, setChecklistLocale } = useChecklistLocale();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="checklist-locale" className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Lang
      </label>
      <select
        id="checklist-locale"
        value={locale}
        onChange={(event) => setChecklistLocale(event.target.value as typeof locale)}
        className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
      >
        <option value="fr">FR</option>
        <option value="en">EN</option>
        <option value="ar">AR</option>
      </select>
    </div>
  );
}
