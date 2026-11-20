import { NextResponse } from 'next/server';
import {
  STUDIO_COOKIE,
  allowStudioAttempt,
  clientIp,
  createSessionValue,
  isStudioConfigured,
  passwordMatches,
  sessionCookieOptions,
} from '@/lib/studioAuth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!isStudioConfigured()) {
    return NextResponse.json(
      { error: 'Espace pas encore configuré : ajoute STUDIO_PASSWORD dans les variables du serveur.' },
      { status: 503 },
    );
  }

  if (!allowStudioAttempt(clientIp(request))) {
    return NextResponse.json(
      { error: 'Trop de tentatives. Réessaie dans un quart d’heure.' },
      { status: 429 },
    );
  }

  const body = (await request.json().catch(() => null)) as { password?: unknown } | null;
  const password = typeof body?.password === 'string' ? body.password : '';
  if (!passwordMatches(password)) {
    return NextResponse.json({ error: 'Mot de passe incorrect.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(STUDIO_COOKIE, createSessionValue(), sessionCookieOptions());
  return response;
}
