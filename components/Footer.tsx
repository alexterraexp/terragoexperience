import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer
      className="border-t border-black/10"
      style={{ background: '#ffffff', fontFamily: "'Poppins', sans-serif" }}
    >
      {/* ── Grille principale ── */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 pt-16 pb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-x-8 gap-y-12">

          {/* ── Brand ── */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4">
            {/* Logo + phrase à droite */}
            <div className="flex flex-row items-center gap-4 md:gap-6 mb-5">
              <img
                src="/logo.png"
                alt="Terrago"
                className="h-28 md:h-36 lg:h-44 w-auto flex-shrink-0"
              />
              <p style={{ color: '#9a9080', fontSize: 11, lineHeight: 1.5, maxWidth: 220, margin: 0 }}>
                Des séminaires et séjours de groupe, au cœur du terroir français.
              </p>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/terrago.experiences/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Terrago"
                style={{
                  width: 38, height: 38, borderRadius: 10,
                  border: '1px solid rgba(26,46,26,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#7a7060', textDecoration: 'none', transition: 'all .2s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#e67e22'; (e.currentTarget as HTMLAnchorElement).style.color = '#e67e22'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(26,46,26,0.1)'; (e.currentTarget as HTMLAnchorElement).style.color = '#7a7060'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/terragoexperiences/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Terrago"
                style={{
                  width: 38, height: 38, borderRadius: 10,
                  border: '1px solid rgba(26,46,26,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#7a7060', textDecoration: 'none', transition: 'all .2s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#e67e22'; (e.currentTarget as HTMLAnchorElement).style.color = '#e67e22'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(26,46,26,0.1)'; (e.currentTarget as HTMLAnchorElement).style.color = '#7a7060'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>

            {/* Badge 100% Français */}
            <div
              className="mt-6 inline-flex items-center gap-2 px-4 py-2.5"
              style={{ background: 'rgba(26,46,26,0.04)', borderRadius: 10, border: '1px solid rgba(26,46,26,0.07)' }}
            >
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#e67e22', flexShrink: 0 }} />
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1a2e1a' }}>
                100% Français &amp; Authentique
              </span>
            </div>
          </div>

          {/* ── Spacer ── */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* ── Plateforme ── */}
          <div className="col-span-1 lg:col-span-2">
            <h6 style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', color: '#1a2e1a', marginBottom: 20 }}>
              Plateforme
            </h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 13 }}>
              {[
                { to: '/entreprises', label: "Séminaires d'entreprise" },
                { to: '/entreprises/offres', label: 'Nos offres packagées' },
                { to: '/entre-amis', label: 'Entre amis' },
                { to: '/partenaires', label: 'Producteurs partenaires' },
                { to: '/mission-engagements', label: 'Mission & engagements' },
              ].map(item => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    style={{ fontSize: 12.5, color: '#7a7060', textDecoration: 'none', transition: 'color .2s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#1a2e1a')}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#7a7060')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── À propos ── */}
          <div className="col-span-1 lg:col-span-2">
            <h6 style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', color: '#1a2e1a', marginBottom: 20 }}>
              À propos
            </h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 13 }}>
              {[
                { to: '/nous-rejoindre', label: 'Devenir partenaire' },
                { to: '/recommander-un-producteur', label: 'Recommander un producteur' },
              ].map(item => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    style={{ fontSize: 12.5, color: '#7a7060', textDecoration: 'none', transition: 'color .2s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#1a2e1a')}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#7a7060')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="mailto:terragoexperiences@gmail.com"
                  style={{ fontSize: 12.5, color: '#7a7060', textDecoration: 'none', transition: 'color .2s' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#1a2e1a')}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#7a7060')}
                >
                  Nous contacter
                </a>
              </li>
            </ul>

            <h6 style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', color: '#1a2e1a', marginBottom: 20, marginTop: 32 }}>
              Légal
            </h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 13 }}>
              {[
                { to: '/mentions-legales', label: 'Mentions légales' },
                { to: '/confidentialite', label: 'Confidentialité' },
              ].map(item => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    style={{ fontSize: 12.5, color: '#7a7060', textDecoration: 'none', transition: 'color .2s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#1a2e1a')}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#7a7060')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3">
            <h6 style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', color: '#1a2e1a', marginBottom: 20 }}>
              Contact
            </h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a
                href="mailto:terragoexperiences@gmail.com"
                style={{ display: 'flex', alignItems: 'flex-start', gap: 10, textDecoration: 'none', color: '#7a7060', fontSize: 12.5, lineHeight: 1.6, transition: 'color .2s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#1a2e1a')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#7a7060')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e67e22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                terragoexperiences@gmail.com
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#7a7060', fontSize: 12.5 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e67e22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                France entière
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Barre basse ── */}
      <div style={{ background: '#1a2e1a' }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: 0, fontWeight: 500, letterSpacing: '0.04em' }}>
            © 2026 Terrago — Fabriqué avec passion pour nos territoires.
          </p>
          <div className="flex items-center gap-2">
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#e67e22' }} />
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              Terroir · Authenticité · Engagement
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
