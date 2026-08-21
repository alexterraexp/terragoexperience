'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { FAQ_PATH, getFaqExcerptItems, type FaqExcerptKey } from '../lib/faq';
import { HOME_COLORS, HOME_RADIUS, homeCtaOutlineGhostClass, homeParagraphClass } from './home/homeStyles';
import { FaqAnswerBody } from './FaqAnswer';

type Props = {
  excerpt: FaqExcerptKey;
  intro?: string;
};

export default function FaqExcerpt({ excerpt, intro }: Props) {
  const items = getFaqExcerptItems(excerpt, 3);
  const [openId, setOpenId] = useState<string | null>(null);

  if (items.length === 0) return null;

  return (
    <section
      className="relative"
      style={{
        paddingTop: 'clamp(3rem, 6vw, 4.5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 4.5rem)',
        background: HOME_COLORS.gray,
      }}
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="text-center font-sans text-[28px] font-normal leading-[1.08] tracking-[-0.075em] text-[#0c1d22] sm:text-[34px]">
          <span className="font-bold">Questions</span> fréquentes.
        </h2>
        {intro ? (
          <p className={`mx-auto mt-3 max-w-lg text-center ${homeParagraphClass}`}>{intro}</p>
        ) : null}

        <div className="mt-8 flex flex-col gap-3">
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="overflow-hidden bg-white px-5 py-1 sm:px-6"
                style={{ borderRadius: HOME_RADIUS, border: '1px solid rgba(12,29,34,0.08)' }}
              >
                <button
                  type="button"
                  className="flex w-full items-center gap-3 py-4 text-left"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                >
                  <span className="min-w-0 flex-1 font-sans text-[14px] font-bold leading-[1.3] tracking-[-0.03em] text-[#0c1d22] sm:text-[15px]">
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

        <div className="mt-8 flex justify-center">
          <Link href={FAQ_PATH} className={homeCtaOutlineGhostClass}>
            Voir toutes les questions
          </Link>
        </div>
      </div>
    </section>
  );
}
