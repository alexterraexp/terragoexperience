'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import {
  COOKIE_CONSENT_EVENT,
  GTM_ID,
  pushConsentToDataLayer,
  readCookieConsent,
  shouldLoadGtm,
  type CookieConsentStored,
} from '../lib/analytics';

/**
 * Charge GTM uniquement après consentement analytics et/ou marketing.
 * Avant injection, pousse l’état Consent Mode pour que les tags du
 * conteneur (dont un futur LinkedIn Insight Tag) respectent `mktg`.
 */
const GoogleTagManager: React.FC = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = (consent?: CookieConsentStored | null) => {
      const c = consent ?? readCookieConsent();
      if (c && shouldLoadGtm(c)) {
        pushConsentToDataLayer(c);
        setEnabled(true);
      }
    };

    sync();

    const onConsent = (e: Event) => {
      const detail = (e as CustomEvent<CookieConsentStored>).detail;
      sync(detail);
    };
    window.addEventListener(COOKIE_CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onConsent);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
};

export default GoogleTagManager;
