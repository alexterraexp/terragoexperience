import Link from 'next/link';
import { FAQ_PATH, getFaqExcerptItems, type FaqExcerptKey } from '../lib/faq';
import { HOME_COLORS, HOME_RADIUS, homeCtaOutlineGhostClass, homeParagraphClass } from './home/homeStyles';
import { FaqAnswerBody } from './FaqAnswer';

type Props = {
  excerpt: FaqExcerptKey;
  intro?: string;
};

export default function FaqExcerpt({ excerpt, intro }: Props) {
  const items = getFaqExcerptItems(excerpt, 3);
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
          {items.map((item) => (
            <details
              key={item.id}
              className="group bg-white px-5 py-1 open:pb-4 sm:px-6"
              style={{ borderRadius: HOME_RADIUS, border: '1px solid rgba(12,29,34,0.08)' }}
            >
              <summary className="cursor-pointer list-none py-4 font-sans text-[14px] font-bold leading-[1.3] tracking-[-0.03em] text-[#0c1d22] marker:content-none sm:text-[15px] [&::-webkit-details-marker]:hidden">
                {item.question}
              </summary>
              <FaqAnswerBody item={item} />
            </details>
          ))}
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
