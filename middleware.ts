import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { VILLE_SEMINAIRE_SLUGS } from './lib/villesSeminaire';
import {
  LIEU_PATH_SLUGS,
  LIEU_SLUGS,
  REGION_IMAGES,
} from './lib/homeStorage';

const VILLE_SLUGS = new Set<string>(VILLE_SEMINAIRE_SLUGS);

const REGION_BY_PUBLIC = new Map<string, string>(
  REGION_IMAGES.map((r) => [`${r.prep}-${r.slug}`, r.slug]),
);

const LIEU_BY_PUBLIC = new Map<string, string>(
  LIEU_SLUGS.map((slug) => [LIEU_PATH_SLUGS[slug], slug]),
);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const villeMatch = pathname.match(/^\/seminaire-entreprise-([a-z0-9-]+)$/);
  if (villeMatch && VILLE_SLUGS.has(villeMatch[1])) {
    const url = request.nextUrl.clone();
    url.pathname = `/seminaire/${villeMatch[1]}`;
    return NextResponse.rewrite(url);
  }

  const destMatch = pathname.match(
    /^\/destinations\/seminaire-entreprise-([a-z0-9-]+)$/,
  );
  if (destMatch) {
    const publicSlug = destMatch[1];

    const regionSlug = REGION_BY_PUBLIC.get(publicSlug);
    if (regionSlug) {
      const url = request.nextUrl.clone();
      url.pathname = `/destinations/${regionSlug}`;
      return NextResponse.rewrite(url);
    }

    const lieuSlug = LIEU_BY_PUBLIC.get(publicSlug);
    if (lieuSlug) {
      const url = request.nextUrl.clone();
      url.pathname = `/destinations/lieux/${lieuSlug}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/seminaire-entreprise-:slug',
    '/destinations/seminaire-entreprise-:slug',
  ],
};
