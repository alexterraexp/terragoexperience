'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
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
import {
  getSeminaireEnjeu,
  seminaireEnjeuPath,
  type SeminaireEnjeu as EnjeuData,
  type SeminaireEnjeuExample,
} from '../lib/seminaireEnjeux';
import {
  SEMINAIRE_FORMAT_LABELS,
  fetchSeminaires,
  type Format,
  type Seminaire,
  type SeminaireFormatId,
} from '../lib/seminaires';

const S_ORANGE =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/s%20orange.png';

const sectionTitleClass =
  'font-sans text-[34px] font-normal leading-[1.08] tracking-[-0.075em] text-[#0c1d22] sm:text-[40px] lg:text-[48px]';

const sectionTitleOnOrangeClass =
  'font-sans text-[34px] font-normal leading-[1.08] tracking-[-0.075em] text-white sm:text-[40px] lg:text-[44px]';

const HOME_EMOJI =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji';

const HERO_PICTO_BY_SLUG: Record<string, string> = {
  cohesion: `${HOME_EMOJI}/feu.png`,
  'sensibilisation-rse': `${HOME_EMOJI}/emoji-branche.png`,
  'inspiration-miroir': `${HOME_EMOJI}/mains-dans-la-terre.png`,
};

const ABEILLE =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/abeille.png';

const ACRONYMS = new Set(['RSE', 'CODIR', 'CSRD']);

/** Minuscules pour titres, en conservant les sigles (RSE, CODIR…). */
function titleForSentence(title: string): string {
  return title.replace(/[A-Za-zÀ-ÿ]+/g, (word) => {
    const upper = word.toUpperCase();
    if (ACRONYMS.has(upper)) return upper;
    return word.toLowerCase();
  });
}

/** Force les sigles en majuscules dans n’importe quel texte affiché. */
function preserveAcronyms(text: string): string {
  return text.replace(/[A-Za-zÀ-ÿ]+/g, (word) => {
    const upper = word.toUpperCase();
    if (ACRONYMS.has(upper)) return upper;
    return word;
  });
}

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

const INCLUS_FALLBACK: Record<string, string> = {
  atelier: 'Atelier « les mains dans la terre »',
  repas: 'Repas convivial typique',
  visite_degustation: 'Visite et dégustation',
  salle_reunion: 'Salle de réunion à disposition',
  hebergement: 'Hébergement',
  soiree_theme: 'Soirée à thème',
};

function inclusLabel(key: string): string {
  return INCLUS_FALLBACK[key] ?? key;
}

