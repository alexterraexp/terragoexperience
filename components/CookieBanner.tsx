import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';

type Step = 1 | 2;

const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [stat, setStat] = useState(false);
  const [mktg, setMktg] = useState(false);
  const [pref, setPref] = useState(false);

  useEffect(() => {
    const consent = window.localStorage.getItem('cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  const applyConsent = (s: boolean, m: boolean, p: boolean) => {
    window.localStorage.setItem('cookie_consent', JSON.stringify({ stat: s, mktg: m, pref: p }));
    if (s) ReactGA.initialize('G-SMMG33EENP');
  };

  const handleAcceptAll = () => {
    setStat(true);
    setMktg(true);
    setPref(true);
    applyConsent(true, true, true);
    setVisible(false);
  };

  const handleRefuse = () => {
    applyConsent(false, false, false);
    setVisible(false);
  };

  const handleSave = () => {
    applyConsent(stat, mktg, pref);
    const n = [stat, mktg, pref].filter(Boolean).length;
    // On ferme simplement la bannière sans message visuel
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes ckIn { from { opacity:0; transform:translateY(22px) scale(0.97) } to { opacity:1; transform:translateY(0) scale(1) } }
        @keyframes ckChk { from { opacity:0; transform:scale(0.5) } to { opacity:1; transform:scale(1) } }
        .ck-panel { animation: ckIn .32s cubic-bezier(.22,1,.36,1) both; }
        .ck-body::-webkit-scrollbar { display:none; }
      `}</style>

      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          background: 'rgba(0,0,0,0.35)',
        }}
      />

      {/* Panel commun desktop / mobile */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
          pointerEvents: 'none',
        }}
      >
        <div
          className="ck-panel"
          onClick={e => e.stopPropagation()}
          style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: 720,
            background: '#fff',
            borderRadius: 28,
            overflow: 'hidden',
            boxShadow: '0 10px 52px rgba(0,0,0,0.22)',
            fontFamily: "'Poppins', sans-serif",
            position: 'relative',
          }}
        >

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div
                style={{
                  padding: '18px 22px 12px',
                  borderBottom: '1px solid rgba(10,44,52,0.07)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img
                    src="/logo.png"
                    alt="Terrago"
                    style={{ height: 54, width: 'auto', display: 'block' }}
                  />
                  <div style={{ width: 32, height: 1, background: '#e67e22' }} />
                </div>
              </div>

              <div style={{ padding: '20px 22px 18px' }}>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: '#1a2e1a',
                    margin: '0 0 8px',
                  }}
                >
                  Aidez-nous à améliorer votre expérience
                </p>
                <p
                  style={{
                    fontSize: 12.5,
                    color: '#7a7060',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Les cookies que nous utilisons nous permettent d'améliorer le fonctionnement du
                  site, de personnaliser le contenu, de mieux mesurer notre audience et d'améliorer
                  les performances de nos publicités. Pour en savoir plus, consultez{' '}
                  <a
                    href="/confidentialite"
                    style={{
                      color: '#e67e22',
                      fontStyle: 'italic',
                      fontWeight: 700,
                      textDecoration: 'underline',
                      textUnderlineOffset: 3,
                    }}
                  >
                    notre politique de confidentialité.
                  </a>
                </p>
              </div>

              <div
                style={{
                  padding: '12px 22px 18px',
                  borderTop: '1px solid rgba(10,44,52,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: 10,
                  flexWrap: 'wrap',
                }}
              >
                <button
                  onClick={handleRefuse}
                  style={{
                    padding: '11px 22px',
                    borderRadius: 9999,
                    background: 'transparent',
                    color: '#9a9080',
                    border: 'none',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  Refuser
                </button>
                <button
                  onClick={() => setStep(2)}
                  style={{
                    padding: '11px 22px',
                    borderRadius: 9999,
                    background: '#faf8f5',
                    color: '#1a2e1a',
                    border: '1.5px solid rgba(10,44,52,0.18)',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  Personnaliser
                </button>
                <button
                  onClick={handleAcceptAll}
                  style={{
                    padding: '11px 22px',
                    borderRadius: 9999,
                    background: '#1a2e1a',
                    color: '#fff',
                    border: 'none',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  Accepter
                </button>
              </div>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div
                style={{
                  padding: '18px 22px 12px',
                  borderBottom: '1px solid rgba(10,44,52,0.07)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 14,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <img
                      src="/logo.png"
                      alt="Terrago"
                      style={{ height: 44, width: 'auto', display: 'block' }}
                    />
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: '.28em',
                        textTransform: 'uppercase',
                        color: '#e67e22',
                      }}
                    >
                      Vos préférences
                    </span>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      background: '#f4f1ec',
                      border: 'none',
                      fontSize: 17,
                      cursor: 'pointer',
                      color: '#6b7280',
                    }}
                  >
                    ×
                  </button>
                </div>
                <h2
                  style={{
                    fontStyle: 'italic',
                    fontWeight: 700,
                    fontSize: 18,
                    color: '#1a2e1a',
                    margin: '0 0 5px',
                  }}
                >
                  Gérer vos cookies.
                </h2>
                <p
                  style={{
                    fontSize: 11.5,
                    color: '#9a9080',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  Choisissez les catégories que vous souhaitez activer.
                </p>
              </div>

              <div
                className="ck-body"
                style={{
                  padding: '0 22px',
                  maxHeight: 280,
                  overflowY: 'auto',
                  scrollbarWidth: 'none',
                }}
              >
                {[
                  {
                    label: 'Fonctionnels',
                    desc: "Nécessaires au fonctionnement du site. Ils ne peuvent pas être désactivés.",
                    checked: true,
                    disabled: true,
                    onChange: () => {},
                  },
                  {
                    label: 'Statistiques',
                    desc: 'Utilisés pour comprendre comment les visiteurs interagissent avec le site.',
                    checked: stat,
                    disabled: false,
                    onChange: () => setStat(v => !v),
                  },
                  {
                    label: 'Marketing',
                    desc: 'Optimiser la performance et la personnalisation nos publicités.',
                    checked: mktg,
                    disabled: false,
                    onChange: () => setMktg(v => !v),
                  },
                  {
                    label: 'Préférences',
                    desc:
                      "Retenir vos préférences d'affichage comme la langue ou la région.",
                    checked: pref,
                    disabled: false,
                    onChange: () => setPref(v => !v),
                  },
                ].map(row => (
                  <div
                    key={row.label}
                    style={{
                      padding: '14px 0',
                      borderBottom: '1px solid rgba(10,44,52,0.06)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: 16,
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: '#1a2e1a',
                          margin: '0 0 3px',
                        }}
                      >
                        {row.label}
                      </p>
                      <p
                        style={{
                          fontSize: 11,
                          color: '#9a9080',
                          lineHeight: 1.55,
                          margin: 0,
                        }}
                      >
                        {row.desc}
                      </p>
                    </div>
                    <label
                      style={{
                        position: 'relative',
                        display: 'inline-flex',
                        alignItems: 'center',
                        cursor: row.disabled ? 'not-allowed' : 'pointer',
                        flexShrink: 0,
                        paddingTop: 2,
                        opacity: row.disabled ? 0.5 : 1,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={row.checked}
                        disabled={row.disabled}
                        onChange={row.onChange}
                        style={{
                          position: 'absolute',
                          opacity: 0,
                          width: 0,
                          height: 0,
                        }}
                      />
                      <div
                        style={{
                          width: 44,
                          height: 24,
                          borderRadius: 12,
                          background: row.checked ? '#1a2e1a' : '#e5e0d8',
                          transition: 'background .2s ease',
                          position: 'relative',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: 4,
                            left: row.checked ? 24 : 4,
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            background: '#fff',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                            transition: 'left .2s ease',
                          }}
                        />
                      </div>
                    </label>
                  </div>
                ))}
              </div>

              <div
                style={{
                  padding: '12px 22px 18px',
                  borderTop: '1px solid rgba(10,44,52,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 10,
                  flexWrap: 'wrap',
                }}
              >
                <button
                  onClick={() => setStep(1)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#9ca3af',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  ← Retour
                </button>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={handleSave}
                    style={{
                      padding: '11px 22px',
                      borderRadius: 9999,
                      background: '#faf8f5',
                      color: '#1a2e1a',
                      border: '1.5px solid rgba(10,44,52,0.18)',
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '.12em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}
                  >
                    Enregistrer
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    style={{
                      padding: '11px 22px',
                      borderRadius: 9999,
                      background: '#1a2e1a',
                      color: '#fff',
                      border: 'none',
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '.12em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}
                  >
                    Accepter tout
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