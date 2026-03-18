'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ReactGA from 'react-ga4';

const GoogleAnalytics: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: pathname });
  }, [pathname]);

  return null;
};

export default GoogleAnalytics;
