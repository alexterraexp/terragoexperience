import { permanentRedirect } from 'next/navigation';

/**
 * Ancienne porte d'entrée du CTA « Organiser votre séminaire », qui ouvrait le
 * formulaire via ?openModal=true. Le formulaire est désormais une modale globale :
 * cette route ne servait plus qu'à dupliquer /seminaires-entreprise.
 */
export default function DemandeSeminairePage() {
  permanentRedirect('/seminaires-entreprise');
}
