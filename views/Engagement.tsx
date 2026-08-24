'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useModal } from '../context/ModalContext';
import {
  HOME_COLORS,
  HOME_RADIUS,
  homeParagraphClass,
  homeSectionPadding,
  homeHeroOutlineButtonClass,
  homeCtaOutlineClass,
} from '../components/home/homeStyles';

const ASSETS = {
  symbole:
    'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/s-picto-orange.png',
  producteurSoutenu:
    'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/producteur-sountenu.png',
  paolo: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/paolo.webp',
  team: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/team-terrago.webp',
  seminairesHero:
    'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/arrivee-randonnee.webp',
  partenairesHero:
    'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/serre-maraicher.jpg',
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
  const { openPartenaireModal } = useModal();
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
  }, []);

  return (
    <div className="overflow-x-hidden bg-white font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* ── HERO (fond orange) ── */}
      <section className="relative w-full bg-white pt-[calc(7.5rem+env(safe-area-inset-top))] sm:pt-[calc(9rem+env(safe-area-inset-top))] lg:pt-[calc(10.5rem+env(safe-area-inset-top))]">
        <div className="relative mx-auto max-w-6xl px-5 pb-2 sm:px-8">
          <div
            className="relative flex aspect-[5/4] w-full flex-col items-center justify-center overflow-hidden px-5 pb-8 pt-10 text-center sm:aspect-[16/9] sm:px-10 sm:pb-10 sm:pt-16 lg:aspect-[2.2/1] lg:pt-20"
            style={{ borderRadius: HOME_RADIUS, background: HOME_COLORS.orange }}
          >
            <h1 className="max-w-3xl font-sans text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.075em] text-white">
              Notre approche
            </h1>
            <p className={`${homeParagraphClass} mt-4 max-w-xl text-[15px] leading-relaxed text-white/90 sm:mt-6 sm:text-[17px]`}>
              Reconnecter l&apos;humain à la terre, soutenir les producteurs engagés,
              et créer des expériences qui laissent une trace.
            </p>
            <button
              type="button"
              onClick={openPartenaireModal}
              className={`mt-7 ${homeHeroOutlineButtonClass} sm:mt-9`}
            >
              Rejoindre la communauté
            </button>
          </div>

          <Image
            src={ASSETS.producteurSoutenu}
            alt="+1 producteur soutenu"
            width={192}
            height={192}
            className="pointer-events-none absolute bottom-0 right-5 z-30 h-32 w-auto translate-x-[18%] translate-y-[55%] rotate-[6deg] object-contain drop-shadow-md sm:right-8 sm:h-40 lg:right-12 lg:h-48"
          />
        </div>
      </section>

      {/* ── NOTRE APPROCHE ── */}
      <section
        id="approche"
        className="relative overflow-hidden"
        style={{ paddingTop: homeSectionPadding, paddingBottom: 'clamp(2rem, 4vw, 3rem)', background: '#ffffff' }}
      >
        <Image
          src={ASSETS.symbole}
          alt=""
          aria-hidden
          width={320}
          height={320}
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
        className="pt-12 sm:pt-8"
        style={{ paddingBottom: homeSectionPadding, background: '#ffffff' }}
      >
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <ScrollAnimate>
            <h2 className={sectionTitleClass}>
              Notre <span className="font-bold">vision.</span>
            </h2>
            <p className="mx-auto mt-4 font-sans text-[18px] font-semibold leading-[1.35] tracking-[-0.04em] text-[#0c1d22] sm:text-[22px]">
              Reconnecter l&apos;humain à la terre et soutenir nos producteurs.
            </p>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-[15px] font-normal leading-[1.7] tracking-[-0.04em] text-[#0c1d22]/65 sm:mt-8 sm:text-[17px]">
              Nous imaginons un tourisme professionnel et des moments de partage
              qui génèrent un impact durable : pour les équipes, pour les
              producteurs, et pour les territoires.
            </p>
            <p className="mx-auto mt-5 max-w-2xl font-sans text-[15px] font-normal leading-[1.7] tracking-[-0.04em] text-[#0c1d22]/65 sm:text-[17px]">
              Chaque expérience développée chez un producteur est aussi une
              manière de le soutenir directement : en valorisant son métier, en
              faisant connaître son savoir-faire et en lui apportant une source
              de revenus complémentaire. Parce que faire découvrir leur
              quotidien, c&apos;est aussi leur témoigner une véritable
              reconnaissance et contribuer concrètement à la pérennité de leur
              activité.
            </p>
            <p className="mx-auto mt-5 max-w-2xl font-sans text-[15px] font-normal leading-[1.7] tracking-[-0.04em] text-[#0c1d22]/65 sm:text-[17px]">
              Chaque immersion TerraGo est ainsi pensée pour laisser plus que
              des souvenirs : un lien réel avec le vivant, et un impact concret
              pour ceux qui le font vivre.
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
        <Image
          src={ASSETS.symbole}
          alt=""
          aria-hidden
          width={288}
          height={288}
          className="pointer-events-none absolute right-0 top-0 z-20 h-40 w-40 translate-x-[35%] -translate-y-1/2 object-contain opacity-90 sm:h-56 sm:w-56 lg:h-72 lg:w-72"
        />
        {/* Arbre — mobile : intersection vision / producteurs ; desktop : gauche section */}
        <Image
          src={ASSETS.arbre}
          alt=""
          aria-hidden
          width={288}
          height={288}
          className="pointer-events-none absolute left-4 top-0 z-20 h-40 w-40 -translate-y-1/2 object-contain sm:left-8 sm:top-[22%] sm:h-56 sm:w-56 sm:translate-y-0 lg:left-12 lg:h-72 lg:w-72"
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
                <Image
                  src={ASSETS.paolo}
                  alt="Paolo, producteur partenaire TerraGo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 28rem, 50vw"
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
                  className={`mt-8 ${homeCtaOutlineClass}`}
                >
                  Découvrir nos producteurs partenaires
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
        {/* Mouton — mobile : intersection producteurs / fondateurs ; desktop : droite section */}
        <Image
          src={ASSETS.mouton}
          alt=""
          aria-hidden
          width={256}
          height={256}
          className="pointer-events-none absolute right-4 top-0 z-20 h-36 w-36 -translate-y-1/2 object-contain sm:right-8 sm:top-[32%] sm:h-52 sm:w-52 sm:translate-y-0 lg:right-12 lg:h-64 lg:w-64"
        />

        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
          <ScrollAnimate>
            <h2 className={`${sectionTitleClass} mb-10 text-center sm:mb-14`}>
              Les <span className="font-bold">fondateurs.</span>
            </h2>
          </ScrollAnimate>

          <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-5">
            <ScrollAnimate className="mb-5 lg:mb-0">
              <div className="max-w-xl">
                <p className="font-sans text-[15px] font-normal leading-[1.7] tracking-[-0.04em] text-[#0c1d22]/70 sm:text-[17px]">
                  Nous sommes Jérôme et Alex, les fondateurs de TerraGo.
                </p>
                <p className="mt-5 font-sans text-[15px] font-normal leading-[1.7] tracking-[-0.04em] text-[#0c1d22]/70 sm:text-[17px]">
                  TerraGo est né d&apos;une envie : sortir des expériences
                  professionnelles toutes faites et revenir à quelque chose de
                  plus simple, de plus humain, de plus authentique.
                </p>
                <p className="mt-5 font-sans text-[15px] font-normal leading-[1.7] tracking-[-0.04em] text-[#0c1d22]/70 sm:text-[17px]">
                  Au fil de nos rencontres, nous avons découvert des producteurs
                  engagés, des femmes et des hommes passionnés qui ont énormément
                  à transmettre : des savoir-faire, des parcours, mais aussi une
                  autre manière de regarder nos territoires et notre
                  environnement.
                </p>
                <p className="mt-5 font-sans text-[15px] font-normal leading-[1.7] tracking-[-0.04em] text-[#0c1d22]/70 sm:text-[17px]">
                  Nous avons voulu créer des expériences qui permettent aux
                  entreprises de venir à leur rencontre, de remettre du sens dans
                  les moments partagés et de soutenir concrètement celles et ceux
                  qui font vivre nos territoires.
                </p>
              </div>
            </ScrollAnimate>

            <ScrollAnimate
              delay={120}
              className="group relative mx-auto w-full max-w-md self-stretch lg:mx-0 lg:max-w-none"
            >
              <div
                className="relative aspect-[4/3] overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto"
                style={{ borderRadius: HOME_RADIUS }}
              >
                <Image
                  src={ASSETS.team}
                  alt="Alex et Jérôme, co-fondateurs de TerraGo"
                  fill
                  className="object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 28rem, 50vw"
                />
                <div
                  className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-700 group-hover:opacity-80"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 28%, transparent 55%)',
                  }}
                />
              </div>
            </ScrollAnimate>

            <div className="mx-auto flex w-full max-w-md items-center justify-center gap-3 sm:gap-4 lg:col-start-2 lg:max-w-none">
              <a
                href="https://www.linkedin.com/in/alexsoulard-ev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Profil LinkedIn d’Alex"
                className="inline-flex min-w-[100px] items-center justify-center gap-2 rounded-full bg-[#0c1d22] px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ec6435] sm:min-w-[140px] sm:px-10 sm:py-2.5 sm:text-[11px]"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="sm:h-[13px] sm:w-[13px]">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Alex
              </a>
              <a
                href="https://www.linkedin.com/in/jeromepeyronengineer/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Profil LinkedIn de Jérôme"
                className="inline-flex min-w-[100px] items-center justify-center gap-2 rounded-full bg-[#0c1d22] px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ec6435] sm:min-w-[140px] sm:px-10 sm:py-2.5 sm:text-[11px]"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="sm:h-[13px] sm:w-[13px]">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Jérôme
              </a>
            </div>
          </div>
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
        {/* Rateau — mobile : intersection fondateurs / RSE ; desktop : gauche section */}
        <Image
          src={ASSETS.rateau}
          alt=""
          aria-hidden
          width={256}
          height={256}
          className="pointer-events-none absolute left-4 top-0 z-20 h-36 w-36 -translate-y-1/2 object-contain sm:left-8 sm:top-[28%] sm:h-52 sm:w-52 sm:translate-y-0 lg:left-12 lg:h-64 lg:w-64"
        />

        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-8">
          <ScrollAnimate>
            <h2 className={sectionTitleClass}>
              Notre charte <span className="font-bold">RSE.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-[15px] font-normal leading-[1.7] tracking-[-0.04em] text-[#0c1d22]/65 sm:mt-8 sm:text-[17px]">
              Soutenir les producteurs, limiter l&apos;impact dès la conception,
              proposer des activités qui ont du sens — et progresser en toute
              transparence. Ce n&apos;est pas un document d&apos;intention : c&apos;est
              ce que nous faisons concrètement.
            </p>
            <div className="mt-8">
              <Link href="/notre-approche/charte-rse" className={homeCtaOutlineClass}>
                Lire la charte
              </Link>
            </div>
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
                <Image
                  src={ASSETS.seminairesHero}
                  alt="Séminaires d’entreprise TerraGo"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, 50vw"
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
                <Image
                  src={ASSETS.partenairesHero}
                  alt="Producteurs partenaires TerraGo"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1d22]/90 via-[#0c1d22]/30 to-transparent" />
                <div className="relative z-10 p-6 sm:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#f9c06a]">
                    Nos partenaires
                  </p>
                  <h3 className="mt-1 font-sans text-xl font-bold tracking-[-0.04em] text-white sm:text-2xl">
                    Nos producteurs partenaires →
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
