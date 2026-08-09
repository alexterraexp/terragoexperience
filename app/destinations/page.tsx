import type { Metadata } from 'next';
import Destinations from '../../views/Destinations';

export async function generateMetadata(): Promise<Metadata> {
  const title = "Destinations séminaire d'entreprise en France | TerraGo";
  const description =
    "Découvrez nos destinations de séminaire en France : Nouvelle-Aquitaine, Provence, Île-de-France, Normandie, Occitanie et autres territoires.";

  return {
    title,
    description,
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: 'https://terragoexperiences.fr/destinations',
      siteName: 'TerraGo',
      locale: 'fr_FR',
      type: 'website',
    },
    alternates: {
      canonical: 'https://terragoexperiences.fr/destinations',
    },
  };
}

export default function DestinationsPage() {
  return <Destinations />;
}
