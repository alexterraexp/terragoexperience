'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useModal } from '../context/ModalContext';
import { REGION_IMAGES, regionDestinationPath, lieuDestinationPath, type LieuSlug } from '../lib/homeStorage';

// ─── Types ────────────────────────────────────────────────────────────────────

type DropdownItem = {
  label: string;
  description: string;
  path: string;
  /** Ouvre une modale globale au lieu de naviguer. */
  modal?: 'partenaire' | 'recommander';
  targetPath?: string;
  emoji?: string;
  comingSoon?: boolean;
};

type MegaSection = {
  title: string;
  items: DropdownItem[];
  /** Colonnes dans la grille d’items (défaut : 2). */
  columns?: 1 | 2;
};

type NavItem = {
  label: string;
  path: string;
  dropdown: DropdownItem[];
  /** Liens en bas du panneau (ex. Devenir partenaire) */
  footer?: DropdownItem[];
  /** Mega-menu desktop (colonnes) — le header s’agrandit */
  mega?: {
    sections: MegaSection[];
    /** Bouton CTA sous la première colonne (ex. Toutes les destinations) */
    footerCta?: DropdownItem;
  };
};

// ─── Destinations : régions & lieux ───────────────────────────────────────────
// Aligné sur « Votre séminaire, partout en France » (REGION_IMAGES).

const DESTINATION_REGIONS: DropdownItem[] = REGION_IMAGES.map((region) => ({
  label: region.name,
  description: `Séminaire ${region.prep} ${region.name}`,
  path: regionDestinationPath(region.slug),
}));

const LIEU_MENU: { slug: LieuSlug; label: string; description: string }[] = [
  { slug: 'chez-le-producteur', label: 'Chez le producteur', description: 'Savoir-faire et terroir vivant' },
  { slug: 'au-vignoble', label: 'Au vignoble', description: 'Terroirs & dégustations' },
  { slug: 'a-la-ferme', label: 'À la ferme', description: 'Immersion chez l’exploitant' },
  { slug: 'au-bord-de-leau', label: 'Au bord de l’eau', description: 'Lacs, rivières ou océan' },
  { slug: 'en-montagne', label: 'En montagne', description: 'Altitude et grands espaces' },
  { slug: 'en-pleine-nature', label: 'En pleine nature', description: 'Forêts et paysages sauvages' },
  { slug: 'domaine-d-exception', label: 'Dans un domaine d’exception', description: 'Lieux rares et inspirants' },
  { slug: 'au-coeur-des-terroirs', label: 'Au cœur des terroirs', description: 'Immersion locale authentique' },
];

const DESTINATION_LIEUX: DropdownItem[] = LIEU_MENU.map((lieu) => ({
  label: lieu.label,
  description: lieu.description,
  path: lieuDestinationPath(lieu.slug),
}));

// ─── Structure du menu ────────────────────────────────────────────────────────

const SEMINAIRE_MAIN: DropdownItem[] = [
  { label: 'Séminaires d\'entreprise engagés', description: 'Du sens, du vrai, et du vivant', path: '/seminaires-entreprise', emoji: '🌿' },
  { label: 'Exemples de séminaire d\'entreprise', description: 'À la journée, sur 2 jours, ou sur mesure', path: '/seminaire-exemples', emoji: '📦' },
  { label: 'Séminaires réalisés', description: 'Retours d\'expérience sur le terrain', path: '#', comingSoon: true, emoji: '✨' },
];

