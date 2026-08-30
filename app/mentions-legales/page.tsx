import type { Metadata } from 'next';
import { Suspense } from 'react';
import MentionsLegales from '../../views/MentionsLegales';
import { pageMeta } from '../../lib/pageMeta';

export const metadata: Metadata = pageMeta({
  title: 'Mentions légales – TerraGo',
  description: 'Mentions légales de la plateforme TerraGo.',
  path: '/mentions-legales',
  index: false,
});

export default function MentionsLegalesPage() {
  return (
    <Suspense fallback={null}>
      <MentionsLegales />
    </Suspense>
  );
}
