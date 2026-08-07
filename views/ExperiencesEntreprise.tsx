'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useModal } from '../context/ModalContext';
import {
  HOME_COLORS,
  HOME_RADIUS,
  homeParagraphClass,
  homeSectionPadding,
  bottomImageGradientClass,
} from '../components/home/homeStyles';
import {
  EXPERIENCES_ENTREPRISE,
  EXPERIENCES_ENTREPRISE_ASSETS,
  EXPERIENCES_ENTREPRISE_FAQ,
  type ExperienceCategory,
  type ExperienceExample,
  type ExperienceEntrepriseSlug,
} from '../lib/experiencesEntreprise';

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
    <div className="flex flex-col">
      {EXPERIENCES_ENTREPRISE_FAQ.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.q}
            className="border-b"
            style={{ borderColor: 'rgba(12,29,34,0.12)' }}
          >
            <button
              type="button"
              className="flex w-full items-start gap-4 py-4 text-left sm:py-5"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span
                className="mt-2 h-px w-6 shrink-0 sm:w-8"
                style={{ background: HOME_COLORS.primary }}
                aria-hidden
              />
              <span className="flex-1 font-sans text-[15px] font-medium leading-snug tracking-[-0.04em] text-[#0c1d22] sm:text-[16px]">
                {item.q}
              </span>
              <span
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-300"
                style={{
                  border: `1.5px solid ${HOME_COLORS.primary}`,
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                }}
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke={HOME_COLORS.primary} strokeWidth="2">
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
                <p className={`${homeParagraphClass} pb-4 pl-10 pr-2 sm:pl-12`}>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** Panneau titre / explication — fixe, non swipable. */
const IntroPanel: React.FC<{
  intro: ExperienceExample;
  number: number;
  accent?: string;
}> = ({ intro, number, accent = HOME_COLORS.orange }) => (
  <aside
    className="relative flex h-full min-h-[280px] flex-col justify-start px-6 py-7 sm:min-h-[320px] sm:px-7 sm:py-8 lg:min-h-[360px] lg:px-8 lg:py-9"
    style={{ background: accent, borderRadius: HOME_RADIUS }}
  >
    <span
      className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-white font-sans text-[17px] font-bold sm:mb-6 sm:h-12 sm:w-12 sm:text-[18px]"
      style={{ color: accent }}
      aria-hidden
    >
      {number}
    </span>
    <h3 className="font-sans text-[22px] font-bold leading-[1.15] tracking-[-0.05em] text-white sm:text-[26px] lg:text-[28px]">
      {intro.title}
    </h3>
    <p className="mt-3 font-sans text-[14px] font-semibold leading-snug tracking-[-0.03em] text-white/95 sm:text-[15px]">
      {intro.teaser}
    </p>
    <p className="mt-4 font-sans text-[13px] font-normal leading-[1.65] tracking-[-0.03em] text-white/85 sm:text-[14px]">
      {intro.description}
    </p>
  </aside>
);

