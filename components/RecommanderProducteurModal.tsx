'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const INK = '#0c1d22';
const ORANGE = '#ec6435';
const HOME_BUCKET =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME';
const VISUAL = `${HOME_BUCKET}/paysage-huitres.png`;

const FORMSPREE_RECOMMEND_ID =
  (process.env.NEXT_PUBLIC_FORMSPREE_RECOMMEND_ID as string | undefined) ||
  undefined;

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

type Props = { isOpen: boolean; onClose: () => void };

const RecommanderProducteurModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [closing, setClosing] = useState(false);
  const [formData, setFormData] = useState({
    producerName: '',
    yourName: '',
    yourEmail: '',
    producerContact: '',
    message: '',
  });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');
  const [submittedName, setSubmittedName] = useState('');

  const reset = () => {
    setFormData({
      producerName: '',
      yourName: '',
      yourEmail: '',
      producerContact: '',
      message: '',
    });
    setBusy(false);
    setDone(false);
    setErr('');
    setSubmittedName('');
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
    const producerName = formData.producerName.trim();
    const yourName = formData.yourName.trim();
    const yourEmail = formData.yourEmail.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(yourEmail);

    if (!producerName || !yourName || !emailOk) {
      return setErr(
        'Indiquez le producteur, votre nom et une adresse mail valide.',
      );
    }

    setBusy(true);

    const emailBody = [
      '=== RECOMMANDATION PRODUCTEUR ===',
      '',
      `Nom du producteur / exploitation : ${producerName}`,
      `Votre nom : ${yourName}`,
      `Votre email : ${yourEmail}`,
      `Contact du producteur : ${formData.producerContact || '—'}`,
      '',
      'Message :',
      formData.message || '—',
      '',
      '---',
      'Envoyé depuis le formulaire Recommander un producteur - TerraGo',
    ].join('\n');

    try {
      if (FORMSPREE_RECOMMEND_ID) {
        const res = await fetch(
          `https://formspree.io/f/${FORMSPREE_RECOMMEND_ID}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              _replyto: yourEmail || undefined,
              producerName,
              yourName,
              yourEmail,
              producerContact: formData.producerContact,
              message: formData.message,
              _subject: `Recommandation producteur : ${producerName}`,
              _format: 'plain',
              body: emailBody,
            }),
          },
        );
        if (!res.ok) throw new Error('Erreur envoi');
      } else {
        const res = await fetch('/api/lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            action: 'recommend_producteur',
            producerName,
            yourName,
            yourEmail,
            producerContact: formData.producerContact,
            message: formData.message,
          }),
        });
        const j = (await res.json().catch(() => ({}))) as {
          success?: boolean;
        };
        if (!res.ok || !j.success) throw new Error('Erreur envoi');
      }

      setSubmittedName(producerName);
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
        @keyframes rpIn  { from { opacity:0; transform:translateY(16px) scale(.985) } to { opacity:1; transform:none } }
        @keyframes rpOut { from { opacity:1; transform:none } to { opacity:0; transform:translateY(16px) scale(.985) } }
        @keyframes rpFade { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:none } }
        @keyframes rpSpin { to { transform: rotate(360deg) } }

        .rp-scroll::-webkit-scrollbar { width:0 }
        .rp-scroll { scrollbar-width:none }

        .rp-input {
          width:100%; box-sizing:border-box; background:#fff;
          border:1px solid rgba(12,29,34,.14); border-radius:12px;
          padding:11px 14px; font-family:inherit; font-size:13px; color:${INK};
          letter-spacing:-.02em; outline:none; transition:border-color .15s ease, box-shadow .15s ease;
        }
        .rp-input:focus { border-color:${INK}; box-shadow:0 0 0 3px rgba(12,29,34,.06) }
        .rp-input::placeholder { color:#b3b3b3 }

        .rp-cta {
          border:none; border-radius:9999px; background:${ORANGE}; color:#fff;
          font-family:inherit; font-size:13px; letter-spacing:-.03em; font-weight:500;
          padding:10px 24px; cursor:pointer; transition:background .18s ease;
          display:inline-flex; align-items:center; gap:9px;
        }
        .rp-cta:hover { background:#d9552a }
        .rp-cta:disabled { opacity:.65; cursor:not-allowed }
        @media (min-width: 861px) {
          .rp-cta { font-size:15px; padding:12px 34px; }
        }

        @media (max-width: 860px) {
          .rp-wrapper { padding:0 !important; align-items:stretch !important }
          .rp-panel {
            display:block !important; width:100% !important; max-width:none !important;
            height:100% !important; height:100dvh !important; height:100svh !important;
            max-height:100svh !important; border-radius:0 !important;
            overflow-x:hidden !important; overflow-y:scroll !important;
            -webkit-overflow-scrolling:touch; overscroll-behavior:contain; touch-action:pan-y;
          }
          .rp-visual { width:100% !important; height:132px !important; flex:none !important }
          .rp-body { display:block !important; flex:none !important; min-height:0 !important; overflow:visible !important }
          .rp-content {
            flex:none !important; min-height:0 !important; overflow:visible !important;
            padding:26px 22px 0 !important;
          }
          .rp-footer { padding:18px 22px max(28px, env(safe-area-inset-bottom)) !important }
          .rp-title { font-size:22px !important }
          .rp-close {
            position:fixed !important; top:max(12px, env(safe-area-inset-top)) !important;
            right:16px !important; background:rgba(255,255,255,.88) !important;
            border-radius:50% !important; backdrop-filter:blur(8px);
          }
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
        className="rp-wrapper"
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
          className="rp-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Recommander un producteur"
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
            animation: `${closing ? 'rpOut' : 'rpIn'} .28s cubic-bezier(.22,1,.36,1) both`,
          }}
        >
          <div
            className="rp-visual"
            style={{
              flex: '0 0 34%',
              width: '34%',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Image
              src={VISUAL}
              alt="Paysage ostréicole – TerraGo"
              fill
              className="object-cover"
              sizes="(max-width: 860px) 100vw, 34vw"
            />
          </div>

          <div className="rp-body" style={{ flex: 1, minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <button
              className="rp-close"
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

            <div className="rp-scroll rp-content" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '54px 46px 0' }}>
              <div style={{ animation: 'rpFade .3s ease both' }}>
                {done ? (
                  <div style={{ paddingTop: 42 }}>
                    <h2 className="rp-title" style={{ ...titleStyle, marginBottom: 30 }}>
                      <strong style={strong}>Merci beaucoup !</strong>
                    </h2>
                    <p className="rp-title" style={{ ...titleStyle, margin: 0 }}>
                      On contactera{' '}
                      <strong style={strong}>{submittedName || 'ce producteur'}</strong>{' '}
                      au plus vite.
                    </p>
                    <p style={{ ...leadStyle, fontSize: 14, textAlign: 'center', margin: '26px 0 0' }}>
                      L&apos;équipe TERRAGO
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="rp-title" style={titleStyle}>
                      Recommander <strong style={strong}>un producteur.</strong>
                    </h2>
                    <p style={leadStyle}>
                      Vous connaissez un producteur, un agriculteur ou un artisan qui mérite d&apos;être découvert ?
                    </p>
                    <p style={{ ...leadStyle, marginTop: -10 }}>
                      Partagez-nous ses coordonnées. Nous prendrons contact avec lui pour lui présenter TerraGo et imaginer, pourquoi pas, une future expérience ensemble.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 13, maxWidth: 340 }}>
                      <input
                        className="rp-input"
                        placeholder="Nom du producteur ou de l'exploitation *"
                        value={formData.producerName}
                        onChange={(e) => {
                          setFormData((d) => ({ ...d, producerName: e.target.value }));
                          setErr('');
                        }}
                      />
                      <input
                        className="rp-input"
                        placeholder="Votre nom *"
                        value={formData.yourName}
                        onChange={(e) => {
                          setFormData((d) => ({ ...d, yourName: e.target.value }));
                          setErr('');
                        }}
                      />
                      <input
                        className="rp-input"
                        type="email"
                        placeholder="Votre adresse mail *"
                        value={formData.yourEmail}
                        onChange={(e) => {
                          setFormData((d) => ({ ...d, yourEmail: e.target.value }));
                          setErr('');
                        }}
                      />
                      <input
                        className="rp-input"
                        placeholder="Contact du producteur (email ou téléphone)"
                        value={formData.producerContact}
                        onChange={(e) =>
                          setFormData((d) => ({
                            ...d,
                            producerContact: e.target.value,
                          }))
                        }
                      />
                      <textarea
                        className="rp-input"
                        rows={3}
                        style={{ resize: 'none', lineHeight: 1.5 }}
                        placeholder="Quelques mots : secteur, région, pourquoi vous le recommandez…"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData((d) => ({ ...d, message: e.target.value }))
                        }
                      />
                    </div>
                  </>
                )}
              </div>
              <div style={{ height: 26 }} />
            </div>

            <div className="rp-footer" style={{ flexShrink: 0, padding: '0 46px 26px' }}>
              {err && (
                <p style={{ fontSize: 11.5, color: ORANGE, textAlign: 'center', margin: '0 0 10px', letterSpacing: '-.02em' }}>
                  {err}
                </p>
              )}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 44 }}>
                <button
                  type="button"
                  className="rp-cta"
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
                        animation: 'rpSpin .7s linear infinite',
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

export default RecommanderProducteurModal;
