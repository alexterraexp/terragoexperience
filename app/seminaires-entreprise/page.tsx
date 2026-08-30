import type { Metadata } from 'next';
import { Suspense } from 'react';
import Seminaires from '../../views/Seminaires';
import HubJsonLd from '../../components/HubJsonLd';
import { getSitelinkPage } from '../../lib/siteNav';
import { sitelinkMeta } from '../../lib/pageMeta';

const page = getSitelinkPage('/seminaires-entreprise');

export const metadata: Metadata = sitelinkMeta('/seminaires-entreprise');

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
