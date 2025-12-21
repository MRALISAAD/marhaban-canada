import { notFound } from 'next/navigation';
import { stepIds, steps } from '@/content/guideSteps';
import { GuideStepDetail } from '@/components/GuideStepDetail';

type PageProps = {
  params: Promise<{ stepId: string }>;
};

export function generateStaticParams() {
  return stepIds.map((stepId) => ({ stepId }));
}

export default async function Page({ params }: PageProps) {
  const { stepId } = await params;

  if (!stepIds.includes(stepId as (typeof stepIds)[number])) {
    notFound();
  }

  const step = steps[stepId];

  if (!step) {
    notFound();
  }

  const currentIndex = stepIds.indexOf(stepId as (typeof stepIds)[number]);
  const previousStepId = currentIndex > 0 ? stepIds[currentIndex - 1] : null;
  const nextStepId = currentIndex < stepIds.length - 1 ? stepIds[currentIndex + 1] : null;

  return <GuideStepDetail step={step} previousStepId={previousStepId} nextStepId={nextStepId} />;
}
