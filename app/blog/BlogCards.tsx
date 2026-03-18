'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  description?: string | null;
  category: string | null;
  cover_url: string | null;
  reading_time?: string | null;
  published?: boolean;
  published_at?: string | null;
  created_at?: string;
}

const DEFAULT_COVER = 'https://images.unsplash.com/photo-1632676162165-bd9f2fad90b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

interface Props {
  featured: BlogPost | null;
  latestPosts: BlogPost[];
  soonPosts: BlogPost[];
}

export default function BlogCards({ featured, latestPosts, soonPosts }: Props) {
  const [featuredHovered, setFeaturedHovered] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredLatest, setHoveredLatest] = useState<number | null>(null);
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <>
      <style>{`
        .une-layout {
          display: grid;
          grid-template-columns: 65fr 35fr;
          gap: 32px;
          align-items: center;
          padding-bottom: 1.5rem;
        }
        .soon-grid, .latest-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 768px) {
          .une-layout   { grid-template-columns: 1fr !important; }
          .soon-grid,
          .latest-grid  { grid-template-columns: 1fr !important; }
          .une-featured-img { aspect-ratio: 16/9 !important; }
          .une-sidebar { padding: 20px !important; box-sizing: border-box !important; }
          .une-sidebar-title { font-size: 1.1rem !important; }
          .une-article-title { font-size: 1.1rem !important; }
        }
      `}</style>

      {/* ── UNE LAYOUT ── */}
      {featured && (
        <div className="une-layout">

          {/* Grande carte gauche */}
          <Link
            href={`/blog/${featured.slug}`}
            onMouseEnter={() => setFeaturedHovered(true)}
            onMouseLeave={() => setFeaturedHovered(false)}
            style={{
              display: 'block', textDecoration: 'none',
              borderRadius: 20,
              transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease',
              transform: featuredHovered ? 'translateY(-6px)' : 'translateY(0)',
              boxShadow: featuredHovered
                ? '0 24px 60px rgba(26,46,26,0.18)'
                : '0 4px 24px rgba(26,46,26,0.08)',
            }}
          >
            <div
              className="une-featured-img"
              style={{
                position: 'relative', borderRadius: 20, overflow: 'hidden',
                cursor: 'pointer', aspectRatio: '4/3',
              }}
            >
              <img
                src={featured.cover_url ?? DEFAULT_COVER}
                alt={featured.title}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                  transition: 'transform 0.6s ease',
                  transform: featuredHovered ? 'scale(1.04)' : 'scale(1)',
                }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />

              {/* Badge haut gauche */}
              <div style={{
                position: 'absolute', top: 20, left: 20,
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
                borderRadius: 9999, padding: '5px 14px',
                fontSize: 10, fontWeight: 700, color: '#fff',
                letterSpacing: '0.12em', textTransform: 'uppercase',
              }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#e67e22', display: 'inline-block' }} />
                À LA UNE &nbsp;·&nbsp; {featured.reading_time ?? '7 MIN'}
              </div>

              {/* Titre + auteur bas gauche */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 28px 32px' }}>
                <h3 className="une-article-title" style={{
                  fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: '#fff',
                  fontSize: 'clamp(1.1rem, 2vw, 1.55rem)', lineHeight: 1.3, margin: '0 0 16px',
                }}>
                  {featured.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img src={DEFAULT_AVATAR} alt="Terrago" style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.3)' }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.9)' }}>Rédigé par Terrago</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,.65)' }}>{formatDate(featured.published_at)}</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Sidebar CTA droite */}
          <div className="une-sidebar" style={{ padding: '28px 24px', background: '#fff', border: '1px solid rgba(26,46,26,0.08)', borderRadius: 20, boxShadow: '0 4px 24px rgba(26,46,26,0.06)' }}>
            <h3 className="une-sidebar-title" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: '#1a2e1a', fontSize: '1.6rem', lineHeight: 1.25, margin: '0 0 16px' }}>
              Prêt pour votre prochain{' '}
              <em style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 600, fontSize: 'clamp(1.6rem, 3vw, 2rem)' }}>séminaire ?</em>
            </h3>
            <p style={{ fontSize: 13, color: '#9a9080', lineHeight: 1.65, margin: '0 0 24px' }}>
              Dites-nous ce que vous cherchez — durée, univers, effectif — et nous construisons l&apos;expérience avec vous. Réponse sous 48h.
            </p>
            <Link
              href="/seminaires/offres"
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              style={{
                display: 'block', width: '100%', padding: 13, borderRadius: 12,
                background: ctaHovered ? '#e67e22' : '#1a2e1a', color: '#fff',
                fontFamily: "'Poppins', sans-serif", fontSize: 12, fontWeight: 700,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                textAlign: 'center', textDecoration: 'none',
                transition: 'background 0.2s ease, transform 0.2s ease',
                transform: ctaHovered ? 'translateY(-2px)' : 'translateY(0)',
                boxSizing: 'border-box',
              }}
            >
              Découvrir nos offres →
            </Link>
          </div>

        </div>
      )}

      {/* ── DERNIERS ARTICLES PUBLIÉS ── */}
      {latestPosts.length > 0 && (
        <div style={{ paddingBottom: 'clamp(1.5rem, 3vw, 2.5rem)', paddingTop: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' }}>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#9a9080', whiteSpace: 'nowrap' }}>
              Derniers articles
            </span>
            <div style={{ flex: 1, height: 1, background: 'rgba(26,46,26,0.08)' }} />
          </div>
          <div className="latest-grid">
            {latestPosts.map((post, i) => (
              <Link
                key={post.slug ?? i}
                href={`/blog/${post.slug}`}
                onMouseEnter={() => setHoveredLatest(i)}
                onMouseLeave={() => setHoveredLatest(null)}
                style={{
                  display: 'block', textDecoration: 'none',
                  borderRadius: 20,
                  transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease',
                  transform: hoveredLatest === i ? 'translateY(-6px)' : 'translateY(0)',
                  boxShadow: hoveredLatest === i
                    ? '0 20px 50px rgba(26,46,26,0.12)'
                    : '0 2px 16px rgba(26,46,26,0.06)',
                }}
              >
                <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(26,46,26,0.08)', background: '#fff' }}>
                  <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                    <img
                      src={post.cover_url ?? DEFAULT_COVER}
                      alt={post.title}
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                        transition: 'transform 0.5s ease',
                        transform: hoveredLatest === i ? 'scale(1.04)' : 'scale(1)',
                      }}
                    />
                    {post.category && (
                      <div style={{
                        position: 'absolute', top: 14, left: 14,
                        background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
                        borderRadius: 9999, padding: '5px 14px',
                        fontSize: 10, fontWeight: 700, color: '#fff',
                        letterSpacing: '0.15em', textTransform: 'uppercase',
                      }}>
                        {post.category}
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '18px 20px 22px' }}>
                    <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 17, color: '#1a2e1a', lineHeight: 1.45, margin: '0 0 12px' }}>
                      {post.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <img src={DEFAULT_AVATAR} alt="Terrago" style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }} />
                      <div style={{ fontSize: 11, color: '#9a9080' }}>
                        Terrago &nbsp;·&nbsp; {formatDate(post.published_at)}
                        {post.reading_time && <span> &nbsp;·&nbsp; {post.reading_time}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── BIENTÔT ── */}
      <div style={{ paddingBottom: 'clamp(1.5rem, 3vw, 2.5rem)', paddingTop: 'clamp(1.5rem, 3vw, 2.5rem)' }}>

        {/* Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' }}>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#9a9080', whiteSpace: 'nowrap' }}>
            Prochainement
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(26,46,26,0.08)' }} />
        </div>

        {/* Grid 3 colonnes */}
        <div className="soon-grid">
          {soonPosts.map((post, i) => (
            <div
              key={post.slug ?? i}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                borderRadius: 20,
                cursor: 'default',
                transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease',
                transform: hoveredCard === i ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: hoveredCard === i
                  ? '0 20px 50px rgba(26,46,26,0.12)'
                  : '0 2px 16px rgba(26,46,26,0.06)',
              }}
            >
            <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(26,46,26,0.08)', background: '#fff' }}>
              {/* Image sans border-radius propre */}
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                <img
                  src={post.cover_url ?? DEFAULT_COVER}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(0.5) brightness(0.7)' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,46,26,0.35)' }} />
                {/* Badge haut gauche */}
                <div style={{
                  position: 'absolute', top: 14, left: 14,
                  background: 'rgba(250,248,245,0.95)', backdropFilter: 'blur(8px)',
                  borderRadius: 9999, padding: '5px 14px',
                  fontSize: 10, fontWeight: 700, color: '#1a2e1a',
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e67e22', display: 'inline-block' }} />
                  Bientôt disponible
                </div>
              </div>
              {/* Body */}
              <div style={{ padding: '18px 20px 22px' }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#e67e22', marginBottom: 8 }}>
                  {post.category ?? 'À venir'}
                </div>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14, color: '#9a9080', lineHeight: 1.45, margin: '0 0 10px' }}>
                  {post.title}
                </h3>
                <div style={{ fontSize: 11, color: '#b0a898' }}>
                  Terrago &nbsp;·&nbsp; {formatDate(post.published_at)}
                </div>
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
