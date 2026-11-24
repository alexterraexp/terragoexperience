'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ImagePlus, Plus } from 'lucide-react';
import { prepareStudioPhoto } from '@/lib/prepareStudioPhoto';
import { slugifyOffre } from '@/lib/studioTypes';
import {
  emptyAvis,
  emptyJour,
  emptyLieu,
  emptyRealise,
  forEditor,
  realisePath,
  type RealiseAvis,
  type RealiseJour,
  type RealiseLieu,
  type RealiseLigne,
  type SeminaireRealise,
} from '@/lib/seminairesRealises';

async function readError(response: Response): Promise<string> {
  const data = (await response.json().catch(() => ({}))) as { error?: string };
  return data.error || 'Une erreur est survenue.';
}

export default function RealiseSpace({ focus }: { focus?: { id: string; nonce: number } | null }) {
  const [realises, setRealises] = useState<SeminaireRealise[]>([]);
  const [schemaReady, setSchemaReady] = useState(true);
  const [draft, setDraft] = useState<SeminaireRealise | null>(null);
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
    const response = await fetch('/api/studio/realises', { cache: 'no-store' });
    if (!response.ok) throw new Error(await readError(response));
    const data = (await response.json()) as { realises: SeminaireRealise[]; schemaReady: boolean };
    setRealises(data.realises);
    setSchemaReady(data.schemaReady);
    return data.realises;
  }, []);

  useEffect(() => {
    load().catch((error: Error) => setListError(error.message));
  }, [load]);

  const open = (item: SeminaireRealise, isNew = false) => {
    if (dirty && !window.confirm('Des modifications ne sont pas enregistrées. Les abandonner ?')) return;
    const next = forEditor(item);
    setDraft(next);
    setBaseline(JSON.stringify(next));
    setSavedId(isNew ? '' : next.id);
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
      openRef.current(emptyRealise(), true);
      return;
    }
    const found = realises.find((item) => item.id === focus.id);
    if (!found) return;
    seenFocus.current = focus.nonce;
    openRef.current(found, false);
  }, [focus, realises]);

  const patch = (partial: Partial<SeminaireRealise> | ((current: SeminaireRealise) => SeminaireRealise)) => {
    setDraft((current) => {
      if (!current) return current;
      return typeof partial === 'function' ? partial(current) : { ...current, ...partial };
    });
  };

  const onTitre = (titre: string) => {
    setDraft((current) => {
      if (!current) return current;
      const next = { ...current, titre };
      if (!slugTouched) next.id = slugifyOffre(titre);
      return next;
    });
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    const urls = await uploadFiles([file]);
    return urls[0] ?? null;
  };

  const uploadFiles = async (files: FileList | File[]): Promise<string[]> => {
    const list = [...files];
    if (list.length === 0) return [];
    setUploading(true);
    setFormError('');
    const urls: string[] = [];
    try {
      for (const file of list) {
        const body = new FormData();
        body.set('folder', 'realisations');
        body.set('file', await prepareStudioPhoto(file));
        const response = await fetch('/api/studio/upload', { method: 'POST', body });
        if (!response.ok) throw new Error(await readError(response));
        const data = (await response.json()) as { url: string };
        urls.push(data.url);
      }
      return urls;
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Envoi impossible.');
      return urls;
    } finally {
      setUploading(false);
    }
  };

  const save = async (): Promise<SeminaireRealise | null> => {
    if (!draft) return null;
    setSaving(true);
    setFormError('');
    setNotice('');
    try {
      const creating = !savedId;
      const response = await fetch(creating ? '/api/studio/realises' : `/api/studio/realises/${encodeURIComponent(savedId)}`, {
        method: creating ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      });
      if (!response.ok) throw new Error(await readError(response));
      const data = (await response.json()) as { realise: SeminaireRealise };
      const next = forEditor(data.realise);
      setDraft(next);
      setBaseline(JSON.stringify(next));
      setSavedId(next.id);
      setSlugTouched(true);
      await load();
      setNotice(next.publie ? 'Enregistré. La page publique se met à jour.' : 'Enregistré. Le brouillon reste invisible.');
      return next;
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Enregistrement impossible.');
      return null;
    } finally {
      setSaving(false);
    }
  };

  const preview = async () => {
    if (!draft?.titre && !draft?.id) return;
    const item = dirty || !savedId ? await save() : draft;
    if (!item?.id) return;
    window.open(`${realisePath(item.id)}?apercu=1`, '_blank', 'noopener,noreferrer');
  };

  const remove = async () => {
    if (!savedId) {
      setDraft(null);
      setBaseline('');
      return;
    }
    if (!window.confirm('Retirer ce séminaire réalisé ? Il disparaît du site.')) return;
    setSaving(true);
    setFormError('');
    try {
      const response = await fetch(`/api/studio/realises/${encodeURIComponent(savedId)}`, { method: 'DELETE' });
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

  return (
    <div className="mx-auto grid min-h-0 w-full min-w-0 max-w-7xl flex-1 grid-cols-1 gap-4 overflow-hidden px-3 py-4 sm:gap-6 sm:px-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
      <aside className={draft ? 'hidden min-h-0 min-w-0 lg:flex lg:flex-col' : 'flex min-h-0 min-w-0 flex-col'}>
        <div className="shrink-0 px-2 pb-4">
          <button
            type="button"
            onClick={() => open(emptyRealise(), true)}
            className="flex w-full min-w-0 items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white sm:px-5 sm:py-3.5"
          >
            <Plus className="size-5 shrink-0" aria-hidden />
            <span className="truncate">Nouveau séminaire</span>
          </button>
        </div>
        {listError && <p className="mb-3 shrink-0 px-1.5 text-sm text-[#ec6435]">{listError}</p>}
        {!schemaReady && (
          <p className="mb-3 shrink-0 px-2 text-sm leading-relaxed text-[#0c1d22]/70">
            La table Supabase n’existe pas encore. Lance le script <span className="font-semibold">seminaires_realises</span>, puis recharge.
          </p>
        )}
        <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-y-contain px-2 py-2 [scrollbar-gutter:stable] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#0c1d22]/30 [&::-webkit-scrollbar-track]:bg-transparent">
          {realises.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => open(item)}
                className={`flex w-full items-center gap-3 rounded-lg bg-white p-3 text-left sm:gap-4 ${
                  savedId === item.id ? 'ring-2 ring-inset ring-[#0c1d22]' : ''
                }`}
              >
                <span className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white sm:h-20 sm:w-20">
                  {(item.images[0] || item.couverture) && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.images[0] || item.couverture} alt="" className="h-full w-full object-cover" />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[11px] font-bold uppercase tracking-[0.12em] text-[#ec6435]">
                    {item.lieu || 'Sans lieu'}
                  </span>
                  <span className="block truncate text-base font-semibold">{item.titre || 'Sans titre'}</span>
                  <span className="text-[11px] text-[#0c1d22]/50">
                    {item.publie ? 'Publié' : 'Brouillon'}
                    {item.nombrePersonnes ? ` · ${item.nombrePersonnes} pers.` : ''}
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
            Choisis un séminaire réalisé, ou crée-en un. La page publique se met à jour à la publication.
          </div>
        ) : (
          <RealiseForm
            draft={draft}
            savedId={savedId}
            dirty={dirty}
            saving={saving}
            uploading={uploading}
            error={formError}
            notice={notice}
            onBack={() => {
              if (dirty && !window.confirm('Des modifications ne sont pas enregistrées. Les abandonner ?')) return;
              setDraft(null);
            }}
            onChange={patch}
            onTitre={onTitre}
            onSlug={(slug) => {
              setSlugTouched(true);
              patch({ id: slugifyOffre(slug) });
            }}
            onUpload={uploadFile}
            onUploadImages={uploadFiles}
            onSave={save}
            onPreview={preview}
            onDelete={remove}
          />
        )}
      </section>
    </div>
  );
}

