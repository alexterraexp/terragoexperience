import type { Metadata } from 'next';
import SiteErrorState from '../components/SiteErrorState';
import { pageMeta } from '../lib/pageMeta';

export const metadata: Metadata = pageMeta({
  title: 'Page introuvable — TerraGo',
  description: 'Cette page est introuvable. Découvrez nos séminaires d’entreprise à la rencontre des producteurs.',
  path: '/404',
  index: false,
});

export default function NotFound() {
  return (
    <SiteErrorState
      title="Oups, mauvaise parcelle 🌾"
      description="Cette page est introuvable. En revanche, on connaît quelques beaux endroits où vous emmener."
      ctaHref="/seminaires-entreprise"
      ctaLabel="Découvrir nos séminaires"
    />
  );
}
