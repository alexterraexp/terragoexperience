import type { Metadata } from 'next';
import { Suspense } from 'react';
import Engagement from '../../views/Engagement';

export const metadata: Metadata = {
  title: 'Séminaire engagé & entreprise responsable – Terrago',
  description:
    'Terrago soutient les producteurs locaux via des séminaires engagés. Découvrez notre mission pour un tourisme d\'entreprise responsable et authentique.',
  robots: { index: true, follow: true },
};

export default function MissionPage() {
  return (
    <Suspense fallback={null}>
      <Engagement />
    </Suspense>
  );
}
