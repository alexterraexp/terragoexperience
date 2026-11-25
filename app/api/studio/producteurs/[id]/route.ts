import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { EXEMPLES_SEMINAIRE_ENTREPRISE_PATH } from '@/lib/exemplesSeminaireEntreprise';
import { studioGuard } from '@/lib/studioAuth';
import { deleteStudioProducteur, saveStudioProducteur } from '@/lib/studioProducteurs';
import { StudioInputError } from '@/lib/studioOffres';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ id: string }> };

function refresh(slugs: string[] = []) {
  revalidatePath('/partenaires');
  revalidatePath(EXEMPLES_SEMINAIRE_ENTREPRISE_PATH);
  for (const slug of slugs) {
    if (slug) revalidatePath(`${EXEMPLES_SEMINAIRE_ENTREPRISE_PATH}/${slug}`);
  }
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
    const result = await saveStudioProducteur(supabaseAdmin, body, id);
    refresh(result.slugs);
    return NextResponse.json({ producteur: result.producteur, warning: result.warning });
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
    const result = await deleteStudioProducteur(supabaseAdmin, id);
    refresh(result.slugs);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Suppression impossible.';
    const status = error instanceof StudioInputError ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
