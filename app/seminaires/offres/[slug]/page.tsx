import { permanentRedirect } from 'next/navigation';

export default async function SeminaireSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  permanentRedirect(`/seminaires-entreprise/offres/${slug}`);
}
