import type { Metadata } from 'next';
import { Suspense } from 'react';
import Engagement from '../../views/Engagement';
import HubJsonLd from '../../components/HubJsonLd';
import { getSitelinkPage } from '../../lib/siteNav';
import { sitelinkMeta } from '../../lib/pageMeta';

const page = getSitelinkPage('/notre-approche');

export const metadata: Metadata = sitelinkMeta('/notre-approche');

export default function NotreApprochePage() {
  return (
    <>
      <HubJsonLd name={page.name} path={page.path} description={page.description} />
      <Suspense fallback={null}>
        <Engagement />
      </Suspense>
    </>
  );
}
