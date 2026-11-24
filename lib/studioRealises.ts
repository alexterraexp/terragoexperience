import type { SupabaseClient } from '@supabase/supabase-js';
import { slugifyOffre } from './studioTypes';
import {
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
    lieux: item.lieux,
    programme: item.programme,
    avis: item.avis,
    publie: item.publie,
    ordre: item.ordre,
    updated_at: now,
  };
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
  return saved;
}

export async function deleteStudioRealise(db: SupabaseClient, id: string): Promise<void> {
  const slug = id.trim();
  if (!slug) throw new RealiseInputError('Séminaire introuvable.');
  const { error } = await db.from(TABLE).delete().eq('id', slug);
  if (error) {
    if (isMissingRealisesTable(error)) {
      throw new RealiseInputError('La table Supabase n’existe pas encore.');
    }
    throw new Error(error.message);
  }
}
