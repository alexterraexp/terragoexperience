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

async function fetchBlogSlugs(db: SupabaseClient): Promise<string[]> {
  try {
    const { data, error } = await db
      .from('blog_posts')
      .select('slug')
      .eq('published', true);
    if (error || !data) return [];
    return data.map((post: { slug: string }) => post.slug).filter(Boolean);
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
  blogSlugs: string[];
  seminaireExempleSlugs: string[];
}> {
  const empty = { blogSlugs: [] as string[], seminaireExempleSlugs: [] as string[] };
  try {
    const db = createSitemapSupabase();
    if (!db) return empty;
    const [blogSlugs, seminaireExempleSlugs] = await Promise.all([
      fetchBlogSlugs(db),
      fetchSeminaireExempleSlugs(db),
    ]);
    return { blogSlugs, seminaireExempleSlugs };
  } catch {
    return empty;
  }
}

function isIndexableSitemapUrl(url: string): boolean {
  if (!url.startsWith(SITE_URL)) return false;
  if (/localhost|127\.0\.0\.1/i.test(url)) return false;
  return true;
}

function staticSitemapEntries(now: Date): MetadataRoute.Sitemap {
  const hubPages: MetadataRoute.Sitemap = SITELINK_PAGES.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const destinationPages: MetadataRoute.Sitemap = [
    ...DESTINATION_SLUGS.map((slug) => ({
      url: `${SITE_URL}${regionDestinationPath(slug)}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...LIEU_SLUGS.map((slug) => ({
      url: `${SITE_URL}${lieuDestinationPath(slug)}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...VILLE_SEMINAIRE_SLUGS.map((slug) => ({
      url: `${SITE_URL}${villeSeminairePath(slug)}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  const enjeuPages: MetadataRoute.Sitemap = SEMINAIRE_ENJEU_SLUGS.map((slug) => ({
    url: `${SITE_URL}${seminaireEnjeuPath(slug)}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...hubPages,
    ...enjeuPages,
    {
      url: `${SITE_URL}${EXEMPLES_SEMINAIRE_ENTREPRISE_PATH}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...destinationPages,
    {
      url: `${SITE_URL}/faq`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/experiences-privees`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/notre-approche/charte-rse`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  try {
    const { blogSlugs, seminaireExempleSlugs } = await loadDynamicSlugs();

    const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));

    const seminaireExemplePages: MetadataRoute.Sitemap = seminaireExempleSlugs.map(
      (slug) => ({
        url: `${SITE_URL}${exempleSeminaireEntreprisePath(slug)}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.65,
      }),
    );

    return [...staticSitemapEntries(now), ...seminaireExemplePages, ...blogPages].filter(
      (entry) => isIndexableSitemapUrl(entry.url),
    );
  } catch {
    return staticSitemapEntries(now).filter((entry) => isIndexableSitemapUrl(entry.url));
  }
}
