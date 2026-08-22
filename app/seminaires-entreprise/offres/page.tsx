import { permanentRedirect } from 'next/navigation';
import { EXEMPLES_SEMINAIRE_ENTREPRISE_PATH } from '@/lib/exemplesSeminaireEntreprise';

export default function SeminairesOffresRedirectPage() {
  permanentRedirect(EXEMPLES_SEMINAIRE_ENTREPRISE_PATH);
}
