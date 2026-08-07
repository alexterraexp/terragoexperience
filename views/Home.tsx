'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import LazyVideo from '../components/video/LazyVideo';
import HomeHero from '../components/home/HomeHero';
import {
  HOME_COLORS,
  HOME_RADIUS,
  homeH1Class,
  homeH2Class,
  homeParagraphClass,
  homeSectionPadding,
  homeSeparatorPadding,
  bottomImageGradientClass,
  homeCtaOutlineClass,
  homeCtaOutlineGhostClass,
} from '../components/home/homeStyles';
import type { HomeAssetUrls } from '../lib/homeStorage';
import { HOME_EMOJI, HOME_PRODUCERS, HOME_STEPS, REGION_IMAGES, REGION_TAGS } from '../lib/homeStorage';

interface HomeProps {
  assets: HomeAssetUrls;
}

/** Vidéo bannière : lecture en boucle dès le montage. */
const BannerVideo: React.FC<{ src: string; className?: string }> = ({ src, className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    void video.play().catch(() => undefined);
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      className={`pointer-events-none ${className}`}
      aria-label="Vergers en récolte – TerraGo"
    />
  );
};

const FAQ_ITEMS = [
  {
    q: 'Pourquoi choisir TerraGo pour organiser un événement d\'entreprise ?',
    a: 'TerraGo imagine des expériences professionnelles qui sortent du cadre classique des séminaires. Grâce à notre réseau de producteurs, artisans et lieux authentiques, nous créons des événements qui favorisent la cohésion, la découverte et le partage.',
  },
  {
    q: 'Quels types d\'événements accompagnez-vous ?',
    a: 'Nous organisons des séminaires d\'entreprise, team building, conventions, lancements de marque, événements clients, soirées corporate et expériences collaborateurs, avec des formats adaptés à chaque entreprise.',
  },
  {
    q: 'Les expériences proposées sont-elles personnalisables ?',
    a: 'Oui. Chaque projet est construit sur mesure en fonction de vos objectifs, du profil de vos équipes, de votre budget et de l\'ambiance recherchée.',
  },
  {
    q: 'Dans quelles régions intervenez-vous ?',
    a: 'Nous créons des expériences partout en France en sélectionnant des producteurs, artisans et partenaires locaux capables de faire vivre leur territoire et leurs savoir-faire.',
  },
  {
    q: 'Quel budget prévoir pour un événement d\'entreprise ?',
    a: 'Le budget dépend de nombreux critères : nombre de participants, durée du séjour, destination, hébergement, restauration et activités choisies. Nous vous accompagnons pour construire un projet cohérent avec vos attentes.',
  },
  {
    q: 'Combien de participants pouvez-vous accompagner ?',
    a: 'De quelques collaborateurs à plusieurs centaines de participants, nous adaptons l\'organisation, les lieux et les expériences pour répondre aux besoins de chaque groupe.',
  },
  {
    q: 'Quel délai faut-il prévoir pour organiser un événement ?',
    a: 'Idéalement, nous recommandons d\'anticiper plusieurs mois à l\'avance afin de garantir les meilleurs lieux et partenaires. Nous pouvons également étudier des demandes avec des délais plus courts selon les disponibilités.',
  },
  {
    q: 'Pouvez-vous gérer l\'ensemble de l\'organisation ?',
    a: 'Oui. TerraGo peut prendre en charge tout ou partie de votre événement : recherche du lieu, hébergement, restauration, transport, activités, coordination et accompagnement sur place.',
  },
  {
    q: 'Pourquoi intégrer une expérience avec un producteur dans un séminaire ?',
    a: 'Parce que ces rencontres créent des moments authentiques et fédérateurs. Découvrir un métier, participer à un savoir-faire ou comprendre un territoire permet aux équipes de vivre une expérience différente, plus humaine et plus mémorable.',
  },
] as const;

