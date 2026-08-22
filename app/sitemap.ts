import type { MetadataRoute } from 'next';
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
import { isSupabaseConfigured, supabaseServer } from '../lib/supabase';
import { SITE_URL, SITELINK_PAGES } from '../lib/siteNav';

export const dynamic = 'force-static';

async function fetchBlogSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabaseServer
    .from('blog_posts')
    .select('slug')
    .eq('published', true);
  if (error || !data) return [];
  return data.map((post: { slug: string }) => post.slug).filter(Boolean);
}

async function fetchSeminaireExempleSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const seminaires = await fetchSeminaires(supabaseServer);
    return seminaires
      .map((s) => s.slug || generateSlug(s.producteur))
      .filter(Boolean);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [blogSlugs, seminaireExempleSlugs] = await Promise.all([
    fetchBlogSlugs(),
    fetchSeminaireExempleSlugs(),
  ]);

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

  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    ...blogSlugs.map((slug) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ];

  const seminaireExemplePages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}${EXEMPLES_SEMINAIRE_ENTREPRISE_PATH}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...seminaireExempleSlugs.map((slug) => ({
      url: `${SITE_URL}${exempleSeminaireEntreprisePath(slug)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.65,
    })),
  ];

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...hubPages,
    ...enjeuPages,
    ...seminaireExemplePages,
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
    ...blogPages,
  ];
}
