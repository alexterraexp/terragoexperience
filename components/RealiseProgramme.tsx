'use client';

import { useEffect, useRef, useState } from 'react';
import type { RealiseJour } from '@/lib/seminairesRealises';

const GAP = 12;
const MOBILE_GAP = 6;
const RADIUS = 15;
const MOBILE_DENSE_RADIUS = 8;

/** Répartit les photos en rangées. Chaque rangée se justifie sur la largeur, avec le même écart. */
function photoRows(count: number): number[] {
  if (count <= 1) return [1];
  if (count === 2) return [1, 1];
  const perRow = count <= 4 ? 2 : count <= 9 ? 3 : 4;
  const rows = Math.ceil(count / perRow);
  const base = Math.floor(count / rows);
  const extra = count % rows;
  return Array.from({ length: rows }, (_, index) => base + (index < extra ? 1 : 0));
}

function groupPhotos(photos: string[]): string[][] {
  const groups: string[][] = [];
  let cursor = 0;
  for (const count of photoRows(photos.length)) {
    groups.push(photos.slice(cursor, cursor + count));
    cursor += count;
  }
  return groups;
}

function layoutRow(ratios: number[], width: number, gap: number): { height: number; widths: number[] } | null {
  if (width <= 0 || ratios.length === 0 || ratios.some((ratio) => ratio <= 0)) return null;
  const used = ratios;
  const available = Math.max(0, width - gap * (used.length - 1));
  let height = available / used.reduce((sum, ratio) => sum + ratio, 0);
  if (used.length === 1) height = Math.min(height, width * 0.92);
  const widths = used.map((ratio) => height * ratio);
  if (used.length > 1) {
    const drift = available - widths.reduce((sum, item) => sum + item, 0);
    widths[widths.length - 1] += drift;
  }
  return { height, widths };
}

function DayPhotos({ photos }: { photos: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [narrow, setNarrow] = useState(false);
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const gap = narrow ? MOBILE_GAP : GAP;
  const radius = narrow && photos.length > 4 ? MOBILE_DENSE_RADIUS : RADIUS;

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const apply = () => setNarrow(query.matches);
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const measure = () => setWidth(node.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const read = () => {
      const found: Record<string, number> = {};
      node.querySelectorAll('img').forEach((img) => {
        const src = img.getAttribute('src');
        if (!src || !img.naturalWidth || !img.naturalHeight) return;
        found[src] = img.naturalWidth / img.naturalHeight;
      });
      if (Object.keys(found).length === 0) return;
      setRatios((current) => {
        const changed = Object.entries(found).some(([src, ratio]) => Math.abs((current[src] ?? 0) - ratio) >= 0.001);
        return changed ? { ...current, ...found } : current;
      });
    };
    read();
    const images = [...node.querySelectorAll('img')];
    images.forEach((img) => img.addEventListener('load', read));
    return () => images.forEach((img) => img.removeEventListener('load', read));
  }, [photos]);

  const groups = groupPhotos(photos);
  let offset = 0;

  return (
    <div ref={ref} className="flex w-full flex-col" style={{ gap }}>
      {groups.map((row, rowIndex) => {
        const start = offset;
        offset += row.length;
        const layout = layoutRow(row.map((src) => ratios[src] ?? 0), width, gap);
        return (
          <div key={rowIndex} className="flex" style={{ gap }}>
            {row.map((src, index) => {
              const photoIndex = start + index;
              const sized = layout != null;
              return (
                <div
                  key={`${src}-${photoIndex}`}
                  className="overflow-hidden bg-[#f4f4f4]"
                  style={sized ? { width: layout.widths[index], height: layout.height, borderRadius: radius } : { flex: '1 1 0', minHeight: 140, borderRadius: radius }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover"
                    onLoad={(event) => {
                      const img = event.currentTarget;
                      if (!img.naturalWidth || !img.naturalHeight) return;
                      const ratio = img.naturalWidth / img.naturalHeight;
                      setRatios((current) => (
                        Math.abs((current[src] ?? 0) - ratio) < 0.001 ? current : { ...current, [src]: ratio }
                      ));
                    }}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default function RealiseProgramme({ jours }: { jours: RealiseJour[] }) {
  return (
    <div className="space-y-14 sm:space-y-20">
      {jours.map((jour, index) => {
        const photoFirst = index % 2 === 1;
        return (
          <article
            key={`${jour.label}-${index}`}
            className={jour.photos.length > 0 ? 'grid items-center gap-6 md:grid-cols-2 md:gap-12' : ''}
          >
            <div className={jour.photos.length > 0 && photoFirst ? 'md:order-2' : ''}>
              <h3 className="font-sans text-[26px] font-bold leading-[1.1] tracking-[-0.05em] text-[#0c1d22] sm:text-[32px]">
                {jour.label}
              </h3>
              {jour.lignes.length > 0 && (
                <ol className="mt-6 space-y-4">
                  {jour.lignes.map((ligne, ligneIndex) => (
                    <li key={`${ligne.heure}-${ligneIndex}`} className="flex flex-col gap-1 border-b border-[#0c1d22]/10 pb-4 md:flex-row md:gap-6">
                      {ligne.heure && (
                        <span className="shrink-0 font-sans text-sm font-semibold tracking-[-0.03em] text-[#ec6435] md:w-28">
                          {ligne.heure}
                        </span>
                      )}
                      <span className="min-w-0 font-sans text-[15px] leading-relaxed tracking-[-0.03em] text-[#0c1d22]/80">
                        {ligne.action}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
            {jour.photos.length > 0 && (
              <div className={photoFirst ? 'md:order-1' : ''}>
                <DayPhotos photos={jour.photos} />
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
