import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { VILLE_SEMINAIRE_SLUGS } from './lib/villesSeminaire';

const SLUGS = new Set<string>(VILLE_SEMINAIRE_SLUGS);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const match = pathname.match(/^\/seminaire-([a-z0-9-]+)$/);
  if (!match) return NextResponse.next();

  const slug = match[1];
  if (!SLUGS.has(slug)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/seminaire/${slug}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/seminaire-:slug'],
};
