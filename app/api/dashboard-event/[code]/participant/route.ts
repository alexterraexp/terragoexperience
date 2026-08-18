import { NextRequest, NextResponse } from 'next/server';
import { isSupabaseConfigured, supabaseAdmin, supabaseServer } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const noStore = { 'Cache-Control': 'no-store' };

type RouteContext = { params: Promise<{ code: string }> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(value: unknown, max: number): string {
  if (value == null) return '';
  return String(value).trim().slice(0, max);
}

export async function POST(req: NextRequest, context: RouteContext) {
  try {
    if (!isSupabaseConfigured) {
      return NextResponse.json(
        { error: 'Service indisponible : configuration Supabase manquante sur le serveur.' },
        { status: 503, headers: noStore },
      );
    }

    const { code: rawCode } = await context.params;
    const code = decodeURIComponent(rawCode ?? '').trim().replace(/[%_]/g, '');
    if (!code) {
      return NextResponse.json({ error: 'Événement introuvable.' }, { status: 404, headers: noStore });
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Corps JSON invalide.' }, { status: 400, headers: noStore });
    }

    const firstName = str(body.first_name ?? body.prenom, 80);
    const lastName = str(body.last_name ?? body.nom, 80);
    const email = str(body.email, 120).toLowerCase();
    const allergies = str(body.allergies, 2000) || null;
    const dietaryRestrictions = str(body.dietary_restrictions ?? body.contraintes_alimentaires, 2000) || null;
    const physicalConstraints = str(body.physical_constraints ?? body.contraintes_physiques, 2000) || null;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Prénom, nom et e-mail sont obligatoires.' },
        { status: 400, headers: noStore },
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Adresse e-mail invalide.' }, { status: 400, headers: noStore });
    }

    const db = supabaseAdmin ?? supabaseServer;

    const { data: event, error: eventError } = await db
      .from('events')
      .select('id')
      .ilike('code', code)
      .maybeSingle();

    if (eventError) {
      console.error('[dashboard-event] participant event lookup error:', eventError);
      return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500, headers: noStore });
    }

    if (!event) {
      return NextResponse.json({ error: 'Événement introuvable.' }, { status: 404, headers: noStore });
    }

    const now = new Date().toISOString();
    const payload = {
      event_id: event.id,
      first_name: firstName,
      last_name: lastName,
      email,
      allergies,
      dietary_restrictions: dietaryRestrictions,
      physical_constraints: physicalConstraints,
      accessed_at: now,
      form_completed_at: now,
    };

    const { data: existing, error: existingError } = await db
      .from('event_participants')
      .select('id')
      .eq('event_id', event.id)
      .ilike('email', email)
      .maybeSingle();

    if (existingError) {
      console.error('[dashboard-event] participant lookup error:', existingError);
      return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500, headers: noStore });
    }

    const write = existing
      ? await db.from('event_participants').update(payload).eq('id', existing.id).select('id').maybeSingle()
      : await db.from('event_participants').insert([{ ...payload, created_at: now }]).select('id').maybeSingle();

    if (write.error) {
      console.error('[dashboard-event] participant write error:', write.error);
      return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500, headers: noStore });
    }

    return NextResponse.json(
      { success: true, participant_id: write.data?.id ?? existing?.id },
      { status: existing ? 200 : 201, headers: noStore },
    );
  } catch (err) {
    console.error('[dashboard-event] POST participant error:', err);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500, headers: noStore });
  }
}
