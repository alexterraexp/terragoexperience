import type { SupabaseClient } from '@supabase/supabase-js';
import { StudioInputError } from './studioOffres';
import { slugifyOffre } from './studioTypes';

export type StudioExperience = {
  id: number;
  icon: string;
  title: string;
  duration: string;
  price: string;
  season: string;
  desc: string;
};

export type StudioAvis = {
  author: string;
  company: string;
  date: string;
  rating: number;
  text: string;
};

export type StudioOffreLien = {
  id: string;
  producteur: string;
  label: string;
  slug: string;
  producteurId: string;
};

/** Fiche producteur éditée dans l’espace fondateurs. Les photos du lieu restent sur l’offre. */
export type StudioProducteur = {
  id: string;
  seminaireId: string;
  name: string;
  type: string;
  bio: boolean;
  heroBadge: string;
  avatar: string;
  highlight: string;
  description: string;
  tags: string[];
  certifications: string[];
  experiences: StudioExperience[];
  reviews: StudioAvis[];
  offreLabel: string;
  offreSlug: string;
};

export function emptyProducteur(): StudioProducteur {
  return {
    id: '',
    seminaireId: '',
    name: '',
    type: '',
    bio: false,
    heroBadge: '',
    avatar: '',
    highlight: '',
    description: '',
    tags: [],
    certifications: [],
    experiences: [],
    reviews: [],
    offreLabel: '',
    offreSlug: '',
  };
}

export function emptyExperience(id: number): StudioExperience {
  return { id, icon: '🌿', title: '', duration: '', price: '', season: '', desc: '' };
}

function clip(value: unknown, max: number): string {
  return String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
}

function paragraph(value: unknown, max: number): string {
  return String(value ?? '').trim().slice(0, max);
}

function stringList(value: unknown, maxItems: number, maxLen: number): string[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const list: string[] = [];
  for (const item of value) {
    const text = clip(item, maxLen);
    if (!text || seen.has(text.toLowerCase())) continue;
    seen.add(text.toLowerCase());
    list.push(text);
    if (list.length >= maxItems) break;
  }
  return list;
}

function imageUrl(value: unknown): string {
  const url = paragraph(value, 500);
  if (!url) return '';
  if (!/^https?:\/\//i.test(url)) {
    throw new StudioInputError('La photo doit être une adresse https.');
  }
  return url;
}

function mapExperience(raw: unknown, index: number, strict: boolean): StudioExperience | null {
  if (!raw || typeof raw !== 'object') return null;
  const row = raw as Record<string, unknown>;
  const title = clip(row.title, 160);
  const desc = paragraph(row.desc, 2000);
  const duration = clip(row.duration, 40);
  const price = clip(row.price, 40);
  const season = clip(row.season, 80);
  if (!title && !desc && !duration && !price && !season) return null;
  if (strict && !title) throw new StudioInputError('Chaque expérience a besoin d’un titre.');
  const id = Number(row.id);
  return {
    id: Number.isFinite(id) && id > 0 ? Math.round(id) : index + 1,
    icon: clip(row.icon, 16) || '🌿',
    title,
    duration,
    price,
    season,
    desc,
  };
}

function mapReview(raw: unknown): StudioAvis | null {
  if (!raw || typeof raw !== 'object') return null;
  const row = raw as Record<string, unknown>;
  const author = clip(row.author, 80);
  const company = clip(row.company, 80);
  const date = clip(row.date, 40);
  const text = paragraph(row.text, 2000);
  if (!author && !text && !company) return null;
  const rating = Number(row.rating);
  return {
    author,
    company,
    date,
    rating: Number.isFinite(rating) ? Math.min(5, Math.max(0, Math.round(rating))) : 0,
    text,
  };
}

