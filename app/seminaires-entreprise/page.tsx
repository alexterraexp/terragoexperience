import type { Metadata } from 'next';
import { Suspense } from 'react';
import Seminaires from '../../views/Seminaires';

export async function generateMetadata(): Promise<Metadata> {
  const title =
    "Séminaires d'entreprise à impact – Cohésion, RSE & immersion | TerraGo";
  const description =
    "Découvrez les séminaires d'entreprise TerraGo : cohésion, sensibilisation, inspiration et engagement au contact de producteurs et artisans.";

  return {
    title,
    description,
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: 'https://terragoexperiences.fr/seminaires-entreprise',
      siteName: 'TerraGo',
      locale: 'fr_FR',
      type: 'website',
    },
    alternates: {
      canonical: 'https://terragoexperiences.fr/seminaires-entreprise',
    },
  };
}

export default function SeminairesEntreprisePage() {
  return (
    <Suspense fallback={null}>
      <Seminaires />
    </Suspense>
  );
}
