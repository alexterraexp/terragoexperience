'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import { Sprout, Ham, Speech, Presentation, Wifi, House, Bike, Users, PartyPopper } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchSeminaires } from '../lib/seminaires';
import type { Seminaire, Format, ProgrammeItem } from '../lib/seminaires';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapboxPublicToken } from '@/components/MapboxTokenProvider';
import { CollapsibleDateRangePicker } from '@/components/CollapsibleDateRangePicker';
import { VilleDepartInput } from '@/components/VilleDepartInput';

export type { Seminaire, Format, ProgrammeItem };

// ─── Constantes ───────────────────────────────────────────────────────────────

const PRODUITS = [
  { id: 'all',        label: 'Tous' },
  { id: 'truffes',    label: 'Truffes' },
  { id: 'olives',     label: 'Olives' },
  { id: 'fruits-a-coque', label: 'Fruits à coque' },
  { id: 'piments',    label: 'Piments' },
  { id: 'vins-spiritueux', label: 'Vins & Spiritueux' },
  { id: 'huitres',    label: 'Huîtres',  comingSoon: true },
  { id: 'fromage',    label: 'Fromage',  comingSoon: true },
];

const UNIVERS_TO_PACK: Record<string, { produitId: string; keywords: string[] }> = {
  cognac:   { produitId: 'vins-spiritueux', keywords: ['cognac', 'pineau'] },
  olive:    { produitId: 'olives',     keywords: ['olive', 'lavande'] },
  noix:     { produitId: 'fruits-a-coque', keywords: ['noix'] },
  truffe:   { produitId: 'truffes',    keywords: ['truffe'] },
  fromage:  { produitId: 'fromage',    keywords: ['fromage', 'chèvre', 'chevre'] },
  vin:      { produitId: 'vins-spiritueux', keywords: ['vin', 'vign', 'ventoux'] },
  piment:   { produitId: 'piments',    keywords: ['piment'] },
  noisette: { produitId: 'fruits-a-coque', keywords: ['noisette', 'noix de pécan', 'amande'] },
};

const FORMATS = [
  { id: '1jour',  label: '1 journée' },
  { id: '2jours', label: '2 jours' },
  { id: 'mesure', label: 'Sur mesure' },
];

// ─── Carte des équipements / services inclus ─────────────────────────────────

const AMENITY_COLOR = '#e07a30';

export const AMENITIES_MAP: Record<string, { label: string; icon: React.ReactNode }> = {
  atelier:              { label: 'Atelier « les mains dans la terre »', icon: <Sprout       size={26} color={AMENITY_COLOR} strokeWidth={1.6} /> },
  repas:                { label: 'Repas convivial typique',              icon: <Ham          size={26} color={AMENITY_COLOR} strokeWidth={1.6} /> },
  visite_degustation:   { label: 'Visite et dégustation',               icon: <Speech       size={26} color={AMENITY_COLOR} strokeWidth={1.6} /> },
  salle_reunion:        { label: 'Salle de réunion à disposition',      icon: <Presentation size={26} color={AMENITY_COLOR} strokeWidth={1.6} /> },
  wifi:                 { label: 'WiFi',                                 icon: <Wifi         size={26} color={AMENITY_COLOR} strokeWidth={1.6} /> },
  hebergement:          { label: 'Hébergement',                          icon: <House        size={26} color={AMENITY_COLOR} strokeWidth={1.6} /> },
  activites_sportives:  { label: 'Activités sportives',                 icon: <Bike         size={26} color={AMENITY_COLOR} strokeWidth={1.6} /> },
  teambuilding:         { label: 'Activités team-building',             icon: <Users        size={26} color={AMENITY_COLOR} strokeWidth={1.6} /> },
  soiree_theme:         { label: 'Soirée à thème',                      icon: <PartyPopper  size={26} color={AMENITY_COLOR} strokeWidth={1.6} /> },
};

const STEPS = [{ label: 'Sélection' }, { label: 'Coordonnées' }, { label: 'Dates & lieu' }, { label: 'Logistique' }, { label: 'Récapitulatif' }];
const ACTIVITY_MAINS_PACK = 'Les mains dans la terre';
const ACTIVITY_OPTIONS_PACK = ['Activité sportive', 'Cours de cuisine', 'Activité nature', 'Activité jeux'] as const;

// ─── Mailto pré-rempli ────────────────────────────────────────────────────────

