import type { MetadataRoute } from 'next';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { DESTINATION_SLUGS } from '../lib/destinations';
import {
  LIEU_SLUGS,
  lieuDestinationPath,
  regionDestinationPath,
} from '../lib/homeStorage';
import { VILLE_SEMINAIRE_SLUGS, villeSeminairePath } from '../lib/villesSeminaire';
import {
  SEMINAIRE_ENJEU_SLUGS,
  seminaireEnjeuPath,
} from '../lib/seminaireEnjeux';
import {
  EXEMPLES_SEMINAIRE_ENTREPRISE_PATH,
  exempleSeminaireEntreprisePath,
} from '../lib/exemplesSeminaireEntreprise';
import { fetchSeminaires, generateSlug } from '../lib/seminaires';
import { SITE_URL, SITELINK_PAGES } from '../lib/siteNav';

/**
 * Ne jamais utiliser `force-static` ici : supabaseServer force `cache: 'no-store'`,
 * ce qui fait échouer la route en 500 sur Vercel (conflit static / dynamic).
 * `force-dynamic` garantit HTTP 200 même si Supabase échoue.
 */
export const dynamic = 'force-dynamic';

const DYNAMIC_FETCH_TIMEOUT_MS = 5000;

function sitemapFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DYNAMIC_FETCH_TIMEOUT_MS);
  const parentSignal = init?.signal;
  if (parentSignal) {
    if (parentSignal.aborted) controller.abort();
    else parentSignal.addEventListener('abort', () => controller.abort(), { once: true });
  }
  return fetch(input, {
    ...init,
    signal: controller.signal,
  }).finally(() => {
    clearTimeout(timeoutId);
  });
}

function createSitemapSupabase(): SupabaseClient | null {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    process.env.VITE_SUPABASE_URL?.trim() ||
    '';
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.VITE_SUPABASE_ANON_KEY?.trim() ||
    '';
  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: sitemapFetch },
  });
}

function parseSitemapDate(value: unknown): Date | undefined {
  if (value == null || value === '') return undefined;
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) return undefined;
  return date;
}

function latestSitemapDate(...values: unknown[]): Date | undefined {
  let latest: Date | undefined;
  for (const value of values) {
    const date = parseSitemapDate(value);
    if (!date) continue;
    if (!latest || date > latest) latest = date;
  }
  return latest;
}

async function fetchBlogEntries(
  db: SupabaseClient,
): Promise<{ slug: string; lastModified?: Date }[]> {
  try {
    const { data, error } = await db
      .from('blog_posts')
      .select('slug, updated_at, published_at, created_at')
      .eq('published', true);
    if (error || !data) return [];
    return data
      .map((post: {
        slug: string;
        updated_at?: string | null;
        published_at?: string | null;
        created_at?: string | null;
      }) => ({
        slug: post.slug,
        lastModified: latestSitemapDate(
          post.updated_at,
          post.published_at,
          post.created_at,
        ),
      }))
      .filter((entry) => Boolean(entry.slug));
  } catch {
    return [];
  }
}

async function fetchSeminaireExempleSlugs(db: SupabaseClient): Promise<string[]> {
  try {
    const seminaires = await fetchSeminaires(db);
    return seminaires
      .map((s) => s.slug || generateSlug(s.producteur))
      .filter(Boolean);
  } catch {
    return [];
  }
}

async function loadDynamicSlugs(): Promise<{
  blogEntries: { slug: string; lastModified?: Date }[];
  seminaireExempleSlugs: string[];
}> {
  const empty = {
    blogEntries: [] as { slug: string; lastModified?: Date }[],
    seminaireExempleSlugs: [] as string[],
  };
  try {
    const db = createSitemapSupabase();
    if (!db) return empty;
    const [blogEntries, seminaireExempleSlugs] = await Promise.all([
      fetchBlogEntries(db),
      fetchSeminaireExempleSlugs(db),
    ]);
    return { blogEntries, seminaireExempleSlugs };
  } catch {
    return empty;
  }
}

function isIndexableSitemapUrl(url: string): boolean {
  if (!url.startsWith(SITE_URL)) return false;
  if (/localhost|127\.0\.0\.1/i.test(url)) return false;
  return true;
}

function staticSitemapEntries(): MetadataRoute.Sitemap {
  const hubPages: MetadataRoute.Sitemap = SITELINK_PAGES.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const destinationPages: MetadataRoute.Sitemap = [
    ...DESTINATION_SLUGS.map((slug) => ({
      url: `${SITE_URL}${regionDestinationPath(slug)}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...LIEU_SLUGS.map((slug) => ({
      url: `${SITE_URL}${lieuDestinationPath(slug)}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...VILLE_SEMINAIRE_SLUGS.map((slug) => ({
      url: `${SITE_URL}${villeSeminairePath(slug)}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  const enjeuPages: MetadataRoute.Sitemap = SEMINAIRE_ENJEU_SLUGS.map((slug) => ({
    url: `${SITE_URL}${seminaireEnjeuPath(slug)}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...hubPages,
    ...enjeuPages,
    {
      url: `${SITE_URL}${EXEMPLES_SEMINAIRE_ENTREPRISE_PATH}`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...destinationPages,
    {
      url: `${SITE_URL}/faq`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/experiences-privees`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/notre-approche/charte-rse`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const { blogEntries, seminaireExempleSlugs } = await loadDynamicSlugs();

    const blogPages: MetadataRoute.Sitemap = blogEntries.map((entry) => ({
      url: `${SITE_URL}/blog/${entry.slug}`,
      ...(entry.lastModified ? { lastModified: entry.lastModified } : {}),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));

    const seminaireExemplePages: MetadataRoute.Sitemap = seminaireExempleSlugs.map(
      (slug) => ({
        url: `${SITE_URL}${exempleSeminaireEntreprisePath(slug)}`,
        changeFrequency: 'weekly' as const,
        priority: 0.65,
      }),
    );

    return [...staticSitemapEntries(), ...seminaireExemplePages, ...blogPages].filter(
      (entry) => isIndexableSitemapUrl(entry.url),
    );
  } catch {
    return staticSitemapEntries().filter((entry) => isIndexableSitemapUrl(entry.url));
  }
}
