import { Resend } from 'resend';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
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

function displayOptional(v: string | null | undefined): string {
  const t = v != null ? String(v).trim() : '';
  return t !== '' ? t : '—';
}

function buildSejourEntreAmisEmailHtml(data: {
  prenomGreeting: string;
  prenomRecap: string;
  nomFamille: string;
  email: string;
  telephone: string;
  periode: string;
  typeSejour: string;
  participants: string;
  villeDepart: string;
  trajetMax: string;
  precisions: string;
  reference: string;
}) {
  const templatePath = path.join(process.cwd(), 'email-template-demande-sejour-entre-amis.html');
  let html = fs.readFileSync(templatePath, 'utf8');

  return html
    .replace(/{{PRENOM}}/g, escapeHtml(data.prenomGreeting))
    .replace(/{{PRENOM_RECAP}}/g, escapeHtml(data.prenomRecap))
    .replace(/{{NOM_FAMILLE}}/g, escapeHtml(data.nomFamille))
    .replace(/{{EMAIL}}/g, escapeHtml(data.email))
    .replace(/{{TELEPHONE}}/g, escapeHtml(data.telephone))
    .replace(/{{PERIODE}}/g, escapeHtml(data.periode))
    .replace(/{{TYPE_SEJOUR}}/g, escapeHtml(data.typeSejour))
    .replace(/{{PARTICIPANTS}}/g, escapeHtml(data.participants))
    .replace(/{{VILLE_DEPART}}/g, escapeHtml(data.villeDepart))
    .replace(/{{TRAJET_MAX}}/g, escapeHtml(data.trajetMax))
    .replace(/{{PRECISIONS}}/g, escapeHtml(data.precisions))
    .replace(/{{REFERENCE}}/g, escapeHtml(data.reference))
    .replace(/{{LIEN_SITE}}/g, 'https://terragoexperiences.fr')
    .replace(/{{LIEN_OFFRES}}/g, 'https://terragoexperiences.fr/entre-amis');
}

function validEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function toStr(v: unknown): string {
  return v == null ? '' : String(v).trim();
}

function toStrOrNull(v: unknown): string | null {
  const s = toStr(v);
  return s !== '' ? s : null;
}

type SejoursEntreAmisPayload = {
  nom?: string | null;
  prenom?: string | null;
  email?: string | null;
  portable?: string | null;
  periode?: string | null;
  type_sejour?: string | null;
  ville_depart?: string | null;
  trajet_max?: string | null;
  participants?: string | number | null;
  precisions?: string | null;
};

export type ProcessSejoursEntreAmisResult = {
  status: number;
  body: {
    success: boolean;
    message: string;
    reference?: string;
  };
};

