import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { EXEMPLES_SEMINAIRE_ENTREPRISE_PATH } from '@/lib/exemplesSeminaireEntreprise';
import { studioGuard } from '@/lib/studioAuth';
import { listStudioOffres, saveStudioOffre, StudioInputError, studioSchemaReady } from '@/lib/studioOffres';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

function refreshCatalogue(slug?: string) {
  revalidatePath(EXEMPLES_SEMINAIRE_ENTREPRISE_PATH);
  if (slug) revalidatePath(`${EXEMPLES_SEMINAIRE_ENTREPRISE_PATH}/${slug}`);
}

export async function GET() {
  const denied = await studioGuard();
  if (denied) return denied;
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'SUPABASE_SERVICE_ROLE_KEY manquante sur le serveur.' },
      { status: 503 },
    );
  }

  try {
    const [offres, schemaReady] = await Promise.all([
      listStudioOffres(supabaseAdmin),
      studioSchemaReady(supabaseAdmin),
    ]);
    return NextResponse.json({ offres, schemaReady });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Lecture impossible.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const denied = await studioGuard();
  if (denied) return denied;
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'SUPABASE_SERVICE_ROLE_KEY manquante sur le serveur.' },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const result = await saveStudioOffre(supabaseAdmin, { ...body, id: '' });
    refreshCatalogue(result.offre.slug);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Enregistrement impossible.';
    const status = error instanceof StudioInputError ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
