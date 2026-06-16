'use client';

import Link from 'next/link';
import { ArrowRight, CalendarCheck, Download } from 'lucide-react';
import LocalizedLink from './LocalizedLink';
import { useLanguage } from '@/components/LanguageProvider';
import { bookingPath } from '@/lib/routes';

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
  const callLabelByLocale: Record<string, string> = {
    fr: 'Réserver un appel',
    en: 'Book a call',
    ar: 'احجز مكالمة',
  };
  const journeyLabelByLocale: Record<string, string> = {
    fr: 'Voir le parcours',
    en: 'View the journey',
    ar: 'عرض المسار',
  };

  const effectivePrimary = callLabelByLocale[locale] ?? callLabelByLocale.fr;
  const effectiveJourney = primaryLabel ?? journeyLabelByLocale[locale] ?? content.microcopy.homeCtaPrimary;
  const effectiveSecondary =
    secondaryLabel ?? defaultSecondaryByLocale[locale] ?? defaultSecondaryByLocale.fr;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <LocalizedLink
        href={bookingPath(locale)}
        className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-marhaban-ink px-5 py-2.5 text-sm font-semibold text-white shadow-warm-sm transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-cream"
      >
        {effectivePrimary}
        <CalendarCheck size={16} />
      </LocalizedLink>
      <LocalizedLink
        href="/parcours"
        onClick={onStart}
        className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-marhaban-leaf/20 bg-white/85 px-5 py-2.5 text-sm font-semibold text-marhaban-ink transition hover:border-marhaban-leaf/60 hover:bg-marhaban-mint/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/30 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-cream"
      >
        {effectiveJourney}
        <ArrowRight size={16} />
      </LocalizedLink>
      <Link
        href="/checklist.pdf"
        className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-marhaban-ink/60 transition hover:text-marhaban-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/30"
      >
        {effectiveSecondary}
        <Download size={16} />
      </Link>
    </div>
  );
}
