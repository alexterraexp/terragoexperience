'use client';

import React, { useState, useEffect } from 'react';

const FORMSPREE_RECOMMEND_ID = (process.env.NEXT_PUBLIC_FORMSPREE_RECOMMEND_ID as string | undefined) || undefined;

// ─── Hook responsive ───────────────────────────────────────────────────────────

const useBreakpoint = () => {
  const getBreakpoint = () => {
    if (typeof window === 'undefined') return 'desktop';
    if (window.innerWidth <= 860) return 'mobile';
    if (window.innerWidth <= 1100) return 'tablet';
    return 'desktop';
  };
  const [bp, setBp] = useState(getBreakpoint);
  useEffect(() => {
    const handler = () => setBp(getBreakpoint());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return bp;
};

// ─── Sub-component ─────────────────────────────────────────────────────────────

const FieldBlock: React.FC<{ label: string; required?: boolean; children: React.ReactNode }> = ({ label, required, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
    <label style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b0a89e', display: 'block', marginBottom: 8 }}>
      {label}{required && <span style={{ color: '#e67e22', marginLeft: 4 }}>*</span>}
    </label>
    {children}
  </div>
);

// ─── Photo sources ─────────────────────────────────────────────────────────────

const SRCS = [
  'https://images.unsplash.com/photo-1638012858969-fac36ad2ea32?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/ostreiculteur.png',
  'https://images.unsplash.com/photo-1678089694013-5a72a8dddab3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1731156693854-3a9363878240?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1624806992066-5ffcf7ca186b?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1760795959671-1f6a4fcc80ba?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/cueillette.png',
  'https://images.unsplash.com/photo-1686489356497-a44ba8cf997c?q=80&w=2063&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/paysageterroir.png',
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/vigneron.jpg',
  'https://images.unsplash.com/photo-1593011951342-8426e949371f?q=80&w=976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

// 3 colonnes de photos — chaque colonne est décalée verticalement pour déborder haut/bas
// col 0 : commence haut (déborde en haut)
// col 1 : décalée vers le bas (déborde en bas)
// col 2 : commence haut aussi mais déborde différemment
const COLUMNS: string[][] = [
  [SRCS[0], SRCS[3], SRCS[10], SRCS[9]],
  [SRCS[1], SRCS[4], SRCS[7]],
  [SRCS[2], SRCS[5], SRCS[8], SRCS[6]],
];

// Heights des photos par colonne pour varier l'aspect
const COL_HEIGHTS: number[][] = [
  [260, 220, 200, 240],
  [300, 210, 260],
  [230, 280, 220, 200],
];

// ─── Main Component ────────────────────────────────────────────────────────────

const RecommendProducer: React.FC = () => {
  const bp = useBreakpoint();
  const isMobile = bp === 'mobile';

  const [formData, setFormData] = useState({
    producerName: '',
    yourName: '',
    yourEmail: '',
    producerContact: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!formData.producerName.trim() || !formData.yourName.trim() || !formData.yourEmail.trim()) {
      setSubmitError('Merci de renseigner au minimum votre nom, votre email, et le nom du producteur ou de son exploitation.');
      return;
    }

    setIsSubmitting(true);

    const emailBody = [
      '=== RECOMMANDATION PRODUCTEUR ===',
      '',
      `Nom du producteur / exploitation : ${formData.producerName || '—'}`,
      `Votre nom : ${formData.yourName || '—'}`,
      `Votre email : ${formData.yourEmail || '—'}`,
      `Contact du producteur : ${formData.producerContact || '—'}`,
      '',
      'Message :',
      formData.message || '—',
      '',
      '---',
      'Envoyé depuis le formulaire Recommander un producteur - Terrago'
    ].join('\n');

    try {
      if (FORMSPREE_RECOMMEND_ID) {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_RECOMMEND_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            _replyto: formData.yourEmail || undefined,
            producerName: formData.producerName,
            yourName: formData.yourName,
            yourEmail: formData.yourEmail,
            producerContact: formData.producerContact,
            message: formData.message,
            _subject: `Recommandation producteur : ${formData.producerName || 'Sans nom'}`,
            _format: 'plain',
            body: emailBody
          })
        });
        if (!res.ok) throw new Error('Erreur envoi');
      } else {
        const res = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            action: 'recommend_producteur',
            producerName: formData.producerName,
            yourName: formData.yourName,
            yourEmail: formData.yourEmail,
            producerContact: formData.producerContact,
            message: formData.message,
          }),
        });
        const j = (await res.json().catch(() => ({}))) as { success?: boolean };
        if (!res.ok || !j.success) throw new Error('Erreur envoi');
      }

      setSubmitSuccess(true);
      setFormData({ producerName: '', yourName: '', yourEmail: '', producerContact: '', message: '' });
    } catch {
      setSubmitError('Une erreur est survenue. Veuillez réessayer ou nous contacter par email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans min-h-screen" style={{ background: '#fff', overflowX: 'clip' }}>
      <style>{`
        .rec-i {
          width: 100%;
          background: #faf8f5;
          border: 1px solid rgba(10,44,52,.08);
          border-radius: 12px;
          padding: 12px 16px;
          font-family: inherit;
          font-size: 13px;
          color: #1a2e1a;
          outline: none;
          transition: all .18s ease;
          box-sizing: border-box;
        }
        .rec-i:focus {
          border-color: #1a2e1a;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(26,46,26,.06);
        }
        .rec-i::placeholder { color: #c4bdb4; }

        @keyframes recSpin { to { transform: rotate(360deg); } }
        @keyframes recPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.3); }
        }

        /* Layout principal */
        .rec-split {
          display: grid;
          grid-template-columns: 1fr 42%;
          min-height: 100vh;
        }

        .rec-left {
          padding: calc(84px + 4rem) clamp(2rem, 5vw, 4rem) 5rem calc(max(0px, (100vw - 1180px) / 2) + clamp(1.5rem, 4vw, 3rem));
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* Colonne photos — sticky pour rester en vue */
        .rec-right {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
        }

        .photo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          padding: 0 10px;
          height: 100%;
          /* On laisse déborder haut et bas avec un translateY négatif sur le container */
        }

        /* Chaque colonne scrolle à une vitesse différente via translateY */
        .photo-col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .photo-col-0 {
          /* Décalée vers le haut : déborde en haut */
          transform: translateY(-60px);
        }
        .photo-col-1 {
          /* Décalée vers le bas : déborde en bas */
          transform: translateY(60px);
        }
        .photo-col-2 {
          /* Décalée intermédiaire */
          transform: translateY(-20px);
        }

        .photo-item {
          border-radius: 14px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .photo-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Mobile */
        .rec-photos-mobile {
          display: none;
        }

        @media (max-width: 860px) {
          .rec-split {
            grid-template-columns: 1fr;
          }
          .rec-right {
            display: none;
          }
          .rec-left {
            padding: calc(84px + 3rem) clamp(1.5rem, 4vw, 3rem) 2rem clamp(1.5rem, 4vw, 3rem) !important;
          }
          .rec-photos-mobile {
            display: flex;
            flex-direction: row;
            gap: 12px;
            overflow-x: auto;
            padding: 0 clamp(1.5rem, 4vw, 3rem) 3rem;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .rec-photos-mobile::-webkit-scrollbar { display: none; }
        }

        @media (max-width: 600px) {
          .rec-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="rec-split">

        {/* ── GAUCHE : FORMULAIRE ── */}
        <div className="rec-left">
          <div className="flex items-center gap-3 mb-8">
            <div style={{ width: 20, height: 1, background: '#e67e22' }} />
            <span style={{ fontSize: 9, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', color: '#e67e22' }}>
              Partagez votre réseau
            </span>
          </div>

          <h1 className="font-bold text-primary leading-tight mb-6" style={{ letterSpacing: '-0.01em' }}>
  <span className="font-sans not-italic text-5xl" style={{ display: 'block', lineHeight: 1, marginBottom: -6 }}>
    Recommander
  </span>
  <span className="font-display italic text-6xl" style={{ display: 'block', lineHeight: 1.05 }}>
    un producteur
  </span>
</h1>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: '#f5f2ed', borderRadius: 14, padding: '10px 16px',
            marginBottom: '2rem', width: 'fit-content',
          }}>
            <div style={{ width: 8, height: 8, background: '#e67e22', borderRadius: '50%', flexShrink: 0, animation: 'recPulse 2s infinite' }} />
            <span style={{ fontSize: 11, color: '#7a6e62' }}>
              On a hâte de <strong style={{ color: '#1a2e1a' }}>découvrir vos pépites !</strong>
            </span>
          </div>

          {submitSuccess ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#1a2e1a', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 30px rgba(26,46,26,0.2)' }}>
                <svg width="24" height="24" viewBox="0 0 34 34" fill="none">
                  <path d="M8 17.5L14 23.5L26 11" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="font-display italic font-bold text-primary" style={{ fontSize: 22 }}>Recommandation envoyée !</h2>
              <p style={{ fontSize: 13, color: '#7a6e62', lineHeight: 1.7 }}>
                Merci pour votre coup de pouce. On contactera <strong>{formData.producerName || 'ce producteur'}</strong> dans les prochains jours pour lui présenter Terrago.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                style={{
                  background: 'none', border: 'none', fontFamily: 'inherit',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: '#1a2e1a', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6, padding: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#e67e22')}
                onMouseLeave={e => (e.currentTarget.style.color = '#1a2e1a')}
              >
                Envoyer une autre recommandation
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {submitError && (
                <div style={{ background: 'rgba(230,126,34,0.07)', border: '1px solid rgba(230,126,34,0.2)', borderRadius: 12, padding: '10px 16px', display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 15 }}>⚠️</span>
                  <p style={{ fontSize: 11, color: '#c0620a', fontWeight: 600, margin: 0 }}>{submitError}</p>
                </div>
              )}

              <FieldBlock label="Nom du producteur ou de l'exploitation" required>
                <input
                  className="rec-i"
                  placeholder="ex: Domaine des Oliviers"
                  value={formData.producerName}
                  onChange={e => setFormData(d => ({ ...d, producerName: e.target.value }))}
                />
              </FieldBlock>

              <div className="rec-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <FieldBlock label="Votre nom" required>
                  <input
                    className="rec-i"
                    placeholder="ex: Marie Dupont"
                    value={formData.yourName}
                    onChange={e => setFormData(d => ({ ...d, yourName: e.target.value }))}
                  />
                </FieldBlock>
                <FieldBlock label="Votre email" required>
                  <input
                    className="rec-i"
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.yourEmail}
                    onChange={e => setFormData(d => ({ ...d, yourEmail: e.target.value }))}
                  />
                </FieldBlock>
              </div>

              <FieldBlock label="Contact du producteur (email ou téléphone)">
                <input
                  className="rec-i"
                  placeholder="ex: contact@domaine.fr ou 06 12 34 56 78"
                  value={formData.producerContact}
                  onChange={e => setFormData(d => ({ ...d, producerContact: e.target.value }))}
                />
              </FieldBlock>

              <FieldBlock label="Quelques mots (secteur, région, pourquoi vous le recommandez)">
                <textarea
                  className="rec-i"
                  rows={4}
                  style={{ resize: 'none', lineHeight: 1.6 }}
                  placeholder="ex: Viticulteur en Bourgogne, accueil déjà en place, très investi dans la transmission..."
                  value={formData.message}
                  onChange={e => setFormData(d => ({ ...d, message: e.target.value }))}
                />
              </FieldBlock>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  marginTop: 6,
                  width: '100%', padding: '14px 28px', borderRadius: 9999,
                  background: '#1a2e1a', color: '#fff', border: 'none',
                  fontFamily: 'inherit', fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  transition: 'background .2s ease',
                }}
                onMouseOver={e => { if (!isSubmitting) (e.currentTarget as HTMLButtonElement).style.background = '#2b3e24'; }}
                onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1a2e1a'; }}
              >
                {isSubmitting ? (
                  <>
                    <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'recSpin .7s linear infinite', display: 'inline-block' }} />
                    Envoi…
                  </>
                ) : (
                  <>
                    Envoyer la recommandation
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </>
                )}
              </button>

              <p style={{ fontSize: 9, color: '#b0a89e', lineHeight: 1.7, textAlign: 'center' }}>
                En envoyant ce formulaire, vous acceptez que Terrago utilise ces informations pour contacter le producteur recommandé. Nous ne revendons pas vos données.
              </p>
            </form>
          )}
        </div>

        {/* ── DROITE : GRILLE 3 COLONNES FIXE ── */}
        <div className="rec-right">
          <div className="photo-grid">
            {COLUMNS.map((col, colIdx) => (
              <div
                key={colIdx}
                className={`photo-col photo-col-${colIdx}`}
              >
                {col.map((src, imgIdx) => (
                  <div
                    key={imgIdx}
                    className="photo-item"
                    style={{ height: COL_HEIGHTS[colIdx][imgIdx] }}
                  >
                    <img src={src} alt="" loading="lazy" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── MOBILE UNIQUEMENT : PHOTOS HORIZONTALES ── */}
      {isMobile && (
        <div className="rec-photos-mobile">
          {SRCS.slice(0, 10).map((src, i) => (
            <div key={i} style={{ borderRadius: 14, overflow: 'hidden', flexShrink: 0, width: '72vw', maxWidth: 280 }}>
              <img src={src} alt="" style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default RecommendProducer; 
