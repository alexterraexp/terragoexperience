import type { CSSProperties } from 'react';

export const HOME_COLORS = {
  primary: '#0c1d22',
  orange: '#ec6435',
  white: '#ffffff',
  gray: '#f4f4f4',
} as const;

export const HOME_RADIUS = '26px';

export const homeH1Class =
  'font-sans text-[40px] leading-[1.05] tracking-[-0.075em] text-[#0c1d22]';

export const homeH2Class =
  'font-sans text-base leading-[1.35] tracking-normal text-[#0c1d22]';

export const homeParagraphClass =
  'font-sans font-normal text-sm leading-[1.7] tracking-[-0.075em] text-[#0c1d22]/70';

/** Respiration verticale unique : même valeur en haut et en bas de chaque section. */
export const homeSectionPadding = 'clamp(5.5rem, 11vw, 8.5rem)';

/**
 * Respiration ajoutée autour de la bannière séparatrice.
 * Doit rester identique en haut et en bas : c'est ce qui garantit que la césure
 * gris/blanc (50%) tombe pile au milieu de la bannière.
 */
export const homeSeparatorPadding = 'clamp(2rem, 4vw, 3.5rem)';

export const bottomImageGradientClass =
  'absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-black/20 to-transparent';

export const homeH1Style: CSSProperties = {
  fontFamily: "'Poppins', sans-serif",
  fontSize: 40,
  letterSpacing: '-0.075em',
  lineHeight: 1.05,
};

export const homeH2Style: CSSProperties = {
  fontFamily: "'Poppins', sans-serif",
  fontSize: 16,
  letterSpacing: 0,
  lineHeight: 1.35,
};

export const homeParagraphStyle: CSSProperties = {
  fontFamily: "'Poppins', sans-serif",
  fontSize: 14,
  fontWeight: 400,
  letterSpacing: '-0.075em',
  lineHeight: 1.7,
};
