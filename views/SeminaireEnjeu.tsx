'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import {
  HOME_COLORS,
  HOME_RADIUS,
  homeFramedHeroWideAspectClass,
  homeFramedHeroSectionClass,
  homeFramedHeroH1Class,
  homeFramedHeroOverlayClass,
  homeFramedHeroOverlayInnerClass,
  bottomImageGradientClass,
  homeCtaOutlineClass,
  homeCtaOutlineGhostClass,
  homeHeroOutlineButtonClass,
  homeOnDarkOutlineButtonClass,
  homeParagraphClass,
  faqAnswerClass,
  homeSectionPadding,
} from '../components/home/homeStyles';
import FramedHeroImage from '../components/FramedHeroImage';
import PhotoCopyright from '../components/PhotoCopyright';
import {
  getSeminaireEnjeu,
  seminaireEnjeuPath,
  type SeminaireEnjeu as EnjeuData,
  type SeminaireEnjeuCta,
  type SeminaireEnjeuExample,
  type SeminaireEnjeuLinkBlock,
  type SeminaireEnjeuTheme,
} from '../lib/seminaireEnjeux';
import {
  EXEMPLES_SEMINAIRE_ENTREPRISE_PATH,
  findSeminaireByLinkHint,
  seminaireExempleHrefFromHints,
} from '../lib/exemplesSeminaireEntreprise';
import { getImageCopyright } from '../lib/imageCopyrights';
import { LIEUX, lieuDestinationPath } from '../lib/lieux';
import { protectedImageProps } from '../lib/protectedImage';
import {
  SEMINAIRE_FORMAT_LABELS,
  fetchSeminaires,
  type Format,
  type Seminaire,
  type SeminaireFormatId,
} from '../lib/seminaires';

const S_ORANGE =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/s-picto-orange.png';

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
  'au-vert': `${HOME_EMOJI}/emoji-arbre.png`,
  original: `${HOME_EMOJI}/piment.png`,
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

/** Rend un texte avec liens `[[libellé|/chemin]]`. */
function LinkedText({
  text,
  className,
  linkClassName = 'font-semibold text-[#0c1d22] underline decoration-[#ec6435]/70 underline-offset-[3px] transition-colors hover:decoration-[#ec6435]',
}: {
  text: string;
  className?: string;
  linkClassName?: string;
}) {
  const parts = text.split(/(\[\[[^\]]+\|[^\]]+\]\])/g);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        const m = part.match(/^\[\[([^\]|]+)\|([^\]]+)\]\]$/);
        if (!m) return <React.Fragment key={i}>{preserveAcronyms(part)}</React.Fragment>;
        return (
          <Link key={i} href={m[2]} className={linkClassName}>
            {preserveAcronyms(m[1])}
          </Link>
        );
      })}
    </span>
  );
}

const EnjeuCtaButton: React.FC<{
  cta: SeminaireEnjeuCta;
  className: string;
  onModal: () => void;
}> = ({ cta, className, onModal }) => {
  if ('action' in cta && cta.action === 'modal') {
    return (
      <button type="button" onClick={onModal} className={className}>
        {cta.label}
      </button>
    );
  }
  if ('href' in cta) {
    return (
      <Link href={cta.href} className={className}>
        {cta.label}
      </Link>
    );
  }
  return null;
};

const HERO_CTA_MOBILE_LABEL = 'Parlons de votre séminaire';

/** Libellé hero : version courte sur mobile pour les CTA « Parlons de votre… ». */
function HeroCtaLabel({ label }: { label: string }) {
  const desktop = preserveAcronyms(label);
  if (!label.toLowerCase().startsWith('parlons de votre')) {
    return desktop;
  }
  return (
    <>
      <span className="sm:hidden">{HERO_CTA_MOBILE_LABEL}</span>
      <span className="hidden sm:inline">{desktop}</span>
    </>
  );
}

/** Rend un titre avec une portion en gras (correspondance exacte après normalisation des sigles). */
function TitleWithBold({
  full,
  bold,
  boldClassName = 'font-bold',
}: {
  full: string;
  bold?: string;
  boldClassName?: string;
}) {
  const text = preserveAcronyms(full);
  const boldText = bold ? preserveAcronyms(bold) : '';
  if (!boldText) return <>{text}</>;
  const i = text.indexOf(boldText);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className={boldClassName}>{boldText}</span>
      {text.slice(i + boldText.length)}
    </>
  );
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
}> = ({ fmt }) => {
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
    </div>
  );
};

