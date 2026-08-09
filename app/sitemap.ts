import type { MetadataRoute } from 'next';
import { DESTINATION_SLUGS } from '../lib/destinations';
import { LIEU_SLUGS, lieuDestinationPath } from '../lib/lieux';
import { regionDestinationPath } from '../lib/homeStorage';

export const dynamic = 'force-static';

const SITE = 'https://terragoexperiences.fr';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

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
    {
      url: `${SITE}/seminaire-exemples`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
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
    {
      url: `${SITE}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...destinationPages,
  ];
}
