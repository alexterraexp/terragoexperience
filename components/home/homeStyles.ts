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

/** CTA outline sombre — plus compact sur mobile. */
export const homeCtaOutlineClass =
  'inline-flex items-center justify-center gap-2 rounded-full border border-[#0c1d22] bg-white px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#0c1d22] transition-colors hover:bg-[#0c1d22] hover:text-white sm:px-10 sm:py-2.5 sm:text-xs';

/** CTA outline transparent (fond clair). */
export const homeCtaOutlineGhostClass =
  'inline-flex items-center justify-center gap-2 rounded-full border border-[#0c1d22] bg-transparent px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#0c1d22] transition-colors hover:bg-[#0c1d22] hover:text-white sm:px-10 sm:py-2.5 sm:text-xs';

/** CTA hero sur image (contour blanc). */
export const homeHeroOutlineButtonClass =
  'inline-flex items-center justify-center rounded-full border-2 border-white px-5 py-1.5 text-xs font-bold tracking-[0.04em] text-white backdrop-blur-md transition-colors hover:border-[#ec6435] hover:bg-white/10 sm:px-8 sm:py-2 sm:text-sm';

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
