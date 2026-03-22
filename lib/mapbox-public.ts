/**
 * Lu côté serveur (pages, layouts) : toutes les variables d’environnement
 * sont disponibles au build / à la requête, pas seulement NEXT_PUBLIC_*.
 */
export function getMapboxPublicToken(): string {
  const raw =
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN ||
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
    process.env.MAPBOX_PUBLIC_TOKEN ||
    '';
  return typeof raw === 'string' ? raw.trim() : '';
}
