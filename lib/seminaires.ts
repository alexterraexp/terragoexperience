import { supabase } from './supabase';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProgrammeItem { heure: string; action: string; }

export interface SeminaireHebergement {
  id: string;
  nom: string;
  type?: string;
  description?: string;
  capacite?: string;
  images: string[];
  prixNuit?: number | string | null;
  ordre: number;
}

export interface Format {
  titre: string; sous_titre: string; participants: string;
  duree: string; prix: string; inclus: string[];
  programme: ProgrammeItem[];
}

/** Identifiants des formats séminaire en base (`seminaire_formats.type`). */
export const SEMINAIRE_FORMAT_IDS = ['journee', 'residentiel'] as const;
export type SeminaireFormatId = (typeof SEMINAIRE_FORMAT_IDS)[number];

export const SEMINAIRE_FORMAT_LABELS: Record<SeminaireFormatId, string> = {
  journee: 'Séminaire à la journée',
  residentiel: 'Séminaire résidentiel',
};

const LEGACY_FORMAT_TYPE_MAP: Record<string, SeminaireFormatId | null> = {
  '1jour': 'journee',
  '2jours': 'residentiel',
  journee: 'journee',
  residentiel: 'residentiel',
  mesure: null,
};

/** Normalise un type format Supabase (ignore `mesure`, mappe les anciens ids). */
export function normalizeFormatType(type: string): SeminaireFormatId | null {
  const key = type?.trim();
  if (!key) return null;
  const mapped = LEGACY_FORMAT_TYPE_MAP[key];
  if (mapped !== undefined) return mapped;
  return null;
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
  partenaire_nom?: string;
  partenaire_logo?: string;
  partenaire_description?: string;
  partenaire_site_web?: string;
  hebergements: SeminaireHebergement[];
}

/** Nettoie les URLs média (guillemets parasites souvent collés à la saisie Supabase). */
function sanitizeMediaUrl(url: string | null | undefined): string | undefined {
  if (!url?.trim()) return undefined;
  const cleaned = url
    .trim()
    .replace(/^['"]+|['"]+$/g, '')
    .replace(/\\+['"]+$/g, '')
    .replace(/['"]+$/g, '')
    .trim();
  return cleaned || undefined;
}

function sanitizeExternalUrl(url: string | null | undefined): string | undefined {
  const cleaned = sanitizeMediaUrl(url);
  if (!cleaned) return undefined;
  if (/^https?:\/\//i.test(cleaned)) return cleaned;
  return `https://${cleaned}`;
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
    .select(`*, seminaire_formats (*, seminaire_programme (heure, action, ordre)), seminaire_hebergements (id, nom, type, description, capacite, images, prix_nuit, ordre)`)
    .order('ordre');

  if (error || !data) return [];

  return data.map((s: any) => {
    const formats: { [key: string]: Format } = {};
    (s.seminaire_formats ?? []).forEach((f: any) => {
      const type = normalizeFormatType(f.type);
      if (!type) return;
      formats[type] = {
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
      partenaire_nom: s.partenaire_nom ?? undefined,
      partenaire_logo: sanitizeMediaUrl(s.partenaire_logo),
      partenaire_description: s.partenaire_description ?? undefined,
      partenaire_site_web: sanitizeExternalUrl(s.partenaire_site_web),
      hebergements: [...(s.seminaire_hebergements ?? [])]
        .sort((a: { ordre?: number }, b: { ordre?: number }) => (a.ordre ?? 0) - (b.ordre ?? 0))
        .map((h: {
          id: string;
          nom?: string | null;
          type?: string | null;
          description?: string | null;
          capacite?: string | number | null;
          images?: string[] | null;
          prix_nuit?: number | string | null;
          ordre?: number | null;
        }) => ({
          id: h.id,
          nom: h.nom?.trim() || 'Hébergement',
          type: h.type?.trim() || undefined,
          description: h.description?.trim() || undefined,
          capacite: h.capacite != null && String(h.capacite).trim() ? String(h.capacite).trim() : undefined,
          images: (h.images ?? [])
            .map((url) => sanitizeMediaUrl(url))
            .filter((url): url is string => Boolean(url)),
          prixNuit: h.prix_nuit ?? undefined,
          ordre: h.ordre ?? 0,
        })),
    };
  });
}
