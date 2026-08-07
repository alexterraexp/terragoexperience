'use client';

import React from 'react';
import Link from 'next/link';
import { useModal } from '../context/ModalContext';
import { HOME_COLORS } from './home/homeStyles';

/** Padding interne du contenu footer : sert aussi d'alignement à la barre légale du bas. */
const FRAME_PADDING = 'clamp(1.75rem, 3.5vw, 3.5rem)';

const linkStyle: React.CSSProperties = {
  fontSize: 14,
  color: 'rgba(255,255,255,0.7)',
  textDecoration: 'none',
  transition: 'color .2s',
  letterSpacing: '-0.075em',
  fontFamily: "'Poppins', sans-serif",
};

const sectionTitle: React.CSSProperties = {
  fontSize: 17,
  fontWeight: 700,
  color: '#ffffff',
  margin: '0 0 18px',
  letterSpacing: '-0.05em',
  fontFamily: "'Poppins', sans-serif",
};

const NAV_GROUPS = [
  {
    title: 'Expériences',
    links: [
      { to: '/seminaires-entreprise', label: 'Nos séminaires' },
      { to: '/experiences-entreprise', label: 'Expériences entreprise' },
      { to: '/experiences-privees', label: 'Expériences privées' },
      { to: '/partenaires', label: 'Nos destinations' },
    ],
  },
  {
    title: 'TerraGo',
    links: [
      { to: '/notre-approche', label: 'Notre approche' },
      { to: '/notre-approche#equipe', label: 'Les fondateurs' },
      { to: '/notre-approche#rse', label: 'Notre charte RSE' },
    ],
  },
  {
    title: 'Communauté',
    links: [
      { to: '/partenaires', label: 'Nos producteurs partenaires' },
      { to: '/blog', label: 'Le Journal TerraGo' },
    ],
  },
];

