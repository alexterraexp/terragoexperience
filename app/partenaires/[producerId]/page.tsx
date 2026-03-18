import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProducerDetailPage from '../../../views/ProducerDetailPage';
import { supabaseServer as supabase } from '../../../lib/supabase';

export async function generateStaticParams() {
  const { data } = await supabase
    .from('producers')
    .select('id');
  return (data ?? []).map((p: { id: string }) => ({ producerId: p.id }));
}

export const metadata: Metadata = {
  title: 'Producteur partenaire – Terrago',
  description:
    'Rencontrez ce producteur partenaire Terrago et découvrez ses expériences immersives : dégustation, récolte ou atelier au cœur de son exploitation.',
  robots: { index: true, follow: true },
};

export default function ProducerPage() {
  return (
    <Suspense fallback={null}>
      <ProducerDetailPage />
    </Suspense>
  );
}
