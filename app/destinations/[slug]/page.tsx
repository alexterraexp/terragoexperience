import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DestinationRegion from '../../../views/DestinationRegion';
import {
  DESTINATION_SLUGS,
  destinationHeroHeading,
  destinationSeoTitle,
  getDestination,
  type DestinationSlug,
} from '../../../lib/destinations';
import { regionDestinationPath } from '../../../lib/homeStorage';
import { stripInlineLinks } from '../../../lib/seminaireEnjeux';

type Props = {
  params: Promise<{ slug: string }>;
};

const SITE = 'https://www.terragoexperiences.fr';

export function generateStaticParams() {
  return DESTINATION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) {
    return { title: 'Destinations séminaire – TerraGo' };
  }

  const title = destinationSeoTitle(destination);
  const description = stripInlineLinks(
    destination.intro[0] ??
      `Séminaire ${destination.prep} ${destination.name} chez un producteur avec TerraGo : cohésion, RSE, team building et immersion terroir.`,
  );
  const url = `${SITE}${regionDestinationPath(slug)}`;

  return {
    title,
    description,
    keywords: [
      `séminaire ${destination.prep} ${destination.name}`,
      `séminaire chez un producteur ${destination.name}`,
      `team building ${destination.prep} ${destination.name}`,
      'TerraGo',
      'séminaire RSE',
      'séminaire au vert',
    ],
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: 'TerraGo',
      locale: 'fr_FR',
      type: 'website',
      images: [{ url: destination.heroImage, alt: destination.heroImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [destination.heroImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

function JsonLd({ slug }: { slug: string }) {
  const destination = getDestination(slug);
  if (!destination) return null;

  const url = `${SITE}${regionDestinationPath(slug)}`;
  const title = destinationSeoTitle(destination);
  const description = stripInlineLinks(
    destination.intro[0] ??
      `Séminaire ${destination.prep} ${destination.name} chez un producteur avec TerraGo.`,
  );

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    inLanguage: 'fr-FR',
    isPartOf: {
      '@type': 'WebSite',
      name: 'TerraGo',
      url: SITE,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: destination.heroImage,
    },
    about: {
      '@type': 'Service',
      name: destinationHeroHeading(destination),
      provider: {
        '@type': 'Organization',
        name: 'TerraGo',
        url: SITE,
      },
      areaServed: destination.name,
      serviceType: 'Organisation de séminaires d’entreprise',
    },
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: destination.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripInlineLinks(item.a),
      },
    })),
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: SITE,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Destinations',
        item: `${SITE}/destinations`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: destination.name,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}

export default async function DestinationSlugPage({ params }: Props) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination || !DESTINATION_SLUGS.includes(slug as DestinationSlug)) {
    notFound();
  }

  return (
    <>
      <JsonLd slug={slug} />
      <DestinationRegion destination={destination} />
    </>
  );
}
