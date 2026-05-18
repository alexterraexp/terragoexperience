import type { Metadata } from 'next';
import { Suspense } from 'react';
import { MapboxTokenProvider } from '@/components/MapboxTokenProvider';
import { getMapboxPublicToken } from '@/lib/mapbox-public';
import { fetchSeminaires } from '@/lib/seminaires';
import { supabaseServer } from '@/lib/supabase';
import SeminairesPack from '../../../views/Seminaires-pack';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Séminaire responsable & team building terroir – TerraGo',
  description:
    'Formules clés en main pour un séminaire responsable : journée, 2 jours ou sur mesure chez un producteur du terroir. Cohésion d\'équipe garantie.',
  robots: { index: true, follow: true },
};

export default async function SeminairesOffresPage() {
  const initialSeminaires = await fetchSeminaires(supabaseServer);

  return (
    <Suspense fallback={null}>
      <MapboxTokenProvider token={getMapboxPublicToken()}>
        <SeminairesPack initialSeminaires={initialSeminaires} />
      </MapboxTokenProvider>
    </Suspense>
  );
}