function RealiseForm({
  draft,
  savedId,
  dirty,
  saving,
  uploading,
  error,
  notice,
  onBack,
  onChange,
  onTitre,
  onSlug,
  onUpload,
  onUploadImages,
  onSave,
  onPreview,
  onDelete,
}: {
  draft: SeminaireRealise;
  savedId: string;
  dirty: boolean;
  saving: boolean;
  uploading: boolean;
  error: string;
  notice: string;
  onBack: () => void;
  onChange: (partial: Partial<SeminaireRealise> | ((current: SeminaireRealise) => SeminaireRealise)) => void;
  onTitre: (titre: string) => void;
  onSlug: (slug: string) => void;
  onUpload: (file: File) => Promise<string | null>;
  onUploadImages: (files: FileList | File[]) => Promise<string[]>;
  onSave: () => void;
  onPreview: () => void;
  onDelete: () => void;
}) {
  const setLieu = (index: number, partial: Partial<RealiseLieu>) => {
    onChange({ lieux: draft.lieux.map((item, i) => (i === index ? { ...item, ...partial } : item)) });
  };
  const setJour = (index: number, partial: Partial<RealiseJour>) => {
    onChange({ programme: draft.programme.map((item, i) => (i === index ? { ...item, ...partial } : item)) });
  };
  const setLigne = (jourIndex: number, ligneIndex: number, partial: Partial<RealiseLigne>) => {
    onChange({
      programme: draft.programme.map((jour, i) => (
        i === jourIndex
          ? { ...jour, lignes: jour.lignes.map((ligne, j) => (j === ligneIndex ? { ...ligne, ...partial } : ligne)) }
          : jour
      )),
    });
  };
  const setAvis = (index: number, partial: Partial<RealiseAvis>) => {
    onChange({ avis: draft.avis.map((item, i) => (i === index ? { ...item, ...partial } : item)) });
  };

  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        onSave();
      }}
    >
      <div className="lg:hidden">
        <button type="button" onClick={onBack} className="rounded-full border border-[#0c1d22] bg-white px-4 py-2 text-sm font-medium">
          ← Réalisés
        </button>
      </div>

      <Block title="Le récit">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Titre">
            <input value={draft.titre} onChange={(event) => onTitre(event.target.value)} placeholder="Deux jours chez Sabine" className={inputClass} />
          </Field>
          <Field label="Nombre de personnes">
            <input
              inputMode="numeric"
              value={draft.nombrePersonnes ?? ''}
              onChange={(event) => {
                const raw = event.target.value.trim();
                onChange({ nombrePersonnes: raw === '' ? null : Number(raw) });
              }}
              placeholder="28"
              className={inputClass}
            />
          </Field>
          <Field label="Lieu">
            <input value={draft.lieu} onChange={(event) => onChange({ lieu: event.target.value })} placeholder="Valence" className={inputClass} />
          </Field>
          <Field label="Durée">
            <input value={draft.duree} onChange={(event) => onChange({ duree: event.target.value })} placeholder="2 jours" className={inputClass} />
          </Field>
        </div>
        {!savedId ? (
          <Field label="Adresse">
            <input value={draft.id} onChange={(event) => onSlug(event.target.value)} placeholder="deux-jours-chez-sabine" className={inputClass} />
          </Field>
        ) : (
          <p className="text-sm text-[#0c1d22]/55">{realisePath(savedId)}</p>
        )}
        <PhotosField
          images={draft.images}
          uploading={uploading}
          onAdd={async (files) => {
            const urls = await onUploadImages(files);
            if (urls.length === 0) return;
            onChange((current) => {
              const images = [...current.images, ...urls].slice(0, 12);
              return { ...current, images, couverture: images[0] ?? '' };
            });
          }}
          onChange={(images) => onChange({ images, couverture: images[0] ?? '' })}
        />
      </Block>

      <Block title="Le brief">
        <Field label="Ce que l’équipe cherchait">
          <textarea
            value={draft.brief}
            onChange={(event) => onChange({ brief: event.target.value })}
            rows={6}
            placeholder="Aligner un comité de 28 personnes, loin des salles habituelles."
            className={inputClass}
          />
        </Field>
      </Block>

      <Block title="Les lieux">
        <div className="space-y-3">
          {draft.lieux.map((lieu, index) => (
            <article key={index} className="space-y-3 rounded-lg bg-[#f4f4f4] p-4">
              <Field label="Nom">
                <input value={lieu.nom} onChange={(event) => setLieu(index, { nom: event.target.value })} placeholder="La noix de Sabine" className={inputClass} />
              </Field>
              <Field label="Une phrase">
                <input value={lieu.phrase} onChange={(event) => setLieu(index, { phrase: event.target.value })} placeholder="Récolte et repas sous les noyers." className={inputClass} />
              </Field>
              <PhotoField
                url={lieu.photo}
                label="Photo du lieu"
                hint="Carré arrondi sur la carte."
                uploading={uploading}
                onPick={async (file) => {
                  const url = await onUpload(file);
                  if (!url) return;
                  onChange((current) => ({
                    ...current,
                    lieux: current.lieux.map((item, i) => (i === index ? { ...item, photo: url } : item)),
                  }));
                }}
                onClear={() => setLieu(index, { photo: '' })}
              />
              <ItemTools
                index={index}
                total={draft.lieux.length}
                onMove={(delta) => onChange({ lieux: move(draft.lieux, index, delta) })}
                onRemove={() => onChange({ lieux: draft.lieux.filter((_, i) => i !== index) })}
              />
            </article>
          ))}
        </div>
        <AddButton label="Ajouter un lieu" onClick={() => onChange({ lieux: [...draft.lieux, emptyLieu()] })} />
      </Block>

      <Block title="Le programme">
        <div className="space-y-4">
          {draft.programme.map((jour, jourIndex) => (
            <article key={jourIndex} className="space-y-3 rounded-lg bg-[#f4f4f4] p-4">
              <Field label="Jour">
                <input value={jour.label} onChange={(event) => setJour(jourIndex, { label: event.target.value })} placeholder="Jour 1" className={inputClass} />
              </Field>
              <div className="space-y-3">
                {jour.lignes.map((ligne, ligneIndex) => (
                  <div key={ligneIndex} className="flex flex-col gap-2 md:flex-row md:items-end">
                    <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0c1d22]/45 md:w-36 md:shrink-0">
                      Heure
                      <input
                        value={ligne.heure}
                        onChange={(event) => setLigne(jourIndex, ligneIndex, { heure: event.target.value })}
                        placeholder="9h00"
                        className={`${inputClass} mt-2`}
                      />
                    </label>
                    <label className="block min-w-0 flex-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0c1d22]/45">
                      Ce qui s’est passé
                      <input
                        value={ligne.action}
                        onChange={(event) => setLigne(jourIndex, ligneIndex, { action: event.target.value })}
                        placeholder="Accueil chez le producteur"
                        className={`${inputClass} mt-2`}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => setJour(jourIndex, { lignes: jour.lignes.filter((_, i) => i !== ligneIndex) })}
                      className="pb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0c1d22]/45"
                    >
                      Retirer
                    </button>
                  </div>
                ))}
              </div>
              <AddButton
                label="Ajouter une ligne"
                onClick={() => setJour(jourIndex, { lignes: [...jour.lignes, { heure: '', action: '' }] })}
              />
              <ItemTools
                index={jourIndex}
                total={draft.programme.length}
                onMove={(delta) => onChange({ programme: move(draft.programme, jourIndex, delta) })}
                onRemove={() => onChange({ programme: draft.programme.filter((_, i) => i !== jourIndex) })}
              />
            </article>
          ))}
        </div>
        <AddButton
          label="Ajouter un jour"
          onClick={() => onChange({ programme: [...draft.programme, emptyJour(`Jour ${draft.programme.length + 1}`)] })}
        />
      </Block>

      <Block title="Les avis">
        <div className="space-y-3">
          {draft.avis.map((avis, index) => (
            <article key={index} className="space-y-3 rounded-lg bg-[#f4f4f4] p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Nom">
                  <input value={avis.auteur} onChange={(event) => setAvis(index, { auteur: event.target.value })} className={inputClass} />
                </Field>
                <Field label="Entreprise">
                  <input value={avis.entreprise} onChange={(event) => setAvis(index, { entreprise: event.target.value })} className={inputClass} />
                </Field>
              </div>
              <Field label="La phrase">
                <textarea value={avis.texte} onChange={(event) => setAvis(index, { texte: event.target.value })} rows={3} className={inputClass} />
              </Field>
              <ItemTools
                index={index}
                total={draft.avis.length}
                onMove={(delta) => onChange({ avis: move(draft.avis, index, delta) })}
                onRemove={() => onChange({ avis: draft.avis.filter((_, i) => i !== index) })}
              />
            </article>
          ))}
        </div>
        <AddButton label="Ajouter un avis" onClick={() => onChange({ avis: [...draft.avis, emptyAvis()] })} />
      </Block>

      <Block title="Visibilité">
        <div className="flex flex-wrap gap-1 rounded-[1.75rem] bg-[#ec6435] p-1.5" role="tablist" aria-label="Visibilité">
          <button
            type="button"
            role="tab"
            aria-selected={!draft.publie}
            onClick={() => onChange({ publie: false })}
            className={`rounded-full px-4 py-2 text-sm font-medium ${draft.publie ? 'text-white' : 'bg-white text-[#0c1d22] shadow-sm'}`}
          >
            Brouillon
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={draft.publie}
            onClick={() => onChange({ publie: true })}
            className={`rounded-full px-4 py-2 text-sm font-medium ${draft.publie ? 'bg-white text-[#0c1d22] shadow-sm' : 'text-white'}`}
          >
            Publié
          </button>
        </div>
        <Field label="Ordre">
          <input
            inputMode="numeric"
            value={draft.ordre || ''}
            onChange={(event) => onChange({ ordre: Number(event.target.value) || 0 })}
            placeholder="1"
            className={inputClass}
          />
        </Field>
        <p className="text-sm leading-relaxed text-[#0c1d22]/55">
          Le brouillon reste invisible. Publié apparaît dans Séminaires réalisés.
        </p>
      </Block>

      {error && <p className="text-sm text-[#ec6435]">{error}</p>}
      {notice && <p className="text-sm text-[#0c1d22]/70">{notice}</p>}

      <div className="sticky bottom-0 z-10 flex flex-col gap-2 bg-white/95 py-3 backdrop-blur sm:static sm:flex-row sm:flex-wrap sm:items-center sm:bg-transparent sm:py-0">
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
          disabled={saving || uploading || (!savedId && !draft.titre) || (dirty && !draft.titre)}
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

