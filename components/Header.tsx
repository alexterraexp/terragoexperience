'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// ─── Types ────────────────────────────────────────────────────────────────────

type DropdownItem = {
  label: string;
  description: string;
  path: string;
  targetPath?: string;
  emoji?: string;
  comingSoon?: boolean;
};

type NavItem = {
  label: string;
  path: string;
  dropdown: DropdownItem[];
};

// ─── Structure du menu ────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  {
    label: "Séminaires d'entreprise",
    path: '/entreprises',
    dropdown: [
      { label: 'Séminaires engagés',   description: 'Du sens, du vrai, et du vivant',            path: '/seminaires-entreprise', emoji: '🌿' },
      { label: 'Nos offres de séminaire', description: 'À la journée, sur 2 jours, ou sur mesure',  path: '/seminaires-entreprise/offres',           emoji: '📦' },
    ],
  },
  {
    label: 'Entre amis',
    path: '/entre-amis',
    dropdown: [
      { label: 'Séjours uniques', description: 'On vous écoute !',         path: '/entre-amis/sejours',                     emoji: '💬' },
      { label: 'Nos offres partagées',  description: 'Entre amis ou en famille', path: '#', comingSoon: true,               emoji: '🫶' },
    ],
  },
  {
    label: 'Producteurs partenaires',
    path: '/partenaires',
    dropdown: [
      { label: 'Nos producteurs partenaires', description: 'Engagés pour produire bien et bon', path: '/partenaires',               emoji: '🌾' },
      { label: 'Devenir partenaire',           description: 'Rejoindre le réseau Terrago',      path: '/nous-rejoindre',            emoji: '🤝' },
      { label: 'Recommander un producteur',    description: 'Suggérer une pépite du terroir',   path: '/recommander-un-producteur', emoji: '⭐' },
    ],
  },
  {
    label: 'À propos',
    path: '/a-propos',
    dropdown: [
      { label: 'Mission et engagements', description: "Notre raison d'être", path: '/mission-engagements', emoji: '🎯' },
      { label: 'Qui sommes-nous',        description: "L'équipe Terrago",    path: '#equipe', targetPath: '/mission-engagements', emoji: '👋' },
    ],
  },
];

// ─── Accordion item ───────────────────────────────────────────────────────────

