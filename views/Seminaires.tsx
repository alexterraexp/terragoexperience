'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useModal } from '../context/ModalContext';
import {
  HOME_COLORS,
  HOME_RADIUS,
  homeFramedHeroAspectClass,
  homeParagraphClass,
  homeSectionPadding,
  bottomImageGradientClass,
  homeHeroOutlineButtonClass,
  homeHeroSolidButtonClass,
  homeOnDarkOutlineButtonClass,
  homeCtaOutlineClass,
} from '../components/home/homeStyles';
import FramedHeroImage from '../components/FramedHeroImage';
import { seminaireEnjeuPath } from '../lib/seminaireEnjeux';
import { EXEMPLES_SEMINAIRE_ENTREPRISE_PATH } from '../lib/exemplesSeminaireEntreprise';
import FaqExcerpt from '../components/FaqExcerpt';

const HOME =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME';

const ASSETS = {
  hero: `${HOME}/arrivee-randonnee.webp`,
  ble: `${HOME}/emoji/ble.png`,
  etoile: `${HOME}/etoilecouleurfoncee.png`,
  sOrange: `${HOME}/emoji/s-picto-orange.png`,
  feu: `${HOME}/emoji/feu.png`,
  piment: `${HOME}/emoji/piment.png`,
  lieux: `${HOME}/eleveuse.webp`,
  producteurSoutenu: `${HOME}/emoji/producteur-sountenu.png`,
} as const;

/** Même taille que les titres de section de la Home. */
const sectionTitleClass =
  'font-sans text-[34px] font-normal leading-[1.08] tracking-[-0.075em] text-[#0c1d22] sm:text-[40px] lg:text-[48px]';

// ─── Scroll reveal ────────────────────────────────────────────────────────────

const ScrollAnimate: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

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

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    lead: 'Des rencontres avec des ',
    rest: 'producteurs engagés',
    image:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/noixsoeurs/noix-et-lavande-drome%20(1).jpeg',
    alt: 'Rencontre avec des producteurs engagés – séminaire TerraGo',
  },
  {
    lead: 'Des repas locaux ',
    rest: 'et conviviaux',
    image: `${HOME}/pique-nique-convivial.webp`,
    alt: 'Repas locaux et conviviaux – séminaire TerraGo',
  },
  {
    lead: 'Des activités ',
    rest: 'les mains dans la terre',
    image:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/potagermenthon/groupe-potager-menthon.webp',
    alt: 'Activités les mains dans la terre – séminaire TerraGo',
  },
  {
    lead: 'Des activités ',
    rest: 'sportives et de cohésion',
    image: `${HOME}/1778230843638-01ea1fda248a.avif`,
    alt: 'Activités sportives et de cohésion – séminaire TerraGo',
  },
  {
    lead: 'Des logements de groupe ',
    rest: 'charmants & typiques',
    image: `${HOME}/hotel-typique.jpg`,
    alt: 'Logements de groupe charmants et typiques – séminaire TerraGo',
  },
  {
    lead: 'Des temps de réunion ',
    rest: 'dans des lieux inspirants',
    image: `${HOME}/seminaire/536782491-meeting.webp`,
    alt: 'Temps de réunion dans des lieux inspirants – séminaire TerraGo',
  },
] as const;

type Objectif = {
  id: string;
  href: string;
  title: string;
  subtitle: string;
  lead: string;
  experiences: string[];
  ctaLabel: string;
};

