import type { Metadata } from 'next';
import { Suspense } from 'react';
import Auth from '../../views/Auth';

export const metadata: Metadata = {
  title: 'Connexion – TerraGo',
  description: 'Connectez-vous à votre espace TerraGo.',
  robots: { index: false, follow: false },
};

export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <Auth />
    </Suspense>
  );
}
