import { NextRequest, NextResponse } from 'next/server';
import { notifyTeam } from '@/lib/team-notify';

function validEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function str(v: unknown): string {
  return v == null ? '' : String(v).trim();
}

function strArr(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => String(x).trim()).filter(Boolean);
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Corps JSON invalide.' }, { status: 400 });
  }

  const action = str(body.action);
  if (!action) {
    return NextResponse.json({ success: false, message: 'Action manquante.' }, { status: 400 });
  }

  let subject: string;
  let text: string;
  let replyTo: string | undefined;

  switch (action) {
    case 'plaquette': {
      const email = str(body.email);
      if (!email || !validEmail(email)) {
        return NextResponse.json({ success: false, message: 'Adresse e-mail invalide.' }, { status: 400 });
      }
      subject = 'Demande plaquette offres 2026 — Terrago';
      text = `Demande plaquette.\nEmail : ${email}`;
      replyTo = email;
      break;
    }

    case 'seminaire_territoires': {
      const prenom = str(body.prenom);
      const nom = str(body.nom);
      const email = str(body.email);
      const entreprise = str(body.entreprise);
      const participants = str(body.participants);
      if (!prenom || !nom || !email || !validEmail(email) || !entreprise) {
        return NextResponse.json(
          { success: false, message: 'Champs obligatoires manquants.' },
          { status: 400 },
        );
      }
      const selectedMonths = strArr(body.selectedMonths);
      const selectedRegions = strArr(body.selectedRegions);
      const selectedAccTypes = strArr(body.selectedAccTypes);
      const hasAccommodation = Boolean(body.hasAccommodation);
      const hasTransport = Boolean(body.hasTransport);
      const selectedTransport = str(body.selectedTransport);
      const message = str(body.message);

      text = [
        'Nouvelle demande de séminaire — Terrago (domaines)',
        '',
        '=== INFORMATIONS CLIENT ===',
        `Prénom : ${prenom}`,
        `Nom : ${nom}`,
        `Email : ${email}`,
        `Entreprise : ${entreprise}`,
        `Nombre de participants : ${participants || '—'}`,
        `Période / mois : ${selectedMonths.length > 0 ? selectedMonths.join(', ') : '—'}`,
        '',
        '=== RÉGION(S) SOUHAITÉE(S) ===',
        selectedRegions.length > 0 ? selectedRegions.join(', ') : 'Aucune sélectionnée',
        '',
        '=== LOGISTIQUE ===',
        `Hébergement : ${hasAccommodation ? 'Oui' : 'Non'}`,
        hasAccommodation && selectedAccTypes.length > 0
          ? `Types d'hébergement : ${selectedAccTypes.join(', ')}`
          : '',
        `Transport : ${hasTransport ? 'Oui' : 'Non'}`,
        hasTransport && selectedTransport ? `Option transport : ${selectedTransport}` : '',
        '',
        '=== MESSAGE ===',
        message || 'Aucun',
        '',
        '---',
        'Formulaire domaines séminaire — terragoexperiences.fr',
      ]
        .filter((line) => line !== '')
        .join('\n');

      subject = `Nouvelle demande séminaire (domaines) — ${entreprise}`;
      replyTo = email;
      break;
    }

    case 'seminaire_sur_mesure': {
      const prenom = str(body.prenom);
      const nom = str(body.nom);
      const email = str(body.email);
      const entreprise = str(body.entreprise);
      const participants = str(body.participants);
      if (!prenom || !nom || !email || !validEmail(email) || !entreprise || !participants) {
        return NextResponse.json(
          { success: false, message: 'Champs obligatoires manquants.' },
          { status: 400 },
        );
      }
      const periodeStr = str(body.periodeStr);
      const regions = strArr(body.regions);
      const autreRegion = str(body.autreRegion);
      const ville = str(body.ville);
      const terroir = strArr(body.terroir);
      const hebergement = Boolean(body.hebergement);
      const accTypes = strArr(body.accTypes);
      const transport = Boolean(body.transport);
      const transportDetail = str(body.transportDetail);
      const message = str(body.message);

      text = [
        'Nouvelle demande de séminaire — Terrago (sur mesure)',
        '',
        '=== INFORMATIONS CLIENT ===',
        `Prénom : ${prenom} | Nom : ${nom}`,
        `Email : ${email} | Entreprise : ${entreprise}`,
        `Participants : ${participants}`,
        `Période : ${periodeStr || '—'}`,
        '',
        '=== DESTINATION & TERROIR ===',
        `Région(s) : ${[...regions, autreRegion].filter(Boolean).join(', ') || 'Non précisée'}`,
        ville ? `Ville : ${ville}` : '',
        `Produits du terroir : ${terroir.join(', ') || 'Non précisé'}`,
        '',
        '=== LOGISTIQUE ===',
        `Hébergement : ${hebergement ? (accTypes.join(', ') || 'Oui') : 'Non'}`,
        `Transport : ${transport ? transportDetail || 'Oui' : 'Non'}`,
        `Message : ${message || 'Aucun'}`,
        '',
        '---',
        'Modal séminaire sur mesure — terragoexperiences.fr',
      ]
        .filter((line) => line !== '')
        .join('\n');

      subject = `Nouvelle demande séminaire — ${entreprise}`;
      replyTo = email;
      break;
    }

    case 'producteur_fiche': {
      const producerName = str(body.producerName);
      const producerLocation = str(body.producerLocation);
      const nom = str(body.nom);
      const email = str(body.email);
      if (!producerName || !nom || !email || !validEmail(email)) {
        return NextResponse.json(
          { success: false, message: 'Champs obligatoires manquants.' },
          { status: 400 },
        );
      }
      const participants = str(body.participants);
      const dates = str(body.dates);
      subject = `Demande séminaire — ${producerName}`;
      text = [
        `Demande depuis la fiche producteur : ${producerName}`,
        producerLocation ? `Lieu : ${producerLocation}` : '',
        '',
        `Nom : ${nom}`,
        `Email : ${email}`,
        `Participants : ${participants || '—'}`,
        `Dates : ${dates || '—'}`,
        '',
        '---',
        'Fiche producteur — terragoexperiences.fr',
      ]
        .filter((line) => line !== '')
        .join('\n');
      replyTo = email;
      break;
    }

    case 'particuliers': {
      const nom = str(body.nom);
      const prenom = str(body.prenom);
      const email = str(body.email);
      if (!nom || !prenom || !email || !validEmail(email)) {
        return NextResponse.json(
          { success: false, message: 'Champs obligatoires manquants.' },
          { status: 400 },
        );
      }
      const portable = str(body.portable);
      const periode = str(body.periode);
      const univers = strArr(body.univers);
      const participants = str(body.participants);
      const precisions = str(body.precisions);

      text = [
        'Bonjour,',
        '',
        'Demande « Entre amis » / particuliers — Terrago',
        '',
        `Nom : ${nom}`,
        `Prénom : ${prenom}`,
        `Email : ${email}`,
        `Téléphone : ${portable || '—'}`,
        `Période : ${periode || '—'}`,
        `Univers / produits : ${univers.join(', ') || '—'}`,
        `Nombre de personnes : ${participants || '—'}`,
        precisions ? `Précisions : ${precisions}` : '',
        '',
        '---',
        'Page Particuliers — terragoexperiences.fr',
      ]
        .filter((line) => line !== '')
        .join('\n');

      subject = `Entre amis — Demande de ${prenom} ${nom}`;
      replyTo = email;
      break;
    }

    case 'host': {
      const exploitation = str(body.exploitation);
      const email = str(body.email);
      const telephone = str(body.telephone);
      if (!exploitation || !email || !validEmail(email) || !telephone) {
        return NextResponse.json(
          { success: false, message: 'Champs obligatoires manquants.' },
          { status: 400 },
        );
      }
      const responsable = str(body.responsable);
      const secteur = str(body.secteur);
      text = [
        '=== Candidature Nous rejoindre ===',
        '',
        `Responsable : ${responsable || '—'}`,
        `Exploitation : ${exploitation}`,
        `Secteur : ${secteur || '—'}`,
        `Email : ${email}`,
        `Téléphone : ${telephone}`,
        '',
        '---',
        'Page Nous rejoindre — terragoexperiences.fr',
      ].join('\n');
      subject = `Candidature Nous rejoindre — ${exploitation}`;
      replyTo = email;
      break;
    }

    case 'recommend_producteur': {
      const producerName = str(body.producerName);
      const yourName = str(body.yourName);
      const yourEmail = str(body.yourEmail);
      if (!producerName || !yourName || !yourEmail || !validEmail(yourEmail)) {
        return NextResponse.json(
          { success: false, message: 'Champs obligatoires manquants.' },
          { status: 400 },
        );
      }
      const producerContact = str(body.producerContact);
      const message = str(body.message);
      text = [
        '=== Recommandation producteur ===',
        '',
        `Producteur / exploitation : ${producerName}`,
        `Votre nom : ${yourName}`,
        `Votre email : ${yourEmail}`,
        `Contact producteur : ${producerContact || '—'}`,
        '',
        'Message :',
        message || '—',
        '',
        '---',
        'Formulaire Recommander un producteur — terragoexperiences.fr',
      ].join('\n');
      subject = `Recommandation producteur : ${producerName}`;
      replyTo = yourEmail;
      break;
    }

    default:
      return NextResponse.json({ success: false, message: 'Action inconnue.' }, { status: 400 });
  }

  const sent = await notifyTeam({ subject, text, replyTo });
  if (!sent.ok) {
    return NextResponse.json(
      { success: false, message: sent.message },
      { status: 503 },
    );
  }

  return NextResponse.json({ success: true });
}
