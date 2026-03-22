import type { Metadata } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { supabaseServer as supabase } from '../../../lib/supabase';
import TableOfContents from './TableOfContents';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const { data } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('published', true);
  return (data ?? []).map((post: { slug: string }) => ({ slug: post.slug }));
}

// ── Types ──────────────────────────────────────────────────────────────────────

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: string | null;
  cover_url: string | null;
  reading_time: string | null;
  content: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

function extractH2Headings(markdown: string): { text: string; id: string }[] {
  return markdown
    .split('\n')
    .filter(line => /^## /.test(line))
    .map(line => {
      const text = line.replace(/^## /, '').trim();
      return { text, id: slugify(text) };
    });
}

// ── generateMetadata ───────────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabase
    .from('blog_posts')
    .select('title, description, cover_url')
    .eq('slug', slug)
    .single();

  if (!data) return { title: 'Article introuvable – Terrago' };

  return {
    title: `${data.title} – Terrago`,
    description: data.description ?? undefined,
    openGraph: {
      title: `${data.title} – Terrago`,
      description: data.description ?? undefined,
      images: data.cover_url ? [data.cover_url] : [],
      type: 'article',
    },
    alternates: { canonical: `https://terragoexperiences.fr/blog/${slug}` },
  };
}

// ── Page d'erreur custom ───────────────────────────────────────────────────────

function NotFoundPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#faf8f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Poppins', sans-serif",
      padding: '2rem',
    }}>
      <style>{`
        @keyframes sway {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
      `}</style>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <div style={{
          fontSize: 120, lineHeight: 1, marginBottom: '1.5rem',
          display: 'inline-block',
          animation: 'sway 2s infinite ease-in-out',
        }}>
          🌾
        </div>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic', fontWeight: 600,
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          color: '#1a2e1a', lineHeight: 1.3, margin: '0 0 1rem',
        }}>
          Ooooh, cet article semble avoir disparu dans les sillons...
        </h1>
        <p style={{
          color: '#9a9080', fontSize: 15, lineHeight: 1.65, margin: '0 0 2rem',
        }}>
          Pas de panique — le terroir vous attend de l&apos;autre côté.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/blog" style={{
            display: 'inline-block', padding: '13px 28px', borderRadius: 9999,
            background: '#1a2e1a', color: '#fff',
            fontFamily: "'Poppins', sans-serif", fontSize: 12, fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase' as const,
            textDecoration: 'none',
          }}>
            ← Retourner au blog
          </Link>
          <Link href="/seminaires-entreprise" style={{
            display: 'inline-block', padding: '13px 28px',
            color: '#e67e22',
            fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: '0.15em', textTransform: 'uppercase' as const,
            textDecoration: 'none',
          }}>
            Voir nos séminaires →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── MarkdownRenderer ───────────────────────────────────────────────────────────

