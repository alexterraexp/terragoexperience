import type { CSSProperties, MouseEvent } from 'react';

/** Attributs pour freiner l’enregistrement / drag d’une image (desktop). */
export const protectedImageProps = {
  draggable: false as const,
  onContextMenu: (e: MouseEvent) => {
    e.preventDefault();
  },
  style: {
    WebkitUserDrag: 'none',
    userSelect: 'none',
  } as CSSProperties,
};

/** Vrai si le clic vise une image (pas un lien / texte posé dessus). */
export function isProtectedImageTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return (
    target instanceof HTMLImageElement ||
    target instanceof HTMLCanvasElement ||
    target instanceof SVGImageElement
  );
}
