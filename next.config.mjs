/** @type {import('next').NextConfig} */
const VILLE_SEMINAIRE_SLUGS = [
  'paris',
  'lyon',
  'marseille',
  'bordeaux',
  'toulouse',
  'nantes',
  'rennes',
  'lille',
  'strasbourg',
  'montpellier',
  'nice',
  'grenoble',
  'aix-en-provence',
  'angers',
  'tours',
  'valence',
  'reims',
  'clermont-ferrand',
  'annecy',
  'la-rochelle',
  'biarritz',
];

/** Régions : URL publique `seminaire-entreprise-{prep}-{slug}` → `/destinations/{slug}` */
const DESTINATION_REGIONS = [
  { slug: 'nouvelle-aquitaine', prep: 'en' },
  { slug: 'provence', prep: 'en' },
  { slug: 'ile-de-france', prep: 'en' },
  { slug: 'normandie', prep: 'en' },
  { slug: 'occitanie', prep: 'en' },
  { slug: 'bretagne', prep: 'en' },
  { slug: 'pays-de-la-loire', prep: 'en' },
  { slug: 'auvergne', prep: 'en' },
  { slug: 'bourgogne', prep: 'en' },
  { slug: 'corse', prep: 'en' },
];

/** Lieux : URL publique `seminaire-entreprise-{pathSlug}` → `/destinations/lieux/{slug}` */
const DESTINATION_LIEUX = [
  { slug: 'chez-le-producteur', pathSlug: 'chez-producteur' },
  { slug: 'au-vignoble', pathSlug: 'vignoble' },
  { slug: 'a-la-ferme', pathSlug: 'ferme' },
  { slug: 'au-bord-de-leau', pathSlug: 'bord-eau' },
  { slug: 'en-montagne', pathSlug: 'montagne' },
  { slug: 'en-pleine-nature', pathSlug: 'pleine-nature' },
  { slug: 'domaine-d-exception', pathSlug: 'domaine-exception' },
  { slug: 'au-coeur-des-terroirs', pathSlug: 'coeur-terroirs' },
];

const nextConfig = {
  images: {
    // Images déjà optimisées sur Supabase (webp/avif) : pas de re-traitement Vercel (/_next/image).
    unoptimized: true,
    // Next 16 bloque supabase.co en local (DNS NAT64 vu comme IP privée).
    dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'lxlvcwwvnujfbqgcfzze.supabase.co' },
      { protocol: 'https', hostname: 'i.f1g.fr' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'www.google.com' },
    ],
  },
  async rewrites() {
    return [
      ...VILLE_SEMINAIRE_SLUGS.map((ville) => ({
        source: `/seminaire-entreprise-${ville}`,
        destination: `/seminaire/${ville}`,
      })),
      ...DESTINATION_REGIONS.map(({ slug, prep }) => ({
        source: `/destinations/seminaire-entreprise-${prep}-${slug}`,
        destination: `/destinations/${slug}`,
      })),
      ...DESTINATION_LIEUX.map(({ slug, pathSlug }) => ({
        source: `/destinations/seminaire-entreprise-${pathSlug}`,
        destination: `/destinations/lieux/${slug}`,
      })),
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        has: [{ type: 'host', value: 'terragoexperiences.fr' }],
        destination: 'https://www.terragoexperiences.fr/',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'terragoexperiences.fr' }],
        destination: 'https://www.terragoexperiences.fr/:path*',
        permanent: true,
      },
      {
        source: '/mission-engagements',
        destination: '/notre-approche',
        permanent: true,
      },
      {
        source: '/mission-engagements/:path*',
        destination: '/notre-approche',
        permanent: true,
      },
      {
        source: '/entre-amis',
        destination: '/experiences-privees',
        permanent: true,
      },
      {
        source: '/entre-amis/:path*',
        destination: '/experiences-privees',
        permanent: true,
      },
      {
        source: '/particuliers',
        destination: '/experiences-privees',
        permanent: true,
      },
      {
        source: '/seminaire-exemples',
        destination: '/exemples-seminaire-entreprise',
        permanent: true,
      },
      {
        source: '/seminaire-exemples/:slug',
        destination: '/exemples-seminaire-entreprise/:slug',
        permanent: true,
      },
      {
        source: '/seminaires-entreprise/offres',
        destination: '/exemples-seminaire-entreprise',
        permanent: true,
      },
      {
        source: '/seminaires-entreprise/offres/:slug',
        destination: '/exemples-seminaire-entreprise/:slug',
        permanent: true,
      },
      {
        source: '/seminaires/offres',
        destination: '/exemples-seminaire-entreprise',
        permanent: true,
      },
      {
        source: '/seminaires/offres/:slug',
        destination: '/exemples-seminaire-entreprise/:slug',
        permanent: true,
      },
      {
        source: '/entreprises/offres',
        destination: '/exemples-seminaire-entreprise',
        permanent: true,
      },
      {
        source: '/nous-rejoindre',
        destination: '/partenaires',
        permanent: true,
      },
      {
        source: '/recommander-un-producteur',
        destination: '/partenaires',
        permanent: true,
      },
      {
        source: '/experiences',
        destination: '/experiences-entreprise',
        permanent: true,
      },
      ...VILLE_SEMINAIRE_SLUGS.map((ville) => ({
        source: `/seminaire-${ville}`,
        destination: `/seminaire-entreprise-${ville}`,
        permanent: true,
      })),
      ...DESTINATION_REGIONS.map(({ slug, prep }) => ({
        source: `/destinations/${slug}`,
        destination: `/destinations/seminaire-entreprise-${prep}-${slug}`,
        permanent: true,
      })),
      ...DESTINATION_LIEUX.map(({ slug, pathSlug }) => ({
        source: `/destinations/lieux/${slug}`,
        destination: `/destinations/seminaire-entreprise-${pathSlug}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
