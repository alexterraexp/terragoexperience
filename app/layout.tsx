import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';
import GoogleTagManager from '../components/GoogleTagManager';
import ScrollToTop from '../components/ScrollToTop';
import ImageProtection from '../components/ImageProtection';
import { ModalProvider } from '../context/ModalContext';

export const metadata: Metadata = {
  title: "TerraGo - L'immersion au cœur du terroir français",
  description:
    'Séminaires expérientiels, team buildings vertueux et voyages de groupe authentiques au cœur du terroir français.',
  metadataBase: new URL('https://www.terragoexperiences.fr'),
  openGraph: {
    title: "TerraGo - L'immersion au cœur du terroir français",
    description:
      'Séminaires expérientiels, team buildings vertueux et voyages de groupe authentiques au cœur du terroir français.',
    url: 'https://www.terragoexperiences.fr',
    siteName: 'TerraGo',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/og-home.jpg',
        width: 1200,
        height: 630,
        alt: "TerraGo — séminaires d'entreprise à la rencontre des producteurs",
      },
    ],
  },
  twitter: {
    title: "TerraGo - L'immersion au cœur du terroir français",
    description:
      'Séminaires expérientiels, team buildings vertueux et voyages de groupe authentiques au cœur du terroir français.',
    images: ['/og-home.jpg'],
  },
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    apple: [{ url: '/favicon.png' }],
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
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className="bg-beige-bg text-primary">
        <ScrollToTop />
        <ImageProtection />
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
