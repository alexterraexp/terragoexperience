'use client';

import { useCallback, useEffect, useRef, useState, type ComponentType } from 'react';
import { Bed, ChevronLeft, ChevronRight, MapPin, Presentation, TrainFront, TreeDeciduous, Users, type LucideProps } from 'lucide-react';
import { protectedImageProps } from '@/lib/protectedImage';
import { LOGEMENT_CHAMPS, type LogementChamp, type RealiseLogement } from '@/lib/seminairesRealises';

const LOGEMENT_ICONS: Record<LogementChamp, ComponentType<LucideProps>> = {
  localisation: MapPin,
  hebergement: Bed,
  capacite: Users,
  travail: Presentation,
  convivialite: TreeDeciduous,
  accessibilite: TrainFront,
};

export default function RealiseLogement({ logement }: { logement: RealiseLogement }) {
  const rows = LOGEMENT_CHAMPS
    .map((champ) => ({ ...champ, value: logement[champ.id].trim() }))
    .filter((champ) => champ.value);
  const images = logement.images;
  const both = rows.length > 0 && images.length > 0;

  return (
    <div className={`mt-8 grid items-center gap-8 ${both ? 'lg:grid-cols-2 lg:gap-12' : ''}`}>
      {rows.length > 0 && (
        <ul className={`space-y-6 ${both ? '' : 'max-w-xl'}`}>
          {rows.map((champ) => {
            const Icon = LOGEMENT_ICONS[champ.id];
            return (
              <li key={champ.id} className="flex items-start gap-3.5">
                <Icon className="mt-0.5 size-[22px] shrink-0 text-[#0c1d22]" strokeWidth={1.6} aria-hidden />
                <div className="min-w-0">
                  <p className="font-sans text-[16px] font-bold leading-tight tracking-[-0.03em] text-[#0c1d22]">
                    {champ.label}
                  </p>
                  <p className="mt-1 font-sans text-[13px] leading-snug tracking-[-0.02em] text-[#0c1d22]/55">
                    {champ.value}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {images.length > 0 && (
        <div className={both ? '' : 'lg:ml-auto lg:w-1/2'}>
          <LogementCarousel images={images} />
        </div>
      )}
    </div>
  );
}

function LogementCarousel({ images }: { images: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = useCallback((next: number) => {
    const track = trackRef.current;
    if (!track || images.length === 0) return;
    const clamped = ((next % images.length) + images.length) % images.length;
    const slide = track.children[clamped] as HTMLElement | undefined;
    if (!slide) return;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    setIndex(clamped);
  }, [images.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const card = track.children[0] as HTMLElement | undefined;
      if (!card || card.offsetWidth <= 0) return;
      setIndex(Math.min(images.length - 1, Math.round(track.scrollLeft / card.offsetWidth)));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [images.length]);

  return (
    <div className="group/carousel relative">
      <div className="overflow-hidden rounded-[22px]">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [touch-action:pan-x_pan-y]"
        >
          {images.map((src, imageIndex) => (
            <div key={`${src}-${imageIndex}`} className="relative aspect-[4/3] w-full shrink-0 snap-center bg-[#f4f4f4]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" {...protectedImageProps} />
            </div>
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Photo précédente"
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/70 text-[#0c1d22] shadow-sm backdrop-blur-sm transition-colors duration-200 hover:bg-white"
          >
            <ChevronLeft size={18} strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Photo suivante"
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/70 text-[#0c1d22] shadow-sm backdrop-blur-sm transition-colors duration-200 hover:bg-white"
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>
          <div className="mt-4 flex items-center justify-center gap-2">
            {images.map((src, dotIndex) => (
              <button
                key={`${src}-dot-${dotIndex}`}
                type="button"
                aria-label={`Photo ${dotIndex + 1}`}
                onClick={() => goTo(dotIndex)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: dotIndex === index ? 28 : 8,
                  background: dotIndex === index ? '#ec6435' : 'rgba(12,29,34,0.18)',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
