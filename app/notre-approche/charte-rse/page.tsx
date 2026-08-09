import type { Metadata } from 'next';
import CharteRse from '../../../views/CharteRse';

const SITE = 'https://terragoexperiences.fr';
const PATH = '/notre-approche/charte-rse';

export async function generateMetadata(): Promise<Metadata> {
  const title = "Charte d'engagement RSE | TerraGo";
  const description =
    'La charte RSE TerraGo : soutenir les producteurs, limiter l’impact dès la conception, proposer des activités qui ont du sens, et progresser en toute transparence.';

  return {
    title,
    description,
    keywords: [
      'charte RSE TerraGo',
      'engagement responsable séminaire',
      'séminaire producteur local',
      'circuits courts entreprise',
      'RSE expérience immersive',
    ],
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: `${SITE}${PATH}`,
      siteName: 'TerraGo',
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${SITE}${PATH}`,
    },
  };
}

export default function CharteRsePage() {
  return <CharteRse />;
}
