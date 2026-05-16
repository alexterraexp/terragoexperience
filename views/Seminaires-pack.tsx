'use client';

import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode, CSSProperties } from 'react';
import { Sprout, Ham, Speech, Presentation, Wifi, House, Bike, Users, PartyPopper } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { fetchSeminaires } from '../lib/seminaires';
import type { Seminaire, Format, ProgrammeItem, SeminaireFormatId, SeminaireHebergement } from '../lib/seminaires';
import { SEMINAIRE_FORMAT_IDS, SEMINAIRE_FORMAT_LABELS } from '../lib/seminaires';
import { supabase } from '../lib/supabase';
import { mapSupabaseRowToFull, type ProducerFull, type SupabaseProducerRow } from '../lib/producerTypes';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapboxPublicToken } from '@/components/MapboxTokenProvider';
import { CollapsibleDateRangePicker } from '@/components/CollapsibleDateRangePicker';
import { VilleDepartInput } from '@/components/VilleDepartInput';

export type { Seminaire, Format, ProgrammeItem };

// ─── Constantes ───────────────────────────────────────────────────────────────

const FORMAT_DETAIL_TINTS = {
  journee: {
    tint: '#ffffff',
    border: 'rgba(11, 44, 52, 0.10)',
  },
  residentiel: {
    tint: '#ffffff',
    border: 'rgba(11, 44, 52, 0.10)',
  },
} as const;

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
    'L\'équipe TerraGo',
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
  border: '1px solid rgba(11, 44, 52,0.08)', borderRadius: 16,
  padding: '12px 16px', fontFamily: 'inherit', fontSize: 14, color: '#0b2c34',
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
    border: `1.5px solid ${active ? '#0b2c34' : 'rgba(11, 44, 52,0.1)'}`,
    background: active ? '#0b2c34' : '#faf8f5',
    color: active ? '#fff' : '#7a7060',
    fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
    cursor: 'pointer', fontFamily: 'inherit',
    boxShadow: active ? '0 2px 10px rgba(11, 44, 52,0.15)' : 'none',
    transition: 'all 0.15s ease', display: 'inline-flex', alignItems: 'center', gap: 5,
  }}>
    {children}
  </button>
);

// ─── ToggleCard ───────────────────────────────────────────────────────────────

