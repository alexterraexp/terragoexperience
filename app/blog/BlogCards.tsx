'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HOME_COLORS, HOME_RADIUS } from '../../components/home/homeStyles';

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

const DEFAULT_COVER =
  'https://images.unsplash.com/photo-1632676162165-bd9f2fad90b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

interface Props {
  featured: BlogPost | null;
  latestPosts: BlogPost[];
  soonPosts: BlogPost[];
}

export default function BlogCards({ featured, latestPosts, soonPosts }: Props) {
  return (
    <>
      {/* ── À LA UNE ── */}
      {featured && (
        <div className="mb-12 grid items-stretch gap-4 lg:mb-16 lg:grid-cols-[1.65fr_1fr] lg:gap-5">
          <Link
            href={`/blog/${featured.slug}`}
            className="group relative block aspect-[4/3] overflow-hidden sm:aspect-[16/10] lg:aspect-auto lg:min-h-[420px]"
            style={{ borderRadius: HOME_RADIUS }}
          >
            <Image
              src={featured.cover_url ?? DEFAULT_COVER}
              alt={featured.title}
              fill
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              sizes="(max-width: 1024px) 100vw, 65vw"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

            <div
              className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white sm:left-5 sm:top-5"
              style={{ background: 'rgba(12,29,34,0.45)', backdropFilter: 'blur(8px)' }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: HOME_COLORS.orange }}
              />
              À la une · {featured.reading_time ?? '7 min'}
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-6 sm:px-7 sm:pb-8">
              <h3 className="max-w-xl font-sans text-[22px] font-normal leading-[1.12] tracking-[-0.075em] text-white sm:text-[28px] lg:text-[32px]">
                {featured.title}
              </h3>
              <p className="mt-3 font-sans text-[13px] tracking-[-0.03em] text-white/70">
                TerraGo
                {featured.published_at ? ` · ${formatDate(featured.published_at)}` : ''}
              </p>
            </div>
          </Link>

          <div
            className="flex flex-col justify-between px-6 py-7 sm:px-8 sm:py-9"
            style={{
              background: HOME_COLORS.gray,
              borderRadius: HOME_RADIUS,
            }}
          >
            <div>
              <h3 className="font-sans text-[26px] font-normal leading-[1.1] tracking-[-0.075em] text-[#0c1d22] sm:text-[30px]">
                Prêt pour votre prochain <span className="font-bold">séminaire ?</span>
              </h3>
              <p className="mt-4 font-sans text-[14px] leading-[1.7] tracking-[-0.04em] text-[#0c1d22]/60 sm:text-[15px]">
                Dites-nous ce que vous cherchez — durée, univers, effectif — et nous construisons
                l&apos;expérience avec vous. Réponse sous 48h.
              </p>
            </div>
            <Link
              href="/seminaire-exemples"
              className="mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90 sm:mt-10"
              style={{ background: HOME_COLORS.primary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = HOME_COLORS.orange;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = HOME_COLORS.primary;
              }}
            >
              Découvrir nos offres →
            </Link>
          </div>
        </div>
      )}

      {/* ── DERNIERS ARTICLES ── */}
      {latestPosts.length > 0 && (
        <div className="mb-12 sm:mb-16">
          <div className="mb-6 flex items-center gap-3 sm:mb-8">
            <span className="whitespace-nowrap font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#0c1d22]/40">
              Derniers articles
            </span>
            <div className="h-px flex-1 bg-[#0c1d22]/10" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative aspect-[3/4] overflow-hidden sm:aspect-[4/5]"
                style={{ borderRadius: HOME_RADIUS }}
              >
                <Image
                  src={post.cover_url ?? DEFAULT_COVER}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {post.category && (
                  <div
                    className="absolute left-4 top-4 z-10 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
                    style={{ background: 'rgba(12,29,34,0.45)', backdropFilter: 'blur(8px)' }}
                  >
                    {post.category}
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-5 sm:px-5 sm:pb-6">
                  <h3 className="font-sans text-[18px] font-normal leading-[1.15] tracking-[-0.065em] text-white sm:text-[20px]">
                    {post.title}
                  </h3>
                  <p className="mt-2.5 font-sans text-[12px] tracking-[-0.02em] text-white/65">
                    TerraGo
                    {post.published_at ? ` · ${formatDate(post.published_at)}` : ''}
                    {post.reading_time ? ` · ${post.reading_time}` : ''}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── PROCHAINEMENT ── */}
      {soonPosts.length > 0 && (
        <div>
          <div className="mb-6 flex items-center gap-3 sm:mb-8">
            <span className="whitespace-nowrap font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#0c1d22]/40">
              Prochainement
            </span>
            <div className="h-px flex-1 bg-[#0c1d22]/10" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {soonPosts.map((post) => (
              <div
                key={post.slug}
                className="relative aspect-[3/4] overflow-hidden sm:aspect-[4/5]"
                style={{ borderRadius: HOME_RADIUS }}
              >
                <Image
                  src={post.cover_url ?? DEFAULT_COVER}
                  alt={post.title}
                  fill
                  className="object-cover brightness-[0.7] saturate-50"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-[#0c1d22]/35" />

                <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0c1d22]">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: HOME_COLORS.orange }}
                  />
                  Bientôt
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-5 sm:px-5 sm:pb-6">
                  {post.category && (
                    <p
                      className="mb-2 font-sans text-[10px] font-bold uppercase tracking-[0.16em]"
                      style={{ color: HOME_COLORS.orange }}
                    >
                      {post.category}
                    </p>
                  )}
                  <h3 className="font-sans text-[18px] font-normal leading-[1.15] tracking-[-0.065em] text-white/85 sm:text-[20px]">
                    {post.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
