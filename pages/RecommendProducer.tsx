import React, { useState } from 'react';

const RECOMMEND_EMAIL = 'alexso.terrago@gmail.com';
const FORMSPREE_RECOMMEND_ID = (import.meta.env?.VITE_FORMSPREE_RECOMMEND_ID as string | undefined) || undefined;

// ─── Sub-component ─────────────────────────────────────────────────────────────

const FieldBlock: React.FC<{ label: string; required?: boolean; children: React.ReactNode }> = ({ label, required, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
    <label style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b0a89e', display: 'block', marginBottom: 8 }}>
      {label}{required && <span style={{ color: '#e67e22', marginLeft: 4 }}>*</span>}
    </label>
    {children}
  </div>
);

// ─── Photo cards ───────────────────────────────────────────────────────────────

const SRCS = [
  'https://images.unsplash.com/photo-1626029322254-89214dcfa056?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1761839258830-81f87b1c6d62?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1598722818387-cbdaa0dc58d2?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1731156693854-3a9363878240?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1761839257287-3030c9300ece?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519411792752-25c2468cccb3?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1749628523017-074d9225c215?q=80&w=600&auto=format&fit=crop',
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/solproducteurs.png',
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/paysageterroir.png',
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/pimentsbaptiste/b5.png',

];

const ANIM_DURATION = 15;

interface PhotoCard {
  src: string;
  width: number;
  height: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotate: string;
  delay: string;
}

// 7 cartes couvrant bien les zones : haut-gauche, haut-droite, milieu-gauche,
// milieu-centre, milieu-droite, bas-gauche, bas-droite
const PHOTOS: PhotoCard[] = [
  { src: SRCS[0], width: 310, height: 370, top: '15%',    left: '6%',   rotate: '-4deg', delay: '0s'   },
  { src: SRCS[7], width: 365, height: 405, top: '9%',    right: '10%',  rotate: '3deg',  delay: '1s'   },
  { src: SRCS[5], width: 225, height: 345, top: '59%',   left: '4%',   rotate: '5deg',  delay: '3s'   },
  { src: SRCS[9], width: 285, height: 395, bottom: '3%',   left: '36%',  rotate: '-2deg', delay: '4s'   },
  { src: SRCS[4], width: 225, height: 315, bottom: '13%',    right: '4%',  rotate: '7deg', delay: '2s'   },

];

// ─── Main Component ────────────────────────────────────────────────────────────

const RecommendProducer: React.FC = () => {
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
        const res = await fetch(`https://formsubmit.co/ajax/${RECOMMEND_EMAIL}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: formData.yourName || 'Anonyme',
            email: formData.yourEmail || RECOMMEND_EMAIL,
            subject: `Recommandation producteur : ${formData.producerName || 'Sans nom'}`,
            message: emailBody,
            _captcha: false,
            _template: 'table'
          })
        });
        if (!res.ok) throw new Error('Erreur envoi');
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

        @keyframes photoFloat {
          0%   { opacity: 0; transform: var(--rot) translateY(28px); }
          10%  { opacity: 1; transform: var(--rot) translateY(0px); }
          78%  { opacity: 1; transform: var(--rot) translateY(-10px); }
          92%  { opacity: 0; transform: var(--rot) translateY(-22px); }
          100% { opacity: 0; transform: var(--rot) translateY(28px); }
        }

        .photo-card {
          position: absolute;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.18);
          opacity: 0;
          animation: photoFloat ${ANIM_DURATION}s ease-in-out infinite;
        }
        .photo-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .rec-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
        }
        .rec-left {
          padding-left: calc(max(0px, (100vw - 1080px) / 2) + clamp(1.5rem, 4vw, 3rem)) !important;
        }
        @media (max-width: 860px) {
          .rec-split { grid-template-columns: 1fr; }
          .rec-right { display: none !important; }
          .rec-left { padding: calc(84px + 3rem) clamp(1.5rem, 4vw, 3rem) 4rem clamp(1.5rem, 4vw, 3rem) !important; }
        }
        @media (max-width: 600px) {
          .rec-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="rec-split">

        {/* ── GAUCHE : FORMULAIRE ── */}
        <div
          className="rec-left"
          style={{
            background: '#fff',
            padding: 'calc(84px + 4rem) clamp(2rem, 5vw, 5rem) 5rem 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div style={{ width: 20, height: 1, background: '#e67e22' }} />
            <span style={{ fontSize: 9, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', color: '#e67e22' }}>
              Partagez votre réseau
            </span>
          </div>

          {/* Titre */}
          <h1 className="font-bold text-primary leading-tight mb-6" style={{ letterSpacing: '-0.01em' }}>
            <span className="font-sans not-italic" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', display: 'block' }}>
              Recommander
            </span>
            <span className="font-display italic" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', display: 'block' }}>
              un producteur
            </span>
          </h1>

          {/* Stat card */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: '#f5f2ed', borderRadius: 14, padding: '10px 16px',
            marginBottom: '2rem', width: 'fit-content',
          }}>
            <div style={{ width: 8, height: 8, background: '#e67e22', borderRadius: '50%', flexShrink: 0, animation: 'recPulse 2s infinite' }} />
            <span style={{ fontSize: 11, color: '#7a6e62' }}>
             On a hâte de <strong style={{ color: '#1a2e1a' }}>découvrir vos pépites !</strong>  </span>
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

              <FieldBlock label="Nom du producteur ou de l'exploitation">
                <input
                  className="rec-i"
                  placeholder="ex: Domaine des Oliviers"
                  value={formData.producerName}
                  onChange={e => setFormData(d => ({ ...d, producerName: e.target.value }))}
                />
              </FieldBlock>

              <div className="rec-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <FieldBlock label="Votre nom">
                  <input
                    className="rec-i"
                    placeholder="ex: Marie Dupont"
                    value={formData.yourName}
                    onChange={e => setFormData(d => ({ ...d, yourName: e.target.value }))}
                  />
                </FieldBlock>
                <FieldBlock label="Votre email">
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

        {/* ── DROITE : PHOTOS FLOTTANTES SANS FOND ── */}
        <div
          className="rec-right"
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            background: 'transparent',
          }}
        >
          {PHOTOS.map((photo, i) => (
            <div
              key={i}
              className="photo-card"
              style={{
                width: photo.width,
                height: photo.height,
                top: photo.top,
                bottom: photo.bottom,
                left: photo.left,
                right: photo.right,
                animationDelay: photo.delay,
                ['--rot' as string]: `rotate(${photo.rotate})`,
              } as React.CSSProperties}
            >
              <img src={photo.src} alt="" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default RecommendProducer;
