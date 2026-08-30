/** Lieux FR pour autocomplétion : régions (13) et villes +50 000 hab. */

export type FrenchPlaceKind = 'ville' | 'région' | 'département';

export type FrenchPlace = {
  name: string;
  kind: FrenchPlaceKind;
  /** Région administrative (villes et départements). */
  region?: string;
};

/** Les 13 régions administratives métropolitaines. */
const FRENCH_REGIONS: string[] = [
  'Auvergne-Rhône-Alpes',
  'Bourgogne-Franche-Comté',
  'Bretagne',
  'Centre-Val de Loire',
  'Corse',
  'Grand Est',
  'Hauts-de-France',
  'Île-de-France',
  'Normandie',
  'Nouvelle-Aquitaine',
  'Occitanie',
  'Pays de la Loire',
  "Provence-Alpes-Côte d'Azur",
];

const FRENCH_DEPARTMENTS: string[] = [
  'Ain',
  'Aisne',
  'Allier',
  'Alpes-de-Haute-Provence',
  'Hautes-Alpes',
  'Alpes-Maritimes',
  'Ardèche',
  'Ardennes',
  'Ariège',
  'Aube',
  'Aude',
  'Aveyron',
  'Bouches-du-Rhône',
  'Calvados',
  'Cantal',
  'Charente',
  'Charente-Maritime',
  'Cher',
  'Corrèze',
  'Corse-du-Sud',
  'Haute-Corse',
  "Côte-d'Or",
  "Côtes-d'Armor",
  'Creuse',
  'Dordogne',
  'Doubs',
  'Drôme',
  'Eure',
  'Eure-et-Loir',
  'Finistère',
  'Gard',
  'Haute-Garonne',
  'Gers',
  'Gironde',
  'Hérault',
  'Ille-et-Vilaine',
  'Indre',
  'Indre-et-Loire',
  'Isère',
  'Jura',
  'Landes',
  'Loir-et-Cher',
  'Loire',
  'Haute-Loire',
  'Loire-Atlantique',
  'Loiret',
  'Lot',
  'Lot-et-Garonne',
  'Lozère',
  'Maine-et-Loire',
  'Manche',
  'Marne',
  'Haute-Marne',
  'Mayenne',
  'Meurthe-et-Moselle',
  'Meuse',
  'Morbihan',
  'Moselle',
  'Nièvre',
  'Nord',
  'Oise',
  'Orne',
  'Pas-de-Calais',
  'Puy-de-Dôme',
  'Pyrénées-Atlantiques',
  'Hautes-Pyrénées',
  'Pyrénées-Orientales',
  'Bas-Rhin',
  'Haut-Rhin',
  'Rhône',
  'Haute-Saône',
  'Saône-et-Loire',
  'Sarthe',
  'Savoie',
  'Haute-Savoie',
  'Paris',
  'Seine-Maritime',
  'Seine-et-Marne',
  'Yvelines',
  'Deux-Sèvres',
  'Somme',
  'Tarn',
  'Tarn-et-Garonne',
  'Var',
  'Vaucluse',
  'Vendée',
  'Vienne',
  'Haute-Vienne',
  'Vosges',
  'Yonne',
  'Territoire de Belfort',
  'Essonne',
  'Hauts-de-Seine',
  'Seine-Saint-Denis',
  'Val-de-Marne',
  "Val-d'Oise",
  'Guadeloupe',
  'Martinique',
  'Guyane',
  'La Réunion',
  'Mayotte',
];

