'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchSeminaires } from '../lib/seminaires';
import type { Seminaire } from '../lib/seminaires';
import SeminaireDetailLoading from '../components/SeminaireDetailLoading';
import { jumpToTop } from '../components/ScrollToTop';
import { ExpandedSeminaireView, SeminaireModal } from './Seminaires-pack';

// ─── Page détail d'un séminaire ───────────────────────────────────────────────

export default function SeminaireDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();
  const offresListPath = '/seminaire-exemples';
  const [seminaire, setSeminaire] = useState<Seminaire | null>(null);
  const [allSeminaires, setAllSeminaires] = useState<Seminaire[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeFormat, setActiveFormat] = useState('journee');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    jumpToTop();
    setLoading(true);
    setNotFound(false);
    let cancelled = false;
    fetchSeminaires()
      .then(data => {
        if (cancelled) return;
        const found = data.find(s => s.slug === slug) ?? null;
        setSeminaire(found);
        setAllSeminaires(data);
        setNotFound(!found);
        if (found && !(activeFormat in found.formats)) {
          setActiveFormat(Object.keys(found.formats)[0] ?? 'journee');
        }
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setNotFound(true);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return <SeminaireDetailLoading />;
  }

  if (notFound || !seminaire) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 48 }}>🌿</div>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontStyle: 'normal', fontWeight: 400, fontSize: 28, letterSpacing: '-0.075em', color: '#0c1d22', margin: 0 }}>Offre introuvable</h2>
        <p style={{ color: 'rgba(12, 29, 34, 0.45)', fontSize: 14, margin: 0 }}>Cette offre n'existe pas ou a été supprimée.</p>
        <button
          onClick={() => router.push(offresListPath)}
          style={{ marginTop: 8, background: '#0c1d22', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', padding: '12px 24px', borderRadius: 9999, border: 'none', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>
          ← Toutes nos offres
        </button>
      </div>
    );
  }

  return (
    <div className="sem-detail-page-root" style={{ minHeight: '100vh', fontFamily: 'inherit' }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes semExpandIn { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes semModalIn  { from { opacity: 0; transform: translateY(24px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes semModalOut { from { opacity: 1; transform: translateY(0) scale(1) } to { opacity: 0; transform: translateY(24px) scale(0.97) } }
        @keyframes photoSlideInRight { from { opacity: 0; transform: translateX(30px) } to { opacity: 1; transform: translateX(0) } }
        @keyframes photoSlideInLeft  { from { opacity: 0; transform: translateX(-30px) } to { opacity: 1; transform: translateX(0) } }
        ::-webkit-scrollbar { display: none }

        .sem-price-col { position: sticky; top: 96px; align-self: start; }
        .sem-format-tabs { display:flex; gap:0; background:rgba(12, 29, 34,0.05); border-radius:9999px; padding:6px; margin-left:auto; flex-shrink:0; }
        .fmt-tab { flex:1; padding:10px 18px; border-radius:9999px; border:none; font-family:inherit; font-size:10px; font-weight:700; letter-spacing:0.06em; cursor:pointer; transition:all 0.18s ease; white-space:nowrap; text-transform:uppercase; }
        .sem-photo-grid { display:grid; gap:8px; border-radius:26px; overflow:hidden; margin-bottom:40px; position:relative; }
        .sem-photo-grid.has-small { grid-template-columns:1fr 1fr; grid-template-rows:repeat(2,clamp(160px,18vw,220px)); }
        .sem-photo-grid.no-small  { grid-template-columns:1fr; grid-template-rows:clamp(300px,36vw,440px); }
        .sem-photo-main { cursor:pointer; overflow:hidden; }
        .sem-photo-grid.has-small .sem-photo-main { grid-row:1/3; }

        .sem-mobile-carousel { display: none; }
        .sem-mobile-hero-partenaire { display: none; }
        .sem-mobile-sheet { display: contents; }
        .sem-mobile-sheet-header { display: none; }
        .sem-detail-mobile-only { display: none; }

        .sem-detail-page-inner {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: calc(84px + 2rem) 1.5rem 80px;
          padding-left: max(1.5rem, env(safe-area-inset-left, 0px));
          padding-right: max(1rem, env(safe-area-inset-right, 0px));
          box-sizing: border-box;
        }
        @media (min-width: 640px) {
          .sem-detail-page-inner {
            padding-left: 2rem;
            padding-right: 1.25rem;
          }
        }
        @media (min-width: 1024px) {
          .sem-detail-page-inner {
            padding-left: 2.5rem;
            padding-right: 1.5rem;
          }
        }
        .sem-detail-back-btn { margin-bottom: 20px; }
        .sem-detail-back-btn-inner {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: transparent;
          border: 1px solid rgba(12, 29, 34, 0.16);
          border-radius: 9999px;
          padding: 5px 11px;
          font-size: 9px;
          font-weight: 700;
          color: #0c1d22;
          cursor: pointer;
          font-family: inherit;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .sem-detail-cols { display: grid; grid-template-columns: minmax(0, 1fr) minmax(300px, 380px); gap: clamp(32px, 4vw, 56px); align-items: start; }

        .sem-format-ui .sem-mobile-format-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin: 0 0 10px;
        }
        .sem-format-ui .sem-mobile-format-choice-head {
          margin-top: 6px;
          margin-bottom: 12px;
        }
        .sem-format-ui .sem-mobile-format-choice-head .sem-mobile-section-title {
          margin-bottom: 6px;
        }
        .sem-format-ui .sem-mobile-format-choice-lead {
          margin: 0;
          font-size: 13px;
          font-weight: 500;
          color: rgba(12, 29, 34, 0.55);
          line-height: 1.4;
        }
        .sem-format-ui .sem-mobile-format-tabs {
          display: flex;
          gap: 4px;
          padding: 3px;
          margin-bottom: 10px;
          background: rgba(12, 29, 34, 0.06);
          border-radius: 9999px;
        }
        .sem-format-ui .sem-mobile-format-tab {
          flex: 1;
          border: none;
          border-radius: 9999px;
          padding: 9px 12px;
          font-family: inherit;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.01em;
          text-transform: none;
          color: rgba(12, 29, 34, 0.45);
          background: transparent;
          cursor: pointer;
          transition: background 0.18s ease, color 0.18s ease, box-shadow 0.18s ease;
          line-height: 1.25;
        }
        .sem-format-ui .sem-mobile-format-tab.is-active {
          background: #fff;
          color: #0c1d22;
          box-shadow: 0 1px 4px rgba(12, 29, 34, 0.10);
        }
        .sem-format-ui .sem-mobile-pill {
          display: inline-flex;
          align-items: center;
          padding: 5px 10px;
          border-radius: 9999px;
          background: rgba(12, 29, 34, 0.06);
          font-size: 12px;
          font-weight: 600;
          color: rgba(12, 29, 34, 0.60);
          line-height: 1.2;
        }
        .sem-format-ui .sem-mobile-format-panel .sem-mobile-capsule { margin-bottom: 0; }
        .sem-format-ui .sem-mobile-capsule {
          background: #fff !important;
          border: 1px solid rgba(12, 29, 34, 0.10);
          border-radius: 14px;
          padding: 16px 16px;
          margin-bottom: 12px;
          box-shadow: none;
        }
        .sem-format-ui .sem-mobile-capsule-title {
          font-family: 'Poppins', sans-serif;
          font-size: 16px;
          font-weight: 600;
          font-style: normal;
          letter-spacing: -0.03em;
          color: #0c1d22;
          margin: 0 0 4px;
          line-height: 1.25;
        }
        .sem-format-ui .sem-mobile-capsule-sub {
          font-size: 13px;
          color: rgba(12, 29, 34, 0.45);
          font-style: normal;
          margin: 0 0 14px;
          line-height: 1.45;
        }
        .sem-format-ui .sem-mobile-capsule-section { margin-bottom: 14px; }
        .sem-format-ui .sem-mobile-capsule-section:last-child { margin-bottom: 0; }
        .sem-format-ui .sem-mobile-capsule-section h3,
        .sem-format-ui .sem-mobile-section-title {
          font-family: 'Poppins', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #ec6435;
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
          color: #ec6435;
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
          color: rgba(12, 29, 34, 0.40);
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
          font-size: 14px;
          color: #0c1d22;
          line-height: 1.4;
        }
        .sem-format-ui .sem-mobile-inclus-icon { flex-shrink: 0; display: flex; align-items: center; }
        .sem-format-ui .sem-mobile-inclus-icon svg { width: 20px; height: 20px; }
        .sem-format-ui .sem-mobile-programme-list { display: flex; flex-direction: column; gap: 10px; }
        .sem-format-ui .sem-mobile-programme-step { display: flex; gap: 10px; align-items: flex-start; }
        .sem-format-ui .sem-mobile-programme-time {
          flex-shrink: 0;
          width: 64px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #ec6435;
          padding-top: 2px;
        }
        .sem-format-ui .sem-mobile-programme-action { font-size: 14px; color: rgba(12, 29, 34, 0.65); line-height: 1.55; }
        .sem-format-ui .sem-mobile-hebergement-ok,
        .sem-format-ui .sem-mobile-hebergement-soon {
          display: flex;
          align-items: center;
          gap: 8px;
          border-radius: 9999px;
          padding: 9px 12px;
          font-size: 13px;
          line-height: 1.35;
        }
        .sem-offer-format .sem-mobile-hebergement-ok { background: #f4f4f4; color: #0c1d22; }
        .sem-offer-format .sem-mobile-hebergement-soon {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          background: #f4f4f4;
          color: rgba(12, 29, 34, 0.65);
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.45;
        }
        .sem-offer-format .sem-mobile-hebergement-soon-icon { font-size: 16px; flex-shrink: 0; line-height: 1.2; }

        .sem-offer-format .sem-hebergement-card {
          background: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(12, 29, 34, 0.10);
        }
        .sem-offer-format .sem-hebergement-photos {
          position: relative;
          overflow: hidden;
          background: #f4f4f4;
        }
        .sem-offer-format .sem-hebergement-photo-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          min-height: 220px;
          max-height: 340px;
          overflow: hidden;
        }
        @media (min-width: 769px) {
          .sem-offer-format .sem-hebergement-photo-frame {
            aspect-ratio: 4 / 3;
            min-height: 260px;
            max-height: 380px;
          }
        }
        .sem-offer-format .sem-hebergement-photo-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          user-select: none;
          pointer-events: none;
        }
        .sem-offer-format .sem-hebergement-photo-nav {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }
        .sem-offer-format .sem-hebergement-photo-arrow {
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
        .sem-offer-format .sem-hebergement-photo-arrow svg {
          display: block;
          width: 11px;
          height: 11px;
          flex-shrink: 0;
        }
        .sem-offer-format .sem-hebergement-photo-arrow--prev { left: 10px; }
        .sem-offer-format .sem-hebergement-photo-arrow--next { right: 10px; }
        .sem-offer-format .sem-hebergement-photo-dots {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 4px;
          z-index: 3;
        }
        .sem-offer-format .sem-hebergement-photo-dot {
          width: 4px;
          height: 4px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.45);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .sem-offer-format .sem-hebergement-photo-dot.is-active {
          width: 14px;
          background: #fff;
        }
        .sem-offer-format .sem-hebergement-card-body { padding: 12px 14px 14px; }
        .sem-offer-format .sem-hebergement-card-head {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 6px 8px;
          margin-bottom: 6px;
        }
        .sem-offer-format .sem-hebergement-nom {
          font-family: 'Poppins', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #0c1d22;
          margin: 0;
          line-height: 1.25;
        }
        .sem-offer-format .sem-hebergement-type {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #ec6435;
        }
        .sem-offer-format .sem-hebergement-desc {
          font-size: 13px;
          font-weight: 500;
          color: rgba(12, 29, 34, 0.65);
          line-height: 1.5;
          margin: 0 0 8px;
        }
        .sem-offer-format .sem-hebergement-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 6px 12px;
          align-items: center;
        }
        .sem-offer-format .sem-hebergement-meta-item {
          font-size: 12px;
          color: rgba(12, 29, 34, 0.55);
          line-height: 1.3;
        }
        .sem-offer-format .sem-hebergement-prix {
          font-weight: 700;
          color: #0c1d22;
        }
        .sem-offer-format .sem-hebergements-carousel {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin: 0;
          width: 100%;
          min-width: 0;
        }
        .sem-offer-format .sem-hebergements-carousel-slide {
          width: 100%;
          min-width: 0;
        }
        .sem-offer-format .sem-hebergements-carousel .sem-hebergement-card {
          width: 100%;
        }
        .sem-offer-format .sem-hebergements-carousel .sem-hebergement-photo-frame {
          aspect-ratio: 4 / 3;
          min-height: 260px;
          max-height: 380px;
        }
        .sem-offer-format .sem-hebergements-carousel-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }
        .sem-offer-format .sem-hebergements-carousel-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 50%;
          background: #ec6435;
          color: #fff;
          cursor: pointer;
          padding: 0;
          font-family: inherit;
          transition: background 0.18s ease, opacity 0.18s ease, transform 0.18s ease;
        }
        .sem-offer-format .sem-hebergements-carousel-arrow:hover:not(:disabled) {
          background: #d9552a;
          transform: scale(1.04);
        }
        .sem-offer-format .sem-hebergements-carousel-arrow:disabled {
          opacity: 0.35;
          cursor: default;
        }
        .sem-offer-format .sem-hebergements-carousel-count {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: rgba(12, 29, 34, 0.45);
          min-width: 3.5em;
          text-align: center;
        }
        @media (max-width: 768px) {
          .sem-offer-format .sem-hebergements-carousel .sem-hebergement-photo-frame {
            aspect-ratio: 4 / 3;
            min-height: 220px;
            max-height: 320px;
          }
        }

        /* Carte localisation — zoom desktop */
        @media (min-width: 769px) {
          .sem-mobile-map-canvas { cursor: grab; }
          .sem-mobile-map-canvas:active { cursor: grabbing; }
          .sem-mobile-map-block .mapboxgl-ctrl-group {
            border-radius: 10px !important;
            box-shadow: 0 2px 10px rgba(12, 29, 34, 0.12) !important;
            border: 1px solid rgba(12, 29, 34, 0.08) !important;
            overflow: hidden;
          }
          .sem-map-widget .mapboxgl-ctrl-group {
            border-radius: 10px !important;
            box-shadow: 0 2px 10px rgba(12, 29, 34, 0.12) !important;
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
          color: #ec6435;
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
          font-size: 14px;
          font-weight: 700;
          color: #0c1d22;
          margin: 0;
          line-height: 1.3;
        }
        .sem-detail-producer-ui .sem-mobile-producer-bio {
          font-size: 14px;
          color: rgba(12, 29, 34, 0.65);
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
          color: #ec6435;
          margin: 0;
        }
        .sem-detail-producer-ui .sem-mobile-collapsible-chevron {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius:50%;
          background: rgba(12, 29, 34, 0.06);
          color: rgba(12, 29, 34, 0.40);
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
          background: #f4f4f4;
          border: 1px solid rgba(12, 29, 34, 0.06);
          border-radius: 14px;
          padding: 16px 18px;
          min-height: 72px;
          list-style: none;
        }
        .sem-detail-desktop-only .sem-detail-producer-ui .sem-producer-exp-card {
          background: #fff;
          border-color: rgba(12, 29, 34, 0.08);
          box-shadow: 0 1px 4px rgba(12, 29, 34, 0.05);
        }
        .sem-detail-producer-ui .sem-producer-exp-card-body {
          flex: 1;
          min-width: 0;
        }
        .sem-detail-producer-ui .sem-mobile-exp-icon { font-size: 18px; flex-shrink: 0; line-height: 1.2; padding-top: 2px; }
        .sem-detail-producer-ui .sem-producer-exp-card strong {
          display: block;
          font-size: 13px;
          color: #0c1d22;
          margin-bottom: 6px;
          font-weight: 700;
          line-height: 1.35;
        }
        .sem-detail-producer-ui .sem-mobile-exp-meta {
          display: block;
          font-size: 11px;
          color: rgba(12, 29, 34, 0.45);
          margin-bottom: 6px;
        }
        .sem-detail-producer-ui .sem-producer-exp-card p {
          font-size: 12px;
          color: rgba(12, 29, 34, 0.65);
          margin: 0;
          line-height: 1.6;
        }

        .sem-detail-page-root { background: #ffffff; }

        /* ── Intro éditoriale ── */
        .sem-offer-intro {
          margin: 0 0 32px;
        }
        .sem-offer-intro-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 24px;
        }
        .sem-offer-intro-main { min-width: 0; flex: 1; }
        .sem-offer-title {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(28px, 3.4vw, 40px);
          font-weight: 700;
          letter-spacing: -0.075em;
          line-height: 1.08;
          color: #0c1d22;
          margin: 0 0 12px;
        }
        .sem-offer-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px 8px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(12, 29, 34, 0.55);
          margin-bottom: 18px;
        }
        .sem-offer-meta-strong {
          font-weight: 700;
          color: #0c1d22;
        }
        .sem-offer-meta-dot {
          color: rgba(12, 29, 34, 0.28);
        }
        .sem-offer-map-link {
          appearance: none;
          background: none;
          border: none;
          padding: 0;
          margin: 0;
          font: inherit;
          font-weight: 600;
          color: #0c1d22;
          text-decoration: underline;
          text-underline-offset: 3px;
          cursor: pointer;
        }
        .sem-offer-map-link:hover { color: #ec6435; }
        .sem-offer-lead {
          margin: 0;
          max-width: 40rem;
          font-family: 'Poppins', sans-serif;
          font-size: clamp(15px, 1.6vw, 17px);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1.45;
          color: #0c1d22;
        }

        /* ── Infos pratiques ── */
        .sem-infos-pratiques {
          margin: 28px 0 8px;
        }
        .sem-infos-pratiques-title {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(18px, 2.2vw, 22px);
          font-weight: 700;
          letter-spacing: -0.05em;
          color: #0c1d22;
          margin: 0 0 12px;
        }
        .sem-infos-pratiques-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .sem-infos-row {
          background: #fff;
          border: 1px solid rgba(12, 29, 34, 0.10);
          border-radius: 12px;
          overflow: hidden;
        }
        .sem-infos-row-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border: none;
          background: transparent;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          color: #0c1d22;
        }
        .sem-infos-row-trigger:hover { background: rgba(12, 29, 34, 0.02); }
        .sem-infos-row-icon {
          flex-shrink: 0;
          width: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sem-infos-row-icon svg { width: 18px; height: 18px; }
        .sem-infos-row-text {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .sem-infos-row-title {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #0c1d22;
          line-height: 1.25;
        }
        .sem-infos-row-sub {
          font-size: 13px;
          font-weight: 500;
          color: rgba(12, 29, 34, 0.5);
          line-height: 1.35;
        }
        .sem-infos-row-chevron {
          flex-shrink: 0;
          width: 16px;
          height: 16px;
          color: rgba(12, 29, 34, 0.35);
          transition: transform 0.22s ease;
        }
        .sem-infos-row.is-open .sem-infos-row-chevron {
          transform: rotate(90deg);
          color: #ec6435;
        }
        .sem-infos-row-body {
          padding: 0 16px 14px 50px;
        }
        .sem-infos-pratiques-copy {
          margin: 0 0 8px;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.55;
          letter-spacing: -0.03em;
          color: rgba(12, 29, 34, 0.65);
        }
        .sem-infos-pratiques-bullets {
          margin: 0;
          padding: 0 0 0 1.1em;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 14px;
          line-height: 1.5;
          color: rgba(12, 29, 34, 0.65);
        }
        .sem-infos-pratiques-bullets strong { color: #0c1d22; }
        .sem-infos-producer-head {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        .sem-infos-producer-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
        }
        .sem-infos-producer-head strong {
          font-size: 14px;
          font-weight: 700;
          color: #0c1d22;
        }

        /* ── Expériences proposées ── */
        .sem-experiences-proposees {
          margin: 28px 0 8px;
        }
        .sem-experiences-lead {
          margin: 0 0 14px;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.45;
          letter-spacing: -0.03em;
          color: rgba(12, 29, 34, 0.55);
        }
        .sem-experiences-swipe-wrap {
          position: relative;
        }
        .sem-experiences-swipe {
          display: flex;
          align-items: stretch;
          gap: 10px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 2px 0 4px;
          margin: 0 -24px;
          padding-left: 24px;
          padding-right: 48px;
          scroll-padding-left: 24px;
        }
        .sem-experiences-swipe::-webkit-scrollbar { display: none; }
        .sem-experiences-swipe-fade {
          position: absolute;
          top: 0;
          right: -24px;
          bottom: 4px;
          width: 2.5rem;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 85%);
          pointer-events: none;
          z-index: 2;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .sem-experiences-swipe-wrap.has-scroll .sem-experiences-swipe-fade {
          opacity: 1;
        }
        .sem-exp-card {
          flex: 0 0 min(68vw, 220px);
          width: min(68vw, 220px);
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 12px;
          padding: 16px;
          border: 1px solid rgba(12, 29, 34, 0.10);
          border-radius: 14px;
          background: #fff;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          scroll-snap-align: start;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .sem-exp-card:hover {
          border-color: rgba(236, 100, 53, 0.35);
          box-shadow: 0 4px 18px rgba(12, 29, 34, 0.08);
          transform: translateY(-1px);
        }
        .sem-exp-card-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(12, 29, 34, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }
        .sem-exp-card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          width: 100%;
          min-height: 0;
        }
        .sem-exp-card-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .sem-exp-card-title {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #0c1d22;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .sem-exp-card-meta {
          font-size: 11px;
          font-weight: 500;
          color: rgba(12, 29, 34, 0.45);
          line-height: 1.35;
          min-height: 15px;
        }
        .sem-exp-card-cta {
          margin-top: auto;
          padding-top: 12px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #ec6435;
          line-height: 1;
        }
        .sem-experiences-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 14px;
          padding-bottom: 2px;
        }
        .sem-experiences-dot {
          height: 8px;
          width: 8px;
          border-radius: 9999px;
          border: none;
          padding: 0;
          cursor: pointer;
          background: rgba(12, 29, 34, 0.18);
          transition: width 0.3s ease, background 0.3s ease;
          font-family: inherit;
        }
        .sem-experiences-dot.is-active {
          width: 28px;
          background: #ec6435;
        }
        @media (min-width: 769px) {
          .sem-experiences-swipe {
            margin: 0;
            padding-left: 0;
            padding-right: 2.5rem;
            scroll-padding-left: 0;
            gap: 12px;
          }
          .sem-experiences-swipe-fade { right: 0; }
          .sem-exp-card {
            flex: 0 0 200px;
            width: 200px;
          }
        }

        /* Modal expérience */
        .sem-exp-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 2100;
          background: rgba(12, 29, 34, 0.45);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 0;
          animation: semExpModalIn 0.24s ease both;
        }
        .sem-exp-modal-backdrop.is-closing {
          animation: semExpModalOut 0.22s ease both;
        }
        .sem-exp-modal-panel {
          position: relative;
          width: 100%;
          max-width: 480px;
          background: #fff;
          border-radius: 20px 20px 0 0;
          padding: 28px 24px calc(28px + env(safe-area-inset-bottom, 0px));
          box-shadow: 0 -8px 40px rgba(12, 29, 34, 0.18);
          animation: semExpPanelIn 0.28s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .sem-exp-modal-panel.is-closing {
          animation: semExpPanelOut 0.22s ease both;
        }
        @media (min-width: 640px) {
          .sem-exp-modal-backdrop {
            align-items: center;
            padding: 24px;
          }
          .sem-exp-modal-panel {
            border-radius: 18px;
            padding: 32px 28px;
          }
        }
        .sem-exp-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(12, 29, 34, 0.10);
          background: #fff;
          color: rgba(12, 29, 34, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-family: inherit;
        }
        .sem-exp-modal-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(12, 29, 34, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          margin-bottom: 14px;
        }
        .sem-exp-modal-title {
          font-family: 'Poppins', sans-serif;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.04em;
          color: #0c1d22;
          margin: 0 0 8px;
          padding-right: 36px;
          line-height: 1.2;
        }
        .sem-exp-modal-meta {
          margin: 0 0 6px;
          font-size: 13px;
          font-weight: 600;
          color: #ec6435;
        }
        .sem-exp-modal-producer {
          margin: 0 0 14px;
          font-size: 12px;
          font-weight: 500;
          color: rgba(12, 29, 34, 0.45);
        }
        .sem-exp-modal-desc {
          margin: 0;
          font-size: 14px;
          line-height: 1.65;
          color: rgba(12, 29, 34, 0.65);
        }
        @keyframes semExpModalIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes semExpModalOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes semExpPanelIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes semExpPanelOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(16px); }
        }

        /* ── Format / inclus (sous infos pratiques) ── */
        .sem-offer-format {
          margin: 28px 0 8px;
        }
        .sem-offer-format-head { margin-bottom: 16px; }
        .sem-offer-format-title {
          margin-bottom: 0 !important;
        }
        .sem-offer-format-subtitle {
          margin: 6px 0 0;
          font-size: 12.5px;
          font-weight: 500;
          line-height: 1.45;
          color: rgba(12, 29, 34, 0.55);
          letter-spacing: -0.03em;
        }
        .sem-offer-format .sem-infos-row-body {
          padding-top: 2px;
        }
        .sem-offer-format-panel.is-embedded .sem-offer-format-lead {
          margin-top: 0;
          margin-bottom: 16px;
          font-size: 14px;
        }
        .sem-offer-format-lead {
          margin: 0 0 22px;
          max-width: 40rem;
          font-family: 'Poppins', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1.45;
          color: #0c1d22;
        }
        .sem-offer-format-block { margin-bottom: 20px; }
        .sem-offer-format-block:last-child { margin-bottom: 0; }
        .sem-offer-format-h,
        .sem-offer-format .sem-mobile-collapsible-trigger h3 {
          font-family: 'Poppins', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: -0.04em;
          text-transform: none;
          color: #0c1d22;
          margin: 0 0 8px;
          line-height: 1.25;
        }
        .sem-offer-format .sem-mobile-collapsible-trigger h3 {
          margin: 0;
        }
        .sem-offer-inclus {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .sem-offer-inclus--grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 24px;
        }
        .sem-offer-inclus-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 5px 0;
          border-bottom: none;
        }
        .sem-offer-inclus-icon {
          flex-shrink: 0;
          width: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 1px;
        }
        .sem-offer-inclus-icon svg { width: 15px; height: 15px; }
        .sem-offer-inclus-label {
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.35;
          color: rgba(12, 29, 34, 0.75);
        }
        .sem-offer-programme {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .sem-offer-programme-step {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          padding: 12px 0;
          border-bottom: 1px solid rgba(12, 29, 34, 0.06);
        }
        .sem-offer-programme-time {
          flex-shrink: 0;
          width: 72px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #ec6435;
          padding-top: 2px;
        }
        .sem-offer-programme-action {
          font-size: 14px;
          font-weight: 500;
          line-height: 1.55;
          color: rgba(12, 29, 34, 0.7);
        }

        /* Collapsible dans le bloc format */
        .sem-offer-format .sem-mobile-collapsible-trigger {
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
        .sem-offer-format .sem-mobile-collapsible-chevron {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius:50%;
          background: #f4f4f4;
          color: rgba(12, 29, 34, 0.45);
          transition: transform 0.3s ease;
        }
        .sem-offer-format .sem-mobile-collapsible.is-expanded .sem-mobile-collapsible-chevron {
          transform: rotate(180deg);
        }
        .sem-offer-format .sem-mobile-collapsible-panel {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s ease;
        }
        .sem-offer-format .sem-mobile-collapsible.is-expanded .sem-mobile-collapsible-panel {
          grid-template-rows: 1fr;
        }
        .sem-offer-format .sem-mobile-collapsible-inner {
          overflow: hidden;
          min-height: 0;
        }

        .sem-detail-footer-separator { display: none; }

        @media (max-width: 768px) {
          main:has(.sem-detail-page-root) { background: #fff; }
          .sem-detail-page-root { background: #fff; min-height: auto; }
          .sem-detail-page-inner {
            padding: 0 !important;
            max-width: none !important;
          }
          .sem-detail-footer-separator {
            display: block;
            width: 100vw;
            max-width: 100vw;
            margin: 32px 0 0;
            margin-left: calc(50% - 50vw);
            padding: 0;
            border: none;
            border-top: 1px solid rgba(12, 29, 34, 0.14);
            background: transparent;
            height: 0;
            box-sizing: border-box;
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
          .sem-mobile-sheet-header { display: none !important; }
          .sem-offer-intro { margin-top: 8px; margin-bottom: 28px; }
          .sem-offer-title { margin-top: 0 !important; margin-bottom: 14px !important; }
          .sem-infos-pratiques { margin-top: 28px; }
          .sem-infos-row-body { padding-left: 16px; }
          .sem-offer-format { margin-top: 8px; margin-bottom: 24px; }
          .sem-offer-inclus--grid { grid-template-columns: 1fr; }
          .sem-mobile-devis-block { margin-top: 8px; margin-bottom: 32px; }
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
            /* Sous le burger / safe-area du header fixe */
            top: calc(64px + env(safe-area-inset-top, 0px));
            left: max(16px, env(safe-area-inset-left, 0px));
            height: auto;
            min-height: 28px;
            padding: 4px 10px 4px 7px;
            border-radius: 9999px;
            gap: 4px;
            background: rgba(0, 0, 0, 0.45);
            backdrop-filter: blur(8px);
            color: #fff;
            font-size: 8px;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            white-space: nowrap;
          }
          .sem-mobile-hero-btn--back svg {
            width: 12px;
            height: 12px;
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
            position: absolute;
            /* Aligné sous le burger (évite de passer derrière le menu) */
            top: calc(64px + env(safe-area-inset-top, 0px));
            right: max(16px, env(safe-area-inset-right, 0px));
            z-index: 20;
            background: rgba(255, 255, 255, 0.42);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border-radius: 9999px;
            padding: 5px 10px;
            font-size: 9px;
            font-weight: 700;
            color: #fff;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            pointer-events: none;
          }

          .sem-mobile-sheet {
            position: relative;
            z-index: 25;
            isolation: isolate;
            background: #fff;
            border-radius: 24px 24px 0 0;
            margin-top: -24px;
            padding: 40px 24px calc(32px + env(safe-area-inset-bottom, 0px));
          }
          .sem-mobile-sheet-header {
            display: block;
            padding: 32px 0 0;
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
            border-radius: 9999px;
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
            color: rgba(12, 29, 34, 0.65);
            line-height: 1.25;
          }
          .sem-mobile-sheet-header h1 {
            font-family: 'Poppins', sans-serif;
            font-weight: 700;
            font-style: normal;
            font-size: 26px;
            color: #0c1d22;
            line-height: 1.1;
            margin: 0 0 10px;
            letter-spacing: -0.075em;
          }
          .sem-mobile-pills {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-bottom: 8px;
          }
          .sem-mobile-pill {
            display: inline-flex;
            align-items: center;
            padding: 5px 10px;
            border-radius: 9999px;
            background: rgba(12, 29, 34, 0.06);
            font-size: 12px;
            font-weight: 600;
            color: rgba(12, 29, 34, 0.60);
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
            color: rgba(12, 29, 34, 0.40);
            margin: 0;
          }
          .sem-mobile-collapsible-chevron {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            border-radius: 9999px;
            background: rgba(255, 255, 255, 0.7);
            color: rgba(12, 29, 34, 0.40);
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
            color: #ec6435;
            margin: 0 0 12px;
            font-style: normal;
            line-height: 1.2;
          }
          .sem-mobile-producer { margin-top: 32px; margin-bottom: 28px; }
          .sem-mobile-producer-head { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
          .sem-mobile-producer-avatar { width: 52px; height: 52px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
          .sem-mobile-producer-name {
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            font-weight: 700;
            color: #0c1d22;
            margin: 0;
            line-height: 1.3;
          }
          .sem-mobile-producer-bio { font-size: 14px; color: rgba(12, 29, 34, 0.65); line-height: 1.7; margin: 0 0 16px; }
          .sem-mobile-producer-experiences-list { gap: 14px; }
          .sem-producer-exp-card {
            display: flex;
            gap: 14px;
            align-items: flex-start;
            background: #f4f4f4;
            border: 1px solid rgba(12, 29, 34, 0.06);
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
            color: #0c1d22;
            margin-bottom: 6px;
            font-weight: 700;
            line-height: 1.35;
          }
          .sem-mobile-exp-meta { display: block; font-size: 11px; color: rgba(12, 29, 34, 0.45); margin-bottom: 6px; }
          .sem-producer-exp-card p { font-size: 12px; color: rgba(12, 29, 34, 0.65); margin: 0; line-height: 1.6; }
          .sem-mobile-producer-highlight {
            font-size: 14px;
            font-style: italic;
            color: rgba(12, 29, 34, 0.55);
            line-height: 1.6;
            margin: 16px 0 0;
            padding-left: 14px;
            border-left: 3px solid #ec6435;
          }
          .sem-mobile-format-quote {
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            font-style: italic;
            color: rgba(12, 29, 34, 0.55);
            line-height: 1.6;
            margin: 0 0 20px;
            padding-left: 14px;
            border-left: 3px solid #ec6435;
          }
          .sem-mobile-devis-block { margin-top: 28px; margin-bottom: 28px; text-align: center; }
          .sem-mobile-devis-btn {
            width: 100%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: #0c1d22;
            color: #fff;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            padding: 11px 18px;
            border-radius: 9999px;
            border: none;
            cursor: pointer;
            font-family: inherit;
          }
          .sem-mobile-devis-hint { font-size: 13px; color: rgba(12, 29, 34, 0.45); line-height: 1.5; margin: 12px 0 0; }
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
            border: 1px solid rgba(12, 29, 34, 0.1);
            box-shadow: 0 4px 24px rgba(12, 29, 34, 0.08);
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
            color: rgba(12, 29, 34, 0.40);
          }
          .sem-mobile-partenaire-link {
            flex-shrink: 0;
            font-size: 11px;
            font-weight: 600;
            color: #ec6435;
            text-decoration: none;
            white-space: nowrap;
          }
          .sem-mobile-partenaire-desc {
            font-size: 13px;
            color: rgba(12, 29, 34, 0.65);
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

      <div className="sem-detail-page-inner">
        <div className="sem-detail-back-btn">
          <button
            onClick={() => router.push(offresListPath)}
            className="sem-detail-back-btn-inner"
          >
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
        <div className="sem-detail-footer-separator" aria-hidden />
      </div>
    </div>
  );
}
