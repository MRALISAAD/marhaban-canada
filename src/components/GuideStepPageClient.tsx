'use client';

import { useLanguage } from '@/components/LanguageProvider';
import { GuideStepDetail } from '@/components/GuideStepDetail';
import type { Step } from '@/content/guideSteps';

type Props = {
  stepId: string;
  previousStepId: string | null;
  nextStepId: string | null;
};

type ContentWithGuideSteps = {
  guideSteps?: Record<string, Step>;
};

export function GuideStepPageClient({ stepId, previousStepId, nextStepId }: Props) {
  const { content } = useLanguage();
  // guideSteps est injecté par LanguageProvider à partir de guideSteps.ts
  const guideSteps = (content as ContentWithGuideSteps).guideSteps;
  const step = guideSteps?.[stepId];

  if (!step) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center">
        <p className="text-lg font-semibold text-slate-900">Content coming soon</p>
      </div>
    );
  }

  return <GuideStepDetail step={step as Step} previousStepId={previousStepId} nextStepId={nextStepId} />;
}


