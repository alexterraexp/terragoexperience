export const REALISES_PATH = '/seminaires-realises';

/** Photos d’une journée de programme. Le bloc public garde la même taille. */
export const JOUR_PHOTO_MAX = 12;

export function realisePath(slug: string): string {
  return `${REALISES_PATH}/${slug}`;
}

export type RealiseLieu = {
  nom: string;
  photo: string;
  phrase: string;
};

export type RealiseLigne = {
  heure: string;
  action: string;
};

export type RealiseJour = {
  label: string;
  lignes: RealiseLigne[];
  photos: string[];
};

export type RealiseAvis = {
  auteur: string;
  entreprise: string;
  texte: string;
  /** 1 à 5. 0 si l’avis n’a pas de note. */
  note: number;
};

/** Récit d'un séminaire déjà vécu. `id` est l'adresse publique. */
export type SeminaireRealise = {
  id: string;
  titre: string;
  nombrePersonnes: number | null;
  lieu: string;
  duree: string;
  brief: string;
  /** Première photo, reprise sur les cartes. */
  couverture: string;
  /** Toutes les photos, dans l’ordre d’affichage. La première est la grande. */
  images: string[];
  lieux: RealiseLieu[];
  programme: RealiseJour[];
  avis: RealiseAvis[];
  publie: boolean;
  ordre: number;
};

export class RealiseInputError extends Error {}

export function emptyLieu(): RealiseLieu {
  return { nom: '', photo: '', phrase: '' };
}

export function emptyJour(label = 'Jour 1'): RealiseJour {
  return { label, lignes: [{ heure: '', action: '' }], photos: [] };
}

export function emptyAvis(): RealiseAvis {
  return { auteur: '', entreprise: '', texte: '', note: 5 };
}

export function emptyRealise(): SeminaireRealise {
  return {
    id: '',
    titre: '',
    nombrePersonnes: null,
    lieu: '',
    duree: '',
    brief: '',
    couverture: '',
    images: [],
    lieux: [],
    programme: [emptyJour()],
    avis: [],
    publie: false,
    ordre: 0,
  };
}

/** Le formulaire garde toujours un jour vide prêt à remplir, sans le compter comme une modification. */
export function forEditor(item: SeminaireRealise): SeminaireRealise {
  if (item.programme.length > 0) return item;
  return { ...item, programme: [emptyJour()] };
}

export function realiseFacts(item: Pick<SeminaireRealise, 'nombrePersonnes' | 'lieu' | 'duree'>): string[] {
  const facts: string[] = [];
  if (item.nombrePersonnes) {
    facts.push(`${item.nombrePersonnes} personne${item.nombrePersonnes > 1 ? 's' : ''}`);
  }
  if (item.lieu) facts.push(item.lieu);
  if (item.duree) facts.push(item.duree);
  return facts;
}

function clip(value: unknown, max: number): string {
  return String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
}

function paragraph(value: unknown, max: number): string {
  return String(value ?? '').replace(/\r\n/g, '\n').trim().slice(0, max);
}

function httpsUrl(value: unknown, strict: boolean): string {
  const url = paragraph(value, 500);
  if (!url) return '';
  if (!/^https:\/\//i.test(url)) {
    if (strict) throw new RealiseInputError('La photo doit être une adresse https.');
    return '';
  }
  return url;
}

function mapLieu(raw: unknown, strict: boolean): RealiseLieu | null {
  if (!raw || typeof raw !== 'object') return null;
  const row = raw as Record<string, unknown>;
  const nom = clip(row.nom, 80);
  const phrase = clip(row.phrase, 240);
  const photo = httpsUrl(row.photo, strict);
  if (!nom && !phrase && !photo) return null;
  if (strict && !nom) throw new RealiseInputError('Chaque lieu a besoin d’un nom.');
  return { nom, photo, phrase };
}