function PhotosField({
  images,
  uploading,
  onAdd,
  onChange,
}: {
  images: string[];
  uploading: boolean;
  onAdd: (files: FileList) => void;
  onChange: (images: string[]) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm leading-relaxed text-[#0c1d22]/55">
        La première est la grande photo. Les deux suivantes s’affichent à droite. Au-delà, un + ouvre toutes les photos.
      </p>
      <label className="flex h-16 cursor-pointer items-center gap-3 rounded-lg bg-[#0c1d22] px-4 text-white">
        <ImagePlus className="size-5 shrink-0" aria-hidden />
        <span>
          <span className="block text-sm font-semibold">{uploading ? 'Envoi…' : 'Ajouter des photos'}</span>
          <span className="hidden text-[11px] text-white/70 sm:block">Plusieurs images d’un coup, jusqu’à 12.</span>
        </span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          multiple
          className="sr-only"
          onChange={(event) => {
            if (event.target.files?.length) onAdd(event.target.files);
            event.target.value = '';
          }}
        />
      </label>
      {images.length > 0 && (
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {images.map((url, index) => (
            <li key={`${url}-${index}`}>
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="aspect-[4/3] w-full rounded-lg object-cover" />
                {index === 0 && (
                  <span className="absolute left-1.5 top-1.5 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em]">
                    Grande
                  </span>
                )}
                <span className="absolute inset-x-1.5 bottom-1.5 flex items-center justify-between">
                  <button
                    type="button"
                    aria-label="Déplacer avant"
                    disabled={index === 0}
                    onClick={() => onChange(move(images, index, -1))}
                    className="flex size-7 items-center justify-center rounded-full bg-white/90 text-[#0c1d22] shadow-sm disabled:opacity-30"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Déplacer après"
                    disabled={index === images.length - 1}
                    onClick={() => onChange(move(images, index, 1))}
                    className="flex size-7 items-center justify-center rounded-full bg-white/90 text-[#0c1d22] shadow-sm disabled:opacity-30"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </span>
              </div>
              <button
                type="button"
                onClick={() => onChange(images.filter((_, i) => i !== index))}
                className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#0c1d22]/45"
              >
                Retirer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PhotoField({
  url,
  label,
  hint,
  uploading,
  onPick,
  onClear,
}: {
  url: string;
  label: string;
  hint: string;
  uploading: boolean;
  onPick: (file: File) => void;
  onClear: () => void;
}) {
  if (url) {
    return (
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt="" className="h-20 w-20 rounded-lg object-cover" />
        <button type="button" onClick={onClear} className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0c1d22]/45">
          Retirer la photo
        </button>
      </div>
    );
  }

  return (
    <label className="flex h-16 cursor-pointer items-center gap-3 rounded-lg bg-[#0c1d22] px-4 text-white">
      <ImagePlus className="size-5 shrink-0" aria-hidden />
      <span>
        <span className="block text-sm font-semibold">{uploading ? 'Envoi…' : label}</span>
        <span className="hidden text-[11px] text-white/70 sm:block">{hint}</span>
      </span>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onPick(file);
          event.target.value = '';
        }}
      />
    </label>
  );
}

function ItemTools({
  index,
  total,
  onMove,
  onRemove,
}: {
  index: number;
  total: number;
  onMove: (delta: number) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex gap-2">
        <button
          type="button"
          aria-label="Déplacer avant"
          disabled={index === 0}
          onClick={() => onMove(-1)}
          className="flex size-8 items-center justify-center rounded-full border border-[#0c1d22]/10 disabled:opacity-30"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Déplacer après"
          disabled={index === total - 1}
          onClick={() => onMove(1)}
          className="flex size-8 items-center justify-center rounded-full border border-[#0c1d22]/10 disabled:opacity-30"
        >
          <ChevronRight className="size-4" />
        </button>
      </span>
      <button type="button" onClick={onRemove} className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0c1d22]/45">
        Retirer
      </button>
    </div>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-full border border-[#0c1d22] bg-white px-4 py-2.5 text-sm font-medium sm:w-auto"
    >
      <Plus className="size-4" aria-hidden />
      {label}
    </button>
  );
}

function move<T>(items: T[], index: number, delta: number): T[] {
  const next = index + delta;
  if (next < 0 || next >= items.length) return items;
  const copy = [...items];
  const [item] = copy.splice(index, 1);
  copy.splice(next, 0, item);
  return copy;
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
