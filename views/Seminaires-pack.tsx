'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import type { CSSProperties } from 'react';
import { Sprout, Ham, Speech, Presentation, Wifi, House, Bike, Users, PartyPopper, MapPin, ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Seminaire, Format, ProgrammeItem, SeminaireFormatId, SeminaireHebergement } from '../lib/seminaires';
import { SEMINAIRE_FORMAT_IDS, SEMINAIRE_FORMAT_LABELS } from '../lib/seminaires';
import { supabase } from '../lib/supabase';
import { mapSupabaseRowToFull, type ProducerFull, type SupabaseProducerRow } from '../lib/producerTypes';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapboxPublicToken } from '@/components/MapboxTokenProvider';
import SeminaireDetailLoading from '@/components/SeminaireDetailLoading';
import {
  MiniDateRangeCalendar,
  SEMINAIRE_PERIODS,
  fmtDayShort,
} from '@/components/MiniDateRangeCalendar';
import {
  HOME_COLORS,
  HOME_RADIUS,
  homeFramedHeroAspectClass,
  bottomImageGradientClass,
  homeHeroOutlineButtonClass,
  homeSectionPadding,
} from '../components/home/homeStyles';
import FramedHeroImage from '../components/FramedHeroImage';
import { trackGenerateLead } from '../lib/analytics';
import { useModal } from '../context/ModalContext';

const HOME_ASSETS =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME';

const PACK_ASSETS = {
  hero: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/LOGEMENTS/TRINQUET-PIMENT/trinquet7.jpg',
  producteurSoutenu: `${HOME_ASSETS}/emoji/producteur-sountenu.png`,
  sOrange: `${HOME_ASSETS}/emoji/s-picto-orange.png`,
  branche: `${HOME_ASSETS}/emoji/emoji-branche.png`,
  mouton: `${HOME_ASSETS}/emoji/mouton.png`,
} as const;

const sectionTitleClass =
  'font-sans text-[34px] font-normal leading-[1.08] tracking-[-0.075em] text-[#0c1d22] sm:text-[40px] lg:text-[48px]';

export type { Seminaire, Format, ProgrammeItem };

// ─── Constantes ───────────────────────────────────────────────────────────────

// ─── Carte des équipements / services inclus ─────────────────────────────────

const AMENITY_COLOR = HOME_COLORS.orange;

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

// ─── ProgrammeAccordion ───────────────────────────────────────────────────────

const isDesktop = () => typeof window !== 'undefined' ? window.innerWidth > 768 : true;

