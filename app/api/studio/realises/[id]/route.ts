import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { realisePath, REALISES_PATH, RealiseInputError } from '@/lib/seminairesRealises';
import { studioGuard } from '@/lib/studioAuth';
import { deleteStudioRealise, saveStudioRealise } from '@/lib/studioRealises';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ id: string }> };

function refresh(slug = '') {
  revalidatePath(REALISES_PATH);
  if (slug) revalidatePath(realisePath(slug));
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
    const realise = await saveStudioRealise(supabaseAdmin, body, id);
    refresh(realise.id);
    return NextResponse.json({ realise });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Enregistrement impossible.';
    const status = error instanceof RealiseInputError ? 400 : 500;
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
    await deleteStudioRealise(supabaseAdmin, id);
    refresh(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Suppression impossible.';
    const status = error instanceof RealiseInputError ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
