import { permanentRedirect } from 'next/navigation';

/** Anciennes fiches producteur → liste (détail en modal). */
export default async function ProducerPage({
  params,
}: {
  params: Promise<{ producerId: string }>;
}) {
  const { producerId } = await params;
  permanentRedirect(`/partenaires?p=${encodeURIComponent(producerId)}`);
}
