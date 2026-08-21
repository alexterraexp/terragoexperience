'use client';

import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { FaqAnswerBody } from '../components/FaqAnswer';
import {
  HOME_COLORS,
  HOME_RADIUS,
  homeParagraphClass,
  homeSectionPadding,
} from '../components/home/homeStyles';
import { FAQ_SECTIONS, type FaqItem } from '../lib/faq';

function FaqSectionAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash && items.some((item) => item.id === hash)) {
        setOpenId(hash);
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, [items]);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            id={item.id}
            className="scroll-mt-28 overflow-hidden bg-white px-5 py-1 sm:px-6"
            style={{
              borderRadius: HOME_RADIUS,
              border: '1px solid rgba(12,29,34,0.08)',
            }}
          >
            <button
              type="button"
              className="flex w-full items-center gap-3 py-4 text-left"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
            >
              <span className="min-w-0 flex-1 font-sans text-[15px] font-bold leading-[1.35] tracking-[-0.03em] text-[#0c1d22]">
                {item.question}
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
                <FaqAnswerBody item={item} className="pb-4 pr-2" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TitleWithBold({ title, boldPhrase }: { title: string; boldPhrase: string }) {
  const index = title.indexOf(boldPhrase);
  if (index < 0) return <>{title}</>;
  return (
    <>
      {title.slice(0, index)}
      <span className="font-bold">{boldPhrase}</span>
      {title.slice(index + boldPhrase.length)}
    </>
  );
}

export default function Faq() {
  const { openModal } = useModal();

  return (
    <div className="overflow-x-hidden bg-white font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <section className="relative w-full bg-white pt-[calc(7.5rem+env(safe-area-inset-top))] sm:pt-[calc(9rem+env(safe-area-inset-top))]">
        <div className="mx-auto max-w-4xl px-5 pb-10 sm:px-8 sm:pb-14">
          <p className="text-center font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#ec6435]">
            FAQ
          </p>
          <h1 className="mt-3 text-center font-sans text-[40px] font-normal leading-[1.05] tracking-[-0.075em] text-[#0c1d22] sm:text-[52px]">
            Questions <span className="font-bold">fréquentes</span>
          </h1>
          <p className={`mx-auto mt-5 max-w-2xl text-center ${homeParagraphClass}`}>
            Séminaire d’entreprise, team building original, format au vert, RSE et immersion chez
            les producteurs : les réponses pour concevoir un événement qui a du sens.
          </p>
          <nav aria-label="Sections de la FAQ" className="mt-8 flex flex-wrap justify-center gap-2">
            {FAQ_SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(12,29,34,0.12)] bg-white px-3 py-1.5 font-sans text-[12px] font-semibold tracking-[-0.03em] text-[#0c1d22] transition-colors hover:border-[#ec6435] hover:text-[#ec6435]"
              >
                <span aria-hidden>{section.emoji}</span>
                {section.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {FAQ_SECTIONS.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          style={{
            paddingTop: homeSectionPadding,
            paddingBottom: homeSectionPadding,
            background: index % 2 === 0 ? HOME_COLORS.gray : '#ffffff',
          }}
        >
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <h2 className="mb-6 font-sans text-[28px] font-normal leading-[1.08] tracking-[-0.075em] text-[#0c1d22] sm:text-[34px]">
              <span aria-hidden>{section.emoji} </span>
              <TitleWithBold title={section.title} boldPhrase={section.boldPhrase} />
            </h2>
            <FaqSectionAccordion items={section.items} />
          </div>
        </section>
      ))}

      <section
        style={{
          paddingTop: homeSectionPadding,
          paddingBottom: homeSectionPadding,
          background: HOME_COLORS.orange,
        }}
      >
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <h2 className="font-sans text-[34px] font-normal leading-[1.08] tracking-[-0.075em] text-white sm:text-[40px]">
            Une question plus <span className="font-bold">précise</span> ?
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-[14px] font-normal leading-[1.7] tracking-[-0.04em] text-white/85 sm:text-[15px]">
            Partagez votre brief : nous revenons avec une proposition de séminaire adaptée à vos
            équipes, votre budget et vos enjeux.
          </p>
          <button
            type="button"
            onClick={() => openModal()}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.07em] text-[#0c1d22] transition-colors hover:bg-[#0c1d22] hover:text-white sm:mt-10 sm:px-8 sm:py-2.5 sm:text-[12px]"
          >
            Parlons de votre projet
          </button>
        </div>
      </section>
    </div>
  );
}
