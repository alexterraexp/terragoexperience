import type { SupabaseClient } from '@supabase/supabase-js';
import { slugifyOffre } from './studioTypes';

const TABLE = 'blog_posts';

export class ArticleInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ArticleInputError';
  }
}

export type StudioArticle = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  coverUrl: string;
  readingTime: string;
  published: boolean;
  featured: boolean;
  publishedAt: string | null;
};

export function emptyArticle(): StudioArticle {
  return {
    id: '',
    slug: '',
    title: '',
    description: '',
    content: '',
    category: '',
    coverUrl: '',
    readingTime: '',
    published: false,
    featured: false,
    publishedAt: null,
  };
}

function text(value: unknown, max: number): string {
  return String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
}

function body(value: unknown, max: number): string {
  return String(value ?? '').replace(/\r\n/g, '\n').trim().slice(0, max);
}

export function estimateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  if (words === 0) return '';
  return `${Math.max(1, Math.round(words / 200))} min`;
}

export function parseArticle(row: Record<string, unknown>, strict: boolean): StudioArticle | null {
  const title = text(row.title, 180);
  const slug = String(row.slug ?? '').trim().slice(0, 96);
  const description = text(row.description, 400);
  const content = body(row.content, 100000);
  const category = text(row.category, 60);
  const coverUrl = text(row.coverUrl ?? row.cover_url, 500);
  let readingTime = text(row.readingTime ?? row.reading_time, 24);
  const published = Boolean(row.published);
  const featured = Boolean(row.featured);
  const publishedAt = row.publishedAt ?? row.published_at;
  const publishedAtText = typeof publishedAt === 'string' && publishedAt ? publishedAt : null;

  if (strict) {
    if (!title) throw new ArticleInputError('Le titre est nécessaire.');
    if (coverUrl && !/^https:\/\//.test(coverUrl)) {
      throw new ArticleInputError('La photo de couverture doit être une adresse https.');
    }
    if (!readingTime) readingTime = estimateReadingTime(content);
  }

  if (!strict && !title && !slug) return null;

  return {
    id: text(row.id, 80),
    slug,
    title,
    description,
    content,
    category,
    coverUrl,
    readingTime,
    published,
    featured: published && featured,
    publishedAt: publishedAtText,
  };
}

function articleDate(value: string | null, published: boolean, now: string): string | null {
  if (value) {
    const date = /^\d{4}-\d{2}-\d{2}$/.test(value)
      ? new Date(`${value}T12:00:00.000Z`)
      : new Date(value);
    if (Number.isNaN(date.getTime())) throw new ArticleInputError('Cette date n’est pas valide.');
    return date.toISOString();
  }
  return published ? now : null;
}

function toRow(item: StudioArticle, now: string, publishedAt: string | null) {
  return {
    slug: item.slug,
    title: item.title,
    description: item.description || null,
    content: item.content || null,
    category: item.category || null,
    cover_url: item.coverUrl || null,
    reading_time: item.readingTime || null,
    published: item.published,
    featured: item.published && item.featured,
    published_at: publishedAt,
    updated_at: now,
  };
}

function fromRow(row: Record<string, unknown>): StudioArticle | null {
  return parseArticle(row, false);
}

export async function listStudioArticles(db: SupabaseClient): Promise<StudioArticle[]> {
  const { data, error } = await db
    .from(TABLE)
    .select('*')
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? [])
    .map((row) => fromRow(row as Record<string, unknown>))
    .filter((item): item is StudioArticle => item != null);
}

async function uniqueSlug(db: SupabaseClient, base: string): Promise<string> {
  const root = (base || 'article').slice(0, 76);
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const candidate = attempt === 0 ? root : `${root}-${attempt + 1}`;
    const { data, error } = await db.from(TABLE).select('id').eq('slug', candidate).maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) return candidate;
  }
  throw new ArticleInputError('Cette adresse est déjà utilisée.');
}

async function clearOtherFeatured(db: SupabaseClient, id: string) {
  const { error } = await db.from(TABLE).update({ featured: false }).eq('featured', true).neq('id', id);
  if (error) throw new Error(error.message);
}

export async function saveStudioArticle(
  db: SupabaseClient,
  input: unknown,
  existingId: string,
): Promise<StudioArticle> {
  if (!input || typeof input !== 'object') throw new ArticleInputError('Article illisible.');
  const parsed = parseArticle(input as Record<string, unknown>, true);
  if (!parsed?.title) throw new ArticleInputError('Le titre est nécessaire.');

  const now = new Date().toISOString();
  const currentId = existingId.trim();

  if (!currentId) {
    const slug = await uniqueSlug(db, slugifyOffre(parsed.slug || parsed.title) || 'article');
    const publishedAt = articleDate(parsed.publishedAt, parsed.published, now);
    const { data, error } = await db
      .from(TABLE)
      .insert(toRow({ ...parsed, slug }, now, publishedAt))
      .select('*')
      .single();
    if (error || !data) throw new Error(error?.message || 'Enregistrement impossible.');
    const saved = fromRow(data as Record<string, unknown>);
    if (!saved) throw new Error('Enregistrement impossible.');
    if (saved.featured) await clearOtherFeatured(db, saved.id);
    return saved;
  }

  const { data: current, error: readError } = await db
    .from(TABLE)
    .select('id, slug')
    .eq('id', currentId)
    .maybeSingle();
  if (readError) throw new Error(readError.message);
  if (!current) throw new ArticleInputError('Cet article est introuvable.');

  const publishedAt = articleDate(parsed.publishedAt, parsed.published, now);

  const { data, error } = await db
    .from(TABLE)
    .update(toRow({ ...parsed, slug: String(current.slug) }, now, publishedAt))
    .eq('id', currentId)
    .select('*')
    .single();
  if (error || !data) throw new Error(error?.message || 'Enregistrement impossible.');
  const saved = fromRow(data as Record<string, unknown>);
  if (!saved) throw new Error('Enregistrement impossible.');
  if (saved.featured) await clearOtherFeatured(db, saved.id);
  return saved;
}

export async function deleteStudioArticle(db: SupabaseClient, id: string): Promise<void> {
  const articleId = id.trim();
  if (!articleId) throw new ArticleInputError('Article introuvable.');
  const { error } = await db.from(TABLE).delete().eq('id', articleId);
  if (error) throw new Error(error.message);
}
