import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ExperiencesEntreprise from '../../../views/ExperiencesEntreprise';
import {
  EXPERIENCES_ENTREPRISE_SLUGS,
  getExperienceEntreprise,
  stripTitleEmphasis,
  type ExperienceEntrepriseSlug,
} from '../../../lib/experiencesEntreprise';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return EXPERIENCES_ENTREPRISE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getExperienceEntreprise(slug);
  if (!category) {
    return { title: 'Expériences entreprise – TerraGo' };
  }

  const title = `${stripTitleEmphasis(category.detailTitle)} – Expériences entreprise – TerraGo`;
  const description = category.detailLead;

  return {
    title,
    description,
    robots: { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: 'https://terragoexperiences.fr/experiences-entreprise',
      siteName: 'TerraGo',
      locale: 'fr_FR',
      type: 'website',
      images: [{ url: category.intro.image }],
    },
    alternates: {
      canonical: 'https://terragoexperiences.fr/experiences-entreprise',
    },
  };
}

export default async function ExperiencesEntrepriseSlugPage({ params }: Props) {
  const { slug } = await params;
  if (!EXPERIENCES_ENTREPRISE_SLUGS.includes(slug as ExperienceEntrepriseSlug)) {
    notFound();
  }

  return <ExperiencesEntreprise slug={slug as ExperienceEntrepriseSlug} />;
}
