import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DestinationLieu from '../../../../views/DestinationLieu';
import {
  LIEU_SLUGS,
  getLieu,
  lieuDestinationPath,
  type LieuSlug,
} from '../../../../lib/lieux';
import { stripInlineLinks } from '../../../../lib/seminaireEnjeux';

type Props = {
  params: Promise<{ slug: string }>;
};

const SITE = 'https://www.terragoexperiences.fr';

export function generateStaticParams() {
  return LIEU_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lieu = getLieu(slug);
  if (!lieu) {
    return { title: 'Lieux de séminaire – TerraGo' };
  }

  const url = `${SITE}${lieuDestinationPath(slug)}`;

  return {
    title: lieu.metaTitle,
    description: lieu.metaDescription,
    keywords: [
      `séminaire d'entreprise ${lieu.phrase}`,
      `team building ${lieu.phrase}`,
      `séminaire ${lieu.name.toLowerCase()}`,
      'TerraGo',
      'séminaire RSE',
      'séminaire au vert',
    ],
    robots: { index: true, follow: true },
    openGraph: {
      title: lieu.metaTitle,
      description: lieu.metaDescription,
      url,
      siteName: 'TerraGo',
      locale: 'fr_FR',
      type: 'website',
      images: [{ url: lieu.heroImage, alt: lieu.heroImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: lieu.metaTitle,
      description: lieu.metaDescription,
      images: [lieu.heroImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

function JsonLd({ slug }: { slug: string }) {
  const lieu = getLieu(slug);
  if (!lieu) return null;

  const url = `${SITE}${lieuDestinationPath(slug)}`;

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: lieu.metaTitle,
    description: lieu.metaDescription,
    url,
    inLanguage: 'fr-FR',
    isPartOf: {
      '@type': 'WebSite',
      name: 'TerraGo',
      url: SITE,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: lieu.heroImage,
    },
    about: {
      '@type': 'Service',
      name: `Séminaire d'entreprise ${lieu.phrase}`,
      provider: {
        '@type': 'Organization',
        name: 'TerraGo',
        url: SITE,
      },
      areaServed: 'FR',
      serviceType: 'Organisation de séminaires d’entreprise',
    },
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: lieu.faq.map((item) => ({
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
        name: lieu.name,
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

export default async function DestinationLieuPage({ params }: Props) {
  const { slug } = await params;
  const lieu = getLieu(slug);
  if (!lieu || !LIEU_SLUGS.includes(slug as LieuSlug)) {
    notFound();
  }

  return (
    <>
      <JsonLd slug={slug} />
      <DestinationLieu lieu={lieu} />
    </>
  );
}
