'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import {
  bottomImageGradientClass,
} from './homeStyles';
import { useModal } from '../../context/ModalContext';

interface HomeHeroProps {
  videoSrc: string;
  /** Affiché immédiatement pendant le chargement de la vidéo. */
  posterSrc?: string;
}

const HomeHero: React.FC<HomeHeroProps> = ({ videoSrc, posterSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { openModal } = useModal();
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    setVideoReady(false);

    const tryPlay = () => {
      if (cancelled) return;
      video.muted = true;
      video.playsInline = true;
      void video.play()
        .then(() => {
          if (!cancelled) setVideoReady(true);
        })
        .catch(() => undefined);
    };

    // Reprend depuis le début à chaque montage / nouvel URL.
    const onLoadedData = () => {
      try {
        video.currentTime = 0;
      } catch {
        /* ignore */
      }
      tryPlay();
    };

    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('canplay', tryPlay);
    tryPlay();

    return () => {
      cancelled = true;
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('canplay', tryPlay);
    };
  }, [videoSrc]);

  const scrollToConcept = () => {
    document.getElementById('concept')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* Conteneur pleine largeur — hauteur viewport sur mobile */}
      <div className="relative h-[100svh] min-h-[640px] w-full sm:min-h-[600px] lg:h-screen lg:max-h-[100svh]">
        {posterSrc ? (
          <Image
            src={posterSrc}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className={`object-cover transition-opacity duration-500 ${
              videoReady ? 'opacity-0' : 'opacity-100'
            }`}
          />
        ) : null}

        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
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

        <div className="relative z-10 flex h-full flex-col items-start justify-center px-5 pt-24 pb-14 text-left sm:items-center sm:px-6 sm:pt-28 sm:pb-12 sm:text-center">
          <h1 className="max-w-none font-sans text-[clamp(2.05rem,7vw,2.55rem)] font-normal leading-[1.08] tracking-[-0.075em] text-white sm:text-[clamp(1.85rem,6.6vw,3.75rem)] sm:leading-[1.06]">
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
          <p className="mt-4 max-w-5xl px-0 font-sans text-[13px] font-normal leading-[1.5] tracking-[-0.04em] text-white/95 sm:mt-10 sm:text-lg sm:leading-relaxed">
            Des séminaires d&apos;entreprise au vert qui sortent du cadre, à la rencontre des
            territoires.
          </p>
          <div className="mt-10 flex w-full flex-col items-start gap-3 sm:mt-24 sm:w-auto sm:flex-row sm:items-center sm:justify-center sm:gap-5">
            <Link
              href="/seminaires-entreprise"
              className="hidden rounded-full border-2 border-white px-5 py-1.5 text-[11px] font-bold tracking-[-0.02em] text-white backdrop-blur-md transition-colors hover:border-[#ec6435] sm:inline-flex sm:items-center sm:justify-center sm:px-10 sm:py-2.5 sm:text-[13px]"
              style={{ background: 'rgba(12, 29, 34, 0.1)' }}
            >
              Découvrir nos séminaires
            </Link>
            <button
              type="button"
              onClick={openModal}
              className="rounded-full border-2 border-white bg-[rgba(12,29,34,0.1)] px-7 py-2 text-[13px] font-bold tracking-[-0.02em] text-white backdrop-blur-md transition-colors hover:border-[#ec6435] sm:border-0 sm:bg-white sm:px-10 sm:py-2.5 sm:text-[13px] sm:text-[#0c1d22] sm:backdrop-blur-none sm:hover:border-0 sm:hover:bg-[#ec6435] sm:hover:text-white"
            >
              Parlons de votre projet
            </button>
          </div>
          <button
            type="button"
            onClick={scrollToConcept}
            className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 inline-flex -translate-x-1/2 items-center justify-center sm:hidden"
            aria-label="Descendre à la suite"
          >
            <ChevronDown
              size={28}
              strokeWidth={1.5}
              className="text-white/45 transition-opacity hover:text-white/70"
              aria-hidden
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
