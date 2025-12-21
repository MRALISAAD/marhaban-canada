import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/guide') {
    const url = request.nextUrl.clone();
    url.pathname = '/parcours';
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith('/guide/')) {
    const url = request.nextUrl.clone();
    url.pathname = `/parcours${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/guide', '/guide/:path*'],
};
