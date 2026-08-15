import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { supabaseServer as supabase } from '../../../lib/supabase';
import {
  HOME_COLORS,
  HOME_RADIUS,
  homeSectionPadding,
} from '../../../components/home/homeStyles';
import TableOfContents from './TableOfContents';

/** Régénère l’article depuis Supabase au plus toutes les 60 s (ISR). */
export const revalidate = 60;

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
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function extractH2Headings(markdown: string): { text: string; id: string }[] {
  return markdown
    .split('\n')
    .filter((line) => /^## /.test(line))
    .map((line) => {
      const text = line.replace(/^## /, '').trim();
      return { text, id: slugify(text) };
    });
}

// ── generateMetadata ───────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabase
    .from('blog_posts')
    .select('title, description, cover_url')
    .eq('slug', slug)
    .single();

  if (!data) return { title: 'Article introuvable – TerraGo' };

  return {
    title: `${data.title} – TerraGo`,
    description: data.description ?? undefined,
    openGraph: {
      title: `${data.title} – TerraGo`,
      description: data.description ?? undefined,
      images: data.cover_url ? [data.cover_url] : [],
      type: 'article',
    },
    alternates: { canonical: `https://www.terragoexperiences.fr/blog/${slug}` },
  };
}

// ── Page d'erreur ──────────────────────────────────────────────────────────────

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-5 font-sans">
      <div className="max-w-md text-center">
        <h1 className="font-sans text-[34px] font-normal leading-[1.1] tracking-[-0.075em] text-[#0c1d22] sm:text-[40px]">
          Cet article semble avoir <span className="font-bold">disparu.</span>
        </h1>
        <p className="mt-4 font-sans text-[15px] leading-[1.7] tracking-[-0.04em] text-[#0c1d22]/55">
          Pas de panique — le terroir vous attend de l&apos;autre côté.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90"
            style={{ background: HOME_COLORS.primary }}
          >
            ← Retour au journal
          </Link>
          <Link
            href="/seminaire-exemples"
            className="inline-flex items-center justify-center rounded-full border border-[#0c1d22] px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0c1d22] transition-colors hover:bg-[#0c1d22] hover:text-white"
          >
            Voir nos séminaires
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
            className="mb-3 mt-10 border-b border-[#0c1d22]/08 pb-2.5 font-sans text-[20px] font-bold leading-[1.25] tracking-[-0.04em] text-[#0c1d22] sm:text-[22px]"
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mb-2.5 mt-7 font-sans text-[16px] font-bold leading-[1.3] tracking-[-0.03em] text-[#0c1d22] sm:text-[17px]">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mb-4 font-sans text-[15px] font-normal leading-[1.8] tracking-[-0.02em] text-[#0c1d22]/75 sm:text-[16px]">
            {children}
          </p>
        ),
        strong: ({ children }) => (
          <strong className="font-bold text-[#0c1d22]">{children}</strong>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="underline decoration-[#ec6435]/40 underline-offset-2 transition-colors hover:text-[#ec6435]"
            style={{ color: HOME_COLORS.orange }}
          >
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul className="mb-4 flex list-disc flex-col gap-1.5 pl-5 font-sans text-[15px] leading-[1.75] text-[#0c1d22]/75 sm:text-[16px]">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-4 flex list-decimal flex-col gap-1.5 pl-5 font-sans text-[15px] leading-[1.75] text-[#0c1d22]/75 sm:text-[16px]">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="pl-1">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote
            className="my-6 rounded-r-[16px] border-l-4 py-3.5 pl-5 pr-4 font-sans text-[14px] italic leading-[1.7] tracking-[-0.02em] text-[#0c1d22]/65 sm:text-[15px]"
            style={{
              borderColor: HOME_COLORS.orange,
              background: HOME_COLORS.gray,
            }}
          >
            {children}
          </blockquote>
        ),
        img: ({ src, alt }) => (
          <span
            className="relative my-8 block overflow-hidden"
            style={{ borderRadius: HOME_RADIUS }}
          >
            <Image
              src={src ?? ''}
              alt={alt ?? ''}
              width={1200}
              height={800}
              className="block h-auto w-full"
              style={{ borderRadius: HOME_RADIUS }}
              sizes="(max-width: 768px) 100vw, 720px"
            />
            {alt && (
              <span className="absolute bottom-3 right-3 block rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold tracking-[0.06em] text-[#0c1d22] backdrop-blur-md">
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

const DEFAULT_COVER =
  'https://images.unsplash.com/photo-1759833116929-6d06bf8ee16a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const CTA_IMAGE =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/potagermenthon/potager-chateau-menthon.webp';

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
  const cover = post.cover_url ?? DEFAULT_COVER;

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <style>{`
        .article-layout {
          display: grid;
          grid-template-columns: 220px minmax(0, 1fr);
          gap: clamp(2.5rem, 4vw, 4rem);
          align-items: start;
        }
        @media (max-width: 1023px) {
          .article-layout {
            grid-template-columns: 1fr;
          }
          .article-toc {
            display: none;
          }
        }
        .blog-hero-back {
          display: inline-flex;
          align-items: center;
          gap: 0.4em;
          background: rgba(12, 29, 34, 0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 9999px;
          padding: 6px 14px;
          font-family: 'Poppins', sans-serif;
          font-size: 10px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.12);
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .blog-hero-back:hover {
          background: rgba(255,255,255,0.14);
          border-color: rgba(255,255,255,0.28);
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative flex min-h-[420px] h-[58vh] w-full items-end overflow-hidden sm:h-[62vh]">
        <Image
          src={cover}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.72) 100%)',
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-3 pb-10 sm:px-5 sm:pb-14 lg:px-8">
          <div className="mb-5">
            <Link href="/blog" className="blog-hero-back">
              <span aria-hidden style={{ fontSize: 11, letterSpacing: 0, opacity: 0.92 }}>
                ←
              </span>
              Retour au journal
            </Link>
          </div>

          <h1 className="max-w-5xl font-sans text-[clamp(1.75rem,4.2vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.075em] text-white">
            {post.title}
          </h1>

          <p className="mt-4 font-sans text-[13px] tracking-[-0.02em] text-white/70 sm:text-[14px]">
            TerraGo
            {(post.published_at || post.created_at)
              ? ` · ${formatDate(post.published_at ?? post.created_at)}`
              : ''}
            {` · ${post.category ?? 'Séminaires'}`}
            {post.reading_time ? ` · ${post.reading_time}` : ''}
          </p>
        </div>
      </section>

      {/* ── BODY ── */}
      <div
        className="mx-auto max-w-[1280px] px-3 sm:px-5 lg:px-8"
        style={{
          paddingTop: 'clamp(2.5rem, 5vw, 4rem)',
          paddingBottom: homeSectionPadding,
        }}
      >
        <div className="article-layout">
          {/* Sommaire */}
          <aside className="article-toc sticky top-28">
            <p className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#0c1d22]/40">
              Dans cet article
            </p>
            {headings.length > 0 ? (
              <TableOfContents headings={headings} />
            ) : (
              <p className="font-sans text-[13px] text-[#0c1d22]/40">—</p>
            )}
          </aside>

          {/* Lecture large */}
          <main className="min-w-0 max-w-[1100px]">
            {post.description && (
              <p className="mb-8 max-w-4xl font-sans text-[15px] font-normal leading-[1.7] tracking-[-0.03em] text-[#0c1d22]/55 sm:text-[16px]">
                {post.description}
              </p>
            )}

            {post.content ? (
              <MarkdownRenderer content={post.content} />
            ) : (
              <p className="font-sans text-[15px] italic text-[#0c1d22]/45">
                Le contenu de cet article arrive bientôt...
              </p>
            )}

            <div className="mt-14 border-t border-[#0c1d22]/08 pt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#0c1d22] transition-colors hover:text-[#ec6435]"
              >
                ← Retour au journal
              </Link>
            </div>
          </main>
        </div>
      </div>

      {/* ── CTA ── */}
      <section style={{ paddingBottom: homeSectionPadding, background: '#ffffff' }}>
        <div className="mx-auto max-w-[1280px] px-3 sm:px-5 lg:px-8">
          <div
            className="grid overflow-hidden lg:grid-cols-[1.1fr_1fr]"
            style={{ background: HOME_COLORS.primary, borderRadius: HOME_RADIUS }}
          >
            <div className="relative min-h-[220px] lg:min-h-[320px]">
              <Image
                src={CTA_IMAGE}
                alt="Séminaire au vert"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
            <div className="flex flex-col justify-center px-7 py-10 sm:px-10 sm:py-12 lg:px-12">
              <h2 className="font-sans text-[28px] font-normal leading-[1.1] tracking-[-0.075em] text-white sm:text-[34px]">
                Organisez votre <span className="font-bold">séminaire au vert.</span>
              </h2>
              <p className="mt-4 max-w-md font-sans text-[14px] leading-[1.7] tracking-[-0.04em] text-white/60 sm:text-[15px]">
                De la sélection du producteur à la logistique — on s&apos;occupe de tout.
              </p>
              <Link
                href="/seminaire-exemples"
                className="mt-8 inline-flex w-fit items-center justify-center rounded-full bg-white px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0c1d22] transition-colors hover:bg-[#ec6435] hover:text-white"
              >
                Découvrir nos exemples de séminaire →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
