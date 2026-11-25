import type { SupabaseClient } from '@supabase/supabase-js';
import { slugifyOffre } from './studioTypes';
import {
  emptyLogement,
  logementRempli,
  parseRealise,
  RealiseInputError,
  type SeminaireRealise,
} from './seminairesRealises';

const TABLE = 'seminaires_realises';

type DbError = { code?: string; message?: string } | null;

export function isMissingRealisesTable(error: DbError): boolean {
  if (!error) return false;
  if (error.code === '42P01' || error.code === 'PGRST205') return true;
  const message = error.message?.toLowerCase() ?? '';
  return message.includes('seminaires_realises') && (
    message.includes('does not exist')
    || message.includes('could not find')
    || message.includes('schema cache')
  );
}

function toRow(item: SeminaireRealise, now: string) {
  return {
    id: item.id,
    titre: item.titre,
    nombre_personnes: item.nombrePersonnes,
    lieu: item.lieu,
    duree: item.duree,
    brief: item.brief,
    couverture: item.images[0] ?? item.couverture,
    images: item.images,
    lieux: packLieux(item),
    programme: item.programme,
    avis: item.avis,
    publie: item.publie,
    ordre: item.ordre,
    updated_at: now,
  };
}

/** Le logement voyage dans `lieux` : `{ items, logement }` dès qu’il est rempli, sinon le tableau habituel. */
function packLieux(item: SeminaireRealise): SeminaireRealise['lieux'] | { items: SeminaireRealise['lieux']; logement: SeminaireRealise['logement'] } {
  const logement = item.logement ?? emptyLogement();
  if (!logementRempli(logement)) return item.lieux;
  return { items: item.lieux, logement };
}

function fromRow(row: Record<string, unknown>): SeminaireRealise | null {
  return parseRealise({
    id: row.id,
    titre: row.titre,
    nombrePersonnes: row.nombre_personnes,
    lieu: row.lieu,
    duree: row.duree,
    brief: row.brief,
    couverture: row.couverture,
    images: row.images,
    lieux: row.lieux,
    programme: row.programme,
    avis: row.avis,
    publie: row.publie,
    ordre: row.ordre,
  });
}

export async function listPublishedRealises(db: SupabaseClient): Promise<SeminaireRealise[]> {
  const { data, error } = await db
    .from(TABLE)
    .select('*')
    .eq('publie', true)
    .order('ordre', { ascending: true })
    .order('titre', { ascending: true });
  if (error) {
    if (isMissingRealisesTable(error)) return [];
    throw new Error(error.message);
  }
  return (data ?? [])
    .map((row) => fromRow(row as Record<string, unknown>))
    .filter((item): item is SeminaireRealise => item != null && item.titre.length > 0);
}

export async function getRealiseBySlug(
  db: SupabaseClient,
  slug: string,
  includeUnpublished: boolean,
): Promise<SeminaireRealise | null> {
  const id = slug.trim();
  if (!id) return null;
  let query = db.from(TABLE).select('*').eq('id', id);
  if (!includeUnpublished) query = query.eq('publie', true);
  const { data, error } = await query.maybeSingle();
  if (error) {
    if (isMissingRealisesTable(error)) return null;
    throw new Error(error.message);
  }
  if (!data) return null;
  const item = fromRow(data as Record<string, unknown>);
  if (!item?.titre) return null;
  return item;
}

export async function listStudioRealises(
  db: SupabaseClient,
): Promise<{ realises: SeminaireRealise[]; schemaReady: boolean }> {
  const { data, error } = await db
    .from(TABLE)
    .select('*')
    .order('ordre', { ascending: true })
    .order('titre', { ascending: true });
  if (error) {
    if (isMissingRealisesTable(error)) return { realises: [], schemaReady: false };
    throw new Error(error.message);
  }
  const realises = (data ?? [])
    .map((row) => fromRow(row as Record<string, unknown>))
    .filter((item): item is SeminaireRealise => item != null);
  return { realises, schemaReady: true };
}

const STORAGE_BUCKET = 'producers';
const PUBLIC_MARKER = '/storage/v1/object/public/producers/';

function photoUrls(item: SeminaireRealise): Set<string> {
  const urls = new Set<string>();
  for (const url of item.images) if (url) urls.add(url);
  if (item.couverture) urls.add(item.couverture);
  for (const lieu of item.lieux) if (lieu.photo) urls.add(lieu.photo);
  for (const photo of item.logement?.images ?? []) if (photo) urls.add(photo);
  for (const jour of item.programme) {
    for (const photo of jour.photos) if (photo) urls.add(photo);
  }
  return urls;
}

/** Chemin d’un fichier envoyé par le studio, dans le dossier des réalisations. */
function realisationObjectPath(url: string): string | null {
  let pathname = '';
  try {
    pathname = new URL(url).pathname;
  } catch {
    return null;
  }
  const marker = pathname.indexOf(PUBLIC_MARKER);
  if (marker === -1) return null;
  let objectPath = decodeURIComponent(pathname.slice(marker + PUBLIC_MARKER.length));
  if (objectPath.startsWith('/')) objectPath = objectPath.slice(1);
  if (!objectPath.startsWith('realisations/') || objectPath.includes('..') || objectPath.includes('\\')) return null;
  return objectPath;
}

