import type { Metadata } from 'next';
import { Suspense } from 'react';
import Experiences from '../../views/Experiences';

export const metadata: Metadata = {
  title: 'Expériences séminaire originales & sur mesure – Terrago',
  description:
    'Trouvez l\'expérience séminaire originale qui correspond à votre équipe : vendanges, fromagerie, truffes… Filtrez par région et type de terroir.',
  robots: { index: true, follow: true },
};

export default function ExperiencesPage() {
  return (
    <Suspense fallback={null}>
      <Experiences />
    </Suspense>
  );
}
