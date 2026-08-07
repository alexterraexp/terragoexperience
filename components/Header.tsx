'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useModal } from '../context/ModalContext';

// ─── Types ────────────────────────────────────────────────────────────────────

type DropdownItem = {
  label: string;
  description: string;
  path: string;
  targetPath?: string;
  emoji?: string;
  comingSoon?: boolean;
};

type MegaSection = {
  title: string;
  items: DropdownItem[];
};

type NavItem = {
  label: string;
  path: string;
  dropdown: DropdownItem[];
  /** Mega-menu desktop (colonnes) — le header s’agrandit */
  mega?: {
    sections: MegaSection[];
    footer?: DropdownItem[];
  };
};

// ─── Destinations : régions & lieux ───────────────────────────────────────────

const DESTINATION_REGIONS: DropdownItem[] = [
  { label: 'Pays Basque', description: 'Séminaire au Pays Basque', path: '/seminaires-entreprise/offres?region=Pays+Basque' },
  { label: 'Bretagne',    description: 'Séminaire en Bretagne',    path: '/seminaires-entreprise/offres?region=Bretagne' },
  { label: 'Auvergne',    description: 'Séminaire en Auvergne',    path: '/seminaires-entreprise/offres?region=Auvergne' },
  { label: 'Occitanie',   description: 'Séminaire en Occitanie',   path: '/seminaires-entreprise/offres?region=Occitanie' },
  { label: 'Provence',    description: 'Séminaire en Provence',    path: '/seminaires-entreprise/offres?region=Provence' },
  { label: 'Bordeaux',    description: 'Séminaire à Bordeaux',     path: '/seminaires-entreprise/offres?region=Bordeaux' },
  { label: 'Normandie',   description: 'Séminaire en Normandie',   path: '/seminaires-entreprise/offres?region=Normandie' },
  { label: 'Alsace',      description: 'Séminaire en Alsace',      path: '/seminaires-entreprise/offres?region=Alsace' },
];

const DESTINATION_LIEUX: DropdownItem[] = [
  { label: 'À la ferme',          description: 'Immersion chez l’exploitant',     path: '/seminaires-entreprise/offres?lieu=ferme' },
  { label: 'Au vert',             description: 'Respirer, se recentrer',          path: '/seminaires-entreprise/offres?lieu=au-vert' },
  { label: 'À la campagne',       description: 'Cadre rural authentique',         path: '/seminaires-entreprise/offres?lieu=campagne' },
  { label: 'Au bord de l’eau',    description: 'Lacs, rivières ou océan',         path: '/seminaires-entreprise/offres?lieu=bord-de-leau' },
  { label: 'En montagne',         description: 'Altitude et grands espaces',      path: '/seminaires-entreprise/offres?lieu=montagne' },
  { label: 'Au vignoble',         description: 'Terroirs & dégustations',         path: '/seminaires-entreprise/offres?lieu=vignoble' },
  { label: 'En pleine nature',    description: 'Forêts et paysages sauvages',     path: '/seminaires-entreprise/offres?lieu=nature' },
  { label: 'Chez le producteur',  description: 'Savoir-faire et terroir vivant',  path: '/seminaires-entreprise/offres?lieu=producteur' },
];

