import type { Metadata } from 'next';
import { Suspense } from 'react';
import { MapboxTokenProvider } from '@/components/MapboxTokenProvider';
import { getMapboxPublicToken } from '@/lib/mapbox-public';
import { EXEMPLES_SEMINAIRE_ENTREPRISE_PATH } from '@/lib/exemplesSeminaireEntreprise';
import { fetchSeminaires } from '@/lib/seminaires';
import { supabaseServer } from '@/lib/supabase';
import { SITE_URL } from '@/lib/siteNav';
import SeminairesPack from '../../views/Seminaires-pack';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const url = `${SITE_URL}${EXEMPLES_SEMINAIRE_ENTREPRISE_PATH}`;

  return {
    title: 'Nos exemples de séminaires responsables en immersion chez des producteurs – TerraGo',
    description:
      'Exemples de séminaires d’entreprise chez des producteurs engagés : formules à la journée ou résidentielles, immersion terroir et cohésion d’équipe.',
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Nos exemples de séminaires responsables en immersion chez des producteurs – TerraGo',
      description:
        'Exemples de séminaires d’entreprise chez des producteurs engagés : formules à la journée ou résidentielles, immersion terroir et cohésion d’équipe.',
      url,
      siteName: 'TerraGo',
      locale: 'fr_FR',
      type: 'website',
    },
    alternates: {
      canonical: url,
    },
  };
}

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
