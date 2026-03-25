import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { isSupabaseConfigured, supabaseAdmin, supabaseServer } from './supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function generateReference() {
  return (
    'TG-' +
    Date.now().toString(36).toUpperCase() +
    '-' +
    crypto.randomBytes(2).toString('hex').toUpperCase()
  );
}

type ReservationEmailData = {
  nom: string;
  email: string;
  entreprise: string | undefined;
  participants: string;
  periode: string;
  villeDepart: string;
  trajetMax: string;
  hebergement: string;
  transport: string;
  activites: string;
  message: string;
  budget: string;
  reference: string;
};

function buildEmailHtml(data: ReservationEmailData) {
  const templatePath = path.join(process.cwd(), 'email-template.html');
  let html = fs.readFileSync(templatePath, 'utf8');
  const prenom =
    String(data.nom || '')
      .trim()
      .split(/\s+/)[0] || '—';

  return html
    .replace(/{{PRENOM}}/g, escapeHtml(prenom))
    .replace(/{{NOM}}/g, escapeHtml(data.nom))
    .replace(/{{EMAIL}}/g, escapeHtml(data.email))
    .replace(/{{ENTREPRISE}}/g, escapeHtml(data.entreprise || '—'))
    .replace(/{{PARTICIPANTS}}/g, escapeHtml(String(data.participants)))
    .replace(/{{PERIODE}}/g, escapeHtml(data.periode))
    .replace(/{{VILLE_DEPART}}/g, escapeHtml(data.villeDepart))
    .replace(/{{TRAJET_MAX}}/g, escapeHtml(data.trajetMax))
    .replace(/{{HEBERGEMENT}}/g, escapeHtml(data.hebergement))
    .replace(/{{TRANSPORT}}/g, escapeHtml(data.transport))
    .replace(/{{ACTIVITES}}/g, escapeHtml(data.activites))
    .replace(/{{MESSAGE}}/g, escapeHtml(data.message || '—'))
    .replace(/{{BUDGET}}/g, escapeHtml(data.budget || '—'))
    .replace(/{{REFERENCE}}/g, escapeHtml(data.reference))
    .replace(/{{LIEN_SITE}}/g, 'https://terragoexperiences.fr')
    .replace(/{{LIEN_OFFRES}}/g, 'https://terragoexperiences.fr/seminaires-entreprise/offres')
    .replace(/{{LIEN_CONTACT}}/g, 'https://terragoexperiences.fr/contact')
    .replace(/{{LIEN_DESABONNEMENT}}/g, 'https://terragoexperiences.fr/desabonnement')
    .replace(/{{LIEN_CONFIDENTIALITE}}/g, 'https://terragoexperiences.fr/confidentialite');
}

export type ProcessReservationResult = {
  status: number;
  body: {
    success: boolean;
    message: string;
    reference?: string;
  };
};

