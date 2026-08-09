export const GTM_ID = 'GTM-WMZSP69F' as const;

export const COOKIE_CONSENT_KEY = 'cookie_consent';
export const COOKIE_CONSENT_EVENT = 'cookieConsentUpdated';

export type CookieConsentStored = {
  stat: boolean;
  mktg: boolean;
  pref: boolean;
};

export type LeadSource = 'demande-seminaire' | 'reservation';

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

function ensureDataLayer(): unknown[] {
  if (typeof window === 'undefined') return [];
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

/** Shim gtag pour Consent Mode (même format que le snippet Google). */
function gtag(...args: unknown[]): void {
  if (typeof window === 'undefined') return;
  ensureDataLayer().push(args);
}

/** Push générique vers le dataLayer GTM. */
export function pushToDataLayer(payload: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  ensureDataLayer().push(payload);
}

export function readCookieConsent(): CookieConsentStored | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookieConsentStored;
  } catch {
    return null;
  }
}

export function writeCookieConsent(consent: CookieConsentStored): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
}

/** GTM ne se charge que si analytics et/ou marketing sont acceptés. */
export function shouldLoadGtm(consent: CookieConsentStored | null): boolean {
  return Boolean(consent && (consent.stat || consent.mktg));
}

/**
 * Publie l’état de consentement pour GTM (variables / Consent Mode).
 * La case marketing pilote ad_storage — à utiliser comme condition
 * pour le LinkedIn Insight Tag dans le conteneur GTM.
 */
export function pushConsentToDataLayer(consent: CookieConsentStored): void {
  if (typeof window === 'undefined') return;

  const analytics = consent.stat ? 'granted' : 'denied';
  const ads = consent.mktg ? 'granted' : 'denied';
  const functionality = consent.pref ? 'granted' : 'denied';

  gtag('consent', 'update', {
    analytics_storage: analytics,
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
    functionality_storage: functionality,
    personalization_storage: functionality,
    security_storage: 'granted',
  });

  pushToDataLayer({
    event: 'cookie_consent_update',
    cookie_consent: {
      analytics: consent.stat,
      marketing: consent.mktg,
      preferences: consent.pref,
    },
    analytics_storage: analytics,
    ad_storage: ads,
    functionality_storage: functionality,
  });
}

/**
 * Enregistre le consentement, met à jour dataLayer / Consent Mode,
 * et notifie les composants (chargement GTM).
 */
export function applyCookieConsent(consent: CookieConsentStored): void {
  if (typeof window === 'undefined') return;

  writeCookieConsent(consent);
  pushConsentToDataLayer(consent);

  window.dispatchEvent(
    new CustomEvent(COOKIE_CONSENT_EVENT, { detail: consent }),
  );
}

/**
 * Conversion lead unifiée — dataLayer uniquement ; GTM envoie vers GA4.
 * Appelé après succès de `/api/demande-seminaire` ou `/api/reservation`.
 */
export function trackGenerateLead(source: LeadSource): void {
  if (typeof window === 'undefined') return;

  const consent = readCookieConsent();
  if (!consent || (!consent.stat && !consent.mktg)) return;

  pushToDataLayer({
    event: 'generate_lead',
    lead_source: source,
  });
}