const OBJECTIFS: Objectif[] = [
  {
    id: 'cohesion',
    href: seminaireEnjeuPath('cohesion'),
    title: 'Objectif de cohésion',
    subtitle: 'Créer des liens autrement.',
    lead:
      "Sortir du cadre habituel pour vivre une expérience collective authentique, renforcer la cohésion d'équipe et partager des moments qui marquent durablement les collaborateurs.",
    experiences: [
      'Défis collaboratifs',
      'Activités outdoor',
      'Immersion chez des producteurs',
      'Ateliers participatifs',
      'Randonnées et activités nature',
      'Moments de convivialité',
    ],
    ctaLabel: 'Découvrir nos séminaires de cohésion',
  },
  {
    id: 'sensibilisation',
    href: seminaireEnjeuPath('sensibilisation-rse'),
    title: 'Objectif de RSE & de sensibilisation',
    subtitle: 'Comprendre les enjeux du vivant.',
    lead:
      'Découvrir les réalités du monde agricole sur le terrain, échanger avec des producteurs engagés et mieux comprendre les défis environnementaux auxquels ils font face au quotidien.',
    experiences: [
      'Rencontres avec des producteurs engagés',
      'Découverte des pratiques agricoles durables',
      'Compréhension des enjeux liés au changement climatique',
      'Immersion dans les circuits courts',
      'Découverte des savoir-faire locaux',
    ],
    ctaLabel: 'Découvrir nos séminaires de RSE & de sensibilisation',
  },
  {
    id: 'inspiration',
    href: seminaireEnjeuPath('inspiration-miroir'),
    title: "Objectif d'inspiration & miroir d'entreprise",
    subtitle: 'Prendre du recul pour mieux avancer.',
    lead:
      "S'inspirer de femmes et d'hommes qui produisent, s'adaptent, innovent et transmettent leur passion. Leurs défis quotidiens (adaptation, résilience, gestion des ressources, prise de décision...) offrent un miroir concret des enjeux auxquels les entreprises font face aujourd'hui.",
    experiences: [
      "Vos enjeux d'entreprise vécus sur le terrain",
      'Des expériences miroir entre agriculture et entreprise',
      'Immersion autour des défis qui résonnent avec votre organisation',
      'Décryptage de vos enjeux à travers des situations réelles',
    ],
    ctaLabel: "Découvrir nos séminaires d'inspiration & miroir d'entreprise",
  },
  {
    id: 'au-vert',
    href: seminaireEnjeuPath('au-vert'),
    title: "Objectif de s'aérer au vert",
    subtitle: 'Sortez du cadre habituel.',
    lead:
      'Quitter les bureaux, prendre l’air et vivre une expérience collective dans un environnement qui change vraiment du quotidien.',
    experiences: [
      'Activités outdoor et pleine nature',
      'Défis et challenges collectifs',
      'Immersion chez un producteur',
      'Découverte de la gastronomie locale',
      'Randonnée et découverte de la nature',
      'Moments de convivialité en extérieur',
    ],
    ctaLabel: 'Découvrir nos séminaires au vert',
  },
];

type UniversData = {
  id: string;
  lead: string;
  rest: string;
  cardImage: string;
};

const UNIVERS_DATA: UniversData[] = [
  {
    id: 'oliviers',
    lead: 'Sous les ',
    rest: 'oliviers',
    cardImage: `${HOME}/univers/565459374854-6fa73a99abf5.avif`,
  },
  {
    id: 'marees',
    lead: 'Au rythme des ',
    rest: 'marées',
    cardImage: `${HOME}/univers/photo-1529230117010-b6c436154f25.avif`,
  },
  {
    id: 'piment',
    lead: 'Au pays du ',
    rest: 'piment',
    cardImage: `${HOME}/univers/photo-1546860255-95536c19724e.avif`,
  },
  {
    id: 'ferme',
    lead: 'À la ',
    rest: 'ferme',
    cardImage: `${HOME}/seminaire/ferme/295839-farm.webp`,
  },
  {
    id: 'vergers',
    lead: 'Au cœur des ',
    rest: 'vergers',
    cardImage: `${HOME}/univers/photo-1537811465496-6c38a51d2d81.avif`,
  },
  {
    id: 'vignes',
    lead: 'Entre les ',
    rest: 'vignes',
    cardImage: `${HOME}/Destination/photo-1621148998923-872e8157057a.avif`,
  },
  {
    id: 'ruches',
    lead: 'Au milieu des ',
    rest: 'ruches',
    cardImage: `${HOME}/univers/photo-1473973266408-ed4e27abdd47.avif`,
  },
  {
    id: 'truffiers',
    lead: 'Sous les ',
    rest: 'chênes truffiers',
    cardImage: `${HOME}/univers/photo-1589208310452-7cf38ba4d109.avif`,
  },
  {
    id: 'affineurs',
    lead: 'Chez les maîtres ',
    rest: 'affineurs',
    cardImage: `${HOME}/EXPERIENCES%20IMG/6427859-fromage.webp`,
  },
  {
    id: 'potagers',
    lead: 'Dans les ',
    rest: 'potagers',
    cardImage: `${HOME}/univers/premium_photo-1679862570873-28b32f3bdadc.avif`,
  },
  {
    id: 'brasseries',
    lead: 'Au cœur des ',
    rest: 'brasseries artisanales',
    cardImage: `${HOME}/univers/photo-1731688687548-16c5da917c11.avif`,
  },
  {
    id: 'lavande',
    lead: 'Au milieu des champs de ',
    rest: 'lavande',
    cardImage: `${HOME}/univers/photo-1784105259318-987c28ff3875.avif`,
  },
  {
    id: 'elevages',
    lead: 'Au milieu des ',
    rest: 'élevages',
    cardImage: `${HOME}/univers/photo-1596733430284-f7437764b1a9.avif`,
  },
];

