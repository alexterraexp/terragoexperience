import type { Metadata } from 'next';
import Home from '../views/Home';
import { getHomeAssetUrls } from '../lib/homeStorage';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Séminaire d'entreprise chez un producteur – TerraGo",
    description:
      "TerraGo organise vos séminaires d'entreprise chez des vignerons, maraîchers et fromagers français. Immersion terroir, cohésion d'équipe, engagement RSE. Devis en 48h.",
    robots: { index: true, follow: true },
  };
}

/** URLs signées régénérées côté serveur à chaque rendu (bucket HOME privé). */
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const assets = await getHomeAssetUrls();
  return <Home assets={assets} />;
}
