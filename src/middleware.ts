import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const ADMIN_SESSION_COOKIE = 'mhb_admin_prev';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin')) {
    const session = request.cookies.get(ADMIN_SESSION_COOKIE);
    if (!session?.value) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
