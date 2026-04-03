'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import ReactGA from 'react-ga4';
import { GA_MEASUREMENT_ID, readCookieConsent } from '../lib/analytics';

const GoogleAnalytics: React.FC = () => {
  const pathname = usePathname();
  const initialized = useRef(false);

  useEffect(() => {
    const consent = readCookieConsent();
    if (!consent?.stat) return;

    if (!initialized.current) {
      ReactGA.initialize(GA_MEASUREMENT_ID);
      initialized.current = true;
    }
    ReactGA.send({ hitType: 'pageview', page: pathname });
  }, [pathname]);

  return null;
};

export default GoogleAnalytics;
