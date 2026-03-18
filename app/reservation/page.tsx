import type { Metadata } from 'next';
import { Suspense } from 'react';
import Booking from '../../views/Booking';

export const metadata: Metadata = {
  title: 'Réserver votre expérience terroir – Terrago',
  description:
    'Finalisez la réservation de votre séminaire nature ou expérience terroir. Sélectionnez vos dates, confirmez les participants et recevez votre confirmation.',
  robots: { index: true, follow: true },
};

export default function ReservationPage() {
  return (
    <Suspense fallback={null}>
      <Booking />
    </Suspense>
  );
}
