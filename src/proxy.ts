import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function getAllowedEmails(): Set<string> {
  const raw = process.env.ADMIN_ALLOWED_EMAILS ?? '';
  return new Set(
    raw.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean),
  );
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /admin/login is always accessible — no session required
  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  // All other /admin/* routes require a valid Supabase Auth session
  let response = NextResponse.next({ request });

  // Lazy import: avoids top-level module init failure in Node.js proxy context
  const { createServerClient } = await import('@supabase/ssr');

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  const allowedEmails = getAllowedEmails();
  if (allowedEmails.size === 0) {
    return NextResponse.redirect(new URL('/admin/login?error=missing_allowlist', request.url));
  }
  if (!allowedEmails.has((user.email ?? '').toLowerCase())) {
    return NextResponse.redirect(new URL('/admin/login?error=unauthorized', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
