import { generateSlug, type Seminaire } from './seminaires';

/** Hub public des fiches séminaire producteur (ex-formules / exemples). */
export const EXEMPLES_SEMINAIRE_ENTREPRISE_PATH = '/exemples-seminaire-entreprise';

export function exempleSeminaireEntreprisePath(slug?: string): string {
  if (!slug) return EXEMPLES_SEMINAIRE_ENTREPRISE_PATH;
  return `${EXEMPLES_SEMINAIRE_ENTREPRISE_PATH}/${slug}`;
}

/**
 * Anciens slugs → slugs actuels (301 direct, un seul saut).
 * À enrichir quand vous renommez un slug dans Supabase.
 */
export const SEMINAIRE_SLUG_LEGACY_REDIRECTS: Record<string, string> = {
  // 'avec-baptiste': 'seminaire-piments-pays-basque',
};

export function resolveSeminaireSlugRedirect(slug: string): string {
  return SEMINAIRE_SLUG_LEGACY_REDIRECTS[slug] ?? slug;
}

export function exempleSeminaireEntrepriseCanonicalUrl(slug: string): string {
  const resolved = resolveSeminaireSlugRedirect(slug);
  return `https://www.terragoexperiences.fr${exempleSeminaireEntreprisePath(resolved)}`;
}

function normalizeLinkHint(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
}

function producerMatchesHint(producteur: string, hint: string): boolean {
  const p = normalizeLinkHint(producteur);
  const h = normalizeLinkHint(hint);
  const short = p.replace(/^avec\s+/, '');
  const hShort = h.replace(/^avec\s+/, '');
  return (
    p === h ||
    short === h ||
    short === hShort ||
    p === `avec ${h}` ||
    short.includes(hShort) ||
    hShort.includes(short)
  );
}

/** Correspondance stricte pour l’URL publique `/exemples-seminaire-entreprise/{slug}`. */
export function findSeminaireByPublicSlug(
  all: Seminaire[],
  slug: string,
): Seminaire | undefined {
  const trimmed = slug.trim();
  const resolved = resolveSeminaireSlugRedirect(trimmed);
  return all.find((s) => s.slug === resolved || s.slug === trimmed);
}

/**
 * Si l’URL utilise un ancien slug auto-généré (`avec-paolo`) alors que Supabase
 * a un slug SEO custom, renvoie le slug canonique pour une 301.
 */
export function getSeminaireCanonicalSlugRedirect(
  all: Seminaire[],
  urlSlug: string,
): string | null {
  const trimmed = urlSlug.trim();
  const resolved = resolveSeminaireSlugRedirect(trimmed);

  const byExact = all.find((s) => s.slug === resolved || s.slug === trimmed);
  if (byExact) {
    return byExact.slug !== trimmed ? byExact.slug : null;
  }

  const byLegacyAuto = all.find((s) => generateSlug(s.producteur) === resolved);
  if (byLegacyAuto && byLegacyAuto.slug !== resolved) {
    return byLegacyAuto.slug;
  }

  return null;
}

/** Trouve une fiche séminaire à partir d’un slug Supabase, d’un ancien slug ou du nom producteur. */
export function findSeminaireByLinkHint(
  all: Seminaire[],
  ...hints: (string | undefined)[]
): Seminaire | undefined {
  for (const hint of hints) {
    if (!hint?.trim()) continue;
    const trimmed = hint.trim();
    const resolved = resolveSeminaireSlugRedirect(trimmed);

    const found = all.find((s) => {
      if (s.slug === resolved || s.slug === trimmed) return true;
      const autoSlug = generateSlug(s.producteur);
      if (autoSlug === trimmed || autoSlug === resolved) return true;
      if (producerMatchesHint(s.producteur, trimmed)) return true;
      return false;
    });

    if (found) return found;
  }
  return undefined;
}

/** URL d’exemple séminaire résolue depuis Supabase (slug actuel en base). */
export function seminaireExempleHrefFromHints(
  all: Seminaire[],
  ...hints: (string | undefined)[]
): string {
  const found = findSeminaireByLinkHint(all, ...hints);
  if (found) return exempleSeminaireEntreprisePath(found.slug);

  return EXEMPLES_SEMINAIRE_ENTREPRISE_PATH;
}
