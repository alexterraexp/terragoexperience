import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  type Producer,
  type SupabaseProducerRow,
  mapSupabaseRowToFull,
  fullToProducer,
} from '../lib/producerTypes';

const FILTERS = ['Tous', 'Olives', 'Huîtres', 'Vins', 'Piments', 'Truffes', 'Agrumes', 'Noix', 'Spiritueux', 'Élevages'];
const REGIONS = ['Toutes régions', 'Nouvelle-Aquitaine', 'Occitanie', "Provence-Alpes-Côte-d'Azur", 'Grand Est'];

type ProducerCardProps = {
  producer: Producer;
  onClick: (id: string) => void;
};

const ProducerCard: React.FC<ProducerCardProps> = ({ producer, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onClick(producer.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        borderRadius: 20,
        overflow: 'hidden',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: hovered ? '0 20px 60px rgba(10,44,52,0.14)' : '0 4px 24px rgba(10,44,52,0.07)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        border: '1px solid rgba(10,44,52,0.06)',
      }}
    >
      {/* Cover */}
      <div style={{ position: 'relative', height: 200, overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={producer.cover}
          alt={producer.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.6s ease',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,44,52,0.5) 0%, transparent 60%)' }} />

        {/* Badge type */}
        <div style={{
          position: 'absolute', top: 14, left: 14,
          background: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(8px)',
          borderRadius: 20, padding: '4px 12px',
          fontSize: 11, fontWeight: 600, color: '#1e291a',
          letterSpacing: '0.05em',
        }}>
          {producer.type}
        </div>

        {/* Rating */}
        <div style={{
          position: 'absolute', top: 14, right: 14,
          background: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(8px)',
          borderRadius: 20, padding: '4px 10px',
          fontSize: 12, fontWeight: 700, color: '#f78d00',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          ★ {producer.rating}
        </div>

        {/* Location */}
        <div style={{
          position: 'absolute', bottom: 12, left: 14,
          fontSize: 11, color: 'rgba(255,255,255,0.9)',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <span style={{ fontSize: 13 }}>📍</span> {producer.location}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <img
            src={producer.avatar}
            alt=""
            style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid #f0ebe4' }}
          />
          <div style={{ fontWeight: 700, fontSize: 15, color: '#1e291a', lineHeight: 1.2 }}>
            {producer.name}
          </div>
        </div>

        <p style={{ fontSize: 12.5, color: '#6b7280', lineHeight: 1.6, marginBottom: 12, fontStyle: 'italic' }}>
          {producer.highlight}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
          {producer.tags.map((tag) => (
            <span key={tag} style={{
              background: 'rgba(247,141,0,0.12)', color: '#f78d00',
              fontSize: 10, fontWeight: 600, padding: '3px 10px',
              borderRadius: 20, letterSpacing: '0.04em',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 'auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderTop: '1px solid #f0ebe4', paddingTop: 12,
        }}>
          <div style={{ fontSize: 11, color: '#9ca3af' }}>
            Jusqu'à {producer.capacity} personnes max.
          </div>
          <div style={{
            background: '#1e291a', color: '#fff',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
            padding: '8px 16px', borderRadius: 12, textTransform: 'uppercase',
          }}>
            Découvrir →
          </div>
        </div>
      </div>
    </div>
  );
};

const ProducersPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('Tous');
  const [activeRegion, setActiveRegion] = useState<string>('Toutes régions');
  const [search, setSearch] = useState<string>('');
  const [producers, setProducers] = useState<Producer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    async function fetchProducers() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: err } = await supabase.from('producers').select('*');
        if (cancelled) return;
        if (err) {
          setError(err.message);
          setProducers([]);
        } else {
          const rows = (data ?? []) as SupabaseProducerRow[];
          setProducers(rows.map((row) => fullToProducer(mapSupabaseRowToFull(row))));
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Erreur lors du chargement des producteurs');
          setProducers([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchProducers();
    return () => { cancelled = true; };
  }, []);

  const filtered = producers.filter((p) => {
    const matchType = activeFilter === 'Tous' || p.type === activeFilter;
    const matchRegion = activeRegion === 'Toutes régions' || p.region === activeRegion;
    const lowerSearch = search.toLowerCase();
    const matchSearch =
      p.name.toLowerCase().includes(lowerSearch) ||
      p.location.toLowerCase().includes(lowerSearch);
    return matchType && matchRegion && matchSearch;
  });

  const handleSelectProducer = (id: string) => {
    navigate(`/producteurs/${id}`);
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: '#faf8f5', minHeight: '100vh' }}>

      {/* Hero */}
      <div className="px-4 sm:px-6 lg:px-10 pt-32 sm:pt-40 pb-12 sm:pb-16 bg-beige-bg scroll-mt-24" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
         <div className="absolute inset-0 opacity-0.06 bg-radial-gradient(circle at 1px 1px, #1e291a 1px, transparent 0) [32px_32px]" style={{ pointerEvents: 'none' }} />        <span style={{ display: 'inline-block', padding: '4px 12px', background: '#f78d00', color: '#fff', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: 9, marginBottom: 16, borderRadius: 9999, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          Le réseau Terrago
        </span>
        <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-7xl font-bold text-primary leading-none sm:leading-tight px-2 sm:px-2 flex flex-col sm:flex-row items-center sm:items-baseline justify-center gap-x-2 gap-y-1 sm:gap-y-0 whitespace-normal sm:whitespace-nowrap" style={{ marginBottom: '24px' }}>
          <span className="font-sans not-italic text-[0.7em] md:text-[0.7em]">Nos producteurs </span>
          <span className="font-display italic">partenaires.</span>
        </h1>
        <p style={{ color: '#6b7280', fontSize: 14, maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.7 }}>
          Des producteurs, éleveurs, vignerons et artisans soigneusement sélectionnés pour leur authenticité et leur savoir-faire.
        </p>

        {/* Search */}
        <div style={{ maxWidth: 420, margin: '0 auto', background: '#fff', borderRadius: 16, padding: '4px 4px 4px 20px', display: 'flex', alignItems: 'center', gap: 8, border: '1.5px solid #e5e0d8', boxShadow: '0 4px 16px rgba(10,44,52,0.08)' }}>
          <span style={{ color: '#9ca3af', fontSize: 16 }}>🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un producteur, une région..."
            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#1e291a', fontSize: 13, fontFamily: 'inherit' }}
          />
          {search && (
            <button type="button" onClick={() => setSearch('')} style={{ background: '#f0ebe4', border: 'none', color: '#6b7280', borderRadius: 10, padding: '6px 12px', cursor: 'pointer', fontSize: 11 }}>
              Effacer
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f0ebe4', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, flexWrap: 'wrap' }}>
            {FILTERS.map((f) => (
              <button key={f} type="button" onClick={() => setActiveFilter(f)} style={{ padding: '7px 18px', borderRadius: 20, border: activeFilter === f ? '1.5px solid #1e291a' : '1.5px solid #e5e0d8', background: activeFilter === f ? '#1e291a' : '#fff', color: activeFilter === f ? '#fff' : '#6b7280', fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
                {f}
              </button>
            ))}
            <div style={{ width: 1, background: '#e5e0d8', margin: '0 4px' }} />
            <select value={activeRegion} onChange={(e) => setActiveRegion(e.target.value)} style={{ padding: '7px 18px', borderRadius: 20, border: '1.5px solid #e5e0d8', background: '#fff', color: '#6b7280', fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', outline: 'none' }}>
              {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>
        {loading && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#6b7280' }}>
            <p style={{ fontSize: 16, fontWeight: 600 }}>Chargement des producteurs...</p>
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#b91c1c' }}>
            <p style={{ fontSize: 16, fontWeight: 600 }}>Erreur</p>
            <p style={{ fontSize: 14, marginTop: 8 }}>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 28 }}>
              {filtered.length} producteur{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 28, alignItems: 'stretch' }}>
              {filtered.map((p) => (
                <ProducerCard key={p.id} producer={p} onClick={handleSelectProducer} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '80px 0', color: '#9ca3af' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🌾</div>
                <p style={{ fontSize: 16, fontWeight: 600 }}>Aucun producteur trouvé</p>
                <p style={{ fontSize: 13, marginTop: 8 }}>Essayez d'autres filtres</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProducersPage;
