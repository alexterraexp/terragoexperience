import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { VILLE_SEMINAIRE_SLUGS } from './lib/villesSeminaire';
import {
  LIEU_PATH_SLUGS,
  LIEU_SLUGS,
  REGION_IMAGES,
  REGION_SLUG_REDIRECTS,
  lieuDestinationPath,
  regionDestinationPath,
} from './lib/homeStorage';

const VILLE_SLUGS = new Set<string>(VILLE_SEMINAIRE_SLUGS);

const REGION_BY_PUBLIC = new Map<string, string>(
  REGION_IMAGES.map((r) => [`${r.prep}-${r.slug}`, r.slug]),
);

const REGION_PUBLIC_REDIRECTS = new Map<string, string>(
  REGION_SLUG_REDIRECTS.map(({ from, to }) => {
    const region = REGION_IMAGES.find((r) => r.slug === to);
    const prep = region?.prep ?? 'en';
    return [`${prep}-${from}`, regionDestinationPath(to)];
  }),
);

const LIEU_BY_PUBLIC = new Map<string, string>(
  LIEU_SLUGS.map((slug) => [LIEU_PATH_SLUGS[slug], slug]),
);

const REGION_SLUGS = new Set<string>(REGION_IMAGES.map((r) => r.slug));

const REGION_SLUG_FROM_OLD = new Map<string, string>(
  REGION_SLUG_REDIRECTS.map(({ from, to }) => [from, to]),
);

const LIEU_SLUG_SET = new Set<string>(LIEU_SLUGS);

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

    const redirected = REGION_PUBLIC_REDIRECTS.get(publicSlug);
    if (redirected) {
      const url = request.nextUrl.clone();
      url.pathname = redirected;
      return NextResponse.redirect(url, 308);
    }

    const regionSlug = REGION_BY_PUBLIC.get(publicSlug);
    if (regionSlug) {
      const url = request.nextUrl.clone();
      // Chemin hors redirection : Next relance le middleware sur la cible du rewrite.
      url.pathname = `/destinations/region/${regionSlug}`;
      return NextResponse.rewrite(url);
    }

    const lieuSlug = LIEU_BY_PUBLIC.get(publicSlug);
    if (lieuSlug) {
      const url = request.nextUrl.clone();
      url.pathname = `/destinations/lieu/${lieuSlug}`;
      return NextResponse.rewrite(url);
    }
  }

  // Anciennes URLs courtes → URL publique. La page, elle, est sous
  // /destinations/region et /destinations/lieu, sinon ce redirect reboucle
  // avec le rewrite (Next relance le middleware sur la cible).
  const regionInternal = pathname.match(/^\/destinations\/([a-z0-9-]+)$/);
  if (regionInternal) {
    const slug = regionInternal[1];
    const canonical = REGION_SLUGS.has(slug)
      ? slug
      : REGION_SLUG_FROM_OLD.get(slug);
    if (canonical) {
      const url = request.nextUrl.clone();
      url.pathname = regionDestinationPath(canonical);
      return NextResponse.redirect(url, 308);
    }
  }

  const lieuInternal = pathname.match(/^\/destinations\/lieux\/([a-z0-9-]+)$/);
  if (lieuInternal && LIEU_SLUG_SET.has(lieuInternal[1])) {
    const url = request.nextUrl.clone();
    url.pathname = lieuDestinationPath(lieuInternal[1]);
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/seminaire-entreprise-:slug',
    '/destinations/:slug',
    '/destinations/lieux/:slug',
  ],
};
