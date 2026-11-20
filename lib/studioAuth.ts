import { createHash, createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const STUDIO_PATH = '/studio';
export const STUDIO_COOKIE = 'tg_studio';

const MAX_AGE_SECONDS = 60 * 60 * 24 * 14;
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 15 * 60 * 1000;

const attempts = new Map<string, { count: number; reset: number }>();

export function studioPassword(): string {
  return process.env.STUDIO_PASSWORD?.trim() || '';
}

export function isStudioConfigured(): boolean {
  return studioPassword().length >= 8;
}

function signingSecret(): string {
  return process.env.STUDIO_SECRET?.trim() || studioPassword();
}

function sign(payload: string): string {
  return createHmac('sha256', signingSecret()).update(payload).digest('base64url');
}

export function createSessionValue(): string {
  const payload = String(Date.now() + MAX_AGE_SECONDS * 1000);
  return `${payload}.${sign(payload)}`;
}

export function verifySessionValue(value: string | undefined | null): boolean {
  if (!value || !signingSecret()) return false;
  const dot = value.lastIndexOf('.');
  if (dot <= 0) return false;
  const payload = value.slice(0, dot);
  const mac = value.slice(dot + 1);
  const expected = sign(payload);
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  const exp = Number(payload);
  return Number.isFinite(exp) && exp > Date.now();
}

function hashPassword(value: string): Buffer {
  return createHash('sha256').update(value).digest();
}

export function passwordMatches(input: string): boolean {
  const expected = studioPassword();
  if (!expected || !input) return false;
  const a = hashPassword(input);
  const b = hashPassword(expected);
  return timingSafeEqual(a, b);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: MAX_AGE_SECONDS,
  };
}

export async function isStudioAuthed(): Promise<boolean> {
  if (!isStudioConfigured()) return false;
  const jar = await cookies();
  return verifySessionValue(jar.get(STUDIO_COOKIE)?.value);
}

/** Huit essais par quart d’heure et par adresse. */
export function allowStudioAttempt(ip: string): boolean {
  const now = Date.now();
  const row = attempts.get(ip);
  if (!row || row.reset < now) {
    attempts.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (row.count >= MAX_ATTEMPTS) return false;
  row.count += 1;
  return true;
}

export function clientIp(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0]?.trim() || 'local';
  return request.headers.get('x-real-ip')?.trim() || 'local';
}

export async function studioGuard(): Promise<NextResponse | null> {
  if (!isStudioConfigured()) {
    return NextResponse.json(
      { error: 'Espace pas encore configuré : ajoute STUDIO_PASSWORD dans les variables du serveur.' },
      { status: 503 },
    );
  }
  if (!(await isStudioAuthed())) {
    return NextResponse.json({ error: 'Connexion requise.' }, { status: 401 });
  }
  return null;
}
