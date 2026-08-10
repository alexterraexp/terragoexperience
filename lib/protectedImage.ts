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
