import type { Metadata } from 'next';
import { Suspense } from 'react';
import Engagement from '../../views/Engagement';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Notre approche – Séminaires engagés & circuits courts – TerraGo',
    description:
      "Découvrez l'approche TerraGo : reconnecter l'humain à la terre, soutenir les producteurs engagés et créer des expériences immersives responsables.",
    robots: { index: true, follow: true },
  };
}

export default function NotreApprochePage() {
  return (
    <Suspense fallback={null}>
      <Engagement />
    </Suspense>
  );
}
