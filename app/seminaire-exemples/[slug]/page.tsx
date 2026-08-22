import { permanentRedirect } from 'next/navigation';
import {
  exempleSeminaireEntreprisePath,
  resolveSeminaireSlugRedirect,
} from '@/lib/exemplesSeminaireEntreprise';

export default async function SeminaireExemplesRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  permanentRedirect(exempleSeminaireEntreprisePath(resolveSeminaireSlugRedirect(slug)));
}
