'use client';

import dynamic from 'next/dynamic';
import SeminaireDetailLoading from '@/components/SeminaireDetailLoading';

const SeminaireDetailPage = dynamic(
  () => import('../../../views/SeminaireDetailPage'),
  { ssr: false, loading: () => <SeminaireDetailLoading /> }
);

export default function SeminaireDetailWrapper() {
  return <SeminaireDetailPage />;
}
