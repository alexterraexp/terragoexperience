import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/siteNav';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/auth', '/reservation'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