const ExampleSeminarBlock: React.FC<{
  example: SeminaireEnjeuExample;
  displayTitle: string;
  exampleLead?: string;
}> = ({ example, displayTitle, exampleLead }) => {
  const [seminaire, setSeminaire] = useState<Seminaire | null>(null);
  const [loading, setLoading] = useState(true);
  const [openFormat, setOpenFormat] = useState<SeminaireFormatId | null>(null);
  const [detailHref, setDetailHref] = useState(EXEMPLES_SEMINAIRE_ENTREPRISE_PATH);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setOpenFormat(null);
    fetchSeminaires()
      .then((all) => {
        if (cancelled) return;
        const found =
          findSeminaireByLinkHint(
            all,
            example.seminaireSlug,
            example.producerName,
          ) ?? null;
        setSeminaire(found);
        setDetailHref(
          seminaireExempleHrefFromHints(
            all,
            example.seminaireSlug,
            example.producerName,
          ),
        );
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setSeminaire(null);
          setDetailHref(EXEMPLES_SEMINAIRE_ENTREPRISE_PATH);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [example.seminaireSlug, example.producerName]);
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
        {exampleLead ? (
          <p className={`mt-4 max-w-2xl ${homeParagraphClass}`}>
            {preserveAcronyms(exampleLead)}
          </p>
        ) : null}
      </ScrollAnimate>

      <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:mt-10 lg:grid-cols-2 lg:gap-10">
        <ScrollAnimate>
          <div
            className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:min-h-[420px] lg:h-full"
            style={{ borderRadius: HOME_RADIUS }}
          >
            <Image
              src={seminaire?.images[0] || example.image}
              alt={example.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {getImageCopyright(seminaire?.images[0] || example.image) ? (
              <PhotoCopyright
                label={getImageCopyright(seminaire?.images[0] || example.image)!}
              />
            ) : null}
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
          ) : (
            <div className="mt-8 flex flex-col">
              {formatRows.length > 0 ? (
                formatRows.map((row) => {
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
                            <ExampleFormatPanel fmt={row.fmt} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : null}
              <Link
                href={detailHref}
                className={`mt-8 self-start ${homeCtaOutlineGhostClass}`}
              >
                Découvrir le séminaire chez {example.producerName}
              </Link>
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
              className="group flex w-full items-center gap-3 py-3.5 text-left sm:gap-4 sm:py-4"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="min-w-0 flex-1 font-sans text-[14px] font-bold leading-[1.3] tracking-[-0.03em] text-[#0c1d22] transition-opacity group-hover:opacity-70 sm:text-[15px]">
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
                <p className={`${faqAnswerClass} pb-4 pr-8`}>
                  <LinkedText text={item.answer} />
                </p>
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

function lieuFromHref(href: string) {
  return LIEUX.find((lieu) => lieuDestinationPath(lieu.slug) === href);
}

const LinkBlockPhotoCard: React.FC<{ item: SeminaireEnjeuLinkBlock }> = ({ item }) => {
  const lieu = lieuFromHref(item.href);
  if (!lieu) return null;
  const copyright = getImageCopyright(lieu.heroImage) ?? lieu.heroImageCopyright;

  return (
    <Link
      href={item.href}
      className="relative flex aspect-[3/3.4] h-full w-full overflow-hidden"
      style={{ borderRadius: HOME_RADIUS }}
    >
      <Image
        src={lieu.heroImage}
        alt={lieu.heroImageAlt}
        fill
        sizes="80vw"
        className="pointer-events-none select-none object-cover"
        {...protectedImageProps}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
      {copyright ? <PhotoCopyright className="z-[2]" label={copyright} /> : null}
      <p className="pointer-events-none absolute inset-x-0 bottom-9 z-[1] px-5 font-sans text-[28px] font-bold leading-[1.08] tracking-[-0.075em] text-white">
        {preserveAcronyms(item.title)}
      </p>
    </Link>
  );
};

const LinkBlockTextCard: React.FC<{
  item: SeminaireEnjeuLinkBlock;
  background?: string;
  dark?: boolean;
}> = ({ item, background = '#ffffff', dark = false }) => (
  <Link
    href={item.href}
    className="flex w-full flex-col p-5"
    style={{
      borderRadius: HOME_RADIUS,
      background: dark ? 'rgba(255,255,255,0.1)' : background,
    }}
  >
    <p
      className={`font-sans text-[16px] font-bold leading-[1.25] tracking-[-0.04em] ${
        dark ? 'text-white' : 'text-[#0c1d22]'
      }`}
    >
      {preserveAcronyms(item.title)}
    </p>
    <p
      className={`mt-2.5 font-sans text-[13px] font-normal leading-[1.65] tracking-[-0.03em] ${
        dark ? 'text-white/80' : 'text-[#0c1d22]/65'
      }`}
    >
      {preserveAcronyms(item.text)}
    </p>
    <span className="mt-4 inline-flex font-sans text-[13px] font-semibold tracking-[-0.02em] text-[#ec6435]">
      → {item.linkLabel ?? item.title}
    </span>
  </Link>
);

const LinkBlockCard: React.FC<{
  item: SeminaireEnjeuLinkBlock;
  background?: string;
  dark?: boolean;
}> = ({ item, background, dark }) => {
  if (lieuFromHref(item.href)) return <LinkBlockPhotoCard item={item} />;
  return <LinkBlockTextCard item={item} background={background} dark={dark} />;
};

const LinkBlockSwipe: React.FC<{
  items: SeminaireEnjeuLinkBlock[];
  ariaLabel: string;
  dotsLabel: string;
  cardBackground?: string;
  dark?: boolean;
}> = ({ items, ariaLabel, dotsLabel, cardBackground, dark = false }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const swipe = useSwipeTrack(scrollRef, items.length);

  return (
    <div className="sm:hidden">
      <div
        ref={scrollRef}
        className="flex min-w-0 cursor-grab snap-x snap-mandatory items-start gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-x pb-1 active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollPaddingInline: '1.25rem',
          paddingLeft: '1.25rem',
          paddingRight: '1.25rem',
        }}
        role="list"
        aria-label={ariaLabel}
      >
        {items.map((item) => (
          <div
            key={item.title}
            className={`flex shrink-0 snap-center ${
              lieuFromHref(item.href)
                ? 'w-[56vw] max-w-[230px]'
                : 'w-[62vw] max-w-[250px]'
            }`}
            role="listitem"
          >
            <LinkBlockCard item={item} background={cardBackground} dark={dark} />
          </div>
        ))}
      </div>
      <SwipeDots
        count={items.length}
        activeIndex={swipe.activeIndex}
        onSelect={swipe.goTo}
        label={dotsLabel}
        dark={dark}
        className="mt-5"
      />
    </div>
  );
};

const LinkBlockGrid: React.FC<{
  items: SeminaireEnjeuLinkBlock[];
  cardBackground?: string;
  ariaLabel?: string;
}> = ({ items, cardBackground = '#ffffff', ariaLabel = 'Lieux' }) => (
  <div className="relative mt-8 sm:mx-auto sm:mt-10 sm:max-w-6xl sm:px-6 lg:px-8">
    <LinkBlockSwipe
      items={items}
      ariaLabel={ariaLabel}
      dotsLabel="Lieu"
      cardBackground={cardBackground}
    />
    <div className="hidden gap-8 sm:grid sm:grid-cols-2 sm:gap-x-10 sm:gap-y-9">
      {items.map((item, i) => (
        <ScrollAnimate key={item.title} delay={i * 50}>
          <h3 className="font-sans text-[16px] font-bold tracking-[-0.03em] text-[#0c1d22] sm:text-[17px]">
            {preserveAcronyms(item.title)}
          </h3>
          <p className={`mt-2.5 ${homeParagraphClass}`}>{preserveAcronyms(item.text)}</p>
          <Link
            href={item.href}
            className="mt-3 inline-flex font-sans text-[13px] font-semibold tracking-[-0.02em] text-[#ec6435] transition-opacity hover:opacity-70 sm:text-[14px]"
          >
            → {item.linkLabel ?? item.title}
          </Link>
        </ScrollAnimate>
      ))}
    </div>
  </div>
);

const formatRowButtonClass =
  'inline-flex w-fit max-w-full shrink-0 items-center justify-center rounded-full border border-white px-5 py-1.5 text-center text-[11px] font-bold tracking-[-0.02em] text-white transition-colors hover:bg-white hover:text-[#0c1d22] sm:px-10 sm:py-2.5 sm:text-[13px]';

const FormatRows: React.FC<{
  items: SeminaireEnjeuLinkBlock[];
  dark?: boolean;
  ariaLabel?: string;
}> = ({ items, dark = false, ariaLabel = 'Enjeux' }) => (
  <div className="relative mt-8 sm:mx-auto sm:mt-10 sm:max-w-3xl sm:px-8">
    <LinkBlockSwipe
      items={items}
      ariaLabel={ariaLabel}
      dotsLabel="Enjeu"
      dark={dark}
    />
    <div
      className={`hidden flex-col border-t sm:flex ${
        dark ? 'border-white/15' : 'border-[rgba(12,29,34,0.12)]'
      }`}
    >
      {items.map((item) => (
        <div
          key={item.title}
          className={`flex flex-col gap-3 border-b py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-6 ${
            dark ? 'border-white/15' : 'border-[rgba(12,29,34,0.12)]'
          }`}
        >
          <div className="min-w-0 flex-1">
            <p
              className={`font-sans text-[15px] font-bold tracking-[-0.03em] sm:text-[16px] ${
                dark ? 'text-white' : 'text-[#0c1d22]'
              }`}
            >
              {preserveAcronyms(item.title)}
            </p>
            <p
              className={`mt-1 font-sans text-[13px] font-normal leading-[1.65] tracking-[-0.03em] sm:text-[14px] ${
                dark ? 'text-white/80' : 'text-[#0c1d22]/65'
              }`}
            >
              {preserveAcronyms(item.text)}
            </p>
          </div>
          <Link href={item.href} className={dark ? formatRowButtonClass : homeCtaOutlineGhostClass}>
            {preserveAcronyms(item.linkLabel ?? item.title)}
          </Link>
        </div>
      ))}
    </div>
  </div>
);

function useSwipeTrack(trackRef: React.RefObject<HTMLDivElement | null>, length: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrollingRef = useRef(false);

  const goTo = useCallback(
    (index: number, behavior: ScrollBehavior = 'smooth') => {
      const track = trackRef.current;
      if (!track || length === 0) return;
      const clamped = ((index % length) + length) % length;
      const slide = track.children[clamped] as HTMLElement | undefined;
      if (!slide) return;
      isScrollingRef.current = true;
      const first = track.firstElementChild as HTMLElement;
      const targetLeft = slide.offsetLeft - first.offsetLeft;
      track.scrollTo({ left: targetLeft, behavior });
      setActiveIndex(clamped);
      window.setTimeout(() => {
        isScrollingRef.current = false;
      }, behavior === 'smooth' ? 450 : 50);
    },
    [trackRef, length],
  );

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
  dark?: boolean;
}> = ({ count, activeIndex, onSelect, className = '', label = 'Élément', dark = false }) => (
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
          background:
            i === activeIndex
              ? HOME_COLORS.orange
              : dark
                ? 'rgba(255,255,255,0.28)'
                : 'rgba(12,29,34,0.18)',
        }}
      />
    ))}
  </div>
);

