'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ImagePlus, Plus } from 'lucide-react';
import { prepareStudioPhoto } from '@/lib/prepareStudioPhoto';
import { emptyArticle, type StudioArticle } from '@/lib/studioArticles';
import { slugifyOffre } from '@/lib/studioTypes';

async function readError(response: Response): Promise<string> {
  const data = (await response.json().catch(() => ({}))) as { error?: string };
  return data.error || 'Une erreur est survenue.';
}

export default function ArticleSpace({ focus }: { focus?: { id: string; nonce: number } | null }) {
  const [articles, setArticles] = useState<StudioArticle[]>([]);
  const [draft, setDraft] = useState<StudioArticle | null>(null);
  const [baseline, setBaseline] = useState('');
  const [savedId, setSavedId] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [listError, setListError] = useState('');
  const [formError, setFormError] = useState('');
  const [notice, setNotice] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const dirty = draft != null && baseline !== '' && JSON.stringify(draft) !== baseline;
  const seenFocus = useRef(0);

  const load = useCallback(async () => {
    const response = await fetch('/api/studio/articles', { cache: 'no-store' });
    if (!response.ok) throw new Error(await readError(response));
    const data = (await response.json()) as { articles: StudioArticle[] };
    setArticles(data.articles);
    return data.articles;
  }, []);

  useEffect(() => {
    load().catch((error: Error) => setListError(error.message));
  }, [load]);

  const open = (item: StudioArticle, isNew = false) => {
    if (dirty && !window.confirm('Des modifications ne sont pas enregistrées. Les abandonner ?')) return;
    setDraft(item);
    setBaseline(JSON.stringify(item));
    setSavedId(isNew ? '' : item.id);
    setSlugTouched(!isNew);
    setFormError('');
    setNotice('');
  };

  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    if (!focus || focus.nonce === seenFocus.current) return;
    if (focus.id === 'new') {
      seenFocus.current = focus.nonce;
      openRef.current(emptyArticle(), true);
      return;
    }
    const found = articles.find((item) => item.id === focus.id);
    if (!found) return;
    seenFocus.current = focus.nonce;
    openRef.current(found, false);
  }, [focus, articles]);

  const onTitle = (title: string) => {
    setDraft((current) => {
      if (!current) return current;
      const next = { ...current, title };
      if (!slugTouched) next.slug = slugifyOffre(title);
      return next;
    });
  };

  const uploadCover = async (file: File) => {
    setUploading(true);
    setFormError('');
    try {
      const body = new FormData();
      body.set('folder', 'articles');
      body.set('file', await prepareStudioPhoto(file));
      const response = await fetch('/api/studio/upload', { method: 'POST', body });
      if (!response.ok) throw new Error(await readError(response));
      const data = (await response.json()) as { url: string };
      setDraft((current) => (current ? { ...current, coverUrl: data.url } : current));
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Envoi impossible.');
    } finally {
      setUploading(false);
    }
  };

  const save = async (): Promise<StudioArticle | null> => {
    if (!draft) return null;
    setSaving(true);
    setFormError('');
    setNotice('');
    try {
      const creating = !savedId;
      const response = await fetch(creating ? '/api/studio/articles' : `/api/studio/articles/${encodeURIComponent(savedId)}`, {
        method: creating ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      });
      if (!response.ok) throw new Error(await readError(response));
      const data = (await response.json()) as { article: StudioArticle };
      setDraft(data.article);
      setBaseline(JSON.stringify(data.article));
      setSavedId(data.article.id);
      setSlugTouched(true);
      await load();
      setNotice(data.article.published ? 'Enregistré. Le journal se met à jour.' : 'Enregistré. Le brouillon reste dans Prochainement.');
      return data.article;
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Enregistrement impossible.');
      return null;
    } finally {
      setSaving(false);
    }
  };

  const preview = async () => {
    if (!draft?.title && !draft?.slug) return;
    const item = dirty || !savedId ? await save() : draft;
    if (!item?.slug) return;
    window.open(`/blog/${item.slug}?apercu=1`, '_blank', 'noopener,noreferrer');
  };

  const remove = async () => {
    if (!savedId) {
      setDraft(null);
      setBaseline('');
      return;
    }
    if (!window.confirm('Retirer cet article ? Il disparaît du journal.')) return;
    setSaving(true);
    setFormError('');
    try {
      const response = await fetch(`/api/studio/articles/${encodeURIComponent(savedId)}`, { method: 'DELETE' });
      if (!response.ok) throw new Error(await readError(response));
      setDraft(null);
      setBaseline('');
      setSavedId('');
      await load();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Suppression impossible.');
    } finally {
      setSaving(false);
    }
  };

  const categories = [...new Set(articles.map((item) => item.category).filter(Boolean))];

  return (
    <div className="mx-auto grid min-h-0 w-full min-w-0 max-w-7xl flex-1 grid-cols-1 gap-4 overflow-hidden px-3 py-4 sm:gap-6 sm:px-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
      <aside className={draft ? 'hidden min-h-0 min-w-0 lg:flex lg:flex-col' : 'flex min-h-0 min-w-0 flex-col'}>
        <div className="shrink-0 px-2 pb-4">
          <button
            type="button"
            onClick={() => open(emptyArticle(), true)}
            className="flex w-full min-w-0 items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white sm:px-5 sm:py-3.5"
          >
            <Plus className="size-5 shrink-0" aria-hidden />
            <span className="truncate">Nouvel article</span>
          </button>
        </div>
        {listError && <p className="mb-3 shrink-0 px-1.5 text-sm text-[#ec6435]">{listError}</p>}
        <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-y-contain px-2 py-2 [scrollbar-gutter:stable] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#0c1d22]/30 [&::-webkit-scrollbar-track]:bg-transparent">
          {articles.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => open(item)}
                className={`flex w-full items-center gap-3 rounded-lg bg-white p-3 text-left sm:gap-4 ${
                  savedId === item.id ? 'ring-2 ring-inset ring-[#0c1d22]' : ''
                }`}
              >
                <span className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#f4f4f4] sm:h-20 sm:w-20">
                  {item.coverUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.coverUrl} alt="" className="h-full w-full object-cover" />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[11px] font-bold uppercase tracking-[0.12em] text-[#ec6435]">
                    {item.category || 'Sans catégorie'}
                  </span>
                  <span className="block truncate text-base font-semibold">{item.title || 'Sans titre'}</span>
                  <span className="text-[11px] text-[#0c1d22]/50">
                    {item.published ? (item.featured ? 'À la une' : 'Publié') : 'Brouillon'}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className={draft ? 'min-h-0 min-w-0 overflow-y-auto overscroll-y-contain' : 'hidden min-h-0 min-w-0 overflow-y-auto overscroll-y-contain lg:block'}>
        {!draft ? (
          <div className="rounded-lg bg-white p-6 text-sm leading-relaxed text-[#0c1d22]/60 sm:p-8">
            Choisis un article, ou crée-en un. Le journal public se met à jour à l’enregistrement.
          </div>
        ) : (
          <ArticleForm
            draft={draft}
            savedId={savedId}
            categories={categories}
            saving={saving}
            uploading={uploading}
            error={formError}
            notice={notice}
            onTitle={onTitle}
            onChange={(partial) => setDraft((current) => (current ? { ...current, ...partial } : current))}
            onSlug={(slug) => {
              setSlugTouched(true);
              setDraft((current) => (current ? { ...current, slug: slugifyOffre(slug) } : current));
            }}
            onCover={uploadCover}
            onSave={save}
            onPreview={preview}
            onDelete={remove}
          />
        )}
      </section>
    </div>
  );
}

function ArticleForm({
  draft,
  savedId,
  categories,
  saving,
  uploading,
  error,
  notice,
  onTitle,
  onChange,
  onSlug,
  onCover,
  onSave,
  onPreview,
  onDelete,
}: {
  draft: StudioArticle;
  savedId: string;
  categories: string[];
  saving: boolean;
  uploading: boolean;
  error: string;
  notice: string;
  onTitle: (title: string) => void;
  onChange: (partial: Partial<StudioArticle>) => void;
  onSlug: (slug: string) => void;
  onCover: (file: File) => void;
  onSave: () => void;
  onPreview: () => void;
  onDelete: () => void;
}) {
  return (
    <form
      className="space-y-4 pb-8"
      onSubmit={(event) => {
        event.preventDefault();
        onSave();
      }}
    >
      <Block title="L’article">
        <Field label="Titre">
          <input value={draft.title} onChange={(event) => onTitle(event.target.value)} className={inputClass} />
        </Field>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Catégorie">
            <input
              value={draft.category}
              list="article-categories"
              onChange={(event) => onChange({ category: event.target.value })}
              className={inputClass}
            />
            <datalist id="article-categories">
              {categories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </Field>
          <Field label="Date">
            <input
              type="date"
              value={dateInputValue(draft.publishedAt)}
              onChange={(event) => onChange({ publishedAt: event.target.value || null })}
              className={inputClass}
            />
          </Field>
          <Field label="Temps de lecture">
            <input
              value={draft.readingTime}
              onChange={(event) => onChange({ readingTime: event.target.value })}
              placeholder="6 min"
              className={inputClass}
            />
          </Field>
        </div>
        {savedId ? (
          <p className="text-sm text-[#0c1d22]/55">Adresse : /blog/{draft.slug}</p>
        ) : (
          <Field label="Adresse">
            <input value={draft.slug} onChange={(event) => onSlug(event.target.value)} className={inputClass} />
          </Field>
        )}
        <Field label="Chapô">
          <textarea
            value={draft.description}
            onChange={(event) => onChange({ description: event.target.value })}
            rows={3}
            className={inputClass}
          />
        </Field>
        <Field label="Couverture">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="h-24 w-full shrink-0 overflow-hidden rounded-lg bg-[#f4f4f4] sm:h-28 sm:w-40">
              {draft.coverUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={draft.coverUrl} alt="" className="h-full w-full object-cover" />
              )}
            </span>
            <div className="flex flex-wrap gap-2">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white">
                <ImagePlus className="size-4" aria-hidden />
                {uploading ? 'Envoi…' : draft.coverUrl ? 'Changer la photo' : 'Ajouter une photo'}
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  disabled={uploading}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    event.target.value = '';
                    if (file) onCover(file);
                  }}
                />
              </label>
              {draft.coverUrl && (
                <button type="button" onClick={() => onChange({ coverUrl: '' })} className="text-sm text-[#0c1d22]/45">
                  Retirer
                </button>
              )}
            </div>
          </div>
        </Field>
      </Block>

      <Block title="Le texte">
        <textarea
          value={draft.content}
          onChange={(event) => onChange({ content: event.target.value })}
          rows={16}
          placeholder="Le premier paragraphe est l’introduction. Une partie commence par ## Titre."
          className={inputClass}
        />
        <p className="text-sm leading-relaxed text-[#0c1d22]/55">
          Une partie commence par ## . Une image s’écrit ![légende](https://…).
        </p>
      </Block>

      <Block title="Visibilité">
        <div className="flex flex-wrap gap-1 rounded-full bg-[#ec6435] p-1.5" role="tablist" aria-label="Visibilité">
          <button
            type="button"
            role="tab"
            aria-selected={!draft.published}
            onClick={() => onChange({ published: false, featured: false })}
            className={`rounded-full px-4 py-2 text-sm font-medium ${draft.published ? 'text-white' : 'bg-white text-[#0c1d22] shadow-sm'}`}
          >
            Brouillon
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={draft.published}
            onClick={() => onChange({ published: true })}
            className={`rounded-full px-4 py-2 text-sm font-medium ${draft.published ? 'bg-white text-[#0c1d22] shadow-sm' : 'text-white'}`}
          >
            Publié
          </button>
        </div>
        <label className="flex items-center gap-3 text-sm font-medium">
          <input
            type="checkbox"
            className="size-4 accent-[#ec6435]"
            checked={draft.featured}
            disabled={!draft.published}
            onChange={(event) => onChange({ featured: event.target.checked })}
          />
          À la une
        </label>
        <p className="text-sm leading-relaxed text-[#0c1d22]/55">
          Le brouillon apparaît dans Prochainement, sans ouvrir l’article. Publié entre dans le journal. La date s’affiche sur l’article et classe les derniers articles. Un seul article est à la une.
        </p>
      </Block>

      {error && <p className="text-sm text-[#ec6435]">{error}</p>}
      {notice && <p className="text-sm text-[#0c1d22]/70">{notice}</p>}

      <div className="sticky bottom-0 z-10 flex flex-col gap-2 bg-[#f4f4f4]/95 py-3 backdrop-blur sm:static sm:flex-row sm:flex-wrap sm:items-center sm:bg-transparent sm:py-0">
        <button
          type="submit"
          disabled={saving || uploading}
          className="w-full rounded-full bg-[#ec6435] px-6 py-3 text-sm font-semibold text-white disabled:opacity-50 sm:w-auto"
        >
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
        <button
          type="button"
          onClick={onPreview}
          disabled={saving || uploading || !draft.title}
          className="w-full rounded-full border border-[#0c1d22] bg-white px-6 py-3 text-sm font-semibold text-[#0c1d22] disabled:opacity-50 sm:w-auto"
        >
          Prévisualiser
        </button>
        <button type="button" onClick={onDelete} className="text-sm text-[#0c1d22]/45">
          {savedId ? 'Supprimer' : 'Annuler'}
        </button>
      </div>
    </form>
  );
}

function dateInputValue(value: string | null): string {
  if (!value) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-lg bg-white p-4 sm:p-6">
      <h2 className="font-sans text-xl font-bold tracking-[-0.04em] text-[#0c1d22]">{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0c1d22]/45">
      {label}
      <span className="mt-2 block normal-case tracking-normal">{children}</span>
    </label>
  );
}

const inputClass =
  'w-full rounded-lg border border-[#0c1d22]/10 bg-white px-3 py-2.5 text-sm font-normal tracking-normal text-[#0c1d22] outline-none focus:border-[#0c1d22]/30';
