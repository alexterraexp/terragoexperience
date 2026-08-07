import type { Metadata } from 'next';
import { Suspense } from 'react';
import Particuliers from '../../views/Particuliers';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Expériences privées – Activités et repas authentiques – TerraGo',
    description:
      'Activités et repas authentiques pour particuliers chez des producteurs français. Vivez une expérience privée, immersive et sur mesure.',
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Expériences privées – TerraGo',
      description:
        'Activités et repas authentiques pour particuliers chez des producteurs engagés.',
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
