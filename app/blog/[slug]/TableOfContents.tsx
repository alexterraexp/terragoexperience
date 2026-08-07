'use client';

import { useEffect, useState, useRef } from 'react';
import { HOME_COLORS } from '../../../components/home/homeStyles';

interface Heading {
  text: string;
  id: string;
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);
  const ticking = useRef(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY + 120;
        let current = headings[0].id;
        for (const { id } of headings) {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= scrollY) {
            current = id;
          }
        }
        setActiveId(current);
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  return (
    <nav className="flex flex-col gap-0.5">
      {headings.map(({ text, id }) => {
        const isActive = activeId === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="block rounded-lg px-2.5 py-2 font-sans text-[13px] leading-[1.45] tracking-[-0.02em] no-underline transition-colors"
            style={{
              fontWeight: isActive ? 700 : 500,
              color: isActive ? HOME_COLORS.primary : 'rgba(12,29,34,0.45)',
              background: isActive ? 'rgba(12,29,34,0.06)' : 'transparent',
            }}
          >
            {text}
          </a>
        );
      })}
    </nav>
  );
}
