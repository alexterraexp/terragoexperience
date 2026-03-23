'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../lib/supabase';
import {
  type Producer,
  type SupabaseProducerRow,
  mapSupabaseRowToFull,
  fullToProducer,
} from '../lib/producerTypes';

const FILTERS = ['Tous', 'Truffes', 'Olives', 'Fruits à coque', 'Piments', 'Vins & Spiritueux', 'Huîtres', 'Fromage', 'Maraîchage', 'Élevages', 'Brasserie'];

// Types qui correspondent à chaque filtre (comparaison insensible à la casse)
const FILTER_TYPES: Record<string, string[]> = {
  'Truffes':          ['truffes', 'truffe'],
  'Olives':           ['olives', 'olive', 'huile d\'olive'],
  'Fruits à coque':   ['fruits à coque', 'noix', 'noisettes', 'amandes', 'noix de pécan'],
  'Piments':          ['piments', 'piment'],
  'Vins & Spiritueux':['vins & spiritueux', 'vins', 'vin', 'spiritueux', 'cognac', 'pineau', 'armagnac', 'calvados'],
  'Huîtres':          ['huîtres', 'huitres', 'huître'],
  'Fromage':          ['fromage', 'fromages', 'chèvre', 'chevre'],
  'Maraîchage':       ['maraîchage', 'maraichage', 'maraîcher', 'maraicher', 'maraîchère', 'maraichere', 'légumes', 'legumes', 'potager'],
  'Élevages':         ['élevages', 'élevage', 'elevages', 'elevage', 'bovins', 'bovin', 'ovins', 'ovin', 'porcins', 'porcin', 'volailles', 'volaille'],
  'Brasserie':        ['brasserie', 'brasseur', 'bière', 'bières', 'biere', 'bieres'],
};
const REGIONS = ['Toutes régions', 'Nouvelle-Aquitaine', 'Occitanie', "Provence-Alpes-Côte-d'Azur", 'Grand Est'];

// ── Dropdown région custom (pas de <select> natif) ──────────────────────────
type RegionDropdownProps = {
  value: string;
  onChange: (v: string) => void;
};

const RegionDropdown: React.FC<RegionDropdownProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ bottom: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const isActive = value !== 'Toutes régions';

  // Mettre à jour la position du menu à l'ouverture et au scroll/resize
  useEffect(() => {
    if (!open || !triggerRef.current) return;
    const update = () => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setPosition({
          bottom: window.innerHeight - rect.top + 8,
          left: rect.left,
        });
      }
    };
    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [open]);

  // Fermer si clic extérieur
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        open &&
        triggerRef.current && !triggerRef.current.contains(target) &&
        menuRef.current && !menuRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          padding: '7px 18px',
          borderRadius: 20,
          border: isActive ? '1.5px solid #f78d00' : '1.5px solid #e5e0d8',
          background: isActive ? '#f78d00' : '#fff',
          color: isActive ? '#fff' : '#6b7280',
          fontSize: 12,
          fontWeight: 600,
          fontFamily: 'inherit',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          outline: 'none',
        }}
      >
        {value}
        <span style={{
          display: 'inline-block',
          transition: 'transform 0.2s',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          fontSize: 10,
          lineHeight: 1,
        }}>
          ▾
        </span>
      </button>

      {open && createPortal(
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            bottom: position.bottom,
            left: position.left,
            background: '#fff',
            border: '1.5px solid #e5e0d8',
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(10,44,52,0.12)',
            overflow: 'hidden',
            zIndex: 9999,
            minWidth: 200,
          }}
        >
          {REGIONS.map((r) => {
            const selected = r === value;
            return (
              <button
                key={r}
                type="button"
                onClick={() => { onChange(r); setOpen(false); }}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 16px',
                  fontSize: 12,
                  fontWeight: selected ? 700 : 500,
                  fontFamily: 'inherit',
                  background: selected ? 'rgba(247,141,0,0.10)' : 'transparent',
                  color: selected ? '#f78d00' : '#1e291a',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => { if (!selected) (e.currentTarget as HTMLButtonElement).style.background = '#f9f6f2'; }}
                onMouseLeave={(e) => { if (!selected) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
              >
                {selected && <span style={{ marginRight: 8 }}>✓</span>}{r}
              </button>
            );
          })}
        </div>,
        document.body
      )}
    </>
  );
};

