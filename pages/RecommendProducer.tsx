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
    <div className="font-sans min-h-screen" style={{ background: '#faf8f5' }}>
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
        .rec-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
        }
        @media (max-width: 860px) {
          .rec-split { grid-template-columns: 1fr; }
          .rec-right { display: none !important; }
          .rec-left { padding: calc(84px + 3rem) 2rem 4rem !important; }
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
            padding: 'calc(84px + 4rem) clamp(2rem, 5vw, 5rem) 5rem',
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
          <h1 className="font-bold text-primary leading-tight mb-10" style={{ letterSpacing: '-0.01em' }}>
            <span className="font-sans not-italic" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', display: 'block' }}>
              Recommander
            </span>
            <span className="font-display italic" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', display: 'block' }}>
              un producteur
            </span>
          </h1>

          {submitSuccess ? (
            <div>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#1a2e1a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 8px 30px rgba(26,46,26,0.2)' }}>
                <svg width="24" height="24" viewBox="0 0 34 34" fill="none">
                  <path d="M8 17.5L14 23.5L26 11" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="font-display italic font-bold text-primary mb-2" style={{ fontSize: 22 }}>Recommandation envoyée !</h2>
              <p style={{ color: '#9a9080', fontSize: 13, marginBottom: 24, lineHeight: 1.7 }}>
                Merci ! Nous prendrons contact avec le producteur si le profil correspond.
              </p>
              <button
                type="button"
                onClick={() => setSubmitSuccess(false)}
                style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#1a2e1a', background: 'none', border: 'none', cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: 6, padding: 0, transition: 'color .2s'
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

        {/* ── DROITE : ÉDITORIAL ── */}
        <div
          className="rec-right"
          style={{
            background: '#faf8f5',
            padding: 'calc(84px + 4rem) clamp(2rem, 5vw, 5rem) 5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderLeft: '1px solid rgba(26,46,26,0.06)',
            position: 'sticky',
            top: 0,
            height: '100vh',
          }}
        >
          {/* Citation éditoriale */}
          <div style={{ marginBottom: 52 }}>
            <span style={{ fontSize: 72, lineHeight: 1, color: '#e67e22', fontFamily: 'Georgia, serif', display: 'block', marginBottom: 4, opacity: 0.35 }}>"</span>
            <p className="font-display italic text-primary" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', lineHeight: 1.45, marginBottom: 20 }}>
              Les meilleures pépites se trouvent grâce à ceux qui les connaissent déjà.
            </p>
            <div style={{ width: 32, height: 2, background: '#e67e22' }} />
          </div>

          {/* Liste engagements */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {[
              { icon: 'handshake', label: 'Une mise en relation directe', text: 'Nous prenons contact avec chaque producteur recommandé et étudions ensemble les possibilités d\'accueil.' },
              { icon: 'verified', label: 'Une sélection rigoureuse', text: 'Chaque producteur est rencontré sur place. Nous valorisons les savoir-faire authentiques et la passion du terroir.' },
              { icon: 'volunteer_activism', label: 'Votre réseau, notre force', text: 'Votre recommandation est la meilleure façon pour nous de découvrir des producteurs d\'exception.' },
            ].map(item => (
              <div key={item.icon} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '50%', background: 'rgba(26,46,26,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a2e1a' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{item.icon}</span>
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#1a2e1a', marginBottom: 4 }}>{item.label}</p>
                  <p style={{ fontSize: 12, color: '#9a9080', lineHeight: 1.7 }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RecommendProducer;
