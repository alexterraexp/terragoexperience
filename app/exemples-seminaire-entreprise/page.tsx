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
    title: 'Nos formules séminaire terroir – Journée, 2 jours, sur mesure – TerraGo',
    description:
      'Découvrez nos formules clés en main : séminaire à la journée, résidentiel 2 jours ou programme sur mesure au contact du terroir et de producteurs engagés. Devis gratuit en 48h.',
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Nos formules séminaire terroir – TerraGo',
      description:
        'Découvrez nos formules clés en main : séminaire à la journée, résidentiel 2 jours ou programme sur mesure au contact du terroir et de producteurs engagés.',
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
