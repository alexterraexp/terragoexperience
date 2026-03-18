import type { Metadata } from 'next';
import { Suspense } from 'react';
import Seminaires from '../../views/Seminaires';

export const metadata: Metadata = {
  title: 'Séminaire au vert & nature engagé – Terrago',
  description:
    'Organisez votre séminaire d\'entreprise chez un producteur français. Immersion, gastronomie et engagement au cœur du terroir. Devis sur mesure.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Séminaire au vert & nature engagé – Terrago',
    description:
      'Organisez votre séminaire d\'entreprise chez un producteur français. Immersion, gastronomie et engagement au cœur du terroir. Devis sur mesure.',
    url: 'https://terragoexperiences.fr/seminaires-entreprise',
    siteName: 'Terrago',
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://terragoexperiences.fr/seminaires-entreprise',
  },
};

export default function SeminairesEntreprisePage() {
  return (
    <Suspense fallback={null}>
      <Seminaires />
    </Suspense>
  );
}
