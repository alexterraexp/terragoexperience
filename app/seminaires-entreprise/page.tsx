import type { Metadata } from 'next';
import { Suspense } from 'react';
import Seminaires from '../../views/Seminaires';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Séminaire au vert chez un producteur français – TerraGo',
    description:
      'Organisez un séminaire nature et engagé chez un producteur du terroir. Journée, résidentiel ou sur mesure — team building authentique loin des salles de réunion.',
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Séminaire au vert chez un producteur français – TerraGo',
      description:
        'Organisez un séminaire nature et engagé chez un producteur du terroir. Journée, résidentiel ou sur mesure — team building authentique loin des salles de réunion.',
      url: 'https://terragoexperiences.fr/seminaires-entreprise',
      siteName: 'Terrago',
      locale: 'fr_FR',
      type: 'website',
    },
    alternates: {
      canonical: 'https://terragoexperiences.fr/seminaires-entreprise',
    },
  };
}

export default function SeminairesEntreprisePage() {
  return (
    <Suspense fallback={null}>
      <Seminaires />
    </Suspense>
  );
}