// ─── Structure du menu ────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Nos séminaires',
    path: '/seminaires-entreprise',
    dropdown: [
      { label: 'Séminaires d\'entreprise avec TerraGo', description: 'Du sens, du vrai, et du vivant', path: '/seminaires-entreprise', emoji: '🌿' },
      { label: 'Nos offres de séminaires', description: 'À la journée, sur 2 jours, ou sur mesure', path: '/seminaires-entreprise/offres', emoji: '📦' },
      { label: 'Nos séminaires réalisés', description: 'Retours d\'expérience sur le terrain', path: '/seminaires-entreprise/realises', emoji: '✨' },
    ],
  },
  {
    label: 'Nos destinations',
    path: '/partenaires',
    dropdown: [
      ...DESTINATION_REGIONS,
      ...DESTINATION_LIEUX,
      { label: 'Toutes les destinations',  description: 'Nos producteurs partenaires', path: '/partenaires',               emoji: '🌾' },
      { label: 'Devenir partenaire',       description: 'Rejoindre le réseau TerraGo', path: '/nous-rejoindre',            emoji: '🤝' },
      { label: 'Recommander un producteur', description: 'Suggérer une pépite du terroir', path: '/recommander-un-producteur', emoji: '⭐' },
    ],
    mega: {
      sections: [
        { title: 'En fonction des régions', items: DESTINATION_REGIONS },
        { title: 'En fonction des lieux',   items: DESTINATION_LIEUX },
      ],
      footer: [
        { label: 'Toutes les destinations', description: '', path: '/partenaires' },
        { label: 'Devenir partenaire', description: '', path: '/nous-rejoindre' },
        { label: 'Recommander un producteur', description: '', path: '/recommander-un-producteur' },
      ],
    },
  },
  {
    label: 'Nos expériences',
    path: '/experiences',
    dropdown: [
      { label: 'Expériences entreprise', description: 'Team building, RSE & événements', path: '/experiences-entreprise', emoji: '✨' },
      { label: 'Séjours uniques', description: 'On vous écoute !',         path: '/entre-amis/sejours',                     emoji: '💬' },
      { label: 'Nos offres de séjours',  description: 'Entre amis ou en famille', path: '#', comingSoon: true,               emoji: '🫶' },
    ],
  },
  {
    label: 'Notre approche',
    path: '/notre-approche',
    dropdown: [],
  },
];

// ─── Accordion item ───────────────────────────────────────────────────────────

