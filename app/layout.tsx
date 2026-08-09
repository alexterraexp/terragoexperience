import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';
import GoogleTagManager from '../components/GoogleTagManager';
import { ModalProvider } from '../context/ModalContext';

export const metadata: Metadata = {
  title: "TerraGo - L'immersion au cœur du terroir français",
  description:
    'Séminaires expérientiels, team buildings vertueux et voyages de groupe authentiques au cœur du terroir français.',
  metadataBase: new URL('https://terragoexperiences.fr'),
  openGraph: {
    title: "TerraGo - L'immersion au cœur du terroir français",
    description:
      'Séminaires expérientiels, team buildings vertueux et voyages de groupe authentiques au cœur du terroir français.',
    url: 'https://terragoexperiences.fr',
    siteName: 'TerraGo',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/enjeux/1904586-hero-follow.png',
        width: 1920,
        height: 1080,
        alt: "TerraGo — séminaires d'entreprise chez des producteurs engagés",
      },
    ],
  },
  twitter: {
    title: "TerraGo - L'immersion au cœur du terroir français",
    description:
      'Séminaires expérientiels, team buildings vertueux et voyages de groupe authentiques au cœur du terroir français.',
    images: [
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/enjeux/1904586-hero-follow.png',
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://lxlvcwwvnujfbqgcfzze.supabase.co" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/logo.png" />
      </head>
      <body className="bg-beige-bg text-primary">
        <CookieBanner />
        <GoogleTagManager />
        <ModalProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ModalProvider>
      </body>
    </html>
  );
}
