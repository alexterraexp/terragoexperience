import DashboardEventClient from '../DashboardEventClient';

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = 'force-dynamic';

export default async function DashboardEventSeminarPage({ params }: Props) {
  await params;
  return <DashboardEventClient />;
}
