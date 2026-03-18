import type { Metadata } from 'next';
import { Suspense } from 'react';
import Home from '../views/Home';

export const metadata: Metadata = {
  title: 'Séminaire immersif chez un producteur – Terrago',
  description:
    'Vivez une expérience terroir français unique : séminaires d\'entreprise et séjours immersifs chez des producteurs passionnés. Réservez en quelques clics.',
  robots: { index: true, follow: true },
};

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <Home />
    </Suspense>
  );
}