async function pathsUsedByOtherRealises(db: SupabaseClient, paths: string[], skipId: string): Promise<Set<string>> {
  const wanted = new Set(paths);
  const { data, error } = await db.from(TABLE).select('id, images, couverture, lieux, programme').neq('id', skipId);
  if (error) {
    if (isMissingRealisesTable(error)) return new Set();
    throw new Error(error.message);
  }
  const used = new Set<string>();
  for (const row of data ?? []) {
    const item = fromRow(row as Record<string, unknown>);
    if (!item) continue;
    for (const url of photoUrls(item)) {
      const path = realisationObjectPath(url);
      if (path && wanted.has(path)) used.add(path);
    }
  }
  return used;
}

async function removeRealisationFiles(db: SupabaseClient, urls: Iterable<string>, skipId: string): Promise<void> {
  const paths = [...new Set([...urls].map(realisationObjectPath).filter((path): path is string => path != null))];
  if (paths.length === 0) return;
  const stillUsed = await pathsUsedByOtherRealises(db, paths, skipId);
  const removable = paths.filter((path) => !stillUsed.has(path));
  if (removable.length === 0) return;
  const { error } = await db.storage.from(STORAGE_BUCKET).remove(removable);
  if (error) throw new Error(error.message);
}

async function nextOrdre(db: SupabaseClient): Promise<number> {
  const { data } = await db.from(TABLE).select('ordre').order('ordre', { ascending: false }).limit(1);
  const current = Number(data?.[0]?.ordre);
  return Number.isFinite(current) ? current + 1 : 1;
}

async function uniqueSlug(db: SupabaseClient, base: string): Promise<string> {
  const root = (base || 'seminaire').slice(0, 76);
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const candidate = attempt === 0 ? root : `${root}-${attempt + 1}`;
    const { data, error } = await db.from(TABLE).select('id').eq('id', candidate).maybeSingle();
    if (error) {
      if (isMissingRealisesTable(error)) {
        throw new RealiseInputError('La table Supabase n’existe pas encore. Lance le script seminaires_realises, puis réessaie.');
      }
      throw new Error(error.message);
    }
    if (!data) return candidate;
  }
  throw new RealiseInputError('Cette adresse est déjà utilisée.');
}

export async function saveStudioRealise(
  db: SupabaseClient,
  input: unknown,
  existingId: string,
): Promise<SeminaireRealise> {
  if (!input || typeof input !== 'object') throw new RealiseInputError('Fiche illisible.');
  const parsed = parseRealise(input as Record<string, unknown>, true);
  if (!parsed?.titre) throw new RealiseInputError('Le titre est nécessaire.');

  const currentId = existingId.trim();
  let id = currentId;
  let previous: SeminaireRealise | null = null;
  if (!id) {
    id = await uniqueSlug(db, slugifyOffre(parsed.id || parsed.titre));
    if (parsed.ordre <= 0) parsed.ordre = await nextOrdre(db);
  } else {
    const { data, error } = await db.from(TABLE).select('id').eq('id', id).maybeSingle();
    if (error) {
      if (isMissingRealisesTable(error)) {
        throw new RealiseInputError('La table Supabase n’existe pas encore. Lance le script seminaires_realises, puis réessaie.');
      }
      throw new Error(error.message);
    }
    if (!data) throw new RealiseInputError('Ce séminaire réalisé est introuvable.');
    previous = await getRealiseBySlug(db, id, true);
  }

  const row = toRow({ ...parsed, id }, new Date().toISOString());
  const query = currentId
    ? db.from(TABLE).update(row).eq('id', id).select('*').single()
    : db.from(TABLE).insert(row).select('*').single();
  const { data, error } = await query;
  if (error || !data) {
    if (isMissingRealisesTable(error)) {
      throw new RealiseInputError('La table Supabase n’existe pas encore. Lance le script seminaires_realises, puis réessaie.');
    }
    if (error?.message?.includes("'images'")) {
      throw new RealiseInputError('La colonne images n’existe pas encore. Lance le script seminaires_realises_images, puis réessaie.');
    }
    throw new Error(error?.message || 'Enregistrement impossible.');
  }
  const saved = fromRow(data as Record<string, unknown>);
  if (!saved) throw new Error('Enregistrement impossible.');
  if (previous) {
    const kept = photoUrls(saved);
    const dropped = [...photoUrls(previous)].filter((url) => !kept.has(url));
    await removeRealisationFiles(db, dropped, saved.id);
  }
  return saved;
}

export async function deleteStudioRealise(db: SupabaseClient, id: string): Promise<void> {
  const slug = id.trim();
  if (!slug) throw new RealiseInputError('Séminaire introuvable.');
  const existing = await getRealiseBySlug(db, slug, true);
  const { error } = await db.from(TABLE).delete().eq('id', slug);
  if (error) {
    if (isMissingRealisesTable(error)) {
      throw new RealiseInputError('La table Supabase n’existe pas encore.');
    }
    throw new Error(error.message);
  }
  if (existing) await removeRealisationFiles(db, photoUrls(existing), slug);
}
