import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';

type Step = 1 | 2;

interface CookieRow {
  label: string;
  desc: string;
  checked: boolean;
  disabled: boolean;
  onChange: () => void;
}

const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [stat, setStat] = useState(false);
  const [mktg, setMktg] = useState(false);
  const [pref, setPref] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const consent = window.localStorage.getItem('cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  const applyConsent = (s: boolean, m: boolean, p: boolean) => {
    window.localStorage.setItem('cookie_consent', JSON.stringify({ stat: s, mktg: m, pref: p }));
    if (s) ReactGA.initialize('G-SMMG33EENP');
  };

  const handleAcceptAll = () => {
    setStat(true); setMktg(true); setPref(true);
    applyConsent(true, true, true);
    setVisible(false);
  };

  const handleRefuse = () => {
    applyConsent(false, false, false);
    setVisible(false);
  };

  const handleSave = () => {
    applyConsent(stat, mktg, pref);
    setVisible(false);
  };

  if (!visible) return null;

  const rows: CookieRow[] = [
    {
      label: 'Cookies strictement nécessaires',
      desc: 'Ces cookies sont indispensables au fonctionnement du site et ne peuvent pas être désactivés.',
      checked: true,
      disabled: true,
      onChange: () => {},
    },
    {
      label: 'Cookies de performance',
      desc: 'Utilisés pour comprendre comment les visiteurs interagissent avec le site et améliorer ses performances.',
      checked: stat,
      disabled: false,
      onChange: () => setStat(v => !v),
    },
    {
      label: 'Cookies de fonctionnalité',
      desc: "Retiennent vos préférences d'affichage comme la langue ou la région.",
      checked: pref,
      disabled: false,
      onChange: () => setPref(v => !v),
    },
    {
      label: 'Cookies pour une publicité ciblée',
      desc: 'Optimisent la performance et la personnalisation de nos publicités.',
      checked: mktg,
      disabled: false,
      onChange: () => setMktg(v => !v),
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        @keyframes ckIn {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        .ck-panel { animation: ckIn .3s cubic-bezier(.22,1,.36,1) both; }
        .ck-scroll::-webkit-scrollbar { display: none; }
        .ck-scroll { scrollbar-width: none; }
        .ck-row-btn { transition: background .15s; }
        .ck-row-btn:hover { background: rgba(26,46,26,0.04) !important; }
        .ck-track { transition: background .2s; }
        .ck-thumb { transition: left .2s; }
      `}</style>

      {/* Backdrop */}
      <div style={{ position:'fixed', inset:0, zIndex:999, background:'rgba(0,0,0,0.4)' }} />

      {/* Centering wrapper */}
      <div style={{
        position:'fixed', inset:0, zIndex:1000,
        display:'flex', alignItems:'center', justifyContent:'center',
        padding:16, pointerEvents:'none',
      }}>
        <div
          className="ck-panel"
          onClick={e => e.stopPropagation()}
          style={{
            pointerEvents:'auto',
            width:'100%', maxWidth: step === 1 ? 680 : 700,
            background:'#ffffff',
            borderRadius:20,
            overflow:'hidden',
            boxShadow:'0 12px 60px rgba(0,0,0,0.25)',
            fontFamily:"'Poppins', sans-serif",
          }}
        >

          {/* ───── STEP 1 ───── */}
          {step === 1 && (
            <div style={{ padding: '32px 36px 28px' }}>
              {/* Title */}
              <p style={{
                fontWeight:700, fontSize:20, color:'#1a2e1a',
                margin:'0 0 16px', lineHeight:1.3,
              }}>
                Nous utilisons des cookies 🍪
              </p>

              {/* Body */}
              <p style={{
                fontSize:14, color:'#4a5568', lineHeight:1.75,
                margin:'0 0 28px',
              }}>
                Nous utilisons les propres cookies de Terrago et ceux de tiers pour assurer
                le bon fonctionnement de ce site Web. Si vous cliquez sur le bouton
                "Tout accepter" ci-dessous, nous utiliserons également des statistiques
                et des cookies à des fins marketing.{' '}
                <a
                  href="#"
                  onClick={e => { e.preventDefault(); setStep(2); }}
                  style={{ color:'#e67e22', fontWeight:600, textDecoration:'underline', textUnderlineOffset:3 }}
                >
                  En savoir plus
                </a>
              </p>

              {/* Footer buttons */}
              <div style={{
                display:'flex', alignItems:'center',
                justifyContent:'space-between', flexWrap:'wrap', gap:12,
              }}>
                {/* Left: settings link */}
                <a
                  href="#"
                  onClick={e => { e.preventDefault(); setStep(2); }}
                  style={{
                    fontSize:13, fontWeight:600, color:'#1a2e1a',
                    textDecoration:'underline', textUnderlineOffset:3,
                    cursor:'pointer',
                  }}
                >
                  Paramètres des cookies
                </a>

                {/* Right: action buttons */}
                <div style={{ display:'flex', gap:10 }}>
                  <button
                    onClick={handleRefuse}
                    style={{
                      padding:'12px 28px', borderRadius:9999,
                      background:'#f0ede8', color:'#1a2e1a',
                      border:'none', fontSize:13, fontWeight:600,
                      cursor:'pointer',
                    }}
                  >
                    Tout refuser
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    style={{
                      padding:'12px 28px', borderRadius:9999,
                      background:'#1a2e1a', color:'#fff',
                      border:'none', fontSize:13, fontWeight:600,
                      cursor:'pointer',
                    }}
                  >
                    Tout accepter
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ───── STEP 2 ───── */}
          {step === 2 && (
            <>
              {/* Header */}
              <div style={{
                padding:'24px 28px 20px',
                borderBottom:'1px solid #e8e4de',
                display:'flex', alignItems:'flex-start',
                justifyContent:'space-between', gap:16,
              }}>
                <div>
                  <h2 style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: 18,
                    color: '#1a2e1a',
                    margin: '0 0 8px',
                  }}>
                    Centre de préférences de la confidentialité
                  </h2>
                  <p style={{
                    fontSize:12.5, color:'#6b7280', lineHeight:1.7, margin:0,
                    maxWidth:520,
                  }}>
                    Lorsque vous consultez ce site, des données peuvent être stockées dans votre
                    navigateur sous forme de cookies. Vous pouvez choisir de ne pas autoriser
                    certains types de cookies.{' '}
                    <a href="/confidentialite" style={{ color:'#e67e22', textDecoration:'underline', textUnderlineOffset:2 }}>
                      Plus d'informations
                    </a>
                  </p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    width:32, height:32, borderRadius:'50%',
                    background:'#f0ede8', border:'none',
                    fontSize:18, cursor:'pointer', color:'#6b7280',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    flexShrink:0,
                  }}
                >
                  ×
                </button>
              </div>

              {/* Accept all button (visible in scroll area top) */}
              <div style={{ padding:'16px 28px 0' }}>
                <button
                  onClick={handleAcceptAll}
                  style={{
                    padding:'12px 24px', borderRadius:9999,
                    background:'#1a2e1a', color:'#fff',
                    border:'none', fontSize:12, fontWeight:700,
                    letterSpacing:'.06em', cursor:'pointer',
                  }}
                >
                  Tout autoriser
                </button>
              </div>

              {/* Cookie categories */}
              <div
                className="ck-scroll"
                style={{ padding:'12px 28px', maxHeight:320, overflowY:'auto' }}
              >
                {rows.map(row => (
                  <div
                    key={row.label}
                    style={{
                      border:'1px solid #e8e4de',
                      borderRadius:10, marginBottom:8, overflow:'hidden',
                    }}
                  >
                    {/* Row header */}
                    <div
                      className="ck-row-btn"
                      onClick={() => !row.disabled && setExpanded(expanded === row.label ? null : row.label)}
                      style={{
                        padding:'14px 16px',
                        display:'flex', alignItems:'center',
                        justifyContent:'space-between', gap:12,
                        cursor: row.disabled ? 'default' : 'pointer',
                        background:'#fff',
                      }}
                    >
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <span style={{
                          fontSize:16, color: row.disabled ? '#e67e22' : '#9ca3af',
                          fontWeight:700, lineHeight:1,
                        }}>
                          {expanded === row.label ? '−' : '+'}
                        </span>
                        <span style={{ fontSize:13, fontWeight:600, color:'#1a2e1a' }}>
                          {row.label}
                        </span>
                      </div>

                      {row.disabled ? (
                        <span style={{ fontSize:11, fontWeight:700, color:'#e67e22', letterSpacing:'.04em' }}>
                          Toujours actif
                        </span>
                      ) : (
                        <label
                          onClick={e => e.stopPropagation()}
                          style={{ cursor:'pointer', flexShrink:0 }}
                        >
                          <input
                            type="checkbox"
                            checked={row.checked}
                            onChange={row.onChange}
                            style={{ position:'absolute', opacity:0, width:0, height:0 }}
                          />
                          <div
                            className="ck-track"
                            style={{
                              width:46, height:26, borderRadius:13,
                              background: row.checked ? '#1a2e1a' : '#d1d5db',
                              position:'relative',
                            }}
                          >
                            <div
                              className="ck-thumb"
                              style={{
                                position:'absolute', top:4,
                                left: row.checked ? 24 : 4,
                                width:18, height:18, borderRadius:'50%',
                                background:'#fff',
                                boxShadow:'0 1px 4px rgba(0,0,0,0.18)',
                              }}
                            />
                          </div>
                        </label>
                      )}
                    </div>

                    {/* Expanded description */}
                    {expanded === row.label && (
                      <div style={{
                        padding:'0 16px 14px 40px',
                        fontSize:12, color:'#6b7280', lineHeight:1.65,
                        borderTop:'1px solid #f0ede8',
                        paddingTop:10,
                      }}>
                        {row.desc}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div style={{
                padding:'14px 28px 20px',
                borderTop:'1px solid #e8e4de',
                display:'flex', alignItems:'center',
                justifyContent:'space-between', flexWrap:'wrap', gap:10,
              }}>
                <div style={{ fontSize:11, color:'#9ca3af' }}>
                  Powered by <strong style={{ color:'#1a2e1a' }}>Terrago</strong>
                </div>
                <div style={{ display:'flex', gap:10 }}>
                  <button
                    onClick={handleRefuse}
                    style={{
                      padding:'11px 22px', borderRadius:9999,
                      background:'#f0ede8', color:'#1a2e1a',
                      border:'none', fontSize:12, fontWeight:700,
                      cursor:'pointer',
                    }}
                  >
                    Tout refuser
                  </button>
                  <button
                    onClick={handleSave}
                    style={{
                      padding:'11px 22px', borderRadius:9999,
                      background:'#1a2e1a', color:'#fff',
                      border:'none', fontSize:12, fontWeight:700,
                      cursor:'pointer',
                    }}
                  >
                    Confirmer la sélection
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CookieBanner;
