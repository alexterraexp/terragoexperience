import React, { useState, useEffect, useRef } from 'react';

const MODAL_MONTHS  = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const MODAL_REGIONS = [
  { name: 'Nouvelle-Aquitaine',         icon: '⛵' },
  { name: 'Auvergne-Rhône-Alpes',       icon: '🏔' },
  { name: "Provence-Alpes-Côte d'Azur", icon: '☀️' },
];
const MODAL_TERROIR = [
  { label: 'Olives',    emoji: '🫒' }, { label: 'Piments',    emoji: '🌶️' },
  { label: 'Truffe',    emoji: '🍄' }, { label: 'Fromages',   emoji: '🧀' },
  { label: 'Huîtres',  emoji: '🦪' }, { label: 'Élevages',   emoji: '🐄' },
  { label: 'Agrumes',  emoji: '🍊' }, { label: 'Vins',       emoji: '🍷' },
  { label: 'Spiritueux', emoji: '🥃' },
];
const MODAL_ACC   = ['Chambres seules', 'Chambres partagées'];
const MODAL_TRANS = ['De porte à porte', 'Depuis gare SNCF proche'];
const MODAL_PARTS = ['Moins de 10', '10 – 20', '20 – 40', '40 – 80', '80 – 150', '150+'];
const MODAL_STEPS = [{ label: 'Coordonnées' }, { label: 'Destination' }, { label: 'Logistique' }, { label: 'Récapitulatif' }];

const Field: React.FC<{ label: string; required?: boolean; children: React.ReactNode }> = ({ label, required, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
    <label style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b0a89e', display: 'block', marginBottom: 8 }}>
      {label}{required && <span style={{ color: '#e67e22', marginLeft: 4 }}>*</span>}
    </label>
    {children}
  </div>
);

const Pill: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode; small?: boolean }> = ({ active, onClick, children, small }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      padding: small ? '5px 12px' : '7px 14px', borderRadius: 9999,
      border: `1.5px solid ${active ? '#1a2e1a' : 'rgba(10,44,52,0.1)'}`,
      background: active ? '#1a2e1a' : '#faf8f5',
      color: active ? '#fff' : '#6b7280',
      fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
      cursor: 'pointer', fontFamily: 'inherit',
      boxShadow: active ? '0 2px 10px rgba(26,46,26,0.15)' : 'none',
      transition: 'all .15s ease', display: 'inline-flex', alignItems: 'center', gap: 5,
    }}
  >
    {active && <span style={{ fontSize: 8 }}>✓</span>}
    {children}
  </button>
);

const ModeBtn: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    type="button" onClick={onClick}
    style={{
      padding: '7px 18px', borderRadius: 9999,
      border: `1.5px solid ${active ? '#1a2e1a' : 'rgba(10,44,52,0.12)'}`,
      background: active ? '#1a2e1a' : '#fff',
      color: active ? '#fff' : '#9ca3af',
      fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
      cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s ease',
    }}
  >{children}</button>
);

const ToggleCard: React.FC<{ icon: string; label: string; active: boolean; onToggle: () => void; children?: React.ReactNode }> = ({ icon, label, active, onToggle, children }) => (
  <div style={{ padding: '18px', borderRadius: 16, border: `1.5px solid ${active ? '#1a2e1a' : 'rgba(10,44,52,0.08)'}`, background: active ? 'rgba(26,46,26,0.03)' : '#fff', transition: 'all .2s ease' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#1a2e1a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
      </div>
      <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
        <input type="checkbox" checked={active} onChange={onToggle} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
        <div style={{ width: 44, height: 24, borderRadius: 12, background: active ? '#1a2e1a' : '#e5e0d8', transition: 'background .2s ease', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 4, left: active ? 24 : 4, width: 16, height: 16, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.15)', transition: 'left .2s ease' }} />
        </div>
      </label>
    </div>
    {children}
  </div>
);

const RecapRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, padding: '9px 0', borderBottom: '1px solid rgba(10,44,52,0.05)' }}>
    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#b0a89e', flexShrink: 0, marginTop: 2 }}>{label}</span>
    <span style={{ fontSize: 12, fontWeight: 600, color: '#1a2e1a', textAlign: 'right' }}>{value || '—'}</span>
  </div>
);

