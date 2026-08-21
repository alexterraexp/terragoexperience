'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useModal } from '../context/ModalContext';
import { HOME_COLORS } from './home/homeStyles';
import { REGION_IMAGES, regionDestinationPath } from '../lib/homeStorage';
import {
  SEMINAIRE_ENJEUX,
  SEMINAIRE_ENJEU_SLUGS,
  seminaireEnjeuPath,
} from '../lib/seminaireEnjeux';

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
  fontSize: 20,
  fontWeight: 700,
  color: '#ffffff',
  margin: '0 0 12px',
  letterSpacing: '-0.05em',
  fontFamily: "'Poppins', sans-serif",
};

type FooterLink = { to: string; label: string };

/** Ordre : Séminaires → Destinations → Expériences → TerraGo. */
const NAV_GROUPS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Séminaires',
    links: [
      { to: '/seminaires-entreprise', label: "Séminaires d'entreprise engagés" },
      { to: '/seminaire-exemples', label: 'Exemples de séminaire' },
      ...SEMINAIRE_ENJEUX.map((enjeu) => ({
        to: seminaireEnjeuPath(enjeu.slug),
        label: enjeu.name,
      })),
    ],
  },
  {
    title: 'Destinations',
    links: [
      { to: '/destinations', label: 'Nos destinations' },
      ...REGION_IMAGES.map((region) => ({
        to: regionDestinationPath(region.slug),
        label: region.name,
      })),
    ],
  },
  {
    title: 'Expériences',
    links: [
      { to: '/experiences-entreprise', label: 'Nos expériences' },
      { to: '/experiences-privees', label: 'Expériences privées' },
    ],
  },
  {
    title: 'TerraGo',
    links: [
      { to: '/notre-approche', label: 'Notre approche' },
      { to: '/notre-approche/charte-rse', label: 'Notre charte RSE' },
      { to: '/partenaires', label: 'Nos producteurs partenaires' },
      { to: '/blog', label: 'Le Journal TerraGo' },
      { to: '/faq', label: 'FAQ' },
    ],
  },
];