const BRIEF_MAIL_HREF = (() => {
  const subject = 'Brief séminaire – [Nom de votre entreprise]';
  const body = [
    'Bonjour,',
    '',
    'Je souhaite vous soumettre mon brief pour l\'organisation d\'un séminaire.',
    '[ Merci de compléter les informations ci-dessous ]',
    '',
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '📅  DATES & DURÉE',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    'Date souhaitée : ',
    'Durée : ',
    'Dates alternatives si besoin : ',
    '',
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '👥  PARTICIPANTS',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    'Nombre de participants : ',
    'Profil des participants : ',
    '   (ex : direction, équipes commerciales, managers…)',
    '',
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '💰  BUDGET',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    'Budget indicatif par personne : ',
    '',
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '🎯  OBJECTIFS',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    'Objectif principal : ',
    '   (ex : cohésion d\'équipe, lancement de projet, récompense…)',
    '',
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '📋  INFORMATIONS COMPLÉMENTAIRES',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    'Besoins spécifiques : ',
    'Questions ou remarques : ',
    '',
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '📬  VOS COORDONNÉES',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    'Nom & Prénom : ',
    'Entreprise : ',
    'Téléphone : ',
    'Email : ',
    '',
    '',
    'Message supplémentaire : ',
    '',
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'Merci, nous reviendrons vers vous sous 48h.',
    'L\'équipe Terrago',
  ].join('\n');
  return `mailto:terragoexperiences@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
})();

// ─── Helpers produit ─────────────────────────────────────────────────────────

function getProductEmoji(s: Seminaire): string {
  if (s.emoji) return s.emoji;
  const txt = [s.label, s.producteur, s.region].filter(Boolean).join(' ').toLowerCase();
  if (txt.includes('truffe'))                                                        return '🖤';
  if (txt.includes('olive') || txt.includes('lavande'))                              return '🫒';
  if (txt.includes('noix') || txt.includes('noisette'))                              return '🌰';
  if (txt.includes('piment'))                                                        return '🌶️';
  if (txt.includes('cognac') || txt.includes('pineau') || txt.includes('spiritueux')) return '🥃';
  if (txt.includes('vin') || txt.includes('vign') || txt.includes('ventoux'))        return '🍷';
  if (txt.includes('huître') || txt.includes('huitre'))                              return '🦪';
  if (txt.includes('fromage') || txt.includes('chèvre'))                             return '🧀';
  return '🌿';
}

// ─── Styles communs ───────────────────────────────────────────────────────────

const inputStyle: CSSProperties = {
  width: '100%', background: '#faf8f5',
  border: '1px solid rgba(10,44,52,0.08)', borderRadius: 16,
  padding: '12px 16px', fontFamily: 'inherit', fontSize: 14, color: '#1a2e1a',
  outline: 'none', transition: 'all 0.18s ease', boxSizing: 'border-box',
};

// ─── FieldBlock ───────────────────────────────────────────────────────────────

const FieldBlock: React.FC<{ label: string; required?: boolean; children: ReactNode }> = ({ label, required, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
    <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b0a89e', display: 'block', marginBottom: 8 }}>
      {label}{required && <span style={{ color: '#e67e22', marginLeft: 4 }}>*</span>}
    </label>
    {children}
  </div>
);

// ─── TagBtn ───────────────────────────────────────────────────────────────────

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
    {children}
  </button>
);

// ─── ToggleCard ───────────────────────────────────────────────────────────────

const ToggleCard: React.FC<{ icon: ReactNode; label: string; active: boolean; onToggle: () => void; children?: ReactNode }> = ({ icon, label, active, onToggle, children }) => (
  <div style={{ padding: '18px', borderRadius: 18, border: `1.5px solid ${active ? '#1a2e1a' : 'rgba(10,44,52,0.08)'}`, background: active ? 'rgba(26,46,26,0.03)' : '#faf8f5', transition: 'all 0.2s ease' }}>
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

// ─── CustomSelect ─────────────────────────────────────────────────────────────

const CustomSelect: React.FC<{
  value: string; onChange: (val: string) => void;
  options: { value: string; label: string }[]; placeholder?: string;
}> = ({ value, onChange, options, placeholder }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selectedLabel = options.find(o => o.value === value)?.label ?? '';

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button type="button" onClick={() => setOpen(v => !v)} style={{ ...inputStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left', border: `1px solid ${open ? '#1a2e1a' : 'rgba(10,44,52,0.08)'}`, boxShadow: open ? '0 0 0 3px rgba(26,46,26,0.08)' : 'none' }}>
        <span style={{ color: value ? '#1a2e1a' : '#b0a89e', fontSize: 14, fontWeight: value ? 500 : 400 }}>{value ? selectedLabel : (placeholder ?? '— Choisir —')}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', flexShrink: 0, marginLeft: 8 }}>
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#1a2e1a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 100, background: '#fff', borderRadius: 18, border: '1px solid rgba(10,44,52,0.1)', boxShadow: '0 8px 32px rgba(26,46,26,0.12)', overflow: 'hidden', maxHeight: 'min(320px, 70vh)', display: 'flex', flexDirection: 'column' }}>
          <button type="button" onClick={() => { onChange(''); setOpen(false); }} style={{ width: '100%', padding: '11px 16px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: 13, color: '#b0a89e', fontFamily: 'inherit', borderBottom: '1px solid rgba(10,44,52,0.05)', flexShrink: 0 }}>— Choisir un produit —</button>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {options.map(opt => (
              <button key={opt.value} type="button" onClick={() => { onChange(opt.value); setOpen(false); }}
                style={{ width: '100%', padding: '11px 16px', background: opt.value === value ? 'rgba(26,46,26,0.04)' : 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: 14, color: opt.value === value ? '#1a2e1a' : '#4a4540', fontWeight: opt.value === value ? 700 : 400, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 10, transition: 'background 0.12s ease' }}>
                {opt.value === value
                  ? <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#1a2e1a', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5.5L4.2 7.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                  : <span style={{ width: 16, flexShrink: 0 }} />}
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── RecapRow ─────────────────────────────────────────────────────────────────

const RecapRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(10,44,52,0.05)' }}>
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#b0a89e', flexShrink: 0 }}>{label}</span>
    <span style={{ fontSize: 14, fontWeight: 600, color: '#1a2e1a', textAlign: 'right' }}>{value || '—'}</span>
  </div>
);

// ─── ProgrammeAccordion ───────────────────────────────────────────────────────

const isDesktop = () => typeof window !== 'undefined' ? window.innerWidth > 768 : true;

function ProgrammeAccordion({ programme, couleur, triggerKey }: { programme: ProgrammeItem[]; couleur: string; triggerKey: any }) {
  const [expanded, setExpanded] = useState(isDesktop);
  const prev = useRef<any>(null);
  if (prev.current !== triggerKey) { prev.current = triggerKey; setExpanded(isDesktop()); }
  return (
    <div style={{ borderTop: '1px solid rgba(26,46,26,0.06)', paddingTop: 14 }}>
      <button onClick={() => setExpanded(v => !v)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: expanded ? 14 : 0 }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1a2e1a' }}>Exemple de programme</span>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: '50%', background: 'rgba(26,46,26,0.05)', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', flexShrink: 0 }}>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2.5 5L7 9.5L11.5 5" stroke="#b0a89e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </button>
      <div style={{ maxHeight: expanded ? '600px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 4 }}>
          {programme.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ color: '#e67e22', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', flexShrink: 0, width: 72, paddingTop: 2 }}>{p.heure}</span>
              <span style={{ color: '#7a7060', fontSize: 14, lineHeight: 1.65 }}>{p.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ImageCarousel ────────────────────────────────────────────────────────────

function ImageCarousel({ images, titre, region, bestseller, resetKey }: { images: string[]; titre: string; region: string; bestseller: boolean; resetKey: any }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [photoDir, setPhotoDir] = useState('right');
  const [photoKey, setPhotoKey] = useState(0);
  const touchStart = useRef<number | null>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { setPhotoIndex(0); setPhotoKey(k => k + 1); }, [resetKey]);

  useEffect(() => {
    if (images.length <= 1) return;
    autoRef.current = setInterval(() => { setPhotoDir('right'); setPhotoIndex(i => (i + 1) % images.length); setPhotoKey(k => k + 1); }, 4000);
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
      onTouchEnd={e => { if (touchStart.current === null) return; const dx = e.changedTouches[0].clientX - touchStart.current; if (Math.abs(dx) > 44) goPhoto(dx < 0 ? 'next' : 'prev'); touchStart.current = null; }}
      style={{ position: 'relative', height: 200, overflow: 'hidden', borderRadius: '16px 16px 0 0' }}>
      <div key={photoKey} style={{ position: 'absolute', inset: 0, animation: `photoSlideIn${photoDir === 'right' ? 'Right' : 'Left'} 0.45s cubic-bezier(0.22,1,0.36,1) both` }}>
        <img src={currentImg} alt={`${titre} – ${region}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none', userSelect: 'none' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,46,26,0.65) 0%, transparent 55%)', pointerEvents: 'none' }} />
      {images.length > 1 && (
        <>
          <button className="sem-img-arrow" onClick={() => goPhoto('prev')} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}>
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M7.5 2L3.5 6L7.5 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button className="sem-img-arrow" onClick={() => goPhoto('next')} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}>
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M4.5 2L8.5 6L4.5 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 4, zIndex: 2 }}>
            {images.map((_, i) => (
              <button key={i} onClick={() => { if (autoRef.current) clearInterval(autoRef.current); setPhotoDir(i > photoIndex ? 'right' : 'left'); setPhotoIndex(i); setPhotoKey(k => k + 1); }}
                style={{ width: i === photoIndex ? 14 : 4, height: 4, borderRadius: 2, background: i === photoIndex ? '#fff' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)' }} />
            ))}
          </div>
        </>
      )}
      {bestseller && (
        <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(60,60,60,0.5)', borderRadius: 9999, padding: '3px 10px', fontSize: 8, fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', backdropFilter: 'blur(6px)', zIndex: 2 }}>★ Populaire</div>
      )}
      <div style={{ position: 'absolute', bottom: 10, left: 12, fontSize: 10, color: 'rgba(255,255,255,0.85)', fontWeight: 600, letterSpacing: '0.04em', zIndex: 2 }}>{region}</div>
    </div>
  );
}

// ─── SeminaireCard ───────────────────────────────────────────────────────────

