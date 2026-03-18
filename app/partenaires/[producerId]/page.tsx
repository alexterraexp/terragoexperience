import type { Metadata } from 'next';
import { supabaseServer as supabase } from '../../../lib/supabase';
import ProducerClientWrapper from './ClientWrapper';

export const metadata: Metadata = {
  title: 'Producteur partenaire – Terrago',
  description:
    'Rencontrez ce producteur partenaire Terrago et découvrez ses expériences immersives : dégustation, récolte ou atelier au cœur de son exploitation.',
  robots: { index: true, follow: true },
};

export async function generateStaticParams() {
  const { data } = await supabase
    .from('producers')
    .select('id');
  return (data ?? []).map((p: { id: string }) => ({ producerId: p.id }));
}

export default function ProducerPage() {
  return <ProducerClientWrapper />;
}
