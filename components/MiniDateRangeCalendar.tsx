'use client';

import React, { useState } from 'react';

const INK = '#0c1d22';

const MONTHS_FR = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];
const DAYS_FR = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

/** Format local : `toISOString()` décalerait d'un jour en fuseau FR. */
export const toDateKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export const fmtDayShort = (key: string) =>
  new Date(`${key}T00:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });

export const SEMINAIRE_PERIODS = [
  'Janvier – Avril',
  'Mai – Juillet',
  'Août – Octobre',
  'Novembre – Décembre',
] as const;

/** Calendrier compact plage de dates — même modèle que « Organiser mon séminaire ». */
export const MiniDateRangeCalendar: React.FC<{
  start: string;
  end: string;
  onStart: (d: string) => void;
  onEnd: (d: string) => void;
  navClassName?: string;
}> = ({ start, end, onStart, onEnd, navClassName = 'mini-cal-nav' }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [hovered, setHovered] = useState<string | null>(null);

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(new Date(viewYear, viewMonth, i));

  const shiftMonth = (dir: -1 | 1) => {
    const next = new Date(viewYear, viewMonth + dir, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  };

  const pick = (key: string) => {
    if (!start || (start && end) || key < start) {
      onStart(key);
      onEnd('');
    } else {
      onEnd(key);
    }
  };

  const rangeEnd = end || (start && hovered && hovered > start ? hovered : '');

  return (
    <div style={{ marginTop: 10, border: '1px solid rgba(12,29,34,0.10)', borderRadius: 14, padding: '10px 12px 12px', maxWidth: 300 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <button type="button" className={navClassName} onClick={() => shiftMonth(-1)} aria-label="Mois précédent">‹</button>
        <span style={{ fontSize: 12, fontWeight: 600, color: INK, letterSpacing: '-0.03em' }}>
          {MONTHS_FR[viewMonth]} {viewYear}
        </span>
        <button type="button" className={navClassName} onClick={() => shiftMonth(1)} aria-label="Mois suivant">›</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)' }}>
        {DAYS_FR.map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: 9, fontWeight: 600, color: '#b3b3b3', padding: '4px 0' }}>{d}</div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 1 }} onMouseLeave={() => setHovered(null)}>
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const key = toDateKey(d);
          const past = d < today;
          const isStart = key === start;
          const isPreviewEnd = !end && !!start && key === hovered && key > start;
          const isEnd = key === end || isPreviewEnd;
          const inRange = !!start && !!rangeEnd && key > start && key < rangeEnd;
          return (
            <button
              key={i}
              type="button"
              disabled={past}
              onClick={() => pick(key)}
              onMouseEnter={() => setHovered(key)}
              style={{
                height: 28,
                border: 'none',
                borderRadius: isStart || isEnd ? 10 : inRange ? 0 : 10,
                background: isStart || isEnd ? INK : inRange ? 'rgba(12,29,34,0.07)' : 'transparent',
                color: isStart || isEnd ? '#fff' : past ? '#d8d8d8' : INK,
                fontSize: 11,
                fontWeight: isStart || isEnd ? 600 : 400,
                fontFamily: 'inherit',
                cursor: past ? 'not-allowed' : 'pointer',
                transition: 'background .12s ease',
              }}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