function ProgrammeAccordion({ programme, couleur, triggerKey }: { programme: ProgrammeItem[]; couleur: string; triggerKey: any }) {
  const [expanded, setExpanded] = useState(isDesktop);
  const prev = useRef<any>(null);
  if (prev.current !== triggerKey) { prev.current = triggerKey; setExpanded(isDesktop()); }
  return (
    <div style={{ borderTop: '1px solid rgba(12, 29, 34,0.06)', paddingTop: 14 }}>
      <button onClick={() => setExpanded(v => !v)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: expanded ? 14 : 0 }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0c1d22' }}>Exemple de programme</span>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: '50%', background: 'rgba(12, 29, 34,0.05)', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', flexShrink: 0 }}>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2.5 5L7 9.5L11.5 5" stroke="rgba(12, 29, 34, 0.40)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </button>
      <div style={{ maxHeight: expanded ? '600px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 4 }}>
          {programme.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ color: '#ec6435', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', flexShrink: 0, width: 72, paddingTop: 2 }}>{p.heure}</span>
              <span style={{ color: 'rgba(12, 29, 34, 0.55)', fontSize: 14, lineHeight: 1.65 }}>{p.action}</span>
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
    <div className={`sem-offer-inclus${layout === 'grid' ? ' sem-offer-inclus--grid' : ''}`}>
      {inclus.map(key => {
        const amenity = AMENITIES_MAP[key];
        if (!amenity) return null;
        return (
          <div key={key} className="sem-offer-inclus-item">
            <span className="sem-offer-inclus-icon">{amenity.icon}</span>
            <span className="sem-offer-inclus-label">{amenity.label}</span>
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
      <div className="sem-hebergement-photo-frame relative">
        <Image src={images[photoIndex]} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" draggable={false} style={{ pointerEvents: 'none', userSelect: 'none' }} />
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
  const [index, setIndex] = useState(0);

  if (hebergements.length === 0) {
    return (
      <div className="sem-mobile-hebergement-soon">
        <span className="sem-mobile-hebergement-soon-icon">🏡</span>
        <span>Les hébergements selon votre effectif, bientôt disponibles 🏡</span>
      </div>
    );
  }

  const current = hebergements[Math.min(index, hebergements.length - 1)];
  const canPrev = index > 0;
  const canNext = index < hebergements.length - 1;
  const showNav = hebergements.length > 1;

  return (
    <div className="sem-hebergements-carousel" aria-label="Hébergements disponibles">
      <div
        className="sem-hebergements-carousel-slide"
        key={current.id}
        role="group"
        aria-roledescription="slide"
        aria-label={`Logement ${index + 1} sur ${hebergements.length}`}
      >
        <HebergementCard hebergement={current} />
      </div>
      {showNav && (
        <div className="sem-hebergements-carousel-nav">
          <button
            type="button"
            className="sem-hebergements-carousel-arrow"
            onClick={() => setIndex(i => Math.max(0, i - 1))}
            disabled={!canPrev}
            aria-label="Logement précédent"
          >
            <ChevronLeft size={20} strokeWidth={2.2} aria-hidden />
          </button>
          <span className="sem-hebergements-carousel-count" aria-live="polite">
            {index + 1} / {hebergements.length}
          </span>
          <button
            type="button"
            className="sem-hebergements-carousel-arrow"
            onClick={() => setIndex(i => Math.min(hebergements.length - 1, i + 1))}
            disabled={!canNext}
            aria-label="Logement suivant"
          >
            <ChevronRight size={20} strokeWidth={2.2} aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}

function MobileFormatCapsule({
  title,
  fmt,
  variant,
  showTitle = true,
  hebergements = [],
  layout = 'mobile',
  programmeKey = '',
  embedded = false,
}: {
  title: string;
  fmt: Format;
  variant: 'jour' | 'residentiel';
  tint?: string;
  tintBorder?: string;
  showTitle?: boolean;
  hebergements?: SeminaireHebergement[];
  layout?: 'mobile' | 'desktop';
  couleur?: string;
  programmeKey?: string;
  embedded?: boolean;
}) {
  const meta = [fmt.duree?.trim(), fmt.participants?.trim()].filter(Boolean).join(' · ');

  return (
    <section className={`sem-offer-format-panel sem-offer-format-panel--${variant}${embedded ? ' is-embedded' : ''}`}>
      {!embedded && showTitle && <h3 className="sem-offer-format-panel-title">{title}</h3>}
      {!embedded && meta && <p className="sem-offer-format-meta">{meta}</p>}

      {fmt.inclus.length > 0 && (
        <div className="sem-offer-format-block">
          <h4 className="sem-offer-format-h">Inclus dans l&apos;offre</h4>
          <FormatInclusList inclus={fmt.inclus} layout={layout === 'desktop' ? 'grid' : 'stack'} />
        </div>
      )}

      {fmt.programme.length > 0 && (
        <div className="sem-offer-format-block">
          {variant === 'jour' ? (
            <>
              <h4 className="sem-offer-format-h">Exemple de programme</h4>
              <div className="sem-offer-programme">
                {fmt.programme.map((p, i) => (
                  <div key={i} className="sem-offer-programme-step">
                    <span className="sem-offer-programme-time">{p.heure}</span>
                    <span className="sem-offer-programme-action">{p.action}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <MobileCollapsibleSection
              title="Exemple de programme"
              contentKey={programmeKey || `${variant}-${fmt.programme.length}`}
              defaultExpanded={false}
            >
              <div className="sem-offer-programme">
                {fmt.programme.map((p, i) => (
                  <div key={i} className="sem-offer-programme-step">
                    <span className="sem-offer-programme-time">{p.heure}</span>
                    <span className="sem-offer-programme-action">{p.action}</span>
                  </div>
                ))}
              </div>
            </MobileCollapsibleSection>
          )}
        </div>
      )}

      {hebergements.length > 0 && (
        <div className="sem-offer-format-block">
          <h4 className="sem-offer-format-h">Hébergements</h4>
          <HebergementsList hebergements={hebergements} />
        </div>
      )}
    </section>
  );
}

type MobileFormatId = SeminaireFormatId;

function MobileFormatSwitcher({
  fmtJour,
  fmt2j,
  activeId,
  onActiveChange,
  hebergements = [],
  layout = 'mobile',
  programmeKey = '',
}: {
  fmtJour?: Format;
  fmt2j?: Format;
  activeId: MobileFormatId;
  onActiveChange: (id: MobileFormatId) => void;
  jourTint?: string;
  jourBorder?: string;
  resTint?: string;
  resBorder?: string;
  hebergements?: SeminaireHebergement[];
  layout?: 'mobile' | 'desktop';
  couleur?: string;
  programmeKey?: string;
}) {
  const rows: {
    id: MobileFormatId;
    title: string;
    fmt: Format;
    icon: React.ReactNode;
  }[] = [];

  if (fmtJour) {
    rows.push({
      id: 'journee',
      title: 'Séminaire à la journée',
      fmt: fmtJour,
      icon: <Sun size={18} strokeWidth={1.7} color={HOME_COLORS.primary} />,
    });
  }
  if (fmt2j) {
    rows.push({
      id: 'residentiel',
      title: 'Séminaire résidentiel',
      fmt: fmt2j,
      icon: <Moon size={18} strokeWidth={1.7} color={HOME_COLORS.primary} />,
    });
  }

  if (rows.length === 0) return null;

  return (
    <section
      className={`sem-offer-format sem-infos-pratiques${layout === 'desktop' ? ' sem-offer-format--desktop' : ''}`}
      aria-labelledby="sem-offer-format-title"
    >
      <div className="sem-offer-format-head">
        <h2 id="sem-offer-format-title" className="sem-infos-pratiques-title sem-offer-format-title">
          Le format
        </h2>
        <p className="sem-offer-format-subtitle">
          À la journée ou en résidentiel — ouvrez une formule pour voir le détail.
        </p>
      </div>
      <div className="sem-infos-pratiques-list">
        {rows.map(row => {
          const meta = [row.fmt.duree?.trim(), row.fmt.participants?.trim()].filter(Boolean).join(' · ');
          return (
            <InfosPratiquesRow
              key={row.id}
              icon={row.icon}
              title={row.title}
              subtitle={meta || row.fmt.prix}
              defaultOpen={activeId === row.id && rows.length === 1}
              onOpen={() => onActiveChange(row.id)}
            >
              <MobileFormatCapsule
                title={row.title}
                fmt={row.fmt}
                variant={row.id === 'journee' ? 'jour' : 'residentiel'}
                showTitle={false}
                embedded
                layout={layout}
                programmeKey={`${programmeKey}-${row.id}`}
                hebergements={row.id === 'residentiel' ? hebergements : []}
              />
            </InfosPratiquesRow>
          );
        })}
      </div>
    </section>
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
          <Image src={producer.avatar} alt={name} width={52} height={52} className="sem-mobile-producer-avatar" />
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
          {logo && <Image src={logo} alt={nom} width={120} height={36} style={{ maxHeight: 36, maxWidth: 120, width: 'auto', height: 'auto', objectFit: 'contain' }} />}
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
        <Image src={currentImg} alt={`${titre} – ${region}`} fill sizes="(max-width: 768px) 90vw, 320px" className="object-cover" style={{ pointerEvents: 'none', userSelect: 'none' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12, 29, 34,0.65) 0%, transparent 55%)', pointerEvents: 'none' }} />
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

function SeminaireCard({ s, isActive, onSelect }: {
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
        borderRadius: HOME_RADIUS,
        overflow: 'hidden',
        border: `1px solid ${active ? 'rgba(12,29,34,0.18)' : 'rgba(12,29,34,0.08)'}`,
        background: '#fff',
        cursor: isComing ? 'default' : 'pointer',
        boxShadow: active ? '0 12px 36px rgba(12,29,34,0.10)' : 'none',
        transition: 'border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease',
        transform: active ? 'translateY(-3px)' : 'none',
        opacity: isComing ? 0.72 : 1,
      }}
    >
      <div className="sem-pack-card-visual">
        <Image
          src={s.images[0] ?? ''}
          alt={s.label}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          style={{
            transition: 'transform 0.45s ease',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            filter: isComing ? 'grayscale(35%)' : 'none',
          }}
        />
        {hasPartenaire && s.partenaire_logo && (
          <Image
            src={s.partenaire_logo}
            alt={s.partenaire_nom ?? s.label}
            width={72}
            height={32}
            style={{
              position: 'absolute',
              top: 14,
              left: 14,
              zIndex: 6,
              height: 32,
              width: 'auto',
              maxWidth: 72,
              objectFit: 'contain',
              display: 'block',
              borderRadius: 8,
              pointerEvents: 'none',
            }}
          />
        )}
        {isComing && (
          <div
            style={{
              position: 'absolute',
              top: 10,
              left: hasPartenaire ? 88 : 10,
              background: 'rgba(255,255,255,0.94)',
              borderRadius: 9999,
              padding: '3px 9px',
              fontSize: 8,
              fontWeight: 700,
              color: HOME_COLORS.primary,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              border: '1px solid rgba(12,29,34,0.10)',
            }}
          >
            Bientôt
          </div>
        )}
        {!isComing && s.bestseller && (
          <div
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              background: 'rgba(0, 0, 0, 0.42)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              borderRadius: 9999,
              padding: '3px 9px',
              fontSize: 8,
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Populaire
          </div>
        )}
      </div>
      <div className="sem-pack-card-body">
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: HOME_COLORS.orange,
            marginBottom: 4,
          }}
        >
          {s.producteur}
        </div>
        <div
          className="sem-pack-card-title"
          style={{
            fontWeight: 700,
            fontSize: 14,
            color: HOME_COLORS.primary,
            lineHeight: 1.25,
            letterSpacing: '-0.04em',
            marginBottom: 4,
          }}
        >
          {s.label}
        </div>
        {isComing ? (
          <div
            style={{
              fontSize: 12,
              color: 'rgba(12,29,34,0.45)',
              marginTop: 'auto',
              paddingTop: 8,
            }}
          >
            Disponible prochainement
          </div>
        ) : (
          <>
            <div
              className="sem-pack-card-sub"
              style={{
                fontSize: 12,
                color: 'rgba(12,29,34,0.58)',
                lineHeight: 1.45,
                marginBottom: 10,
              }}
            >
              {fmt!.sous_titre}
            </div>
            <div
              className="sem-pack-card-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  minWidth: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'rgba(12,29,34,0.55)',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {participantsRangeForOfferCard(s)}
                </span>
                <span
                  aria-hidden
                  style={{
                    width: 1,
                    height: 12,
                    background: 'rgba(12,29,34,0.18)',
                    flexShrink: 0,
                  }}
                />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {s.region}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect();
                }}
                className="sem-pack-card-btn"
                style={{
                  flexShrink: 0,
                  background: 'transparent',
                  color: HOME_COLORS.primary,
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.07em',
                  padding: '6px 12px',
                  borderRadius: 9999,
                  border: `1px solid ${HOME_COLORS.primary}`,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.18s ease, color 0.18s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = HOME_COLORS.primary;
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = HOME_COLORS.primary;
                }}
              >
                En détails
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


// ─── GalleryLightbox ─────────────────────────────────────────────────────────

function GalleryLightbox({ images, initialIndex, onClose, label }: { images: string[]; initialIndex: number; onClose: () => void; label?: string }) {
  const [idx, setIdx] = useState(initialIndex);
  const panelRef = useRef<HTMLDivElement>(null);
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setIdx(i => (i + 1) % images.length);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (window.matchMedia('(max-width: 900px)').matches) {
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
      }
    };
    document.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [idx]);

  const scrollImageToTop = (index: number) => {
    const panel = panelRef.current;
    if (!panel) return;
    const el = panel.querySelector(`[data-gal-idx="${index}"]`);
    if (!(el instanceof HTMLElement)) return;
    const top = el.getBoundingClientRect().top - panel.getBoundingClientRect().top + panel.scrollTop;
    panel.scrollTo({ top: Math.max(0, top - 24), behavior: 'auto' });
  };

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const run = () => scrollImageToTop(initialIndex);
    run();
    const raf = requestAnimationFrame(run);

    const imgs = panel.querySelectorAll('img');
    const onLoad = () => run();
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener('load', onLoad);
    });

    return () => {
      cancelAnimationFrame(raf);
      imgs.forEach((img) => img.removeEventListener('load', onLoad));
    };
  }, [initialIndex]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label ? `Photos — ${label}` : 'Photos'}
      style={{ position: 'fixed', inset: 0, zIndex: 2000, background: '#ffffff' }}
    >
      <style>{`
        .gal-close {
          position: absolute; top: 28px; right: 80px; z-index: 20;
          width: 44px; height: 44px; border-radius: 50%; background: #fff;
          border: 1px solid rgba(12, 29, 34, 0.12); color: #0c1d22; font-size: 22px;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          font-weight: 300; box-shadow: 0 2px 10px rgba(12, 29, 34, 0.08);
        }
        .gal-single {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          height: 100%; padding: 72px 16px 24px;
        }
        .gal-panel {
          display: none; height: 100%; overflow-y: auto;
          padding: 88px 80px 80px;
          box-sizing: border-box;
          scrollbar-gutter: stable both-edges;
        }
        .gal-panel-inner {
          max-width: 1100px; width: 100%; margin: 0 auto; padding: 0;
          column-count: 2;
          column-gap: 24px;
        }
        .gal-panel-item {
          break-inside: avoid;
          page-break-inside: avoid;
          display: inline-block;
          width: 100%;
          margin: 0 0 24px;
          border-radius: 10px;
          overflow: hidden;
          vertical-align: top;
          cursor: pointer;
        }
        .gal-panel-item img {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 10px;
        }
        @media (max-width: 900px) {
          .gal-panel { display: none !important; }
          .gal-single { display: flex !important; }
        }
        @media (min-width: 901px) {
          .gal-single { display: none !important; }
          .gal-panel { display: block !important; }
        }
      `}</style>

      <button type="button" className="gal-close" onClick={onClose} aria-label="Fermer">×</button>

      <div className="gal-single">
        <div style={{ position: 'absolute', top: 22, left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: '#fff', border: '1px solid rgba(12, 29, 34,0.1)', borderRadius: 9999, padding: '4px 14px', fontSize: 11, color: '#0c1d22', fontWeight: 700, boxShadow: '0 2px 8px rgba(12, 29, 34,0.07)' }}>
          {idx + 1} / {images.length}
        </div>
        <div style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: '88vw', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 48px' }}>
          <Image src={images[idx]} alt={label ? `${label} – ${idx + 1}` : ''} width={1600} height={1200} sizes="88vw" style={{ maxWidth: '100%', maxHeight: '70vh', width: 'auto', height: 'auto', borderRadius: 18, objectFit: 'contain', boxShadow: '0 12px 60px rgba(0,0,0,0.25)' }} />
          {images.length > 1 && (
            <>
              <button type="button" onClick={prev} aria-label="Photo précédente" style={{ position: 'absolute', left: 0, width: 44, height: 44, borderRadius: '50%', background: '#fff', border: '1px solid rgba(12, 29, 34,0.12)', color: '#0c1d22', fontSize: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(12, 29, 34,0.1)' }}>‹</button>
              <button type="button" onClick={next} aria-label="Photo suivante" style={{ position: 'absolute', right: 0, width: 44, height: 44, borderRadius: '50%', background: '#fff', border: '1px solid rgba(12, 29, 34,0.12)', color: '#0c1d22', fontSize: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(12, 29, 34,0.1)' }}>›</button>
            </>
          )}
        </div>
        {images.length > 1 && (
          <div style={{ position: 'relative', zIndex: 5, display: 'flex', gap: 8, marginTop: 16, maxWidth: '88vw', overflowX: 'auto', padding: '4px 0' }}>
            {images.map((img, i) => (
              <div key={i} onClick={() => setIdx(i)}
                style={{ position: 'relative', flexShrink: 0, width: 64, height: 64, borderRadius: 12, overflow: 'hidden', cursor: 'pointer', border: `2.5px solid ${i === idx ? '#0c1d22' : 'rgba(12, 29, 34,0.12)'}`, opacity: i === idx ? 1 : 0.55 }}>
                <Image src={img} alt={label ? `${label} – ${i + 1}` : ''} fill sizes="64px" className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="gal-panel" ref={panelRef}>
        <div className="gal-panel-inner">
          {images.map((img, i) => (
            <div
              key={i}
              data-gal-idx={i}
              className="gal-panel-item"
              onClick={() => scrollImageToTop(i)}
            >
              <Image
                src={img}
                alt={label ? `${label} – ${i + 1}` : ''}
                width={2400}
                height={1600}
                sizes="526px"
                style={{ width: '100%', height: 'auto', aspectRatio: 'auto' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Carte partenaire (sous le bloc devis) ────────────────────────────────────

const SEM_DETAIL_CARD: React.CSSProperties = {
  background: '#fff',
  borderRadius: HOME_RADIUS,
  border: '1px solid rgba(12, 29, 34, 0.1)',
  padding: '24px',
  boxShadow: '0 4px 28px rgba(12, 29, 34, 0.09)',
};

/** Panneau devis sticky — fond gris clair, compact. */
const SEM_DEVIS_PANEL: React.CSSProperties = {
  background: HOME_COLORS.gray,
  borderRadius: HOME_RADIUS,
  border: '1px solid rgba(12, 29, 34, 0.08)',
  padding: '28px 24px',
  boxShadow: 'none',
  color: HOME_COLORS.primary,
  display: 'flex',
  flexDirection: 'column',
};

function PartenaireCard({ nom, logo, description, siteWeb }: { nom: string; logo?: string; description?: string; siteWeb?: string }) {
  return (
    <div style={{ ...SEM_DETAIL_CARD, marginTop: 16 }} aria-label={`En partenariat avec ${nom}`}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: description ? 12 : 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
          {logo && (
            <Image
              src={logo}
              alt={nom}
              width={72}
              height={28}
              style={{ height: 28, width: 'auto', maxWidth: 72, objectFit: 'contain', flexShrink: 0, display: 'block', borderRadius: 8 }}
            />
          )}
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0c1d22', lineHeight: 1.35, minWidth: 0 }}>
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
              color: '#ec6435',
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
        <p style={{ margin: 0, fontSize: 11, color: 'rgba(12, 29, 34, 0.45)', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
          {description}
        </p>
      )}
    </div>
  );
}

// ─── Intro éditoriale (inspirée Staycation, DA TerraGo) ───────────────────────

function OfferIntroBlock({
  title,
  producteur,
  region,
}: {
  title: string;
  producteur: string;
  region: string;
}) {
  return (
    <header className="sem-offer-intro">
      <div className="sem-offer-intro-top">
        <div className="sem-offer-intro-main">
          <h1 className="sem-offer-title">{title}</h1>
          <div className="sem-offer-meta">
            <span className="sem-offer-meta-strong">{producteur}</span>
            {region && (
              <>
                <span className="sem-offer-meta-dot" aria-hidden>·</span>
                <span>{region}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function InfosPratiquesRow({
  icon,
  title,
  subtitle,
  children,
  defaultOpen = false,
  onOpen,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  onOpen?: () => void;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const expandable = Boolean(children);

  return (
    <div className={`sem-infos-row${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="sem-infos-row-trigger"
        aria-expanded={expandable ? open : undefined}
        onClick={() => {
          if (!expandable) {
            onOpen?.();
            return;
          }
          const next = !open;
          setOpen(next);
          if (next) onOpen?.();
        }}
      >
        <span className="sem-infos-row-icon" aria-hidden>{icon}</span>
        <span className="sem-infos-row-text">
          <span className="sem-infos-row-title">{title}</span>
          {subtitle && <span className="sem-infos-row-sub">{subtitle}</span>}
        </span>
        <ChevronRight size={18} strokeWidth={1.8} className="sem-infos-row-chevron" aria-hidden />
      </button>
      {expandable && open && (
        <div className="sem-infos-row-body">{children}</div>
      )}
    </div>
  );
}

function InfosPratiquesSection({
  s,
  producer,
}: {
  s: Seminaire;
  producer: ProducerFull | null;
}) {
  const bio = producer?.description?.trim();
  const producerName = producer?.name ?? s.producteur;

  return (
    <section className="sem-infos-pratiques" aria-labelledby="sem-infos-pratiques-title">
      <h2 id="sem-infos-pratiques-title" className="sem-infos-pratiques-title">Infos pratiques</h2>
      <div className="sem-infos-pratiques-list">
        <InfosPratiquesRow
          icon={<MapPin size={18} strokeWidth={1.7} color={HOME_COLORS.primary} />}
          title="Localisation"
          subtitle={[s.region, s.producteur].filter(Boolean).join(' · ')}
        >
          <p className="sem-infos-pratiques-copy">
            Séminaire <strong>{s.producteur}</strong>
            {s.region ? <> — {s.region}</> : null}.
            Le lieu exact est communiqué après validation du devis.
          </p>
        </InfosPratiquesRow>

        <InfosPratiquesRow
          icon={<Users size={18} strokeWidth={1.7} color={HOME_COLORS.primary} />}
          title="À propos du producteur"
          subtitle={producerName}
        >
          {producer?.avatar && (
            <div className="sem-infos-producer-head">
              <Image src={producer.avatar} alt={producerName} width={44} height={44} className="sem-infos-producer-avatar" />
              <strong>{producerName}</strong>
            </div>
          )}
          {bio ? (
            <p className="sem-infos-pratiques-copy">{bio}</p>
          ) : (
            <p className="sem-infos-pratiques-copy">
              Rencontre et immersion avec {producerName}, producteur engagé du réseau TerraGo.
            </p>
          )}
        </InfosPratiquesRow>
      </div>
    </section>
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

  useEffect(() => {
    let next: MobileFormatId = fmtJour ? 'journee' : 'residentiel';
    if (activeFormat === 'journee' && fmtJour) next = 'journee';
    else if (activeFormat === 'residentiel' && fmt2j) next = 'residentiel';
    setMobileFormatId(next);
  }, [s.id, activeFormat, fmtJour, fmt2j]);

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
      {galleryOpen && <GalleryLightbox images={s.images} initialIndex={galleryIdx} onClose={() => setGalleryOpen(false)} label={s.label} />}

      <div style={{ animation: 'semExpandIn 0.3s cubic-bezier(0.22,1,0.36,1) both' }}>

        {/* ── Carrousel mobile ── */}
        <div
          className="sem-mobile-carousel"
          onTouchStart={handlePhotoTouchStart}
          onTouchEnd={handlePhotoTouchEnd}
          onTouchCancel={handlePhotoTouchCancel}
          style={{ touchAction: 'manipulation' }}
        >
          <Image
            key={mobilePhotoIdx}
            src={s.images[mobilePhotoIdx] ?? mainImage}
            alt={s.label}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ pointerEvents: 'none', userSelect: 'none' }}
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

          {s.bestseller && <div className="sem-mobile-bestseller">Populaire</div>}
          {s.images.length > 1 && (
            <div className="sem-mobile-hero-meta">
              <div className="sem-mobile-photo-counter">{mobilePhotoIdx + 1} / {s.images.length}</div>
            </div>
          )}
          {s.partenaire_nom && (
            <div className="sem-mobile-hero-partenaire" aria-label={`En partenariat avec ${s.partenaire_nom}`}>
              {s.partenaire_logo && (
                <Image src={s.partenaire_logo} alt={s.partenaire_nom} width={72} height={28} style={{ height: 28, width: 'auto', maxWidth: 72, objectFit: 'contain' }} />
              )}
              <span>En partenariat avec {s.partenaire_nom}</span>
            </div>
          )}
        </div>

        {/* ── Grille photos desktop ── */}
        <div className={`sem-photo-grid sem-photo-grid-desktop ${hasSmall ? 'has-small' : 'no-small'}`}>
          <div onClick={() => { setGalleryIdx(0); setGalleryOpen(true); }} className="sem-photo-main relative">
            <Image src={mainImage} alt={s.label} fill sizes="(max-width: 900px) 100vw, 60vw" className="object-cover" style={{ transition: 'transform 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }} />
          </div>
          {smallImages.map((img, i) => (
            <div key={i} onClick={() => { setGalleryIdx(i + 1); setGalleryOpen(true); }} className="relative" style={{ cursor: 'pointer', overflow: 'hidden' }}>
              <Image src={img} alt={`${s.label} – ${i + 2}`} fill sizes="(max-width: 900px) 100vw, 30vw" className="object-cover" style={{ transition: 'transform 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }} />
            </div>
          ))}
          {s.bestseller && (
            <div
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                background: 'rgba(255, 255, 255, 0.42)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                borderRadius: 9999,
                padding: '5px 12px',
                fontSize: 10,
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            >
              Populaire
            </div>
          )}
          {s.images.length > 1 && (
            <button onClick={() => { setGalleryIdx(0); setGalleryOpen(true); }}
              style={{ position: 'absolute', bottom: 14, right: 14, background: '#fff', border: '1.5px solid rgba(12,29,34,0.12)', borderRadius: 9999, padding: '8px 16px', fontSize: 12, fontWeight: 700, color: '#0c1d22', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 2px 10px rgba(12,29,34,0.08)', fontFamily: 'inherit' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              Afficher toutes les photos
            </button>
          )}
        </div>

        {/* Contenu */}
        <div className="sem-mobile-sheet">
          {/* Intro mobile */}
          <div className="sem-detail-mobile-only">
            <OfferIntroBlock
              title={s.label}
              producteur={s.producteur}
              region={s.region}
            />
            <InfosPratiquesSection
              s={s}
              producer={producer}
            />
            <MobileFormatSwitcher
              fmtJour={fmtJour}
              fmt2j={fmt2j}
              activeId={mobileFormatId}
              onActiveChange={handleMobileFormatChange}
              hebergements={s.hebergements}
              programmeKey={`${s.id}-${mobileFormatId}`}
            />
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
          </div>

        <div className="sem-detail-cols sem-detail-desktop-only">
          <div>
            <OfferIntroBlock
              title={s.label}
              producteur={s.producteur}
              region={s.region}
            />
            <InfosPratiquesSection
              s={s}
              producer={producer}
            />
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
              hebergements={s.hebergements}
              programmeKey={`${s.id}-${activeFormat}`}
            />
          </div>

          <div className="sem-price-col">
            <div style={SEM_DEVIS_PANEL}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: HOME_COLORS.orange, marginBottom: 10 }}>
                    Tarif sur demande
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.04em', color: HOME_COLORS.primary, lineHeight: 1.2 }}>
                    {tarifAffiche}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'rgba(12, 29, 34, 0.55)' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      À la journée ou en résidentiel
                    </span>
                    <span style={{ color: 'rgba(12, 29, 34, 0.25)', fontSize: 12 }}>·</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'rgba(12, 29, 34, 0.55)' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      {fmt.participants}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(12, 29, 34, 0.50)', lineHeight: 1.45 }}>
                    Devis gratuit · Réponse 48h
                  </div>
                  <button
                    onClick={onDevis}
                    style={{
                      flexShrink: 0,
                      background: HOME_COLORS.primary,
                      color: '#fff',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      padding: '16px 22px',
                      borderRadius: 9999,
                      border: 'none',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      width: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    Demander un devis
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                  </button>
                </div>
              </div>
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

// ─── SeminaireModal ───────────────────────────────────────────────────────────

const PACK_MODAL_INK = '#0c1d22';
const PACK_MODAL_ORANGE = '#ec6435';

export function SeminaireModal({ isOpen, onClose, seminaires, initialSeminaire, initialFormatId }: {
  isOpen: boolean; onClose: () => void; seminaires: Seminaire[];
  initialSeminaire: Seminaire | null; initialFormatId: string;
}) {
  const [step, setStep] = useState(1);
  const [closing, setClosing] = useState(false);
  const [submitting, setSubmit] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ prenom: '', nom: '', telephone: '', email: '', entreprise: '', participants: '' });
  const [selectedSeminaireId, setSelectedSeminaireId] = useState<string | null>(null);
  const [selectedFormatId, setSelectedFormatId] = useState<SeminaireFormatId>('journee');
  const [startDate, setStart] = useState('');
  const [endDate, setEnd] = useState('');
  const [period, setPeriod] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      setClosing(false); setStep(1); setError('');
      setForm({ prenom: '', nom: '', telephone: '', email: '', entreprise: '', participants: '' });
      setSelectedSeminaireId(null); setSelectedFormatId('journee');
      setStart(''); setEnd(''); setPeriod(''); setCalendarOpen(false);
      onClose();
    }, 280);
  };

  const selectedSeminaire = seminaires.find(s => s.id === selectedSeminaireId) ?? initialSeminaire ?? seminaires[0] ?? null;
  const selectedFormat    = selectedSeminaire && selectedFormatId in selectedSeminaire.formats ? selectedSeminaire.formats[selectedFormatId] : null;
  const formatLabel       = SEMINAIRE_FORMAT_LABELS[selectedFormatId] ?? selectedFormatId;
  const availableFormatIds = selectedSeminaire
    ? SEMINAIRE_FORMAT_IDS.filter(id => id in (selectedSeminaire.formats || {}))
    : SEMINAIRE_FORMAT_IDS.slice();

  const periodStr =
    startDate && endDate
      ? `${new Date(`${startDate}T00:00:00`).toLocaleDateString('fr-FR')} → ${new Date(`${endDate}T00:00:00`).toLocaleDateString('fr-FR')}`
      : period || '';

  const goNext = () => {
    setError('');
    if (step === 1) {
      if (!selectedFormatId) { setError('Choisissez un format.'); return; }
      if (!form.participants.trim()) { setError('Indiquez le nombre de personnes.'); return; }
      if (!periodStr) { setError('Indiquez des dates précises ou une période.'); return; }
      setStep(2);
      return;
    }
    if (step === 2) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
      if (!form.prenom.trim() || !form.nom.trim() || !form.telephone.trim() || !form.email.trim() || !emailOk || !form.entreprise.trim()) {
        setError('Renseignez nom, prénom, téléphone, e-mail et société.');
        return;
      }
      void handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setSubmit(true);
    const selectionLine = selectedSeminaire && selectedFormat
      ? `${selectedSeminaire.label} — ${formatLabel} (${selectedFormat.titre})`
      : formatLabel;
    try {
      const res = await fetch('/api/demande-seminaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify({
          seminaire_id: selectedSeminaireId ?? selectedSeminaire?.id ?? null,
          format_id: selectedFormatId,
          selection_label: selectionLine,
          offre_image_url: selectedSeminaire?.images?.[0] ?? selectedSeminaire?.image ?? null,
          offre_footer_image_url: selectedSeminaire?.images?.[2] ?? null,
          prenom: form.prenom.trim(),
          nom: form.nom.trim(),
          email: form.email.trim(),
          entreprise: form.entreprise.trim(),
          participants: form.participants.trim(),
          periode: periodStr || null,
          ville_depart: null,
          distance_max_h: null,
          hebergement: false,
          hebergement_type: null,
          transport: false,
          transport_type: null,
          activites: null,
          message: form.telephone.trim() ? `Téléphone : ${form.telephone.trim()}` : null,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
        message?: string;
      };

      if (!res.ok || !data.success) {
        throw new Error(data.error || data.message || 'Erreur lors de l\'envoi. Veuillez réessayer.');
      }

      trackGenerateLead('demande-seminaire');
      setStep(3);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setSubmit(false);
    }
  };

  if (!isOpen) return null;

  const visual =
    selectedSeminaire?.images?.[0]
    ?? selectedSeminaire?.image
    ?? PACK_ASSETS.hero;
  const progress = step >= 3 ? 1 : step / 2;

  const titleStyle: CSSProperties = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 1.25,
    letterSpacing: '-0.05em',
    color: PACK_MODAL_INK,
    margin: '0 0 12px',
  };
  const strong: CSSProperties = { fontWeight: 700 };
  const leadStyle: CSSProperties = {
    fontSize: 12,
    lineHeight: 1.45,
    letterSpacing: '-0.02em',
    color: PACK_MODAL_INK,
    margin: '0 0 16px',
  };
  const labelStyle: CSSProperties = {
    ...leadStyle,
    fontSize: 10.5,
    fontWeight: 600,
    margin: '0 0 7px',
  };

  return (
    <>
      <style>{`
        @keyframes packSemIn  { from { opacity:0; transform:translateY(16px) scale(.985) } to { opacity:1; transform:none } }
        @keyframes packSemOut { from { opacity:1; transform:none } to { opacity:0; transform:translateY(16px) scale(.985) } }
        @keyframes packSemFade { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:none } }
        @keyframes packSemSpin { to { transform:rotate(360deg) } }

        .pack-sem-scroll::-webkit-scrollbar { width:0 }
        .pack-sem-scroll { scrollbar-width:none }

        .pack-sem-input {
          width:100%; box-sizing:border-box; background:#fff;
          border:1px solid rgba(12,29,34,.14); border-radius:10px;
          padding:8px 11px; font-family:inherit; font-size:12px; color:${PACK_MODAL_INK};
          letter-spacing:-.02em; outline:none; transition:border-color .15s ease, box-shadow .15s ease;
        }
        .pack-sem-input:focus { border-color:${PACK_MODAL_INK}; box-shadow:0 0 0 2px rgba(12,29,34,.06) }
        .pack-sem-input::placeholder { color:#b3b3b3 }

        .pack-sem-opt {
          width:100%; box-sizing:border-box; background:#fff; cursor:pointer;
          border:1px solid rgba(12,29,34,.14); border-radius:10px;
          padding:9px 10px; font-family:inherit; font-size:11.5px; color:#8f8f8f;
          letter-spacing:-.02em; text-align:center; transition:all .15s ease;
        }
        .pack-sem-opt:hover { border-color:rgba(12,29,34,.35); color:${PACK_MODAL_INK} }
        .pack-sem-opt[data-active="true"] { background:${PACK_MODAL_INK}; border-color:${PACK_MODAL_INK}; color:#fff }

        .pack-sem-cta {
          border:none; border-radius:9999px; background:${PACK_MODAL_ORANGE}; color:#fff;
          font-family:inherit; font-size:12px; letter-spacing:-.02em; font-weight:500;
          padding:8px 20px; cursor:pointer; transition:background .18s ease;
          display:inline-flex; align-items:center; gap:7px;
        }
        .pack-sem-cta:hover { background:#d9552a }
        .pack-sem-cta:disabled { opacity:.65; cursor:not-allowed }

        .pack-sem-back {
          background:none; border:none; padding:0; cursor:pointer; font-family:inherit;
          font-size:11px; letter-spacing:-.02em; color:#a5a5a5; transition:color .15s ease;
        }
        .pack-sem-back:hover { color:${PACK_MODAL_INK} }

        .pack-sem-nav {
          width:20px; height:20px; border:none; border-radius:50%; background:rgba(12,29,34,.05);
          color:${PACK_MODAL_INK}; font-size:12px; line-height:1; cursor:pointer; font-family:inherit;
        }
        .pack-sem-nav:hover { background:rgba(12,29,34,.1) }

        .pack-sem-pill {
          background:#fff; cursor:pointer; white-space:nowrap;
          border:1px solid rgba(12,29,34,.14); border-radius:8px;
          padding:5px 10px; font-family:inherit; font-size:10.5px; color:${PACK_MODAL_INK};
          letter-spacing:-.02em; transition:all .15s ease;
        }
        .pack-sem-pill:hover { border-color:rgba(12,29,34,.35) }
        .pack-sem-pill[data-active="true"] { background:${PACK_MODAL_INK}; border-color:${PACK_MODAL_INK}; color:#fff }

        @media (max-width: 860px) {
          .pack-sem-wrapper { padding:0 !important }
          .pack-sem-panel { width:100% !important; max-width:none !important; height:100dvh !important; border-radius:0 !important; flex-direction:column !important }
          .pack-sem-visual { width:100% !important; height:100px !important; flex:0 0 100px !important }
          .pack-sem-content { padding:20px 18px 0 !important }
          .pack-sem-footer { padding:0 18px max(14px, env(safe-area-inset-bottom)) !important }
          .pack-sem-title { font-size:20px !important }
        }
      `}</style>

      <div
        onClick={handleClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(12,29,34,0.55)', backdropFilter: 'blur(6px)',
          opacity: closing ? 0 : 1, transition: 'opacity .24s ease',
        }}
      />

      <div
        className="pack-sem-wrapper"
        style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, pointerEvents: 'none' }}
      >
        <div
          className="pack-sem-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Demander un devis"
          onClick={e => e.stopPropagation()}
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            width: '100%', maxWidth: 820,
            height: 'min(520px, 90vh)',
            background: '#fff', borderRadius: 16, overflow: 'hidden',
            boxShadow: '0 20px 56px rgba(12,29,34,.24)',
            fontFamily: "'Poppins', sans-serif",
            animation: `${closing ? 'packSemOut' : 'packSemIn'} .28s cubic-bezier(.22,1,.36,1) both`,
          }}
        >
          <div
            className="pack-sem-visual relative"
            aria-hidden
            style={{
              flex: '0 0 30%', width: '30%',
            }}
          >
            {visual ? (
              <Image src={visual} alt="" fill sizes="30vw" className="object-cover" />
            ) : null}
          </div>

          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <button
              onClick={handleClose}
              aria-label="Fermer"
              style={{
                position: 'absolute', top: 12, right: 14, zIndex: 2,
                width: 26, height: 26, border: 'none', background: 'none', cursor: 'pointer',
                color: PACK_MODAL_INK, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M2 2 15 15M15 2 2 15" />
              </svg>
            </button>

            <div ref={scrollRef} className="pack-sem-scroll pack-sem-content" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '32px 28px 0' }}>
              <div key={step} style={{ animation: 'packSemFade .3s ease both' }}>
                {step === 1 && (
                  <>
                    <h2 className="pack-sem-title" style={titleStyle}>
                      Votre séminaire,{' '}
                      <strong style={strong}>{selectedSeminaire?.producteur ?? 'terroir'}</strong>
                      {' '}en quelques détails.
                    </h2>
                    <p style={leadStyle}>
                      Format, effectif et dates — on s&apos;occupe du reste.
                    </p>

                    <p style={labelStyle}>Quel format ?</p>
                    <div style={{ display: 'grid', gridTemplateColumns: availableFormatIds.length > 1 ? '1fr 1fr' : '1fr', gap: 8, marginBottom: 16 }}>
                      {availableFormatIds.map(id => (
                        <button
                          key={id}
                          type="button"
                          className="pack-sem-opt"
                          data-active={selectedFormatId === id}
                          onClick={() => { setSelectedFormatId(id); setError(''); }}
                        >
                          {SEMINAIRE_FORMAT_LABELS[id]}
                        </button>
                      ))}
                    </div>

                    <p style={labelStyle}>Combien de personnes ?</p>
                    <input
                      className="pack-sem-input"
                      style={{ maxWidth: 220, marginBottom: 16 }}
                      inputMode="numeric"
                      placeholder="Ex. 24"
                      value={form.participants}
                      onChange={e => { setForm({ ...form, participants: e.target.value }); setError(''); }}
                    />

                    <p style={labelStyle}>Quelles dates ?</p>
                    <button
                      type="button"
                      className="pack-sem-input"
                      onClick={() => setCalendarOpen(v => !v)}
                      style={{ maxWidth: 220, textAlign: 'left', cursor: 'pointer', color: startDate ? PACK_MODAL_INK : '#b3b3b3' }}
                    >
                      {startDate
                        ? `${fmtDayShort(startDate)}${endDate ? ` → ${fmtDayShort(endDate)}` : ' → …'}`
                        : 'Sélectionnez des dates précises'}
                    </button>
                    {calendarOpen && (
                      <MiniDateRangeCalendar
                        start={startDate}
                        end={endDate}
                        onStart={d => { setStart(d); setPeriod(''); setError(''); }}
                        onEnd={d => { setEnd(d); if (d) setCalendarOpen(false); }}
                        navClassName="pack-sem-nav"
                      />
                    )}

                    <p style={{ ...labelStyle, margin: '14px 0 7px' }}>
                      Ou bien, sélectionnez une période
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {SEMINAIRE_PERIODS.map(p => (
                        <button
                          key={p}
                          type="button"
                          className="pack-sem-pill"
                          data-active={period === p}
                          onClick={() => {
                            setPeriod(period === p ? '' : p);
                            setStart('');
                            setEnd('');
                            setCalendarOpen(false);
                            setError('');
                          }}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className="pack-sem-title" style={titleStyle}>
                      <strong style={strong}>Votre contact,</strong> pour revenir vers vous sous 48 heures.
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 9, maxWidth: 280 }}>
                      <input className="pack-sem-input" placeholder="Prénom" value={form.prenom} onChange={e => { setForm({ ...form, prenom: e.target.value }); setError(''); }} />
                      <input className="pack-sem-input" placeholder="Nom" value={form.nom} onChange={e => { setForm({ ...form, nom: e.target.value }); setError(''); }} />
                      <input className="pack-sem-input" type="tel" placeholder="Téléphone" value={form.telephone} onChange={e => { setForm({ ...form, telephone: e.target.value }); setError(''); }} />
                      <input className="pack-sem-input" type="email" placeholder="E-mail" value={form.email} onChange={e => { setForm({ ...form, email: e.target.value }); setError(''); }} />
                      <input className="pack-sem-input" placeholder="Nom de la société" value={form.entreprise} onChange={e => { setForm({ ...form, entreprise: e.target.value }); setError(''); }} />
                    </div>
                  </>
                )}

                {step === 3 && (
                  <div style={{ paddingTop: 28 }}>
                    <h2 className="pack-sem-title" style={{ ...titleStyle, marginBottom: 18 }}>
                      <strong style={strong}>Merci beaucoup !</strong>
                    </h2>
                    <p className="pack-sem-title" style={{ ...titleStyle, margin: 0 }}>
                      On revient vers vous <strong style={strong}>au plus vite.</strong>
                    </p>
                    <p style={{ ...leadStyle, fontSize: 12, textAlign: 'center', margin: '18px 0 0' }}>L&apos;équipe TERRAGO</p>
                  </div>
                )}
              </div>
              <div style={{ height: 16 }} />
            </div>

            <div className="pack-sem-footer" style={{ flexShrink: 0, padding: '0 28px 18px' }}>
              {error && (
                <p style={{ fontSize: 10.5, color: PACK_MODAL_ORANGE, textAlign: 'center', margin: '0 0 8px', letterSpacing: '-.02em' }}>{error}</p>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: 36 }}>
                {step === 2 && (
                  <button type="button" className="pack-sem-back" onClick={() => { setError(''); setStep(1); }} style={{ position: 'absolute', left: 0 }}>
                    ← Retour
                  </button>
                )}
                <button type="button" className="pack-sem-cta" onClick={step === 3 ? handleClose : goNext} disabled={submitting}>
                  {submitting && (
                    <span style={{ width: 12, height: 12, border: '2px solid rgba(255,255,255,.35)', borderTopColor: '#fff', borderRadius: '50%', animation: 'packSemSpin .7s linear infinite' }} />
                  )}
                  {step === 3 ? 'Terminé' : submitting ? 'Envoi…' : 'Suivant'}
                </button>
              </div>

              <div style={{ height: 2, marginTop: 12 }}>
                {step < 3 && (
                  <div style={{ height: '100%', width: `${progress * 100}%`, borderRadius: 9999, background: PACK_MODAL_ORANGE, transition: 'width .35s cubic-bezier(.22,1,.36,1)' }} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────

export default function SeminairesPage({ initialSeminaires }: { initialSeminaires: Seminaire[] }) {
  const router = useRouter();
  const { openModal } = useModal();
  const [seminaires,    setSeminaires]    = useState<Seminaire[]>(initialSeminaires);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSem, setModalSem] = useState<Seminaire | null>(null);
  /** Affiché dès le clic vers une offre (avant que Next n’affiche la page détail). */
  const [detailNavPending, setDetailNavPending] = useState(false);
  const [mounted, setMounted] = useState(false);
  const catalogueRef = useRef<HTMLElement>(null);
  const catalogueInnerRef = useRef<HTMLDivElement>(null);
  const thirdRowRef = useRef<HTMLDivElement>(null);
  const fifthRowRef = useRef<HTMLDivElement>(null);
  const [leftPictoTop, setLeftPictoTop] = useState<number | null>(null);
  const [moutonPos, setMoutonPos] = useState<{ top: number; right: number } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = seminaires;

  useEffect(() => {
    const section = catalogueRef.current;
    if (!section) {
      setLeftPictoTop(null);
      setMoutonPos(null);
      return;
    }

    const update = () => {
      const sectionRect = section.getBoundingClientRect();
      const third = thirdRowRef.current;
      const fifth = fifthRowRef.current;
      const inner = catalogueInnerRef.current;
      if (third) {
        const r = third.getBoundingClientRect();
        setLeftPictoTop(r.top - sectionRect.top + r.height / 2);
      } else {
        setLeftPictoTop(null);
      }
      if (fifth && inner) {
        const r = fifth.getBoundingClientRect();
        const innerRect = inner.getBoundingClientRect();
        const gutter = Math.max(0, window.innerWidth - innerRect.right);
        // Centre le picto dans l’espace entre la grille et le bord droit
        const pictoHalf = window.innerWidth >= 1280 ? 120 : 104;
        setMoutonPos({
          top: r.top - sectionRect.top + r.height / 2,
          right: Math.max(20, gutter / 2 - pictoHalf),
        });
      } else {
        setMoutonPos(null);
      }
    };
    update();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    ro?.observe(section);
    window.addEventListener('resize', update);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [filtered.length]);

  const openDevis = (s: Seminaire) => { setModalSem(s); setModalOpen(true); };
  const navigateToSlug = (s: Seminaire) => {
    setDetailNavPending(true);
    // Laisser peindre l’overlay avant la navigation (sinon flash invisible).
    requestAnimationFrame(() => {
      router.push(`/seminaire-exemples/${s.slug}`);
    });
  };


  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {mounted &&
        detailNavPending &&
        createPortal(<SeminaireDetailLoading variant="overlay" />, document.body)}
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
        .terrago-popup .mapboxgl-popup-content { border-radius:26px !important; padding:12px 14px !important; box-shadow:0 4px 20px rgba(12,29,34,0.12) !important; border:1px solid rgba(12,29,34,0.08) !important; font-family:inherit !important; }
        .terrago-popup .mapboxgl-popup-tip { display:none !important; }
        .fmt-tab { flex:1; padding:10px 18px; border-radius:9999px; border:none; font-family:inherit; font-size:10px; font-weight:700; letter-spacing:0.06em; cursor:pointer; transition:all 0.18s ease; white-space:nowrap; text-transform:uppercase; }
        .sem-grid       { display:grid; grid-template-columns:repeat(2, 1fr); gap:20px; align-items:stretch; }
        .sem-grid > div { min-width:0; display:flex; }
        .sem-pack-card { flex:1; width:100%; min-height:0; display:flex; flex-direction:column; }
        .sem-pack-card-visual { position:relative; width:100%; flex-shrink:0; aspect-ratio:16/9; overflow:hidden; }
        .sem-pack-card-body { flex:1; display:flex; flex-direction:column; min-height:0; padding:16px 20px 18px; }
        .sem-pack-card-sub { margin-bottom:8px !important; }
        .sem-pack-card-row { margin-top:auto; }
        .sem-detail-cols { display:grid; grid-template-columns:1fr 440px; gap:48px; align-items:start; }
        .sem-format-tabs { display:flex; gap:0; background:rgba(12,29,34,0.05); border-radius:9999px; padding:6px; margin-left:auto; flex-shrink:0; }
        .sem-mobile-carousel { display:none; }
        .sem-photo-grid { display:grid; gap:8px; border-radius:26px; overflow:hidden; margin-bottom:40px; position:relative; }
        .sem-photo-grid.has-small { grid-template-columns:1fr 1fr; grid-template-rows:repeat(2,clamp(160px,18vw,220px)); }
        .sem-photo-grid.no-small  { grid-template-columns:1fr; grid-template-rows:clamp(300px,36vw,440px); }
        .sem-photo-main { cursor:pointer; overflow:hidden; }
        .sem-photo-grid.has-small .sem-photo-main { grid-row:1/3; }
        .sem-price-col { position:sticky; top:96px; align-self:start; }
        @media (max-width:900px)  { .sem-grid { gap:20px; } }
        @media (max-width:768px)  {
          .sem-grid { grid-template-columns:1fr; gap:20px; }
          .sem-detail-cols { grid-template-columns:1fr; gap:24px; }
          .sem-price-col { position:static; }
          .sem-format-tabs { display:none; }
          .sem-mobile-carousel { display:block; position:relative; width:100vw; left:50%; transform:translateX(-50%); height:55vh; overflow:hidden; margin-bottom:28px; }
          .sem-photo-grid-desktop { display:none !important; }
          .sem-detail-title { display:none; }
          .sem-pack-card-visual { aspect-ratio:16/9; }
          .sem-pack-card-body { padding:16px 20px 18px; }
        }
        @media (max-width:600px)  {
          .sem-photo-grid.has-small { grid-template-columns:1fr; grid-template-rows:clamp(200px,60vw,300px) clamp(120px,32vw,180px) clamp(120px,32vw,180px); }
          .sem-photo-grid.has-small .sem-photo-main { grid-row:auto; }
          .sem-photo-grid.no-small  { grid-template-rows:clamp(220px,65vw,340px); }
        }
      `}</style>

      <SeminaireModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        seminaires={seminaires}
        initialSeminaire={modalSem ?? (filtered[0] || null)}
        initialFormatId={modalSem ? primaryFormatIdForSeminaire(modalSem) : 'journee'}
      />

      {/* ── HERO encadré (DA Séminaires / Particuliers) ── */}
      <section className="relative w-full bg-white pt-[calc(7.5rem+env(safe-area-inset-top))] sm:pt-[calc(9rem+env(safe-area-inset-top))] lg:pt-[calc(10.5rem+env(safe-area-inset-top))]">
        <div className="relative mx-auto max-w-6xl px-5 pb-2 sm:px-8">
          <div
            className={`relative ${homeFramedHeroAspectClass}`}
            style={{ borderRadius: HOME_RADIUS }}
          >
            <FramedHeroImage
              src={PACK_ASSETS.hero}
              alt="Séminaire TerraGo chez un producteur"
            />
            <div className={`${bottomImageGradientClass} z-[1]`} />
            <div
              className="absolute inset-0 z-[2]"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.5) 100%)',
              }}
            />
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 pb-8 pt-10 text-center sm:px-10 sm:pb-10 sm:pt-16 lg:pt-20">
              <h1 className="max-w-3xl text-center font-sans text-[clamp(1.75rem,5.2vw,3.75rem)] font-normal leading-[1.02] tracking-[-0.075em] text-white">
                Nos exemples de
                <br />
                <span className="font-bold">séminaire d&apos;entreprise.</span>
              </h1>
              <h2 className="mt-4 max-w-xl text-center font-sans text-[15px] font-normal leading-relaxed tracking-[-0.04em] text-white/90 sm:mt-6 sm:text-[17px]">
                Des formules concrètes chez des producteurs — à la journée ou en résidentiel.
              </h2>
              <div className="mt-7 flex flex-col items-center gap-3 sm:mt-9 sm:flex-row sm:gap-4">
                <a
                  href="#exemples"
                  className={homeHeroOutlineButtonClass}
                  style={{ background: 'rgba(12, 29, 34, 0.12)' }}
                >
                  Explorer les exemples
                </a>
                <Link
                  href="/notre-approche"
                  className="inline-flex items-center justify-center rounded-full border-2 border-white bg-white px-5 py-1.5 text-xs font-bold tracking-[0.04em] text-[#0c1d22] transition-colors hover:border-[#ec6435] hover:bg-white/90 sm:px-8 sm:py-2 sm:text-sm"
                >
                  Découvrir notre approche
                </Link>
              </div>
            </div>
          </div>

          {/* Sticker producteur — déborde en bas à droite, comme la montagne Home/étapes */}
          <Image
            src={PACK_ASSETS.producteurSoutenu}
            alt="+1 producteur soutenu"
            width={200}
            height={200}
            className="pointer-events-none absolute bottom-0 right-5 z-30 h-32 w-auto translate-x-[18%] translate-y-[55%] rotate-[6deg] object-contain drop-shadow-md sm:right-8 sm:h-40 lg:right-12 lg:h-48"
          />
        </div>
      </section>

      {/* ── CATALOGUE ── */}
      <section
        id="exemples"
        ref={catalogueRef}
        className="relative scroll-mt-28"
        style={{ paddingTop: homeSectionPadding, paddingBottom: homeSectionPadding, background: '#ffffff' }}
      >
        {/* S orange — bordure droite, hauteur du titre catalogue */}
        <Image
          src={PACK_ASSETS.sOrange}
          alt=""
          aria-hidden
          width={260}
          height={260}
          className="pointer-events-none absolute right-0 z-0 hidden h-[200px] w-[200px] translate-x-[30%] -translate-y-[20%] object-contain opacity-90 lg:block xl:h-[260px] xl:w-[260px]"
          style={{ top: 0 }}
        />
        {/* S orange — bordure gauche, aligné sur la 3ᵉ ligne de cards */}
        {leftPictoTop != null && (
          <Image
            src={PACK_ASSETS.sOrange}
            alt=""
            aria-hidden
            width={260}
            height={260}
            className="pointer-events-none absolute left-0 z-0 hidden h-[200px] w-[200px] -translate-x-[30%] -translate-y-1/2 object-contain opacity-90 lg:block xl:h-[260px] xl:w-[260px]"
            style={{ top: leftPictoTop }}
          />
        )}
        {/* Mouton — à droite de la 5ᵉ ligne, centré entre cards et bord */}
        {moutonPos != null && (
          <Image
            src={PACK_ASSETS.mouton}
            alt=""
            aria-hidden
            width={240}
            height={240}
            className="pointer-events-none absolute z-20 hidden h-36 w-36 -translate-y-1/2 object-contain sm:h-44 sm:w-44 lg:block lg:h-52 lg:w-52 xl:h-60 xl:w-60"
            style={{ top: moutonPos.top, right: moutonPos.right }}
          />
        )}

        <div ref={catalogueInnerRef} className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-8 max-w-4xl sm:mb-10">
            <h2 className={sectionTitleClass}>
              Choisissez l&apos;expérience
              <br />
              <span className="font-bold">qui vous inspire.</span>
            </h2>
            <p className="mt-4 font-sans text-[14px] font-normal leading-[1.7] tracking-[-0.04em] text-[#0c1d22]/65 sm:whitespace-nowrap sm:text-[15px]">
              Séminaire à la journée ou résidentiel — découvrez nos formules chez des producteurs engagés.
            </p>
          </div>

          {filtered.length === 0 ? (
            <div
              style={{
                background: HOME_COLORS.gray,
                borderRadius: HOME_RADIUS,
                border: '1px solid rgba(12,29,34,0.08)',
                padding: '2.5rem 2rem',
                textAlign: 'center',
              }}
            >
              <h3
                className="font-sans text-[22px] font-bold tracking-[-0.04em]"
                style={{ color: HOME_COLORS.primary, margin: '0 0 8px' }}
              >
                Aucun exemple pour le moment
              </h3>
              <p style={{ color: 'rgba(12,29,34,0.55)', fontSize: 14, margin: 0, lineHeight: 1.6 }}>
                Les formules seront bientôt disponibles.
              </p>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                style={{
                  marginTop: 20,
                  background: HOME_COLORS.primary,
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  padding: '10px 20px',
                  borderRadius: 9999,
                  border: 'none',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Demander un devis
              </button>
            </div>
          ) : (
            <div className="sem-grid">
              {filtered.map((s, i) => (
                <div
                  key={s.id}
                  data-id={s.id}
                  ref={
                    i === 4 ? thirdRowRef : i === 8 ? fifthRowRef : undefined
                  }
                >
                  <SeminaireCard
                    s={s}
                    isActive={activeId === s.id}
                    onSelect={() => {
                      setActiveId(s.id);
                      navigateToSlug(s);
                    }}
                    onDevis={() => openDevis(s)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="relative"
        style={{
          paddingTop: 'clamp(0.75rem, 1.5vw, 1.25rem)',
          paddingBottom: homeSectionPadding,
          background: '#ffffff',
        }}
      >
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <div className="relative">
            {/* Branche — déborde en bas à droite du cadre CTA */}
            <Image
              src={PACK_ASSETS.branche}
              alt=""
              aria-hidden
              width={208}
              height={208}
              className="pointer-events-none absolute bottom-0 right-0 z-30 h-32 w-32 translate-x-[22%] translate-y-[48%] rotate-[8deg] object-contain drop-shadow-md sm:h-40 sm:w-40 lg:h-52 lg:w-52"
            />

            <div
              className="relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-14 lg:py-16"
              style={{ background: HOME_COLORS.primary, borderRadius: HOME_RADIUS }}
            >
              <h2 className="mx-auto max-w-2xl font-sans text-[34px] font-normal leading-[1.08] tracking-[-0.075em] text-white sm:text-[40px] lg:text-[48px]">
                Votre projet ne rentre pas <span className="font-bold">dans une case&nbsp;?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-[14px] font-normal leading-[1.7] tracking-[-0.04em] text-white/80 sm:mt-5 sm:text-[15px]">
                Groupe de 5 à 200+ — on construit avec vous un séminaire sur mesure, à la rencontre d&apos;un ou plusieurs producteurs.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                <button
                  type="button"
                  onClick={() => openModal()}
                  className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-white px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.07em] text-[#0c1d22] transition-colors hover:bg-[#ec6435] hover:text-white sm:min-w-[220px] sm:px-8 sm:py-2.5 sm:text-[12px]"
                >
                  Parlons de votre projet
                </button>
                <Link
                  href="/partenaires"
                  className="inline-flex min-w-[180px] items-center justify-center rounded-full border-2 border-white px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.07em] text-white transition-colors hover:bg-white/15 sm:min-w-[220px] sm:px-8 sm:py-2.5 sm:text-[12px]"
                >
                  Voir nos producteurs partenaires
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
