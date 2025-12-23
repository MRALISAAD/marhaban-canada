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
  // Check cookie first (mc_locale is the only essential cookie we set)
  const cookieLocale = request.cookies.get('mc_locale')?.value;
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
  const nextUrl = request.nextUrl;
  const { pathname } = nextUrl;
  const host = request.headers.get('host') || '';

  // Enforce apex domain (redirect www -> apex)
  if (host.startsWith('www.')) {
    const apexUrl = new URL(nextUrl.toString());
    apexUrl.host = host.replace(/^www\./, '');
    return NextResponse.redirect(apexUrl, 301);
  }

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
    const redirectUrl = nextUrl.clone();
    redirectUrl.pathname = `/${locale}/ressources`;
    return NextResponse.redirect(redirectUrl);
  }

  // Check if pathname already has a locale
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment && isLocale(firstSegment)) {
    // Ensure mc_locale cookie is set even when locale is already in path
    const res = NextResponse.next();
    if (!request.cookies.get('mc_locale')) {
      const lang = detectLocale(request);
      res.cookies.set('mc_locale', lang, {
        path: '/',
        httpOnly: false,
        sameSite: 'lax',
        secure: true,
        maxAge: 60 * 60 * 24 * 365,
      });
    }
    return res;
  }

  // Detect locale and redirect
  const locale = detectLocale(request);
  const redirectUrl = nextUrl.clone();
  redirectUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  const res = NextResponse.redirect(redirectUrl);
  res.cookies.set('mc_locale', locale, {
    path: '/',
    httpOnly: false,
    sameSite: 'lax',
    secure: true,
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};

