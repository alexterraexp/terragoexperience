import type { Metadata } from 'next';
import { Suspense } from 'react';
import Particuliers from '../../views/Particuliers';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Expériences privées sur demande – Dès 8 personnes – TerraGo',
    description:
      'Expériences privées TerraGo sur demande : séjours, activités, immersions et repas du terroir ou guinguette. Nos formats entreprises s’ouvrent aux particuliers dès 8 personnes.',
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Expériences privées sur demande – TerraGo',
      description:
        'Sur demande, dès 8 personnes : séjours, immersions et repas guinguette ouverts aux particuliers.',
      url: 'https://terragoexperiences.fr/experiences-privees',
      siteName: 'TerraGo',
      locale: 'fr_FR',
      type: 'website',
    },
    alternates: {
      canonical: 'https://terragoexperiences.fr/experiences-privees',
    },
  };
}

export default function ExperiencesPriveesPage() {
  return (
    <Suspense fallback={null}>
      <Particuliers />
    </Suspense>
  );
}
