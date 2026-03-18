import type { Metadata } from 'next';
import { Suspense } from 'react';
import Confidentialite from '../../views/Confidentialite';

export const metadata: Metadata = {
  title: 'Politique de confidentialité – Terrago',
  description: 'Politique de confidentialité et gestion des données personnelles de Terrago.',
  robots: { index: false, follow: false },
};

export default function ConfidentialitePage() {
  return (
    <Suspense fallback={null}>
      <Confidentialite />
    </Suspense>
  );
}
