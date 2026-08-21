'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import {
  HOME_COLORS,
  HOME_RADIUS,
  homeFramedHeroWideAspectClass,
  bottomImageGradientClass,
  homeCtaOutlineClass,
  homeCtaOutlineGhostClass,
  homeHeroOutlineButtonClass,
  homeParagraphClass,
  homeSectionPadding,
} from '../components/home/homeStyles';
import FramedHeroImage from '../components/FramedHeroImage';
import PhotoCopyright from '../components/PhotoCopyright';
import {
  getRelatedLieux,
  lieuDestinationPath,
  type DestinationLieu as LieuData,
} from '../lib/lieux';
import { protectedImageProps } from '../lib/protectedImage';
import { getImageCopyright } from '../lib/imageCopyrights';
import FaqExcerpt from '../components/FaqExcerpt';
import type { FaqExcerptKey } from '../lib/faq';

/** Même format que les titres de section Home / Séminaires. */
const sectionTitleClass =
  'font-sans text-[34px] font-normal leading-[1.08] tracking-[-0.075em] text-[#0c1d22] sm:text-[40px] lg:text-[48px]';

const sectionTitleOnPrimaryClass =
  'font-sans text-[34px] font-normal leading-[1.08] tracking-[-0.075em] text-white sm:text-[40px] lg:text-[44px]';

const S_ORANGE =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/s-picto-orange.png';

const ETOILE =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/etoilecouleurfoncee.png';

const LIEU_FAQ_EXCERPT: Partial<Record<string, FaqExcerptKey>> = {
  'chez-le-producteur': 'producteur',
  'a-la-ferme': 'producteur',
  'au-coeur-des-terroirs': 'producteur',
  'en-pleine-nature': 'au-vert',
};

const RATEAU =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/rateau.png';

const SHOES =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/shoes.png';

/** Gras sur le début du titre logement (ex. « Maisons et domaines » pour …). */
const LogementTitle: React.FC<{ title: string }> = ({ title }) => {
  const match = title.match(/^(.*?)\s+(pour\s+.+)$/i);
  if (match) {
    return (
      <>
        <span className="font-bold">{match[1]}</span> {match[2]}
      </>
    );
  }
  return <span className="font-bold">{title}</span>;
};

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

