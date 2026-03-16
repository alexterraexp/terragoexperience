import React, { useState, useRef, useEffect } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface ProgrammeItem { heure: string; action: string; }
interface Format {
  titre: string; sous_titre: string; participants: string;
  duree: string; prix: string; inclus: string[];
  programme: ProgrammeItem[];
}
interface Seminaire {
  id: string; label: string; producteur: string; region: string;
  couleur: string; couleurLight: string; bestseller: boolean;
  image: string; images: string[];
  formats: { [key: string]: Format };
}

// ─── Constantes ────────────────────────────────────────────────────────────────

const PRODUITS = [
  { id: 'all',        label: 'Tous' },
  { id: 'truffes',    label: 'Truffes' },
  { id: 'olives',     label: 'Olives' },
  { id: 'noix',       label: 'Noix' },
  { id: 'piments',    label: 'Piments' },
  { id: 'spiritueux', label: 'Spiritueux' },
  { id: 'vins',       label: 'Vins' },
  { id: 'huitres',    label: 'Huîtres',  comingSoon: true },
  { id: 'fromage',    label: 'Fromage',  comingSoon: true },
];

// Mapping univers (page Séminaires) → filtre + mots-clés pour mettre en avant la bonne offre packagée
const UNIVERS_TO_PACK: Record<string, { produitId: string; keywords: string[] }> = {
  cognac:   { produitId: 'spiritueux', keywords: ['cognac', 'pineau'] },
  olive:    { produitId: 'olives',      keywords: ['olive', 'lavande'] },
  noix:     { produitId: 'noix',       keywords: ['noix'] },
  truffe:   { produitId: 'truffes',    keywords: ['truffe'] },
  fromage:  { produitId: 'fromage',    keywords: ['fromage', 'chèvre', 'chevre'] },
  vin:      { produitId: 'vins',       keywords: ['vin', 'vign', 'ventoux'] },
  piment:   { produitId: 'piments',    keywords: ['piment'] },
  noisette: { produitId: 'noix',       keywords: ['noisette'] },
};

const FORMATS = [
  { id: '1jour',  label: '1 journée' },
  { id: '2jours', label: '2 jours' },
  { id: 'mesure', label: 'Sur mesure' },
];

const MONTHS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const PARTICIPANTS_OPTIONS = ['Moins de 10','10 – 20','20 – 40','40 – 80','80 – 150','150+'];
const STEPS = [{ label: 'Sélection' }, { label: 'Coordonnées' }, { label: 'Logistique' }, { label: 'Récapitulatif' }];

// ─── Styles communs ────────────────────────────────────────────────────────────

const inputStyle: CSSProperties = {
  width: '100%', background: '#faf8f5',
  border: '1px solid rgba(10,44,52,0.08)', borderRadius: 12,
  padding: '12px 16px', fontFamily: 'inherit', fontSize: 14, color: '#1a2e1a',
  outline: 'none', transition: 'all 0.18s ease', boxSizing: 'border-box',
};

// ─── FieldBlock ────────────────────────────────────────────────────────────────

