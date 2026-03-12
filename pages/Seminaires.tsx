import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ScrollAnimate from '../components/ScrollAnimate';

// ─── Hero images ──────────────────────────────────────────────────────────────

const heroImages = [
  'https://images.unsplash.com/photo-1556159991-b4876ad5ef9b?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1761839259494-71caddcdd6b3?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1504224357642-c87eacea1da4?q=80&w=1750&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1586973831237-7d8dd03a996f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1633509928027-f1c3b5dc1f92?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

// ─── Page types & data ────────────────────────────────────────────────────────

type UniversData = {
  id: string; label: string; badge: string;
  description: string; activites: string[]; saison: string; couleur: string;
};

const UNIVERS_DATA: Record<string, UniversData> = {
  cognac:  { id: 'cognac',  label: 'AUTOUR DU COGNAC',             badge: "COGNAC • 40 MIN D'ANGOULÊME TGV",       description: "Des vignes aux alambics de cuivre, vivez la magie de la double distillation dans les chais centenaires de la Charente.", activites: ['Participation aux vendanges', 'Fabrication de son propre pineau', 'Visite des chais et alambics', 'Golf entre les vignes'], saison: "Toute l'année", couleur: 'rgb(92,42,9)' },
  olive:   { id: 'olive',   label: "AUTOUR DE L'OLIVE",            badge: "VALENSOLE • 45 MIN D'AIX EN PROVENCE TGV", description: "Sous les oliviers centenaires de Provence, découvrez comment naît une huile d'exception, entre lavande et soleil.", activites: ['Apprentissage et récolte des olives', 'Fabrication de son huile', 'Récolte de lavandes fines', "Distillation de son parfum d'ambiance"], saison: 'Octobre – Décembre', couleur: 'rgb(72,107,9)' },
  noix:    { id: 'noix',    label: "AUTOUR DE LA NOIX",            badge: "Romans-sur-Isère • 15 MIN De VALENCE TGV", description: "Parmi les noyers centenaires, apprenez la récolte et la fabrication d'une huile de noix artisanale d'une finesse rare.", activites: ['Apprentissage et récolte des noix', 'Fabrication de son huile/vin de noix', 'Session Trail dans un cadre magnifique'], saison: 'Septembre – Novembre', couleur: 'rgb(161,68,7)' },
  truffe:  { id: 'truffe',  label: "AUTOUR DE LA TRUFFE",          badge: "CHINON • 1H DE TOURS TGV",               description: "Partez à la découverte du champignon le plus mystérieux de France avec un trufficulteur passionné au cœur du Périgord.", activites: ['Cavage et découverte de la truffe', 'Atelier cuisine autour de la truffe', 'Ferme florale et potager', 'Dégustation de produits truffés'], saison: 'Décembre – Mars', couleur: 'rgb(104,102,42)' },
  fromage: { id: 'fromage', label: "AUTOUR DU FROMAGE DE CHÈVRE",  badge: "1H D'AIX-EN-PROVENCE TGV",               description: "Vivez une journée complète dans une ferme caprine : soins aux bêtes, fabrication du fromage et dégustation en plein air.", activites: ['Soins aux chèvres', 'Fabrication du fromage', 'Dégustation à la ferme', 'Visite de cave'], saison: "Toute l'année", couleur: 'rgb(177,146,7)' },
  vin:     { id: 'vin',     label: "AUTOUR DU VIN AOC VENTOUX",    badge: "Bédoin • 1H D'AVIGNON TGV",              description: "Les mains dans la terre, entre vignes et ciel provençal, vivez l'aventure viticole au pied du Mont Ventoux.", activites: ['Les mains dans la terre', 'Activité autour de la vigne', 'Soirée soleil et guinguette', 'Excursion vélo au Mont Ventoux'], saison: 'Avril – Octobre', couleur: 'rgb(106,13,13)' },
};

const UNIVERS_TO_FILTER: Record<string, string> = {
  cognac: 'Spiritueux', olive: 'Olives', noix: 'Noix', truffe: 'Truffes', fromage: 'Élevages', vin: 'Vins',
};

// ─── Modal constants ──────────────────────────────────────────────────────────

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

// ─── Modal sub-components ─────────────────────────────────────────────────────

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

// ─── DateRangePicker ─────────────────────────────────────────────────────────

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
      {/* Selected range display */}
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

      {/* Calendar header */}
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

      {/* Day labels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', padding: '0 12px', marginBottom: 4 }}>
        {DAYS_FR.map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: 9, fontWeight: 700, color: '#b0a89e', letterSpacing: '0.1em', padding: '4px 0' }}>{d}</div>
        ))}
      </div>

      {/* Days grid */}
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

      {/* Hint */}
      <div style={{ padding: '8px 16px 12px', borderTop: '1px solid rgba(10,44,52,0.05)', display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#e67e22', flexShrink: 0 }} />
        <span style={{ fontSize: 9, color: '#b0a89e', fontWeight: 600, letterSpacing: '0.08em' }}>
          {selecting === 'start' ? "Sélectionnez la date d'arrivée" : "Sélectionnez la date de départ"}
        </span>
      </div>
    </div>
  );
};

// ─── SeminaireModal ───────────────────────────────────────────────────────────

const SeminaireModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
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
      ? (sd && ed ? `Du ${new Date(sd).toLocaleDateString('fr-FR')} au ${new Date(ed).toLocaleDateString('fr-FR')}` : 'Dates non renseignées')
      : (months.length > 0 ? months.join(', ') : 'Aucun mois');
    const body = `
Nouvelle demande de séminaire - Terrago

=== INFORMATIONS CLIENT ===
Prénom: ${form.prenom} | Nom: ${form.nom}
Email: ${form.email} | Entreprise: ${form.entreprise}
Participants: ${form.participants}
Période: ${perStr}

=== DESTINATION & TERROIR ===
Région(s): ${[...regions, autre].filter(Boolean).join(', ') || 'Non précisée'}
${ville ? `Ville: ${ville}` : ''}
Produits du terroir: ${terroir.join(', ') || 'Non précisé'}

=== LOGISTIQUE ===
Hébergement: ${heb ? (acc.join(', ') || 'Oui') : 'Non'}
Transport: ${wt ? (trans2 || 'Oui') : 'Non'}
Message: ${form.message || 'Aucun'}
    `.trim();
    try {
      const res = await fetch('https://formsubmit.co/ajax/alexso.terrago@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: `${form.prenom} ${form.nom}`, email: form.email, subject: `Nouvelle demande de séminaire - ${form.entreprise}`, message: body, _captcha: false, _template: 'table' }),
      });
      if (res.ok) { setOk(true); setTimeout(handleClose, 2400); }
      else throw new Error();
    } catch { alert("Erreur lors de l'envoi. Veuillez réessayer."); }
    finally { setBusy(false); }
  };

  if (!isOpen) return null;

  const perStr = pMode === 'dates'
    ? (sd && ed ? `${new Date(sd).toLocaleDateString('fr-FR')} → ${new Date(ed).toLocaleDateString('fr-FR')}` : '')
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
          .sem-panel { border-radius:20px!important; max-height:98vh!important }
          .sem-body  { padding:16px 16px 0!important }
          .sem-footer { padding:12px 16px!important }
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(10,20,10,0.72)', backdropFilter: 'blur(8px)', opacity: closing ? 0 : 1, transition: 'opacity .28s ease' }}
      />

      {/* Panel */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, pointerEvents: 'none' }}>
        <div
          className="sem-panel"
          onClick={e => e.stopPropagation()}
          style={{
            pointerEvents: 'auto', width: '100%', maxWidth: 780, maxHeight: '94vh',
            background: '#fff', borderRadius: 28, display: 'flex', flexDirection: 'column', overflow: 'hidden',
            boxShadow: '0 8px 48px rgba(0,0,0,0.14), 0 0 0 1px rgba(10,44,52,0.05)',
            animation: `${closing ? 'semOut' : 'semIn'} .32s cubic-bezier(.22,1,.36,1) both`,
            fontFamily: "'Poppins',sans-serif",
          }}
        >

          {/* Header */}
          <div style={{ padding: '20px 28px 0', background: '#fff', flexShrink: 0, borderBottom: '1px solid rgba(10,44,52,0.06)' }}>
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

            {/* Step bars */}
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

          {/* Error banner */}
          {err && (
            <div style={{ background: 'rgba(230,126,34,0.07)', borderBottom: '1px solid rgba(230,126,34,0.18)', padding: '10px 28px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <span style={{ fontSize: 15 }}>⚠️</span>
              <p style={{ fontSize: 11, color: '#c0620a', fontWeight: 600, margin: 0, flex: 1 }}>{err}</p>
              <button onClick={() => setErr('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c0620a', fontSize: 16 }}>×</button>
            </div>
          )}

          {/* Success overlay */}
          {ok && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 20, background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(4px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 28, animation: 'semFd .3s ease' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#1a2e1a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: '0 8px 30px rgba(26,46,26,0.25)' }}>
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                  <path d="M8 17.5L14 23.5L26 11" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 style={{ fontWeight: 700, fontStyle: 'italic', fontSize: 26, color: '#1a2e1a', margin: '0 0 8px', fontFamily: "'Poppins',sans-serif" }}>Demande envoyée !</h3>
              <p style={{ color: '#9ca3af', fontSize: 13, margin: 0 }}>Nous vous recontacterons sous 48h.</p>
            </div>
          )}

          {/* Body */}
          <div ref={scrollRef} className="sem-sc sem-body" style={{ flex: 1, overflowY: 'auto', padding: '28px 28px 0' }}>
            <div style={{ opacity: trans ? 0 : 1, transform: trans ? 'translateY(5px)' : 'translateY(0)', transition: 'all .18s ease' }}>

              <h3 style={{ fontFamily: "'Poppins',sans-serif", fontStyle: 'italic', fontWeight: 700, fontSize: 22, color: '#1a2e1a', margin: '0 0 22px' }}>
                {STEP_TITLE[step]}
              </h3>

              {/* STEP 1 */}
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

              {/* STEP 2 */}
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

              {/* STEP 3 */}
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

              {/* STEP 4 */}
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

          {/* Footer */}
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

// ─── Main page ────────────────────────────────────────────────────────────────

const Seminaires: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUniversModal, setSelectedUniversModal] = useState<UniversData | null>(null);
  const [isUniversModalClosing, setIsUniversModalClosing] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [plaquetteEmail, setPlaquetteEmail] = useState('');
  const [plaquetteSubmitting, setPlaquetteSubmitting] = useState(false);
  const [plaquetteSuccess, setPlaquetteSuccess] = useState(false);
  const [plaquetteEmailError, setPlaquetteEmailError] = useState('');
  const examplesCarouselRef = useRef<HTMLDivElement>(null);
  const examplesScrollRef = useRef<HTMLDivElement>(null);
  const [examplesCardWidthPx, setExamplesCardWidthPx] = useState(0);
  const [selectedUniverse, setSelectedUniverse] = useState<string | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const CAROUSEL_GAP_PX = 32;
  const CARD_MIN_WIDTH_PX = 280;
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 640 : false);

  useEffect(() => { const h = () => setIsMobile(window.innerWidth < 640); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);
  const cardWidthPx = examplesCardWidthPx > 0 ? examplesCardWidthPx : CARD_MIN_WIDTH_PX;

  useEffect(() => {
    const el = examplesCarouselRef.current; if (!el) return;
    const upd = () => {
      const w = el.offsetWidth; if (w <= 0) return;
      const winW = window.innerWidth;
      if (winW < 640) { setExamplesCardWidthPx(Math.max(CARD_MIN_WIDTH_PX, w * 0.70)); }
      else {
        let v = winW < 768 ? 2 : winW < 1024 ? 2.5 : winW < 1280 ? 3.5 : 4;
        setExamplesCardWidthPx(Math.max(CARD_MIN_WIDTH_PX, (w - (v - 1) * CAROUSEL_GAP_PX) / v));
      }
    };
    upd(); const ro = new ResizeObserver(upd); window.addEventListener('resize', upd); ro.observe(el);
    return () => { ro.disconnect(); window.removeEventListener('resize', upd); };
  }, []);

  useEffect(() => {
    const el = examplesScrollRef.current; if (!el) return;
    const h = () => { const g = window.innerWidth < 640 ? 16 : CAROUSEL_GAP_PX; setActiveCardIndex(Math.round(el.scrollLeft / (cardWidthPx + g))); };
    el.addEventListener('scroll', h, { passive: true }); return () => el.removeEventListener('scroll', h);
  }, [cardWidthPx]);

  const scrollExamples = (dir: 'left' | 'right') => {
    const el = examplesScrollRef.current; if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -(cardWidthPx + CAROUSEL_GAP_PX) : (cardWidthPx + CAROUSEL_GAP_PX), behavior: 'smooth' });
  };

  const location = useLocation();
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    if (p.get('scroll') === 'nos-univers') { const el = document.getElementById('nos-univers'); if (el) { const t = setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100); return () => clearTimeout(t); } }
  }, [location.search]);
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    if (p.get('openModal') === 'true') { setIsModalOpen(true); window.history.replaceState({}, '', '/entreprises'); }
  }, [location.search]);

  const rotatingTexts = ['humains', 'simples', 'inspirants', 'captivants', 'authentiques', 'engagés', 'gourmands', 'durables', 'sensoriels'];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    const txt = rotatingTexts[currentTextIndex]; setDisplayedText(''); setIsTyping(true); let i = 0;
    const id = setInterval(() => { if (i < txt.length) { setDisplayedText(txt.slice(0, ++i)); } else { setIsTyping(false); clearInterval(id); } }, 50);
    return () => clearInterval(id);
  }, [currentTextIndex]);
  useEffect(() => { const id = setInterval(() => setCurrentTextIndex(p => (p + 1) % rotatingTexts.length), 3000); return () => clearInterval(id); }, [rotatingTexts.length]);
  useEffect(() => { heroImages.forEach(src => { const img = new Image(); img.src = src; }); }, []);
  useEffect(() => { const id = setInterval(() => setCurrentImageIndex(p => (p + 1) % heroImages.length), 3000); return () => clearInterval(id); }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openUniversModal = (id: string) => { const d = UNIVERS_DATA[id]; if (!d) return; setSelectedUniversModal(d); setIsUniversModalClosing(false); document.body.style.overflow = 'hidden'; };
  const closeUniversModal = () => { setIsUniversModalClosing(true); setTimeout(() => { setSelectedUniversModal(null); setIsUniversModalClosing(false); document.body.style.overflow = 'unset'; }, 250); };
  useEffect(() => { const h = (e: KeyboardEvent) => { if (e.key === 'Escape' && selectedUniversModal) closeUniversModal(); }; document.addEventListener('keydown', h); return () => document.removeEventListener('keydown', h); }, [selectedUniversModal]);

  const handlePlaquetteSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setPlaquetteEmailError('');
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!plaquetteEmail.trim() || !re.test(plaquetteEmail.trim())) { setPlaquetteEmailError('Veuillez renseigner une adresse mail valide'); return; }
    setPlaquetteSubmitting(true);
    try {
      const r = await fetch('https://formsubmit.co/ajax/alexso.terrago@gmail.com', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ email: plaquetteEmail.trim(), subject: 'Demande plaquette offres 2026 - Terrago', message: `Demande plaquette.\nEmail: ${plaquetteEmail.trim()}`, _captcha: false }) });
      if (r.ok) { setPlaquetteSuccess(true); setPlaquetteEmail(''); } else throw new Error();
    } catch { alert('Une erreur est survenue.'); } finally { setPlaquetteSubmitting(false); }
  };

  const exampleCards = [
    { image: "https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/cognacjf/alambique.png", title: "Cognac & Pineau", desc: "Proche de Cognac", tags: ["Participation aux vendanges", "Fabrication de son propre pineau", "Golf entre les vignes"], producerImage: "/images/producteurs/cognacJF.png", universes: ["le cognac"], universId: "cognac", boldLabel: "AUTOUR DU COGNAC" },
    { image: "https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/OLIVEPAOLO/PAOLO4.png", title: "Olives & lavande", desc: "Proche d'Aix-en-Provence", tags: ["Apprentissage et récolte des olives", "Fabrication de son huile", "Récolte de lavandes fines", "Distillation de son parfum d'ambiance"], producerImage: "/images/producteurs/olivepaolo.png", universes: ["les olives", "la lavande"], universId: "olive", boldLabel: "AUTOUR DE L'OLIVE" },
    { image: "https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/noix.png", title: "Noix & compagnie", desc: "Proche de Valence", tags: ["Apprentissage et récolte des noix", "Fabrication de son huile/vin de noix", "Session Trail dans un cadre magnifique"], producerImage: "/images/producteurs/noixsabinemarie.jpeg", universes: ["les noix"], universId: "noix", boldLabel: "AUTOUR DE LA NOIX" },
    { image: "https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/truffe.png", title: "Truffe & terroir", desc: "Proche de Tours", tags: ["Cavage et découverte de la truffe", "Atelier cuisine", "Ferme florale et potager"], producerImage: "/images/producteurs/truffeprod.png", universes: ["la truffe"], universId: "truffe", boldLabel: "AUTOUR DE LA TRUFFE" },
    { image: "https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/chevres.png", title: "Fromage de chèvre", desc: "Proche d'Aix-en-Provence", tags: ["Soins aux chèvres", "Fabrication du fromage", "Dégustation à la ferme"], producerImage: "/images/producteurs/chevre-bebe.jpg", universes: ["le fromage de chèvre"], universId: "fromage", boldLabel: "AUTOUR DU FROMAGE" },
    { image: "https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/cognacjf/cognac.jpg", title: "Vin AOC Ventoux", desc: "Proche de Valence", tags: ["Les mains dans la terre", "Activité autour de la vigne", "Soirée soleil et guinguette", "Excursion vélo au Mont Ventoux"], producerImage: "/images/producteurs/vincombeaumas.png", universes: ["le vin"], universId: "vin", boldLabel: "AUTOUR DU VIN" },
  ];
  const filteredCards = selectedUniverse ? exampleCards.filter(c => c.universes.includes(selectedUniverse)) : exampleCards;

  return (
    <div className="font-sans bg-beige-bg min-h-screen overflow-x-hidden">
      <SeminaireModal isOpen={isModalOpen} onClose={closeModal} />

      {/* ── HERO ── */}
      <section className="relative w-full overflow-hidden min-h-[75vh] lg:min-h-screen flex items-center justify-center">
        {heroImages.map((image, index) => (
          <div key={index} className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out" style={{ backgroundImage: `url('${image}')`, opacity: index === currentImageIndex ? 1 : 0, zIndex: index === currentImageIndex ? 0 : -1 }} />
        ))}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.32) 60%, rgba(0,0,0,0.55) 100%)' }} />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-7">
            <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.40)' }} />
            <span style={{ color: 'rgba(255,255,255,0.60)', fontSize: 10, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase' }}>Immersion & Cohésion</span>
            <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.40)' }} />
          </div>

          <h1 className="text-white font-bold leading-[1.06] mb-7 drop-shadow-lg" style={{ letterSpacing: '-0.01em' }}>
            <span className="block font-display italic text-4xl md:text-5xl lg:text-6xl mb-1">Optez pour des séminaires</span>
            <span className="block font-sans font-bold text-3xl md:text-4xl lg:text-5xl" style={{ letterSpacing: '-0.01em' }}>
              plus{' '}
              <span style={{ color: 'rgb(255,223,202)' }}>
                {displayedText}
                <span style={{ opacity: isTyping ? 1 : 0, transition: 'opacity 0.1s' }}>|</span>
              </span>
            </span>
          </h1>

          <p className="hidden sm:block text-sm max-w-sm mx-auto mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.50)', fontStyle: 'italic' }}>
            Moins de slides. Plus de sens.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
            <button
              onClick={openModal}
              className="text-white border border-white/100 hover:border-white/70 px-7 py-3 text-[10px] uppercase tracking-[0.22em] font-bold transition-all duration-300 hover:bg-white/25 rounded-full"
            >
              Organiser votre séminaire
            </button>
            <Link
              to="/entreprises?scroll=nos-univers"
              className="text-[10px] uppercase tracking-[0.22em] font-bold transition-all duration-300 px-4 py-3"
              style={{ color: 'rgba(255,255,255,0.45)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.80)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
            >
              Découvrir nos univers →
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-25">
          <div style={{ width: 1, height: 44, background: 'white', animation: 'scrollPulse 2.2s ease-in-out infinite' }} />
        </div>
        <style>{`
          @keyframes scrollPulse {
            0%,100%{opacity:.2;transform:scaleY(.8);transform-origin:top}
            50%{opacity:1;transform:scaleY(1);transform-origin:top}
          }
          .seminaires-section-after-hero { padding-top: clamp(5rem, 10vw, 9rem); }
          @media (min-width: 1024px) { .seminaires-section-after-hero { padding-top: calc(9rem + 84px); } }
        `}</style>
      </section>

      {/* ── 5 ÉTOILES ── */}
      <section style={{ paddingBottom: 'clamp(5rem, 10vw, 9rem)' }} className="bg-white seminaires-section-after-hero" id="etoiles">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-2">
              <div style={{ width: 20, height: 1, background: '#e67e22' }} />
              <span style={{ fontSize: 9, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', color: '#e67e22' }}>5 étoiles</span>
            </div>
            <p style={{ color: '#e67e22', fontSize: 14, marginBottom: 12, letterSpacing: '0.3em' }}>⭐⭐⭐⭐⭐</p>
            <ScrollAnimate delay={150}>
              <h2 className="font-bold text-primary leading-[1.06]" style={{ letterSpacing: '-0.01em' }}>
                <span className="font-sans text-3xl sm:text-4xl">Des séminaires</span>
                <span className="font-display italic text-3xl sm:text-4xl lg:text-5xl"> 5 étoiles.</span>
              </h2>
            </ScrollAnimate>
            <p className="mt-4 max-w-2xl" style={{ color: '#9a9080', fontSize: 14, lineHeight: 1.75 }}>
              Nos "5 étoiles" ne se mesurent pas au luxe, mais aux liens humains, au contact de la terre et à l'engagement des producteurs. Des expériences sincères qui renforcent la cohésion et laissent une trace durable.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: 'diversity_3', title: 'Humain',      text: 'Décrochez et découvrez la richesse de vos équipes par des échanges vrais en rencontrant ceux qui nous nourrissent.' },
              { icon: 'handyman',    title: 'Immersif',    text: 'Sortez de votre zone de confort et exprimez-vous en mettant les mains dans la Terre. Vous allez vous en souvenir !' },
              { icon: 'restaurant', title: 'Authentique', text: "Retrouvez le sens de l'essentiel au contact de producteurs qui incarnent la vérité et l'exigence du terrain." },
              { icon: 'eco',        title: 'Engagé',      text: 'Transformez votre séminaire en acte managérial fort en soutenant directement ceux qui agissent pour la Terre.' },
              { icon: 'handshake',  title: 'Passionnant', text: "Utilisez le terroir comme fondation pour reconstruire une cohésion d'équipe naturelle et durable." },
            ].map(item => <PillarCard key={item.title} icon={item.icon} title={item.title} text={item.text} />)}
          </div>
        </div>
      </section>

      {/* ── GARANTIES ── */}
      <section style={{ paddingTop: 'clamp(5rem, 10vw, 9rem)', paddingBottom: 'clamp(5rem, 10vw, 9rem)' }} className="bg-beige-bg">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div style={{ width: 20, height: 1, background: '#e67e22' }} />
              <span style={{ fontSize: 9, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', color: '#e67e22' }}>Nos garanties</span>
            </div>
            <ScrollAnimate delay={200}>
              <h2 className="font-bold text-primary leading-[1.06]" style={{ letterSpacing: '-0.01em' }}>
                <span className="font-sans text-3xl sm:text-4xl">Tous nos séminaires</span>
                <span className="font-display italic text-3xl sm:text-4xl lg:text-5xl"> vous garantissent.</span>
              </h2>
            </ScrollAnimate>
          </div>
        </div>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: 'groups',     label: 'Rencontres authentiques',       text: 'Partez à la rencontre de producteurs et artisans passionnés, qui vous partageront leur quotidien, et leur savoir-faire avec authenticité.' },
              { icon: 'eco',        label: 'Activité les mains dans la terre', text: 'Récolter, tailler, planter, fabriquer… dans la peau de celles et ceux qui font le terroir, au rythme des saisons et des savoir-faire locaux.' },
              { icon: 'restaurant', label: 'Tissu local',                   text: 'Savourez le vrai : des repas pensés autour des producteurs locaux, de saison et engagés. Chaque assiette raconte une histoire.' },
              { icon: 'nature',     label: 'Cadre ressourçant',             text: 'Nos séminaires se déroulent dans des lieux naturels soigneusement choisis pour leur authenticité — fermes, domaines agricoles, espaces verdoyants.' },
              { icon: 'diversity_3',label: 'Cohésion sur mesure',           text: 'Des activités ludiques et même sportives, pensées sur-mesure pour renforcer les liens, et créer de vrais moments de complicité.' },
              { icon: 'key',        label: 'Clé en main',                   text: 'Logement, activités, repas, transport... Une logistique invisible pour des expériences inoubliables.' },
            ].map(item => (
              <div
                key={item.icon}
                className="group flex items-start gap-5 transition-all duration-300 cursor-pointer"
                style={{ background: '#fff', border: '1px solid rgba(26,46,26,0.07)', borderRadius: '20px', padding: '28px 32px' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(26,46,26,0.18)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(26,46,26,0.07)'; }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(26,46,26,0.06)', color: '#1a2e1a' }}>
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                </div>
                <div>
                  <h3 className="font-sans font-bold text-primary mb-1.5 group-hover:text-orange transition-colors" style={{ fontSize: 13 }}>{item.label}</h3>
                  <p style={{ color: '#7a7060', fontSize: 13, lineHeight: 1.7 }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMATS ── */}
      <section style={{ paddingTop: 'clamp(5rem, 10vw, 9rem)', paddingBottom: 'clamp(5rem, 10vw, 9rem)', backgroundColor: '#0d1a0d' }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div style={{ width: 20, height: 1, background: '#e67e22' }} />
              <span style={{ fontSize: 9, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', color: '#e67e22' }}>Nos formats</span>
            </div>
            <ScrollAnimate delay={200}>
              <h2 className="font-bold text-white leading-[1.06]" style={{ letterSpacing: '-0.01em' }}>
                <span className="font-sans text-3xl sm:text-4xl">Des formats pensés</span>
                <span className="font-display italic text-3xl sm:text-4xl lg:text-5xl"> pour vos équipes.</span>
              </h2>
            </ScrollAnimate>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: 'calendar_today', tag: 'Format court',   label: 'À la journée', text: 'Un format concentré pour (re)mettre du sens dans une journée hors du bureau, au contact direct du terroir.',                                     duration: '1 jour',    people: 'dès 6 pers.' },
              { icon: 'event',          tag: 'Format immersif', label: 'Sur 2 jours',  text: 'Deux jours pour alterner temps de travail, immersion dans les exploitations et moments de cohésion en équipe.',                                    duration: '2 jours',   people: 'dès 6 pers.' },
              { icon: 'design_services',tag: 'Format plus',     label: 'Sur mesure',   text: 'Un séminaire entièrement construit avec vous : rythme, intensité, thématique, et producteurs partenaires.',                                        duration: 'Durée libre', people: 'tout effectif' },
            ].map(item => (
              <div
                key={item.label}
                className="flex flex-col gap-4 transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '24px' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.07)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)'; }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(230,126,34,0.12)', color: '#e67e22' }}>
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                </div>
                <div>
                  <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#e67e22', marginBottom: 6 }}>{item.tag}</div>
                  <h3 className="font-sans font-bold text-white" style={{ fontSize: 16, marginBottom: 8 }}>{item.label}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: 13, lineHeight: 1.75 }}>{item.text}</p>
                </div>
                <div className="mt-auto pt-4 flex items-center gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'rgba(255,255,255,0.25)' }}>schedule</span>
                  <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.25)' }}>{item.duration} · {item.people}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOS UNIVERS ── */}
      <section style={{ paddingTop: 'clamp(5rem, 10vw, 9rem)', paddingBottom: 'clamp(5rem, 10vw, 9rem)' }} className="bg-white" id="nos-univers">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div style={{ width: 20, height: 1, background: '#e67e22' }} />
                <span style={{ fontSize: 9, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', color: '#e67e22' }}>Univers</span>
              </div>
              <ScrollAnimate delay={150}>
                <h2 className="font-bold text-primary leading-[1.06]" style={{ letterSpacing: '-0.01em' }}>
                  <span className="font-sans text-3xl sm:text-4xl">Nos premiers</span>
                  <span className="font-display italic text-3xl sm:text-4xl lg:text-5xl"> univers.</span>
                </h2>
              </ScrollAnimate>
            </div>
            <div className="hidden sm:flex gap-3">
              <button type="button" onClick={() => scrollExamples('left')} className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300" style={{ background: '#fff', border: '1px solid rgba(26,46,26,0.12)', color: '#1a2e1a' }} onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1a2e1a'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }} onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fff'; (e.currentTarget as HTMLButtonElement).style.color = '#1a2e1a'; }}>
                <span className="material-symbols-outlined text-xl">chevron_left</span>
              </button>
              <button type="button" onClick={() => scrollExamples('right')} className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300" style={{ background: '#fff', border: '1px solid rgba(26,46,26,0.12)', color: '#1a2e1a' }} onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1a2e1a'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }} onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fff'; (e.currentTarget as HTMLButtonElement).style.color = '#1a2e1a'; }}>
                <span className="material-symbols-outlined text-xl">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap gap-2 mt-8">
            {['le vin', 'la truffe', 'les olives', 'la lavande', 'le fromage de chèvre', 'les noix', 'le cognac'].map(product => (
              <button
                key={product} onClick={() => setSelectedUniverse(selectedUniverse === product ? null : product)}
                className="transition-all duration-300"
                style={{ padding: '6px 16px', borderRadius: 9999, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', border: `1.5px solid ${selectedUniverse === product ? '#e67e22' : 'rgba(26,46,26,0.12)'}`, background: selectedUniverse === product ? '#e67e22' : 'transparent', color: selectedUniverse === product ? '#fff' : '#7a7060', cursor: 'pointer' }}
              >{product}</button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="relative w-screen left-1/2 -translate-x-1/2 pb-6">
          <div ref={examplesCarouselRef} className="w-screen py-4">
            <div
              ref={examplesScrollRef}
              className="no-scrollbar flex overflow-x-scroll overflow-y-visible py-2 pb-6 scroll-smooth"
              style={{ gap: isMobile ? 16 : CAROUSEL_GAP_PX, paddingLeft: isMobile ? (window.innerWidth - examplesCardWidthPx) / 2 : 48, paddingRight: isMobile ? (window.innerWidth - examplesCardWidthPx) / 2 : 48, scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch', touchAction: 'pan-x', overscrollBehaviorX: 'contain', WebkitUserSelect: 'none', userSelect: 'none', cursor: 'grab' }}
              onMouseDown={e => {
                const el = examplesScrollRef.current; if (!el) return; el.style.cursor = 'grabbing';
                const startX = e.pageX - el.offsetLeft, sl = el.scrollLeft;
                const onMove = (e: MouseEvent) => { e.preventDefault(); el.scrollLeft = sl - (e.pageX - el.offsetLeft - startX) * 1.5; };
                const onUp = () => { el.style.cursor = 'grab'; document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); document.removeEventListener('mouseleave', onUp); };
                document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onUp); document.addEventListener('mouseleave', onUp);
              }}
            >
              {filteredCards.length > 0 ? filteredCards.map(card => (
                <div key={`${card.title}-${card.desc}`} className="flex-shrink-0" style={{ width: cardWidthPx }}>
                  <UniverseCard {...card} onOpenModal={() => openUniversModal(card.universId)} />
                </div>
              )) : (
                <div className="flex-shrink-0 w-full text-center py-8"><p style={{ color: '#9a9080', fontSize: 14 }}>Aucune carte disponible pour cet univers.</p></div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile dots */}
        <div className="sm:hidden flex justify-center items-center gap-1.5 pt-2 pb-4">
          {filteredCards.map((_, idx) => (
            <div key={idx} className="transition-all duration-300 rounded-full" style={{ width: idx === activeCardIndex ? 20 : 6, height: 6, background: idx === activeCardIndex ? '#e67e22' : 'rgba(0,0,0,0.12)' }} />
          ))}
        </div>
      </section>

      {/* ── PLAQUETTE ── */}
      <section style={{ paddingTop: 'clamp(5rem, 10vw, 9rem)', paddingBottom: 'clamp(5rem, 10vw, 9rem)' }} className="bg-beige-bg">
        <div className="max-w-xl mx-auto px-6 sm:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div style={{ width: 20, height: 1, background: '#e67e22' }} />
            <span style={{ fontSize: 9, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', color: '#e67e22' }}>Nos offres</span>
            <div style={{ width: 20, height: 1, background: '#e67e22' }} />
          </div>
          <h2 className="font-bold text-primary leading-[1.06] mb-4" style={{ letterSpacing: '-0.01em' }}>
            <span className="block font-sans text-2xl sm:text-3xl">Recevez notre</span>
            <span className="block font-display italic text-3xl sm:text-4xl">plaquette 2026.</span>
          </h2>
          <p className="mb-10" style={{ color: '#9a9080', fontSize: 14, lineHeight: 1.7 }}>
            Laissez-nous votre email et recevez notre plaquette regroupant toutes nos offres. Sous 24h, promis !
          </p>

          {plaquetteSuccess ? (
            <div style={{ background: 'rgba(26,46,26,0.06)', borderRadius: '9999px', padding: '14px 28px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#1a2e1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined text-white" style={{ fontSize: 14 }}>check</span>
              </div>
              <p style={{ color: '#1a2e1a', fontWeight: 700, fontSize: 12, margin: 0, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Envoyée sous 24h !</p>
            </div>
          ) : (
            <form onSubmit={handlePlaquetteSubmit} className="w-full">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email" required placeholder="jeveuxlaplaquette@email.fr"
                  value={plaquetteEmail} onChange={e => { setPlaquetteEmail(e.target.value); setPlaquetteEmailError(''); }}
                  className="flex-1 bg-white px-6 py-4 focus:outline-none transition-all"
                  style={{ border: `1px solid ${plaquetteEmailError ? '#e67e22' : 'rgba(26,46,26,0.09)'}`, borderRadius: '9999px', color: '#1a2e1a', fontSize: 13 }}
                />
                <button
                  type="submit" disabled={plaquetteSubmitting}
                  className="px-7 py-4 text-white font-bold uppercase transition-all duration-300"
                  style={{ background: '#1a2e1a', borderRadius: '9999px', fontSize: 9, letterSpacing: '0.22em', opacity: plaquetteSubmitting ? 0.7 : 1 }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = '#e67e22')}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = '#1a2e1a')}
                >
                  {plaquetteSubmitting ? '…' : 'Recevoir'}
                </button>
              </div>
              {plaquetteEmailError && <p style={{ color: '#e67e22', fontSize: 10, marginTop: 8 }}>{plaquetteEmailError}</p>}
              <p className="mt-5" style={{ fontSize: 9, color: '#b8ad9e', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700 }}>
                100% français & authentique · Pas de spam
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── MODAL UNIVERS ── */}
      {selectedUniversModal && (
        <div onClick={closeUniversModal} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(10,20,10,0.78)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', opacity: isUniversModalClosing ? 0 : 1, transition: 'opacity 0.25s ease' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 24, maxWidth: 620, width: '100%', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.30)', transform: isUniversModalClosing ? 'translateY(20px) scale(0.97)' : 'translateY(0) scale(1)', transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)', maxHeight: '90vh', overflowY: 'auto' }}>
            {(() => {
              const card = exampleCards.find(c => c.universId === selectedUniversModal.id);
              return (
                <div style={{ position: 'relative', height: 180, overflow: 'visible', flexShrink: 0 }}>
                  <img src={card?.image ?? ''} alt={selectedUniversModal.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${selectedUniversModal.couleur} -10%, transparent 0%)` }} />
                  <button onClick={closeUniversModal} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.95)', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#1a2e1a' }}>×</button>
                  <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', borderRadius: 9999, padding: '5px 14px', fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{selectedUniversModal.badge}</div>
                  <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, fontSize: 'clamp(17px,3vw,26px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, textTransform: 'uppercase', letterSpacing: '-0.01em', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>{selectedUniversModal.label}</div>
                  {card?.producerImage && <img src={card.producerImage} alt="" style={{ position: 'absolute', bottom: -36, right: 24, width: 76, height: 76, borderRadius: '50%', objectFit: 'cover', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />}
                </div>
              );
            })()}
            <div style={{ padding: '36px 28px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#1a2e1a' }}>{exampleCards.find(c => c.universId === selectedUniversModal.id)?.title}</div>
                <div style={{ fontSize: 11, color: '#9a9080', marginTop: 4 }}>📅 {selectedUniversModal.saison}</div>
              </div>
              <p style={{ fontSize: 13, color: '#7a7060', lineHeight: 1.75, marginBottom: 20 }}>{selectedUniversModal.description}</p>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', color: '#b8ad9e', textTransform: 'uppercase', marginBottom: 10 }}>Au programme</div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {selectedUniversModal.activites.map(a => (
                    <li key={a} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#4a4a4a' }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e67e22', flexShrink: 0, display: 'inline-block' }} />{a}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => { closeUniversModal(); openModal(); }}
                style={{ width: '100%', background: '#1a2e1a', color: '#fff', border: 'none', borderRadius: 9999, padding: '14px', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', transition: 'background 0.2s', marginBottom: 10 }}
                onMouseOver={e => (e.currentTarget.style.background = '#2b3e24')}
                onMouseOut={e => (e.currentTarget.style.background = '#1a2e1a')}
              >
                Demander un devis pour cet univers →
              </button>
              {UNIVERS_TO_FILTER[selectedUniversModal.id] && (
                <button
                  onClick={() => { const f = UNIVERS_TO_FILTER[selectedUniversModal.id]; closeUniversModal(); navigate(`/partenaires?filter=${encodeURIComponent(f)}`); }}
                  style={{ width: '100%', background: 'transparent', color: '#e67e22', border: '1.5px solid rgba(230,126,34,0.3)', borderRadius: 9999, padding: '12px', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseOver={e => { e.currentTarget.style.background = '#e67e22'; e.currentTarget.style.color = '#fff'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#e67e22'; }}
                >
                  Voir nos producteurs partenaires →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const PillarCard = ({ icon, title, text }: any) => (
  <div
    className="group relative bg-white overflow-hidden transition-all duration-500 cursor-pointer hover:-translate-y-1"
    style={{ borderRadius: '20px', border: '1px solid rgba(26,46,26,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(26,46,26,0.16)'; }}
    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(26,46,26,0.07)'; }}
  >
    <div className="p-5 sm:p-6 flex flex-col items-center text-center">
      <div className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 mb-3" style={{ background: 'rgba(26,46,26,0.07)' }}>
        <span
          className="material-symbols-outlined text-lg transition-colors duration-300"
          style={{ color: '#1a2e1a' }}
          ref={el => {
            if (!el) return;
            const parent = el.closest('.group');
            if (!parent) return;
            parent.addEventListener('mouseenter', () => { el.style.color = '#e67e22'; });
            parent.addEventListener('mouseleave', () => { el.style.color = '#1a2e1a'; });
          }}
        >{icon}</span>
      </div>
      <h3 className="font-sans transition-colors duration-300 group-hover:text-orange" style={{ fontSize: 13, fontWeight: 500, color: '#1a2e1a', marginBottom: 0 }}>{title}</h3>
      <div className="max-h-0 overflow-hidden group-hover:max-h-[160px] transition-all duration-500 ease-out">
        <p style={{ color: '#7a7060', fontSize: 12, lineHeight: 1.7, paddingTop: 12 }}>{text}</p>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: '#e67e22' }} />
  </div>
);

const UniverseCard = ({ image, title, desc, tags, producerImage, boldLabel, onOpenModal }: any) => (
  <div
    className="group relative bg-white transition-all duration-500 flex flex-col cursor-pointer overflow-hidden"
    style={{ height: 480, borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', border: '1px solid rgba(26,46,26,0.06)' }}
    onClick={onOpenModal}
    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.13)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(26,46,26,0.12)'; }}
    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.07)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(26,46,26,0.06)'; }}
  >
    <div className="relative flex-shrink-0 overflow-hidden" style={{ height: 220, borderRadius: '20px 20px 0 0' }}>
      <img src={image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={title} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      <div className="absolute top-3 left-3 backdrop-blur-sm px-3 py-1" style={{ background: 'rgba(255,255,255,0.88)', borderRadius: '9999px' }}>
        <p style={{ fontSize: 9, fontWeight: 700, color: '#1a2e1a', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{desc}</p>
      </div>
      <div className="absolute bottom-10 left-4 right-4">
        <p className="font-sans font-black text-white uppercase" style={{ fontSize: 'clamp(14px,2vw,19px)', letterSpacing: '-0.01em', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>{boldLabel}</p>
      </div>
    </div>
    {producerImage && <div className="absolute z-20 overflow-hidden" style={{ width: 56, height: 56, top: 192, right: 16, borderRadius: '50%', border: '3px solid #fff', boxShadow: '0 2px 10px rgba(0,0,0,0.12)' }}><img src={producerImage} alt="" className="w-full h-full object-cover" /></div>}
    <div className="relative flex flex-col px-5 pt-10 pb-4" style={{ flex: 1 }}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-0.5 h-5 rounded-full flex-shrink-0 transition-colors duration-300" style={{ background: '#1a2e1a' }} />
        <h3 className="font-sans font-bold text-primary not-italic leading-tight group-hover:text-orange transition-colors duration-300" style={{ fontSize: 14 }}>{title}</h3>
      </div>
      <div className="flex flex-col gap-2" style={{ minHeight: 110 }}>
        {tags.map((tag: string) => (
          <div key={tag} className="flex items-start gap-2">
            <div className="rounded-full mt-1.5 flex-shrink-0" style={{ width: 5, height: 5, background: '#e67e22' }} />
            <span style={{ fontSize: 11, color: '#7a7060', lineHeight: 1.6 }}>{tag}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(26,46,26,0.07)' }}>
        <span style={{ fontSize: 9, fontWeight: 700, color: '#b8ad9e', textTransform: 'uppercase', letterSpacing: '0.18em' }}>Voir le détail</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#e67e22' }}>→</span>
      </div>
    </div>
  </div>
);

export default Seminaires;
