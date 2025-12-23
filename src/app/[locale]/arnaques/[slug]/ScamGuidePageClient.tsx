'use client';

import { BackButton } from "@/components/BackButton";
import LocalizedLink from '@/components/LocalizedLink';
import { ScamGuideClient } from "@/components/scams/ScamGuideClient";
import { useLanguage } from '@/components/LanguageProvider';

type ScamGuidePageClientProps = {
  slug: string;
};

export function ScamGuidePageClient({ slug }: ScamGuidePageClientProps) {
  const { content } = useLanguage();
  const isHousing = slug === "logement";

  // Get localized labels from content
  const backLabel = content.scams?.microcopy?.backToScams ?? 'Back to scams';
  const goToJourneyLabel = content.scams?.microcopy?.goToJourney ?? 'Go to journey';
  const homeLabel = content.scams?.microcopy?.breadcrumb?.home ?? 'Home';
  const scamsLabel = content.scams?.microcopy?.breadcrumb?.scams ?? 'Scams';
  const needMoreTitle = content.scams?.microcopy?.needMoreTitle ?? 'Need to go further?';
  const needMoreText = content.scams?.microcopy?.needMoreText ?? 'Consult the housing guide to understand the steps and avoid mistakes.';
  const needMoreCta = content.scams?.microcopy?.needMoreCta ?? 'See housing guide →';

  // Get localized housing label
  const housingLabel = content.scams?.microcopy?.housingLabel ?? 'Housing';

  return (
    <main className="bg-slate-50 px-4 py-12">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <BackButton fallbackHref="/arnaques" label={backLabel} />
          <LocalizedLink
            href="/parcours"
            className="text-xs font-semibold text-slate-600 underline underline-offset-2"
          >
            {goToJourneyLabel}
          </LocalizedLink>
        </div>

        {isHousing ? (
          <nav className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            <LocalizedLink className="underline underline-offset-2" href="/">
              {homeLabel}
            </LocalizedLink>
            <span className="mx-2">→</span>
            <LocalizedLink className="underline underline-offset-2" href="/arnaques">
              {scamsLabel}
            </LocalizedLink>
            <span className="mx-2">→</span>
            <span className="text-slate-700">{housingLabel}</span>
          </nav>
        ) : null}
      </div>

      <ScamGuideClient slug={slug} />

      {isHousing ? (
        <div className="mx-auto mt-6 w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
          <p className="font-semibold text-slate-900">{needMoreTitle}</p>
          <p className="mt-1 text-sm text-slate-600">
            {needMoreText}
          </p>
          <LocalizedLink
            href="/parcours/guide/steps/housing"
            className="mt-3 inline-flex items-center text-sm font-semibold text-slate-900 underline underline-offset-4"
          >
            {needMoreCta}
          </LocalizedLink>
        </div>
      ) : null}
    </main>
  );
}

