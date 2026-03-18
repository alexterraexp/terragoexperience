'use client';

import dynamic from 'next/dynamic';

const ProducerDetailPage = dynamic(
  () => import('../../../views/ProducerDetailPage'),
  { ssr: false }
);

export default function ProducerClientWrapper() {
  return <ProducerDetailPage />;
}
