import type { Metadata } from 'next';
import { Suspense } from 'react';
import RecommendProducer from '../../views/RecommendProducer';

export const metadata: Metadata = {
  title: 'Recommander un producteur du terroir – Terrago',
  description:
    'Vous connaissez un producteur passionné ? Recommandez-le à Terrago pour intégrer notre réseau de partenaires agrotouristiques en France.',
  robots: { index: true, follow: true },
};

export default function RecommandationPage() {
  return (
    <Suspense fallback={null}>
      <RecommendProducer />
    </Suspense>
  );
}
