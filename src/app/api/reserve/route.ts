import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  console.log('[reserve] new request:', body);
  // TODO: send email or push to DB
  return NextResponse.json({ ok: true });
}
