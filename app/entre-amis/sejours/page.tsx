import type { Metadata } from 'next';
import { Suspense } from 'react';
import Particuliers from '../../../views/Particuliers';

export const metadata: Metadata = {
  title: 'Séjour immersif terroir entre amis – Terrago',
  description:
    'Partez pour un week-end chez un producteur français avec vos proches. Dégustations, récoltes et moments authentiques loin de l\'agitation urbaine.',
  robots: { index: true, follow: true },
};

export default function EntreAmisSejoursPage() {
  return (
    <Suspense fallback={null}>
      <Particuliers />
    </Suspense>
  );
}
