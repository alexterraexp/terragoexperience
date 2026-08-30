import type { Metadata } from 'next';
import { getSitelinkPage, sitelinkTitle, SITE_URL, type SitelinkPage } from './siteNav';

const HOME = 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME';

export const PAGE_OG = {
  seminaires: {
    url: `${HOME}/arrivee-randonnee.webp`,
    alt: 'Arrivée d’une randonnée – séminaire TerraGo',
  },
  destinations: {
    url: `${HOME}/seminaire/nouvelleaquitaine/pexels-ertabbt-150087708-13678581.webp`,
    alt: 'Paysage de séminaire en Nouvelle-Aquitaine – TerraGo',
  },
  experiences: {
    url: `${HOME}/EXPERIENCES IMG/pexels-mariaturkmani-14198583.webp`,
    alt: 'Expérience immersive TerraGo à la rencontre des producteurs',
  },
  approche: {
    url: `${HOME}/team-terrago.webp`,
    alt: 'L’équipe TerraGo',
  },
  partenaires: {
    url: `${HOME}/serre-maraicher.jpg`,
    alt: 'Serre maraîchère – producteurs partenaires TerraGo',
  },
  privees: {
    url: `${HOME}/pique-nique-convivial.webp`,
    alt: 'Pique-nique convivial – expériences privées TerraGo',
  },
  exemples: {
    url: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/LOGEMENTS/TRINQUET-PIMENT/trinquet7.jpg',
    alt: 'Exemple de séminaire TerraGo chez un producteur',
  },
  charte: {
    url: `${HOME}/Etapes/1087462-12111234.webp`,
    alt: 'Charte d’engagement RSE TerraGo',
  },
} as const;

const SITELINK_OG: Record<SitelinkPage['path'], { url: string; alt: string }> = {
  '/seminaires-entreprise': PAGE_OG.seminaires,
  '/destinations': PAGE_OG.destinations,
  '/experiences-entreprise': PAGE_OG.experiences,
  '/notre-approche': PAGE_OG.approche,
  '/partenaires': PAGE_OG.partenaires,
};

type OgImage = string | { url: string; width?: number; height?: number; alt?: string };

export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  images?: OgImage[];
  index?: boolean;
  follow?: boolean;
  type?: 'website' | 'article';
  keywords?: string[];
}): Metadata {
  const path = opts.path.startsWith('http')
    ? new URL(opts.path).pathname
    : opts.path.startsWith('/')
      ? opts.path
      : `/${opts.path}`;
  const url = `${SITE_URL}${path}`;
  const images = (opts.images ?? []).map((img) => (typeof img === 'string' ? { url: img } : img));
  const index = opts.index !== false;
  const follow = opts.follow ?? index;

  return {
    title: opts.title,
    description: opts.description,
    ...(opts.keywords ? { keywords: opts.keywords } : {}),
    robots: { index, follow },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: 'TerraGo',
      locale: 'fr_FR',
      type: opts.type ?? 'website',
      ...(images.length > 0 ? { images } : {}),
    },
    twitter: {
      card: images.length > 0 ? 'summary_large_image' : 'summary',
      title: opts.title,
      description: opts.description,
      ...(images.length > 0 ? { images: images.map((img) => img.url) } : {}),
    },
    alternates: { canonical: url },
  };
}

export function sitelinkMeta(path: SitelinkPage['path']): Metadata {
  const page = getSitelinkPage(path);
  const og = SITELINK_OG[path];
  return pageMeta({
    title: sitelinkTitle(page.name),
    description: page.description,
    path: page.path,
    images: [og],
  });
}
