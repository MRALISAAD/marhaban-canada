'use client';

import LocalizedLink from '../LocalizedLink';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';

export function EmergencyCTA() {
  const { content } = useLanguage();
  return (
    <div className="rounded-3xl border border-amber-200 bg-[#FFF4E3] p-5 shadow-warm-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-amber-900">{content.scams.microcopy.victimTitle}</p>
          <p className="mt-1 text-xs text-amber-900/80">{content.scams.microcopy.victimSubtitle}</p>
        </div>
        <LocalizedLink
          href="/arnaques#victim-action"
          className="inline-flex items-center gap-2 rounded-full bg-amber-800 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          aria-label={`${content.scams.microcopy.victimTitle} - ${content.scams.microcopy.victimSubtitle}`}
        >
          <AlertTriangle className="h-4 w-4" />
          {content.scams.microcopy.planLinkLabel}
        </LocalizedLink>
      </div>
    </div>
  );
}