const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-1">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q} className="overflow-hidden">
            <button
              type="button"
              className="flex w-full items-center gap-3 py-3.5 text-left transition-colors hover:bg-[rgba(12,29,34,0.02)] sm:gap-4 sm:py-4"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="min-w-0 flex-1 font-sans text-[14px] font-bold leading-[1.3] tracking-[-0.03em] text-[#0c1d22] sm:text-[15px]">
                {item.q}
              </span>
              <ChevronRight
                size={18}
                strokeWidth={1.8}
                aria-hidden
                className="shrink-0 transition-[transform,color] duration-[220ms] ease-out"
                style={{
                  color: isOpen ? HOME_COLORS.orange : 'rgba(12,29,34,0.35)',
                  transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                }}
              />
            </button>
            <div
              className="grid transition-all duration-300"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', opacity: isOpen ? 1 : 0 }}
            >
              <div className="overflow-hidden">
                <p className={`${homeParagraphClass} pb-4 pr-8`}>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const PRODUCER_POINTS = [
  {
    n: '01',
    title: 'Des producteurs engagés & passionnés',
    desc: 'Nous visitons et sélectionnons chaque producteur pour son authenticité, son engagement et l\'unicité de son lieu.',
  },
  {
    n: '02',
    title: 'Des rencontres vraies',
    desc: 'Chaque séjour est pensé pour favoriser les échanges, loin des activités artificielles.',
  },
  {
    n: '03',
    title: 'Un impact positif',
    desc: 'Votre évènement soutient directement l\'économie locale et nos producteurs engagés.',
  },
] as const;

/** Drag horizontal (touch + souris) pour carousels mobile. */
function attachHorizontalDrag(el: HTMLElement) {
  let pointerId: number | null = null;
  let startX = 0;
  let startScroll = 0;
  let moved = false;

  const onDown = (e: PointerEvent) => {
    pointerId = e.pointerId;
    startX = e.clientX;
    startScroll = el.scrollLeft;
    moved = false;
    el.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent) => {
    if (pointerId !== e.pointerId) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) moved = true;
    if (moved) el.scrollLeft = startScroll - dx;
  };
  const onUp = (e: PointerEvent) => {
    if (pointerId !== e.pointerId) return;
    pointerId = null;
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  el.addEventListener('pointerdown', onDown);
  el.addEventListener('pointermove', onMove);
  el.addEventListener('pointerup', onUp);
  el.addEventListener('pointercancel', onUp);
  return () => {
    el.removeEventListener('pointerdown', onDown);
    el.removeEventListener('pointermove', onMove);
    el.removeEventListener('pointerup', onUp);
    el.removeEventListener('pointercancel', onUp);
  };
}

/** Index actif d’un track horizontal + goTo (pastilles orange). */
function useSwipeTrack(trackRef: React.RefObject<HTMLDivElement | null>, length: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrollingRef = useRef(false);

  const goTo = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const track = trackRef.current;
    if (!track || length === 0) return;
    const clamped = ((index % length) + length) % length;
    const slide = track.children[clamped] as HTMLElement | undefined;
    if (!slide) return;
    isScrollingRef.current = true;
    const targetLeft = slide.offsetLeft - (track.firstElementChild as HTMLElement).offsetLeft;
    track.scrollTo({ left: targetLeft, behavior });
    setActiveIndex(clamped);
    window.setTimeout(() => {
      isScrollingRef.current = false;
    }, behavior === 'smooth' ? 450 : 50);
  }, [trackRef, length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const onScroll = () => {
      if (isScrollingRef.current) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        Array.from(track.children).forEach((child, i) => {
          const el = child as HTMLElement;
          const mid = el.offsetLeft - track.offsetLeft + el.offsetWidth / 2;
          const dist = Math.abs(mid - center);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        });
        setActiveIndex((prev) => (prev === best ? prev : best));
      });
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener('scroll', onScroll);
    };
  }, [trackRef]);

  return { activeIndex, goTo };
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

