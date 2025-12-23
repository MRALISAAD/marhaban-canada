import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isLocale, type Locale } from './src/i18n/locales';

/**
 * Detect locale from:
 * 1. Cookie "locale" if present
 * 2. Accept-Language header
 * 3. Default to 'fr'
 */
function detectLocale(request: NextRequest): Locale {
  // Check cookie first
  const cookieLocale = request.cookies.get('locale')?.value;
  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('Accept-Language');
  if (acceptLanguage) {
    const acceptedLanguages = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim().toLowerCase())
      .filter(Boolean);

    for (const lang of acceptedLanguages) {
      // Exact match
      if (isLocale(lang)) {
        return lang;
      }
      // Primary language match (e.g., 'fr-CA' -> 'fr')
      const primaryLang = lang.split('-')[0];
      if (isLocale(primaryLang)) {
        return primaryLang;
      }
    }
  }

  // Default to 'fr'
  return 'fr';
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore Next.js internals, API routes, and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname.endsWith('/robots.txt') ||
    pathname.endsWith('/sitemap.xml') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|json|xml|txt|pdf)$/i)
  ) {
    return NextResponse.next();
  }

  // Special handling for /resources -> redirect directly to /ressources (locale-aware)
  if (pathname === '/resources') {
    const locale = detectLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/ressources`;
    return NextResponse.redirect(url);
  }

  // Check if pathname already has a locale
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment && isLocale(firstSegment)) {
    return NextResponse.next();
  }

  // Detect locale and redirect
  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};

