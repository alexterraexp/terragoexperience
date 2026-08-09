import type { MetadataRoute } from 'next';
import { DESTINATION_SLUGS } from '../lib/destinations';
import { LIEU_SLUGS, lieuDestinationPath } from '../lib/lieux';
import { regionDestinationPath } from '../lib/homeStorage';
import {
  SEMINAIRE_ENJEU_SLUGS,
  seminaireEnjeuPath,
} from '../lib/seminaireEnjeux';
import { fetchSeminaires, generateSlug } from '../lib/seminaires';
import { isSupabaseConfigured, supabaseServer } from '../lib/supabase';

export const dynamic = 'force-static';

const SITE = 'https://terragoexperiences.fr';

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

  const destinationPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE}/destinations`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...DESTINATION_SLUGS.map((slug) => ({
      url: `${SITE}${regionDestinationPath(slug)}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    ...LIEU_SLUGS.map((slug) => ({
      url: `${SITE}${lieuDestinationPath(slug)}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
  ];

  const enjeuPages: MetadataRoute.Sitemap = SEMINAIRE_ENJEU_SLUGS.map((slug) => ({
    url: `${SITE}${seminaireEnjeuPath(slug)}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogSlugs.map((slug) => ({
      url: `${SITE}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  const seminaireExemplePages: MetadataRoute.Sitemap = [
    {
      url: `${SITE}/seminaire-exemples`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...seminaireExempleSlugs.map((slug) => ({
      url: `${SITE}/seminaire-exemples/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];

  return [
    {
      url: `${SITE}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE}/seminaires-entreprise`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...enjeuPages,
    ...seminaireExemplePages,
    {
      url: `${SITE}/partenaires`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE}/experiences-privees`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE}/notre-approche`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE}/notre-approche/charte-rse`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${SITE}/experiences-entreprise`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE}/experiences-entreprise/1`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE}/experiences-entreprise/2`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE}/experiences-entreprise/3`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...blogPages,
    ...destinationPages,
  ];
}
