import type { Metadata } from 'next';
import { Suspense } from 'react';
import Seminaires from '../../views/Seminaires';
import HubJsonLd from '../../components/HubJsonLd';
import { getSitelinkPage, sitelinkTitle, SITE_URL } from '../../lib/siteNav';

const page = getSitelinkPage('/seminaires-entreprise');
const title = sitelinkTitle(page.name);

export async function generateMetadata(): Promise<Metadata> {
  return {
    title,
    description: page.description,
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description: page.description,
      url: `${SITE_URL}${page.path}`,
      siteName: 'TerraGo',
      locale: 'fr_FR',
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_URL}${page.path}`,
    },
  };
}

export default function SeminairesEntreprisePage() {
  return (
    <>
      <HubJsonLd name={page.name} path={page.path} description={page.description} />
      <Suspense fallback={null}>
        <Seminaires />
      </Suspense>
    </>
  );
}
