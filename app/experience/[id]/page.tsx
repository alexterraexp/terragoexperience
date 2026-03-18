import type { Metadata } from 'next';
import { Suspense } from 'react';
import ExperienceDetail from '../../../views/ExperienceDetail';
import { ALL_EXPERIENCES } from '../../../constants';

export function generateStaticParams() {
  return ALL_EXPERIENCES.map((e: { id: string }) => ({ id: e.id }));
}

export const metadata: Metadata = {
  title: 'Détail de l\'expérience – Terrago',
  description:
    'Consultez le programme, le lieu et les disponibilités de cette expérience immersive chez un producteur français. Réservez directement en ligne.',
  robots: { index: true, follow: true },
};

export default function ExperienceDetailPage() {
  return (
    <Suspense fallback={null}>
      <ExperienceDetail />
    </Suspense>
  );
}
