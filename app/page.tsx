import type { Metadata } from 'next';
import Home from '../views/Home';
import { getHomeAssetUrls } from '../lib/homeStorage';

const OG_IMAGE = {
  url: '/og-home.jpg',
  width: 1200,
  height: 630,
  alt: "TerraGo — séminaires d'entreprise chez des producteurs engagés",
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const title = "TerraGo | Séminaires d'entreprise à impact chez des producteurs";
  const description =
    "Séminaires d'entreprise immersifs : cohésion, RSE, inspiration et engagement au contact de producteurs et artisans. Des expériences qui donnent du sens à vos équipes.";

  return {
    title,
    description,
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export default function HomePage() {
  const assets = getHomeAssetUrls();
  return <Home assets={assets} />;
}
