import { redirect } from 'next/navigation';
import { resourcePath } from '@/lib/routes';

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function ResourceGuidePage({ params }: PageProps) {
  const { locale, slug } = await params;
  redirect(resourcePath(locale as 'fr' | 'en' | 'ar', slug));
}
