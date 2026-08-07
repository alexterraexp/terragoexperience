'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { supabase } from '../lib/supabase';
import { useModal } from '../context/ModalContext';
import {
  type Producer,
  type ProducerFull,
  type SupabaseProducerRow,
  mapSupabaseRowToFull,
  fullToProducer,
} from '../lib/producerTypes';
import {
  HOME_COLORS,
  HOME_RADIUS,
  bottomImageGradientClass,
  homeHeroOutlineButtonClass,
  homeSectionPadding,
} from '../components/home/homeStyles';
import { HOME_EMOJI } from '../lib/homeStorage';
import ProducerDetailModal from '../components/ProducerDetailModal';

const HOME_ASSETS =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME';

const PRODUCER_ASSETS = {
  hero: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/serre-maraicher.jpg',
  producteurSoutenu: `${HOME_ASSETS}/emoji/producteur-sountenu.png`,
  mainsDansLaTerre: HOME_EMOJI.mainsDansLaTerre,
  rateau: HOME_EMOJI.rateau,
};

const sectionTitleClass =
  'font-sans text-[clamp(1.05rem,3.1vw,2.25rem)] font-normal leading-[1.15] tracking-[-0.06em] text-[#0c1d22] whitespace-nowrap';

// ── ProducerCard ─────────────────────────────────────────────────────────────
type ProducerCardProps = {
  producer: Producer;
  onClick: (id: string) => void;
};

