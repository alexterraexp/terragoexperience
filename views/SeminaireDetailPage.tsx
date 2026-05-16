'use client';

import React, { useState, useEffect } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { fetchSeminaires } from '../lib/seminaires';
import type { Seminaire } from '../lib/seminaires';
import { ExpandedSeminaireView, SeminaireModal } from './Seminaires-pack';

// ─── Page détail d'un séminaire ───────────────────────────────────────────────

export default function SeminaireDetailPage() {
  const params = useParams();
  const pathname = usePathname();
  const slug = params.slug as string;
  const router = useRouter();
  const offresListPath =
    pathname?.includes('/seminaires/offres/') ? '/seminaires/offres' : '/seminaires-entreprise/offres';
  const [seminaire, setSeminaire] = useState<Seminaire | null>(null);
  const [allSeminaires, setAllSeminaires] = useState<Seminaire[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeFormat, setActiveFormat] = useState('journee');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSeminaires().then(data => {
      const found = data.find(s => s.slug === slug) ?? null;
      setSeminaire(found);
      setAllSeminaires(data);
      setNotFound(!found);
      if (found && !(activeFormat in found.formats)) {
        setActiveFormat(Object.keys(found.formats)[0] ?? 'journee');
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#faf8f5' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 32, height: 32, border: '2px solid rgba(11, 44, 52,0.1)', borderTop: '2px solid #0b2c34', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: '#b0a89e', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>Chargement…</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      </div>
    );
  }

  if (notFound || !seminaire) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#faf8f5', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 48 }}>🌿</div>
        <h2 style={{ fontStyle: 'italic', fontWeight: 700, fontSize: 28, color: '#0b2c34', margin: 0 }}>Offre introuvable</h2>
        <p style={{ color: '#9a9080', fontSize: 14, margin: 0 }}>Cette offre n'existe pas ou a été supprimée.</p>
        <button
          onClick={() => router.push(offresListPath)}
          style={{ marginTop: 8, background: '#0b2c34', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', padding: '12px 24px', borderRadius: 9999, border: 'none', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>
          ← Toutes nos offres
        </button>
      </div>
    );
  }

  return (
    <div className="sem-detail-page-root" style={{ background: '#faf8f5', minHeight: '100vh', fontFamily: 'inherit' }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes semExpandIn { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes semModalIn  { from { opacity: 0; transform: translateY(24px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes semModalOut { from { opacity: 1; transform: translateY(0) scale(1) } to { opacity: 0; transform: translateY(24px) scale(0.97) } }
        @keyframes photoSlideInRight { from { opacity: 0; transform: translateX(30px) } to { opacity: 1; transform: translateX(0) } }
        @keyframes photoSlideInLeft  { from { opacity: 0; transform: translateX(-30px) } to { opacity: 1; transform: translateX(0) } }
        ::-webkit-scrollbar { display: none }

        .sem-detail-cols { display: grid; grid-template-columns: 1fr 440px; gap: 48px; align-items: start; }
        .sem-price-col { position: sticky; top: 96px; align-self: start; }
        .sem-format-tabs { display:flex; gap:0; background:rgba(11, 44, 52,0.05); border-radius:9999px; padding:6px; margin-left:auto; flex-shrink:0; }
        .fmt-tab { flex:1; padding:10px 18px; border-radius:9999px; border:none; font-family:inherit; font-size:10px; font-weight:700; letter-spacing:0.06em; cursor:pointer; transition:all 0.18s ease; white-space:nowrap; text-transform:uppercase; }
        .sem-photo-grid { display:grid; gap:8px; border-radius:16px; overflow:hidden; margin-bottom:40px; position:relative; }
        .sem-photo-grid.has-small { grid-template-columns:1fr 1fr; grid-template-rows:repeat(2,clamp(160px,18vw,220px)); }
        .sem-photo-grid.no-small  { grid-template-columns:1fr; grid-template-rows:clamp(300px,36vw,440px); }
        .sem-photo-main { cursor:pointer; overflow:hidden; }
        .sem-photo-grid.has-small .sem-photo-main { grid-row:1/3; }

        .sem-mobile-carousel { display: none; }
        .sem-mobile-hero-partenaire { display: none; }
        .sem-mobile-sheet { display: contents; }
        .sem-mobile-sheet-header { display: none; }
        .sem-detail-mobile-only { display: none; }

        .sem-detail-page-inner { padding-top: calc(84px + 2rem); }

        /* Bloc format — typographie identique mobile / desktop */
        .sem-detail-format-block.sem-format-ui { margin-bottom: 32px; }
        .sem-detail-mobile-only .sem-format-ui { margin-top: 28px; margin-bottom: 20px; }
        .sem-detail-mobile-only .sem-detail-producer-ui { margin-top: 8px; margin-bottom: 4px; }
        .sem-detail-format-block .sem-mobile-format-choice-head { margin-top: 0; }

        .sem-format-ui .sem-mobile-format-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 0 0 14px;
        }
        .sem-format-ui .sem-mobile-format-choice-head {
          margin-top: 8px;
          margin-bottom: 16px;
        }
        .sem-format-ui .sem-mobile-format-choice-head .sem-mobile-section-title {
          margin-bottom: 8px;
        }
        .sem-format-ui .sem-mobile-format-choice-lead {
          margin: 0;
          font-size: 13px;
          font-weight: 500;
          color: #7a7060;
          line-height: 1.45;
        }
        .sem-format-ui .sem-mobile-format-tabs {
          display: flex;
          gap: 6px;
          padding: 5px;
          margin-bottom: 14px;
          background: rgba(11, 44, 52, 0.06);
          border-radius: 9999px;
        }
        .sem-format-ui .sem-mobile-format-tab {
          flex: 1;
          border: none;
          border-radius: 9999px;
          padding: 12px 12px;
          font-family: inherit;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.01em;
          text-transform: none;
          color: #9a9080;
          background: transparent;
          cursor: pointer;
          transition: background 0.18s ease, color 0.18s ease, box-shadow 0.18s ease;
          line-height: 1.25;
        }
        .sem-format-ui .sem-mobile-format-tab.is-active {
          background: #fff;
          color: #0b2c34;
          box-shadow: 0 1px 6px rgba(11, 44, 52, 0.12);
        }
        .sem-format-ui .sem-mobile-pill {
          display: inline-flex;
          align-items: center;
          padding: 6px 12px;
          border-radius: 9999px;
          background: rgba(11, 44, 52, 0.06);
          font-size: 12px;
          font-weight: 600;
          color: #5c554c;
          line-height: 1.2;
        }
        .sem-format-ui .sem-mobile-format-panel .sem-mobile-capsule { margin-bottom: 0; }
        .sem-format-ui .sem-mobile-capsule {
          background: #fff !important;
          border: 1px solid rgba(11, 44, 52, 0.10);
          border-radius: 18px;
          padding: 20px 18px;
          margin-bottom: 16px;
          box-shadow: 0 1px 4px rgba(11, 44, 52, 0.04);
        }
        .sem-format-ui .sem-mobile-capsule-title {
          font-family: 'Poppins', sans-serif;
          font-size: 17px;
          font-weight: 700;
          font-style: italic;
          color: #0b2c34;
          margin: 0 0 6px;
          line-height: 1.2;
        }
        .sem-format-ui .sem-mobile-capsule-sub {
          font-size: 13px;
          color: #9a9080;
          font-style: italic;
          margin: 0 0 18px;
          line-height: 1.45;
        }
        .sem-format-ui .sem-mobile-capsule-section { margin-bottom: 20px; }
        .sem-format-ui .sem-mobile-capsule-section:last-child { margin-bottom: 0; }
        .sem-format-ui .sem-mobile-capsule-section h3,
        .sem-format-ui .sem-mobile-section-title {
          font-family: 'Poppins', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #b0a89e;
          margin: 0 0 12px;
          font-style: normal;
          line-height: 1.2;
        }
        .sem-format-ui .sem-mobile-capsule-section--collapsible { margin-bottom: 20px; }
        .sem-format-ui .sem-mobile-capsule-section--collapsible .sem-mobile-collapsible h3 { margin: 0; }
        .sem-format-ui .sem-mobile-collapsible { margin-bottom: 0; }
        .sem-format-ui .sem-mobile-collapsible-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 0;
          margin: 0 0 12px;
          border: none;
          background: none;
          cursor: pointer;
          font-family: inherit;
          text-align: left;
        }
        .sem-format-ui .sem-mobile-collapsible-trigger h3,
        .sem-format-ui .sem-mobile-collapsible-trigger h4 {
          font-family: 'Poppins', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #b0a89e;
          margin: 0;
        }
        .sem-format-ui .sem-mobile-collapsible-chevron {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.7);
          color: #b0a89e;
          transition: transform 0.3s ease;
        }
        .sem-format-ui .sem-mobile-collapsible.is-expanded .sem-mobile-collapsible-chevron {
          transform: rotate(180deg);
        }
        .sem-format-ui .sem-mobile-collapsible-panel {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.35s ease;
        }
        .sem-format-ui .sem-mobile-collapsible.is-expanded .sem-mobile-collapsible-panel {
          grid-template-rows: 1fr;
        }
        .sem-format-ui .sem-mobile-collapsible-inner {
          overflow: hidden;
          min-height: 0;
        }
        .sem-format-ui .sem-mobile-inclus-grid { display: flex; flex-direction: column; gap: 12px; }
        .sem-format-ui .sem-mobile-inclus-grid--cols {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 14px 24px;
        }
        .sem-format-ui .sem-mobile-inclus-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: #3a3028;
          line-height: 1.35;
        }
        .sem-format-ui .sem-mobile-inclus-icon { flex-shrink: 0; display: flex; align-items: center; }
        .sem-format-ui .sem-mobile-inclus-icon svg { width: 22px; height: 22px; }
        .sem-format-ui .sem-mobile-programme-list { display: flex; flex-direction: column; gap: 10px; }
        .sem-format-ui .sem-mobile-programme-step { display: flex; gap: 10px; align-items: flex-start; }
        .sem-format-ui .sem-mobile-programme-time {
          flex-shrink: 0;
          width: 64px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #e67e22;
          padding-top: 2px;
        }
        .sem-format-ui .sem-mobile-programme-action { font-size: 13px; color: #6b6358; line-height: 1.55; }
        .sem-format-ui .sem-mobile-hebergement-ok,
        .sem-format-ui .sem-mobile-hebergement-soon {
          display: flex;
          align-items: center;
          gap: 10px;
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 13px;
          line-height: 1.4;
        }
        .sem-format-ui .sem-mobile-hebergement-ok { background: #faf8f5; color: #3a3028; }
        .sem-format-ui .sem-mobile-hebergement-soon { background: rgba(11, 44, 52, 0.06); color: #9a9080; }
        .sem-format-ui .sem-mobile-hebergement-soon-icon { font-size: 20px; flex-shrink: 0; }

        .sem-format-ui .sem-hebergement-card {
          background: #faf8f5;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(11, 44, 52, 0.06);
        }
        .sem-format-ui .sem-hebergement-photos {
          position: relative;
          overflow: hidden;
          background: #ebe6de;
        }
        .sem-format-ui .sem-hebergement-photo-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          min-height: 220px;
          max-height: 320px;
          overflow: hidden;
        }
        @media (min-width: 769px) {
          .sem-format-ui .sem-hebergement-photo-frame {
            aspect-ratio: 5 / 4;
            min-height: 260px;
            max-height: 360px;
          }
        }
        .sem-format-ui .sem-hebergement-photo-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          user-select: none;
          pointer-events: none;
        }
        .sem-format-ui .sem-hebergement-photo-nav {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }
        .sem-format-ui .sem-hebergement-photo-arrow {
          position: absolute;
          top: 0;
          bottom: 0;
          margin-block: auto;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.35);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 0;
          margin-inline: 0;
          line-height: 0;
          font-family: inherit;
          appearance: none;
          -webkit-appearance: none;
          pointer-events: auto;
          flex-shrink: 0;
        }
        .sem-format-ui .sem-hebergement-photo-arrow svg {
          display: block;
          width: 11px;
          height: 11px;
          flex-shrink: 0;
        }
        .sem-format-ui .sem-hebergement-photo-arrow--prev { left: 10px; }
        .sem-format-ui .sem-hebergement-photo-arrow--next { right: 10px; }
        .sem-format-ui .sem-hebergement-photo-dots {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 4px;
          z-index: 3;
        }
        .sem-format-ui .sem-hebergement-photo-dot {
          width: 4px;
          height: 4px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.45);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .sem-format-ui .sem-hebergement-photo-dot.is-active {
          width: 14px;
          background: #fff;
        }
        .sem-format-ui .sem-hebergement-card-body { padding: 14px 16px 16px; }
        .sem-format-ui .sem-hebergement-card-head {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 8px 10px;
          margin-bottom: 8px;
        }
        .sem-format-ui .sem-hebergement-nom {
          font-family: 'Poppins', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #0b2c34;
          margin: 0;
          line-height: 1.25;
        }
        .sem-format-ui .sem-hebergement-type {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #e67e22;
        }
        .sem-format-ui .sem-hebergement-desc {
          font-size: 13px;
          color: #6b6358;
          line-height: 1.55;
          margin: 0 0 10px;
        }
        .sem-format-ui .sem-hebergement-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 14px;
          align-items: center;
        }
        .sem-format-ui .sem-hebergement-meta-item {
          font-size: 12px;
          color: #7a7060;
          line-height: 1.35;
        }
        .sem-format-ui .sem-hebergement-prix {
          font-weight: 700;
          color: #0b2c34;
        }
        .sem-format-ui .sem-hebergements-carousel { margin: 0; }
        .sem-format-ui .sem-hebergements-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 10px;
        }
        .sem-format-ui .sem-hebergements-index-label {
          font-family: 'Poppins', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #b0a89e;
          margin: 0;
        }
        .sem-format-ui .sem-hebergements-index-total {
          font-weight: 600;
          color: #d4cdc3;
        }
        .sem-format-ui .sem-hebergements-nav-btns {
          display: flex;
          gap: 6px;
          flex-shrink: 0;
        }
        .sem-format-ui .sem-hebergements-nav-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(11, 44, 52, 0.12);
          background: #fff;
          color: #0b2c34;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          cursor: pointer;
          font-family: inherit;
          line-height: 0;
          transition: background 0.15s ease, opacity 0.15s ease;
        }
        .sem-format-ui .sem-hebergements-nav-btn svg {
          display: block;
          width: 11px;
          height: 11px;
        }
        .sem-format-ui .sem-hebergements-nav-btn:hover:not(:disabled) {
          background: #f5f1eb;
        }
        .sem-format-ui .sem-hebergements-nav-btn:disabled {
          opacity: 0.35;
          cursor: default;
        }
        .sem-format-ui .sem-hebergements-track {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 2px 0 4px;
          touch-action: pan-x;
          overscroll-behavior-x: contain;
          cursor: grab;
        }
        .sem-format-ui .sem-hebergements-track:active {
          cursor: grabbing;
        }
        .sem-format-ui .sem-hebergements-track::-webkit-scrollbar { display: none; }
        .sem-format-ui .sem-hebergements-slide {
          flex: 0 0 calc(50% - 5px);
          scroll-snap-align: start;
          min-width: 0;
          height: auto;
        }
        .sem-format-ui .sem-hebergements-carousel .sem-hebergement-card {
          height: auto;
        }
        .sem-format-ui .sem-hebergements-carousel .sem-hebergement-photo-frame {
          aspect-ratio: 4 / 3;
          min-height: 0;
          max-height: none;
        }
        .sem-format-ui .sem-hebergements-carousel .sem-hebergement-card-body {
          padding: 12px 14px 14px;
        }
        .sem-format-ui .sem-hebergements-carousel .sem-hebergement-nom {
          font-size: 14px;
        }
        .sem-format-ui .sem-hebergements-carousel .sem-hebergement-desc {
          font-size: 13px;
          line-height: 1.55;
          margin-bottom: 10px;
          overflow: visible;
        }
        .sem-format-ui .sem-hebergements-carousel .sem-hebergement-meta-item {
          font-size: 12px;
        }
        .sem-format-ui .sem-hebergements-carousel .sem-hebergement-photo-arrow {
          width: 26px;
          height: 26px;
        }
        .sem-format-ui .sem-hebergements-carousel .sem-hebergement-photo-arrow--prev { left: 6px; }
        .sem-format-ui .sem-hebergements-carousel .sem-hebergement-photo-arrow--next { right: 6px; }
        .sem-format-ui .sem-hebergements-carousel .sem-hebergement-photo-arrow svg {
          width: 9px;
          height: 9px;
        }
        .sem-format-ui .sem-hebergements-dots {
          display: flex;
          justify-content: center;
          gap: 5px;
          margin-top: 10px;
        }
        .sem-format-ui .sem-hebergements-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: rgba(11, 44, 52, 0.14);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: width 0.25s ease, background 0.25s ease;
        }
        .sem-format-ui .sem-hebergements-dot.is-active {
          width: 18px;
          background: #e67e22;
        }
        @media (max-width: 768px) {
          .sem-format-ui .sem-hebergements-slide {
            flex: 0 0 100%;
            scroll-snap-align: start;
          }
          .sem-format-ui .sem-hebergements-track {
            scroll-padding-inline: 0;
          }
          .sem-format-ui .sem-hebergements-carousel .sem-hebergement-photo-frame {
            aspect-ratio: 4 / 3;
            min-height: 200px;
          }
          .sem-format-ui .sem-hebergements-carousel .sem-hebergement-nom {
            font-size: 15px;
          }
          .sem-format-ui .sem-hebergements-carousel .sem-hebergement-desc {
            font-size: 13px;
          }
        }

        /* Carte localisation — zoom desktop */
        @media (min-width: 769px) {
          .sem-mobile-map-canvas { cursor: grab; }
          .sem-mobile-map-canvas:active { cursor: grabbing; }
          .sem-mobile-map-block .mapboxgl-ctrl-group {
            border-radius: 10px !important;
            box-shadow: 0 2px 10px rgba(11, 44, 52, 0.12) !important;
            border: 1px solid rgba(11, 44, 52, 0.08) !important;
            overflow: hidden;
          }
          .sem-map-widget .mapboxgl-ctrl-group {
            border-radius: 10px !important;
            box-shadow: 0 2px 10px rgba(11, 44, 52, 0.12) !important;
          }
        }

        /* Producteur + expériences possibles — desktop & mobile */
        .sem-detail-desktop-only .sem-detail-producer-ui { margin-top: 0; margin-bottom: 24px; }
        .sem-detail-producer-ui .sem-mobile-section-title {
          font-family: 'Poppins', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #b0a89e;
          margin: 0 0 12px;
          font-style: normal;
          line-height: 1.2;
        }
        .sem-detail-producer-ui .sem-mobile-producer-head {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 14px;
        }
        .sem-detail-producer-ui .sem-mobile-producer-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }
        .sem-detail-producer-ui .sem-mobile-producer-name {
          font-family: 'Poppins', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #0b2c34;
          margin: 0;
        }
        .sem-detail-producer-ui .sem-mobile-producer-bio {
          font-size: 14px;
          color: #6b6358;
          line-height: 1.7;
          margin: 0 0 16px;
        }
        .sem-detail-producer-ui .sem-mobile-collapsible { margin-bottom: 0; margin-top: 4px; }
        .sem-detail-producer-ui .sem-mobile-collapsible-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 0;
          margin: 0 0 12px;
          border: none;
          background: none;
          cursor: pointer;
          font-family: inherit;
          text-align: left;
        }
        .sem-detail-producer-ui .sem-mobile-collapsible-trigger h3,
        .sem-detail-producer-ui .sem-mobile-collapsible-trigger h4 {
          font-family: 'Poppins', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #b0a89e;
          margin: 0;
        }
        .sem-detail-producer-ui .sem-mobile-collapsible-chevron {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(11, 44, 52, 0.06);
          color: #b0a89e;
          transition: transform 0.3s ease;
        }
        .sem-detail-producer-ui .sem-mobile-collapsible.is-expanded .sem-mobile-collapsible-chevron {
          transform: rotate(180deg);
        }
        .sem-detail-producer-ui .sem-mobile-collapsible-panel {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.35s ease;
        }
        .sem-detail-producer-ui .sem-mobile-collapsible.is-expanded .sem-mobile-collapsible-panel {
          grid-template-rows: 1fr;
        }
        .sem-detail-producer-ui .sem-mobile-collapsible-inner {
          overflow: hidden;
          min-height: 0;
        }
        .sem-detail-producer-ui .sem-mobile-producer-experiences-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .sem-detail-producer-ui .sem-producer-exp-card {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          background: #faf8f5;
          border: 1px solid rgba(11, 44, 52, 0.06);
          border-radius: 14px;
          padding: 16px 18px;
          min-height: 72px;
          list-style: none;
        }
        .sem-detail-desktop-only .sem-detail-producer-ui .sem-producer-exp-card {
          background: #fff;
          border-color: rgba(11, 44, 52, 0.08);
          box-shadow: 0 1px 4px rgba(11, 44, 52, 0.05);
        }
        .sem-detail-producer-ui .sem-producer-exp-card-body {
          flex: 1;
          min-width: 0;
        }
        .sem-detail-producer-ui .sem-mobile-exp-icon { font-size: 18px; flex-shrink: 0; line-height: 1.2; padding-top: 2px; }
        .sem-detail-producer-ui .sem-producer-exp-card strong {
          display: block;
          font-size: 13px;
          color: #0b2c34;
          margin-bottom: 6px;
          font-weight: 700;
          line-height: 1.35;
        }
        .sem-detail-producer-ui .sem-mobile-exp-meta {
          display: block;
          font-size: 11px;
          color: #9a9080;
          margin-bottom: 6px;
        }
        .sem-detail-producer-ui .sem-producer-exp-card p {
          font-size: 12px;
          color: #6b6358;
          margin: 0;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .sem-detail-page-root { background: #fff; }
          .sem-detail-page-inner {
            padding: 0 !important;
            max-width: none !important;
          }
          .sem-detail-cols { grid-template-columns: 1fr; gap: 0; }
          .sem-price-col { display: none !important; }
          .sem-partenaire-aside { display: none !important; }
          .sem-detail-mobile-only { display: block !important; }
          .sem-detail-desktop-only { display: none !important; }
          .sem-detail-intro-desktop { display: none !important; }
          .sem-detail-title { display: none !important; }
          .sem-detail-back-btn { display: none !important; }
          .sem-photo-grid-desktop { display: none !important; }
          .sem-mobile-sheet { display: block; }
          .sem-detail-format-row > div:last-child { display: none; }
          .sem-detail-format-row {
            flex-direction: column;
            align-items: stretch !important;
          }
          .sem-detail-format-row > div:first-child { width: 100%; }

          .sem-mobile-carousel {
            display: block;
            position: relative;
            width: 100%;
            height: 54vh;
            min-height: 340px;
            max-height: 500px;
            overflow: hidden;
            margin: 0;
            border-radius: 0;
          }
          .sem-mobile-hero-btn {
            position: absolute;
            z-index: 84;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            cursor: pointer;
            font-family: inherit;
            -webkit-tap-highlight-color: transparent;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          }
          .sem-mobile-hero-btn--back {
            top: calc(12px + env(safe-area-inset-top, 0px));
            left: max(16px, env(safe-area-inset-left, 0px));
            height: auto;
            min-height: 40px;
            padding: 8px 14px 8px 10px;
            border-radius: 9999px;
            gap: 6px;
            background: rgba(0, 0, 0, 0.45);
            backdrop-filter: blur(8px);
            color: #fff;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            white-space: nowrap;
          }
          .sem-mobile-photo-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 18;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            border: 1px solid rgba(255, 255, 255, 0.28);
            background: rgba(0, 0, 0, 0.38);
            backdrop-filter: blur(8px);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-family: inherit;
            -webkit-tap-highlight-color: transparent;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          }
          .sem-mobile-photo-arrow--prev {
            left: max(12px, env(safe-area-inset-left, 0px));
          }
          .sem-mobile-photo-arrow--next {
            right: max(12px, env(safe-area-inset-right, 0px));
          }
          .sem-mobile-photo-arrow:disabled {
            opacity: 0.35;
            cursor: default;
          }
          .sem-mobile-hero-meta {
            position: absolute;
            bottom: 52px;
            right: 16px;
            z-index: 15;
            display: flex;
            align-items: center;
            gap: 8px;
            pointer-events: none;
          }
          .sem-mobile-photo-counter {
            background: rgba(0, 0, 0, 0.55);
            color: #fff;
            font-size: 12px;
            font-weight: 600;
            padding: 6px 12px;
            border-radius: 8px;
            letter-spacing: 0.02em;
            flex-shrink: 0;
          }
          .sem-mobile-bestseller {
            background: rgba(0, 0, 0, 0.45);
            border-radius: 9999px;
            padding: 5px 10px;
            font-size: 9px;
            font-weight: 700;
            color: #fff;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            flex-shrink: 0;
          }

          .sem-mobile-sheet {
            position: relative;
            z-index: 25;
            isolation: isolate;
            background: #fff;
            border-radius: 24px 24px 0 0;
            margin-top: -24px;
            padding: 0 20px calc(32px + env(safe-area-inset-bottom, 0px));
          }
          .sem-mobile-sheet-header {
            display: block;
            padding: 24px 0 0;
          }
          .sem-mobile-hero-partenaire {
            position: absolute;
            bottom: 52px;
            left: max(16px, env(safe-area-inset-left, 0px));
            z-index: 4;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 8px;
            max-width: min(72vw, 280px);
            padding: 7px 11px 7px 8px;
            background: rgba(255, 255, 255, 0.82);
            border-radius: 12px;
            box-shadow: 0 2px 14px rgba(0, 0, 0, 0.18);
            pointer-events: none;
          }
          .sem-mobile-hero-partenaire img {
            max-height: 30px;
            max-width: 72px;
            width: auto;
            height: auto;
            object-fit: contain;
            display: block;
            flex-shrink: 0;
            border-radius: 8px;
          }
          .sem-mobile-hero-partenaire span {
            font-size: 8px;
            font-weight: 600;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: #6b6358;
            line-height: 1.25;
          }
          .sem-mobile-sheet-header h1 {
            font-family: 'Poppins', sans-serif;
            font-weight: 700;
            font-style: italic;
            font-size: 18px;
            color: #0b2c34;
            line-height: 1.25;
            margin: 0 0 8px;
            letter-spacing: -0.01em;
          }
          .sem-mobile-pills {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 8px;
          }
          .sem-mobile-pill {
            display: inline-flex;
            align-items: center;
            padding: 6px 12px;
            border-radius: 9999px;
            background: rgba(11, 44, 52, 0.06);
            font-size: 12px;
            font-weight: 600;
            color: #5c554c;
            line-height: 1.2;
          }
          .sem-mobile-collapsible { margin-bottom: 0; }
          .sem-mobile-collapsible-trigger {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 0;
            margin: 0 0 12px;
            border: none;
            background: none;
            cursor: pointer;
            font-family: inherit;
            text-align: left;
          }
          .sem-mobile-collapsible-trigger h3,
          .sem-mobile-collapsible-trigger h4 {
            font-family: 'Poppins', sans-serif;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: #b0a89e;
            margin: 0;
          }
          .sem-mobile-collapsible-chevron {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.7);
            color: #b0a89e;
            transition: transform 0.3s ease;
          }
          .sem-mobile-collapsible.is-expanded .sem-mobile-collapsible-chevron {
            transform: rotate(180deg);
          }
          .sem-mobile-collapsible-panel {
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows 0.35s ease;
          }
          .sem-mobile-collapsible.is-expanded .sem-mobile-collapsible-panel {
            grid-template-rows: 1fr;
          }
          .sem-mobile-collapsible-inner {
            overflow: hidden;
            min-height: 0;
          }
          .sem-mobile-producer .sem-mobile-collapsible { margin-top: 4px; }
          .sem-mobile-producer-experiences-list {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .sem-mobile-producer .sem-mobile-section-title {
            font-family: 'Poppins', sans-serif;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: #b0a89e;
            margin: 0 0 12px;
            font-style: normal;
            line-height: 1.2;
          }
          .sem-mobile-producer { margin-top: 32px; margin-bottom: 28px; }
          .sem-mobile-producer-head { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
          .sem-mobile-producer-avatar { width: 52px; height: 52px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
          .sem-mobile-producer-name {
            font-family: 'Poppins', sans-serif;
            font-size: 17px;
            font-weight: 700;
            color: #0b2c34;
            margin: 0;
          }
          .sem-mobile-producer-bio { font-size: 14px; color: #6b6358; line-height: 1.7; margin: 0 0 16px; }
          .sem-mobile-producer-experiences-list { gap: 14px; }
          .sem-producer-exp-card {
            display: flex;
            gap: 14px;
            align-items: flex-start;
            background: #faf8f5;
            border: 1px solid rgba(11, 44, 52, 0.06);
            border-radius: 14px;
            padding: 16px 18px;
            min-height: 72px;
            list-style: none;
          }
          .sem-producer-exp-card-body { flex: 1; min-width: 0; }
          .sem-mobile-exp-icon { font-size: 18px; flex-shrink: 0; line-height: 1.2; padding-top: 2px; }
          .sem-producer-exp-card strong {
            display: block;
            font-size: 13px;
            color: #0b2c34;
            margin-bottom: 6px;
            font-weight: 700;
            line-height: 1.35;
          }
          .sem-mobile-exp-meta { display: block; font-size: 11px; color: #9a9080; margin-bottom: 6px; }
          .sem-producer-exp-card p { font-size: 12px; color: #6b6358; margin: 0; line-height: 1.6; }
          .sem-mobile-producer-highlight {
            font-size: 14px;
            font-style: italic;
            color: #7a7060;
            line-height: 1.6;
            margin: 16px 0 0;
            padding-left: 14px;
            border-left: 3px solid #e67e22;
          }
          .sem-mobile-format-quote {
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            font-style: italic;
            color: #7a7060;
            line-height: 1.6;
            margin: 0 0 20px;
            padding-left: 14px;
            border-left: 3px solid #e67e22;
          }
          .sem-mobile-devis-block { margin-top: 28px; margin-bottom: 28px; text-align: center; }
          .sem-mobile-devis-btn {
            width: 100%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: #0b2c34;
            color: #fff;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            padding: 16px 24px;
            border-radius: 9999px;
            border: none;
            cursor: pointer;
            font-family: inherit;
          }
          .sem-mobile-devis-hint { font-size: 13px; color: #9a9080; line-height: 1.5; margin: 12px 0 0; }
          .sem-mobile-map-block {
            position: relative;
            z-index: 0;
            isolation: isolate;
            margin-top: 8px;
            margin-bottom: 0;
            contain: layout style paint;
          }
          .sem-mobile-map-canvas {
            overflow: hidden;
            contain: strict;
          }
          .sem-mobile-map-block .mapboxgl-map,
          .sem-mobile-map-block .mapboxgl-canvas-container,
          .sem-mobile-map-block .mapboxgl-canvas {
            z-index: 0 !important;
          }
          .sem-mobile-partenaire-wrap {
            position: relative;
            z-index: 2;
            margin-top: 8px;
            margin-bottom: 24px;
          }
          .sem-mobile-partenaire-card {
            position: relative;
            z-index: 2;
            background: #fff;
            border-radius: 18px;
            border: 1px solid rgba(11, 44, 52, 0.1);
            box-shadow: 0 4px 24px rgba(11, 44, 52, 0.08);
            padding: 18px;
            margin-top: 0;
            margin-bottom: 8px;
          }
          .sem-mobile-partenaire-card-head {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 12px;
          }
          .sem-mobile-partenaire-card-brand {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .sem-mobile-partenaire-card-brand img { max-height: 36px; max-width: 120px; object-fit: contain; }
          .sem-mobile-partenaire-card-brand span {
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #b0a89e;
          }
          .sem-mobile-partenaire-link {
            flex-shrink: 0;
            font-size: 11px;
            font-weight: 600;
            color: #e67e22;
            text-decoration: none;
            white-space: nowrap;
          }
          .sem-mobile-partenaire-desc {
            font-size: 13px;
            color: #6b6358;
            line-height: 1.6;
            margin: 0;
            white-space: pre-line;
          }

        }

        @media (max-width: 600px) {
          .sem-photo-grid.has-small { grid-template-columns:1fr; grid-template-rows:clamp(200px,60vw,300px) clamp(120px,32vw,180px) clamp(120px,32vw,180px); }
          .sem-photo-grid.has-small .sem-photo-main { grid-row: auto; }
          .sem-photo-grid.no-small  { grid-template-rows: clamp(220px,65vw,340px); }
        }
      `}</style>

      <SeminaireModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        seminaires={allSeminaires}
        initialSeminaire={seminaire}
        initialFormatId={activeFormat}
      />

      <div className="sem-detail-page-inner" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1rem, 3vw, 2rem) 80px', boxSizing: 'border-box' }}>
        <div className="sem-detail-back-btn" style={{ marginBottom: 28, paddingTop: 'calc(84px + 2rem)' }}>
          <button
            onClick={() => router.push(offresListPath)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(11, 44, 52,0.06)', border: 'none', borderRadius: 9999, padding: '9px 18px', fontSize: 11, fontWeight: 700, color: '#0b2c34', cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            ← Toutes nos offres
          </button>
        </div>

        <ExpandedSeminaireView
          s={seminaire}
          activeFormat={activeFormat}
          setActiveFormat={setActiveFormat}
          onDevis={() => setModalOpen(true)}
          onBack={() => router.push(offresListPath)}
        />
      </div>
    </div>
  );
}