const ThemeCard: React.FC<{
  theme: SeminaireEnjeuTheme;
  cardBackground?: string;
  iconBackground?: string;
}> = ({
  theme,
  cardBackground = HOME_COLORS.gray,
  iconBackground = '#ffffff',
}) => (
  <article
    role="listitem"
    className="flex h-full w-full flex-col p-5 sm:p-6"
    style={{ borderRadius: HOME_RADIUS, background: cardBackground }}
  >
    <span
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] text-[24px] leading-none sm:h-14 sm:w-14 sm:rounded-[18px] sm:text-[28px]"
      style={{ background: iconBackground }}
      aria-hidden
    >
      {theme.emoji}
    </span>
    <div className="mt-4 flex min-h-0 flex-1 flex-col">
      <p className="font-sans text-[16px] font-bold leading-[1.25] tracking-[-0.04em] text-[#0c1d22] sm:text-[17px]">
        {preserveAcronyms(theme.title)}
      </p>
      <p className="mt-2 font-sans text-[13px] font-normal leading-[1.65] tracking-[-0.03em] text-[#0c1d22]/65 sm:text-[14px]">
        {preserveAcronyms(theme.description)}
      </p>
    </div>
  </article>
);

const ThemesRow: React.FC<{
  themes: SeminaireEnjeuTheme[];
  ariaLabel?: string;
  cardBackground?: string;
  iconBackground?: string;
}> = ({
  themes,
  ariaLabel = 'Thématiques',
  cardBackground,
  iconBackground,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const swipe = useSwipeTrack(scrollRef, themes.length);
  const gridColsClass =
    themes.length === 3
      ? 'sm:grid-cols-3'
      : themes.length === 4
        ? 'sm:grid-cols-2 lg:grid-cols-4'
        : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className="mt-10 sm:mt-12">
      {/* Mobile : carousel swipable */}
      <div
        ref={scrollRef}
        className="flex min-w-0 cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-x pb-1 active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:hidden"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollPaddingInline: '1.25rem',
          paddingLeft: '1.25rem',
          paddingRight: '1.25rem',
          marginLeft: 'calc(-1.25rem)',
          marginRight: 'calc(-1.25rem)',
        }}
        role="list"
        aria-label={ariaLabel}
      >
        {themes.map((theme) => (
          <div
            key={theme.title}
            className="w-[78vw] max-w-[320px] shrink-0 snap-center"
          >
            <ThemeCard
              theme={theme}
              cardBackground={cardBackground}
              iconBackground={iconBackground}
            />
          </div>
        ))}
      </div>

      <SwipeDots
        count={themes.length}
        activeIndex={swipe.activeIndex}
        onSelect={swipe.goTo}
        label="Thématique"
        className="mt-5 sm:hidden"
      />

      {/* Desktop / tablette : grille */}
      <div
        className={`hidden gap-4 sm:grid sm:gap-5 ${gridColsClass}`}
        role="list"
        aria-label={ariaLabel}
      >
        {themes.map((theme, i) => (
          <ScrollAnimate key={theme.title} delay={i * 50} className="h-full min-w-0">
            <ThemeCard
              theme={theme}
              cardBackground={cardBackground}
              iconBackground={iconBackground}
            />
          </ScrollAnimate>
        ))}
      </div>
    </div>
  );
};