/** Communes de +50 000 habitants (INSEE / population municipale récente). */
const FRENCH_CITIES_RAW: string[] = [
  'Paris',
  'Marseille',
  'Lyon',
  'Toulouse',
  'Nice',
  'Nantes',
  'Montpellier',
  'Bordeaux',
  'Lille',
  'Rennes',
  'Toulon',
  'Reims',
  'Saint-Étienne',
  'Le Havre',
  'Villeurbanne',
  'Dijon',
  'Angers',
  'Grenoble',
  'Saint-Denis',
  'Nîmes',
  'Aix-en-Provence',
  'Clermont-Ferrand',
  'Le Mans',
  'Brest',
  'Tours',
  'Amiens',
  'Annecy',
  'Limoges',
  'Perpignan',
  'Boulogne-Billancourt',
  'Besançon',
  'Rouen',
  'Orléans',
  'Montreuil',
  'Caen',
  'Saint-Paul',
  'Argenteuil',
  'Nancy',
  'Tourcoing',
  'Roubaix',
  'Nanterre',
  'Vitry-sur-Seine',
  'Asnières-sur-Seine',
  'Créteil',
  'Avignon',
  'Colombes',
  'Poitiers',
  'Aubervilliers',
  'Aulnay-sous-Bois',
  'Dunkerque',
  'Saint-Pierre',
  'Versailles',
  'Courbevoie',
  'Rueil-Malmaison',
  'Le Tampon',
  'Béziers',
  'Pau',
  'La Rochelle',
  'Cherbourg-en-Cotentin',
  'Mérignac',
  'Champigny-sur-Marne',
  'Antibes',
  'Saint-Maur-des-Fossés',
  'Ajaccio',
  'Fort-de-France',
  'Saint-Nazaire',
  'Cannes',
  'Noisy-le-Grand',
  'Drancy',
  'Cergy',
  'Levallois-Perret',
  'Issy-les-Moulineaux',
  'Calais',
  'Pessac',
  'Évry-Courcouronnes',
  'Vénissieux',
  'Ivry-sur-Seine',
  'Valence',
  'Clichy',
  'Quimper',
  'Antony',
  'Bourges',
  'La Seyne-sur-Mer',
  'Montauban',
  "Villeneuve-d'Ascq",
  'Cayenne',
  'Le Blanc-Mesnil',
  'Troyes',
  'Pantin',
  'Villejuif',
  'Chambéry',
  'Niort',
  'Fréjus',
  'Neuilly-sur-Seine',
  'Sarcelles',
  'Saint-André',
  'Clamart',
  'Lorient',
  'Narbonne',
  'Bobigny',
  'Meaux',
  'Maisons-Alfort',
  'Hyères',
  'Vannes',
  'Beauvais',
  'Saint-Louis',
  'La Roche-sur-Yon',
  'Chelles',
  'Corbeil-Essonnes',
  'Saint-Laurent-du-Maroni',
  'Cholet',
  'Bayonne',
  'Fontenay-sous-Bois',
  'Saint-Ouen-sur-Seine',
  'Cagnes-sur-Mer',
  'Vaulx-en-Velin',
  'Épinay-sur-Seine',
  'Saint-Quentin',
  'Sartrouville',
  'Sevran',
  'Arles',
  'Massy',
  'Albi',
  'Les Abymes',
  'Gennevilliers',
  'Saint-Herblain',
  'Grasse',
  'Bondy',
];

function normalizePlace(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function invertRegionGroups(groups: Record<string, readonly string[]>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [region, names] of Object.entries(groups)) {
    for (const name of names) out[name] = region;
  }
  return out;
}

