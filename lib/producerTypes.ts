/**
 * Types pour les producteurs (app) et mapping depuis les champs Supabase (snake_case).
 * Champs Supabase : id, name, type, location, region, tags, rating, review_count, capacity,
 * cover, avatar, highlight, price, owner, description, hero_badge, certifications,
 * experiences, gallery, bio.
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
};

/** Row renvoyée par Supabase (snake_case) */
export type SupabaseProducerRow = {
  id: string;
  name: string;
  type: string;
  location: string;
  region: string;
  tags: string[];
  rating: number;
  review_count: number;
  capacity: string;
  cover: string;
  avatar: string;
  highlight: string;
  price: string;
  owner: string;
  description: string;
  hero_badge: string;
  certifications: string[];
  experiences: ExperienceItem[];
  gallery: string[];
  bio?: string;
  reviews?: ReviewItem[];
};

function ensureArray<T>(v: unknown): T[] {
  if (Array.isArray(v)) return v as T[];
  return [];
}

export function mapSupabaseRowToFull(row: SupabaseProducerRow): ProducerFull {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    location: row.location,
    region: row.region,
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
  };
}

export function fullToProducer(p: ProducerFull): Producer {
  return {
    id: p.id,
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
