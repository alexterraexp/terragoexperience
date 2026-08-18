import type { Metadata } from 'next';
import DashboardEventClient from '../DashboardEventClient';

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Espace participant – TerraGo',
  description: 'Retrouvez le planning, les activités et les infos pratiques de votre séminaire TerraGo.',
  robots: { index: false, follow: false },
};

export default async function DashboardEventSeminarPage({ params }: Props) {
  await params;
  return <DashboardEventClient />;
}
