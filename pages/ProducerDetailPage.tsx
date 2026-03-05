import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  type ProducerFull,
  type SupabaseProducerRow,
  mapSupabaseRowToFull,
} from '../lib/producerTypes';

const Stars: React.FC<{ count: number }> = ({ count }) => (
  <span style={{ color: '#f78d00', letterSpacing: 2 }}>
    {'★'.repeat(count)}{'☆'.repeat(5 - count)}
  </span>
);

const ProducerDetailPage: React.FC = () => {
  const { producerId } = useParams<{ producerId: string }>();
  const navigate = useNavigate();
  const [producer, setProducer] = useState<ProducerFull | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImg, setActiveImg] = useState<number | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!producerId) { setProducer(null); setLoading(false); return; }
    let cancelled = false;
    async function fetchProducer() {
      setLoading(true); setError(null);
      try {
        const { data, error: err } = await supabase
          .from('producers').select('*').eq('id', producerId).maybeSingle();
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

  if (loading || !producer) return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: '#faf8f5', minHeight: '100vh' }}>
      <div style={{ height: 500, background: 'linear-gradient(135deg, #1e291a, #2d4a2d)', animation: 'pulse 1.5s ease-in-out infinite' }} />
    </div>
  );

  if (error) return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: '#faf8f5', minHeight: '100vh', paddingTop: 120, textAlign: 'center' }}>
      <p style={{ fontSize: 18, color: '#b91c1c', marginBottom: 24 }}>{error}</p>
      <button type="button" onClick={() => navigate('/partenaires')} style={{ background: '#1e291a', color: '#fff', padding: '12px 24px', borderRadius: 12, fontWeight: 600, border: 'none', cursor: 'pointer' }}>← Retour</button>
    </div>
  );

  if (!producer) return null;
   

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: '#faf8f5', minHeight: '100vh' }}>

      {/* Hero Cover — plein écran sans padding top */}
      <div style={{ position: 'relative', height: isMobile ? 320 : 500, overflow: 'hidden' }}>
        <img src={producer.cover} alt={producer.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(30,41,26,0.9) 0%, rgba(30,41,26,0.3) 60%, transparent 100%)' }} />

        {/* Bouton retour — bas gauche */}
        <button type="button" onClick={() => navigate('/partenaires')} style={{ position: 'absolute', bottom: 24, left: 24, zIndex: 10, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 12, padding: '8px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit' }}>
          ← Tous les producteurs
        </button>

        {/* Hero info — au dessus du bouton retour */}
        <div style={{ position: 'absolute', bottom: 70, left: 0, right: 0, padding: isMobile ? '0 20px' : '0 48px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                <span style={{ background: '#f78d00', color: '#fff', fontSize: 10, fontWeight: 700, padding: '4px 12px', borderRadius: 20, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{producer.type}</span>
                {producer.heroBadge && (
                  <span style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: 10, fontWeight: 600, padding: '4px 12px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.2)' }}>{producer.heroBadge}</span>
                )}
              </div>
              <h1 style={{ color: '#fff', fontSize: isMobile ? 22 : 38, fontWeight: 700, fontStyle: 'italic', margin: '0 0 6px', lineHeight: 1.2 }}>{producer.name}</h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, margin: 0 }}>📍 {producer.location} · par {producer.owner}</p>
            </div>
            {!isMobile && (
              <div style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 16, padding: '16px 24px', textAlign: 'center', flexShrink: 0 }}>
                <div style={{ color: '#f78d00', fontSize: 24, fontWeight: 800 }}>★ {producer.rating}</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 2 }}>{producer.reviewCount} expériences organisées</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rating mobile */}
      {isMobile && (
        <div style={{ background: '#fff', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #f0ebe4' }}>
          <span style={{ color: '#f78d00', fontSize: 20, fontWeight: 800 }}>★ {producer.rating}</span>
          <span style={{ fontSize: 12, color: '#9ca3af' }}>{producer.reviewCount} expériences organisées</span>
        </div>
      )}

      {/* Main content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '24px 16px' : '48px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 320px', gap: isMobile ? 32 : 48, alignItems: 'start' }}>

          {/* LEFT COLUMN */}
          <div>
            {/* About */}
            <section style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e291a', fontStyle: 'italic', marginBottom: 14 }}>À propos</h2>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.8, marginBottom: 16 }}>{producer.description}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {producer.tags.map((tag) => (
                  <span key={tag} style={{ background: 'rgba(247,141,0,0.10)', color: '#f78d00', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 20 }}>{tag}</span>
                ))}
              </div>
            </section>

            {/* Experiences */}
            <section style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e291a', fontStyle: 'italic', marginBottom: 14 }}>Expériences proposées</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {producer.experiences.map((exp) => (
                  <div key={exp.id} style={{ background: '#fff', borderRadius: 16, padding: '18px 20px', border: '1px solid #f0ebe4', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: '#f5f0ea', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{exp.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4 }}>
                        <h3 style={{ fontSize: 12, fontFamily:'poppins', fontWeight: 600, color: '#1e291a', margin: 0 }}>{exp.title}</h3>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#f78d00' }}>{exp.price}</span>
                      </div>
                      <p style={{ fontSize: 11, color: '#9ca3af', margin: '3px 0 5px' }}>{exp.duration}</p>
                      <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Gallery */}
            <section style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e291a', fontStyle: 'italic', marginBottom: 14 }}>Galerie</h2>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: 10 }}>
                {producer.gallery.map((img, i) => (
                  <div key={img} onClick={() => setActiveImg(i)} style={{ borderRadius: 12, overflow: 'hidden', aspectRatio: '4/3', cursor: 'zoom-in' }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                      onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e291a', fontStyle: 'italic', marginBottom: 14 }}>Expériences organisées</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {producer.reviews.map((r) => (
                  <div key={r.author + r.date} style={{ background: '#fff', borderRadius: 16, padding: '18px 20px', border: '1px solid #f0ebe4' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, flexWrap: 'wrap', gap: 4 }}>
                      <div>
                        <span style={{ fontWeight: 700, fontSize: 13, color: '#1e291a' }}>{r.author}</span>
                        <span style={{ fontSize: 11, color: '#9ca3af', marginLeft: 8 }}>{r.company}</span>
                      </div>
                      <span style={{ fontSize: 11, color: '#9ca3af' }}>{r.date}</span>
                    </div>
                    <Stars count={r.rating} />
                    <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7, marginTop: 8, fontStyle: 'italic' }}>"{r.text}"</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: isMobile ? 'static' : 'sticky', top: 100 }}>

            {/* Card producteur */}
            <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #f0ebe4', boxShadow: '0 8px 40px rgba(30,41,26,0.08)', overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12 }}>
             <img src={producer.avatar} alt="" style={{ width: 110, height: 110, borderRadius: '50%', objectFit: 'cover', border: '4px solid #f5f0ea', boxShadow: '0 4px 20px rgba(30,41,26,0.12)' }} />
               <div>
                 <div style={{ fontWeight: 700, fontSize: 17, color: '#1e291a' }}>{producer.owner}</div>
                 <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 3 }}>{producer.type} · {producer.location}</div>
              </div>
            </div>
              <div style={{ padding: '16px 20px' }}>
                <div style={{ background: '#f5f0ea', borderRadius: 10, padding: '10px 14px', marginBottom: 14 }}>
                  <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 2 }}>Capacité maximale</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1e291a' }}>{producer.capacity}</div>
                </div>
                <button type="button" onClick={() => setContactOpen(true)} onMouseOver={e => (e.currentTarget.style.background = '#f78d00')} onMouseOut={e => (e.currentTarget.style.background = '#2b3825')}
                style={{ width: '100%', background: '#2b3825', color: '#fff', border: 'none', borderRadius: 12, padding: '13px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Organisez votre séminaire ici !
                </button>
                <p style={{ fontSize: 10, color: '#9ca3af', textAlign: 'center', marginTop: 10 }}>Réponse sous 24h · Devis gratuit</p>
              </div>
            </div>

            {/* Certifications */}
            {producer.certifications.length > 0 && (
              <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #f0ebe4', padding: '20px' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1e291a', fontStyle: 'italic', margin: '0 0 14px' }}>Certifications</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {producer.certifications.map((c) => (
                    <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f78d00', flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: '#374151', fontWeight: 500 }}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

        {/* Lightbox */}
          {activeImg !== null && (
        <div onClick={() => setActiveImg(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button type="button" onClick={(e) => { e.stopPropagation(); setActiveImg((activeImg - 1 + producer.gallery.length) % producer.gallery.length); }}
            style={{ position: 'absolute', left: isMobile ? 10 : 24, background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: '50%', width: 44, height: 44, fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
          <img src={producer.gallery[activeImg]} alt="" onClick={(e) => e.stopPropagation()} style={{ maxWidth: isMobile ? '85vw' : '80vw', maxHeight: '85vh', borderRadius: 12, objectFit: 'contain' }} />
          <button type="button" onClick={(e) => { e.stopPropagation(); setActiveImg((activeImg + 1) % producer.gallery.length); }}
            style={{ position: 'absolute', right: isMobile ? 10 : 24, background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: '50%', width: 44, height: 44, fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
          <button type="button" onClick={() => setActiveImg(null)}
            style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: '50%', width: 36, height: 36, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
          <div style={{ position: 'absolute', bottom: 20, color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>{activeImg + 1} / {producer.gallery.length}</div>
        </div>
           )}

        {/* Contact Modal */}
        {contactOpen && (
         <div onClick={(e: React.MouseEvent<HTMLDivElement>) => { if (e.target === e.currentTarget) setContactOpen(false); }} style={{ position: 'fixed', inset: 0, background: 'rgba(30,41,26,0.6)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
           <div style={{ background: '#fff', borderRadius: 24, padding: isMobile ? '28px 20px' : '36px', maxWidth: 440, width: '100%', boxShadow: '0 40px 100px rgba(30,41,26,0.3)' }}>
            
            <h3 style={{ fontSize: 17, fontWeight: 600, fontStyle: 'italic', fontFamily: "'Poppins', sans-serif", color: '#1e291a', marginBottom: 20 }}>
             Vivez une expérience unique chez {producer.owner} à {producer.location}.
            </h3>

            <form action="https://formsubmit.co/terragoexperiences@gmail.com" method="POST">
              <input type="hidden" name="_subject" value={`Demande séminaire - ${producer.name}`} />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              {[
                { label: 'Votre nom', name: 'nom', type: 'text', placeholder: 'Jean Dupont' },
                { label: 'Email', name: 'email', type: 'email', placeholder: 'jean@entreprise.fr' },
                { label: 'Nombre de participants', name: 'participants', type: 'number', placeholder: 'ex: 20' },
              ].map((field) => (
                <div key={field.label} style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #e5e0d8', fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              ))}

              <button
                type="submit"
                onMouseOver={e => (e.currentTarget.style.background = '#f78d00')}
                onMouseOut={e => (e.currentTarget.style.background = '#1e291a')}
                style={{ width: '100%', background: '#2b3624', color: '#fff', border: 'none', borderRadius: 12, padding: '13px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', marginTop: 8, transition: 'background 0.2s' }}
              >
                Envoyer ma demande
              </button>
            </form>

            <button type="button" onClick={() => setContactOpen(false)} style={{ width: '100%', background: 'none', border: 'none', color: '#9ca3af', fontSize: 12, marginTop: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProducerDetailPage;