import { redirect } from 'next/navigation';

type PageProps = {
  params: Promise<{ locale: string }>;
};

/**
 * Alias page for /resources -> /ressources
 * 
 * Redirects /[locale]/resources to /[locale]/ressources (canonical route)
 */
export default async function ResourcesAliasPage({ params }: PageProps) {
  const { locale } = await params;
  
  // Redirect to the canonical route
  redirect(`/${locale}/ressources`);
}