const ThemesSection: React.FC<{
  enjeu: EnjeuData;
  onModal: () => void;
}> = ({ enjeu, onModal }) => {
  if (!enjeu.themes || enjeu.themes.length === 0) return null;
  const sectionBg = enjeu.themesBackground ?? '#ffffff';
  const onGray =
    sectionBg === HOME_COLORS.gray || sectionBg.toLowerCase() === '#f4f4f4';
  const cardBackground = onGray ? '#ffffff' : HOME_COLORS.gray;
  const iconBackground = onGray ? HOME_COLORS.gray : '#ffffff';
  return (
    <section
      className="relative"
      style={{
        paddingTop: homeSectionPadding,
        paddingBottom: homeSectionPadding,
        background: sectionBg,
      }}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollAnimate>
          <h2 className={`max-w-3xl ${sectionTitleClass}`}>
            <TitleWithBold
              full={
                enjeu.themesTitle ??
                'Quelles thématiques aborder lors d\u2019un séminaire RSE ?'
              }
              bold={enjeu.themesTitleBold}
              boldClassName="font-bold text-[#ec6435]"
            />
          </h2>
          {enjeu.themesIntro ? (
            <p className={`mt-5 max-w-2xl ${homeParagraphClass}`}>
              {preserveAcronyms(enjeu.themesIntro)}
            </p>
          ) : null}
        </ScrollAnimate>

        <ThemesRow
          themes={enjeu.themes}
          ariaLabel={enjeu.themesTitle ?? 'Thématiques'}
          cardBackground={cardBackground}
          iconBackground={iconBackground}
        />
        {enjeu.themesCta ? (
          <div className="mt-10 flex justify-center sm:mt-12">
            <EnjeuCtaButton
              cta={enjeu.themesCta}
              className={homeCtaOutlineGhostClass}
              onModal={onModal}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
};

const ProgramSection: React.FC<{
  enjeu: EnjeuData;
  shortDisplayTitle: string;
  onModal: () => void;
}> = ({ enjeu, shortDisplayTitle, onModal }) => (
  <section
    className="relative"
    style={{
      paddingTop: homeSectionPadding,
      paddingBottom: homeSectionPadding,
      background: enjeu.programBackground ?? '#ffffff',
    }}
  >
    <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
        <ScrollAnimate>
          <h2 className={sectionTitleClass}>
            {enjeu.programTitle ? (
              <TitleWithBold
                full={enjeu.programTitle}
                bold={enjeu.programTitleBold}
                boldClassName="font-bold text-[#ec6435]"
              />
            ) : (
              <>
                Votre{' '}
                <span className="font-bold" style={{ color: HOME_COLORS.orange }}>
                  déroulé type
                </span>{' '}
                pour un {shortDisplayTitle}.
              </>
            )}
          </h2>
          <p className={`mt-5 ${homeParagraphClass}`}>
            {enjeu.programIntro ? (
              preserveAcronyms(enjeu.programIntro)
            ) : (
              <>
                <span className="font-semibold text-[#0c1d22] underline decoration-[#ec6435] decoration-2 underline-offset-[4px]">
                  Pour résumer :
                </span>{' '}
                une journée riche et fluide, du café d&apos;accueil au repas
                guinguette — modulable selon la taille du groupe et déclinable en
                format résidentiel 2&nbsp;jours.
              </>
            )}
          </p>
        </ScrollAnimate>

        <ScrollAnimate delay={80}>
          <ProgramAccordion items={enjeu.programHighlights} />
        </ScrollAnimate>
      </div>

      <div className="mt-10 flex justify-center sm:mt-12">
        <button type="button" onClick={onModal} className={homeCtaOutlineGhostClass}>
          Demander un devis
        </button>
      </div>
    </div>
  </section>
);

type Props = {
  enjeu: EnjeuData;
};

const SeminaireEnjeu: React.FC<Props> = ({ enjeu }) => {
  const { openModal } = useModal();
  const related = enjeu.relatedSlugs
    .map((slug) => getSeminaireEnjeu(slug))
    .filter((item): item is EnjeuData => Boolean(item));

  const introParagraphs = [enjeu.lead, ...enjeu.body.slice(0, 2)]
    .filter((p) => Boolean(p?.trim()));
  const highlightPros = (
    enjeu.whyHighlights ??
    enjeu.body.slice(2, 4).map((text, i) => ({
      title: enjeu.experiences[i] ?? `Point fort ${i + 1}`,
      text,
    }))
  );
  const heroPicto = HERO_PICTO_BY_SLUG[enjeu.slug];
  const displayTitle = titleForSentence(enjeu.title);
  const shortDisplayTitle = titleForSentence(enjeu.shortTitle ?? enjeu.title);
  const whyCta: SeminaireEnjeuCta = enjeu.whyCta ?? {
    label: 'Demander un devis',
    action: 'modal',
  };
  const whyCtaIsLink = 'href' in whyCta;
  const whyCtaOnOrangeBase = whyCtaIsLink
    ? 'w-fit max-w-full items-center justify-center rounded-full border border-white bg-transparent px-5 py-1.5 text-center text-[11px] font-bold tracking-[-0.02em] text-white transition-colors hover:bg-white hover:text-[#ec6435] sm:px-10 sm:py-2.5 sm:text-[13px]'
    : 'w-fit items-center justify-center rounded-full border border-white bg-transparent px-6 py-2 text-[12px] font-bold tracking-[-0.02em] text-white transition-colors hover:bg-white hover:text-[#ec6435] sm:px-10 sm:py-2.5 sm:text-[13px]';
  const whyCtaOnOrangeDesktop = `mt-8 hidden ${whyCtaOnOrangeBase} lg:inline-flex sm:mt-9`;
  const whyCtaOnOrangeMobile = `inline-flex ${whyCtaOnOrangeBase}`;
  const linkedOnOrange =
    'font-semibold text-white underline decoration-white/70 underline-offset-[3px] transition-colors hover:decoration-white';
  const heroCta: SeminaireEnjeuCta = enjeu.heroCta ?? {
    label: `Parlons de votre ${enjeu.shortTitle ?? titleForSentence(enjeu.title)}`,
    action: 'modal',
  };
  const heroCtaIsModal = !('href' in heroCta);

  return (
    <div className="overflow-x-hidden bg-white font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* ── HERO ── */}
      <section className={homeFramedHeroSectionClass}>
        <div className="relative mx-auto max-w-[1280px] px-5 pb-2 sm:px-8">
          {heroPicto ? (
            <Image
              src={heroPicto}
              alt=""
              aria-hidden
              width={224}
              height={224}
              className="pointer-events-none absolute bottom-0 left-0 z-30 h-36 w-36 -translate-x-[35%] translate-y-[42%] object-contain drop-shadow-md sm:h-48 sm:w-48 lg:h-56 lg:w-56"
            />
          ) : null}
          <div
            className={`relative ${homeFramedHeroWideAspectClass}`}
            style={{ borderRadius: HOME_RADIUS }}
          >
            <FramedHeroImage src={enjeu.heroImage} alt={enjeu.heroImageAlt} />
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
              <p className="font-sans text-[12px] font-bold tracking-[-0.02em] text-white/90 sm:text-[13px]">
                {enjeu.eyebrow}
              </p>
              <h1 className={`mt-4 max-w-4xl pt-1 font-normal sm:mt-6 ${homeFramedHeroH1Class}`}>
                {enjeu.shortTitle ? (
                  <>
                    Organisez votre{' '}
                    <span className="font-bold">{shortDisplayTitle}</span>
                    {displayTitle.startsWith(shortDisplayTitle)
                      ? displayTitle.slice(shortDisplayTitle.length)
                      : ''}
                    .
                  </>
                ) : (
                  <>
                    Organisez <span className="font-bold">votre {displayTitle}</span>.
                  </>
                )}
              </h1>
              <p className="mt-3 max-w-xl font-sans text-[13px] font-normal leading-[1.5] tracking-[-0.02em] text-white/85 sm:max-w-2xl sm:text-[13px] lg:max-w-3xl">
                {preserveAcronyms(enjeu.subtitle)}
              </p>
              {heroCtaIsModal ? (
                <button
                  type="button"
                  onClick={() => openModal()}
                  className={`mt-7 ${homeHeroOutlineButtonClass} sm:mt-9`}
                  style={{ background: 'rgba(12, 29, 34, 0.12)' }}
                >
                  <HeroCtaLabel label={heroCta.label} />
                </button>
              ) : (
                <Link
                  href={'href' in heroCta ? heroCta.href : '/seminaires-entreprise'}
                  className={`mt-7 ${homeHeroOutlineButtonClass} sm:mt-9`}
                  style={{ background: 'rgba(12, 29, 34, 0.12)' }}
                >
                  <HeroCtaLabel label={heroCta.label} />
                </Link>
              )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section
        style={{
          paddingTop: 'clamp(2.5rem, 5vw, 4rem)',
          paddingBottom: 'clamp(2.5rem, 5vw, 4rem)',
          background: enjeu.introBackground ?? '#ffffff',
        }}
      >
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <ScrollAnimate>
            <div className="space-y-3.5">
              {introParagraphs.map((p) => (
                <p key={p.slice(0, 40)} className={homeParagraphClass}>
                  <LinkedText text={p} />
                </p>
              ))}
            </div>
            {enjeu.introCta ? (
              <div className="mt-8 flex justify-center sm:mt-9">
                <EnjeuCtaButton
                  cta={enjeu.introCta}
                  className={homeCtaOutlineGhostClass}
                  onModal={() => openModal()}
                />
              </div>
            ) : null}
            {enjeu.afterIntro ? (
              <div className="mt-14 sm:mt-16">
                <h2 className={sectionTitleClass}>
                  <TitleWithBold
                    full={enjeu.afterIntro.title}
                    bold={enjeu.afterIntro.titleBold}
                  />
                </h2>
                <div className="mt-5 space-y-3.5">
                  {enjeu.afterIntro.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)} className={homeParagraphClass}>
                      <LinkedText text={p} />
                    </p>
                  ))}
                </div>
              </div>
            ) : null}
          </ScrollAnimate>
        </div>
      </section>

      {/* ── GROS + ── */}
      <section
        className="relative py-3 sm:py-4"
        style={{ background: enjeu.introBackground ?? '#ffffff' }}
      >
        <div className="relative left-1/2 w-[calc(100%+16px)] -translate-x-1/2 sm:w-[calc(100%+20px)]">
          <div
            className="overflow-hidden px-[calc(1.25rem+8px)] pt-16 pb-0 sm:px-[calc(2rem+10px)] lg:px-[calc(2.5rem+10px)] lg:py-20"
            style={{
              background: enjeu.whyBackground ?? HOME_COLORS.orange,
              borderRadius: '42px',
            }}
          >
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.7fr)] lg:items-stretch lg:gap-8 xl:gap-10">
              <ScrollAnimate className="flex flex-col justify-start lg:pr-2">
                <h2 className={sectionTitleOnOrangeClass}>
                  {enjeu.whyTitle ? (
                    <TitleWithBold full={enjeu.whyTitle} bold={enjeu.whyTitleBold} />
                  ) : (
                    <>
                      Pourquoi choisir ce{' '}
                      <span className="font-bold">{displayTitle}</span>&nbsp;?
                    </>
                  )}
                </h2>
                {enjeu.whyLead ? (
                  <p className="mt-4 max-w-xl font-sans text-[13px] font-normal leading-[1.7] tracking-[-0.03em] text-white/90 sm:text-[14px]">
                    {preserveAcronyms(enjeu.whyLead)}
                  </p>
                ) : null}

                <div className="mt-7 space-y-6 sm:mt-8">
                  {highlightPros.map((pro) => (
                    <div key={pro.title}>
                      <h3 className="inline font-sans text-[15px] font-semibold tracking-[-0.03em] text-white underline decoration-white/80 underline-offset-[5px] sm:text-[16px]">
                        {preserveAcronyms(pro.title)}
                      </h3>
                      <p className="mt-2.5 max-w-xl font-sans text-[13px] font-normal leading-[1.7] tracking-[-0.03em] text-white/90 sm:text-[14px]">
                        <LinkedText text={pro.text} linkClassName={linkedOnOrange} />
                      </p>
                    </div>
                  ))}
                </div>

                {!enjeu.experiencesSection ? (
                  <>
                    <p className="mt-7 font-sans text-[13px] font-normal leading-[1.7] tracking-[-0.03em] text-white/90 sm:text-[14px]">
                      Ce que vos équipes vont vivre :
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {enjeu.experiences.map((f) => (
                        <li
                          key={f}
                          className="font-sans text-[13px] font-normal leading-[1.6] tracking-[-0.03em] text-white/95 before:mr-2 before:content-['•'] sm:text-[14px]"
                        >
                          <LinkedText text={f} linkClassName={linkedOnOrange} />
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}

                {!enjeu.hideWhyCta ? (
                  <EnjeuCtaButton
                    cta={whyCta}
                    className={whyCtaOnOrangeDesktop}
                    onModal={() => openModal()}
                  />
                ) : null}
              </ScrollAnimate>

              <ScrollAnimate delay={80} className="flex h-full justify-center lg:justify-end">
                <div
                  className="relative aspect-[4/5] w-full max-w-[280px] overflow-hidden sm:max-w-[320px] lg:aspect-auto lg:h-full lg:min-h-0 lg:max-w-[300px] xl:max-w-[340px]"
                  style={{ borderRadius: '28px' }}
                >
                  <Image
                    src={enjeu.whyImage}
                    alt={enjeu.whyImageAlt}
                    fill
                    sizes="(max-width: 1024px) 320px, 340px"
                    className="object-cover"
                  />
                </div>
              </ScrollAnimate>
            </div>

            {!enjeu.hideWhyCta ? (
              <div className="flex justify-center py-8 lg:hidden">
                <EnjeuCtaButton
                  cta={whyCta}
                  className={whyCtaOnOrangeMobile}
                  onModal={() => openModal()}
                />
              </div>
            ) : (
              <div className="pb-16 lg:hidden" aria-hidden />
            )}
          </div>
        </div>
      </section>

      {/* ── EXPÉRIENCES ── */}
      {enjeu.experiencesSection ? (
        <section
          className="relative"
          style={{
            paddingTop: homeSectionPadding,
            paddingBottom: homeSectionPadding,
            background: enjeu.experiencesSection.background ?? '#ffffff',
          }}
        >
          {enjeu.experiencesSection.layout === 'image-left' &&
          enjeu.experiencesSection.image ? (
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.55fr)] lg:items-stretch lg:gap-8 xl:gap-10">
              <ScrollAnimate delay={80} className="flex h-full justify-center lg:justify-start">
                <div
                  className="relative aspect-[4/5] w-full max-w-[280px] overflow-hidden sm:max-w-[320px] lg:aspect-auto lg:h-full lg:min-h-0 lg:max-w-[300px] xl:max-w-[340px]"
                  style={{ borderRadius: '28px' }}
                >
                  <Image
                    src={enjeu.experiencesSection.image}
                    alt={enjeu.experiencesSection.imageAlt ?? ''}
                    fill
                    sizes="(max-width: 1024px) 320px, 340px"
                    className="object-cover"
                  />
                </div>
              </ScrollAnimate>

              <ScrollAnimate className="flex flex-col justify-start lg:pl-2">
                <h2 className={sectionTitleClass}>
                  <TitleWithBold
                    full={enjeu.experiencesSection.title}
                    bold={enjeu.experiencesSection.titleBold}
                  />
                </h2>
                <p className={`mt-5 ${homeParagraphClass}`}>
                  {preserveAcronyms(enjeu.experiencesSection.intro)}
                </p>
                <div className="mt-5 space-y-3.5">
                  {enjeu.experiencesSection.body.map((p) => (
                    <p key={p.slice(0, 40)} className={homeParagraphClass}>
                      <LinkedText text={p} />
                    </p>
                  ))}
                </div>
                <p className="mt-8 font-sans text-[16px] font-bold tracking-[-0.03em] text-[#0c1d22] sm:text-[17px]">
                  {preserveAcronyms(
                    enjeu.experiencesSection.listLead ??
                      'Ce que vos équipes peuvent vivre :',
                  )}
                </p>
                <ul className="mt-4 space-y-2">
                  {enjeu.experiences.map((f) => (
                    <li
                      key={f}
                      className="font-sans text-[14px] font-normal leading-[1.6] tracking-[-0.03em] text-[#0c1d22]/75 before:mr-2 before:content-['•'] sm:text-[15px]"
                    >
                      {preserveAcronyms(f)}
                    </li>
                  ))}
                </ul>
                {enjeu.experiencesSection.cta ? (
                  <div className="mt-10 flex justify-center lg:justify-start">
                    <EnjeuCtaButton
                      cta={enjeu.experiencesSection.cta}
                      className={homeCtaOutlineGhostClass}
                      onModal={() => openModal()}
                    />
                  </div>
                ) : null}
              </ScrollAnimate>
            </div>
          ) : enjeu.experiencesSection.layout === 'stacked' ? (
            <div className="mx-auto max-w-3xl px-5 sm:px-8">
              <ScrollAnimate>
                <h2 className={sectionTitleClass}>
                  <TitleWithBold
                    full={enjeu.experiencesSection.title}
                    bold={enjeu.experiencesSection.titleBold}
                  />
                </h2>
                <p className={`mt-5 ${homeParagraphClass}`}>
                  {preserveAcronyms(enjeu.experiencesSection.intro)}
                </p>
                <div className="mt-5 space-y-3.5">
                  {enjeu.experiencesSection.body.map((p) => (
                    <p key={p.slice(0, 40)} className={homeParagraphClass}>
                      <LinkedText text={p} />
                    </p>
                  ))}
                </div>
                <p className="mt-8 font-sans text-[16px] font-bold tracking-[-0.03em] text-[#0c1d22] sm:text-[17px]">
                  {preserveAcronyms(
                    enjeu.experiencesSection.listLead ??
                      'Ce que vos équipes peuvent vivre :',
                  )}
                </p>
                <ul className="mt-4 space-y-2">
                  {enjeu.experiences.map((f) => (
                    <li
                      key={f}
                      className="font-sans text-[14px] font-normal leading-[1.6] tracking-[-0.03em] text-[#0c1d22]/75 before:mr-2 before:content-['•'] sm:text-[15px]"
                    >
                      {preserveAcronyms(f)}
                    </li>
                  ))}
                </ul>
              </ScrollAnimate>
              {enjeu.experiencesSection.cta ? (
                <div className="mt-10 flex justify-center">
                  <EnjeuCtaButton
                    cta={enjeu.experiencesSection.cta}
                    className={homeCtaOutlineGhostClass}
                    onModal={() => openModal()}
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-x-8 gap-y-6 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.7fr)] xl:gap-x-10">
              <ScrollAnimate className="lg:col-start-1 lg:row-start-1 lg:pr-2">
                <h2 className={sectionTitleClass}>
                  <TitleWithBold
                    full={enjeu.experiencesSection.title}
                    bold={enjeu.experiencesSection.titleBold}
                  />
                </h2>
              </ScrollAnimate>

              <ScrollAnimate className="lg:col-start-1 lg:row-start-2 lg:pr-2">
                <p className={homeParagraphClass}>
                  {preserveAcronyms(enjeu.experiencesSection.intro)}
                </p>
                <div className="mt-5 space-y-3.5">
                  {enjeu.experiencesSection.body.map((p) => (
                    <p key={p.slice(0, 40)} className={homeParagraphClass}>
                      <LinkedText text={p} />
                    </p>
                  ))}
                </div>
              </ScrollAnimate>

              <ScrollAnimate delay={80} className="lg:col-start-2 lg:row-start-2">
                <p className="font-sans text-[16px] font-bold tracking-[-0.03em] text-[#0c1d22] sm:text-[17px]">
                  {preserveAcronyms(
                    enjeu.experiencesSection.listLead ??
                      'Ce que vos équipes peuvent vivre :',
                  )}
                </p>
                <ul className="mt-4 space-y-2">
                  {enjeu.experiences.map((f) => (
                    <li
                      key={f}
                      className="font-sans text-[14px] font-normal leading-[1.6] tracking-[-0.03em] text-[#0c1d22]/75 before:mr-2 before:content-['•'] sm:text-[15px]"
                    >
                      {preserveAcronyms(f)}
                    </li>
                  ))}
                </ul>
              </ScrollAnimate>

              {enjeu.experiencesSection.cta ? (
                <div className="flex justify-center lg:col-span-2">
                  <EnjeuCtaButton
                    cta={enjeu.experiencesSection.cta}
                    className={homeCtaOutlineGhostClass}
                    onModal={() => openModal()}
                  />
                </div>
              ) : null}
            </div>
          )}
        </section>
      ) : null}

      {/* ── THÉMATIQUES (après expériences, pages type au-vert / original) ── */}
      {enjeu.experiencesSection && enjeu.themes && enjeu.themes.length > 0 ? (
        <ThemesSection enjeu={enjeu} onModal={() => openModal()} />
      ) : null}

      {/* ── LIEUX ── */}
      {enjeu.placesSection ? (
        <section
          className="relative"
          style={{
            paddingTop: 'clamp(3.5rem, 7vw, 6rem)',
            paddingBottom: 'clamp(3.5rem, 7vw, 6rem)',
            background: enjeu.placesSection.background ?? HOME_COLORS.gray,
          }}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <ScrollAnimate>
              <h2 className={sectionTitleClass}>
                <TitleWithBold
                  full={enjeu.placesSection.title}
                  bold={enjeu.placesSection.titleBold}
                />
              </h2>
              <p className={`mt-4 max-w-2xl sm:mt-5 ${homeParagraphClass}`}>
                {preserveAcronyms(enjeu.placesSection.intro)}
              </p>
            </ScrollAnimate>
          </div>
          <LinkBlockGrid
            items={enjeu.placesSection.items}
            ariaLabel={enjeu.placesSection.title}
            cardBackground={
              (enjeu.placesSection.background ?? HOME_COLORS.gray) === '#ffffff'
                ? HOME_COLORS.gray
                : '#ffffff'
            }
          />
          {enjeu.placesSection.cta ? (
            <div className="mx-auto mt-10 flex max-w-6xl justify-center px-4 sm:mt-12 sm:px-6 lg:px-8">
              <EnjeuCtaButton
                cta={enjeu.placesSection.cta}
                className={homeCtaOutlineGhostClass}
                onModal={() => openModal()}
              />
            </div>
          ) : null}
        </section>
      ) : null}

      {/* ── FORMATS / ENJEUX ── */}
      {enjeu.formatsSection ? (
        <section
          className="relative"
          style={{
            paddingTop: homeSectionPadding,
            paddingBottom: homeSectionPadding,
            background: HOME_COLORS.primary,
          }}
        >
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <ScrollAnimate>
              <h2 className={sectionTitleOnOrangeClass}>
                <TitleWithBold
                  full={enjeu.formatsSection.title}
                  bold={enjeu.formatsSection.titleBold}
                />
              </h2>
              <p className="mt-5 font-sans text-[15px] font-normal leading-[1.7] tracking-[-0.04em] text-white/80 sm:text-[16px]">
                {preserveAcronyms(enjeu.formatsSection.intro)}
              </p>
            </ScrollAnimate>
          </div>
          <FormatRows
            items={enjeu.formatsSection.items}
            dark
            ariaLabel={enjeu.formatsSection.title}
          />
          {enjeu.formatsSection.cta ? (
            <div className="mx-auto mt-10 flex max-w-3xl justify-center px-5 sm:mt-12 sm:px-8">
              <EnjeuCtaButton
                cta={enjeu.formatsSection.cta}
                className={homeOnDarkOutlineButtonClass}
                onModal={() => openModal()}
              />
            </div>
          ) : null}
        </section>
      ) : null}

      {/* ── PROGRAMME ── */}
      {enjeu.programPosition !== 'before-faq' ? (
        <ProgramSection
          enjeu={enjeu}
          shortDisplayTitle={shortDisplayTitle}
          onModal={() => openModal()}
        />
      ) : null}

      {/* ── EXEMPLE DE SÉMINAIRE ── */}
      <section
        className="relative"
        style={{
          paddingTop: homeSectionPadding,
          paddingBottom: homeSectionPadding,
          background: enjeu.exampleBackground ?? HOME_COLORS.gray,
        }}
      >
        <Image
          src={S_ORANGE}
          alt=""
          aria-hidden
          width={260}
          height={260}
          className="pointer-events-none absolute right-0 z-0 hidden h-[200px] w-[200px] translate-x-[30%] -translate-y-1/2 object-contain opacity-90 lg:block xl:h-[260px] xl:w-[260px]"
          style={{ top: 0 }}
        />
        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
          <ExampleSeminarBlock
            example={enjeu.exampleSeminar}
            displayTitle={shortDisplayTitle}
            exampleLead={enjeu.exampleLead}
          />
        </div>
      </section>

      {/* ── THÉMATIQUES (pages cohésion / RSE sans experiencesSection) ── */}
      {!enjeu.experiencesSection && enjeu.themes && enjeu.themes.length > 0 ? (
        <ThemesSection enjeu={enjeu} onModal={() => openModal()} />
      ) : null}

      {/* ── VILLES ── */}
      {enjeu.citiesSection ? (
        <section
          className="relative"
          style={{
            paddingTop: homeSectionPadding,
            paddingBottom: homeSectionPadding,
            background: enjeu.citiesSection.background ?? '#ffffff',
          }}
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <ScrollAnimate>
              <h2 className={`max-w-3xl ${sectionTitleClass}`}>
                <TitleWithBold
                  full={enjeu.citiesSection.title}
                  bold={enjeu.citiesSection.titleBold}
                />
              </h2>
              <p className={`mt-5 max-w-2xl ${homeParagraphClass}`}>
                {preserveAcronyms(enjeu.citiesSection.intro)}
              </p>
            </ScrollAnimate>
            <nav
              aria-label={`Séminaires près des villes — ${shortDisplayTitle}`}
              className="mt-8 flex flex-wrap gap-x-8 gap-y-3 sm:mt-10 sm:gap-x-10 sm:gap-y-4"
            >
              {enjeu.citiesSection.cities.map((city) => (
                <Link
                  key={city.href}
                  href={city.href}
                  className="font-sans text-[16px] font-semibold tracking-[-0.04em] text-[#0c1d22] underline decoration-[rgba(12,29,34,0.25)] underline-offset-4 transition-colors hover:text-[#ec6435] hover:decoration-[#ec6435] sm:text-[18px]"
                >
                  {city.name}
                </Link>
              ))}
            </nav>
            {enjeu.citiesSection.body ? (
              <p className={`mt-8 max-w-2xl ${homeParagraphClass}`}>
                {preserveAcronyms(enjeu.citiesSection.body)}
              </p>
            ) : null}
            {enjeu.citiesSection.cta ? (
              <div className="mt-10 flex justify-center sm:mt-12">
                <EnjeuCtaButton
                  cta={enjeu.citiesSection.cta}
                  className={homeCtaOutlineGhostClass}
                  onModal={() => openModal()}
                />
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {enjeu.programPosition === 'before-faq' ? (
        <ProgramSection
          enjeu={enjeu}
          shortDisplayTitle={shortDisplayTitle}
          onModal={() => openModal()}
        />
      ) : null}

      {/* ── FAQ ── */}
      <section
        className="relative"
        style={{
          paddingTop: homeSectionPadding,
          paddingBottom: homeSectionPadding,
          background: enjeu.faqBackground ?? HOME_COLORS.gray,
        }}
      >
        <Image
          src={ABEILLE}
          alt=""
          aria-hidden
          width={224}
          height={224}
          className="pointer-events-none absolute bottom-8 right-4 z-20 hidden h-32 w-32 object-contain sm:block sm:bottom-10 sm:right-8 sm:h-44 sm:w-44 lg:bottom-12 lg:right-12 lg:h-56 lg:w-56"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8">
          <ScrollAnimate>
            <h2 className={`text-center ${sectionTitleClass}`}>
              {enjeu.faqTitle ? (
                <TitleWithBold full={enjeu.faqTitle} bold={enjeu.faqTitleBold} />
              ) : (
                <>
                  <span className="font-bold">Questions</span> fréquentes.
                </>
              )}
            </h2>
            <p
              className={`mx-auto mt-2 max-w-xl px-1 text-center ${homeParagraphClass}`}
            >
              {enjeu.faqLead ? (
                <LinkedText text={enjeu.faqLead} />
              ) : (
                <>
                  Une question sur un {shortDisplayTitle}&nbsp;? Parcourez la FAQ ou
                  contactez-nous.
                </>
              )}
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

      {/* ── CLÔTURE / AUTRES ENJEUX ── */}
      {enjeu.closing ? (
        <section
          style={{
            paddingTop: homeSectionPadding,
            paddingBottom: homeSectionPadding,
            background: HOME_COLORS.orange,
          }}
        >
          <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
            <ScrollAnimate>
              <h2 className={sectionTitleOnOrangeClass}>
                <TitleWithBold full={enjeu.closing.title} bold={enjeu.closing.titleBold} />
              </h2>
              <p className="mx-auto mt-4 max-w-lg font-sans text-[14px] font-normal leading-[1.7] tracking-[-0.03em] text-white/85 sm:text-[15px]">
                {preserveAcronyms(enjeu.closing.lead)}
              </p>
              <div className="mt-8 flex justify-center sm:mt-10">
                <EnjeuCtaButton
                  cta={enjeu.closing.cta}
                  className={homeOnDarkOutlineButtonClass}
                  onModal={() => openModal()}
                />
              </div>
            </ScrollAnimate>
          </div>
        </section>
      ) : related.length > 0 ? (
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
                    <Image
                      src={item.heroImage}
                      alt={item.heroImageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
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
              <Link href="/seminaires-entreprise" className={homeOnDarkOutlineButtonClass}>
                → Découvrir tous nos séminaires
              </Link>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default SeminaireEnjeu;
