import type { Metadata } from 'next';
import { Suspense } from 'react';
import Home from '../views/Home';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Séminaire d'entreprise chez un producteur – TerraGo",
    description:
      "TerraGo organise vos séminaires d'entreprise chez des vignerons, maraîchers et fromagers français. Immersion terroir, cohésion d'équipe, engagement RSE. Devis en 48h.",
    robots: { index: true, follow: true },
  };
}

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <Home />
    </Suspense>
  );
}
