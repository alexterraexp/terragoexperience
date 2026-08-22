'use client';

import SiteErrorState from '@/components/SiteErrorState';
import { EXEMPLES_SEMINAIRE_ENTREPRISE_PATH } from '@/lib/exemplesSeminaireEntreprise';

export default function SeminaireExempleNotFound() {
  return (
    <SiteErrorState
      title="Oups, cette expérience n'est pas disponible actuellement. 🌿"
      description="Mais on a d'autres très bonnes idées."
      ctaHref={EXEMPLES_SEMINAIRE_ENTREPRISE_PATH}
      ctaLabel="Découvrez tous nos exemples de séminaires"
    />
  );
}
