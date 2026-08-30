import type { Metadata } from 'next';
import Destinations from '../../views/Destinations';
import HubJsonLd from '../../components/HubJsonLd';
import { getSitelinkPage } from '../../lib/siteNav';
import { sitelinkMeta } from '../../lib/pageMeta';

const page = getSitelinkPage('/destinations');

export const metadata: Metadata = sitelinkMeta('/destinations');

export default function DestinationsPage() {
  return (
    <>
      <HubJsonLd name={page.name} path={page.path} description={page.description} />
      <Destinations />
    </>
  );
}
