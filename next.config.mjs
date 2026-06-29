import path from "path";
import { fileURLToPath } from "url";
import { withSentryConfig } from "@sentry/nextjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const locales = ['fr', 'en', 'ar'];

function localizedRedirects(sourcePath, destinationPath) {
  return locales.map((locale) => ({
    source: `/${locale}${sourcePath}`,
    destination: `/${locale}${destinationPath}`,
    permanent: true,
  }));
}

const nextConfig = {
  output: 'standalone',

  turbopack: {
    root: __dirname,
  },

  async redirects() {
    // Non-localized slugs → /fr canonical (301)
    const nonLocalizedResourceSlugs = [
      'transport', 'logement', 'banque', 'documents', 'ecole', 'travail', 'sante',
    ];
    const nonLocalizedScamSlugs = ['logement', 'emploi', 'immigration', 'verification'];

    return [
      // Non-localized root paths → /fr (SEO / legacy)
      { source: '/ressources', destination: '/fr/ressources', permanent: true },
      { source: '/anti-arnaque', destination: '/fr/anti-arnaque', permanent: true },
      { source: '/reserver', destination: '/fr/reserver', permanent: true },
      { source: '/reserver/formulaire', destination: '/fr/reserver/formulaire', permanent: true },
      { source: '/a-propos', destination: '/fr/a-propos', permanent: true },
      ...nonLocalizedResourceSlugs.map((slug) => ({
        source: `/ressources/${slug}`,
        destination: `/fr/ressources/${slug}`,
        permanent: true,
      })),
      ...nonLocalizedScamSlugs.map((slug) => ({
        source: `/anti-arnaque/${slug}`,
        destination: `/fr/anti-arnaque/${slug}`,
        permanent: true,
      })),

      // Old → New canonical routes (301)
      ...localizedRedirects('/about', '/a-propos'),
      ...localizedRedirects('/book', '/reserver'),
      ...localizedRedirects('/reserver-un-appel', '/reserver'),
      ...localizedRedirects('/orientation', '/reserver'),
      ...localizedRedirects('/services/orientation', '/reserver'),
      ...localizedRedirects('/accompagnement', '/'),
      ...localizedRedirects('/services', '/'),
      ...localizedRedirects('/commencer', '/ressources'),
      ...localizedRedirects('/checklist', '/ressources'),
      ...localizedRedirects('/checklist/semaine-1', '/ressources'),
      ...localizedRedirects('/checklist/mois-1', '/ressources'),
      ...localizedRedirects('/checklist/integration', '/ressources'),
      ...localizedRedirects('/parcours', '/ressources'),
      ...localizedRedirects('/parcours/guide', '/ressources'),
      ...localizedRedirects('/arnaques', '/anti-arnaque'),
      ...localizedRedirects('/services/anti-arnaque', '/anti-arnaque'),
      ...localizedRedirects('/resources', '/ressources'),
      ...localizedRedirects('/sources', '/a-propos'),
      ...localizedRedirects('/contact', '/reserver'),
      ...localizedRedirects('/disclaimer', '/a-propos'),
      ...localizedRedirects('/mentions', '/a-propos'),
      ...localizedRedirects('/legal', '/a-propos'),
      ...localizedRedirects('/blog', '/ressources'),
      ...localizedRedirects('/merci', '/reserver'),
      ...localizedRedirects('/thank-you', '/reserver'),
    ];
  },

  async headers() {
    const isDev = process.env.NODE_ENV === 'development';
    // In development, Next.js webpack uses eval() for source maps — unsafe-eval is required.
    // In production, keep the restrictive policy without unsafe-eval.
    const scriptSrc = isDev
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com"
      : "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com";
    const contentSecurityPolicy = [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https://*.supabase.co",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://*.supabase.co https://*.sentry.io https://www.google-analytics.com",
      "frame-src 'self' https://calendly.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      ...(isDev ? [] : ["upgrade-insecure-requests"]),
    ].join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  silent: true,
  sourcemaps: {
    disable: true,
  },
});