const SEMINAIRE_ENJEUX: DropdownItem[] = [
  { label: 'Séminaire cohésion', description: 'Créer des liens autrement', path: '/seminaires-entreprise/cohesion' },
  { label: 'Séminaire sensibilisation & RSE', description: 'Comprendre les enjeux du vivant', path: '/seminaires-entreprise/sensibilisation-rse' },
  { label: 'Séminaire inspiration & miroir d\'entreprise', description: 'Prendre du recul pour mieux avancer', path: '/seminaires-entreprise/inspiration-miroir' },
  { label: 'Séminaire CODIR', description: 'Aligner et inspirer votre comité de direction', path: '/seminaires-entreprise/codir' },
];

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Nos séminaires',
    path: '/seminaires-entreprise',
    dropdown: [...SEMINAIRE_MAIN, ...SEMINAIRE_ENJEUX],
    mega: {
      sections: [
        { title: 'Découvrir', items: SEMINAIRE_MAIN, columns: 1 },
        { title: 'Selon vos enjeux', items: SEMINAIRE_ENJEUX, columns: 1 },
      ],
      footerCta: {
        label: 'Tous les séminaires',
        description: '',
        path: '/seminaires-entreprise',
      },
    },
  },
  {
    label: 'Nos destinations',
    path: '/destinations',
    dropdown: [
      ...DESTINATION_REGIONS,
      ...DESTINATION_LIEUX,
      { label: 'Toutes les destinations', description: 'Toutes les régions TerraGo', path: '/destinations', emoji: '🌾' },
    ],
    mega: {
      sections: [
        { title: 'En fonction des régions', items: DESTINATION_REGIONS },
        { title: 'En fonction des lieux',   items: DESTINATION_LIEUX },
      ],
      footerCta: { label: 'Toutes les destinations', description: '', path: '/destinations' },
    },
  },
  {
    label: 'Nos expériences',
    path: '/experiences-entreprise',
    dropdown: [
      { label: 'Expériences entreprise', description: 'Team building, RSE & événements', path: '/experiences-entreprise', emoji: '✨' },
      { label: 'Expériences privées', description: 'Sur demande dès 8 pers. — séjours, immersions & repas', path: '/experiences-privees', emoji: '🌿' },
      { label: 'Offres de séjours', description: 'Entre amis ou en famille', path: '#', comingSoon: true, emoji: '🫶' },
    ],
  },
  {
    label: 'Notre approche',
    path: '/notre-approche',
    dropdown: [
      { label: 'Approche', description: 'La mission et la vision TerraGo', path: '/notre-approche', emoji: '🌱' },
      { label: 'Charte RSE', description: 'Engagements responsables', path: '/notre-approche/charte-rse', emoji: '♻️' },
      { label: 'Nos producteurs partenaires', description: 'Le réseau TerraGo', path: '/partenaires', emoji: '🌾' },
    ],
    footer: [
      { label: 'Devenir partenaire', description: 'Rejoindre le réseau TerraGo', path: '#', modal: 'partenaire', emoji: '🤝' },
      { label: 'Recommander un producteur', description: 'Suggérer une pépite du terroir', path: '#', modal: 'recommander', emoji: '⭐' },
    ],
  },
];

// ─── Accordion item (mobile) ──────────────────────────────────────────────────