const AccordionSection: React.FC<{
  nav: NavItem;
  isLast: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onItemClick: (item: DropdownItem) => void;
  onNavigate: (path: string) => void;
}> = ({ nav, isLast, isOpen, onToggle, onItemClick, onNavigate }) => {
  const hasDropdown = nav.dropdown.length > 0;

  if (!hasDropdown) {
    return (
      <div className={`${!isLast ? 'border-b border-black/[0.07]' : ''}`}>
        <button
          type="button"
          onClick={() => onNavigate(nav.path)}
          className="w-full flex items-center justify-between px-6 py-6 bg-transparent border-none cursor-pointer group min-h-[68px]"
        >
          <span className="font-sans text-[17px] font-semibold text-[#0b2c34] group-hover:text-[#ec6435] transition-colors duration-150 text-left leading-snug">
            {nav.label}
          </span>
          <span className="text-[#ec6435] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            →
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className={`${!isLast ? 'border-b border-black/[0.07]' : ''}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-6 bg-transparent border-none cursor-pointer group min-h-[68px]"
      >
        <span className="font-sans text-[17px] font-semibold text-[#0b2c34] group-hover:text-[#ec6435] transition-colors duration-150 text-left leading-snug">
          {nav.label}
        </span>

        <span
          className={[
            'flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center',
            'transition-all duration-300',
            isOpen
              ? 'border-[#ec6435] bg-[#ec6435] text-white rotate-45'
              : 'border-[#0b2c34]/20 bg-transparent text-[#0b2c34] group-hover:border-[#ec6435] group-hover:text-[#ec6435]',
          ].join(' ')}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="5.5" y1="1" x2="5.5" y2="10" />
            <line x1="1" y1="5.5" x2="10" y2="5.5" />
          </svg>
        </span>
      </button>

      <div
        className={[
          'overflow-hidden transition-all duration-300 ease-in-out',
          isOpen
            ? (nav.mega ? 'max-h-[1200px] opacity-100' : 'max-h-[400px] opacity-100')
            : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <div className="px-4 pb-3">
          {nav.mega ? (
            <>
              {nav.mega.sections.map((section) => (
                <div key={section.title} className="mb-3">
                  <p className="px-3 pt-2 pb-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#0b2c34]/40">
                    {section.title}
                  </p>
                  {section.items.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => onItemClick(item)}
                      className="group w-full flex items-center gap-3 px-3 py-3 rounded-xl border-none bg-transparent cursor-pointer hover:bg-[#ec6435]/[0.06] transition-colors duration-150 text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-sans text-[15px] font-semibold text-[#0b2c34] group-hover:text-[#ec6435] transition-colors duration-150 leading-snug">
                          {item.label}
                        </div>
                        {item.description && (
                          <div className="font-sans text-[12px] text-[#9ca3af] mt-0.5 leading-snug">
                            {item.description}
                          </div>
                        )}
                      </div>
                      <span className="text-[#ec6435] text-xs opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 flex-shrink-0">
                        →
                      </span>
                    </button>
                  ))}
                </div>
              ))}
              {(nav.mega.footer ?? []).map((item) => (
                <button
                  key={item.label}
                  onClick={() => onItemClick(item)}
                  className="group w-full flex items-center gap-3 px-3 py-3 rounded-xl border-none bg-transparent cursor-pointer hover:bg-[#ec6435]/[0.06] transition-colors duration-150 text-left"
                >
                  <div className="font-sans text-[14px] font-semibold text-[#0b2c34]/70 group-hover:text-[#ec6435] transition-colors duration-150">
                    {item.label}
                  </div>
                  <span className="text-[#ec6435] text-xs opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 flex-shrink-0 ml-auto">
                    →
                  </span>
                </button>
              ))}
            </>
          ) : (
            nav.dropdown.map((item) =>
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
                    <div className="font-sans text-[15px] font-semibold text-[#0b2c34]/50 leading-snug">
                      {item.label}
                    </div>
                    {item.description && (
                      <div className="font-sans text-[12px] text-[#9ca3af] mt-0.5 leading-snug">
                        {item.description}
                      </div>
                    )}
                  </div>
                  <span className="px-6 py-1 rounded-full bg-[#ec6435] text-white text-[8px] font-bold uppercase tracking-wide flex-shrink-0">
                    Bientôt
                  </span>
                </div>
              ) : (
                <button
                  key={item.label}
                  onClick={() => onItemClick(item)}
                  className="group w-full flex items-center gap-3 px-3 py-4 rounded-xl border-none bg-transparent cursor-pointer hover:bg-[#ec6435]/[0.06] transition-colors duration-150 text-left min-h-[64px]"
                >
                  {item.emoji && (
                    <span className="text-lg w-8 text-center flex-shrink-0 select-none">
                      {item.emoji}
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-sans text-[15px] font-semibold text-[#0b2c34] group-hover:text-[#ec6435] transition-colors duration-150 leading-snug">
                      {item.label}
                    </div>
                    {item.description && (
                      <div className="font-sans text-[12px] text-[#9ca3af] mt-0.5 leading-snug">
                        {item.description}
                      </div>
                    )}
                  </div>
                  <span className="text-[#ec6435] text-xs opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 flex-shrink-0">
                    →
                  </span>
                </button>
              )
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
  const { openModal } = useModal();
  const [isMenuOpen,   setIsMenuOpen]   = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenSection, setMobileOpenSection] = useState<string | null>(null);
  const [isScrolled,   setIsScrolled]   = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
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

  const openMenu  = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
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

  const isSeminaireDetailPage =
    /^\/seminaires\/offres\/[^/]+$/.test(pathname ?? '') ||
    /^\/seminaires-entreprise\/offres\/[^/]+$/.test(pathname ?? '');

  const hasHeroTransparent = (
    pathname === '/' ||
    pathname === '/demande-seminaire' ||
    pathname === '/seminaires-entreprise' ||
    pathname === '/partenaires' ||
    pathname === '/blog' ||
    pathname.startsWith('/blog/')
  );
  /** Pages à hero image encadrée : header blanc uni, sans séparateur. */
  const isFramedHeroPage =
    pathname === '/notre-approche' ||
    pathname === '/experiences-entreprise' ||
    (pathname?.startsWith('/experiences-entreprise/') ?? false);
  const isHeroTransparent = hasHeroTransparent && !isScrolled;
  const isDark = isHeroTransparent;

  const openNav = NAV_ITEMS.find((n) => n.label === openDropdown) ?? null;
  const isPanelOpen = Boolean(openNav);

  const isNavActive = (nav: NavItem) => {
    if (nav.path === '/seminaires-entreprise') {
      return (
        pathname === '/demande-seminaire' ||
        pathname === '/seminaires-entreprise' ||
        (pathname?.startsWith('/seminaires-entreprise/') ?? false) ||
        (pathname?.startsWith('/seminaires/') ?? false)
      );
    }
    if (nav.path === '/partenaires') {
      return (
        pathname === '/partenaires' ||
        (pathname?.startsWith('/partenaires/') ?? false) ||
        pathname === '/nous-rejoindre' ||
        pathname === '/recommander-un-producteur'
      );
    }
    if (nav.path === '/experiences') {
      return (
        pathname === '/experiences' ||
        (pathname?.startsWith('/experience/') ?? false) ||
        pathname === '/experiences-entreprise' ||
        (pathname?.startsWith('/experiences-entreprise/') ?? false) ||
        pathname === '/entre-amis' ||
        (pathname?.startsWith('/entre-amis/') ?? false)
      );
    }
    if (nav.path === '/notre-approche') {
      return pathname === '/notre-approche' || pathname === '/a-propos';
    }
    return pathname === nav.path;
  };

  const navLinkCls = (active: boolean, isOpen: boolean) => [
    'relative px-3 xl:px-4 py-2',
    'font-sans text-[13px] font-medium tracking-[-0.01em]',
    'border-none bg-transparent cursor-pointer whitespace-nowrap',
    'transition-colors duration-200',
    'after:content-[""] after:absolute after:bottom-0 after:left-3 after:right-3 xl:after:left-4 xl:after:right-4',
    'after:h-px after:rounded-full after:origin-left after:transition-transform after:duration-200',
    isOpen || active
      ? (isDark
          ? 'text-white after:bg-white after:scale-x-100'
          : 'text-[#0c1d22] after:bg-[#0c1d22] after:scale-x-100')
      : (isDark
          ? 'text-white/90 hover:text-white after:bg-white after:scale-x-0 hover:after:scale-x-100'
          : 'text-[#0c1d22]/55 hover:text-[#0c1d22] after:bg-[#0c1d22] after:scale-x-0 hover:after:scale-x-100'),
  ].join(' ');

  const panelLinkCls = [
    'font-sans text-[14px] font-medium text-left border-none bg-transparent cursor-pointer',
    'px-0 py-1.5 transition-colors duration-150 whitespace-nowrap',
    isDark
      ? 'text-white/80 hover:text-white'
      : 'text-[#0c1d22]/70 hover:text-[#ec6435]',
  ].join(' ');

  const sectionTitleCls = [
    'font-sans text-[15px] font-bold tracking-[-0.02em] mb-3',
    isDark ? 'text-white' : 'text-[#0c1d22]',
  ].join(' ');

  return (
    <>
      {/* ══ HEADER ══ */}
      <header
        className={[
          'fixed top-0 left-0 right-0 z-[80] font-sans pointer-events-none',
          'px-3 sm:px-5 lg:px-8',
          'transition-[padding] duration-300 ease-out',
          isDark
            ? 'pt-[max(28px,calc(env(safe-area-inset-top)+20px))]'
            : 'pt-[env(safe-area-inset-top)]',
          isSeminaireDetailPage && 'max-lg:pt-0 max-lg:px-0',
        ].filter(Boolean).join(' ')}
      >
        <div
          className={[
            'pointer-events-auto relative mx-auto max-w-[1280px]',
            'flex flex-col',
            'pl-6 pr-4 sm:pl-8 sm:pr-5 lg:pl-10 lg:pr-6',
            'transition-[border-radius] duration-300 ease-out',
            isSeminaireDetailPage &&
              'max-lg:h-0 max-lg:p-0 max-lg:overflow-visible max-lg:pointer-events-none',
          ].filter(Boolean).join(' ')}
          onMouseEnter={cancelClose}
          onMouseLeave={closeMenu}
        >
          {/* Deux calques de fond en fondu croisé — s’étirent avec le header */}
          <div
            aria-hidden
            className={[
              'pointer-events-none absolute inset-0 -z-10 rounded-[22px]',
              'bg-[rgba(20,24,22,0.30)] shadow-[0_8px_28px_rgba(0,0,0,0.20)] backdrop-blur-[20px]',
              'transition-opacity duration-300 ease-out',
              isDark ? 'opacity-100' : 'opacity-0',
              isSeminaireDetailPage && 'max-lg:hidden',
            ].filter(Boolean).join(' ')}
          />
          <div
            aria-hidden
            className={[
              'pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2',
              'transition-opacity duration-300 ease-out',
              isDark ? 'opacity-0' : 'opacity-100',
              isFramedHeroPage
                ? 'bg-white'
                : 'border-b border-black/[0.06] bg-white/85 shadow-[0_4px_24px_rgba(12,29,34,0.07)] backdrop-blur-[16px]',
              isSeminaireDetailPage && 'max-lg:hidden',
            ].filter(Boolean).join(' ')}
          />

          {/* Ligne principale : logo · nav · CTA */}
          <div
            className={[
              'relative flex items-center justify-between gap-3 sm:gap-4',
              'transition-[height] duration-300 ease-out',
              isDark
                ? 'h-[64px] sm:h-[68px] lg:h-[72px]'
                : 'h-[76px] sm:h-[84px] lg:h-[92px]',
            ].join(' ')}
          >
            <Link
              href="/"
              className={[
                'relative flex items-center group shrink-0',
                isSeminaireDetailPage && 'max-lg:hidden',
              ].filter(Boolean).join(' ')}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img src="/logo-white.png" alt="" aria-hidden className="hidden" />
              <img
                src={isDark ? '/logo-white.png' : '/logo.png'}
                alt="TerraGo"
                width={116}
                height={90}
                className="h-[36px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-[40px] lg:h-[44px]"
                decoding="async"
              />
            </Link>

            <nav className="hidden lg:flex items-center flex-1 justify-center min-w-0">
              {NAV_ITEMS.map((nav, idx) => {
                const isActive = isNavActive(nav);
                const hasDropdown = nav.dropdown.length > 0;
                const isOpen   = hasDropdown && openDropdown === nav.label;
                return (
                  <React.Fragment key={nav.label}>
                    {idx > 0 && (
                      <span
                        aria-hidden
                        className={[
                          'h-4 w-px flex-shrink-0',
                          isDark ? 'bg-white/35' : 'bg-[#0c1d22]/15',
                        ].join(' ')}
                      />
                    )}
                    <div
                      className="relative flex items-center"
                      onMouseEnter={() => { if (hasDropdown) openMenu(nav.label); }}
                    >
                      {hasDropdown ? (
                        <button type="button" className={navLinkCls(isActive, isOpen)}>
                          {nav.label}
                        </button>
                      ) : (
                        <Link
                          href={nav.path}
                          className={navLinkCls(isActive, false)}
                          onMouseEnter={() => setOpenDropdown(null)}
                        >
                          {nav.label}
                        </Link>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
            </nav>

            <div
              className={[
                'flex items-center gap-2 sm:gap-3 shrink-0',
                isSeminaireDetailPage &&
                  'max-lg:fixed max-lg:top-[calc(12px+env(safe-area-inset-top,0px))] max-lg:right-[max(16px,env(safe-area-inset-right,0px))] max-lg:z-[85] max-lg:pointer-events-auto',
              ].filter(Boolean).join(' ')}
            >
              <button
                type="button"
                onClick={openModal}
                className={[
                  'hidden sm:inline-flex items-center justify-center rounded-full',
                  isSeminaireDetailPage && 'max-lg:!hidden',
                  'px-4 lg:px-5 py-2 lg:py-2.5',
                  'font-sans text-[12px] font-semibold tracking-[-0.01em]',
                  'bg-[#ec6435] text-white hover:bg-[#d9552a]',
                  'transition-all duration-200 hover:-translate-y-px whitespace-nowrap shrink-0',
                  'shadow-[0_4px_14px_rgba(236,100,53,0.35)]',
                ].filter(Boolean).join(' ')}
              >
                Organiser votre séminaire
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={isMenuOpen}
                className={[
                  'lg:hidden flex items-center justify-center active:scale-90 transition-transform',
                  isSeminaireDetailPage
                    ? 'max-lg:size-11 max-lg:rounded-full max-lg:bg-black/40 max-lg:backdrop-blur-md max-lg:border max-lg:border-white/25 max-lg:text-white'
                    : [
                        'size-10 rounded-full border',
                        isDark
                          ? 'bg-white/10 border-white/20 text-white'
                          : 'bg-[#0c1d22]/[0.04] border-black/5 text-[#0c1d22]',
                      ].join(' '),
                ].join(' ')}
              >
                <span className="material-symbols-outlined text-2xl">
                  {isMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>

          {/* Panneau déroulant intégré — le header s’agrandit (desktop) */}
          <div
            className={[
              'hidden lg:block overflow-hidden transition-[max-height,opacity] duration-300 ease-out',
              isPanelOpen
                ? 'max-h-[480px] opacity-100'
                : 'max-h-0 opacity-0 pointer-events-none',
            ].join(' ')}
            aria-hidden={!isPanelOpen}
          >
            <div
              className={[
                'pt-2 pb-7',
                isDark ? 'border-t border-white/10' : 'border-t border-black/[0.06]',
              ].join(' ')}
            >
              {openNav?.mega ? (
                <>
                  <div className="grid grid-cols-2 gap-10 xl:gap-16 pt-5">
                    {openNav.mega.sections.map((section, sIdx) => (
                      <div
                        key={section.title}
                        className={[
                          sIdx === 0
                            ? (isDark ? 'pr-8 border-r border-white/10' : 'pr-8 border-r border-black/[0.06]')
                            : 'pl-2',
                        ].join(' ')}
                      >
                        <p className={sectionTitleCls}>{section.title}</p>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-0.5">
                          {section.items.map((item) => (
                            <button
                              key={item.label}
                              type="button"
                              onClick={() => handleItemClick(item)}
                              className={panelLinkCls}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                        {sIdx === 0 && openNav.mega?.footer?.[0] && (
                          <button
                            type="button"
                            onClick={() => handleItemClick(openNav.mega!.footer![0])}
                            className={[
                              'mt-5 inline-flex items-center gap-1.5 rounded-full px-4 py-2',
                              'font-sans text-[12px] font-semibold tracking-[-0.01em]',
                              'transition-colors duration-150',
                              isDark
                                ? 'bg-white/12 text-white hover:bg-white/18'
                                : 'bg-[#0c1d22]/[0.06] text-[#0c1d22] hover:bg-[#0c1d22]/[0.1]',
                            ].join(' ')}
                          >
                            {openNav.mega.footer[0].label}
                            <span aria-hidden>→</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {(openNav.mega?.footer?.length ?? 0) > 1 && (
                    <div
                      className={[
                        'flex flex-wrap items-center gap-x-1 gap-y-1 mt-5 pt-4',
                        isDark ? 'border-t border-white/10' : 'border-t border-black/[0.06]',
                      ].join(' ')}
                    >
                      {openNav.mega!.footer!.slice(1).map((item, fIdx) => (
                        <React.Fragment key={item.label}>
                          {fIdx > 0 && (
                            <span
                              aria-hidden
                              className={[
                                'mx-1 h-3 w-px',
                                isDark ? 'bg-white/20' : 'bg-[#0c1d22]/15',
                              ].join(' ')}
                            />
                          )}
                          <button
                            type="button"
                            onClick={() => handleItemClick(item)}
                            className={[
                              'font-sans text-[12px] font-semibold px-2.5 py-1.5 rounded-lg border-none cursor-pointer transition-colors duration-150',
                              isDark
                                ? 'bg-transparent text-white/60 hover:text-white'
                                : 'bg-transparent text-[#0b2c34]/50 hover:text-[#ec6435]',
                            ].join(' ')}
                          >
                            {item.label}
                          </button>
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </>
              ) : openNav ? (
                <div className="flex flex-col gap-1 pt-4 max-w-md">
                  {openNav.dropdown.map((item) =>
                    item.comingSoon ? (
                      <div
                        key={item.label}
                        className="flex items-center justify-between gap-3 py-2 cursor-default"
                      >
                        <span
                          className={[
                            'font-sans text-[14px] font-medium',
                            isDark ? 'text-white/40' : 'text-[#0b2c34]/40',
                          ].join(' ')}
                        >
                          {item.label}
                        </span>
                        <span className="px-3 py-0.5 rounded-full bg-[#ec6435] text-white text-[8px] font-bold uppercase tracking-wide">
                          Bientôt
                        </span>
                      </div>
                    ) : (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => handleItemClick(item)}
                        className={[
                          panelLinkCls,
                          'flex items-center justify-between gap-3 w-full group',
                        ].join(' ')}
                      >
                        <span>
                          <span className="block">{item.label}</span>
                          {item.description && (
                            <span
                              className={[
                                'block font-sans text-[12px] mt-0.5 font-normal',
                                isDark ? 'text-white/40' : 'text-[#0b2c34]/40',
                              ].join(' ')}
                            >
                              {item.description}
                            </span>
                          )}
                        </span>
                        <span
                          className={[
                            'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150',
                            isDark ? 'text-white' : 'text-[#ec6435]',
                          ].join(' ')}
                        >
                          →
                        </span>
                      </button>
                    )
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      {/* ══ MENU MOBILE — Accordion ══ */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/20" onClick={() => setIsMenuOpen(false)} />

        <div
          className={`absolute inset-x-0 top-0 bottom-0 transition-transform duration-350 ease-out ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="bg-[#faf8f5] h-full max-h-[100dvh] flex flex-col overflow-hidden">
            <div className="flex-shrink-0 flex items-center justify-between px-6 h-[72px] border-b border-black/[0.07]">
              <span className="font-sans font-semibold text-[13px] uppercase tracking-[0.22em] text-[#0b2c34]">
                Menu
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Fermer le menu"
                className="flex items-center gap-2 text-[#0b2c34] hover:text-[#ec6435] transition-colors duration-150"
              >
                <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em]">Fermer</span>
                <span className="text-base leading-none">✕</span>
              </button>
            </div>

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
                  onNavigate={(path) => {
                    setIsMenuOpen(false);
                    setMobileOpenSection(null);
                    router.push(path);
                  }}
                />
              ))}
            </div>

            <div className="flex-shrink-0 px-5 pb-7 pt-3 border-t border-black/[0.07] bg-[#faf8f5]">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  openModal();
                }}
                className="flex items-center justify-center gap-1.5 w-full
                  bg-[#ec6435] text-white rounded-full py-3
                  font-sans text-[13px] font-semibold tracking-[-0.01em]
                  transition-all duration-200 hover:bg-[#d9552a] active:scale-95"
              >
                Organiser votre séminaire
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
