'use client';

import dynamic from 'next/dynamic';

const SeminaireDetailPage = dynamic(
  () => import('../../../../views/SeminaireDetailPage'),
  { ssr: false }
);

export default function SeminaireDetailWrapper() {
  return <SeminaireDetailPage />;
}
