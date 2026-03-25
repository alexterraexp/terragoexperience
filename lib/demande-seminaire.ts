import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

const DEFAULT_OFFRE_IMAGE =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/olivierspaysage.jpg';

/** URL de la 1re photo producteur (HTTPS uniquement) pour le bandeau e-mail ; repli terroir sinon. */
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
  /** Première image de la fiche offre (URL HTTPS), pour le bandeau « Offre & format » dans l’e-mail. */
  offre_image_url?: string | null;
  /** 3e photo du producteur (URL HTTPS), image paysage en bas du mail ; repli terroir si absente. */
  offre_footer_image_url?: string | null;
};

function displayOuiNon(v: boolean | undefined): string {
  return v ? 'Oui' : 'Non';
}

function displayOptional(str: string | null | undefined): string {
  const t = str != null ? String(str).trim() : '';
  return t !== '' ? t : '—';
}

function buildDevisEmailHtml(data: {
  prenomGreeting: string;
  selectionLabel: string;
  offreImageUrl: string;
  prenomRecap: string;
  nomFamille: string;
  email: string;
  entreprise: string;
  participants: string;
  periode: string;
  villeDepart: string;
  distanceMax: string;
  hebergement: string;
  hebergementType: string;
  transport: string;
  transportType: string;
  activites: string;
  message: string;
  reference: string;
  footerImageUrl: string;
}) {
  const templatePath = path.join(process.cwd(), 'email-template-demande-devis-seminaire.html');
  let html = fs.readFileSync(templatePath, 'utf8');

  return html
    .replace(/{{PRENOM}}/g, escapeHtml(data.prenomGreeting))
    .replace(/{{SELECTION_LABEL}}/g, escapeHtml(data.selectionLabel))
    .replace(/{{OFFRE_IMAGE_URL}}/g, data.offreImageUrl)
    .replace(/{{FOOTER_IMAGE_URL}}/g, data.footerImageUrl)
    .replace(/{{PRENOM_RECAP}}/g, escapeHtml(data.prenomRecap))
    .replace(/{{NOM_FAMILLE}}/g, escapeHtml(data.nomFamille))
    .replace(/{{EMAIL}}/g, escapeHtml(data.email))
    .replace(/{{ENTREPRISE}}/g, escapeHtml(data.entreprise))
    .replace(/{{PARTICIPANTS}}/g, escapeHtml(data.participants))
    .replace(/{{PERIODE}}/g, escapeHtml(data.periode))
    .replace(/{{VILLE_DEPART}}/g, escapeHtml(data.villeDepart))
    .replace(/{{DISTANCE_MAX}}/g, escapeHtml(data.distanceMax))
    .replace(/{{HEBERGEMENT}}/g, escapeHtml(data.hebergement))
    .replace(/{{HEBERGEMENT_TYPE}}/g, escapeHtml(data.hebergementType))
    .replace(/{{TRANSPORT}}/g, escapeHtml(data.transport))
    .replace(/{{TRANSPORT_TYPE}}/g, escapeHtml(data.transportType))
    .replace(/{{ACTIVITES}}/g, escapeHtml(data.activites))
    .replace(/{{MESSAGE}}/g, escapeHtml(data.message))
    .replace(/{{REFERENCE}}/g, escapeHtml(data.reference))
    .replace(/{{LIEN_SITE}}/g, 'https://terragoexperiences.fr')
    .replace(/{{LIEN_OFFRES}}/g, 'https://terragoexperiences.fr/seminaires-entreprise/offres');
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
  const offreImageUrl = safeOffreImageUrl(body.offre_image_url);
  const footerImageUrl = safeOffreImageUrl(body.offre_footer_image_url);
  const entrepriseStr = String(body.entreprise ?? '').trim() || '—';
  const participantsStr =
    body.participants != null && String(body.participants).trim() !== ''
      ? String(body.participants)
      : '—';
  const periodeStr = displayOptional(body.periode);
  const villeDepartStr = displayOptional(body.ville_depart);
  const distanceMaxStr =
    body.distance_max_h != null && Number.isFinite(Number(body.distance_max_h))
      ? `${Number(body.distance_max_h)} h`
      : '—';
  const hebergementLine = displayOuiNon(body.hebergement === true);
  const hebergementTypeStr =
    body.hebergement === true ? displayOptional(body.hebergement_type) : '—';
  const transportLine = displayOuiNon(body.transport === true);
  const transportTypeStr =
    body.transport === true ? displayOptional(body.transport_type) : '—';
  const activitesStr = displayOptional(body.activites);
  const messageStr = displayOptional(body.message);

  const html = buildDevisEmailHtml({
    prenomGreeting,
    selectionLabel,
    offreImageUrl,
    prenomRecap: prenomStr || '—',
    nomFamille: nomStr || '—',
    email: emailStr,
    entreprise: entrepriseStr,
    participants: participantsStr,
    periode: periodeStr,
    villeDepart: villeDepartStr,
    distanceMax: distanceMaxStr,
    hebergement: hebergementLine,
    hebergementType: hebergementTypeStr,
    transport: transportLine,
    transportType: transportTypeStr,
    activites: activitesStr,
    message: messageStr,
    reference,
    footerImageUrl,
  });

  const textClient = [
    `Bonjour ${prenomGreeting},`,
    '',
    `Nous avons bien reçu votre demande de devis pour une offre séminaire (réf. ${reference}).`,
    '',
    '01 — Offre',
    `Offre & format : ${selectionLabel}`,
    '',
    '02 — Coordonnées',
    `Prénom : ${prenomStr || '—'}`,
    `Nom : ${nomStr || '—'}`,
    `Email : ${emailStr}`,
    `Entreprise : ${entrepriseStr}`,
    `Participants : ${participantsStr}`,
    '',
    '03 — Dates & destination',
    `Période : ${periodeStr}`,
    `Ville de départ : ${villeDepartStr}`,
    `Temps de trajet max. : ${distanceMaxStr}`,
    '',
    '04 — Logistique, activités & message',
    `Hébergement : ${hebergementLine}`,
    `Type d'hébergement : ${hebergementTypeStr}`,
    `Transport : ${transportLine}`,
    `Type de transport : ${transportTypeStr}`,
    `Activités : ${activitesStr}`,
    `Message : ${messageStr}`,
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

  if (process.env.NOTIFY_EMAIL) {
    try {
      await resend.emails.send({
        from:
          process.env.EMAIL_FROM ||
          'TerraGo Expériences <contact@mail.terragoexperiences.fr>',
        to: process.env.NOTIFY_EMAIL,
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
          `Entreprise : ${entrepriseStr}`,
          `Participants : ${participantsStr}`,
          `Période : ${periodeStr}`,
          `Ville de départ : ${villeDepartStr}`,
          `Temps de trajet max. : ${distanceMaxStr}`,
          `Hébergement : ${hebergementLine}`,
          `Type d'hébergement : ${hebergementTypeStr}`,
          `Transport : ${transportLine}`,
          `Type de transport : ${transportTypeStr}`,
          `Activités : ${activitesStr}`,
          `Message : ${messageStr}`,
          `Référence (e-mail) : ${reference}`,
        ].join('\n'),
      });
    } catch (err) {
      console.error('Erreur Resend (notification interne — demande de devis séminaire) :', err);
    }
  }

  return { clientEmailFailed };
}
