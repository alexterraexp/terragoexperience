import type { Metadata } from 'next';
import { Suspense } from 'react';
import { MapboxTokenProvider } from '@/components/MapboxTokenProvider';
import { getMapboxPublicToken } from '@/lib/mapbox-public';
import SeminairesPack from '../../../views/Seminaires-pack';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Nos formules séminaire terroir – Journée, 2 jours, sur mesure – TerraGo',
    description:
      'Découvrez nos formules clés en main : séminaire à la journée, résidentiel 2 jours ou programme sur mesure au contact du terroir et de producteurs engagés. Devis gratuit en 48h.',
    robots: { index: true, follow: true },
  };
}

export default function SeminairesOffresPage() {
  return (
    <Suspense fallback={null}>
      <MapboxTokenProvider token={getMapboxPublicToken()}>
        <SeminairesPack />
      </MapboxTokenProvider>
    </Suspense>
  );
}
