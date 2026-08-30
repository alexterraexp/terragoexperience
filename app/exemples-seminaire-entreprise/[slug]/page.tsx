import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import { Suspense } from 'react';
import SeminaireDetailLoading from '@/components/SeminaireDetailLoading';
import { MapboxTokenProvider } from '@/components/MapboxTokenProvider';
import {
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
import { PAGE_OG, pageMeta } from '@/lib/pageMeta';
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
    return pageMeta({
      title: 'Séminaire producteur – TerraGo',
      description:
        'Découvrez cette offre séminaire packagée à la rencontre d’un producteur du terroir : programme, formats et tarifs. Demandez votre devis personnalisé.',
      path: exempleSeminaireEntreprisePath(resolvedSlug),
      images: [PAGE_OG.exemples],
    });
  }

  const { title, description } = buildSeminairePageMetadata(seminaire, all);

  return pageMeta({
    title,
    description,
    path: exempleSeminaireEntreprisePath(resolvedSlug),
    images: seminaire.image ? [{ url: seminaire.image }] : [PAGE_OG.exemples],
  });
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
