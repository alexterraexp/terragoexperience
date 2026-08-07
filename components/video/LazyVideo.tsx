'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { acquireVideoSlot, releaseVideoSlot } from '../../lib/videoLoadQueue';

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  videoClassName?: string;
  rootMargin?: string;
  threshold?: number;
  /** Si true, la vidéo ne joue qu'au survol (desktop) / focus. */
  playOnHover?: boolean;
}

const LazyVideo: React.FC<LazyVideoProps> = ({
  src,
  poster,
  className = '',
  videoClassName = '',
  rootMargin = '250px',
  threshold = 0.2,
  playOnHover = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [srcLoaded, setSrcLoaded] = useState(false);
  const slotHeldRef = useRef(false);
  const playOnHoverRef = useRef(playOnHover);
  playOnHoverRef.current = playOnHover;

  const releaseSlot = useCallback(() => {
    if (slotHeldRef.current) {
      releaseVideoSlot();
      slotHeldRef.current = false;
    }
  }, []);

  useEffect(() => {
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
  }, [rootMargin, threshold]);

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
        // Affiche la première frame sans démarrer la lecture (mode survol)
        if (playOnHoverRef.current && video.paused) {
          try {
            video.currentTime = 0.01;
          } catch {
            /* ignore */
          }
        }
      };
      video.addEventListener('loadeddata', onLoaded, { once: true });
    });

    return () => {
      cancelled = true;
      releaseSlot();
    };
  }, [shouldLoad, src, srcLoaded, releaseSlot]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !srcLoaded) return;

    const shouldPlay = playOnHover ? isHovered : isVisible;
    if (shouldPlay) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [isVisible, isHovered, srcLoaded, playOnHover]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
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
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      )}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        className={`absolute inset-0 h-full w-full object-cover ${videoClassName}`}
      />
    </div>
  );
};

export default LazyVideo;
