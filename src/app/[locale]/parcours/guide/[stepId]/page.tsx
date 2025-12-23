import { redirect } from 'next/navigation';

type PageProps = {
  params: Promise<{ locale: string; stepId: string }>;
};

/**
 * Alias page for short URLs:
 * /[locale]/parcours/guide/[stepId] -> /[locale]/parcours/guide/steps/[stepId]
 *
 * This allows shorter URLs while keeping the canonical route unchanged.
 */
export default async function GuideStepAliasPage({ params }: PageProps) {
  const { locale, stepId } = await params;
  
  // Redirect to the canonical route
  redirect(`/${locale}/parcours/guide/steps/${stepId}`);
}

