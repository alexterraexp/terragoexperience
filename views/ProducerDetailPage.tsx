'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '../lib/supabase';
import {
  type ProducerFull,
  type SupabaseProducerRow,
  mapSupabaseRowToFull,
} from '../lib/producerTypes';
import { fetchSeminaires } from '../lib/seminaires';
import type { Seminaire } from '../lib/seminaires';

const SectionAccordion: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ borderTop: '1px solid rgba(30,41,26,0.08)', paddingTop: 14, marginBottom: 40 }}>
      <button
        type="button"
        onClick={() => setExpanded(v => !v)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 14px', fontFamily: 'inherit' }}
      >
        <span style={{ fontSize: 22, fontWeight: 700, color: '#1e291a', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>{title}</span>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', background: 'rgba(30,41,26,0.05)', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', flexShrink: 0 }}>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2.5 5L7 9.5L11.5 5" stroke="#b0a89e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </button>
      <div style={{ maxHeight: expanded ? '2000px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
        {children}
      </div>
    </div>
  );
};

const FORMATS_ORDER = ['1jour', '2jours', 'mesure'];
const FORMATS_LABELS: Record<string, string> = {
  '1jour': '1 journée',
  '2jours': '2 jours',
  'mesure': 'Sur mesure',
};

const AMENITY_LABELS: Record<string, { label: string; emoji: string }> = {
  atelier:             { label: 'Atelier terroir',        emoji: '🌱' },
  repas:               { label: 'Repas convivial',         emoji: '🍽️' },
  visite_degustation:  { label: 'Visite & dégustation',   emoji: '🗣️' },
  salle_reunion:       { label: 'Salle de réunion',        emoji: '📋' },
  wifi:                { label: 'WiFi',                    emoji: '📶' },
  hebergement:         { label: 'Hébergement',             emoji: '🏠' },
  activites_sportives: { label: 'Activités sportives',    emoji: '🚴' },
  teambuilding:        { label: 'Team-building',           emoji: '👥' },
  soiree_theme:        { label: 'Soirée à thème',          emoji: '🎉' },
};

const ProducerDetailPage: React.FC = () => {
  const params = useParams();
  const producerId = params.producerId as string;
  const router = useRouter();
  const [producer, setProducer] = useState<ProducerFull | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImg, setActiveImg] = useState<number | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Séminaire associé
  const [matchingSeminaire, setMatchingSeminaire] = useState<Seminaire | null>(null);
  const [activeSemFormat, setActiveSemFormat] = useState<string>('1jour');

  // Formulaire contact producteur
  const [contactNom, setContactNom] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactParticipants, setContactParticipants] = useState('');
  const [contactDates, setContactDates] = useState('');
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!producer) return;
    setContactError(null);

    if (!contactNom.trim() || !contactEmail.trim()) {
      setContactError('Merci de renseigner au minimum votre nom et votre email.');
      return;
    }

    setContactSubmitting(true);
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          action: 'producteur_fiche',
          producerName: producer.name,
          producerLocation: producer.location,
          nom: contactNom.trim(),
          email: contactEmail.trim(),
          participants: contactParticipants.trim(),
          dates: contactDates.trim(),
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (response.ok && data.success) {
        setContactSuccess(true);
        setContactNom('');
        setContactEmail('');
        setContactParticipants('');
        setContactDates('');
      } else {
        setContactError(data.message || "Une erreur est survenue lors de l'envoi. Merci de réessayer.");
      }
    } catch {
      setContactError("Une erreur est survenue lors de l'envoi. Merci de réessayer.");
    } finally {
      setContactSubmitting(false);
    }
  };

  useEffect(() => {
    if (!producerId) { setProducer(null); setLoading(false); return; }
    let cancelled = false;
    async function fetchProducer() {
      setLoading(true); setError(null);
      try {
        const { data, error: err } = await supabase
          .from('producers_full').select('*').eq('id', producerId).maybeSingle();
        if (cancelled) return;
        if (err) { setError(err.message); setProducer(null); }
        else { setProducer(data ? mapSupabaseRowToFull(data as SupabaseProducerRow) : null); }
      } catch (e) {
        if (!cancelled) { setError(e instanceof Error ? e.message : 'Erreur chargement'); setProducer(null); }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchProducer();
    return () => { cancelled = true; };
  }, [producerId]);

  // Fetch du séminaire associé — match direct par seminaire_id
  useEffect(() => {
    if (!producer?.seminaire_id) return;
    fetchSeminaires().then(sems => {
      const found = sems.find(s => s.id === producer.seminaire_id);
      if (found) {
        setMatchingSeminaire(found);
        const preferred = ['1jour', '2jours', 'mesure'].find(f => f in found.formats)
          ?? Object.keys(found.formats)[0];
        if (preferred) setActiveSemFormat(preferred);
      }
    });
  }, [producer]);

  if (loading || !producer) return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: '#faf8f5', minHeight: '100vh' }}>
      <div style={{ height: 500, background: 'linear-gradient(135deg, #1e291a, #2d4a2d)', animation: 'pulse 1.5s ease-in-out infinite' }} />
    </div>
  );

  if (error) return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: '#faf8f5', minHeight: '100vh', paddingTop: 120, textAlign: 'center' }}>
      <p style={{ fontSize: 18, color: '#b91c1c', marginBottom: 24 }}>{error}</p>
      <button type="button" onClick={() => router.push('/partenaires')} style={{ background: '#1e291a', color: '#fff', padding: '12px 24px', borderRadius: 12, fontWeight: 600, border: 'none', cursor: 'pointer' }}>← Retour</button>
    </div>
  );

  if (!producer) return null;

  // Images pour la grille photo
  // gallery = s.images (tableau complet depuis seminaires), cover = s.images[1] déjà inclus
  const allImages = producer.gallery.length > 0
    ? producer.gallery
    : producer.cover ? [producer.cover] : [];
  const mainImage = allImages[0] ?? '';
  const smallImages = allImages.slice(1, 3);
  const hasSmall = smallImages.length > 0;

  // Format séminaire actif
  const semFmt = matchingSeminaire
    ? (matchingSeminaire.formats[activeSemFormat] ?? Object.values(matchingSeminaire.formats)[0])
    : null;

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: '#faf8f5', minHeight: '100vh' }}>

      <style>{`
        .prod-photo-grid {
          display: grid; gap: 8px; border-radius: 16px;
          overflow: hidden; margin-bottom: 40px; position: relative;
        }
        .prod-photo-grid.has-small {
          grid-template-columns: 1fr 1fr;
          grid-template-rows: repeat(2, clamp(160px, 18vw, 240px));
        }
        .prod-photo-grid.no-small {
          grid-template-columns: 1fr;
          grid-template-rows: clamp(300px, 36vw, 460px);
        }
        .prod-photo-main { cursor: pointer; overflow: hidden; }
        .prod-photo-grid.has-small .prod-photo-main { grid-row: 1 / 3; }
        @media (max-width: 600px) {
          .prod-photo-grid.has-small {
            grid-template-columns: 1fr;
            grid-template-rows: clamp(200px, 60vw, 300px) clamp(120px, 32vw, 180px) clamp(120px, 32vw, 180px);
          }
          .prod-photo-grid.has-small .prod-photo-main { grid-row: auto; }
          .prod-photo-grid.no-small { grid-template-rows: clamp(220px, 65vw, 340px); }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'calc(84px + 2rem) clamp(1rem, 3vw, 2rem) 80px', boxSizing: 'border-box' }}>

        {/* Bouton retour */}
        <button
          type="button"
          onClick={() => router.push('/partenaires')}
          style={{ marginBottom: 28, background: 'none', border: 'none', color: '#9ca3af', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit', padding: 0 }}
        >
          ← Tous les producteurs
        </button>

        {/* En-tête producteur */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            <span style={{ background: '#f78d00', color: '#fff', fontSize: 10, fontWeight: 700, padding: '4px 12px', borderRadius: 20, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {producer.type}
            </span>
            {producer.heroBadge && (
              <span style={{ background: 'rgba(30,41,26,0.07)', color: '#1e291a', fontSize: 10, fontWeight: 600, padding: '4px 12px', borderRadius: 20, border: '1px solid rgba(30,41,26,0.1)' }}>
                {producer.heroBadge}
              </span>
            )}
          </div>
          <h1 style={{ color: '#1e291a', fontSize: isMobile ? 26 : 40, fontWeight: 700, fontStyle: 'italic', margin: '0 0 10px', lineHeight: 1.15 }}>
            {producer.name}
          </h1>
          <p style={{ color: '#9ca3af', fontSize: 13, margin: 0 }}>📍 {producer.location} · par {producer.owner}</p>
        </div>

        {/* Grille de photos style Airbnb */}
        <div className={`prod-photo-grid ${hasSmall ? 'has-small' : 'no-small'}`}>
          <div onClick={() => setActiveImg(0)} className="prod-photo-main">
            <img
              src={mainImage}
              alt={producer.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
          </div>
          {smallImages.map((img, i) => (
            <div
              key={i}
              onClick={() => setActiveImg(i + 1)}
              style={{ cursor: 'pointer', overflow: 'hidden' }}
            >
              <img
                src={img}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </div>
          ))}
          {allImages.length > 1 && (
            <button
              onClick={() => setActiveImg(0)}
              style={{ position: 'absolute', bottom: 14, right: 14, background: '#fff', border: '1.5px solid rgba(0,0,0,0.15)', borderRadius: 9999, padding: '8px 16px', fontSize: 12, fontWeight: 700, color: '#1e291a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', fontFamily: 'inherit' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
              </svg>
              Afficher toutes les photos
            </button>
          )}
        </div>

        {/* Contenu principal */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 440px', gap: isMobile ? 24 : 48, alignItems: 'start' }}>

          {/* COLONNE GAUCHE */}
          <div>

            {/* À propos */}
            <section style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e291a', fontStyle: 'italic', marginBottom: 14 }}>À propos</h2>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.8, marginBottom: 16 }}>{producer.description}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {producer.tags.map((tag) => (
                  <span key={tag} style={{ background: 'rgba(247,141,0,0.10)', color: '#f78d00', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 20 }}>{tag}</span>
                ))}
              </div>
            </section>

            {/* Expériences proposées */}
            <SectionAccordion title="Expériences proposées">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {producer.experiences.map((exp) => (
                  <div key={exp.id} style={{ background: '#fff', borderRadius: 16, padding: '18px 20px', border: '1px solid #f0ebe4', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: '#f5f0ea', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{exp.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4 }}>
                        <h3 style={{ fontSize: 12, fontFamily: 'poppins', fontWeight: 600, color: '#1e291a', margin: 0 }}>{exp.title}</h3>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#f78d00' }}>{exp.price}</span>
                      </div>
                      <p style={{ fontSize: 11, color: '#9ca3af', margin: '3px 0 5px' }}>{exp.duration}</p>
                      <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionAccordion>

          </div>

          {/* COLONNE DROITE — encart séminaire sticky */}
          <div style={{ position: isMobile ? 'static' : 'sticky', top: 96, alignSelf: 'start' }}>
            {matchingSeminaire && semFmt ? (
              <div style={{ background: '#fff', borderRadius: 20, border: '1px solid rgba(26,46,26,0.1)', boxShadow: '0 4px 28px rgba(26,46,26,0.09)', overflow: 'hidden' }}>

                {/* En-tête */}
                <div style={{ padding: '20px 24px 0' }}>
                  <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', marginBottom: 6 }}>Votre séminaire</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#1e291a', lineHeight: 1.2, marginBottom: 4, fontFamily: "'Poppins', sans-serif" }}>
                    {semFmt.titre}
                  </div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 16 }}>{producer.owner}</div>

                  {/* Format tabs */}
                  {Object.keys(matchingSeminaire.formats).length > 1 && (
                    <div style={{ display: 'flex', gap: 0, background: 'rgba(26,46,26,0.05)', borderRadius: 9999, padding: '5px', marginBottom: 16 }}>
                      {FORMATS_ORDER.filter(fKey => fKey in matchingSeminaire.formats).map(fKey => {
                        const active = activeSemFormat === fKey;
                        return (
                          <button key={fKey} onClick={() => setActiveSemFormat(fKey)}
                            style={{ flex: 1, padding: '9px 12px', borderRadius: 9999, border: 'none', fontFamily: 'inherit', fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', cursor: 'pointer', textTransform: 'uppercase' as const, background: active ? '#fff' : 'transparent', color: active ? '#1e291a' : '#9ca3af', boxShadow: active ? '0 1px 4px rgba(26,46,26,0.10)' : 'none', transition: 'all 0.18s ease', whiteSpace: 'nowrap' as const, textAlign: 'center' as const }}>
                            {FORMATS_LABELS[fKey] ?? fKey}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div style={{ padding: '0 24px 24px' }}>

                  {/* Titre format */}
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1e291a', marginBottom: 2 }}>{semFmt.titre}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 16 }}>{semFmt.sous_titre}</div>

                  {/* Durée + participants */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#7a7060' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {semFmt.duree}
                    </span>
                    <span style={{ color: '#c9c0b6', fontSize: 12 }}>·</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#7a7060' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      {semFmt.participants}
                    </span>
                  </div>

                  {/* Inclus */}
                  {semFmt.inclus.length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#b0a89e', marginBottom: 10 }}>Inclus dans l&apos;offre</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px' }}>
                        {semFmt.inclus.map(key => {
                          const amenity = AMENITY_LABELS[key];
                          if (!amenity) return null;
                          return (
                            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                              <span style={{ fontSize: 14 }}>{amenity.emoji}</span>
                              <span style={{ fontSize: 12, color: '#374151', fontWeight: 500 }}>{amenity.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Séparateur */}
                  <div style={{ borderTop: '1px solid rgba(26,46,26,0.08)', margin: '16px 0' }} />

                  {/* Tarif — identique pour chaque format (1j / 2j / sur mesure) */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#b0a89e', marginBottom: 4 }}>Tarif sur demande</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#1e291a' }}>Devis personnalisé</div>
                  </div>

                  {/* CTA */}
                  <a
                    href={`/seminaires-entreprise/offres/${matchingSeminaire.slug}`}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%', background: '#1a2e1a', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', padding: '14px', borderRadius: 9999, textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'none', boxSizing: 'border-box' as const, transition: 'background 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f78d00')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#1a2e1a')}
                  >
                    Voir l&apos;offre complète
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                  </a>
                  <div style={{ fontSize: 12, color: '#7a7060', textAlign: 'center', marginTop: 10 }}>Devis gratuit · Réponse 48h</div>
                </div>
              </div>
            ) : null}
          </div>

        </div>
      </div>

      {/* Lightbox */}
      {activeImg !== null && (
        <div
          onClick={() => setActiveImg(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setActiveImg((activeImg - 1 + allImages.length) % allImages.length); }}
            style={{ position: 'absolute', left: isMobile ? 10 : 24, background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: '50%', width: 44, height: 44, fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >‹</button>
          <img
            src={allImages[activeImg]}
            alt=""
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: isMobile ? '85vw' : '80vw', maxHeight: '85vh', borderRadius: 12, objectFit: 'contain' }}
          />
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setActiveImg((activeImg + 1) % allImages.length); }}
            style={{ position: 'absolute', right: isMobile ? 10 : 24, background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: '50%', width: 44, height: 44, fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >›</button>
          <button
            type="button"
            onClick={() => setActiveImg(null)}
            style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: '50%', width: 36, height: 36, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >×</button>
          <div style={{ position: 'absolute', bottom: 20, color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>
            {activeImg + 1} / {allImages.length}
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {contactOpen && (
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement>) => { if (e.target === e.currentTarget) setContactOpen(false); }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(30,41,26,0.6)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
        >
          <div style={{ background: '#fff', borderRadius: 24, padding: isMobile ? '28px 20px' : '36px', maxWidth: 440, width: '100%', boxShadow: '0 40px 100px rgba(30,41,26,0.3)' }}>
            <h3 style={{ fontSize: 17, fontWeight: 600, fontStyle: 'italic', fontFamily: "'Poppins', sans-serif", color: '#1e291a', marginBottom: 20 }}>
              Vivez une expérience unique chez {producer.owner} à {producer.location}.
            </h3>

            {contactSuccess ? (
              <div style={{ textAlign: 'center', padding: '8px 4px 0' }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#1e291a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontSize: 20 }}>✓</div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#1e291a', marginBottom: 4 }}>Merci !</p>
                <p style={{ fontSize: 11, color: '#6b7280', margin: 0 }}>Votre demande a bien été envoyée. Nous revenons vers vous sous 24h.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit}>
                {[
                  { label: 'Votre nom', name: 'nom', type: 'text', placeholder: 'Jean Dupont' },
                  { label: 'Email', name: 'email', type: 'email', placeholder: 'jean@entreprise.fr' },
                  { label: 'Nombre de participants', name: 'participants', type: 'number', placeholder: 'ex: 20' },
                  { label: 'Dates souhaitées', name: 'dates', type: 'text', placeholder: 'ex : 12–13 juin, ou semaine du 7 octobre' },
                ].map((field) => (
                  <div key={field.label} style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={
                        field.name === 'nom' ? contactNom
                          : field.name === 'email' ? contactEmail
                          : field.name === 'participants' ? contactParticipants
                          : contactDates
                      }
                      onChange={(e) => {
                        const v = e.target.value;
                        if (field.name === 'nom') setContactNom(v);
                        else if (field.name === 'email') setContactEmail(v);
                        else if (field.name === 'participants') setContactParticipants(v);
                        else setContactDates(v);
                      }}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #e5e0d8', fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                ))}

                {contactError && (
                  <p style={{ fontSize: 11, color: '#b91c1c', marginBottom: 8 }}>{contactError}</p>
                )}

                <button
                  type="submit"
                  disabled={contactSubmitting}
                  onMouseOver={e => (e.currentTarget.style.background = '#f78d00')}
                  onMouseOut={e => (e.currentTarget.style.background = '#1e291a')}
                  style={{ width: '100%', background: '#2b3624', color: '#fff', border: 'none', borderRadius: 12, padding: '13px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: contactSubmitting ? 'default' : 'pointer', fontFamily: 'inherit', marginTop: 8, transition: 'background 0.2s', opacity: contactSubmitting ? 0.8 : 1 }}
                >
                  {contactSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                </button>
              </form>
            )}

            <button type="button" onClick={() => setContactOpen(false)} style={{ width: '100%', background: 'none', border: 'none', color: '#9ca3af', fontSize: 12, marginTop: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
              Retour
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProducerDetailPage;
