'use client';

import React from 'react';
import Link from 'next/link';

export const linkedTextClass =
  'font-semibold text-[#0c1d22] underline decoration-[#ec6435]/70 underline-offset-[3px] transition-colors hover:decoration-[#ec6435]';

export const linkedTextOnDarkClass =
  'font-semibold text-white underline decoration-white/70 underline-offset-[3px] transition-colors hover:decoration-white';

/** Rend un texte avec liens `[[libellé|/chemin]]`. */
export function LinkedText({
  text,
  className,
  linkClassName = linkedTextClass,
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
        if (!m) return <React.Fragment key={i}>{part}</React.Fragment>;
        return (
          <Link key={i} href={m[2]} className={linkClassName}>
            {m[1]}
          </Link>
        );
      })}
    </span>
  );
}
