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
  const [activeFormat, setActiveFormat] = useState('1jour');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchSeminaires().then(data => {
      const found = data.find(s => s.slug === slug) ?? null;
      setSeminaire(found);
      setAllSeminaires(data);
      setNotFound(!found);
      if (found && !(activeFormat in found.formats)) {
        setActiveFormat(Object.keys(found.formats)[0] ?? '1jour');
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#faf8f5' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 32, height: 32, border: '2px solid rgba(26,46,26,0.1)', borderTop: '2px solid #1a2e1a', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
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
        <h2 style={{ fontStyle: 'italic', fontWeight: 700, fontSize: 28, color: '#1a2e1a', margin: 0 }}>Offre introuvable</h2>
        <p style={{ color: '#9a9080', fontSize: 14, margin: 0 }}>Cette offre n'existe pas ou a été supprimée.</p>
        <button
          onClick={() => router.push(offresListPath)}
          style={{ marginTop: 8, background: '#1a2e1a', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', padding: '12px 24px', borderRadius: 9999, border: 'none', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>
          ← Toutes nos offres
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: '#faf8f5', minHeight: '100vh', fontFamily: 'inherit' }}>
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
        .sem-format-tabs { display:flex; gap:0; background:rgba(26,46,26,0.05); border-radius:9999px; padding:6px; margin-left:auto; flex-shrink:0; }
        .fmt-tab { flex:1; padding:10px 18px; border-radius:9999px; border:none; font-family:inherit; font-size:10px; font-weight:700; letter-spacing:0.06em; cursor:pointer; transition:all 0.18s ease; white-space:nowrap; text-transform:uppercase; }
        .sem-photo-grid { display:grid; gap:8px; border-radius:16px; overflow:hidden; margin-bottom:40px; position:relative; }
        .sem-photo-grid.has-small { grid-template-columns:1fr 1fr; grid-template-rows:repeat(2,clamp(160px,18vw,220px)); }
        .sem-photo-grid.no-small  { grid-template-columns:1fr; grid-template-rows:clamp(300px,36vw,440px); }
        .sem-photo-main { cursor:pointer; overflow:hidden; }
        .sem-photo-grid.has-small .sem-photo-main { grid-row:1/3; }

        /* Caché par défaut sur desktop */
        .sem-mobile-carousel { display: none; }

        /* Supprime le padding-top sur mobile pour coller au header */
        .sem-detail-page-inner { padding-top: calc(84px + 2rem); }

        @media (max-width: 768px) {
          .sem-detail-page-inner { padding-top: 0 !important; }
          .sem-detail-cols { grid-template-columns: 1fr; gap: 24px; }
          .sem-price-col { position: static; }
          .sem-format-tabs { margin-left: 0; width: 100%; }
          .sem-format-tabs .fmt-tab { flex: 1; text-align: center; }
          .sem-mobile-carousel { display:block; position:relative; width:100vw; left:50%; transform:translateX(-50%); height:75vh; overflow:hidden; margin-bottom:20px; border-radius:0 0 24px 24px; }
          .sem-photo-grid-desktop { display:none !important; }
          .sem-detail-title { display:none; }
          .sem-detail-back-btn { display:none; }
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

      <div
        className="sem-detail-page-inner"
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1rem, 3vw, 2rem) 80px', boxSizing: 'border-box' }}
      >
        {/* Bouton retour (desktop uniquement — sur mobile il est dans le carrousel) */}
        <div className="sem-detail-back-btn" style={{ marginBottom: 28, paddingTop: 'calc(84px + 2rem)' }}>
          <button
            onClick={() => router.push(offresListPath)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(26,46,26,0.06)', border: 'none', borderRadius: 9999, padding: '9px 18px', fontSize: 11, fontWeight: 700, color: '#1a2e1a', cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            ← Toutes nos offres
          </button>
        </div>

        {/* Vue détail */}
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
