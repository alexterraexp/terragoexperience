'use client';

import Link from 'next/link';
import { useModal } from '../context/ModalContext';
import type { FaqBlock, FaqInlinePart, FaqItem } from '../lib/faq';
import { faqAnswerClass } from './home/homeStyles';

function InlineParts({ parts }: { parts: FaqInlinePart[] }) {
  const { openModal } = useModal();

  return (
    <>
      {parts.map((part, i) =>
        typeof part === 'string' ? (
          <span key={i}>{part}</span>
        ) : 'action' in part ? (
          <button
            key={`${part.label}-${i}`}
            type="button"
            onClick={() => openModal()}
            className="font-semibold text-[#ec6435] underline decoration-[#ec6435]/40 underline-offset-2 transition-colors hover:text-[#0c1d22] hover:decoration-[#0c1d22]"
          >
            {part.label}
          </button>
        ) : (
          <Link
            key={`${part.href}-${i}`}
            href={part.href}
            className="font-semibold text-[#ec6435] underline decoration-[#ec6435]/40 underline-offset-2 transition-colors hover:text-[#0c1d22] hover:decoration-[#0c1d22]"
          >
            {part.label}
          </Link>
        ),
      )}
    </>
  );
}

export function FaqAnswerBody({
  item,
  className = '',
}: {
  item: FaqItem;
  className?: string;
}) {
  return (
    <div className={`${faqAnswerClass} space-y-2 sm:space-y-3 ${className}`}>
      {item.blocks.map((block: FaqBlock, i) =>
        block.type === 'p' ? (
          <p key={i}>
            <InlineParts parts={block.parts} />
          </p>
        ) : (
          <ul key={i} className="list-disc space-y-1.5 pl-5 marker:text-[#ec6435]">
            {block.items.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}
