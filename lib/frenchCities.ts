/** Villes françaises pour autocomplétion « ville de départ » (préfectures + grandes communes). */

const FRENCH_CITIES_RAW = `
Paris Marseille Lyon Toulouse Nice Nantes Montpellier Strasbourg Bordeaux Lille Rennes Reims Le Havre
Saint-Étienne Toulon Grenoble Dijon Angers Nîmes Villeurbanne Clermont-Ferrand Le Mans Aix-en-Provence
Brest Limoges Tours Amiens Perpignan Metz Besançon Orléans Mulhouse Rouen Caen Nancy Saint-Denis
Argenteuil Montreuil Roubaix Tourcoing Nanterre Avignon Vitry-sur-Seine Créteil Dunkerque Poitiers
Asnières-sur-Seine Versailles Courbevoie Colombes Aulnay-sous-Bois Champigny-sur-Marne Rueil-Malmaison
Bourges Cannes Saint-Nazaire Colmar Mérignac Drancy Saint-Maur-des-Fossés Ajaccio Issy-les-Moulineaux
Noisy-le-Grand Cergy Levallois-Perret Antibes Saint-Quentin Pessac Valence Troyes Clamart Montauban
Neuilly-sur-Seine Villejuif Chambéry Niort Lorient Beauvais Meaux Hyères Chelles Vannes Saint-Brieuc
Bayonne Pau Annecy La Rochelle Bergerac Carcassonne Biarritz Angoulême Quimper Laval Blois Bourg-en-Bresse
Châteauroux Chaumont Chartres Châlons-en-Champagne Cherbourg-en-Cotentin Cholet Compiègne Épinal Évreux
Foix Gap Guéret Laon Lons-le-Saunier Mâcon Mont-de-Marsan Nevers Privas Rodez Saint-Lô Tarbes Vesoul
Albi Alès Aurillac Cahors Cusset Dax Dieppe Douai Fontainebleau Fréjus Istres Lens Livry-Gargan
Massy Melun Montélimar Pantin Puteaux Saint-Germain-en-Laye Sarcelles Sète Thionville Valenciennes
Versailles Vitrolles Wattrelos Agen Beauvais Belfort Bobigny Bondy Boulogne-sur-Mer Calais Charleville-Mézières
Corbeil-Essonnes Creil Échirolles Gennevilliers Ivry-sur-Seine La Courneuve Le Blanc-Mesnil Les Abymes
Martigues Montluçon Pantin Sartrouville Sevran Stains Talence Vaulx-en-Velin Villeneuve-d'Ascq Wattignies
`;

function normalizeCity(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export const FRENCH_CITIES: string[] = Array.from(
  new Set(
    FRENCH_CITIES_RAW.split(/\s+/)
      .map((w) => w.trim())
      .filter(Boolean)
  )
).sort((a, b) => a.localeCompare(b, 'fr'));

export function matchFrenchCities(query: string, limit = 12): string[] {
  const raw = query.trim();
  if (raw.length < 1) return [];
  const q = normalizeCity(raw);
  if (!q) return [];
  return FRENCH_CITIES.filter((c) => normalizeCity(c).startsWith(q)).slice(0, limit);
}
