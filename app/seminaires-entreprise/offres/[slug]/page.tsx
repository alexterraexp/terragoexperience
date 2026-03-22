import type { Metadata } from 'next';
import { Suspense } from 'react';
import SeminaireDetailWrapper from './ClientWrapper';

export const metadata: Metadata = {
  title: 'Séminaire producteur – Terrago',
  description:
    'Découvrez cette offre séminaire packagée chez un producteur du terroir : programme, formats et tarifs. Demandez votre devis personnalisé.',
  robots: { index: true, follow: true },
};

export default function SeminaireSlugPage() {
  return (
    <Suspense fallback={null}>
      <SeminaireDetailWrapper />
    </Suspense>
  );
}
