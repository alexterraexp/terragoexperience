'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useModal } from '../context/ModalContext';
import {
  HOME_COLORS,
  HOME_RADIUS,
  homeParagraphClass,
  homeSectionPadding,
} from '../components/home/homeStyles';
import PhotoCopyright from '../components/PhotoCopyright';
import { REGION_TAGS, regionDestinationPath } from '../lib/homeStorage';
import { DESTINATIONS } from '../lib/destinations';
import { LIEUX, lieuDestinationPath } from '../lib/lieux';
import { VILLES_SEMINAIRE, villeSeminairePath } from '../lib/villesSeminaire';
import { protectedImageProps } from '../lib/protectedImage';
import { getImageCopyright } from '../lib/imageCopyrights';

const sectionTitleClass =
  'font-sans text-[34px] font-normal leading-[1.08] tracking-[-0.075em] text-[#0c1d22] sm:text-[40px] lg:text-[48px]';

const CategoryHeading: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`flex items-center gap-4 sm:gap-5 ${className}`}>
    <h2 className="shrink-0 font-sans text-[17px] font-normal leading-[1.2] tracking-[-0.04em] text-[#0c1d22] sm:text-[19px] lg:text-[21px]">
      {children}
    </h2>
    <div
      className="h-px min-w-0 flex-1"
      style={{ background: 'rgba(12, 29, 34, 0.18)' }}
      aria-hidden
    />
  </div>
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

