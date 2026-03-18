import type { Metadata } from 'next';
import { supabaseServer as supabase } from '../../lib/supabase';
import BlogCards from './BlogCards';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Blog séminaires & terroir – Terrago',
  description: 'Conseils, guides et inspirations pour organiser des séminaires engagés et des expériences immersives au cœur du terroir français.',
  openGraph: {
    title: 'Blog séminaires & terroir – Terrago',
    description: 'Conseils, guides et inspirations pour organiser des séminaires engagés et des expériences immersives au cœur du terroir français.',
    url: 'https://terragoexperiences.fr/blog',
    type: 'website',
  },
  alternates: { canonical: 'https://terragoexperiences.fr/blog' },
};

// ── Types ──────────────────────────────────────────────────────────────────────

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: string | null;
  cover_url: string | null;
  reading_time: string | null;
  published: boolean;
  featured?: boolean;
  published_at: string | null;
  created_at: string;
}

// ── Fallbacks statiques ────────────────────────────────────────────────────────

const DEFAULT_COVER = 'https://images.unsplash.com/photo-1632676162165-bd9f2fad90b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function BlogPage() {
  // Article à la une (featured = true)
  const { data: featuredArr } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .eq('featured', true)
    .limit(1);

  const featured: BlogPost | null = featuredArr?.[0] ?? null;

  // Derniers articles publiés (published = true, featured = false)
  const { data: latestArr } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .eq('featured', false)
    .order('published_at', { ascending: false })
    .limit(3);

  const latestPosts: BlogPost[] = latestArr ?? [];

  // Articles bientôt (published = false)
  const { data: soonArr } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', false)
    .order('created_at', { ascending: false })
    .limit(3);

  const soonFromDB: BlogPost[] = soonArr ?? [];

  const soonPosts = soonFromDB.slice(0, 3);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: '#faf8f5', color: '#1a2e1a', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', height: '72vh', minHeight: 480, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('${DEFAULT_COVER}')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 70%, rgba(0,0,0,0.65) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 1.5rem 4rem' }}>
        <h1 style={{ color: '#fff', lineHeight: 1.1, margin: 0 }}>
  <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(1.2rem, 3vw, 2.2rem)', display: 'inline' }}>
    Le terroir français,{' '}
  </span>
  <em style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 600, fontSize: 'clamp(1.6rem, 5vw, 3.6rem)', display: 'inline' }}>
    ça se vit de l&apos;intérieur.
  </em>
</h1>
        </div>
      </div>

      {/* ── PAGE WRAP ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.5rem, 4vw, 3rem)' }}>

        {/* ── SECTION HEAD ── */}
        <div style={{ textAlign: 'center', paddingTop: '2.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: '0 0 .75rem', lineHeight: 1.15 }}>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#1a2e1a' }}>
              Articles{' '}
            </span>
            <em style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 600, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1a2e1a' }}>
              à la Une
            </em>
          </h2>
          <p style={{ fontSize: 15, color: '#9a9080', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Conseils, guides et inspirations pour organiser des expériences inoubliables au cœur du terroir français.
          </p>
        </div>

        <BlogCards featured={featured} latestPosts={latestPosts} soonPosts={soonPosts} />

        {/* ── NEWSLETTER ── */}
        <div style={{
          background: '#1a2e1a', borderRadius: 24,
          padding: 'clamp(2.5rem, 5vw, 4rem) clamp(2rem, 5vw, 5rem)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '2rem', flexWrap: 'wrap' as const, marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
        }}>
          <div>
            <h3 style={{ color: '#fff', fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', lineHeight: 1.3, margin: '0 0 .5rem' }}>
              Restez informé de{' '}
              <em style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(2.2rem, 3.5vw, 2.6rem)' }}>notre évolution.</em>
            </h3>
            <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
              Nouveaux articles, nouveaux producteurs — dans votre boîte mail.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const }}>
            <input
              type="email"
              placeholder="votre@email.fr"
              style={{
                padding: '12px 20px', borderRadius: 9999,
                border: '1px solid rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)',
                color: '#fff', fontFamily: "'Poppins', sans-serif", fontSize: 13, outline: 'none', width: 240,
              }}
            />
            <button style={{
              padding: '12px 24px', borderRadius: 9999,
              background: '#e67e22', color: '#fff', border: 'none',
              fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase' as const, cursor: 'pointer',
            }}>
              S&apos;inscrire
            </button>
          </div>
        </div>

      </div>{/* /page-wrap */}


    </div>
  );
}
