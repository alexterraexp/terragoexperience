import { NextRequest, NextResponse } from 'next/server';
import { isSupabaseConfigured, supabaseAdmin, supabaseServer } from '../../../lib/supabase';

export async function POST(req: NextRequest) {
  try {
    if (!isSupabaseConfigured) {
      return NextResponse.json(
        { error: 'Service indisponible : configuration Supabase manquante sur le serveur.' },
        { status: 503 }
      );
    }

    const body = await req.json();

    const {
      seminaire_id,
      format_id,
      selection_label,
      prenom,
      nom,
      email,
      entreprise,
      participants,
      periode,
      ville_depart,
      distance_max_h,
      hebergement,
      hebergement_type,
      transport,
      transport_type,
      message,
    } = body;

    // Validation minimale
    if (!prenom || !nom || !email || !entreprise) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants.' },
        { status: 400 }
      );
    }

    const db = supabaseAdmin ?? supabaseServer;
    const { error } = await db
      .from('demandes_seminaires')
      .insert([
        {
          seminaire_id,
          format_id,
          selection_label,
          prenom,
          nom,
          email,
          entreprise,
          participants,
          periode,
          ville_depart,
          distance_max_h,
          hebergement: hebergement ?? false,
          hebergement_type,
          transport: transport ?? false,
          transport_type,
          message,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error('API error:', err);
    return NextResponse.json(
      { error: 'Erreur serveur.' },
      { status: 500 }
    );
  }
}