const ProducerCard: React.FC<ProducerCardProps> = ({ producer, onClick }) => {
  return (
    <button
      type="button"
      className="prod-mini-card"
      onClick={() => onClick(producer.id)}
      aria-label={producer.name}
    >
      {producer.cover ? (
        <img
          src={producer.cover}
          alt=""
          className="prod-mini-card-img"
          draggable={false}
        />
      ) : (
        <div className="prod-mini-card-fallback" aria-hidden>🌿</div>
      )}
      <div className="prod-mini-card-gradient" aria-hidden />
      <div className="prod-mini-card-copy">
        <span className="prod-mini-card-title">{producer.name}</span>
        {producer.type ? <span className="prod-mini-card-name">{producer.type}</span> : null}
      </div>
    </button>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────────
const ProducersPage: React.FC = () => {
  const [producersFull, setProducersFull] = useState<ProducerFull[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProducer, setSelectedProducer] = useState<ProducerFull | null>(null);
  const { openPartenaireModal, openRecommanderModal } = useModal();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const producers: Producer[] = producersFull.map(fullToProducer);

  useEffect(() => {
    let cancelled = false;
    async function fetchProducers() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: err } = await supabase.from('producers_full').select('*');
        if (cancelled) return;
        if (err) {
          setError(err.message);
          setProducersFull([]);
        } else {
          const rows = (data ?? []) as SupabaseProducerRow[];
          setProducersFull(rows.map((row) => mapSupabaseRowToFull(row)));
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Erreur lors du chargement des producteurs');
          setProducersFull([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchProducers();
    return () => { cancelled = true; };
  }, []);

  // Ouvre le modal si ?p=id (redir. anciennes URLs /partenaires/[id])
  useEffect(() => {
    const pid = searchParams.get('p');
    if (!pid || producersFull.length === 0) return;
    const found = producersFull.find((p) => p.id === pid) ?? null;
    if (found) setSelectedProducer(found);
  }, [searchParams, producersFull]);

  const clearProducerQuery = () => {
    if (!searchParams.get('p')) return;
    router.replace(pathname, { scroll: false });
  };

  const handleSelectProducer = (id: string) => {
    setSelectedProducer(producersFull.find((p) => p.id === id) ?? null);
  };

  return (
    <div className="overflow-x-hidden bg-white min-h-screen font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <ProducerDetailModal
        isOpen={Boolean(selectedProducer)}
        producer={selectedProducer}
        onClose={() => {
          setSelectedProducer(null);
          clearProducerQuery();
        }}
      />
      <style>{`
        .prod-swipe {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 4px 0 16px;
          margin: 0 -1.25rem;
          padding-left: 1.25rem;
          padding-right: 1.25rem;
        }
        .prod-swipe::-webkit-scrollbar { display: none; }
        @media (min-width: 640px) {
          .prod-swipe {
            gap: 20px;
            margin: 0 -2rem;
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }
        .prod-mini-card {
          position: relative;
          flex: 0 0 min(72vw, 240px);
          width: min(72vw, 240px);
          aspect-ratio: 3 / 4;
          border: none;
          padding: 0;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          scroll-snap-align: start;
          background: ${HOME_COLORS.primary};
          font-family: inherit;
          text-align: left;
          transition: transform 0.2s ease;
        }
        .prod-mini-card:hover { transform: translateY(-2px); }
        @media (min-width: 640px) {
          .prod-mini-card {
            flex-basis: 280px;
            width: 280px;
            border-radius: 22px;
          }
        }
        @media (min-width: 1024px) {
          .prod-mini-card {
            flex-basis: 300px;
            width: 300px;
            border-radius: 24px;
          }
        }
        .prod-mini-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
        }
        .prod-mini-card-fallback {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          background: linear-gradient(135deg, ${HOME_COLORS.primary}, #145a6a);
        }
        .prod-mini-card-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 45%, transparent 70%);
          pointer-events: none;
        }
        .prod-mini-card-copy {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          padding: 16px 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .prod-mini-card-title {
          color: #fff;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.045em;
          line-height: 1.15;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .prod-mini-card-name {
          color: rgba(255,255,255,0.88);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.25;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (min-width: 640px) {
          .prod-mini-card-copy { padding: 18px 18px 20px; }
          .prod-mini-card-title { font-size: 20px; }
          .prod-mini-card-name { font-size: 13px; }
        }
      `}</style>

      {/* ── HERO encadré ── */}
      <section className="relative w-full bg-white pt-[calc(7.5rem+env(safe-area-inset-top))] sm:pt-[calc(9rem+env(safe-area-inset-top))] lg:pt-[calc(10.5rem+env(safe-area-inset-top))]">
        <div className="relative mx-auto max-w-6xl px-5 pb-2 sm:px-8">
          <div
            className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[2.2/1]"
            style={{ borderRadius: HOME_RADIUS }}
          >
            <img
              src={PRODUCER_ASSETS.hero}
              alt="Producteurs partenaires TerraGo"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className={`${bottomImageGradientClass} z-[1]`} />
            <div
              className="absolute inset-0 z-[2]"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.5) 100%)',
              }}
            />
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 pt-12 text-center sm:px-10 sm:pt-16 lg:pt-20">
              <h1 className="max-w-3xl text-center font-sans text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.02] tracking-[-0.075em] text-white">
                Nos producteurs
                <br />
                <span className="font-bold">partenaires.</span>
              </h1>
              <h2 className="mt-4 max-w-xl text-center font-sans text-[15px] font-normal leading-relaxed tracking-[-0.04em] text-white/90 sm:mt-6 sm:text-[17px]">
                Des hôtes engagés pour accueillir vos groupes en séminaire ou séjour immersif.
              </h2>
              <a
                href="#producteurs"
                className={`mt-7 ${homeHeroOutlineButtonClass} sm:mt-9`}
                style={{ background: 'rgba(12, 29, 34, 0.12)' }}
              >
                Explorer les producteurs partenaires
              </a>
            </div>
          </div>
          <img
            src={PRODUCER_ASSETS.producteurSoutenu}
            alt="+1 producteur soutenu"
            className="pointer-events-none absolute bottom-0 right-5 z-30 h-32 w-auto translate-x-[18%] translate-y-[55%] rotate-[6deg] object-contain drop-shadow-md sm:right-8 sm:h-40 lg:right-12 lg:h-48"
          />
        </div>
      </section>

      {/* ── CATALOGUE ── */}
      <section
        id="producteurs"
        className="scroll-mt-28"
        style={{ paddingTop: homeSectionPadding, paddingBottom: homeSectionPadding, background: '#ffffff' }}
      >
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-8 sm:mb-10">
            <h2 className={sectionTitleClass}>
              <span className="font-bold">Engagés et passionnés</span>, ils vous ouvrent leurs portes.
            </h2>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '64px 0', color: 'rgba(12,29,34,0.45)' }}>
              <p style={{ fontSize: 15, fontWeight: 600 }}>Chargement des producteurs…</p>
            </div>
          )}
          {error && (
            <div style={{ textAlign: 'center', padding: '64px 0', color: '#b91c1c' }}>
              <p style={{ fontSize: 15, fontWeight: 600 }}>Erreur</p>
              <p style={{ fontSize: 13, marginTop: 8 }}>{error}</p>
            </div>
          )}
          {!loading && !error && producers.length === 0 && (
            <div
              style={{
                background: HOME_COLORS.gray,
                borderRadius: HOME_RADIUS,
                border: '1px solid rgba(12,29,34,0.08)',
                padding: '2.5rem 2rem',
                textAlign: 'center',
              }}
            >
              <h3
                className="font-sans text-[22px] font-bold tracking-[-0.04em]"
                style={{ color: HOME_COLORS.primary, margin: '0 0 8px' }}
              >
                Aucun producteur pour le moment
              </h3>
            </div>
          )}
          {!loading && !error && producers.length > 0 && (
            <div className="prod-swipe" role="list" aria-label="Producteurs partenaires">
              {producers.map((p) => (
                <div key={p.id} role="listitem">
                  <ProducerCard producer={p} onClick={handleSelectProducer} />
                </div>
              ))}
            </div>
          )}

          {/* Mains dans la terre — à cheval catalogue / CTA */}
          <img
            src={PRODUCER_ASSETS.mainsDansLaTerre}
            alt=""
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-[4%] z-30 h-32 w-32 translate-y-1/2 object-contain drop-shadow-md sm:left-[6%] sm:h-44 sm:w-44 lg:left-[8%] lg:h-52 lg:w-52"
          />
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          paddingTop: 'clamp(2rem, 4vw, 3rem)',
          paddingBottom: homeSectionPadding,
          background: HOME_COLORS.gray,
        }}
      >
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <img
            src={PRODUCER_ASSETS.rateau}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -right-4 z-20 h-28 w-28 object-contain sm:-bottom-14 sm:-right-8 sm:h-40 sm:w-40 lg:-bottom-16 lg:-right-12 lg:h-52 lg:w-52"
          />
          <div
            className="relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-14 lg:py-16"
            style={{ background: HOME_COLORS.primary, borderRadius: HOME_RADIUS }}
          >
            <h2 className="mx-auto max-w-2xl font-sans text-[34px] font-normal leading-[1.08] tracking-[-0.075em] text-white sm:text-[40px] lg:text-[48px]">
              Vous êtes un producteur engagé <span className="font-bold">ou connaissez un talent&nbsp;?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-sans text-[14px] font-normal leading-[1.7] tracking-[-0.04em] text-white/80 sm:mt-5 sm:text-[15px]">
              Rejoignez le réseau TerraGo ou faites-nous découvrir un hôte exceptionnel du terroir.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <button
                type="button"
                onClick={openPartenaireModal}
                className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-white px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.07em] text-[#0c1d22] transition-colors hover:bg-[#ec6435] hover:text-white sm:min-w-[220px] sm:px-8 sm:py-2.5 sm:text-[12px]"
              >
                Devenir partenaire
              </button>
              <button
                type="button"
                onClick={openRecommanderModal}
                className="inline-flex min-w-[180px] items-center justify-center rounded-full border-2 border-white px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.07em] text-white transition-colors hover:bg-white/15 sm:min-w-[220px] sm:px-8 sm:py-2.5 sm:text-[12px]"
              >
                Recommander un producteur
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProducersPage;
