import type { Metadata } from 'next';
import { Suspense } from 'react';
import { MapboxTokenProvider } from '@/components/MapboxTokenProvider';
import { getMapboxPublicToken } from '@/lib/mapbox-public';
import { EXEMPLES_SEMINAIRE_ENTREPRISE_PATH } from '@/lib/exemplesSeminaireEntreprise';
import { fetchSeminaires } from '@/lib/seminaires';
import { supabaseServer } from '@/lib/supabase';
import { PAGE_OG, pageMeta } from '@/lib/pageMeta';
import SeminairesPack from '../../views/Seminaires-pack';

export const revalidate = 3600;

export const metadata: Metadata = pageMeta({
  title: 'Nos exemples de séminaires responsables à la rencontre des producteurs – TerraGo',
  description:
    'Exemples de séminaires d’entreprise à la rencontre de producteurs engagés : formules à la journée ou résidentielles, immersion terroir et cohésion d’équipe.',
  path: EXEMPLES_SEMINAIRE_ENTREPRISE_PATH,
  images: [PAGE_OG.exemples],
});

export default async function ExemplesSeminaireEntreprisePage() {
  const initialSeminaires = await fetchSeminaires(supabaseServer);

  return (
    <Suspense fallback={null}>
      <MapboxTokenProvider token={getMapboxPublicToken()}>
        <SeminairesPack initialSeminaires={initialSeminaires} />
      </MapboxTokenProvider>
    </Suspense>
  );
}
