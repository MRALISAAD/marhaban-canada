'use client';

import { ArrowRight } from 'lucide-react';
import LocalizedLink from './LocalizedLink';
import { useLanguage } from '@/components/LanguageProvider';

type CTAProps = {
  onStart?: () => void;
  primaryLabel?: string;
  secondaryLabel?: string;
};

export function CTA({ onStart, primaryLabel, secondaryLabel }: CTAProps) {
  const { content, locale } = useLanguage();

  const effectivePrimary = primaryLabel ?? content.microcopy.homeCtaPrimary;

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
    </div>
  );
}
