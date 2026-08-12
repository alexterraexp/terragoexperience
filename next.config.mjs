/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'lxlvcwwvnujfbqgcfzze.supabase.co' },
      { protocol: 'https', hostname: 'i.f1g.fr' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'www.google.com' },
    ],
  },
  async redirects() {
    return [
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
    ];
  },
};

export default nextConfig;
