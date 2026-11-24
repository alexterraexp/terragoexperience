'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Plus } from 'lucide-react';
import type { StudioArticle } from '@/lib/studioArticles';
import type { SeminaireRealise } from '@/lib/seminairesRealises';
import type { StudioProducteur } from '@/lib/studioProducteurs';
import type { StudioOffre, StudioStatut } from '@/lib/studioTypes';

type Space = 'seminaire' | 'producteur' | 'realises' | 'articles';

const STATUT: Record<StudioStatut, string> = {
  publie: 'Publiée',
  brouillon: 'Brouillon',
  bientot: 'Bientôt',
};

async function readError(response: Response): Promise<string> {
  const data = (await response.json().catch(() => ({}))) as { error?: string };
  return data.error || 'Lecture impossible.';
}

export default function StudioHome({
  active,
  onCreate,
  onOpen,
  onSeeAll,
}: {
  active: boolean;
  onCreate: (space: Space) => void;
  onOpen: (space: Space, id: string) => void;
  onSeeAll: (space: Space) => void;
}) {
  const [offres, setOffres] = useState<StudioOffre[]>([]);
  const [producteurs, setProducteurs] = useState<StudioProducteur[]>([]);
  const [realises, setRealises] = useState<SeminaireRealise[]>([]);
  const [realisesReady, setRealisesReady] = useState(true);
  const [articles, setArticles] = useState<StudioArticle[]>([]);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    const [offresRes, producteursRes, realisesRes, articlesRes] = await Promise.all([
      fetch('/api/studio/offres', { cache: 'no-store' }),
      fetch('/api/studio/producteurs', { cache: 'no-store' }),
      fetch('/api/studio/realises', { cache: 'no-store' }),
      fetch('/api/studio/articles', { cache: 'no-store' }),
    ]);
    if (!offresRes.ok) throw new Error(await readError(offresRes));
    if (!producteursRes.ok) throw new Error(await readError(producteursRes));
    if (!realisesRes.ok) throw new Error(await readError(realisesRes));
    if (!articlesRes.ok) throw new Error(await readError(articlesRes));
    const offresData = (await offresRes.json()) as { offres: StudioOffre[] };
    const producteursData = (await producteursRes.json()) as { producteurs: StudioProducteur[] };
    const realisesData = (await realisesRes.json()) as { realises: SeminaireRealise[]; schemaReady: boolean };
    const articlesData = (await articlesRes.json()) as { articles: StudioArticle[] };
    setOffres(offresData.offres);
    setProducteurs(producteursData.producteurs);
    setRealises(realisesData.realises);
    setRealisesReady(realisesData.schemaReady);
    setArticles(articlesData.articles);
  }, []);

  useEffect(() => {
    if (!active) return;
    load().catch((reason: Error) => setError(reason.message));
  }, [active, load]);

  const brouillons = offres.filter((offre) => offre.statut === 'brouillon').length;
  const bientot = offres.filter((offre) => offre.statut === 'bientot').length;
  const realisesBrouillon = realises.filter((item) => !item.publie).length;
  const articlesBrouillon = articles.filter((item) => !item.published).length;
  const attention = brouillons + bientot + realisesBrouillon + articlesBrouillon;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-[#f4f4f4]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8">
        <div>
          <h1 className="font-sans text-[32px] font-normal leading-[1.05] tracking-[-0.075em] sm:text-[40px]">
            Bienvenue.
          </h1>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Action label="Nouveau séminaire" onClick={() => onCreate('seminaire')} />
            <Action label="Nouveau producteur" onClick={() => onCreate('producteur')} />
            <Action label="Nouvelle réalisation" onClick={() => onCreate('realises')} />
            <Action label="Nouvel article" onClick={() => onCreate('articles')} />
          </div>
        </div>

        {error && <p className="text-sm text-[#ec6435]">{error}</p>}

        <section>
          <h2 className="font-sans text-base font-semibold tracking-[-0.03em]">En ce moment</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Figure value={offres.length} label="Nos séminaires" detail={`${offres.filter((offre) => offre.statut === 'publie').length} publiées`} />
            <Figure value={producteurs.length} label="Nos producteurs" detail="fiches à jour" />
            <Figure
              value={realisesReady ? realises.length : '—'}
              label="Nos réalisations"
              detail={realisesReady ? `${realises.filter((item) => item.publie).length} publiées` : 'table à créer'}
            />
            <Figure
              value={articles.length}
              label="Nos articles"
              detail={`${articles.filter((item) => item.published).length} publiés`}
            />
          </div>
        </section>

        <section className="rounded-lg bg-white px-5 py-5 sm:px-6">
          <h2 className="font-sans text-base font-semibold tracking-[-0.03em]">À reprendre</h2>
          {attention === 0 ? (
            <p className="mt-4 text-sm text-[#0c1d22]/60">Tout est publié.</p>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Attention count={brouillons} label="Séminaires en brouillon" action="Ouvrir" onClick={() => onSeeAll('seminaire')} />
              <Attention count={bientot} label="Séminaires bientôt en ligne" action="Ouvrir" onClick={() => onSeeAll('seminaire')} />
              <Attention count={realisesBrouillon} label="Réalisations à publier" action="Ouvrir" onClick={() => onSeeAll('realises')} />
              <Attention count={articlesBrouillon} label="Articles en brouillon" action="Ouvrir" onClick={() => onSeeAll('articles')} />
            </div>
          )}
        </section>

        <section className="grid gap-3 lg:grid-cols-2 xl:grid-cols-4">
          <Column title="Nos séminaires" onSeeAll={() => onSeeAll('seminaire')}>
            {offres.slice(0, 4).map((offre) => (
              <Row
                key={offre.id}
                image={offre.images[0]}
                title={offre.label || 'Sans titre'}
                meta={offre.producteur || 'Sans producteur'}
                aside={STATUT[offre.statut]}
                onClick={() => onOpen('seminaire', offre.id)}
              />
            ))}
            {offres.length === 0 && <Empty label="Aucune offre pour le moment." />}
          </Column>

          <Column title="Nos producteurs" onSeeAll={() => onSeeAll('producteur')}>
            {producteurs.slice(0, 4).map((producteur) => (
              <Row
                key={producteur.id}
                image={producteur.avatar}
                title={producteur.name || 'Sans nom'}
                meta={producteur.type || 'Producteur'}
                aside={`${producteur.experiences.length} exp.`}
                onClick={() => onOpen('producteur', producteur.id)}
              />
            ))}
            {producteurs.length === 0 && <Empty label="Aucune fiche pour le moment." />}
          </Column>

          <Column title="Nos réalisations" onSeeAll={() => onSeeAll('realises')}>
            {realises.slice(0, 4).map((item) => (
              <Row
                key={item.id}
                image={item.images[0] || item.couverture}
                title={item.titre || 'Sans titre'}
                meta={item.lieu || 'Sans lieu'}
                aside={item.publie ? 'Publiée' : 'Brouillon'}
                onClick={() => onOpen('realises', item.id)}
              />
            ))}
            {realises.length === 0 && (
              <Empty label={realisesReady ? 'Aucun récit pour le moment.' : 'La table Supabase n’est pas encore créée.'} />
            )}
          </Column>

          <Column title="Nos articles" onSeeAll={() => onSeeAll('articles')}>
            {articles.slice(0, 4).map((item) => (
              <Row
                key={item.id}
                image={item.coverUrl}
                title={item.title || 'Sans titre'}
                meta={item.category || 'Sans catégorie'}
                aside={item.published ? (item.featured ? 'À la une' : 'Publié') : 'Brouillon'}
                onClick={() => onOpen('articles', item.id)}
              />
            ))}
            {articles.length === 0 && <Empty label="Aucun article pour le moment." />}
          </Column>
        </section>
      </div>
    </div>
  );
}

