import type { Metadata } from 'next';
import { Suspense } from 'react';
import Engagement from '../../views/Engagement';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Notre mission – Séminaires engagés & circuits courts – TerraGo',
    description:
      "TerraGo connecte entreprises et producteurs locaux pour un tourisme professionnel responsable. Découvrez notre engagement pour les filières françaises et l'économie de proximité.",
    robots: { index: true, follow: true },
  };
}

export default function MissionPage() {
  return (
    <Suspense fallback={null}>
      <Engagement />
    </Suspense>
  );
}
