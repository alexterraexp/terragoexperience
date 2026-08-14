import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProducersPage from '../../views/ProducersPage';
import HubJsonLd from '../../components/HubJsonLd';
import { getSitelinkPage, sitelinkTitle, SITE_URL } from '../../lib/siteNav';

const page = getSitelinkPage('/partenaires');
const title = sitelinkTitle(page.name);

export const metadata: Metadata = {
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

export default function PartenairesPage() {
  return (
    <>
      <HubJsonLd name={page.name} path={page.path} description={page.description} />
      <Suspense fallback={null}>
        <ProducersPage />
      </Suspense>
    </>
  );
}
