'use client';

import React, { useState, useRef, useEffect } from 'react';

const HOST_FORM_EMAIL = 'alexso.terrago@gmail.com';

const SECTEURS = ['Viticulture','Oléiculture','Horticulture','Maraîchage','Apiculture','Élevage','Ostréiculture','Trufficulture','Fromagerie / Crèmerie','Charcuterie artisanale','Distillation','Autre'];

// ─── Custom Select ─────────────────────────────────────────────────────────────

const CustomSelect: React.FC<{ value: string; onChange: (v: string) => void; placeholder?: string; options: string[] }> = ({ value, onChange, placeholder = 'Sélectionnez', options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', userSelect: 'none' }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', background: open ? '#fff' : '#faf8f5',
          border: `1px solid ${open ? '#1a2e1a' : 'rgba(10,44,52,.08)'}`,
          borderRadius: open ? '12px 12px 0 0' : 12,
          padding: '12px 40px 12px 16px',
          fontFamily: 'inherit', fontSize: 13,
          color: value ? '#1a2e1a' : '#c4bdb4',
          cursor: 'pointer', boxSizing: 'border-box',
          boxShadow: open ? '0 0 0 3px rgba(26,46,26,.06)' : 'none',
          transition: 'all .18s ease',
        }}
      >
        {value || placeholder}
      </div>
      <span
        className="material-symbols-outlined"
        style={{
          position: 'absolute', right: 14, top: 14,
          fontSize: 16, color: '#c4bdb4', pointerEvents: 'none',
          transition: 'transform .2s ease',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
      >
        expand_more
      </span>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50,
          background: '#fff',
          border: '1px solid rgba(26,46,26,0.12)', borderTop: '1px solid rgba(26,46,26,0.05)',
          borderRadius: '0 0 12px 12px',
          boxShadow: '0 8px 24px rgba(26,46,26,0.1)',
          maxHeight: 220, overflowY: 'auto',
        }}>
          {options.map((opt, i) => (
            <div
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              style={{
                padding: '10px 16px',
                fontSize: 13, fontFamily: 'inherit',
                color: value === opt ? '#1a2e1a' : '#7a7060',
                fontWeight: value === opt ? 700 : 400,
                background: value === opt ? 'rgba(26,46,26,0.04)' : 'transparent',
                cursor: 'pointer',
                borderBottom: i < options.length - 1 ? '1px solid rgba(26,46,26,0.04)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'background .12s ease',
              }}
              onMouseEnter={e => { if (value !== opt) (e.currentTarget as HTMLDivElement).style.background = 'rgba(26,46,26,0.03)'; }}
              onMouseLeave={e => { if (value !== opt) (e.currentTarget as HTMLDivElement).style.background = value === opt ? 'rgba(26,46,26,0.04)' : 'transparent'; }}
            >
              {opt}
              {value === opt && (
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8.5L6.5 12L13 5" stroke="#e67e22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Sub-components ────────────────────────────────────────────────────────────

const FieldBlock: React.FC<{ label: string; required?: boolean; children: React.ReactNode }> = ({ label, required, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
    <label style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b0a89e', display: 'block', marginBottom: 8 }}>
      {label}{required && <span style={{ color: '#e67e22', marginLeft: 4 }}>*</span>}
    </label>
    {children}
  </div>
);

const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    style={{
      paddingBottom: 14, fontSize: 9, fontWeight: 700, letterSpacing: '0.28em',
      textTransform: 'uppercase', color: isActive ? '#e67e22' : '#c4bdb4',
      background: 'none', border: 'none', cursor: 'pointer',
      position: 'relative', transition: 'color .2s', fontFamily: 'inherit',
    }}
    onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#9a9080'; }}
    onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#c4bdb4'; }}
  >
    {label}
    <div style={{ position: 'absolute', bottom: 0, left: 0, height: 2, background: '#e67e22', width: isActive ? '100%' : '0%', transition: 'width .3s ease' }} />
  </button>
);

const BenefitItem: React.FC<{ icon: string; title: string; points: string[] }> = ({ icon, title, points }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(26,46,26,0.06)', color: '#1a2e1a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{icon}</span>
      </div>
      <h3
        className="font-sans"
        style={{ fontSize: 13, fontWeight: 700, color: '#1a2e1a', margin: 0, letterSpacing: '-0.01em' }}
      >
        {title}
      </h3>
    </div>
    <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 0, margin: 0, listStyle: 'none' }}>
      {points.map((p, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 12, color: '#9a9080', lineHeight: 1.7 }}>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(230,126,34,0.4)', flexShrink: 0, marginTop: 7 }} />
          {p}
        </li>
      ))}
    </ul>
  </div>
);

// ─── Decorative Center Medallion ───────────────────────────────────────────────

const CenterMedallion: React.FC = () => (
  <div style={{
    position: 'absolute',
    left: '60%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
    pointerEvents: 'none',
  }}>
    {/* Outer ring */}
    <div style={{
      width: 88, height: 88, borderRadius: '50%',
      border: '1px solid rgba(230,126,34,0.2)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'medallionPulse 3s ease-in-out infinite',
    }}>
      {/* Middle ring */}
      <div style={{
        width: 68, height: 68, borderRadius: '50%',
        border: '1px solid rgba(230,126,34,0.35)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Inner circle */}
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          background: '#fff',
          border: '1px solid rgba(230,126,34,0.15)',
          boxShadow: '0 4px 24px rgba(26,46,26,0.12), 0 0 0 1px rgba(255,255,255,0.8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            {/* Stylized leaf / terroir glyph */}
            <path d="M12 3C12 3 5 7 5 13C5 16.866 8.134 20 12 20C15.866 20 19 16.866 19 13C19 7 12 3 12 3Z" fill="rgba(26,46,26,0.08)" stroke="#1a2e1a" strokeWidth="1.2" strokeLinejoin="round"/>
            <path d="M12 20V10" stroke="#e67e22" strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M12 14C12 14 9 12 9 9.5" stroke="#1a2e1a" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────

const Host: React.FC = () => {
  const [activeTab, setActiveTab] = useState('benefices');
  const [formData, setFormData] = useState({ responsable: '', exploitation: '', secteur: '', email: '', telephone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    const exploitation = formData.exploitation.trim();
    const email = formData.email.trim();
    const telephone = formData.telephone.trim();
    if (!exploitation) { setSubmitError("Le nom de l'exploitation est obligatoire."); return; }
    if (!email) { setSubmitError("L'email professionnel est obligatoire."); return; }
    if (!telephone) { setSubmitError("Le numéro de téléphone est obligatoire."); return; }
    setIsSubmitting(true);

    const body = ['=== CANDIDATURE NOUS REJOINDRE ===', '', `Responsable: ${formData.responsable || '—'}`, `Exploitation: ${exploitation}`, `Secteur: ${formData.secteur || '—'}`, `Email: ${email}`, `Téléphone: ${telephone}`, '', '---', 'Envoyé depuis la page Nous rejoindre - Terrago'].join('\n');

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${HOST_FORM_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: formData.responsable || 'Candidature', email: formData.email || HOST_FORM_EMAIL, subject: `Candidature Nous rejoindre - ${formData.exploitation || 'Sans nom'}`, message: body, _captcha: false, _template: 'table' })
      });
      if (!res.ok) throw new Error();
      setSubmitSuccess(true);
      setFormData({ responsable: '', exploitation: '', secteur: '', email: '', telephone: '' });
    } catch {
      setSubmitError('Une erreur est survenue. Veuillez réessayer ou nous contacter par email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans min-h-screen" style={{ background: '#faf8f5' }}>
      <style>{`
        .host-i {
          width: 100%; background: #faf8f5;
          border: 1px solid rgba(10,44,52,.08); border-radius: 12px;
          padding: 12px 16px; font-family: inherit; font-size: 13px; color: #1a2e1a;
          outline: none; transition: all .18s ease; box-sizing: border-box;
          appearance: none; -webkit-appearance: none;
        }
        .host-i:focus { border-color: #1a2e1a; background: #fff; box-shadow: 0 0 0 3px rgba(26,46,26,.06); }
        .host-i::placeholder { color: #c4bdb4; }
        .host-i option { color: #1a2e1a; background: #fff; }
        .host-i option[value=""] { color: #c4bdb4; }
        select.host-i:invalid,
        select.host-i.placeholder { color: #c4bdb4; }
        select.host-i { color: #1a2e1a; }
        select.host-i.is-placeholder { color: #c4bdb4; }
        @keyframes hostSpin { to { transform: rotate(360deg); } }
        @keyframes medallionPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.06); opacity: 0.8; }
        }
        .host-split {
          display: grid;
          grid-template-columns: 60fr 40fr;
          min-height: 100vh;
          position: relative;
        }
        /* Même marge gauche que la page Offres packagées séminaires (conteneur centré 1080px) */
        .host-left {
          padding-left: calc(max(0px, (100vw - 1080px) / 2) + clamp(1.5rem, 4vw, 3rem)) !important;
        }
        .host-right {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .host-right::-webkit-scrollbar {
          display: none;
        }
        /* Divider line between panels */
        .host-split::after {
          content: '';
          position: absolute;
          left: 60%;
          top: 0; bottom: 0;
          width: 1px;
          background: rgba(26,46,26,0.06);
          pointer-events: none;
        }
        @media (max-width: 960px) {
          .host-split { grid-template-columns: 1fr; }
          .host-split::after { display: none; }
          .host-right { border-top: 1px solid rgba(26,46,26,0.06); }
          .host-left, .host-right { padding-left: clamp(1.5rem, 4vw, 3rem) !important; padding-right: clamp(1.5rem, 4vw, 3rem) !important; }
          .host-medallion { display: none !important; }
        }
      `}</style>

      <div className="host-split">

        {/* ── GAUCHE 60% : ÉDITORIAL + TABS ── */}
        <div
          className="host-left"
          style={{
            background: '#faf8f5',
            padding: 'calc(84px + 4rem) clamp(2.5rem, 5vw, 5rem) 5rem 0',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 20, height: 1, background: '#e67e22' }} />
            <span style={{ fontSize: 9, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', color: '#e67e22' }}>
              Programme Partenaires — Terrago
            </span>
          </div>

          <h1 className="font-bold text-primary leading-tight mb-6" style={{ letterSpacing: '-0.01em' }}>
  <span className="font-sans not-italic text-4xl" style={{ lineHeight: 1 }}>Partagez votre passion, </span>
  <span className="font-display italic text-5xl" style={{ lineHeight: 1.05 }}>et votre savoir-faire.</span>
</h1>

          <p style={{ color: '#9a9080', fontSize: 13, lineHeight: 1.75, marginBottom: 40, maxWidth: 520 }}>
            Rejoignez le réseau Terrago, dédié au tourisme du terroir français. Accueillez du public, transmettez votre passion et votre savoir-faire, en toute liberté.
          </p>

          <div style={{ borderBottom: '1px solid rgba(26,46,26,0.07)', display: 'flex', gap: 28, marginBottom: 36 }}>
            <TabButton label="Bénéfices" isActive={activeTab === 'benefices'} onClick={() => setActiveTab('benefices')} />
            <TabButton label="Processus" isActive={activeTab === 'processus'} onClick={() => setActiveTab('processus')} />
          </div>

          {activeTab === 'benefices' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 40px', maxWidth: 600 }}>
              <BenefitItem icon="trending_up" title="Diversification des revenus" points={["Développez une nouvelle source de revenus liée aux expériences", "Ventes additionnelles (boutique physique & e-com)"]} />
              <BenefitItem icon="verified_user" title="Gestion Risque & Assurance" points={["Accompagnement pour l'accueil de public", "Gestion des litiges par nos conseillers dédiés"]} />
              <BenefitItem icon="auto_awesome" title="Image de Marque" points={["Reportage photo & vidéo professionnel sur demande", "Visibilité sur les réseaux sociaux", "Aide à la création de contenu"]} />
              <BenefitItem icon="hub" title="Efficacité Opérationnelle" points={["Gestion de votre calendrier", "Facturation et reporting automatisés", "Support technique 7j/7"]} />
            </div>
          )}

          {activeTab === 'processus' && (
            <div style={{ maxWidth: 560 }}>
              <p style={{ fontSize: 12, fontStyle: 'italic', color: '#b0a89e', lineHeight: 1.75, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid rgba(26,46,26,0.06)' }}>
                Notre processus garantit l'excellence du réseau. Nous vous accompagnons de l'audit initial à la gestion de votre première expérience.
              </p>
              {[
                "Vous nous contactez pour présenter votre activité et votre projet.",
                "Nous venons vous rencontrer sur votre domaine.",
                "Nous vous aidons à développer une offre d'accueil d'expériences.",
                "Nous amenons des clients sur votre domaine pour découvrir vos produits et savoir-faire.",
                "Vous faites pleinement partie du réseau et en devenez un ambassadeur."
              ].map((text, i, arr) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(26,46,26,0.05)' : 'none' }}>
                  <div style={{ flexShrink: 0, width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, #e67e22, #f5a352)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700, boxShadow: '0 2px 8px rgba(230,126,34,0.25)' }}>
                    {i + 1}
                  </div>
                  <p style={{ fontSize: 13, color: '#7a7060', lineHeight: 1.75, margin: 0 }}>{text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── MÉDAILLON CENTRAL ── */}
        <div className="host-medallion" style={{ position: 'absolute', left: '60%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, pointerEvents: 'none' }}>
          <div style={{ width: 88, height: 88, borderRadius: '50%', border: '1px solid rgba(230,126,34,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'medallionPulse 3s ease-in-out infinite' }}>
            <div style={{ width: 68, height: 68, borderRadius: '50%', border: '1px solid rgba(230,126,34,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 46, height: 46, borderRadius: '50%', background: '#fff', boxShadow: '0 4px 20px rgba(26,46,26,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(26,46,26,0.06)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3C12 3 5 7 5 13C5 16.866 8.134 20 12 20C15.866 20 19 16.866 19 13C19 7 12 3 12 3Z" fill="rgba(26,46,26,0.07)" stroke="#1a2e1a" strokeWidth="1.2" strokeLinejoin="round"/>
                  <path d="M12 20V10" stroke="#e67e22" strokeWidth="1.3" strokeLinecap="round"/>
                  <path d="M12 14C12 14 9.5 12.5 9 10" stroke="#1a2e1a" strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ── DROITE 40% : FORMULAIRE ── */}
        <div
          className="host-right"
          style={{
            background: '#fff',
            padding: 'calc(84px + 10rem) clamp(2rem, 4vw, 4rem) 5rem clamp(2.5rem, 4vw, 4rem)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
          }}
        >
          {/* Titre simplifié */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 16, height: 1, background: '#e67e22' }} />
              <span style={{ fontSize: 9, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', color: '#e67e22' }}>
                Nous rejoindre
              </span>
            </div>
            <h2 className="font-bold text-primary" style={{ letterSpacing: '-0.01em', marginBottom: 0 }}>
              <span className="font-sans not-italic" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)', color: '#9a9080', fontWeight: 400 }}>
                Contactez-nous pour{' '}
              </span>
              <span className="font-display italic" style={{ fontSize: 'clamp(1.6rem, 2.4vw, 2rem)' }}>
                rejoindre l'aventure
              </span>
            </h2>
          </div>

          {submitSuccess ? (
            <div>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#1a2e1a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 8px 30px rgba(26,46,26,0.2)' }}>
                <svg width="24" height="24" viewBox="0 0 34 34" fill="none">
                  <path d="M8 17.5L14 23.5L26 11" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-display italic font-bold text-primary" style={{ fontSize: 20, marginBottom: 8 }}>Demande envoyée !</h3>
              <p style={{ color: '#9a9080', fontSize: 13, marginBottom: 24, lineHeight: 1.7 }}>Nous vous recontacterons sous 72h.</p>
              <button
                type="button"
                onClick={() => setSubmitSuccess(false)}
                style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1a2e1a', background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, padding: 0, transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#e67e22')}
                onMouseLeave={e => (e.currentTarget.style.color = '#1a2e1a')}
              >
                Envoyer une autre candidature
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              {submitError && (
                <div style={{ background: 'rgba(230,126,34,0.07)', border: '1px solid rgba(230,126,34,0.2)', borderRadius: 12, padding: '10px 16px', display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 15 }}>⚠️</span>
                  <p style={{ fontSize: 11, color: '#c0620a', fontWeight: 600, margin: 0 }}>{submitError}</p>
                </div>
              )}

              <FieldBlock label="Nom du responsable">
                <input className="host-i" placeholder="ex: Marc Dumont" value={formData.responsable} onChange={e => setFormData(d => ({ ...d, responsable: e.target.value }))} />
              </FieldBlock>

              <FieldBlock label="Nom de l'exploitation" required>
                <input className="host-i" placeholder="ex: Château de la Roche" value={formData.exploitation} onChange={e => setFormData(d => ({ ...d, exploitation: e.target.value }))} required />
              </FieldBlock>

              <FieldBlock label="Secteur d'activité">
                <CustomSelect
                  value={formData.secteur}
                  onChange={v => setFormData(d => ({ ...d, secteur: v }))}
                  placeholder="Sélectionnez un secteur"
                  options={SECTEURS}
                />
              </FieldBlock>

              <FieldBlock label="Email professionnel" required>
                <input className="host-i" type="email" placeholder="contact@domaine.fr" value={formData.email} onChange={e => setFormData(d => ({ ...d, email: e.target.value }))} required />
              </FieldBlock>

              <FieldBlock label="Téléphone" required>
                <input className="host-i" type="tel" placeholder="ex: 06 12 34 56 78" value={formData.telephone} onChange={e => setFormData(d => ({ ...d, telephone: e.target.value }))} required />
              </FieldBlock>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  marginTop: 6, width: '100%', padding: '14px 28px', borderRadius: 9999,
                  background: '#1a2e1a', color: '#fff', border: 'none',
                  fontFamily: 'inherit', fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  transition: 'background .2s ease',
                }}
                onMouseOver={e => { if (!isSubmitting) (e.currentTarget as HTMLButtonElement).style.background = '#2b3e24'; }}
                onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1a2e1a'; }}
              >
                {isSubmitting ? (
                  <>
                    <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'hostSpin .7s linear infinite', display: 'inline-block' }} />
                    Envoi…
                  </>
                ) : (
                  <>
                    Soumettre ma candidature
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </>
                )}
              </button>

              <p style={{ fontSize: 9, color: '#b0a89e', lineHeight: 1.7, textAlign: 'center' }}>
                En soumettant ce formulaire, vous acceptez d'être recontacté par téléphone. Vos données ne seront utilisées qu'à cette fin.
              </p>
            </form>
          )}

          {/* Social proof */}
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(26,46,26,0.05)' }}>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#d4cec8', textAlign: 'center', marginBottom: 14 }}>
              Ils nous font confiance
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, opacity: 0.2, filter: 'grayscale(1)' }}>
              <div style={{ height: 18, width: 64, background: '#9a9080', borderRadius: 5 }} />
              <div style={{ height: 18, width: 64, background: '#9a9080', borderRadius: 5 }} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Host;
