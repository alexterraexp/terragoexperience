'use client';

import React, { useState, useEffect } from 'react';

const DAYS_FR = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const MONTHS_FR = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

export type CollapsibleDateRangePickerProps = {
  startDate: string;
  endDate: string;
  onStartChange: (d: string) => void;
  onEndChange: (d: string) => void;
  /** Si true : seulement les deux champs ; le calendrier s’ouvre au clic. */
  collapseCalendar?: boolean;
};

export function CollapsibleDateRangePicker({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  collapseCalendar = false,
}: CollapsibleDateRangePickerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [calendarOpen, setCalendarOpen] = useState(!collapseCalendar);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selecting, setSelecting] = useState<'start' | 'end'>('start');
  const [hovered, setHovered] = useState<string | null>(null);

  const toStr = (d: Date) => d.toISOString().split('T')[0];

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(new Date(viewYear, viewMonth, i));

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  const handleDayClick = (d: Date) => {
    const s = toStr(d);
    if (selecting === 'start') {
      onStartChange(s);
      if (endDate && s > endDate) onEndChange('');
      if (collapseCalendar) setCalendarOpen(false);
      else setSelecting('end');
    } else {
      if (startDate && s < startDate) {
        onStartChange(s);
        if (collapseCalendar) setCalendarOpen(false);
        else setSelecting('end');
      } else {
        onEndChange(s);
        if (collapseCalendar) setCalendarOpen(false);
        else setSelecting('start');
      }
    }
  };

  const isInRange = (d: Date) => {
    const s = toStr(d);
    const rangeEnd = hovered && selecting === 'end' && startDate ? hovered : endDate;
    if (!startDate || !rangeEnd) return false;
    return s > startDate && s < rangeEnd;
  };
  const isStart = (d: Date) => !!startDate && toStr(d) === startDate;
  const isEnd = (d: Date) => !!endDate && toStr(d) === endDate;
  const isPast = (d: Date) => d < today;

  const fmtDisplay = (str: string) =>
    str ? new Date(`${str}T00:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

  useEffect(() => {
    if (!collapseCalendar || !calendarOpen) return;
    const refStr = selecting === 'start' ? startDate : endDate;
    if (refStr) {
      const d = new Date(`${refStr}T00:00:00`);
      setViewYear(d.getFullYear());
      setViewMonth(d.getMonth());
    } else {
      setViewYear(today.getFullYear());
      setViewMonth(today.getMonth());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- ancrage volontaire à l’ouverture
  }, [collapseCalendar, calendarOpen, selecting]);

  const triggerRow = (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <button
        type="button"
        onClick={() => {
          setSelecting('start');
          setCalendarOpen(true);
        }}
        style={{
          width: '100%',
          background: '#faf8f5',
          border: '1px solid rgba(10,44,52,.08)',
          borderRadius: 12,
          padding: '12px 16px',
          fontFamily: 'inherit',
          textAlign: 'left',
          cursor: 'pointer',
          transition: 'all .18s ease',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b0a89e', marginBottom: 3 }}>
          Date d&apos;arrivée
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: startDate ? '#1a2e1a' : '#c4bdb4' }}>
          {startDate ? fmtDisplay(startDate) : 'Choisir…'}
        </div>
      </button>
      <button
        type="button"
        onClick={() => {
          setSelecting('end');
          setCalendarOpen(true);
        }}
        style={{
          width: '100%',
          background: '#faf8f5',
          border: '1px solid rgba(10,44,52,.08)',
          borderRadius: 12,
          padding: '12px 16px',
          fontFamily: 'inherit',
          textAlign: 'left',
          cursor: 'pointer',
          transition: 'all .18s ease',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b0a89e', marginBottom: 3 }}>
          Date de départ
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: endDate ? '#1a2e1a' : '#c4bdb4' }}>{endDate ? fmtDisplay(endDate) : 'Choisir…'}</div>
      </button>
    </div>
  );

  if (collapseCalendar && !calendarOpen) {
    return <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>{triggerRow}</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {collapseCalendar && triggerRow}

      <div style={{ background: '#faf8f5', borderRadius: 16, border: '1px solid rgba(10,44,52,0.08)', overflow: 'hidden' }}>
        {collapseCalendar && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 16px',
              borderBottom: '1px solid rgba(10,44,52,0.06)',
              background: '#fff',
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 700, color: '#1a2e1a' }}>
              {selecting === 'start' ? "Date d'arrivée" : 'Date de départ'}
            </span>
            <button
              type="button"
              onClick={() => setCalendarOpen(false)}
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                border: 'none',
                background: '#f4f1ec',
                cursor: 'pointer',
                fontSize: 16,
                color: '#6b7280',
                lineHeight: 1,
              }}
              aria-label="Fermer le calendrier"
            >
              ×
            </button>
          </div>
        )}

        {!collapseCalendar && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid rgba(10,44,52,0.06)' }}>
            {[
              { label: 'Arrivée', val: startDate, key: 'start' as const },
              { label: 'Départ', val: endDate, key: 'end' as const },
            ].map(({ label, val, key }) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelecting(key)}
                style={{
                  padding: '12px 16px',
                  background: selecting === key ? '#fff' : 'transparent',
                  border: 'none',
                  borderBottom: `2px solid ${selecting === key ? '#1a2e1a' : 'transparent'}`,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all .15s ease',
                  borderRight: key === 'start' ? '1px solid rgba(10,44,52,0.06)' : 'none',
                }}
              >
                <div
                  style={{
                    fontSize: 8,
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: selecting === key ? '#e67e22' : '#b0a89e',
                    marginBottom: 3,
                  }}
                >
                  {label}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: val ? '#1a2e1a' : '#c4bdb4' }}>{val ? fmtDisplay(val) : 'Choisir...'}</div>
              </button>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px 8px' }}>
          <button
            type="button"
            onClick={prevMonth}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(10,44,52,0.06)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1a2e1a',
              fontSize: 12,
              transition: 'background .15s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(10,44,52,0.12)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(10,44,52,0.06)';
            }}
          >
            ‹
          </button>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#1a2e1a', textTransform: 'capitalize', letterSpacing: '0.05em' }}>
            {MONTHS_FR[viewMonth]} {viewYear}
          </span>
          <button
            type="button"
            onClick={nextMonth}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(10,44,52,0.06)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1a2e1a',
              fontSize: 12,
              transition: 'background .15s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(10,44,52,0.12)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(10,44,52,0.06)';
            }}
          >
            ›
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', padding: '0 12px', marginBottom: 4 }}>
          {DAYS_FR.map((d, i) => (
            <div key={i} style={{ textAlign: 'center', fontSize: 9, fontWeight: 700, color: '#b0a89e', letterSpacing: '0.1em', padding: '4px 0' }}>
              {d}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', padding: '0 12px 14px', gap: 2 }}>
          {cells.map((d, i) => {
            if (!d) return <div key={i} />;
            const start = isStart(d);
            const end = isEnd(d);
            const inRange = isInRange(d);
            const past = isPast(d);
            const isToday = toStr(d) === toStr(today);
            return (
              <button
                key={i}
                type="button"
                disabled={past}
                onClick={() => !past && handleDayClick(d)}
                onMouseEnter={() => setHovered(toStr(d))}
                onMouseLeave={() => setHovered(null)}
                style={{
                  height: 32,
                  borderRadius: start || end ? 9999 : inRange ? 0 : 9999,
                  border: isToday && !start && !end ? '1.5px solid rgba(230,126,34,0.4)' : 'none',
                  background: start || end ? '#1a2e1a' : inRange ? 'rgba(26,46,26,0.08)' : 'transparent',
                  color: start || end ? '#fff' : past ? '#d5cfc7' : '#1a2e1a',
                  fontSize: 11,
                  fontWeight: start || end ? 700 : isToday ? 700 : 400,
                  cursor: past ? 'not-allowed' : 'pointer',
                  transition: 'all .12s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>

        <div style={{ padding: '8px 16px 12px', borderTop: '1px solid rgba(10,44,52,0.05)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#e67e22', flexShrink: 0 }} />
          <span style={{ fontSize: 9, color: '#b0a89e', fontWeight: 600, letterSpacing: '0.08em' }}>
            {selecting === 'start' ? "Sélectionnez la date d'arrivée" : 'Sélectionnez la date de départ'}
          </span>
        </div>
      </div>
    </div>
  );
}