const ToggleCard: React.FC<{ icon: ReactNode; label: string; active: boolean; onToggle: () => void; children?: ReactNode }> = ({ icon, label, active, onToggle, children }) => (
  <div style={{ padding: '18px', borderRadius: 18, border: `1.5px solid ${active ? '#0b2c34' : 'rgba(11, 44, 52,0.08)'}`, background: active ? 'rgba(11, 44, 52,0.03)' : '#faf8f5', transition: 'all 0.2s ease' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#0b2c34', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{label}</span>
      </div>
      <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
        <input type="checkbox" checked={active} onChange={onToggle} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
        <div style={{ width: 40, height: 22, background: active ? '#0b2c34' : '#d4cec8', borderRadius: 11, position: 'relative', transition: 'background 0.2s ease' }}>
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuBox, setMenuBox] = useState<{ top?: number; bottom?: number; left: number; width: number; maxHeight: number } | null>(null);
  const selectedLabel = options.find(o => o.value === value)?.label ?? '';

  const updateMenuPosition = useCallback(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const gutter = 6;
    const maxList = Math.min(320, window.innerHeight * 0.7);
    const spaceBelow = window.innerHeight - rect.bottom - gutter;
    const spaceAbove = rect.top - gutter;
    const openUp = spaceBelow < 140 && spaceAbove > spaceBelow;
    const pad = 12;
    if (openUp) {
      setMenuBox({
        bottom: window.innerHeight - rect.top + gutter,
        left: rect.left,
        width: rect.width,
        maxHeight: Math.min(maxList, Math.max(80, spaceAbove - pad)),
      });
    } else {
      setMenuBox({
        top: rect.bottom + gutter,
        left: rect.left,
        width: rect.width,
        maxHeight: Math.min(maxList, Math.max(80, spaceBelow - pad)),
      });
    }
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      setMenuBox(null);
      return;
    }
    updateMenuPosition();
  }, [open, updateMenuPosition]);

  useEffect(() => {
    if (!open) return;
    const onMove = () => updateMenuPosition();
    window.addEventListener('resize', onMove);
    window.addEventListener('scroll', onMove, true);
    return () => {
      window.removeEventListener('resize', onMove);
      window.removeEventListener('scroll', onMove, true);
    };
  }, [open, updateMenuPosition]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (ref.current?.contains(t) || menuRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const menuShared: CSSProperties = {
    position: 'fixed',
    left: menuBox?.left ?? 0,
    width: menuBox?.width ?? 0,
    maxHeight: menuBox?.maxHeight ?? 320,
    zIndex: 10050,
    background: '#fff',
    borderRadius: 18,
    border: '1px solid rgba(11, 44, 52,0.1)',
    boxShadow: '0 8px 32px rgba(11, 44, 52,0.12)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  };

  const menuEl = open && menuBox && typeof document !== 'undefined' && (
    <div
      ref={menuRef}
      style={{
        ...menuBox,
        ...menuShared,
        top: menuBox.top,
        bottom: menuBox.bottom,
      }}
    >
      <button type="button" onClick={() => { onChange(''); setOpen(false); }} style={{ width: '100%', padding: '11px 16px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: 13, color: '#b0a89e', fontFamily: 'inherit', borderBottom: '1px solid rgba(11, 44, 52,0.05)', flexShrink: 0 }}>— Choisir un produit —</button>
      <div style={{ overflowY: 'auto', flex: 1, minHeight: 0 }}>
        {options.map(opt => (
          <button key={opt.value} type="button" onClick={() => { onChange(opt.value); setOpen(false); }}
            style={{ width: '100%', padding: '11px 16px', background: opt.value === value ? 'rgba(11, 44, 52,0.04)' : 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: 14, color: opt.value === value ? '#0b2c34' : '#4a4540', fontWeight: opt.value === value ? 700 : 400, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 10, transition: 'background 0.12s ease' }}>
            {opt.value === value
              ? <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#0b2c34', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5.5L4.2 7.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              : <span style={{ width: 16, flexShrink: 0 }} />}
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button ref={buttonRef} type="button" onClick={() => setOpen(v => !v)} style={{ ...inputStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left', border: `1px solid ${open ? '#0b2c34' : 'rgba(11, 44, 52,0.08)'}`, boxShadow: open ? '0 0 0 3px rgba(11, 44, 52,0.08)' : 'none' }}>
        <span style={{ color: value ? '#0b2c34' : '#b0a89e', fontSize: 14, fontWeight: value ? 500 : 400 }}>{value ? selectedLabel : (placeholder ?? '— Choisir —')}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', flexShrink: 0, marginLeft: 8 }}>
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#0b2c34" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {menuEl && createPortal(menuEl, document.body)}
    </div>
  );
};

// ─── RecapRow ─────────────────────────────────────────────────────────────────

const RecapRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(11, 44, 52,0.05)' }}>
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#b0a89e', flexShrink: 0 }}>{label}</span>
    <span style={{ fontSize: 14, fontWeight: 600, color: '#0b2c34', textAlign: 'right' }}>{value || '—'}</span>
  </div>
);

// ─── ProgrammeAccordion ───────────────────────────────────────────────────────

const isDesktop = () => typeof window !== 'undefined' ? window.innerWidth > 768 : true;

function ProgrammeAccordion({ programme, couleur, triggerKey }: { programme: ProgrammeItem[]; couleur: string; triggerKey: any }) {
  const [expanded, setExpanded] = useState(isDesktop);
  const prev = useRef<any>(null);
  if (prev.current !== triggerKey) { prev.current = triggerKey; setExpanded(isDesktop()); }
  return (
    <div style={{ borderTop: '1px solid rgba(11, 44, 52,0.06)', paddingTop: 14 }}>
      <button onClick={() => setExpanded(v => !v)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: expanded ? 14 : 0 }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0b2c34' }}>Exemple de programme</span>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: '50%', background: 'rgba(11, 44, 52,0.05)', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', flexShrink: 0 }}>
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

// ─── Détail mobile (capsules, producteur, CTA) ────────────────────────────────

function FormatInclusList({ inclus, layout }: { inclus: string[]; layout: 'stack' | 'grid' }) {
  if (inclus.length === 0) return null;
  return (
    <div className={`sem-mobile-inclus-grid${layout === 'grid' ? ' sem-mobile-inclus-grid--cols' : ''}`}>
      {inclus.map(key => {
        const amenity = AMENITIES_MAP[key];
        if (!amenity) return null;
        return (
          <div key={key} className="sem-mobile-inclus-item">
            <span className="sem-mobile-inclus-icon">{amenity.icon}</span>
            <span>{amenity.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function MobileCollapsibleSection({
  title,
  children,
  defaultExpanded = false,
  contentKey,
}: {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  contentKey?: string | number;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  useEffect(() => {
    setExpanded(defaultExpanded);
  }, [contentKey, defaultExpanded]);

  return (
    <div className={`sem-mobile-collapsible${expanded ? ' is-expanded' : ''}`}>
      <button
        type="button"
        className="sem-mobile-collapsible-trigger"
        onClick={() => setExpanded(v => !v)}
        aria-expanded={expanded}
      >
        <h3>{title}</h3>
        <span className="sem-mobile-collapsible-chevron" aria-hidden>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 5L7 9.5L11.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <div className="sem-mobile-collapsible-panel">
        <div className="sem-mobile-collapsible-inner" key={contentKey}>
          {children}
        </div>
      </div>
    </div>
  );
}

function formatPrixNuit(prix: number | string): string {
  if (typeof prix === 'number' && !Number.isNaN(prix)) {
    return `${prix.toLocaleString('fr-FR')} € / nuit`;
  }
  const t = String(prix).trim();
  if (!t) return '';
  if (/€|eur/i.test(t)) return /\/\s*nuit/i.test(t) ? t : `${t} / nuit`;
  const n = Number(t.replace(/\s/g, '').replace(',', '.'));
  if (!Number.isNaN(n)) return `${n.toLocaleString('fr-FR')} € / nuit`;
  return t;
}

function HebergementPhotoCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const touchStart = useRef<number | null>(null);

  if (images.length === 0) return null;

  const goPhoto = (dir: 'prev' | 'next') => {
    setPhotoIndex(i =>
      dir === 'next' ? (i + 1) % images.length : (i - 1 + images.length) % images.length,
    );
  };

  return (
    <div
      className="sem-hebergement-photos"
      onTouchStart={e => { touchStart.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        if (touchStart.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(dx) > 44) goPhoto(dx < 0 ? 'next' : 'prev');
        touchStart.current = null;
      }}
    >
      <div className="sem-hebergement-photo-frame">
        <img src={images[photoIndex]} alt={alt} className="sem-hebergement-photo-img" draggable={false} />
        {images.length > 1 && (
          <>
            <div className="sem-hebergement-photo-nav" aria-hidden>
              <button type="button" className="sem-hebergement-photo-arrow sem-hebergement-photo-arrow--prev" onClick={() => goPhoto('prev')} aria-label="Photo précédente">
                <svg viewBox="0 0 12 12" fill="none" aria-hidden><path d="M7.5 2L3.5 6L7.5 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button type="button" className="sem-hebergement-photo-arrow sem-hebergement-photo-arrow--next" onClick={() => goPhoto('next')} aria-label="Photo suivante">
                <svg viewBox="0 0 12 12" fill="none" aria-hidden><path d="M4.5 2L8.5 6L4.5 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
            <div className="sem-hebergement-photo-dots" aria-hidden>
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`sem-hebergement-photo-dot${i === photoIndex ? ' is-active' : ''}`}
                  onClick={() => setPhotoIndex(i)}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function HebergementCard({ hebergement }: { hebergement: SeminaireHebergement }) {
  const prixLabel = hebergement.prixNuit != null && String(hebergement.prixNuit).trim() !== ''
    ? formatPrixNuit(hebergement.prixNuit)
    : null;

  return (
    <article className="sem-hebergement-card">
      {hebergement.images.length > 0 && (
        <HebergementPhotoCarousel images={hebergement.images} alt={hebergement.nom} />
      )}
      <div className="sem-hebergement-card-body">
        <div className="sem-hebergement-card-head">
          <h4 className="sem-hebergement-nom">{hebergement.nom}</h4>
          {hebergement.type && <span className="sem-hebergement-type">{hebergement.type}</span>}
        </div>
        {hebergement.description && (
          <p className="sem-hebergement-desc">{hebergement.description}</p>
        )}
        <div className="sem-hebergement-meta">
          {hebergement.capacite && (
            <span className="sem-hebergement-meta-item">👥 {hebergement.capacite}</span>
          )}
          {prixLabel && (
            <span className="sem-hebergement-meta-item sem-hebergement-prix">{prixLabel}</span>
          )}
        </div>
      </div>
    </article>
  );
}

function HebergementsList({ hebergements }: { hebergements: SeminaireHebergement[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const slides = el.querySelectorAll<HTMLElement>('.sem-hebergements-slide');
    if (slides.length === 0) return;

    const gap = parseFloat(getComputedStyle(el).gap) || 10;
    const slideWidth = slides[0].offsetWidth + gap;
    const idx = Math.round(el.scrollLeft / slideWidth);
    setActiveIndex(Math.min(Math.max(idx, 0), hebergements.length - 1));
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, [hebergements.length]);

  useEffect(() => {
    setActiveIndex(0);
    setCanScrollPrev(false);
    setCanScrollNext(false);
    trackRef.current?.scrollTo({ left: 0, behavior: 'instant' as ScrollBehavior });
    const id = requestAnimationFrame(updateScrollState);
    return () => cancelAnimationFrame(id);
  }, [hebergements, updateScrollState]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || hebergements.length <= 1) return;

    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [hebergements.length, updateScrollState]);

  const scrollBySlide = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const slides = el.querySelectorAll<HTMLElement>('.sem-hebergements-slide');
    if (slides.length === 0) return;
    const gap = parseFloat(getComputedStyle(el).gap) || 10;
    const slideWidth = slides[0].offsetWidth + gap;
    el.scrollBy({ left: dir * slideWidth, behavior: 'smooth' });
  };

  const scrollToSlide = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.querySelectorAll<HTMLElement>('.sem-hebergements-slide')[index];
    slide?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  };

  const handleTrackMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest('button, a, input, textarea, select')) return;
    const el = trackRef.current;
    if (!el) return;
    e.preventDefault();
    el.style.cursor = 'grabbing';
    const startX = e.pageX;
    const scrollLeftStart = el.scrollLeft;
    const onMove = (ev: MouseEvent) => {
      ev.preventDefault();
      el.scrollLeft = scrollLeftStart - (ev.pageX - startX);
    };
    const onUp = () => {
      el.style.cursor = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onUp);
  };

  if (hebergements.length === 0) {
    return (
      <div className="sem-mobile-hebergement-soon">
        <span className="sem-mobile-hebergement-soon-icon">🏡</span>
        <span>Les hébergements selon votre effectif, bientôt disponibles 🏡</span>
      </div>
    );
  }

  if (hebergements.length === 1) {
    return <HebergementCard hebergement={hebergements[0]} />;
  }

  return (
    <div className="sem-hebergements-carousel">
      <div className="sem-hebergements-header">
        <p className="sem-hebergements-index-label" aria-live="polite">
          Logement {activeIndex + 1}
          <span className="sem-hebergements-index-total"> / {hebergements.length}</span>
        </p>
        <div className="sem-hebergements-nav-btns">
          <button
            type="button"
            className="sem-hebergements-nav-btn"
            onClick={() => scrollBySlide(-1)}
            disabled={!canScrollPrev}
            aria-label="Logement précédent"
          >
            <svg viewBox="0 0 12 12" fill="none" aria-hidden><path d="M7.5 2L3.5 6L7.5 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button
            type="button"
            className="sem-hebergements-nav-btn"
            onClick={() => scrollBySlide(1)}
            disabled={!canScrollNext}
            aria-label="Logement suivant"
          >
            <svg viewBox="0 0 12 12" fill="none" aria-hidden><path d="M4.5 2L8.5 6L4.5 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
      <div
        ref={trackRef}
        className="sem-hebergements-track"
        role="list"
        aria-label="Hébergements disponibles"
        onMouseDown={handleTrackMouseDown}
      >
        {hebergements.map((h, i) => (
          <div key={h.id} className="sem-hebergements-slide" role="listitem" aria-label={`Logement ${i + 1}`}>
            <HebergementCard hebergement={h} />
          </div>
        ))}
      </div>
      <div className="sem-hebergements-dots" aria-hidden>
        {hebergements.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`sem-hebergements-dot${i === activeIndex ? ' is-active' : ''}`}
            onClick={() => scrollToSlide(i)}
            aria-label={`Aller au logement ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function MobileProgrammeList({ programme }: { programme: ProgrammeItem[] }) {
  if (programme.length === 0) return null;
  return (
    <div className="sem-mobile-programme-list">
      {programme.map((p, i) => (
        <div key={i} className="sem-mobile-programme-step">
          <span className="sem-mobile-programme-time">{p.heure}</span>
          <span className="sem-mobile-programme-action">{p.action}</span>
        </div>
      ))}
    </div>
  );
}

function MobileFormatCapsule({
  title,
  fmt,
  variant,
  tint,
  tintBorder,
  showTitle = true,
  hebergements = [],
  layout = 'mobile',
  couleur = '#e67e22',
  programmeKey = '',
}: {
  title: string;
  fmt: Format;
  variant: 'jour' | 'residentiel';
  tint: string;
  tintBorder: string;
  showTitle?: boolean;
  hebergements?: SeminaireHebergement[];
  layout?: 'mobile' | 'desktop';
  couleur?: string;
  programmeKey?: string;
}) {
  return (
    <section
      className={`sem-mobile-capsule sem-mobile-capsule--${variant}${layout === 'desktop' ? ' sem-detail-format-capsule' : ''}`}
      style={{ background: tint, borderColor: tintBorder }}
    >
      {showTitle && <h2 className="sem-mobile-capsule-title">{title}</h2>}

      <div className="sem-mobile-capsule-section">
        <h3>Inclus dans l&apos;offre</h3>
        <FormatInclusList inclus={fmt.inclus} layout={layout === 'desktop' ? 'grid' : 'stack'} />
      </div>

      {fmt.programme.length > 0 && (
        <div className="sem-mobile-capsule-section sem-mobile-capsule-section--collapsible">
          <MobileCollapsibleSection
            title="Exemple de programme"
            contentKey={programmeKey || `${variant}-${fmt.programme.length}`}
          >
            <MobileProgrammeList programme={fmt.programme} />
          </MobileCollapsibleSection>
        </div>
      )}

      {variant === 'residentiel' && (
        <div className="sem-mobile-capsule-section">
          <h3>Hébergements</h3>
          <HebergementsList hebergements={hebergements} />
        </div>
      )}
    </section>
  );
}

type MobileFormatId = SeminaireFormatId;

function MobileFormatMetaPills({ fmt, formatKey }: { fmt: Format; formatKey: string }) {
  const participants = fmt.participants?.trim();
  const duree = fmt.duree?.trim();
  if (!participants && !duree) return null;
  return (
    <div className="sem-mobile-format-pills" key={formatKey}>
      {participants && <span className="sem-mobile-pill">👥 {participants}</span>}
      {duree && <span className="sem-mobile-pill">⏱ {duree}</span>}
    </div>
  );
}

function MobileFormatChoiceHeader() {
  return (
    <div className="sem-mobile-format-choice-head">
      <h2 className="sem-mobile-section-title">Choisissez votre format</h2>
      <p className="sem-mobile-format-choice-lead">
        Une offre qui s&apos;adapte à vos besoins et à votre effectif.
      </p>
    </div>
  );
}

function MobileFormatSwitcher({
  fmtJour,
  fmt2j,
  activeId,
  onActiveChange,
  jourTint,
  jourBorder,
  resTint,
  resBorder,
  hebergements = [],
  layout = 'mobile',
  couleur = '#e67e22',
  programmeKey = '',
}: {
  fmtJour?: Format;
  fmt2j?: Format;
  activeId: MobileFormatId;
  onActiveChange: (id: MobileFormatId) => void;
  jourTint: string;
  jourBorder: string;
  resTint: string;
  resBorder: string;
  hebergements?: SeminaireHebergement[];
  layout?: 'mobile' | 'desktop';
  couleur?: string;
  programmeKey?: string;
}) {
  const switcherClass = layout === 'desktop'
    ? 'sem-format-ui sem-detail-format-block sem-mobile-format-switcher'
    : 'sem-format-ui sem-mobile-format-switcher';
  const tabs: { id: MobileFormatId; label: string }[] = [];
  if (fmtJour) tabs.push({ id: 'journee', label: 'Séminaire à la journée' });
  if (fmt2j) tabs.push({ id: 'residentiel', label: 'Séminaire résidentiel' });

  if (tabs.length === 0) return null;

  if (tabs.length === 1) {
    const only = tabs[0].id;
    const fmt = only === 'journee' ? fmtJour! : fmt2j!;
    return (
      <div className={switcherClass}>
        <MobileFormatChoiceHeader />
        <MobileFormatMetaPills fmt={fmt} formatKey={only} />
        <MobileFormatCapsule
          title={only === 'journee' ? 'Séminaire à la journée' : 'Séminaire résidentiel'}
          fmt={fmt}
          variant={only === 'journee' ? 'jour' : 'residentiel'}
          tint={only === 'journee' ? jourTint : resTint}
          tintBorder={only === 'journee' ? jourBorder : resBorder}
          showTitle
          layout={layout}
          couleur={couleur}
          programmeKey={programmeKey}
          hebergements={hebergements}
        />
      </div>
    );
  }

  const activeFmt = activeId === 'journee' ? fmtJour : fmt2j;
  if (!activeFmt) return null;

  return (
    <div className={switcherClass}>
      <MobileFormatChoiceHeader />
      <div className="sem-mobile-format-tabs" role="tablist" aria-label="Format du séminaire">
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeId === tab.id}
            className={`sem-mobile-format-tab${activeId === tab.id ? ' is-active' : ''}`}
            onClick={() => onActiveChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <MobileFormatMetaPills fmt={activeFmt} formatKey={activeId} />
      <div role="tabpanel" className="sem-mobile-format-panel">
        <MobileFormatCapsule
          key={activeId}
          title={activeId === 'journee' ? 'Séminaire à la journée' : 'Séminaire résidentiel'}
          fmt={activeFmt}
          variant={activeId === 'journee' ? 'jour' : 'residentiel'}
          tint={activeId === 'journee' ? jourTint : resTint}
          tintBorder={activeId === 'journee' ? jourBorder : resBorder}
          showTitle={false}
          layout={layout}
          couleur={couleur}
          programmeKey={programmeKey}
          hebergements={hebergements}
        />
      </div>
    </div>
  );
}

function MobileProducerSection({ producer, producteurName }: { producer: ProducerFull | null; producteurName: string }) {
  const name = producer?.name ?? producteurName;
  const bio = producer?.description?.trim();
  const experiences = producer?.experiences ?? [];
  return (
    <section className="sem-detail-producer-ui sem-mobile-producer">
      <h2 className="sem-mobile-section-title">À propos du producteur</h2>
      <div className="sem-mobile-producer-head">
        {producer?.avatar && (
          <img src={producer.avatar} alt={name} className="sem-mobile-producer-avatar" />
        )}
        <div>
          <h3 className="sem-mobile-producer-name">{name}</h3>
        </div>
      </div>
      {bio && <p className="sem-mobile-producer-bio">{bio}</p>}
      {experiences.length > 0 && (
        <MobileCollapsibleSection
          title="Expériences possibles"
          contentKey={producer?.id ?? `${name}-${experiences.length}`}
        >
          <ul className="sem-mobile-producer-experiences-list">
            {experiences.map(exp => (
              <li key={exp.id} className="sem-producer-exp-card">
                <span className="sem-mobile-exp-icon">{exp.icon}</span>
                <div className="sem-producer-exp-card-body">
                  <strong>{exp.title}</strong>
                  {exp.duration && <span className="sem-mobile-exp-meta">{exp.duration}</span>}
                  {exp.desc && <p>{exp.desc}</p>}
                </div>
              </li>
            ))}
          </ul>
        </MobileCollapsibleSection>
      )}
    </section>
  );
}

function MobileDevisCta({ onDevis }: { onDevis: () => void }) {
  return (
    <section className="sem-mobile-devis-block">
      <button type="button" className="sem-mobile-devis-btn" onClick={onDevis}>
        Demander un devis
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
      </button>
      <p className="sem-mobile-devis-hint">Besoin d&apos;un programme sur mesure ? On s&apos;adapte à vos objectifs.</p>
    </section>
  );
}

function MobilePartenaireEncart({
  nom, logo, description, siteWeb,
}: {
  nom: string; logo?: string; description?: string; siteWeb?: string;
}) {
  return (
    <section className="sem-mobile-partenaire-card" aria-label={`En partenariat avec ${nom}`}>
      <div className="sem-mobile-partenaire-card-head">
        <div className="sem-mobile-partenaire-card-brand">
          {logo && <img src={logo} alt={nom} />}
          <span>En partenariat avec {nom}</span>
        </div>
        {siteWeb && (
          <a href={siteWeb} target="_blank" rel="noopener noreferrer" className="sem-mobile-partenaire-link">
            En savoir plus →
          </a>
        )}
      </div>
      {description && <p className="sem-mobile-partenaire-desc">{description}</p>}
    </section>
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
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11, 44, 52,0.65) 0%, transparent 55%)', pointerEvents: 'none' }} />
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

/** Plage affichée sur les cartes liste (participants du premier format disponible). */
function participantsRangeForOfferCard(s: Seminaire): string {
  const raw = (s.formats.journee?.participants ?? s.formats.residentiel?.participants ?? '').trim();
  const fallback = (Object.values(s.formats)[0]?.participants ?? '').trim();
  const t = raw || fallback;
  if (!t) return '';

  const range = t.match(/(\d+)\s*(?:à|a|-|–|—)\s*(\d+)/i);
  if (range) return `De ${range[1]} à ${range[2]} pers.`;

  const des = t.match(/dès\s*(\d+)/i);
  const jusqu = t.match(/jusqu['\u2019]?\s*à\s*(\d+)/i);
  if (des && jusqu) return `De ${des[1]} à ${jusqu[1]} pers.`;

  const nums = t.match(/\d+/g);
  if (nums && nums.length >= 2) {
    const a = parseInt(nums[0], 10);
    const b = parseInt(nums[1], 10);
    const lo = Math.min(a, b);
    const hi = Math.max(a, b);
    if (lo !== hi) return `De ${lo} à ${hi} pers.`;
  }

  if (des) return `Dès ${des[1]} pers.`;
  if (jusqu) return `Jusqu'à ${jusqu[1]} pers.`;
  if (nums?.length === 1) return `Jusqu'à ${nums[0]} pers.`;

  return t;
}

// ─── SeminaireCard ───────────────────────────────────────────────────────────

function primaryFormatForCard(s: Seminaire) {
  return s.formats.journee ?? s.formats.residentiel ?? Object.values(s.formats)[0];
}

function primaryFormatIdForSeminaire(s: Seminaire): SeminaireFormatId {
  if (s.formats.journee) return 'journee';
  if (s.formats.residentiel) return 'residentiel';
  const first = Object.keys(s.formats)[0];
  return (first as SeminaireFormatId) || 'journee';
}

function SeminaireCard({ s, isActive, onSelect, onDevis }: {
  s: Seminaire; isActive: boolean;
  onSelect: () => void; onDevis: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const fmt = primaryFormatForCard(s);
  const isComing = s.comingSoon;
  if (!fmt && !isComing) return null;
  const active = !isComing && (isActive || hovered);
  const hasPartenaire = Boolean(s.partenaire_nom && s.partenaire_logo);
  return (
    <div
      className="sem-pack-card"
      onClick={isComing ? undefined : onSelect}
      onMouseEnter={() => { if (!isComing) setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 18, overflow: 'hidden',
        border: `1px solid ${active ? 'rgba(11, 44, 52,0.22)' : 'rgba(11, 44, 52,0.07)'}`,
        background: '#fff', cursor: isComing ? 'default' : 'pointer',
        boxShadow: active ? '0 10px 32px rgba(11, 44, 52,0.13)' : '0 1px 4px rgba(11, 44, 52,0.05)',
        transition: 'all 0.22s ease',
        transform: active ? 'translateY(-4px)' : 'none',
        opacity: isComing ? 0.72 : 1,
      }}>
      <div className="sem-pack-card-visual">
        <img
          src={s.images[0] ?? ''} alt={fmt?.titre ?? s.label}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)', filter: isComing ? 'grayscale(35%)' : 'none' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11, 44, 52,0.55) 0%, transparent 50%)', pointerEvents: 'none' }} />
        {hasPartenaire && (
          <img
            src={s.partenaire_logo}
            alt={s.partenaire_nom}
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
              zIndex: 6,
              height: 24,
              width: 'auto',
              maxWidth: 56,
              objectFit: 'contain',
              display: 'block',
              borderRadius: 8,
              pointerEvents: 'none',
            }}
          />
        )}
        {isComing && (
          <div style={{ position: 'absolute', top: 10, left: hasPartenaire ? 72 : 10, background: 'rgba(255,255,255,0.92)', borderRadius: 9999, padding: '4px 12px', fontSize: 8, fontWeight: 700, color: '#0b2c34', letterSpacing: '0.14em', textTransform: 'uppercase', backdropFilter: 'blur(6px)', border: '1px solid rgba(11, 44, 52,0.10)' }}>🔜 Bientôt</div>
        )}
        {!isComing && s.bestseller && (
          <div style={{ position: 'absolute', top: 10, left: hasPartenaire ? 'auto' : 10, right: hasPartenaire ? 10 : 'auto', background: 'rgba(60,60,60,0.5)', borderRadius: 9999, padding: '3px 10px', fontSize: 8, fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', backdropFilter: 'blur(6px)' }}>★ Populaire</div>
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
        <div className="sem-pack-card-title" style={{ fontWeight: 700, fontSize: 13, color: '#0b2c34', lineHeight: 1.3, marginBottom: 2 }}>{fmt?.titre ?? s.label}</div>
        {isComing ? (
          <div style={{ fontSize: 11, color: '#b0a89e', fontStyle: 'italic', marginTop: 'auto', paddingTop: 8 }}>Disponible prochainement</div>
        ) : (
          <>
            <div className="sem-pack-card-sub" style={{ fontSize: 11, color: '#9a9080', fontStyle: 'italic', marginBottom: 8 }}>{fmt!.sous_titre}</div>
            <div className="sem-pack-card-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, minWidth: 0 }}>
              <div style={{ minWidth: 0, overflow: 'hidden' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#5c5348', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>
                  {participantsRangeForOfferCard(s)}
                </span>
              </div>
              <button onClick={e => { e.stopPropagation(); onSelect(); }}
                className="sem-pack-card-btn"
                style={{ flexShrink: 0, background: '#0b2c34', color: '#fff', fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', padding: '6px 12px', borderRadius: 9999, border: 'none', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
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
      maxZoom: 12,
      cooperativeGestures: false,
      scrollZoom: true,
      boxZoom: true,
      doubleClickZoom: true,
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

  const cardFmt = cardSem ? primaryFormatForCard(cardSem) : null;

  if (!mapboxToken) {
    return (
      <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', width: '100%', height: '100%', background: 'linear-gradient(145deg, #f5f2ec 0%, #ebe6dc 100%)', border: '1px solid rgba(11, 44, 52,0.08)' }}>
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
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0b2c34', lineHeight: 1.3, marginBottom: 12 }}>{cardFmt.titre}</div>
            <button onClick={() => { setCardSem(null); onSelect(cardSem.id); }}
              style={{ width: '100%', background: '#0b2c34', color: '#fff', border: 'none', borderRadius: 9999, padding: '9px', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>
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
            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0b2c34" strokeWidth="2.2" strokeLinecap="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0b2c34" strokeWidth="2.2" strokeLinecap="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
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
        style={{ position: 'absolute', top: 20, right: 20, zIndex: 10, width: 44, height: 44, borderRadius: '50%', background: '#fff', border: '1px solid rgba(11, 44, 52,0.12)', color: '#0b2c34', fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 300, boxShadow: '0 2px 10px rgba(11, 44, 52,0.08)' }}>
        ×
      </button>
      <div style={{ position: 'absolute', top: 26, left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: '#fff', border: '1px solid rgba(11, 44, 52,0.1)', borderRadius: 9999, padding: '4px 14px', fontSize: 11, color: '#0b2c34', fontWeight: 700, boxShadow: '0 2px 8px rgba(11, 44, 52,0.07)' }}>
        {idx + 1} / {images.length}
      </div>
      <div style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: '88vw', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 64px' }}>
        <img src={images[idx]} alt="" style={{ maxWidth: '100%', maxHeight: '75vh', borderRadius: 18, objectFit: 'contain', boxShadow: '0 12px 60px rgba(0,0,0,0.25)' }} />
        {images.length > 1 && (
          <>
            <button onClick={prev} style={{ position: 'absolute', left: 0, width: 48, height: 48, borderRadius: '50%', background: '#fff', border: '1px solid rgba(11, 44, 52,0.12)', color: '#0b2c34', fontSize: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(11, 44, 52,0.1)' }}>‹</button>
            <button onClick={next} style={{ position: 'absolute', right: 0, width: 48, height: 48, borderRadius: '50%', background: '#fff', border: '1px solid rgba(11, 44, 52,0.12)', color: '#0b2c34', fontSize: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(11, 44, 52,0.1)' }}>›</button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div style={{ position: 'relative', zIndex: 5, display: 'flex', gap: 8, marginTop: 18, maxWidth: '88vw', overflowX: 'auto', padding: '4px 0' }}>
          {images.map((img, i) => (
            <div key={i} onClick={() => setIdx(i)}
              style={{ flexShrink: 0, width: 72, height: 72, borderRadius: 14, overflow: 'hidden', cursor: 'pointer', border: `2.5px solid ${i === idx ? '#0b2c34' : 'rgba(11, 44, 52,0.12)'}`, opacity: i === idx ? 1 : 0.55, transition: 'all 0.15s' }}>
              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Encart partenaire compact (au-dessus des photos) ───────────────────────

function PartenaireEncart({ nom, logo }: { nom: string; logo?: string }) {
  return (
    <div
      aria-label={`En partenariat avec ${nom}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 8,
        flexShrink: 0,
        textAlign: 'right',
      }}
    >
      {logo && (
        <img
          src={logo}
          alt={nom}
          style={{ maxHeight: 88, maxWidth: 260, width: 'auto', height: 'auto', objectFit: 'contain', display: 'block', borderRadius: 20 }}
        />
      )}
      <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b0a89e', lineHeight: 1.2 }}>
        En partenariat avec
      </span>
    </div>
  );
}

// ─── Carte partenaire (sous le bloc devis) ────────────────────────────────────

const SEM_DETAIL_CARD: React.CSSProperties = {
  background: '#fff',
  borderRadius: 20,
  border: '1px solid rgba(11, 44, 52, 0.1)',
  padding: '24px',
  boxShadow: '0 4px 28px rgba(11, 44, 52, 0.09)',
};

function PartenaireCard({ nom, logo, description, siteWeb }: { nom: string; logo?: string; description?: string; siteWeb?: string }) {
  return (
    <div style={{ ...SEM_DETAIL_CARD, marginTop: 16 }} aria-label={`En partenariat avec ${nom}`}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: description ? 12 : 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
          {logo && (
            <img
              src={logo}
              alt={nom}
              style={{ height: 28, width: 'auto', maxWidth: 72, objectFit: 'contain', flexShrink: 0, display: 'block', borderRadius: 8 }}
            />
          )}
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0b2c34', lineHeight: 1.35, minWidth: 0 }}>
            En partenariat avec {nom}
          </div>
        </div>
        {siteWeb && (
          <a
            href={siteWeb}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flexShrink: 0,
              fontSize: 10,
              fontWeight: 600,
              color: '#e67e22',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline'; }}
            onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none'; }}
          >
            En savoir plus →
          </a>
        )}
      </div>
      {description && (
        <p style={{ margin: 0, fontSize: 11, color: '#9a9080', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
          {description}
        </p>
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

  const tarifAffiche = fmt.prix;

  const mainImage   = s.images[0] ?? '';
  const smallImages = s.images.slice(1, 3);
  const hasSmall    = smallImages.length > 0;

  const [producer, setProducer] = useState<ProducerFull | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.from('producers_full').select('*').eq('seminaire_id', s.id).maybeSingle();
      if (!cancelled) setProducer(data ? mapSupabaseRowToFull(data as SupabaseProducerRow) : null);
    })();
    return () => { cancelled = true; };
  }, [s.id]);

  const fmtJour = s.formats.journee;
  const fmt2j = s.formats.residentiel;
  const pillFmt = fmtJour ?? fmt2j ?? fmt;
  const defaultMobileFormat: MobileFormatId = fmtJour ? 'journee' : 'residentiel';
  const [mobileFormatId, setMobileFormatId] = useState<MobileFormatId>(defaultMobileFormat);
  const mobileActiveFmt =
    (mobileFormatId === 'journee' ? fmtJour : fmt2j) ?? pillFmt;
  const mobileTitle = mobileActiveFmt?.titre ?? s.label;
  const mobileSousTitre = mobileActiveFmt?.sous_titre?.trim() ?? '';

  useEffect(() => {
    let next: MobileFormatId = fmtJour ? 'journee' : 'residentiel';
    if (activeFormat === 'journee' && fmtJour) next = 'journee';
    else if (activeFormat === 'residentiel' && fmt2j) next = 'residentiel';
    setMobileFormatId(next);
  }, [s.id, activeFormat, fmtJour, fmt2j]);

  const jourTint = FORMAT_DETAIL_TINTS.journee.tint;
  const resTint = FORMAT_DETAIL_TINTS.residentiel.tint;
  const jourBorder = FORMAT_DETAIL_TINTS.journee.border;
  const resBorder = FORMAT_DETAIL_TINTS.residentiel.border;

  const handleMobileDevis = () => {
    if (mobileFormatId in s.formats) setActiveFormat(mobileFormatId);
    else {
      const preferred = SEMINAIRE_FORMAT_IDS.find(id => id in s.formats) ?? Object.keys(s.formats)[0];
      if (preferred) setActiveFormat(preferred);
    }
    onDevis();
  };

  const handleMobileFormatChange = (id: MobileFormatId) => {
    setMobileFormatId(id);
    if (id in s.formats) setActiveFormat(id);
  };

  const goMobilePhoto = (dir: 'prev' | 'next') => {
    if (s.images.length < 2) return;
    setMobilePhotoIdx(i =>
      dir === 'next' ? Math.min(i + 1, s.images.length - 1) : Math.max(i - 1, 0),
    );
  };

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
      goMobilePhoto(dx < 0 ? 'next' : 'prev');
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
        <div className="sem-detail-title" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(26px,3.2vw,38px)', color: '#0b2c34', lineHeight: 1.12, margin: '0 0 6px' }}>
              {fmt.titre}
            </h2>
            <div style={{ fontSize: 13, color: '#9a9080', fontWeight: 500 }}>{s.producteur}</div>
          </div>
          {s.partenaire_nom && (
            <PartenaireEncart nom={s.partenaire_nom} logo={s.partenaire_logo} />
          )}
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
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 45%, transparent 60%, rgba(0,0,0,0.35) 100%)', pointerEvents: 'none' }} />

          {onBack && (
            <button type="button" className="sem-mobile-hero-btn sem-mobile-hero-btn--back" onClick={onBack}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M15 18l-6-6 6-6"/></svg>
              <span>Toutes nos offres</span>
            </button>
          )}

          {s.images.length > 1 && (
            <>
              <button
                type="button"
                className="sem-mobile-photo-arrow sem-mobile-photo-arrow--prev"
                onClick={() => goMobilePhoto('prev')}
                disabled={mobilePhotoIdx === 0}
                aria-label="Photo précédente"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button
                type="button"
                className="sem-mobile-photo-arrow sem-mobile-photo-arrow--next"
                onClick={() => goMobilePhoto('next')}
                disabled={mobilePhotoIdx === s.images.length - 1}
                aria-label="Photo suivante"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </>
          )}

          {(s.bestseller || s.images.length > 1) && (
            <div className="sem-mobile-hero-meta">
              {s.bestseller && <div className="sem-mobile-bestseller">★ Populaire</div>}
              {s.images.length > 1 && (
                <div className="sem-mobile-photo-counter">{mobilePhotoIdx + 1} / {s.images.length}</div>
              )}
            </div>
          )}
          {s.partenaire_nom && (
            <div className="sem-mobile-hero-partenaire" aria-label={`En partenariat avec ${s.partenaire_nom}`}>
              {s.partenaire_logo && (
                <img src={s.partenaire_logo} alt={s.partenaire_nom} />
              )}
              <span>En partenariat avec {s.partenaire_nom}</span>
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
              style={{ position: 'absolute', bottom: 14, right: 14, background: '#fff', border: '1.5px solid rgba(0,0,0,0.15)', borderRadius: 9999, padding: '8px 16px', fontSize: 12, fontWeight: 700, color: '#0b2c34', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', fontFamily: 'inherit' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              Afficher toutes les photos
            </button>
          )}
        </div>

        {/* Contenu — carte blanche chevauchante sur mobile */}
        <div className="sem-mobile-sheet">
          <header className="sem-mobile-sheet-header">
            <h1>{mobileTitle}</h1>
            <div className="sem-mobile-pills">
              <span className="sem-mobile-pill">📍 {s.region}</span>
            </div>
          </header>

          <div className="sem-detail-mobile-only">
            <MobileProducerSection producer={producer} producteurName={s.producteur} />
            <MobileFormatSwitcher
              fmtJour={fmtJour}
              fmt2j={fmt2j}
              activeId={mobileFormatId}
              onActiveChange={handleMobileFormatChange}
              jourTint={jourTint}
              jourBorder={jourBorder}
              resTint={resTint}
              resBorder={resBorder}
              hebergements={s.hebergements}
              couleur={s.couleur}
              programmeKey={`${s.id}-${mobileFormatId}`}
            />
            {mobileSousTitre && (
              <p className="sem-mobile-format-quote" key={mobileFormatId}>
                &ldquo;{mobileSousTitre}&rdquo;
              </p>
            )}
            <MobileDevisCta onDevis={handleMobileDevis} />
            {s.partenaire_nom && (
              <div className="sem-mobile-partenaire-wrap">
                <MobilePartenaireEncart
                  nom={s.partenaire_nom}
                  logo={s.partenaire_logo}
                  description={s.partenaire_description}
                  siteWeb={s.partenaire_site_web}
                />
              </div>
            )}
            <MiniMap s={s} />
          </div>

        <div className="sem-detail-cols sem-detail-desktop-only">
          <div>
            <div className="sem-detail-intro-desktop">
              <div style={{ fontSize: 14, color: '#9a9080', fontStyle: 'italic', marginBottom: 4 }}>{fmt.sous_titre}</div>
              <div style={{ fontSize: 12, color: '#b0a89e', fontWeight: 600, marginBottom: 28 }}>{s.region}</div>
            </div>
            <MobileProducerSection producer={producer} producteurName={s.producteur} />
            <MobileFormatSwitcher
              layout="desktop"
              fmtJour={fmtJour}
              fmt2j={fmt2j}
              activeId={
                (activeFormat === 'journee' && fmtJour) ? 'journee'
                  : (activeFormat === 'residentiel' && fmt2j) ? 'residentiel'
                  : fmtJour ? 'journee' : 'residentiel'
              }
              onActiveChange={id => setActiveFormat(id)}
              jourTint={FORMAT_DETAIL_TINTS.journee.tint}
              jourBorder={FORMAT_DETAIL_TINTS.journee.border}
              resTint={FORMAT_DETAIL_TINTS.residentiel.tint}
              resBorder={FORMAT_DETAIL_TINTS.residentiel.border}
              hebergements={s.hebergements}
              couleur={s.couleur}
              programmeKey={`${s.id}-${activeFormat}`}
            />

            <MiniMap s={s} />
          </div>

          <div className="sem-price-col">
            <div style={SEM_DETAIL_CARD}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#b0a89e', marginBottom: 4 }}>Tarif sur demande</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#0b2c34', lineHeight: 1.2 }}>{tarifAffiche}</div>
                </div>
                <button onClick={onDevis}
                  style={{ flexShrink: 0, background: '#0b2c34', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', padding: '14px 20px', borderRadius: 9999, border: 'none', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, width: '100%', justifyContent: 'center' }}>
                  Demander un devis
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </button>
              </div>
              <div style={{ borderTop: '1px solid rgba(11, 44, 52,0.08)', marginBottom: 16 }} />
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
            {s.partenaire_nom && (
              <div className="sem-partenaire-aside">
                <PartenaireCard
                  nom={s.partenaire_nom}
                  logo={s.partenaire_logo}
                  description={s.partenaire_description}
                  siteWeb={s.partenaire_site_web}
                />
              </div>
            )}
          </div>
        </div>
        </div>

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
    const desktop = window.matchMedia('(min-width: 769px)').matches;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [s.lng, s.lat],
      zoom: 7,
      minZoom: 5,
      maxZoom: 14,
      interactive: desktop,
      scrollZoom: desktop,
      cooperativeGestures: false,
      attributionControl: false,
    });
    map.once('load', () => {
      const emoji = getProductEmoji(s);
      const el = document.createElement('div');
      el.innerHTML = `<div style="width:46px;height:46px;background:${s.couleur};border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:0 4px 18px ${s.couleur}70;border:3px solid #fff;">${emoji}</div>`;
      new mapboxgl.Marker({ element: el, anchor: 'center' }).setLngLat([s.lng!, s.lat!]).addTo(map);
      if (desktop) {
        map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');
      }
    });
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [s.id, mapboxToken, s.lat, s.lng, s.couleur]);

  if (s.lat == null || s.lng == null) return null;

  return (
    <div className="sem-mobile-map-block" style={{ marginTop: 40 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b0a89e', marginBottom: 14 }}>Localisation</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#0b2c34', marginBottom: 4 }}>{s.region}</div>
      <div style={{ fontSize: 13, color: '#9a9080', marginBottom: 16 }}>{s.producteur}</div>
      {mapboxToken ? (
        <div
          ref={containerRef}
          className="sem-mobile-map-canvas"
          style={{
            width: '100%',
            height: 260,
            borderRadius: 16,
            overflow: 'hidden',
            border: '1px solid rgba(11, 44, 52,0.08)',
            boxShadow: '0 2px 12px rgba(11, 44, 52,0.07)',
            position: 'relative',
            zIndex: 0,
            isolation: 'isolate',
          }}
        />
      ) : (
        <div style={{ width: '100%', height: 160, borderRadius: 16, border: '1px dashed rgba(11, 44, 52,0.12)', background: '#faf8f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#9a9080', padding: 16, textAlign: 'center' }}>
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
  const [selectedFormatId, setSelectedFormatId] = useState<SeminaireFormatId>('journee');
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
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 600);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 600);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isOpen && initialSeminaire) {
      setSelectedSeminaireId(initialSeminaire.id);
      const fmtId = initialFormatId as SeminaireFormatId;
      setSelectedFormatId(
        fmtId in (initialSeminaire.formats || {}) ? fmtId : (SEMINAIRE_FORMAT_IDS.find(id => id in initialSeminaire.formats) ?? 'journee'),
      );
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
      setSelectedSeminaireId(null); setSelectedFormatId('journee'); setAccTypes([]); setTransport('');
      setStart(''); setEnd(''); setHeberg(false); setWithT(false); setVilleDepart(''); setDistanceHours(3); setExtraActivities([]);
      onClose();
    }, 280);
  };

  const toggle = (list: string[], setList: (v: string[]) => void, item: string) =>
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);

  const selectedSeminaire = seminaires.find(s => s.id === selectedSeminaireId) ?? seminaires[0] ?? null;
  const selectedFormat    = selectedSeminaire && selectedFormatId in selectedSeminaire.formats ? selectedSeminaire.formats[selectedFormatId] : null;
  const formatLabel       = SEMINAIRE_FORMAT_LABELS[selectedFormatId] ?? selectedFormatId;
  const availableFormatIds = selectedSeminaire
    ? SEMINAIRE_FORMAT_IDS.filter(id => id in (selectedSeminaire.formats || {}))
    : [];

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
    startDate && endDate ? `${new Date(`${startDate}T00:00:00`).toLocaleDateString('fr-FR')} → ${new Date(`${endDate}T00:00:00`).toLocaleDateString('fr-FR')}` : '';

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
        cache: 'no-store',
        body: JSON.stringify({
          seminaire_id:     selectedSeminaireId,
          format_id:        selectedFormatId,
          selection_label:  selectionLine,
          offre_image_url:
            selectedSeminaire?.images?.[0] ?? selectedSeminaire?.image ?? null,
          offre_footer_image_url: selectedSeminaire?.images?.[2] ?? null,
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
          activites:        activitesLine,
          message:          form.message?.trim() ? form.message.trim() : null,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
        message?: string;
      };

      if (!res.ok || !data.success) {
        throw new Error(
          data.error || data.message || 'Erreur lors de l\'envoi. Veuillez réessayer.',
        );
      }

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
      <style>{`
        @media (max-width: 600px) {
          .pack-sem-wrapper { align-items: stretch !important; justify-content: stretch !important; padding: 0 !important; }
          .pack-sem-panel {
            border-radius: 0 !important;
            max-height: 100dvh !important;
            height: 100dvh !important;
            min-height: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            overflow: hidden !important;
          }
          .pack-sem-header { padding-top: max(20px, env(safe-area-inset-top)) !important; flex-shrink: 0 !important; }
          .pack-sem-body { padding: 16px 16px 0 !important; min-height: 0 !important; flex: 1 !important; overflow-y: auto !important; }
          .pack-sem-footer { padding: 12px 16px max(12px, env(safe-area-inset-bottom)) !important; flex-shrink: 0 !important; }
        }
      `}</style>
      <div onClick={handleClose} style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(10,20,10,0.65)', backdropFilter: 'blur(6px)', opacity: closing ? 0 : 1, transition: 'opacity 0.28s ease' }} />
      <div
        className="pack-sem-wrapper"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: isMobile ? 'stretch' : 'center',
          justifyContent: isMobile ? 'stretch' : 'center',
          padding: isMobile ? 0 : 16,
          pointerEvents: 'none',
        }}
      >
        <div
          className="pack-sem-panel"
          onClick={e => e.stopPropagation()}
          style={{
            pointerEvents: 'auto',
            ...(isMobile
              ? {
                  position: 'fixed' as const,
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: '100%',
                  maxWidth: 'none',
                  height: '100dvh',
                  maxHeight: '100dvh',
                  minHeight: 0,
                  borderRadius: 0,
                  boxShadow: 'none',
                }
              : {
                  width: '100%',
                  maxWidth: 860,
                  maxHeight: '96vh',
                  minHeight: 0,
                  borderRadius: 28,
                  boxShadow: '0 8px 48px rgba(0,0,0,0.14)',
                  position: 'relative' as const,
                }),
            background: '#fff',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: `${closing ? 'semModalOut' : 'semModalIn'} 0.32s cubic-bezier(0.22,1,0.36,1) both`,
            fontFamily: 'inherit',
          }}
        >

          <div className="pack-sem-header" style={{ padding: '20px 24px 0', background: '#fff', flexShrink: 0, borderBottom: '1px solid rgba(11, 44, 52,0.06)' }}>
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
                    <div style={{ height: 2, borderRadius: 2, background: done ? '#e67e22' : active ? '#0b2c34' : 'rgba(11, 44, 52,0.08)', transition: 'background 0.4s ease', marginBottom: 5 }} />
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: active ? '#0b2c34' : done ? '#e67e22' : 'rgba(11, 44, 52,0.28)', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{idx}. {st.label}</span>
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
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 20,
                background: 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: isMobile ? 0 : 24,
                padding: 16,
              }}
            >
              <div
                style={{
                  border: '1.5px solid #E4E0DA',
                  borderRadius: '16px',
                  padding: '28px 32px',
                  background: '#fff',
                  fontFamily: 'Poppins, sans-serif',
                  maxWidth: '100%',
                  width: 'min(100%, 420px)',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#0b2c34',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="#5a9aaa"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p style={{ fontSize: '15px', fontWeight: 600, color: '#0b2c34', margin: '0 0 6px', lineHeight: 1.4 }}>
                  C'est noté, merci !
                </p>
                <p style={{ fontSize: '13px', color: '#6B6460', margin: 0, lineHeight: 1.6 }}>
                  Votre demande est entre de bonnes mains. Vous recevrez un email de confirmation dans quelques instants.
                </p>
                <hr style={{ border: 'none', borderTop: '1px solid #E4E0DA', margin: '16px 0' }} />
                <p style={{ fontSize: '11px', color: '#A09080', margin: 0, fontStyle: 'italic' }}>
                  Des séminaires engagés et engageants.
                </p>
              </div>
            </div>
          )}

          <div ref={scrollRef} className="pack-sem-body" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '28px 24px 24px', scrollbarWidth: 'none' }}>
            <div style={{ opacity: transitioning ? 0 : 1, transform: transitioning ? 'translateY(6px)' : 'translateY(0)', transition: 'all 0.18s ease' }}>

              {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                  <div>
                    <h3 style={{ fontStyle: 'normal', fontSize: 24, fontWeight: 700, color: '#0b2c34', margin: '0 0 4px', fontFamily: 'inherit' }}>Votre sélection.</h3>
                    <p style={{ color: '#b0a89e', fontSize: 14, margin: 0 }}>
                      Récapitulatif de votre sélection. Vous pouvez modifier le produit ou le format ci-dessous.
                    </p>
                  </div>
                  {selectedSeminaire && selectedFormat && (
                    <div style={{ background: '#faf8f5', borderRadius: 18, padding: '16px 18px', border: '1px solid rgba(11, 44, 52,0.08)' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#e67e22', marginBottom: 8 }}>Actuellement sélectionné</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#0b2c34', marginBottom: 4 }}>{selectedSeminaire.producteur}</div>
                      <div style={{ fontSize: 14, color: '#7a7060', fontWeight: 600 }}>{formatLabel}</div>
                      {selectedFormat.titre && (
                        <div style={{ fontSize: 13, color: '#9a9080', marginTop: 4 }}>{selectedFormat.titre}</div>
                      )}
                    </div>
                  )}
                  <FieldBlock label="Changer de produit">
                    <CustomSelect value={selectedSeminaireId ?? ''} onChange={val => setSelectedSeminaireId(val || null)} options={selectOptions} placeholder="— Choisir un produit —" />
                  </FieldBlock>
                  {selectedSeminaire && availableFormatIds.length > 0 && (
                    <FieldBlock label="Choisir le format">
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {availableFormatIds.map(id => (
                          <TagBtn key={id} active={selectedFormatId === id} onClick={() => setSelectedFormatId(id)}>
                            {SEMINAIRE_FORMAT_LABELS[id]}
                          </TagBtn>
                        ))}
                      </div>
                    </FieldBlock>
                  )}
                </div>
              )}

              {step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                  <div>
                    <h3 style={{ fontStyle: 'normal', fontSize: 24, fontWeight: 700, color: '#0b2c34', margin: '0 0 4px', fontFamily: 'inherit' }}>Informations & coordonnées.</h3>
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
                    <h3 style={{ fontStyle: 'normal', fontSize: 24, fontWeight: 700, color: '#0b2c34', margin: '0 0 4px', fontFamily: 'inherit' }}>Dates & destination.</h3>
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
                      <button type="button" onClick={() => setDistanceHours(h => Math.max(1, h - 1))} style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(11, 44, 52,0.15)', background: '#fff', cursor: 'pointer', fontSize: 18, fontWeight: 700, color: '#0b2c34', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Diminuer">−</button>
                      <span style={{ fontSize: 16, fontWeight: 700, color: '#0b2c34', minWidth: 100, textAlign: 'center' }}>{distanceHours} heure{distanceHours > 1 ? 's' : ''}</span>
                      <button type="button" onClick={() => setDistanceHours(h => Math.min(8, h + 1))} style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(11, 44, 52,0.15)', background: '#fff', cursor: 'pointer', fontSize: 18, fontWeight: 700, color: '#0b2c34', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Augmenter">+</button>
                    </div>
                  </FieldBlock>
                </div>
              )}

              {step === 4 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                  <div>
                    <h3 style={{ fontStyle: 'normal', fontSize: 24, fontWeight: 700, color: '#0b2c34', margin: '0 0 4px', fontFamily: 'inherit' }}>Logistique & sur-mesure.</h3>
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
                        padding: '6px 14px', borderRadius: 9999, border: '1.5px solid #0b2c34', background: '#0b2c34', color: '#fff',
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
                    <div key={block.num} style={{ background: '#faf8f5', borderRadius: 18, padding: '14px 18px', border: '1px solid rgba(11, 44, 52,0.06)' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#e67e22', marginBottom: 10 }}>{block.num} — {block.title}</div>
                      {block.rows.map(r => <RecapRow key={r.label} label={r.label} value={typeof r.value === 'string' ? r.value : ''} />)}
                    </div>
                  ))}
                  <p style={{ fontSize: 13, color: '#b0a89e', textAlign: 'center', margin: '4px 0 0' }}>Tout est correct ? Cliquez sur <strong style={{ color: '#0b2c34' }}>Demander un devis</strong>.</p>
                </div>
              )}
            </div>
          </div>

          <div className="pack-sem-footer" style={{ padding: '20px 24px', borderTop: '1px solid rgba(11, 44, 52,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexShrink: 0, flexWrap: 'wrap' }}>
            <button onClick={goPrev} disabled={step === 1} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: step === 1 ? 'transparent' : '#b0a89e', background: 'none', border: 'none', cursor: step === 1 ? 'default' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, pointerEvents: step === 1 ? 'none' : 'auto' }}>
              ← Précédent
            </button>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={handleClose} style={{ padding: '11px 20px', borderRadius: 9999, border: '1px solid rgba(11, 44, 52,0.1)', background: '#faf8f5', fontFamily: 'inherit', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#b0a89e', cursor: 'pointer' }}>Annuler</button>
              <button onClick={step < 5 ? goNext : handleSubmit} disabled={submitting} style={{ padding: '11px 24px', borderRadius: 9999, background: '#0b2c34', color: '#fff', border: 'none', fontFamily: 'inherit', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: 8, minWidth: 150, justifyContent: 'center' }}>
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
  const router = useRouter();
  const [seminaires,    setSeminaires]    = useState<Seminaire[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [fetchError,    setFetchError]    = useState<string | null>(null);
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

  const filtered = seminaires;

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
        <div style={{ width: 32, height: 32, border: '2px solid rgba(11, 44, 52,0.1)', borderTop: '2px solid #0b2c34', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
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
        .terrago-popup .mapboxgl-popup-content { border-radius:18px !important; padding:12px 14px !important; box-shadow:0 4px 20px rgba(11, 44, 52,0.14) !important; border:1px solid rgba(11, 44, 52,0.08) !important; font-family:inherit !important; }
        .terrago-popup .mapboxgl-popup-tip { display:none !important; }
        .fmt-tab { flex:1; padding:10px 18px; border-radius:9999px; border:none; font-family:inherit; font-size:10px; font-weight:700; letter-spacing:0.06em; cursor:pointer; transition:all 0.18s ease; white-space:nowrap; text-transform:uppercase; }
        .sem-page-wrap  { max-width:1400px; margin:0 auto; padding:0 clamp(1rem,3vw,2rem); }
        .sem-header-top { padding-top:calc(84px + 3rem); padding-bottom:1.5rem; }
        .sem-header-sub { color:#9a9080; font-size:13px; line-height:1.75; margin:0 0 24px; }
        @media (min-width:900px) { .sem-header-sub { white-space:nowrap; } }
        .sem-filter-chip { display:inline-flex; align-items:center; padding:7px 16px; border-radius:9999px; border:1.5px solid rgba(11, 44, 52,0.1); background:#fff; font-family:inherit; font-size:11px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; cursor:pointer; color:#b0a89e; transition:all 0.15s ease; white-space:nowrap; }
        .sem-filter-chip.active { color:#fff; border-color:transparent; }
        .sem-filter-chip:hover:not(.active):not(:disabled) { background:#f0ece5; color:#0b2c34; }
        .sem-split      { display:grid; grid-template-columns:1fr 380px; gap:28px; align-items:start; }
        .sem-grid       { display:grid; grid-template-columns:repeat(3, 1fr); gap:14px; align-items:stretch; }
        .sem-grid > div { min-width:0; display:flex; }
        .sem-pack-card { flex:1; width:100%; min-height:0; display:flex; flex-direction:column; }
        .sem-pack-card-visual { position:relative; width:100%; flex-shrink:0; aspect-ratio:4/3; overflow:hidden; }
        .sem-pack-card-body { flex:1; display:flex; flex-direction:column; min-height:0; padding:8px 10px 10px; }
        .sem-pack-card-sub { margin-bottom:6px !important; }
        .sem-pack-card-row { margin-top:auto; }
        .sem-map-widget { border-radius:16px; overflow:hidden; height:640px; box-shadow:0 2px 16px rgba(11, 44, 52,0.12); }
        .sem-cta-band   { display:flex; flex-direction:row; align-items:center; justify-content:space-between; gap:32px; flex-wrap:wrap; background:#0b2c34; border-radius:24px; padding:48px 64px; }
        .sem-detail-cols { display:grid; grid-template-columns:1fr 440px; gap:48px; align-items:start; }
        .sem-format-tabs { display:flex; gap:0; background:rgba(11, 44, 52,0.05); border-radius:9999px; padding:6px; margin-left:auto; flex-shrink:0; }
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
          .sem-pack-card-visual { aspect-ratio:auto; height:clamp(88px,28vw,108px); max-height:none; }
          .sem-pack-card-body { padding:8px 9px 10px; }
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
        initialFormatId={modalSem ? primaryFormatIdForSeminaire(modalSem) : 'journee'}
      />

      {mapExpanded && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1500, background: 'rgba(10,20,10,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          onClick={() => setMapExpanded(false)}>
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 1200, height: '80vh', borderRadius: 24, overflow: 'hidden', boxShadow: '0 8px 48px rgba(0,0,0,0.2)' }}>
            <MapboxMap seminaires={filtered} activeId={activeId} activeFormat="journee"
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
          <p className="sem-header-sub">
            Séminaire à la journée ou résidentiel — des team-buildings humains chez des producteurs français.
          </p>
          <div style={{ paddingTop: 4, paddingBottom: 16, fontSize: 11, color: '#b0a89e', fontWeight: 600, letterSpacing: '0.06em' }}>
            {filtered.length} expérience{filtered.length > 1 ? 's' : ''} disponible{filtered.length > 1 ? 's' : ''}
          </div>
        </div>

        <div className="sem-split">
          <div>
            {filtered.length === 0 ? (
              <div style={{ background: '#fff', borderRadius: 20, border: '1px solid rgba(11, 44, 52,0.08)', padding: '2rem', textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{fetchError ? '⚠️' : '📋'}</div>
                <h3 style={{ fontStyle: 'italic', fontSize: 20, fontWeight: 700, color: '#0b2c34', margin: '0 0 8px' }}>
                  {fetchError ? 'Impossible de charger les offres' : 'Aucune offre pour le moment'}
                </h3>
                <p style={{ color: '#9a9080', fontSize: 13, margin: 0 }}>{fetchError || 'Les offres seront bientôt disponibles.'}</p>
                <button onClick={() => setModalOpen(true)} style={{ marginTop: 20, background: '#0b2c34', color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', padding: '10px 18px', borderRadius: 9999, border: 'none', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Demander un devis →
                </button>
              </div>
            ) : (
              <div ref={listRef} className="sem-grid">
                {filtered.map(s => (
                  <div key={s.id} data-id={s.id}>
                    <SeminaireCard
                      s={s}
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
                activeFormat="journee"
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
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, margin: 0, lineHeight: 1.6 }}>Groupe de 5 à 200+ — on construit avec vous votre séminaire sur mesure, à la rencontre d'un ou plusieurs producteurs.</p>
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
