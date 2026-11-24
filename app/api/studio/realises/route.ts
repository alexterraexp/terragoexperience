import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { realisePath, REALISES_PATH, RealiseInputError } from '@/lib/seminairesRealises';
import { studioGuard } from '@/lib/studioAuth';
import { listStudioRealises, saveStudioRealise } from '@/lib/studioRealises';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

function refresh(slug = '') {
  revalidatePath(REALISES_PATH);
  if (slug) revalidatePath(realisePath(slug));
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
    const data = await listStudioRealises(supabaseAdmin);
    return NextResponse.json(data);
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
    const realise = await saveStudioRealise(supabaseAdmin, body, '');
    refresh(realise.id);
    return NextResponse.json({ realise });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Enregistrement impossible.';
    const status = error instanceof RealiseInputError ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
