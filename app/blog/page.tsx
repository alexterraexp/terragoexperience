import type { Metadata } from 'next';
import Image from 'next/image';
import { supabaseServer as supabase } from '../../lib/supabase';
import {
  HOME_COLORS,
  HOME_RADIUS,
  homeSectionPadding,
} from '../../components/home/homeStyles';
import BlogCards from './BlogCards';

/** Régénère la liste depuis Supabase au plus toutes les 60 s (ISR). */
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog séminaires & terroir – TerraGo',
  description:
    'Conseils, guides et inspirations pour organiser des séminaires engagés et des expériences immersives au cœur du terroir français.',
  openGraph: {
    title: 'Blog séminaires & terroir – TerraGo',
    description:
      'Conseils, guides et inspirations pour organiser des séminaires engagés et des expériences immersives au cœur du terroir français.',
    url: 'https://www.terragoexperiences.fr/blog',
    type: 'website',
  },
  alternates: { canonical: 'https://www.terragoexperiences.fr/blog' },
};

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

const HERO_IMAGE =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/univers/photo-1473973266408-ed4e27abdd47.avif';

const sectionTitleClass =
  'font-sans text-[34px] font-normal leading-[1.08] tracking-[-0.075em] text-[#0c1d22] sm:text-[40px] lg:text-[48px]';

export default async function BlogPage() {
  const { data: featuredArr } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .eq('featured', true)
    .limit(1);

  const featured: BlogPost | null = featuredArr?.[0] ?? null;

  const { data: latestArr } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .eq('featured', false)
    .order('published_at', { ascending: false })
    .limit(3);

  const latestPosts: BlogPost[] = latestArr ?? [];

  const { data: soonArr } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', false)
    .order('created_at', { ascending: false })
    .limit(3);

  const soonPosts: BlogPost[] = (soonArr ?? []).slice(0, 3);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* ── HERO pleine largeur ── */}
      <section className="relative flex min-h-[480px] h-[68vh] w-full items-end justify-center overflow-hidden sm:h-[72vh]">
        <Image
          src={HERO_IMAGE}
          alt="Apiculteur au rucher – Journal TerraGo"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.16) 55%, rgba(0,0,0,0.38) 100%)',
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-3 pb-14 text-center sm:px-5 sm:pb-20 lg:px-8">
          <h1 className="font-sans text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.02] tracking-[-0.075em] text-white">
            Le goût des <span className="font-bold">choses vraies.</span>
          </h1>
          <h2 className="mx-auto mt-4 max-w-lg font-sans text-[13px] font-normal leading-[1.45] tracking-[-0.03em] text-white/75 sm:mt-5 sm:text-[14px]">
            Conseils, guides et inspirations pour organiser des expériences inoubliables au cœur des
            terroirs français.
          </h2>
        </div>
      </section>

      {/* ── ARTICLES ── */}
      <section
        style={{ paddingTop: homeSectionPadding, paddingBottom: homeSectionPadding, background: '#ffffff' }}
      >
        <div className="mx-auto max-w-[1280px] px-3 sm:px-5 lg:px-8">
          <div className="mb-8 sm:mb-10">
            <h2 className={sectionTitleClass}>
              Articles <span className="font-bold">à la une.</span>
            </h2>
          </div>

          <BlogCards featured={featured} latestPosts={latestPosts} soonPosts={soonPosts} />
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section style={{ paddingBottom: homeSectionPadding, background: '#ffffff' }}>
        <div className="mx-auto max-w-[1280px] px-3 sm:px-5 lg:px-8">
          <div
            className="flex flex-col items-start justify-between gap-8 px-6 py-10 sm:flex-row sm:items-center sm:px-10 sm:py-12"
            style={{ background: HOME_COLORS.primary, borderRadius: HOME_RADIUS }}
          >
            <div className="max-w-lg">
              <h3 className="font-sans text-[28px] font-normal leading-[1.1] tracking-[-0.075em] text-white sm:text-[34px]">
                Restez informé de <span className="font-bold">notre évolution.</span>
              </h3>
              <p className="mt-3 font-sans text-[14px] leading-[1.65] tracking-[-0.04em] text-white/55">
                Nouveaux articles, nouveaux producteurs — dans votre boîte mail.
              </p>
            </div>
            <form className="flex w-full max-w-md flex-col gap-2 sm:flex-row sm:items-center sm:gap-2.5">
              <input
                type="email"
                placeholder="votre@email.fr"
                className="w-full flex-1 rounded-full bg-white/10 px-5 py-3 text-[13px] text-white outline-none placeholder:text-white/40 focus:bg-white/15"
                style={{ border: '1px solid rgba(255,255,255,0.2)' }}
              />
              <button
                type="submit"
                className="shrink-0 rounded-full px-6 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90"
                style={{ background: HOME_COLORS.orange }}
              >
                S&apos;inscrire
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