function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2
            id={slugify(String(children))}
            style={{
              fontFamily: "'Poppins', sans-serif", fontWeight: 700,
              fontSize: '1.6rem', color: '#1a2e1a',
              borderBottom: '1px solid rgba(26,46,26,0.08)',
              paddingBottom: '0.5rem',
              marginTop: '3rem', marginBottom: '1rem', lineHeight: 1.3,
            }}
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 style={{
            fontFamily: "'Poppins', sans-serif", fontWeight: 700,
            fontSize: '1.2rem', color: '#1a2e1a',
            marginTop: '2rem', marginBottom: '0.75rem', lineHeight: 1.35,
          }}>
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', margin: '0 0 1.2rem' }}>
            {children}
          </p>
        ),
        strong: ({ children }) => (
          <strong style={{ color: '#1a2e1a' }}>{children}</strong>
        ),
        a: ({ href, children }) => (
          <a href={href} style={{ color: '#e67e22', textDecoration: 'underline' }}>
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {children}
          </ol>
        ),
        blockquote: ({ children }) => (
          <blockquote style={{
            borderLeft: '4px solid #e67e22',
            padding: '1rem 1.5rem',
            background: '#faf8f5',
            fontStyle: 'italic',
            color: '#7a7060',
            margin: '1.5rem 0',
            borderRadius: '0 8px 8px 0',
          }}>
            {children}
          </blockquote>
        ),
        img: ({ src, alt }) => (
          <span style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', margin: '1.5rem 0', display: 'block' }}>
            <img
              src={src ?? ''}
              alt={alt ?? ''}
              style={{ width: '100%', display: 'block', borderRadius: 16 }}
            />
            {alt && (
              <span style={{
                position: 'absolute', bottom: 10, right: 12,
                background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(6px)',
                borderRadius: 9999,
                padding: '4px 12px',
                fontSize: 10,
                fontWeight: 600,
                color: '#1a2e1a',
                letterSpacing: '0.06em',
                display: 'block',
              }}>
                © {alt}
              </span>
            )}
          </span>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export default async function BlogArticlePage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single<BlogPost>();

  if (!post || !post.published) {
    return <NotFoundPage />;
  }

  const headings = post.content ? extractH2Headings(post.content) : [];
  const titleShort = post.title.length > 42 ? post.title.slice(0, 42) + '…' : post.title;

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: '#faf8f5', color: '#1a2e1a', minHeight: '100vh' }}>

      {/* Responsive helpers */}
      <style>{`
        .article-grid {
          display: grid;
          grid-template-columns: 240px 1fr 280px;
          gap: 3rem;
          align-items: start;
        }
        .col-left { display: block; }
        .col-right { display: block; }
        @media (max-width: 1024px) {
          .article-grid {
            grid-template-columns: 1fr 280px;
          }
          .col-left { display: none; }
        }
        @media (max-width: 767px) {
          .article-grid {
            grid-template-columns: 1fr;
          }
          .col-right { order: 3; }
        }
      `}</style>

      {/* ── HERO ── */}
      <div style={{
        position: 'relative', height: '55vh', minHeight: 360,
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('${post.cover_url ?? 'https://images.unsplash.com/photo-1759833116929-6d06bf8ee16a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.75) 100%)',
        }} />

        {/* Title */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '0 clamp(1.5rem, 8vw, 8rem)', textAlign: 'center',
        }}>
          <h1 style={{
            fontFamily: "'Poppins', sans-serif", fontWeight: 700,
            fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)',
            color: '#fff', lineHeight: 1.25, margin: 0,
            textShadow: '0 2px 16px rgba(0,0,0,0.4)',
          }}>
            {post.title}
          </h1>
        </div>

        {/* Badge + Breadcrumb */}
        <div style={{
          position: 'absolute', bottom: 24, left: 'clamp(1.5rem, 4vw, 3rem)', zIndex: 3,
          display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16,
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
            borderRadius: 9999, padding: '5px 14px',
            fontSize: 10, fontWeight: 700, color: '#fff',
            letterSpacing: '0.12em', textTransform: 'uppercase' as const,
            flexShrink: 0,
          }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#e67e22', display: 'inline-block' }} />
            {post.category?.toUpperCase() ?? 'SÉMINAIRES'}&nbsp;·&nbsp;{post.reading_time ?? '7 MIN'}
          </div>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Link href="/blog" style={{
              fontFamily: "'Poppins', sans-serif", fontWeight: 700,
              color: '#fff', textDecoration: 'underline', textUnderlineOffset: 3, fontSize: 13,
            }}>
              Blog
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>›</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 400, fontSize: 13 }}>
              {post.category ?? 'Article'}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>›</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 400, fontSize: 13 }}>
              {titleShort}
            </span>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem clamp(1.5rem, 4vw, 3rem) 5rem' }}>
        <div className="article-grid">

          {/* ── COL GAUCHE ── */}
          <aside className="col-left" style={{ position: 'sticky', top: 100 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
              <img
                src={DEFAULT_AVATAR}
                alt="Terrago"
                style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(26,46,26,0.1)' }}
              />
              <div>
                <div style={{ fontSize: 11, color: '#9a9080', marginBottom: 2 }}>Écrit par</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1a2e1a' }}>Terrago</div>
                <div style={{ fontSize: 11, color: '#9a9080' }}>
                  {formatDate(post.published_at ?? post.created_at)}
                </div>
              </div>
            </div>

            <div style={{ height: 1, background: 'rgba(26,46,26,0.08)', marginBottom: '1.5rem' }} />

            {headings.length > 0 && <TableOfContents headings={headings} />}
          </aside>

          {/* ── COL CENTRE ── */}
          <main style={{ minWidth: 0, maxWidth: 720 }}>
            {post.content
              ? <MarkdownRenderer content={post.content} />
              : (
                <p style={{ color: '#9a9080', fontStyle: 'italic', fontSize: 15 }}>
                  Le contenu de cet article arrive bientôt...
                </p>
              )}

            <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(26,46,26,0.08)' }}>
              <Link href="/blog" style={{
                fontSize: 12, textTransform: 'uppercase' as const,
                letterSpacing: '0.15em', color: '#1a2e1a',
                textDecoration: 'none', fontWeight: 700,
              }}>
                ← Retour au blog
              </Link>
            </div>
          </main>

          {/* ── COL DROITE ── */}
          <aside className="col-right" style={{ position: 'sticky', top: 100 }}>
            <div style={{
              background: '#fff', borderRadius: 20,
              border: '1px solid rgba(26,46,26,0.08)', overflow: 'hidden',
            }}>
              <img
                src="https://images.unsplash.com/photo-1604256792183-5d179890f31b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Terroir"
                style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: 24 }}>
                <h3 style={{
                  fontFamily: "'Poppins', sans-serif", fontWeight: 700,
                  color: '#1a2e1a', fontSize: '1rem', lineHeight: 1.4, margin: '0 0 10px',
                }}>
                  Organisez votre séminaire au vert
                </h3>
                <p style={{ fontSize: 13, color: '#9a9080', lineHeight: 1.65, margin: '0 0 20px' }}>
                  De la sélection du producteur à la logistique — on s&apos;occupe de tout.
                </p>
                <Link href="/seminaires-entreprise/offres" style={{
                  display: 'block', padding: '13px 0', borderRadius: 12,
                  background: '#1a2e1a', color: '#fff',
                  fontFamily: "'Poppins', sans-serif", fontSize: 12, fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                  textAlign: 'center' as const, textDecoration: 'none',
                }}>
                  Découvrir nos offres →
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>

    </div>
  );
}
