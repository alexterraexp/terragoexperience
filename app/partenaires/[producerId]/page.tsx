import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProducerDetailPage from '../../../views/ProducerDetailPage';

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
