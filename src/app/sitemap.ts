import type { MetadataRoute } from 'next';
import { RESOURCE_GUIDE_SLUGS } from '@/content/resourceGuides';
import { SITE_URL } from '@/lib/seo';

/**
 * Sitemap - All public routes
 * Served at /sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const canonicalPages = [
    { path: '/fr', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/fr/reserver', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/fr/ressources', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/fr/anti-arnaque', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/fr/a-propos', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/en', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/ar', changeFrequency: 'weekly' as const, priority: 0.8 },
  ];

  const resourcePages = RESOURCE_GUIDE_SLUGS.flatMap((slug) =>
    ['fr', 'en', 'ar'].map((locale) => ({
      path: `/${locale}/ressources/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
  );

  return [...canonicalPages, ...resourcePages].map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}