export async function processReservation(
  body: unknown,
): Promise<ProcessReservationResult> {
  const b = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>;
  const {
    nom,
    email,
    entreprise,
    participants,
    periode,
    villeDepart,
    trajetMax,
    hebergement,
    transport,
    activites,
    message,
    budget,
  } = b;

  const required: Record<string, unknown> = {
    nom,
    email,
    participants,
    periode,
    villeDepart,
    trajetMax,
    hebergement,
    transport,
    activites,
  };
  const missing = Object.entries(required)
    .filter(([, v]) => v === undefined || v === null || String(v).trim() === '')
    .map(([k]) => k);
  if (missing.length) {
    return {
      status: 400,
      body: { success: false, message: `Champs manquants : ${missing.join(', ')}` },
    };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    return {
      status: 400,
      body: { success: false, message: "Adresse e-mail invalide." },
    };
  }

  const nomStr = String(nom);
  const emailStr = String(email);
  const reference = generateReference();
  const prenom = nomStr.split(' ')[0];
  const entrepriseStr =
    entreprise != null && String(entreprise).trim() !== ''
      ? String(entreprise)
      : null;

  if (isSupabaseConfigured) {
    const db = supabaseAdmin ?? supabaseServer;
    const { error: supabaseError } = await db
      .from('demandes_organiser_seminaire')
      .insert({
        nom: nomStr,
        email: emailStr,
        entreprise: entrepriseStr,
        participants: String(participants),
        periode: String(periode),
        ville_depart: String(villeDepart),
        trajet_max: String(trajetMax),
        hebergement: String(hebergement),
        transport: String(transport),
        activites: String(activites),
        message: message != null && String(message).trim() !== '' ? String(message) : null,
        budget: budget != null && String(budget).trim() !== '' ? String(budget) : null,
        reference,
      });
    if (supabaseError) {
      console.error('Erreur Supabase (demandes_organiser_seminaire) :', supabaseError);
      if (!supabaseAdmin && process.env.NODE_ENV === 'development') {
        console.warn(
          '[Terrago] Définissez SUPABASE_SERVICE_ROLE_KEY sur le serveur pour les insertions (la clé anon est souvent bloquée par RLS).',
        );
      }
      return {
        status: 500,
        body: { success: false, message: "Erreur lors de l'enregistrement de la demande." },
      };
    }
  }

  const html = buildEmailHtml({
    nom: nomStr,
    email: emailStr,
    entreprise: entrepriseStr ?? undefined,
    participants: String(participants),
    periode: String(periode),
    villeDepart: String(villeDepart),
    trajetMax: String(trajetMax),
    hebergement: String(hebergement),
    transport: String(transport),
    activites: String(activites),
    message: message != null && String(message).trim() !== '' ? String(message) : '—',
    budget: budget != null && String(budget).trim() !== '' ? String(budget) : '—',
    reference,
  });

  try {
    await resend.emails.send({
      from:
        process.env.EMAIL_FROM ||
        'TerraGo Expériences <contact@mail.terragoexperiences.fr>',
      to: emailStr,
      subject: 'Votre demande de séminaire a bien été reçue',
      html,
      text: `Bonjour ${prenom},\n\nNous avons bien reçu votre demande (réf. ${reference}).\nNous vous répondons sous peu.\n\nTerraGo Expériences`,
    });
  } catch (err) {
    console.error('Erreur Resend (e-mail client) :', err);
    return {
      status: 200,
      body: {
        success: true,
        message:
          "Demande enregistrée. L'envoi de l'e-mail de confirmation a échoué ; nous vous recontacterons via les coordonnées fournies.",
        reference,
      },
    };
  }

  if (process.env.NOTIFY_EMAIL) {
    try {
      await resend.emails.send({
        from:
          process.env.EMAIL_FROM ||
          'TerraGo Expériences <contact@mail.terragoexperiences.fr>',
        to: process.env.NOTIFY_EMAIL,
        subject: `[Nouvelle demande séminaire] ${nomStr} — ${participants} pers. — ${periode}`,
        text: [
          `Nouvelle demande de séminaire`,
          ``,
          `Nom : ${nomStr}`,
          `Email : ${emailStr}`,
          `Entreprise : ${entrepriseStr ?? '—'}`,
          `Participants : ${participants}`,
          `Période : ${periode}`,
          `Ville de départ : ${villeDepart}`,
          `Trajet max. : ${trajetMax}`,
          `Hébergement : ${hebergement}`,
          `Transport : ${transport}`,
          `Activités : ${activites}`,
          `Budget indicatif : ${budget != null && String(budget).trim() !== '' ? String(budget) : '—'}`,
          `Message : ${message != null && String(message).trim() !== '' ? String(message) : '—'}`,
          `Référence : ${reference}`,
        ].join('\n'),
      });
    } catch (err) {
      console.error('Erreur Resend (notification interne) :', err);
    }
  }

  return {
    status: 200,
    body: { success: true, message: "E-mail envoyé.", reference },
  };
}
