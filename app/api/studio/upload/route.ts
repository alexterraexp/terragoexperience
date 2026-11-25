import { NextResponse } from 'next/server';
import { studioGuard } from '@/lib/studioAuth';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const MAX_BYTES = 20 * 1024 * 1024;
const TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/heic', 'image/heif']);
/** Ces formats s’affichent déjà dans le navigateur si la conversion WebP échoue. */
const DIRECT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
};
/** Séminaires et producteurs ont leur bucket. Le reste reste dans `producers`. */
const BUCKETS: Record<string, string> = {
  seminaires: 'seminaires',
  producteurs: 'producteurs',
  realisations: 'producers',
  articles: 'producers',
};

export async function POST(request: Request) {
  try {
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
    const bucket = BUCKETS[folder];
    if (!bucket) {
      return NextResponse.json({ error: 'Dossier d’image inconnu.' }, { status: 400 });
    }
    const file = form?.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Choisis une image.' }, { status: 400 });
    }
    const type = imageType(file);
    if (!type) {
      return NextResponse.json({ error: 'Format accepté : jpg, png, webp, gif, avif ou heic.' }, { status: 400 });
    }
    if (file.size <= 0 || file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'Image trop lourde (20 Mo maximum).' }, { status: 400 });
    }

    const raw = Buffer.from(await file.arrayBuffer());
    const image = await toStoredImage(raw, type);
    if (!image) {
      return NextResponse.json({ error: 'Cette image n’a pas pu être lue. Enregistre-la en JPEG puis réessaie.' }, { status: 400 });
    }

    const path = bucket === 'producers'
      ? `${folder}/${crypto.randomUUID()}.${image.ext}`
      : `${crypto.randomUUID()}.${image.ext}`;
    const uploaded = await supabaseAdmin.storage.from(bucket).upload(path, image.body, {
      contentType: image.contentType,
      upsert: false,
    });
    if (uploaded.error) {
      return NextResponse.json({ error: uploaded.error.message }, { status: 500 });
    }

    const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);
    return NextResponse.json({ url: data.publicUrl });
  } catch (error) {
    console.error('studio upload', error);
    const message = error instanceof Error && error.message ? error.message : 'Une erreur est survenue.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function imageType(file: File): string {
  if (TYPES.has(file.type)) return file.type;
  const name = file.name.toLowerCase();
  if (name.endsWith('.jpg') || name.endsWith('.jpeg')) return 'image/jpeg';
  if (name.endsWith('.png')) return 'image/png';
  if (name.endsWith('.webp')) return 'image/webp';
  if (name.endsWith('.gif')) return 'image/gif';
  if (name.endsWith('.avif')) return 'image/avif';
  if (name.endsWith('.heic')) return 'image/heic';
  if (name.endsWith('.heif')) return 'image/heif';
  return '';
}

async function toStoredImage(
  raw: Buffer,
  type: string,
): Promise<{ body: Buffer; contentType: string; ext: string } | null> {
  try {
    const { optimizeStudioImage } = await import('@/lib/optimizeStudioImage');
    const body = await optimizeStudioImage(raw);
    if (body.length > 0) return { body, contentType: 'image/webp', ext: 'webp' };
  } catch (error) {
    console.error('optimizeStudioImage', error);
  }
  const ext = DIRECT[type];
  if (!ext || raw.length === 0) return null;
  return { body: raw, contentType: type, ext };
}