const DAYS_FR = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const MONTHS_FR = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

const DateRangePicker: React.FC<{
  startDate: string; endDate: string;
  onStartChange: (d: string) => void; onEndChange: (d: string) => void;
}> = ({ startDate, endDate, onStartChange, onEndChange }) => {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selecting, setSelecting] = useState<'start' | 'end'>('start');
  const [hovered, setHovered] = useState<string | null>(null);

  const sd = startDate ? new Date(startDate + 'T00:00:00') : null;
  const ed = endDate   ? new Date(endDate   + 'T00:00:00') : null;

  const toStr = (d: Date) => d.toISOString().split('T')[0];

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const offset = (firstDay === 0 ? 6 : firstDay - 1);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(new Date(viewYear, viewMonth, i));

  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); };

  const handleDayClick = (d: Date) => {
    const s = toStr(d);
    if (selecting === 'start') {
      onStartChange(s);
      if (endDate && s > endDate) onEndChange('');
      setSelecting('end');
    } else {
      if (startDate && s < startDate) { onStartChange(s); setSelecting('end'); }
      else { onEndChange(s); setSelecting('start'); }
    }
  };

  const isInRange = (d: Date) => {
    const s = toStr(d);
    const rangeEnd = hovered && selecting === 'end' && startDate ? hovered : endDate;
    if (!startDate || !rangeEnd) return false;
    return s > startDate && s < rangeEnd;
  };
  const isStart  = (d: Date) => !!startDate && toStr(d) === startDate;
  const isEnd    = (d: Date) => !!endDate   && toStr(d) === endDate;
  const isPast   = (d: Date) => d < today;

  const fmtDisplay = (s: string) => s ? new Date(s + 'T00:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

  return (
    <div style={{ background: '#faf8f5', borderRadius: 16, border: '1px solid rgba(10,44,52,0.08)', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid rgba(10,44,52,0.06)' }}>
        {[
          { label: 'Arrivée', val: startDate, key: 'start' as const },
          { label: 'Départ',  val: endDate,   key: 'end'   as const },
        ].map(({ label, val, key }) => (
          <button
            key={key} type="button"
            onClick={() => setSelecting(key)}
            style={{
              padding: '12px 16px', background: selecting === key ? '#fff' : 'transparent',
              border: 'none', borderBottom: `2px solid ${selecting === key ? '#1a2e1a' : 'transparent'}`,
              cursor: 'pointer', textAlign: 'left', transition: 'all .15s ease',
              borderRight: key === 'start' ? '1px solid rgba(10,44,52,0.06)' : 'none',
            }}
          >
            <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: selecting === key ? '#e67e22' : '#b0a89e', marginBottom: 3 }}>{label}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: val ? '#1a2e1a' : '#c4bdb4' }}>{val ? fmtDisplay(val) : 'Choisir...'}</div>
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px 8px' }}>
        <button type="button" onClick={prevMonth} style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'rgba(10,44,52,0.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a2e1a', fontSize: 12, transition: 'background .15s' }}
          onMouseOver={e => (e.currentTarget.style.background = 'rgba(10,44,52,0.12)')}
          onMouseOut={e => (e.currentTarget.style.background = 'rgba(10,44,52,0.06)')}
        >‹</button>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#1a2e1a', textTransform: 'capitalize', letterSpacing: '0.05em' }}>
          {MONTHS_FR[viewMonth]} {viewYear}
        </span>
        <button type="button" onClick={nextMonth} style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'rgba(10,44,52,0.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a2e1a', fontSize: 12, transition: 'background .15s' }}
          onMouseOver={e => (e.currentTarget.style.background = 'rgba(10,44,52,0.12)')}
          onMouseOut={e => (e.currentTarget.style.background = 'rgba(10,44,52,0.06)')}
        >›</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', padding: '0 12px', marginBottom: 4 }}>
        {DAYS_FR.map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: 9, fontWeight: 700, color: '#b0a89e', letterSpacing: '0.1em', padding: '4px 0' }}>{d}</div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', padding: '0 12px 14px', gap: 2 }}>
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const start = isStart(d), end = isEnd(d), inRange = isInRange(d), past = isPast(d);
          const isToday = toStr(d) === toStr(today);
          return (
            <button
              key={i} type="button"
              disabled={past}
              onClick={() => !past && handleDayClick(d)}
              onMouseEnter={() => setHovered(toStr(d))}
              onMouseLeave={() => setHovered(null)}
              style={{
                height: 32, borderRadius: start || end ? 9999 : inRange ? 0 : 9999,
                border: isToday && !start && !end ? '1.5px solid rgba(230,126,34,0.4)' : 'none',
                background: start || end ? '#1a2e1a' : inRange ? 'rgba(26,46,26,0.08)' : 'transparent',
                color: start || end ? '#fff' : past ? '#d5cfc7' : '#1a2e1a',
                fontSize: 11, fontWeight: start || end ? 700 : isToday ? 700 : 400,
                cursor: past ? 'not-allowed' : 'pointer',
                transition: 'all .12s ease',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>

      <div style={{ padding: '8px 16px 12px', borderTop: '1px solid rgba(10,44,52,0.05)', display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#e67e22', flexShrink: 0 }} />
        <span style={{ fontSize: 9, color: '#b0a89e', fontWeight: 600, letterSpacing: '0.08em' }}>
          {selecting === 'start' ? "Sélectionnez la date d'arrivée" : "Sélectionnez la date de départ"}
        </span>
      </div>
    </div>
  );
};

type SeminaireModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SeminaireModal: React.FC<SeminaireModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep]       = useState(1);
  const [closing, setClosing] = useState(false);
  const [trans, setTrans]     = useState(false);
  const [busy, setBusy]       = useState(false);
  const [ok, setOk]           = useState(false);
  const [err, setErr]         = useState('');

  const [form, setForm]   = useState({ prenom: '', nom: '', email: '', entreprise: '', participants: '', message: '' });
  const [regions, setReg] = useState<string[]>([]);
  const [terroir, setTer] = useState<string[]>([]);
  const [autre, setAutre] = useState('');
  const [ville, setVille] = useState('');
  const [acc, setAcc]     = useState<string[]>([]);
  const [trans2, setTr2]  = useState('');
  const [months, setMo]   = useState<string[]>([]);
  const [pMode, setPMode] = useState<'dates' | 'months'>('dates');
  const [sd, setSd]       = useState('');
  const [ed, setEd]       = useState('');
  const [heb, setHeb]     = useState(false);
  const [wt, setWt]       = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 600);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 600);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' }); }, [step]);

  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false); setStep(1); setOk(false); setErr('');
      setForm({ prenom: '', nom: '', email: '', entreprise: '', participants: '', message: '' });
      setReg([]); setTer([]); setAcc([]); setTr2(''); setMo([]);
      setHeb(false); setWt(false); setAutre(''); setVille('');
      setPMode('dates'); setSd(''); setEd('');
      onClose();
    }, 280);
  };

  const tog = (list: string[], setL: (l: string[]) => void, item: string) =>
    setL(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);

  const goNext = () => {
    setErr('');
    if (step === 1) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
      const perOk = pMode === 'months' ? months.length > 0 : !!sd && !!ed;
      if (!form.prenom || !form.nom || !form.email || !emailOk || !form.entreprise || !form.participants || !perOk) {
        setErr('Certains champs obligatoires sont manquants ou invalides.'); return;
      }
    }
    setTrans(true);
    setTimeout(() => { setStep(s => Math.min(s + 1, 4)); setTrans(false); }, 180);
  };

  const goPrev = () => {
    setTrans(true);
    setTimeout(() => { setStep(s => Math.max(s - 1, 1)); setTrans(false); }, 180);
  };

  const handleSubmit = async () => {
    setBusy(true);
    const perStr = pMode === 'dates'
      ? (sd && ed ? `Du ${new Date(`${sd}T00:00:00`).toLocaleDateString('fr-FR')} au ${new Date(`${ed}T00:00:00`).toLocaleDateString('fr-FR')}` : 'Dates non renseignées')
      : (months.length > 0 ? months.join(', ') : 'Aucun mois');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          action: 'seminaire_sur_mesure',
          prenom: form.prenom,
          nom: form.nom,
          email: form.email,
          entreprise: form.entreprise,
          participants: form.participants,
          periodeStr: perStr,
          regions,
          autreRegion: autre,
          ville,
          terroir,
          hebergement: heb,
          accTypes: acc,
          transport: wt,
          transportDetail: trans2,
          message: form.message,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (res.ok && data.success) {
        setOk(true);
        setTimeout(handleClose, 2400);
      } else {
        throw new Error();
      }
    } catch {
      alert("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setBusy(false);
    }
  };

  if (!isOpen) return null;

  const perStr = pMode === 'dates'
    ? (sd && ed ? `${new Date(`${sd}T00:00:00`).toLocaleDateString('fr-FR')} → ${new Date(`${ed}T00:00:00`).toLocaleDateString('fr-FR')}` : '')
    : months.join(', ');

  const STEP_TITLE: Record<number, string> = {
    1: 'Commençons par vous.',
    2: 'Destination & terroir.',
    3: 'Logistique & sur-mesure.',
    4: 'Votre récapitulatif.',
  };

  return (
    <>
      <style>{`
        @keyframes semIn  { from { opacity:0; transform:translateY(28px) scale(0.97) } to { opacity:1; transform:translateY(0) scale(1) } }
        @keyframes semOut { from { opacity:1; transform:translateY(0) scale(1) } to { opacity:0; transform:translateY(28px) scale(0.97) } }
        @keyframes semFd  { from { opacity:0; transform:translateY(6px) } to { opacity:1; transform:translateY(0) } }
        @keyframes semSp  { to { transform:rotate(360deg) } }
        .sem-sc::-webkit-scrollbar { display:none } .sem-sc { scrollbar-width:none }
        .sem-i {
          width:100%; background:#faf8f5;
          border:1px solid rgba(10,44,52,.08); border-radius:12px;
          padding:12px 16px; font-family:inherit; font-size:13px; color:#1a2e1a;
          outline:none; transition:all .18s ease; box-sizing:border-box;
        }
        .sem-i:focus { border-color:#1a2e1a; background:#fff; box-shadow:0 0 0 3px rgba(26,46,26,.06); }
        .sem-i::placeholder { color:#c4bdb4; }
        @media(max-width:600px) {
          .sg2 { grid-template-columns:1fr!important }
          .sg3 { grid-template-columns:1fr!important }
          .sg4 { grid-template-columns:1fr 1fr!important }
          .ssl { display:none!important }

          /* Le panneau occupe tout l'écran sur mobile */
          .sem-wrapper {
            align-items:stretch!important;
            justify-content:stretch!important;
            padding:0!important;
          }
          .sem-panel {
            position:fixed!important;
            inset:0!important;
            border-radius:0!important;
            max-width:none!important;
            width:100%!important;
            height:100vh!important;
            height:100dvh!important;
            max-height:none!important;
            min-height:0!important;
            box-shadow:none!important;
          }

          .sem-header {
            padding-top:max(20px, env(safe-area-inset-top))!important;
          }

          .sem-body {
            padding:16px 16px 0!important;
            min-height:0!important;
          }

          .sem-footer {
            padding:12px 16px max(12px, env(safe-area-inset-bottom))!important;
          }
        }
      `}</style>

      <div
        onClick={handleClose}
        style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(10,20,10,0.72)', backdropFilter: 'blur(8px)', opacity: closing ? 0 : 1, transition: 'opacity .28s ease' }}
      />

      <div
          className="sem-wrapper"
          style={{
            position: 'fixed', inset: 0, zIndex: 1000, display: 'flex',
            alignItems: isMobile ? 'stretch' : 'center',
            justifyContent: isMobile ? 'stretch' : 'center',
            padding: isMobile ? 0 : 16,
            pointerEvents: 'none',
          }}
        >
        <div
          className="sem-panel"
          onClick={e => e.stopPropagation()}
          style={{
            pointerEvents: 'auto',
            ...(isMobile
              ? {
                  position: 'fixed' as const,
                  top: 0, left: 0, right: 0, bottom: 0,
                  width: '100%', maxWidth: 'none',
                  height: '100dvh', maxHeight: '100dvh',
                  minHeight: 0, borderRadius: 0, boxShadow: 'none',
                }
              : {
                  width: '100%', maxWidth: 780, maxHeight: '94vh', minHeight: 0,
                  borderRadius: 28,
                  boxShadow: '0 8px 48px rgba(0,0,0,0.14), 0 0 0 1px rgba(10,44,52,0.05)',
                }),
            background: '#fff',
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
            animation: `${closing ? 'semOut' : 'semIn'} .32s cubic-bezier(.22,1,.36,1) both`,
            fontFamily: "'Poppins',sans-serif",
          }}
        >

          <div className="sem-header" style={{ padding: '20px 28px 0', background: '#fff', flexShrink: 0, borderBottom: '1px solid rgba(10,44,52,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 16, height: 1, background: '#e67e22' }} />
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#e67e22' }}>
                  Votre projet de séminaire
                </span>
              </div>
              <button
                onClick={handleClose}
                style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, background: '#f4f1ec', border: 'none', color: '#6b7280', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s ease' }}
                onMouseOver={e => (e.currentTarget.style.background = '#e8e2d9')}
                onMouseOut={e => (e.currentTarget.style.background = '#f4f1ec')}
              >×</button>
            </div>

            <div style={{ display: 'flex', gap: 6, paddingBottom: 14 }}>
              {MODAL_STEPS.map((s, i) => {
                const idx = i + 1, done = step > idx, active = step === idx;
                return (
                  <div key={s.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <div style={{ height: 2, borderRadius: 2, background: done ? '#e67e22' : active ? '#1a2e1a' : 'rgba(10,44,52,0.08)', transition: 'background .4s ease' }} />
                    <span className="ssl" style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: active ? '#1a2e1a' : done ? '#e67e22' : 'rgba(10,44,52,0.28)', transition: 'color .3s ease' }}>
                      {idx}. {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {err && (
            <div style={{ background: 'rgba(230,126,34,0.07)', borderBottom: '1px solid rgba(230,126,34,0.18)', padding: '10px 28px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <span style={{ fontSize: 15 }}>⚠️</span>
              <p style={{ fontSize: 11, color: '#c0620a', fontWeight: 600, margin: 0, flex: 1 }}>{err}</p>
              <button onClick={() => setErr('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c0620a', fontSize: 16 }}>×</button>
            </div>
          )}

          {ok && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 20, background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(4px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 28, animation: 'semFd .3s ease' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#1a2e1a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: '0 8px 30px rgba(26,46,26,0.25)' }}>
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                  <path d="M8 17.5L14 23.5L26 11" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 style={{ fontWeight: 700, fontStyle: 'normal', fontSize: 26, color: '#1a2e1a', margin: '0 0 8px', fontFamily: "'Poppins',sans-serif" }}>Demande envoyée !</h3>
              <p style={{ color: '#9ca3af', fontSize: 13, margin: 0 }}>Nous vous recontacterons sous 48h.</p>
            </div>
          )}

          <div ref={scrollRef} className="sem-sc sem-body" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '28px 28px 0' }}>
            <div style={{ opacity: trans ? 0 : 1, transform: trans ? 'translateY(5px)' : 'translateY(0)', transition: 'all .18s ease' }}>

              <h3 style={{ fontFamily: "'Poppins',sans-serif", fontStyle: 'normal', fontWeight: 700, fontSize: 22, color: '#1a2e1a', margin: '0 0 22px' }}>
                {STEP_TITLE[step]}
              </h3>

              {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div className="sg2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <Field label="Prénom" required><input className="sem-i" placeholder="Jean" value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })} /></Field>
                    <Field label="Nom" required><input className="sem-i" placeholder="Dupont" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} /></Field>
                    <Field label="Email professionnel" required><input className="sem-i" type="email" placeholder="contact@entreprise.fr" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></Field>
                    <Field label="Entreprise" required><input className="sem-i" placeholder="Terroir SAS" value={form.entreprise} onChange={e => setForm({ ...form, entreprise: e.target.value })} /></Field>
                  </div>

                  <Field label="Nombre de participants" required>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {MODAL_PARTS.map(p => <Pill key={p} active={form.participants === p} onClick={() => setForm({ ...form, participants: p })}>{p}</Pill>)}
                    </div>
                  </Field>

                  <Field label="Période souhaitée" required>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                      <ModeBtn active={pMode === 'dates'} onClick={() => { setPMode('dates'); setMo([]); }}>Dates précises</ModeBtn>
                      <ModeBtn active={pMode === 'months'} onClick={() => { setPMode('months'); setSd(''); setEd(''); }}>Choisir des mois</ModeBtn>
                    </div>
                    {pMode === 'dates' ? (
                      <DateRangePicker
                        startDate={sd} endDate={ed}
                        onStartChange={setSd} onEndChange={setEd}
                      />
                    ) : (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                        {MODAL_MONTHS.map(m => <Pill key={m} active={months.includes(m)} onClick={() => tog(months, setMo, m)}>{m}</Pill>)}
                      </div>
                    )}
                  </Field>
                </div>
              )}

              {step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <Field label="Région(s) souhaitée(s)">
                    <div className="sg3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                      {MODAL_REGIONS.map(r => {
                        const a = regions.includes(r.name);
                        return (
                          <button
                            key={r.name} type="button"
                            onClick={() => tog(regions, setReg, r.name)}
                            style={{
                              padding: '18px 12px', borderRadius: 20, fontFamily: 'inherit',
                              border: `1.5px solid ${a ? '#1a2e1a' : 'rgba(10,44,52,0.08)'}`,
                              background: a ? '#1a2e1a' : '#faf8f5',
                              cursor: 'pointer', textAlign: 'center', transition: 'all .2s ease',
                              transform: a ? 'translateY(-2px)' : 'none',
                              boxShadow: a ? '0 6px 20px rgba(26,46,26,.16)' : 'none',
                            }}
                          >
                            <div style={{ fontSize: 24, marginBottom: 8 }}>{r.icon}</div>
                            <div style={{ fontSize: 10, fontWeight: 700, color: a ? '#fff' : '#1a2e1a', lineHeight: 1.3 }}>{r.name}</div>
                            {a && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#e67e22', margin: '8px auto 0' }} />}
                          </button>
                        );
                      })}
                    </div>
                  </Field>

                  <div className="sg2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <Field label="Autre région"><input className="sem-i" placeholder="Ex : Bretagne, Occitanie…" value={autre} onChange={e => setAutre(e.target.value)} /></Field>
                    <Field label="Ville"><input className="sem-i" placeholder="Ex : Bordeaux, Lyon…" value={ville} onChange={e => setVille(e.target.value)} /></Field>
                  </div>

                  <Field label="Quel produit du terroir découvrir ?">
                    <div className="sg4" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 9 }}>
                      {MODAL_TERROIR.map(p => {
                        const a = terroir.includes(p.label);
                        return (
                          <button
                            key={p.label} type="button"
                            onClick={() => tog(terroir, setTer, p.label)}
                            style={{
                              padding: '12px 8px', borderRadius: 16, fontFamily: 'inherit',
                              border: `1.5px solid ${a ? '#1a2e1a' : 'rgba(10,44,52,0.08)'}`,
                              background: a ? '#1a2e1a' : '#faf8f5',
                              cursor: 'pointer', textAlign: 'center', transition: 'all .2s ease',
                              boxShadow: a ? '0 4px 14px rgba(26,46,26,.14)' : 'none',
                              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                            }}
                          >
                            <span style={{ fontSize: 22 }}>{p.emoji}</span>
                            <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: a ? '#fff' : '#4b5563' }}>{p.label}</span>
                            {a && <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#e67e22', display: 'inline-block' }} />}
                          </button>
                        );
                      })}
                    </div>
                  </Field>
                </div>
              )}

              {step === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div className="sg2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <ToggleCard icon="🏠" label="Hébergement" active={heb} onToggle={() => setHeb(v => !v)}>
                      {heb && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>{MODAL_ACC.map(t => <Pill key={t} active={acc.includes(t)} onClick={() => tog(acc, setAcc, t)} small>{t}</Pill>)}</div>}
                    </ToggleCard>
                    <ToggleCard icon="🚗" label="Transport" active={wt} onToggle={() => setWt(v => !v)}>
                      {wt && <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>{MODAL_TRANS.map(t => <Pill key={t} active={trans2 === t} onClick={() => setTr2(t)} small>{t}</Pill>)}</div>}
                    </ToggleCard>
                  </div>
                  <Field label="Un message particulier ?">
                    <textarea className="sem-i" rows={4} style={{ resize: 'none', lineHeight: 1.6 }} placeholder="Salles de réunion, pauses gourmandes, activités team building particulières…" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                  </Field>
                </div>
              )}

              {step === 4 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <p style={{ color: '#b0a89e', fontSize: 12, margin: '0 0 4px' }}>Vérifiez vos informations avant d'envoyer.</p>
                  {[
                    { title: '01 — Coordonnées', rows: [{ label: 'Nom', value: `${form.prenom} ${form.nom}` }, { label: 'Email', value: form.email }, { label: 'Entreprise', value: form.entreprise }, { label: 'Participants', value: form.participants }, { label: 'Période', value: perStr }] },
                    { title: '02 — Destination & Terroir', rows: [{ label: 'Région(s)', value: [...regions, autre].filter(Boolean).join(', ') }, { label: 'Produits', value: terroir.join(', ') }, ...(ville ? [{ label: 'Ville', value: ville }] : [])] },
                    { title: '03 — Logistique', rows: [{ label: 'Hébergement', value: heb ? (acc.length > 0 ? acc.join(', ') : 'Oui') : 'Non' }, { label: 'Transport', value: wt ? (trans2 || 'Oui') : 'Non' }, ...(form.message ? [{ label: 'Message', value: form.message }] : [])] },
                  ].map(block => (
                    <div key={block.title} style={{ background: '#faf8f5', borderRadius: 16, padding: '14px 18px' }}>
                      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#e67e22', marginBottom: 10 }}>{block.title}</div>
                      {block.rows.map(r => <RecapRow key={r.label} label={r.label} value={r.value} />)}
                    </div>
                  ))}
                  <p style={{ fontSize: 11, color: '#b0a89e', textAlign: 'center', margin: '4px 0 0' }}>
                    Tout est correct ? Cliquez sur <strong style={{ color: '#1a2e1a' }}>Envoyer le brief</strong> pour nous le transmettre.
                  </p>
                </div>
              )}
            </div>
            <div style={{ height: 28 }} />
          </div>

          <div
            className="sem-footer"
            style={{ padding: '14px 28px', borderTop: '1px solid rgba(10,44,52,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexShrink: 0, background: '#fff', flexWrap: 'wrap' }}
          >
            <button
              onClick={goPrev} disabled={step === 1}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: step === 1 ? 'default' : 'pointer', color: step === 1 ? 'transparent' : '#9ca3af', fontFamily: 'inherit', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '8px 0', transition: 'color .2s ease' }}
              onMouseOver={e => { if (step > 1) e.currentTarget.style.color = '#1a2e1a'; }}
              onMouseOut={e => { if (step > 1) e.currentTarget.style.color = '#9ca3af'; }}
            >← Précédent</button>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={handleClose}
                style={{ padding: '10px 20px', borderRadius: 9999, border: '1.5px solid rgba(10,44,52,0.1)', background: '#faf8f5', fontFamily: 'inherit', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', cursor: 'pointer', transition: 'all .15s ease' }}
                onMouseOver={e => { e.currentTarget.style.borderColor = '#1a2e1a'; e.currentTarget.style.color = '#1a2e1a'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(10,44,52,0.1)'; e.currentTarget.style.color = '#9ca3af'; }}
              >Annuler</button>

              <button
                onClick={step < 4 ? goNext : handleSubmit} disabled={busy}
                style={{ padding: '10px 28px', borderRadius: 9999, background: '#1a2e1a', color: '#fff', border: 'none', fontFamily: 'inherit', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: busy ? 'not-allowed' : 'pointer', opacity: busy ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: 8, transition: 'background .2s ease', minWidth: 170 }}
                onMouseOver={e => { if (!busy) e.currentTarget.style.background = '#2b3e24'; }}
                onMouseOut={e => { e.currentTarget.style.background = '#1a2e1a'; }}
              >
                {busy ? (
                  <><span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'semSp .7s linear infinite', display: 'inline-block' }} />Envoi…</>
                ) : step < 4 ? (
                  <>Continuer <span style={{ fontSize: 14 }}>→</span></>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    Envoyer le brief
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeminaireModal;

