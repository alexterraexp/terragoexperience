import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeminaireEnjeu from '../../../views/SeminaireEnjeu';
import {
  SEMINAIRE_ENJEU_SLUGS,
  getSeminaireEnjeu,
  seminaireEnjeuPath,
  type SeminaireEnjeuSlug,
} from '../../../lib/seminaireEnjeux';

type Props = {
  params: Promise<{ slug: string }>;
};

const SITE = 'https://www.terragoexperiences.fr';

export function generateStaticParams() {
  return SEMINAIRE_ENJEU_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const enjeu = getSeminaireEnjeu(slug);
  if (!enjeu) {
    return { title: 'Séminaires d’entreprise – TerraGo' };
  }

  const url = `${SITE}${seminaireEnjeuPath(slug)}`;

  return {
    title: enjeu.metaTitle,
    description: enjeu.metaDescription,
    keywords: enjeu.keywords,
    robots: { index: true, follow: true },
    openGraph: {
      title: enjeu.metaTitle,
      description: enjeu.metaDescription,
      url,
      siteName: 'TerraGo',
      locale: 'fr_FR',
      type: 'website',
      images: [{ url: enjeu.ogImage, alt: enjeu.ogImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: enjeu.metaTitle,
      description: enjeu.metaDescription,
      images: [enjeu.ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

function JsonLd({ slug }: { slug: string }) {
  const enjeu = getSeminaireEnjeu(slug);
  if (!enjeu) return null;

  const url = `${SITE}${seminaireEnjeuPath(slug)}`;

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: enjeu.metaTitle,
    description: enjeu.metaDescription,
    url,
    inLanguage: 'fr-FR',
    isPartOf: {
      '@type': 'WebSite',
      name: 'TerraGo',
      url: SITE,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: enjeu.ogImage,
    },
    about: {
      '@type': 'Service',
      name: enjeu.title,
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
    mainEntity: enjeu.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
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
        name: 'Séminaires d’entreprise',
        item: `${SITE}/seminaires-entreprise`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: enjeu.name,
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

export default async function SeminaireEnjeuPage({ params }: Props) {
  const { slug } = await params;
  const enjeu = getSeminaireEnjeu(slug);
  if (!enjeu || !SEMINAIRE_ENJEU_SLUGS.includes(slug as SeminaireEnjeuSlug)) {
    notFound();
  }

  return (
    <>
      <JsonLd slug={slug} />
      <SeminaireEnjeu enjeu={enjeu} />
    </>
  );
}
