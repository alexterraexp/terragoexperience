import { NextResponse } from 'next/server';
import { optimizeStudioImage } from '@/lib/optimizeStudioImage';
import { studioGuard } from '@/lib/studioAuth';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const MAX_BYTES = 20 * 1024 * 1024;
const TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']);
const FOLDERS = new Set(['seminaires', 'producteurs', 'realisations', 'articles']);

export async function POST(request: Request) {
  const denied = await studioGuard();
  if (denied) return denied;
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'SUPABASE_SERVICE_ROLE_KEY manquante sur le serveur.' },
      { status: 503 },
    );
  }

  const form = await request.formData().catch(() => null);
  const folder = String(form?.get('folder') ?? '');
  if (!FOLDERS.has(folder)) {
    return NextResponse.json({ error: 'Dossier d’image inconnu.' }, { status: 400 });
  }
  const file = form?.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Choisis une image.' }, { status: 400 });
  }
  if (!TYPES.has(file.type)) {
    return NextResponse.json({ error: 'Format accepté : jpg, png, webp, gif ou avif.' }, { status: 400 });
  }
  if (file.size <= 0 || file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Image trop lourde (20 Mo maximum).' }, { status: 400 });
  }

  let image: Buffer;
  try {
    image = await optimizeStudioImage(Buffer.from(await file.arrayBuffer()));
  } catch {
    return NextResponse.json({ error: 'Cette image n’a pas pu être lue.' }, { status: 400 });
  }
  if (image.length === 0) {
    return NextResponse.json({ error: 'Cette image n’a pas pu être lue.' }, { status: 400 });
  }

  const path = `${folder}/${crypto.randomUUID()}.webp`;
  const uploaded = await supabaseAdmin.storage.from('producers').upload(path, image, {
    contentType: 'image/webp',
    upsert: false,
  });
  if (uploaded.error) {
    return NextResponse.json({ error: uploaded.error.message }, { status: 500 });
  }

  const { data } = supabaseAdmin.storage.from('producers').getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
