import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createSupabaseServerAuthClient } from '@/lib/supabase/server-auth';

export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerAuthClient();
  await supabase.auth.signOut();

  const rawRedirect = request.nextUrl.searchParams.get('redirectTo') ?? '/admin/login';
  // Validate redirectTo to prevent open redirect — only allow /admin/* paths
  const safeRedirect = rawRedirect.startsWith('/admin/') ? rawRedirect : '/admin/login';

  return NextResponse.redirect(new URL(safeRedirect, request.url));
}
