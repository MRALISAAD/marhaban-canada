'use client';

import { useLanguage } from '@/components/LanguageProvider';
import { ResourceGuideTemplate } from '@/components/resources/ResourceGuideTemplate';
import { getHtmlAttrs } from '@/i18n/locales';

const guideIds = ['documents', 'transport', 'credit'] as const;

type GuideId = (typeof guideIds)[number];

type ResourceGuideClientProps = {
  slug: string;
};

export function ResourceGuideClient({ slug }: ResourceGuideClientProps) {
  const { content, locale } = useLanguage();
  const { dir } = getHtmlAttrs(locale);
  const guideId = slug as GuideId;

  if (!guideIds.includes(guideId)) {
    return (
      <main className="bg-slate-50 px-4 py-12" dir={dir} lang={locale}>
        <div className="mx-auto w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-700 shadow-sm">
          Guide introuvable.
        </div>
      </main>
    );
  }

  const guide = content.resourcesPage.guides[guideId];

  return (
    <main className="bg-slate-50 px-4 py-12" dir={dir} lang={locale}>
      <ResourceGuideTemplate
        guide={guide}
        labels={{
          eyebrow: content.resourcesPage.labels.guideEyebrow,
          calloutTitle: content.resourcesPage.labels.guideCalloutTitle,
          whatTitle: content.resourcesPage.labels.guideWhatTitle,
          whyTitle: content.resourcesPage.labels.guideWhyTitle,
          howTitle: content.resourcesPage.labels.guideHowTitle,
          pitfallsTitle: content.resourcesPage.labels.guidePitfallsTitle,
          actionsTitle: content.resourcesPage.labels.guideActionsTitle,
          sourcesTitle: content.resourcesPage.labels.guideSourcesTitle,
          actionPrompt: content.resourcesPage.labels.guideActionPrompt,
        }}
      />
    </main>
  );
}
