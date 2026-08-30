'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
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
  homeFramedHeroAspectClass,
  homeFramedHeroSectionClass,
  homeFramedHeroH1Class,
  homeFramedHeroOverlayClass,
  homeFramedHeroOverlayInnerClass,
  homeFramedHeroSubtitleClass,
  bottomImageGradientClass,
  homeHeroOutlineButtonClass,
  homeHeroSolidButtonClass,
  homeSectionPadding,
} from '../components/home/homeStyles';
import FramedHeroImage from '../components/FramedHeroImage';
import { HOME_EMOJI } from '../lib/homeStorage';
import ProducerDetailModal from '../components/ProducerDetailModal';
import FaqExcerpt from '../components/FaqExcerpt';

const HOME_ASSETS =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME';

const PRODUCER_ASSETS = {
  hero: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/serre-maraicher.jpg',
  producteurSoutenu: `${HOME_ASSETS}/emoji/producteur-sountenu.png`,
  mainsDansLaTerre: HOME_EMOJI.mainsDansLaTerre,
  rateau: HOME_EMOJI.rateau,
};

const catalogueIntroTitleClass =
  'font-sans text-[26px] font-normal leading-[1.18] tracking-[-0.06em] text-[#0c1d22] sm:text-[clamp(1.5rem,2.8vw,2.25rem)]';

/** Pastilles calées sur le scroll réel (pas une pastille par carte). */
function useSwipePages(trackRef: React.RefObject<HTMLDivElement | null>, itemCount: number) {
  const [pageCount, setPageCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrollingRef = useRef(false);

  const getMetrics = useCallback((track: HTMLElement) => {
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    if (maxScroll < 8 || itemCount < 2) {
      return { pageCount: 0, maxScroll: 0, step: 0 };
    }
    const first = track.children[0] as HTMLElement | undefined;
    const second = track.children[1] as HTMLElement | undefined;
    const step =
      first && second
        ? second.offsetLeft - first.offsetLeft
        : first
          ? first.offsetWidth
          : track.clientWidth;
    const pages = Math.min(itemCount, Math.max(2, Math.round(maxScroll / Math.max(step, 1)) + 1));
    return { pageCount: pages, maxScroll, step: Math.max(step, 1) };
  }, [itemCount]);

  const syncActive = useCallback((track: HTMLElement) => {
    const { pageCount: pages, maxScroll, step } = getMetrics(track);
    if (pages <= 1) {
      setActiveIndex(0);
      return;
    }
    if (track.scrollLeft >= maxScroll - 4) {
      setActiveIndex(pages - 1);
      return;
    }
    const idx = Math.round(track.scrollLeft / step);
    setActiveIndex(Math.max(0, Math.min(idx, pages - 1)));
  }, [getMetrics]);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) {
      setPageCount(0);
      return;
    }
    const { pageCount: pages } = getMetrics(track);
    setPageCount(pages);
    syncActive(track);
  }, [trackRef, getMetrics, syncActive]);

  const goTo = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const track = trackRef.current;
    if (!track) return;
    const { pageCount: pages, maxScroll, step } = getMetrics(track);
    if (pages <= 1) return;
    const clamped = Math.max(0, Math.min(index, pages - 1));
    const targetLeft = clamped >= pages - 1 ? maxScroll : clamped * step;
    isScrollingRef.current = true;
    track.scrollTo({ left: targetLeft, behavior });
    setActiveIndex(clamped);
    window.setTimeout(() => {
      isScrollingRef.current = false;
      syncActive(track);
    }, behavior === 'smooth' ? 450 : 50);
  }, [trackRef, getMetrics, syncActive]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const onScroll = () => {
      if (isScrollingRef.current) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => syncActive(track));
    };

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => measure()) : null;
    ro?.observe(track);
    measure();

    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
    };
  }, [trackRef, itemCount, measure, syncActive]);

  return { activeIndex, goTo, pageCount };
}

