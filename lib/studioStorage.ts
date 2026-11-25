import type { SupabaseClient } from '@supabase/supabase-js';

const MARKER = '/storage/v1/object/public/';

export function storageObjectFromUrl(url: string): { bucket: string; path: string } | null {
  try {
    const pathname = new URL(url).pathname;
    const at = pathname.indexOf(MARKER);
    if (at < 0) return null;
    const rest = decodeURIComponent(pathname.slice(at + MARKER.length)).replace(/^\/+/, '');
    const slash = rest.indexOf('/');
    if (slash <= 0) return null;
    const bucket = rest.slice(0, slash);
    const path = rest.slice(slash + 1);
    if (!bucket || !path || path.includes('..') || path.includes('\\')) return null;
    return { bucket, path };
  } catch {
    return null;
  }
}

export function imageUrlList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string' && item.trim() !== '');
}

/** Retire des fichiers d’un bucket lorsqu’aucune fiche ne les cite encore. */
export async function removeUnusedStorage(
  db: SupabaseClient,
  bucket: string,
  removed: Iterable<string>,
  stillUsed: Set<string>,
): Promise<void> {
  const paths = [...new Set(
    [...removed]
      .filter((url) => !stillUsed.has(url))
      .map((url) => storageObjectFromUrl(url))
      .filter((object): object is { bucket: string; path: string } => object?.bucket === bucket)
      .map((object) => object.path),
  )];
  if (paths.length === 0) return;
  const { error } = await db.storage.from(bucket).remove(paths);
  if (error) throw new Error(error.message);
}
