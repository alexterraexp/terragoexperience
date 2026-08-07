'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  homeH1Class,
  homeParagraphClass,
  bottomImageGradientClass,
} from './homeStyles';
import { useModal } from '../../context/ModalContext';

interface HomeHeroProps {
  videoSrc: string;
}

const HomeHero: React.FC<HomeHeroProps> = ({ videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { openModal } = useModal();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    void video.play().catch(() => undefined);
  }, [videoSrc]);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Conteneur pleine largeur — hauteur responsive identique sur tous les écrans */}
      <div className="relative h-[100svh] min-h-[520px] w-full max-h-[900px] sm:max-h-none sm:min-h-[600px] lg:h-screen lg:max-h-[100svh]">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          aria-label="Transhumance en montagne – TerraGo"
        />

        <div className={`${bottomImageGradientClass} z-[1]`} />
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.08) 45%, rgba(0,0,0,0.4) 100%)',
          }}
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 pt-24 pb-12 text-center sm:px-5 sm:pt-28">
          <h1 className={`${homeH1Class} max-w-none text-[clamp(2.45rem,8vw,3.75rem)] leading-[1.02] text-white`}>
            <span className="sm:whitespace-nowrap">
              <span className="font-bold">Séminaires d&apos;entreprise engagés,</span>{' '}
              <span className="font-normal">à la</span>
            </span>
            <br className="hidden sm:block" />
            {' '}
            <span className="font-normal sm:whitespace-nowrap">
              rencontre des producteurs français.
            </span>
          </h1>
          <p className={`${homeParagraphClass} mt-6 max-w-5xl text-[17px] leading-relaxed text-white/95 sm:mt-10 sm:text-lg`}>
          Team building, séminaires au vert et expériences RSE à la rencontre de producteurs engagés partout en France. 
          </p>
          <div className="mt-20 flex flex-col items-center gap-3 sm:mt-24 sm:flex-row sm:gap-5">
            <Link
              href="/seminaires-entreprise"
              className="rounded-full border-2 border-white px-14 py-2 text-sm font-bold tracking-[0.02em] text-white backdrop-blur-md transition-colors hover:border-[#ec6435] sm:min-w-[280px] sm:px-16 sm:text-center"
              style={{ background: 'rgba(12, 29, 34, 0.1)' }}
            >
              Découvrir nos séminaires
            </Link>
            <button
              type="button"
              onClick={openModal}
              className="rounded-full bg-white px-14 py-2 text-sm font-bold tracking-[0.02em] text-[#0c1d22] transition-colors hover:bg-[#ec6435] hover:text-white sm:min-w-[280px] sm:px-16 sm:text-center"
            >
              Organiser votre séminaire
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
