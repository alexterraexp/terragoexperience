'use client';

import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { GA_MEASUREMENT_ID } from '../lib/analytics';

const INK = '#0c1d22';
const ORANGE = '#ec6435';

const COOKIE_IMAGE =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/fromage-details2.png';

type Step = 1 | 2;

interface CookieRow {
  label: string;
  desc: string;
  checked: boolean;
  disabled: boolean;
  onChange: () => void;
}

const titleStyle: React.CSSProperties = {
  fontFamily: "'Poppins', sans-serif",
  fontSize: 26,
  fontWeight: 400,
  lineHeight: 1.25,
  letterSpacing: '-0.05em',
  color: INK,
  margin: '0 0 14px',
};

const strong: React.CSSProperties = { fontWeight: 700 };

const leadStyle: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.55,
  letterSpacing: '-0.03em',
  color: INK,
  margin: '0 0 26px',
};

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

    const handleOpen = () => {
      setStep(1);
      setVisible(true);
    };
    window.addEventListener('openCookieBanner', handleOpen);
    return () => window.removeEventListener('openCookieBanner', handleOpen);
  }, []);

  const applyConsent = (s: boolean, m: boolean, p: boolean) => {
    window.localStorage.setItem('cookie_consent', JSON.stringify({ stat: s, mktg: m, pref: p }));
    if (s) {
      ReactGA.initialize(GA_MEASUREMENT_ID);
      ReactGA.send({
        hitType: 'pageview',
        page: window.location.pathname + window.location.search,
      });
    }
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
      onChange: () => setStat((v) => !v),
    },
    {
      label: 'Cookies de fonctionnalité',
      desc: "Retiennent vos préférences d'affichage comme la langue ou la région.",
      checked: pref,
      disabled: false,
      onChange: () => setPref((v) => !v),
    },
    {
      label: 'Cookies pour une publicité ciblée',
      desc: 'Optimisent la performance et la personnalisation de nos publicités.',
      checked: mktg,
      disabled: false,
      onChange: () => setMktg((v) => !v),
    },
  ];

  return (
    <>
      <style>{`
        @keyframes ckIn {
          from { opacity: 0; transform: translateY(16px) scale(0.985); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes ckFade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: none; }
        }
        .ck-scroll::-webkit-scrollbar { width: 0; }
        .ck-scroll { scrollbar-width: none; }
        .ck-row { transition: background .15s ease; }
        .ck-row:hover { background: rgba(12,29,34,0.03) !important; }
        .ck-track { transition: background .2s ease; }
        .ck-thumb { transition: left .2s ease; }
        .ck-cta {
          border: none; border-radius: 9999px; background: ${ORANGE}; color: #fff;
          font-family: inherit; font-size: 13px; letter-spacing: -.03em; font-weight: 500;
          padding: 10px 24px; cursor: pointer; transition: background .18s ease;
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
        }
        .ck-cta:hover { background: #d9552a; }
        .ck-ghost {
          border: 1px solid rgba(12,29,34,0.14); border-radius: 9999px; background: #fff; color: ${INK};
          font-family: inherit; font-size: 13px; letter-spacing: -.03em; font-weight: 500;
          padding: 10px 22px; cursor: pointer; transition: border-color .15s ease, background .15s ease;
        }
        .ck-ghost:hover { border-color: rgba(12,29,34,0.35); background: rgba(12,29,34,0.03); }
        .ck-link {
          background: none; border: none; padding: 0; cursor: pointer; font-family: inherit;
          font-size: 12px; letter-spacing: -.02em; color: #a5a5a5; transition: color .15s ease;
          text-decoration: underline; text-underline-offset: 3px;
        }
        .ck-link:hover { color: ${INK}; }
        @media (min-width: 861px) {
          .ck-cta, .ck-ghost { font-size: 14px; padding: 11px 28px; }
        }
        @media (max-width: 860px) {
          .ck-wrapper { padding: 16px !important; align-items: center !important; }
          .ck-panel {
            width: 100% !important; max-width: 440px !important;
            height: auto !important; max-height: 50dvh !important;
            border-radius: 20px !important;
            flex-direction: column !important;
          }
          .ck-visual { width: 100% !important; height: 110px !important; flex: 0 0 110px !important; }
          .ck-content { padding: 20px 20px 0 !important; }
          .ck-footer { padding: 0 20px 18px !important; }
          .ck-title { font-size: 20px !important; }
        }
      `}</style>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1200,
          background: 'rgba(12,29,34,0.55)',
          backdropFilter: 'blur(6px)',
        }}
      />

      <div
        className="ck-wrapper"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1201,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          pointerEvents: 'none',
        }}
      >
        <div
          className="ck-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Préférences cookies"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            width: '100%',
            maxWidth: step === 1 ? 860 : 940,
            height: step === 1 ? 'auto' : 'min(600px, 92vh)',
            maxHeight: '92vh',
            background: '#fff',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 24px 70px rgba(12,29,34,.28)',
            fontFamily: "'Poppins', sans-serif",
            animation: 'ckIn .28s cubic-bezier(.22,1,.36,1) both',
          }}
        >
          <div
            className="ck-visual"
            style={{
              flex: '0 0 34%',
              width: '34%',
              backgroundImage: `url("${COOKIE_IMAGE}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            role="img"
            aria-label="Fabrication artisanale – TerraGo"
          />

          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', position: 'relative' }}>
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                aria-label="Fermer les paramètres"
                style={{
                  position: 'absolute',
                  top: 18,
                  right: 20,
                  zIndex: 2,
                  width: 30,
                  height: 30,
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  color: INK,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M2 2 15 15M15 2 2 15" />
                </svg>
              </button>
            )}

            <div
              className="ck-scroll ck-content"
              style={{
                flex: 1,
                minHeight: 0,
                overflowY: 'auto',
                padding: step === 1 ? '42px 40px 0' : '42px 40px 0',
              }}
            >
              <div key={step} style={{ animation: 'ckFade .3s ease both' }}>
                {step === 1 && (
                  <>
                    <h2 className="ck-title" style={titleStyle}>
                      Nous utilisons des <strong style={strong}>cookies.</strong>
                    </h2>
                    <p style={leadStyle}>
                      Nous utilisons les propres cookies de TerraGo et ceux de tiers pour assurer le bon
                      fonctionnement de ce site. Si vous cliquez sur « Tout accepter », nous utiliserons
                      également des statistiques et des cookies à des fins marketing.{' '}
                      <button type="button" className="ck-link" onClick={() => setStep(2)} style={{ color: ORANGE, fontWeight: 600 }}>
                        En savoir plus
                      </button>
                    </p>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className="ck-title" style={titleStyle}>
                      Centre de <strong style={strong}>préférences.</strong>
                    </h2>
                    <p style={{ ...leadStyle, marginBottom: 18 }}>
                      Lorsque vous consultez ce site, des données peuvent être stockées dans votre
                      navigateur sous forme de cookies. Vous pouvez choisir de ne pas autoriser certains
                      types.{' '}
                      <a
                        href="/confidentialite"
                        style={{ color: ORANGE, fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}
                      >
                        Plus d&apos;informations
                      </a>
                    </p>

                    <button type="button" className="ck-cta" onClick={handleAcceptAll} style={{ marginBottom: 16 }}>
                      Tout autoriser
                    </button>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 8 }}>
                      {rows.map((row) => {
                        const isOpen = expanded === row.label;
                        return (
                          <div
                            key={row.label}
                            style={{
                              border: '1px solid rgba(12,29,34,0.10)',
                              borderRadius: 14,
                              overflow: 'hidden',
                              background: '#fff',
                            }}
                          >
                            <div
                              className="ck-row"
                              onClick={() =>
                                !row.disabled && setExpanded(isOpen ? null : row.label)
                              }
                              style={{
                                padding: '13px 14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 12,
                                cursor: row.disabled ? 'default' : 'pointer',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                                <span
                                  style={{
                                    fontSize: 15,
                                    fontWeight: 600,
                                    color: row.disabled ? ORANGE : 'rgba(12,29,34,0.35)',
                                    lineHeight: 1,
                                    width: 14,
                                    textAlign: 'center',
                                    flexShrink: 0,
                                  }}
                                >
                                  {isOpen ? '−' : '+'}
                                </span>
                                <span
                                  style={{
                                    fontSize: 13,
                                    fontWeight: 600,
                                    letterSpacing: '-0.03em',
                                    color: INK,
                                  }}
                                >
                                  {row.label}
                                </span>
                              </div>

                              {row.disabled ? (
                                <span
                                  style={{
                                    fontSize: 11,
                                    fontWeight: 600,
                                    letterSpacing: '-0.02em',
                                    color: ORANGE,
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  Toujours actif
                                </span>
                              ) : (
                                <label
                                  onClick={(e) => e.stopPropagation()}
                                  style={{ cursor: 'pointer', flexShrink: 0 }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={row.checked}
                                    onChange={row.onChange}
                                    style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                                  />
                                  <div
                                    className="ck-track"
                                    style={{
                                      width: 44,
                                      height: 26,
                                      borderRadius: 13,
                                      background: row.checked ? INK : 'rgba(12,29,34,0.15)',
                                      position: 'relative',
                                    }}
                                  >
                                    <div
                                      className="ck-thumb"
                                      style={{
                                        position: 'absolute',
                                        top: 4,
                                        left: row.checked ? 22 : 4,
                                        width: 18,
                                        height: 18,
                                        borderRadius: '50%',
                                        background: '#fff',
                                        boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
                                      }}
                                    />
                                  </div>
                                </label>
                              )}
                            </div>

                            {isOpen && (
                              <div
                                style={{
                                  padding: '0 14px 14px 38px',
                                  fontSize: 12,
                                  lineHeight: 1.6,
                                  letterSpacing: '-0.02em',
                                  color: 'rgba(12,29,34,0.55)',
                                  borderTop: '1px solid rgba(12,29,34,0.06)',
                                  paddingTop: 10,
                                }}
                              >
                                {row.desc}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
              <div style={{ height: 22 }} />
            </div>

            <div className="ck-footer" style={{ flexShrink: 0, padding: '0 40px 26px' }}>
              {step === 1 ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 12,
                  }}
                >
                  <button type="button" className="ck-link" onClick={() => setStep(2)}>
                    Paramètres des cookies
                  </button>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <button type="button" className="ck-ghost" onClick={handleRefuse}>
                      Tout refuser
                    </button>
                    <button type="button" className="ck-cta" onClick={handleAcceptAll}>
                      Tout accepter
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 12,
                    borderTop: '1px solid rgba(12,29,34,0.08)',
                    paddingTop: 16,
                  }}
                >
                  <span style={{ fontSize: 11, letterSpacing: '-0.02em', color: '#a5a5a5' }}>
                    Powered by <strong style={{ color: INK, fontWeight: 600 }}>TerraGo</strong>
                  </span>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <button type="button" className="ck-ghost" onClick={handleRefuse}>
                      Tout refuser
                    </button>
                    <button type="button" className="ck-cta" onClick={handleSave}>
                      Confirmer la sélection
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieBanner;
