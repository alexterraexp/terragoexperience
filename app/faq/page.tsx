import type { Metadata } from 'next';
import Faq from '../../views/Faq';
import { buildFaqPageJsonLd, FAQ_PATH } from '../../lib/faq';
import { SITE_URL } from '../../lib/siteNav';

const title = 'FAQ séminaire d’entreprise, RSE et team building | TerraGo';
const description =
  'Réponses aux questions fréquentes sur le séminaire d’entreprise : budget, format, séminaire au vert, RSE, team building original et immersion à la rencontre des producteurs.';

const url = `${SITE_URL}${FAQ_PATH}`;

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url,
    siteName: 'TerraGo',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    title,
    description,
  },
  alternates: {
    canonical: url,
  },
};

export default function FaqPage() {
  const faqJsonLd = buildFaqPageJsonLd(SITE_URL);
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
      url: SITE_URL,
    },
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'FAQ', item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Faq />
    </>
  );
}