const FieldBlock: React.FC<{ label: string; required?: boolean; children: ReactNode }> = ({ label, required, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
    <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b0a89e', display: 'block', marginBottom: 8 }}>
      {label}{required && <span style={{ color: '#e67e22', marginLeft: 4 }}>*</span>}
    </label>
    {children}
  </div>
);

// ─── TagBtn ────────────────────────────────────────────────────────────────────

const TagBtn: React.FC<{ active: boolean; onClick: () => void; children: ReactNode; small?: boolean }> = ({ active, onClick, children, small }) => (
  <button onClick={onClick} style={{
    padding: small ? '5px 12px' : '7px 14px', borderRadius: 9999,
    border: `1.5px solid ${active ? '#1a2e1a' : 'rgba(10,44,52,0.1)'}`,
    background: active ? '#1a2e1a' : '#faf8f5',
    color: active ? '#fff' : '#7a7060',
    fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
    cursor: 'pointer', fontFamily: 'inherit',
    boxShadow: active ? '0 2px 10px rgba(26,46,26,0.15)' : 'none',
    transition: 'all 0.15s ease', display: 'inline-flex', alignItems: 'center', gap: 5,
  }}>
    {active && <span style={{ fontSize: 9 }}>✓</span>}
    {children}
  </button>
);

// ─── ModeBtn ──────────────────────────────────────────────────────────────────

const ModeBtn: React.FC<{ active: boolean; onClick: () => void; children: ReactNode }> = ({ active, onClick, children }) => (
  <button onClick={onClick} style={{
    padding: '7px 16px', borderRadius: 9999,
    border: `1.5px solid ${active ? '#e67e22' : 'rgba(10,44,52,0.1)'}`,
    background: active ? '#e67e22' : '#faf8f5',
    color: active ? '#fff' : '#b0a89e',
    fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
    cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s ease',
  }}>
    {children}
  </button>
);

// ─── ToggleCard ────────────────────────────────────────────────────────────────

const ToggleCard: React.FC<{ icon: ReactNode; label: string; active: boolean; onToggle: () => void; children?: ReactNode }> = ({ icon, label, active, onToggle, children }) => (
  <div style={{ padding: '18px', borderRadius: 16, border: `1.5px solid ${active ? '#1a2e1a' : 'rgba(10,44,52,0.08)'}`, background: active ? 'rgba(26,46,26,0.03)' : '#faf8f5', transition: 'all 0.2s ease' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#1a2e1a', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{label}</span>
      </div>
      <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
        <input type="checkbox" checked={active} onChange={onToggle} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
        <div style={{ width: 40, height: 22, background: active ? '#1a2e1a' : '#d4cec8', borderRadius: 11, position: 'relative', transition: 'background 0.2s ease' }}>
          <div style={{ position: 'absolute', top: 3, left: active ? 21 : 3, width: 16, height: 16, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.15)', transition: 'left 0.2s ease' }} />
        </div>
      </label>
    </div>
    {children}
  </div>
);

// ─── CustomSelect ──────────────────────────────────────────────────────────────

const CustomSelect: React.FC<{
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}> = ({ value, onChange, options, placeholder }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selectedLabel = options.find(o => o.value === value)?.label ?? '';

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        style={{
          ...inputStyle,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer', textAlign: 'left',
          border: `1px solid ${open ? '#1a2e1a' : 'rgba(10,44,52,0.08)'}`,
          boxShadow: open ? '0 0 0 3px rgba(26,46,26,0.08)' : 'none',
        }}
      >
        <span style={{ color: value ? '#1a2e1a' : '#b0a89e', fontSize: 14, fontWeight: value ? 500 : 400 }}>
          {value ? selectedLabel : (placeholder ?? '— Choisir —')}
        </span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', flexShrink: 0, marginLeft: 8 }}>
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#1a2e1a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 100,
          background: '#fff', borderRadius: 14, border: '1px solid rgba(10,44,52,0.1)',
          boxShadow: '0 8px 32px rgba(26,46,26,0.12)', overflow: 'hidden',
          maxHeight: 'min(320px, 70vh)', display: 'flex', flexDirection: 'column',
        }}>
          <button type="button" onClick={() => { onChange(''); setOpen(false); }}
            style={{ width: '100%', padding: '11px 16px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: 13, color: '#b0a89e', fontFamily: 'inherit', borderBottom: '1px solid rgba(10,44,52,0.05)', flexShrink: 0 }}>
            — Choisir un produit —
          </button>
          <div style={{ overflowY: 'auto', overflowX: 'hidden', flex: 1, minHeight: 0 }}>
          {options.map(opt => (
            <button key={opt.value} type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              style={{
                width: '100%', padding: '11px 16px', background: opt.value === value ? 'rgba(26,46,26,0.04)' : 'none',
                border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: 14,
                color: opt.value === value ? '#1a2e1a' : '#4a4540',
                fontWeight: opt.value === value ? 700 : 400,
                fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 10,
                transition: 'background 0.12s ease',
              }}
              onMouseEnter={e => { if (opt.value !== value) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(26,46,26,0.03)'; }}
              onMouseLeave={e => { if (opt.value !== value) (e.currentTarget as HTMLButtonElement).style.background = 'none'; }}
            >
              {opt.value === value && (
                <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#1a2e1a', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5.5L4.2 7.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              )}
              {opt.value !== value && <span style={{ width: 16, flexShrink: 0 }} />}
              {opt.label}
            </button>
          ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── DateRangePicker ───────────────────────────────────────────────────────────

const DAYS_FR = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const MONTHS_FR = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

const DateRangePicker: React.FC<{
  startDate: string; endDate: string;
  onStartChange: (d: string) => void; onEndChange: (d: string) => void;
}> = ({ startDate, endDate, onStartChange, onEndChange }) => {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selecting, setSelecting] = useState<'start' | 'end'>('start');
  const [hovered, setHovered] = useState<string | null>(null);
  const toStr = (d: Date) => d.toISOString().split('T')[0];
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const offset = (firstDay === 0 ? 6 : firstDay - 1);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(new Date(viewYear, viewMonth, i));
  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); };
  const handleDayClick = (d: Date) => {
    const s = toStr(d);
    if (selecting === 'start') { onStartChange(s); if (endDate && s > endDate) onEndChange(''); setSelecting('end'); }
    else { if (startDate && s < startDate) { onStartChange(s); setSelecting('end'); } else { onEndChange(s); setSelecting('start'); } }
  };
  const isInRange = (d: Date) => {
    const s = toStr(d);
    const rangeEnd = hovered && selecting === 'end' && startDate ? hovered : endDate;
    if (!startDate || !rangeEnd) return false;
    return s > startDate && s < rangeEnd;
  };
  const isStart = (d: Date) => !!startDate && toStr(d) === startDate;
  const isEnd   = (d: Date) => !!endDate && toStr(d) === endDate;
  const isPast  = (d: Date) => d < today;
  const fmtDisplay = (s: string) => s ? new Date(s + 'T00:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

  return (
    <div style={{ background: '#faf8f5', borderRadius: 16, border: '1px solid rgba(10,44,52,0.08)', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid rgba(10,44,52,0.06)' }}>
        {(['start', 'end'] as const).map(key => (
          <button key={key} type="button" onClick={() => setSelecting(key)}
            style={{ padding: '12px 16px', background: selecting === key ? '#fff' : 'transparent', border: 'none', borderBottom: `2px solid ${selecting === key ? '#1a2e1a' : 'transparent'}`, cursor: 'pointer', textAlign: 'left', transition: 'all .15s ease', borderRight: key === 'start' ? '1px solid rgba(10,44,52,0.06)' : 'none' }}>
            <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: selecting === key ? '#e67e22' : '#b0a89e', marginBottom: 3 }}>{key === 'start' ? 'Arrivée' : 'Départ'}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: (key === 'start' ? startDate : endDate) ? '#1a2e1a' : '#c4bdb4' }}>{fmtDisplay(key === 'start' ? startDate : endDate)}</div>
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px 8px' }}>
        <button type="button" onClick={prevMonth} style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'rgba(10,44,52,0.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a2e1a', fontSize: 12 }}>‹</button>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#1a2e1a', textTransform: 'capitalize', letterSpacing: '0.05em' }}>{MONTHS_FR[viewMonth]} {viewYear}</span>
        <button type="button" onClick={nextMonth} style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'rgba(10,44,52,0.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a2e1a', fontSize: 12 }}>›</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', padding: '0 12px', marginBottom: 4 }}>
        {DAYS_FR.map((d, i) => <div key={i} style={{ textAlign: 'center', fontSize: 9, fontWeight: 700, color: '#b0a89e', letterSpacing: '0.1em', padding: '4px 0' }}>{d}</div>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', padding: '0 12px 14px', gap: 2 }}>
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const start = isStart(d), end = isEnd(d), inRange = isInRange(d), past = isPast(d);
          const isToday = toStr(d) === toStr(today);
          return (
            <button key={i} type="button" disabled={past} onClick={() => !past && handleDayClick(d)}
              onMouseEnter={() => setHovered(toStr(d))} onMouseLeave={() => setHovered(null)}
              style={{ height: 32, borderRadius: start || end ? 9999 : inRange ? 0 : 9999, border: isToday && !start && !end ? '1.5px solid rgba(230,126,34,0.4)' : 'none', background: start || end ? '#1a2e1a' : inRange ? 'rgba(26,46,26,0.08)' : 'transparent', color: start || end ? '#fff' : past ? '#d5cfc7' : '#1a2e1a', fontSize: 11, fontWeight: start || end ? 700 : isToday ? 700 : 400, cursor: past ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {d.getDate()}
            </button>
          );
        })}
      </div>
      <div style={{ padding: '8px 16px 12px', borderTop: '1px solid rgba(10,44,52,0.05)', display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#e67e22', flexShrink: 0 }} />
        <span style={{ fontSize: 9, color: '#b0a89e', fontWeight: 600, letterSpacing: '0.08em' }}>{selecting === 'start' ? "Sélectionnez la date d'arrivée" : "Sélectionnez la date de départ"}</span>
      </div>
    </div>
  );
};

// ─── RecapRow ──────────────────────────────────────────────────────────────────

const RecapRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(10,44,52,0.05)' }}>
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#b0a89e', flexShrink: 0 }}>{label}</span>
    <span style={{ fontSize: 14, fontWeight: 600, color: '#1a2e1a', textAlign: 'right' }}>{value || '—'}</span>
  </div>
);

// ─── ProgrammeAccordion ────────────────────────────────────────────────────────

function ProgrammeAccordion({ programme, couleur, triggerKey }: { programme: ProgrammeItem[]; couleur: string; triggerKey: any }) {
  const [expanded, setExpanded] = useState(false);
  const prev = useRef<any>(null);
  if (prev.current !== triggerKey) { prev.current = triggerKey; if (expanded) setExpanded(false); }
  return (
    <div style={{ borderTop: '1px solid rgba(26,46,26,0.06)', paddingTop: 14 }}>
      <button onClick={() => setExpanded(v => !v)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: expanded ? 14 : 0 }}>
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#1a2e1a' }}>Exemple de programme</span>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: '50%', background: 'rgba(26,46,26,0.05)', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', flexShrink: 0 }}>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2.5 5L7 9.5L11.5 5" stroke="#b0a89e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </button>
      <div style={{ maxHeight: expanded ? '500px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 4 }}>
          {programme.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ color: couleur, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', flexShrink: 0, width: 60, paddingTop: 2 }}>{p.heure}</span>
              <span style={{ color: '#7a7060', fontSize: 12, lineHeight: 1.6 }}>{p.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ImageCarousel ─────────────────────────────────────────────────────────────

function ImageCarousel({ images, titre, region, bestseller, resetKey }: { images: string[]; titre: string; region: string; bestseller: boolean; resetKey: any }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [photoDir, setPhotoDir] = useState('right');
  const [photoKey, setPhotoKey] = useState(0);
  const touchStart = useRef<number | null>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { setPhotoIndex(0); setPhotoKey(k => k + 1); }, [resetKey]);

  useEffect(() => {
    if (images.length <= 1) return;
    autoRef.current = setInterval(() => {
      setPhotoDir('right'); setPhotoIndex(i => (i + 1) % images.length); setPhotoKey(k => k + 1);
    }, 4000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [images.length, resetKey]);

  const goPhoto = (dir: 'prev' | 'next') => {
    if (autoRef.current) clearInterval(autoRef.current);
    setPhotoDir(dir === 'next' ? 'right' : 'left');
    setPhotoIndex(i => dir === 'next' ? (i + 1) % images.length : (i - 1 + images.length) % images.length);
    setPhotoKey(k => k + 1);
  };

  const currentImg = images[photoIndex] ?? '';

  return (
    <div className="sem-img-wrap"
      onTouchStart={e => { touchStart.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        if (touchStart.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(dx) > 44) goPhoto(dx < 0 ? 'next' : 'prev');
        touchStart.current = null;
      }}
      style={{ position: 'relative', height: 280, overflow: 'hidden', borderRadius: '24px 24px 0 0' }}>
      <div key={photoKey} style={{ position: 'absolute', inset: 0, animation: `photoSlideIn${photoDir === 'right' ? 'Right' : 'Left'} 0.45s cubic-bezier(0.22,1,0.36,1) both` }}>
        <img src={currentImg} alt={titre} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none', userSelect: 'none' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,46,26,0.65) 0%, transparent 55%)', pointerEvents: 'none' }} />
      {images.length > 1 && (
        <>
          <button className="sem-img-arrow" onClick={() => goPhoto('prev')} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M7.5 2L3.5 6L7.5 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button className="sem-img-arrow" onClick={() => goPhoto('next')} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M4.5 2L8.5 6L4.5 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div style={{ position: 'absolute', bottom: 46, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 5, zIndex: 2 }}>
            {images.map((_, i) => (
              <button key={i} onClick={() => { if (autoRef.current) clearInterval(autoRef.current); setPhotoDir(i > photoIndex ? 'right' : 'left'); setPhotoIndex(i); setPhotoKey(k => k + 1); }}
                style={{ width: i === photoIndex ? 16 : 5, height: 5, borderRadius: 3, background: i === photoIndex ? '#fff' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)' }} />
            ))}
          </div>
          <div style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)', borderRadius: 9999, padding: '4px 10px', fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.08em', zIndex: 2 }}>
            {photoIndex + 1} / {images.length}
          </div>
        </>
      )}
      {bestseller && (
        <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(100,100,100,0.35)', borderRadius: 9999, padding: '4px 12px', fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', zIndex: 2 }}>★ Populaire</div>
      )}
      <div style={{ position: 'absolute', bottom: 14, left: 16, fontSize: 11, color: 'rgba(255,255,255,0.85)', fontWeight: 600, letterSpacing: '0.04em', zIndex: 2 }}>{region}</div>
    </div>
  );
}

// ─── SeminaireModal ────────────────────────────────────────────────────────────

function SeminaireModal({ isOpen, onClose, seminaires, initialSeminaire, initialFormatId }: {
  isOpen: boolean; onClose: () => void; seminaires: Seminaire[]; initialSeminaire: Seminaire | null; initialFormatId: string;
}) {
  const [step, setStep] = useState(1);
  const [closing, setClosing] = useState(false);
  const [transitioning, setTrans] = useState(false);
  const [submitting, setSubmit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', entreprise: '', participants: '', message: '' });
  const [selectedSeminaireId, setSelectedSeminaireId] = useState<string | null>(null);
  const [selectedFormatId, setSelectedFormatId] = useState('1jour');
  const [accTypes, setAccTypes] = useState<string[]>([]);
  const [transport, setTransport] = useState('');
  const [months, setMonths] = useState<string[]>([]);
  const [periodMode, setPeriod] = useState<'dates' | 'months'>('dates');
  const [startDate, setStart] = useState('');
  const [endDate, setEnd] = useState('');
  const [hebergement, setHeberg] = useState(false);
  const [withTransport, setWithT] = useState(false);
  const [villeDepart, setVilleDepart] = useState('');
  const [distanceHours, setDistanceHours] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && initialSeminaire) {
      setSelectedSeminaireId(initialSeminaire.id);
      setSelectedFormatId(initialFormatId in (initialSeminaire.formats || {}) ? initialFormatId : '1jour');
    }
  }, [isOpen, initialSeminaire, initialFormatId]);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' }); }, [step]);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', h); return () => document.removeEventListener('keydown', h);
  }, []);
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false); setStep(1); setSuccess(false); setError('');
      setForm({ prenom: '', nom: '', email: '', entreprise: '', participants: '', message: '' });
      setSelectedSeminaireId(null); setSelectedFormatId('1jour'); setAccTypes([]); setTransport(''); setMonths([]);
      setStart(''); setEnd(''); setHeberg(false); setWithT(false); setVilleDepart(''); setDistanceHours(1);
      onClose();
    }, 280);
  };

  const toggle = (list: string[], setList: (v: string[]) => void, item: string) =>
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);

  const selectedSeminaire = seminaires.find(s => s.id === selectedSeminaireId) ?? seminaires[0] ?? null;
  const selectedFormat = selectedSeminaire && selectedFormatId in selectedSeminaire.formats ? selectedSeminaire.formats[selectedFormatId] : null;
  const formatLabel = FORMATS.find(f => f.id === selectedFormatId)?.label ?? selectedFormatId;

  const goNext = () => {
    setError('');
    if (step === 1 && (!selectedSeminaireId || !selectedFormatId)) { setError('Veuillez sélectionner une offre.'); return; }
    if (step === 2) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
      const periodOk = periodMode === 'months' ? months.length > 0 : !!startDate && !!endDate;
      if (!form.prenom || !form.nom || !form.email || !emailOk || !form.entreprise || !form.participants || !periodOk) {
        setError('Certains champs obligatoires sont manquants ou invalides.'); return;
      }
    }
    setTrans(true);
    setTimeout(() => { setStep(s => Math.min(s + 1, 4)); setTrans(false); }, 180);
  };

  const goPrev = () => { setTrans(true); setTimeout(() => { setStep(s => Math.max(s - 1, 1)); setTrans(false); }, 180); };

  const periodStr = periodMode === 'dates'
    ? (startDate && endDate ? `${new Date(startDate).toLocaleDateString('fr-FR')} → ${new Date(endDate).toLocaleDateString('fr-FR')}` : '')
    : (months.length > 0 ? months.join(', ') : '');

  const handleSubmit = async () => {
    setSubmit(true);
    const selectionLine = selectedSeminaire && selectedFormat
      ? `${selectedSeminaire.producteur} — ${formatLabel} (${selectedFormat.titre})`
      : 'Non renseigné';
    try {
      const res = await fetch('https://formsubmit.co/ajax/alexso.terrago@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: `${form.prenom} ${form.nom}`, email: form.email,
          subject: `Nouvelle demande séminaire pack - ${form.entreprise}`,
          message: `SÉLECTION\n${selectionLine}\n\nCOORDONNÉES\nPrénom: ${form.prenom} | Nom: ${form.nom}\nEmail: ${form.email} | Entreprise: ${form.entreprise}\nParticipants: ${form.participants}\nPériode: ${periodStr}\n\nLOGISTIQUE\nVille de départ: ${villeDepart || '—'}\nDistance max: ${distanceHours} h\nHébergement: ${hebergement ? accTypes.join(', ') || 'Oui' : 'Non'}\nTransport: ${withTransport ? transport || 'Oui' : 'Non'}\n\nMessage: ${form.message || '—'}`,
          _captcha: false,
        }),
      });
      if (res.ok) { setSuccess(true); setTimeout(handleClose, 2200); }
      else throw new Error();
    } catch { alert('Erreur lors de l\'envoi. Veuillez réessayer.'); }
    finally { setSubmit(false); }
  };

  if (!isOpen) return null;

  const selectOptions = seminaires.map(s => ({ value: s.id, label: `${s.label} — ${s.producteur}` }));

  return (
    <>
      <div onClick={handleClose} style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(10,20,10,0.65)', backdropFilter: 'blur(6px)', opacity: closing ? 0 : 1, transition: 'opacity 0.28s ease' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, pointerEvents: 'none' }}>
        <div onClick={e => e.stopPropagation()} style={{ pointerEvents: 'auto', width: '100%', maxWidth: 860, maxHeight: '96vh', minHeight: step === 1 ? '75vh' : undefined, background: '#fff', borderRadius: 28, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 8px 48px rgba(0,0,0,0.14)', animation: `${closing ? 'semModalOut' : 'semModalIn'} 0.32s cubic-bezier(0.22,1,0.36,1) both`, fontFamily: 'inherit', position: 'relative', transition: 'min-height 0.25s ease' }}>

          {/* Header */}
          <div style={{ padding: '20px 24px 0', background: '#fff', flexShrink: 0, borderBottom: '1px solid rgba(10,44,52,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 16, height: 1, background: '#e67e22' }} />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#e67e22' }}>Votre projet de séminaire</span>
              </div>
              <button onClick={handleClose} style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, background: '#f4f1ec', border: 'none', color: '#6b7280', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            </div>
            <div style={{ display: 'flex', gap: 6, paddingBottom: 14 }}>
              {STEPS.map((st, i) => {
                const idx = i + 1; const done = step > idx; const active = step === idx;
                return (
                  <div key={st.label} style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ height: 2, borderRadius: 2, background: done ? '#e67e22' : active ? '#1a2e1a' : 'rgba(10,44,52,0.08)', transition: 'background 0.4s ease', marginBottom: 5 }} />
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: active ? '#1a2e1a' : done ? '#e67e22' : 'rgba(10,44,52,0.28)', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{idx}. {st.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: 'rgba(230,126,34,0.07)', borderBottom: '1px solid rgba(230,126,34,0.2)', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <span style={{ fontSize: 14 }}>⚠️</span>
              <p style={{ fontSize: 13, color: '#c0620a', fontWeight: 600, margin: 0, flex: 1 }}>{error}</p>
              <button onClick={() => setError('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c0620a', fontSize: 16, fontFamily: 'inherit' }}>×</button>
            </div>
          )}

          {/* Success overlay */}
          {success && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 20, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(4px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 24 }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#1a2e1a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 8px 24px rgba(26,46,26,0.2)' }}>
                <svg width="24" height="24" viewBox="0 0 34 34" fill="none"><path d="M8 17.5L14 23.5L26 11" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h3 style={{ fontStyle: 'italic', fontSize: 28, fontWeight: 700, color: '#1a2e1a', margin: '0 0 8px', fontFamily: 'inherit' }}>Demande envoyée !</h3>
              <p style={{ color: '#9a9080', fontSize: 15, margin: 0 }}>Nous vous recontacterons sous 48h.</p>
            </div>
          )}

          {/* Body */}
          <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '28px 24px 0', scrollbarWidth: 'none' }}>
            <div style={{ opacity: transitioning ? 0 : 1, transform: transitioning ? 'translateY(6px)' : 'translateY(0)', transition: 'all 0.18s ease' }}>

              {/* Step 1 */}
              {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                  <div>
                    <h3 style={{ fontStyle: 'italic', fontSize: 24, fontWeight: 700, color: '#1a2e1a', margin: '0 0 4px', fontFamily: 'inherit' }}>Votre sélection.</h3>
                    <p style={{ color: '#b0a89e', fontSize: 14, margin: 0 }}>Récapitulatif de l'offre choisie. Vous pouvez en sélectionner une autre.</p>
                  </div>
                  {selectedSeminaire && selectedFormat && (
                    <div style={{ background: '#faf8f5', borderRadius: 16, padding: '16px 18px', border: '1px solid rgba(10,44,52,0.08)' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#e67e22', marginBottom: 8 }}>Actuellement sélectionné</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#1a2e1a', marginBottom: 4 }}>{selectedSeminaire.producteur}</div>
                      <div style={{ fontSize: 14, color: '#7a7060' }}>{formatLabel} — {selectedFormat.titre}</div>
                    </div>
                  )}
                  <FieldBlock label="Changer de produit">
                    <CustomSelect
                      value={selectedSeminaireId ?? ''}
                      onChange={val => setSelectedSeminaireId(val || null)}
                      options={selectOptions}
                      placeholder="— Choisir un produit —"
                    />
                  </FieldBlock>
                  {selectedSeminaire && (
                    <FieldBlock label="Changer d'offre (format)">
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {FORMATS.filter(f => f.id in (selectedSeminaire.formats || {})).map(f => (
                          <TagBtn key={f.id} active={selectedFormatId === f.id} onClick={() => setSelectedFormatId(f.id)}>{f.label}</TagBtn>
                        ))}
                      </div>
                    </FieldBlock>
                  )}
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                  <div>
                    <h3 style={{ fontStyle: 'italic', fontSize: 24, fontWeight: 700, color: '#1a2e1a', margin: '0 0 4px', fontFamily: 'inherit' }}>Informations & coordonnées.</h3>
                    <p style={{ color: '#b0a89e', fontSize: 14, margin: 0 }}>Qui vous êtes et quand vous souhaitez partir.</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                    <FieldBlock label="Prénom" required><input style={inputStyle} placeholder="Jean" value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })} /></FieldBlock>
                    <FieldBlock label="Nom" required><input style={inputStyle} placeholder="Dupont" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} /></FieldBlock>
                    <FieldBlock label="Email professionnel" required><input style={inputStyle} type="email" placeholder="contact@entreprise.fr" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></FieldBlock>
                    <FieldBlock label="Entreprise" required><input style={inputStyle} placeholder="Terroir SAS" value={form.entreprise} onChange={e => setForm({ ...form, entreprise: e.target.value })} /></FieldBlock>
                  </div>
                  <FieldBlock label="Nombre de participants" required>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {PARTICIPANTS_OPTIONS.map(p => <TagBtn key={p} active={form.participants === p} onClick={() => setForm({ ...form, participants: p })}>{p}</TagBtn>)}
                    </div>
                  </FieldBlock>
                  <FieldBlock label="Période souhaitée" required>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                      <ModeBtn active={periodMode === 'dates'} onClick={() => { setPeriod('dates'); setMonths([]); }}>Dates précises</ModeBtn>
                      <ModeBtn active={periodMode === 'months'} onClick={() => { setPeriod('months'); setStart(''); setEnd(''); }}>Choisir des mois</ModeBtn>
                    </div>
                    {periodMode === 'dates'
                      ? <DateRangePicker startDate={startDate} endDate={endDate} onStartChange={setStart} onEndChange={setEnd} />
                      : <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>{MONTHS.map(m => <TagBtn key={m} active={months.includes(m)} onClick={() => toggle(months, setMonths, m)}>{m}</TagBtn>)}</div>}
                  </FieldBlock>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                  <div>
                    <h3 style={{ fontStyle: 'italic', fontSize: 24, fontWeight: 700, color: '#1a2e1a', margin: '0 0 4px', fontFamily: 'inherit' }}>Logistique.</h3>
                    <p style={{ color: '#b0a89e', fontSize: 14, margin: 0 }}>Ville de départ, distance, hébergement et transport.</p>
                  </div>
                  <FieldBlock label="Votre ville de départ">
                    <input style={inputStyle} placeholder="Ex : Paris, Lyon, Bordeaux…" value={villeDepart} onChange={e => setVilleDepart(e.target.value)} />
                  </FieldBlock>
                  <FieldBlock label="Distance max souhaitée">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <button type="button" onClick={() => setDistanceHours(h => Math.max(1, h - 1))} style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(10,44,52,0.15)', background: '#fff', cursor: 'pointer', fontSize: 18, fontWeight: 700, color: '#1a2e1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                      <span style={{ fontSize: 16, fontWeight: 700, color: '#1a2e1a', minWidth: 80, textAlign: 'center' }}>{distanceHours} heure{distanceHours > 1 ? 's' : ''}</span>
                      <button type="button" onClick={() => setDistanceHours(h => Math.min(6, h + 1))} style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(10,44,52,0.15)', background: '#fff', cursor: 'pointer', fontSize: 18, fontWeight: 700, color: '#1a2e1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                    </div>
                  </FieldBlock>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                    <ToggleCard icon="🏠" label="Hébergement" active={hebergement} onToggle={() => setHeberg(v => !v)}>
                      {hebergement && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>{['Chambres seules', 'Chambres partagées'].map(t => <TagBtn key={t} active={accTypes.includes(t)} onClick={() => toggle(accTypes, setAccTypes, t)} small>{t}</TagBtn>)}</div>}
                    </ToggleCard>
                    <ToggleCard icon="🚗" label="Transport" active={withTransport} onToggle={() => setWithT(v => !v)}>
                      {withTransport && <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>{['De porte à porte', 'Depuis gare SNCF proche'].map(t => <TagBtn key={t} active={transport === t} onClick={() => setTransport(t)} small>{t}</TagBtn>)}</div>}
                    </ToggleCard>
                  </div>
                  <FieldBlock label="Un message particulier ?">
                    <textarea rows={4} style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }} placeholder="Salles de réunion, pauses gourmandes, team building…" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                  </FieldBlock>
                </div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <p style={{ color: '#b0a89e', fontSize: 14, margin: '0 0 4px' }}>Vérifiez vos informations avant d'envoyer.</p>
                  {[
                    { num: 1, title: 'Sélection', rows: [{ label: 'Produit / offre', value: selectedSeminaire && selectedFormat ? `${selectedSeminaire.producteur} — ${formatLabel} (${selectedFormat.titre})` : '—' }] },
                    { num: 2, title: 'Coordonnées', rows: [{ label: 'Nom', value: `${form.prenom} ${form.nom}` }, { label: 'Email', value: form.email }, { label: 'Entreprise', value: form.entreprise }, { label: 'Participants', value: form.participants }, { label: 'Période', value: periodStr || '—' }] },
                    { num: 3, title: 'Logistique', rows: [{ label: 'Ville de départ', value: villeDepart || '—' }, { label: 'Distance max', value: `${distanceHours} h` }, { label: 'Hébergement', value: hebergement ? (accTypes.length > 0 ? accTypes.join(', ') : 'Oui') : 'Non' }, { label: 'Transport', value: withTransport ? (transport || 'Oui') : 'Non' }, ...(form.message ? [{ label: 'Message', value: form.message }] : [])] },
                  ].map(block => (
                    <div key={block.num} style={{ background: '#faf8f5', borderRadius: 16, padding: '14px 18px', border: '1px solid rgba(10,44,52,0.06)' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#e67e22', marginBottom: 10 }}>{block.num} — {block.title}</div>
                      {block.rows.map(r => <RecapRow key={r.label} label={r.label} value={typeof r.value === 'string' ? r.value : ''} />)}
                    </div>
                  ))}
                  <p style={{ fontSize: 13, color: '#b0a89e', textAlign: 'center', margin: '4px 0 0' }}>Tout est correct ? Cliquez sur <strong style={{ color: '#1a2e1a' }}>Demander un devis</strong>.</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(26,46,26,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexShrink: 0, flexWrap: 'wrap' }}>
            <button onClick={goPrev} disabled={step === 1}
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: step === 1 ? 'transparent' : '#b0a89e', background: 'none', border: 'none', cursor: step === 1 ? 'default' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, transition: 'color .2s', pointerEvents: step === 1 ? 'none' : 'auto' }}>
              ← Précédent
            </button>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={handleClose} style={{ padding: '11px 20px', borderRadius: 9999, border: '1px solid rgba(26,46,26,0.1)', background: '#faf8f5', fontFamily: 'inherit', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#b0a89e', cursor: 'pointer' }}>Annuler</button>
              <button onClick={step < 4 ? goNext : handleSubmit} disabled={submitting}
                style={{ padding: '11px 24px', borderRadius: 9999, background: '#1a2e1a', color: '#fff', border: 'none', fontFamily: 'inherit', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: 8, minWidth: 150, justifyContent: 'center', transition: 'background .2s' }}>
                {submitting ? 'Envoi…' : step < 4 ? 'Continuer →' : 'Demander un devis'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Page principale ───────────────────────────────────────────────────────────

function cardSearchableText(s: Seminaire): string {
  const parts = [s.label, s.producteur, s.region];
  Object.values(s.formats || {}).forEach((f: Format) => { parts.push(f.titre, f.sous_titre); });
  return parts.filter(Boolean).join(' ').toLowerCase();
}

export default function SeminairesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [seminaires,    setSeminaires]    = useState<Seminaire[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [fetchError,    setFetchError]    = useState<string | null>(null);
  const [activeProduit, setActiveProduit] = useState('all');
  const [activeFormat,  setActiveFormat]  = useState('1jour');
  const [currentIndex,  setCurrentIndex]  = useState(0);
  const [direction,     setDirection]     = useState('Right');
  const [animKey,       setAnimKey]       = useState(0);
  const [modalOpen,     setModalOpen]     = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('seminaires')
        .select(`*, seminaire_formats (*, seminaire_programme (heure, action, ordre))`)
        .order('ordre');
      if (error) { setFetchError(error.message || 'Impossible de charger les offres.'); setLoading(false); return; }
      const formatted: Seminaire[] = (data ?? []).map((s: any) => {
        const formats: { [key: string]: Format } = {};
        (s.seminaire_formats ?? []).forEach((f: any) => {
          formats[f.type] = {
            titre: f.titre, sous_titre: f.sous_titre, participants: f.participants, duree: f.duree,
            prix: f.prix, inclus: f.inclus ?? [],
            programme: [...(f.seminaire_programme ?? [])].sort((a: any, b: any) => a.ordre - b.ordre).map((p: any) => ({ heure: p.heure, action: p.action })),
          };
        });
        return { id: s.id, label: s.label, producteur: s.producteur, region: s.region, couleur: s.couleur, couleurLight: s.couleur_light, bestseller: s.bestseller, image: s.image, images: s.images?.length > 0 ? s.images : (s.image ? [s.image] : []), formats };
      });
      setSeminaires(formatted);
      setLoading(false);
    }
    fetchData();
  }, []);

  const appliedUniversRef = useRef(false);
  useEffect(() => {
    const univers = searchParams.get('univers');
    if (!univers || seminaires.length === 0 || appliedUniversRef.current) return;
    const config = UNIVERS_TO_PACK[univers];
    if (!config || !PRODUITS.some(p => p.id === config.produitId)) return;
    appliedUniversRef.current = true;
    setActiveProduit(config.produitId);
    const filteredByProduit = config.produitId === 'all' ? seminaires : seminaires.filter(s => s.id === config.produitId);
    const matchIndex = filteredByProduit.findIndex(s =>
      config.keywords.some(kw => cardSearchableText(s).includes(kw.toLowerCase()))
    );
    if (matchIndex >= 0) {
      setCurrentIndex(matchIndex);
      setAnimKey(k => k + 1);
    }
  }, [seminaires, searchParams]);

  const filtered  = activeProduit === 'all' ? seminaires : (seminaires.filter(s => s.id === activeProduit).length ? seminaires.filter(s => s.id === activeProduit) : seminaires);
  const safeIndex = Math.min(currentIndex, Math.max(filtered.length - 1, 0));
  const s         = filtered[safeIndex] || filtered[0];
  const fmt       = s?.formats[activeFormat];

  const navigate = (dir: string) => {
    const next = dir === 'next' ? Math.min(safeIndex + 1, filtered.length - 1) : Math.max(safeIndex - 1, 0);
    if (next === safeIndex) return;
    setDirection(dir === 'next' ? 'Right' : 'Left'); setCurrentIndex(next); setAnimKey(k => k + 1);
  };

  const changeProduit = (p: string) => { setActiveProduit(p); setCurrentIndex(0); setDirection('Right'); setAnimKey(k => k + 1); };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#faf8f5' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 32, height: 32, border: '2px solid rgba(26,46,26,0.1)', borderTop: '2px solid #1a2e1a', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ color: '#b0a89e', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>Chargement…</p>
      </div>
    </div>
  );

  const hasData = s && fmt;

  return (
    <div style={{ background: '#faf8f5', minHeight: '100vh', fontFamily: 'inherit' }}>
      <style>{`
        @keyframes semSlideInRight  { from{opacity:0;transform:translateX(28px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes semSlideInLeft   { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes photoSlideInRight{ from{opacity:0;transform:translateX(40px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes photoSlideInLeft { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes semModalIn  { from{opacity:0;transform:translateY(24px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes semModalOut { from{opacity:1;transform:translateY(0) scale(1)} to{opacity:0;transform:translateY(24px) scale(0.97)} }
        @keyframes spin { to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { display:none; }
        .sem-img-arrow { opacity:0; transition:opacity 0.2s ease; }
        .sem-img-wrap:hover .sem-img-arrow { opacity:1; }

        /* ── Layout ── */
        .sem-page { max-width:1200px; margin:0 auto; padding:0 clamp(1rem,3vw,1.75rem) 80px; }
        .sem-header { padding-top:calc(84px + 4rem); padding-bottom:2.5rem; }
        .sem-layout { display:grid; grid-template-columns:180px 1fr; gap:0; align-items:start; }

        /* ── Sidebar ── */
        .sem-sidebar { position:sticky; top:100px; padding-right:28px; padding-top:4px; }
        .sem-filter-btn { display:flex; align-items:center; width:100%; text-align:left; padding:8px 12px; border-radius:10px; border:none; background:transparent; font-family:inherit; font-size:12px; font-weight:600; cursor:pointer; color:#b0a89e; transition:all 0.15s ease; margin-bottom:2px; letter-spacing:0.02em; }
        .sem-filter-btn:hover { background:rgba(26,46,26,0.04); color:#1a2e1a; }
        .sem-filter-btn.active { color:#fff; }
        .sem-format-tab { flex:1; padding:8px 4px; border-radius:8px; border:none; font-family:inherit; font-size:10px; font-weight:700; letter-spacing:0.06em; cursor:pointer; transition:all 0.18s ease; white-space:nowrap; text-transform:uppercase; }

        /* ── CTA band ── */
        .sem-cta-band { display:flex; flex-direction:row; align-items:center; justify-content:space-between; gap:32px; flex-wrap:wrap; background:#1e291a; border-radius:24px; padding:48px 64px; }
        .sem-cta-band-btns { display:flex; gap:12px; flex-wrap:wrap; }

        /* ── Responsive ── */
        @media (max-width:900px) {
          .sem-layout { grid-template-columns:160px 1fr; }
        }
        @media (max-width:640px) {
          .sem-layout { grid-template-columns:1fr; }
          .sem-sidebar { position:static; padding-right:0; padding-bottom:20px; border-bottom:1px solid rgba(26,46,26,0.07); margin-bottom:24px; }
          .sem-filters-wrap { display:flex !important; flex-direction:row !important; flex-wrap:wrap; gap:6px; }
          .sem-filter-btn { width:auto !important; display:inline-flex !important; padding:5px 12px !important; border-radius:20px !important; margin-bottom:0 !important; }
          .sem-header { padding-top:calc(64px + 2rem); padding-bottom:1.5rem; }
        }
        @media (max-width:768px) {
          .sem-cta-band { flex-direction:column; text-align:center; padding:32px 24px; gap:24px; }
          .sem-cta-band-btns { flex-direction:column; width:100%; }
          .sem-cta-band-btns a, .sem-cta-band-btns button { width:100%; display:flex !important; align-items:center; justify-content:center; }
        }
        @media (max-width:480px) {
          .sem-cta-band { padding:24px 16px; border-radius:20px; }
        }
      `}</style>

      <SeminaireModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        seminaires={seminaires}
        initialSeminaire={hasData && s ? s : null}
        initialFormatId={activeFormat}
      />

      <div className="sem-page">
        <div className="sem-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 20, height: 1, background: '#e67e22' }} />
            <span style={{ fontSize: 9, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', color: '#e67e22' }}>Offres packagées</span>
          </div>
          <h1 className="text-primary leading-[1.06]" style={{ letterSpacing: '-0.01em', margin: '0 0 16px' }}>
  <span className="font-sans font-bold text-3xl sm:text-4xl">Nos offres </span>
  <span className="font-display italic font-bold text-4xl sm:text-5xl"> séminaires.</span>
</h1>
          <p style={{ color: '#9a9080', fontSize: 13, maxWidth: 660, lineHeight: 1.75, margin: 0 }}>
            1 journée, 2 jours ou sur mesure — des team-building humains, authentiques et adaptés à vos équipes.
          </p>
        </div>

        <div className="sem-layout">
          {/* Sidebar filtres */}
          <aside className="sem-sidebar">
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d4cec8', marginBottom: 12 }}>Filtrer</div>
            <div className="sem-filters-wrap" style={{ display: 'flex', flexDirection: 'column' }}>
              {PRODUITS.map(p => {
                const active = activeProduit === p.id;
                const activeBg = active && s?.couleur ? s.couleur : '#1a2e1a';
                return (
                  <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <button onClick={() => !p.comingSoon && changeProduit(p.id)}
                      className={`sem-filter-btn${active ? ' active' : ''}`}
                      style={{ ...(active ? { background: activeBg } : {}), ...(p.comingSoon ? { opacity: 0.4, cursor: 'default' } : {}) }}>
                      {active && <span style={{ display: 'inline-block', width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.5)', marginRight: 8, flexShrink: 0 }} />}
                      {p.label}
                    </button>
                    {p.comingSoon && (
                      <span style={{ fontSize: 8, fontWeight: 700, color: '#b0a89e', background: 'rgba(26,46,26,0.05)', padding: '2px 7px', borderRadius: 5, border: '1px solid rgba(26,46,26,0.07)', whiteSpace: 'nowrap', flexShrink: 0 }}>bientôt</span>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 16, fontSize: 10, color: '#d4cec8', fontWeight: 600, letterSpacing: '0.04em' }}>
              {filtered.length} expérience{filtered.length > 1 ? 's' : ''}
              {filtered.length > 1 && <span> · {safeIndex + 1}/{filtered.length}</span>}
            </div>
          </aside>

          {/* Contenu principal */}
          <main style={{ minWidth: 0 }}>
            {!hasData ? (
              <div style={{ background: '#fff', borderRadius: 20, border: '1px solid rgba(26,46,26,0.08)', padding: 'clamp(2rem,5vw,3rem)', textAlign: 'center', boxShadow: '0 4px 24px rgba(26,46,26,0.06)' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>{fetchError ? '⚠️' : '📋'}</div>
                <h3 style={{ fontStyle: 'italic', fontSize: 22, fontWeight: 700, color: '#1a2e1a', margin: '0 0 10px' }}>
                  {fetchError ? 'Impossible de charger les offres' : 'Aucune offre pour le moment'}
                </h3>
                <p style={{ color: '#9a9080', fontSize: 13, margin: '0 auto', maxWidth: 400, lineHeight: 1.6 }}>
                  {fetchError || 'Les offres packagées seront bientôt disponibles.'}
                </p>
                <button onClick={() => setModalOpen(true)} style={{ marginTop: 24, background: '#1a2e1a', color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', padding: '10px 18px', borderRadius: 9999, border: 'none', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Demander un devis →
                </button>
              </div>
            ) : (
              <div key={animKey} style={{ animation: `semSlideIn${direction} 0.36s cubic-bezier(0.22,1,0.36,1) both`, borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(26,46,26,0.08)', boxShadow: '0 4px 24px rgba(26,46,26,0.06)', background: '#fff' }}>

                <ImageCarousel images={s.images} titre={fmt.titre} region={s.region} bestseller={s.bestseller} resetKey={animKey} />

                {/* Navigation entre séminaires */}
                {filtered.length > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, padding: '14px 0 16px', background: '#fff' }}>
                    {safeIndex > 0 && (
                      <button onClick={() => navigate('prev')} style={{ width: 48, height: 48, borderRadius: '50%', background: '#fff', border: '1px solid rgba(26,46,26,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(26,46,26,0.08)' }}>
                        <svg width="16" height="16" viewBox="0 0 12 12" fill="none"><path d="M7.5 2L3.5 6L7.5 10" stroke="#1a2e1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </button>
                    )}
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      {filtered.map((_, i) => (
                        <button key={i} onClick={() => { setDirection(i > safeIndex ? 'Right' : 'Left'); setCurrentIndex(i); setAnimKey(k => k + 1); }}
                          style={{ width: i === safeIndex ? 20 : 8, height: 8, borderRadius: 4, background: i === safeIndex ? s.couleur : 'rgba(26,46,26,0.2)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)' }} />
                      ))}
                    </div>
                    {safeIndex < filtered.length - 1 && (
                      <button onClick={() => navigate('next')} style={{ width: 48, height: 48, borderRadius: '50%', background: '#fff', border: '1px solid rgba(26,46,26,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(26,46,26,0.08)' }}>
                        <svg width="16" height="16" viewBox="0 0 12 12" fill="none"><path d="M4.5 2L8.5 6L4.5 10" stroke="#1a2e1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </button>
                    )}
                  </div>
                )}

                {/* Card body */}
                <div style={{ background: '#fff', padding: 'clamp(18px, 3vw, 28px)' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#b0a89e', marginBottom: 8 }}>{s.producteur}</div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontWeight: 700, fontSize: 19, color: '#1a2e1a', lineHeight: 1.25, marginBottom: 4 }}>{fmt.titre}</div>
                    <div style={{ fontSize: 14, color: '#9a9080', fontStyle: 'italic' }}>{fmt.sous_titre}</div>
                  </div>

                  {/* Onglets format */}
                  <div style={{ display: 'flex', gap: 0, background: 'rgba(26,46,26,0.05)', borderRadius: 10, padding: '10px 8px', marginBottom: 16 }}>
                    {FORMATS.map(f => {
                      const fActive = activeFormat === f.id;
                      return (
                        <button key={f.id} onClick={() => setActiveFormat(f.id)} className="sem-format-tab"
                          style={{ background: fActive ? '#fff' : 'transparent', color: fActive ? '#1a2e1a' : '#b0a89e', boxShadow: fActive ? '0 1px 4px rgba(26,46,26,0.10)' : 'none' }}>
                          {f.label}
                        </button>
                      );
                    })}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 14, alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#7a7060', fontWeight: 600 }}>{fmt.participants}</span>
                    <span style={{ color: '#d4cec8' }}>·</span>
                    <span style={{ fontSize: 12, color: '#7a7060', fontWeight: 600 }}>{fmt.duree}</span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
                    {fmt.inclus.map(item => (
                      <span key={item} style={{ background: `${s.couleur}18`, color: s.couleur, fontSize: 11, fontWeight: 600, padding: '4px 11px', borderRadius: 9999, letterSpacing: '0.04em' }}>✓ {item}</span>
                    ))}
                  </div>

                  <ProgrammeAccordion programme={fmt.programme} couleur={s.couleur} triggerKey={animKey + activeFormat} />

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, borderTop: '1px solid rgba(26,46,26,0.06)', paddingTop: 16, marginTop: 16 }}>
                    <div>
                      <div style={{ fontSize: 10, color: '#b0a89e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>Tarif indicatif</div>
                      <div style={{ fontSize: 17, fontWeight: 700, color: '#1a2e1a' }}>{fmt.prix}</div>
                    </div>
                    <button onClick={() => setModalOpen(true)}
                      style={{ background: '#1a2e1a', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', padding: '12px 22px', borderRadius: 9999, border: 'none', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s ease', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6 }}
                      onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.background = '#2b3e24'; }}
                      onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1a2e1a'; }}>
                      Demander un devis
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* CTA bas */}
        <div style={{ marginTop: 96, paddingTop: 48, borderTop: '1px solid #e5e0d8' }}>
          <div className="sem-cta-band">
            <div>
              <h3 style={{ color: '#fff', margin: '0 0 10px', lineHeight: 1.3 }}>
                <span style={{ fontFamily: "'Poppins', sans-serif", fontStyle: 'normal', fontWeight: 700, fontSize: 23 }}>Votre projet ne rentre pas </span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 700, fontSize: 32 }}>dans une case ?</span>
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, margin: 0, lineHeight: 1.6 }}>Groupe de 5 à 100+ — on construit l'expérience sur mesure à l'image de votre équipe.</p>
            </div>
            <div className="sem-cta-band-btns">
              <button onClick={() => setModalOpen(true)}
                style={{ background: '#f78d00', color: '#fff', padding: '12px 20px', borderRadius: 12, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'opacity 0.2s' }}
                onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88'; }}
                onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}>
                Discutons de votre projet →
              </button>
              <a href="/partenaires"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '12px 20px', borderRadius: 12, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.2)', textDecoration: 'none', display: 'inline-block', transition: 'background 0.2s' }}
                onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.18)'; }}
                onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.1)'; }}>
                Voir nos producteurs →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
