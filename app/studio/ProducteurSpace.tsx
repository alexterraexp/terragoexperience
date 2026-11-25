'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ImagePlus, Plus } from 'lucide-react';
import { exempleSeminaireEntreprisePath } from '@/lib/exemplesSeminaireEntreprise';
import { prepareStudioPhoto } from '@/lib/prepareStudioPhoto';
import {
  emptyExperience,
  emptyProducteur,
  type StudioAvis,
  type StudioExperience,
  type StudioOffreLien,
  type StudioProducteur,
} from '@/lib/studioProducteurs';

async function readError(response: Response): Promise<string> {
  const data = (await response.json().catch(() => ({}))) as { error?: string };
  return data.error || 'Une erreur est survenue.';
}

export default function ProducteurSpace({ focus }: { focus?: { id: string; nonce: number } | null }) {
  const [producteurs, setProducteurs] = useState<StudioProducteur[]>([]);
  const [offres, setOffres] = useState<StudioOffreLien[]>([]);
  const [draft, setDraft] = useState<StudioProducteur | null>(null);
  const [baseline, setBaseline] = useState('');
  const [listError, setListError] = useState('');
  const [formError, setFormError] = useState('');
  const [notice, setNotice] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const dirty = draft != null && baseline !== '' && JSON.stringify(draft) !== baseline;
  const seenFocus = useRef(0);

  const load = useCallback(async () => {
    const response = await fetch('/api/studio/producteurs', { cache: 'no-store' });
    if (!response.ok) throw new Error(await readError(response));
    const data = (await response.json()) as { producteurs: StudioProducteur[]; offres: StudioOffreLien[] };
    setProducteurs(data.producteurs);
    setOffres(data.offres);
    setListError('');
    return data.producteurs;
  }, []);

  useEffect(() => {
    load().catch((error: Error) => setListError(error.message));
  }, [load]);

  const open = (producteur: StudioProducteur) => {
    if (dirty && !window.confirm('Des modifications ne sont pas enregistrées. Les abandonner ?')) return;
    setDraft(producteur);
    setBaseline(JSON.stringify(producteur));
    setFormError('');
    setNotice('');
  };

  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    if (!focus || focus.nonce === seenFocus.current) return;
    if (focus.id === 'new') {
      seenFocus.current = focus.nonce;
      openRef.current(emptyProducteur());
      return;
    }
    const found = producteurs.find((item) => item.id === focus.id);
    if (!found) return;
    seenFocus.current = focus.nonce;
    openRef.current(found);
  }, [focus, producteurs]);

  const patch = (partial: Partial<StudioProducteur>) => {
    setDraft((current) => (current ? { ...current, ...partial } : current));
  };

  const uploadImages = async (files: FileList | null) => {
    const list = files ? [...files] : [];
    if (list.length === 0) return;
    setUploading(true);
    setFormError('');
    try {
      const urls: string[] = [];
      for (const file of list) {
        const body = new FormData();
        body.set('folder', 'producteurs');
        body.set('file', await prepareStudioPhoto(file));
        const response = await fetch('/api/studio/upload', { method: 'POST', body });
        if (!response.ok) throw new Error(await readError(response));
        const data = (await response.json()) as { url: string };
        urls.push(data.url);
      }
      setDraft((current) => (
        current ? { ...current, images: [...current.images, ...urls].slice(0, 24) } : current
      ));
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Envoi impossible.');
    } finally {
      setUploading(false);
    }
  };

  const save = async (): Promise<StudioProducteur | null> => {
    if (!draft) return null;
    setSaving(true);
    setFormError('');
    setNotice('');
    try {
      const creating = !draft.id;
      const response = await fetch(
        creating ? '/api/studio/producteurs' : `/api/studio/producteurs/${encodeURIComponent(draft.id)}`,
        {
          method: creating ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(draft),
        },
      );
      if (!response.ok) throw new Error(await readError(response));
      const data = (await response.json()) as { producteur: StudioProducteur; warning?: string };
      setDraft(data.producteur);
      setBaseline(JSON.stringify(data.producteur));
      await load();
      setNotice(data.warning || 'Enregistré. La fiche publique se met à jour.');
      return data.producteur;
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Enregistrement impossible.');
      return null;
    } finally {
      setSaving(false);
    }
  };

  const preview = async () => {
    if (!draft?.id && !draft?.name) return;
    const producteur = dirty || !draft?.id ? await save() : draft;
    if (!producteur?.id) return;
    const url = producteur.offreSlug
      ? `${exempleSeminaireEntreprisePath(producteur.offreSlug)}?apercu=1`
      : `/partenaires?p=${encodeURIComponent(producteur.id)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const remove = async () => {
    if (!draft?.id) {
      setDraft(null);
      setBaseline('');
      return;
    }
    const name = draft.name || 'ce producteur';
    if (!window.confirm(`Retirer la fiche de ${name} ? Le texte et les expériences disparaissent du site.`)) return;
    setSaving(true);
    setFormError('');
    try {
      const response = await fetch(`/api/studio/producteurs/${encodeURIComponent(draft.id)}`, { method: 'DELETE' });
      if (!response.ok) throw new Error(await readError(response));
      setDraft(null);
      setBaseline('');
      await load();
      setNotice('Fiche retirée.');
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
            onClick={() => open(emptyProducteur())}
            className="flex w-full min-w-0 items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#ec6435] sm:px-5 sm:py-3.5"
          >
            <Plus className="size-5 shrink-0" aria-hidden />
            <span className="truncate">Nouvelle fiche</span>
          </button>
        </div>
        {listError && <p className="mb-3 shrink-0 px-1.5 text-sm text-[#ec6435]">{listError}</p>}
        <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-y-contain px-2 py-2 [scrollbar-gutter:stable] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#0c1d22]/30 [&::-webkit-scrollbar-track]:bg-transparent">
          {producteurs.map((producteur) => (
            <li key={producteur.id}>
              <button
                type="button"
                onClick={() => open(producteur)}
                className={`flex w-full items-center gap-3 rounded-lg bg-white p-3 text-left transition-shadow duration-200 hover:shadow-[0_6px_16px_rgba(12,29,34,0.08)] sm:gap-4 ${
                  draft?.id === producteur.id ? 'ring-2 ring-inset ring-[#0c1d22]' : ''
                }`}
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white text-2xl sm:h-20 sm:w-20">
                  {producteur.images[0] || producteur.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={producteur.images[0] || producteur.avatar} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <span aria-hidden>{producteur.experiences[0]?.icon || '🌿'}</span>
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[11px] font-bold uppercase tracking-[0.12em] text-[#ec6435]">
                    {producteur.type || 'Producteur'}
                  </span>
                  <span className="block truncate text-base font-semibold">{producteur.name || 'Sans nom'}</span>
                  <span className="block truncate text-[11px] text-[#0c1d22]/50">
                    {producteur.experiences.length} expérience{producteur.experiences.length > 1 ? 's' : ''}
                    {producteur.offreLabel ? ` · ${producteur.offreLabel}` : ''}
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
            Choisis un producteur. Son nom, son texte et les expériences possibles se règlent ici, puis apparaissent sur la fiche publique.
          </div>
        ) : (
          <ProducteurForm
            draft={draft}
            producteurs={producteurs}
            offres={offres}
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
            onUploadImages={uploadImages}
            onSave={save}
            onPreview={preview}
            onDelete={remove}
          />
        )}
      </section>
    </div>
  );
}

function ProducteurForm({
  draft,
  producteurs,
  offres,
  dirty,
  saving,
  uploading,
  error,
  notice,
  onBack,
  onChange,
  onUploadImages,
  onSave,
  onPreview,
  onDelete,
}: {
  draft: StudioProducteur;
  producteurs: StudioProducteur[];
  offres: StudioOffreLien[];
  dirty: boolean;
  saving: boolean;
  uploading: boolean;
  error: string;
  notice: string;
  onBack: () => void;
  onChange: (partial: Partial<StudioProducteur>) => void;
  onUploadImages: (files: FileList | null) => void;
  onSave: () => void;
  onPreview: () => void;
  onDelete: () => void;
}) {
  const knownOffer = offres.some((offer) => offer.id === draft.seminaireId);
  const taken = draft.ordre > 0
    ? producteurs.filter((item) => item.id !== draft.id && item.ordre === draft.ordre)
    : [];
  const takenNames = taken.map((item) => item.name || 'Un producteur');
  const takenLabel = takenNames.length <= 1
    ? takenNames[0]
    : `${takenNames.slice(0, -1).join(', ')} et ${takenNames[takenNames.length - 1]}`;

  const patchExperience = (index: number, partial: Partial<StudioExperience>) => {
    onChange({
      experiences: draft.experiences.map((item, i) => (i === index ? { ...item, ...partial } : item)),
    });
  };

  const patchReview = (index: number, partial: Partial<StudioAvis>) => {
    onChange({
      reviews: draft.reviews.map((item, i) => (i === index ? { ...item, ...partial } : item)),
    });
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
        <button type="button" onClick={onBack} className="rounded-full border border-[#0c1d22] bg-white px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-[#0c1d22] hover:text-white">
          ← Producteurs
        </button>
      </div>

      <Block title="Le producteur">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nom">
            <input
              value={draft.name}
              onChange={(event) => onChange({ name: event.target.value })}
              placeholder="Sabine & Marie-Lise"
              className={inputClass}
            />
          </Field>
          <Field label="Activité">
            <input
              value={draft.type}
              onChange={(event) => onChange({ type: event.target.value })}
              placeholder="Fruits à coque"
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="Offre liée">
          <select
            value={draft.seminaireId}
            onChange={(event) => onChange({ seminaireId: event.target.value })}
            className={inputClass}
          >
            <option value="">Aucune offre</option>
            {draft.seminaireId && !knownOffer && <option value={draft.seminaireId}>{draft.seminaireId}</option>}
            {offres.map((offer) => (
              <option
                key={offer.id}
                value={offer.id}
                disabled={Boolean(offer.producteurId) && offer.producteurId !== draft.id}
              >
                {offer.producteur || offer.label || offer.id}
                {offer.producteurId && offer.producteurId !== draft.id ? ' — déjà liée' : ''}
              </option>
            ))}
          </select>
        </Field>
        <p className="text-sm leading-relaxed text-[#0c1d22]/55">
          Le nom apparaît dans « Partir à la rencontre de… ». L’hébergement et les formats restent dans Séminaire.
        </p>
        <Field label="Ordre">
          <input
            type="number"
            min={0}
            value={draft.ordre || ''}
            onChange={(event) => onChange({ ordre: Math.max(0, Math.round(Number(event.target.value) || 0)) })}
            placeholder="0"
            className={`${inputClass} max-w-[140px]`}
          />
        </Field>
        {taken.length > 0 && (
          <p className="w-fit rounded-full bg-primary px-3 py-1 text-xs leading-relaxed text-white">
            {taken.length > 1 ? `${takenLabel} sont déjà à cette place.` : `${takenLabel} est déjà à cette place.`}
          </p>
        )}
        <p className="text-sm leading-relaxed text-[#0c1d22]/55">
          1 s’affiche en premier, puis 2, puis 3. 0 laisse ce producteur dans l’ordre alphabétique, après ceux qui ont un numéro.
        </p>
      </Block>

      <Block title="Photos">
        <p className="text-sm leading-relaxed text-[#0c1d22]/55">
          Ces photos sont celles du producteur. Retire celles que tu ne veux pas ici, puis enregistre : le fichier quitte aussi le bucket. La première est la couverture de la fiche.
        </p>
        <PhotoField
          images={draft.images}
          uploading={uploading}
          onUpload={onUploadImages}
          onChange={(images) => onChange({ images })}
        />
      </Block>

      <Block title="Présentation">
        <Field label="Phrase courte">
          <input
            value={draft.highlight}
            onChange={(event) => onChange({ highlight: event.target.value })}
            placeholder="La noix n'aura plus de secret pour vous."
            className={inputClass}
          />
        </Field>
        <Field label="À propos">
          <textarea
            value={draft.description}
            onChange={(event) => onChange({ description: event.target.value })}
            rows={6}
            className={inputClass}
          />
        </Field>
        <TokenList
          label="Mots-clés"
          values={draft.tags}
          placeholder="Noix"
          onChange={(tags) => onChange({ tags })}
        />
      </Block>

      <Block title="Expériences possibles">
        <p className="text-sm leading-relaxed text-[#0c1d22]/55">
          Ces cartes s’affichent sur la fiche séminaire, avec la durée et « Voir le détail ».
        </p>
        <div className="space-y-3">
          {draft.experiences.map((experience, index) => (
            <article key={experience.id} className="space-y-3 rounded-lg bg-[#f4f4f4] p-4">
              <div className="flex items-start gap-3">
                <label className="w-16 shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0c1d22]/45">
                  Picto
                  <input
                    value={experience.icon}
                    onChange={(event) => patchExperience(index, { icon: event.target.value })}
                    className={`${inputClass} mt-2 text-center text-lg`}
                  />
                </label>
                <div className="min-w-0 flex-1">
                  <Field label="Titre">
                    <input
                      value={experience.title}
                      onChange={(event) => patchExperience(index, { title: event.target.value })}
                      placeholder="Team-building récolte des noix"
                      className={inputClass}
                    />
                  </Field>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="Durée">
                  <input
                    value={experience.duration}
                    onChange={(event) => patchExperience(index, { duration: event.target.value })}
                    placeholder="1h30"
                    className={inputClass}
                  />
                </Field>
                <Field label="Prix">
                  <input
                    value={experience.price}
                    onChange={(event) => patchExperience(index, { price: event.target.value })}
                    placeholder="Sur devis"
                    className={inputClass}
                  />
                </Field>
                <Field label="Saison">
                  <input
                    value={experience.season}
                    onChange={(event) => patchExperience(index, { season: event.target.value })}
                    placeholder="Automne"
                    className={inputClass}
                  />
                </Field>
              </div>
              <Field label="Détail">
                <textarea
                  value={experience.desc}
                  onChange={(event) => patchExperience(index, { desc: event.target.value })}
                  rows={4}
                  className={inputClass}
                />
              </Field>
              <div className="flex items-center justify-between gap-3">
                <span className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Déplacer avant"
                    disabled={index === 0}
                    onClick={() => onChange({ experiences: move(draft.experiences, index, -1) })}
                    className="flex size-8 items-center justify-center rounded-full border border-[#0c1d22]/10 transition-colors duration-200 hover:bg-[#0c1d22]/[0.06] disabled:pointer-events-none disabled:opacity-30"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Déplacer après"
                    disabled={index === draft.experiences.length - 1}
                    onClick={() => onChange({ experiences: move(draft.experiences, index, 1) })}
                    className="flex size-8 items-center justify-center rounded-full border border-[#0c1d22]/10 transition-colors duration-200 hover:bg-[#0c1d22]/[0.06] disabled:pointer-events-none disabled:opacity-30"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </span>
                <button
                  type="button"
                  onClick={() => onChange({ experiences: draft.experiences.filter((_, i) => i !== index) })}
                  className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0c1d22]/45 transition-colors duration-200 hover:text-[#ec6435]"
                >
                  Retirer
                </button>
              </div>
            </article>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            const nextId = draft.experiences.reduce((max, item) => Math.max(max, item.id), 0) + 1;
            onChange({ experiences: [...draft.experiences, emptyExperience(nextId)] });
          }}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-[#0c1d22] bg-white px-4 py-2.5 text-sm font-medium transition-colors duration-200 hover:bg-[#0c1d22] hover:text-white sm:w-auto"
        >
          <Plus className="size-4" aria-hidden />
          Ajouter une expérience
        </button>
      </Block>

      <Block title="Labels">
        <TokenList
          label="Certifications"
          values={draft.certifications}
          placeholder="Agriculture biologique"
          onChange={(certifications) => onChange({ certifications })}
        />
      </Block>

      <Block title="Avis">
        <div className="space-y-3">
          {draft.reviews.map((review, index) => (
            <article key={index} className="space-y-3 rounded-lg bg-[#f4f4f4] p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Auteur">
                  <input value={review.author} onChange={(event) => patchReview(index, { author: event.target.value })} className={inputClass} />
                </Field>
                <Field label="Entreprise">
                  <input value={review.company} onChange={(event) => patchReview(index, { company: event.target.value })} className={inputClass} />
                </Field>
                <Field label="Date">
                  <input value={review.date} onChange={(event) => patchReview(index, { date: event.target.value })} className={inputClass} />
                </Field>
                <Field label="Note">
                  <select
                    value={review.rating || ''}
                    onChange={(event) => patchReview(index, { rating: Number(event.target.value) || 0 })}
                    className={inputClass}
                  >
                    <option value="">—</option>
                    {[1, 2, 3, 4, 5].map((note) => (
                      <option key={note} value={note}>{note}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="Texte">
                <textarea
                  value={review.text}
                  onChange={(event) => patchReview(index, { text: event.target.value })}
                  rows={3}
                  className={inputClass}
                />
              </Field>
              <button
                type="button"
                onClick={() => onChange({ reviews: draft.reviews.filter((_, i) => i !== index) })}
                className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0c1d22]/45 transition-colors duration-200 hover:text-[#ec6435]"
              >
                Retirer
              </button>
            </article>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onChange({
            reviews: [...draft.reviews, { author: '', company: '', date: '', rating: 0, text: '' }],
          })}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-[#0c1d22] bg-white px-4 py-2.5 text-sm font-medium transition-colors duration-200 hover:bg-[#0c1d22] hover:text-white sm:w-auto"
        >
          <Plus className="size-4" aria-hidden />
          Ajouter un avis
        </button>
      </Block>

      {error && <p className="text-sm text-[#ec6435]">{error}</p>}
      {notice && <p className="text-sm text-[#0c1d22]/70">{notice}</p>}

      <div className="sticky bottom-0 z-10 flex flex-col gap-2 bg-white/95 py-3 backdrop-blur sm:static sm:flex-row sm:flex-wrap sm:items-center sm:bg-transparent sm:py-0">
        <button
          type="submit"
          disabled={saving || uploading}
          className="w-full rounded-full bg-[#ec6435] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#d45428] disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
        >
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
        <button
          type="button"
          onClick={onPreview}
          disabled={saving || uploading || (!draft.id && !draft.name)}
          className="w-full rounded-full border border-[#0c1d22] bg-white px-6 py-3 text-sm font-semibold text-[#0c1d22] transition-colors duration-200 hover:bg-[#0c1d22] hover:text-white disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
        >
          Prévisualiser
        </button>
        <button type="button" onClick={onDelete} className="text-sm text-[#0c1d22]/45 transition-colors duration-200 hover:text-[#ec6435]">
          {draft.id ? 'Supprimer' : 'Annuler'}
        </button>
      </div>
    </form>
  );
}

function PhotoField({
  images,
  uploading,
  onUpload,
  onChange,
}: {
  images: string[];
  uploading: boolean;
  onUpload: (files: FileList | null) => void;
  onChange: (images: string[]) => void;
}) {
  return (
    <div>
      <label className="flex cursor-pointer items-center gap-3 rounded-lg bg-primary px-4 py-3 text-left text-sm text-white transition-colors duration-200 hover:bg-[#ec6435]">
        <ImagePlus className="size-5 shrink-0" aria-hidden />
        <span>
          <span className="block font-semibold">{uploading ? 'Envoi…' : 'Ajouter des photos'}</span>
          <span className="block text-[11px] text-white/70">Jusqu’à 24. La première sert de couverture.</span>
        </span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          multiple
          className="sr-only"
          onChange={(event) => {
            onUpload(event.target.files);
            event.target.value = '';
          }}
        />
      </label>
      {images.length > 0 && (
        <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {images.map((url, index) => (
            <li key={`${url}-${index}`}>
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="aspect-[4/3] w-full rounded-lg object-cover" />
                {index === 0 && (
                  <span className="absolute left-1.5 top-1.5 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em]">
                    Couverture
                  </span>
                )}
              </div>
              <span className="mt-1.5 flex items-center justify-between gap-2">
                <span className="flex gap-1">
                  <button
                    type="button"
                    aria-label="Déplacer avant"
                    disabled={index === 0}
                    onClick={() => onChange(move(images, index, -1))}
                    className="flex size-7 items-center justify-center rounded-full border border-[#0c1d22]/10 disabled:opacity-30"
                  >
                    <ChevronLeft className="size-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    aria-label="Déplacer après"
                    disabled={index === images.length - 1}
                    onClick={() => onChange(move(images, index, 1))}
                    className="flex size-7 items-center justify-center rounded-full border border-[#0c1d22]/10 disabled:opacity-30"
                  >
                    <ChevronRight className="size-4" aria-hidden />
                  </button>
                </span>
                <button
                  type="button"
                  onClick={() => onChange(images.filter((_, i) => i !== index))}
                  className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#0c1d22]/45 transition-colors duration-200 hover:text-[#ec6435]"
                >
                  Retirer
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TokenList({
  label,
  values,
  placeholder,
  onChange,
}: {
  label: string;
  values: string[];
  placeholder: string;
  onChange: (values: string[]) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const add = () => {
    const value = ref.current?.value.trim() ?? '';
    if (!value || values.some((item) => item.toLowerCase() === value.toLowerCase())) return;
    onChange([...values, value]);
    if (ref.current) ref.current.value = '';
  };

  return (
    <Field label={label}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          ref={ref}
          placeholder={placeholder}
          className={inputClass}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              add();
            }
          }}
        />
        <button
          type="button"
          onClick={add}
          className="shrink-0 rounded-full border border-[#0c1d22] bg-white px-4 py-2.5 text-sm font-medium transition-colors duration-200 hover:bg-[#0c1d22] hover:text-white"
        >
          Ajouter
        </button>
      </div>
      {values.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {values.map((item) => (
            <li key={item}>
              <button
                type="button"
                onClick={() => onChange(values.filter((value) => value !== item))}
                className="rounded-full bg-[#f4f4f4] px-3 py-1.5 text-xs transition-colors duration-200 hover:bg-[#0c1d22] hover:text-white"
              >
                {item} ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </Field>
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
