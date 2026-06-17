import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createSupabaseServerAuthClient } from '@/lib/supabase/server-auth';

export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerAuthClient();
  await supabase.auth.signOut();
  const loginUrl = new URL('/admin/login', request.url);
  return NextResponse.redirect(loginUrl);
}
