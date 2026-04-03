export const GA_MEASUREMENT_ID = 'G-SMMG33EENP' as const;

export type CookieConsentStored = {
  stat: boolean;
  mktg: boolean;
  pref: boolean;
};

export function readCookieConsent(): CookieConsentStored | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('cookie_consent');
    if (!raw) return null;
    return JSON.parse(raw) as CookieConsentStored;
  } catch {
    return null;
  }
}
