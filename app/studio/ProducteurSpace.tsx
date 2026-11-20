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

export default function ProducteurSpace() {
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

  const load = useCallback(async () => {
    const response = await fetch('/api/studio/producteurs', { cache: 'no-store' });
    if (!response.ok) throw new Error(await readError(response));
    const data = (await response.json()) as { producteurs: StudioProducteur[]; offres: StudioOffreLien[] };
    setProducteurs(data.producteurs);
    setOffres(data.offres);
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

  const patch = (partial: Partial<StudioProducteur>) => {
    setDraft((current) => (current ? { ...current, ...partial } : current));
  };

  const uploadAvatar = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    setUploading(true);
    setFormError('');
    try {
      const body = new FormData();
      body.set('file', await prepareStudioPhoto(file));
      const response = await fetch('/api/studio/upload', { method: 'POST', body });
      if (!response.ok) throw new Error(await readError(response));
      const data = (await response.json()) as { url: string };
      patch({ avatar: data.url });
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
      const data = (await response.json()) as { producteur: StudioProducteur };
      setDraft(data.producteur);
      setBaseline(JSON.stringify(data.producteur));
      await load();
      setNotice('Enregistré. La fiche publique se met à jour.');
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
    <div className="mx-auto grid min-h-0 w-full max-w-7xl flex-1 gap-6 overflow-hidden px-4 py-6 lg:grid-cols-[380px_minmax(0,1fr)] lg:px-8">
      <aside className={draft ? 'hidden min-h-0 lg:flex lg:flex-col' : 'flex min-h-0 flex-col'}>
        <button
          type="button"
          onClick={() => open(emptyProducteur())}
          className="mb-4 flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#0c1d22] px-5 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white"
        >
          <Plus className="size-5" aria-hidden />
          Nouvelle fiche
        </button>
        {listError && <p className="mb-3 shrink-0 text-sm text-[#ec6435]">{listError}</p>}
        <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-y-contain pl-0.5 pr-5 [scrollbar-gutter:stable] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#0c1d22]/30 [&::-webkit-scrollbar-track]:bg-transparent">
          {producteurs.map((producteur) => (
            <li key={producteur.id}>
              <button
                type="button"
                onClick={() => open(producteur)}
                className={`flex w-full items-center gap-4 rounded-lg border bg-white p-3 text-left ${
                  draft?.id === producteur.id ? 'border-[#0c1d22]' : 'border-[#0c1d22]/10'
                }`}
              >
                <span className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#f4f4f4] text-2xl">
                  {producteur.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={producteur.avatar} alt="" className="h-full w-full object-cover" />
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

      <section className={draft ? 'min-h-0 overflow-y-auto overscroll-y-contain' : 'hidden min-h-0 overflow-y-auto overscroll-y-contain lg:block'}>
        {!draft ? (
          <div className="rounded-xl bg-white p-8 text-sm leading-relaxed text-[#0c1d22]/60">
            Choisis un producteur. Son nom, son texte et les expériences possibles se règlent ici, puis apparaissent sur la fiche publique.
          </div>
        ) : (
          <ProducteurForm
            draft={draft}
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
            onUpload={uploadAvatar}
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
  offres,
  dirty,
  saving,
  uploading,
  error,
  notice,
  onBack,
  onChange,
  onUpload,
  onSave,
  onPreview,
  onDelete,
}: {
  draft: StudioProducteur;
  offres: StudioOffreLien[];
  dirty: boolean;
  saving: boolean;
  uploading: boolean;
  error: string;
  notice: string;
  onBack: () => void;
  onChange: (partial: Partial<StudioProducteur>) => void;
  onUpload: (files: FileList | null) => void;
  onSave: () => void;
  onPreview: () => void;
  onDelete: () => void;
}) {
  const knownOffer = offres.some((offer) => offer.id === draft.seminaireId);

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
      <div className="flex items-center justify-between gap-3 lg:hidden">
        <button type="button" onClick={onBack} className="text-sm font-semibold">
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
          Le nom apparaît dans « Partir à la rencontre de… ». Les photos du lieu, l’hébergement et les formats restent dans Séminaire.
        </p>
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_180px] sm:items-end">
          <Field label="Pastille">
            <input
              value={draft.heroBadge}
              onChange={(event) => onChange({ heroBadge: event.target.value })}
              placeholder="BIO"
              className={inputClass}
            />
          </Field>
          <label className="flex items-center gap-3 pb-2.5 text-sm">
            <input
              type="checkbox"
              className={checkClass}
              checked={draft.bio}
              onChange={(event) => onChange({ bio: event.target.checked })}
            />
            Bio
          </label>
        </div>
        <AvatarField avatar={draft.avatar} uploading={uploading} onUpload={onUpload} onClear={() => onChange({ avatar: '' })} />
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
            <article key={experience.id} className="space-y-3 rounded-lg border border-[#0c1d22]/10 p-4">
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
                    className="flex size-8 items-center justify-center rounded-full border border-[#0c1d22]/10 disabled:opacity-30"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Déplacer après"
                    disabled={index === draft.experiences.length - 1}
                    onClick={() => onChange({ experiences: move(draft.experiences, index, 1) })}
                    className="flex size-8 items-center justify-center rounded-full border border-[#0c1d22]/10 disabled:opacity-30"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </span>
                <button
                  type="button"
                  onClick={() => onChange({ experiences: draft.experiences.filter((_, i) => i !== index) })}
                  className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0c1d22]/45"
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
          className="flex items-center gap-2 rounded-full border border-[#0c1d22] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em]"
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
            <article key={index} className="space-y-3 rounded-lg border border-[#0c1d22]/10 p-4">
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
                className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0c1d22]/45"
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
          className="flex items-center gap-2 rounded-full border border-[#0c1d22] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em]"
        >
          <Plus className="size-4" aria-hidden />
          Ajouter un avis
        </button>
      </Block>

      {error && <p className="text-sm text-[#ec6435]">{error}</p>}
      {notice && <p className="text-sm text-[#0c1d22]/70">{notice}</p>}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={saving || uploading}
          className="rounded-full bg-[#ec6435] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white disabled:opacity-50"
        >
          {saving ? 'Enregistrement…' : dirty ? 'Enregistrer' : 'Enregistrer'}
        </button>
        <button
          type="button"
          onClick={onPreview}
          disabled={saving || uploading || (!draft.id && !draft.name)}
          className="rounded-full border border-[#0c1d22] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0c1d22] disabled:opacity-50"
        >
          Prévisualiser
        </button>
        <button type="button" onClick={onDelete} className="text-sm text-[#0c1d22]/45">
          {draft.id ? 'Supprimer' : 'Annuler'}
        </button>
      </div>
    </form>
  );
}

function AvatarField({
  avatar,
  uploading,
  onUpload,
  onClear,
}: {
  avatar: string;
  uploading: boolean;
  onUpload: (files: FileList | null) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      {avatar ? (
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatar} alt="" className="h-20 w-20 rounded-lg object-cover" />
          <button type="button" onClick={onClear} className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0c1d22]/45">
            Retirer la photo
          </button>
        </div>
      ) : (
        <label className="flex h-16 cursor-pointer items-center gap-3 rounded-lg bg-[#0c1d22] px-4 text-white">
          <ImagePlus className="size-5 shrink-0" aria-hidden />
          <span>
            <span className="block text-sm font-semibold">{uploading ? 'Envoi…' : 'Ajouter une photo'}</span>
            <span className="block text-[11px] text-white/70">Portrait affiché à côté du nom.</span>
          </span>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
            className="sr-only"
            onChange={(event) => {
              onUpload(event.target.files);
              event.target.value = '';
            }}
          />
        </label>
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
      <div className="flex gap-2">
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
          className="shrink-0 rounded-full bg-[#0c1d22] px-4 text-[11px] font-bold uppercase tracking-[0.12em] text-white"
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
                className="rounded-full bg-[#f4f4f4] px-3 py-1.5 text-xs"
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
    <section className="space-y-4 rounded-xl bg-white p-5 sm:p-6">
      <h2 className="font-sans text-lg font-bold tracking-[-0.04em] text-[#0c1d22]">{title}</h2>
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

const checkClass = 'size-4 accent-[#ec6435]';
const inputClass =
  'w-full rounded-xl border border-[#0c1d22]/10 bg-white px-3 py-2.5 text-sm font-normal tracking-normal text-[#0c1d22] outline-none focus:border-[#0c1d22]/30';
