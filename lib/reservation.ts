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
  telephone: string;
  typeEvenement: string;
  participants: string;
  periode: string;
  lieu: string;
  budget: string;
  budgetParPersonne: string;
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
    .replace(/{{TELEPHONE}}/g, escapeHtml(data.telephone || '—'))
    .replace(/{{TYPE_EVENEMENT}}/g, escapeHtml(data.typeEvenement || '—'))
    .replace(/{{PARTICIPANTS}}/g, escapeHtml(String(data.participants)))
    .replace(/{{PERIODE}}/g, escapeHtml(data.periode))
    .replace(/{{LIEU}}/g, escapeHtml(data.lieu || '—'))
    .replace(/{{BUDGET}}/g, escapeHtml(data.budget || '—'))
    .replace(/{{BUDGET_PAR_PERSONNE}}/g, escapeHtml(data.budgetParPersonne || '—'))
    .replace(/{{REFERENCE}}/g, escapeHtml(data.reference))
    .replace(/{{LIEN_SITE}}/g, 'https://terragoexperiences.fr')
    .replace(/{{LIEN_OFFRES}}/g, 'https://terragoexperiences.fr/seminaire-exemples')
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
    telephone,
    typeEvenement,
    participants,
    periode,
    lieu,
    budget,
    budgetParPersonne,
  } = b;

  const required: Record<string, unknown> = { nom, email, participants, periode };
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
  const optional = (v: unknown) => (v != null && String(v).trim() !== '' ? String(v) : null);
  const telephoneStr = optional(telephone);
  const typeEvenementStr = optional(typeEvenement);
  const lieuStr = optional(lieu);
  const budgetStr = optional(budget);
  const budgetParPersonneStr = optional(budgetParPersonne);

  if (isSupabaseConfigured) {
    const db = supabaseAdmin ?? supabaseServer;
    // En prod, ville_depart est encore NOT NULL (schéma legacy) alors que le
    // formulaire n’exige plus le lieu — ne jamais envoyer null.
    const villeDepartStr = lieuStr ?? 'Non précisé';
    const row = {
      nom: nomStr,
      email: emailStr,
      participants: String(participants),
      periode: String(periode),
      budget: budgetStr,
      reference,
      telephone: telephoneStr,
      type_evenement: typeEvenementStr,
      lieu_souhaite: lieuStr,
      ville_depart: villeDepartStr,
      budget_par_personne: budgetParPersonneStr,
    };
    let { error: supabaseError } = await db.from('demandes_organiser_seminaire').insert(row);

    // Repli si la migration ajoutant les colonnes du nouveau formulaire n'a pas encore été jouée.
    if (supabaseError?.message?.includes('column')) {
      const {
        telephone: _t,
        type_evenement: _e,
        lieu_souhaite: _l,
        budget_par_personne: _b,
        ...legacyRow
      } = row;
      const retry = await db.from('demandes_organiser_seminaire').insert({
        ...legacyRow,
        ville_depart: villeDepartStr,
        message: [
          typeEvenementStr ? `Type d'évènement : ${typeEvenementStr}` : '',
          telephoneStr ? `Téléphone : ${telephoneStr}` : '',
          budgetParPersonneStr ? `Budget par personne : ${budgetParPersonneStr}` : '',
        ].filter(Boolean).join('\n') || null,
      });
      supabaseError = retry.error;
    }

    if (supabaseError) {
      console.error('Erreur Supabase (demandes_organiser_seminaire) :', supabaseError);
      if (!supabaseAdmin && process.env.NODE_ENV === 'development') {
        console.warn(
          '[TerraGo] Définissez SUPABASE_SERVICE_ROLE_KEY sur le serveur pour les insertions (la clé anon est souvent bloquée par RLS).',
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
    telephone: telephoneStr ?? '—',
    typeEvenement: typeEvenementStr ?? '—',
    participants: String(participants),
    periode: String(periode),
    lieu: lieuStr ?? '—',
    budget: budgetStr ?? '—',
    budgetParPersonne: budgetParPersonneStr ?? '—',
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
          `Téléphone : ${telephoneStr ?? '—'}`,
          `Type d'évènement : ${typeEvenementStr ?? '—'}`,
          `Participants : ${participants}`,
          `Période : ${periode}`,
          `Lieu souhaité : ${lieuStr ?? '—'}`,
          `Budget total : ${budgetStr ?? '—'}`,
          `Budget par personne : ${budgetParPersonneStr ?? '—'}`,
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
