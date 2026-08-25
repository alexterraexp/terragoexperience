'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import {
  HOME_COLORS,
  HOME_RADIUS,
  homeCtaOutlineClass,
  homeParagraphClass,
  faqAnswerClass,
} from '../components/home/homeStyles';
import {
  getVilleSeminaire,
  villeFaqItems,
  villeSeminairePath,
  type VilleFaq,
  type VilleSeminaire,
  type VilleSeminaireSlug,
} from '../lib/villesSeminaire';
import { regionDestinationPath } from '../lib/homeStorage';

const S_ORANGE =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/s-picto-orange.png';

const LINK_RE = /\[\[([^\]|]+)\|([^\]]+)\]\]/g;

function RichText({ text, className = '' }: { text: string; className?: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  const re = new RegExp(LINK_RE.source, 'g');
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    nodes.push(
      <Link
        key={`${m[2]}-${m.index}`}
        href={m[2]}
        className="font-semibold text-[#ec6435] underline decoration-[#ec6435]/40 underline-offset-2 transition-colors hover:text-[#0c1d22] hover:decoration-[#0c1d22]"
      >
        {m[1]}
      </Link>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <span className={className}>{nodes}</span>;
}

const NEARBY: Partial<Record<VilleSeminaireSlug, VilleSeminaireSlug[]>> = {
  paris: ['reims', 'tours'],
  lyon: ['grenoble', 'valence'],
  marseille: ['aix-en-provence', 'montpellier'],
  bordeaux: ['la-rochelle', 'biarritz'],
  toulouse: ['bordeaux', 'montpellier'],
  nantes: ['rennes', 'angers'],
  rennes: ['nantes', 'angers'],
  lille: ['reims', 'paris'],
  strasbourg: ['reims'],
  montpellier: ['marseille', 'aix-en-provence'],
  nice: ['marseille', 'aix-en-provence'],
  grenoble: ['lyon', 'annecy'],
  'aix-en-provence': ['marseille', 'nice'],
  angers: ['nantes', 'tours'],
  tours: ['angers', 'paris'],
  valence: ['lyon', 'grenoble'],
  reims: ['paris', 'strasbourg'],
  'clermont-ferrand': ['lyon', 'valence'],
  annecy: ['grenoble', 'lyon'],
  'la-rochelle': ['nantes', 'bordeaux'],
  biarritz: ['bordeaux'],
};

const REGION_BY_VILLE: Partial<Record<VilleSeminaireSlug, { slug: string; label: string }>> = {
  paris: { slug: 'ile-de-france', label: 'séminaires en Île-de-France' },
  marseille: { slug: 'provence-alpes-cote-d-azur', label: 'séminaires en Provence-Alpes-Côte d’Azur' },
  'aix-en-provence': { slug: 'provence-alpes-cote-d-azur', label: 'séminaires en Provence-Alpes-Côte d’Azur' },
  nice: { slug: 'provence-alpes-cote-d-azur', label: 'séminaires en Provence-Alpes-Côte d’Azur' },
  bordeaux: { slug: 'nouvelle-aquitaine', label: 'séminaires en Nouvelle-Aquitaine' },
  'la-rochelle': { slug: 'nouvelle-aquitaine', label: 'séminaires en Nouvelle-Aquitaine' },
  biarritz: { slug: 'nouvelle-aquitaine', label: 'séminaires en Nouvelle-Aquitaine' },
  toulouse: { slug: 'occitanie', label: 'séminaires en Occitanie' },
  montpellier: { slug: 'occitanie', label: 'séminaires en Occitanie' },
  nantes: { slug: 'pays-de-la-loire', label: 'séminaires dans les Pays de la Loire' },
  angers: { slug: 'pays-de-la-loire', label: 'séminaires dans les Pays de la Loire' },
  rennes: { slug: 'bretagne', label: 'séminaires en Bretagne' },
  lyon: { slug: 'auvergne-rhone-alpes', label: 'séminaires en Auvergne-Rhône-Alpes' },
  grenoble: { slug: 'auvergne-rhone-alpes', label: 'séminaires en Auvergne-Rhône-Alpes' },
  valence: { slug: 'auvergne-rhone-alpes', label: 'séminaires en Auvergne-Rhône-Alpes' },
  annecy: { slug: 'auvergne-rhone-alpes', label: 'séminaires en Auvergne-Rhône-Alpes' },
  'clermont-ferrand': { slug: 'auvergne-rhone-alpes', label: 'séminaires en Auvergne-Rhône-Alpes' },
};

function BoldPhrase({
  text,
  phrases,
}: {
  text: string;
  phrases: string[];
}) {
  const hits = phrases
    .map((phrase) => {
      const index = text.indexOf(phrase);
      return index < 0 ? null : { phrase, index, end: index + phrase.length };
    })
    .filter((h): h is { phrase: string; index: number; end: number } => h !== null)
    .sort((a, b) => a.index - b.index);

  if (hits.length === 0) return <>{text}</>;

  const nodes: ReactNode[] = [];
  let cursor = 0;
  hits.forEach((hit, i) => {
    if (hit.index < cursor) return;
    if (hit.index > cursor) nodes.push(text.slice(cursor, hit.index));
    nodes.push(
      <span key={`${hit.phrase}-${i}`} className="font-bold">
        {hit.phrase}
      </span>,
    );
    cursor = hit.end;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return <>{nodes}</>;
}

function H1WithCity({ title, city }: { title: string; city: string }) {
  const index = title.indexOf(city);
  if (index < 0) return <>{title}</>;
  return (
    <>
      <span className="font-bold">{title.slice(0, index + city.length)}</span>
      {title.slice(index + city.length)}
    </>
  );
}

function aroundPhrase(city: string, title: string): string {
  if (title.includes(`autour d’${city}`)) return `autour d’${city}`;
  if (title.includes(`autour d'${city}`)) return `autour d'${city}`;
  return `autour de ${city}`;
}

const sectionPad = 'clamp(3.5rem, 7vw, 5.5rem)';

function VilleFaqAccordion({ items }: { items: VilleFaq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.q}
            className="overflow-hidden bg-white px-5 py-1 sm:px-6"
            style={{
              borderRadius: HOME_RADIUS,
              border: '1px solid rgba(12,29,34,0.08)',
            }}
          >
            <button
              type="button"
              className="flex w-full items-center gap-3 py-4 text-left"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="min-w-0 flex-1 font-sans text-[15px] font-bold leading-[1.35] tracking-[-0.03em] text-[#0c1d22]">
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
                <p className={`pb-4 pr-2 ${faqAnswerClass}`}>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function SeminaireVille({ ville }: { ville: VilleSeminaire }) {
  const { openModal } = useModal();
  const nearby = (NEARBY[ville.slug] ?? [])
    .map((slug) => getVilleSeminaire(slug))
    .filter(Boolean) as VilleSeminaire[];
  const region = REGION_BY_VILLE[ville.slug];

  return (
    <div className="overflow-x-hidden bg-white font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <section className="relative flex min-h-[31rem] w-full items-center bg-white pt-[calc(7.5rem+env(safe-area-inset-top))] sm:min-h-[36rem]">
        <Image
          src={S_ORANGE}
          alt=""
          aria-hidden
          width={260}
          height={260}
          className="pointer-events-none absolute left-0 top-1/2 z-0 hidden h-[200px] w-[200px] -translate-x-[30%] -translate-y-1/2 object-contain opacity-90 lg:block xl:h-[260px] xl:w-[260px]"
        />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-5 py-14 sm:px-8 sm:py-16">
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#ec6435]">
            Séminaire {ville.nearLabel}
          </p>
          <h1 className="mt-3 font-sans text-[34px] font-normal leading-[1.08] tracking-[-0.075em] text-[#0c1d22] sm:text-[44px]">
            <H1WithCity title={ville.h1} city={ville.name} />
          </h1>
          <p className={`mt-6 ${homeParagraphClass}`}>
            <RichText text={ville.intro} />
          </p>
        </div>
      </section>

      <section style={{ paddingTop: sectionPad, paddingBottom: sectionPad, background: HOME_COLORS.gray }}>
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="mb-8 font-sans text-[28px] font-normal leading-[1.08] tracking-[-0.075em] text-[#0c1d22] sm:text-[34px]">
            <BoldPhrase text={ville.whyTitle} phrases={[aroundPhrase(ville.name, ville.whyTitle)]} />
          </h2>
          <div className="flex flex-col gap-8">
            {ville.arguments.map((arg, i) => (
              <div key={arg.title}>
                <h3 className="font-sans text-[17px] font-bold tracking-[-0.04em] text-[#0c1d22]">
                  {i + 1}. {arg.title}
                </h3>
                <p className={`mt-2 ${homeParagraphClass}`}>
                  <RichText text={arg.text} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: sectionPad, paddingBottom: sectionPad, background: '#ffffff' }}>
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="mb-8 font-sans text-[28px] font-normal leading-[1.08] tracking-[-0.075em] text-[#0c1d22] sm:text-[34px]">
            <BoldPhrase text={ville.experiencesTitle} phrases={['expériences terroir']} />
          </h2>
          <div className="flex flex-col gap-6">
            {ville.activities.map((act) => (
              <div key={act.title}>
                <h3 className="font-sans text-[17px] font-bold tracking-[-0.04em] text-[#0c1d22]">{act.title}</h3>
                <p className={`mt-2 ${homeParagraphClass}`}>
                  <RichText text={act.text} />
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center sm:mt-12">
            <Link href="/experiences-entreprise" className={homeCtaOutlineClass}>
              <span aria-hidden>→</span>
              Découvrir nos expériences pour les entreprises
            </Link>
          </div>
        </div>
      </section>

      <section className="relative" style={{ paddingTop: sectionPad, paddingBottom: sectionPad, background: HOME_COLORS.gray }}>
        <Image
          src={S_ORANGE}
          alt=""
          aria-hidden
          width={260}
          height={260}
          className="pointer-events-none absolute right-0 z-0 hidden h-[200px] w-[200px] translate-x-[30%] -translate-y-1/2 object-contain opacity-90 lg:block xl:h-[260px] xl:w-[260px]"
          style={{ top: 0 }}
        />
        <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="mb-5 font-sans text-[28px] font-normal leading-[1.08] tracking-[-0.075em] text-[#0c1d22] sm:text-[34px]">
            <BoldPhrase text={ville.rseTitle} phrases={['Un séminaire RSE', ville.name]} />
          </h2>
          <div className="flex flex-col gap-4">
            {ville.rse.map((block, i) =>
              block.type === 'h3' ? (
                <h3
                  key={i}
                  className="mt-4 font-sans text-[20px] font-normal leading-[1.2] tracking-[-0.05em] text-[#0c1d22] first:mt-0 sm:text-[22px]"
                >
                  <BoldPhrase
                    text={block.text}
                    phrases={['RSE qui se vit', 'moment d’équipe', "moment d'équipe"]}
                  />
                </h3>
              ) : (
                <p key={i} className={homeParagraphClass}>
                  <RichText text={block.text} />
                </p>
              ),
            )}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: sectionPad, paddingBottom: sectionPad, background: '#ffffff' }}>
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="mb-6 font-sans text-[28px] font-normal leading-[1.08] tracking-[-0.075em] text-[#0c1d22] sm:text-[34px]">
            <BoldPhrase text={ville.faqTitle} phrases={['Vos questions', ville.name]} />
          </h2>
          <VilleFaqAccordion items={villeFaqItems(ville)} />
        </div>
      </section>

      <section
        style={{
          paddingTop: sectionPad,
          paddingBottom: sectionPad,
          background: '#ffffff',
        }}
      >
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div
            className="px-8 py-10 text-center sm:px-16 sm:py-12"
            style={{ background: HOME_COLORS.primary, borderRadius: HOME_RADIUS }}
          >
            <p className="font-sans text-[24px] font-normal leading-[1.15] tracking-[-0.06em] text-white sm:text-[32px]">
              Vous préparez un séminaire{' '}
              <span className="font-bold">à {ville.name}</span> ?
            </p>
            <p className="mx-auto mt-5 max-w-3xl font-sans text-[13px] font-normal leading-[1.7] tracking-[-0.04em] text-white/80 sm:text-[14px]">
              Donnez-nous vos dates, votre nombre de participants et vos envies :
              <br />
              TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs
              locaux.
            </p>
            <button
              type="button"
              onClick={() => openModal()}
              className="mt-7 inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.07em] text-[#0c1d22] transition-colors hover:bg-[#ec6435] hover:text-white"
            >
              Demander un devis
            </button>
          </div>

          {(region || nearby.length > 0) && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {region ? (
                <Link
                  href={regionDestinationPath(region.slug)}
                  className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-center font-sans text-[13px] font-semibold tracking-[-0.04em] text-white transition-colors hover:bg-[#ec6435] sm:px-6 sm:text-[14px]"
                  style={{ background: HOME_COLORS.primary }}
                >
                  Nos {region.label}
                </Link>
              ) : null}
              {nearby.map((n) => (
                <Link
                  key={n.slug}
                  href={villeSeminairePath(n.slug)}
                  className="inline-flex items-center justify-center rounded-full border border-[#0c1d22] bg-white px-5 py-2.5 text-center font-sans text-[13px] font-semibold tracking-[-0.04em] text-[#0c1d22] transition-colors hover:bg-[#0c1d22] hover:text-white sm:px-6 sm:text-[14px]"
                >
                  Séminaire {n.nearLabel}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