const SOCIALS = [
  {
    href: 'https://www.instagram.com/terrago.experiences/',
    label: 'Instagram',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
        <circle cx="12" cy="12" r="4.4" />
        <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: 'https://www.linkedin.com/company/terragoexperiences/',
    label: 'LinkedIn',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

/** Logos partenaires / garanties (bucket HOME public). */
const GUARANTEES = [
  {
    src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/atoutfrance.png',
    alt: 'Atout France',
  },
  {
    src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/arcus.png',
    alt: 'Arcus Solutions',
  },
];

const ORANGE_STAR =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/etoilecouleurorange.png';

const LEGAL_LINKS = [
  { to: '/mentions-legales', label: 'Mentions légales' },
  { to: '/confidentialite', label: 'Politique de confidentialité' },
];

const hoverWhite = (e: React.MouseEvent<HTMLElement>) => {
  e.currentTarget.style.color = '#fff';
};
const hoverReset = (e: React.MouseEvent<HTMLElement>) => {
  e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
};

const Footer: React.FC = () => {
  const { openRecommanderModal } = useModal();
  const openCookies = () => {
    window.dispatchEvent(new CustomEvent('openCookieBanner'));
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: HOME_COLORS.primary,
        fontFamily: "'Poppins', sans-serif",
        borderTopLeftRadius: 'clamp(28px, 4vw, 56px)',
        borderTopRightRadius: 'clamp(28px, 4vw, 56px)',
      }}
    >
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.25fr);
          column-gap: clamp(1.5rem, 4vw, 4rem);
          row-gap: clamp(2.25rem, 4vw, 3.75rem);
          align-items: start;
        }
        .footer-cta {
          grid-column: 3;
          grid-row: 1 / span 2;
        }
        .footer-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          }
          .footer-cta {
            grid-column: 1 / span 2;
            grid-row: auto;
          }
        }
        @media (max-width: 560px) {
          .footer-grid {
            grid-template-columns: minmax(0, 1fr);
          }
          .footer-cta {
            grid-column: 1;
          }
        }
      `}</style>

      {/* Étoile orange — centre près du coin bas droit, dépasse modérément */}
      <img
        src={ORANGE_STAR}
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 z-[2] h-64 w-64 translate-x-[34%] translate-y-[34%] object-contain sm:h-[22rem] sm:w-[22rem] lg:h-[26rem] lg:w-[26rem]"
      />

      <div
        className="relative z-[1] mx-auto max-w-[1440px]"
        style={{ padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1rem, 3vw, 2.5rem) clamp(1rem, 2vw, 1.5rem)' }}
      >
        <div style={{ padding: FRAME_PADDING }}>
          <div className="footer-grid">
            {/* Colonnes de navigation */}
            {NAV_GROUPS.map((group) => (
              <div key={group.title}>
                <h6 style={sectionTitle}>{group.title}</h6>
                <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
                  {group.links.map((item) => (
                    <li key={`${group.title}-${item.to}`}>
                      <Link
                        href={item.to}
                        style={linkStyle}
                        onMouseEnter={hoverWhite}
                        onMouseLeave={hoverReset}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact + réseaux */}
            <div>
              <h6 style={sectionTitle}>Contact</h6>
              <a
                href="mailto:contact@terragoexperience.fr"
                style={linkStyle}
                onMouseEnter={hoverWhite}
                onMouseLeave={hoverReset}
              >
                contact@terragoexperience.fr
              </a>
              <div className="mt-6 flex gap-4">
                {SOCIALS.map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-white transition-colors"
                    onMouseEnter={(e) => { e.currentTarget.style.color = HOME_COLORS.orange; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#fff'; }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Rappel + garanties */}
            <div className="footer-cta">
              <p
                className="m-0 text-white"
                style={{ fontSize: 'clamp(18px, 1.6vw, 22px)', letterSpacing: '-0.05em' }}
              >
                Vous souhaitez être recontacté&nbsp;?
              </p>

              <form className="mt-5" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  required
                  placeholder="Votre adresse mail"
                  aria-label="Votre adresse mail"
                  className="footer-input w-full bg-transparent px-6 py-3.5 text-sm text-white focus:outline-none"
                  style={{
                    border: '1.5px solid rgba(255,255,255,0.9)',
                    borderRadius: 9999,
                    letterSpacing: '-0.075em',
                  }}
                />
              </form>

              <button
                type="button"
                onClick={openRecommanderModal}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white transition-colors sm:gap-3 sm:px-8 sm:py-3.5 sm:text-sm"
                style={{
                  border: '1.5px solid rgba(255,255,255,0.9)',
                  borderRadius: 9999,
                  letterSpacing: '-0.05em',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = HOME_COLORS.orange;
                  e.currentTarget.style.borderColor = HOME_COLORS.orange;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.9)';
                }}
              >
                <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden>
                  <path d="M1 6h15m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Recommander un producteur
              </button>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <p className="m-0 text-white" style={{ fontSize: 'clamp(18px, 1.5vw, 22px)', letterSpacing: '-0.05em' }}>
                  Nos <span className="font-bold">garanties</span>
                </p>
                {GUARANTEES.map((logo) => (
                  <img
                    key={logo.src}
                    src={logo.src}
                    alt={logo.alt}
                    className="h-14 w-auto object-contain sm:h-16 lg:h-[4.5rem]"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Barre légale */}
        <div
          className="relative z-[3] flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center"
          style={{ padding: `clamp(1.25rem, 2vw, 1.75rem) ${FRAME_PADDING} 0` }}
        >
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: 0, letterSpacing: '-0.075em' }}>
            © 2026 TerraGo — Fabriqué avec passion pour nos territoires.
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {LEGAL_LINKS.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                style={{ ...linkStyle, fontSize: 12 }}
                onMouseEnter={hoverWhite}
                onMouseLeave={hoverReset}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={openCookies}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontSize: 12,
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'inherit',
                letterSpacing: '-0.075em',
              }}
              onMouseEnter={hoverWhite}
              onMouseLeave={hoverReset}
            >
              Mes préférences cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
