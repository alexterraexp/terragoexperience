'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ImagePlus, Plus } from 'lucide-react';
import { FRENCH_REGIONS } from '@/lib/frenchCities';
import { prepareStudioPhoto } from '@/lib/prepareStudioPhoto';
import { OFFER_AMENITIES, OFFER_PILLS } from '@/lib/offerPills';
import {
  emptyHebergement,
  emptyOffre,
  HEBERGEMENT_TYPES,
  slugifyOffre,
  type StudioFormat,
  type StudioHebergement,
  type StudioOffre,
  type StudioStatut,
} from '@/lib/studioTypes';
import { exempleSeminaireEntreprisePath } from '@/lib/exemplesSeminaireEntreprise';

type SessionState = {
  configured: boolean;
  authenticated: boolean;
};

const STATUTS: { id: StudioStatut; label: string }[] = [
  { id: 'brouillon', label: 'Brouillon' },
  { id: 'bientot', label: 'Bientôt' },
  { id: 'publie', label: 'Publiée' },
];

async function readError(response: Response): Promise<string> {
  const data = (await response.json().catch(() => ({}))) as { error?: string };
  return data.error || 'Une erreur est survenue.';
}

export default function StudioApp() {
  const [session, setSession] = useState<SessionState | null>(null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginPending, setLoginPending] = useState(false);
  const [offres, setOffres] = useState<StudioOffre[]>([]);
  const [schemaReady, setSchemaReady] = useState(true);
  const [draft, setDraft] = useState<StudioOffre | null>(null);
  const [baseline, setBaseline] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [listError, setListError] = useState('');
  const [formError, setFormError] = useState('');
  const [notice, setNotice] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const dirty = draft != null && baseline !== '' && JSON.stringify(draft) !== baseline;

  const loadOffres = useCallback(async () => {
    const response = await fetch('/api/studio/offres', { cache: 'no-store' });
    if (!response.ok) throw new Error(await readError(response));
    const data = (await response.json()) as { offres: StudioOffre[]; schemaReady: boolean };
    setOffres(data.offres);
    setSchemaReady(data.schemaReady);
    return data.offres;
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/studio/session', { cache: 'no-store' })
      .then((response) => response.json())
      .then((data: SessionState) => {
        if (!cancelled) setSession(data);
      })
      .catch(() => {
        if (!cancelled) setSession({ configured: false, authenticated: false });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!session?.authenticated) return;
    loadOffres().catch((error: Error) => setListError(error.message));
  }, [session?.authenticated, loadOffres]);

  const openOffre = (offre: StudioOffre, touched = true) => {
    if (dirty && !window.confirm('Des modifications ne sont pas enregistrées. Les abandonner ?')) return;
    setDraft(offre);
    setBaseline(JSON.stringify(offre));
    setSlugTouched(touched);
    setFormError('');
    setNotice('');
  };

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginPending(true);
    setLoginError('');
    try {
      const response = await fetch('/api/studio/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) throw new Error(await readError(response));
      setPassword('');
      setSession({ configured: true, authenticated: true });
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Connexion impossible.');
    } finally {
      setLoginPending(false);
    }
  };

  const logout = async () => {
    await fetch('/api/studio/logout', { method: 'POST' });
    setSession({ configured: true, authenticated: false });
    setDraft(null);
    setOffres([]);
  };

  const patch = (partial: Partial<StudioOffre>) => {
    setDraft((current) => (current ? { ...current, ...partial } : current));
  };

  const uploadFiles = async (files: FileList | File[], target: 'offre' | number, at?: number) => {
    const list = [...files];
    if (list.length === 0) return;
    setUploading(true);
    setFormError('');
    try {
      const urls: string[] = [];
      for (const file of list) {
        const body = new FormData();
        body.set('file', await prepareStudioPhoto(file));
        const response = await fetch('/api/studio/upload', { method: 'POST', body });
        if (!response.ok) throw new Error(await readError(response));
        const data = (await response.json()) as { url: string };
        urls.push(data.url);
      }
      setDraft((current) => {
        if (!current) return current;
        if (target === 'offre') return { ...current, images: insertImages(current.images, urls, at, 12) };
        const hebergements = current.hebergements.map((item, index) =>
          index === target ? { ...item, images: insertImages(item.images, urls, at, 8) } : item,
        );
        return { ...current, hebergements };
      });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Envoi impossible.');
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!draft) return;
    setSaving(true);
    setFormError('');
    setNotice('');
    try {
      const creating = !draft.id;
      const response = await fetch(creating ? '/api/studio/offres' : `/api/studio/offres/${draft.id}`, {
        method: creating ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      });
      if (!response.ok) throw new Error(await readError(response));
      const data = (await response.json()) as { offre: StudioOffre; warning?: string };
      setDraft(data.offre);
      setBaseline(JSON.stringify(data.offre));
      setSlugTouched(true);
      const next = await loadOffres();
      setOffres(next);
      setNotice(data.warning || 'Enregistré.');
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Enregistrement impossible.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!draft?.id) {
      setDraft(null);
      return;
    }
    if (!window.confirm('Retirer cette offre ? Les demandes de devis déjà reçues peuvent empêcher la suppression.')) return;
    setSaving(true);
    setFormError('');
    try {
      const response = await fetch(`/api/studio/offres/${draft.id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error(await readError(response));
      setDraft(null);
      setBaseline('');
      await loadOffres();
      setNotice('Offre retirée.');
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Suppression impossible.');
    } finally {
      setSaving(false);
    }
  };

  if (!session) {
    return <Shell><p className="text-sm text-[#0c1d22]/60">Ouverture de l’espace…</p></Shell>;
  }

  if (!session.configured) {
    return (
      <Shell>
        <h1 className="font-sans text-3xl tracking-[-0.05em] text-[#0c1d22]">Espace fondateurs</h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-[#0c1d22]/70">
          Ajoute <code className="text-[#0c1d22]">STUDIO_PASSWORD</code> dans les variables du serveur
          (au moins 8 caractères), puis relance le site.
        </p>
      </Shell>
    );
  }

  if (!session.authenticated) {
    return (
      <Shell>
        <h1 className="font-sans text-3xl tracking-[-0.05em] text-[#0c1d22]">Espace fondateurs</h1>
        <p className="mt-2 text-sm text-[#0c1d22]/60">Le catalogue public ne montre pas cet écran.</p>
        <form onSubmit={login} className="mt-8 space-y-4">
          <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0c1d22]/50">
            Mot de passe
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#0c1d22]/10 bg-[#f4f4f4] px-4 py-3 text-sm outline-none focus:border-[#0c1d22]/30"
            />
          </label>
          {loginError && <p className="text-sm text-[#ec6435]">{loginError}</p>}
          <button
            type="submit"
            disabled={loginPending || password.length === 0}
            className="rounded-full bg-[#0c1d22] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white disabled:opacity-50"
          >
            {loginPending ? 'Ouverture…' : 'Entrer'}
          </button>
        </form>
      </Shell>
    );
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[#f6f4f1] text-[#0c1d22]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-[#0c1d22]/8 bg-white px-5 py-3 sm:px-8">
        <Image src="/logo.png" alt="TerraGo" width={116} height={90} priority className="h-9 w-auto object-contain sm:h-10" />
        <button type="button" onClick={logout} className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0c1d22]/50">
          Fermer
        </button>
      </header>

      <div className="mx-auto grid min-h-0 w-full max-w-7xl flex-1 gap-6 overflow-hidden px-4 py-6 lg:grid-cols-[380px_minmax(0,1fr)] lg:px-8">
        <aside className={draft ? 'hidden min-h-0 lg:flex lg:flex-col' : 'flex min-h-0 flex-col'}>
          <button
            type="button"
            onClick={() => openOffre(emptyOffre(), false)}
            className="mb-4 flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#0c1d22] px-5 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white"
          >
            <Plus className="size-5" aria-hidden />
            Nouvelle offre
          </button>
          {listError && <p className="mb-3 shrink-0 text-sm text-[#ec6435]">{listError}</p>}
          <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-y-contain pl-0.5 pr-5 [scrollbar-gutter:stable] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#0c1d22]/30 [&::-webkit-scrollbar-track]:bg-transparent">
            {offres.map((offre) => (
              <li key={offre.id}>
                <button
                  type="button"
                  onClick={() => openOffre(offre)}
                  className={`flex w-full items-center gap-4 rounded-lg border bg-white p-3 text-left ${
                    draft?.id === offre.id ? 'border-[#0c1d22]' : 'border-[#0c1d22]/10'
                  }`}
                >
                  <span className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-[#f4f4f4]">
                    {offre.images[0] && (
                      // Aperçu d’URL déjà stockées, y compris hors motifs next/image.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={offre.images[0]} alt="" className="h-full w-full object-cover" />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[11px] font-bold uppercase tracking-[0.12em] text-[#ec6435]">
                      {offre.producteur || 'Sans producteur'}
                    </span>
                    <span className="block truncate text-base font-semibold">{offre.label || 'Sans titre'}</span>
                    <span className="text-[11px] text-[#0c1d22]/50">
                      {STATUTS.find((item) => item.id === offre.statut)?.label}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className={draft ? 'min-h-0 overflow-y-auto overscroll-y-contain' : 'hidden min-h-0 overflow-y-auto overscroll-y-contain lg:block'}>
          {!draft ? (
            <div className="rounded-xl bg-white p-8 text-sm text-[#0c1d22]/60">
              Choisis une offre, ou crée-en une. Le catalogue public se met à jour à l’enregistrement.
            </div>
          ) : (
            <OffreForm
              draft={draft}
              dirty={dirty}
              schemaReady={schemaReady}
              saving={saving}
              uploading={uploading}
              error={formError}
              notice={notice}
              onBack={() => {
                if (dirty && !window.confirm('Des modifications ne sont pas enregistrées. Les abandonner ?')) return;
                setDraft(null);
              }}
              onChange={patch}
              onProducteur={(producteur) => {
                setDraft((current) => {
                  if (!current) return current;
                  const next = { ...current, producteur };
                  if (!slugTouched) next.slug = slugifyOffre(producteur);
                  return next;
                });
              }}
              onSlug={(slug) => {
                setSlugTouched(true);
                patch({ slug: slugifyOffre(slug) });
              }}
              onUpload={uploadFiles}
              onSave={save}
              onDelete={remove}
            />
          )}
        </section>
      </div>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f4f1] px-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">{children}</div>
    </main>
  );
}

function OffreForm({
  draft,
  dirty,
  schemaReady,
  saving,
  uploading,
  error,
  notice,
  onBack,
  onChange,
  onProducteur,
  onSlug,
  onUpload,
  onSave,
  onDelete,
}: {
  draft: StudioOffre;
  dirty: boolean;
  schemaReady: boolean;
  saving: boolean;
  uploading: boolean;
  error: string;
  notice: string;
  onBack: () => void;
  onChange: (partial: Partial<StudioOffre>) => void;
  onProducteur: (value: string) => void;
  onSlug: (value: string) => void;
  onUpload: (files: FileList | File[], target: 'offre' | number, at?: number) => void;
  onSave: () => void;
  onDelete: () => void;
}) {
  const preview = draft.slug && draft.statut !== 'brouillon' ? exempleSeminaireEntreprisePath(draft.slug) : '';
  const activiteRef = React.useRef<HTMLInputElement>(null);

  const addActivite = () => {
    const value = activiteRef.current?.value.trim() ?? '';
    if (!value) return;
    onChange({ activites: [...draft.activites, value] });
    if (activiteRef.current) activiteRef.current.value = '';
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
          ← Offres
        </button>
      </div>

      {!schemaReady && (
        <p className="rounded-lg bg-[#fff4ee] px-4 py-3 text-sm leading-relaxed text-[#0c1d22]">
          Les pilules et les activités sont enregistrées avec l’offre et s’affichent sur le catalogue.
          Le masquage en brouillon attend encore une colonne Supabase : en attendant, choisis « Bientôt ».
        </p>
      )}

      <Block title="Le lieu">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Producteur">
            <input value={draft.producteur} onChange={(event) => onProducteur(event.target.value)} placeholder="Avec Paolo" className={inputClass} />
          </Field>
          <Field label="Titre de l’offre">
            <input value={draft.label} onChange={(event) => onChange({ label: event.target.value })} placeholder="Séminaire dans les oliviers" className={inputClass} />
          </Field>
          <Field label="Village ou lieu">
            <input value={draft.locality} onChange={(event) => onChange({ locality: event.target.value })} placeholder="Menton" className={inputClass} />
          </Field>
          <Field label="Région">
            <select value={draft.regionName} onChange={(event) => onChange({ regionName: event.target.value })} className={inputClass}>
              <option value="">Choisir</option>
              {draft.regionName && !FRENCH_REGIONS.includes(draft.regionName) && (
                <option value={draft.regionName}>{draft.regionName}</option>
              )}
              {FRENCH_REGIONS.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Adresse de la page">
          <input value={draft.slug} onChange={(event) => onSlug(event.target.value)} placeholder="avec-paolo" className={inputClass} />
        </Field>
        <PhotoList
          images={draft.images}
          uploading={uploading}
          onUpload={(files, at) => onUpload(files, 'offre', at)}
          onChange={(images) => onChange({ images })}
        />
      </Block>

      <Block title="Pilules">
        <div className="flex flex-wrap gap-2">
          {OFFER_PILLS.map((pill) => {
            const on = draft.pills.includes(pill.id);
            return (
              <button
                key={pill.id}
                type="button"
                aria-pressed={on}
                onClick={() => onChange({
                  pills: on ? draft.pills.filter((id) => id !== pill.id) : [...draft.pills, pill.id],
                })}
                className={on ? chipOn : chipOff}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </Block>

      <Block title="Hébergement">
        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={draft.hebergement}
            onChange={(event) => {
              const on = event.target.checked;
              onChange({
                hebergement: on,
                hebergements: on && draft.hebergements.length === 0 ? [emptyHebergement()] : draft.hebergements,
                inclus: on
                  ? Array.from(new Set([...draft.inclus, 'hebergement']))
                  : draft.inclus.filter((id) => id !== 'hebergement'),
              });
            }}
          />
          On peut dormir sur place
        </label>
        {draft.hebergement && (
          <div className="space-y-4">
            {draft.hebergements.map((item, index) => (
              <HebergementCard
                key={index}
                item={item}
                uploading={uploading}
                onChange={(next) => onChange({
                  hebergements: draft.hebergements.map((current, i) => (i === index ? next : current)),
                })}
                onUpload={(files, at) => onUpload(files, index, at)}
                onRemove={() => onChange({
                  hebergements: draft.hebergements.filter((_, i) => i !== index),
                })}
              />
            ))}
            <button
              type="button"
              onClick={() => onChange({ hebergements: [...draft.hebergements, emptyHebergement()] })}
              className="text-sm font-semibold text-[#ec6435]"
            >
              Ajouter un logement
            </button>
          </div>
        )}
      </Block>

      <Block title="Activités sur place">
        <div className="flex flex-wrap gap-2">
          {OFFER_AMENITIES.filter((item) => item.id !== 'hebergement').map((item) => {
            const on = draft.inclus.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={on}
                onClick={() => onChange({
                  inclus: on ? draft.inclus.filter((id) => id !== item.id) : [...draft.inclus, item.id],
                })}
                className={on ? chipOn : chipOff}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <div className="flex gap-2">
          <input ref={activiteRef} placeholder="Visite du chai, atelier pain…" className={inputClass} onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              addActivite();
            }
          }} />
          <button type="button" onClick={addActivite} className="shrink-0 rounded-full border border-[#0c1d22]/15 px-4 text-[11px] font-bold uppercase tracking-[0.1em]">
            Ajouter
          </button>
        </div>
        <ul className="space-y-2">
          {draft.activites.map((activite, index) => (
            <li key={`${activite}-${index}`} className="flex items-center justify-between gap-3 rounded-xl bg-[#f4f4f4] px-3 py-2 text-sm">
              <span>{activite}</span>
              <button
                type="button"
                onClick={() => onChange({ activites: draft.activites.filter((_, i) => i !== index) })}
                className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0c1d22]/45"
              >
                Retirer
              </button>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Formats">
        <FormatCard
          title="À la journée"
          format={draft.journee}
          onChange={(journee) => onChange({ journee })}
        />
        <FormatCard
          title="Résidentiel"
          format={draft.residentiel}
          onChange={(residentiel) => onChange({ residentiel })}
        />
      </Block>

      <Block title="Visibilité">
        <div className="flex flex-wrap gap-2">
          {STATUTS.map((statut) => (
            <button
              key={statut.id}
              type="button"
              aria-pressed={draft.statut === statut.id}
              onClick={() => onChange({ statut: statut.id })}
              className={draft.statut === statut.id ? chipOn : chipOff}
            >
              {statut.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={draft.bestseller}
            onChange={(event) => onChange({ bestseller: event.target.checked })}
          />
          Marquer comme populaire
        </label>
        <Field label="Ordre dans le catalogue">
          <input
            type="number"
            min={0}
            value={draft.ordre}
            onChange={(event) => onChange({ ordre: Number(event.target.value) })}
            className={`${inputClass} max-w-[140px]`}
          />
        </Field>
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
        {preview && (
          <a href={preview} target="_blank" rel="noreferrer" className="text-sm font-semibold underline">
            Voir la fiche publique
          </a>
        )}
        <button type="button" onClick={onDelete} className="text-sm text-[#0c1d22]/45">
          {draft.id ? 'Supprimer' : 'Annuler'}
        </button>
      </div>
    </form>
  );
}

function FormatCard({
  title,
  format,
  onChange,
}: {
  title: string;
  format: StudioFormat;
  onChange: (format: StudioFormat) => void;
}) {
  return (
    <div className="rounded-lg border border-[#0c1d22]/8 p-4">
      <label className="flex items-center gap-3 text-sm font-semibold">
        <input
          type="checkbox"
          checked={format.actif}
          onChange={(event) => onChange({ ...format, actif: event.target.checked })}
        />
        {title}
      </label>
      {format.actif && (
        <div className="mt-4 grid gap-3">
          <Field label="Phrase courte, affichée sur la carte">
            <input value={format.sousTitre} onChange={(event) => onChange({ ...format, sousTitre: event.target.value })} className={inputClass} />
          </Field>
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Effectif">
              <input value={format.participants} onChange={(event) => onChange({ ...format, participants: event.target.value })} placeholder="Jusqu’à 30 pers." className={inputClass} />
            </Field>
            <Field label="Durée">
              <input value={format.duree} onChange={(event) => onChange({ ...format, duree: event.target.value })} placeholder="1 journée" className={inputClass} />
            </Field>
            <Field label="Prix">
              <input value={format.prix} onChange={(event) => onChange({ ...format, prix: event.target.value })} placeholder="Tarif sur demande" className={inputClass} />
            </Field>
          </div>
          <ProgrammeLines
            lines={format.programme}
            onChange={(programme) => onChange({ ...format, programme })}
          />
        </div>
      )}
    </div>
  );
}

function ProgrammeLines({
  lines,
  onChange,
}: {
  lines: StudioFormat['programme'];
  onChange: (lines: StudioFormat['programme']) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0c1d22]/45">Exemple de déroulé</p>
      {lines.map((line, index) => (
        <div key={index} className="grid grid-cols-[96px_minmax(0,1fr)_auto] gap-2">
          <input
            value={line.heure}
            onChange={(event) => onChange(lines.map((item, i) => i === index ? { ...item, heure: event.target.value } : item))}
            placeholder="9h30"
            className={inputClass}
          />
          <input
            value={line.action}
            onChange={(event) => onChange(lines.map((item, i) => i === index ? { ...item, action: event.target.value } : item))}
            placeholder="Accueil au domaine"
            className={inputClass}
          />
          <button type="button" onClick={() => onChange(lines.filter((_, i) => i !== index))} className="text-[11px] uppercase tracking-[0.08em] text-[#0c1d22]/40">
            Retirer
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...lines, { heure: '', action: '' }])}
        className="text-sm font-semibold text-[#ec6435]"
      >
        Ajouter un créneau
      </button>
    </div>
  );
}

function HebergementCard({
  item,
  uploading,
  onChange,
  onUpload,
  onRemove,
}: {
  item: StudioHebergement;
  uploading: boolean;
  onChange: (item: StudioHebergement) => void;
  onUpload: (files: FileList | File[], at?: number) => void;
  onRemove: () => void;
}) {
  return (
    <div className="space-y-3 rounded-lg bg-[#f7f6f4] p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Nom">
          <input value={item.nom} onChange={(event) => onChange({ ...item, nom: event.target.value })} className={inputClass} />
        </Field>
        <Field label="Type">
          <select value={item.type} onChange={(event) => onChange({ ...item, type: event.target.value })} className={inputClass}>
            <option value="">Choisir</option>
            {item.type && !HEBERGEMENT_TYPES.some((type) => type.id === item.type) && (
              <option value={item.type}>{item.type}</option>
            )}
            {HEBERGEMENT_TYPES.map((type) => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Capacité">
          <input value={item.capacite} onChange={(event) => onChange({ ...item, capacite: event.target.value })} placeholder="12 personnes" className={inputClass} />
        </Field>
        <Field label="Prix / nuit">
          <input value={item.prixNuit} onChange={(event) => onChange({ ...item, prixNuit: event.target.value })} placeholder="90" className={inputClass} />
        </Field>
      </div>
      <Field label="Descriptif">
        <textarea
          value={item.description}
          onChange={(event) => onChange({ ...item, description: event.target.value })}
          rows={3}
          className={inputClass}
        />
      </Field>
      <PhotoList images={item.images} uploading={uploading} onUpload={onUpload} onChange={(images) => onChange({ ...item, images })} />
      <button type="button" onClick={onRemove} className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0c1d22]/45">
        Retirer ce logement
      </button>
    </div>
  );
}

function PhotoList({
  images,
  uploading,
  onUpload,
  onChange,
}: {
  images: string[];
  uploading: boolean;
  onUpload: (files: FileList | File[], at?: number) => void;
  onChange: (images: string[]) => void;
}) {
  const [overIndex, setOverIndex] = React.useState<number | null>(null);

  const dropOn = (event: React.DragEvent, index: number) => {
    event.preventDefault();
    event.stopPropagation();
    setOverIndex(null);
    const from = event.dataTransfer.getData(PHOTO_DRAG);
    if (from !== '') {
      onChange(placeAt(images, Number(from), index));
      return;
    }
    if (event.dataTransfer.files.length > 0) onUpload(event.dataTransfer.files, index);
  };

  return (
    <div>
      <label
        className="flex cursor-pointer items-center gap-3 rounded-lg bg-primary px-4 py-3 text-left text-sm text-white"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          if (event.dataTransfer.getData(PHOTO_DRAG) !== '') return;
          if (event.dataTransfer.files.length > 0) onUpload(event.dataTransfer.files);
        }}
      >
        <ImagePlus className="size-5 shrink-0" aria-hidden />
        <span>
          <span className="block">{uploading ? 'Envoi…' : 'Ajouter des photos'}</span>
          {!uploading && (
            <span className="mt-0.5 block text-xs text-white/70">Glisse une photo sur une autre pour la mettre en premier ou au milieu.</span>
          )}
        </span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          multiple
          className="sr-only"
          onChange={(event) => {
            if (event.target.files) onUpload(event.target.files);
            event.target.value = '';
          }}
        />
      </label>
      {images.length > 0 && (
        <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {images.map((url, index) => (
            <li
              key={`${url}-${index}`}
              draggable
              onDragStart={(event) => {
                event.dataTransfer.setData(PHOTO_DRAG, String(index));
                event.dataTransfer.effectAllowed = 'move';
              }}
              onDragEnd={() => setOverIndex(null)}
              onDragOver={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setOverIndex(index);
              }}
              onDragLeave={() => setOverIndex((current) => (current === index ? null : current))}
              onDrop={(event) => dropOn(event, index)}
              className={overIndex === index ? 'cursor-grabbing rounded-lg ring-2 ring-[#ec6435]' : 'cursor-grab'}
            >
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt=""
                  draggable={false}
                  className="pointer-events-none aspect-[4/3] w-full rounded-lg object-cover"
                />
                {index === 0 && (
                  <span className="absolute left-1.5 top-1.5 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em]">
                    Couverture
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
                    <Arrow direction="left" />
                  </button>
                  <button
                    type="button"
                    aria-label="Déplacer après"
                    disabled={index === images.length - 1}
                    onClick={() => onChange(move(images, index, 1))}
                    className="flex size-7 items-center justify-center rounded-full bg-white/90 text-[#0c1d22] shadow-sm disabled:opacity-30"
                  >
                    <Arrow direction="right" />
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

const PHOTO_DRAG = 'application/x-studio-photo';

function insertImages(current: string[], urls: string[], at: number | undefined, limit: number): string[] {
  const next = [...current];
  const index = at == null ? next.length : Math.min(Math.max(at, 0), next.length);
  next.splice(index, 0, ...urls);
  return next.slice(0, limit);
}

function placeAt(images: string[], from: number, to: number): string[] {
  if (from === to || from < 0 || to < 0 || from >= images.length || to >= images.length) return images;
  const copy = [...images];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

function move(images: string[], index: number, delta: number): string[] {
  const next = index + delta;
  if (next < 0 || next >= images.length) return images;
  const copy = [...images];
  const [item] = copy.splice(index, 1);
  copy.splice(next, 0, item);
  return copy;
}

function Arrow({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d={direction === 'left' ? 'M8.5 2.5 4 7l4.5 4.5' : 'M5.5 2.5 10 7l-4.5 4.5'}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
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

const inputClass =
  'w-full rounded-xl border border-[#0c1d22]/10 bg-white px-3 py-2.5 text-sm font-normal tracking-normal text-[#0c1d22] outline-none focus:border-[#0c1d22]/30';
const chipOff =
  'rounded-full border border-[#0c1d22]/12 bg-white px-3 py-1.5 text-[12px] text-[#0c1d22]';
const chipOn =
  'rounded-full border border-[#0c1d22] bg-[#0c1d22] px-3 py-1.5 text-[12px] text-white';
