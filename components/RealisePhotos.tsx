'use client';

import { useEffect, useState, type ReactNode } from 'react';

export default function RealisePhotos({ images, label }: { images: string[]; label: string }) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  if (images.length === 0) return null;

  const main = images[0];
  const side = images.slice(1, 3);
  const hidden = Math.max(0, images.length - 3);

  return (
    <>
      <div
        className={`grid gap-2 overflow-hidden rounded-[26px] ${
          side.length > 0 ? 'md:h-[min(68vw,520px)] md:grid-cols-2 md:grid-rows-2' : ''
        }`}
      >
        <PhotoFrame
          src={main}
          alt={label}
          className={side.length > 0 ? 'aspect-[4/3] md:col-start-1 md:row-span-2 md:aspect-auto md:h-full' : 'aspect-[4/3] md:aspect-[2.2/1]'}
        />
        {side.map((src, index) => {
          const isLast = index === side.length - 1;
          const showMore = isLast && hidden > 0;
          return (
            <PhotoButton
              key={src + index}
              src={src}
              alt={`${label} – ${index + 2}`}
              className={`aspect-[16/9] md:aspect-auto md:h-full ${side.length === 1 ? 'md:row-span-2' : ''}`}
              onClick={() => setOpenAt(showMore ? 0 : index + 1)}
            >
              {showMore && (
                <span className="absolute inset-0 flex items-center justify-center bg-[#0c1d22]/50 text-white">
                  <span className="font-sans text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">+{hidden}</span>
                </span>
              )}
            </PhotoButton>
          );
        })}
      </div>
      {openAt != null && (
        <RealiseLightbox images={images} label={label} initialIndex={openAt} onClose={() => setOpenAt(null)} />
      )}
    </>
  );
}

function PhotoFrame({
  src,
  alt,
  className,
  children,
}: {
  src: string;
  alt: string;
  className: string;
  children?: ReactNode;
}) {
  return (
    <div className={`relative block w-full overflow-hidden bg-[#0c1d22] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" />
      {children}
    </div>
  );
}

function PhotoButton({
  src,
  alt,
  className,
  onClick,
  children,
}: {
  src: string;
  alt: string;
  className: string;
  onClick: () => void;
  children?: ReactNode;
}) {
  return (
    <button type="button" onClick={onClick} className={`relative block w-full overflow-hidden bg-[#0c1d22] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" />
      {children}
    </button>
  );
}

function RealiseLightbox({
  images,
  label,
  initialIndex,
  onClose,
}: {
  images: string[];
  label: string;
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const prev = () => setIndex((current) => (current - 1 + images.length) % images.length);
  const next = () => setIndex((current) => (current + 1) % images.length);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [images.length, onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label={`Photos — ${label}`} className="fixed inset-0 z-[2000] bg-white">
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-5 top-5 z-20 flex size-11 items-center justify-center rounded-full border border-[#0c1d22]/10 bg-white text-2xl text-[#0c1d22] shadow-sm sm:right-16 sm:top-7"
      >
        ×
      </button>

      <div className="flex h-full flex-col items-center justify-center px-4 pb-6 pt-20 md:hidden">
        <p className="mb-4 rounded-full border border-[#0c1d22]/10 bg-white px-3 py-1 text-[11px] font-bold text-[#0c1d22]">
          {index + 1} / {images.length}
        </p>
        <div className="relative flex w-full max-w-5xl items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[index]} alt={`${label} – ${index + 1}`} className="max-h-[70vh] w-auto max-w-full rounded-[18px] object-contain" />
          {images.length > 1 && (
            <>
              <button type="button" onClick={prev} aria-label="Photo précédente" className="absolute left-0 flex size-11 items-center justify-center rounded-full border border-[#0c1d22]/10 bg-white text-2xl">‹</button>
              <button type="button" onClick={next} aria-label="Photo suivante" className="absolute right-0 flex size-11 items-center justify-center rounded-full border border-[#0c1d22]/10 bg-white text-2xl">›</button>
            </>
          )}
        </div>
      </div>

      <div className="hidden h-full overflow-y-auto px-8 pb-16 pt-24 md:block lg:px-20">
        <div className="mx-auto columns-2 gap-6" style={{ maxWidth: 1100 }}>
          {images.map((src, imageIndex) => (
            <figure key={src + imageIndex} className="mb-6 break-inside-avoid">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${label} – ${imageIndex + 1}`} className="w-full rounded-[10px]" />
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
