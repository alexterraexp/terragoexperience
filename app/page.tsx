import type { Metadata } from 'next';
import Home from '../views/Home';
import { getHomeAssetUrls } from '../lib/homeStorage';
import { SITE_DESCRIPTION, SITE_OG_IMAGE, SITE_TITLE, SITE_URL, SITELINK_PAGES } from '../lib/siteNav';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    robots: { index: true, follow: true },
    openGraph: {
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      images: [SITE_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      images: [SITE_OG_IMAGE.url],
    },
  };
}

function HomeJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'TerraGo',
        url: SITE_URL,
        inLanguage: 'fr-FR',
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/#sitelinks`,
        name: 'Navigation principale',
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        numberOfItems: SITELINK_PAGES.length,
        itemListElement: SITELINK_PAGES.map((item, index) => ({
          '@type': 'SiteNavigationElement',
          position: index + 1,
          name: item.name,
          url: `${SITE_URL}${item.path}`,
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function HomePage() {
  const assets = getHomeAssetUrls();
  return (
    <>
      <HomeJsonLd />
      <Home assets={assets} />
    </>
  );
}
