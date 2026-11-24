import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RealiseArticle from '@/views/RealiseArticle';
import { isStudioAuthed } from '@/lib/studioAuth';
import { pageMeta, PAGE_OG } from '@/lib/pageMeta';
import { realisePath } from '@/lib/seminairesRealises';
import { getRealiseBySlug, listPublishedRealises } from '@/lib/studioRealises';
import { supabaseServer } from '@/lib/supabase';

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ apercu?: string }>;
};

export async function generateStaticParams() {
  try {
    const items = await listPublishedRealises(supabaseServer);
    return items.map((item) => ({ slug: item.id }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const query = await searchParams;
  const preview = query.apercu === '1' && (await isStudioAuthed());
  const item = await getRealiseBySlug(supabaseServer, slug, preview).catch(() => null);
  if (!item) {
    return pageMeta({
      title: 'Séminaire réalisé – TerraGo',
      description: 'Retour d’expérience d’un séminaire TerraGo.',
      path: realisePath(slug),
      index: false,
    });
  }

  const description = item.brief.replace(/\s+/g, ' ').slice(0, 160)
    || `Séminaire réalisé par TerraGo${item.lieu ? ` à ${item.lieu}` : ''}.`;

  return pageMeta({
    title: `${item.titre} – TerraGo`,
    description,
    path: realisePath(slug),
    index: item.publie && !preview,
    images: item.couverture ? [item.couverture] : [PAGE_OG.seminaires],
  });
}

export default async function SeminaireRealisePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const query = await searchParams;
  const preview = query.apercu === '1' && (await isStudioAuthed());
  const item = await getRealiseBySlug(supabaseServer, slug, preview).catch(() => null);
  if (!item) notFound();
  return <RealiseArticle item={item} preview={preview} />;
}
