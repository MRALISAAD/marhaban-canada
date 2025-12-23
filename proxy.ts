import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isLocale } from '@/i18n/locales';

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignore next internals
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next();
  }

  // Already localized
  const first = pathname.split('/')[1];
  if (first && isLocale(first)) return NextResponse.next();

  // Default to fr
  const url = req.nextUrl.clone();
  url.pathname = `/fr${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api).*)'],
};
