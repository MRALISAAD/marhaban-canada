import type { MetadataRoute } from 'next';
import { LOCALES } from '@/i18n/locales';

const BASE_URL = 'https://marhabancanada.ca';

/**
 * Sitemap - All public routes
 * Served at /sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Core pages per locale
  const mainPages = [
    { path: '', changeFreq: 'weekly' as const, priority: 1.0 },
    { path: '/checklist', changeFreq: 'weekly' as const, priority: 0.9 },
    { path: '/arnaques', changeFreq: 'monthly' as const, priority: 0.8 },
    { path: '/ressources', changeFreq: 'monthly' as const, priority: 0.8 },
    { path: '/parcours', changeFreq: 'monthly' as const, priority: 0.8 },
    { path: '/blog', changeFreq: 'weekly' as const, priority: 0.7 },
    { path: '/contact', changeFreq: 'monthly' as const, priority: 0.7 },
    { path: '/about', changeFreq: 'monthly' as const, priority: 0.7 },
    { path: '/legal', changeFreq: 'monthly' as const, priority: 0.5 },
  ];

  // Generate URLs for all locales
  const localePages: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    mainPages.map((page) => ({
      url: `${BASE_URL}/${locale}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFreq,
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

