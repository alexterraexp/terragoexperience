import type { Metadata } from 'next';
import { Suspense } from 'react';
import Particuliers from '../../views/Particuliers';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Week-end immersif chez un producteur – TerraGo',
    description:
      'Partez entre amis ou en famille chez un producteur français. Dégustations, ateliers et nuits en domaine pour un week-end terroir authentique et ressourçant.',
    robots: { index: true, follow: true },
  };
}

export default function EntreAmisPage() {
  return (
    <Suspense fallback={null}>
      <Particuliers />
    </Suspense>
  );
}