function mapRow(row: Record<string, unknown>, offers: Map<string, { label: string; producteur: string; slug: string }>): StudioProducteur {
  const seminaireId = clip(row.seminaire_id, 80);
  const offer = offers.get(seminaireId);
  const experiences = Array.isArray(row.experiences)
    ? row.experiences
        .map((item, index) => mapExperience(item, index, false))
        .filter((item): item is StudioExperience => item != null)
    : [];
  const reviews = Array.isArray(row.reviews)
    ? row.reviews.map(mapReview).filter((item): item is StudioAvis => item != null)
    : [];
  return {
    id: clip(row.id, 80),
    seminaireId,
    name: clip(row.name, 160),
    type: clip(row.type, 160),
    bio: row.bio === true,
    heroBadge: clip(row.hero_badge, 40),
    avatar: paragraph(row.avatar, 500),
    highlight: clip(row.highlight, 240),
    description: paragraph(row.description, 8000),
    tags: stringList(row.tags, 16, 80),
    certifications: stringList(row.certifications, 16, 80),
    experiences,
    reviews,
    offreLabel: offer ? clip(offer.label || offer.producteur, 160) : '',
    offreSlug: offer?.slug ? slugifyOffre(offer.slug) : '',
  };
}

type OfferRow = { id: string; producteur: string; label: string; slug: string };

async function loadOffers(db: SupabaseClient): Promise<OfferRow[]> {
  const { data, error } = await db.from('seminaires').select('id, producteur, label, slug').order('ordre');
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    id: clip(row.id, 80),
    producteur: clip(row.producteur, 160),
    label: clip(row.label, 160),
    slug: slugifyOffre(String(row.slug ?? '')),
  }));
}

function withLinks(producteurs: StudioProducteur[], offers: OfferRow[]): StudioOffreLien[] {
  const linked = new Map(
    producteurs.filter((item) => item.seminaireId).map((item) => [item.seminaireId, item.id]),
  );
  return offers.map((offer) => ({
    ...offer,
    producteurId: linked.get(offer.id) ?? '',
  }));
}

export async function listStudioProducteurs(
  db: SupabaseClient,
): Promise<{ producteurs: StudioProducteur[]; offres: StudioOffreLien[] }> {
  const [rows, offers] = await Promise.all([
    db.from('producers').select('*').order('name'),
    loadOffers(db),
  ]);
  if (rows.error) throw new Error(rows.error.message);
  const offerMap = new Map(offers.map((offer) => [offer.id, offer]));
  const producteurs = ((rows.data ?? []) as Record<string, unknown>[])
    .map((row) => mapRow(row, offerMap))
    .sort((a, b) => a.name.localeCompare(b.name, 'fr'));
  return { producteurs, offres: withLinks(producteurs, offers) };
}

export function parseStudioProducteur(input: unknown, id: string): StudioProducteur {
  const body = input && typeof input === 'object' ? (input as Record<string, unknown>) : {};
  const experiences = Array.isArray(body.experiences)
    ? body.experiences
        .map((item, index) => mapExperience(item, index, true))
        .filter((item): item is StudioExperience => item != null)
        .slice(0, 24)
    : [];
  const reviews = Array.isArray(body.reviews)
    ? body.reviews
        .map(mapReview)
        .filter((item): item is StudioAvis => item != null)
        .slice(0, 20)
    : [];
  const producteur: StudioProducteur = {
    ...emptyProducteur(),
    id,
    seminaireId: clip(body.seminaireId, 80),
    name: clip(body.name, 160),
    type: clip(body.type, 160),
    bio: body.bio === true,
    heroBadge: clip(body.heroBadge, 40),
    avatar: imageUrl(body.avatar),
    highlight: clip(body.highlight, 240),
    description: paragraph(body.description, 8000),
    tags: stringList(body.tags, 16, 80),
    certifications: stringList(body.certifications, 16, 80),
    experiences,
    reviews,
  };
  if (!producteur.name) throw new StudioInputError('Le nom du producteur est obligatoire.');
  return producteur;
}

function toRow(producteur: StudioProducteur, id: string) {
  return {
    id,
    seminaire_id: producteur.seminaireId || null,
    name: producteur.name,
    type: producteur.type || null,
    bio: producteur.bio,
    hero_badge: producteur.heroBadge || null,
    avatar: producteur.avatar || null,
    highlight: producteur.highlight || null,
    title: producteur.highlight || null,
    description: producteur.description || null,
    tags: producteur.tags,
    certifications: producteur.certifications,
    experiences: producteur.experiences.map((item, index) => {
      const row: Record<string, string | number> = {
        id: index + 1,
        icon: item.icon || '🌿',
        title: item.title,
        duration: item.duration,
        desc: item.desc,
      };
      if (item.price) row.price = item.price;
      if (item.season) row.season = item.season;
      return row;
    }),
    reviews: producteur.reviews.map((item) => ({
      author: item.author,
      company: item.company,
      date: item.date,
      rating: item.rating,
      text: item.text,
    })),
  };
}

