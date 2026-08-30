import type { Metadata } from 'next';
import {
  DASHBOARD_EVENT_PATH,
  DASHBOARD_HERO_IMAGE,
  DASHBOARD_HERO_IMAGE_ALT,
} from '../../lib/dashboardEvent';
import { SITE_URL } from '../../lib/siteNav';

const title = 'Espace participant – TerraGo';
const description =
  'Retrouvez le planning, les activités et les infos pratiques de votre séminaire TerraGo.';
const url = `${SITE_URL}${DASHBOARD_EVENT_PATH}`;

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
  openGraph: {
    title,
    description,
    url,
    siteName: 'TerraGo',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: DASHBOARD_HERO_IMAGE,
        width: 1200,
        height: 630,
        alt: DASHBOARD_HERO_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [DASHBOARD_HERO_IMAGE],
  },
};

export default function DashboardEventLayout({ children }: { children: React.ReactNode }) {
  return children;
}
