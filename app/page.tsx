import type { Metadata } from 'next';
import Home from '../views/Home';
import { getHomeAssetUrls } from '../lib/homeStorage';
import { SITE_URL, SITELINK_PAGES } from '../lib/siteNav';

const OG_IMAGE = {
  url: '/og-home.jpg',
  width: 1200,
  height: 630,
  alt: "TerraGo — séminaires d'entreprise à la rencontre des producteurs",
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const title = "TerraGo | Séminaires d'entreprise engagés à la rencontre des producteurs";
  const description =
    "Séminaires d'entreprise à impact : cohésion, RSE, inspiration et engagement au contact de producteurs et artisans. Des expériences qui donnent du sens à vos équipes.";

  return {
    title,
    description,
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      title,
      description,
      images: [OG_IMAGE.url],
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