const ExampleFormatPanel: React.FC<{
  fmt: Format;
  detailHref: string;
}> = ({ fmt, detailHref }) => {
  return (
    <div className="pt-1">
      {fmt.inclus.length > 0 && (
        <div>
          <p className="font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-[#0c1d22]">
            Inclus dans l&apos;offre
          </p>
          <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {fmt.inclus.map((key) => (
              <li
                key={key}
                className="flex items-start gap-2.5 font-sans text-[13px] font-medium tracking-[-0.03em] text-[#0c1d22] sm:text-[14px]"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: HOME_COLORS.orange }}
                  aria-hidden
                />
                {inclusLabel(key)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {fmt.programme.length > 0 && (
        <div className="mt-6">
          <p className="font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-[#0c1d22]">
            Exemple de programme
          </p>
          <div className="mt-3 flex flex-col gap-2.5">
            {fmt.programme.map((p, i) => (
              <div key={`${p.heure}-${i}`} className="flex items-start gap-3 sm:gap-4">
                <span
                  className="w-[4.5rem] shrink-0 pt-0.5 font-sans text-[12px] font-bold tracking-[-0.02em] sm:w-20"
                  style={{ color: HOME_COLORS.orange }}
                >
                  {p.heure}
                </span>
                <span className="font-sans text-[13px] font-normal leading-[1.65] tracking-[-0.02em] text-[#0c1d22]/70 sm:text-[14px]">
                  {p.action}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <Link href={detailHref} className={homeCtaOutlineClass}>
          Voir l&apos;offre en détail
        </Link>
      </div>
    </div>
  );
};

const ExampleSeminarBlock: React.FC<{
  example: SeminaireEnjeuExample;
  displayTitle: string;
}> = ({ example, displayTitle }) => {
  const { openModal } = useModal();
  const [seminaire, setSeminaire] = useState<Seminaire | null>(null);
  const [loading, setLoading] = useState(true);
  const [openFormat, setOpenFormat] = useState<SeminaireFormatId | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setOpenFormat(null);
    fetchSeminaires()
      .then((all) => {
        if (cancelled) return;
        const found = all.find((s) => s.slug === example.seminaireSlug) ?? null;
        setSeminaire(found);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setSeminaire(null);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [example.seminaireSlug]);

  const detailHref = `/seminaire-exemples/${example.seminaireSlug}`;
  const formatRows = (['journee', 'residentiel'] as const)
    .map((id) => {
      const fmt = seminaire?.formats[id];
      if (!fmt) return null;
      return { id, title: SEMINAIRE_FORMAT_LABELS[id], fmt };
    })
    .filter((row): row is { id: SeminaireFormatId; title: string; fmt: Format } => Boolean(row));

  return (
    <>
      <ScrollAnimate>
        <p
          className="font-sans text-[13px] font-bold tracking-[-0.03em] sm:text-[14px]"
          style={{ color: HOME_COLORS.orange }}
        >
          Exemple de séminaire
        </p>
        <h2 className={`mt-3 max-w-2xl ${sectionTitleClass}`}>
          Un exemple de <span className="font-bold">{displayTitle}</span>.
        </h2>
      </ScrollAnimate>

      <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:mt-10 lg:grid-cols-2 lg:gap-10">
        <ScrollAnimate>
          <div
            className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:min-h-[420px] lg:h-full"
            style={{ borderRadius: HOME_RADIUS }}
          >
            <img
              src={seminaire?.images[0] || example.image}
              alt={example.imageAlt}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </ScrollAnimate>

        <ScrollAnimate delay={80} className="flex flex-col">
          <p className="font-sans text-[22px] font-bold leading-[1.15] tracking-[-0.05em] text-[#0c1d22] sm:text-[26px]">
            {example.producerName}
          </p>
          <p
            className="mt-2 font-sans text-[14px] font-semibold tracking-[-0.03em] sm:text-[15px]"
            style={{ color: HOME_COLORS.orange }}
          >
            {preserveAcronyms(example.role)}
          </p>
          <p className={`mt-4 ${homeParagraphClass}`}>
            {preserveAcronyms(example.description)}
          </p>

          {loading ? (
            <p className={`mt-8 ${homeParagraphClass}`}>Chargement de l&apos;offre…</p>
          ) : formatRows.length === 0 ? (
            <Link href={detailHref} className={`mt-8 self-start ${homeCtaOutlineClass}`}>
              Voir l&apos;offre en détail
            </Link>
          ) : (
            <div className="mt-8 flex flex-col">
              {formatRows.map((row) => {
                const isOpen = openFormat === row.id;
                const meta = [row.fmt.duree?.trim(), row.fmt.participants?.trim()]
                  .filter(Boolean)
                  .join(' · ');
                return (
                  <div
                    key={row.id}
                    className="border-b border-[rgba(12,29,34,0.12)] first:border-t"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 py-5 text-left transition-colors hover:bg-[rgba(12,29,34,0.02)] sm:gap-4"
                      onClick={() => setOpenFormat(isOpen ? null : row.id)}
                      aria-expanded={isOpen}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block font-sans text-[15px] font-bold tracking-[-0.03em] text-[#0c1d22] sm:text-[16px]">
                          {row.title}
                        </span>
                        {meta ? (
                          <span className="mt-1 block font-sans text-[13px] font-normal tracking-[-0.02em] text-[#0c1d22]/55">
                            {meta}
                          </span>
                        ) : null}
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
                      style={{
                        gridTemplateRows: isOpen ? '1fr' : '0fr',
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-6">
                          <ExampleFormatPanel
                            fmt={row.fmt}
                            detailHref={detailHref}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <button
                type="button"
                onClick={() => openModal()}
                className={`mt-8 self-start ${homeCtaOutlineGhostClass}`}
              >
                Demander un devis
              </button>
            </div>
          )}
        </ScrollAnimate>
      </div>
    </>
  );
};

const FaqAccordion: React.FC<{ items: EnjeuData['faq'] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-1">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question} className="overflow-hidden">
            <button
              type="button"
              className="flex w-full items-center gap-3 py-3.5 text-left transition-colors hover:bg-[rgba(12,29,34,0.02)] sm:gap-4 sm:py-4"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="min-w-0 flex-1 font-sans text-[14px] font-bold leading-[1.3] tracking-[-0.03em] text-[#0c1d22] sm:text-[15px]">
                {preserveAcronyms(item.question)}
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
                <p className={`${homeParagraphClass} pb-4 pr-8`}>{preserveAcronyms(item.answer)}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** Déroulé type : étapes fermées, une seule ouverte à la fois. */
const ProgramAccordion: React.FC<{ items: EnjeuData['programHighlights'] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ol className="flex flex-col border-t border-[rgba(12,29,34,0.12)]">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <li key={item.title} className="border-b border-[rgba(12,29,34,0.12)]">
            <button
              type="button"
              className="flex w-full items-center gap-4 py-5 text-left transition-colors hover:bg-[rgba(12,29,34,0.02)] sm:gap-5 sm:py-6"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span
                className="shrink-0 font-sans text-[13px] font-bold tracking-[-0.03em] tabular-nums"
                style={{ color: HOME_COLORS.orange }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0 flex-1 font-sans text-[15px] font-bold tracking-[-0.03em] text-[#0c1d22] sm:text-[16px]">
                {preserveAcronyms(item.title)}
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
              style={{
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="overflow-hidden">
                <p className={`${homeParagraphClass} pb-5 pl-[calc(2ch+1rem)] pr-8 sm:pb-6 sm:pl-[calc(2ch+1.25rem)]`}>
                  {preserveAcronyms(item.description)}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
};

type Props = {
  enjeu: EnjeuData;
};

const SeminaireEnjeu: React.FC<Props> = ({ enjeu }) => {
  const { openModal } = useModal();
  const related = enjeu.relatedSlugs
    .map((slug) => getSeminaireEnjeu(slug))
    .filter((item): item is EnjeuData => Boolean(item));

  const introParagraphs = [enjeu.lead, ...enjeu.body.slice(0, 2)].map(preserveAcronyms);
  const highlightPros = enjeu.body.slice(2, 4).map((text, i) => ({
    title: preserveAcronyms(enjeu.experiences[i] ?? `Point fort ${i + 1}`),
    text: preserveAcronyms(text),
  }));
  const heroPicto = HERO_PICTO_BY_SLUG[enjeu.slug];
  const displayTitle = titleForSentence(enjeu.title);

  return (
    <div className="overflow-x-hidden bg-white font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* ── HERO ── */}
      <section className="relative w-full bg-white pt-[calc(7.5rem+env(safe-area-inset-top))] sm:pt-[calc(9rem+env(safe-area-inset-top))] lg:pt-[calc(10.5rem+env(safe-area-inset-top))]">
        <div className="relative mx-auto max-w-[1280px] px-5 pb-2 sm:px-8">
          {heroPicto ? (
            <img
              src={heroPicto}
              alt=""
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-0 z-30 h-36 w-36 -translate-x-[35%] translate-y-[42%] object-contain drop-shadow-md sm:h-48 sm:w-48 lg:h-56 lg:w-56"
            />
          ) : null}
          <div
            className={`relative ${homeFramedHeroWideAspectClass}`}
            style={{ borderRadius: HOME_RADIUS }}
          >
            <img
              src={enjeu.heroImage}
              alt={enjeu.heroImageAlt}
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

            <div className="absolute inset-0 z-10 flex flex-col items-center px-4 pb-6 pt-10 text-center sm:px-10 sm:pb-8 sm:pt-12 lg:pb-10 lg:pt-14">
              <div className="flex flex-1 flex-col items-center justify-center">
                <p className="font-sans text-[12px] font-bold tracking-[-0.02em] text-white/90 sm:text-[13px]">
                  {enjeu.eyebrow}
                </p>
                <h1 className="mt-2 max-w-4xl font-sans text-[clamp(1.65rem,5vw,3rem)] font-normal leading-[1.05] tracking-[-0.075em] text-white">
                  Organisez <span className="font-bold">votre {displayTitle}</span>.
                </h1>
                <p className="mt-3 max-w-xl font-sans text-[13px] font-normal leading-[1.5] tracking-[-0.02em] text-white/85 sm:text-[14px]">
                  {preserveAcronyms(enjeu.subtitle)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => openModal()}
                className={homeHeroOutlineButtonClass}
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
              {introParagraphs.map((p) => (
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
              background: HOME_COLORS.orange,
              borderRadius: '42px',
            }}
          >
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
              <ScrollAnimate className="flex flex-col justify-center lg:pr-4">
                <h2 className={sectionTitleOnOrangeClass}>
                  Pourquoi choisir ce{' '}
                  <span className="font-bold">{displayTitle}</span>&nbsp;?
                </h2>

                <div className="mt-7 space-y-6 sm:mt-8">
                  {highlightPros.map((pro) => (
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
                  Ce que vos équipes vont vivre :
                </p>
                <ul className="mt-3 space-y-1.5">
                  {enjeu.experiences.map((f) => (
                    <li
                      key={f}
                      className="font-sans text-[13px] font-normal leading-[1.6] tracking-[-0.03em] text-white/95 before:mr-2 before:content-['•'] sm:text-[14px]"
                    >
                      {preserveAcronyms(f)}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => openModal()}
                  className="mt-8 inline-flex w-fit items-center justify-center rounded-full border border-white bg-transparent px-8 py-2.5 text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-white hover:text-[#ec6435] sm:mt-9 sm:text-xs"
                >
                  Demander un devis
                </button>
              </ScrollAnimate>

              <ScrollAnimate delay={80} className="flex items-center justify-center lg:justify-end">
                <div
                  className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden sm:max-w-[480px] lg:max-w-none lg:w-full"
                  style={{ borderRadius: '28px' }}
                >
                  <img
                    src={enjeu.whyImage}
                    alt={enjeu.whyImageAlt}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </ScrollAnimate>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMME ── */}
      <section
        className="relative"
        style={{
          paddingTop: homeSectionPadding,
          paddingBottom: homeSectionPadding,
          background: '#ffffff',
        }}
      >
        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
            <ScrollAnimate>
              <h2 className={sectionTitleClass}>
                Votre <span className="font-bold" style={{ color: HOME_COLORS.orange }}>déroulé type</span>{' '}
                pour un {displayTitle} réussi.
              </h2>
              <p className={`mt-5 ${homeParagraphClass}`}>
                <span className="font-semibold text-[#0c1d22] underline decoration-[#ec6435] decoration-2 underline-offset-[4px]">
                  Pour résumer :
                </span>{' '}
                une journée riche et fluide, du café d&apos;accueil au repas guinguette — modulable
                selon la taille du groupe et déclinable en format résidentiel 2&nbsp;jours.
              </p>
            </ScrollAnimate>

            <ScrollAnimate delay={80}>
              <ProgramAccordion items={enjeu.programHighlights} />
            </ScrollAnimate>
          </div>

          <div className="mt-10 flex justify-center sm:mt-12">
            <button type="button" onClick={() => openModal()} className={homeCtaOutlineGhostClass}>
              Demander un devis
            </button>
          </div>
        </div>
      </section>

      {/* ── EXEMPLE DE SÉMINAIRE ── */}
      <section
        className="relative"
        style={{
          paddingTop: homeSectionPadding,
          paddingBottom: homeSectionPadding,
          background: HOME_COLORS.gray,
        }}
      >
        <img
          src={S_ORANGE}
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-0 z-0 hidden h-[200px] w-[200px] translate-x-[30%] -translate-y-1/2 object-contain opacity-90 lg:block xl:h-[260px] xl:w-[260px]"
          style={{ top: 0 }}
        />
        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
          <ExampleSeminarBlock
            example={enjeu.exampleSeminar}
            displayTitle={displayTitle}
          />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        className="relative"
        style={{
          paddingTop: homeSectionPadding,
          paddingBottom: homeSectionPadding,
          background: '#ffffff',
        }}
      >
        <img
          src={ABEILLE}
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-8 right-4 z-20 hidden h-32 w-32 object-contain sm:block sm:bottom-10 sm:right-8 sm:h-44 sm:w-44 lg:bottom-12 lg:right-12 lg:h-56 lg:w-56"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8">
          <ScrollAnimate>
            <h2 className={`text-center ${sectionTitleClass}`}>
              <span className="font-bold">Questions</span> fréquentes.
            </h2>
            <p className={`mx-auto mt-3 max-w-lg text-center ${homeParagraphClass}`}>
              Une question sur un {displayTitle}&nbsp;? Parcourez la FAQ ou
              contactez-nous.
            </p>
          </ScrollAnimate>
          <ScrollAnimate delay={60} className="mt-8 sm:mt-10">
            <FaqAccordion items={enjeu.faq} />
          </ScrollAnimate>
          <div className="mt-8 flex justify-center">
            <button type="button" onClick={() => openModal()} className={homeCtaOutlineClass}>
              Nous contacter
            </button>
          </div>
        </div>
      </section>

      {/* ── AUTRES ENJEUX ── */}
      {related.length > 0 && (
        <section
          style={{
            paddingTop: homeSectionPadding,
            paddingBottom: homeSectionPadding,
            background: HOME_COLORS.orange,
          }}
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <ScrollAnimate>
              <h2 className={`text-center ${sectionTitleOnOrangeClass}`}>
                Explorez d&apos;autres <span className="font-bold">enjeux</span>.
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-center font-sans text-[14px] font-normal leading-[1.7] tracking-[-0.03em] text-white/85 sm:text-[15px]">
                Découvrez d&apos;autres formats TerraGo pour coller à vos objectifs d&apos;équipe.
              </p>
            </ScrollAnimate>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5">
              {related.map((item, i) => (
                <ScrollAnimate key={item.slug} delay={i * 80}>
                  <Link
                    href={seminaireEnjeuPath(item.slug)}
                    className="group relative block aspect-[21/9] overflow-hidden sm:aspect-[2.2/1]"
                    style={{ borderRadius: HOME_RADIUS }}
                  >
                    <img
                      src={item.heroImage}
                      alt={item.heroImageAlt}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                    <p className="absolute bottom-5 left-0 right-0 z-[1] px-5 font-sans text-[22px] leading-[1.12] tracking-[-0.05em] text-white sm:bottom-6 sm:px-6 sm:text-[26px]">
                      <span className="font-normal">Séminaire</span>
                      <br />
                      <span className="font-bold">{preserveAcronyms(item.name)}</span>
                    </p>
                  </Link>
                </ScrollAnimate>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Link href="/seminaires-entreprise" className={homeHeroOutlineButtonClass}>
                <span aria-hidden>→</span>
                Voir tous nos séminaires
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SeminaireEnjeu;
