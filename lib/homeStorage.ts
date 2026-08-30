const HOME_PUBLIC_BASE =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME';

const HOME_FILES = {
  heroVideo: 'home-terrago.mp4',
  heroPoster: 'Noisettes-recolte.webp',
  conceptAgir: 'Noisettes-recolte.webp',
  conceptLien: 'repas-convivial.webp',
  conceptInspirer: 'maraicher-explication.webp',
  expOlive: 'olives-recoltes.mp4',
  expCuisine: 'atelier-cuisine-farine.mp4',
  expVin: 'vignes-barrique.mp4',
  bannerImage: 'seminaire/ferme/8953021.webp',
} as const;

export type HomeAssetUrls = Record<keyof typeof HOME_FILES, string>;

function publicHomeUrl(path: string): string {
  return `${HOME_PUBLIC_BASE}/${path
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')}`;
}

/**
 * URLs publiques HOME — le bucket est déjà exposé en public.
 * Évite l’attente de signature Supabase avant le premier paint du hero.
 */
export function getHomeAssetUrls(): HomeAssetUrls {
  return Object.fromEntries(
    (Object.entries(HOME_FILES) as [keyof typeof HOME_FILES, string][]).map(
      ([key, path]) => [key, publicHomeUrl(path)],
    ),
  ) as HomeAssetUrls;
}

export const PRODUCER_IMAGE =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/potagermenthon/prod-menton.webp';

export const HOME_EMOJI = {
  arbre:
    'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/emoji-arbre.png',
  branche:
    'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/emoji-branche.png',
  mainsDansLaTerre:
    'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/mains-dans-la-terre.png',
  producteurSoutenu:
    'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/producteur-sountenu.png',
  rateau:
    'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/rateau.png',
  chaussures:
    'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/shoes.png',
  montagne:
    'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/mountain.png',
  etoile:
    'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/etoilecouleurfoncee.png',
  ble:
    'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/ble.png',
} as const;

const STEPS_BASE_URL =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/Etapes';

export const HOME_STEPS = [
  { title: 'Envoyez-nous votre brief', image: `${STEPS_BASE_URL}/10.png` },
  { title: 'Proposition des offres et validation', image: `${STEPS_BASE_URL}/offres-et-validation.png` },
  { title: 'Cocréation de votre programme', image: `${STEPS_BASE_URL}/programme-web.png` },
  { title: 'Accompagnement jusqu\'au jour J !', image: `${STEPS_BASE_URL}/13.png` },
] as const;

export const HOME_PRODUCERS = [
  {
    name: 'Baptiste',
    image:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/pimentsbaptiste/baptiste_producteur_piment.webp',
  },
  {
    name: 'Nathalie & Benjamin',
    image:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/sol/producteurssol.webp',
  },
  {
    name: 'Paolo',
    image:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/OLIVEPAOLO/PAOLO1.jpg',
  },
  {
    name: 'Hugues & Marc',
    image: PRODUCER_IMAGE,
  },
  {
    name: 'Suzanna',
    image:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/suzannabufflones/suzannabufflone.avif',
  },
  {
    name: 'Marie-Lise & Sabine',
    image:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/noixsoeurs/noix-et-cie-marie-lise-sabine.webp',
  },
] as const;

/**
 * `prep` : préposition (« Séminaire en Bretagne »).
 * `article` : article défini devant le nom (« la Bretagne », « l'Auvergne-Rhône-Alpes ») — espace inclus sauf pour `l'`.
 */
export const REGION_IMAGES = [
  { slug: 'nouvelle-aquitaine', name: 'Nouvelle-Aquitaine', prep: 'en', article: 'la ', image: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/Destination/huitre-pecheurs.avif' },
  { slug: 'provence-alpes-cote-d-azur', name: 'Provence-Alpes-Côte d’Azur', prep: 'en', article: 'la ', image: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/Destination/lavande.avif' },
  { slug: 'ile-de-france', name: 'Île-de-France', prep: 'en', article: "l'", image: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/Destination/0147530379456.webp' },
  { slug: 'normandie', name: 'Normandie', prep: 'en', article: 'la ', image: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/Destination/normandie.avif' },
  { slug: 'occitanie', name: 'Occitanie', prep: 'en', article: "l'", image: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/Destination/occitanie.avif' },
  { slug: 'bretagne', name: 'Bretagne', prep: 'en', article: 'la ', image: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/Destination/157872401-35444288.jpg' },
  { slug: 'pays-de-la-loire', name: 'Pays de la Loire', prep: 'en', article: 'les ', image: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/Destination/24311133636914.webp' },
  { slug: 'auvergne-rhone-alpes', name: 'Auvergne-Rhône-Alpes', prep: 'en', article: "l'", image: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/Destination/37910945-15085778.webp' },
  { slug: 'bourgogne-franche-comte', name: 'Bourgogne-Franche-Comté', prep: 'en', article: 'la ', image: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/Destination/bourgogn.avif' },
  { slug: 'corse', name: 'Corse', prep: 'en', article: 'la ', image: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/Destination/1198427643714.webp' },
] as const;

/** Anciens slugs publics → nouveaux slugs (redirections 301). */
export const REGION_SLUG_REDIRECTS = [
  { from: 'provence', to: 'provence-alpes-cote-d-azur' },
  { from: 'auvergne', to: 'auvergne-rhone-alpes' },
  { from: 'bourgogne', to: 'bourgogne-franche-comte' },
] as const;

export type RegionSlug = (typeof REGION_IMAGES)[number]['slug'];

export function regionDestinationPath(slug: string): string {
  const region = REGION_IMAGES.find((r) => r.slug === slug);
  const prep = region?.prep ?? 'en';
  return `/destinations/seminaire-entreprise-${prep}-${slug}`;
}

export const LIEU_SLUGS = [
  'chez-le-producteur',
  'au-vignoble',
  'a-la-ferme',
  'au-bord-de-leau',
  'en-montagne',
  'en-pleine-nature',
  'domaine-d-exception',
  'au-coeur-des-terroirs',
] as const;

export type LieuSlug = (typeof LIEU_SLUGS)[number];

/** Segment d’URL public (SEO) pour les pages lieu. */
export const LIEU_PATH_SLUGS = {
  'chez-le-producteur': 'chez-producteur',
  'au-vignoble': 'vignoble',
  'a-la-ferme': 'ferme',
  'au-bord-de-leau': 'bord-eau',
  'en-montagne': 'montagne',
  'en-pleine-nature': 'pleine-nature',
  'domaine-d-exception': 'domaine-exception',
  'au-coeur-des-terroirs': 'coeur-terroirs',
} as const satisfies Record<LieuSlug, string>;

export type LieuPathSlug = (typeof LIEU_PATH_SLUGS)[LieuSlug];

export function lieuDestinationPath(slug: string): string {
  const pathSlug = LIEU_PATH_SLUGS[slug as LieuSlug] ?? slug;
  return `/destinations/seminaire-entreprise-${pathSlug}`;
}

export const REGION_TAGS = [
  'Séminaire engagé',
  'Séminaire au vert',
  'Séminaire en pleine nature',
  'Séminaire RSE',
] as const;
