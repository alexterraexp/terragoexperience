'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import {
  HOME_COLORS,
  HOME_RADIUS,
  homeFramedHeroAspectClass,
  homeFramedHeroH1Class,
  homeFramedHeroOverlayClass,
  homeFramedHeroOverlayInnerClass,
  homeFramedHeroSubtitleClass,
  homeParagraphClass,
  faqAnswerClass,
  homeSectionPadding,
  bottomImageGradientClass,
  homeCtaOutlineClass,
  homeHeroOutlineButtonClass,
  homeHeroSolidButtonClass,
} from '../components/home/homeStyles';
import FramedHeroImage from '../components/FramedHeroImage';
import PhotoCopyright from '../components/PhotoCopyright';
import {
  EXPERIENCES_ENTREPRISE,
  EXPERIENCES_ENTREPRISE_ASSETS,
  EXPERIENCES_ENTREPRISE_FAQ,
  parseTitleEmphasis,
  stripTitleEmphasis,
  type ExperienceCategory,
  type ExperienceExample,
} from '../lib/experiencesEntreprise';
import { getImageCopyright } from '../lib/imageCopyrights';
/** Titre avec gras uniquement sur les segments `**…**`. */
const EmphasizedTitle: React.FC<{ title: string }> = ({ title }) => (
  <>
    {parseTitleEmphasis(title).map((part, i) =>
      part.bold ? (
        <span key={i} className="font-bold">
          {part.text}
        </span>
      ) : (
        <span key={i} className="font-normal">
          {part.text}
        </span>
      ),
    )}
  </>
);

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

