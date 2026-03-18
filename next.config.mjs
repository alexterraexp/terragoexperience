/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'lxlvcwwvnujfbqgcfzze.supabase.co' },
      { protocol: 'https', hostname: 'i.f1g.fr' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/entreprises/offres',
        destination: '/seminaires/offres',
        permanent: true,
      },
      {
        source: '/particuliers',
        destination: '/entre-amis',
        permanent: true,
      },
      {
        source: '/experiences',
        destination: '/',
        permanent: true,
      },
      {
        source: '/entre-amis/s%C3%A9jours',
        destination: '/entre-amis/sejours',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
