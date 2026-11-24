'use client';

import { useState } from 'react';
import type { RealiseJour } from '@/lib/seminairesRealises';

export default function RealiseProgramme({ jours }: { jours: RealiseJour[] }) {
  const [index, setIndex] = useState(0);
  const jour = jours[Math.min(index, jours.length - 1)] ?? jours[0];
  if (!jour) return null;

  return (
    <div>
      {jours.length > 1 && (
        <div className="flex flex-wrap gap-1 rounded-[1.75rem] bg-[#ec6435] p-1.5" role="tablist" aria-label="Jours">
          {jours.map((item, itemIndex) => (
            <button
              key={item.label + itemIndex}
              type="button"
              role="tab"
              aria-selected={itemIndex === index}
              onClick={() => setIndex(itemIndex)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                itemIndex === index ? 'bg-white text-[#0c1d22] shadow-sm' : 'text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
      <ol className={jours.length > 1 ? 'mt-6 space-y-4' : 'space-y-4'}>
        {jour.lignes.map((ligne, ligneIndex) => (
          <li key={`${ligne.heure}-${ligneIndex}`} className="flex flex-col gap-1 border-b border-[#0c1d22]/10 pb-4 md:flex-row md:gap-6">
            {ligne.heure && (
              <span className="shrink-0 font-sans text-sm font-semibold tracking-[-0.03em] text-[#ec6435] md:w-36">
                {ligne.heure}
              </span>
            )}
            <span className="min-w-0 font-sans text-[15px] leading-relaxed tracking-[-0.03em] text-[#0c1d22]/80">
              {ligne.action}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
