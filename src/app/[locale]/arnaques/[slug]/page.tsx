import { notFound } from 'next/navigation';
import { LOCALES } from '@/i18n/locales';
import { frContent } from '@/content/fr';
import { ScamGuidePageClient } from './ScamGuidePageClient';

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  // generate for each supported locale
  const slugs = Object.keys(frContent.scams.guides);
  return LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export default async function ScamGuideRoute({ params }: PageProps) {
  const { slug } = await params;

  const validSlugs = Object.keys(frContent.scams.guides);
  if (!validSlugs.includes(slug)) notFound();

  return <ScamGuidePageClient slug={slug} />;
}
