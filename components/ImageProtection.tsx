'use client';

import { useEffect } from 'react';
import { isProtectedImageTarget } from '../lib/protectedImage';

/**
 * Empêche le menu contextuel et le glisser-déposer sur les images du site.
 * Le clic gauche (liens, galeries) n’est pas affecté.
 */
const ImageProtection: React.FC = () => {
  useEffect(() => {
    const blockIfImage = (event: Event) => {
      if (isProtectedImageTarget(event.target)) {
        event.preventDefault();
      }
    };

    document.addEventListener('contextmenu', blockIfImage, true);
    document.addEventListener('dragstart', blockIfImage, true);

    return () => {
      document.removeEventListener('contextmenu', blockIfImage, true);
      document.removeEventListener('dragstart', blockIfImage, true);
    };
  }, []);

  return null;
};

export default ImageProtection;
