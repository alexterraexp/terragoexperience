import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProducersPage from '../../views/ProducersPage';
import HubJsonLd from '../../components/HubJsonLd';
import { getSitelinkPage } from '../../lib/siteNav';
import { sitelinkMeta } from '../../lib/pageMeta';

const page = getSitelinkPage('/partenaires');

export const metadata: Metadata = sitelinkMeta('/partenaires');

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
