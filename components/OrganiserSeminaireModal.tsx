'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { frenchPlaceKindLabel, matchFrenchPlaces } from '../lib/frenchCities';
import {
  MiniDateRangeCalendar,
  SEMINAIRE_PERIODS,
  fmtDayShort,
} from './MiniDateRangeCalendar';
import { trackGenerateLead } from '../lib/analytics';

const INK = '#0c1d22';
const ORANGE = '#ec6435';

const HOME_BUCKET = 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME';

/** Un visuel par écran (index = étape − 1), le 5e accompagnant l'écran de remerciement. */
const STEP_IMAGES = [
  `${HOME_BUCKET}/1596142332133-327e2a0ff006.avif`,
  `${HOME_BUCKET}/paysage-huitres.png`,
  `${HOME_BUCKET}/EXPERIENCES IMG/1749544292533-65b0ec299191.avif`,
  `${HOME_BUCKET}/fontaine.png`,
  `${HOME_BUCKET}/champ-ble.avif`,
];

const EVENT_TYPES = [
  'Séminaire cohésion',
  'Séminaire sensibilisation',
  'Séminaire inspiration',
  'Séminaire CODIR',
  'Séminaire RSE & engagement',
  'Team building',
  'Lancement de produit',
  "Journée d'étude",
  'Conférence',
  'Autre',
];

const PERIODS = SEMINAIRE_PERIODS;

const BUDGET_MIN = 2_000;
const BUDGET_MAX = 100_000;
const BUDGET_STEP = 500;
const BUDGET_DEFAULT = 21_500;

const eur = (n: number) => `${new Intl.NumberFormat('fr-FR').format(n)} €`;

const fmtDay = fmtDayShort;
const fmtFull = (key: string) => new Date(`${key}T00:00:00`).toLocaleDateString('fr-FR');

// ─── Modal ────────────────────────────────────────────────────────────────────

type OrganiserSeminaireModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const OrganiserSeminaireModal: React.FC<OrganiserSeminaireModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [closing, setClosing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const [eventType, setEventType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [period, setPeriod] = useState('');
  const [lieu, setLieu] = useState('');
  const [lieuOpen, setLieuOpen] = useState(false);
  const [participants, setParticipants] = useState('');
  const [budget, setBudget] = useState(BUDGET_DEFAULT);
  const [nom, setNom] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);
  const lieuWrapRef = useRef<HTMLDivElement>(null);

  const lieuSuggestions = useMemo(() => matchFrenchPlaces(lieu, 8), [lieu]);
  const showLieuSuggestions = lieuOpen && lieuSuggestions.length > 0;

  useEffect(() => {
    STEP_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [step]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (lieuWrapRef.current && !lieuWrapRef.current.contains(e.target as Node)) {
        setLieuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const reset = () => {
    setStep(1);
    setErr('');
    setEventType('');
    setStartDate('');
    setEndDate('');
    setCalendarOpen(false);
    setPeriod('');
    setLieu('');
    setLieuOpen(false);
    setParticipants('');
    setBudget(BUDGET_DEFAULT);
    setNom('');
    setTel('');
    setEmail('');
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      reset();
      onClose();
    }, 240);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- handleClose est stable pour la durée d'ouverture
  }, [isOpen]);

  const participantsNb = Number(participants.replace(/\D/g, ''));
  const budgetParPersonne = participantsNb > 0 ? Math.round(budget / participantsNb) : null;

  const periodeStr = startDate && endDate
    ? `Du ${fmtFull(startDate)} au ${fmtFull(endDate)}`
    : period;

  const submit = async () => {
    setBusy(true);
    setErr('');
    try {
      const res = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          nom: nom.trim(),
          email: email.trim(),
          telephone: tel.trim(),
          typeEvenement: eventType,
          periode: periodeStr,
          lieu: lieu.trim(),
          participants: String(participantsNb),
          budget: eur(budget),
          budgetParPersonne: budgetParPersonne != null ? eur(budgetParPersonne) : '',
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (res.ok && data.success) {
        trackGenerateLead('reservation');
        setStep(5);
      } else setErr(data.message || "Erreur lors de l'envoi. Veuillez réessayer.");
    } catch {
      setErr("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setBusy(false);
    }
  };

  const goNext = () => {
    setErr('');
    if (step === 1 && !eventType) return setErr('Sélectionnez un type d’évènement.');
    if (step === 2 && !periodeStr) return setErr('Indiquez des dates précises ou une période.');
    if (step === 3 && !(participantsNb > 0)) return setErr('Indiquez le nombre de participants.');
    if (step === 4) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
      if (!nom.trim() || !emailOk) return setErr('Indiquez votre nom et une adresse mail valide.');
      return submit();
    }
    setStep((s) => s + 1);
  };

  if (!isOpen) return null;

  const image = STEP_IMAGES[Math.min(step, 5) - 1];
  const progress = Math.min(step, 4) / 4;

  return (
    <>
      <style>{`
        @keyframes osmIn  { from { opacity:0; transform:translateY(16px) scale(.985) } to { opacity:1; transform:none } }
        @keyframes osmOut { from { opacity:1; transform:none } to { opacity:0; transform:translateY(16px) scale(.985) } }
        @keyframes osmFade { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:none } }
        @keyframes osmSpin { to { transform:rotate(360deg) } }

        .osm-scroll::-webkit-scrollbar { width:0 }
        .osm-scroll { scrollbar-width:none }

        .osm-input {
          width:100%; box-sizing:border-box; background:#fff;
          border:1px solid rgba(12,29,34,.14); border-radius:12px;
          padding:11px 14px; font-family:inherit; font-size:13px; color:${INK};
          letter-spacing:-.02em; outline:none; transition:border-color .15s ease, box-shadow .15s ease;
        }
        .osm-input:focus { border-color:${INK}; box-shadow:0 0 0 3px rgba(12,29,34,.06) }
        .osm-input::placeholder { color:#b3b3b3 }

        .osm-opt {
          width:100%; box-sizing:border-box; background:#fff; cursor:pointer;
          border:1px solid rgba(12,29,34,.14); border-radius:12px;
          padding:11px 12px; font-family:inherit; font-size:13px; color:#8f8f8f;
          letter-spacing:-.02em; text-align:center; transition:all .15s ease;
          display:flex; align-items:center; justify-content:center;
          min-height:44px;
        }
        .osm-opt:hover { border-color:rgba(12,29,34,.35); color:${INK} }
        .osm-opt[data-active="true"] { background:${INK}; border-color:${INK}; color:#fff }

        .osm-opt-grid {
          display:grid; grid-template-columns:1fr 1fr; gap:12px 26px;
        }

        .osm-pill {
          background:#fff; cursor:pointer; white-space:nowrap;
          border:1px solid rgba(12,29,34,.14); border-radius:10px;
          padding:7px 13px; font-family:inherit; font-size:11.5px; color:${INK};
          letter-spacing:-.02em; transition:all .15s ease;
        }
        .osm-pill:hover { border-color:rgba(12,29,34,.35) }
        .osm-pill[data-active="true"] { background:${INK}; border-color:${INK}; color:#fff }

        .osm-nav {
          width:22px; height:22px; border:none; border-radius:50%; background:rgba(12,29,34,.05);
          color:${INK}; font-size:13px; line-height:1; cursor:pointer; font-family:inherit;
        }
        .osm-nav:hover { background:rgba(12,29,34,.1) }

        .osm-cta {
          border:none; border-radius:9999px; background:${ORANGE}; color:#fff;
          font-family:inherit; font-size:13px; letter-spacing:-.03em; font-weight:500;
          padding:10px 24px; cursor:pointer; transition:background .18s ease, transform .18s ease;
          display:inline-flex; align-items:center; gap:9px;
        }
        .osm-cta:hover { background:#d9552a }
        .osm-cta:disabled { opacity:.65; cursor:not-allowed }
        @media (min-width: 861px) {
          .osm-cta { font-size:15px; padding:12px 34px; }
        }

        .osm-back {
          background:none; border:none; padding:0; cursor:pointer; font-family:inherit;
          font-size:12px; letter-spacing:-.02em; color:#a5a5a5; transition:color .15s ease;
        }
        .osm-back:hover { color:${INK} }

        .osm-range { -webkit-appearance:none; appearance:none; width:100%; height:8px; border-radius:9999px; outline:none; cursor:pointer }
        .osm-range::-webkit-slider-thumb {
          -webkit-appearance:none; appearance:none; width:18px; height:18px; border-radius:50%;
          background:#fff; border:1px solid rgba(12,29,34,.2); box-shadow:0 1px 4px rgba(0,0,0,.18); cursor:pointer;
        }
        .osm-range::-moz-range-thumb {
          width:18px; height:18px; border-radius:50%; background:#fff;
          border:1px solid rgba(12,29,34,.2); box-shadow:0 1px 4px rgba(0,0,0,.18); cursor:pointer;
        }

        @media (max-width: 860px) {
          .osm-wrapper { padding:0 !important }
          .osm-panel {
            width:100% !important; max-width:none !important;
            height:100svh !important; max-height:100svh !important;
            border-radius:0 !important; flex-direction:column !important;
          }
          .osm-visual { width:100% !important; height:140px !important; flex:0 0 140px !important }
          .osm-body { flex:1 1 auto !important; min-height:0 !important; overflow:hidden !important }
          .osm-content { padding:36px 22px 0 !important }
          .osm-footer {
            flex-shrink:0 !important;
            padding:12px 22px max(16px, env(safe-area-inset-bottom)) !important;
            background:#fff;
            border-top:1px solid rgba(12,29,34,0.06);
          }
          .osm-title { font-size:24px !important }
          .osm-opt-grid {
            grid-template-columns:1fr !important;
            gap:10px !important;
          }
          .osm-opt {
            min-height:48px;
            white-space:nowrap;
          }
        }
      `}</style>

      <div
        onClick={handleClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 1200,
          background: 'rgba(12,29,34,0.55)', backdropFilter: 'blur(6px)',
          opacity: closing ? 0 : 1, transition: 'opacity .24s ease',
        }}
      />

      <div
        className="osm-wrapper"
        style={{ position: 'fixed', inset: 0, zIndex: 1201, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, pointerEvents: 'none' }}
      >
        <div
          className="osm-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Organiser votre séminaire"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            width: '100%', maxWidth: 940,
            height: 'min(600px, 92vh)',
            background: '#fff', borderRadius: 20, overflow: 'hidden',
            boxShadow: '0 24px 70px rgba(12,29,34,.28)',
            fontFamily: "'Poppins', sans-serif",
            animation: `${closing ? 'osmOut' : 'osmIn'} .28s cubic-bezier(.22,1,.36,1) both`,
          }}
        >
          <div
            className="osm-visual"
            style={{
              flex: '0 0 34%', width: '34%',
              backgroundImage: `url("${image}")`, backgroundSize: 'cover', backgroundPosition: 'center',
              transition: 'background-image .3s ease',
            }}
          />

          <div
            className="osm-body"
            style={{ flex: 1, minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column', position: 'relative' }}
          >
            <button
              onClick={handleClose}
              aria-label="Fermer"
              style={{
                position: 'absolute', top: 18, right: 20, zIndex: 2,
                width: 30, height: 30, border: 'none', background: 'none', cursor: 'pointer',
                color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M2 2 15 15M15 2 2 15" />
              </svg>
            </button>

            <div ref={scrollRef} className="osm-scroll osm-content" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '54px 46px 0' }}>
              <div key={step} style={{ animation: 'osmFade .3s ease both' }}>
                {step === 1 && (
                  <>
                    <h2 className="osm-title" style={titleStyle}>
                      Organisons ensemble<br />votre <strong style={strong}>prochain évènement.</strong>
                    </h2>
                    <p style={leadStyle}>
                      Remplissez ce court formulaire, pour que nous puissions vous recontacter avec des premières propositions !
                    </p>
                    <div className="osm-opt-grid">
                      {EVENT_TYPES.map((t) => (
                        <button
                          key={t}
                          type="button"
                          className="osm-opt"
                          data-active={eventType === t}
                          onClick={() => { setEventType(t); setErr(''); }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className="osm-title" style={titleStyle}>
                      Une idée des <strong style={strong}>dates ?</strong>
                    </h2>
                    <button
                      type="button"
                      className="osm-input"
                      onClick={() => setCalendarOpen((v) => !v)}
                      style={{ maxWidth: 240, textAlign: 'left', cursor: 'pointer', color: startDate ? INK : '#b3b3b3' }}
                    >
                      {startDate
                        ? `${fmtDay(startDate)}${endDate ? ` → ${fmtDay(endDate)}` : ' → …'}`
                        : 'Sélectionnez des dates précises'}
                    </button>
                    {calendarOpen && (
                      <MiniDateRangeCalendar
                        start={startDate}
                        end={endDate}
                        onStart={(d) => { setStartDate(d); setPeriod(''); setErr(''); }}
                        onEnd={(d) => { setEndDate(d); if (d) setCalendarOpen(false); }}
                        navClassName="osm-nav"
                      />
                    )}

                    <p style={{ ...leadStyle, fontSize: 11.5, fontWeight: 600, margin: '20px 0 10px' }}>
                      Ou bien, sélectionnez une période
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
                      {PERIODS.map((p) => (
                        <button
                          key={p}
                          type="button"
                          className="osm-pill"
                          data-active={period === p}
                          onClick={() => {
                            setPeriod(period === p ? '' : p);
                            setStartDate(''); setEndDate(''); setCalendarOpen(false); setErr('');
                          }}
                        >
                          {p}
                        </button>
                      ))}
                    </div>

                    <h2 className="osm-title" style={{ ...titleStyle, margin: '40px 0 16px' }}>
                      Une idée de <strong style={strong}>lieu ?</strong>
                    </h2>
                    <div ref={lieuWrapRef} style={{ position: 'relative', maxWidth: 340 }}>
                      <span style={{ position: 'absolute', left: 13, top: 14, display: 'flex', color: '#b3b3b3', zIndex: 1, pointerEvents: 'none' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </span>
                      <input
                        className="osm-input"
                        style={{ paddingLeft: 34 }}
                        placeholder="Saisissez le lieu souhaité : ville, région, etc"
                        value={lieu}
                        autoComplete="off"
                        aria-autocomplete="list"
                        aria-expanded={showLieuSuggestions}
                        onChange={(e) => {
                          setLieu(e.target.value);
                          setLieuOpen(true);
                        }}
                        onFocus={() => setLieuOpen(true)}
                      />
                      {showLieuSuggestions && (
                        <ul
                          role="listbox"
                          style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: '100%',
                            margin: '4px 0 0',
                            padding: '6px 0',
                            listStyle: 'none',
                            background: '#fff',
                            border: '1px solid rgba(12,29,34,0.12)',
                            borderRadius: 12,
                            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                            maxHeight: 220,
                            overflowY: 'auto',
                            zIndex: 40,
                          }}
                        >
                          {lieuSuggestions.map((s) => (
                            <li key={`${s.kind}-${s.name}`}>
                              <button
                                type="button"
                                role="option"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                  setLieu(s.name);
                                  setLieuOpen(false);
                                }}
                                style={{
                                  width: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  gap: 10,
                                  textAlign: 'left',
                                  padding: '9px 12px',
                                  border: 'none',
                                  background: 'transparent',
                                  fontFamily: 'inherit',
                                  cursor: 'pointer',
                                }}
                              >
                                <span style={{ fontSize: 13, fontWeight: 600, color: INK, letterSpacing: '-.02em' }}>
                                  {s.name}
                                </span>
                                <span style={{ fontSize: 10, fontWeight: 600, color: '#a5a5a5', letterSpacing: '0.04em', textTransform: 'uppercase', flexShrink: 0 }}>
                                  {frenchPlaceKindLabel(s.kind)}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2 className="osm-title" style={titleStyle}>
                      <strong style={strong}>Combien de participants</strong> y aura-t-il ?
                    </h2>
                    <input
                      className="osm-input"
                      style={{ maxWidth: 250 }}
                      inputMode="numeric"
                      placeholder="Nombre de participants"
                      value={participants}
                      onChange={(e) => { setParticipants(e.target.value.replace(/\D/g, '')); setErr(''); }}
                    />

                    <h2 className="osm-title" style={{ ...titleStyle, margin: '40px 0 22px' }}>
                      Quel est votre <strong style={strong}>budget total ?</strong>
                    </h2>
                    <input
                      type="range"
                      className="osm-range"
                      min={BUDGET_MIN}
                      max={BUDGET_MAX}
                      step={BUDGET_STEP}
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      aria-label="Budget total"
                      style={{
                        background: `linear-gradient(to right, ${INK} 0%, ${INK} ${((budget - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100}%, #ededed ${((budget - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100}%, #ededed 100%)`,
                      }}
                    />
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 60, marginTop: 18 }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 19, fontWeight: 600, color: INK, letterSpacing: '-.04em' }}>
                          {budget >= BUDGET_MAX ? `${eur(BUDGET_MAX)} et +` : eur(budget)}
                        </div>
                        <div style={{ fontSize: 10.5, color: '#a5a5a5', letterSpacing: '-.02em' }}>Budget total</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: INK, letterSpacing: '-.04em' }}>
                          {budgetParPersonne != null ? eur(budgetParPersonne) : '—'}
                        </div>
                        <div style={{ fontSize: 9.5, color: '#a5a5a5', letterSpacing: '-.02em' }}>Par personne</div>
                      </div>
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <h2 className="osm-title" style={titleStyle}>
                      <strong style={strong}>Votre contact,</strong> pour revenir vers vous sous 48 heures.
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 13, maxWidth: 285 }}>
                      <input className="osm-input" placeholder="Nom - Prénom" value={nom} onChange={(e) => { setNom(e.target.value); setErr(''); }} />
                      <input className="osm-input" type="tel" placeholder="Numéro de téléphone" value={tel} onChange={(e) => setTel(e.target.value)} />
                      <input className="osm-input" type="email" placeholder="Adresse mail" value={email} onChange={(e) => { setEmail(e.target.value); setErr(''); }} />
                    </div>
                  </>
                )}

                {step === 5 && (
                  <div style={{ paddingTop: 42 }}>
                    <h2 className="osm-title" style={{ ...titleStyle, marginBottom: 30 }}>
                      <strong style={strong}>Merci beaucoup !</strong>
                    </h2>
                    <p className="osm-title" style={{ ...titleStyle, margin: 0 }}>
                      On revient vers vous <strong style={strong}>au plus vite.</strong>
                    </p>
                    <p style={{ ...leadStyle, fontSize: 14, textAlign: 'center', margin: '26px 0 0' }}>L’équipe TERRAGO</p>
                  </div>
                )}
              </div>
              <div style={{ height: 26 }} />
            </div>

            <div className="osm-footer" style={{ flexShrink: 0, padding: '0 46px 26px' }}>
              {err && (
                <p style={{ fontSize: 11.5, color: ORANGE, textAlign: 'center', margin: '0 0 10px', letterSpacing: '-.02em' }}>{err}</p>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: 44 }}>
                {step > 1 && step < 5 && (
                  <button type="button" className="osm-back" onClick={() => { setErr(''); setStep((s) => s - 1); }} style={{ position: 'absolute', left: 0 }}>
                    ← Retour
                  </button>
                )}
                <button type="button" className="osm-cta" onClick={step === 5 ? handleClose : goNext} disabled={busy}>
                  {busy && (
                    <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,.35)', borderTopColor: '#fff', borderRadius: '50%', animation: 'osmSpin .7s linear infinite' }} />
                  )}
                  {step === 5 ? 'Terminé' : busy ? 'Envoi…' : 'Suivant'}
                </button>
              </div>

              <div style={{ height: 3, marginTop: 18 }}>
                {step < 5 && (
                  <div style={{ height: '100%', width: `${progress * 100}%`, borderRadius: 9999, background: ORANGE, transition: 'width .35s cubic-bezier(.22,1,.36,1)' }} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const titleStyle: React.CSSProperties = {
  fontFamily: "'Poppins', sans-serif",
  fontSize: 30,
  fontWeight: 400,
  lineHeight: 1.25,
  letterSpacing: '-0.05em',
  color: INK,
  margin: '0 0 18px',
};

const strong: React.CSSProperties = { fontWeight: 700 };

const leadStyle: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.55,
  letterSpacing: '-0.03em',
  color: INK,
  margin: '0 0 26px',
};

export default OrganiserSeminaireModal;