const SwipeDots: React.FC<{
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
  label?: string;
}> = ({ count, activeIndex, onSelect, className = '', label = 'Élément' }) => (
  <div className={`flex items-center justify-center gap-2 ${className}`}>
    {Array.from({ length: count }, (_, i) => (
      <button
        key={i}
        type="button"
        aria-label={`${label} ${i + 1}`}
        onClick={() => onSelect(i)}
        className="h-2 rounded-full transition-all duration-300"
        style={{
          width: i === activeIndex ? 28 : 8,
          background: i === activeIndex ? HOME_COLORS.orange : 'rgba(12,29,34,0.18)',
        }}
      />
    ))}
  </div>
);

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
      aria-label={
        producer.type ? `${producer.name} — ${producer.type}` : producer.name
      }
    >
      {producer.cover ? (
        <Image
          src={producer.cover}
          alt=""
          fill
          className="prod-mini-card-img"
          sizes="(max-width: 640px) 72vw, (max-width: 1024px) 280px, 300px"
          draggable={false}
        />
      ) : (
        <div className="prod-mini-card-fallback" aria-hidden>🌿</div>
      )}
      <div className="prod-mini-card-gradient" aria-hidden />
      <div className="prod-mini-card-hover" aria-hidden />
      <div className="prod-mini-card-copy">
        <span className="prod-mini-card-title">{producer.name}</span>
        {producer.type ? (
          <>
            {' '}
            <br />
            <span className="prod-mini-card-name">{producer.type}</span>
          </>
        ) : null}
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
  const producersScrollRef = useRef<HTMLDivElement>(null);

  const producers: Producer[] = producersFull.map(fullToProducer);
  const producersSwipe = useSwipePages(producersScrollRef, producers.length);

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
        .prod-swipe-wrap {
          position: relative;
        }
        .prod-swipe {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          touch-action: pan-x pan-y;
          scrollbar-width: none;
          padding: 16px 0 28px;
          margin: 0 -1.5rem;
          padding-left: 1.25rem;
          padding-right: 4.5rem;
          scroll-padding-left: 1.25rem;
        }
        .prod-swipe::-webkit-scrollbar { display: none; }
        @media (min-width: 640px) {
          .prod-swipe {
            gap: 20px;
            margin: 0 -2rem;
            padding-top: 24px;
            padding-bottom: 32px;
            padding-left: 2rem;
            padding-right: 5.5rem;
            scroll-padding-left: 2rem;
          }
        }
        @media (min-width: 1024px) {
          .prod-swipe {
            margin: 0 -2.5rem;
            padding-left: 2.5rem;
            padding-right: 6rem;
            scroll-padding-left: 2.5rem;
          }
        }
        .prod-swipe-fade {
          position: absolute;
          top: 16px;
          right: -1.5rem;
          bottom: 28px;
          width: 2.25rem;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.12) 100%
          );
          pointer-events: none;
          z-index: 3;
        }
        @media (min-width: 640px) {
          .prod-swipe-fade {
            top: 24px;
            right: -2rem;
            bottom: 32px;
            width: 3.5rem;
            background: linear-gradient(
              to right,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.22) 100%
            );
          }
        }
        @media (min-width: 1024px) {
          .prod-swipe-fade { right: -2.5rem; }
        }
        .prod-mini-card {
          position: relative;
          flex: 0 0 min(72vw, 240px);
          width: min(72vw, 240px);
          aspect-ratio: 3 / 4.2;
          border: none;
          padding: 0;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          scroll-snap-align: start;
          background: ${HOME_COLORS.primary};
          font-family: inherit;
          text-align: left;
          transform-origin: center center;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .prod-mini-card:hover { transform: scaleY(1.055); }
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
        .prod-mini-card-hover {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.88) 0%,
            rgba(0, 0, 0, 0.55) 38%,
            rgba(0, 0, 0, 0.18) 68%,
            transparent 100%
          );
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.5s ease;
        }
        .prod-mini-card:hover .prod-mini-card-hover {
          opacity: 1;
        }
        .prod-mini-card-copy {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          padding: 16px 16px 18px;
        }
        .prod-mini-card-title {
          color: #fff;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.045em;
          line-height: 1.15;
        }
        .prod-mini-card-name {
          display: inline-block;
          margin-top: 4px;
          color: rgba(255,255,255,0.88);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.25;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }
        @media (min-width: 640px) {
          .prod-mini-card-copy { padding: 18px 18px 20px; }
          .prod-mini-card-title { font-size: 20px; }
          .prod-mini-card-name { font-size: 13px; }
        }
      `}</style>

      {/* ── HERO encadré ── */}
      <section className={homeFramedHeroSectionClass}>
        <div className="relative mx-auto max-w-6xl px-5 pb-2 sm:px-8">
          <div
            className={`relative ${homeFramedHeroAspectClass}`}
            style={{ borderRadius: HOME_RADIUS }}
          >
            <FramedHeroImage
              src={PRODUCER_ASSETS.hero}
              alt="Producteurs partenaires TerraGo"
            />
            <div className={`${bottomImageGradientClass} z-[1]`} />
            <div
              className="absolute inset-0 z-[2]"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.5) 100%)',
              }}
            />
            <div className={homeFramedHeroOverlayClass}>
              <div className={homeFramedHeroOverlayInnerClass}>
              <h1 className={`max-w-3xl text-center font-bold ${homeFramedHeroH1Class}`}>
                Nos producteurs partenaires
              </h1>
              <h2 className={homeFramedHeroSubtitleClass}>
                Des hôtes engagés pour accueillir vos groupes en séminaire ou séjour immersif.
              </h2>
              <div className="mx-auto mt-7 flex w-max max-w-full flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4">
                <a
                  href="#producteurs"
                  className={`${homeHeroOutlineButtonClass} w-full sm:w-auto`}
                  style={{ background: 'rgba(12, 29, 34, 0.12)' }}
                >
                  Explorer les producteurs partenaires
                </a>
                <button
                  type="button"
                  onClick={openPartenaireModal}
                  className={`${homeHeroSolidButtonClass} w-full border-2 border-[#ec6435] bg-[#ec6435] text-white hover:border-[#d9552a] hover:bg-[#d9552a] sm:w-auto`}
                >
                  Devenir partenaire
                </button>
              </div>
              </div>
            </div>
          </div>
          <Image
            src={PRODUCER_ASSETS.producteurSoutenu}
            alt="+1 producteur soutenu"
            width={192}
            height={192}
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
        <div className="relative mx-auto max-w-[1280px] px-6 sm:px-8 lg:px-10">
          <div className="mb-3 pr-6 sm:mb-8 sm:pr-8 lg:mb-10 lg:pr-10">
            <h2 className={catalogueIntroTitleClass}>
              Voici quelques-uns de nos producteurs partenaires,{' '}
              <span className="font-bold">engagés</span>,{' '}
              <span className="font-bold">passionnés</span> et fiers de partager leur{' '}
              <span className="font-bold">savoir-faire</span>.
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
            <>
              <div className="prod-swipe-wrap">
                <div
                  ref={producersScrollRef}
                  className="prod-swipe"
                  role="list"
                  aria-label="Producteurs partenaires"
                >
                  {producers.map((p) => (
                    <div key={p.id} role="listitem">
                      <ProducerCard producer={p} onClick={handleSelectProducer} />
                    </div>
                  ))}
                </div>
                <div className="prod-swipe-fade" aria-hidden />
              </div>
              {producersSwipe.pageCount > 1 && (
                <SwipeDots
                  count={producersSwipe.pageCount}
                  activeIndex={producersSwipe.activeIndex}
                  onSelect={producersSwipe.goTo}
                  className="mt-2"
                  label="Page"
                />
              )}
            </>
          )}

          {/* Mains dans la terre — à cheval catalogue / CTA */}
          <Image
            src={PRODUCER_ASSETS.mainsDansLaTerre}
            alt=""
            aria-hidden
            width={208}
            height={208}
            className="pointer-events-none absolute bottom-0 left-[4%] z-30 h-32 w-32 translate-y-1/2 object-contain drop-shadow-md sm:left-[6%] sm:h-44 sm:w-44 lg:left-[8%] lg:h-52 lg:w-52"
          />
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          paddingTop: 'clamp(4.5rem, 8vw, 6.5rem)',
          paddingBottom: 'clamp(3.5rem, 6vw, 5rem)',
          background: HOME_COLORS.gray,
        }}
      >
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <Image
            src={PRODUCER_ASSETS.rateau}
            alt=""
            aria-hidden
            width={208}
            height={208}
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
            <div className="mx-auto mt-8 flex w-max max-w-full flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
              <button
                type="button"
                onClick={openPartenaireModal}
                className={`${homeHeroSolidButtonClass} w-full border border-white bg-white text-[#0c1d22] hover:border-[#ec6435] hover:bg-[#ec6435] hover:text-white sm:w-auto`}
              >
                Devenir partenaire
              </button>
              <button
                type="button"
                onClick={openRecommanderModal}
                className={`${homeHeroSolidButtonClass} w-full border border-white bg-transparent text-white hover:bg-white/15 sm:w-auto`}
              >
                Recommander un producteur
              </button>
            </div>
          </div>
        </div>
      </section>

      <FaqExcerpt
        excerpt="producteur"
        paddingTop="clamp(2.25rem, 4.5vw, 3.5rem)"
        paddingBottom="clamp(5rem, 10vw, 7.5rem)"
      />
    </div>
  );
};

export default ProducersPage;
