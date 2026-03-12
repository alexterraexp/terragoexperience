import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimate from '../components/ScrollAnimate';

const CONTACT_EMAIL = 'terragoexperiences@gmail.com';

const UNIVERS_OPTIONS = [
  { emoji: '🍷', label: 'Vin' },
  { emoji: '🫒', label: 'Olives' },
  { emoji: '🥃', label: 'Cognac' },
  { emoji: '🍄', label: 'Truffe' },
  { emoji: '🧀', label: 'Fromage' },
  { emoji: '💐', label: 'Lavande' },
  { emoji: '🌰', label: 'Noix' },
  { emoji: '✨', label: 'Surprise !' },
];

const Particuliers: React.FC = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [portable, setPortable] = useState('');
  const [periode, setPeriode] = useState('');
  const [univers, setUnivers] = useState<string[]>([]);
  const [participants, setParticipants] = useState('');
  const [precisions, setPrecisions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const toggleUnivers = (label: string) =>
    setUnivers(prev => prev.includes(label) ? prev.filter(u => u !== label) : [...prev, label]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    const message = [
      'Bonjour,',
      '',
      'Je suis intéressé(e) par une expérience ou un séjour avec Terrago. Voici les détails de ma demande :',
      '',
      `Nom : ${nom}`,
      `Prénom : ${prenom}`,
      `Email : ${email || '—'}`,
      `Téléphone : ${portable || '—'}`,
      `Période ou date souhaitée : ${periode || '—'}`,
      `Produits / univers à découvrir : ${univers.join(', ') || '—'}`,
      `Nombre de personnes : ${participants || '—'}`,
      precisions ? `Précisions : ${precisions}` : '',
      '',
      'Merci pour votre retour.',
      '',
      `${prenom} ${nom}`
    ].filter(Boolean).join('\n');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: `${prenom} ${nom}`,
          email,
          subject: `Entre amis - Demande de ${prenom} ${nom}`,
          message,
          _captcha: false,
          _template: 'table'
        })
      });
      if (response.ok) {
        setSubmitSuccess(true);
        setNom(''); setPrenom(''); setEmail(''); setPortable('');
        setPeriode(''); setUnivers([]); setParticipants(''); setPrecisions('');
      } else throw new Error();
    } catch {
      setSubmitError('Une erreur est survenue. Veuillez réessayer ou nous contacter à terragoexperiences@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans min-h-screen overflow-x-hidden" style={{ background: '#faf8f5' }}>
      <style>{`
        .part-i {
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
        .part-i:focus {
          border-color: #1a2e1a;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(26,46,26,.06);
        }
        .part-i::placeholder { color: #c4bdb4; }
        @keyframes partSpin { to { transform: rotate(360deg); } }
        @media (max-width: 600px) {
          .part-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <section
        style={{ paddingTop: 'calc(84px + clamp(3rem, 6vw, 5rem))', paddingBottom: 'clamp(4rem, 8vw, 7rem)' }}
        className="bg-white"
      >
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">

          <div className="flex items-center justify-center gap-3 mb-6">
            <div style={{ width: 20, height: 1, background: '#e67e22' }} />
            <span style={{ fontSize: 9, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', color: '#e67e22' }}>
              Entre amis
            </span>
            <div style={{ width: 20, height: 1, background: '#e67e22' }} />
          </div>

          {/* Titre original conservé tel quel */}
          <ScrollAnimate delay={100}>
            <h1 className="font-bold text-primary leading-tight mb-6">
              <span className="font-sans not-italic text-3xl sm:text-4xl md:text-4xl">
                Des expériences & séjours uniques - 100% personnalisés,{' '}
              </span>
              <span className="font-display italic text-4xl sm:text-4xl md:text-5xl">
                entre amis ou en famille.
              </span>
            </h1>
          </ScrollAnimate>

          <p style={{ color: '#9a9080', fontSize: 14, lineHeight: 1.75 }} className="max-w-2xl mx-auto">
            Vous souhaitez vivre des expériences uniques et authentiques au cœur du terroir ? Remplissez le formulaire ci-dessous : nous vous recontacterons pour vous proposer nos premières pépites.
          </p>
        </div>
      </section>

      {/* ── CE QUE VOUS VIVREZ ── */}
      <section style={{ paddingTop: 'clamp(4rem, 8vw, 7rem)', paddingBottom: 'clamp(4rem, 8vw, 7rem)' }} className="bg-beige-bg">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div style={{ width: 20, height: 1, background: '#e67e22' }} />
              <span style={{ fontSize: 9, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', color: '#e67e22' }}>
                Ce que vous vivrez
              </span>
            </div>
            <ScrollAnimate delay={150}>
              <h2 className="font-bold text-primary leading-[1.06]" style={{ letterSpacing: '-0.01em' }}>
                <span className="font-sans text-3xl sm:text-4xl">Chaque séjour</span>
                <span className="font-display italic text-4xl sm:text-4xl lg:text-5xl"> vous garantit.</span>
              </h2>
            </ScrollAnimate>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: 'nature_people', label: 'Rencontres authentiques', text: 'Partez à la rencontre de producteurs passionnés qui vous ouvrent les portes de leur monde avec sincérité.' },
              { icon: 'eco', label: 'Les mains dans la terre', text: 'Récolter, fabriquer, goûter… Des activités vraies, au rythme des saisons et des savoir-faire locaux.' },
              { icon: 'restaurant', label: 'Repas du terroir', text: 'Des repas pensés autour des producteurs locaux. Chaque assiette raconte une histoire.' },
              { icon: 'key', label: 'Clé en main', text: 'Logement, activités, repas, transport… Une logistique invisible pour une expérience inoubliable.' },
            ].map(item => (
              <div
                key={item.icon}
                className="group flex items-start gap-5 transition-all duration-300 cursor-pointer"
                style={{ background: '#fff', border: '1px solid rgba(26,46,26,0.07)', borderRadius: '20px', padding: '28px 24px' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(26,46,26,0.18)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(26,46,26,0.07)'; }}
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(26,46,26,0.06)', color: '#1a2e1a' }}
                >
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                </div>
                <div>
                  <h3 className="font-sans font-bold text-primary mb-1.5 group-hover:text-orange transition-colors" style={{ fontSize: 13 }}>
                    {item.label}
                  </h3>
                  <p style={{ color: '#7a7060', fontSize: 13, lineHeight: 1.7 }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMULAIRE ── */}
      <section
        id="projet"
        style={{ paddingTop: 'clamp(4rem, 8vw, 7rem)', paddingBottom: 'clamp(4rem, 8vw, 7rem)' }}
        className="bg-white scroll-mt-24"
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

          <div className="mb-14 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div style={{ width: 20, height: 1, background: '#e67e22' }} />
              <span style={{ fontSize: 9, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', color: '#e67e22' }}>
                Votre projet
              </span>
              <div style={{ width: 20, height: 1, background: '#e67e22' }} />
            </div>
            <ScrollAnimate delay={150}>
              <h2 className="font-bold text-primary leading-[1.06]" style={{ letterSpacing: '-0.01em' }}>
                <span className="font-sans text-3xl sm:text-4xl">Parlons de</span>
                <span className="font-display italic text-3xl sm:text-4xl lg:text-5xl"> votre séjour.</span>
              </h2>
            </ScrollAnimate>
            <p className="mt-4" style={{ color: '#9a9080', fontSize: 14, lineHeight: 1.75 }}>
              Un message suffit — nous construisons le reste avec vous.
            </p>
          </div>

          <ScrollAnimate delay={200}>
            {submitSuccess ? (
              <div
                className="max-w-xl mx-auto text-center"
                style={{ background: '#faf8f5', border: '1px solid rgba(26,46,26,0.07)', borderRadius: 24, padding: '48px 32px' }}
              >
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#1a2e1a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 30px rgba(26,46,26,0.25)' }}>
                  <svg width="28" height="28" viewBox="0 0 34 34" fill="none">
                    <path d="M8 17.5L14 23.5L26 11" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="font-display italic font-bold text-primary mb-2" style={{ fontSize: 26 }}>Demande envoyée !</h2>
                <p style={{ color: '#9a9080', fontSize: 13 }}>Nous vous recontacterons très prochainement.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto"
                style={{ background: '#ffffff', border: '1px solid rgba(26,46,26,0.06)', borderRadius: 24, padding: 'clamp(24px, 4vw, 40px)' }}
              >
                {submitError && (
                  <div style={{ background: 'rgba(230,126,34,0.07)', border: '1px solid rgba(230,126,34,0.2)', borderRadius: 12, padding: '10px 16px', marginBottom: 20, display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 15 }}>⚠️</span>
                    <p style={{ fontSize: 11, color: '#c0620a', fontWeight: 600, margin: 0 }}>{submitError}</p>
                  </div>
                )}

                {/* Nom / Prénom */}
                <div className="part-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                  <FieldBlock label="Nom" required>
                    <input className="part-i" placeholder="Dupont" value={nom} onChange={e => setNom(e.target.value)} required />
                  </FieldBlock>
                  <FieldBlock label="Prénom" required>
                    <input className="part-i" placeholder="Jean" value={prenom} onChange={e => setPrenom(e.target.value)} required />
                  </FieldBlock>
                </div>

                {/* Email / Téléphone */}
                <div className="part-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                  <FieldBlock label="Email" required>
                    <input className="part-i" type="email" placeholder="votre@email.fr" value={email} onChange={e => setEmail(e.target.value)} required />
                  </FieldBlock>
                  <FieldBlock label="Téléphone">
                    <input className="part-i" type="tel" placeholder="06 12 34 56 78" value={portable} onChange={e => setPortable(e.target.value)} />
                  </FieldBlock>
                </div>

                {/* Période */}
                <div style={{ marginBottom: 14 }}>
                  <FieldBlock label="Période ou date souhaitée">
                    <input className="part-i" placeholder="Ex. semaine du 15 août, ou dates précises" value={periode} onChange={e => setPeriode(e.target.value)} />
                  </FieldBlock>
                </div>

                {/* Participants */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b0a89e', display: 'block', marginBottom: 10 }}>
                    Nombre de personnes
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {['2 – 4', '5 – 8', '9 – 15', '16 – 25', '25+'].map(opt => {
                      const active = participants === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setParticipants(active ? '' : opt)}
                          style={{
                            padding: '6px 14px', borderRadius: 9999, fontFamily: 'inherit',
                            border: `1.5px solid ${active ? '#1a2e1a' : 'rgba(10,44,52,0.1)'}`,
                            background: active ? '#1a2e1a' : '#faf8f5',
                            color: active ? '#fff' : '#6b7280',
                            fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5,
                            boxShadow: active ? '0 2px 10px rgba(26,46,26,0.15)' : 'none',
                            transition: 'all .15s ease',
                          }}
                        >
                          {active && <span style={{ fontSize: 8 }}>✓</span>}
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Univers pills */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b0a89e', display: 'block', marginBottom: 10 }}>
                    Produits / univers à découvrir
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {UNIVERS_OPTIONS.map(opt => {
                      const active = univers.includes(opt.label);
                      return (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => toggleUnivers(opt.label)}
                          style={{
                            padding: '6px 14px', borderRadius: 9999, fontFamily: 'inherit',
                            border: `1.5px solid ${active ? '#1a2e1a' : 'rgba(10,44,52,0.1)'}`,
                            background: active ? '#1a2e1a' : '#fff',
                            color: active ? '#fff' : '#6b7280',
                            fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5,
                            boxShadow: active ? '0 2px 10px rgba(26,46,26,0.15)' : 'none',
                            transition: 'all .15s ease',
                          }}
                        >
                          {active && <span style={{ fontSize: 8 }}>✓</span>}
                          <span>{opt.emoji}</span> {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Précisions */}
                <div style={{ marginBottom: 24 }}>
                  <FieldBlock label="Précisions">
                    <textarea
                      className="part-i"
                      rows={4}
                      style={{ resize: 'none', lineHeight: 1.6 }}
                      placeholder="Nombre de personnes, envies particulières, région préférée…"
                      value={precisions}
                      onChange={e => setPrecisions(e.target.value)}
                    />
                  </FieldBlock>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
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
                      <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'partSpin .7s linear infinite', display: 'inline-block' }} />
                      Envoi…
                    </>
                  ) : (
                    <>
                      Envoyer ma demande
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </ScrollAnimate>
        </div>
      </section>

      {/* ── FOOTER LINK ── */}
      <section style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(3rem, 6vw, 5rem)' }} className="bg-beige-bg">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p style={{ color: '#b0a89e', fontSize: 13, marginBottom: 20 }}>
            En attendant, découvrez notre offre pour les entreprises et les groupes.
          </p>
          <Link
            to="/entreprises"
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1a2e1a', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'color .2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#e67e22')}
            onMouseLeave={e => (e.currentTarget.style.color = '#1a2e1a')}
          >
            Découvrir nos séminaires
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
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

export default Particuliers;
