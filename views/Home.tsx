'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
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
  faqAnswerClass,
  homeSectionPadding,
  homeSeparatorPadding,
  bottomImageGradientClass,
  homeCtaOutlineClass,
  homeCtaOutlineGhostClass,
  homeHeroSolidButtonClass,
} from '../components/home/homeStyles';
import type { HomeAssetUrls } from '../lib/homeStorage';
import { HOME_EMOJI, HOME_PRODUCERS, HOME_STEPS, REGION_IMAGES, REGION_TAGS, regionDestinationPath } from '../lib/homeStorage';
import PhotoCopyright from '../components/PhotoCopyright';
import { getImageCopyright } from '../lib/imageCopyrights';
import { useModal } from '../context/ModalContext';

interface HomeProps {
  assets: HomeAssetUrls;
}

const FAQ_ITEMS = [
  {
    q: 'Pourquoi choisir TerraGo pour organiser un séminaire d\'entreprise ?',
    a: 'TerraGo imagine et organise des séminaires d\'entreprise sur mesure, partout en France. Nous sélectionnons des lieux, producteurs et partenaires engagés pour créer des expériences qui mêlent cohésion, découverte, nature et démarche RSE.',
  },
  {
    q: 'Pourquoi organiser un séminaire chez un producteur ?',
    a: 'Un séminaire chez un producteur permet de sortir du cadre habituel et de vivre une expérience authentique, avec un peu de terre sur les mains. Vos équipes découvrent un métier, un savoir-faire et un territoire tout en partageant un moment collectif autour d\'une activité concrète.',
  },
  {
    q: 'Où organiser un séminaire au vert ?',
    a: 'TerraGo organise des séminaires au vert partout en France, dans des fermes, domaines, vignobles, maisons de campagne et lieux en pleine nature. Nous sélectionnons le territoire et le lieu en fonction de vos objectifs, de votre équipe et de votre budget.',
  },
  {
    q: 'Comment organiser un séminaire RSE ?',
    a: 'Un séminaire RSE peut intégrer des rencontres avec des producteurs, des activités autour de l\'agriculture et de l\'alimentation, des ateliers de sensibilisation ou encore des actions concrètes pour les territoires. TerraGo construit ces expériences en fonction de vos engagements et de vos objectifs.',
  },
  {
    q: 'Quelle activité choisir pour un team building original ?',
    a: 'Tout dépend de votre équipe et de l\'objectif recherché. Atelier cuisine, randonnée, récolte, découverte d\'un savoir-faire, défi collectif, activité sportive ou expérience nature : TerraGo sélectionne des activités qui favorisent la participation et les échanges.',
  },
  {
    q: 'Combien coûte un séminaire d\'entreprise ?',
    a: 'Le budget dépend du nombre de participants, de la durée, du lieu et des prestations choisies. Chez TerraGo, les expériences commencent autour de 80 € par personne, une journée avec repas et activités autour de 150 € par personne, et un séminaire avec hébergement à partir d\'environ 350 € par personne.',
  },
  {
    q: 'Combien de participants peut accompagner TerraGo ?',
    a: 'TerraGo accompagne aussi bien les petites équipes que les groupes plus importants. Le nombre de participants dépend du lieu et des activités choisies, mais nous construisons des séminaires adaptés à la taille et aux besoins de chaque entreprise.',
  },
  {
    q: 'Peut-on organiser un séminaire avec hébergement et transport ?',
    a: 'Oui. TerraGo peut prendre en charge tout ou partie de l\'organisation de votre séminaire, notamment la recherche du lieu, l\'hébergement, la restauration, le transport, les activités et la coordination sur place.',
  },
  {
    q: 'Dans quelles régions TerraGo organise-t-il des séminaires ?',
    a: 'TerraGo organise des séminaires partout en France, notamment en Bretagne, Normandie, Pays de la Loire, Nouvelle-Aquitaine, Occitanie, Provence, Auvergne-Rhône-Alpes, Bourgogne et dans les Alpes. Nous pouvons également construire un projet dans une autre région selon vos besoins.',
  },
  {
    q: 'Peut-on personnaliser entièrement son événement d\'entreprise ?',
    a: 'Oui. Chaque séminaire TerraGo est construit sur mesure selon vos objectifs, le nombre de participants, votre budget, la durée souhaitée et l\'expérience que vous souhaitez faire vivre à vos équipes. Nous adaptons le lieu, les activités, les repas, l\'hébergement et le programme.',
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
              className="group flex w-full items-center gap-3 py-3.5 text-left sm:gap-4 sm:py-4"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="min-w-0 flex-1 font-sans text-[14px] font-bold leading-[1.3] tracking-[-0.03em] text-[#0c1d22] transition-opacity group-hover:opacity-70 sm:text-[15px]">
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
                <p className={`${faqAnswerClass} whitespace-pre-line pb-4 pr-8`}>{item.a}</p>
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
    title: 'Des partenaires sélectionnés avec soin',
    desc: 'Nous sélectionnons des lieux, producteurs et acteurs locaux pour leur savoir-faire, leur histoire, leur engagement et la qualité de leur accueil.',
  },
  {
    n: '02',
    title: 'Des expériences qui ont du sens',
    desc: 'Chaque événement est pensé pour favoriser les échanges, sortir du quotidien et créer de vrais souvenirs collectifs.',
  },
  {
    n: '03',
    title: 'Un impact positif',
    desc: 'Votre événement participe à faire vivre les territoires, les savoir-faire et les acteurs locaux qui vous accueillent.',
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
  const onPointerEnd = (e: PointerEvent) => {
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
  el.addEventListener('pointerup', onPointerEnd);
  el.addEventListener('pointercancel', onPointerEnd);
  return () => {
    el.removeEventListener('pointerdown', onDown);
    el.removeEventListener('pointermove', onMove);
    el.removeEventListener('pointerup', onPointerEnd);
    el.removeEventListener('pointercancel', onPointerEnd);
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
  const { openModal } = useModal();
  const regionScrollRef = useRef<HTMLDivElement>(null);
  const conceptScrollRef = useRef<HTMLDivElement>(null);
  const stepsScrollRef = useRef<HTMLDivElement>(null);
  const experiencesScrollRef = useRef<HTMLDivElement>(null);
  const [producerIndex, setProducerIndex] = useState(0);
  const [openConceptIndex, setOpenConceptIndex] = useState<number | null>(null);
  const activeProducer = HOME_PRODUCERS[producerIndex];

  const conceptSwipe = useSwipeTrack(conceptScrollRef, 3);
  const stepsSwipe = useSwipeTrack(stepsScrollRef, HOME_STEPS.length);
  const regionSwipe = useSwipeTrack(regionScrollRef, REGION_IMAGES.length);
  const experiencesSwipe = useSwipeTrack(experiencesScrollRef, 3);

  const conceptCards = [
    {
      image: assets.conceptLien,
      alt: 'Pour créer du lien',
      title: (
        <>
          Pour créer <span className="font-bold">du lien.</span>
        </>
      ),
      hover:
        'Des expériences collectives pour renforcer la cohésion et partager autre chose que le quotidien du bureau.',
    },
    {
      image: assets.conceptAgir,
      alt: 'Pour agir ensemble',
      title: (
        <>
          Pour <span className="font-bold">agir</span>
          <br />
          <span className="font-bold">ensemble.</span>
        </>
      ),
      hover:
        'Des activités les mains dans la terre, et de rencontres avec des producteurs engagés pour donner vie à vos engagements RSE et mieux comprendre les enjeux de nos territoires.',
    },
    {
      image: assets.conceptInspirer,
      alt: 'Pour inspirer',
      title: (
        <>
          Pour <span className="font-bold">inspirer.</span>
        </>
      ),
      hover:
        'Un autre cadre pour prendre du recul, réfléchir ensemble et regarder son entreprise autrement.',
    },
  ];

  const experiences = [
    {
      video: assets.expOlive,
      poster: assets.conceptAgir,
      title: (
        <>
          Récolte et réalisation de son huile d&apos;olive{' '}
          <span className="font-bold">en équipe</span>
        </>
      ),
    },
    {
      video: assets.expCuisine,
      poster: assets.conceptLien,
      title: (
        <>
          <span className="font-bold">Atelier cuisine</span> au cœur du moulin
        </>
      ),
    },
    {
      video: assets.expVin,
      poster: assets.conceptInspirer,
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
    const conceptEl = conceptScrollRef.current;
    const cleanups = [
      stepsScrollRef.current ? attachHorizontalDrag(stepsScrollRef.current) : null,
      experiencesScrollRef.current ? attachHorizontalDrag(experiencesScrollRef.current) : null,
    ].filter((off): off is () => void => !!off);

    if (!conceptEl) {
      return () => cleanups.forEach((off) => off());
    }

    let pointerId: number | null = null;
    let startX = 0;
    let startY = 0;
    let startScroll = 0;
    let moved = false;
    let downTarget: EventTarget | null = null;

    const onDown = (e: PointerEvent) => {
      pointerId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      startScroll = conceptEl.scrollLeft;
      moved = false;
      downTarget = e.target;
      conceptEl.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (pointerId !== e.pointerId) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      if (moved) conceptEl.scrollLeft = startScroll - dx;
    };
    const onPointerEnd = (e: PointerEvent) => {
      if (pointerId !== e.pointerId) return;
      pointerId = null;
      try {
        conceptEl.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      const isTap =
        !moved &&
        Math.abs(e.clientX - startX) < 10 &&
        Math.abs(e.clientY - startY) < 10;
      if (isTap && downTarget instanceof Element) {
        const card = downTarget.closest('[data-concept-index]');
        const index = card ? Number(card.getAttribute('data-concept-index')) : NaN;
        if (!Number.isNaN(index)) {
          setOpenConceptIndex((prev) => (prev === index ? null : index));
        }
      }
      downTarget = null;
    };

    conceptEl.addEventListener('pointerdown', onDown);
    conceptEl.addEventListener('pointermove', onMove);
    conceptEl.addEventListener('pointerup', onPointerEnd);
    conceptEl.addEventListener('pointercancel', onPointerEnd);
    return () => {
      conceptEl.removeEventListener('pointerdown', onDown);
      conceptEl.removeEventListener('pointermove', onMove);
      conceptEl.removeEventListener('pointerup', onPointerEnd);
      conceptEl.removeEventListener('pointercancel', onPointerEnd);
      cleanups.forEach((off) => off());
    };
  }, []);

  return (
    <div className="overflow-x-hidden bg-white">

      <HomeHero videoSrc={assets.heroVideo} posterSrc={assets.heroPoster} />

      {/* ── NOTRE CONCEPT ── */}
      <section
        id="concept"
        className="scroll-mt-28"
        style={{ paddingTop: homeSectionPadding, paddingBottom: homeSectionPadding, background: '#ffffff' }}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-10 text-center sm:mb-14">
            <h2 className="mx-auto max-w-4xl font-sans text-[34px] font-normal leading-[1.08] tracking-[-0.075em] text-[#0c1d22] sm:text-[40px] lg:text-[48px]">
              Des séminaires qui font{' '}
              <span className="font-bold">bien plus</span> que réunir vos équipes.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl font-sans text-[15px] font-normal leading-[1.65] tracking-[-0.04em] text-[#0c1d22]/65 sm:mt-6 sm:text-[17px]">
              Chez TerraGo, un séminaire est l&apos;occasion de sortir du cadre, de vivre quelque chose
              ensemble et de découvrir autrement les territoires qui nous entourent. Chaque expérience
              est pensée pour répondre à vos objectifs : cohésion d&apos;équipe, démarche RSE, réflexion
              collective ou simplement l&apos;envie de changer d&apos;air.
            </p>
          </div>
        </div>

        {/* Mobile : carousel swipable pleine largeur (même pattern que les régions) */}
        <div className="relative sm:mx-auto sm:max-w-6xl sm:px-8">
          <Image
            src={HOME_EMOJI.arbre}
            alt=""
            aria-hidden
            width={240}
            height={240}
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
            {conceptCards.map((card, i) => {
              const isOpen = openConceptIndex === i;
              return (
                <div
                  key={i}
                  data-concept-index={i}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  aria-label={card.alt}
                  className="relative aspect-[3/3.9] w-[70vw] max-w-[320px] shrink-0 snap-center overflow-hidden"
                  style={{ borderRadius: HOME_RADIUS }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setOpenConceptIndex((prev) => (prev === i ? null : i));
                    }
                  }}
                >
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="70vw"
                    className="pointer-events-none select-none object-cover"
                    draggable={false}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-500"
                    style={{ opacity: isOpen ? 1 : 0 }}
                  />
                  {getImageCopyright(card.image) ? (
                    <PhotoCopyright className="z-[2]" label={getImageCopyright(card.image)!} />
                  ) : null}
                  <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end px-6 pb-7">
                    <p className="font-sans text-[clamp(1.7rem,8.2vw,2.125rem)] font-normal leading-[1.1] tracking-[-0.075em] text-white">
                      {card.title}
                    </p>
                    <div
                      className="grid transition-all duration-300"
                      style={{
                        gridTemplateRows: isOpen ? '1fr' : '0fr',
                        opacity: isOpen ? 1 : 0,
                        marginTop: isOpen ? 10 : 0,
                      }}
                    >
                      <div className="overflow-hidden">
                        <p className="font-sans text-[12.5px] font-normal leading-[1.42] tracking-[-0.02em] text-white/85">
                          {card.hover}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    priority={i === 0}
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.1]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  {getImageCopyright(card.image) ? (
                    <PhotoCopyright className="z-[2]" label={getImageCopyright(card.image)!} />
                  ) : null}
                  <div className="absolute left-7 right-6 top-[52%] z-10 lg:left-8 lg:right-7">
                    <p className="font-sans text-[32px] font-normal leading-[1.15] tracking-[-0.075em] text-white lg:text-[36px]">
                      {card.title}
                    </p>
                    <p className="mt-3 max-w-[95%] font-sans text-[14px] font-normal leading-[1.5] tracking-[-0.02em] text-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:text-[15px]">
                      {card.hover}
                    </p>
                  </div>
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
              Des expériences <span className="font-bold">originales</span> à vivre ensemble.
            </h2>
            <p className="mt-7 font-sans text-[15px] font-normal leading-[1.65] tracking-[-0.04em] text-[#0c1d22]/65 sm:mt-9 sm:text-[17px]">
              Oubliez les activités de team building standardisées. Avec TerraGo, vos équipes deviennent
              actrices d&apos;une expérience authentique aux côtés de celles et ceux qui font vivre nos
              territoires. Mettre les mains dans la terre, cuisiner ensemble, découvrir un savoir-faire,
              relever un défi ou partager une grande tablée : nos expériences sont imaginées avec des
              producteurs passionnés et adaptées à votre équipe.
            </p>
          </div>

          <p className="mb-5 text-right font-sans text-[18px] font-bold leading-[1.3] tracking-[-0.05em] text-[#0c1d22] sm:mb-6 sm:text-[22px]">
            Quelques exemples d&apos;expériences
          </p>
        </div>

        {/* Mobile : carousel swipable */}
        <div className="relative">
          <Image
            src={HOME_EMOJI.branche}
            alt=""
            aria-hidden
            width={176}
            height={176}
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
                className="relative aspect-[16/10] w-[78vw] max-w-[360px] shrink-0 snap-center overflow-hidden bg-[#0c1d22]"
                style={{ borderRadius: HOME_RADIUS }}
              >
                <LazyVideo
                  src={exp.video}
                  poster={exp.poster}
                  priority={i === 0}
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
                  <Image
                    src={HOME_EMOJI.branche}
                    alt=""
                    aria-hidden
                    width={256}
                    height={256}
                    className="pointer-events-none absolute left-0 top-0 z-30 h-56 w-56 -translate-x-[38%] -translate-y-[48%] object-contain lg:h-64 lg:w-64"
                  />
                )}
                <div
                  className="group relative aspect-[16/11] overflow-hidden bg-[#0c1d22]"
                  style={{ borderRadius: HOME_RADIUS }}
                >
                  <LazyVideo
                    src={exp.video}
                    poster={exp.poster}
                    playOnHover
                    priority={i < 3}
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
              href="/experiences-entreprise"
              className={homeCtaOutlineClass}
            >
              <span aria-hidden>→</span>
              Nos expériences pour les entreprises
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
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#0c1d22] sm:aspect-[36/12] lg:aspect-[40/9]">
              <Image
                src={assets.bannerImage}
                alt="Serre maraîchère – TerraGo"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>

            <div className={`${bottomImageGradientClass} z-[1]`} />
            <div
              className="pointer-events-none absolute inset-0 z-[2]"
              style={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.32) 45%, transparent 100%)',
              }}
            />
            <div className="absolute inset-0 z-10 flex items-center justify-center px-5 py-12 text-center sm:px-8">
              <p className="max-w-none font-sans text-[clamp(1.65rem,6.5vw,2.75rem)] font-normal leading-[1.08] tracking-[-0.075em] text-white">
                Des séminaires qui ont <span className="font-bold">de l&apos;impact</span>,
                {' '}pour <span className="font-bold">vos équipes</span>, mais aussi pour{' '}
                <span className="font-bold">nos producteurs</span>.
              </p>
            </div>
          </div>

          {/* Sticker +1 producteur soutenu — à cheval bas vidéo / haut section rencontres */}
          <Image
            src={HOME_EMOJI.producteurSoutenu}
            alt="+1 producteur soutenu"
            width={200}
            height={200}
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
                  <Image
                    src={activeProducer.image}
                    alt={`${activeProducer.name} – producteur TerraGo`}
                    width={800}
                    height={870}
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="aspect-[4/4.35] h-auto w-full object-cover"
                  />

                  {getImageCopyright(activeProducer.image) ? (
                    <PhotoCopyright label={getImageCopyright(activeProducer.image)!} />
                  ) : null}

                  {/* Label nom */}
                  <span
                    className="absolute bottom-4 left-4 z-10 rounded-full px-4 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-white sm:bottom-5 sm:left-5 sm:text-[11px]"
                    style={{ background: HOME_COLORS.primary }}
                  >
                    {activeProducer.name}
                  </span>
                </div>

                {/* Emoji rateau — coin bas droit, bien plus grand */}
                <Image
                  src={HOME_EMOJI.rateau}
                  alt=""
                  aria-hidden
                  width={256}
                  height={256}
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
                Des <span className="font-bold">rencontres authentiques</span> pour des souvenirs durables
              </h2>
              <p className="mt-5 font-sans text-[15px] font-normal leading-[1.65] tracking-[-0.04em] text-[#0c1d22]/65 sm:mt-6 sm:text-[17px]">
                Une autre façon de concevoir vos événements d&apos;entreprise, plus humaine, plus locale et plus
                responsable.
              </p>

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
        id="destinations"
        className="relative scroll-mt-28"
        style={{ paddingTop: homeSectionPadding, paddingBottom: homeSectionPadding, background: '#f7f7f7' }}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="mx-auto max-w-3xl text-center font-sans text-[38px] font-normal leading-[1.05] tracking-[-0.075em] text-[#0c1d22] sm:text-[46px] lg:text-[54px]">
            Votre séminaire, <span className="font-bold" style={{ color: HOME_COLORS.orange }}>partout en France.</span>
          </h2>

          <div className="mt-7 flex flex-wrap justify-center gap-2 sm:mt-8">
            {REGION_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-4 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-white sm:text-[11px]"
                style={{ background: HOME_COLORS.orange }}
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
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(12,29,34,0.15)] bg-white/70 text-[#0c1d22] transition-colors hover:border-[#ec6435] hover:bg-[#ec6435] hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5m0 0l6-6m-6 6l6 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollRegions(1)}
                aria-label="Régions suivantes"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(12,29,34,0.15)] bg-white/70 text-[#0c1d22] transition-colors hover:border-[#ec6435] hover:bg-[#ec6435] hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              href={regionDestinationPath(region.slug)}
              className="group relative aspect-[3/3.4] w-[62vw] shrink-0 overflow-hidden sm:aspect-[3/4.1] sm:w-[255px] lg:aspect-[3/4.2] lg:w-[280px]"
              style={{ borderRadius: HOME_RADIUS }}
            >
              <Image
                src={region.image}
                alt={`Séminaire ${region.prep} ${region.name}`}
                fill
                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.12]"
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
            href="/destinations"
            className={homeCtaOutlineGhostClass}
          >
            <span aria-hidden>→</span>
            Découvrir nos destinations
          </Link>
        </div>

        {/* Sticker chaussures — à cheval régions / étapes, un peu à droite du bord gauche */}
        <Image
          src={HOME_EMOJI.chaussures}
          alt=""
          aria-hidden
          width={240}
          height={240}
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
          <Image
            src={HOME_EMOJI.montagne}
            alt=""
            aria-hidden
            width={192}
            height={192}
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
                  <Image
                    src={step.image}
                    alt={`Étape ${i + 1} : ${step.title}`}
                    width={800}
                    height={800}
                    sizes="70vw"
                    className="pointer-events-none mt-auto aspect-square h-auto w-full select-none object-contain"
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
                  <Image
                    src={step.image}
                    alt={`Étape ${i + 1} : ${step.title}`}
                    width={800}
                    height={800}
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="mt-auto aspect-square h-auto w-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ + CTA FINAL ── */}
      <section
        className="relative"
        style={{
          paddingTop: homeSectionPadding,
          paddingBottom: homeSectionPadding,
          background: HOME_COLORS.gray,
        }}
      >
        {/* Étoile décorative — coupée par le bord gauche de l'écran (overflow-x-hidden du wrapper) */}
        <Image
          src={HOME_EMOJI.etoile}
          alt=""
          aria-hidden
          width={380}
          height={380}
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
                Vous préparez un séminaire ou un événement d&apos;entreprise ? Voici les réponses aux
                questions que vous vous posez le plus souvent.
              </p>
            </div>
            <FaqAccordion />
          </div>
        </div>

        <div
          className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8"
          style={{ marginTop: 'clamp(3.5rem, 8vw, 6rem)' }}
        >
          <div className="relative">
            <Image
              src={HOME_EMOJI.ble}
              alt=""
              aria-hidden
              width={160}
              height={160}
              className="pointer-events-none absolute right-0 top-1/2 z-20 h-20 w-20 -translate-y-1/2 translate-x-1/2 object-contain sm:h-28 sm:w-28 lg:h-36 lg:w-36"
            />
            <div
              className="relative overflow-hidden px-6 py-14 text-center sm:px-12 sm:py-14 lg:py-16"
              style={{ background: HOME_COLORS.orange, borderRadius: HOME_RADIUS }}
            >
              <h2 className="mx-auto max-w-2xl font-sans text-[28px] font-normal leading-[1.1] tracking-[-0.07em] text-white sm:text-[36px] lg:text-[42px]">
                Prêt à imaginer votre prochain{' '}
                <span className="font-bold">séminaire d&apos;entreprise</span> ?
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-[14px] font-normal leading-[1.7] tracking-[-0.04em] text-white/85 sm:mt-5 sm:text-[15px]">
                Parlez-nous de votre équipe, de vos envies et de vos contraintes. Nous vous proposerons une
                expérience qui vous ressemble.
              </p>
              <button
                type="button"
                onClick={() => openModal()}
                className={`mt-8 ${homeHeroSolidButtonClass} bg-white text-[#0c1d22] hover:bg-[#0c1d22] hover:text-white sm:mt-10`}
              >
                Construire votre prochain séminaire
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
