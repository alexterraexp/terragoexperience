'use client';

import React from 'react';

type PhotoCopyrightProps = {
  /** Crédit sans le symbole © (ajouté automatiquement). */
  label: string;
  className?: string;
  /** Décalage depuis le bord droit (ex. hero plus aéré). */
  offsetRight?: string;
  offsetBottom?: string;
};

/**
 * Crédit photo discret — coin bas droit, petite taille, légère transparence.
 * À placer dans un conteneur `relative` qui enveloppe l’image.
 */
const PhotoCopyright: React.FC<PhotoCopyrightProps> = ({
  label,
  className = '',
  offsetRight,
  offsetBottom,
}) => {
  const text = label.trim().startsWith('©') ? label.trim() : `© ${label.trim()}`;

  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-[5] select-none font-sans text-[9px] font-medium tracking-[0.04em] text-white/55 sm:text-[10px] ${
        offsetRight || offsetBottom ? '' : 'bottom-2 right-2 sm:bottom-2.5 sm:right-2.5'
      } ${className}`}
      style={{
        ...(offsetRight ? { right: offsetRight } : null),
        ...(offsetBottom ? { bottom: offsetBottom } : null),
      }}
    >
      {text}
    </span>
  );
};

export default PhotoCopyright;
