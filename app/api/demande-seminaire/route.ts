import { NextRequest, NextResponse } from 'next/server';
import { sendDemandeSeminaireEmails } from '@/lib/demande-seminaire';
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
      activites,
      message,
      telephone,
      precision,
    } = body;

    // Validation minimale
    if (!prenom || !nom || !email || !entreprise || !telephone) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants.' },
        { status: 400 }
      );
    }

    const precisionStr =
      precision != null && String(precision).trim() !== ''
        ? String(precision).trim()
        : message != null && String(message).trim() !== ''
          ? String(message).trim()
          : null;
    const telephoneStr = String(telephone).trim();

    const db = supabaseAdmin ?? supabaseServer;
    const row = {
      seminaire_id,
      format_id,
      selection_label,
      prenom,
      nom,
      email,
      telephone: telephoneStr,
      entreprise,
      participants,
      periode,
      ville_depart,
      distance_max_h,
      hebergement: hebergement ?? false,
      hebergement_type,
      transport: transport ?? false,
      transport_type,
      activites:
        activites != null && String(activites).trim() !== '' ? String(activites).trim() : null,
      message: precisionStr,
      created_at: new Date().toISOString(),
    };

    let { error } = await db.from('demandes_seminaires').insert([row]);

    // Repli si la colonne telephone n'a pas encore été ajoutée.
    if (error?.message?.includes('telephone')) {
      const { telephone: _telephone, ...withoutPhone } = row;
      const retry = await db.from('demandes_seminaires').insert([
        {
          ...withoutPhone,
          message: [precisionStr, `Téléphone : ${telephoneStr}`].filter(Boolean).join('\n') || null,
        },
      ]);
      error = retry.error;
    }

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    let clientEmailFailed = false;
    try {
      const emailResult = await sendDemandeSeminaireEmails(body);
      clientEmailFailed = emailResult.clientEmailFailed;
    } catch (err) {
      console.error('Erreur lors de l’envoi des e-mails (demande de devis) :', err);
      clientEmailFailed = true;
    }

    if (clientEmailFailed) {
      return NextResponse.json(
        {
          success: true,
          message:
            "Demande enregistrée. L'envoi de l'e-mail de confirmation a échoué ; nous vous recontacterons via les coordonnées fournies.",
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ success: true, message: 'E-mail envoyé.' }, { status: 200 });
  } catch (err: any) {
    console.error('API error:', err);
    return NextResponse.json(
      { error: 'Erreur serveur.' },
      { status: 500 }
    );
  }
}