const Destinations: React.FC = () => {
  const { openModal } = useModal();
  const regionsScrollRef = useRef<HTMLDivElement>(null);
  const lieuxScrollRef = useRef<HTMLDivElement>(null);
  const regionsSwipe = useSwipeTrack(regionsScrollRef, DESTINATIONS.length);
  const lieuxSwipe = useSwipeTrack(lieuxScrollRef, LIEUX.length);

  return (
    <div className="overflow-x-hidden bg-white font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <section className="relative w-full bg-white pt-[calc(8.75rem+env(safe-area-inset-top))] sm:pt-[calc(10rem+env(safe-area-inset-top))] lg:pt-[calc(11rem+env(safe-area-inset-top))]">
        <div className="mx-auto max-w-6xl px-5 pb-10 sm:px-8 sm:pb-12">
          <ScrollAnimate>
            <p
              className="font-sans text-[13px] font-bold tracking-[-0.03em] sm:text-[14px]"
              style={{ color: HOME_COLORS.orange }}
            >
              Destinations TerraGo
            </p>
            <h1 className={`mt-3 max-w-3xl ${sectionTitleClass}`}>
              Nos <span className="font-bold">destinations</span>
            </h1>
            <p className={`mt-4 max-w-2xl ${homeParagraphClass}`}>
              Organisez votre séminaire d&apos;entreprise partout en France, au plus près des
              producteurs et des terroirs. Explorez par région ou par type de lieu : programme type,
              expériences et idées de logement. Vous partez d&apos;une grande ville ? Consultez
              aussi notre section{' '}
              <a
                href="#seminaires-par-ville"
                className="font-semibold text-[#ec6435] underline decoration-[#ec6435]/40 underline-offset-2 hover:text-[#0c1d22]"
              >
                séminaire près des villes
              </a>
              .
            </p>
          </ScrollAnimate>

          <ScrollAnimate delay={60} className="mt-7 flex flex-wrap gap-2 sm:mt-8">
            {REGION_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-4 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-white sm:text-[11px]"
                style={{ background: HOME_COLORS.primary }}
              >
                {tag}
              </span>
            ))}
          </ScrollAnimate>
        </div>
      </section>

      <section
        style={{
          paddingBottom: homeSectionPadding,
          background: '#ffffff',
        }}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ScrollAnimate>
            <CategoryHeading className="mb-3 sm:mb-4">
              En fonction des <span className="font-bold">régions</span>
            </CategoryHeading>
            <p className={`mb-5 max-w-none sm:mb-6 ${homeParagraphClass}`}>
              Du Sud-Ouest à la Provence, de la Bretagne aux Alpes… découvrez les territoires où nous
              imaginons des expériences uniques pour vos équipes.
            </p>
          </ScrollAnimate>

        </div>

        {/* Mobile : carousel swipable (même pattern que Home « partout en France ») */}
        <div
          ref={regionsScrollRef}
          className="flex min-w-0 cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-x pb-1 active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:hidden"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollPaddingInline: '1.25rem',
            paddingLeft: '1.25rem',
            paddingRight: '1.25rem',
          }}
        >
          {DESTINATIONS.map((region, i) => (
            <Link
              key={region.slug}
              href={regionDestinationPath(region.slug)}
              className="group relative aspect-[3/4.4] w-[62vw] shrink-0 snap-center overflow-hidden"
              style={{ borderRadius: HOME_RADIUS }}
            >
              <Image
                src={region.heroImage}
                alt={`Séminaire ${region.prep} ${region.name}`}
                fill
                sizes="70vw"
                priority={i < 2}
                className="pointer-events-none select-none object-cover"
                {...protectedImageProps}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
              {getImageCopyright(region.heroImage) ? (
                <PhotoCopyright
                  className="z-[2]"
                  label={getImageCopyright(region.heroImage)!}
                />
              ) : null}
              <p className="pointer-events-none absolute bottom-5 left-0 right-0 z-[1] px-5 font-sans text-[22px] leading-[1.12] tracking-[-0.05em] text-white">
                <span className="font-normal">Séminaire {region.prep}</span>
                <br />
                <span className="font-bold">{region.name}</span>
              </p>
            </Link>
          ))}
        </div>

        <SwipeDots
          count={DESTINATIONS.length}
          activeIndex={regionsSwipe.activeIndex}
          onSelect={regionsSwipe.goTo}
          label="Région"
          className="mt-5 sm:hidden"
        />

        {/* Desktop / tablet : grille */}
        <div className="mx-auto hidden max-w-6xl px-5 sm:grid sm:grid-cols-2 sm:gap-5 sm:px-8 lg:grid-cols-3">
          {DESTINATIONS.map((region, i) => (
            <ScrollAnimate key={region.slug} delay={Math.min(i * 50, 200)}>
              <Link
                href={regionDestinationPath(region.slug)}
                className="group relative block aspect-[16/10] overflow-hidden"
                style={{ borderRadius: HOME_RADIUS }}
              >
                <Image
                  src={region.heroImage}
                  alt={`Séminaire ${region.prep} ${region.name}`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  priority={i < 3}
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                  {...protectedImageProps}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                {getImageCopyright(region.heroImage) ? (
                  <PhotoCopyright
                    className="z-[2]"
                    label={getImageCopyright(region.heroImage)!}
                  />
                ) : null}
                <p className="absolute bottom-5 left-0 right-0 z-[1] px-5 font-sans text-[22px] leading-[1.12] tracking-[-0.05em] text-white sm:bottom-6 sm:px-6 sm:text-[24px]">
                  <span className="font-normal">Séminaire {region.prep}</span>
                  <br />
                  <span className="font-bold">{region.name}</span>
                </p>
              </Link>
            </ScrollAnimate>
          ))}
        </div>

        <div className="mx-auto max-w-6xl px-5 sm:px-8">

          <ScrollAnimate className="mt-14 sm:mt-16">
            <CategoryHeading className="mb-3 sm:mb-4">
              En fonction des <span className="font-bold">lieux</span>
            </CategoryHeading>
            <p className={`mb-5 max-w-none sm:mb-6 ${homeParagraphClass}`}>
              Chez un producteur, au cœur d&apos;un vignoble, dans une ferme, au bord de l&apos;eau
              ou en pleine nature… choisissez le lieu qui donnera une autre dimension à votre
              séminaire.
            </p>
          </ScrollAnimate>

        </div>

        {/* Mobile : carousel swipable */}
        <div
          ref={lieuxScrollRef}
          className="flex min-w-0 cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-x pb-1 active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:hidden"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollPaddingInline: '1.25rem',
            paddingLeft: '1.25rem',
            paddingRight: '1.25rem',
          }}
        >
          {LIEUX.map((lieu) => (
            <Link
              key={lieu.slug}
              href={lieuDestinationPath(lieu.slug)}
              className="group relative aspect-[3/4.4] w-[62vw] shrink-0 snap-center overflow-hidden"
              style={{ borderRadius: HOME_RADIUS }}
            >
              <Image
                src={lieu.heroImage}
                alt={lieu.heroImageAlt}
                fill
                sizes="70vw"
                className="pointer-events-none select-none object-cover"
                {...protectedImageProps}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
              {lieu.heroImageCopyright || getImageCopyright(lieu.heroImage) ? (
                <PhotoCopyright
                  className="z-[2]"
                  label={lieu.heroImageCopyright || getImageCopyright(lieu.heroImage)!}
                />
              ) : null}
              <p className="pointer-events-none absolute bottom-5 left-0 right-0 z-[1] px-5 font-sans text-[22px] leading-[1.12] tracking-[-0.05em] text-white">
                <span className="font-normal">Séminaire</span>
                <br />
                <span className="font-bold">{lieu.name}</span>
              </p>
            </Link>
          ))}
        </div>

        <SwipeDots
          count={LIEUX.length}
          activeIndex={lieuxSwipe.activeIndex}
          onSelect={lieuxSwipe.goTo}
          label="Lieu"
          className="mt-5 sm:hidden"
        />

        {/* Desktop / tablet : grille */}
        <div className="mx-auto hidden max-w-6xl px-5 sm:grid sm:grid-cols-2 sm:gap-5 sm:px-8 lg:grid-cols-3">
          {LIEUX.map((lieu, i) => (
            <ScrollAnimate key={lieu.slug} delay={Math.min(i * 50, 200)}>
              <Link
                href={lieuDestinationPath(lieu.slug)}
                className="group relative block aspect-[16/10] overflow-hidden"
                style={{ borderRadius: HOME_RADIUS }}
              >
                <Image
                  src={lieu.heroImage}
                  alt={lieu.heroImageAlt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                  {...protectedImageProps}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                {lieu.heroImageCopyright || getImageCopyright(lieu.heroImage) ? (
                  <PhotoCopyright
                    className="z-[2]"
                    label={lieu.heroImageCopyright || getImageCopyright(lieu.heroImage)!}
                  />
                ) : null}
                <p className="absolute bottom-5 left-0 right-0 z-[1] px-5 font-sans text-[22px] leading-[1.12] tracking-[-0.05em] text-white sm:bottom-6 sm:px-6 sm:text-[24px]">
                  <span className="font-normal">Séminaire</span>
                  <br />
                  <span className="font-bold">{lieu.name}</span>
                </p>
              </Link>
            </ScrollAnimate>
          ))}
        </div>

        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ScrollAnimate className="mt-14 sm:mt-16">
            <div id="seminaires-par-ville">
              <CategoryHeading className="mb-3 sm:mb-4">
                En fonction des <span className="font-bold">villes</span>
              </CategoryHeading>
              <p className={`mb-5 max-w-none sm:mb-6 ${homeParagraphClass}`}>
                Toutes vos expériences, séminaires, événements d&apos;entreprise à moins d&apos;1h30 de
                votre métropole. Sélectionnez votre ville : nous imaginons votre séminaire, team
                building ou événement chez des producteurs et acteurs ruraux, autour de votre
                métropole.
              </p>
              <nav
                aria-label="Séminaires près des villes"
                className="flex flex-wrap gap-x-8 gap-y-3 sm:gap-x-10 sm:gap-y-4"
              >
                {VILLES_SEMINAIRE.map((ville) => (
                  <Link
                    key={ville.slug}
                    href={villeSeminairePath(ville.slug)}
                    className="font-sans text-[16px] font-semibold tracking-[-0.04em] text-[#0c1d22] underline decoration-[rgba(12,29,34,0.25)] underline-offset-4 transition-colors hover:text-[#ec6435] hover:decoration-[#ec6435] sm:text-[18px]"
                  >
                    {ville.name}
                  </Link>
                ))}
              </nav>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* ── CTA BANNIÈRES ── */}
      <section
        style={{
          paddingTop: 'clamp(2rem, 4vw, 3rem)',
          paddingBottom: homeSectionPadding,
          background: '#ffffff',
        }}
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-5 sm:gap-5 sm:px-8 lg:grid-cols-2">
          <Link
            href="/seminaires-entreprise"
            className="group relative flex min-h-[260px] flex-col items-center justify-center overflow-hidden px-6 py-10 text-center transition-transform duration-300 hover:scale-[1.01] sm:min-h-[300px] sm:px-10 sm:py-12"
            style={{ background: HOME_COLORS.primary, borderRadius: HOME_RADIUS }}
          >
            <h2 className="max-w-md font-sans text-[24px] font-normal leading-[1.12] tracking-[-0.07em] text-white sm:text-[28px] lg:text-[32px]">
              Découvrez nos <span className="font-bold">séminaires d&apos;entreprise</span>
            </h2>
            <p className="mx-auto mt-4 max-w-sm font-sans text-[13px] font-normal leading-[1.7] tracking-[-0.04em] text-white/80 sm:mt-5 sm:text-[14px]">
              Des expériences pensées pour réunir vos équipes, sortir du cadre et créer un impact
              concret sur les territoires et nos producteurs.
            </p>
            <span className="mt-7 inline-flex items-center justify-center rounded-full bg-white px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.07em] text-[#0c1d22] transition-colors group-hover:bg-[#ec6435] group-hover:text-white sm:mt-8 sm:px-7 sm:py-2.5 sm:text-[11px]">
              Découvrir le détail de nos séminaires
            </span>
          </Link>

          <button
            type="button"
            onClick={() => openModal()}
            className="group relative flex min-h-[260px] flex-col items-center justify-center overflow-hidden px-6 py-10 text-center transition-transform duration-300 hover:scale-[1.01] sm:min-h-[300px] sm:px-10 sm:py-12"
            style={{ background: HOME_COLORS.orange, borderRadius: HOME_RADIUS }}
          >
            <h2 className="max-w-md font-sans text-[24px] font-normal leading-[1.12] tracking-[-0.07em] text-white sm:text-[28px] lg:text-[32px]">
              Votre prochain séminaire <span className="font-bold">commence ici.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-sm font-sans text-[13px] font-normal leading-[1.7] tracking-[-0.04em] text-white/80 sm:mt-5 sm:text-[14px]">
              Parlez-nous de vos équipes, de vos envies et de vos enjeux. Nous imaginons avec vous
              une expérience sur mesure, au cœur des territoires.
            </p>
            <span className="mt-7 inline-flex items-center justify-center rounded-full bg-white px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.07em] text-[#0c1d22] transition-colors group-hover:bg-[#0c1d22] group-hover:text-white sm:mt-8 sm:px-7 sm:py-2.5 sm:text-[11px]">
              Parlons de votre projet
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Destinations;