/** Coupe une liste en deux rangées équilibrées. */
function splitInTwoRows(links: FooterLink[]): [FooterLink[], FooterLink[]] {
  if (links.length <= 1) return [links, []];
  const mid = Math.ceil(links.length / 2);
  return [links.slice(0, mid), links.slice(mid)];
}

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
    href: 'https://www.atout-france.fr/',
    larger: true,
  },
  {
    src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/arcus.png',
    alt: 'Arcus Solutions',
    href: 'https://www.arcus-solutions.fr/',
    rounded: true,
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

/** Mobile : une colonne (pas de wrap bizarre). Desktop : rangée horizontale avec ·. */
const LinkRow: React.FC<{ links: FooterLink[] }> = ({ links }) => {
  if (links.length === 0) return null;
  return (
    <ul className="footer-link-row m-0 flex list-none flex-col gap-2 p-0 sm:flex-row sm:flex-wrap sm:items-center sm:gap-y-2">
      {links.map((item, index) => (
        <li key={item.to} className="inline-flex items-center">
          {index > 0 && (
            <span
              aria-hidden
              className="footer-link-sep mx-2.5 hidden sm:inline"
              style={{ color: 'rgba(255,255,255,0.28)', fontSize: 14 }}
            >
              ·
            </span>
          )}
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
  );
};

const Footer: React.FC = () => {
  const pathname = usePathname();
  const { openRecommanderModal } = useModal();
  const [recontactEmail, setRecontactEmail] = useState('');
  const [recontactSubmitting, setRecontactSubmitting] = useState(false);
  const [recontactSuccess, setRecontactSuccess] = useState(false);
  const [recontactError, setRecontactError] = useState('');

  const openCookies = () => {
    window.dispatchEvent(new CustomEvent('openCookieBanner'));
  };

  const handleRecontactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecontactError('');
    const email = recontactEmail.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setRecontactError('Veuillez renseigner une adresse mail valide');
      return;
    }
    setRecontactSubmitting(true);
    try {
      const r = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ action: 'recontact', email }),
      });
      const data = (await r.json().catch(() => ({}))) as { success?: boolean };
      if (!r.ok || !data.success) throw new Error();
      setRecontactSuccess(true);
      setRecontactEmail('');
    } catch {
      setRecontactError('Une erreur est survenue. Réessayez ou écrivez-nous.');
    } finally {
      setRecontactSubmitting(false);
    }
  };

  /** Dernière section orange → fond orange derrière les coins arrondis du footer. */
  const blendOrangeCorners =
    pathname === '/faq' ||
    SEMINAIRE_ENJEU_SLUGS.some((slug) => pathname === seminaireEnjeuPath(slug));

  return (
    <div style={{ background: blendOrangeCorners ? HOME_COLORS.orange : undefined }}>
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
          grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
          column-gap: clamp(2rem, 5vw, 5rem);
          row-gap: clamp(2.25rem, 4vw, 3.5rem);
          align-items: start;
        }
        .footer-nav {
          display: flex;
          flex-direction: column;
          gap: clamp(1.5rem, 2.5vw, 2.25rem);
        }
        .footer-nav-links {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        /* Mobile : une seule liste verticale (évite le découpage en 2 rangées + wrap). */
        @media (max-width: 639px) {
          .footer-nav-links {
            gap: 0.55rem;
          }
          .footer-nav-links .footer-link-row + .footer-link-row {
            margin-top: 0;
          }
        }
        .footer-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }
      `}</style>

      <div
        className="relative z-[1] mx-auto max-w-[1440px]"
        style={{ padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1rem, 3vw, 2.5rem) 0' }}
      >
        <div style={{ padding: FRAME_PADDING }}>
          <div className="footer-grid">
            {/* Listings horizontaux : Séminaires → Destinations → Expériences → TerraGo */}
            <nav className="footer-nav" aria-label="Pied de page">
              {NAV_GROUPS.map((group) => {
                const [row1, row2] = splitInTwoRows(group.links);
                return (
                  <div key={group.title}>
                    <h6 style={sectionTitle}>{group.title}</h6>
                    {/* Mobile : tous les liens en une colonne. sm+ : 2 rangées horizontales. */}
                    <div className="footer-nav-links">
                      <div className="flex flex-col gap-2 sm:hidden">
                        {group.links.map((item) => (
                          <Link
                            key={item.to}
                            href={item.to}
                            style={linkStyle}
                            onMouseEnter={hoverWhite}
                            onMouseLeave={hoverReset}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                      <div className="hidden sm:contents">
                        <LinkRow links={row1} />
                        <LinkRow links={row2} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>

            {/* Contact + rappel + garanties */}
            <div>
              <h6 style={sectionTitle}>Contact</h6>
              <a
                href="mailto:contact@terragoexperiences.fr"
                style={linkStyle}
                onMouseEnter={hoverWhite}
                onMouseLeave={hoverReset}
              >
                contact@terragoexperiences.fr
              </a>
              <div className="mt-5 flex gap-4">
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

              <p
                className="m-0 mt-10 font-bold text-white"
                style={{ fontSize: 14, letterSpacing: '-0.05em' }}
              >
                Vous souhaitez être recontacté&nbsp;?
              </p>

              {recontactSuccess ? (
                <p className="m-0 mt-4 text-sm text-white" style={{ letterSpacing: '-0.05em' }}>
                  Merci — nous vous recontactons rapidement.
                </p>
              ) : (
                <form className="mt-4" onSubmit={handleRecontactSubmit}>
                  <div className="flex items-center gap-2">
                    <input
                      type="email"
                      required
                      value={recontactEmail}
                      onChange={(e) => {
                        setRecontactEmail(e.target.value);
                        if (recontactError) setRecontactError('');
                      }}
                      placeholder="Votre adresse mail"
                      aria-label="Votre adresse mail"
                      disabled={recontactSubmitting}
                      className="footer-input min-w-0 flex-1 bg-transparent px-5 py-2.5 text-sm text-white focus:outline-none disabled:opacity-60"
                      style={{
                        border: `1.5px solid ${recontactError ? HOME_COLORS.orange : 'rgba(255,255,255,0.9)'}`,
                        borderRadius: 9999,
                        letterSpacing: '-0.075em',
                      }}
                    />
                    <button
                      type="submit"
                      disabled={recontactSubmitting}
                      className="shrink-0 px-4 py-2.5 text-[11px] font-bold text-white transition-colors disabled:opacity-60"
                      style={{
                        border: '1.5px solid rgba(255,255,255,0.9)',
                        borderRadius: 9999,
                        letterSpacing: '-0.05em',
                        background: 'transparent',
                        cursor: recontactSubmitting ? 'wait' : 'pointer',
                        fontFamily: 'inherit',
                      }}
                      onMouseEnter={(e) => {
                        if (recontactSubmitting) return;
                        e.currentTarget.style.background = HOME_COLORS.orange;
                        e.currentTarget.style.borderColor = HOME_COLORS.orange;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.9)';
                      }}
                    >
                      {recontactSubmitting ? '…' : 'Envoyer'}
                    </button>
                  </div>
                  {recontactError ? (
                    <p className="m-0 mt-2 text-xs" style={{ color: HOME_COLORS.orange, letterSpacing: '-0.05em' }}>
                      {recontactError}
                    </p>
                  ) : null}
                </form>
              )}

              <button
                type="button"
                onClick={openRecommanderModal}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-[11px] font-bold transition-colors"
                style={{
                  border: '1.5px solid #ffffff',
                  borderRadius: 9999,
                  letterSpacing: '-0.05em',
                  background: '#ffffff',
                  color: HOME_COLORS.primary,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = HOME_COLORS.orange;
                  e.currentTarget.style.borderColor = HOME_COLORS.orange;
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.borderColor = '#ffffff';
                  e.currentTarget.style.color = HOME_COLORS.primary;
                }}
              >
                <svg width="14" height="10" viewBox="0 0 18 12" fill="none" aria-hidden>
                  <path d="M1 6h15m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Recommander un producteur
              </button>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link
                  href="/mentions-legales"
                  className="m-0 text-white transition-opacity hover:opacity-80"
                  style={{ fontSize: 'clamp(18px, 1.5vw, 22px)', letterSpacing: '-0.05em', textDecoration: 'none' }}
                >
                  Nos <span className="font-bold">garanties</span>
                </Link>
                {GUARANTEES.map((logo) =>
                  'rounded' in logo && logo.rounded ? (
                    <a
                      key={logo.src}
                      href={logo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={logo.alt}
                      className="relative inline-block h-14 w-14 overflow-hidden rounded-[18px] transition-opacity hover:opacity-80 sm:h-16 sm:w-16 sm:rounded-[20px] lg:h-[4.5rem] lg:w-[4.5rem] lg:rounded-[22px]"
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        fill
                        className="scale-[1.42] object-cover"
                        sizes="72px"
                        onError={(e) => {
                          const wrap = e.currentTarget.parentElement;
                          if (wrap) wrap.style.display = 'none';
                        }}
                      />
                    </a>
                  ) : (
                    <a
                      key={logo.src}
                      href={logo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={logo.alt}
                      className="inline-block transition-opacity hover:opacity-80"
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={160}
                        height={80}
                        className={
                          'larger' in logo && logo.larger
                            ? 'h-16 w-auto object-contain sm:h-[4.5rem] lg:h-20'
                            : 'h-14 w-auto object-contain sm:h-16 lg:h-[4.5rem]'
                        }
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Barre légale — mobile empilé (1 lien / ligne) ; desktop : une ligne */}
        <div
          className="relative z-[1] flex flex-col items-start gap-2.5 pr-20 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-2 sm:pr-32 lg:pr-40"
          style={{
            paddingTop: 'clamp(1.25rem, 2vw, 1.75rem)',
            paddingLeft: FRAME_PADDING,
            paddingBottom: 'max(1.2rem, env(safe-area-inset-bottom, 0px))',
            lineHeight: 1.45,
          }}
        >
          <p
            className="m-0 order-last mt-2.5 sm:order-1 sm:mt-0"
            style={{ fontSize: 12, lineHeight: 1.45, color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.075em' }}
          >
            Fabriqué avec tout notre 🤍 © 2026 TerraGo
          </p>
          {LEGAL_LINKS.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              className="order-1 sm:order-2"
              style={{ ...linkStyle, fontSize: 12, lineHeight: 1.45 }}
              onMouseEnter={hoverWhite}
              onMouseLeave={hoverReset}
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={openCookies}
            className="order-1 sm:order-3"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontSize: 12,
              lineHeight: 1.45,
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

      {/* Étoile orange — coin bas droit, derrière le texte */}
      <Image
        src={ORANGE_STAR}
        alt=""
        aria-hidden
        width={416}
        height={416}
        className="pointer-events-none absolute bottom-0 right-0 z-0 h-40 w-40 translate-x-[48%] translate-y-[48%] object-contain opacity-90 sm:h-[22rem] sm:w-[22rem] sm:translate-x-[40%] sm:translate-y-[40%] sm:opacity-100 lg:h-[26rem] lg:w-[26rem]"
      />
    </footer>
    </div>
  );
};

export default Footer;