async function assertOfferLink(db: SupabaseClient, seminaireId: string, producteurId: string) {
  if (!seminaireId) return;
  const offer = await db.from('seminaires').select('id').eq('id', seminaireId).maybeSingle();
  if (offer.error) throw new Error(offer.error.message);
  if (!offer.data) throw new StudioInputError('Cette offre est introuvable.');

  const taken = await db.from('producers').select('id, name').eq('seminaire_id', seminaireId);
  if (taken.error) throw new Error(taken.error.message);
  const other = (taken.data ?? []).find((row) => row.id !== producteurId);
  if (other) {
    const name = clip(other.name, 80) || 'Un autre producteur';
    throw new StudioInputError(`Cette offre est déjà liée à ${name}.`);
  }
}

async function uniqueId(db: SupabaseClient, base: string): Promise<string> {
  const slug = slugifyOffre(base) || 'producteur';
  for (let i = 0; i < 20; i += 1) {
    const candidate = i === 0 ? slug : `${slug}-${i + 1}`;
    const { data, error } = await db.from('producers').select('id').eq('id', candidate).maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) return candidate;
  }
  return `${slug}-${crypto.randomUUID().slice(0, 8)}`;
}

async function readOne(db: SupabaseClient, id: string): Promise<StudioProducteur> {
  const [row, offers] = await Promise.all([
    db.from('producers').select('*').eq('id', id).single(),
    loadOffers(db),
  ]);
  if (row.error || !row.data) throw new Error(row.error?.message || 'Producteur introuvable.');
  return mapRow(row.data as Record<string, unknown>, new Map(offers.map((offer) => [offer.id, offer])));
}

function raiseWrite(error: { message: string; code?: string }): never {
  if (error.code === '23503') {
    throw new StudioInputError('Cette offre est introuvable, ou la fiche est encore utilisée.');
  }
  throw new Error(error.message);
}

async function slugsFor(db: SupabaseClient, seminaireIds: string[]): Promise<string[]> {
  const ids = [...new Set(seminaireIds.map((id) => id.trim()).filter(Boolean))];
  if (ids.length === 0) return [];
  const { data, error } = await db.from('seminaires').select('slug').in('id', ids);
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => slugifyOffre(String(row.slug ?? ''))).filter(Boolean);
}

export async function saveStudioProducteur(
  db: SupabaseClient,
  input: unknown,
  id: string,
): Promise<{ producteur: StudioProducteur; slugs: string[] }> {
  const creating = !id;
  const producteur = parseStudioProducteur(input, id);
  const savedId = creating ? await uniqueId(db, producteur.name) : id;
  await assertOfferLink(db, producteur.seminaireId, savedId);

  let previousSeminaireId = '';
  if (!creating) {
    const existing = await db.from('producers').select('id, seminaire_id').eq('id', savedId).maybeSingle();
    if (existing.error) throw new Error(existing.error.message);
    if (!existing.data) throw new StudioInputError('Producteur introuvable.');
    previousSeminaireId = clip(existing.data.seminaire_id, 80);
  }

  const row = toRow(producteur, savedId);
  if (creating) {
    const inserted = await db.from('producers').insert(row);
    if (inserted.error) raiseWrite(inserted.error);
  } else {
    const { id: _ignored, ...values } = row;
    const updated = await db.from('producers').update(values).eq('id', savedId);
    if (updated.error) raiseWrite(updated.error);
  }

  return {
    producteur: await readOne(db, savedId),
    slugs: await slugsFor(db, [previousSeminaireId, producteur.seminaireId]),
  };
}

export async function deleteStudioProducteur(
  db: SupabaseClient,
  id: string,
): Promise<{ slugs: string[] }> {
  const existing = await db.from('producers').select('id, seminaire_id').eq('id', id).maybeSingle();
  if (existing.error) throw new Error(existing.error.message);
  if (!existing.data) throw new StudioInputError('Producteur introuvable.');
  const slugs = await slugsFor(db, [clip(existing.data.seminaire_id, 80)]);
  const deleted = await db.from('producers').delete().eq('id', id);
  if (deleted.error) raiseWrite(deleted.error);
  return { slugs };
}
