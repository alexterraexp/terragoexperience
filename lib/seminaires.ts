import { supabase } from './supabase';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProgrammeItem { heure: string; action: string; }

export interface Format {
  titre: string; sous_titre: string; participants: string;
  duree: string; prix: string; inclus: string[];
  programme: ProgrammeItem[];
}

export interface Seminaire {
  id: string; label: string; producteur: string; region: string;
  couleur: string; couleurLight: string; bestseller: boolean;
  image: string; images: string[];
  formats: { [key: string]: Format };
  emoji?: string;
  lat?: number; lng?: number;
  slug: string;
  comingSoon?: boolean;
}

// ─── Génération de slug ───────────────────────────────────────────────────────
// Utilise directement le nom du producteur Supabase
// Exemple : "avec Paolo" → "avec-paolo"  |  "Baptiste Martin" → "baptiste-martin"

export function generateSlug(producteur: string): string {
  return producteur
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')  // supprime les accents
    .replace(/[^a-z0-9]+/g, '-')      // remplace tout ce qui n'est pas alphanum par un tiret
    .replace(/^-+|-+$/g, '');         // supprime les tirets en début/fin
}

// ─── Récupération des séminaires depuis Supabase ─────────────────────────────

export async function fetchSeminaires(): Promise<Seminaire[]> {
  const { data, error } = await supabase
    .from('seminaires')
    .select(`*, seminaire_formats (*, seminaire_programme (heure, action, ordre))`)
    .order('ordre');

  if (error || !data) return [];

  return data.map((s: any) => {
    const formats: { [key: string]: Format } = {};
    (s.seminaire_formats ?? []).forEach((f: any) => {
      formats[f.type] = {
        titre: f.titre,
        sous_titre: f.sous_titre,
        participants: f.participants,
        duree: f.duree,
        prix: f.prix,
        inclus: f.inclus ?? [],
        programme: [...(f.seminaire_programme ?? [])]
          .sort((a: any, b: any) => a.ordre - b.ordre)
          .map((p: any) => ({ heure: p.heure, action: p.action })),
      };
    });
    return {
      id: s.id,
      label: s.label,
      producteur: s.producteur,
      region: s.region,
      couleur: s.couleur,
      couleurLight: s.couleur_light,
      bestseller: s.bestseller,
      image: s.image,
      images: s.images?.length > 0 ? s.images : s.image ? [s.image] : [],
      formats,
      emoji: s.emoji ?? undefined,
      lat: s.lat ?? undefined,
      lng: s.lng ?? undefined,
      slug: s.slug ?? generateSlug(s.producteur),
      comingSoon: s.coming_soon ?? false,
    };
  });
}
