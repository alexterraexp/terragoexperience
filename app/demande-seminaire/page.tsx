import type { Metadata } from 'next';
import { Suspense } from 'react';
import Seminaires from '../../views/Seminaires';

export const metadata: Metadata = {
  title: 'Demande de séminaire – TerraGo',
  description:
    'Organisez votre séminaire d\'entreprise chez un producteur français. Immersion, gastronomie et engagement au cœur du terroir. Devis sur mesure.',
  robots: { index: true, follow: true },
};

export default function DemandeSeminairePage() {
  return (
    <Suspense fallback={null}>
      <Seminaires />
    </Suspense>
  );
}
