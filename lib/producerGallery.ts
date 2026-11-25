import type { SupabaseClient } from '@supabase/supabase-js';
import {
  mapSupabaseRowToFull,
  type ProducerFull,
  type SupabaseProducerRow,
} from './producerTypes';

function ownImages(value: unknown): string[] {
  let source = value;
  if (typeof value === 'string' && value.trim().startsWith('[')) {
    try {
      source = JSON.parse(value) as unknown;
    } catch {
      source = [];
    }
  }
  if (!Array.isArray(source)) return [];
  return source.filter((item): item is string => typeof item === 'string' && item.trim() !== '');
}

function textField(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

/** Une fiche sans offre n’est pas dans la vue (jointure interne). On la remet au format de la vue. */
function producerAsViewRow(row: Record<string, unknown>): SupabaseProducerRow {
  return {
    id: textField(row.id),
    seminaire_id: textField(row.seminaire_id),
    name: textField(row.name),
    type: textField(row.type),
    tags: row.tags,
    rating: Number(row.rating) || 0,
    review_count: Number(row.review_count) || 0,
    capacity: textField(row.capacity),
    avatar: textField(row.avatar),
    highlight: textField(row.highlight),
    price: textField(row.price),
    description: textField(row.description),
    hero_badge: textField(row.hero_badge),
    certifications: row.certifications,
    experiences: row.experiences,
    reviews: row.reviews,
    owner: textField(row.name),
    location: '',
    region: '',
    cover: textField(row.avatar),
    gallery: [],
    bestseller: false,
  };
}

/** Page Partenaires : la vue, plus les fiches qui n’ont pas encore d’offre. */
export async function listPublicProducers(db: SupabaseClient): Promise<ProducerFull[]> {
  const view = await db.from('producers_full').select('*');
  if (view.error) throw new Error(view.error.message);
  const viewRows = (view.data ?? []) as SupabaseProducerRow[];
  const seen = new Set(viewRows.map((row) => row.id).filter(Boolean));

  const table = await db.from('producers').select('*');
  const extras = table.error
    ? []
    : ((table.data ?? []) as Record<string, unknown>[])
        .filter((row) => {
          const id = textField(row.id);
          return Boolean(id) && !seen.has(id);
        })
        .map(producerAsViewRow);

  return mapProducersWithOwnPhotos(db, [...viewRows, ...extras]);
}

export async function loadPublicProducer(db: SupabaseClient, id: string): Promise<ProducerFull | null> {
  const view = await db.from('producers_full').select('*').eq('id', id).maybeSingle();
  if (view.error) throw new Error(view.error.message);
  if (view.data) {
    const [producer] = await mapProducersWithOwnPhotos(db, [view.data as SupabaseProducerRow]);
    return producer ?? null;
  }

  const table = await db.from('producers').select('*').eq('id', id).maybeSingle();
  if (table.error) throw new Error(table.error.message);
  if (!table.data) return null;
  const [producer] = await mapProducersWithOwnPhotos(db, [producerAsViewRow(table.data as Record<string, unknown>)]);
  return producer ?? null;
}

/** La page partenaire affiche la galerie du producteur dès qu’elle existe. */
export async function mapProducersWithOwnPhotos(
  db: SupabaseClient,
  rows: SupabaseProducerRow[],
): Promise<ProducerFull[]> {
  const producers = rows.map((row) => mapSupabaseRowToFull(row));
  const ids = producers.map((producer) => producer.id).filter(Boolean);
  if (ids.length === 0) return producers;

  const withImages = await db.from('producers').select('id, images, accommodation').in('id', ids);
  const loaded = withImages.error
    ? await db.from('producers').select('id, accommodation').in('id', ids)
    : withImages;
  if (loaded.error || !loaded.data) return producers;

  const galleries = new Map<string, string[]>();
  for (const row of loaded.data) {
    const column = ownImages('images' in row ? row.images : undefined);
    const images = column.length > 0 ? column : ownImages(row.accommodation);
    if (images.length > 0) galleries.set(String(row.id), images);
  }

  const withPhotos = producers.map((producer) => {
    const images = galleries.get(producer.id);
    if (!images) return producer;
    return { ...producer, gallery: images, cover: images[0] ?? producer.cover };
  });

  const orderRows = await db.from('producers').select('id, ordre').in('id', ids);
  if (orderRows.error) return withPhotos;

  const orders = new Map<string, number>();
  for (const row of orderRows.data ?? []) {
    const ordre = Math.round(Number(row.ordre));
    if (Number.isFinite(ordre) && ordre > 0) orders.set(String(row.id), ordre);
  }

  return withPhotos.sort((a, b) => {
    const rank = (id: string) => orders.get(id) ?? Number.POSITIVE_INFINITY;
    const diff = rank(a.id) - rank(b.id);
    if (diff !== 0) return diff;
    return a.name.localeCompare(b.name, 'fr');
  });
}
