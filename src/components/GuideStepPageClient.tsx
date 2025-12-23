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

  return <GuideStepDetail step={step as Step} previousStepId={previousStepId} nextStepId={nextStepId} />;
}


