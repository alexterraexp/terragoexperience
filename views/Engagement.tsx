'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  HOME_COLORS,
  HOME_RADIUS,
  homeParagraphClass,
  homeSectionPadding,
  bottomImageGradientClass,
} from '../components/home/homeStyles';

const ASSETS = {
  hero: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/producteur-maraicher.png',
  ble: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/ble.png',
  symbole:
    'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/s%20orange.png',
  paolo: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/paolo.png',
  team: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/team-terrago.png',
  arbre: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/emoji-arbre.png',
  mouton: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/mouton.png',
  rateau: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/rateau.png',
} as const;

const ScrollAnimate: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const sectionTitleClass =
  'font-sans text-[34px] font-normal leading-[1.08] tracking-[-0.075em] text-[#0c1d22] sm:text-[40px] lg:text-[48px]';

const Engagement: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
  }, []);

  return (
    <div className="overflow-x-hidden bg-white font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* ── HERO (image encadrée) ── */}
      <section className="relative w-full bg-white pt-[calc(7.5rem+env(safe-area-inset-top))] sm:pt-[calc(9rem+env(safe-area-inset-top))] lg:pt-[calc(10.5rem+env(safe-area-inset-top))]">
        <div className="mx-auto max-w-6xl px-5 pb-2 sm:px-8">
          <div
            className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[2.2/1]"
            style={{ borderRadius: HOME_RADIUS }}
          >
            <img
              src={ASSETS.hero}
              alt="Producteur maraîcher devant sa serre"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className={`${bottomImageGradientClass} z-[1]`} />
            <div
              className="absolute inset-0 z-[2]"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.5) 100%)',
              }}
            />

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 py-10 text-center sm:px-10 sm:py-14">
              <h1 className="max-w-3xl font-sans text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.02] tracking-[-0.075em] text-white">
                Notre <span className="font-bold">approche</span>
              </h1>
              <p className={`${homeParagraphClass} mt-4 max-w-xl text-[15px] leading-relaxed text-white/90 sm:mt-6 sm:text-[17px]`}>
                Reconnecter l&apos;humain à la terre, soutenir les producteurs engagés,
                et créer des expériences qui laissent une trace.
              </p>
              <Link
                href="/nous-rejoindre"
                className="mt-7 inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-2 text-sm font-bold tracking-[0.04em] text-white backdrop-blur-md transition-colors hover:border-[#ec6435] hover:bg-white/10 sm:mt-9"
                style={{ background: 'rgba(12, 29, 34, 0.12)' }}
              >
                Rejoindre la communauté
              </Link>
            </div>

            <img
              src={ASSETS.ble}
              alt=""
              aria-hidden
              className="pointer-events-none absolute bottom-3 right-3 z-20 h-16 w-16 object-contain sm:bottom-5 sm:right-5 sm:h-24 sm:w-24 lg:h-28 lg:w-28"
            />
          </div>
        </div>
      </section>

      {/* ── NOTRE APPROCHE ── */}
      <section
        id="approche"
        className="relative overflow-hidden"
        style={{ paddingTop: homeSectionPadding, paddingBottom: 'clamp(2rem, 4vw, 3rem)', background: '#ffffff' }}
      >
        <img
          src={ASSETS.symbole}
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-0 top-1/2 z-0 h-48 w-48 -translate-x-[35%] -translate-y-1/2 object-contain opacity-90 sm:h-64 sm:w-64 lg:h-80 lg:w-80"
        />

        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-8">
          <ScrollAnimate>
            <h2 className={sectionTitleClass}>
              Notre <span className="font-bold">approche.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-[15px] font-normal leading-[1.7] tracking-[-0.04em] text-[#0c1d22]/65 sm:mt-8 sm:text-[17px]">
              Dans un monde qui s&apos;accélère, TerraGo ouvre des parenthèses.
              Des moments où l&apos;on pose les mains sur la terre, où l&apos;on écoute
              les producteurs parler de leurs sols, où l&apos;on comprend que derrière
              chaque produit, il y a une vie, un engagement, une passion.
            </p>
            <p className="mx-auto mt-5 max-w-2xl font-sans text-[15px] font-normal leading-[1.7] tracking-[-0.04em] text-[#0c1d22]/65 sm:text-[17px]">
              Notre mission : créer des ponts durables entre ceux qui produisent
              et ceux qui consomment, à travers des expériences immersives qui
              soutiennent concrètement une agriculture régénératrice et les
              filières françaises.
            </p>
          </ScrollAnimate>
        </div>
      </section>

      {/* ── NOTRE VISION ── */}
      <section
        id="vision"
        style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)', paddingBottom: homeSectionPadding, background: '#ffffff' }}
      >
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <ScrollAnimate>
            <h2 className={sectionTitleClass}>
              Notre <span className="font-bold">vision.</span>
            </h2>
            <p className="mx-auto mt-4 font-sans text-[18px] font-semibold leading-[1.35] tracking-[-0.04em] text-[#0c1d22] sm:text-[22px]">
              Reconnecter l&apos;humain à la terre.
            </p>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-[15px] font-normal leading-[1.7] tracking-[-0.04em] text-[#0c1d22]/65 sm:mt-8 sm:text-[17px]">
              Nous imaginons un tourisme professionnel et des moments de partage
              qui génèrent un impact durable : pour les équipes qui se retrouvent,
              pour les producteurs qui vivent de leur métier, et pour les territoires
              qui regagnent du sens. Chaque immersion TerraGo est pensée pour
              laisser plus que des souvenirs — un lien réel avec le vivant.
            </p>
          </ScrollAnimate>
        </div>
      </section>

      {/* ── PRODUCTEURS ── */}
      <section
        id="producteurs"
        className="relative"
        style={{
          paddingTop: homeSectionPadding,
          paddingBottom: homeSectionPadding,
          background: HOME_COLORS.gray,
        }}
      >
        {/* Symbole orange — calé sur le séparateur blanc / gris, à droite */}
        <img
          src={ASSETS.symbole}
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 z-20 h-40 w-40 translate-x-[35%] -translate-y-1/2 object-contain opacity-90 sm:h-56 sm:w-56 lg:h-72 lg:w-72"
        />
        {/* Arbre — gauche section producteurs */}
        <img
          src={ASSETS.arbre}
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-4 top-[22%] z-20 h-40 w-40 object-contain sm:left-8 sm:h-56 sm:w-56 lg:left-12 lg:h-72 lg:w-72"
        />

        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
          <ScrollAnimate>
            <h2 className={`${sectionTitleClass} mb-10 text-center sm:mb-14`}>
              Nos <span className="font-bold">producteurs partenaires.</span>
            </h2>
          </ScrollAnimate>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <ScrollAnimate>
              <div
                className="relative mx-auto aspect-square w-full max-w-md overflow-hidden lg:max-w-none"
                style={{ borderRadius: HOME_RADIUS }}
              >
                <img
                  src={ASSETS.paolo}
                  alt="Paolo, producteur partenaire TerraGo"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </ScrollAnimate>

            <ScrollAnimate delay={120}>
              <div className="max-w-xl">
                <p className="font-sans text-[15px] font-normal leading-[1.7] tracking-[-0.04em] text-[#0c1d22]/70 sm:text-[17px]">
                  Nous sélectionnons un réseau de producteurs locaux engagés —
                  pour leur authenticité, leur savoir-faire et leur volonté de
                  transmettre. Chaque partenaire TerraGo ouvre son domaine pour
                  des rencontres vraies, loin des activités artificielles.
                </p>
                <p className="mt-5 font-sans text-[15px] font-normal leading-[1.7] tracking-[-0.04em] text-[#0c1d22]/70 sm:text-[17px]">
                  Votre événement soutient directement leur activité et l&apos;économie
                  de proximité.
                </p>
                <Link
                  href="/partenaires"
                  className="mt-8 inline-flex items-center justify-center rounded-full border border-[#0c1d22] bg-white px-8 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-[#0c1d22] transition-colors hover:bg-[#0c1d22] hover:text-white"
                >
                  Découvrir nos producteurs
                </Link>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* ── FONDATEURS ── */}
      <section
        id="equipe"
        className="relative"
        style={{ paddingTop: homeSectionPadding, paddingBottom: homeSectionPadding, background: '#ffffff' }}
      >
        {/* Mouton — droite section fondateurs */}
        <img
          src={ASSETS.mouton}
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-4 top-[32%] z-20 h-36 w-36 object-contain sm:right-8 sm:h-52 sm:w-52 lg:right-12 lg:h-64 lg:w-64"
        />

        <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
          <ScrollAnimate>
            <h2 className={`${sectionTitleClass} mb-10 text-center sm:mb-14`}>
              Les <span className="font-bold">fondateurs,</span> en image.
            </h2>
          </ScrollAnimate>

          <ScrollAnimate delay={100}>
            <div className="group relative mx-auto max-w-3xl">
              <div
                className="relative aspect-[5/4] overflow-hidden sm:aspect-[16/10]"
                style={{ borderRadius: HOME_RADIUS }}
              >
                <img
                  src={ASSETS.team}
                  alt="Alex et Jérôme, co-fondateurs de TerraGo"
                  className="h-full w-full object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div
                  className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-700 group-hover:opacity-80"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 28%, transparent 55%)',
                  }}
                />
              </div>
              <div className="mt-5 flex items-center justify-center gap-3 sm:mt-6 sm:gap-4">
                <a
                  href="https://www.linkedin.com/in/alexsoulard-ev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-w-[120px] items-center justify-center rounded-full bg-[#0c1d22] px-8 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ec6435] sm:min-w-[150px] sm:px-12"
                >
                  Alex
                </a>
                <a
                  href="https://www.linkedin.com/in/jeromepeyronengineer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-w-[120px] items-center justify-center rounded-full bg-[#0c1d22] px-8 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ec6435] sm:min-w-[150px] sm:px-12"
                >
                  Jérôme
                </a>
              </div>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* ── CHARTE RSE ── */}
      <section
        id="rse"
        className="relative"
        style={{
          paddingTop: homeSectionPadding,
          paddingBottom: homeSectionPadding,
          background: HOME_COLORS.gray,
        }}
      >
        {/* Rateau — gauche section charte RSE */}
        <img
          src={ASSETS.rateau}
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-4 top-[28%] z-20 h-36 w-36 object-contain sm:left-8 sm:h-52 sm:w-52 lg:left-12 lg:h-64 lg:w-64"
        />

        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-8">
          <ScrollAnimate>
            <h2 className={sectionTitleClass}>
              Notre charte <span className="font-bold">RSE.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-[15px] font-normal leading-[1.7] tracking-[-0.04em] text-[#0c1d22]/65 sm:mt-8 sm:text-[17px]">
              Notre engagement pour des expériences responsables, des circuits
              courts et un impact positif sur les territoires. La charte détaillée
              arrive bientôt.
            </p>
          </ScrollAnimate>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{ paddingTop: homeSectionPadding, paddingBottom: homeSectionPadding, background: '#ffffff' }}
      >
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <ScrollAnimate>
            <h2 className={`${sectionTitleClass} mb-10 text-center sm:mb-12`}>
              Envie d&apos;aller <span className="font-bold">plus loin ?</span>
            </h2>
          </ScrollAnimate>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <ScrollAnimate delay={80}>
              <Link
                href="/seminaires-entreprise"
                className="group relative flex h-56 items-end overflow-hidden sm:h-64"
                style={{ borderRadius: HOME_RADIUS }}
              >
                <img
                  src="https://images.unsplash.com/photo-1680617550341-3fa60e61f572?q=80&w=1287&auto=format&fit=crop"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1d22]/90 via-[#0c1d22]/30 to-transparent" />
                <div className="relative z-10 p-6 sm:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#ec6435]">
                    Pour les entreprises
                  </p>
                  <h3 className="mt-1 font-sans text-xl font-bold tracking-[-0.04em] text-white sm:text-2xl">
                    Nos séminaires →
                  </h3>
                </div>
              </Link>
            </ScrollAnimate>

            <ScrollAnimate delay={160}>
              <Link
                href="/partenaires"
                className="group relative flex h-56 items-end overflow-hidden sm:h-64"
                style={{ borderRadius: HOME_RADIUS }}
              >
                <img
                  src={ASSETS.paolo}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1d22]/90 via-[#0c1d22]/30 to-transparent" />
                <div className="relative z-10 p-6 sm:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#f9c06a]">
                    Nos partenaires
                  </p>
                  <h3 className="mt-1 font-sans text-xl font-bold tracking-[-0.04em] text-white sm:text-2xl">
                    Nos producteurs →
                  </h3>
                </div>
              </Link>
            </ScrollAnimate>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Engagement;
