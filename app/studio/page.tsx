import type { Metadata } from 'next';
import StudioApp from './StudioApp';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Espace fondateurs – TerraGo',
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <StudioApp />;
}
