'use client';

import React, { useEffect, useRef, useState } from 'react';

const INK = '#0c1d22';
const ORANGE = '#ec6435';
const HOME_BUCKET =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME';
const VISUAL = `${HOME_BUCKET}/champ-ble.avif`;

const SECTEURS = [
  'Viticulture',
  'Oléiculture',
  'Horticulture',
  'Maraîchage',
  'Apiculture',
  'Élevage',
  'Ostréiculture',
  'Trufficulture',
  'Fromagerie / Crèmerie',
  'Charcuterie artisanale',
  'Distillation',
  'Autre',
];

const titleStyle: React.CSSProperties = {
  fontFamily: "'Poppins', sans-serif",
  fontSize: 26,
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

const CustomSelect: React.FC<{
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: string[];
}> = ({ value, onChange, placeholder, options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        className="dp-input"
        onClick={() => setOpen((o) => !o)}
        style={{
          textAlign: 'left',
          cursor: 'pointer',
          color: value ? INK : '#b3b3b3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
        }}
      >
        <span>{value || placeholder}</span>
        <span
          style={{
            fontSize: 12,
            color: '#b3b3b3',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform .15s',
          }}
        >
          ▾
        </span>
      </button>
      {open && (
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
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                role="option"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '9px 12px',
                  border: 'none',
                  background: value === opt ? 'rgba(12,29,34,0.04)' : 'transparent',
                  fontFamily: 'inherit',
                  fontSize: 13,
                  fontWeight: value === opt ? 600 : 400,
                  color: INK,
                  letterSpacing: '-.02em',
                  cursor: 'pointer',
                }}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

type Props = { isOpen: boolean; onClose: () => void };

const DevenirPartenaireModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [closing, setClosing] = useState(false);
  const [formData, setFormData] = useState({
    responsable: '',
    exploitation: '',
    secteur: '',
    email: '',
    telephone: '',
  });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');

  const reset = () => {
    setFormData({
      responsable: '',
      exploitation: '',
      secteur: '',
      email: '',
      telephone: '',
    });
    setBusy(false);
    setDone(false);
    setErr('');
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
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const submit = async () => {
    setErr('');
    const exploitation = formData.exploitation.trim();
    const email = formData.email.trim();
    const telephone = formData.telephone.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!exploitation) return setErr("Indiquez le nom de l'exploitation.");
    if (!emailOk) return setErr('Indiquez une adresse mail valide.');
    if (!telephone) return setErr('Indiquez un numéro de téléphone.');

    setBusy(true);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          action: 'host',
          responsable: formData.responsable,
          exploitation,
          secteur: formData.secteur,
          email,
          telephone,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (!res.ok || !data.success) throw new Error();
      setDone(true);
    } catch {
      setErr("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setBusy(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes dpIn  { from { opacity:0; transform:translateY(16px) scale(.985) } to { opacity:1; transform:none } }
        @keyframes dpOut { from { opacity:1; transform:none } to { opacity:0; transform:translateY(16px) scale(.985) } }
        @keyframes dpFade { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:none } }
        @keyframes dpSpin { to { transform: rotate(360deg) } }

        .dp-scroll::-webkit-scrollbar { width:0 }
        .dp-scroll { scrollbar-width:none }

        .dp-input {
          width:100%; box-sizing:border-box; background:#fff;
          border:1px solid rgba(12,29,34,.14); border-radius:12px;
          padding:11px 14px; font-family:inherit; font-size:13px; color:${INK};
          letter-spacing:-.02em; outline:none; transition:border-color .15s ease, box-shadow .15s ease;
        }
        .dp-input:focus { border-color:${INK}; box-shadow:0 0 0 3px rgba(12,29,34,.06) }
        .dp-input::placeholder { color:#b3b3b3 }

        .dp-cta {
          border:none; border-radius:9999px; background:${ORANGE}; color:#fff;
          font-family:inherit; font-size:13px; letter-spacing:-.03em; font-weight:500;
          padding:10px 24px; cursor:pointer; transition:background .18s ease;
          display:inline-flex; align-items:center; gap:9px;
        }
        .dp-cta:hover { background:#d9552a }
        .dp-cta:disabled { opacity:.65; cursor:not-allowed }
        @media (min-width: 861px) {
          .dp-cta { font-size:15px; padding:12px 34px; }
        }

        @media (max-width: 860px) {
          .dp-wrapper { padding:0 !important }
          .dp-panel { width:100% !important; max-width:none !important; height:100dvh !important; border-radius:0 !important; flex-direction:column !important }
          .dp-visual { width:100% !important; height:132px !important; flex:0 0 132px !important }
          .dp-content { padding:26px 22px 0 !important }
          .dp-footer { padding:0 22px max(18px, env(safe-area-inset-bottom)) !important }
          .dp-title { font-size:22px !important }
        }
      `}</style>

      <div
        onClick={handleClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1200,
          background: 'rgba(12,29,34,0.55)',
          backdropFilter: 'blur(6px)',
          opacity: closing ? 0 : 1,
          transition: 'opacity .24s ease',
        }}
      />

      <div
        className="dp-wrapper"
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
          className="dp-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Devenir partenaire"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            width: '100%',
            maxWidth: 940,
            height: 'min(600px, 92vh)',
            background: '#fff',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 24px 70px rgba(12,29,34,.28)',
            fontFamily: "'Poppins', sans-serif",
            animation: `${closing ? 'dpOut' : 'dpIn'} .28s cubic-bezier(.22,1,.36,1) both`,
          }}
        >
          <div
            className="dp-visual"
            style={{
              flex: '0 0 34%',
              width: '34%',
              backgroundImage: `url("${VISUAL}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <button
              onClick={handleClose}
              aria-label="Fermer"
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

            <div className="dp-scroll dp-content" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '54px 46px 0' }}>
              <div style={{ animation: 'dpFade .3s ease both' }}>
                {done ? (
                  <div style={{ paddingTop: 42 }}>
                    <h2 className="dp-title" style={{ ...titleStyle, marginBottom: 30 }}>
                      <strong style={strong}>Merci beaucoup !</strong>
                    </h2>
                    <p className="dp-title" style={{ ...titleStyle, margin: 0 }}>
                      On revient vers vous <strong style={strong}>sous 72 heures.</strong>
                    </p>
                    <p style={{ ...leadStyle, fontSize: 14, textAlign: 'center', margin: '26px 0 0' }}>
                      L&apos;équipe TERRAGO
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="dp-title" style={titleStyle}>
                      Devenez <strong style={strong}>partenaire TerraGo.</strong>
                    </h2>
                    <p style={leadStyle}>
                      Remplissez ce court formulaire pour nous présenter votre exploitation.
                      Nous vous recontactons pour échanger sur le réseau.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 13, maxWidth: 340 }}>
                      <input
                        className="dp-input"
                        placeholder="Nom du responsable"
                        value={formData.responsable}
                        onChange={(e) => {
                          setFormData((d) => ({ ...d, responsable: e.target.value }));
                          setErr('');
                        }}
                      />
                      <input
                        className="dp-input"
                        placeholder="Nom de l'exploitation *"
                        value={formData.exploitation}
                        onChange={(e) => {
                          setFormData((d) => ({ ...d, exploitation: e.target.value }));
                          setErr('');
                        }}
                      />
                      <CustomSelect
                        value={formData.secteur}
                        onChange={(v) => {
                          setFormData((d) => ({ ...d, secteur: v }));
                          setErr('');
                        }}
                        placeholder="Secteur d'activité"
                        options={SECTEURS}
                      />
                      <input
                        className="dp-input"
                        type="email"
                        placeholder="Adresse mail *"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData((d) => ({ ...d, email: e.target.value }));
                          setErr('');
                        }}
                      />
                      <input
                        className="dp-input"
                        type="tel"
                        placeholder="Numéro de téléphone *"
                        value={formData.telephone}
                        onChange={(e) => {
                          setFormData((d) => ({ ...d, telephone: e.target.value }));
                          setErr('');
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
              <div style={{ height: 26 }} />
            </div>

            <div className="dp-footer" style={{ flexShrink: 0, padding: '0 46px 26px' }}>
              {err && (
                <p style={{ fontSize: 11.5, color: ORANGE, textAlign: 'center', margin: '0 0 10px', letterSpacing: '-.02em' }}>
                  {err}
                </p>
              )}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 44 }}>
                <button
                  type="button"
                  className="dp-cta"
                  onClick={done ? handleClose : submit}
                  disabled={busy}
                >
                  {busy && (
                    <span
                      style={{
                        width: 14,
                        height: 14,
                        border: '2px solid rgba(255,255,255,.35)',
                        borderTopColor: '#fff',
                        borderRadius: '50%',
                        animation: 'dpSpin .7s linear infinite',
                      }}
                    />
                  )}
                  {done ? 'Terminé' : busy ? 'Envoi…' : 'Envoyer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DevenirPartenaireModal;
