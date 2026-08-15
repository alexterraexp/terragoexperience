'use client';

import { useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Scroll instantané, ignore le `scroll-behavior: smooth` global (surtout iOS). */
export function jumpToTop() {
  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  window.scrollTo(0, 0);
  html.scrollTop = 0;
  document.body.scrollTop = 0;
  html.style.scrollBehavior = previous;
}

function isInternalPath(href: string | null): URL | null {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return null;
  }
  try {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return null;
    return url;
  } catch {
    return null;
  }
}

const ScrollToTop: React.FC = () => {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Ancres (#section) : on laisse le navigateur aller à l’élément.
    if (window.location.hash) return;

    jumpToTop();

    // Next.js / Safari mobile peuvent restaurer le scroll après le premier paint.
    const frame = requestAnimationFrame(jumpToTop);
    const t1 = window.setTimeout(jumpToTop, 50);
    const t2 = window.setTimeout(jumpToTop, 150);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pathname]);

  // Lien vers la page déjà ouverte (ex. footer « Confidentialité » alors qu’on y est) :
  // Next.js ne change pas le pathname, donc l’effet ci-dessus ne se déclenche pas.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest('a');
      const url = isInternalPath(anchor?.getAttribute('href') ?? null);
      if (!url || url.hash) return;

      if (url.pathname === window.location.pathname) {
        jumpToTop();
      }
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
};

export default ScrollToTop;
