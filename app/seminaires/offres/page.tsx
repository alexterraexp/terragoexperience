import type { Metadata } from 'next';
import { Suspense } from 'react';
import SeminairesPack from '../../../views/Seminaires-pack';

export const metadata: Metadata = {
  title: 'Séminaire responsable & team building terroir – Terrago',
  description:
    'Formules clés en main pour un séminaire responsable : journée, 2 jours ou sur mesure chez un producteur du terroir. Cohésion d\'équipe garantie.',
  robots: { index: true, follow: true },
};

export default function SeminairesOffresPage() {
  return (
    <Suspense fallback={null}>
      <SeminairesPack />
    </Suspense>
  );
}
