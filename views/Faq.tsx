'use client';

import { useModal } from '../context/ModalContext';
import { FaqAnswerBody } from '../components/FaqAnswer';
import {
  HOME_COLORS,
  HOME_RADIUS,
  homeParagraphClass,
  homeSectionPadding,
} from '../components/home/homeStyles';
import { FAQ_SECTIONS } from '../lib/faq';

export default function Faq() {
  const { openModal } = useModal();

  return (
    <div className="overflow-x-hidden bg-white font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <section className="relative w-full bg-white pt-[calc(7.5rem+env(safe-area-inset-top))] sm:pt-[calc(9rem+env(safe-area-inset-top))]">
        <div className="mx-auto max-w-3xl px-5 pb-10 sm:px-8 sm:pb-14">
          <p className="text-center font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#ec6435]">
            FAQ
          </p>
          <h1 className="mt-3 text-center font-sans text-[40px] font-normal leading-[1.05] tracking-[-0.075em] text-[#0c1d22] sm:text-[52px]">
            Questions <span className="font-bold">fréquentes</span>
          </h1>
          <p className={`mx-auto mt-5 max-w-xl text-center ${homeParagraphClass}`}>
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
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <h2 className="mb-6 font-sans text-[28px] font-normal leading-[1.08] tracking-[-0.075em] text-[#0c1d22] sm:text-[34px]">
              <span aria-hidden>{section.emoji} </span>
              {section.title}
            </h2>
            <div className="flex flex-col gap-3">
              {section.items.map((item) => (
                <details
                  key={item.id}
                  id={item.id}
                  className="bg-white px-5 py-1 open:pb-4 sm:px-6"
                  style={{
                    borderRadius: HOME_RADIUS,
                    border: '1px solid rgba(12,29,34,0.08)',
                  }}
                >
                  <summary className="cursor-pointer list-none py-4 font-sans text-[15px] font-bold leading-[1.35] tracking-[-0.03em] text-[#0c1d22] marker:content-none [&::-webkit-details-marker]:hidden">
                    {item.question}
                  </summary>
                  <FaqAnswerBody item={item} />
                </details>
              ))}
            </div>
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
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
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