function SeminaireCard({ s, activeFormat, isActive, onSelect, onDevis }: {
  s: Seminaire; activeFormat: string; isActive: boolean;
  onSelect: () => void; onDevis: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const fmt = s.formats[activeFormat] ?? Object.values(s.formats)[0];
  const isComing = s.comingSoon;
  if (!fmt && !isComing) return null;
  const active = !isComing && (isActive || hovered);
  return (
    <div
      className="sem-pack-card"
      onClick={isComing ? undefined : onSelect}
      onMouseEnter={() => { if (!isComing) setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 18, overflow: 'hidden',
        border: `1px solid ${active ? 'rgba(26,46,26,0.22)' : 'rgba(26,46,26,0.07)'}`,
        background: '#fff', cursor: isComing ? 'default' : 'pointer',
        boxShadow: active ? '0 10px 32px rgba(26,46,26,0.13)' : '0 1px 4px rgba(26,46,26,0.05)',
        transition: 'all 0.22s ease',
        transform: active ? 'translateY(-4px)' : 'none',
        opacity: isComing ? 0.72 : 1,
      }}>
      <div className="sem-pack-card-visual">
        <img
          src={s.images[0] ?? ''} alt={fmt?.titre ?? s.label}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)', filter: isComing ? 'grayscale(35%)' : 'none' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,46,26,0.55) 0%, transparent 50%)', pointerEvents: 'none' }} />
        {isComing && (
          <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(255,255,255,0.92)', borderRadius: 9999, padding: '4px 12px', fontSize: 8, fontWeight: 700, color: '#1a2e1a', letterSpacing: '0.14em', textTransform: 'uppercase', backdropFilter: 'blur(6px)', border: '1px solid rgba(26,46,26,0.10)' }}>🔜 Bientôt</div>
        )}
        {!isComing && s.bestseller && (
          <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(60,60,60,0.5)', borderRadius: 9999, padding: '3px 10px', fontSize: 8, fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', backdropFilter: 'blur(6px)' }}>★ Populaire</div>
        )}
        {!isComing && (
          <div style={{ position: 'absolute', top: 10, right: 10, width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hovered ? 1 : 0, transition: 'opacity 0.2s ease' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 8, left: 10, fontSize: 9, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>{s.region}</div>
      </div>
      <div className="sem-pack-card-body">
        <div style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#b0a89e', marginBottom: 3 }}>{s.producteur}</div>
        <div className="sem-pack-card-title" style={{ fontWeight: 700, fontSize: 13, color: '#1a2e1a', lineHeight: 1.3, marginBottom: 2 }}>{fmt?.titre ?? s.label}</div>
        {isComing ? (
          <div style={{ fontSize: 11, color: '#b0a89e', fontStyle: 'italic', marginTop: 'auto', paddingTop: 8 }}>Disponible prochainement</div>
        ) : (
          <>
            <div className="sem-pack-card-sub" style={{ fontSize: 11, color: '#9a9080', fontStyle: 'italic', marginBottom: 8 }}>{fmt!.sous_titre}</div>
            <div className="sem-pack-card-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, minWidth: 0 }}>
              <div style={{ minWidth: 0, overflow: 'hidden' }}>
                {activeFormat === 'mesure' ? (
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#1a2e1a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{fmt!.prix}</span>
                ) : (
                  <span className="sem-pack-card-price" style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'nowrap', gap: 4 }}>
                    <span className="sem-pack-price-from" style={{ fontSize: 9, fontWeight: 600, color: '#9a9080', whiteSpace: 'nowrap' }}>À partir de</span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#1a2e1a', whiteSpace: 'nowrap' }}>{fmt!.prix}</span>
                    <span style={{ fontSize: 9, fontWeight: 600, color: '#9a9080', whiteSpace: 'nowrap' }}>/pers.</span>
                  </span>
                )}
              </div>
              <button onClick={e => { e.stopPropagation(); onSelect(); }}
                className="sem-pack-card-btn"
                style={{ flexShrink: 0, background: '#1a2e1a', color: '#fff', fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', padding: '6px 12px', borderRadius: 9999, border: 'none', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                En détails →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── MapboxMap ────────────────────────────────────────────────────────────────

function MapboxMap({ seminaires, activeId, activeFormat, onSelect, onExpand, expanded }: {
  seminaires: Seminaire[]; activeId: string | null; activeFormat: string;
  onSelect: (id: string) => void; onExpand?: () => void; expanded?: boolean;
}) {
  const mapboxToken = useMapboxPublicToken();
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<mapboxgl.Map | null>(null);
  const markersRef   = useRef<{ [id: string]: mapboxgl.Marker }>({});
  const popupsRef    = useRef<{ [id: string]: mapboxgl.Popup }>({});
  const [mapReady, setMapReady] = useState(false);
  const [cardSem, setCardSem] = useState<Seminaire | null>(null);

  useEffect(() => {
    if (!mapboxToken || !mapContainer.current || mapRef.current) return;
    mapboxgl.accessToken = mapboxToken;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [2.5, 46.8], zoom: 4.8,
      minZoom: 3.5,
    });
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');
    map.once('load', () => setMapReady(true));
    map.on('click', (e) => {
      if (!(e.originalEvent.target as HTMLElement).closest('[data-marker]')) setCardSem(null);
    });
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; setMapReady(false); };
  }, [mapboxToken]);

  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    const map = mapRef.current;
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};
    seminaires.forEach(s => {
      if (s.lat == null || s.lng == null) return;
      const emoji     = getProductEmoji(s);
      const isAct     = s.id === activeId;
      const isComing  = s.comingSoon;
      const size      = isAct ? 46 : 38;
      const fs        = isAct ? 22 : 17;
      const bg        = isComing ? '#e8e4de' : isAct ? s.couleur : '#fff';
      const shadow    = isComing ? '0 2px 8px rgba(0,0,0,0.10)' : isAct ? `0 4px 18px ${s.couleur}70` : '0 2px 8px rgba(0,0,0,0.20)';
      const border    = isComing ? '2px dashed #b0a89e' : isAct ? 'none' : '2.5px solid rgba(255,255,255,0.95)';
      const opacity   = isComing ? '0.75' : '1';
      const el = document.createElement('div');
      el.setAttribute('data-marker', s.id);
      el.innerHTML = `<div style="width:${size}px;height:${size}px;background:${bg};border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:${fs}px;box-shadow:${shadow};cursor:${isComing ? 'default' : 'pointer'};transition:all 0.2s;border:${border};transform:${isAct ? 'scale(1.12)' : 'scale(1)'};opacity:${opacity};">${emoji}</div>`;
      const marker = new mapboxgl.Marker({ element: el, anchor: 'center' }).setLngLat([s.lng, s.lat]).addTo(map);
      if (!isComing) {
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          map.flyTo({ center: [s.lng!, s.lat!], zoom: 6.5, duration: 800, essential: true });
          setCardSem(prev => prev?.id === s.id ? null : s);
        });
      }
      markersRef.current[s.id] = marker;
    });
  }, [mapReady, seminaires, activeFormat, activeId]);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!activeId) {
      mapRef.current.flyTo({ center: [2.5, 46.8], zoom: 4.8, duration: 900, essential: true });
      return;
    }
    const s = seminaires.find(x => x.id === activeId);
    if (!s || s.lat == null || s.lng == null) return;
    mapRef.current.flyTo({ center: [s.lng, s.lat], zoom: 7, duration: 900, essential: true });
  }, [activeId]);

  const cardFmt = cardSem ? (cardSem.formats[activeFormat] ?? Object.values(cardSem.formats)[0]) : null;

  if (!mapboxToken) {
    return (
      <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', width: '100%', height: '100%', background: 'linear-gradient(145deg, #f5f2ec 0%, #ebe6dc 100%)', border: '1px solid rgba(26,46,26,0.08)' }}>
        <div style={{ width: '100%', height: '100%', minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: 13, color: '#7a7060', lineHeight: 1.6, maxWidth: 280 }}>
            La carte des producteurs arrive ici très bientôt. En attendant, choisissez une offre dans la liste à gauche.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', width: '100%', height: '100%' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      {cardSem && cardFmt && (
        <div style={{ position: 'absolute', bottom: 'max(16px, calc(env(safe-area-inset-bottom, 0px) + 12px))', left: '50%', transform: 'translateX(-50%)', zIndex: 100, width: 'min(230px, calc(100% - 32px))', maxWidth: 'calc(100vw - 32px)', borderRadius: 18, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.22)', background: '#fff', animation: 'fadeInUp 0.18s ease' }}>
          {(cardSem.images[0] ?? cardSem.image) && (
            <img src={cardSem.images[0] ?? cardSem.image} alt={cardFmt.titre} style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }} />
          )}
          <div style={{ padding: '12px 14px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#b0a89e', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 3 }}>{cardSem.producteur}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1a2e1a', lineHeight: 1.3, marginBottom: 12 }}>{cardFmt.titre}</div>
            <button onClick={() => { setCardSem(null); onSelect(cardSem.id); }}
              style={{ width: '100%', background: '#1a2e1a', color: '#fff', border: 'none', borderRadius: 9999, padding: '9px', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>
              En savoir plus →
            </button>
          </div>
          <button onClick={() => setCardSem(null)}
            style={{ position: 'absolute', top: 8, right: 8, width: 24, height: 24, borderRadius: '50%', background: 'rgba(0,0,0,0.35)', border: 'none', color: '#fff', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>×</button>
        </div>
      )}
      {onExpand && (
        <button onClick={onExpand} title={expanded ? 'Réduire' : 'Agrandir'}
          style={{ position: 'absolute', top: 12, left: 12, zIndex: 10, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)', border: '1px solid rgba(0,0,0,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
          {expanded
            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a2e1a" strokeWidth="2.2" strokeLinecap="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a2e1a" strokeWidth="2.2" strokeLinecap="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
          }
        </button>
      )}
    </div>
  );
}

// ─── GalleryLightbox ─────────────────────────────────────────────────────────

function GalleryLightbox({ images, initialIndex, onClose }: { images: string[]; initialIndex: number; onClose: () => void }) {
  const [idx, setIdx] = useState(initialIndex);
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setIdx(i => (i + 1) % images.length);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    };
    document.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [idx]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#faf8f5' }}>
      <button onClick={onClose}
        style={{ position: 'absolute', top: 20, right: 20, zIndex: 10, width: 44, height: 44, borderRadius: '50%', background: '#fff', border: '1px solid rgba(26,46,26,0.12)', color: '#1a2e1a', fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 300, boxShadow: '0 2px 10px rgba(26,46,26,0.08)' }}>
        ×
      </button>
      <div style={{ position: 'absolute', top: 26, left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: '#fff', border: '1px solid rgba(26,46,26,0.1)', borderRadius: 9999, padding: '4px 14px', fontSize: 11, color: '#1a2e1a', fontWeight: 700, boxShadow: '0 2px 8px rgba(26,46,26,0.07)' }}>
        {idx + 1} / {images.length}
      </div>
      <div style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: '88vw', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 64px' }}>
        <img src={images[idx]} alt="" style={{ maxWidth: '100%', maxHeight: '75vh', borderRadius: 18, objectFit: 'contain', boxShadow: '0 12px 60px rgba(0,0,0,0.25)' }} />
        {images.length > 1 && (
          <>
            <button onClick={prev} style={{ position: 'absolute', left: 0, width: 48, height: 48, borderRadius: '50%', background: '#fff', border: '1px solid rgba(26,46,26,0.12)', color: '#1a2e1a', fontSize: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(26,46,26,0.1)' }}>‹</button>
            <button onClick={next} style={{ position: 'absolute', right: 0, width: 48, height: 48, borderRadius: '50%', background: '#fff', border: '1px solid rgba(26,46,26,0.12)', color: '#1a2e1a', fontSize: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(26,46,26,0.1)' }}>›</button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div style={{ position: 'relative', zIndex: 5, display: 'flex', gap: 8, marginTop: 18, maxWidth: '88vw', overflowX: 'auto', padding: '4px 0' }}>
          {images.map((img, i) => (
            <div key={i} onClick={() => setIdx(i)}
              style={{ flexShrink: 0, width: 72, height: 72, borderRadius: 14, overflow: 'hidden', cursor: 'pointer', border: `2.5px solid ${i === idx ? '#1a2e1a' : 'rgba(26,46,26,0.12)'}`, opacity: i === idx ? 1 : 0.55, transition: 'all 0.15s' }}>
              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── ExpandedSeminaireView ────────────────────────────────────────────────────

export function ExpandedSeminaireView({ s, activeFormat, setActiveFormat, onDevis, onBack }: {
  s: Seminaire; activeFormat: string; setActiveFormat: (f: string) => void; onDevis: () => void; onBack?: () => void;
}) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIdx,  setGalleryIdx]  = useState(0);
  const [mobilePhotoIdx, setMobilePhotoIdx] = useState(0);
  const photoTouchStartX = useRef<number>(0);
  const photoTouchStartY = useRef<number>(0);
  const photoTouchId = useRef<number | null>(null);

  const fmt = s.formats[activeFormat] ?? Object.values(s.formats)[0];
  if (!fmt) return null;

  const mainImage   = s.images[0] ?? '';
  const smallImages = s.images.slice(1, 3);
  const hasSmall    = smallImages.length > 0;

  const handlePhotoTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    photoTouchId.current = t.identifier;
    photoTouchStartX.current = t.clientX;
    photoTouchStartY.current = t.clientY;
  };

  const handlePhotoTouchEnd = (e: React.TouchEvent) => {
    if (photoTouchId.current === null || s.images.length < 2) return;
    const t = Array.from(e.changedTouches).find(ct => ct.identifier === photoTouchId.current);
    photoTouchId.current = null;
    if (!t) return;
    const dx = t.clientX - photoTouchStartX.current;
    const dy = Math.abs(t.clientY - photoTouchStartY.current);
    if (Math.abs(dx) > 32 && Math.abs(dx) > dy * 1.2) {
      if (dx < 0) setMobilePhotoIdx(i => Math.min(i + 1, s.images.length - 1));
      else        setMobilePhotoIdx(i => Math.max(i - 1, 0));
    }
  };

  const handlePhotoTouchCancel = () => {
    photoTouchId.current = null;
  };

  return (
    <>
      {galleryOpen && <GalleryLightbox images={s.images} initialIndex={galleryIdx} onClose={() => setGalleryOpen(false)} />}

      <div style={{ animation: 'semExpandIn 0.3s cubic-bezier(0.22,1,0.36,1) both' }}>

        {/* ── Titre desktop ── */}
        <div className="sem-detail-title" style={{ marginBottom: 20 }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(22px,3vw,32px)', color: '#1a2e1a', lineHeight: 1.15, margin: '0 0 6px' }}>
            {fmt.titre}
          </h2>
          <div style={{ fontSize: 13, color: '#9a9080', fontWeight: 500 }}>{s.producteur}</div>
        </div>

        {/* ── Carrousel mobile ── */}
        <div
          className="sem-mobile-carousel"
          onTouchStart={handlePhotoTouchStart}
          onTouchEnd={handlePhotoTouchEnd}
          onTouchCancel={handlePhotoTouchCancel}
          style={{ touchAction: 'manipulation' }}
        >
          <img
            key={mobilePhotoIdx}
            src={s.images[mobilePhotoIdx] ?? mainImage}
            alt={fmt.titre}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none', userSelect: 'none' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 35%, transparent 55%, rgba(0,0,0,0.55) 100%)', pointerEvents: 'none' }} />

          {onBack && (
            <button
              type="button"
              onClick={onBack}
              style={{
                position: 'absolute',
                top: 'calc(84px + env(safe-area-inset-top, 0px) + 10px)',
                left: 'max(16px, env(safe-area-inset-left, 0px))',
                zIndex: 85,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                minHeight: 44,
                padding: '11px 20px',
                background: 'rgba(255,255,255,0.14)',
                WebkitBackdropFilter: 'blur(16px)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.42)',
                borderRadius: 9999,
                fontSize: 11,
                fontWeight: 700,
                color: '#fff',
                cursor: 'pointer',
                fontFamily: 'inherit',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textShadow: '0 1px 2px rgba(0,0,0,0.35)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
                WebkitTapHighlightColor: 'transparent',
              }}>
              ← Toutes nos offres
            </button>
          )}

          {s.bestseller && (
            <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, background: 'rgba(60,60,60,0.5)', borderRadius: 9999, padding: '3px 10px', fontSize: 8, fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>★ Populaire</div>
          )}

          <div style={{ position: 'absolute', bottom: 'max(36px, calc(env(safe-area-inset-bottom, 0px) + 28px))', left: 20, right: 20, zIndex: 10, pointerEvents: 'none' }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(20px,5vw,26px)', color: '#fff', lineHeight: 1.15, margin: '0 0 6px', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
              {fmt.titre}
            </h2>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{s.producteur}</div>
          </div>

          {s.images.length > 1 && (
            <div style={{ position: 'absolute', bottom: 'max(14px, calc(env(safe-area-inset-bottom, 0px) + 8px))', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 5, zIndex: 10, pointerEvents: 'none' }}>
              {s.images.map((_, i) => (
                <div key={i} style={{ width: i === mobilePhotoIdx ? 20 : 6, height: 6, borderRadius: 3, background: i === mobilePhotoIdx ? '#fff' : 'rgba(255,255,255,0.45)', transition: 'all 0.3s ease' }} />
              ))}
            </div>
          )}
        </div>

        {/* ── Grille photos desktop ── */}
        <div className={`sem-photo-grid sem-photo-grid-desktop ${hasSmall ? 'has-small' : 'no-small'}`}>
          <div onClick={() => { setGalleryIdx(0); setGalleryOpen(true); }} className="sem-photo-main">
            <img src={mainImage} alt={fmt.titre} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
          </div>
          {smallImages.map((img, i) => (
            <div key={i} onClick={() => { setGalleryIdx(i + 1); setGalleryOpen(true); }} style={{ cursor: 'pointer', overflow: 'hidden' }}>
              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
            </div>
          ))}
          {s.bestseller && (
            <div style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(60,60,60,0.5)', borderRadius: 9999, padding: '3px 10px', fontSize: 8, fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', pointerEvents: 'none' }}>★ Populaire</div>
          )}
          {s.images.length > 1 && (
            <button onClick={() => { setGalleryIdx(0); setGalleryOpen(true); }}
              style={{ position: 'absolute', bottom: 14, right: 14, background: '#fff', border: '1.5px solid rgba(0,0,0,0.15)', borderRadius: 9999, padding: '8px 16px', fontSize: 12, fontWeight: 700, color: '#1a2e1a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', fontFamily: 'inherit' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              Afficher toutes les photos
            </button>
          )}
        </div>

        {/* Contenu */}
        <div className="sem-detail-cols">
          <div>
            <div style={{ fontSize: 14, color: '#9a9080', fontStyle: 'italic', marginBottom: 4 }}>{fmt.sous_titre}</div>
            <div style={{ fontSize: 12, color: '#b0a89e', fontWeight: 600, marginBottom: 28 }}>{s.region}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
              <div style={{ display: 'flex', gap: 0, background: 'rgba(26,46,26,0.05)', borderRadius: 9999, padding: '5px', flexShrink: 0 }}>
                {FORMATS.filter(f => f.id in s.formats).map(f => {
                  const fa = activeFormat === f.id;
                  return (
                    <button key={f.id} onClick={() => setActiveFormat(f.id)}
                      style={{ padding: '9px 18px', borderRadius: 9999, border: 'none', fontFamily: 'inherit', fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', cursor: 'pointer', textTransform: 'uppercase', background: fa ? '#fff' : 'transparent', color: fa ? '#1a2e1a' : '#b0a89e', boxShadow: fa ? '0 1px 4px rgba(26,46,26,0.10)' : 'none', transition: 'all 0.18s ease', whiteSpace: 'nowrap' }}>
                      {f.label}
                    </button>
                  );
                })}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                <span style={{ fontSize: 13, color: '#7a7060', fontWeight: 600 }}>{fmt.participants}</span>
                <span style={{ color: '#d4cec8' }}>·</span>
                <span style={{ fontSize: 13, color: '#7a7060', fontWeight: 600 }}>{fmt.duree}</span>
              </div>
            </div>
            {fmt.inclus.length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b0a89e', marginBottom: 16 }}>Inclus dans l'offre</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px 24px' }}>
                  {fmt.inclus.map(key => {
                    const amenity = AMENITIES_MAP[key];
                    if (!amenity) return null;
                    return (
                      <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>{amenity.icon}</span>
                        <span style={{ fontSize: 13, color: '#3a3028', fontWeight: 500, lineHeight: 1.35 }}>{amenity.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <ProgrammeAccordion programme={fmt.programme} couleur={s.couleur} triggerKey={s.id + activeFormat} />
          </div>

          <div className="sem-price-col">
            <div style={{ background: '#fff', borderRadius: 20, border: '1px solid rgba(26,46,26,0.1)', padding: '24px', boxShadow: '0 4px 28px rgba(26,46,26,0.09)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 20, flexWrap: activeFormat === 'mesure' ? 'wrap' : 'nowrap' }}>
                <div>
                  <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#b0a89e', marginBottom: 4 }}>Tarif indicatif</div>
                  {activeFormat === 'mesure' ? (
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#1a2e1a', lineHeight: 1.2 }}>{fmt.prix}</div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, lineHeight: 1 }}>
                      <span style={{ fontSize: 32, fontWeight: 800, color: '#1a2e1a' }}>{fmt.prix}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#7a7060' }}>/pers.</span>
                    </div>
                  )}
                </div>
                <button onClick={onDevis}
                  style={{ flexShrink: 0, background: '#1a2e1a', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', padding: '14px 20px', borderRadius: 9999, border: 'none', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, ...(activeFormat === 'mesure' ? { width: '100%', justifyContent: 'center' } : {}) }}>
                  Demander un devis
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </button>
              </div>
              <div style={{ borderTop: '1px solid rgba(26,46,26,0.08)', marginBottom: 16 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#7a7060' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {fmt.duree}
                </span>
                <span style={{ color: '#c9c0b6', fontSize: 12 }}>·</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#7a7060' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  {fmt.participants}
                </span>
              </div>
              <div style={{ fontSize: 12, color: '#7a7060' }}>Devis gratuit · Réponse 48h</div>
            </div>
          </div>
        </div>

        <MiniMap s={s} />
      </div>
    </>
  );
}

// ─── MiniMap ──────────────────────────────────────────────────────────────────

function MiniMap({ s }: { s: Seminaire }) {
  const mapboxToken = useMapboxPublicToken();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapboxToken || !containerRef.current || mapRef.current || s.lat == null || s.lng == null) return;
    mapboxgl.accessToken = mapboxToken;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [s.lng, s.lat],
      zoom: 7,
      interactive: false,
      attributionControl: false,
    });
    map.once('load', () => {
      const emoji = getProductEmoji(s);
      const el = document.createElement('div');
      el.innerHTML = `<div style="width:46px;height:46px;background:${s.couleur};border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:0 4px 18px ${s.couleur}70;border:3px solid #fff;">${emoji}</div>`;
      new mapboxgl.Marker({ element: el, anchor: 'center' }).setLngLat([s.lng!, s.lat!]).addTo(map);
    });
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [s.id, mapboxToken]);

  if (s.lat == null || s.lng == null) return null;

  return (
    <div style={{ marginTop: 40 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b0a89e', marginBottom: 14 }}>Localisation</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#1a2e1a', marginBottom: 4 }}>{s.region}</div>
      <div style={{ fontSize: 13, color: '#9a9080', marginBottom: 16 }}>{s.producteur}</div>
      {mapboxToken ? (
        <div ref={containerRef} style={{ width: '100%', height: 260, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(26,46,26,0.08)', boxShadow: '0 2px 12px rgba(26,46,26,0.07)' }} />
      ) : (
        <div style={{ width: '100%', height: 160, borderRadius: 16, border: '1px dashed rgba(26,46,26,0.12)', background: '#faf8f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#9a9080', padding: 16, textAlign: 'center' }}>
          Carte indisponible pour le moment — la localisation figure ci-dessus.
        </div>
      )}
    </div>
  );
}

// ─── SeminaireModal ───────────────────────────────────────────────────────────

export function SeminaireModal({ isOpen, onClose, seminaires, initialSeminaire, initialFormatId }: {
  isOpen: boolean; onClose: () => void; seminaires: Seminaire[];
  initialSeminaire: Seminaire | null; initialFormatId: string;
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
  const [startDate, setStart] = useState('');
  const [endDate, setEnd] = useState('');
  const [hebergement, setHeberg] = useState(false);
  const [withTransport, setWithT] = useState(false);
  const [villeDepart, setVilleDepart] = useState('');
  const [distanceHours, setDistanceHours] = useState(3);
  const [extraActivities, setExtraActivities] = useState<string[]>([]);
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
      setSelectedSeminaireId(null); setSelectedFormatId('1jour'); setAccTypes([]); setTransport('');
      setStart(''); setEnd(''); setHeberg(false); setWithT(false); setVilleDepart(''); setDistanceHours(3); setExtraActivities([]);
      onClose();
    }, 280);
  };

  const toggle = (list: string[], setList: (v: string[]) => void, item: string) =>
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);

  const selectedSeminaire = seminaires.find(s => s.id === selectedSeminaireId) ?? seminaires[0] ?? null;
  const selectedFormat    = selectedSeminaire && selectedFormatId in selectedSeminaire.formats ? selectedSeminaire.formats[selectedFormatId] : null;
  const formatLabel       = FORMATS.find(f => f.id === selectedFormatId)?.label ?? selectedFormatId;

  const goNext = () => {
    setError('');
    if (step === 1 && (!selectedSeminaireId || !selectedFormatId)) { setError('Veuillez sélectionner une offre.'); return; }
    if (step === 2) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
      if (!form.prenom || !form.nom || !form.email || !emailOk || !form.entreprise || !form.participants.trim()) {
        setError('Certains champs obligatoires sont manquants ou invalides.'); return;
      }
    }
    if (step === 3) {
      if (!startDate || !endDate || !villeDepart.trim()) {
        setError('Indiquez les dates et la ville de départ.'); return;
      }
    }
    setTrans(true);
    setTimeout(() => { setStep(s => Math.min(s + 1, 5)); setTrans(false); }, 180);
  };

  const goPrev = () => { setTrans(true); setTimeout(() => { setStep(s => Math.max(s - 1, 1)); setTrans(false); }, 180); };

  const periodStr =
    startDate && endDate ? `${new Date(startDate).toLocaleDateString('fr-FR')} → ${new Date(endDate).toLocaleDateString('fr-FR')}` : '';

  const activitesLine = [ACTIVITY_MAINS_PACK, ...extraActivities].join(', ');

  const handleSubmit = async () => {
    setSubmit(true);
    const selectionLine = selectedSeminaire && selectedFormat
      ? `${selectedSeminaire.producteur} — ${formatLabel} (${selectedFormat.titre})`
      : 'Non renseigné';
    try {
      const res = await fetch('/api/demande-seminaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seminaire_id:     selectedSeminaireId,
          format_id:        selectedFormatId,
          selection_label:  selectionLine,
          prenom:           form.prenom,
          nom:              form.nom,
          email:            form.email,
          entreprise:       form.entreprise,
          participants:     form.participants,
          periode:          periodStr,
          ville_depart:     villeDepart || null,
          distance_max_h:   distanceHours,
          hebergement:      hebergement,
          hebergement_type: hebergement ? accTypes.join(', ') : null,
          transport:        withTransport,
          transport_type:   withTransport ? transport : null,
          message:          [form.message?.trim() && form.message.trim(), `Activités : ${activitesLine}`].filter(Boolean).join('\n\n') || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Erreur lors de l\'envoi.');
      }

      const emailBody = [
        `Séminaire : ${selectionLine}`,
        ``,
        `Prénom : ${form.prenom}`,
        `Nom : ${form.nom}`,
        `Email : ${form.email}`,
        `Entreprise : ${form.entreprise}`,
        `Participants : ${form.participants || 'Non renseigné'}`,
        `Période : ${periodStr || 'Non renseignée'}`,
        ``,
        `Ville de départ : ${villeDepart || 'Non renseignée'}`,
        `Distance max : ${distanceHours ? `${distanceHours}h` : 'Non renseignée'}`,
        `Hébergement : ${hebergement ? `Oui — ${accTypes.join(', ')}` : 'Non'}`,
        `Transport : ${withTransport ? `Oui — ${transport}` : 'Non'}`,
        ``,
        `Activités : ${activitesLine}`,
        ``,
        `Message : ${form.message || '(aucun)'}`,
      ].join('\n');

      fetch('https://formsubmit.co/ajax/alexso.terrago@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: `${form.prenom} ${form.nom}`,
          email: form.email,
          subject: `Nouvelle demande séminaire — ${form.entreprise}`,
          message: emailBody,
          _captcha: false,
          _template: 'table',
        }),
      }).catch(() => {});

      setSuccess(true);
      setTimeout(handleClose, 2200);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setSubmit(false);
    }
  };

  if (!isOpen) return null;

  const selectOptions = seminaires.map(s => ({ value: s.id, label: `${s.label} — ${s.producteur}` }));

  return (
    <>
      <div onClick={handleClose} style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(10,20,10,0.65)', backdropFilter: 'blur(6px)', opacity: closing ? 0 : 1, transition: 'opacity 0.28s ease' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, pointerEvents: 'none' }}>
        <div onClick={e => e.stopPropagation()} style={{ pointerEvents: 'auto', width: '100%', maxWidth: 860, maxHeight: '96vh', background: '#fff', borderRadius: 28, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 8px 48px rgba(0,0,0,0.14)', animation: `${closing ? 'semModalOut' : 'semModalIn'} 0.32s cubic-bezier(0.22,1,0.36,1) both`, fontFamily: 'inherit', position: 'relative' }}>

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

          {error && (
            <div style={{ background: 'rgba(230,126,34,0.07)', borderBottom: '1px solid rgba(230,126,34,0.2)', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <span style={{ fontSize: 14 }}>⚠️</span>
              <p style={{ fontSize: 13, color: '#c0620a', fontWeight: 600, margin: 0, flex: 1 }}>{error}</p>
              <button onClick={() => setError('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c0620a', fontSize: 16, fontFamily: 'inherit' }}>×</button>
            </div>
          )}

          {success && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 20, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(4px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 24 }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#1a2e1a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <svg width="24" height="24" viewBox="0 0 34 34" fill="none"><path d="M8 17.5L14 23.5L26 11" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h3 style={{ fontStyle: 'italic', fontSize: 28, fontWeight: 700, color: '#1a2e1a', margin: '0 0 8px', fontFamily: 'inherit' }}>Demande envoyée !</h3>
              <p style={{ color: '#9a9080', fontSize: 15, margin: 0 }}>Nous vous recontacterons sous 48h.</p>
            </div>
          )}

          <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '28px 24px 0', scrollbarWidth: 'none' }}>
            <div style={{ opacity: transitioning ? 0 : 1, transform: transitioning ? 'translateY(6px)' : 'translateY(0)', transition: 'all 0.18s ease' }}>

              {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                  <div>
                    <h3 style={{ fontStyle: 'italic', fontSize: 24, fontWeight: 700, color: '#1a2e1a', margin: '0 0 4px', fontFamily: 'inherit' }}>Votre sélection.</h3>
                    <p style={{ color: '#b0a89e', fontSize: 14, margin: 0 }}>Récapitulatif de l'offre choisie. Vous pouvez en sélectionner une autre.</p>
                  </div>
                  {selectedSeminaire && selectedFormat && (
                    <div style={{ background: '#faf8f5', borderRadius: 18, padding: '16px 18px', border: '1px solid rgba(10,44,52,0.08)' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#e67e22', marginBottom: 8 }}>Actuellement sélectionné</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#1a2e1a', marginBottom: 4 }}>{selectedSeminaire.producteur}</div>
                      <div style={{ fontSize: 14, color: '#7a7060' }}>{formatLabel} — {selectedFormat.titre}</div>
                    </div>
                  )}
                  <FieldBlock label="Changer de produit">
                    <CustomSelect value={selectedSeminaireId ?? ''} onChange={val => setSelectedSeminaireId(val || null)} options={selectOptions} placeholder="— Choisir un produit —" />
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

              {step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                  <div>
                    <h3 style={{ fontStyle: 'italic', fontSize: 24, fontWeight: 700, color: '#1a2e1a', margin: '0 0 4px', fontFamily: 'inherit' }}>Informations & coordonnées.</h3>
                    <p style={{ color: '#b0a89e', fontSize: 14, margin: 0 }}>Qui vous êtes et combien vous serez.</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                    <FieldBlock label="Prénom" required><input style={inputStyle} placeholder="Jean" value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })} /></FieldBlock>
                    <FieldBlock label="Nom" required><input style={inputStyle} placeholder="Dupont" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} /></FieldBlock>
                    <FieldBlock label="Email professionnel" required><input style={inputStyle} type="email" placeholder="contact@entreprise.fr" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></FieldBlock>
                    <FieldBlock label="Entreprise" required><input style={inputStyle} placeholder="Terroir SAS" value={form.entreprise} onChange={e => setForm({ ...form, entreprise: e.target.value })} /></FieldBlock>
                  </div>
                  <FieldBlock label="Nombre de participants" required>
                    <input
                      style={inputStyle}
                      type="text"
                      inputMode="numeric"
                      placeholder="Ex. 24, une fourchette, ou « entre 15 et 30 »"
                      value={form.participants}
                      onChange={e => setForm({ ...form, participants: e.target.value })}
                    />
                  </FieldBlock>
                </div>
              )}

              {step === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                  <div>
                    <h3 style={{ fontStyle: 'italic', fontSize: 24, fontWeight: 700, color: '#1a2e1a', margin: '0 0 4px', fontFamily: 'inherit' }}>Dates & destination.</h3>
                    <p style={{ color: '#b0a89e', fontSize: 14, margin: 0 }}>Quand vous partez et depuis où.</p>
                  </div>
                  <FieldBlock label="Dates du séjour" required>
                    <CollapsibleDateRangePicker collapseCalendar startDate={startDate} endDate={endDate} onStartChange={setStart} onEndChange={setEnd} />
                  </FieldBlock>
                  <FieldBlock label="Votre ville de départ" required>
                    <VilleDepartInput value={villeDepart} onChange={setVilleDepart} style={inputStyle} />
                  </FieldBlock>
                  <FieldBlock label="Temps maximum de trajet souhaité" required>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <button type="button" onClick={() => setDistanceHours(h => Math.max(1, h - 1))} style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(10,44,52,0.15)', background: '#fff', cursor: 'pointer', fontSize: 18, fontWeight: 700, color: '#1a2e1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Diminuer">−</button>
                      <span style={{ fontSize: 16, fontWeight: 700, color: '#1a2e1a', minWidth: 100, textAlign: 'center' }}>{distanceHours} heure{distanceHours > 1 ? 's' : ''}</span>
                      <button type="button" onClick={() => setDistanceHours(h => Math.min(8, h + 1))} style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(10,44,52,0.15)', background: '#fff', cursor: 'pointer', fontSize: 18, fontWeight: 700, color: '#1a2e1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Augmenter">+</button>
                    </div>
                  </FieldBlock>
                </div>
              )}

              {step === 4 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                  <div>
                    <h3 style={{ fontStyle: 'italic', fontSize: 24, fontWeight: 700, color: '#1a2e1a', margin: '0 0 4px', fontFamily: 'inherit' }}>Logistique & sur-mesure.</h3>
                    <p style={{ color: '#b0a89e', fontSize: 14, margin: 0 }}>Hébergement, transport, activités et message.</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                    <ToggleCard icon="🏠" label="Hébergement" active={hebergement} onToggle={() => setHeberg(v => !v)}>
                      {hebergement && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>{['Chambres seules', 'Chambres partagées'].map(t => <TagBtn key={t} active={accTypes.includes(t)} onClick={() => toggle(accTypes, setAccTypes, t)} small>{t}</TagBtn>)}</div>}
                    </ToggleCard>
                    <ToggleCard icon="🚗" label="Transport" active={withTransport} onToggle={() => setWithT(v => !v)}>
                      {withTransport && <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>{['De porte à porte', 'Depuis gare SNCF proche'].map(t => <TagBtn key={t} active={transport === t} onClick={() => setTransport(t)} small>{t}</TagBtn>)}</div>}
                    </ToggleCard>
                  </div>
                  <FieldBlock label="Activités possibles">
                    <p style={{ fontSize: 12, color: '#7a7060', margin: '0 0 12px', lineHeight: 1.55 }}>
                      Toutes nos activités sont conçues pour renforcer les liens et faciliter la cohésion d&apos;équipe.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      <span style={{
                        padding: '6px 14px', borderRadius: 9999, border: '1.5px solid #1a2e1a', background: '#1a2e1a', color: '#fff',
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 5, cursor: 'default',
                      }}>
                        ✓ {ACTIVITY_MAINS_PACK}
                      </span>
                      {ACTIVITY_OPTIONS_PACK.map(a => (
                        <TagBtn key={a} active={extraActivities.includes(a)} onClick={() => toggle(extraActivities, setExtraActivities, a)}>{a}</TagBtn>
                      ))}
                    </div>
                  </FieldBlock>
                  <FieldBlock label="Un message particulier ?">
                    <textarea rows={4} style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }} placeholder="Salles de réunion, pauses gourmandes, team building…" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                  </FieldBlock>
                </div>
              )}

              {step === 5 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <p style={{ color: '#b0a89e', fontSize: 14, margin: '0 0 4px' }}>Vérifiez vos informations avant d'envoyer.</p>
                  {[
                    { num: 1, title: 'Sélection', rows: [{ label: 'Produit / offre', value: selectedSeminaire && selectedFormat ? `${selectedSeminaire.producteur} — ${formatLabel} (${selectedFormat.titre})` : '—' }] },
                    { num: 2, title: 'Coordonnées', rows: [{ label: 'Nom', value: `${form.prenom} ${form.nom}` }, { label: 'Email', value: form.email }, { label: 'Entreprise', value: form.entreprise }, { label: 'Participants', value: form.participants }] },
                    { num: 3, title: 'Dates & lieu', rows: [{ label: 'Période', value: periodStr || '—' }, { label: 'Ville de départ', value: villeDepart.trim() || '—' }, { label: 'Temps max. trajet', value: `${distanceHours} h` }] },
                    { num: 4, title: 'Logistique & activités', rows: [{ label: 'Hébergement', value: hebergement ? (accTypes.length > 0 ? accTypes.join(', ') : 'Oui') : 'Non' }, { label: 'Transport', value: withTransport ? (transport || 'Oui') : 'Non' }, { label: 'Activités', value: activitesLine }, ...(form.message ? [{ label: 'Message', value: form.message }] : [])] },
                  ].map(block => (
                    <div key={block.num} style={{ background: '#faf8f5', borderRadius: 18, padding: '14px 18px', border: '1px solid rgba(10,44,52,0.06)' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#e67e22', marginBottom: 10 }}>{block.num} — {block.title}</div>
                      {block.rows.map(r => <RecapRow key={r.label} label={r.label} value={typeof r.value === 'string' ? r.value : ''} />)}
                    </div>
                  ))}
                  <p style={{ fontSize: 13, color: '#b0a89e', textAlign: 'center', margin: '4px 0 0' }}>Tout est correct ? Cliquez sur <strong style={{ color: '#1a2e1a' }}>Demander un devis</strong>.</p>
                </div>
              )}
            </div>
          </div>

          <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(26,46,26,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexShrink: 0, flexWrap: 'wrap' }}>
            <button onClick={goPrev} disabled={step === 1} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: step === 1 ? 'transparent' : '#b0a89e', background: 'none', border: 'none', cursor: step === 1 ? 'default' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, pointerEvents: step === 1 ? 'none' : 'auto' }}>
              ← Précédent
            </button>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={handleClose} style={{ padding: '11px 20px', borderRadius: 9999, border: '1px solid rgba(26,46,26,0.1)', background: '#faf8f5', fontFamily: 'inherit', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#b0a89e', cursor: 'pointer' }}>Annuler</button>
              <button onClick={step < 5 ? goNext : handleSubmit} disabled={submitting} style={{ padding: '11px 24px', borderRadius: 9999, background: '#1a2e1a', color: '#fff', border: 'none', fontFamily: 'inherit', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: 8, minWidth: 150, justifyContent: 'center' }}>
                {submitting ? 'Envoi…' : step < 5 ? 'Continuer →' : 'Demander un devis'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────

export default function SeminairesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [seminaires,    setSeminaires]    = useState<Seminaire[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [fetchError,    setFetchError]    = useState<string | null>(null);
  const [activeProduit, setActiveProduit] = useState('all');
  const [activeFormat,  setActiveFormat]  = useState('1jour');
  const [activeId,      setActiveId]      = useState<string | null>(null);
  const [modalOpen,     setModalOpen]     = useState(false);
  const [modalSem,      setModalSem]      = useState<Seminaire | null>(null);
  const [mapExpanded,   setMapExpanded]   = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSeminaires()
      .then(data => { setSeminaires(data); setLoading(false); })
      .catch(err => { setFetchError(err?.message ?? 'Impossible de charger les offres.'); setLoading(false); });
  }, []);

  const appliedUniversRef = useRef(false);
  useEffect(() => {
    const univers = searchParams.get('univers');
    if (!univers || seminaires.length === 0 || appliedUniversRef.current) return;
    const config = UNIVERS_TO_PACK[univers];
    if (!config) return;
    appliedUniversRef.current = true;
    setActiveProduit(config.produitId);
  }, [seminaires, searchParams]);

  const PRODUIT_TO_IDS: Record<string, string[]> = {
    'fruits-a-coque':    ['noix', 'fruits-coques', 'noix-de-pecan', 'amandes'],
    'vins-spiritueux':   ['vins', 'spiritueux'],
  };
  const filtered = activeProduit === 'all'
    ? seminaires
    : (() => {
        const ids = PRODUIT_TO_IDS[activeProduit];
        const result = ids
          ? seminaires.filter(s => ids.includes(s.id))
          : seminaires.filter(s => s.id === activeProduit);
        return result.length ? result : seminaires;
      })();

  const scrollToCard = useCallback((id: string) => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector(`[data-id="${id}"]`) as HTMLElement | null;
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, []);

  const openDevis = (s: Seminaire) => { setModalSem(s); setModalOpen(true); };
  const navigateToSlug = (s: Seminaire) => router.push(`/seminaires-entreprise/offres/${s.slug}`);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#faf8f5' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 32, height: 32, border: '2px solid rgba(26,46,26,0.1)', borderTop: '2px solid #1a2e1a', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ color: '#b0a89e', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>Chargement…</p>
      </div>
    </div>
  );

  return (
    <div style={{ background: '#faf8f5', minHeight: '100vh', fontFamily: 'inherit' }}>
      <style>{`
        @keyframes photoSlideInRight { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes photoSlideInLeft  { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes semModalIn  { from{opacity:0;transform:translateY(24px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes semModalOut { from{opacity:1;transform:translateY(0) scale(1)} to{opacity:0;transform:translateY(24px) scale(0.97)} }
        @keyframes semExpandIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateX(-50%) translateY(10px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
        ::-webkit-scrollbar { display:none }
        .sem-img-arrow { opacity:0; transition:opacity 0.2s ease; }
        .sem-img-wrap:hover .sem-img-arrow { opacity:1; }
        .terrago-popup .mapboxgl-popup-content { border-radius:18px !important; padding:12px 14px !important; box-shadow:0 4px 20px rgba(26,46,26,0.14) !important; border:1px solid rgba(26,46,26,0.08) !important; font-family:inherit !important; }
        .terrago-popup .mapboxgl-popup-tip { display:none !important; }
        .fmt-tab { flex:1; padding:10px 18px; border-radius:9999px; border:none; font-family:inherit; font-size:10px; font-weight:700; letter-spacing:0.06em; cursor:pointer; transition:all 0.18s ease; white-space:nowrap; text-transform:uppercase; }
        .sem-page-wrap  { max-width:1400px; margin:0 auto; padding:0 clamp(1rem,3vw,2rem); }
        .sem-header-top { padding-top:calc(84px + 3rem); padding-bottom:1.5rem; }
        .sem-filter-chip { display:inline-flex; align-items:center; padding:7px 16px; border-radius:9999px; border:1.5px solid rgba(10,44,52,0.1); background:#fff; font-family:inherit; font-size:11px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; cursor:pointer; color:#b0a89e; transition:all 0.15s ease; white-space:nowrap; }
        .sem-filter-chip.active { color:#fff; border-color:transparent; }
        .sem-filter-chip:hover:not(.active):not(:disabled) { background:#f0ece5; color:#1a2e1a; }
        .sem-split      { display:grid; grid-template-columns:1fr 380px; gap:28px; align-items:start; }
        .sem-grid       { display:grid; grid-template-columns:repeat(3, 1fr); gap:14px; align-items:stretch; }
        .sem-grid > div { min-width:0; display:flex; }
        .sem-pack-card { flex:1; width:100%; min-height:0; display:flex; flex-direction:column; }
        .sem-pack-card-visual { position:relative; width:100%; flex-shrink:0; aspect-ratio:1/1; overflow:hidden; }
        .sem-pack-card-body { flex:1; display:flex; flex-direction:column; min-height:0; padding:10px 12px 12px; }
        .sem-pack-card-row { margin-top:auto; }
        .sem-map-widget { border-radius:16px; overflow:hidden; height:640px; box-shadow:0 2px 16px rgba(26,46,26,0.12); }
        .sem-cta-band   { display:flex; flex-direction:row; align-items:center; justify-content:space-between; gap:32px; flex-wrap:wrap; background:#1e291a; border-radius:24px; padding:48px 64px; }
        .sem-detail-cols { display:grid; grid-template-columns:1fr 440px; gap:48px; align-items:start; }
        .sem-format-tabs { display:flex; gap:0; background:rgba(26,46,26,0.05); border-radius:9999px; padding:6px; margin-left:auto; flex-shrink:0; }
        .sem-mobile-carousel { display:none; }
        .sem-photo-grid { display:grid; gap:8px; border-radius:16px; overflow:hidden; margin-bottom:40px; position:relative; }
        .sem-photo-grid.has-small { grid-template-columns:1fr 1fr; grid-template-rows:repeat(2,clamp(160px,18vw,220px)); }
        .sem-photo-grid.no-small  { grid-template-columns:1fr; grid-template-rows:clamp(300px,36vw,440px); }
        .sem-photo-main { cursor:pointer; overflow:hidden; }
        .sem-photo-grid.has-small .sem-photo-main { grid-row:1/3; }
        .sem-price-col { position:sticky; top:96px; align-self:start; }
        @media (max-width:1100px) { .sem-split { grid-template-columns:1fr 320px; } }
        @media (max-width:900px)  { .sem-grid  { grid-template-columns:repeat(2,1fr); } }
        @media (max-width:768px)  {
          .sem-split { grid-template-columns:1fr; }
          .sem-grid { gap:10px; }
          .sem-map-widget { height:300px; min-height: 240px; }
          .sem-header-top { padding-top:calc(64px + 2rem); }
          .sem-cta-band { flex-direction:column; text-align:center; padding:32px 24px; gap:24px; }
          .sem-detail-cols { grid-template-columns:1fr; gap:24px; }
          .sem-price-col { position:static; }
          .sem-format-tabs { display:none; }
          .sem-mobile-carousel { display:block; position:relative; width:100vw; left:50%; transform:translateX(-50%); height:55vh; overflow:hidden; margin-bottom:28px; }
          .sem-photo-grid-desktop { display:none !important; }
          .sem-detail-title { display:none; }
          .sem-pack-card { border-radius:16px !important; }
          .sem-pack-card-visual { aspect-ratio:auto; height:clamp(100px,30vw,120px); max-height:none; }
          .sem-pack-card-body { padding:9px 10px 11px; }
          .sem-pack-card-title { font-size:12px !important; line-height:1.3 !important; min-height:calc(1.3em * 2); display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
          .sem-pack-card-sub { min-height:1.35em; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
          .sem-pack-card-row { flex-wrap:nowrap; align-items:center !important; gap:4px !important; }
          .sem-pack-card-btn { padding:6px 9px !important; font-size:8px !important; letter-spacing:0.05em !important; }
          .sem-pack-card-price { flex-wrap:nowrap !important; gap:3px !important; }
          .sem-pack-card-price span:nth-child(2) { font-size:12px !important; }
          .sem-pack-card-price .sem-pack-price-from { font-size:8px !important; }
          .sem-pack-card-price span:last-child { font-size:8px !important; }
        }
        @media (max-width:600px)  {
          .sem-photo-grid.has-small { grid-template-columns:1fr; grid-template-rows:clamp(200px,60vw,300px) clamp(120px,32vw,180px) clamp(120px,32vw,180px); }
          .sem-photo-grid.has-small .sem-photo-main { grid-row:auto; }
          .sem-photo-grid.no-small  { grid-template-rows:clamp(220px,65vw,340px); }
          .sem-grid { grid-template-columns:repeat(2,1fr); }
        }
        @media (max-width:480px)  {
          .sem-grid { grid-template-columns:repeat(2,1fr); gap:8px; }
          /* Garder la carte visible : la carte « aperçu » au tap sur un pin vit ici ; display:none la masquait entièrement sur petits téléphones */
          .sem-map-widget { height: min(280px, 52dvh); min-height: 220px; }
          .sem-cta-band { border-radius:16px; }
        }
      `}</style>

      <SeminaireModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        seminaires={seminaires}
        initialSeminaire={modalSem ?? (filtered[0] || null)}
        initialFormatId={activeFormat}
      />

      {mapExpanded && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1500, background: 'rgba(10,20,10,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          onClick={() => setMapExpanded(false)}>
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 1200, height: '80vh', borderRadius: 24, overflow: 'hidden', boxShadow: '0 8px 48px rgba(0,0,0,0.2)' }}>
            <MapboxMap seminaires={filtered} activeId={activeId} activeFormat={activeFormat}
              onSelect={(id) => { const s = filtered.find(x => x.id === id); setActiveId(id); if (s) navigateToSlug(s); setMapExpanded(false); }}
              onExpand={() => setMapExpanded(false)} expanded={true} />
          </div>
        </div>
      )}

      <div className="sem-page-wrap">
        <div className="sem-header-top">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 20, height: 1, background: '#e67e22' }} />
            <span style={{ fontSize: 9, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', color: '#e67e22' }}>Offres packagées</span>
          </div>
          <h1 className="text-primary" style={{ letterSpacing: '-0.01em', margin: '0 0 12px', lineHeight: 1.06 }}>
            <span className="font-sans font-bold text-3xl sm:text-4xl">Nos séminaires nature &amp; </span>
            <span className="font-display italic font-bold text-4xl sm:text-5xl">team building terroir.</span>
          </h1>
          <p style={{ color: '#9a9080', fontSize: 13, maxWidth: 580, lineHeight: 1.75, margin: '0 0 24px' }}>
            1 journée, 2 jours ou sur mesure — des team-buildings humains chez des producteurs français.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', paddingBottom: 20, borderBottom: '1px solid rgba(26,46,26,0.06)' }}>
            {PRODUITS.map(p => {
              const active = activeProduit === p.id;
              const bg = active && filtered[0]?.couleur ? filtered[0].couleur : '#1a2e1a';
              return (
                <button key={p.id} disabled={!!p.comingSoon}
                  onClick={() => { if (!p.comingSoon) { setActiveProduit(p.id); setActiveId(null); } }}
                  className={`sem-filter-chip${active ? ' active' : ''}`}
                  style={active ? { background: bg } : p.comingSoon ? { opacity: 0.4, cursor: 'default' } : {}}>
                  {p.label}
                  {p.comingSoon && <span style={{ marginLeft: 6, fontSize: 8, opacity: 0.7 }}>bientôt</span>}
                </button>
              );
            })}
            <div className="sem-format-tabs">
              {FORMATS.map(f => {
                const fa = activeFormat === f.id;
                return (
                  <button key={f.id} onClick={() => setActiveFormat(f.id)} className="fmt-tab"
                    style={{ background: fa ? '#fff' : 'transparent', color: fa ? '#1a2e1a' : '#b0a89e', boxShadow: fa ? '0 1px 4px rgba(26,46,26,0.10)' : 'none' }}>
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div style={{ paddingTop: 12, paddingBottom: 16, fontSize: 11, color: '#b0a89e', fontWeight: 600, letterSpacing: '0.06em' }}>
            {filtered.length} expérience{filtered.length > 1 ? 's' : ''} disponible{filtered.length > 1 ? 's' : ''}
          </div>
        </div>

        <div className="sem-split">
          <div>
            {filtered.length === 0 ? (
              <div style={{ background: '#fff', borderRadius: 20, border: '1px solid rgba(26,46,26,0.08)', padding: '2rem', textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{fetchError ? '⚠️' : '📋'}</div>
                <h3 style={{ fontStyle: 'italic', fontSize: 20, fontWeight: 700, color: '#1a2e1a', margin: '0 0 8px' }}>
                  {fetchError ? 'Impossible de charger les offres' : 'Aucune offre pour le moment'}
                </h3>
                <p style={{ color: '#9a9080', fontSize: 13, margin: 0 }}>{fetchError || 'Les offres seront bientôt disponibles.'}</p>
                <button onClick={() => setModalOpen(true)} style={{ marginTop: 20, background: '#1a2e1a', color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', padding: '10px 18px', borderRadius: 9999, border: 'none', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Demander un devis →
                </button>
              </div>
            ) : (
              <div ref={listRef} className="sem-grid">
                {filtered.map(s => (
                  <div key={s.id} data-id={s.id}>
                    <SeminaireCard
                      s={s}
                      activeFormat={activeFormat}
                      isActive={activeId === s.id}
                      onSelect={() => { setActiveId(s.id); navigateToSlug(s); }}
                      onDevis={() => openDevis(s)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ position: 'sticky', top: 90 }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b0a89e', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>🇫🇷</span> Carte des producteurs
            </div>
            <div className="sem-map-widget">
              <MapboxMap
                seminaires={filtered}
                activeId={activeId}
                activeFormat={activeFormat}
                onSelect={(id) => {
                  const s = filtered.find(x => x.id === id);
                  if (s) { setActiveId(id); navigateToSlug(s); }
                  scrollToCard(id);
                }}
                onExpand={() => setMapExpanded(true)}
                expanded={false}
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: 80, paddingTop: 48, borderTop: '1px solid #e5e0d8', paddingBottom: 80 }}>
          <div className="sem-cta-band">
            <div>
              <h3 style={{ color: '#fff', margin: '0 0 10px', lineHeight: 1.3 }}>
                <span style={{ fontFamily: "'Poppins', sans-serif", fontStyle: 'normal', fontWeight: 700, fontSize: 23 }}>Votre projet ne rentre pas </span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 700, fontSize: 32 }}>dans une case ?</span>
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, margin: 0, lineHeight: 1.6 }}>Groupe de 5 à 100+ — on construit votre séminaire sur mesure, chez un producteur choisi avec vous.</p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={BRIEF_MAIL_HREF}
                style={{ background: '#f78d00', color: '#fff', padding: '12px 20px', borderRadius: 9999, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'none', display: 'inline-block' }}>
                Discutons-en par mail →
              </a>
              <a href="/partenaires"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '12px 20px', borderRadius: 9999, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.2)', textDecoration: 'none', display: 'inline-block' }}>
                Voir nos producteurs →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
