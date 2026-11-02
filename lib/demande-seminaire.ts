import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { getNotifyEmails } from './team-notify';

const resend = new Resend(process.env.RESEND_API_KEY);

const DEFAULT_OFFRE_IMAGE =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/bretagne/184592R0.jpg';

/** URL HTTPS de la 1re photo de l'offre, pour le visuel du mail. */
function safeOffreImageUrl(raw: string | null | undefined): string {
  const u = String(raw ?? '').trim();
  if (/^https:\/\//i.test(u)) {
    return u.replace(/'/g, '%27');
  }
  return DEFAULT_OFFRE_IMAGE;
}

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

export type DemandeSeminairePayload = {
  seminaire_id?: string | null;
  format_id?: string | null;
  selection_label?: string | null;
  prenom?: string;
  nom?: string;
  email?: string;
  entreprise?: string;
  participants?: string | number | null;
  periode?: string | null;
  ville_depart?: string | null;
  distance_max_h?: number | null;
  hebergement?: boolean;
  hebergement_type?: string | null;
  transport?: boolean;
  transport_type?: string | null;
  activites?: string | null;
  message?: string | null;
  /** Téléphone du volet contact. */
  telephone?: string | null;
  /** Champ libre « une précision à apporter ? », saisi avant le volet contact. */
  precision?: string | null;
  /** Première image de la fiche offre (URL HTTPS), visuel du mail. */
  offre_image_url?: string | null;
};

function displayOptional(str: string | null | undefined): string {
  const t = str != null ? String(str).trim() : '';
  return t !== '' ? t : '—';
}

function buildDevisEmailHtml(data: {
  prenomGreeting: string;
  selectionLabel: string;
  prenomRecap: string;
  nomFamille: string;
  email: string;
  telephone: string;
  entreprise: string;
  participants: string;
  periode: string;
  precision: string;
  offreImageUrl: string;
  reference: string;
}) {
  const templatePath = path.join(process.cwd(), 'email-template-demande-devis-seminaire.html');
  let html = fs.readFileSync(templatePath, 'utf8');

  return html
    .replace(/{{PRENOM}}/g, escapeHtml(data.prenomGreeting))
    .replace(/{{SELECTION_LABEL}}/g, escapeHtml(data.selectionLabel))
    .replace(/{{PRENOM_RECAP}}/g, escapeHtml(data.prenomRecap))
    .replace(/{{NOM_FAMILLE}}/g, escapeHtml(data.nomFamille))
    .replace(/{{EMAIL}}/g, escapeHtml(data.email))
    .replace(/{{TELEPHONE}}/g, escapeHtml(data.telephone))
    .replace(/{{ENTREPRISE}}/g, escapeHtml(data.entreprise))
    .replace(/{{PARTICIPANTS}}/g, escapeHtml(data.participants))
    .replace(/{{PERIODE}}/g, escapeHtml(data.periode))
    .replace(/{{PRECISION}}/g, escapeHtml(data.precision).replace(/\n/g, '<br />'))
    .replace(/{{OFFRE_IMAGE_URL}}/g, data.offreImageUrl)
    .replace(/{{REFERENCE}}/g, escapeHtml(data.reference))
    .replace(/{{LIEN_SITE}}/g, 'https://www.terragoexperiences.fr')
    .replace(/{{LIEN_OFFRES}}/g, 'https://www.terragoexperiences.fr/exemples-seminaire-entreprise')
    .replace(/{{LIEN_APPROCHE}}/g, 'https://www.terragoexperiences.fr/notre-approche')
    .replace(/{{LIEN_CONTACT}}/g, 'https://www.terragoexperiences.fr/contact')
    .replace(/{{LIEN_DESABONNEMENT}}/g, 'https://www.terragoexperiences.fr/desabonnement')
    .replace(/{{LIEN_MENTIONS_LEGALES}}/g, 'https://www.terragoexperiences.fr/mentions-legales');
}

/**
 * Envoie l’e-mail de confirmation au client et la notification interne (Resend).
 * Ne lève pas d’erreur : les échecs sont journalisés ; l’appelant garde le succès métier (données déjà en base).
 */
export async function sendDemandeSeminaireEmails(body: DemandeSeminairePayload): Promise<{
  clientEmailFailed: boolean;
}> {
  const prenomStr = String(body.prenom ?? '').trim();
  const nomStr = String(body.nom ?? '').trim();
  const emailStr = String(body.email ?? '').trim();
  const prenomGreeting = prenomStr.split(/\s+/)[0] || '—';
  const reference = generateReference();

  const selectionLabel = displayOptional(body.selection_label);
  const seminaireId = body.seminaire_id != null && String(body.seminaire_id).trim() !== '' ? String(body.seminaire_id) : '—';
  const formatId = body.format_id != null && String(body.format_id).trim() !== '' ? String(body.format_id) : '—';
  const entrepriseStr = String(body.entreprise ?? '').trim() || '—';
  const telephoneStr = displayOptional(body.telephone);
  const participantsStr =
    body.participants != null && String(body.participants).trim() !== ''
      ? String(body.participants)
      : '—';
  const periodeStr = displayOptional(body.periode);
  const precisionSource =
    body.precision != null && String(body.precision).trim() !== ''
      ? body.precision
      : body.message;
  const precisionStr = displayOptional(precisionSource);
  const offreImageUrl = safeOffreImageUrl(body.offre_image_url);

  const html = buildDevisEmailHtml({
    prenomGreeting,
    selectionLabel,
    prenomRecap: prenomStr || '—',
    nomFamille: nomStr || '—',
    email: emailStr,
    telephone: telephoneStr,
    entreprise: entrepriseStr,
    participants: participantsStr,
    periode: periodeStr,
    precision: precisionStr,
    offreImageUrl,
    reference,
  });

  const textClient = [
    `Bonjour ${prenomGreeting},`,
    '',
    `Nous avons bien reçu votre demande de devis (réf. ${reference}).`,
    'Voici le récapitulatif de ce que vous nous avez transmis : si quelque chose vous semble inexact, envoyez-nous un mail à contact@terragoexperiences.fr.',
    '',
    `Offre & format : ${selectionLabel}`,
    `Dates : ${periodeStr}`,
    `Participants : ${participantsStr}`,
    `Précision : ${precisionStr}`,
    `Prénom : ${prenomStr || '—'}`,
    `Nom : ${nomStr || '—'}`,
    `Email : ${emailStr}`,
    `Téléphone : ${telephoneStr}`,
    `Entreprise : ${entrepriseStr}`,
    '',
    'TerraGo Expériences',
  ].join('\n');

  let clientEmailFailed = false;

  try {
    await resend.emails.send({
      from:
        process.env.EMAIL_FROM ||
        'TerraGo Expériences <contact@mail.terragoexperiences.fr>',
      to: emailStr,
      subject: 'Votre demande de devis a bien été reçue',
      html,
      text: textClient,
    });
  } catch (err) {
    console.error('Erreur Resend (e-mail client — demande de devis séminaire) :', err);
    clientEmailFailed = true;
  }

  const notifyTo = getNotifyEmails();
  if (notifyTo.length > 0) {
    try {
      await resend.emails.send({
        from:
          process.env.EMAIL_FROM ||
          'TerraGo Expériences <contact@mail.terragoexperiences.fr>',
        to: notifyTo,
        subject: `[Nouvelle demande de devis] ${entrepriseStr} — ${selectionLabel !== '—' ? selectionLabel : `${participantsStr} pers.`}`,
        text: [
          `Nouvelle demande de devis (offre séminaire)`,
          ``,
          `Offre & format : ${selectionLabel}`,
          `seminaire_id : ${seminaireId}`,
          `format_id : ${formatId}`,
          ``,
          `Prénom : ${prenomStr || '—'}`,
          `Nom : ${nomStr || '—'}`,
          `Email : ${emailStr}`,
          `Téléphone : ${telephoneStr}`,
          `Entreprise : ${entrepriseStr}`,
          `Participants : ${participantsStr}`,
          `Période : ${periodeStr}`,
          `Précision : ${precisionStr}`,
          `Référence (e-mail) : ${reference}`,
        ].join('\n'),
      });
    } catch (err) {
      console.error('Erreur Resend (notification interne — demande de devis séminaire) :', err);
    }
  }

  return { clientEmailFailed };
}