export async function processSejoursEntreAmis(body: unknown): Promise<ProcessSejoursEntreAmisResult> {
  if (!isSupabaseConfigured) {
    return {
      status: 503,
      body: { success: false, message: 'Service indisponible : configuration Supabase manquante sur le serveur.' },
    };
  }

  const b = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>;
  const payload: SejoursEntreAmisPayload = b as any;

  const nomStr = toStr(payload.nom);
  const prenomStr = toStr(payload.prenom);
  const emailStr = toStr(payload.email);

  const typeSejourStr = toStrOrNull(payload.type_sejour);
  const villeDepartStr = toStrOrNull(payload.ville_depart);
  const trajetMaxStr = toStrOrNull(payload.trajet_max);
  const participantsStr = toStrOrNull(payload.participants);

  if (!nomStr || !prenomStr || !emailStr || !validEmail(emailStr) || !typeSejourStr || !participantsStr) {
    return { status: 400, body: { success: false, message: 'Champs obligatoires manquants.' } };
  }

  const portableStr = toStrOrNull(payload.portable);
  const periodeStr = toStrOrNull(payload.periode);
  const precisionsStr = toStrOrNull(payload.precisions);

  const reference = generateReference();

  // 1) Insertion Supabase
  const db = supabaseAdmin ?? supabaseServer;
  const { error } = await db.from('demandes_sejours_amis').insert({
    nom: nomStr,
    prenom: prenomStr,
    email: emailStr,
    portable: portableStr,
    periode: periodeStr,
    type_sejour: typeSejourStr,
    ville_depart: villeDepartStr,
    trajet_max: trajetMaxStr,
    participants: participantsStr,
    precisions: precisionsStr,
    reference,
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error('Erreur Supabase (demandes_sejours_amis) :', error);
    return { status: 500, body: { success: false, message: "Erreur lors de l'enregistrement de la demande." } };
  }

  // 2) Emails Resend (try/catch séparés)
  const prenomGreeting = prenomStr.split(/\s+/)[0] || '—';

  const participantsDisplay = displayOptional(participantsStr);
  const typeSejourDisplay = displayOptional(typeSejourStr);
  const periodeDisplay = displayOptional(periodeStr);
  const villeDepartDisplay = displayOptional(villeDepartStr);
  const trajetMaxDisplay = displayOptional(trajetMaxStr);
  const portableDisplay = displayOptional(portableStr);
  const precisionsDisplay = displayOptional(precisionsStr);

  const subjectClient = 'RE: Nous avons bien reçu votre demande de séjour.';

  const textClient = [
    `Bonjour ${prenomGreeting},`,
    '',
    `Nous avons bien reçu votre demande de séjour, on s'en occupe très vite !(réf. ${reference}).`,
    '',
    'Récapitulatif :',
    `Nom : ${nomStr}`,
    `Prénom : ${prenomGreeting}`,
    `Email : ${emailStr}`,
    `Téléphone : ${portableDisplay}`,
    `Période : ${periodeDisplay}`,
    `Type de séjour : ${typeSejourDisplay}`,
    `Nombre de personnes : ${participantsDisplay}`,
    `Ville de départ : ${villeDepartDisplay}`,
    `Temps max de trajet : ${trajetMaxDisplay}`,
    `Précisions : ${precisionsDisplay}`,
    '',
    'TerraGo Expériences',
  ].join('\n');

  const htmlClient = buildSejourEntreAmisEmailHtml({
    prenomGreeting,
    prenomRecap: prenomStr || '—',
    nomFamille: nomStr || '—',
    email: emailStr,
    telephone: portableDisplay,
    periode: periodeDisplay,
    typeSejour: typeSejourDisplay,
    participants: participantsDisplay,
    villeDepart: villeDepartDisplay,
    trajetMax: trajetMaxDisplay,
    precisions: precisionsDisplay,
    reference,
  });

  let clientEmailFailed = false;
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'TerraGo Expériences <contact@mail.terragoexperiences.fr>',
      to: emailStr,
      subject: subjectClient,
      html: htmlClient,
      text: textClient,
    });
  } catch (err) {
    console.error('Erreur Resend (e-mail client — séjours entre amis) :', err);
    clientEmailFailed = true;
  }

  if (clientEmailFailed) {
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
    const notifyTo = process.env.NOTIFY_EMAIL;
    const subjectInternal = `[Nouvelle demande] Séjour : ${typeSejourDisplay} — ${
      participantsDisplay !== '—' ? `${participantsDisplay} pers.` : 'pers.'
    } — ${periodeDisplay}`;

    try {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'TerraGo Expériences <contact@mail.terragoexperiences.fr>',
        to: notifyTo,
        subject: subjectInternal,
        text: [
          'Nouvelle demande (séjours entre amis)',
          '',
          `Nom : ${nomStr}`,
          `Prénom : ${prenomStr}`,
          `Email : ${emailStr}`,
          `Téléphone : ${portableDisplay}`,
          `Période : ${periodeDisplay}`,
          `Type de séjour : ${typeSejourDisplay}`,
          `Ville de départ : ${villeDepartDisplay}`,
          `Temps max de trajet : ${trajetMaxDisplay}`,
          `Nombre de personnes : ${participantsDisplay}`,
          `Précisions : ${precisionsDisplay}`,
          `Référence : ${reference}`,
        ].join('\n'),
      });
    } catch (err) {
      console.error('Erreur Resend (notification interne — séjours entre amis) :', err);
    }
  }

  return {
    status: 200,
    body: { success: true, message: "E-mail envoyé.", reference },
  };
}

