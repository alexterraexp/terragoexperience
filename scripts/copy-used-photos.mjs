/**
 * Copie les photos déjà utilisées vers les buckets `seminaires` et `producteurs`.
 * Les fichiers d’origine, dans `producers`, restent en place : d’autres pages du site les citent.
 * Relancer le script est sans effet sur une galerie producteur déjà remplie.
 */
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquante.');
  process.exit(1);
}

const db = createClient(url, key, { auth: { persistSession: false } });
const cache = new Map();

const CONTENT_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
};

function bucketOf(value) {
  try {
    const match = new URL(value).pathname.match(/\/storage\/v1\/object\/public\/([^/]+)\//);
    return match ? match[1] : '';
  } catch {
    return '';
  }
}

async function copyTo(source, bucket) {
  const current = String(source ?? '').trim();
  if (!current) return '';
  if (bucketOf(current) === bucket) return current;
  const key = `${bucket}|${current}`;
  if (cache.has(key)) return cache.get(key);

  const response = await fetch(current);
  if (!response.ok) throw new Error(`Lecture impossible (${response.status}) : ${current}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const ext = (new URL(current).pathname.match(/\.(jpe?g|png|webp|gif|avif)$/i)?.[0] || '.webp').toLowerCase();
  const path = `${crypto.randomUUID()}${ext}`;
  const uploaded = await db.storage.from(bucket).upload(path, bytes, {
    contentType: CONTENT_TYPES[ext] || 'image/webp',
    upsert: false,
  });
  if (uploaded.error) throw new Error(uploaded.error.message);
  const publicUrl = db.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  cache.set(key, publicUrl);
  console.log(bucket, path);
  return publicUrl;
}

async function rewrite(table, id, images, bucket) {
  const next = [];
  const seen = new Set();
  for (const image of images) {
    const copied = await copyTo(image, bucket);
    if (!copied || seen.has(copied)) continue;
    seen.add(copied);
    next.push(copied);
  }
  if (JSON.stringify(next) === JSON.stringify(images)) return next;
  const updated = await db.from(table).update({ images: next }).eq('id', id);
  if (updated.error) throw new Error(`${table} ${id} : ${updated.error.message}`);
  return next;
}

function storedGallery(value) {
  if (Array.isArray(value)) return value.filter((item) => typeof item === 'string' && item);
  if (typeof value === 'string' && value.trim().startsWith('[')) {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string' && item) : [];
    } catch {
      return [];
    }
  }
  return [];
}

const seminars = await db.from('seminaires').select('id, images');
const stays = await db.from('seminaire_hebergements').select('id, images');
const producers = await db.from('producers').select('id, seminaire_id, images, accommodation');
const producersRows = producers.error
  ? await db.from('producers').select('id, seminaire_id, accommodation')
  : producers;
if (seminars.error) throw new Error(seminars.error.message);
if (stays.error) throw new Error(stays.error.message);
if (producersRows.error) throw new Error(producersRows.error.message);

const galleries = new Map();
for (const row of seminars.data ?? []) {
  const images = Array.isArray(row.images) ? row.images : [];
  galleries.set(row.id, images);
  await rewrite('seminaires', row.id, images, 'seminaires');
}
for (const row of stays.data ?? []) {
  const images = Array.isArray(row.images) ? row.images : [];
  await rewrite('seminaire_hebergements', row.id, images, 'seminaires');
}
for (const row of producersRows.data ?? []) {
  const existing = storedGallery(row.images).length > 0 ? storedGallery(row.images) : storedGallery(row.accommodation);
  if (existing.length > 0) continue;
  const source = galleries.get(row.seminaire_id) ?? [];
  if (source.length === 0) continue;
  const next = [];
  const seen = new Set();
  for (const image of source) {
    const copied = await copyTo(image, 'producteurs');
    if (!copied || seen.has(copied)) continue;
    seen.add(copied);
    next.push(copied);
  }
  const updated = await db.from('producers').update({ accommodation: JSON.stringify(next) }).eq('id', row.id);
  if (updated.error) throw new Error(`producers ${row.id} : ${updated.error.message}`);
}

console.log(`Copie terminée. ${cache.size} fichier(s) envoyé(s).`);
