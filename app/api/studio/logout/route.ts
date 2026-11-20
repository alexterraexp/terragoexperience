import { NextResponse } from 'next/server';
import { STUDIO_COOKIE, sessionCookieOptions } from '@/lib/studioAuth';

export const dynamic = 'force-dynamic';

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(STUDIO_COOKIE, '', { ...sessionCookieOptions(), maxAge: 0 });
  return response;
}
