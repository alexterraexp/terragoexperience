'use client';

import React from 'react';
import Link from 'next/link';

const linkStyle: React.CSSProperties = {
  fontSize: 13, color: '#7a7060', textDecoration: 'none', transition: 'color .2s',
};

const sectionTitle: React.CSSProperties = {
  fontSize: 15, fontWeight: 700, color: '#1a2e1a', marginBottom: 22, marginTop: 0,
};

const Footer: React.FC = () => {
  const openCookies = () => {
    window.dispatchEvent(new CustomEvent('openCookieBanner'));
  };

  return (
    <footer style={{ background: '#ffffff', fontFamily: "'Poppins', sans-serif" }}>
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 0.9fr 0.9fr;
          gap: 1.25rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>

      <div className="max-w-[1440px] mx-auto" style={{ padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 4vw, 3rem)' }}>
        <div className="footer-grid">

          {/* ── Col 1 · Brand ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <img
              src="/logo.png"
              alt="Terrago"
              style={{ height: 140, width: 'auto', alignSelf: 'flex-start' }}
            />
            <p style={{ color: '#6b6355', fontSize: 13, lineHeight: 1.65, margin: 0, maxWidth: 240 }}>
              Des séminaires et séjours de groupe au cœur du terroir français.
            </p>

            {/* Suivez-nous */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1a2e1a', margin: '0 0 12px 0' }}>
                Suivez-nous
              </p>
              <p style={{ fontSize: 11.5, color: '#9a9080', lineHeight: 1.55, margin: '0 0 14px 0', maxWidth: 220 }}>
                Inspirations, coulisses et belles adresses — suivez l'aventure Terrago.
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                {[
                  {
                    href: 'https://www.instagram.com/terrago.experiences/',
                    label: 'Instagram',
                    icon: (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    ),
                  },
                  {
                    href: 'https://www.linkedin.com/company/terragoexperiences/',
                    label: 'LinkedIn',
                    icon: (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    ),
                  },
                ].map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{
                      width: 40, height: 40, borderRadius: '50%',
                      border: '1.5px solid #e67e22',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#e67e22', textDecoration: 'none',
                      transition: 'all .2s ease',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = '#e67e22';
                      el.style.color = '#fff';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = 'transparent';
                      el.style.color = '#e67e22';
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 14px', borderRadius: 8,
              background: 'rgba(26,46,26,0.05)',
              border: '1px solid rgba(26,46,26,0.08)',
              alignSelf: 'flex-start',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#e67e22', flexShrink: 0 }} />
              <span style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1a2e1a' }}>
                100% Français &amp; Authentique
              </span>
            </div>
          </div>

          {/* ── Col 2 · Plateforme ── */}
          <div>
            <h6 style={sectionTitle}>Plateforme</h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { to: '/seminaires-entreprise', label: "Séminaires d'entreprise" },
                { to: '/seminaires-entreprise/offres', label: 'Nos offres packagées' },
                { to: '/entre-amis', label: 'Entre amis' },
                { to: '/partenaires', label: 'Producteurs partenaires' },
                { to: '/mission-engagements', label: 'Mission & engagements' },
              ].map(item => (
                <li key={item.to}>
                  <Link
                    href={item.to}
                    style={linkStyle}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#1a2e1a')}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#7a7060')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3 · À propos ── */}
          <div>
            <h6 style={sectionTitle}>À propos</h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { to: '/nous-rejoindre', label: 'Devenir partenaire' },
                { to: '/recommander-un-producteur', label: 'Recommander un producteur' },
                { to: '/blog', label: 'Le blog Terrago' },
                { to: 'mailto:terragoexperiences@gmail.com', label: 'Nous contacter' },
              ].map(item => (
                <li key={item.to}>
                  <Link
                    href={item.to}
                    style={linkStyle}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#1a2e1a')}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#7a7060')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4 · Contact + Légal ── */}
          <div>
            <h6 style={sectionTitle}>Contact</h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
              <a
                href="mailto:terragoexperiences@gmail.com"
                style={{ display: 'flex', alignItems: 'flex-start', gap: 10, textDecoration: 'none', color: '#7a7060', fontSize: 13, lineHeight: 1.6, transition: 'color .2s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#1a2e1a')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#7a7060')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e67e22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                terragoexperiences@gmail.com
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#7a7060', fontSize: 13 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e67e22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                France entière
              </div>
            </div>

            <h6 style={sectionTitle}>Légal</h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { to: '/mentions-legales', label: 'Mentions légales' },
                { to: '/confidentialite', label: 'Politique de confidentialité' },
              ].map(item => (
                <li key={item.to}>
                  <Link
                    href={item.to}
                    style={linkStyle}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#1a2e1a')}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#7a7060')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={openCookies}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: 0, fontSize: 13, color: '#7a7060',
                    fontFamily: 'inherit', textAlign: 'left',
                    transition: 'color .2s',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = '#1a2e1a')}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = '#7a7060')}
                >
                  Cookies
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Barre basse ── */}
      <div style={{ borderTop: '1px solid rgba(26,46,26,0.08)', background: '#ffffff' }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-5">
          <p style={{ fontSize: 11, color: '#9a9080', margin: 0, fontWeight: 500, letterSpacing: '0.04em', textAlign: 'center' }}>
            © 2026 Terrago — Fabriqué avec passion pour nos territoires.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
