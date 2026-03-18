'use client';

import { useEffect, useState, useRef } from 'react';

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
    <div>
      <div style={{
        fontSize: 9, fontWeight: 700, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: '#9a9080', marginBottom: '0.75rem',
      }}>
        Dans cet article
      </div>
      <nav>
        {headings.map(({ text, id }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              display: 'block',
              padding: '6px 10px',
              borderRadius: 8,
              marginBottom: 2,
              fontSize: 12,
              fontWeight: activeId === id ? 700 : 500,
              color: activeId === id ? '#1a2e1a' : '#9a9080',
              background: activeId === id ? 'rgba(26,46,26,0.06)' : 'transparent',
              textDecoration: 'none',
              lineHeight: 1.45,
              transition: 'all 0.2s',
            }}
          >
            {text}
          </a>
        ))}
      </nav>
    </div>
  );
}
