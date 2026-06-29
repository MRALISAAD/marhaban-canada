import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function getAllowedEmails(): Set<string> {
  const raw = process.env.ADMIN_ALLOWED_EMAILS ?? '';
  return new Set(
    raw.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean),
  );
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let response = NextResponse.next({ request });

  // Lazy import: avoids top-level module init failure in Edge runtime
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

  // /admin/login — accessible without session; redirect already-authenticated allowed users
  if (pathname.startsWith('/admin/login')) {
    if (user?.email) {
      const allowedEmails = getAllowedEmails();
      if (allowedEmails.size > 0 && allowedEmails.has(user.email.toLowerCase())) {
        // Send to MFA page or dashboard depending on current AAL
        const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        const target = aal?.currentLevel === 'aal2' ? '/admin/dashboard' : '/admin/mfa';
        return NextResponse.redirect(new URL(target, request.url));
      }
    }
    return response;
  }

  // All other /admin/* routes require a valid session
  if (!user) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  const allowedEmails = getAllowedEmails();

  if (allowedEmails.size === 0) {
    return NextResponse.redirect(new URL('/admin/login?error=missing_allowlist', request.url));
  }

  if (!allowedEmails.has((user.email ?? '').toLowerCase())) {
    // Sign out the unauthorized user then redirect to login with error
    const logoutUrl = new URL('/api/admin/logout', request.url);
    logoutUrl.searchParams.set('redirectTo', '/admin/login?error=unauthorized');
    return NextResponse.redirect(logoutUrl);
  }

  // /admin/mfa — allowed with just AAL1; user is setting up or verifying MFA
  if (pathname.startsWith('/admin/mfa')) {
    return response;
  }

  // All protected admin routes require AAL2 (MFA verified)
  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (!aal || aal.currentLevel !== 'aal2') {
    return NextResponse.redirect(new URL('/admin/mfa', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
