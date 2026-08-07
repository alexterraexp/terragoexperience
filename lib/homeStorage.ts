import { supabaseServer } from './supabase';

/** Durée de validité des URLs signées HOME (~3 ans). */
const SIGNED_URL_TTL_SEC = 60 * 60 * 24 * 365 * 3;

const HOME_FILES = {
  heroVideo: 'header-video.mp4',
  heroPoster: 'Noisettes-recolte.png',
  conceptAgir: 'Noisettes-recolte.png',
  conceptLien: 'repas-convivial.png',
  conceptInspirer: 'maraicher-explication.png',
  expOlive: 'olives-recoltes.mp4',
  expCuisine: 'atelier-cuisine-farine.mp4',
  expVin: 'vignes-barrique.mp4',
  bannerVideo: 'vergers.mp4',
} as const;

export type HomeAssetUrls = Record<keyof typeof HOME_FILES, string>;

async function signHomeFile(path: string): Promise<string> {
  const { data, error } = await supabaseServer.storage
    .from('HOME')
    .createSignedUrl(path, SIGNED_URL_TTL_SEC);

  if (error || !data?.signedUrl) {
    throw new Error(`Impossible de signer HOME/${path}: ${error?.message ?? 'URL manquante'}`);
  }
  return data.signedUrl;
}

/** Génère les URLs signées des assets HOME côté serveur (évite les tokens corrompus en dur). */
export async function getHomeAssetUrls(): Promise<HomeAssetUrls> {
  const entries = await Promise.all(
    (Object.entries(HOME_FILES) as [keyof typeof HOME_FILES, string][]).map(
      async ([key, path]) => [key, await signHomeFile(path)] as const,
    ),
  );
  return Object.fromEntries(entries) as HomeAssetUrls;
}

export const PRODUCER_IMAGE =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/potagermenthon/potager-chateau-menthon.jpg';

export const HOME_EMOJI = {
  arbre:
    'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/emoji-arbre.png',
  branche:
    'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/emoji-branche.png',
  mainsDansLaTerre:
    'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/mains-dans-la-terre.png',
  rateau:
    'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/rateau.png',
  chaussures:
    'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/shoes.png',
  montagne:
    'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/mountain.png',
  etoile:
    'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/etoilecouleurfoncee.png',
} as const;

const STEPS_BASE_URL =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/Etapes';

export const HOME_STEPS = [
  { title: 'Envoyez-nous votre brief', image: `${STEPS_BASE_URL}/10.png` },
  { title: 'Proposition des offres et validation', image: `${STEPS_BASE_URL}/11.png` },
  { title: 'Cocréation de votre programme', image: `${STEPS_BASE_URL}/12.png` },
  { title: 'Accompagnement jusqu\'au jour J !', image: `${STEPS_BASE_URL}/13.png` },
] as const;

export const HOME_PRODUCERS = [
  {
    name: 'Baptiste',
    image:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/pimentsbaptiste/baptiste_producteur_piment.jpg',
  },
  {
    name: 'Nathalie & Benjamin',
    image:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/sol/producteurssol.png',
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
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/noixsoeurs/noix-et-cie-marie-lise-sabine.jpg',
  },
] as const;

/** `prep` : préposition utilisée devant le nom dans « Séminaire … Bretagne ». */
export const REGION_IMAGES = [
  { name: 'Pays Basque', prep: 'au', image: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/pimentsbaptiste/b5.png' },
  { name: 'Bretagne', prep: 'en', image: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/heroimages/ostreiculteurs.png' },
  { name: 'Auvergne', prep: 'en', image: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/heroimages/fromage-chevre.png' },
  { name: 'Occitanie', prep: 'en', image: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/heroimages/olives-recoltes.png' },
  { name: 'Provence', prep: 'en', image: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/heroimages/lavandepaysage.png' },
  { name: 'Bordeaux', prep: 'à', image: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/heroimages/degustation-spirit.jpg' },
  { name: 'Normandie', prep: 'en', image: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/heroimages/travail-terre.png' },
  { name: 'Alsace', prep: 'en', image: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/olivesrecoltes.JPG' },
] as const;

export const REGION_TAGS = [
  'Séminaire engagé',
  'Séminaire au vert',
  'Séminaire en pleine nature',
  'Séminaire RSE',
] as const;
