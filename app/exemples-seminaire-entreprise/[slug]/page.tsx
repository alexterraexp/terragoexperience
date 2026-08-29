import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import { Suspense } from 'react';
import SeminaireDetailLoading from '@/components/SeminaireDetailLoading';
import { MapboxTokenProvider } from '@/components/MapboxTokenProvider';
import {
  exempleSeminaireEntrepriseCanonicalUrl,
  exempleSeminaireEntreprisePath,
  getSeminaireCanonicalSlugRedirect,
  resolveSeminaireSlugRedirect,
} from '@/lib/exemplesSeminaireEntreprise';
import { getMapboxPublicToken } from '@/lib/mapbox-public';
import {
  buildSeminairePageMetadata,
  fetchSeminaireBySlug,
  fetchSeminaires,
  generateSlug,
} from '@/lib/seminaires';
import { supabaseServer } from '@/lib/supabase';
import SeminaireDetailWrapper from './ClientWrapper';

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const seminaires = await fetchSeminaires(supabaseServer);
  return seminaires.map((s) => ({
    slug: s.slug || generateSlug(s.producteur),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSlug = resolveSeminaireSlugRedirect(slug);
  const { seminaire, all } = await fetchSeminaireBySlug(resolvedSlug, supabaseServer);

  if (!seminaire) {
    return {
      title: 'Séminaire producteur – TerraGo',
      description:
        'Découvrez cette offre séminaire packagée à la rencontre d’un producteur du terroir : programme, formats et tarifs. Demandez votre devis personnalisé.',
      robots: { index: true, follow: true },
    };
  }

  const { title, description } = buildSeminairePageMetadata(seminaire, all);
  const url = exempleSeminaireEntrepriseCanonicalUrl(resolvedSlug);

  return {
    title,
    description,
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: 'TerraGo',
      locale: 'fr_FR',
      type: 'website',
      images: seminaire.image ? [{ url: seminaire.image }] : undefined,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ExempleSeminaireEntrepriseSlugPage({ params }: Props) {
  const { slug } = await params;
  const resolvedSlug = resolveSeminaireSlugRedirect(slug);
  const all = await fetchSeminaires(supabaseServer);
  const canonicalSlug = getSeminaireCanonicalSlugRedirect(all, slug);

  if (canonicalSlug && canonicalSlug !== slug) {
    permanentRedirect(exempleSeminaireEntreprisePath(canonicalSlug));
  }

  if (resolvedSlug !== slug) {
    permanentRedirect(exempleSeminaireEntreprisePath(resolvedSlug));
  }

  return (
    <Suspense fallback={<SeminaireDetailLoading />}>
      <MapboxTokenProvider token={getMapboxPublicToken()}>
        <SeminaireDetailWrapper />
      </MapboxTokenProvider>
    </Suspense>
  );
}
