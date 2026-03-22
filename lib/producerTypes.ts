/**
 * Types pour les producteurs — lus depuis la vue Supabase `producers_full`
 * qui joint `producers` et `seminaires`.
 *
 * Champs issus de `producers` : id, seminaire_id, name, type, tags, rating,
 *   review_count, capacity, avatar, highlight, price, description, hero_badge,
 *   certifications, experiences, reviews, bio
 *
 * Champs issus de `seminaires` (via la vue) : owner, location, region, cover,
 *   gallery, lat, lng, couleur, couleur_light, seminaire_label, bestseller, emoji
 */

export type ExperienceItem = {
  id: number;
  title: string;
  duration: string;
  price: string;
  desc: string;
  icon: string;
};

export type ReviewItem = {
  author: string;
  company: string;
  date: string;
  rating: number;
  text: string;
};

export type Producer = {
  id: string;
  seminaire_id: string;
  name: string;
  type: string;
  location: string;
  region: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  capacity: string;
  cover: string;
  avatar: string;
  highlight: string;
  price: string;
};

export type ProducerFull = Producer & {
  owner: string;
  description: string;
  heroBadge: string;
  certifications: string[];
  experiences: ExperienceItem[];
  gallery: string[];
  reviews: ReviewItem[];
  lat?: number;
  lng?: number;
  couleur?: string;
  seminaireLabel?: string;
};

/** Row renvoyée par la vue `producers_full` */
export type SupabaseProducerRow = {
  id: string;
  seminaire_id: string;
  name: string;
  type: string;
  tags: string[] | unknown;
  rating: number;
  review_count: number;
  capacity: string;
  avatar: string;
  highlight: string;
  price: string;
  description: string;
  hero_badge: string;
  certifications: string[] | unknown;
  experiences: ExperienceItem[] | unknown;
  reviews: ReviewItem[] | unknown;
  bio?: string;
  // Champs hérités de seminaires (via la vue)
  owner: string;
  location: string;
  region: string;
  cover: string;
  gallery: string[] | unknown;
  lat?: number;
  lng?: number;
  couleur?: string;
  couleur_light?: string;
  seminaire_label?: string;
  bestseller?: boolean;
  emoji?: string;
};

function ensureArray<T>(v: unknown): T[] {
  if (Array.isArray(v)) return v as T[];
  if (v && typeof v === 'object') {
    // JSONB peut arriver comme objet indexé {0: ..., 1: ...}
    return Object.values(v) as T[];
  }
  return [];
}

export function mapSupabaseRowToFull(row: SupabaseProducerRow): ProducerFull {
  return {
    id: row.id,
    seminaire_id: row.seminaire_id ?? '',
    name: row.name ?? '',
    type: row.type ?? '',
    location: row.location ?? row.region ?? '',
    region: row.region ?? '',
    tags: ensureArray<string>(row.tags),
    rating: Number(row.rating) || 0,
    reviewCount: Number(row.review_count) ?? 0,
    capacity: row.capacity ?? '',
    cover: row.cover ?? '',
    avatar: row.avatar ?? '',
    highlight: row.highlight ?? '',
    price: row.price ?? '',
    owner: row.owner ?? '',
    description: row.description ?? '',
    heroBadge: row.hero_badge ?? '',
    certifications: ensureArray<string>(row.certifications),
    experiences: ensureArray<ExperienceItem>(row.experiences),
    gallery: ensureArray<string>(row.gallery),
    reviews: ensureArray<ReviewItem>(row.reviews),
    lat: row.lat ?? undefined,
    lng: row.lng ?? undefined,
    couleur: row.couleur ?? undefined,
    seminaireLabel: row.seminaire_label ?? undefined,
  };
}

export function fullToProducer(p: ProducerFull): Producer {
  return {
    id: p.id,
    seminaire_id: p.seminaire_id,
    name: p.name,
    type: p.type,
    location: p.location,
    region: p.region,
    tags: p.tags,
    rating: p.rating,
    reviewCount: p.reviewCount,
    capacity: p.capacity,
    cover: p.cover,
    avatar: p.avatar,
    highlight: p.highlight,
    price: p.price,
  };
}