const LIEUX_IMAGES = [
  {
    src: `${HOME}/Destination/chateau-astros.jpg`,
    alt: 'Château d’Astros – lieu TerraGo',
  },
  {
    src: `${HOME}/Destination/2f6e47d7-1365-477c-a385-e8b79425e199_3_317250-169600042944886.jpeg`,
    alt: 'Domaine d’exception – lieu TerraGo',
  },
  {
    src: `${HOME}/Destination/facade-3_3_222171-163636325813666.jpeg`,
    alt: 'Façade de domaine – lieu TerraGo',
  },
  {
    src: `${HOME}/Destination/62544708-23170201.webp`,
    alt: 'Allée de cyprès menant à un domaine – lieu TerraGo',
  },
  {
    src: `${HOME}/Destination/19986461.webp`,
    alt: 'Dîner d’exception dans un cellier – lieu TerraGo',
  },
] as const;

// ─── Objectifs accordion ──────────────────────────────────────────────────────

const ObjectifsAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {OBJECTIFS.map((obj) => {
        const isOpen = openId === obj.id;
        return (
          <div
            key={obj.id}
            className="overflow-hidden transition-shadow duration-300"
            style={{
              borderRadius: HOME_RADIUS,
              border: `1.5px solid ${isOpen ? HOME_COLORS.orange : 'rgba(12,29,34,0.12)'}`,
              background: '#ffffff',
            }}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-7 sm:py-5"
              onClick={() => setOpenId(isOpen ? null : obj.id)}
              aria-expanded={isOpen}
            >
              <span className="font-sans text-[16px] font-bold tracking-[-0.04em] text-[#0c1d22] sm:text-[18px]">
                {obj.title}
              </span>
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300"
                style={{
                  border: `1.5px solid ${HOME_COLORS.orange}`,
                  color: HOME_COLORS.orange,
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="6" y1="1" x2="6" y2="11" />
                  <line x1="1" y1="6" x2="11" y2="6" />
                </svg>
              </span>
            </button>

            <div
              className="grid transition-all duration-300"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', opacity: isOpen ? 1 : 0 }}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 sm:px-7 sm:pb-7">
                  <div
                    className="px-5 py-5 sm:px-6 sm:py-6"
                    style={{ background: HOME_COLORS.gray, borderRadius: '18px' }}
                  >
                    <p className="font-sans text-[16px] font-bold leading-snug tracking-[-0.04em] text-[#0c1d22] sm:text-[17px]">
                      {obj.subtitle}
                    </p>
                    <p className="mt-3 font-sans text-[14px] font-normal leading-[1.7] tracking-[-0.04em] text-[#0c1d22]/70 sm:text-[15px]">
                      {obj.lead}
                    </p>
                    <p className="mt-5 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#ec6435]">
                      Nos expériences
                    </p>
                    <ul className="mt-3 flex flex-col gap-2.5">
                      {obj.experiences.map((t) => (
                        <li
                          key={t}
                          className="flex items-start gap-3 font-sans text-[14px] font-medium leading-snug tracking-[-0.03em] text-[#0c1d22]"
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: HOME_COLORS.orange }}
                          />
                          {t}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <Link href={obj.href} className={homeCtaOutlineClass}>
                        {obj.ctaLabel}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const Seminaires: React.FC = () => {
  const searchParams = useSearchParams();
  const { openModal } = useModal();

  const [plaquetteEmail, setPlaquetteEmail] = useState('');
  const [plaquetteSubmitting, setPlaquetteSubmitting] = useState(false);
  const [plaquetteSuccess, setPlaquetteSuccess] = useState(false);
  const [plaquetteEmailError, setPlaquetteEmailError] = useState('');

  const universTrackRef = useRef<HTMLDivElement>(null);
  const [universIndex, setUniversIndex] = useState(0);

  const lieuxTrackRef = useRef<HTMLDivElement>(null);
  const [lieuxIndex, setLieuxIndex] = useState(0);

  const featuresScrollRef = useRef<HTMLDivElement>(null);
  const featuresSwipe = useSwipeTrack(featuresScrollRef, FEATURES.length);

  useEffect(() => {
    const el = featuresScrollRef.current;
    if (!el) return;
    return attachHorizontalDrag(el);
  }, []);

  useEffect(() => {
    if (searchParams.get('scroll') === 'nos-univers') {
      const el = document.getElementById('nos-univers');
      if (!el) return;
      const t = setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      return () => clearTimeout(t);
    }
  }, [searchParams]);

  const scrollUnivers = (dir: 'left' | 'right') => {
    const track = universTrackRef.current;
    if (!track) return;
    const card = track.children[0] as HTMLElement | undefined;
    if (!card) return;
    const step = card.offsetWidth + 16;
    track.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' });
  };

  useEffect(() => {
    const track = universTrackRef.current;
    if (!track) return;
    const onScroll = () => {
      const card = track.children[0] as HTMLElement | undefined;
      if (!card) return;
      const step = card.offsetWidth + 16;
      setUniversIndex(Math.round(track.scrollLeft / step));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  const scrollLieux = (dir: 'left' | 'right') => {
    const next =
      dir === 'left'
        ? (lieuxIndex - 1 + LIEUX_IMAGES.length) % LIEUX_IMAGES.length
        : (lieuxIndex + 1) % LIEUX_IMAGES.length;
    setLieuxIndex(next);
    const track = lieuxTrackRef.current;
    if (!track) return;
    const slide = track.children[next] as HTMLElement | undefined;
    if (slide) track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  };

  const handlePlaquetteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPlaquetteEmailError('');
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!plaquetteEmail.trim() || !re.test(plaquetteEmail.trim())) {
      setPlaquetteEmailError('Veuillez renseigner une adresse mail valide');
      return;
    }
    setPlaquetteSubmitting(true);
    try {
      const r = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ action: 'plaquette', email: plaquetteEmail.trim() }),
      });
      const data = (await r.json().catch(() => ({}))) as { success?: boolean };
      if (!r.ok || !data.success) throw new Error();
      setPlaquetteSuccess(true);
      setPlaquetteEmail('');
    } catch {
      alert('Une erreur est survenue.');
    } finally {
      setPlaquetteSubmitting(false);
    }
  };

  return (
    <div className="overflow-x-hidden bg-white font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* ── HERO (même structure que Notre approche) ── */}
      <section className="relative w-full bg-white pt-[calc(7.5rem+env(safe-area-inset-top))] sm:pt-[calc(9rem+env(safe-area-inset-top))] lg:pt-[calc(10.5rem+env(safe-area-inset-top))]">
        <div className="mx-auto max-w-6xl px-5 pb-2 sm:px-8">
          <div
            className={`relative ${homeFramedHeroAspectClass}`}
            style={{ borderRadius: HOME_RADIUS }}
          >
            <FramedHeroImage
              src={ASSETS.hero}
              alt="Arrivée en randonnée – séminaire TerraGo"
            />
            <div className={`${bottomImageGradientClass} z-[1]`} />
            <div
              className="absolute inset-0 z-[2]"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.5) 100%)',
              }}
            />

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 pb-8 pt-10 text-center sm:px-10 sm:pb-10 sm:pt-16 lg:pt-20">
              <h1 className="max-w-3xl text-center font-sans text-[clamp(1.75rem,5.2vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.075em] text-white">
                Séminaires d&apos;entreprise engagés
              </h1>
              <h2 className="mt-4 max-w-2xl text-center font-sans text-[15px] font-normal leading-relaxed tracking-[-0.04em] text-white/90 sm:mt-6 sm:text-[17px]">
                Organisez un séminaire d&apos;entreprise sur mesure, dans des lieux authentiques partout en France, entre nature, terroir, rencontres et expériences collectives.
              </h2>
              <button
                type="button"
                onClick={() => openModal()}
                className={`mt-7 ${homeHeroOutlineButtonClass} sm:mt-9`}
                style={{ background: 'rgba(12, 29, 34, 0.12)' }}
              >
                Demander un devis
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section
        id="intro-seminaire"
        className="relative scroll-mt-28"
        style={{ paddingTop: homeSectionPadding, paddingBottom: 'clamp(2.5rem, 5vw, 4rem)', background: '#ffffff' }}
      >
        <Image
          src={ASSETS.sOrange}
          alt=""
          aria-hidden
          width={260}
          height={260}
          className="pointer-events-none absolute right-0 z-0 hidden h-[200px] w-[200px] translate-x-[30%] -translate-y-[20%] object-contain lg:block xl:h-[260px] xl:w-[260px]"
          style={{ top: 0 }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
          <Image
            src={ASSETS.producteurSoutenu}
            alt="+1 producteur soutenu"
            width={208}
            height={208}
            className="pointer-events-none absolute right-5 top-0 z-20 h-28 w-auto -translate-y-[72%] object-contain sm:right-8 sm:h-40 sm:-translate-y-[55%] lg:right-8 lg:h-52"
          />
          <ScrollAnimate>
            <h2 className={`max-w-3xl ${sectionTitleClass}`}>
              <span className="font-bold">Bien plus</span> qu&apos;un séminaire
              <br />
              d&apos;entreprise.
            </h2>
          </ScrollAnimate>
          <ScrollAnimate delay={80}>
            <div className="mt-6 grid gap-6 sm:mt-8 sm:grid-cols-2 sm:gap-10">
              <div className="space-y-5">
                <p className={homeParagraphClass}>
                  Au-delà de la cohésion d&apos;équipe, chaque séminaire TerraGo génère un impact concret
                  sur le territoire qui vous accueille.
                </p>
                <p className={homeParagraphClass}>
                  En choisissant de vivre cette expérience au cœur des exploitations, ateliers et domaines,
                  votre entreprise soutient directement les producteurs, agriculteurs, artisans et
                  entrepreneurs locaux qui transmettent leur savoir-faire avec passion. Chaque rencontre,
                  chaque activité et chaque repas participent à valoriser une économie locale, des métiers
                  essentiels et un patrimoine vivant.
                </p>
              </div>
              <p className={homeParagraphClass}>
                Pour vos collaborateurs, cette immersion donne du sens au séminaire. Ils ne repartent pas
                seulement avec de bons souvenirs, mais avec le sentiment d&apos;avoir découvert des femmes
                et des hommes engagés, d&apos;avoir contribué à faire vivre leur activité et d&apos;avoir
                participé, à leur échelle, à quelque chose de concret. Une expérience authentique qui
                marque durablement les équipes et renforce les liens bien au-delà de l&apos;évènement.
              </p>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section style={{ paddingBottom: homeSectionPadding, background: '#ffffff' }}>
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ScrollAnimate>
            <h2 className="mb-6 font-sans text-[22px] font-normal leading-[1.2] tracking-[-0.05em] text-[#0c1d22] sm:mb-8 sm:text-[26px] lg:text-[28px]">
              Au sein de nos séminaires, <span className="font-bold">vous retrouvez</span> :
            </h2>
          </ScrollAnimate>
        </div>

        <div className="relative sm:mx-auto sm:max-w-6xl sm:px-8">
          {/* Mobile : carousel swipable */}
          <div
            ref={featuresScrollRef}
            className="flex min-w-0 cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-x pb-1 active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:hidden"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollPaddingInline: '1.25rem',
              paddingLeft: '1.25rem',
              paddingRight: '1.25rem',
            }}
          >
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="relative aspect-[3/3.45] w-[70vw] max-w-[320px] shrink-0 snap-center overflow-hidden"
                style={{ borderRadius: HOME_RADIUS }}
              >
                <Image
                  src={f.image}
                  alt={f.alt}
                  fill
                  sizes="70vw"
                  className="pointer-events-none select-none object-cover"
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
                <p className="pointer-events-none absolute left-5 right-4 top-[50%] z-10 font-sans text-[24px] leading-[1.12] tracking-[-0.075em] text-white">
                  <span className="font-normal">{f.lead}</span>
                  <span className="font-bold">{f.rest}</span>
                </p>
              </div>
            ))}
          </div>

          <SwipeDots
            count={FEATURES.length}
            activeIndex={featuresSwipe.activeIndex}
            onSelect={featuresSwipe.goTo}
            label="Atout séminaire"
            className="mt-5 sm:hidden"
          />

          {/* Desktop / tablet : grille */}
          <div className="hidden grid-cols-2 gap-4 sm:grid lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <ScrollAnimate key={f.rest} delay={i * 60}>
                <div
                  className="group relative aspect-[5/4] overflow-hidden"
                  style={{ borderRadius: HOME_RADIUS }}
                >
                  <Image
                    src={f.image}
                    alt={f.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    priority={i === 0}
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.1]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                  <p className="absolute left-5 right-4 top-[50%] z-10 font-sans text-[26px] leading-[1.12] tracking-[-0.075em] text-white lg:left-6 lg:right-5 lg:text-[28px]">
                    <span className="font-normal">{f.lead}</span>
                    <span className="font-bold">{f.rest}</span>
                  </p>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* ── OBJECTIFS ── */}
      <section
        className="relative"
        style={{ paddingTop: homeSectionPadding, paddingBottom: homeSectionPadding, background: HOME_COLORS.gray }}
      >
        <Image
          src={ASSETS.etoile}
          alt=""
          aria-hidden
          width={380}
          height={380}
          className="pointer-events-none absolute left-0 z-0 hidden h-[300px] w-[300px] -translate-x-[48%] object-contain lg:block xl:h-[380px] xl:w-[380px]"
          style={{ top: '18%' }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8">
          <ScrollAnimate>
            <h2 className={`mb-8 text-center sm:mb-10 ${sectionTitleClass}`}>
            Chaque séminaire répond à un 
              <br />
              <span className="font-bold">objectif précis.</span>
            </h2>
          </ScrollAnimate>
          <ScrollAnimate delay={100}>
            <ObjectifsAccordion />
          </ScrollAnimate>
        </div>
      </section>

      {/* ── UNIVERS ── */}
      <section
        id="nos-univers"
        className="relative scroll-mt-28"
        style={{ paddingTop: homeSectionPadding, paddingBottom: homeSectionPadding, background: '#ffffff' }}
      >
        <Image
          src={ASSETS.ble}
          alt=""
          aria-hidden
          width={176}
          height={176}
          className="pointer-events-none absolute right-3 top-0 z-20 h-24 w-24 -translate-y-1/2 object-contain sm:right-8 sm:h-36 sm:w-36 lg:right-12 lg:h-44 lg:w-44"
        />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <ScrollAnimate>
              <h2 className={`max-w-xl ${sectionTitleClass}`}>
                Des séminaires dans tous
                <br />
                <span className="font-bold">les univers du terroir.</span>
              </h2>
            </ScrollAnimate>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollUnivers('left')}
                aria-label="Univers précédent"
                className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-opacity hover:opacity-85"
                style={{ background: HOME_COLORS.orange }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollUnivers('right')}
                aria-label="Univers suivant"
                className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-opacity hover:opacity-85"
                style={{ background: HOME_COLORS.orange }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div
            ref={universTrackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
            style={{
              WebkitOverflowScrolling: 'touch',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            {UNIVERS_DATA.map((u) => (
              <div
                key={u.id}
                className="group relative aspect-[3/4] w-[72%] shrink-0 snap-start overflow-hidden sm:w-[42%] lg:w-[23%]"
                style={{ borderRadius: HOME_RADIUS }}
              >
                <Image
                  src={u.cardImage}
                  alt={`${u.lead}${u.rest}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.14]"
                  draggable={false}
                />
                <div
                  className="absolute inset-0 opacity-70 transition-opacity duration-700 ease-out group-hover:opacity-100"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 42%, transparent 72%)',
                  }}
                />
                <p className="absolute inset-x-0 bottom-14 z-10 flex min-h-[2.6em] items-start px-4 font-sans text-[24px] leading-[1.12] tracking-[-0.075em] text-white sm:bottom-16 sm:px-5 sm:text-[28px]">
                  <span>
                    <span className="font-normal">{u.lead}</span>
                    <span className="font-bold">{u.rest}</span>
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-center gap-1.5 sm:hidden">
            {UNIVERS_DATA.map((u, i) => (
              <span
                key={u.id}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === universIndex ? 20 : 6,
                  background: i === universIndex ? HOME_COLORS.orange : 'rgba(12,29,34,0.15)',
                }}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center sm:mt-10">
            <Link
              href={EXEMPLES_SEMINAIRE_ENTREPRISE_PATH}
              className="inline-flex items-center justify-center rounded-full border border-[#ec6435] px-5 py-1.5 text-[11px] font-bold tracking-[-0.02em] text-[#ec6435] transition-colors hover:bg-[#ec6435] hover:text-white sm:px-10 sm:py-2.5 sm:text-[13px]"
            >
              Découvrir nos exemples de séminaire d&apos;entreprise
            </Link>
          </div>
        </div>
      </section>

      {/* ── LIEUX ── */}
      <section
        style={{ paddingTop: homeSectionPadding, paddingBottom: homeSectionPadding, background: HOME_COLORS.gray }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14">
          <ScrollAnimate>
            <div className="relative">
              <div
                className="overflow-hidden"
                style={{ borderRadius: HOME_RADIUS }}
              >
                <div
                  ref={lieuxTrackRef}
                  className="flex snap-x snap-mandatory overflow-x-auto"
                  style={{
                    WebkitOverflowScrolling: 'touch',
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                  }}
                >
                  {LIEUX_IMAGES.map((img) => (
                    <div key={img.src} className="relative aspect-[4/3] w-full min-w-full shrink-0 snap-center">
                      <Image src={img.src} alt={img.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {LIEUX_IMAGES.map((_, i) => (
                    <span
                      key={i}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: i === lieuxIndex ? 20 : 6,
                        background: i === lieuxIndex ? HOME_COLORS.orange : 'rgba(12,29,34,0.15)',
                      }}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => scrollLieux('left')}
                    aria-label="Photo précédente"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0c1d22]/15 text-[#0c1d22] transition-colors hover:border-[#0c1d22] hover:bg-[#0c1d22] hover:text-white"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollLieux('right')}
                    aria-label="Photo suivante"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0c1d22]/15 text-[#0c1d22] transition-colors hover:border-[#0c1d22] hover:bg-[#0c1d22] hover:text-white"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </ScrollAnimate>

          <ScrollAnimate delay={100}>
            <h2 className={sectionTitleClass}>
              Avec <span className="font-bold">des lieux qui transforment</span> votre expérience.
            </h2>
            <p className={`mt-5 ${homeParagraphClass}`}>
              Fermes, domaines agricoles, espaces verdoyants : nos lieux partenaires sont choisis pour leur
              authenticité et leur capacité à accueillir vos équipes dans un cadre ressourçant.
            </p>
            <p className={`mt-4 ${homeParagraphClass}`}>
              Hébergement, restauration locale, salles de réunion discrètes et activités immersives —
              tout est orchestré pour que vous n&apos;ayez qu&apos;à vivre le moment.
            </p>
            <Link
              href="/destinations"
              className="mt-8 inline-flex items-center justify-center rounded-full border border-[#ec6435] px-5 py-1.5 text-[11px] font-bold tracking-[-0.02em] text-[#ec6435] transition-colors hover:bg-[#ec6435] hover:text-white sm:px-10 sm:py-2.5 sm:text-[13px]"
            >
              Découvrir toutes nos destinations
            </Link>
          </ScrollAnimate>
        </div>
      </section>

      {/* ── MISSION / APPROCHE ── */}
      <section style={{ paddingTop: homeSectionPadding, paddingBottom: homeSectionPadding, background: '#ffffff' }}>
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <ScrollAnimate>
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#ec6435]">
              Notre mission
            </p>
            <h3 className="mt-3 font-sans text-[22px] font-bold leading-[1.15] tracking-[-0.05em] text-[#0c1d22] sm:text-[26px]">
              Des séminaires qui soutiennent les territoires, sans rien laisser au hasard.
            </h3>
            <div className="mt-5 flex flex-col gap-4">
              <p className={homeParagraphClass}>
                TerraGo imagine des séminaires d&apos;entreprise qui font vivre les territoires tout en
                simplifiant l&apos;organisation pour votre entreprise.
              </p>
              <p className={homeParagraphClass}>
                Nous sélectionnons des producteurs, agriculteurs, artisans, hébergeurs et acteurs locaux
                pour construire des expériences authentiques, adaptées à vos objectifs, votre groupe et
                votre budget.
              </p>
              <p className={homeParagraphClass}>
                Du choix du lieu aux activités, en passant par la restauration, l&apos;hébergement, le
                transport et la coordination, nous orchestrons chaque étape avec un interlocuteur unique.
              </p>
            </div>
          </ScrollAnimate>
          <ScrollAnimate delay={80}>
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#ec6435]">
              Notre approche
            </p>
            <ul className="mt-5 flex flex-col gap-5">
              {[
                {
                  title: 'Sur mesure',
                  text: 'Un programme construit selon vos objectifs, votre budget, votre nombre de participants et vos contraintes.',
                },
                {
                  title: 'Des partenaires engagés',
                  text: 'Des producteurs, hébergeurs, restaurateurs et acteurs locaux sélectionnés pour leur savoir-faire et la qualité de leur accueil.',
                },
                {
                  title: 'Une organisation clé en main',
                  text: 'Nous coordonnons les différents prestataires et assurons le suivi du projet jusqu’au jour J.',
                },
                {
                  title: 'Un impact concret',
                  text: 'Votre événement contribue directement à faire vivre des savoir-faire, des métiers et une économie locale.',
                },
              ].map((item) => (
                <li key={item.title}>
                  <p className="font-sans text-[16px] font-bold leading-snug tracking-[-0.04em] text-[#0c1d22] sm:text-[17px]">
                    {item.title}
                  </p>
                  <p className="mt-1.5 font-sans text-[14px] font-normal leading-[1.65] tracking-[-0.04em] text-[#0c1d22]/70 sm:text-[15px]">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
            <p className={`mt-6 ${homeParagraphClass}`}>
              L&apos;objectif : vous permettre de vous concentrer sur vos équipes et votre événement,
              pendant que TerraGo s&apos;occupe du reste.
            </p>
          </ScrollAnimate>
        </div>
      </section>

      {/* ── CTA + PLAQUETTE ── */}
      <section
        style={{
          paddingTop: homeSectionPadding,
          paddingBottom: homeSectionPadding,
          background: HOME_COLORS.gray,
        }}
      >
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <Image
            src={ASSETS.feu}
            alt=""
            aria-hidden
            width={208}
            height={208}
            className="pointer-events-none absolute -left-4 -top-10 z-20 h-28 w-28 object-contain sm:-left-8 sm:-top-14 sm:h-40 sm:w-40 lg:-left-12 lg:-top-16 lg:h-52 lg:w-52"
          />
          <Image
            src={ASSETS.piment}
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
              Prêts à organiser <span className="font-bold">votre séminaire</span> ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-sans text-[14px] font-normal leading-[1.7] tracking-[-0.04em] text-white/80 sm:mt-5 sm:text-[15px]">
              Partagez votre brief ou recevez notre plaquette 2026 — nous revenons vers vous rapidement
              avec une proposition adaptée.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <button
                type="button"
                onClick={() => openModal()}
                className={`${homeHeroSolidButtonClass} border border-white bg-white text-[#0c1d22] hover:bg-[#ec6435] hover:text-white`}
              >
                Parlons de votre projet
              </button>
              <Link
                href={EXEMPLES_SEMINAIRE_ENTREPRISE_PATH}
                className={homeOnDarkOutlineButtonClass}
              >
                Voir les exemples
              </Link>
            </div>

            <div className="mx-auto mt-10 max-w-md border-t border-white/15 pt-8">
              {plaquetteSuccess ? (
                <p className="font-sans text-[13px] font-semibold tracking-[-0.03em] text-white">
                  Plaquette envoyée sous 24h — merci !
                </p>
              ) : (
                <form onSubmit={handlePlaquetteSubmit}>
                  <p className="mb-3 font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-white/70">
                    Recevoir la plaquette
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                      type="email"
                      required
                      placeholder="votre@email.fr"
                      value={plaquetteEmail}
                      onChange={(e) => {
                        setPlaquetteEmail(e.target.value);
                        setPlaquetteEmailError('');
                      }}
                      className="flex-1 rounded-full bg-white/10 px-5 py-3 text-[13px] text-white outline-none placeholder:text-white/40 focus:bg-white/15"
                      style={{ border: `1px solid ${plaquetteEmailError ? HOME_COLORS.orange : 'rgba(255,255,255,0.2)'}` }}
                    />
                    <button
                      type="submit"
                      disabled={plaquetteSubmitting}
                      className="rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90 disabled:opacity-60 sm:px-6 sm:py-3 sm:text-[11px]"
                      style={{ background: HOME_COLORS.orange }}
                    >
                      {plaquetteSubmitting ? '…' : 'Recevoir'}
                    </button>
                  </div>
                  {plaquetteEmailError ? (
                    <p className="mt-2 text-left text-[11px]" style={{ color: HOME_COLORS.orange }}>
                      {plaquetteEmailError}
                    </p>
                  ) : null}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <FaqExcerpt excerpt="seminaires" limit={8} />
    </div>
  );
};

export default Seminaires;
