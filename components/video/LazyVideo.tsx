'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { acquireVideoSlot, releaseVideoSlot } from '../../lib/videoLoadQueue';

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  videoClassName?: string;
  /** Marge autour du viewport pour précharger (utile carrousels horizontaux). */
  rootMargin?: string;
  threshold?: number;
  /** Si true, la vidéo ne joue qu'au survol (desktop) / focus. */
  playOnHover?: boolean;
  /** Charge dès le montage, sans attendre l’intersection. */
  priority?: boolean;
}

const LazyVideo: React.FC<LazyVideoProps> = ({
  src,
  poster,
  className = '',
  videoClassName = '',
  // Précharge largement à gauche/droite pour les cards qui « peek » dans un swipe.
  rootMargin = '120px 70% 120px 70%',
  threshold = 0,
  playOnHover = false,
  priority = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [isVisible, setIsVisible] = useState(priority);
  const [isHovered, setIsHovered] = useState(false);
  const [srcLoaded, setSrcLoaded] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);
  const slotHeldRef = useRef(false);
  const playOnHoverRef = useRef(playOnHover);
  playOnHoverRef.current = playOnHover;

  const releaseSlot = useCallback(() => {
    if (slotHeldRef.current) {
      releaseVideoSlot();
      slotHeldRef.current = false;
    }
  }, []);

  const showFirstFrame = useCallback((video: HTMLVideoElement) => {
    try {
      if (video.currentTime < 0.05) video.currentTime = 0.05;
    } catch {
      /* ignore */
    }
    setHasFrame(true);
  }, []);

  useEffect(() => {
    if (priority) {
      setShouldLoad(true);
      setIsVisible(true);
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, priority]);

  useEffect(() => {
    if (!shouldLoad || srcLoaded) return;

    let cancelled = false;
    const video = videoRef.current;
    if (!video) return;

    void acquireVideoSlot().then(() => {
      if (cancelled) {
        releaseVideoSlot();
        return;
      }
      slotHeldRef.current = true;
      video.src = src;
      video.load();
      setSrcLoaded(true);

      const onLoaded = () => {
        releaseSlot();
        showFirstFrame(video);
      };
      video.addEventListener('loadeddata', onLoaded, { once: true });
    });

    return () => {
      cancelled = true;
      releaseSlot();
    };
  }, [shouldLoad, src, srcLoaded, releaseSlot, showFirstFrame]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !srcLoaded) return;

    const shouldPlay = playOnHover ? isHovered : isVisible;
    if (shouldPlay) {
      video.muted = true;
      void video.play()
        .then(() => setHasFrame(true))
        .catch(() => undefined);
    } else {
      video.pause();
      // Garde une frame visible (évite le rectangle blanc sur les cards adjacentes).
      showFirstFrame(video);
    }
  }, [isVisible, isHovered, srcLoaded, playOnHover, showFirstFrame]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#0c1d22] ${className}`}
      onMouseEnter={playOnHover ? () => setIsHovered(true) : undefined}
      onMouseLeave={playOnHover ? () => setIsHovered(false) : undefined}
      onFocus={playOnHover ? () => setIsHovered(true) : undefined}
      onBlur={playOnHover ? () => setIsHovered(false) : undefined}
    >
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            hasFrame ? 'opacity-0' : 'opacity-100'
          }`}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload={priority ? 'auto' : 'metadata'}
        poster={poster}
        className={`absolute inset-0 h-full w-full object-cover ${videoClassName}`}
      />
    </div>
  );
};

export default LazyVideo;
