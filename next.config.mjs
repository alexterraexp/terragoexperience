/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
    const villes = [
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
    return villes.map((ville) => ({
      source: `/seminaire-${ville}`,
      destination: `/seminaire/${ville}`,
    }));
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
        source: '/seminaires-entreprise/offres',
        destination: '/seminaire-exemples',
        permanent: true,
      },
      {
        source: '/seminaires-entreprise/offres/:slug',
        destination: '/seminaire-exemples/:slug',
        permanent: true,
      },
      {
        source: '/seminaires/offres',
        destination: '/seminaire-exemples',
        permanent: true,
      },
      {
        source: '/seminaires/offres/:slug',
        destination: '/seminaire-exemples/:slug',
        permanent: true,
      },
      {
        source: '/entreprises/offres',
        destination: '/seminaire-exemples',
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
    ];
  },
};

export default nextConfig;
