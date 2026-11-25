import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { EXEMPLES_SEMINAIRE_ENTREPRISE_PATH } from '@/lib/exemplesSeminaireEntreprise';
import { studioGuard } from '@/lib/studioAuth';
import { listStudioProducteurs, saveStudioProducteur } from '@/lib/studioProducteurs';
import { StudioInputError } from '@/lib/studioOffres';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

function refresh(slugs: string[] = []) {
  revalidatePath('/partenaires');
  revalidatePath(EXEMPLES_SEMINAIRE_ENTREPRISE_PATH);
  for (const slug of slugs) {
    if (slug) revalidatePath(`${EXEMPLES_SEMINAIRE_ENTREPRISE_PATH}/${slug}`);
  }
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
    const data = await listStudioProducteurs(supabaseAdmin);
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
    const result = await saveStudioProducteur(supabaseAdmin, { ...body, id: '' }, '');
    refresh(result.slugs);
    return NextResponse.json({ producteur: result.producteur, warning: result.warning });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Enregistrement impossible.';
    const status = error instanceof StudioInputError ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
