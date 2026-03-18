import type { Metadata } from 'next';
import { Suspense } from 'react';
import Host from '../../views/Host';

export const metadata: Metadata = {
  title: 'Valorisez votre exploitation – Terrago',
  description:
    'Producteur, ouvrez votre exploitation à des groupes et générez un revenu complémentaire grâce au tourisme responsable. Rejoignez le réseau Terrago.',
  robots: { index: true, follow: true },
};

export default function NousRejoindurePage() {
  return (
    <Suspense fallback={null}>
      <Host />
    </Suspense>
  );
}
