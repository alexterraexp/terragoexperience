import type { Metadata } from 'next';
import CharteRse from '../../../views/CharteRse';
import { PAGE_OG, pageMeta } from '../../../lib/pageMeta';

export const metadata: Metadata = pageMeta({
  title: "Charte d'engagement RSE | TerraGo",
  description:
    'La charte RSE TerraGo : soutenir les producteurs, limiter l’impact dès la conception, proposer des activités qui ont du sens, et progresser en toute transparence.',
  path: '/notre-approche/charte-rse',
  keywords: [
    'charte RSE TerraGo',
    'engagement responsable séminaire',
    'séminaire producteur local',
    'circuits courts entreprise',
    'RSE expérience immersive',
  ],
  images: [PAGE_OG.charte],
});

export default function CharteRsePage() {
  return <CharteRse />;
}
