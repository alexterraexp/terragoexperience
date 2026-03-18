import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProducersPage from '../../views/ProducersPage';

export const metadata: Metadata = {
  title: 'Partenaires agrotourisme & accueil de groupes – Terrago',
  description:
    'Découvrez les producteurs partenaires Terrago, prêts à accueillir des groupes d\'entreprise pour des expériences agrotouristiques authentiques en France.',
  robots: { index: true, follow: true },
};

export default function PartenairesPage() {
  return (
    <Suspense fallback={null}>
      <ProducersPage />
    </Suspense>
  );
}
