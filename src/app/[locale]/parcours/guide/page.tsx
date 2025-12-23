import { GuideIndexClient } from '@/components/GuideIndexClient';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function GuideIndexPage({ params }: PageProps) {
  const { locale } = await params;
  return <GuideIndexClient locale={locale} />;
}
