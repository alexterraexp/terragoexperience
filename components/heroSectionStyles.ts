import type { CSSProperties } from 'react';

/** Paragraphe sous le titre (hero sur image) — même base typographique que la page d'accueil. */
export const heroIntroParagraphOnImageClass =
  'text-base max-w-xl mx-auto mb-10 leading-relaxed';

/** Variante plus large pour un texte de mission plus long. */
export const heroIntroParagraphOnImageWideClass =
  'text-base max-w-4xl mx-auto mb-10 leading-relaxed';

export const heroIntroParagraphOnImageStyle: CSSProperties = {
  color: 'rgba(255,255,255,0.72)',
  fontWeight: 500,
};

/** CTA principal en contour (hero sur photo). */
export const heroPrimaryOutlineButtonClass =
  'text-white border border-white/100 hover:border-white/90 px-8 py-3 text-[13px] tracking-[0.07em] font-bold transition-all duration-300 bg-transparent hover:bg-white/15 hover:backdrop-blur-[1px] rounded-full';

/** Variante hover un peu plus douce (ex. partenaires, mission). */
export const heroPrimaryOutlineButtonMutedHoverClass =
  'text-white border border-white/100 hover:border-white/70 px-8 py-3 text-[13px] tracking-[0.07em] font-bold transition-all duration-300 hover:bg-white/10 rounded-full';

/** Lien secondaire texte (sans contour). */
export const heroSecondaryGhostLinkClass =
  'text-[13px] tracking-[0.07em] font-bold transition-all duration-300 px-5 py-3';

export const heroSecondaryGhostLinkStyle: CSSProperties = {
  color: 'rgba(255, 255, 255, 0.8)',
};

/** Paragraphe d’intro sur fond clair (ex. formulaire Entre amis). */
export const heroIntroParagraphOnLightClass =
  'text-base max-w-2xl mx-auto leading-relaxed';
