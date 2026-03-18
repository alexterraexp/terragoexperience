'use client';

import dynamic from 'next/dynamic';

const ExperienceDetail = dynamic(
  () => import('../../../views/ExperienceDetail'),
  { ssr: false }
);

export default function ExperienceClientWrapper() {
  return <ExperienceDetail />;
}
