import type { Metadata } from 'next';
import { Suspense } from 'react';
import Particuliers from '../../views/Particuliers';
import { PAGE_OG, pageMeta } from '../../lib/pageMeta';

export const metadata: Metadata = pageMeta({
  title: 'Expériences privées sur demande – Dès 8 personnes – TerraGo',
  description:
    'Expériences privées TerraGo sur demande : séjours, activités, immersions et repas du terroir ou guinguette. Nos formats entreprises s’ouvrent aux particuliers dès 8 personnes.',
  path: '/experiences-privees',
  images: [PAGE_OG.privees],
});

export default function ExperiencesPriveesPage() {
  return (
    <Suspense fallback={null}>
      <Particuliers />
    </Suspense>
  );
}
