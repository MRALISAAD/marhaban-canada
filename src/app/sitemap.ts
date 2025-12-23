import type { MetadataRoute } from 'next';
import { LOCALES } from '@/i18n/locales';

const BASE_URL = 'https://marhabancanada.ca';

/**
 * Sitemap - All public routes
 * Served at /sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Core pages per locale
  const mainPages = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/checklist', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/arnaques', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/ressources', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/parcours', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/blog', changeFrequency: 'weekly' as const, priority: 0.7 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/legal', changeFrequency: 'monthly' as const, priority: 0.5 },
  ];

  // Generate URLs for all locales
  const localePages: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    mainPages.map((page) => ({
      url: `${BASE_URL}/${locale}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }))
  );

  // Root URL (redirects to /fr)
  const rootPage: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  return [...rootPage, ...localePages];
}

