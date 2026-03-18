import type { Metadata } from 'next';
import { Suspense } from 'react';
import MentionsLegales from '../../views/MentionsLegales';

export const metadata: Metadata = {
  title: 'Mentions légales – Terrago',
  description: 'Mentions légales de la plateforme Terrago.',
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <Suspense fallback={null}>
      <MentionsLegales />
    </Suspense>
  );
}
