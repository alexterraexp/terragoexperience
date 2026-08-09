'use client';

import React, { useRef, useState } from 'react';
import { HOME_COLORS } from './home/homeStyles';

type FramedHeroImageProps = {
  src: string;
  alt: string;
  className?: string;
};

/**
 * Image de héros encadré : sous-couche marque + indication de chargement,
 * puis fondu de l’image pour éviter le flash gris vide.
 */
const FramedHeroImage: React.FC<FramedHeroImageProps> = ({ src, alt, className = '' }) => {
  const [loaded, setLoaded] = useState(false);
  const prevSrc = useRef(src);

  if (prevSrc.current !== src) {
    prevSrc.current = src;
    if (loaded) setLoaded(false);
  }

  const markLoaded = () => setLoaded(true);

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(145deg, ${HOME_COLORS.primary} 0%, #163038 48%, ${HOME_COLORS.primary} 100%)`,
        }}
      />

      {!loaded ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[3] overflow-hidden"
        >
          <div className="framed-hero-shimmer absolute inset-0" />
          <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden bg-white/10">
            <div className="framed-hero-bar h-full w-1/3" style={{ background: HOME_COLORS.orange }} />
          </div>
        </div>
      ) : null}

      <img
        ref={(el) => {
          if (el?.complete && el.naturalWidth > 0) markLoaded();
        }}
        src={src}
        alt={alt}
        decoding="async"
        fetchPriority="high"
        onLoad={markLoaded}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${className}`}
        style={{ opacity: loaded ? 1 : 0 }}
      />

      <style>{`
        @keyframes framedHeroShimmer {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
        @keyframes framedHeroBar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        .framed-hero-shimmer::before {
          content: '';
          position: absolute;
          inset: 0;
          width: 55%;
          background: linear-gradient(
            100deg,
            transparent 0%,
            rgba(255, 255, 255, 0.08) 45%,
            transparent 100%
          );
          animation: framedHeroShimmer 1.35s ease-in-out infinite;
        }
        .framed-hero-bar {
          animation: framedHeroBar 1.1s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default FramedHeroImage;
