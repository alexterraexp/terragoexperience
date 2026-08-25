import type { CSSProperties } from 'react';

export const HOME_COLORS = {
  primary: '#0c1d22',
  orange: '#ec6435',
  white: '#ffffff',
  gray: '#f4f4f4',
} as const;

export const HOME_RADIUS = '26px';

/**
 * Cadre hero encadré — plus haut sur mobile (ex-5/4 trop écrasé sur iPhone).
 * Ne pas appliquer à Charte RSE / Notre approche (contenu plus court).
 */
export const homeFramedHeroAspectClass =
  'aspect-[4/5] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[2.2/1]';

/** Variante destinations / enjeux (ratios desktop différents). */
export const homeFramedHeroWideAspectClass =
  'aspect-[4/5] w-full overflow-hidden sm:aspect-[2.45/1] lg:aspect-[2.85/1]';

/** H1 des héros encadrés — plus grand sur mobile, fluide pour rester dans le cadre. */
export const homeFramedHeroH1Class =
  'font-sans text-[clamp(2.2rem,1.2rem+4.5vw,3.75rem)] leading-[1.06] tracking-[-0.075em] text-white text-balance';

/** Overlay texte du hero encadré. */
export const homeFramedHeroOverlayClass =
  'absolute inset-0 z-10 flex min-h-0 flex-col items-center justify-center overflow-hidden px-4 py-6 text-center sm:px-10 sm:pb-10 sm:pt-16 lg:pt-20';

/** Décale titre + suite un peu plus bas — mobile uniquement. */
export const homeFramedHeroOverlayInnerClass =
  'flex translate-y-6 flex-col items-center sm:translate-y-0';

/** Descriptif sous le H1 du hero encadré — plus large et un peu plus petit sur desktop. */
export const homeFramedHeroSubtitleClass =
  'mt-3 max-w-xl text-center font-sans text-[15px] font-normal leading-relaxed tracking-[-0.04em] text-white/90 sm:mt-6 sm:max-w-2xl sm:text-[15px] lg:max-w-3xl';

export const homeH1Class =
  'font-sans text-[40px] leading-[1.05] tracking-[-0.075em] text-[#0c1d22]';

export const homeH2Class =
  'font-sans text-base leading-[1.35] tracking-normal text-[#0c1d22]';

export const homeParagraphClass =
  'font-sans text-[15px] font-normal leading-[1.7] tracking-[-0.04em] text-[#0c1d22]/65 sm:text-[16px]';

/** Réponses FAQ : plus compactes sur mobile, même gabarit desktop que les paragraphes. */
export const faqAnswerClass =
  'font-sans text-[13px] font-normal leading-[1.55] tracking-[-0.04em] text-[#0c1d22]/65 sm:text-[16px] sm:leading-[1.7]';

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

/** CTA outline sombre — gabarit hero Home, casse normale. */
export const homeCtaOutlineClass =
  'inline-flex items-center justify-center gap-2 rounded-full border border-[#0c1d22] bg-white px-6 py-2 text-[12px] font-bold tracking-[-0.02em] text-[#0c1d22] transition-colors hover:bg-[#0c1d22] hover:text-white sm:px-10 sm:py-2.5 sm:text-[13px]';

/** CTA outline transparent (fond clair). */
export const homeCtaOutlineGhostClass =
  'inline-flex items-center justify-center gap-2 rounded-full border border-[#0c1d22] bg-transparent px-6 py-2 text-[12px] font-bold tracking-[-0.02em] text-[#0c1d22] transition-colors hover:bg-[#0c1d22] hover:text-white sm:px-10 sm:py-2.5 sm:text-[13px]';

/** CTA hero sur image (contour blanc) — même gabarit que le hero Home. */
export const homeHeroOutlineButtonClass =
  'inline-flex items-center justify-center rounded-full border-2 border-white px-6 py-2 text-[12px] font-bold tracking-[-0.02em] text-white backdrop-blur-md transition-colors hover:border-[#ec6435] hover:bg-white/10 sm:px-10 sm:py-2.5 sm:text-[13px]';

/** CTA hero plein (fond blanc / orange) — même gabarit. */
export const homeHeroSolidButtonClass =
  'inline-flex items-center justify-center rounded-full px-6 py-2 text-[12px] font-bold tracking-[-0.02em] transition-colors sm:px-10 sm:py-2.5 sm:text-[13px]';

/** CTA outline sur fond sombre (hors hero) — bordure fine. */
export const homeOnDarkOutlineButtonClass =
  'inline-flex items-center justify-center rounded-full border border-white px-6 py-2 text-[12px] font-bold tracking-[-0.02em] text-white backdrop-blur-md transition-colors hover:bg-white/10 sm:px-10 sm:py-2.5 sm:text-[13px]';

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
  fontSize: 15,
  fontWeight: 400,
  letterSpacing: '-0.04em',
  lineHeight: 1.7,
};
