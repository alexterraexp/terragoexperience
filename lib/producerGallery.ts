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
