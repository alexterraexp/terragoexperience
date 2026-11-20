export type StudioStatut = 'brouillon' | 'bientot' | 'publie';

export type StudioProgrammeLigne = {
  heure: string;
  action: string;
};

export type StudioFormat = {
  actif: boolean;
  sousTitre: string;
  participants: string;
  duree: string;
  prix: string;
  programme: StudioProgrammeLigne[];
};

export const HEBERGEMENT_TYPES = [
  { id: 'gite', label: 'Gîte' },
  { id: 'hotel', label: 'Hôtel' },
  { id: 'insolite', label: 'Insolite' },
] as const;

export type StudioHebergement = {
  nom: string;
  type: string;
  description: string;
  capacite: string;
  prixNuit: string;
  images: string[];
};

/** Fiche telle que l’espace fondateurs l’édite. Le serveur la répartit dans les tables. */
export type StudioOffre = {
  id: string;
  producteur: string;
  label: string;
  locality: string;
  regionName: string;
  slug: string;
  images: string[];
  pills: string[];
  activites: string[];
  inclus: string[];
  statut: StudioStatut;
  bestseller: boolean;
  hebergement: boolean;
  hebergements: StudioHebergement[];
  journee: StudioFormat;
  residentiel: StudioFormat;
  ordre: number;
};

export function emptyFormat(actif = false): StudioFormat {
  return {
    actif,
    sousTitre: '',
    participants: '',
    duree: '',
    prix: '',
    programme: [],
  };
}

export function emptyHebergement(): StudioHebergement {
  return {
    nom: '',
    type: '',
    description: '',
    capacite: '',
    prixNuit: '',
    images: [],
  };
}

export function emptyOffre(): StudioOffre {
  return {
    id: '',
    producteur: '',
    label: '',
    locality: '',
    regionName: '',
    slug: '',
    images: [],
    pills: [],
    activites: [],
    inclus: [],
    statut: 'brouillon',
    bestseller: false,
    hebergement: false,
    hebergements: [],
    journee: emptyFormat(true),
    residentiel: emptyFormat(false),
    ordre: 0,
  };
}

export function slugifyOffre(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}
