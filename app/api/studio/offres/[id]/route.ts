import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { EXEMPLES_SEMINAIRE_ENTREPRISE_PATH } from '@/lib/exemplesSeminaireEntreprise';
import { studioGuard } from '@/lib/studioAuth';
import { deleteStudioOffre, saveStudioOffre, StudioInputError } from '@/lib/studioOffres';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ id: string }> };

function refreshCatalogue(slug?: string) {
  revalidatePath(EXEMPLES_SEMINAIRE_ENTREPRISE_PATH);
  if (slug) revalidatePath(`${EXEMPLES_SEMINAIRE_ENTREPRISE_PATH}/${slug}`);
}

export async function PUT(request: Request, context: RouteContext) {
  const denied = await studioGuard();
  if (denied) return denied;
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'SUPABASE_SERVICE_ROLE_KEY manquante sur le serveur.' },
      { status: 503 },
    );
  }

  try {
    const { id } = await context.params;
    const body = await request.json();
    const previousSlug = typeof body?.slug === 'string' ? body.slug : '';
    const result = await saveStudioOffre(supabaseAdmin, { ...body, id });
    refreshCatalogue(previousSlug);
    if (result.offre.slug !== previousSlug) refreshCatalogue(result.offre.slug);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Enregistrement impossible.';
    const status = error instanceof StudioInputError ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const denied = await studioGuard();
  if (denied) return denied;
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'SUPABASE_SERVICE_ROLE_KEY manquante sur le serveur.' },
      { status: 503 },
    );
  }

  try {
    const { id } = await context.params;
    const { data } = await supabaseAdmin.from('seminaires').select('slug').eq('id', id).maybeSingle();
    await deleteStudioOffre(supabaseAdmin, id);
    refreshCatalogue(typeof data?.slug === 'string' ? data.slug : undefined);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Suppression impossible.';
    const status = error instanceof StudioInputError ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
