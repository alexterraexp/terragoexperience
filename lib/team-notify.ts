import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

/**
 * Notification équipe (texte brut) via Resend → NOTIFY_EMAIL.
 */
export async function notifyTeam(params: {
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<{ ok: true } | { ok: false; message: string }> {
  if (!process.env.RESEND_API_KEY) {
    console.error('[Terrago] RESEND_API_KEY manquant — notifyTeam');
    return { ok: false, message: 'Service de notification indisponible.' };
  }
  const to = process.env.NOTIFY_EMAIL;
  if (!to) {
    console.warn('[Terrago] NOTIFY_EMAIL non défini — notifyTeam');
    return { ok: false, message: 'Service de notification indisponible.' };
  }
  try {
    await resend.emails.send({
      from:
        process.env.EMAIL_FROM ||
        'TerraGo Expériences <contact@mail.terragoexperiences.fr>',
      to,
      subject: params.subject,
      text: params.text,
      ...(params.replyTo && isValidEmail(params.replyTo) ? { replyTo: params.replyTo } : {}),
    });
    return { ok: true };
  } catch (err) {
    console.error('notifyTeam (Resend) :', err);
    return { ok: false, message: "Erreur lors de l'envoi." };
  }
}
