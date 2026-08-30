'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { frenchPlaceDisplayLabel, frenchPlaceKindLabel, matchFrenchPlaces } from '../lib/frenchCities';
import {
  MiniDateRangeCalendar,
  fmtDayShort,
} from './MiniDateRangeCalendar';
import { trackGenerateLead } from '../lib/analytics';

const INK = '#0c1d22';
const ORANGE = '#ec6435';

const HOME_BUCKET = 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME';

/** Un visuel par étape du formulaire (index = étape − 1). */
const STEP_IMAGES = [
  `${HOME_BUCKET}/1596142332133-327e2a0ff006.avif`,
  `${HOME_BUCKET}/paysage-huitres.png`,
  `${HOME_BUCKET}/EXPERIENCES IMG/1749544292533-65b0ec299191.avif`,
  `${HOME_BUCKET}/seminaire/exception/1111.jpg`,
];

const EVENT_TYPES = [
  'Séminaire cohésion',
  'Séminaire RSE & sensibilisation',
  'Séminaire inspiration & miroir',
  'Séminaire CODIR',
  'Team building',
  'Lancement de produit',
  "Journée d'étude",
  'Conférence',
  'Autre',
];

const PERIODS = [
  'Janvier – Mars',
  'Avril – Juin',
  'Juillet – Septembre',
  'Octobre – Décembre',
] as const;

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
  const router = useRouter();
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
  const panelRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lieuWrapRef = useRef<HTMLDivElement>(null);
  const lieuInputRef = useRef<HTMLInputElement>(null);
  const [lieuFieldActive, setLieuFieldActive] = useState(false);

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
    panelRef.current?.scrollTo({ top: 0 });
  }, [step]);

  const lockScrollWhileDragging = () => {
    const el = scrollRef.current;
    if (el) el.style.overflowY = 'hidden';
    panelRef.current?.classList.add('osm-panel--noscroll');
  };

  const unlockScrollAfterDragging = () => {
    const el = scrollRef.current;
    if (el) el.style.overflowY = 'auto';
    panelRef.current?.classList.remove('osm-panel--noscroll');
  };

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /** Empêche le zoom iOS au focus des champs (sinon le modal se décale et se ferme). */
  useEffect(() => {
    if (!isOpen) return;
    const meta = document.querySelector('meta[name="viewport"]');
    if (!meta) return;
    const prev = meta.getAttribute('content') ?? '';
    meta.setAttribute(
      'content',
      'width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover, interactive-widget=resizes-content',
    );
    return () => meta.setAttribute('content', prev);
  }, [isOpen]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (lieuWrapRef.current && !lieuWrapRef.current.contains(e.target as Node)) {
        setLieuOpen(false);
        setLieuFieldActive(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  /** Sur mobile, caler le modal sur la zone visible (au-dessus du clavier). */
  useEffect(() => {
    if (!isOpen || !lieuFieldActive) return;
    const wrap = wrapperRef.current;
    const vv = window.visualViewport;
    if (!wrap || !vv || !window.matchMedia('(max-width: 860px)').matches) return;

    const sync = () => {
      wrap.style.setProperty('--osm-vv-top', `${vv.offsetTop}px`);
      wrap.style.setProperty('--osm-vv-height', `${vv.height}px`);
      wrap.classList.add('osm-wrapper--vv');
      scrollRef.current?.scrollTo({ top: 0 });
    };
    sync();
    const t = window.setTimeout(sync, 320);
    vv.addEventListener('resize', sync);
    vv.addEventListener('scroll', sync);
    return () => {
      window.clearTimeout(t);
      vv.removeEventListener('resize', sync);
      vv.removeEventListener('scroll', sync);
      wrap.classList.remove('osm-wrapper--vv');
      wrap.style.removeProperty('--osm-vv-top');
      wrap.style.removeProperty('--osm-vv-height');
    };
  }, [isOpen, lieuFieldActive]);

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
    setLieuFieldActive(false);
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

  /** Fermeture explicite depuis l'écran de confirmation → retour accueil. */
  const handleGoHome = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      reset();
      onClose();
      router.push('/');
    }, 240);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (step === 5) handleGoHome();
        else handleClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- handlers stables pour la durée d'ouverture
  }, [isOpen, step]);

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

  const isConfirm = step === 5;
  const image = STEP_IMAGES[Math.min(step, 4) - 1];
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
        .osm-input::placeholder { color:#b3b3b3; font-size:13px; font-weight:400; letter-spacing:-.02em; }
        .osm-input--dates { width:100%; max-width:400px; }
        .osm-ph {
          display:none;
          position:absolute; left:14px; right:14px; top:0; bottom:0;
          align-items:center; font-size:13px; font-weight:400; color:#b3b3b3;
          letter-spacing:-.02em; pointer-events:none; white-space:nowrap;
          overflow:hidden; text-overflow:ellipsis; font-family:inherit;
        }
        .osm-ph--pin { left:34px; }
        .osm-lieu-icon {
          position:absolute; left:13px; top:0; height:44px;
          display:flex; align-items:center; color:#b3b3b3; z-index:1; pointer-events:none;
        }

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
        .osm-opt-grid .osm-opt:last-child {
          grid-column: 1 / -1;
          width: calc(50% - 13px);
          justify-self: center;
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

        .osm-cta-home {
          border:none; border-radius:9999px; background:#fff; color:${ORANGE};
          font-family:inherit; font-size:13px; letter-spacing:-.03em; font-weight:500;
          padding:11px 26px; cursor:pointer; transition:background .18s ease, transform .18s ease, color .18s ease;
          display:inline-flex; align-items:center; justify-content:center;
        }
        .osm-cta-home:hover { background:rgba(255,255,255,.92) }
        @media (min-width: 861px) {
          .osm-cta-home { font-size:14px; padding:12px 30px; }
        }

        .osm-back {
          background:none; border:none; padding:0; cursor:pointer; font-family:inherit;
          font-size:12px; letter-spacing:-.02em; color:#a5a5a5; transition:color .15s ease;
        }
        .osm-back:hover { color:${INK} }

        .osm-range-wrap {
          position: relative;
          touch-action: none;
          padding: 12px 8px;
          margin: 0;
          overflow: visible;
          display: flex;
          align-items: center;
        }
        .osm-range-track {
          position: absolute;
          left: 0; right: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 4px;
          border-radius: 9999px;
          background: #f4f4f4;
          pointer-events: none;
        }
        .osm-range-fill {
          height: 100%;
          border-radius: 9999px;
          background: ${ORANGE};
        }
        .osm-range {
          -webkit-appearance:none; appearance:none; width:100%; height:28px;
          background:transparent; outline:none; cursor:pointer; touch-action:none;
          margin:0; display:block; position:relative; z-index:1;
        }
        .osm-range::-webkit-slider-runnable-track {
          height:4px; border-radius:9999px; background:transparent;
        }
        .osm-range::-webkit-slider-thumb {
          -webkit-appearance:none; appearance:none; width:20px; height:20px; border-radius:50%;
          background:#fff; border:2px solid ${ORANGE}; margin-top:-8px; cursor:pointer;
          box-shadow:0 1px 4px rgba(12,29,34,.12), 0 0 0 4px rgba(236,100,53,.14);
          touch-action:none; transition:box-shadow .18s ease;
        }
        .osm-range:hover::-webkit-slider-thumb,
        .osm-range:active::-webkit-slider-thumb {
          box-shadow:0 1px 6px rgba(12,29,34,.16), 0 0 0 6px rgba(236,100,53,.18);
        }
        .osm-range::-moz-range-track {
          height:4px; border-radius:9999px; background:transparent; border:none;
        }
        .osm-range::-moz-range-progress {
          height:4px; background:transparent; border:none;
        }
        .osm-range::-moz-range-thumb {
          width:20px; height:20px; border-radius:50%; background:#fff;
          border:2px solid ${ORANGE}; box-shadow:0 1px 4px rgba(12,29,34,.12), 0 0 0 4px rgba(236,100,53,.14);
          cursor:pointer; touch-action:none;
        }

        .osm-panel--noscroll { overflow: hidden !important }

        @media (max-width: 860px) {
          .osm-backdrop:not(.osm-backdrop--confirm) {
            background:#fff !important;
            backdrop-filter:none !important;
            inset:0 !important;
          }
          .osm-wrapper:not(.osm-wrapper--confirm) {
            padding:0 !important;
            align-items:stretch !important;
            justify-content:flex-start !important;
            inset:0 !important;
            height:100% !important;
            max-height:none !important;
            background:#fff !important;
            pointer-events:auto !important;
          }
          .osm-wrapper.osm-wrapper--vv:not(.osm-wrapper--confirm) {
            inset: unset !important;
            top: var(--osm-vv-top, 0px) !important;
            left: 0 !important;
            right: 0 !important;
            bottom: auto !important;
            height: var(--osm-vv-height, 100%) !important;
          }
          .osm-panel:not(.osm-panel--confirm) {
            display:flex !important;
            flex-direction:column !important;
            width:100% !important;
            max-width:none !important;
            height:100% !important;
            max-height:none !important;
            min-height:0 !important;
            border-radius:0 !important;
            overflow:hidden !important;
            background:#fff !important;
            touch-action:manipulation;
          }
          .osm-panel--confirm {
            width:calc(100% - 32px) !important;
            max-width:560px !important;
            height:auto !important;
            max-height:min(88svh, 560px) !important;
            border-radius:20px !important;
          }
          .osm-visual { width:100% !important; height:140px !important; flex:none !important }
          .osm-body {
            display:flex !important;
            flex-direction:column !important;
            flex:1 1 auto !important;
            min-height:0 !important;
            overflow:hidden !important;
          }
          .osm-content {
            flex:1 1 auto !important;
            min-height:0 !important;
            overflow-y:auto !important;
            -webkit-overflow-scrolling:touch;
            overscroll-behavior:contain;
            padding:36px 22px 0 !important;
          }
          .osm-content--confirm { padding:48px 24px 28px !important }
          .osm-footer {
            flex-shrink:0 !important;
            padding:18px 22px max(16px, env(safe-area-inset-bottom)) !important;
            background:#fff;
          }
          .osm-close {
            position:fixed !important;
            top:calc(max(20px, env(safe-area-inset-top) + 8px)) !important;
            right:22px !important;
            width:32px !important;
            height:32px !important;
            color:#fff !important;
            background:rgba(0,0,0,.2) !important;
            border:1.5px solid #fff !important;
            border-radius:50% !important;
            backdrop-filter:blur(12px);
            -webkit-backdrop-filter:blur(12px);
          }
          .osm-close svg {
            width:12px !important;
            height:12px !important;
            stroke-width:2.6 !important;
          }
          .osm-title { font-size:24px !important }
          .osm-confirm-title { font-size:24px !important }
          .osm-opt-grid {
            grid-template-columns:1fr !important;
            gap:10px !important;
          }
          .osm-opt-grid .osm-opt:last-child {
            width: 100%;
          }
          .osm-opt {
            min-height:48px;
            white-space:nowrap;
          }
          .osm-input--dates { max-width:none; }
          .osm-range::-webkit-slider-thumb {
            width: 22px;
            height: 22px;
            margin-top: -9px;
          }
          .osm-range::-moz-range-thumb {
            width: 22px;
            height: 22px;
          }
          /* 16px réel = pas de zoom iOS ; le descriptif overlay reste à 13px */
          input.osm-input { font-size: 16px !important; touch-action: manipulation; }
          input.osm-has-ph::placeholder { color:transparent !important; opacity:0; }
          button.osm-input { font-size: 13px !important; }
          .osm-ph { display:flex; }
          .osm-lieu-icon { height:50px; }

          .osm-panel--lieu-kb .osm-visual {
            display: none !important;
            height: 0 !important;
          }
          .osm-panel--lieu-kb .osm-dates-block { display: none !important; }
          .osm-panel--lieu-kb .osm-footer { display: none !important; }
          .osm-panel--lieu-kb .osm-content-end { display: none !important; }
          .osm-panel--lieu-kb .osm-content {
            padding-top: 56px !important;
            display: flex !important;
            flex-direction: column !important;
            overflow: hidden !important;
          }
          .osm-panel--lieu-kb .osm-step {
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
            min-height: 0;
          }
          .osm-panel--lieu-kb .osm-lieu-title { margin: 0 0 14px !important; flex-shrink: 0; }
          .osm-panel--lieu-kb .osm-lieu-wrap {
            flex: 1 1 auto;
            min-height: 0;
            display: flex;
            flex-direction: column;
            max-width: none !important;
          }
          .osm-panel--lieu-kb .osm-lieu-wrap .osm-input { flex-shrink: 0; }
          .osm-panel--lieu-kb .osm-lieu-suggest {
            position: relative !important;
            left: auto !important;
            right: auto !important;
            top: auto !important;
            flex: 1 1 auto;
            min-height: 0;
            max-height: none !important;
            margin-top: 10px !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch;
            box-shadow: none !important;
          }
          .osm-panel--lieu-kb .osm-lieu-suggest button {
            min-height: 48px;
            padding: 12px 14px !important;
          }
          .osm-panel--lieu-kb .osm-lieu-suggest button > span:first-child {
            font-size: 15px !important;
          }
          .osm-panel--lieu-kb .osm-close {
            position: absolute !important;
            top: 12px !important;
            color: ${INK} !important;
            background: rgba(12,29,34,.06) !important;
            border: none !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }
        }
      `}</style>

      <div
        className={`osm-backdrop${isConfirm ? ' osm-backdrop--confirm' : ''}`}
        onClick={isConfirm ? undefined : (e) => {
          if (window.matchMedia('(max-width: 860px)').matches) return;
          if (e.target !== e.currentTarget) return;
          handleClose();
        }}
        style={{
          position: 'fixed', inset: 0, zIndex: 1200,
          background: 'rgba(12,29,34,0.55)', backdropFilter: 'blur(6px)',
          opacity: closing ? 0 : 1, transition: 'opacity .24s ease',
        }}
      />

      <div
        ref={wrapperRef}
        className={`osm-wrapper${isConfirm ? ' osm-wrapper--confirm' : ''}`}
        style={{ position: 'fixed', inset: 0, zIndex: 1201, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, pointerEvents: 'none' }}
      >
        {isConfirm ? (
          <div
            className="osm-panel osm-panel--confirm"
            role="dialog"
            aria-modal="true"
            aria-label="Demande reçue"
            style={{
              pointerEvents: 'auto',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              maxWidth: 620,
              background: ORANGE,
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 24px 70px rgba(12,29,34,.28)',
              fontFamily: "'Poppins', sans-serif",
              animation: `${closing ? 'osmOut' : 'osmIn'} .28s cubic-bezier(.22,1,.36,1) both`,
            }}
          >
            <button
              type="button"
              onClick={handleGoHome}
              aria-label="Fermer et retourner à l'accueil"
              style={{
                position: 'absolute', top: 16, right: 16, zIndex: 2,
                width: 30, height: 30, border: 'none', background: 'none', cursor: 'pointer',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M2 2 15 15M15 2 2 15" />
              </svg>
            </button>

            <div
              className="osm-scroll osm-content osm-content--confirm"
              style={{
                padding: '52px 44px 36px',
                textAlign: 'left',
                animation: 'osmFade .3s ease both',
              }}
            >
              <h2
                className="osm-confirm-title"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 28,
                  fontWeight: 400,
                  lineHeight: 1.3,
                  letterSpacing: '-0.04em',
                  color: '#fff',
                  margin: '0 0 20px',
                }}
              >
                <strong style={{ fontWeight: 700 }}>Merci !</strong> Votre demande a{' '}
                <strong style={{ fontWeight: 700 }}>bien été envoyée</strong>.
              </h2>
              <p
                style={{
                  fontSize: 15.5,
                  lineHeight: 1.65,
                  letterSpacing: '-0.02em',
                  color: 'rgba(255,255,255,.92)',
                  margin: '0 0 14px',
                  maxWidth: 520,
                }}
              >
                On s&apos;occupe de votre demande au plus vite, et nous reviendrons vers vous sous 48&nbsp;heures.
              </p>
              <p
                style={{
                  fontSize: 15.5,
                  lineHeight: 1.65,
                  letterSpacing: '-0.02em',
                  color: 'rgba(255,255,255,.92)',
                  margin: 0,
                  maxWidth: 520,
                }}
              >
                Vous allez également recevoir un e-mail de confirmation avec le récapitulatif de votre demande.
              </p>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.55,
                  letterSpacing: '-0.02em',
                  color: 'rgba(255,255,255,.72)',
                  margin: '28px 0 0',
                }}
              >
                À très vite,<br />
                L&apos;équipe TerraGo
              </p>
              <div style={{ marginTop: 28 }}>
                <button type="button" className="osm-cta-home" onClick={handleGoHome}>
                  Retour à l&apos;accueil
                </button>
              </div>
            </div>
          </div>
        ) : (
        <div
          ref={panelRef}
          className={`osm-panel${lieuFieldActive ? ' osm-panel--lieu-kb' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Organiser votre séminaire"
          onClick={(e) => e.stopPropagation()}
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
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Image
              key={image}
              src={image}
              alt="Visuel formulaire séminaire TerraGo"
              fill
              className="object-cover"
              sizes="(max-width: 860px) 100vw, 34vw"
            />
          </div>

          <div
            className="osm-body"
            style={{ flex: 1, minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column', position: 'relative' }}
          >
            <button
              className="osm-close"
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

            <div
              ref={scrollRef}
              className="osm-scroll osm-content"
              style={{
                flex: 1,
                minHeight: 0,
                overflowY: 'auto',
                padding: '54px 46px 0',
              }}
            >
              <div
                key={step}
                className="osm-step"
                style={{
                  animation: 'osmFade .3s ease both',
                }}
              >
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
                    <div className="osm-dates-block">
                    <h2 className="osm-title" style={titleStyle}>
                      Une idée des <strong style={strong}>dates ?</strong>
                    </h2>
                    <button
                      type="button"
                      className="osm-input osm-input--dates"
                      onClick={() => setCalendarOpen((v) => !v)}
                      style={{ textAlign: 'left', cursor: 'pointer', color: startDate ? INK : '#b3b3b3' }}
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
                    </div>

                    <h2 className="osm-title osm-lieu-title" style={{ ...titleStyle, margin: '40px 0 16px' }}>
                      Une idée de <strong style={strong}>lieu ?</strong>
                    </h2>
                    <div ref={lieuWrapRef} className="osm-lieu-wrap" style={{ position: 'relative', maxWidth: 420 }}>
                      <span className="osm-lieu-icon">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </span>
                      <input
                        ref={lieuInputRef}
                        className="osm-input osm-has-ph"
                        style={{ paddingLeft: 34 }}
                        placeholder="Saisissez le lieu souhaité : ville, région, etc"
                        value={lieu}
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck={false}
                        aria-autocomplete="list"
                        aria-expanded={showLieuSuggestions}
                        onChange={(e) => {
                          setLieu(e.target.value);
                          setLieuOpen(true);
                        }}
                        onFocus={() => {
                          setLieuOpen(true);
                          setLieuFieldActive(true);
                          window.setTimeout(() => scrollRef.current?.scrollTo({ top: 0 }), 50);
                        }}
                        onBlur={() => {
                          window.setTimeout(() => {
                            if (lieuWrapRef.current?.contains(document.activeElement)) return;
                            setLieuFieldActive(false);
                          }, 180);
                        }}
                      />
                      {!lieu && (
                        <span className="osm-ph osm-ph--pin" aria-hidden="true">
                          Saisissez le lieu souhaité : ville, région, etc
                        </span>
                      )}
                      {showLieuSuggestions && (
                        <ul
                          role="listbox"
                          className="osm-lieu-suggest"
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
                                onPointerDown={(e) => e.preventDefault()}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                  setLieu(frenchPlaceDisplayLabel(s));
                                  setLieuOpen(false);
                                  setLieuFieldActive(false);
                                  lieuInputRef.current?.blur();
                                }}
                                style={{
                                  width: '100%',
                                  display: 'flex',
                                  alignItems: 'flex-start',
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
                                <span style={{ fontSize: 13, fontWeight: 600, color: INK, letterSpacing: '-.02em', lineHeight: 1.35, flex: 1, minWidth: 0 }}>
                                  {frenchPlaceDisplayLabel(s)}
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
                    <div style={{ maxWidth: 250, position: 'relative' }}>
                      <input
                        className="osm-input osm-has-ph"
                        inputMode="numeric"
                        autoComplete="off"
                        placeholder="Nombre de participants"
                        value={participants}
                        onChange={(e) => { setParticipants(e.target.value.replace(/\D/g, '')); setErr(''); }}
                      />
                      {!participants && (
                        <span className="osm-ph" aria-hidden="true">Nombre de participants</span>
                      )}
                    </div>

                    <h2 className="osm-title" style={{ ...titleStyle, margin: '40px 0 22px' }}>
                      Quel est votre <strong style={strong}>budget total ?</strong>
                    </h2>
                    <div
                      className="osm-range-wrap"
                      onTouchStart={lockScrollWhileDragging}
                      onTouchEnd={unlockScrollAfterDragging}
                      onTouchCancel={unlockScrollAfterDragging}
                      onPointerDown={lockScrollWhileDragging}
                      onPointerUp={unlockScrollAfterDragging}
                      onPointerCancel={unlockScrollAfterDragging}
                    >
                      <div
                        className="osm-range-track"
                        aria-hidden="true"
                      >
                        <div
                          className="osm-range-fill"
                          style={{ width: `${((budget - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100}%` }}
                        />
                      </div>
                      <input
                        type="range"
                        className="osm-range"
                        min={BUDGET_MIN}
                        max={BUDGET_MAX}
                        step={BUDGET_STEP}
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        aria-label="Budget total"
                      />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 60, marginTop: 14 }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 22, fontWeight: 600, color: INK, letterSpacing: '-.05em' }}>
                          {budget >= BUDGET_MAX ? `${eur(BUDGET_MAX)} et +` : eur(budget)}
                        </div>
                        <div style={{ fontSize: 10.5, color: '#a5a5a5', letterSpacing: '-.02em', marginTop: 3 }}>Budget total</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 15, fontWeight: 600, color: INK, letterSpacing: '-.04em' }}>
                          {budgetParPersonne != null ? eur(budgetParPersonne) : '—'}
                        </div>
                        <div style={{ fontSize: 10.5, color: '#a5a5a5', letterSpacing: '-.02em', marginTop: 3 }}>Par personne</div>
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

              </div>
              <div className="osm-content-end" style={{ height: 26 }} />
            </div>

            <div className="osm-footer" style={{ flexShrink: 0, padding: '0 46px 26px' }}>
              {err && (
                <p style={{ fontSize: 11.5, color: ORANGE, textAlign: 'center', margin: '0 0 10px', letterSpacing: '-.02em' }}>{err}</p>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: 44 }}>
                {step > 1 && (
                  <button type="button" className="osm-back" onClick={() => { setErr(''); setStep((s) => s - 1); }} style={{ position: 'absolute', left: 0 }}>
                    ← Retour
                  </button>
                )}
                <button type="button" className="osm-cta" onClick={goNext} disabled={busy}>
                  {busy && (
                    <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,.35)', borderTopColor: '#fff', borderRadius: '50%', animation: 'osmSpin .7s linear infinite' }} />
                  )}
                  {busy ? 'Envoi…' : 'Suivant'}
                </button>
              </div>

              <div style={{ height: 3, marginTop: 18 }}>
                <div style={{ height: '100%', width: `${progress * 100}%`, borderRadius: 9999, background: ORANGE, transition: 'width .35s cubic-bezier(.22,1,.36,1)' }} />
              </div>
            </div>
          </div>
        </div>
        )}
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
