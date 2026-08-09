import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DestinationRegion from '../../../views/DestinationRegion';
import {
  DESTINATION_SLUGS,
  getDestination,
  type DestinationSlug,
} from '../../../lib/destinations';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return DESTINATION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) {
    return { title: 'Destinations séminaire – TerraGo' };
  }

  const title = `Séminaire d'entreprise ${destination.prep} ${destination.name} | TerraGo`;
  const description =
    destination.intro[0] ??
    `Séminaire d'entreprise ${destination.prep} ${destination.name} avec TerraGo : cohésion, RSE, team building et immersion chez des producteurs.`;

  return {
    title,
    description,
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: `https://terragoexperiences.fr/destinations/${slug}`,
      siteName: 'TerraGo',
      locale: 'fr_FR',
      type: 'website',
      images: [{ url: destination.heroImage }],
    },
    alternates: {
      canonical: `https://terragoexperiences.fr/destinations/${slug}`,
    },
  };
}

export default async function DestinationSlugPage({ params }: Props) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination || !DESTINATION_SLUGS.includes(slug as DestinationSlug)) {
    notFound();
  }

  return <DestinationRegion destination={destination} />;
}
