/** Pilules d’une offre séminaire : pastilles sur la carte et filtres du catalogue. */
export const OFFER_PILLS = [
  { id: 'regen', label: 'Regen' },
  { id: 'rse', label: 'RSE' },
  { id: 'cohesion', label: 'Cohésion' },
  { id: 'inspiration', label: 'Inspiration' },
  { id: 'codir', label: 'CODIR' },
  { id: 'au-vert', label: 'Au vert' },
  { id: 'original', label: 'Original' },
] as const;

export type OfferPillId = (typeof OFFER_PILLS)[number]['id'];

const PILL_LABELS = new Map<string, string>(OFFER_PILLS.map((pill) => [pill.id, pill.label]));

export function offerPillLabel(id: string): string {
  return PILL_LABELS.get(id) ?? id;
}

/** Sépare les cases d’inclus des pilules et activités encodées tant que les colonnes dédiées manquent. */
export function partitionInclus(ids: string[]): {
  inclus: string[];
  pills: string[];
  activites: string[];
} {
  const inclus: string[] = [];
  const pills: string[] = [];
  const activites: string[] = [];
  for (const id of ids) {
    if (id.startsWith('pill:')) {
      const pill = id.slice(5).trim();
      if (pill) pills.push(pill);
      continue;
    }
    if (id.startsWith('act:')) {
      const raw = id.slice(4);
      let text = raw;
      try {
        text = decodeURIComponent(raw);
      } catch {
        text = raw;
      }
      text = text.trim();
      if (text) activites.push(text);
      continue;
    }
    inclus.push(id);
  }
  return { inclus, pills, activites };
}

export function encodeStudioExtras(inclus: string[], pills: string[], activites: string[]): string[] {
  return [
    ...inclus,
    ...pills.map((id) => `pill:${id}`),
    ...activites.map((item) => `act:${encodeURIComponent(item)}`),
  ];
}

/** Cases « inclus » déjà affichées en icônes sur la fiche publique. */
export const OFFER_AMENITIES = [
  { id: 'atelier', label: 'Atelier « les mains dans la terre »' },
  { id: 'repas', label: 'Repas convivial typique' },
  { id: 'visite_degustation', label: 'Visite et dégustation' },
  { id: 'salle_reunion', label: 'Salle de réunion' },
  { id: 'wifi', label: 'Wi-Fi' },
  { id: 'hebergement', label: 'Hébergement' },
  { id: 'activites_sportives', label: 'Activités sportives' },
  { id: 'teambuilding', label: 'Team-building' },
  { id: 'soiree_theme', label: 'Soirée à thème' },
] as const;