const DEPARTMENTS_BY_REGION: Record<string, readonly string[]> = {
  'Auvergne-Rhône-Alpes': [
    'Ain', 'Allier', 'Ardèche', 'Cantal', 'Drôme', 'Isère', 'Loire', 'Haute-Loire',
    'Puy-de-Dôme', 'Rhône', 'Savoie', 'Haute-Savoie',
  ],
  'Bourgogne-Franche-Comté': [
    "Côte-d'Or", 'Doubs', 'Jura', 'Nièvre', 'Haute-Saône', 'Saône-et-Loire', 'Yonne',
    'Territoire de Belfort',
  ],
  'Bretagne': ["Côtes-d'Armor", 'Finistère', 'Ille-et-Vilaine', 'Morbihan'],
  'Centre-Val de Loire': [
    'Cher', 'Eure-et-Loir', 'Indre', 'Indre-et-Loire', 'Loir-et-Cher', 'Loiret',
  ],
  'Corse': ['Corse-du-Sud', 'Haute-Corse'],
  'Grand Est': [
    'Ardennes', 'Aube', 'Marne', 'Haute-Marne', 'Meurthe-et-Moselle', 'Meuse',
    'Moselle', 'Bas-Rhin', 'Haut-Rhin', 'Vosges',
  ],
  'Hauts-de-France': ['Aisne', 'Nord', 'Oise', 'Pas-de-Calais', 'Somme'],
  'Île-de-France': [
    'Paris', 'Seine-et-Marne', 'Yvelines', 'Essonne', 'Hauts-de-Seine',
    'Seine-Saint-Denis', 'Val-de-Marne', "Val-d'Oise",
  ],
  'Normandie': ['Calvados', 'Eure', 'Manche', 'Orne', 'Seine-Maritime'],
  'Nouvelle-Aquitaine': [
    'Charente', 'Charente-Maritime', 'Corrèze', 'Creuse', 'Dordogne', 'Gironde',
    'Landes', 'Lot-et-Garonne', 'Pyrénées-Atlantiques', 'Deux-Sèvres', 'Vienne',
    'Haute-Vienne',
  ],
  'Occitanie': [
    'Ariège', 'Aude', 'Aveyron', 'Gard', 'Haute-Garonne', 'Gers', 'Hérault', 'Lot',
    'Lozère', 'Hautes-Pyrénées', 'Pyrénées-Orientales', 'Tarn', 'Tarn-et-Garonne',
  ],
  'Pays de la Loire': ['Loire-Atlantique', 'Maine-et-Loire', 'Mayenne', 'Sarthe', 'Vendée'],
  "Provence-Alpes-Côte d'Azur": [
    'Alpes-de-Haute-Provence', 'Hautes-Alpes', 'Alpes-Maritimes', 'Bouches-du-Rhône',
    'Var', 'Vaucluse',
  ],
  'Guadeloupe': ['Guadeloupe'],
  'Martinique': ['Martinique'],
  'Guyane': ['Guyane'],
  'La Réunion': ['La Réunion'],
  'Mayotte': ['Mayotte'],
};

const CITIES_BY_REGION: Record<string, readonly string[]> = {
  'Auvergne-Rhône-Alpes': [
    'Lyon', 'Saint-Étienne', 'Villeurbanne', 'Grenoble', 'Clermont-Ferrand', 'Annecy',
    'Vénissieux', 'Valence', 'Chambéry', 'Vaulx-en-Velin',
  ],
  'Bourgogne-Franche-Comté': ['Dijon', 'Besançon'],
  'Bretagne': ['Rennes', 'Brest', 'Quimper', 'Lorient', 'Vannes'],
  'Centre-Val de Loire': ['Tours', 'Orléans', 'Bourges'],
  'Corse': ['Ajaccio'],
  'Grand Est': ['Reims', 'Nancy', 'Troyes'],
  'Hauts-de-France': [
    'Lille', 'Amiens', 'Tourcoing', 'Roubaix', 'Dunkerque', 'Calais',
    "Villeneuve-d'Ascq", 'Beauvais', 'Saint-Quentin',
  ],
  'Île-de-France': [
    'Paris', 'Boulogne-Billancourt', 'Montreuil', 'Argenteuil', 'Nanterre',
    'Vitry-sur-Seine', 'Asnières-sur-Seine', 'Créteil', 'Colombes', 'Aubervilliers',
    'Aulnay-sous-Bois', 'Versailles', 'Courbevoie', 'Rueil-Malmaison',
    'Champigny-sur-Marne', 'Saint-Maur-des-Fossés', 'Noisy-le-Grand', 'Drancy',
    'Cergy', 'Levallois-Perret', 'Issy-les-Moulineaux', 'Évry-Courcouronnes',
    'Ivry-sur-Seine', 'Clichy', 'Antony', 'Le Blanc-Mesnil', 'Pantin', 'Villejuif',
    'Neuilly-sur-Seine', 'Sarcelles', 'Clamart', 'Bobigny', 'Meaux', 'Maisons-Alfort',
    'Chelles', 'Corbeil-Essonnes', 'Fontenay-sous-Bois', 'Saint-Ouen-sur-Seine',
    'Épinay-sur-Seine', 'Sartrouville', 'Sevran', 'Massy', 'Gennevilliers', 'Bondy',
  ],
  'Normandie': ['Le Havre', 'Rouen', 'Caen', 'Cherbourg-en-Cotentin'],
  'Nouvelle-Aquitaine': [
    'Bordeaux', 'Limoges', 'Poitiers', 'Pau', 'La Rochelle', 'Mérignac', 'Pessac',
    'Niort', 'Bayonne',
  ],
  'Occitanie': [
    'Toulouse', 'Montpellier', 'Nîmes', 'Perpignan', 'Béziers', 'Montauban',
    'Narbonne', 'Albi',
  ],
  'Pays de la Loire': [
    'Nantes', 'Angers', 'Le Mans', 'Saint-Nazaire', 'La Roche-sur-Yon', 'Cholet',
    'Saint-Herblain',
  ],
  "Provence-Alpes-Côte d'Azur": [
    'Marseille', 'Nice', 'Toulon', 'Aix-en-Provence', 'Avignon', 'Antibes', 'Cannes',
    'La Seyne-sur-Mer', 'Fréjus', 'Hyères', 'Cagnes-sur-Mer', 'Arles', 'Grasse',
  ],
  'Guadeloupe': ['Les Abymes'],
  'Martinique': ['Fort-de-France'],
  'Guyane': ['Cayenne', 'Saint-Laurent-du-Maroni'],
  'La Réunion': [
    'Saint-Denis', 'Saint-Paul', 'Saint-Pierre', 'Le Tampon', 'Saint-André', 'Saint-Louis',
  ],
};