const AccordionSection: React.FC<{
  nav: NavItem;
  isOpen: boolean;
  onToggle: () => void;
  onItemClick: (item: DropdownItem) => void;
  onNavigate: (path: string) => void;
}> = ({ nav, isOpen, onToggle, onItemClick, onNavigate }) => {
  const hasDropdown = nav.dropdown.length > 0;

  if (!hasDropdown) {
    return (
      <button
        type="button"
        onClick={() => onNavigate(nav.path)}
        className="flex w-full cursor-pointer items-center justify-center rounded-[12px] border-none bg-[#eef0f2] px-5 py-4 text-center transition-colors duration-150 active:bg-[#e4e7ea]"
      >
        <span className="font-sans text-[16px] font-bold tracking-[-0.03em] text-[#0c1d22]">
          {nav.label}
        </span>
      </button>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="relative flex w-full cursor-pointer items-center justify-center rounded-[12px] border-none bg-[#eef0f2] px-5 py-4 text-center transition-colors duration-150 active:bg-[#e4e7ea]"
      >
        <span className="font-sans text-[16px] font-bold tracking-[-0.03em] text-[#0c1d22]">
          {nav.label}
        </span>
        <span
          className={[
            'absolute right-4 top-1/2 inline-flex -translate-y-1/2 items-center justify-center text-[#0c1d22] transition-transform duration-300',
            isOpen ? 'rotate-45' : '',
          ].join(' ')}
          aria-hidden
        >
          <svg width="10" height="10" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="5.5" y1="1" x2="5.5" y2="10" />
            <line x1="1" y1="5.5" x2="10" y2="5.5" />
          </svg>
        </span>
      </button>

      <div
        className={[
          'overflow-hidden transition-all duration-300 ease-out',
          isOpen
            ? nav.mega
              ? 'mt-2 max-h-[1200px] opacity-100'
              : 'mt-2 max-h-[480px] opacity-100'
            : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <div className="rounded-[12px] bg-[#f7f8f9] px-3 py-3">
          {nav.mega ? (
            <>
              {nav.mega.sections.map((section) => (
                <div key={section.title} className="mb-3 last:mb-0">
                  <p className="px-2 pb-1.5 pt-1 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#0c1d22]/40">
                    {section.title}
                  </p>
                  <div
                    className={[
                      'grid gap-0.5',
                      (section.columns ?? 2) === 1 ? 'grid-cols-1' : 'grid-cols-2',
                    ].join(' ')}
                  >
                    {section.items.map((item) =>
                      item.comingSoon ? (
                        <div
                          key={item.label}
                          className="flex items-center justify-between gap-2 rounded-[10px] px-3 py-2.5"
                        >
                          <span className="font-sans text-[13px] font-medium tracking-[-0.02em] text-[#0c1d22]/35">
                            {item.label}
                          </span>
                          <span className="shrink-0 rounded-full bg-[#ec6435] px-2 py-0.5 font-sans text-[8px] font-bold uppercase tracking-[0.06em] text-white">
                            Bientôt
                          </span>
                        </div>
                      ) : (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => onItemClick(item)}
                          className="group inline-flex w-full cursor-pointer items-center gap-6 rounded-[10px] border-none bg-transparent px-3 py-2.5 text-left transition-colors duration-150 active:bg-white"
                        >
                          <span className="font-sans text-[13px] font-medium tracking-[-0.02em] text-[#0c1d22]/75 transition-colors duration-150 group-active:text-[#ec6435]">
                            {item.label}
                          </span>
                          <span className="shrink-0 text-[#ec6435] opacity-0 transition-all duration-150 group-active:opacity-100" aria-hidden>
                            →
                          </span>
                        </button>
                      ),
                    )}
                  </div>
                </div>
              ))}
              <div className="mt-1 flex flex-col gap-0.5 border-t border-[#0c1d22]/[0.06] pt-1">
                {[
                  ...(nav.mega.footerCta ? [nav.mega.footerCta] : []),
                  ...(nav.footer ?? []),
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => onItemClick(item)}
                    className="group flex w-full cursor-pointer items-center justify-between rounded-[10px] border-none bg-transparent px-3 py-3 text-left transition-colors duration-150 active:bg-white"
                  >
                    <span className="font-sans text-[14px] font-semibold tracking-[-0.02em] text-[#0c1d22]">
                      {item.label}
                    </span>
                    <span className="text-[#ec6435] transition-transform duration-150 group-active:translate-x-0.5" aria-hidden>
                      →
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-0.5">
                {nav.dropdown.map((item) =>
                  item.comingSoon ? (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-3 rounded-[10px] px-3.5 py-3"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-sans text-[14px] font-semibold tracking-[-0.02em] text-[#0c1d22]/40">
                          {item.label}
                        </div>
                        {item.description && (
                          <div className="mt-0.5 font-sans text-[12px] leading-snug tracking-[-0.02em] text-[#0c1d22]/30">
                            {item.description}
                          </div>
                        )}
                      </div>
                      <span className="shrink-0 rounded-full bg-[#ec6435] px-2.5 py-1 font-sans text-[8px] font-bold uppercase tracking-[0.06em] text-white">
                        Bientôt
                      </span>
                    </div>
                  ) : (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => onItemClick(item)}
                      className="group flex w-full cursor-pointer items-start justify-between gap-3 rounded-[10px] border-none bg-transparent px-3.5 py-3 text-left transition-colors duration-150 active:bg-white"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-sans text-[14px] font-semibold tracking-[-0.02em] text-[#0c1d22] transition-colors duration-150 group-active:text-[#ec6435]">
                          {item.label}
                        </div>
                        {item.description && (
                          <div className="mt-0.5 font-sans text-[12px] leading-snug tracking-[-0.02em] text-[#0c1d22]/45">
                            {item.description}
                          </div>
                        )}
                      </div>
                      <span className="mt-0.5 shrink-0 text-[#ec6435] opacity-0 transition-all duration-150 group-active:opacity-100" aria-hidden>
                        →
                      </span>
                    </button>
                  ),
                )}
              </div>
              {(nav.footer?.length ?? 0) > 0 && (
                <div className="mt-1 flex flex-col gap-0.5 border-t border-[#0c1d22]/[0.06] pt-1">
                  {nav.footer!.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => onItemClick(item)}
                      className="group flex w-full cursor-pointer items-center justify-between rounded-[10px] border-none bg-transparent px-3 py-3 text-left transition-colors duration-150 active:bg-white"
                    >
                      <span className="font-sans text-[14px] font-semibold tracking-[-0.02em] text-[#0c1d22]">
                        {item.label}
                      </span>
                      <span className="text-[#ec6435] transition-transform duration-150 group-active:translate-x-0.5" aria-hidden>
                        →
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </>
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
  const { openModal, openPartenaireModal, openRecommanderModal } = useModal();
  const [isMenuOpen,   setIsMenuOpen]   = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenSection, setMobileOpenSection] = useState<string | null>(null);
  const [locationPath, setLocationPath] = useState(pathname);
  const [isScrolled,   setIsScrolled]   = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLocationPath(pathname);
  }, [pathname]);

  useEffect(() => {
    const syncPath = () => setLocationPath(window.location.pathname);
    window.addEventListener('popstate', syncPath);
    window.addEventListener('terrago:pathchange', syncPath);
    return () => {
      window.removeEventListener('popstate', syncPath);
      window.removeEventListener('terrago:pathchange', syncPath);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    const frame = requestAnimationFrame(onScroll);
    const t1 = window.setTimeout(onScroll, 50);
    const t2 = window.setTimeout(onScroll, 160);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener('scroll', onScroll);
    };
  }, [pathname, locationPath]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const sync = () => setIsMobileViewport(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
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
    if (item.comingSoon) return;
    setOpenDropdown(null);
    setIsMenuOpen(false);
    if (item.modal === 'partenaire') {
      openPartenaireModal();
      return;
    }
    if (item.modal === 'recommander') {
      openRecommanderModal();
      return;
    }
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
    /^\/seminaire-exemples\/[^/]+$/.test(pathname ?? '') ||
    /^\/seminaires\/offres\/[^/]+$/.test(pathname ?? '') ||
    /^\/seminaires-entreprise\/offres\/[^/]+$/.test(pathname ?? '');

  const routePath = locationPath || pathname || '';
  const isDashboardEventHeroPage = routePath === '/dashboard-event' || routePath.startsWith('/dashboard-event/');

  const hasHeroTransparent = (
    routePath === '/' ||
    routePath === '/demande-seminaire' ||
    routePath === '/blog' ||
    routePath.startsWith('/blog/') ||
    (isDashboardEventHeroPage && isMobileViewport)
  );
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
        (pathname?.startsWith('/seminaires/') ?? false) ||
        pathname === '/seminaire-exemples' ||
        (pathname?.startsWith('/seminaire-exemples/') ?? false)
      );
    }
    if (nav.path === '/destinations') {
      return (
        pathname === '/destinations' ||
        (pathname?.startsWith('/destinations/') ?? false) ||
        /^\/seminaire-entreprise-/.test(pathname ?? '')
      );
    }
    if (nav.path === '/partenaires') {
      return (
        pathname === '/partenaires' ||
        (pathname?.startsWith('/partenaires/') ?? false)
      );
    }
    if (nav.path === '/experiences-entreprise') {
      return (
        pathname === '/experiences' ||
        (pathname?.startsWith('/experience/') ?? false) ||
        pathname === '/experiences-entreprise' ||
        (pathname?.startsWith('/experiences-entreprise/') ?? false) ||
        pathname === '/experiences-privees' ||
        (pathname?.startsWith('/experiences-privees/') ?? false)
      );
    }
    if (nav.path === '/notre-approche') {
      return (
        pathname === '/notre-approche' ||
        (pathname?.startsWith('/notre-approche/') ?? false) ||
        pathname === '/a-propos'
      );
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
              'border-b bg-white/85 backdrop-blur-[16px]',
              'transition-[opacity,border-color,box-shadow] duration-300 ease-out',
              isDark ? 'opacity-0' : 'opacity-100',
              isScrolled
                ? 'border-black/[0.06] shadow-[0_4px_24px_rgba(12,29,34,0.07)]'
                : 'border-transparent shadow-none',
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
              onClick={() => {
                if (pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <Image src="/logo-white.png" alt="" aria-hidden width={116} height={90} className="hidden" />
              <Image
                src={isDark ? '/logo-white.png' : '/logo.png'}
                alt="TerraGo"
                width={116}
                height={90}
                className="h-[36px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-[40px] lg:h-[44px]"
                priority
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
                {isMenuOpen ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                    <path d="M6 6 18 18M18 6 6 18" />
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                    <path d="M5 7h14M5 12h14M5 17h14" />
                  </svg>
                )}
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
                        <div
                          className={[
                            'grid w-max max-w-full gap-x-10 gap-y-0.5',
                            (section.columns ?? 2) === 1 ? 'grid-cols-1' : 'grid-cols-[auto_auto]',
                          ].join(' ')}
                        >
                          {section.items.map((item) =>
                            item.comingSoon ? (
                              <div
                                key={item.label}
                                className="flex w-full items-center justify-between gap-4 py-2 cursor-default"
                              >
                                <span
                                  className={[
                                    'font-sans text-[14px] font-medium',
                                    isDark ? 'text-white/40' : 'text-[#0b2c34]/40',
                                  ].join(' ')}
                                >
                                  {item.label}
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full bg-[#ec6435] text-white text-[8px] font-bold uppercase tracking-wide">
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
                                  'flex w-full items-center justify-between gap-4 group',
                                ].join(' ')}
                              >
                                <span>{item.label}</span>
                                <span
                                  className={[
                                    'shrink-0 opacity-0 -translate-x-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0',
                                    isDark ? 'text-white' : 'text-[#ec6435]',
                                  ].join(' ')}
                                  aria-hidden
                                >
                                  →
                                </span>
                              </button>
                            ),
                          )}
                        </div>
                        {sIdx === 0 && openNav.mega?.footerCta && (
                          <button
                            type="button"
                            onClick={() => handleItemClick(openNav.mega!.footerCta!)}
                            className={[
                              'mt-5 inline-flex items-center gap-1.5 rounded-full px-4 py-2',
                              'font-sans text-[12px] font-semibold tracking-[-0.01em]',
                              'transition-colors duration-150',
                              isDark
                                ? 'bg-white/12 text-white hover:bg-white/18'
                                : 'bg-[#0c1d22]/[0.06] text-[#0c1d22] hover:bg-[#0c1d22]/[0.1]',
                            ].join(' ')}
                          >
                            {openNav.mega.footerCta.label}
                            <span aria-hidden>→</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : openNav ? (
                <div className="flex max-w-sm flex-col gap-1 pt-4">
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
                          'flex w-full items-center justify-between gap-3 group',
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
              {(openNav?.footer?.length ?? 0) > 0 && (
                <div
                  className={[
                    'flex flex-wrap items-center gap-x-1 gap-y-1 mt-5 pt-4',
                    isDark ? 'border-t border-white/10' : 'border-t border-black/[0.06]',
                  ].join(' ')}
                >
                  {openNav!.footer!.map((item, fIdx) => (
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
            </div>
          </div>
        </div>
      </header>

      {/* ══ MENU MOBILE ══ */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-[rgba(12,29,34,0.55)] backdrop-blur-[6px]"
          onClick={() => setIsMenuOpen(false)}
        />

        <div
          className={`absolute inset-x-0 top-0 bottom-0 transition-transform duration-350 ease-out ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex h-full max-h-[100dvh] flex-col overflow-hidden bg-white font-sans">
            <div
              className="flex shrink-0 items-center justify-between border-b border-[#0c1d22]/[0.08] px-5 sm:px-6"
              style={{ paddingTop: 'env(safe-area-inset-top)', minHeight: 'calc(72px + env(safe-area-inset-top))' }}
            >
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center"
                aria-label="TerraGo – Accueil"
              >
                <Image src="/logo.png" alt="TerraGo" width={112} height={28} className="h-7 w-auto object-contain" />
              </Link>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Fermer le menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0c1d22]/10 text-[#0c1d22] transition-colors duration-150 active:border-[#ec6435] active:text-[#ec6435]"
              >
                <svg width="16" height="16" viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                  <path d="M2 2 15 15M15 2 2 15" />
                </svg>
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <div className="flex min-h-full flex-col px-5 py-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6">
                <nav className="flex flex-col gap-2.5" aria-label="Navigation mobile">
                  {NAV_ITEMS.map((nav) => (
                    <AccordionSection
                      key={nav.path}
                      nav={nav}
                      isOpen={mobileOpenSection === nav.label}
                      onToggle={() =>
                        setMobileOpenSection((prev) =>
                          prev === nav.label ? null : nav.label,
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
                </nav>

                <div className="mt-auto pt-24">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      openModal();
                    }}
                    className="flex w-full items-center justify-center rounded-full bg-[#0c1d22] py-3 font-sans text-[14px] font-bold tracking-[-0.03em] text-white transition-colors duration-200 active:bg-[#163039]"
                  >
                    Organiser votre séminaire
                  </button>
                  <p className="mt-3 text-center font-sans text-[11px] tracking-[-0.02em] text-[#0c1d22]/40">
                    Fabriqué avec tout notre 🧡 pour nos territoires.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
