import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body ?? {};

  if (!email || typeof email !== "string") {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  await new Promise((resolve) => setTimeout(resolve, 200));

  return NextResponse.json({ success: true });
}