const DEPARTMENT_REGION = invertRegionGroups(DEPARTMENTS_BY_REGION);
const CITY_REGION = invertRegionGroups(CITIES_BY_REGION);

export const FRENCH_CITIES: string[] = Array.from(new Set(FRENCH_CITIES_RAW)).sort((a, b) =>
  a.localeCompare(b, 'fr')
);

export { FRENCH_REGIONS, FRENCH_DEPARTMENTS };

const ALL_PLACES: FrenchPlace[] = [
  ...FRENCH_REGIONS.map((name) => ({ name, kind: 'région' as const })),
  ...FRENCH_DEPARTMENTS.map((name) => ({
    name,
    kind: 'département' as const,
    region: DEPARTMENT_REGION[name],
  })),
  ...FRENCH_CITIES.map((name) => ({
    name,
    kind: 'ville' as const,
    region: CITY_REGION[name],
  })),
];

const KIND_LABEL: Record<FrenchPlaceKind, string> = {
  ville: 'Ville',
  région: 'Région',
  département: 'Département',
};

export function frenchPlaceKindLabel(kind: FrenchPlaceKind): string {
  return KIND_LABEL[kind];
}

/** Libellé affiché : « Paris, Île-de-France, France » / « Gironde, Nouvelle-Aquitaine, France » / « Bretagne, France ». */
export function frenchPlaceDisplayLabel(place: FrenchPlace): string {
  if (place.kind === 'région' || !place.region || place.region === place.name) {
    return `${place.name}, France`;
  }
  return `${place.name}, ${place.region}, France`;
}

export function matchFrenchCities(query: string, limit = 12): string[] {
  return matchFrenchPlaces(query, limit)
    .filter((p) => p.kind === 'ville')
    .map((p) => p.name);
}

/**
 * Autocomplétion lieu : préfixe (sans accents), dès 1 caractère.
 * Priorité : villes → régions → départements, puis longueur du nom.
 */
export function matchFrenchPlaces(query: string, limit = 10): FrenchPlace[] {
  const raw = query.trim();
  if (raw.length < 1) return [];
  const q = normalizePlace(raw);
  if (!q) return [];

  // Dédupliquer par nom (ex. Paris) : on garde plutôt la ville.
  const prefer: Record<FrenchPlaceKind, number> = {
    ville: 0,
    région: 1,
    département: 2,
  };
  const byKey = new Map<string, FrenchPlace>();

  for (const p of ALL_PLACES) {
    const nameN = normalizePlace(p.name);
    const labelN = normalizePlace(frenchPlaceDisplayLabel(p));
    if (!nameN.startsWith(q) && !labelN.startsWith(q)) continue;
    const key = normalizePlace(p.name);
    const existing = byKey.get(key);
    if (!existing || prefer[p.kind] < prefer[existing.kind]) {
      byKey.set(key, p);
    }
  }

  const kindRank: Record<FrenchPlaceKind, number> = {
    ville: 0,
    région: 1,
    département: 2,
  };

  return Array.from(byKey.values())
    .sort((a, b) => {
      const kr = kindRank[a.kind] - kindRank[b.kind];
      if (kr !== 0) return kr;
      const lr = a.name.length - b.name.length;
      if (lr !== 0) return lr;
      return a.name.localeCompare(b.name, 'fr');
    })
    .slice(0, limit);
}
