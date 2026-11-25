import type { SupabaseClient } from '@supabase/supabase-js';
import { imageUrlList, removeUnusedStorage } from './studioStorage';
import { encodeStudioExtras, OFFER_AMENITIES, OFFER_PILLS, partitionInclus } from './offerPills';
import {
  SEMINAIRE_FORMAT_IDS,
  SEMINAIRE_FORMAT_LABELS,
  normalizeFormatType,
  parseSeminaireLocation,
  type SeminaireFormatId,
} from './seminaires';
import {
  emptyFormat,
  HEBERGEMENT_TYPES,
  slugifyOffre,
  type StudioFormat,
  type StudioHebergement,
  type StudioOffre,
  type StudioStatut,
} from './studioTypes';

const OFFER_SELECT = `*, seminaire_formats (*, seminaire_programme (heure, action, ordre)), seminaire_hebergements (id, nom, type, description, capacite, images, prix_nuit, ordre)`;

const KNOWN_PILLS = new Set<string>(OFFER_PILLS.map((pill) => pill.id));
const KNOWN_AMENITIES = new Set<string>(OFFER_AMENITIES.map((item) => item.id));

type DbError = { message: string; code?: string } | null;

export class StudioInputError extends Error {}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item).trim()).filter(Boolean);
}

function sanitizeMediaUrl(url: string): string | null {
  const cleaned = url
    .trim()
    .replace(/^['"]+|['"]+$/g, '')
    .replace(/\\+['"]+$/g, '')
    .replace(/['"]+$/g, '')
    .trim();
  if (!cleaned) return null;
  let parsed: URL;
  try {
    parsed = new URL(cleaned);
  } catch {
    return null;
  }
  if (parsed.protocol !== 'https:') return null;
  const host = parsed.hostname;
  const allowed =
    host.endsWith('.supabase.co') ||
    host === 'images.unsplash.com' ||
    host === 'plus.unsplash.com';
  if (!allowed) return null;
  return parsed.toString();
}

function cleanImages(value: unknown, limit = 12): string[] {
  const seen = new Set<string>();
  const urls: string[] = [];
  for (const item of asStringArray(value)) {
    const url = sanitizeMediaUrl(item);
    if (!url || seen.has(url)) continue;
    seen.add(url);
    urls.push(url);
    if (urls.length >= limit) break;
  }
  return urls;
}

function cleanShortList(value: unknown, maxItems: number, maxLen: number): string[] {
  const seen = new Set<string>();
  const items: string[] = [];
  for (const raw of asStringArray(value)) {
    const text = raw.replace(/\s+/g, ' ').slice(0, maxLen);
    const key = text.toLowerCase();
    if (!text || seen.has(key)) continue;
    seen.add(key);
    items.push(text);
    if (items.length >= maxItems) break;
  }
  return items;
}

function cleanPills(value: unknown): string[] {
  return cleanShortList(value, 12, 32).filter((id) => KNOWN_PILLS.has(id) || /^[a-z0-9-]{1,32}$/.test(id));
}

function cleanInclus(value: unknown, hebergement: boolean): string[] {
  const ids = cleanShortList(value, 20, 40).filter((id) => KNOWN_AMENITIES.has(id) || /^[a-z0-9_]{1,40}$/.test(id));
  const set = new Set(ids);
  if (hebergement) set.add('hebergement');
  else set.delete('hebergement');
  return [...set];
}

function readFormat(raw: unknown): StudioFormat {
  if (!raw || typeof raw !== 'object') return emptyFormat(false);
  const row = raw as Record<string, unknown>;
  const programme = Array.isArray(row.programme) ? row.programme : [];
  return {
    actif: Boolean(row.actif),
    sousTitre: String(row.sousTitre ?? '').slice(0, 280),
    participants: String(row.participants ?? '').slice(0, 80),
    duree: String(row.duree ?? '').slice(0, 80),
    prix: String(row.prix ?? '').slice(0, 80),
    programme: programme
      .slice(0, 24)
      .map((line) => {
        const item = line as Record<string, unknown>;
        return {
          heure: String(item?.heure ?? '').slice(0, 40),
          action: String(item?.action ?? '').slice(0, 280),
        };
      })
      .filter((line) => line.heure.trim() || line.action.trim()),
  };
}

function hebergementType(raw: string): string | null {
  const key = raw
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  if (!key) return null;
  const known = HEBERGEMENT_TYPES.find((item) => item.id === key);
  if (!known) {
    throw new StudioInputError('Pour le logement, choisis un type : gîte, hôtel ou insolite.');
  }
  return known.id;
}

function readHebergement(raw: unknown): StudioHebergement {
  const row = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  return {
    nom: String(row.nom ?? '').slice(0, 120),
    type: String(row.type ?? '').slice(0, 80),
    description: String(row.description ?? '').slice(0, 2000),
    capacite: String(row.capacite ?? '').slice(0, 80),
    prixNuit: String(row.prixNuit ?? '').slice(0, 40),
    images: cleanImages(row.images, 8),
  };
}

export function parseStudioOffre(raw: unknown): StudioOffre {
  if (!raw || typeof raw !== 'object') {
    throw new StudioInputError('Fiche illisible.');
  }
  const row = raw as Record<string, unknown>;
  const statut = row.statut;
  if (statut !== 'brouillon' && statut !== 'bientot' && statut !== 'publie') {
    throw new StudioInputError('Choisis un statut : brouillon, bientôt ou publiée.');
  }
  const hebergement = Boolean(row.hebergement);
  const offre: StudioOffre = {
    id: String(row.id ?? '').trim(),
    producteur: String(row.producteur ?? '').trim().slice(0, 160),
    label: String(row.label ?? '').trim().slice(0, 200),
    locality: String(row.locality ?? '').trim().slice(0, 120),
    regionName: String(row.regionName ?? '').trim().slice(0, 120),
    slug: slugifyOffre(String(row.slug ?? '')),
    images: cleanImages(row.images),
    pills: cleanPills(row.pills),
    activites: cleanShortList(row.activites, 40, 120),
    inclus: cleanInclus(row.inclus, hebergement),
    statut,
    bestseller: Boolean(row.bestseller),
    hebergement,
    hebergements: Array.isArray(row.hebergements)
      ? row.hebergements.slice(0, 8).map(readHebergement)
      : [],
    journee: readFormat(row.journee),
    residentiel: readFormat(row.residentiel),
    ordre: Number.isFinite(Number(row.ordre)) ? Math.max(0, Math.round(Number(row.ordre))) : 0,
  };

  if (offre.statut !== 'brouillon') {
    if (!offre.producteur || !offre.label) {
      throw new StudioInputError('Le producteur et le titre sont obligatoires.');
    }
    if (offre.images.length === 0) {
      throw new StudioInputError('Ajoute au moins une photo.');
    }
  } else if (!offre.producteur && !offre.label) {
    throw new StudioInputError('Indique au moins un producteur ou un titre.');
  }

  if (offre.statut === 'publie') {
    const active = [offre.journee, offre.residentiel].filter((format) => format.actif);
    if (active.length === 0) {
      throw new StudioInputError('Pour publier, active le format journée ou le format résidentiel.');
    }
    if (active.some((format) => !format.sousTitre.trim())) {
      throw new StudioInputError('Ajoute la phrase courte du format activé : c’est le texte de la carte.');
    }
  }

  if (offre.hebergement) {
    for (const item of offre.hebergements) hebergementType(item.type);
  }

  if (offre.hebergement && offre.statut === 'publie') {
    const described = offre.hebergements.some((item) => item.nom.trim() || item.description.trim());
    if (!described) {
      throw new StudioInputError('Décris l’hébergement, ou décoche-le.');
    }
  }

  return offre;
}

function mapFormatRow(raw: Record<string, unknown> | undefined): StudioFormat {
  if (!raw) return emptyFormat(false);
  const programme = Array.isArray(raw.seminaire_programme) ? raw.seminaire_programme : [];
  return {
    actif: true,
    sousTitre: String(raw.sous_titre ?? ''),
    participants: String(raw.participants ?? ''),
    duree: String(raw.duree ?? ''),
    prix: String(raw.prix ?? ''),
    programme: [...programme]
      .sort((a, b) => Number((a as { ordre?: number }).ordre ?? 0) - Number((b as { ordre?: number }).ordre ?? 0))
      .map((line) => {
        const item = line as { heure?: string; action?: string };
        return { heure: item.heure ?? '', action: item.action ?? '' };
      }),
  };
}

function mapHebergementRow(raw: Record<string, unknown>): StudioHebergement {
  const prix = raw.prix_nuit;
  return {
    nom: String(raw.nom ?? ''),
    type: String(raw.type ?? ''),
    description: String(raw.description ?? ''),
    capacite: raw.capacite == null ? '' : String(raw.capacite),
    prixNuit: prix == null ? '' : String(prix),
    images: cleanImages(raw.images, 8),
  };
}

export function mapRowToOffre(row: Record<string, unknown>): StudioOffre {
  const formats = Array.isArray(row.seminaire_formats) ? row.seminaire_formats : [];
  const byType = new Map<SeminaireFormatId, Record<string, unknown>>();
  for (const format of formats) {
    const type = normalizeFormatType(String((format as { type?: string }).type ?? ''));
    if (type) byType.set(type, format as Record<string, unknown>);
  }
  const location = parseSeminaireLocation(String(row.region ?? ''));
  const hebergements = [...(Array.isArray(row.seminaire_hebergements) ? row.seminaire_hebergements : [])]
    .sort((a, b) => Number((a as { ordre?: number }).ordre ?? 0) - Number((b as { ordre?: number }).ordre ?? 0))
    .map((item) => mapHebergementRow(item as Record<string, unknown>));
  const inclus = new Set<string>();
  const encodedPills: string[] = [];
  const encodedActivites: string[] = [];
  for (const format of byType.values()) {
    const parts = partitionInclus(asStringArray(format.inclus));
    parts.inclus.forEach((id) => inclus.add(id));
    encodedPills.push(...parts.pills);
    encodedActivites.push(...parts.activites);
  }
  const images = cleanImages(row.images);
  const cover = sanitizeMediaUrl(String(row.image ?? ''));
  const gallery = images.length > 0 ? images : cover ? [cover] : [];
  let statut: StudioStatut = 'publie';
  if (row.publie === false) statut = 'brouillon';
  else if (row.coming_soon) statut = 'bientot';

  return {
    id: String(row.id ?? ''),
    producteur: String(row.producteur ?? ''),
    label: String(row.label ?? ''),
    locality: location.locality ?? '',
    regionName: location.regionName,
    slug: String(row.slug ?? ''),
    images: gallery,
    pills: cleanPills([...asStringArray(row.pills), ...encodedPills]),
    activites: cleanShortList([...asStringArray(row.activites), ...encodedActivites], 40, 120),
    inclus: [...inclus],
    statut,
    bestseller: Boolean(row.bestseller),
    hebergement: hebergements.length > 0,
    hebergements,
    journee: mapFormatRow(byType.get('journee')),
    residentiel: mapFormatRow(byType.get('residentiel')),
    ordre: Number(row.ordre ?? 0) || 0,
  };
}

export async function studioSchemaReady(db: SupabaseClient): Promise<boolean> {
  const { error } = await db.from('seminaires').select('pills, activites, publie').limit(1);
  return !error;
}

export async function listStudioOffres(db: SupabaseClient): Promise<StudioOffre[]> {
  const { data, error } = await db.from('seminaires').select(OFFER_SELECT).order('ordre');
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => mapRowToOffre(row as Record<string, unknown>));
}

function missingColumn(error: DbError): string | null {
  if (!error) return null;
  return error.message.match(/Could not find the '([^']+)' column/)?.[1] ?? null;
}

async function writeFlexible(
  db: SupabaseClient,
  table: string,
  values: Record<string, unknown>,
  id?: string,
): Promise<{ id: string; stripped: string[] }> {
  const current: Record<string, unknown> = { ...values };
  const stripped: string[] = [];

  for (let attempt = 0; attempt < 10; attempt += 1) {
    const query = id
      ? db.from(table).update(current).eq('id', id).select('id').single()
      : db.from(table).insert(current).select('id').single();
    const { data, error } = await query;
    if (!error && data?.id) return { id: String(data.id), stripped };

    const missing = missingColumn(error);
    if (missing && missing in current) {
      stripped.push(missing);
      delete current[missing];
      continue;
    }

    const nullCol = error?.message.match(/null value in column "([^"]+)"/)?.[1];
    if (nullCol === 'id' && !id && current.id == null) {
      current.id = crypto.randomUUID();
      continue;
    }
    if (nullCol === 'couleur' && current.couleur == null) {
      current.couleur = '#0c1d22';
      continue;
    }
    if (nullCol === 'couleur_light' && current.couleur_light == null) {
      current.couleur_light = '#f4f4f4';
      continue;
    }
    if (nullCol === 'image' && (current.image == null || current.image === '')) {
      const images = current.images;
      current.image = Array.isArray(images) && images.length > 0 ? images[0] : '';
      continue;
    }
    if (nullCol === 'ordre' && current.ordre == null) {
      current.ordre = 0;
      continue;
    }
    if (nullCol === 'bestseller') {
      current.bestseller = false;
      continue;
    }
    if (nullCol === 'coming_soon') {
      current.coming_soon = false;
      continue;
    }

    throw new Error(error?.message || 'Enregistrement impossible.');
  }

  throw new Error('Enregistrement impossible.');
}

async function replaceProgramme(
  db: SupabaseClient,
  formatId: string,
  seminaireId: string,
  formatType: SeminaireFormatId | '',
  lignes: StudioFormat['programme'],
): Promise<void> {
  const clean = lignes
    .map((line) => ({ heure: line.heure.trim(), action: line.action.trim() }))
    .filter((line) => line.heure || line.action)
    .slice(0, 24);

  const existing = await db.from('seminaire_programme').select('id').eq('format_id', formatId);
  if (existing.error) throw new Error(existing.error.message);
  const previousIds = (existing.data ?? []).map((row) => String(row.id)).filter(Boolean);
  const insertedIds: string[] = [];

  try {
    for (const [index, line] of clean.entries()) {
      const id = crypto.randomUUID();
      const inserted = await db.from('seminaire_programme').insert({
        id,
        format_id: formatId,
        seminaire_id: seminaireId,
        format_type: formatType || null,
        heure: line.heure,
        action: line.action,
        ordre: index + 1,
      });
      if (inserted.error) throw new Error(inserted.error.message);
      insertedIds.push(id);
    }
    if (previousIds.length > 0) {
      const deleted = await db.from('seminaire_programme').delete().in('id', previousIds);
      if (deleted.error) throw new Error(deleted.error.message);
    }
  } catch (error) {
    if (insertedIds.length > 0) {
      await db.from('seminaire_programme').delete().in('id', insertedIds);
    }
    throw error;
  }
}

function formatRow(seminaireId: string, type: SeminaireFormatId, format: StudioFormat, offre: StudioOffre) {
  return {
    seminaire_id: seminaireId,
    type,
    titre: SEMINAIRE_FORMAT_LABELS[type],
    sous_titre: format.sousTitre.trim() || offre.label,
    participants: format.participants.trim() || 'Sur demande',
    duree: format.duree.trim() || (type === 'journee' ? '1 journée' : '2 jours'),
    prix: format.prix.trim() || 'Tarif sur demande',
    inclus: offre.inclus,
    ordre: type === 'journee' ? 0 : 1,
  };
}

async function syncFormats(db: SupabaseClient, seminaireId: string, offre: StudioOffre): Promise<void> {
  const { data, error } = await db.from('seminaire_formats').select('id, type').eq('seminaire_id', seminaireId);
  if (error) throw new Error(error.message);
  const existing = new Map<SeminaireFormatId, string>();
  for (const row of data ?? []) {
    const type = normalizeFormatType(String(row.type ?? ''));
    if (type && row.id) existing.set(type, String(row.id));
  }

  for (const type of SEMINAIRE_FORMAT_IDS) {
    const draft = offre[type];
    const previousId = existing.get(type);
    if (!draft.actif) {
      if (previousId) {
        await replaceProgramme(db, previousId, seminaireId, type, []);
        const deleted = await db.from('seminaire_formats').delete().eq('id', previousId);
        if (deleted.error) throw new Error(deleted.error.message);
      }
      continue;
    }
    const row = formatRow(seminaireId, type, draft, offre);
    const written = previousId
      ? await writeFlexible(db, 'seminaire_formats', row, previousId)
      : await writeFlexible(db, 'seminaire_formats', row);
    await replaceProgramme(db, written.id, seminaireId, type, draft.programme);
  }
}

async function syncHebergements(db: SupabaseClient, seminaireId: string, offre: StudioOffre): Promise<void> {
  const existing = await db.from('seminaire_hebergements').select('id').eq('seminaire_id', seminaireId);
  if (existing.error) throw new Error(existing.error.message);
  const previousIds = (existing.data ?? []).map((row) => String(row.id)).filter(Boolean);

  const rows = offre.hebergement
    ? offre.hebergements
      .filter((item) =>
        item.nom.trim() ||
        item.description.trim() ||
        item.type.trim() ||
        item.capacite.trim() ||
        item.prixNuit.trim() ||
        item.images.length > 0,
      )
      .map((item, index) => ({
        id: crypto.randomUUID(),
        seminaire_id: seminaireId,
        nom: item.nom.trim() || 'Hébergement',
        type: hebergementType(item.type),
        description: item.description.trim() || null,
        capacite: item.capacite.trim() || null,
        images: item.images,
        prix_nuit: item.prixNuit.trim() || null,
        ordre: index,
      }))
    : [];

  const insertedIds: string[] = [];
  try {
    for (const row of rows) {
      const written = await writeFlexible(db, 'seminaire_hebergements', row);
      insertedIds.push(written.id);
    }
    if (previousIds.length > 0) {
      const deleted = await db.from('seminaire_hebergements').delete().in('id', previousIds);
      if (deleted.error) throw new Error(deleted.error.message);
    }
  } catch (error) {
    if (insertedIds.length > 0) {
      await db.from('seminaire_hebergements').delete().in('id', insertedIds);
    }
    throw error;
  }
}

async function uniqueId(db: SupabaseClient, wished: string): Promise<string> {
  const base = wished || 'offre';
  for (let i = 0; i < 20; i += 1) {
    const candidate = i === 0 ? base : `${base}-${i + 1}`;
    const { data, error } = await db.from('seminaires').select('id').eq('id', candidate).maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) return candidate;
  }
  return `${base}-${crypto.randomUUID().slice(0, 8)}`;
}

async function uniqueSlug(db: SupabaseClient, wished: string, currentId: string): Promise<string> {
  let slug = wished || 'offre';
  for (let i = 0; i < 20; i += 1) {
    const candidate = i === 0 ? slug : `${slug}-${i + 1}`;
    const { data, error } = await db.from('seminaires').select('id').eq('slug', candidate).maybeSingle();
    if (error) throw new Error(error.message);
    if (!data || String(data.id) === currentId) return candidate;
  }
  return `${slug}-${crypto.randomUUID().slice(0, 8)}`;
}

async function nextOrdre(db: SupabaseClient): Promise<number> {
  const { data } = await db
    .from('seminaires')
    .select('ordre')
    .order('ordre', { ascending: false })
    .limit(1);
  const current = Number(data?.[0]?.ordre ?? 0);
  return (Number.isFinite(current) ? current : 0) + 1;
}

function schemaWarning(stripped: string[]): string | undefined {
  const missing = stripped.filter((column) => column === 'pills' || column === 'activites' || column === 'publie');
  if (missing.length === 0) return undefined;
  return 'Enregistré. Les pilules et les activités sont visibles sur le catalogue. Le statut brouillon attend encore une colonne Supabase.';
}

function listedImages(value: unknown): string[] {
  return imageUrlList(value);
}

async function photosOfOffer(db: SupabaseClient, id: string): Promise<string[]> {
  const [offer, stays] = await Promise.all([
    db.from('seminaires').select('images').eq('id', id).maybeSingle(),
    db.from('seminaire_hebergements').select('images').eq('seminaire_id', id),
  ]);
  if (offer.error) throw new Error(offer.error.message);
  if (stays.error) throw new Error(stays.error.message);
  return [
    ...listedImages(offer.data?.images),
    ...(stays.data ?? []).flatMap((row) => listedImages(row.images)),
  ];
}

async function allSeminarPhotoUrls(db: SupabaseClient): Promise<Set<string>> {
  const [offers, stays] = await Promise.all([
    db.from('seminaires').select('images'),
    db.from('seminaire_hebergements').select('images'),
  ]);
  if (offers.error) throw new Error(offers.error.message);
  if (stays.error) throw new Error(stays.error.message);
  const used = new Set<string>();
  for (const row of offers.data ?? []) {
    for (const url of listedImages(row.images)) used.add(url);
  }
  for (const row of stays.data ?? []) {
    for (const url of listedImages(row.images)) used.add(url);
  }
  return used;
}

async function dropSeminarPhotos(db: SupabaseClient, removed: string[]): Promise<void> {
  if (removed.length === 0) return;
  const still = await allSeminarPhotoUrls(db);
  await removeUnusedStorage(db, 'seminaires', removed, still);
}

export async function saveStudioOffre(
  db: SupabaseClient,
  raw: unknown,
): Promise<{ offre: StudioOffre; warning?: string }> {
  const offre = parseStudioOffre(raw);
  const ready = await studioSchemaReady(db);
  if (offre.statut === 'brouillon' && !ready) {
    throw new StudioInputError(
      'Le brouillon ne peut pas être masqué tant que la colonne publie n’existe pas dans Supabase. Utilise « Bientôt » en attendant.',
    );
  }
  const slug = await uniqueSlug(
    db,
    offre.slug || slugifyOffre(offre.producteur || offre.label),
    offre.id,
  );
  const region = [offre.locality, offre.regionName].filter(Boolean).join(', ');
  const ordre = offre.id ? offre.ordre : offre.ordre > 0 ? offre.ordre : await nextOrdre(db);
  const values: Record<string, unknown> = {
    ...(offre.id
      ? {}
      : {
          id: await uniqueId(db, slugifyOffre(offre.producteur || offre.label || slug)),
          couleur: '#0c1d22',
          couleur_light: '#f4f4f4',
        }),
    producteur: offre.producteur || offre.label || 'Brouillon',
    label: offre.label || offre.producteur || 'Brouillon',
    region: region || 'France',
    slug,
    image: offre.images[0] ?? '',
    images: offre.images,
    pills: offre.pills,
    activites: offre.activites,
    publie: offre.statut !== 'brouillon',
    coming_soon: offre.statut === 'bientot',
    bestseller: offre.bestseller,
    ordre,
  };

  const created = !offre.id;
  let savedId = '';
  const previousPhotos = offre.id ? await photosOfOffer(db, offre.id) : [];
  try {
    const written = offre.id
      ? await writeFlexible(db, 'seminaires', values, offre.id)
      : await writeFlexible(db, 'seminaires', values);

    savedId = written.id;
    const synced = ready
      ? offre
      : { ...offre, inclus: encodeStudioExtras(offre.inclus, offre.pills, offre.activites) };
    await syncFormats(db, savedId, synced);
    await syncHebergements(db, savedId, offre);

    const { data, error } = await db.from('seminaires').select(OFFER_SELECT).eq('id', savedId).single();
    if (error || !data) throw new Error(error?.message || 'Offre introuvable après enregistrement.');
    const saved = mapRowToOffre(data as Record<string, unknown>);
    const kept = new Set<string>([
      ...saved.images,
      ...saved.hebergements.flatMap((item) => item.images),
    ]);
    let warning = schemaWarning(written.stripped);
    try {
      await dropSeminarPhotos(db, previousPhotos.filter((url) => !kept.has(url)));
    } catch (storageError) {
      const detail = storageError instanceof Error ? storageError.message : 'suppression impossible';
      warning = [warning, `Les photos retirées sont encore dans le bucket séminaires (${detail}).`]
        .filter(Boolean)
        .join(' ');
    }
    return { offre: saved, warning };
  } catch (error) {
    if (created && savedId) {
      await deleteStudioOffre(db, savedId).catch(() => undefined);
    }
    throw error;
  }
}

export async function deleteStudioOffre(db: SupabaseClient, id: string): Promise<void> {
  const previousPhotos = await photosOfOffer(db, id);
  const { data: formats, error: formatsError } = await db
    .from('seminaire_formats')
    .select('id')
    .eq('seminaire_id', id);
  if (formatsError) throw new Error(formatsError.message);

  for (const format of formats ?? []) {
    if (format.id) await replaceProgramme(db, String(format.id), id, '', []);
  }

  const deletedFormats = await db.from('seminaire_formats').delete().eq('seminaire_id', id);
  if (deletedFormats.error) throw new Error(deletedFormats.error.message);
  const deletedStays = await db.from('seminaire_hebergements').delete().eq('seminaire_id', id);
  if (deletedStays.error) throw new Error(deletedStays.error.message);

  const linked = await db
    .from('producers')
    .select('id, description, bio, reviews, experiences')
    .eq('seminaire_id', id);
  if (linked.error) throw new Error(linked.error.message);
  for (const producer of linked.data ?? []) {
    const reviews = Array.isArray(producer.reviews) ? producer.reviews : [];
    const experiences = Array.isArray(producer.experiences) ? producer.experiences : [];
    const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '');
    const empty = !text(producer.description)
      && !text(producer.bio)
      && reviews.length === 0
      && experiences.length === 0;
    const cleared = empty
      ? await db.from('producers').delete().eq('id', producer.id)
      : await db.from('producers').update({ seminaire_id: null }).eq('id', producer.id);
    if (cleared.error) throw new Error(cleared.error.message);
  }

  const deleted = await db.from('seminaires').delete().eq('id', id);
  if (deleted.error) {
    if (deleted.error.code === '23503' || /foreign key/i.test(deleted.error.message)) {
      throw new StudioInputError(
        'Cette offre est liée à un producteur ou à des demandes. Passe-la en brouillon pour la retirer du catalogue.',
      );
    }
    throw new Error(deleted.error.message);
  }
  await dropSeminarPhotos(db, previousPhotos);
}
