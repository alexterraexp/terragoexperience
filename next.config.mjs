/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
        source: '/mission-engagements',
        destination: '/notre-approche',
        permanent: true,
      },
      {
        source: '/mission-engagements/:path*',
        destination: '/notre-approche',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
