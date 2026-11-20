import { NextResponse } from 'next/server';
import { findSeminaireByPublicSlug } from '@/lib/exemplesSeminaireEntreprise';
import { fetchSeminaires } from '@/lib/seminaires';
import { studioGuard } from '@/lib/studioAuth';
import { supabaseServer } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const denied = await studioGuard();
  if (denied) return denied;

  const slug = new URL(request.url).searchParams.get('slug')?.trim() ?? '';
  if (!slug) return NextResponse.json({ error: 'Fiche introuvable.' }, { status: 400 });

  const all = await fetchSeminaires(supabaseServer, { includeUnpublished: true });
  const seminaire = findSeminaireByPublicSlug(all, slug);
  if (!seminaire) return NextResponse.json({ error: 'Fiche introuvable.' }, { status: 404 });

  return NextResponse.json({
    seminaire,
    all: all.filter((item) => item.publie || item.id === seminaire.id),
  });
}
