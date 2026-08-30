import type { Metadata } from 'next';
import { Suspense } from 'react';
import Auth from '../../views/Auth';
import { pageMeta } from '../../lib/pageMeta';

export const metadata: Metadata = pageMeta({
  title: 'Connexion – TerraGo',
  description: 'Connectez-vous à votre espace TerraGo.',
  path: '/auth',
  index: false,
});

export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <Auth />
    </Suspense>
  );
}
