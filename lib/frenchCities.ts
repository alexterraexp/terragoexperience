/** Lieux FR pour autocomplétion : régions (13) et villes +50 000 hab. */

export type FrenchPlaceKind = 'ville' | 'région' | 'département';

export type FrenchPlace = {
  name: string;
  kind: FrenchPlaceKind;
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

export const FRENCH_CITIES: string[] = Array.from(new Set(FRENCH_CITIES_RAW)).sort((a, b) =>
  a.localeCompare(b, 'fr')
);

export { FRENCH_REGIONS, FRENCH_DEPARTMENTS };

const ALL_PLACES: FrenchPlace[] = [
  ...FRENCH_REGIONS.map((name) => ({ name, kind: 'région' as const })),
  ...FRENCH_DEPARTMENTS.map((name) => ({ name, kind: 'département' as const })),
  ...FRENCH_CITIES.map((name) => ({ name, kind: 'ville' as const })),
];

const KIND_LABEL: Record<FrenchPlaceKind, string> = {
  ville: 'Ville',
  région: 'Région',
  département: 'Département',
};

export function frenchPlaceKindLabel(kind: FrenchPlaceKind): string {
  return KIND_LABEL[kind];
}

export function matchFrenchCities(query: string, limit = 12): string[] {
  return matchFrenchPlaces(query, limit)
    .filter((p) => p.kind === 'ville')
    .map((p) => p.name);
}

/**
 * Autocomplétion lieu : préfixe (sans accents), dès 1 caractère.
 * Priorité : régions → départements → villes, puis longueur du nom.
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
    if (!normalizePlace(p.name).startsWith(q)) continue;
    const key = normalizePlace(p.name);
    const existing = byKey.get(key);
    if (!existing || prefer[p.kind] < prefer[existing.kind]) {
      byKey.set(key, p);
    }
  }

  const kindRank: Record<FrenchPlaceKind, number> = {
    région: 0,
    département: 1,
    ville: 2,
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
