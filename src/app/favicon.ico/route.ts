import { NextResponse } from 'next/server';

// Redirect favicon.ico requests to an existing logo asset to avoid 404s.
export const dynamic = 'force-static';

export function GET(request: Request) {
  const url = new URL('/logo.png', request.url);
  return NextResponse.redirect(url, 308);
}

