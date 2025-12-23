import { notFound } from 'next/navigation';
import { stepIds } from '@/content/guideSteps';
import { LOCALES } from '@/i18n/locales';
import { GuideStepPageClient } from '@/components/GuideStepPageClient';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ stepId: string }>;
};

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => stepIds.map((stepId) => ({ locale, stepId })));
}

export default async function Page({ params }: PageProps) {
  const { stepId } = await params;

  // Alias francophone : /steps/banque → /steps/bank
  const normalizedStepId = stepId === 'banque' ? 'bank' : stepId;

  if (!stepIds.includes(normalizedStepId as (typeof stepIds)[number])) {
    notFound();
  }

  const currentIndex = stepIds.indexOf(normalizedStepId as (typeof stepIds)[number]);
  const previousStepId = currentIndex > 0 ? stepIds[currentIndex - 1] : null;
  const nextStepId = currentIndex < stepIds.length - 1 ? stepIds[currentIndex + 1] : null;

  return (
    <GuideStepPageClient
      stepId={normalizedStepId}
      previousStepId={previousStepId}
      nextStepId={nextStepId}
    />
  );
}
