import { Resend } from "resend";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Helpers ─────────────────────────────────────────────────────────────────

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function generateReference() {
  return "TG-" + Date.now().toString(36).toUpperCase() + "-" + crypto.randomBytes(2).toString("hex").toUpperCase();
}

function buildEmailHtml(data) {
  const templatePath = path.join(process.cwd(), "email-template.html");
  let html = fs.readFileSync(templatePath, "utf8");
  const prenom = String(data.nom || "")
    .trim()
    .split(/\s+/)[0] || "—";

  return html
    .replace(/{{PRENOM}}/g, escapeHtml(prenom))
    .replace(/{{NOM}}/g, escapeHtml(data.nom))
    .replace(/{{EMAIL}}/g, escapeHtml(data.email))
    .replace(/{{ENTREPRISE}}/g, escapeHtml(data.entreprise || "—"))
    .replace(/{{PARTICIPANTS}}/g, escapeHtml(String(data.participants)))
    .replace(/{{PERIODE}}/g, escapeHtml(data.periode))
    .replace(/{{VILLE_DEPART}}/g, escapeHtml(data.villeDepart))
    .replace(/{{TRAJET_MAX}}/g, escapeHtml(data.trajetMax))
    .replace(/{{HEBERGEMENT}}/g, escapeHtml(data.hebergement))
    .replace(/{{TRANSPORT}}/g, escapeHtml(data.transport))
    .replace(/{{ACTIVITES}}/g, escapeHtml(data.activites))
    .replace(/{{REFERENCE}}/g, escapeHtml(data.reference))
    .replace(/{{LIEN_SITE}}/g, "https://terragoexperiences.fr")
    .replace(/{{LIEN_OFFRES}}/g, "https://terragoexperiences.fr/seminaires-entreprise/offres")
    .replace(/{{LIEN_CONTACT}}/g, "https://terragoexperiences.fr/contact")
    .replace(/{{LIEN_DESABONNEMENT}}/g, "https://terragoexperiences.fr/desabonnement")
    .replace(/{{LIEN_CONFIDENTIALITE}}/g, "https://terragoexperiences.fr/confidentialite");
}

// ─── Logique partagée (Next.js App Router + handler Vercel) ─────────────────

export async function processReservation(body) {
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
  } = body || {};

  const required = {
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
    .filter(([, v]) => v === undefined || v === null || String(v).trim() === "")
    .map(([k]) => k);
  if (missing.length) {
    return {
      status: 400,
      body: { success: false, message: `Champs manquants : ${missing.join(", ")}` },
    };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      status: 400,
      body: { success: false, message: "Adresse e-mail invalide." },
    };
  }

  const reference = generateReference();
  const prenom = nom.split(" ")[0];

  try {
    const html = buildEmailHtml({
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
      reference,
    });

    await resend.emails.send({
      from:
        process.env.EMAIL_FROM ||
        "TerraGo Expériences <contact@mail.terragoexperiences.fr>",
      to: email,
      subject: "Votre demande de séminaire a bien été reçue",
      html,
      text: `Bonjour ${prenom},\n\nNous avons bien reçu votre demande (réf. ${reference}).\nNous vous répondons sous peu.\n\nTerraGo Expériences`,
    });

    if (process.env.NOTIFY_EMAIL) {
      await resend.emails.send({
        from:
          process.env.EMAIL_FROM ||
          "TerraGo Expériences <contact@mail.terragoexperiences.fr>",
        to: process.env.NOTIFY_EMAIL,
        subject: `[Nouvelle demande] ${nom} — ${participants} pers. — ${periode}`,
        text: [
          `Nouvelle demande de séminaire`,
          ``,
          `Nom : ${nom}`,
          `Email : ${email}`,
          `Entreprise : ${entreprise || "—"}`,
          `Participants : ${participants}`,
          `Période : ${periode}`,
          `Ville de départ : ${villeDepart}`,
          `Trajet max. : ${trajetMax}`,
          `Hébergement : ${hebergement}`,
          `Transport : ${transport}`,
          `Activités : ${activites}`,
          `Référence : ${reference}`,
        ].join("\n"),
      });
    }

    return {
      status: 200,
      body: { success: true, message: "E-mail envoyé.", reference },
    };
  } catch (err) {
    console.error("Erreur Resend :", err);
    return {
      status: 500,
      body: { success: false, message: "Erreur lors de l'envoi." },
    };
  }
}

// ─── Handler Vercel ──────────────────────────────────────────────────────────

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Méthode non autorisée." });
  }

  const result = await processReservation(req.body);
  return res.status(result.status).json(result.body);
}