function Action({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0c1d22]/10 bg-white px-4 py-2.5 text-sm font-medium text-[#0c1d22] shadow-[0_1px_2px_rgba(12,29,34,0.04)]"
    >
      <Plus className="size-4 text-[#ec6435]" aria-hidden />
      {label}
    </button>
  );
}

function Figure({ value, label, detail }: { value: number | string; label: string; detail: string }) {
  return (
    <article className="rounded-lg bg-white px-5 py-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#ec6435]">{label}</p>
      <p className="mt-2 font-sans text-[34px] font-semibold leading-none tracking-[-0.06em]">{value}</p>
      <p className="mt-2 text-sm text-[#0c1d22]/55">{detail}</p>
    </article>
  );
}

function Attention({
  count,
  label,
  action,
  onClick,
}: {
  count: number;
  label: string;
  action: string;
  onClick: () => void;
}) {
  return (
    <div>
      <p className="text-sm text-[#0c1d22]/55">{label}</p>
      <p className="mt-1 font-sans text-2xl font-semibold tracking-[-0.04em]">{count}</p>
      {count > 0 && (
        <button type="button" onClick={onClick} className="mt-3 rounded-full bg-[#0c1d22] px-4 py-2 text-sm font-medium text-white">
          {action}
        </button>
      )}
    </div>
  );
}

function Column({
  title,
  onSeeAll,
  children,
}: {
  title: string;
  onSeeAll: () => void;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col rounded-lg bg-white px-4 py-4 sm:px-5">
      <h2 className="font-sans text-base font-semibold tracking-[-0.03em]">{title}</h2>
      <ul className="mt-3 flex flex-1 flex-col gap-1">{children}</ul>
      <button type="button" onClick={onSeeAll} className="mt-3 py-2 text-sm font-semibold text-[#ec6435]">
        Voir toutes
      </button>
    </section>
  );
}

function Row({
  image,
  title,
  meta,
  aside,
  onClick,
}: {
  image?: string;
  title: string;
  meta: string;
  aside: string;
  onClick: () => void;
}) {
  return (
    <li>
      <button type="button" onClick={onClick} className="flex w-full items-center gap-3 rounded-lg px-1 py-2 text-left hover:bg-[#f4f4f4]">
        <span className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[#f4f4f4]">
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="" className="h-full w-full object-cover" />
          )}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium">{title}</span>
          <span className="block truncate text-[12px] text-[#0c1d22]/45">{meta}</span>
        </span>
        <span className="shrink-0 text-[12px] text-[#0c1d22]/55">{aside}</span>
      </button>
    </li>
  );
}

function Empty({ label }: { label: string }) {
  return <li className="px-1 py-3 text-sm text-[#0c1d22]/45">{label}</li>;
}
