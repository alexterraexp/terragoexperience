import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeminaireVille from '../../../views/SeminaireVille';
import {
  VILLE_SEMINAIRE_SLUGS,
  getVilleSeminaire,
  villeFaqItems,
  villeSeminairePath,
  type VilleSeminaireSlug,
} from '../../../lib/villesSeminaire';
import { SITE_URL } from '../../../lib/siteNav';

type Props = {
  params: Promise<{ ville: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return VILLE_SEMINAIRE_SLUGS.map((ville) => ({ ville }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville: slug } = await params;
  const ville = getVilleSeminaire(slug);
  if (!ville) {
    return { title: 'Séminaire – TerraGo' };
  }

  const url = `${SITE_URL}${villeSeminairePath(ville.slug)}`;

  return {
    title: ville.metaTitle,
    description: ville.metaDescription,
    robots: { index: true, follow: true },
    openGraph: {
      title: ville.metaTitle,
      description: ville.metaDescription,
      url,
      siteName: 'TerraGo',
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: {
      title: ville.metaTitle,
      description: ville.metaDescription,
    },
    alternates: {
      canonical: url,
    },
  };
}

function JsonLd({ slug }: { slug: string }) {
  const ville = getVilleSeminaire(slug);
  if (!ville) return null;

  const url = `${SITE_URL}${villeSeminairePath(ville.slug)}`;

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: ville.metaTitle,
    description: ville.metaDescription,
    url,
    inLanguage: 'fr-FR',
    isPartOf: {
      '@type': 'WebSite',
      name: 'TerraGo',
      url: SITE_URL,
    },
    about: {
      '@type': 'Service',
      name: ville.h1,
      provider: {
        '@type': 'Organization',
        name: 'TerraGo',
        url: SITE_URL,
      },
      areaServed: ville.name,
      serviceType: 'Organisation de séminaires d’entreprise',
    },
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: villeFaqItems(ville).map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Destinations', item: `${SITE_URL}/destinations` },
      { '@type': 'ListItem', position: 3, name: `Séminaire ${ville.nearLabel}`, item: url },
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

export default async function SeminaireVillePage({ params }: Props) {
  const { ville: slug } = await params;
  const ville = getVilleSeminaire(slug);
  if (!ville || !VILLE_SEMINAIRE_SLUGS.includes(slug as VilleSeminaireSlug)) {
    notFound();
  }

  return (
    <>
      <JsonLd slug={slug} />
      <SeminaireVille ville={ville} />
    </>
  );
}
