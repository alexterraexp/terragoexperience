/** Pages que Google doit privilégier en sitelinks, dans cet ordre. */
export const SITE_URL = 'https://terragoexperiences.fr';

export const SITELINK_PAGES = [
  {
    path: '/seminaires-entreprise',
    name: "Séminaires d'entreprise engagés",
    description:
      "Découvrez les séminaires d'entreprise TerraGo : cohésion, sensibilisation, inspiration et engagement au contact de producteurs et artisans.",
  },
  {
    path: '/destinations',
    name: 'Nos destinations',
    description:
      'Découvrez nos destinations de séminaire en France : Nouvelle-Aquitaine, Provence, Île-de-France, Normandie, Occitanie et autres territoires.',
  },
  {
    path: '/experiences-entreprise',
    name: 'Nos expériences',
    description:
      'Team building, séminaires RSE et conventions d’entreprise chez des producteurs engagés. Des expériences authentiques qui ont du sens.',
  },
  {
    path: '/notre-approche',
    name: 'Notre approche',
    description:
      "Découvrez l'approche TerraGo : reconnecter l'humain à la terre, soutenir les producteurs engagés et créer des expériences immersives responsables.",
  },
  {
    path: '/partenaires',
    name: 'Nos producteurs partenaires',
    description:
      "Découvrez les producteurs partenaires TerraGo, prêts à accueillir des groupes d'entreprise pour des expériences agrotouristiques authentiques en France.",
  },
] as const;

export type SitelinkPage = (typeof SITELINK_PAGES)[number];

export function sitelinkTitle(name: string): string {
  return `${name} | TerraGo`;
}

export function getSitelinkPage(path: SitelinkPage['path']): SitelinkPage {
  const page = SITELINK_PAGES.find((item) => item.path === path);
  if (!page) throw new Error(`Page sitelink inconnue: ${path}`);
  return page;
}