const ProgrammeAccordion: React.FC<{
  days: LieuData['programmeDays'];
}> = ({ days }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col border-t border-[rgba(12,29,34,0.12)]">
      {days.map((day, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={day.label} className="border-b border-[rgba(12,29,34,0.12)]">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:bg-[rgba(12,29,34,0.02)] sm:py-6"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="font-sans text-[15px] font-bold tracking-[-0.03em] text-[#0c1d22] sm:text-[16px]">
                {day.label}
              </span>
              <ChevronDown
                size={18}
                strokeWidth={1.8}
                aria-hidden
                className="shrink-0 transition-transform duration-300"
                style={{
                  color: isOpen ? HOME_COLORS.orange : 'rgba(12,29,34,0.4)',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </button>
            <div
              className="grid transition-all duration-300"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', opacity: isOpen ? 1 : 0 }}
            >
              <div className="overflow-hidden">
                <ul className="space-y-2.5 pb-5 pl-1 sm:pb-6">
                  {day.items.map((item) => (
                    <li
                      key={item}
                      className={`${homeParagraphClass} relative pl-4 before:absolute before:left-0 before:top-[0.65em] before:h-1 before:w-1 before:rounded-full before:bg-[#ec6435]`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const FaqAccordion: React.FC<{ items: LieuData['faq'] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-1">
      {items.map((item, i) => {
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
                <p className={`${homeParagraphClass} pb-4 pr-8`}>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const LogementCarousel: React.FC<{
  images: LieuData['logement']['images'];
}> = ({ images }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = useCallback(
    (next: number) => {
      const track = trackRef.current;
      if (!track || images.length === 0) return;
      const clamped = ((next % images.length) + images.length) % images.length;
      const slide = track.children[clamped] as HTMLElement | undefined;
      if (!slide) return;
      track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: 'smooth' });
      setIndex(clamped);
    },
    [images.length],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const card = track.children[0] as HTMLElement | undefined;
      if (!card) return;
      const step = card.offsetWidth;
      if (step <= 0) return;
      setIndex(Math.round(track.scrollLeft / step));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  if (images.length === 0) return null;

  return (
    <div className="group/carousel relative">
      <div
        className="overflow-hidden"
        style={{ borderRadius: HOME_RADIUS }}
      >
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((img) => (
            <div key={img.src} className="relative aspect-[4/3] w-full shrink-0 snap-center">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                {...protectedImageProps}
              />
              {img.copyright || getImageCopyright(img.src) ? (
                <PhotoCopyright label={img.copyright || getImageCopyright(img.src)!} />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 ? (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Image précédente"
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/55 text-[#0c1d22] opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white/75 group-hover/carousel:opacity-100 focus-visible:opacity-100"
          >
            <ChevronLeft size={18} strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Image suivante"
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/55 text-[#0c1d22] opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white/75 group-hover/carousel:opacity-100 focus-visible:opacity-100"
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>
          <div className="mt-4 flex items-center justify-center gap-2">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                aria-label={`Image ${i + 1}`}
                onClick={() => goTo(i)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 28 : 8,
                  background: i === index ? HOME_COLORS.orange : 'rgba(12,29,34,0.18)',
                }}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

type Props = {
  lieu: LieuData;
};

const DestinationLieu: React.FC<Props> = ({ lieu }) => {
  const { openModal } = useModal();
  const related = getRelatedLieux(lieu.slug, 2);

  return (
    <div className="overflow-x-hidden bg-white font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* ── HERO (image encadrée, largeur header, plus basse) ── */}
      <section className="relative w-full bg-white pt-[calc(7.5rem+env(safe-area-inset-top))] sm:pt-[calc(9rem+env(safe-area-inset-top))] lg:pt-[calc(10.5rem+env(safe-area-inset-top))]">
        {/* S orange — coin bas droit du hero */}
        <Image
          src={S_ORANGE}
          alt=""
          aria-hidden
          width={260}
          height={260}
          className="pointer-events-none absolute bottom-0 right-0 z-20 hidden h-[200px] w-[200px] translate-x-[30%] translate-y-[35%] object-contain opacity-90 lg:block xl:h-[260px] xl:w-[260px]"
        />
        <div className="relative mx-auto max-w-[1280px] px-5 pb-2 sm:px-8">
          {/* Rateau — coin bas gauche du hero */}
          <Image
            src={RATEAU}
            alt=""
            aria-hidden
            width={224}
            height={224}
            className="pointer-events-none absolute bottom-0 left-0 z-30 h-36 w-36 -translate-x-[35%] translate-y-[42%] object-contain drop-shadow-md sm:h-48 sm:w-48 lg:h-56 lg:w-56"
          />
          <div
            className={`relative ${homeFramedHeroWideAspectClass}`}
            style={{ borderRadius: HOME_RADIUS }}
          >
            <FramedHeroImage
              src={lieu.heroImage}
              alt={lieu.heroImageAlt}
              copyright={lieu.heroImageCopyright || getImageCopyright(lieu.heroImage)}
            />
            <div className={`${bottomImageGradientClass} z-[1]`} />
            <div
              className="absolute inset-0 z-[2]"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.55) 100%)',
              }}
            />

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 px-4 pb-14 pt-10 text-center sm:gap-0 sm:px-10 sm:pb-8 sm:pt-12 lg:pb-10 lg:pt-14">
              <div className="flex flex-col items-center sm:flex-1 sm:justify-center">
                <p className="font-sans text-[12px] font-bold tracking-[-0.02em] text-white/90 sm:text-[13px]">
                  {lieu.name}
                </p>
                <h1 className="mt-2 max-w-4xl font-sans text-[clamp(1.65rem,5vw,3rem)] font-bold leading-[1.05] tracking-[-0.075em] text-white">
                  {`Séminaire ${lieu.phrase}`}
                </h1>
              </div>
              <button
                type="button"
                onClick={() => openModal()}
                className={`${homeHeroOutlineButtonClass} sm:mt-auto`}
                style={{ background: 'rgba(12, 29, 34, 0.12)' }}
              >
                Réserver mon séminaire
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section
        style={{
          paddingTop: 'clamp(2.5rem, 5vw, 4rem)',
          paddingBottom: 'clamp(2.5rem, 5vw, 4rem)',
          background: '#ffffff',
        }}
      >
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <ScrollAnimate>
            <div className="space-y-3.5">
              {lieu.intro.map((p) => (
                <p key={p.slice(0, 40)} className={homeParagraphClass}>
                  {p}
                </p>
              ))}
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* ── GROS + ── */}
      <section className="relative py-3 sm:py-4">
        <div className="relative left-1/2 w-[calc(100vw+16px)] -translate-x-1/2 sm:w-[calc(100vw+20px)]">
          <div
            className="overflow-hidden px-5 pt-24 pb-16 sm:px-8 sm:py-16 lg:px-10 lg:py-20"
            style={{
              background: HOME_COLORS.primary,
              borderRadius: '42px',
            }}
          >
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
              <ScrollAnimate className="flex flex-col justify-center lg:pr-4">
                <h2 className={sectionTitleOnPrimaryClass}>
                  Pourquoi organiser votre{' '}
                  <span className="font-bold">séminaire d&apos;entreprise</span>{' '}
                  <span className="font-bold">{lieu.phrase}&nbsp;?</span>
                </h2>

                <div className="mt-7 space-y-6 sm:mt-8">
                  {lieu.pros.map((pro) => (
                    <div key={pro.title}>
                      <h3 className="inline font-sans text-[15px] font-semibold tracking-[-0.03em] text-white underline decoration-white/80 underline-offset-[5px] sm:text-[16px]">
                        {pro.title}
                      </h3>
                      <p className="mt-2.5 max-w-md font-sans text-[13px] font-normal leading-[1.7] tracking-[-0.03em] text-white/90 sm:text-[14px]">
                        {pro.text}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-7 font-sans text-[13px] font-normal leading-[1.7] tracking-[-0.03em] text-white/90 sm:text-[14px]">
                  {lieu.formatsLead}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {lieu.formats.map((f) => (
                    <li
                      key={f}
                      className="font-sans text-[13px] font-normal leading-[1.6] tracking-[-0.03em] text-white/95 before:mr-2 before:content-['•'] sm:text-[14px]"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 max-w-md font-sans text-[13px] font-normal leading-[1.7] tracking-[-0.03em] text-white/90 sm:text-[14px]">
                  {lieu.prosClosing}
                </p>

                <button
                  type="button"
                  onClick={() => openModal()}
                  className="mt-8 inline-flex w-fit items-center justify-center rounded-full border border-white bg-transparent px-8 py-2.5 text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-white hover:text-[#0c1d22] sm:mt-9 sm:text-xs"
                >
                  Demander un devis
                </button>
              </ScrollAnimate>

              <ScrollAnimate delay={80} className="flex items-center justify-center lg:justify-end">
                <div
                  className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden sm:max-w-[480px] lg:max-w-none lg:w-full"
                  style={{ borderRadius: '28px' }}
                >
                  <Image
                    src={lieu.prosImage}
                    alt={lieu.prosImageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    {...protectedImageProps}
                  />
                  {lieu.prosImageCopyright || getImageCopyright(lieu.prosImage) ? (
                    <PhotoCopyright
                      label={lieu.prosImageCopyright || getImageCopyright(lieu.prosImage)!}
                    />
                  ) : null}
                </div>
              </ScrollAnimate>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMME ── */}
      <section
        style={{
          paddingTop: homeSectionPadding,
          paddingBottom: homeSectionPadding,
          background: '#ffffff',
        }}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
            <ScrollAnimate>
              <h2 className={sectionTitleClass}>
                Votre{' '}
                <span className="font-bold" style={{ color: HOME_COLORS.orange }}>
                  {lieu.programmeAccent}
                </span>{' '}
                pour un événement d&apos;entreprise réussi {lieu.phrase}.
              </h2>
              <p className={`mt-5 ${homeParagraphClass}`}>
                <span
                  className="font-semibold text-[#0c1d22] underline decoration-[#ec6435] decoration-2 underline-offset-[4px]"
                >
                  Pour résumer :
                </span>{' '}
                {lieu.programmeSummary}
              </p>
            </ScrollAnimate>

            <ScrollAnimate delay={80}>
              <ProgrammeAccordion days={lieu.programmeDays} />
            </ScrollAnimate>
          </div>

          <div className="mt-10 flex justify-center sm:mt-12">
            <button type="button" onClick={() => openModal()} className={homeCtaOutlineGhostClass}>
              Demander un devis
            </button>
          </div>
        </div>
      </section>

      {/* ── PRODUCTEUR ── */}
      <section
        className="relative"
        style={{
          paddingTop: homeSectionPadding,
          paddingBottom: homeSectionPadding,
          background: HOME_COLORS.gray,
        }}
      >
        {/* Étoile — bordure droite, à l’intersection avec le programme type */}
        <Image
          src={ETOILE}
          alt=""
          aria-hidden
          width={380}
          height={380}
          className="pointer-events-none absolute right-0 z-0 hidden h-[300px] w-[300px] translate-x-[46%] -translate-y-1/2 object-contain lg:block xl:h-[380px] xl:w-[380px]"
          style={{ top: 0 }}
        />
        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
          <ScrollAnimate>
            <p
              className="font-sans text-[13px] font-bold tracking-[-0.03em] sm:text-[14px]"
              style={{ color: HOME_COLORS.orange }}
            >
              Exemple de producteur
            </p>
            <h2 className={`mt-3 max-w-2xl ${sectionTitleClass}`}>
              Rencontrez <span className="font-bold">{lieu.producer.name}</span>.
            </h2>
          </ScrollAnimate>

          <div className="mt-8 grid grid-cols-1 items-stretch gap-6 lg:mt-10 lg:grid-cols-2 lg:gap-10">
            <ScrollAnimate>
              <div
                className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[360px]"
                style={{ borderRadius: HOME_RADIUS }}
              >
                <Image
                  src={lieu.producer.image}
                  alt={lieu.producer.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  {...protectedImageProps}
                />
                {lieu.producer.imageCopyright || getImageCopyright(lieu.producer.image) ? (
                  <PhotoCopyright
                    label={
                      lieu.producer.imageCopyright || getImageCopyright(lieu.producer.image)!
                    }
                  />
                ) : null}
              </div>
            </ScrollAnimate>

            <ScrollAnimate delay={80} className="flex flex-col justify-center">
              <p className="font-sans text-[14px] font-semibold tracking-[-0.03em] text-[#0c1d22] sm:text-[15px]">
                {lieu.producer.role}
              </p>
              <p className={`mt-4 ${homeParagraphClass}`}>{lieu.producer.description}</p>
              <Link
                href={
                  lieu.producer.seminaireSlug
                    ? `/seminaire-exemples/${lieu.producer.seminaireSlug}`
                    : '/seminaire-exemples'
                }
                className={`mt-7 self-start ${homeCtaOutlineClass}`}
              >
                Découvrir cette expérience
              </Link>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* ── LOGEMENT ── */}
      <section
        className="relative"
        style={{
          paddingTop: homeSectionPadding,
          paddingBottom: homeSectionPadding,
          background: '#ffffff',
        }}
      >
        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <ScrollAnimate className="order-2 lg:order-1">
              <p
                className="font-sans text-[13px] font-bold tracking-[-0.03em] sm:text-[14px]"
                style={{ color: HOME_COLORS.orange }}
              >
                Logement
              </p>
              <h2 className={`mt-3 ${sectionTitleClass}`}>
                <LogementTitle title={lieu.logement.title} />.
              </h2>
              <p className={`mt-5 ${homeParagraphClass}`}>{lieu.logement.description}</p>
              <ul className="mt-5 space-y-2">
                {lieu.logement.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 font-sans text-[13px] font-medium tracking-[-0.03em] text-[#0c1d22] sm:text-[14px]"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: HOME_COLORS.orange }}
                      aria-hidden
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </ScrollAnimate>

            <ScrollAnimate delay={80} className="order-1 lg:order-2">
              <LogementCarousel images={lieu.logement.images} />
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        className="relative"
        style={{
          paddingTop: homeSectionPadding,
          paddingBottom: homeSectionPadding,
          background: HOME_COLORS.gray,
        }}
      >
        {/* Shoes — bas droit FAQ (ex-abeille) */}
        <Image
          src={SHOES}
          alt=""
          aria-hidden
          width={224}
          height={224}
          className="pointer-events-none absolute bottom-8 right-4 z-20 hidden h-32 w-32 object-contain sm:block sm:bottom-10 sm:right-8 sm:h-44 sm:w-44 lg:bottom-12 lg:right-12 lg:h-56 lg:w-56"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8">
          <ScrollAnimate>
            <h2 className={`text-center ${sectionTitleClass}`}>
              <span className="font-bold">Questions</span> fréquentes.
            </h2>
            <p className={`mx-auto mt-3 max-w-lg text-center ${homeParagraphClass}`}>
              Une question sur un séminaire {lieu.phrase}&nbsp;? Parcourez la FAQ ou
              contactez-nous.
            </p>
          </ScrollAnimate>
          <ScrollAnimate delay={60} className="mt-8 sm:mt-10">
            <FaqAccordion items={lieu.faq} />
          </ScrollAnimate>
          <div className="mt-8 flex justify-center">
            <button type="button" onClick={() => openModal()} className={homeCtaOutlineClass}>
              Nous contacter
            </button>
          </div>
        </div>
      </section>

      {LIEU_FAQ_EXCERPT[lieu.slug] ? (
        <FaqExcerpt excerpt={LIEU_FAQ_EXCERPT[lieu.slug]!} />
      ) : null}

      {/* ── AUTRES LIEUX ── */}
      <section
        style={{
          paddingTop: homeSectionPadding,
          paddingBottom: homeSectionPadding,
          background: '#ffffff',
        }}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ScrollAnimate>
            <h2 className={`text-center ${sectionTitleClass}`}>
              Explorez d&apos;autres <span className="font-bold">lieux</span>.
            </h2>
            <p className={`mx-auto mt-3 max-w-lg text-center ${homeParagraphClass}`}>
              Découvrez d&apos;autres cadres TerraGo pour votre prochain séminaire d&apos;entreprise.
            </p>
          </ScrollAnimate>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5">
            {related.map((other, i) => (
              <ScrollAnimate key={other.slug} delay={i * 80}>
                <Link
                  href={lieuDestinationPath(other.slug)}
                  className="group relative block aspect-[21/9] overflow-hidden sm:aspect-[2.2/1]"
                  style={{ borderRadius: HOME_RADIUS }}
                >
                  <Image
                    src={other.heroImage}
                    alt={other.eyebrow}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                    {...protectedImageProps}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                  {other.heroImageCopyright || getImageCopyright(other.heroImage) ? (
                    <PhotoCopyright
                      className="z-[2]"
                      label={other.heroImageCopyright || getImageCopyright(other.heroImage)!}
                    />
                  ) : null}
                  <p className="absolute bottom-5 left-0 right-0 z-[1] px-5 font-sans text-[22px] leading-[1.12] tracking-[-0.05em] text-white sm:bottom-6 sm:px-6 sm:text-[26px]">
                    <span className="font-normal">Séminaire</span>
                    <br />
                    <span className="font-bold">{other.name}</span>
                  </p>
                </Link>
              </ScrollAnimate>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/destinations" className={homeCtaOutlineGhostClass}>
              <span aria-hidden>→</span>
              Voir toutes nos destinations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationLieu;