// ── ProducerCard ─────────────────────────────────────────────────────────────
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
      <div style={{ position: 'relative', height: 200, overflow: 'hidden', flexShrink: 0 }}>
        {producer.cover ? (
          <img
            src={producer.cover}
            alt={`${producer.name} – ${producer.type} ${producer.location} – Terrago`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hovered ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.6s ease' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1e291a, #3a5a2a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
            🌿
          </div>
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,44,52,0.5) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(8px)', borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 600, color: '#1e291a', letterSpacing: '0.05em' }}>
          {producer.type}
        </div>
        <div style={{ position: 'absolute', bottom: 12, left: 14, fontSize: 11, color: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 13 }}>📍</span> {producer.location}
        </div>
      </div>

      <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          {producer.avatar ? (
            <img src={producer.avatar} alt={producer.name} style={{ width: 36, height: 36, minWidth: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid #f0ebe4', flexShrink: 0, aspectRatio: '1 / 1' }} />
          ) : (
            <div style={{ width: 36, height: 36, minWidth: 36, borderRadius: '50%', background: '#f5f0ea', border: '2px solid #f0ebe4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#9ca3af', flexShrink: 0 }}>
              🧑‍🌾
            </div>
          )}
          <div style={{ fontWeight: 700, fontSize: 15, color: '#1e291a', lineHeight: 1.2 }}>{producer.name}</div>
        </div>
        <p style={{ fontSize: 12.5, color: '#6b7280', lineHeight: 1.6, marginBottom: 12, fontStyle: 'italic' }}>{producer.highlight}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
          {producer.tags.map((tag) => (
            <span key={tag} style={{ background: 'rgba(247,141,0,0.12)', color: '#f78d00', fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 20, letterSpacing: '0.04em' }}>
              {tag}
            </span>
          ))}
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f0ebe4', paddingTop: 12 }}>
          <div style={{ fontSize: 11, color: '#9ca3af' }}>Jusqu'à {producer.capacity} personnes max.</div>
          <div style={{ background: '#1e291a', color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', padding: '8px 16px', borderRadius: 12, textTransform: 'uppercase' }}>
            Découvrir →
          </div>
        </div>
      </div>
    </div>
  );
};

// Recherche sur tous les champs texte de la carte
function getSearchableText(p: Producer): string {
  return [p.name, p.type, p.location, p.region, p.highlight, ...(p.tags ?? [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

// ── Page ─────────────────────────────────────────────────────────────────────
const ProducersPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('Tous');
  const [activeRegion, setActiveRegion] = useState<string>('Toutes régions');
  const [search, setSearch] = useState<string>('');
  const [producers, setProducers] = useState<Producer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const filter = searchParams.get('filter');
    if (filter && FILTERS.includes(filter)) setActiveFilter(filter);
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;
    async function fetchProducers() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: err } = await supabase.from('producers_full').select('*');
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
    const matchType = activeFilter === 'Tous' || (
      FILTER_TYPES[activeFilter]?.includes(p.type?.toLowerCase()) ?? p.type === activeFilter
    );
    const matchRegion = activeRegion === 'Toutes régions' || p.region === activeRegion;
    const matchSearch = search.trim() === '' || getSearchableText(p).includes(search.trim().toLowerCase());
    return matchType && matchRegion && matchSearch;
  });

  const handleSelectProducer = (id: string) => router.push(`/partenaires/${id}`);

  return (
    <div className="overflow-x-hidden bg-beige-bg min-h-screen font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="relative w-full">
        <div className="relative min-h-[88vh] sm:min-h-[82vh] lg:min-h-[78vh] w-full overflow-hidden flex items-center justify-center group">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[14s] group-hover:scale-[1.03]"
            style={{ backgroundImage: 'url("https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/vache2.avif' }}
            role="img"
            aria-label="Producteurs partenaires agrotourisme terroir français – Terrago"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 mt-16 sm:mt-24 lg:mt-32 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.40)' }} />
              <span style={{ color: 'rgba(255,255,255,0.60)', fontSize: 10, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase' }}>
                Le réseau Terrago
              </span>
              <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.40)' }} />
            </div>
            <h1 className="text-white font-semibold leading-[1.06] mb-6 drop-shadow-lg">
              <span className="font-sans text-4xl md:text-4xl lg:text-5xl">Nos producteurs partenaires &amp; </span>
              <span className="font-display italic text-5xl md:text-5xl lg:text-6xl">hôtes agrotourisme.</span>
            </h1>
            <p className="sr-only">
              Terrago sélectionne des producteurs engagés dans toute la France pour accueillir des groupes en séminaire au vert, team building terroir et séjour immersif. Vignerons, trufficulteurs, oléiculteurs, éleveurs, fromagers — en Provence, Nouvelle-Aquitaine, Occitanie et au-delà.
            </p>
            <p className="text-white/80 text-ml max-w-xl mx-auto mb-10 leading-relaxed">
              Des producteurs, éleveurs, vignerons et artisans soigneusement sélectionnés pour accueillir vos groupes en séminaire nature ou en séjour immersif terroir.
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <Link href="/seminaires-entreprise" className="text-white border border-white/100 hover:border-white/70 px-6 py-3 text-[10px] uppercase tracking-[0.22em] font-bold transition-all duration-300 hover:bg-white/10 rounded-full">
                Nos séminaires d'entreprise
              </Link>
              <Link href="/recommander-un-producteur" className="text-white/90 hover:text-white text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300">
                Recommander un producteur →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Espace entre hero et barre de recherche */}
      <div className="bg-beige-bg" style={{ height: 56 }} />

      {/* ── RECHERCHE + FILTRES (même fond que grille, pas de séparateur) ── */}
      <div id="section-recherche" className="bg-beige-bg" style={{ position: 'sticky', top: 0, zIndex: 10 }}>
        {/* Barre de recherche centrée */}
        <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'center' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: '#f9f6f2', borderRadius: 24,
            border: '1.5px solid #e5e0d8', padding: '10px 20px',
            width: '100%', maxWidth: 500,
          }}>
            <span style={{ color: '#9ca3af', fontSize: 15, flexShrink: 0 }}>🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un producteur, un produit, une région..."
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 13, color: '#1e291a', fontFamily: 'inherit' }}
            />
            {search && (
              <button type="button" onClick={() => setSearch('')} style={{ background: '#e5e0d8', color: '#6b7280', border: 'none', borderRadius: 12, padding: '3px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filtres */}
        <div style={{ padding: '12px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, flexWrap: 'wrap', alignItems: 'center' }}>
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(f)}
                  style={{
                    padding: '7px 18px', borderRadius: 20,
                    border: activeFilter === f ? '1.5px solid #f78d00' : '1.5px solid #e5e0d8',
                    background: activeFilter === f ? '#f78d00' : '#fff',
                    color: activeFilter === f ? '#fff' : '#6b7280',
                    fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
                    cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
                    outline: 'none',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── GRILLE ── */}
      <div className="bg-beige-bg" style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>
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

        {/* Séparateur + gros espace avant bandeau partenaire */}
        <div style={{ marginTop: 96, paddingTop: 48, borderTop: '1px solid #e5e0d8' }}>
          <div style={{ background: '#1e291a', borderRadius: 24, padding: '48px 64px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
          <div>
          <h3 className="text-white leading-snug font-semibold mb-2">
  <span style={{ fontFamily: "'Poppins', sans-serif", fontStyle: 'normal', fontWeight: 700 }} className="text-2xl md:text-3xl">
    Vous êtes un producteur engagé ou{" "}
  </span>
  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 700 }} className="text-3xl md:text-4xl">
    connaissez un talent du terroir ?
  </span>
</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, margin: 0, lineHeight: 1.6 }}>Rejoignez le réseau Terrago, accueillez des groupes en séminaire engagé ou faites-nous découvrir un producteur exceptionnel du terroir.</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/nous-rejoindre" className="bg-[#f78d00] text-white px-5 py-3 rounded-xl text-[11px] font-bold uppercase tracking-[0.1em] no-underline hover:opacity-90 transition-opacity">Devenir partenaire →</Link>
            <Link href="/recommander-un-producteur" className="bg-white/10 text-white px-5 py-3 rounded-xl text-[11px] font-bold uppercase tracking-[0.1em] border border-white/20 no-underline hover:bg-white/20 transition-colors">Recommander un producteur →</Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducersPage;
