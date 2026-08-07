'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import ScrollAnimate from '../components/ScrollAnimate';
import { useModal } from '../context/ModalContext';
import {
  heroIntroParagraphOnImageStyle,
  heroPrimaryOutlineButtonClass,
  heroSecondaryGhostLinkClass,
  heroSecondaryGhostLinkStyle,
} from '../components/heroSectionStyles';

// ─── Hero images ──────────────────────────────────────────────────────────────

const heroImages = [
  'https://images.unsplash.com/photo-1646781652500-40015cee4917?q=80&w=2673&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1761839259494-71caddcdd6b3?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1622647713877-62a390a414aa?q=80&w=2675&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1586973831237-7d8dd03a996f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1605673348944-faca4794801b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

// ─── Page types & data ────────────────────────────────────────────────────────

type UniversData = {
  id: string; label: string; badge: string;
  description: string; activites: string[]; saison: string; couleur: string;
  cardTitle: string; cardImage: string; producerImage?: string; universes: string[];
};

const UNIVERS_DATA: Record<string, UniversData> = {
  cognac:   { id: 'cognac',   label: 'AUTOUR DU COGNAC',            badge: "COGNAC • 40 MIN D'ANGOULÊME TGV",       description: "Des vignes aux alambics de cuivre, vivez la magie de la double distillation dans les chais centenaires de la Charente.", activites: ['Participation aux vendanges', 'Fabrication de son propre pineau', 'Visite des chais et alambics', 'Golf entre les vignes'], saison: "Toute l'année", couleur: 'rgb(92,42,9)', cardTitle: 'Cognac & Pineau', cardImage: "https://images.unsplash.com/photo-1671572953796-4c05a6ac5fa1?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", producerImage: '/images/producteurs/cognacJF.png', universes: ['le cognac'] },
  olive:    { id: 'olive',    label: "AUTOUR DE L'OLIVE",           badge: "VALENSOLE • 45 MIN D'AIX EN PROVENCE TGV", description: "Sous les oliviers centenaires de Provence, découvrez comment naît une huile d'exception, entre lavande et soleil.", activites: ['Apprentissage et récolte des olives', 'Fabrication de son huile', 'Récolte de lavandes fines', "Distillation de son parfum d'ambiance"], saison: 'Octobre – Décembre', couleur: 'rgb(72,107,9)', cardTitle: 'Olives & lavande', cardImage: "https://images.unsplash.com/photo-1663178405985-25074d8e72f4?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", producerImage: "https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/OLIVEPAOLO/PAOLO1.jpg", universes: ['les olives', 'la lavande'] },
  noix:     { id: 'noix',     label: "AUTOUR DE LA NOIX",           badge: "Romans-sur-Isère • 15 MIN De VALENCE TGV", description: "Parmi les noyers centenaires, apprenez la récolte et la fabrication d'une huile de noix artisanale d'une finesse rare.", activites: ['Apprentissage et récolte des noix', 'Fabrication de son huile/vin de noix', 'Repas typique en pleine nature', 'Session Trail dans un cadre magnifique'], saison: 'Septembre – Novembre', couleur: 'rgb(161,68,7)', cardTitle: 'Noix & compagnie', cardImage: "https://images.unsplash.com/photo-1728147370558-0b71818d240e?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", producerImage: '/images/producteurs/noixsabinemarie.jpeg', universes: ['les noix'] },
  truffe:   { id: 'truffe',   label: "AUTOUR DE LA TRUFFE",         badge: "CHINON • 1H DE TOURS TGV",               description: "Partez à la découverte du champignon le plus mystérieux de France avec un trufficulteur passionné au cœur du Périgord.", activites: ['Cavage et découverte de la truffe', 'Atelier cuisine autour de la truffe', 'Ferme florale et potager', 'Dégustation de produits truffés'], saison: 'Décembre – Mars', couleur: 'rgb(104,102,42)', cardTitle: 'Truffe & terroir', cardImage: "https://images.unsplash.com/photo-1589208310452-7cf38ba4d109?q=80&w=2531&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", producerImage: "https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/truffechinon/truffe-richard-chinon.webp", universes: ['la truffe'] },
  fromage:  { id: 'fromage',  label: "AUTOUR DU FROMAGE DE CHÈVRE", badge: "1H D'AIX-EN-PROVENCE TGV",               description: "Vivez une journée complète dans une ferme caprine : soins aux bêtes, fabrication de son propre fromage et dégustation en plein air.", activites: ['Soins aux chèvres', 'Fabrication du fromage', 'Dégustation à la ferme', 'Visite de cave'], saison: "Toute l'année", couleur: 'rgb(177,146,7)', cardTitle: 'Chèvres & fromage', cardImage: "https://images.unsplash.com/photo-1630440886325-ccbd65b70d29?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", producerImage: '/images/producteurs/chevre-bebe.jpg', universes: ['le fromage de chèvre'] },
  vin:      { id: 'vin',      label: "AUTOUR DU VIN AOC VENTOUX",   badge: "Bédoin • 1H D'AVIGNON TGV",              description: "Les mains dans la terre, entre vignes et ciel provençal, vivez l'aventure viticole au pied du Mont Ventoux.", activites: ['Les mains dans la terre', 'Activité autour de la vigne', 'Soirée soleil et guinguette', 'Excursion vélo au Mont Ventoux'], saison: 'Avril – Octobre', couleur: 'rgb(106,13,13)', cardTitle: 'Vin & Ventoux', cardImage: "https://images.unsplash.com/photo-1767034232356-1874e4a36cd7?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", producerImage: '/images/producteurs/vincombeaumas.png', universes: ['le vin'] },
  piment:   { id: 'piment',   label: "AUTOUR DU PIMENT",            badge: "Souraïde • 25 MIN DE BAYONNE TGV",      description: "Dans les terres basques, découvrez le cycle complet du piment d'Espelette : de la cueillette à la fabrication de votre propre poudre et confiture de piment.", activites: ['Récolte des piments rouges', 'Fabrication de sa propre poudre de piment', 'Atelier confiture & conserves', 'Initiation à la pelote basque'], saison: 'Septembre – Octobre', couleur: 'rgb(180,40,20)', cardTitle: 'Piments & Pays Basque', cardImage: "https://images.unsplash.com/photo-1720420866056-07fe15991f16?q=80&w=2531&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", producerImage: "https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/pimentsbaptiste/b5.png", universes: ['les piments'] },
  noisette: { id: 'noisette', label: "AUTOUR DE LA NOISETTE",       badge: "Gien • 1h30 de Paris",          description: "Parmi les noisetiers, vivez la récolte et découvrez comment naîssent les différents produits à base de noisettes.", activites: ['Récolte des noisettes', 'Fabrication de son huile de noisette', 'Atelier pâtisserie autour de la noisette', 'Yoga en pleine nature'], saison: 'Septembre – Novembre', couleur: 'rgb(120,80,30)', cardTitle: 'Noisette & fruits à coque', cardImage: "https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/VERGERS.jpg", producerImage: "https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/solproducteurs.png", universes: ['les noisettes'] },
};

const UNIVERS_TO_FILTER: Record<string, string> = {
  cognac: 'Spiritueux', olive: 'Olives', noix: 'Noix', truffe: 'Truffes', fromage: 'Élevages', vin: 'Vins', piment: 'Piments', noisette: 'Noisettes',
};

// ─── Main page ────────────────────────────────────────────────────────────────

const Seminaires: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openModal } = useModal();
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

  useEffect(() => {
    if (searchParams.get('scroll') === 'nos-univers') {
      const el = document.getElementById('nos-univers');
      if (el) {
        const t = setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        return () => clearTimeout(t);
      }
    }
  }, [searchParams]);

  useEffect(() => { heroImages.forEach(src => { const img = new Image(); img.src = src; }); }, []);
  useEffect(() => { const id = setInterval(() => setCurrentImageIndex(p => (p + 1) % heroImages.length), 3000); return () => clearInterval(id); }, []);

  const openUniversModal = (id: string) => { const d = UNIVERS_DATA[id]; if (!d) return; setSelectedUniversModal(d); setIsUniversModalClosing(false); document.body.style.overflow = 'hidden'; };
  const closeUniversModal = () => { setIsUniversModalClosing(true); setTimeout(() => { setSelectedUniversModal(null); setIsUniversModalClosing(false); document.body.style.overflow = ''; }, 250); };
  useEffect(() => { const h = (e: KeyboardEvent) => { if (e.key === 'Escape' && selectedUniversModal) closeUniversModal(); }; document.addEventListener('keydown', h); return () => document.removeEventListener('keydown', h); }, [selectedUniversModal]);

  const handlePlaquetteSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setPlaquetteEmailError('');
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!plaquetteEmail.trim() || !re.test(plaquetteEmail.trim())) { setPlaquetteEmailError('Veuillez renseigner une adresse mail valide'); return; }
    setPlaquetteSubmitting(true);
    try {
      const r = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ action: 'plaquette', email: plaquetteEmail.trim() }),
      });
      const data = (await r.json().catch(() => ({}))) as { success?: boolean };
      if (!r.ok || !data.success) throw new Error();
      setPlaquetteSuccess(true);
      setPlaquetteEmail('');
    } catch {
      alert('Une erreur est survenue.');
    } finally {
      setPlaquetteSubmitting(false);
    }
  };

  const exampleCards = Object.values(UNIVERS_DATA).map(universe => ({
    image: universe.cardImage,
    title: universe.cardTitle,
    producerImage: universe.producerImage,
    universes: universe.universes,
    universId: universe.id,
  }));
  const FRUITS_A_COQUE    = ['les noix', 'les noisettes', 'les noix de pécan', 'les amandes'];
  const VINS_SPIRITUEUX   = ['le vin', 'le cognac'];
  const filteredCards = selectedUniverse
    ? exampleCards.filter(c => {
        if (selectedUniverse === 'les fruits à coque') return c.universes.some(u => FRUITS_A_COQUE.includes(u));
        if (selectedUniverse === 'vins & spiritueux')  return c.universes.some(u => VINS_SPIRITUEUX.includes(u));
        return c.universes.includes(selectedUniverse);
      })
    : exampleCards;

  return (
    <div className="font-sans bg-beige-bg min-h-screen overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative w-full overflow-hidden min-h-screen flex items-center justify-center">
        {heroImages.map((image, index) => (
          <div key={index} className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out" style={{ backgroundImage: `url('${image}')`, opacity: index === currentImageIndex ? 1 : 0, zIndex: index === currentImageIndex ? 0 : -1 }} />
        ))}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.32) 60%, rgba(0,0,0,0.55) 100%)' }} />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-7 lg:px-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-10 sm:mb-7">
            <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.40)' }} />
            <span style={{ color: 'rgba(255,255,255,0.60)', fontSize: 10, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase' }}>séminaire & immersion</span>
            <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.40)' }} />
          </div>

          <h1
            className="text-white font-bold leading-[1.06] mb-5 sm:mb-4 drop-shadow-lg max-w-3xl mx-auto"
            style={{ letterSpacing: '-0.01em' }}
          >
            <span className="font-sans font-bold not-italic text-4xl md:text-4xl lg:text-5xl">
              Séminaire au vert, à la ferme{' '}
            </span>
            <span className="font-display font-bold italic text-5xl md:text-5xl lg:text-6xl">
              ou en pleine nature.
            </span>
          </h1>

          <p
            className="hidden sm:block italic text-sm md:text-base mx-auto mb-8 sm:mb-9 leading-relaxed max-w-4xl text-center"
            style={heroIntroParagraphOnImageStyle}
          >
            TerraGo imagine des séminaires au vert et expériences immersives à la rencontre de producteurs engagés
            pour reconnecter chacun au vivant, et créer des souvenirs forts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
            <Link
              href="/seminaires-entreprise/offres"
              className={heroPrimaryOutlineButtonClass}
            >
              Découvrir nos offres séminaires
            </Link>
            <button
              onClick={() => openModal()}
              className={`${heroSecondaryGhostLinkClass} bg-transparent border-none cursor-pointer`}
              style={heroSecondaryGhostLinkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)')}
            >
              Envoyer votre brief →
            </button>
          </div>
        </div>

        {/* Flèche scroll (comme page Séjours entre amis) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <button
            onClick={() => document.getElementById('etoiles')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
            aria-label="Voir la suite"
            className="scroll-arrow-sem"
          >
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 10L13 17L20 10" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <style>{`
          @keyframes scrollBounce {
            0%, 100% { transform: translateY(0); opacity: 0.5; }
            50% { transform: translateY(6px); opacity: 1; }
          }
          .scroll-arrow-sem { animation: scrollBounce 2.2s ease-in-out infinite; }
          .seminaires-section-after-hero { padding-top: clamp(5rem, 10vw, 9rem); }
          @media (min-width: 1024px) { .seminaires-section-after-hero { padding-top: calc(9rem + 84px); } }
          .univers-modal-box { scrollbar-width: none; -ms-overflow-style: none; }
          .univers-modal-box::-webkit-scrollbar { display: none; }
        `}</style>
      </section>

      {/* ── 5 ÉTOILES ── */}
      <section style={{ paddingBottom: 'clamp(5rem, 10vw, 9rem)' }} className="bg-white seminaires-section-after-hero" id="etoiles">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 mb-14">
          <div className="flex items-center gap-3 mb-2">
            <div style={{ width: 20, height: 1, background: '#e67e22' }} />
            <span style={{ fontSize: 9, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', color: '#e67e22' }}>5 étoiles</span>
          </div>
          <p style={{ color: '#e67e22', fontSize: 14, marginBottom: 12, letterSpacing: '0.3em' }}>⭐⭐⭐⭐⭐</p>
          <ScrollAnimate delay={150}>
            <h2 className="font-bold text-primary leading-[1.06]" style={{ letterSpacing: '-0.01em' }}>
              <span className="font-sans text-4xl sm:text-5xl">Des séminaires nature &amp; terroir,</span>
              <span className="font-display italic text-5xl sm:text-5xl lg:text-6xl"> 5 étoiles.</span>
            </h2>
          </ScrollAnimate>
          <p className="mt-4 max-w-4xl" style={{ color: '#9a9080', fontSize: 14, lineHeight: 1.75 }}>
            Nos "5 étoiles" ne se mesurent pas au luxe, mais aux liens humains, au contact de la terre et à l'engagement des producteurs. Des expériences sincères qui renforcent la cohésion et laissent une trace durable.
          </p>
        </div>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-6">
            {[
              { icon: 'diversity_3', title: 'Humain',      text: 'Décrochez et découvrez la richesse de vos équipes par des échanges vrais en rencontrant ceux qui nous nourrissent.', image: 'https://images.unsplash.com/photo-1624720114692-037e42acec41?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
              { icon: 'handyman',    title: 'Immersif',    text: 'Sortez de votre zone de confort et exprimez-vous en mettant les mains dans la Terre. Vous allez vous en souvenir !', image: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/VERGERS.jpg' },
              { icon: 'flare', title: 'Authentique', text: "Retrouvez le sens de l'essentiel au contact de producteurs qui incarnent la vérité et l'exigence du terrain.", image: 'https://images.unsplash.com/photo-1594928357228-3075ba0e4674?q=80&w=1293&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
              { icon: 'eco',        title: 'Engagé',      text: 'Transformez votre séminaire en acte managérial fort en soutenant directement ceux qui agissent pour la Terre.', image: 'https://images.unsplash.com/photo-1665072204431-b3ba11bd6d06?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
              { icon: 'handshake',  title: 'Passionnant', text: "Utilisez le terroir comme fondation pour reconstruire une cohésion d'équipe naturelle et durable.", image: 'https://images.unsplash.com/photo-1662558739852-613841d6b834?q=80&w=1348&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
            ].map(item => (
              <div
                key={item.title}
                className="group relative flex flex-col justify-end overflow-hidden rounded-[22px] cursor-pointer transition-all duration-300 min-h-[260px] sm:min-h-[300px]"
                style={{ border: '1px solid rgba(11, 44, 52,0.07)', boxShadow: '0 2px 14px rgba(0,0,0,0.06)' }}
              >
                <img
                  src={item.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.4) 40%, transparent)' }}
                />
                <div
                  className="absolute inset-0 pointer-events-none z-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }}
                />
                <div className="relative z-10 flex flex-col items-center text-center p-6 pb-8 opacity-100 transition-opacity duration-300 group-hover:opacity-0 group-hover:z-0 pointer-events-none">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center mb-4 flex-shrink-0 shadow-lg" style={{ background: 'rgba(255,255,255,0.95)', color: '#0b2c34' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 22 }}>{item.icon}</span>
                  </div>
                  <h3 className="font-sans font-bold text-white drop-shadow-md" style={{ fontSize: 15, fontWeight: 500 }}>{item.title}</h3>
                </div>
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                  style={{ background: 'rgba(0,0,0,0.65)' }}
                >
                  <div className="w-11 h-11 rounded-full flex items-center justify-center mb-4 flex-shrink-0" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 22 }}>{item.icon}</span>
                  </div>
                  <h3 className="font-sans font-bold text-white mb-3" style={{ fontSize: 15, fontWeight: 500 }}>{item.title}</h3>
                  <p className="text-white text-sm leading-relaxed max-w-[240px]" style={{ lineHeight: 1.7 }}>{item.text}</p>
                </div>
              </div>
            ))}
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
              <span className="font-sans text-4xl sm:text-5xl">Ce que chaque séminaire au vert</span>
              <span className="font-display italic text-5xl sm:text-5xl lg:text-6xl"> vous garantit.</span>
              </h2>
            </ScrollAnimate>
          </div>
        </div>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: 'groups',     label: 'Rencontres authentiques',          text: 'Partez à la rencontre de producteurs et artisans passionnés, qui vous partageront leur quotidien, et leur savoir-faire avec authenticité.' },
              { icon: 'eco',        label: 'Activité les mains dans la terre', text: 'Récolter, tailler, planter, fabriquer… dans la peau de celles et ceux qui font le terroir, au rythme des saisons et des savoir-faire locaux.' },
              { icon: 'restaurant', label: 'Tissu local',                      text: 'Savourez le vrai : des repas pensés autour des producteurs locaux, de saison et engagés. Chaque assiette raconte une histoire.' },
              { icon: 'nature',     label: 'Cadre ressourçant',                text: 'Nos séminaires se déroulent dans des lieux naturels soigneusement choisis pour leur authenticité — fermes, domaines agricoles, espaces verdoyants.' },
              { icon: 'diversity_3',label: 'Cohésion sur mesure',              text: 'Des activités ludiques et même sportives, pensées sur-mesure pour renforcer les liens, et créer de vrais moments de complicité.' },
              { icon: 'key',        label: 'Clé en main',                      text: 'Logement, activités, repas, espaces et matériel de réunion, transport... Une logistique invisible pour des expériences inoubliables.' },
            ].map(item => (
              <div
                key={item.icon}
                className="group flex items-start gap-5 transition-all duration-300 cursor-pointer"
                style={{ background: '#fff', border: '1px solid rgba(11, 44, 52,0.07)', borderRadius: '20px', padding: '28px 32px' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(11, 44, 52,0.18)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(11, 44, 52,0.07)'; }}
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                  style={{ background: 'rgba(11, 44, 52,0.06)', color: '#0b2c34' }}
                  ref={el => {
                    if (!el) return;
                    const parent = el.closest('.group');
                    if (!parent) return;
                    parent.addEventListener('mouseenter', () => { el.style.color = '#e67e22'; });
                    parent.addEventListener('mouseleave', () => { el.style.color = '#0b2c34'; });
                  }}
                >
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                </div>
                <div>
                  <h3 className="font-sans font-bold text-primary mb-1.5 group-hover:text-orange transition-colors" style={{ fontSize: 16 }}>{item.label}</h3>
                  <p style={{ color: '#7a7060', fontSize: 13, lineHeight: 1.7 }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMATS ── */}
      <section style={{ paddingTop: 'clamp(5rem, 10vw, 9rem)', paddingBottom: 'clamp(5rem, 10vw, 9rem)', backgroundColor: '#061a1f' }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div style={{ width: 20, height: 1, background: '#e67e22' }} />
              <span style={{ fontSize: 9, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', color: '#e67e22' }}>Nos formats</span>
            </div>
            <ScrollAnimate delay={200}>
              <h2 className="font-bold text-white leading-[1.06]" style={{ letterSpacing: '-0.01em' }}>
              <span className="font-sans text-4xl sm:text-5xl">Des formats de séminaire engagé</span>
              <span className="font-display italic text-5xl sm:text-5xl lg:text-6xl"> adaptés à vos besoins.</span>
              </h2>
            </ScrollAnimate>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: 'diversity_3', tag: 'Découverte & cohésion', label: 'Décompresser ensemble', text: 'Sortir du bureau, renforcer la cohésion, vivre une expérience mémorable au contact des terroirs et du vivant.', duration: 'Formats de 1 à 3 jours', people: 'dès 8 pers.' },
              { icon: 'eco', tag: 'Sensibilisation RSE', label: 'Cultiver une vision durable', text: 'Comprendre les enjeux agri & environnementaux en terrain réel, avec une approche concrète au contact des nos producteurs.', duration: 'Formats de 1 à 3 jours', people: 'dès 8 pers.' },
              { icon: 'lightbulb', tag: 'Inspiration & formation', label: "S'inspirer de celles et ceux qui agissent", text: "Des producteurs engagés comme miroir d'entreprise — leur résilience, leurs choix, leur sens du travail bien fait.", duration: 'Format sur mesure', people: 'tout effectif' },
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
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#e67e22', marginBottom: 6 }}>{item.tag}</div>
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
              <span className="font-sans text-4xl sm:text-5xl">Séminaire nature en France :</span>
              <span className="font-display italic text-5xl sm:text-5xl lg:text-6xl"> nos univers.</span>
            </h2>
          </ScrollAnimate>
          <p className="mt-4 max-w-2xl" style={{ color: '#9a9080', fontSize: 14, lineHeight: 1.75 }}>
            De la Provence au Pays Basque, découvrez nos expériences immersives chez des producteurs locaux — vignerons, fromagers, oléiculteurs et bien d'autres.
          </p>
            </div>
            <div className="hidden sm:flex gap-3">
              <button type="button" onClick={() => scrollExamples('left')} className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300" style={{ background: '#fff', border: '1px solid rgba(11, 44, 52,0.12)', color: '#0b2c34' }} onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#0b2c34'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }} onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fff'; (e.currentTarget as HTMLButtonElement).style.color = '#0b2c34'; }}>
                <span className="material-symbols-outlined text-xl">chevron_left</span>
              </button>
              <button type="button" onClick={() => scrollExamples('right')} className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300" style={{ background: '#fff', border: '1px solid rgba(11, 44, 52,0.12)', color: '#0b2c34' }} onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#0b2c34'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }} onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fff'; (e.currentTarget as HTMLButtonElement).style.color = '#0b2c34'; }}>
                <span className="material-symbols-outlined text-xl">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap gap-2 mt-8">
            {['vins & spiritueux', 'la truffe', 'les olives', 'la lavande', 'le fromage de chèvre', 'les fruits à coque', 'les piments'].map(product => (
              <button
                key={product} onClick={() => setSelectedUniverse(selectedUniverse === product ? null : product)}
                className="transition-all duration-300"
                style={{ padding: '6px 16px', borderRadius: 9999, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', border: `1.5px solid ${selectedUniverse === product ? '#e67e22' : 'rgba(11, 44, 52,0.12)'}`, background: selectedUniverse === product ? '#e67e22' : 'transparent', color: selectedUniverse === product ? '#fff' : '#7a7060', cursor: 'pointer' }}
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
                <div key={card.universId} className="flex-shrink-0" style={{ width: cardWidthPx }}>
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
        <div className="max-w-4xl mx-auto px-2 sm:px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div style={{ width: 20, height: 1, background: '#e67e22' }} />
            <span style={{ fontSize: 9, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', color: '#e67e22' }}>Nos offres</span>
            <div style={{ width: 20, height: 1, background: '#e67e22' }} />
          </div>
          <h2 className="font-bold text-primary leading-[1.06] mb-4" style={{ letterSpacing: '-0.01em' }}>
            <span className="font-sans text-3xl sm:text-4xl">Recevez notre</span>
            <span className="font-display italic text-[2.65rem] sm:text-[3rem]"> plaquette 2026.</span>
          </h2>
          <p className="mb-10" style={{ color: '#9a9080', fontSize: 14, lineHeight: 1.7 }}>
            Laissez-nous votre email et recevez notre plaquette regroupant toutes nos offres. Sous 24h, promis ! Séminaires clé en main, team building terroir, incentive nature — toutes nos offres détaillées dans un seul document.
          </p>

          {plaquetteSuccess ? (
            <div style={{ background: 'rgba(11, 44, 52,0.06)', borderRadius: '9999px', padding: '14px 28px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#0b2c34', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined text-white" style={{ fontSize: 14 }}>check</span>
              </div>
              <p style={{ color: '#0b2c34', fontWeight: 700, fontSize: 12, margin: 0, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Envoyée sous 24h !</p>
            </div>
          ) : (
            <form onSubmit={handlePlaquetteSubmit} className="w-full">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email" required placeholder="jeveuxlaplaquette@email.fr"
                  value={plaquetteEmail} onChange={e => { setPlaquetteEmail(e.target.value); setPlaquetteEmailError(''); }}
                  className="flex-1 bg-white px-6 py-4 focus:outline-none transition-all"
                  style={{ border: `1px solid ${plaquetteEmailError ? '#e67e22' : 'rgba(11, 44, 52,0.09)'}`, borderRadius: '9999px', color: '#0b2c34', fontSize: 13 }}
                />
                <button
                  type="submit" disabled={plaquetteSubmitting}
                  className="px-7 py-4 text-white font-bold uppercase transition-all duration-300"
                  style={{ background: '#0b2c34', borderRadius: '9999px', fontSize: 9, letterSpacing: '0.22em', opacity: plaquetteSubmitting ? 0.7 : 1 }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = '#e67e22')}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = '#0b2c34')}
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
      {selectedUniversModal && (() => {
        const card = exampleCards.find(c => c.universId === selectedUniversModal.id);
        return (
          <div onClick={closeUniversModal} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(10,20,10,0.78)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', opacity: isUniversModalClosing ? 0 : 1, transition: 'opacity 0.25s ease' }}>
            <div onClick={e => e.stopPropagation()} className="bg-white univers-modal-box" style={{ borderRadius: 24, maxWidth: 620, width: '100%', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.25)', transform: isUniversModalClosing ? 'translateY(20px) scale(0.97)' : 'translateY(0) scale(1)', transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)', maxHeight: '90vh', overflowY: 'auto', border: '1px solid rgba(11, 44, 52,0.08)' }}>
              {/* Header avec image univers + producteur — hauteur réduite */}
              <div style={{ position: 'relative', paddingTop: '34%', overflow: 'visible' }}>
                <img src={card?.image ?? ''} alt={selectedUniversModal.label} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${selectedUniversModal.couleur}99 0%, transparent 50%)` }} />
                <button onClick={closeUniversModal} className="flex items-center justify-center" style={{ position: 'absolute', top: 16, right: 16, width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(11, 44, 52,0.08)', cursor: 'pointer', color: '#0b2c34', fontSize: 20, fontWeight: 400 }}>×</button>
                <div style={{ position: 'absolute', top: 16, left: 16, padding: '6px 14px', borderRadius: 9999, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{selectedUniversModal.badge}</div>
                {card?.producerImage && (
                  <div style={{ position: 'absolute', left: '50%', bottom: -56, transform: 'translateX(-50%)', width: 130, height: 130, borderRadius: '50%', overflow: 'hidden', border: '5px solid #fff', boxShadow: '0 12px 40px rgba(0,0,0,0.2)' }}>
                    <img src={card.producerImage} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              {/* Contenu — remonté pour avoir "Univers" légèrement sous la photo */}
              <div className="px-6 pb-8" style={{ marginTop: -28, paddingTop: card?.producerImage ? 72 : 14, background: '#fff' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div style={{ width: 20, height: 1, background: '#e67e22' }} />
                  <span style={{ fontSize: 9, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', color: '#e67e22' }}>Univers</span>
                </div>
                <h3 className="font-sans font-bold not-italic text-primary leading-tight mb-1" style={{ fontSize: 'clamp(22px,4vw,28px)', fontFamily: "'Poppins', sans-serif" }}>{card?.title}</h3>
                <p style={{ fontSize: 16, color: '#7a7060', lineHeight: 1.75, marginBottom: 26 }}>{selectedUniversModal.description}</p>
                <div style={{ marginBottom: 28 }}>
                  <span style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: '#b8ad9e', textTransform: 'uppercase', marginBottom: 12 }}>Exemple d'activités</span>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {selectedUniversModal.activites.map(a => (
                      <li key={a} className="flex items-start gap-3" style={{ fontSize: 15, color: '#0b2c34', lineHeight: 1.55 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e67e22', flexShrink: 0, marginTop: 7 }} />{a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-3 items-center">
                  <button
                    onClick={() => { closeUniversModal(); openModal(); }}
                    className="py-4 rounded-full font-bold uppercase transition-colors duration-300"
                    style={{ width: '92%', maxWidth: 380, background: '#0b2c34', color: '#fff', border: 'none', fontSize: 10, letterSpacing: '0.15em', cursor: 'pointer' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#e67e22'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#0b2c34'; }}
                  >
                    Demander un devis pour cet univers →
                  </button>
                  <button
                    onClick={() => { closeUniversModal(); router.push(`/seminaires-entreprise/offres${selectedUniversModal?.id ? `?univers=${selectedUniversModal.id}` : ''}`); }}
                    className="py-3.5 rounded-full font-bold uppercase transition-all duration-300"
                    style={{ width: '92%', maxWidth: 380, background: 'transparent', color: '#e67e22', border: '1.5px solid rgba(230,126,34,0.4)', cursor: 'pointer', fontSize: 10, letterSpacing: '0.15em' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#e67e22'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#e67e22'; }}
                  >
                    Découvrir nos offres packagées →
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const UniverseCard = ({ image, title, onOpenModal }: any) => (
  <div
    className="group relative bg-white transition-all duration-500 flex flex-col cursor-pointer overflow-hidden"
    style={{ height: 480, borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', border: '1px solid rgba(11, 44, 52,0.06)' }}
    onClick={onOpenModal}
    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.13)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(11, 44, 52,0.12)'; }}
    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.07)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(11, 44, 52,0.06)'; }}
  >
    <div className="relative flex-1 flex flex-col overflow-hidden" style={{ borderRadius: '20px' }}>
      <img src={image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={title} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="relative flex flex-col justify-end flex-1 px-5 pb-6 pt-20">
        <h3
          className="font-sans font-bold not-italic leading-tight mb-3 inline-block w-fit rounded-full px-4 py-2.5 transition-all duration-300 border-[3px] border-transparent group-hover:border-white text-white group-hover:text-white"
          style={{ fontSize: 'clamp(16px,2.2vw,20px)', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
        >
          {title}
        </h3>
        <span className="inline-flex items-center gap-2 pl-4 text-white font-semibold" style={{ fontSize: 14, letterSpacing: '0.02em' }}>
          En savoir plus
          <span className="material-symbols-outlined text-white group-hover:translate-x-0.5 transition-transform duration-300" style={{ fontSize: 18 }}>arrow_forward</span>
        </span>
      </div>
    </div>
  </div>
);

export default Seminaires;