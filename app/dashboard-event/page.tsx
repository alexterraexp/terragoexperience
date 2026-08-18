import type { Metadata } from 'next';
import DashboardEventClient from './DashboardEventClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Espace participant – TerraGo',
  description: 'Retrouvez le planning, les activités et les infos pratiques de votre séminaire TerraGo.',
  robots: { index: false, follow: false },
};

export default function DashboardEventPage() {
  return <DashboardEventClient />;
}