const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-1">
      {EXPERIENCES_ENTREPRISE_FAQ.map((item, i) => {
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
                <p className={`${faqAnswerClass} pb-4 pr-8`}>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** Panneau titre / explication — fixe desktop ; 1er slide mobile. */
const IntroPanel: React.FC<{
  intro: ExperienceExample;
  number: number;
  accent?: string;
  showSwipeHint?: boolean;
}> = ({ intro, number, accent = HOME_COLORS.orange, showSwipeHint = false }) => (
  <aside
    className="relative flex h-full min-h-[320px] flex-col px-6 py-7 sm:min-h-[340px] sm:px-7 sm:py-8 lg:min-h-[360px] lg:px-8 lg:py-9"
    style={{ background: accent, borderRadius: HOME_RADIUS }}
  >
    <span
      className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-white font-sans text-[17px] font-bold sm:mb-6 sm:h-12 sm:w-12 sm:text-[18px]"
      style={{ color: accent }}
      aria-hidden
    >
      {number}
    </span>
    <h3 className="font-sans text-[22px] font-normal leading-[1.15] tracking-[-0.05em] text-white sm:text-[26px] lg:text-[28px]">
      <EmphasizedTitle title={intro.title} />
    </h3>
    <p className="mt-3 font-sans text-[14px] font-semibold leading-snug tracking-[-0.03em] text-white/95 sm:text-[15px]">
      {intro.teaser}
    </p>
    <p className="mt-4 font-sans text-[13px] font-normal leading-[1.65] tracking-[-0.03em] text-white/85 sm:text-[14px]">
      {intro.description}
    </p>
    {showSwipeHint ? (
      <div className="mt-auto pt-8">
        <div className="inline-flex max-w-full items-center gap-2.5 rounded-2xl bg-white/15 px-3.5 py-2.5 backdrop-blur-[2px]">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white font-sans text-[13px] font-bold"
            style={{ color: accent }}
            aria-hidden
          >
            →
          </span>
          <span className="font-sans text-[11px] font-semibold leading-snug tracking-[-0.02em] text-white whitespace-nowrap">
            Swipez pour découvrir le détail
          </span>
        </div>
      </div>
    ) : null}
  </aside>
);

/** Carte d’exemple swipable : image plein cadre + dégradé (mobile), split (desktop). */
const SlideCard: React.FC<{
  example: ExperienceExample;
  accent?: string;
  imageWide?: boolean;
}> = ({ example, accent = HOME_COLORS.orange, imageWide = false }) => (
  <article
    className="relative h-full min-h-[320px] w-full overflow-hidden sm:min-h-[340px] lg:flex lg:min-h-[360px] lg:flex-row"
    style={{ borderRadius: HOME_RADIUS }}
  >
    {/* Image : plein cadre mobile, colonne gauche desktop */}
    <div
      className={`absolute inset-0 lg:relative lg:h-full lg:min-h-0 lg:shrink-0 ${
        imageWide ? 'lg:w-[48%]' : 'lg:w-[38%]'
      }`}
    >
      <Image
        src={example.image}
        alt={example.imageAlt}
        fill
        sizes={imageWide ? '(max-width: 1024px) 100vw, 48vw' : '(max-width: 1024px) 100vw, 38vw'}
        className="object-cover"
        draggable={false}
      />
      {getImageCopyright(example.image) ? (
        <PhotoCopyright label={getImageCopyright(example.image)!} />
      ) : null}
    </div>

    {/* Dégradé accent — mobile uniquement */}
    <div
      className="pointer-events-none absolute inset-0 lg:hidden"
      style={{
        background: `linear-gradient(to top, ${accent} 0%, ${accent}f2 28%, ${accent}b8 52%, ${accent}40 72%, transparent 100%)`,
      }}
      aria-hidden
    />

    {/* Texte : bas du carré mobile ; panneau uni desktop */}
    <div
      className={`relative z-10 flex h-full min-w-0 flex-col justify-end bg-transparent px-6 py-7 lg:h-full lg:flex-1 lg:justify-center ${
        imageWide ? 'lg:px-5 lg:py-7' : 'lg:px-9 lg:py-9'
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
        style={{ background: accent }}
        aria-hidden
      />
      <h3 className="font-sans text-[20px] font-normal leading-[1.15] tracking-[-0.05em] text-white sm:text-[24px] lg:text-[26px]">
        <EmphasizedTitle title={example.title} />
      </h3>
      <p className="mt-3 font-sans text-[14px] font-semibold leading-snug tracking-[-0.03em] text-white/95 sm:text-[15px]">
        {example.teaser}
      </p>
      <p className="mt-4 max-w-md font-sans text-[13px] font-normal leading-[1.65] tracking-[-0.03em] text-white/85 sm:text-[14px]">
        {example.description}
      </p>
    </div>
  </article>
);

/** Hook swipe horizontal (snap + pilules). */
function useSwipeCarousel(length: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrollingRef = useRef(false);

  const goTo = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const track = trackRef.current;
    if (!track || length < 1) return;
    const clamped = ((index % length) + length) % length;
    const slide = track.children[clamped] as HTMLElement | undefined;
    if (!slide) return;
    isScrollingRef.current = true;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior });
    setActiveIndex(clamped);
    window.setTimeout(() => {
      isScrollingRef.current = false;
    }, behavior === 'smooth' ? 450 : 50);
  }, [length]);

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
        setActiveIndex((prev) => (best !== prev ? best : prev));
      });
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener('scroll', onScroll);
    };
  }, []);

  return { trackRef, activeIndex, goTo };
}

const PillDots: React.FC<{
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  accent: string;
  label: string;
}> = ({ count, activeIndex, onSelect, accent, label }) => (
  <div className="flex items-center justify-center gap-2">
    {Array.from({ length: count }, (_, i) => (
      <button
        key={i}
        type="button"
        aria-label={`${label} ${i + 1}`}
        onClick={() => onSelect(i)}
        className="h-2 rounded-full transition-all duration-300"
        style={{
          width: i === activeIndex ? 28 : 8,
          background: i === activeIndex ? accent : 'rgba(12,29,34,0.18)',
        }}
      />
    ))}
  </div>
);

/**
 * Mobile : un seul carrousel (titre → détails au swipe).
 * Desktop : intro fixe + carrousel d’exemples (imageLeft = intro à gauche).
 */
const CategoryBar: React.FC<{ category: ExperienceCategory }> = ({ category }) => {
  const { openModal } = useModal();
  const introLeft = category.imageLeft;
  const isOrangeSection1 = category.slug === '1';
  const accent = category.slug === '2' ? HOME_COLORS.primary : HOME_COLORS.orange;
  /** Sur mobile les pilules restent orange ; le panneau 2 garde son accent sombre. */
  const pillAccent = HOME_COLORS.orange;
  const mobileLen = 1 + category.examples.length;
  const mobile = useSwipeCarousel(mobileLen);
  const desktop = useSwipeCarousel(category.examples.length);
  const sectionLabel = stripTitleEmphasis(category.sectionTitle);

  return (
    <div id={`categorie-${category.slug}`} className="scroll-mt-28 px-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[92rem]">
        {category.slidesHeading ? (
          <p className="mb-5 font-sans text-[15px] font-semibold tracking-[-0.04em] text-[#0c1d22] sm:mb-6 sm:text-[16px]">
            {category.slidesHeading}
          </p>
        ) : null}

        {/* Mobile : titre d’abord, puis swipe vers les détails — même hauteur via stretch */}
        <div className="lg:hidden">
          <div
            ref={mobile.trackRef}
            className="flex items-stretch snap-x snap-mandatory gap-3 overflow-x-auto"
            style={{
              WebkitOverflowScrolling: 'touch',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            <div className="flex w-full shrink-0 snap-center flex-col">
              <IntroPanel
                intro={category.intro}
                number={category.number}
                accent={accent}
                showSwipeHint
              />
            </div>
            {category.examples.map((example) => (
              <div key={example.id} className="flex w-full shrink-0 snap-center flex-col">
                <SlideCard example={example} accent={accent} imageWide={isOrangeSection1} />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <PillDots
              count={mobileLen}
              activeIndex={mobile.activeIndex}
              onSelect={mobile.goTo}
              accent={pillAccent}
              label={`${sectionLabel} — slide`}
            />
          </div>
        </div>

        {/* Desktop : intro fixe + carrousel d’exemples */}
        <div
          className={`hidden gap-y-4 lg:grid ${
            isOrangeSection1 ? 'gap-x-2.5' : 'gap-x-5'
          } ${
            introLeft
              ? isOrangeSection1
                ? 'lg:grid-cols-[minmax(280px,34%)_minmax(0,1fr)]'
                : 'lg:grid-cols-[minmax(300px,38%)_minmax(0,1fr)]'
              : 'lg:grid-cols-[minmax(0,1fr)_minmax(300px,38%)]'
          }`}
        >
          {introLeft ? (
            <>
              <div className="h-full min-h-0">
                <IntroPanel intro={category.intro} number={category.number} accent={accent} />
              </div>
              <div className="relative h-full min-w-0">
                <div
                  ref={desktop.trackRef}
                  className="flex h-full snap-x snap-mandatory gap-4 overflow-x-auto"
                  style={{
                    WebkitOverflowScrolling: 'touch',
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                  }}
                >
                  {category.examples.map((example) => (
                    <div key={example.id} className="h-full w-full shrink-0 snap-center">
                      <SlideCard example={example} accent={accent} imageWide={isOrangeSection1} />
                    </div>
                  ))}
                </div>
              </div>
              <div aria-hidden />
              <PillDots
                count={category.examples.length}
                activeIndex={desktop.activeIndex}
                onSelect={desktop.goTo}
                accent={accent}
                label={`Exemple — ${sectionLabel}`}
              />
            </>
          ) : (
            <>
              <div className="relative h-full min-w-0">
                <div
                  ref={desktop.trackRef}
                  className="flex h-full snap-x snap-mandatory gap-4 overflow-x-auto"
                  style={{
                    WebkitOverflowScrolling: 'touch',
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                  }}
                >
                  {category.examples.map((example) => (
                    <div key={example.id} className="h-full w-full shrink-0 snap-center">
                      <SlideCard example={example} accent={accent} imageWide={isOrangeSection1} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-full min-h-0">
                <IntroPanel intro={category.intro} number={category.number} accent={accent} />
              </div>
              <PillDots
                count={category.examples.length}
                activeIndex={desktop.activeIndex}
                onSelect={desktop.goTo}
                accent={accent}
                label={`Exemple — ${sectionLabel}`}
              />
              <div aria-hidden />
            </>
          )}
        </div>

        <div className="mt-6 flex justify-center sm:mt-7">
          <button
            type="button"
            onClick={openModal}
            className={
              category.slug === '2'
                ? homeCtaOutlineClass
                : 'inline-flex items-center justify-center gap-2 rounded-full border border-[#ec6435] bg-transparent px-6 py-2 text-[12px] font-bold tracking-[-0.02em] text-[#ec6435] transition-colors hover:bg-[#ec6435] hover:text-white sm:px-10 sm:py-2.5 sm:text-[13px]'
            }
          >
            <span aria-hidden>→</span>
            {category.ctaLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

const ExperiencesEntreprise: React.FC = () => {
  const { openModal } = useModal();

  const scrollToExperiences = () => {
    document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="overflow-x-hidden bg-white font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* ── HERO ── */}
      <section className="relative w-full bg-white pt-[calc(7.5rem+env(safe-area-inset-top))] sm:pt-[calc(9rem+env(safe-area-inset-top))] lg:pt-[calc(10.5rem+env(safe-area-inset-top))]">
        <div className="mx-auto max-w-6xl px-5 pb-2 sm:px-8">
          <div
            className={`relative ${homeFramedHeroAspectClass}`}
            style={{ borderRadius: HOME_RADIUS }}
          >
            <FramedHeroImage
              src={EXPERIENCES_ENTREPRISE_ASSETS.hero}
              alt="Producteur dans son champ – expériences TerraGo"
            />
            <div className={`${bottomImageGradientClass} z-[1]`} />
            <div
              className="absolute inset-0 z-[2]"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.55) 100%)',
              }}
            />

            <div className={homeFramedHeroOverlayClass}>
              <div className={homeFramedHeroOverlayInnerClass}>
              <h1 className={`max-w-3xl font-bold ${homeFramedHeroH1Class}`}>
                Nos expériences
              </h1>
              <p className={homeFramedHeroSubtitleClass}>
                Team building, séminaires RSE et événements d&apos;entreprise chez des producteurs engagés, partout en France.
              </p>
              <div className="mt-7 flex flex-col items-center gap-3 sm:mt-9 sm:flex-row sm:gap-4">
                <button
                  type="button"
                  onClick={scrollToExperiences}
                  className={`${homeHeroOutlineButtonClass} border-[#ec6435] hover:border-[#ec6435]`}
                  style={{ background: 'rgba(12, 29, 34, 0.12)' }}
                >
                  Découvrir nos expériences
                </button>
                <Link
                  href="/seminaires-entreprise"
                  className={`${homeHeroSolidButtonClass} bg-[#ec6435] text-white hover:brightness-110`}
                >
                  Nos séminaires d&apos;entreprise
                </Link>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section
        className="relative"
        style={{ paddingTop: homeSectionPadding, paddingBottom: 'clamp(2.5rem, 5vw, 4rem)', background: '#ffffff' }}
      >
        <Image
          src={EXPERIENCES_ENTREPRISE_ASSETS.etoile}
          alt=""
          aria-hidden
          width={340}
          height={340}
          className="pointer-events-none absolute left-0 z-0 hidden h-[280px] w-[280px] -translate-x-[46%] -translate-y-[40%] object-contain lg:block xl:h-[340px] xl:w-[340px]"
          style={{ top: 0 }}
        />

        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-8">
          <ScrollAnimate>
            <h2 className="font-sans text-[28px] font-normal leading-[1.1] tracking-[-0.075em] text-[#0c1d22] sm:text-[36px] lg:text-[42px]">
              Des moments d&apos;entreprise
              <br />
              <span className="font-bold">avec une histoire à raconter.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl font-sans text-[15px] font-normal leading-[1.7] tracking-[-0.04em] text-[#0c1d22]/65 sm:mt-7 sm:text-[16px]">
              Séminaire, team building, convention ou journée RSE : TerraGo imagine des expériences immersives
              qui fédèrent vos équipes et soutiennent les producteurs du territoire.
            </p>
          </ScrollAnimate>
        </div>
      </section>

      {/* ── 3 CATÉGORIES : intro fixe + carrousel d’exemples ── */}
      <section id="experiences" className="bg-white" style={{ paddingBottom: homeSectionPadding }}>
        <div className="mx-auto flex max-w-[92rem] flex-col gap-14 sm:gap-16 lg:gap-20">
          {EXPERIENCES_ENTREPRISE.map((category) => (
            <CategoryBar key={category.slug} category={category} />
          ))}
        </div>
      </section>

      {/* ── TEXTES DÉTAILLÉS DES 3 CATÉGORIES ── */}
      <section style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)', paddingBottom: homeSectionPadding, background: '#ffffff' }}>
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-3 lg:gap-10">
          {EXPERIENCES_ENTREPRISE.map((category) => (
            <ScrollAnimate key={category.slug}>
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#ec6435]">
                {category.number.toString().padStart(2, '0')}
              </p>
              <h3 className="mt-2 font-sans text-[20px] font-normal uppercase leading-[1.15] tracking-[-0.05em] text-[#0c1d22] sm:text-[22px]">
                <EmphasizedTitle title={category.detailTitle} />
              </h3>
              <p className="mt-3 font-sans text-[14px] font-semibold leading-snug tracking-[-0.03em] text-[#0c1d22]">
                {category.detailLead}
              </p>
              <div className="mt-3 space-y-3">
                {category.detailBody.map((p) => (
                  <p
                    key={p}
                    className="font-sans text-[14px] font-normal leading-[1.7] tracking-[-0.04em] text-[#0c1d22]/65"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </ScrollAnimate>
          ))}
        </div>
      </section>

      {/* ── CTA BANNIÈRE ── */}
      <section
        style={{
          paddingTop: homeSectionPadding,
          paddingBottom: 'clamp(2rem, 4vw, 3rem)',
          background: '#f4f4f4',
        }}
      >
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <Image
            src={EXPERIENCES_ENTREPRISE_ASSETS.feu}
            alt=""
            aria-hidden
            width={208}
            height={208}
            className="pointer-events-none absolute -left-4 -top-10 z-20 h-28 w-28 object-contain sm:-left-8 sm:-top-14 sm:h-40 sm:w-40 lg:-left-12 lg:-top-16 lg:h-52 lg:w-52"
          />
          <Image
            src={EXPERIENCES_ENTREPRISE_ASSETS.piment}
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
            <h2 className="mx-auto max-w-2xl font-sans text-[28px] font-normal leading-[1.1] tracking-[-0.07em] text-white sm:text-[36px] lg:text-[42px]">
              Des événements qui <span className="font-bold">vous ressemblent.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-sans text-[14px] font-normal leading-[1.7] tracking-[-0.04em] text-white/80 sm:mt-5 sm:text-[15px]">
              Brief, lieu, activités, restauration : nous construisons avec vous une expérience unique,
              fidèle à votre culture d&apos;entreprise et ancrée dans le vivant.
            </p>
            <button
              type="button"
              onClick={openModal}
              className={`mt-8 ${homeHeroSolidButtonClass} bg-white text-[#0c1d22] hover:bg-[#ec6435] hover:text-white sm:mt-10`}
            >
              Parlons de votre projet
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        className="relative"
        style={{ paddingTop: homeSectionPadding, paddingBottom: homeSectionPadding, background: '#f4f4f4' }}
      >
        <Image
          src={EXPERIENCES_ENTREPRISE_ASSETS.etoile}
          alt=""
          aria-hidden
          width={340}
          height={340}
          className="pointer-events-none absolute left-0 z-0 hidden h-[280px] w-[280px] -translate-x-[46%] -translate-y-[10%] object-contain lg:block xl:h-[340px] xl:w-[340px]"
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
              <p className={`${homeParagraphClass} mt-4 max-w-sm`}>
                Une question sur nos expériences entreprise ? Parcourez la FAQ ou contactez-nous directement.
              </p>
            </div>
            <FaqAccordion />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExperiencesEntreprise;