function mapLigne(raw: unknown): RealiseLigne | null {
  if (!raw || typeof raw !== 'object') return null;
  const row = raw as Record<string, unknown>;
  const heure = clip(row.heure, 40);
  const action = clip(row.action, 400);
  if (!heure && !action) return null;
  return { heure, action };
}

function mapJour(raw: unknown, index: number, strict: boolean): RealiseJour | null {
  if (!raw || typeof raw !== 'object') return null;
  const row = raw as Record<string, unknown>;
  const lignes = Array.isArray(row.lignes)
    ? row.lignes.map(mapLigne).filter((ligne): ligne is RealiseLigne => ligne != null).slice(0, 30)
    : [];
  const photos = (Array.isArray(row.photos) ? row.photos : [])
    .map((item) => httpsUrl(item, strict))
    .filter(Boolean)
    .slice(0, JOUR_PHOTO_MAX);
  if (lignes.length === 0 && photos.length === 0) return null;
  return { label: clip(row.label, 40) || `Jour ${index + 1}`, lignes, photos };
}

function mapAvis(raw: unknown, strict: boolean): RealiseAvis | null {
  if (!raw || typeof raw !== 'object') return null;
  const row = raw as Record<string, unknown>;
  const auteur = clip(row.auteur, 80);
  const entreprise = clip(row.entreprise, 80);
  const texte = paragraph(row.texte, 800);
  const noteRaw = Number(row.note);
  const note = Number.isInteger(noteRaw) && noteRaw >= 1 && noteRaw <= 5 ? noteRaw : 0;
  if (!auteur && !entreprise && !texte) return null;
  if (strict && !texte) throw new RealiseInputError('Chaque avis a besoin d’un texte.');
  if (!texte) return null;
  return { auteur, entreprise, texte, note };
}

export function parseRealise(row: Record<string, unknown>, strict = false): SeminaireRealise | null {
  const titre = clip(row.titre, 140);
  const id = clip(row.id, 80);
  if (!titre && !id) return null;
  if (strict && !titre) throw new RealiseInputError('Le titre est nécessaire.');

  const rawCount = row.nombrePersonnes ?? row.nombre_personnes;
  let nombrePersonnes: number | null = null;
  if (rawCount !== null && rawCount !== undefined && String(rawCount).trim() !== '') {
    const count = Number(rawCount);
    if (!Number.isInteger(count) || count < 1 || count > 5000) {
      if (strict) throw new RealiseInputError('Le nombre de personnes doit être entre 1 et 5000.');
    } else {
      nombrePersonnes = count;
    }
  }

  const ordreRaw = Number(row.ordre);
  const ordre = Number.isFinite(ordreRaw) ? Math.max(0, Math.min(9999, Math.round(ordreRaw))) : 0;

  const lieux = (Array.isArray(row.lieux) ? row.lieux : [])
    .map((item) => mapLieu(item, strict))
    .filter((item): item is RealiseLieu => item != null)
    .slice(0, 12);

  const programme = (Array.isArray(row.programme) ? row.programme : [])
    .map((item, index) => mapJour(item, index, strict))
    .filter((item): item is RealiseJour => item != null)
    .slice(0, 8);

  const avis = (Array.isArray(row.avis) ? row.avis : [])
    .map((item) => mapAvis(item, strict))
    .filter((item): item is RealiseAvis => item != null)
    .slice(0, 12);

  const listed = (Array.isArray(row.images) ? row.images : [])
    .map((item) => httpsUrl(item, strict))
    .filter(Boolean);
  const cover = httpsUrl(row.couverture, strict);
  const images = (listed.length > 0 ? listed : cover ? [cover] : []).slice(0, 12);

  return {
    id,
    titre,
    nombrePersonnes,
    lieu: clip(row.lieu, 80),
    duree: clip(row.duree, 40),
    brief: paragraph(row.brief, 4000),
    couverture: images[0] ?? '',
    images,
    lieux,
    programme,
    avis,
    publie: row.publie === true,
    ordre,
  };
}
