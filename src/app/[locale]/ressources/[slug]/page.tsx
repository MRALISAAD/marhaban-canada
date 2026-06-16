import { ResourceGuideClient } from '@/components/resources/ResourceGuideClient';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ResourceGuidePage({ params }: PageProps) {
  const { slug } = await params;
  return <ResourceGuideClient slug={slug} />;
}
