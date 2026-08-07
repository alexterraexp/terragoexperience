import type { Metadata } from 'next';
import ExperiencesEntreprise from '../../views/ExperiencesEntreprise';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Expériences entreprise – Team building, RSE & événements – TerraGo',
    description:
      'Team building, séminaires RSE et conventions d’entreprise chez des producteurs engagés. Des expériences authentiques qui ont du sens.',
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Expériences entreprise – TerraGo',
      description:
        'Team building, séminaires RSE et conventions d’entreprise chez des producteurs engagés.',
      url: 'https://terragoexperiences.fr/experiences-entreprise',
      siteName: 'TerraGo',
      locale: 'fr_FR',
      type: 'website',
    },
    alternates: {
      canonical: 'https://terragoexperiences.fr/experiences-entreprise',
    },
  };
}

export default function ExperiencesEntreprisePage() {
  return <ExperiencesEntreprise />;
}