const Home: React.FC<HomeProps> = ({ assets }) => {
  const regionScrollRef = useRef<HTMLDivElement>(null);
  const conceptScrollRef = useRef<HTMLDivElement>(null);
  const stepsScrollRef = useRef<HTMLDivElement>(null);
  const experiencesScrollRef = useRef<HTMLDivElement>(null);
  const [producerIndex, setProducerIndex] = useState(0);
  const activeProducer = HOME_PRODUCERS[producerIndex];

  const conceptSwipe = useSwipeTrack(conceptScrollRef, 3);
  const stepsSwipe = useSwipeTrack(stepsScrollRef, HOME_STEPS.length);
  const regionSwipe = useSwipeTrack(regionScrollRef, REGION_IMAGES.length);
  const experiencesSwipe = useSwipeTrack(experiencesScrollRef, 3);

  const conceptCards = [
    {
      image: assets.conceptAgir,
      lead: (
        <>
          Pour agir et
          <br />
        </>
      ),
      rest: 'sensibiliser',
    },
    {
      image: assets.conceptLien,
      lead: (
        <>
          Pour créer
          <br />
        </>
      ),
      rest: 'du lien',
    },
    {
      image: assets.conceptInspirer,
      lead: (
        <>
          Pour
          <br />
        </>
      ),
      rest: 'inspirer',
    },
  ];

  const experiences = [
    {
      video: assets.expOlive,
      title: (
        <>
          Récolte et réalisation de son huile d&apos;olive{' '}
          <span className="font-bold">en équipe</span>
        </>
      ),
    },
    {
      video: assets.expCuisine,
      title: (
        <>
          <span className="font-bold">Atelier cuisine</span> au cœur du moulin
        </>
      ),
    },
    {
      video: assets.expVin,
      title: (
        <>
          Visite des chais et{' '}
          <span className="font-bold">assemblage de son vin</span>
        </>
      ),
    },
  ];

  /** Défile d'une « page » de cartes région (largeur visible moins un chevauchement). */
  const scrollRegions = (direction: 1 | -1) => {
    const track = regionScrollRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * (track.clientWidth * 0.8), behavior: 'smooth' });
  };

  /** Drag horizontal (touch + souris) pour les carousels mobile. */
  useEffect(() => {
    const cleanups = [conceptScrollRef.current, stepsScrollRef.current, experiencesScrollRef.current]
      .filter((el): el is HTMLDivElement => !!el)
      .map(attachHorizontalDrag);
    return () => cleanups.forEach((off) => off());
  }, []);

  return (
    <div className="overflow-x-hidden bg-white">

      <HomeHero videoSrc={assets.heroVideo} />

      {/* ── NOTRE CONCEPT ── */}
      <section style={{ paddingTop: homeSectionPadding, paddingBottom: homeSectionPadding, background: '#ffffff' }}>
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-10 text-center sm:mb-14">
            <h2 className="mx-auto max-w-4xl font-sans text-[34px] font-normal leading-[1.08] tracking-[-0.075em] text-[#0c1d22] sm:text-[40px] lg:text-[48px]">
              Des évènements <span className="font-bold">clés en main,</span> pensés pour répondre à vos{' '}
              <span className="font-bold">objectifs d&apos;entreprise.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-3xl font-sans text-[15px] font-normal leading-[1.65] tracking-[-0.04em] text-[#0c1d22]/65 sm:mt-6 sm:text-[17px]">
              Séminaire, team building, convention, journée RSE :
              <br />
              nos propositions sont 100% personnalisées et adaptées à vos objectifs !
            </p>
          </div>
        </div>

        {/* Mobile : carousel swipable pleine largeur (même pattern que les régions) */}
        <div className="relative sm:mx-auto sm:max-w-6xl sm:px-8">
          <img
            src={HOME_EMOJI.arbre}
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-30 h-36 w-36 -translate-x-[18%] -translate-y-[55%] object-contain sm:left-8 sm:h-52 sm:w-52 sm:-translate-x-[42%] sm:-translate-y-[38%] lg:h-60 lg:w-60 lg:-translate-y-[32%]"
          />

          <div
            ref={conceptScrollRef}
            className="flex min-w-0 cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-x pb-1 active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:hidden"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollPaddingInline: '1.25rem',
              paddingLeft: '1.25rem',
              paddingRight: '1.25rem',
            }}
          >
            {conceptCards.map((card, i) => (
              <div
                key={i}
                className="relative aspect-[3/3.45] w-[70vw] max-w-[320px] shrink-0 snap-center overflow-hidden"
                style={{ borderRadius: HOME_RADIUS }}
              >
                <img
                  src={card.image}
                  alt=""
                  className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
                  loading="lazy"
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
                <p className="pointer-events-none absolute left-6 right-5 top-[50%] z-10 font-sans text-[34px] leading-[1.12] tracking-[-0.075em] text-white">
                  <span className="font-normal">{card.lead}</span>
                  <span className="font-bold">{card.rest}</span>
                </p>
              </div>
            ))}
          </div>

          <SwipeDots
            count={conceptCards.length}
            activeIndex={conceptSwipe.activeIndex}
            onSelect={conceptSwipe.goTo}
            label="Concept"
            className="mt-5 sm:hidden"
          />

          {/* Desktop : grille 3 colonnes */}
          <div className="relative hidden items-center gap-5 sm:grid sm:grid-cols-3">
            {conceptCards.map((card, i) => {
              const isMiddle = i === 1;
              return (
                <div
                  key={i}
                  className={`group relative overflow-hidden ${
                    isMiddle ? 'aspect-[3/4.6]' : 'aspect-[3/3.9]'
                  }`}
                  style={{ borderRadius: HOME_RADIUS }}
                >
                  <img
                    src={card.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.1]"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                  <p className="absolute left-7 right-6 top-[52%] z-10 font-sans text-[32px] leading-[1.15] tracking-[-0.075em] text-white lg:text-[36px]">
                    <span className="font-normal">{card.lead}</span>
                    <span className="font-bold">{card.rest}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-6xl justify-center px-5 sm:mt-12 sm:px-8">
          <Link
            href="/seminaires-entreprise"
            className={homeCtaOutlineClass}
          >
            <span aria-hidden>→</span>
            Découvrir nos séminaires
          </Link>
        </div>
      </section>

      {/* ── EXPÉRIENCES ── */}
      <section
        style={{
          paddingTop: homeSectionPadding,
          paddingBottom: homeSectionPadding,
          background: '#f4f4f4',
        }}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-8 ml-auto max-w-3xl text-right sm:mb-10">
            <h2 className="font-sans text-[38px] font-normal leading-[1.08] tracking-[-0.075em] text-[#0c1d22] sm:text-[44px] lg:text-[52px]">
              Vivez une <span className="font-bold">expérience collective</span> au cœur des savoir-faire français.
            </h2>
            <p className="mt-7 font-sans text-[15px] font-normal leading-[1.65] tracking-[-0.04em] text-[#0c1d22]/65 sm:mt-9 sm:text-[17px]">
              Oubliez les activités de team building standardisées. Avec TerraGo, vos équipes deviennent actrices d&apos;une expérience authentique aux côtés de celles et ceux qui font vivre nos territoires. Au contact de producteurs passionnés, vos collaborateurs découvrent des métiers, relèvent des défis collectifs et partagent un moment différent autour du goût, de la nature et du savoir-faire.
            </p>
          </div>

          <p className="mb-5 text-right font-sans text-[18px] font-bold leading-[1.3] tracking-[-0.05em] text-[#0c1d22] sm:mb-6 sm:text-[22px]">
            Quelques exemples d&apos;expériences
          </p>
        </div>

        {/* Mobile : carousel swipable */}
        <div className="relative">
          <img
            src={HOME_EMOJI.branche}
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-5 top-0 z-30 h-44 w-44 -translate-x-[38%] -translate-y-[48%] object-contain sm:hidden"
          />

          <div
            ref={experiencesScrollRef}
            className="flex min-w-0 cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-x pb-1 active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:hidden"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollPaddingInline: '1.25rem',
              paddingLeft: '1.25rem',
              paddingRight: '1.25rem',
            }}
          >
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="relative aspect-[16/10] w-[78vw] max-w-[360px] shrink-0 snap-center overflow-hidden"
                style={{ borderRadius: HOME_RADIUS }}
              >
                <LazyVideo
                  src={exp.video}
                  className="absolute inset-0 h-full w-full"
                  videoClassName="scale-110"
                />
                <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
                <p className="pointer-events-none absolute bottom-5 left-4 right-4 z-10 font-sans text-[16px] font-normal leading-[1.25] tracking-[-0.05em] text-white">
                  {exp.title}
                </p>
              </div>
            ))}
          </div>

          <SwipeDots
            count={experiences.length}
            activeIndex={experiencesSwipe.activeIndex}
            onSelect={experiencesSwipe.goTo}
            label="Expérience"
            className="mt-5 sm:hidden"
          />
        </div>

        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {/* Desktop : grille */}
          <div className="relative hidden gap-5 sm:grid sm:grid-cols-3">
            {experiences.map((exp, i) => (
              <div key={i} className="relative overflow-visible">
                {i === 0 && (
                  <img
                    src={HOME_EMOJI.branche}
                    alt=""
                    aria-hidden
                    className="pointer-events-none absolute left-0 top-0 z-30 h-56 w-56 -translate-x-[38%] -translate-y-[48%] object-contain lg:h-64 lg:w-64"
                  />
                )}
                <div
                  className="group relative aspect-[16/11] overflow-hidden"
                  style={{ borderRadius: HOME_RADIUS }}
                >
                  <LazyVideo
                    src={exp.video}
                    playOnHover
                    className="absolute inset-0 h-full w-full"
                    videoClassName="scale-110 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.32] group-hover:translate-x-7 group-hover:-translate-y-5"
                  />
                  <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
                  <p className="pointer-events-none absolute bottom-6 left-5 right-5 z-10 font-sans text-[18px] font-normal leading-[1.25] tracking-[-0.05em] text-white lg:text-[20px]">
                    {exp.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center sm:mt-12">
            <Link
              href="/experiences"
              className={homeCtaOutlineClass}
            >
              <span aria-hidden>→</span>
              Découvrir les expériences TerraGo
            </Link>
          </div>
        </div>
      </section>

      {/* ── BANNIÈRE IMPACT — séparateur à cheval sur le gris (haut) et le blanc (bas) ── */}
      <div
        style={{
          paddingTop: homeSeparatorPadding,
          paddingBottom: homeSeparatorPadding,
          background: 'linear-gradient(to bottom, #f4f4f4 0 50%, #ffffff 50% 100%)',
        }}
      >
        <div className="relative mx-auto w-full max-w-[92rem] px-0 sm:px-3 lg:px-4">
          <div
            className="relative overflow-hidden max-sm:!rounded-none"
            style={{ borderRadius: HOME_RADIUS }}
          >
            <BannerVideo
              src="https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/vergers.mp4"
              className="aspect-[16/11] w-full object-cover sm:aspect-[36/12] lg:aspect-[40/9]"
            />
            <div className={`${bottomImageGradientClass} z-[1]`} />
            <div className="absolute inset-0 z-10 flex items-center justify-center px-5 py-12 text-center sm:px-8">
              <p className="max-w-none font-sans text-[clamp(1.65rem,6.5vw,2.75rem)] font-normal leading-[1.08] tracking-[-0.075em] text-white">
                Des séminaires qui ont <span className="font-bold">de l&apos;impact</span>,
                {' '}pour <span className="font-bold">vos équipes</span>, mais aussi pour{' '}
                <span className="font-bold">nos producteurs</span>.
              </p>
            </div>
          </div>

          {/* Sticker +1 producteur soutenu — à cheval bas vidéo / haut section rencontres */}
          <img
            src={HOME_EMOJI.producteurSoutenu}
            alt="+1 producteur soutenu"
            className="pointer-events-none absolute bottom-0 right-[6%] z-30 h-32 w-auto translate-y-1/2 rotate-[6deg] object-contain drop-shadow-md sm:right-[10%] sm:h-40 lg:right-[12%] lg:h-48"
          />
        </div>
      </div>

      {/* ── RENCONTRES PRODUCTEURS ── */}
      {/* Supplément en haut : dégage le titre de la bannière séparatrice sans décaler sa césure. */}
      <section
        style={{
          paddingTop: `calc(${homeSectionPadding} + ${homeSeparatorPadding})`,
          paddingBottom: homeSectionPadding,
          background: '#ffffff',
        }}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:items-start lg:gap-x-20 lg:gap-y-0">
            {/* Colonne visuelle — sous le 03 / au-dessus du bouton sur mobile */}
            <div className="relative order-2 mx-auto w-full max-w-[420px] lg:order-1 lg:mx-0 lg:max-w-none lg:self-center">
              <div className="relative overflow-visible">
                {/* Photo */}
                <div
                  className="relative overflow-hidden"
                  style={{ borderRadius: HOME_RADIUS }}
                >
                  <img
                    src={activeProducer.image}
                    alt={`${activeProducer.name} – producteur TerraGo`}
                    className="aspect-[4/4.35] w-full object-cover"
                    loading="lazy"
                  />

                  {/* Label nom */}
                  <span
                    className="absolute bottom-4 left-4 z-10 rounded-full px-4 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-white sm:bottom-5 sm:left-5 sm:text-[11px]"
                    style={{ background: HOME_COLORS.primary }}
                  >
                    {activeProducer.name}
                  </span>
                </div>

                {/* Emoji rateau — coin bas droit, bien plus grand */}
                <img
                  src={HOME_EMOJI.rateau}
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute -bottom-24 -right-16 z-30 h-40 w-40 rotate-[-18deg] object-contain drop-shadow-md sm:-bottom-32 sm:-right-24 sm:h-56 sm:w-56 lg:-bottom-36 lg:-right-20 lg:h-64 lg:w-64"
                />
              </div>

              {/* Flèches carousel — centrées sous la photo */}
              <div className="relative z-10 mt-6 flex justify-center gap-2 sm:mt-8">
                <button
                  type="button"
                  aria-label="Producteur précédent"
                  onClick={() =>
                    setProducerIndex((i) => (i - 1 + HOME_PRODUCERS.length) % HOME_PRODUCERS.length)
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-[10px] transition-opacity hover:opacity-80"
                  style={{ background: HOME_COLORS.primary }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Producteur suivant"
                  onClick={() => setProducerIndex((i) => (i + 1) % HOME_PRODUCERS.length)}
                  className="flex h-9 w-9 items-center justify-center rounded-[10px] transition-opacity hover:opacity-80"
                  style={{ background: HOME_COLORS.primary }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Titre + points */}
            <div className="order-1 lg:order-2">
              <h2 className="font-sans text-[34px] font-normal leading-[1.08] tracking-[-0.075em] text-[#0c1d22] sm:text-[40px] lg:text-[48px]">
                Des <span className="font-bold">rencontres authentiques</span> pour des souvenirs durables.
              </h2>

              <ul className="mt-10 space-y-7 sm:mt-12">
                {PRODUCER_POINTS.map((point) => (
                  <li key={point.n} className="flex gap-4 sm:gap-5">
                    <span className="shrink-0 font-sans text-[15px] font-bold tracking-[-0.04em] text-[#0c1d22] sm:text-[16px]">
                      {point.n}
                    </span>
                    <div>
                      <p className="font-sans text-[15px] font-bold leading-[1.35] tracking-[-0.04em] text-[#0c1d22] sm:text-[16px]">
                        {point.title}
                      </p>
                      <p className="mt-1.5 font-sans text-[14px] font-normal leading-[1.65] tracking-[-0.04em] text-[#0c1d22]/65 sm:text-[15px]">
                        {point.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA — sous l’image sur mobile, sous le texte sur desktop */}
            <div className="order-3 flex justify-center lg:col-start-2 lg:mt-10 lg:justify-start">
              <Link
                href="/partenaires"
                className={homeCtaOutlineClass}
              >
                <span aria-hidden>→</span>
                Découvrir nos producteurs partenaires
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── RÉGIONS ── */}
      <section
        className="relative"
        style={{ paddingTop: homeSectionPadding, paddingBottom: homeSectionPadding, background: '#f7f7f7' }}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="mx-auto max-w-3xl text-center font-sans text-[38px] font-normal leading-[1.05] tracking-[-0.075em] text-[#0c1d22] sm:text-[46px] lg:text-[54px]">
            Votre séminaire, <span className="font-bold">partout en France.</span>
          </h2>

          <div className="mt-7 flex flex-wrap justify-center gap-2 sm:mt-8">
            {REGION_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-4 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-white sm:text-[11px]"
                style={{ background: HOME_COLORS.primary }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-6 sm:mt-10 sm:flex-row sm:gap-8">
            {/* Réserve la largeur des flèches pour garder le texte centré sur la section */}
            <div className="hidden w-[88px] shrink-0 sm:block" aria-hidden />

            <p className={`${homeParagraphClass} flex-1 text-center sm:text-[15px]`}>
              Du Pays Basque à l&apos;Alsace, en passant par la Bretagne, la Provence ou la Savoie, découvrez nos
              séminaires d&apos;entreprise engagés dans toute la France, chacun partant à la rencontre de producteurs
              locaux et d&apos;un terroir unique.
            </p>

            <div className="hidden shrink-0 justify-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scrollRegions(-1)}
                aria-label="Régions précédentes"
                className="flex h-10 w-10 items-center justify-center rounded-full border bg-white/70 transition-colors hover:bg-white"
                style={{ borderColor: 'rgba(12,29,34,0.15)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={HOME_COLORS.primary} strokeWidth="2">
                  <path d="M19 12H5m0 0l6-6m-6 6l6 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollRegions(1)}
                aria-label="Régions suivantes"
                className="flex h-10 w-10 items-center justify-center rounded-full border bg-white/70 transition-colors hover:bg-white"
                style={{ borderColor: 'rgba(12,29,34,0.15)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={HOME_COLORS.primary} strokeWidth="2">
                  <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Pas de scroll-snap : il ramènerait la 1re carte contre le bord dès le chargement,
            supprimant la marge de départ (qui, elle, défile avec le carrousel). */}
        <div
          ref={regionScrollRef}
          className="mt-10 flex gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-12"
          style={{
            paddingLeft: 'max(6vw, calc((100vw - 72rem) / 2 + 2rem))',
            paddingRight: '1.25rem',
          }}
        >
          {REGION_IMAGES.map((region) => (
            <Link
              key={region.name}
              href="/seminaire-exemples"
              className="group relative aspect-[3/3.4] w-[62vw] shrink-0 overflow-hidden sm:aspect-[3/4.1] sm:w-[255px] lg:aspect-[3/4.2] lg:w-[280px]"
              style={{ borderRadius: HOME_RADIUS }}
            >
              <img
                src={region.image}
                alt={`Séminaire ${region.prep} ${region.name}`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.12]"
                loading="lazy"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-0"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <p className="absolute bottom-5 left-0 right-0 z-[1] px-5 font-sans text-[24px] leading-[1.12] tracking-[-0.06em] text-white sm:bottom-7 sm:px-6 sm:text-[28px] lg:text-[30px]">
                <span className="font-normal">Séminaire {region.prep}</span>
                <br />
                <span className="font-bold">{region.name}</span>
              </p>
            </Link>
          ))}
        </div>

        <SwipeDots
          count={REGION_IMAGES.length}
          activeIndex={regionSwipe.activeIndex}
          onSelect={regionSwipe.goTo}
          label="Région"
          className="mt-5 sm:hidden"
        />

        <div className="mt-10 flex justify-center sm:mt-12">
          <Link
            href="/seminaire-exemples"
            className={homeCtaOutlineGhostClass}
          >
            <span aria-hidden>→</span>
            Découvrir nos destinations
          </Link>
        </div>

        {/* Sticker chaussures — à cheval régions / étapes, un peu à droite du bord gauche */}
        <img
          src={HOME_EMOJI.chaussures}
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-[14%] z-30 h-40 w-40 translate-y-1/2 rotate-[-8deg] object-contain drop-shadow-md sm:left-[16%] sm:h-52 sm:w-52 lg:left-[18%] lg:h-60 lg:w-60"
        />
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section style={{ paddingTop: homeSectionPadding, paddingBottom: homeSectionPadding, background: '#ffffff' }}>
        <div className="mx-auto w-full max-w-[92rem] px-5 sm:px-8 lg:px-12">
          <h2 className={`${homeH1Class} mb-12 text-center`}>
            <span className="font-bold">Les étapes</span>{' '}
            <span className="font-normal">de votre prochain séminaire.</span>
          </h2>
        </div>

        <div className="relative">
          {/* Sticker montagne — déborde en bas à droite */}
          <img
            src={HOME_EMOJI.montagne}
            alt=""
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-5 z-30 h-32 w-32 translate-x-[18%] translate-y-[55%] rotate-[6deg] object-contain drop-shadow-md sm:right-8 sm:h-40 sm:w-40 lg:right-12 lg:h-48 lg:w-48"
          />

          {/* Mobile : carousel swipable */}
          <div
            ref={stepsScrollRef}
            className="flex min-w-0 cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-x pt-6 pb-1 active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:hidden"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollPaddingInline: '1.25rem',
              paddingLeft: '1.25rem',
              paddingRight: '1.25rem',
            }}
          >
            {HOME_STEPS.map((step, i) => (
              <div
                key={step.title}
                className="relative flex w-[70vw] max-w-[320px] shrink-0 snap-center flex-col pt-5"
              >
                <span
                  className="absolute left-1/2 top-0 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full font-sans text-[15px] font-bold tracking-[-0.05em] text-white"
                  style={{ background: HOME_COLORS.orange }}
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div
                  className="flex flex-col items-center overflow-hidden pt-9 text-center"
                  style={{ borderRadius: HOME_RADIUS, border: '1px solid rgba(12,29,34,0.12)' }}
                >
                  <p className={`${homeH2Class} px-4 font-bold`}>{step.title}</p>
                  <img
                    src={step.image}
                    alt={`Étape ${i + 1} : ${step.title}`}
                    className="pointer-events-none mt-auto aspect-square w-full select-none object-contain"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>

          <SwipeDots
            count={HOME_STEPS.length}
            activeIndex={stepsSwipe.activeIndex}
            onSelect={stepsSwipe.goTo}
            label="Étape"
            className="mt-5 sm:hidden"
          />

          {/* Desktop : grille */}
          <div className="mx-auto hidden w-full max-w-[92rem] px-5 pt-6 sm:grid sm:grid-cols-2 sm:gap-5 sm:px-8 lg:grid-cols-4 lg:gap-7 lg:px-12">
            {HOME_STEPS.map((step, i) => (
              <div key={step.title} className="relative flex h-full flex-col pt-5">
                <span
                  className="absolute left-1/2 top-0 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full font-sans text-[15px] font-bold tracking-[-0.05em] text-white"
                  style={{ background: HOME_COLORS.orange }}
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div
                  className="flex h-full flex-col items-center overflow-hidden pt-9 text-center"
                  style={{ borderRadius: HOME_RADIUS, border: '1px solid rgba(12,29,34,0.12)' }}
                >
                  <p className={`${homeH2Class} px-4 font-bold`}>{step.title}</p>
                  <img
                    src={step.image}
                    alt={`Étape ${i + 1} : ${step.title}`}
                    className="mt-auto aspect-square w-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        className="relative"
        style={{ paddingTop: homeSectionPadding, paddingBottom: homeSectionPadding, background: '#f4f4f4' }}
      >
        {/* Étoile décorative — coupée par le bord gauche de l'écran (overflow-x-hidden du wrapper) */}
        <img
          src={HOME_EMOJI.etoile}
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-0 z-0 hidden h-[300px] w-[300px] -translate-x-[46%] -translate-y-[18%] object-contain lg:block xl:h-[380px] xl:w-[380px]"
          style={{ top: homeSectionPadding }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-14">
            <div>
              <h2 className="font-sans text-[38px] leading-[1.05] tracking-[-0.075em] text-[#0c1d22] sm:text-[46px] lg:text-[54px]">
                <span className="font-bold">Questions</span>
                <br />
                <span className="font-normal">fréquentes</span>
              </h2>
              <p className={`${homeParagraphClass} mt-10 max-w-sm`}>
                Vous avez une question ? Consultez notre FAQ ou contactez-nous directement.
              </p>
            </div>
            <FaqAccordion />
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
