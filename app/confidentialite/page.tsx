import type { Metadata } from 'next';
import { Suspense } from 'react';
import Confidentialite from '../../views/Confidentialite';
import { pageMeta } from '../../lib/pageMeta';

export const metadata: Metadata = pageMeta({
  title: 'Politique de confidentialité – TerraGo',
  description: 'Politique de confidentialité et gestion des données personnelles de TerraGo.',
  path: '/confidentialite',
  index: false,
});

export default function ConfidentialitePage() {
  return (
    <Suspense fallback={null}>
      <Confidentialite />
    </Suspense>
  );
}
