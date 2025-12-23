'use client';

import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import LocalizedLink from './LocalizedLink';
import { useLanguage } from '@/components/LanguageProvider';

type CTAProps = {
  onStart?: () => void;
  primaryLabel?: string;
  secondaryLabel?: string;
};

export function CTA({ onStart, primaryLabel, secondaryLabel }: CTAProps) {
  const { content, locale } = useLanguage();

  const defaultSecondaryByLocale: Record<string, string> = {
    fr: 'Télécharger la checklist PDF',
    en: 'Download the checklist PDF',
    ar: 'تحميل قائمة التحقق PDF',
  };

  const effectivePrimary = primaryLabel ?? content.microcopy.homeCtaPrimary;
  const effectiveSecondary =
    secondaryLabel ?? defaultSecondaryByLocale[locale] ?? defaultSecondaryByLocale.fr;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <LocalizedLink
        href="/parcours"
        onClick={onStart}
        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/40"
      >
        {effectivePrimary}
        <ArrowRight size={16} />
      </LocalizedLink>
      <Link
        href="/checklist.pdf"
        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
      >
        {effectiveSecondary}
        <Download size={16} />
      </Link>
    </div>
  );
}
