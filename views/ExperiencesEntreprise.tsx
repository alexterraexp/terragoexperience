'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
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
  parseTitleEmphasis,
  stripTitleEmphasis,
  type ExperienceCategory,
  type ExperienceExample,
  type ExperienceEntrepriseSlug,
} from '../lib/experiencesEntreprise';

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
    <h3 className="font-sans text-[22px] font-normal leading-[1.15] tracking-[-0.05em] text-white sm:text-[26px] lg:text-[28px]">
      <EmphasizedTitle title={intro.title} />
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

/**
 * Ligne catégorie : titre/explication bloqués d’un côté,
 * contenu swipable de l’autre (imageLeft = intro à gauche).
 */
const CategoryBar: React.FC<{ category: ExperienceCategory }> = ({ category }) => {
  const { openModal } = useModal();
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
          aria-label={`Exemple ${i + 1} — ${stripTitleEmphasis(category.sectionTitle)}`}
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
          <button
            type="button"
            onClick={openModal}
            className={
              category.slug === '2'
                ? 'inline-flex items-center justify-center gap-2 rounded-full border border-[#0c1d22] px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.07em] text-[#0c1d22] transition-colors hover:bg-[#0c1d22] hover:text-white sm:px-10 sm:py-2.5 sm:text-[12px]'
                : 'inline-flex items-center justify-center gap-2 rounded-full border border-[#ec6435] px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.07em] text-[#ec6435] transition-colors hover:bg-[#ec6435] hover:text-white sm:px-10 sm:py-2.5 sm:text-[12px]'
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

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 pt-12 text-center sm:px-10 sm:pt-16 lg:pt-20">
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
                  className="inline-flex min-w-[180px] items-center justify-center rounded-full border-2 border-[#ec6435] px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#ec6435]/15 sm:min-w-[240px] sm:px-7 sm:py-2.5 sm:text-[12px]"
                >
                  Découvrir nos expériences
                </button>
                <Link
                  href="/seminaires-entreprise"
                  className="inline-flex min-w-[180px] items-center justify-center rounded-full px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:brightness-110 sm:min-w-[240px] sm:px-7 sm:py-2.5 sm:text-[12px]"
                  style={{ background: HOME_COLORS.orange }}
                >
                  Nos séminaires d&apos;entreprise
                </Link>
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
        <img
          src={EXPERIENCES_ENTREPRISE_ASSETS.etoile}
          alt=""
          aria-hidden
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
            className="pointer-events-none absolute -left-4 -top-10 z-20 h-28 w-28 object-contain sm:-left-8 sm:-top-14 sm:h-40 sm:w-40 lg:-left-12 lg:-top-16 lg:h-52 lg:w-52"
          />
          <img
            src={EXPERIENCES_ENTREPRISE_ASSETS.piment}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -right-4 z-20 h-28 w-28 object-contain sm:-bottom-14 sm:-right-8 sm:h-40 sm:w-40 lg:-bottom-16 lg:-right-12 lg:h-52 lg:w-52"
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
              className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.07em] text-[#0c1d22] transition-colors hover:bg-[#ec6435] hover:text-white sm:mt-10 sm:px-8 sm:py-2.5 sm:text-[12px]"
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