/** Carte d’exemple swipable : image + texte. */
const SlideCard: React.FC<{
  example: ExperienceExample;
  accent?: string;
}> = ({ example, accent = HOME_COLORS.orange }) => (
  <article
    className="relative flex h-full min-h-[280px] w-full flex-col overflow-hidden sm:min-h-[320px] lg:min-h-[360px] lg:flex-row"
    style={{ borderRadius: HOME_RADIUS }}
  >
    <div className="relative min-h-[160px] w-full shrink-0 sm:min-h-[200px] lg:min-h-0 lg:w-[38%]">
      <img
        src={example.image}
        alt={example.imageAlt}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
    </div>
    <div
      className="relative flex min-w-0 flex-1 flex-col justify-center px-6 py-7 sm:px-8 sm:py-8 lg:px-9 lg:py-9"
      style={{ background: accent }}
    >
      <h3 className="font-sans text-[20px] font-bold leading-[1.15] tracking-[-0.05em] text-white sm:text-[24px] lg:text-[26px]">
        {example.title}
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

/**
 * Ligne catégorie : titre/explication bloqués d’un côté,
 * contenu swipable de l’autre (imageLeft = intro à gauche).
 */
const CategoryBar: React.FC<{ category: ExperienceCategory }> = ({ category }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrollingRef = useRef(false);
  const introLeft = category.imageLeft;
  const accent = category.slug === '2' ? HOME_COLORS.primary : HOME_COLORS.orange;

  const goTo = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const track = trackRef.current;
    if (!track) return;
    const len = category.examples.length;
    const clamped = ((index % len) + len) % len;
    const slide = track.children[clamped] as HTMLElement | undefined;
    if (!slide) return;
    isScrollingRef.current = true;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior });
    setActiveIndex(clamped);
    window.setTimeout(() => {
      isScrollingRef.current = false;
    }, behavior === 'smooth' ? 450 : 50);
  }, [category.examples.length]);

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
        if (best !== activeIndex) setActiveIndex(best);
      });
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener('scroll', onScroll);
    };
  }, [activeIndex]);

  const dots = (
    <div className="flex items-center justify-center gap-2">
      {category.examples.map((example, i) => (
        <button
          key={example.id}
          type="button"
          aria-label={`Exemple ${i + 1} — ${category.sectionTitle}`}
          onClick={() => goTo(i)}
          className="h-2 rounded-full transition-all duration-300"
          style={{
            width: i === activeIndex ? 28 : 8,
            background: i === activeIndex ? accent : 'rgba(12,29,34,0.18)',
          }}
        />
      ))}
    </div>
  );

  const introCol = (
    <div className="h-full min-w-0">
      <IntroPanel intro={category.intro} number={category.number} accent={accent} />
    </div>
  );

  const swipeCol = (
    <div className="relative h-full min-w-0">
      <div
        ref={trackRef}
        className="flex h-full snap-x snap-mandatory gap-3 overflow-x-auto sm:gap-4"
        style={{
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {category.examples.map((example) => (
          <div key={example.id} className="h-full w-full shrink-0 snap-center">
            <SlideCard example={example} accent={accent} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div id={`categorie-${category.slug}`} className="scroll-mt-28 px-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[92rem]">
        {category.slidesHeading ? (
          <p className="mb-5 font-sans text-[15px] font-semibold tracking-[-0.04em] text-[#0c1d22] sm:mb-6 sm:text-[16px]">
            {category.slidesHeading}
          </p>
        ) : null}

        {/*
          Grille 2 colonnes : intro + slides à hauteur égale.
          Les dots sont sur la 2e ligne, sous le carrousel uniquement.
        */}
        <div
          className={`grid grid-cols-1 gap-4 lg:gap-x-5 lg:gap-y-4 ${
            introLeft
              ? 'lg:grid-cols-[minmax(300px,38%)_minmax(0,1fr)]'
              : 'lg:grid-cols-[minmax(0,1fr)_minmax(300px,38%)]'
          }`}
        >
          {introLeft ? (
            <>
              <div className="h-full min-h-0">{introCol}</div>
              <div className="h-full min-h-0">{swipeCol}</div>
              <div className="hidden lg:block" aria-hidden />
              <div>{dots}</div>
            </>
          ) : (
            <>
              <div className="h-full min-h-0">{swipeCol}</div>
              <div className="h-full min-h-0">{introCol}</div>
              <div>{dots}</div>
              <div className="hidden lg:block" aria-hidden />
            </>
          )}
        </div>

        <div className="mt-6 flex justify-center sm:mt-7">
          <Link
            href={category.ctaHref}
            className={
              category.slug === '2'
                ? 'inline-flex items-center justify-center gap-2 rounded-full border border-[#0c1d22] px-8 py-2.5 text-[12px] font-bold uppercase tracking-[0.07em] text-[#0c1d22] transition-colors hover:bg-[#0c1d22] hover:text-white sm:px-10'
                : 'inline-flex items-center justify-center gap-2 rounded-full border border-[#ec6435] px-8 py-2.5 text-[12px] font-bold uppercase tracking-[0.07em] text-[#ec6435] transition-colors hover:bg-[#ec6435] hover:text-white sm:px-10'
            }
          >
            <span aria-hidden>→</span>
            {category.ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  );
};

type Props = {
  slug?: ExperienceEntrepriseSlug;
};

const ExperiencesEntreprise: React.FC<Props> = ({ slug }) => {
  const { openModal } = useModal();

  useEffect(() => {
    if (!slug) return;
    const el = document.getElementById(`categorie-${slug}`);
    if (!el) return;
    const t = window.setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
    return () => window.clearTimeout(t);
  }, [slug]);

  const scrollToExperiences = () => {
    document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="overflow-x-hidden bg-white font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* ── HERO ── */}
      <section className="relative w-full bg-white pt-[calc(7.5rem+env(safe-area-inset-top))] sm:pt-[calc(9rem+env(safe-area-inset-top))] lg:pt-[calc(10.5rem+env(safe-area-inset-top))]">
        <div className="mx-auto max-w-6xl px-5 pb-2 sm:px-8">
          <div
            className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[2.2/1]"
            style={{ borderRadius: HOME_RADIUS }}
          >
            <img
              src={EXPERIENCES_ENTREPRISE_ASSETS.hero}
              alt="Travail du pain et de la pâte – expériences TerraGo"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className={`${bottomImageGradientClass} z-[1]`} />
            <div
              className="absolute inset-0 z-[2]"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.55) 100%)',
              }}
            />

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 py-10 text-center sm:px-10 sm:py-14">
              <h1 className="max-w-3xl font-sans text-[clamp(1.85rem,4.8vw,3.4rem)] font-normal leading-[1.05] tracking-[-0.075em] text-white">
                Des expériences <span className="font-bold">authentiques,</span>
                <br />
                qui ont <span className="font-bold">du sens.</span>
              </h1>
              <p className={`${homeParagraphClass} mt-4 max-w-xl text-[15px] leading-relaxed text-white/90 sm:mt-6 sm:text-[16px]`}>
                Team building, séminaires RSE et événements d&apos;entreprise chez des producteurs engagés, partout en France.
              </p>
              <div className="mt-7 flex flex-col items-center gap-3 sm:mt-9 sm:flex-row sm:gap-4">
                <button
                  type="button"
                  onClick={scrollToExperiences}
                  className="inline-flex min-w-[240px] items-center justify-center rounded-full border-2 border-[#ec6435] px-7 py-2.5 text-[12px] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#ec6435]/15"
                >
                  Découvrir nos expériences
                </button>
                <Link
                  href="/nous-rejoindre"
                  className="inline-flex min-w-[240px] items-center justify-center rounded-full px-7 py-2.5 text-[12px] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:brightness-110"
                  style={{ background: HOME_COLORS.orange }}
                >
                  Je propose mon expérience
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section style={{ paddingTop: homeSectionPadding, paddingBottom: 'clamp(2.5rem, 5vw, 4rem)', background: '#ffffff' }}>
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
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
              <h3 className="mt-2 font-sans text-[20px] font-bold uppercase leading-[1.15] tracking-[-0.05em] text-[#0c1d22] sm:text-[22px]">
                {category.detailTitle}
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
          paddingTop: 'clamp(2rem, 4vw, 3rem)',
          paddingBottom: 'clamp(2rem, 4vw, 3rem)',
          background: '#f4f4f4',
        }}
      >
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <img
            src={EXPERIENCES_ENTREPRISE_ASSETS.feu}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -left-1 -top-4 z-20 h-16 w-16 object-contain sm:-left-2 sm:-top-6 sm:h-24 sm:w-24 lg:h-28 lg:w-28"
          />
          <img
            src={EXPERIENCES_ENTREPRISE_ASSETS.piment}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-4 -right-1 z-20 h-16 w-16 object-contain sm:-bottom-6 sm:-right-2 sm:h-24 sm:w-24 lg:h-28 lg:w-28"
          />

          <div
            className="relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-14 lg:py-16"
            style={{ background: HOME_COLORS.primary, borderRadius: HOME_RADIUS }}
          >
            <h2 className="mx-auto max-w-2xl font-sans text-[28px] font-bold leading-[1.1] tracking-[-0.07em] text-white sm:text-[36px] lg:text-[42px]">
              Des événements qui vous ressemblent.
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-sans text-[14px] font-normal leading-[1.7] tracking-[-0.04em] text-white/80 sm:mt-5 sm:text-[15px]">
              Brief, lieu, activités, restauration : nous construisons avec vous une expérience unique,
              fidèle à votre culture d&apos;entreprise et ancrée dans le vivant.
            </p>
            <button
              type="button"
              onClick={openModal}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-2.5 text-[12px] font-bold uppercase tracking-[0.07em] text-[#0c1d22] transition-colors hover:bg-[#ec6435] hover:text-white sm:mt-10"
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
        <img
          src={EXPERIENCES_ENTREPRISE_ASSETS.etoile}
          alt=""
          aria-hidden
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