const AccordionSection: React.FC<{
  nav: NavItem;
  isLast: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onItemClick: (item: DropdownItem) => void;
}> = ({ nav, isLast, isOpen, onToggle, onItemClick }) => {

  return (
    <div className={`${!isLast ? 'border-b border-black/[0.07]' : ''}`}>
      {/* Header de section — cliquable */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-6 bg-transparent border-none cursor-pointer group min-h-[68px]"
      >
        <span className="font-sans text-[17px] font-semibold text-[#1C2318] group-hover:text-[#D4751A] transition-colors duration-150 text-left leading-snug">
          {nav.label}
        </span>

        {/* Bouton + (gris fermé) → ouverture : full orange + croix blanche (pas de gris dans l’animation) */}
        <span
          className={[
            'flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center',
            'transition-all duration-300',
            isOpen
              ? 'border-[#D4751A] bg-[#D4751A] text-white rotate-45'
              : 'border-[#1C2318]/20 bg-transparent text-[#1C2318] group-hover:border-[#D4751A] group-hover:text-[#D4751A]',
          ].join(' ')}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="5.5" y1="1" x2="5.5" y2="10" />
            <line x1="1" y1="5.5" x2="10" y2="5.5" />
          </svg>
        </span>
      </button>

      {/* Sous-items — accordion */}
      <div
        className={[
          'overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <div className="px-4 pb-3">
          {nav.dropdown.map((item) =>
            item.comingSoon ? (
              <div
                key={item.label}
                className="w-full flex items-center gap-3 px-3 py-4 rounded-xl min-h-[64px] cursor-default"
              >
                {item.emoji && (
                  <span className="text-lg w-8 text-center flex-shrink-0 select-none">
                    {item.emoji}
                  </span>
                )}
<div className="flex-1 min-w-0">
                  <div className="font-sans text-[15px] font-semibold text-[#1C2318]/50 leading-snug">
                    {item.label}
                  </div>
                  {item.description && (
                    <div className="font-sans text-[12px] text-[#9ca3af] mt-0.5 leading-snug">
                      {item.description}
                    </div>
                  )}
                </div>
                <span className="px-6 py-1 rounded-full bg-[#D4751A] text-white text-[8px] font-bold uppercase tracking-wide flex-shrink-0">
                  Bientôt
                </span>
              </div>
            ) : (
              <button
                key={item.label}
                onClick={() => onItemClick(item)}
                className="group w-full flex items-center gap-3 px-3 py-4 rounded-xl border-none bg-transparent cursor-pointer hover:bg-[#D4751A]/[0.06] transition-colors duration-150 text-left min-h-[64px]"
            >
                {item.emoji && (
                  <span className="text-lg w-8 text-center flex-shrink-0 select-none">
                    {item.emoji}
                  </span>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-sans text-[15px] font-semibold text-[#1C2318] group-hover:text-[#D4751A] transition-colors duration-150 leading-snug">
                    {item.label}
                  </div>
                  {item.description && (
                    <div className="font-sans text-[12px] text-[#9ca3af] mt-0.5 leading-snug">
                      {item.description}
                    </div>
                  )}
                </div>
                <span className="text-[#D4751A] text-xs opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 flex-shrink-0">
                  →
                </span>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Composant principal ──────────────────────────────────────────────────────

const Header: React.FC = () => {
  const pathname  = usePathname();
  const router    = useRouter();
  const [isMenuOpen,   setIsMenuOpen]   = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenSection, setMobileOpenSection] = useState<string | null>(null);
  const [isScrolled,   setIsScrolled]   = useState(false);
  const [btnPositions, setBtnPositions] = useState<Record<string, number>>({});
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const btnRefs    = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
    setMobileOpenSection(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const measurePositions = useCallback(() => {
    const positions: Record<string, number> = {};
    (Object.entries(btnRefs.current) as [string, HTMLDivElement | null][]).forEach(([label, el]) => {
      if (el) positions[label] = el.getBoundingClientRect().left;
    });
    setBtnPositions(positions);
  }, []);

  useEffect(() => {
    measurePositions();
    window.addEventListener('resize', measurePositions);
    return () => window.removeEventListener('resize', measurePositions);
  }, [measurePositions]);

  const openMenu  = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    measurePositions();
    setOpenDropdown(label);
  };
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 90);
  };

  const handleItemClick = (item: DropdownItem) => {
    setOpenDropdown(null);
    setIsMenuOpen(false);
    if (item.path.startsWith('#')) {
      if (pathname === item.targetPath) {
        document.querySelector(item.path)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push(`${item.targetPath}${item.path}`);
      }
    } else {
      router.push(item.path);
    }
  };

  // Pages avec héro plein écran où le header doit être transparent en haut de page
  const hasHeroTransparent = (
    pathname === '/' ||
    pathname === '/entreprises' ||
    pathname === '/demande-seminaire' ||
    pathname === '/seminaires-entreprise' ||
    pathname === '/partenaires' ||
    pathname === '/mission-engagements' ||
    pathname === '/blog' ||
    pathname.startsWith('/blog/')
  );
  const isHeroTransparent = hasHeroTransparent && !isScrolled;

  const navLinkCls = (_active: boolean, isOpen: boolean) => [
    'flex items-center gap-[5px] px-4 h-[84px]',
    'font-sans text-[12px] font-bold uppercase tracking-[0.08em]',
    'border-none bg-transparent cursor-pointer whitespace-nowrap',
    'relative transition-colors duration-200',
    'after:content-[""] after:absolute after:bottom-0 after:left-4 after:right-4',
    'after:h-[2px] after:bg-[#D4751A] after:rounded-t',
    'after:origin-left after:transition-transform after:duration-[280ms]',
    isOpen
      ? 'text-[#D4751A] after:scale-x-100'
      : (isHeroTransparent
          ? 'text-white hover:text-white/90 after:scale-x-0 hover:after:scale-x-100 after:bg-white'
          : 'text-[#1C2318] hover:text-[#D4751A] after:scale-x-0 hover:after:scale-x-100'),
  ].join(' ');

  return (
    <>
      {/* ══ HEADER ══ */}
      <header
        className={[
          'fixed top-0 w-full z-[80] h-[84px] font-sans',
          'border-b transition-all duration-300',
          isScrolled
            ? 'bg-white/80 backdrop-blur-[18px] border-transparent shadow-[0_4px_32px_rgba(28,35,24,0.08)]'
            : isHeroTransparent
              ? 'bg-transparent border-transparent shadow-none'
              : 'bg-white border-black/[0.08]',
        ].join(' ')}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 h-full flex items-center justify-between gap-4">

          {/* Logo */}
            <Link
              href="/"
              className="flex items-center group shrink-0"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
            <img
              src="/logo.png"
              alt="Terrago"
              className={[
                'h-[4.5rem] sm:h-[4.75rem] md:h-[5.25rem] lg:h-[96px] w-auto max-h-[95%] object-contain transition-transform duration-300 group-hover:scale-105',
                isHeroTransparent ? 'brightness-0 invert' : '',
              ].join(' ')}
            />
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-0 ml-auto mr-8 flex-nowrap">
            {NAV_ITEMS.map((nav) => {
              const isActive = nav.path === '/entreprises'
                ? (pathname === '/entreprises' || pathname === '/demande-seminaire' || pathname === '/seminaires-entreprise')
                : pathname === nav.path;
              const isOpen   = openDropdown === nav.label;
              return (
                <div
                  key={nav.label}
                  ref={(el) => { btnRefs.current[nav.label] = el; }}
                  className="relative h-[84px] flex items-center"
                  onMouseEnter={() => openMenu(nav.label)}
                  onMouseLeave={closeMenu}
                >
                  <button className={navLinkCls(isActive, isOpen)}>
                    {nav.label}
                    <svg
                      className={`w-[13px] h-[13px] flex-shrink-0 transition-all duration-200 ${isOpen ? 'rotate-180 opacity-75' : 'opacity-45'}`}
                      viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2"
                    >
                      <path d="M4 6l4 4 4-4" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/demande-seminaire?openModal=true"
              className={[
                'hidden sm:inline-flex items-center gap-2 rounded-full',
                'px-4 sm:px-5 lg:px-6 py-2 lg:py-2.5',
                'font-sans text-[9px] font-bold uppercase tracking-[0.08em]',
                'transition-all duration-200 hover:-translate-y-px whitespace-nowrap shrink-0',
                isHeroTransparent
                  ? 'bg-white/90 text-[#1C2318] hover:bg-white'
                  : 'bg-[#1C2318] text-white hover:bg-[#3A4F32]',
              ].join(' ')}
            >
              <span className="w-[7px] h-[7px] bg-[#D4751A] rounded-full inline-block flex-shrink-0" />
              Organiser votre séminaire
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMenuOpen}
              className="lg:hidden size-10 flex items-center justify-center text-[#1C2318] rounded-xl bg-neutral-100 border border-black/5 active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-2xl">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* ══ DROPDOWNS desktop (inchangés) ══ */}
      {NAV_ITEMS.map((nav) => {
        const isOpen  = openDropdown === nav.label;
        const leftPos = btnPositions[nav.label] ?? 0;
        return (
          <div
            key={nav.label}
            onMouseEnter={() => openMenu(nav.label)}
            onMouseLeave={closeMenu}
            className={[
              'fixed top-[84px] z-[79] pt-2',
              'hidden lg:block',
              'transition-all duration-200',
              isOpen
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-2 pointer-events-none',
            ].join(' ')}
            style={{ left: leftPos }}
          >
            <div className="w-max min-w-[320px] max-w-[720px] bg-white rounded-[18px] border border-black/[0.08] shadow-[0_8px_40px_rgba(28,35,24,0.11),0_2px_8px_rgba(28,35,24,0.05)] overflow-hidden">
              <div className="px-4 py-3 flex flex-col gap-0.5">
                {nav.dropdown.map((item) =>
                  item.comingSoon ? (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-3 px-4 py-[11px] rounded-xl w-full font-sans cursor-default"
                    >
                      <span className="font-sans text-[13.5px] font-semibold text-[#1C2318]/50 whitespace-nowrap">
                        {item.label}
                      </span>
                      <span className="px-6 py-1 rounded-full bg-[#D4751A] text-white text-[8px] font-bold uppercase tracking-wide flex-shrink-0">
                        Bientôt
                      </span>
                    </div>
                  ) : (
                    <button
                      key={item.label}
                      onClick={() => handleItemClick(item)}
                      className="flex items-center justify-between gap-3
                        px-4 py-[11px] rounded-xl w-full text-left
                        font-sans border-none bg-transparent cursor-pointer
                        transition-colors duration-150 group"
                    >
                      <span className="font-sans text-[13.5px] font-semibold text-[#1C2318] group-hover:text-[#D4751A] transition-colors duration-150 whitespace-nowrap">
                        {item.label}
                      </span>
                      <span className="text-[#D4751A] text-sm opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150">
                        →
                      </span>
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* ══ MENU MOBILE — Accordion ══ */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/20" onClick={() => setIsMenuOpen(false)} />

        {/* Panel slide depuis le haut */}
        <div
          className={`absolute inset-x-0 top-0 bottom-0 transition-transform duration-350 ease-out ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="bg-[#faf8f5] h-full max-h-[100dvh] flex flex-col overflow-hidden">

            {/* Header du panel */}
            <div className="flex-shrink-0 flex items-center justify-between px-6 h-[84px] border-b border-black/[0.07]">
              <span className="font-sans font-semibold text-[13px] uppercase tracking-[0.22em] text-[#1C2318]">
                Menu
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Fermer le menu"
                className="flex items-center gap-2 text-[#1C2318] hover:text-[#D4751A] transition-colors duration-150"
              >
                <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em]">Fermer</span>
                <span className="text-base leading-none">✕</span>
              </button>
            </div>

            {/* Accordion sections — min-h-0 pour que le flex shrink et que le CTA reste visible */}
            <div className="flex-1 min-h-0 overflow-y-auto">
              {NAV_ITEMS.map((nav, idx) => (
                <AccordionSection
                  key={nav.path}
                  nav={nav}
                  isLast={idx === NAV_ITEMS.length - 1}
                  isOpen={mobileOpenSection === nav.label}
                  onToggle={() =>
                    setMobileOpenSection((prev) =>
                      prev === nav.label ? null : nav.label
                    )
                  }
                  onItemClick={(item) => {
                    setIsMenuOpen(false);
                    setMobileOpenSection(null);
                    handleItemClick(item);
                  }}
                />
              ))}
            </div>

            {/* CTA sticky bas — toujours visible en bas du viewport */}
            <div className="flex-shrink-0 px-5 pb-7 pt-3 border-t border-black/[0.07] bg-[#faf8f5]">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push('/demande-seminaire?openModal=true');
                }}
                className="flex items-center justify-center gap-1.5 w-full
                  bg-[#1C2318] text-white rounded-lg py-2.5
                  font-sans text-[10px] font-extrabold uppercase tracking-[0.14em]
                  transition-all duration-200 hover:bg-[#D4751A] active:scale-95"
              >
                <span className="w-[4px] h-[4px] bg-[#D4751A] rounded-full inline-block flex-shrink-0" />
                Organiser mon séminaire
                <span className="text-[10px]">→</span>
              </button>
              <p className="text-center text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9ca3af] mt-3">
                Fabriqué avec passion pour nos territoires.
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Header;