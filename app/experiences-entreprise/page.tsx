import type { Metadata } from 'next';
import ExperiencesEntreprise from '../../views/ExperiencesEntreprise';
import HubJsonLd from '../../components/HubJsonLd';
import { getSitelinkPage } from '../../lib/siteNav';
import { sitelinkMeta } from '../../lib/pageMeta';

const page = getSitelinkPage('/experiences-entreprise');

export const metadata: Metadata = sitelinkMeta('/experiences-entreprise');

export default function ExperiencesEntreprisePage() {
  return (
    <>
      <HubJsonLd name={page.name} path={page.path} description={page.description} />
      <ExperiencesEntreprise />
    </>
  );
}
