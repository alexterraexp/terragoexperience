import type { Metadata } from 'next';
import SiteErrorState from '../components/SiteErrorState';

export const metadata: Metadata = {
  title: 'Page introuvable — TerraGo',
  robots: { index: false, follow: false },
};

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
