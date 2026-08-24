'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  HOME_COLORS,
  HOME_RADIUS,
  bottomImageGradientClass,
  homeCtaOutlineClass,
  homeFramedHeroH1Class,
  homeSectionPadding,
} from '../components/home/homeStyles';

const ASSETS = {
  hero: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/Etapes/1087462-12111234.webp',
  arbre: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/emoji-arbre.png',
  goutte:
    'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/goutte-eau.png',
  sOrange:
    'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/s-picto-orange.png',
} as const;

const sectionTitleClass =
  'font-sans text-[34px] font-normal leading-[1.08] tracking-[-0.075em] text-[#0c1d22] sm:text-[40px] lg:text-[44px]';

const charterParagraphClass =
  'font-sans text-[15px] font-normal leading-[1.7] tracking-[-0.04em] text-[#0c1d22]/70 sm:text-[16px]';

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
      { threshold: 0.12 },
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
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

type CharterSection = {
  title: string;
  paragraphs: string[];
};

const CHARTER_SECTIONS: CharterSection[] = [
  {
    title: 'Soutenir les producteurs, pas seulement les visiter',
    paragraphs: [
      'Nous ne louons pas des lieux, nous travaillons avec des femmes et des hommes qui vivent de leur métier. Chaque producteur partenaire est rémunéré directement pour son temps, son savoir-faire et sa production, en dehors de toute logique de prestataire événementiel classique où l’expérience proposée serait déconnectée de l’activité réelle du lieu.',
      'Nous sélectionnons nos partenaires pour la sincérité de leur engagement — agroécologie, permaculture, circuits courts, transmission des savoir-faire — et non pour leur capacité à recevoir des groupes ou leur confort logistique. C’est le métier qui prime, l’accueil vient ensuite. Nous refusons de transformer un producteur en simple décor : il reste au centre de l’expérience, il raconte son métier avec ses propres mots, et c’est lui qui décide de ce qu’il souhaite montrer ou non de son exploitation.',
      'Nous veillons également à répartir nos collaborations dans le temps et à ne pas sursolliciter un même partenaire au point de perturber son activité principale. Un séminaire chez un producteur doit rester un complément de revenu et de visibilité, jamais une contrainte qui prend le pas sur son métier.',
    ],
  },
  {
    title: 'Un impact carbone limité, pensé dès la conception',
    paragraphs: [
      'Nos séminaires sont pensés au plus près des territoires et des producteurs. Lorsque le format le permet, l’ensemble de l’expérience se déroule directement sur l’exploitation : réunions, activités, repas et temps collectifs. Lorsque l’hébergement est nécessaire, nous privilégions, lorsque cela est possible et adapté au budget, des établissements proches, typiques du territoire et engagés dans une démarche écoresponsable. L’objectif est de limiter les déplacements tout en proposant une expérience cohérente avec le lieu et les enjeux du séminaire.',
      'Quand un traiteur, un transport ou d’autres prestataires sont nécessaires, nous privilégions systématiquement les acteurs locaux et les produits en circuit court plutôt que des solutions standardisées venues d’ailleurs. Les repas sont, chaque fois que possible, préparés à partir des productions du lieu lui-même ou de producteurs situés à proximité.',
      'Nous encourageons également les groupes à privilégier les mobilités plus sobres lorsque cela est possible : train, covoiturage, transport partagé, sans en faire une contrainte imposée à nos clients. Pour les trajets qui nécessitent un transport organisé, nous privilégions les prestataires qui font le plus d’efforts sur ce plan, dès lors que la qualité de service reste équivalente.',
      'Nous ne prétendons pas à un impact nul, et nous ne communiquerons jamais un chiffre d’empreinte carbone que nous ne pourrions pas justifier. Nous nous engageons en revanche à rester vigilants sur chaque choix logistique, à documenter progressivement l’impact réel de nos séminaires et à privilégier systématiquement, à qualité et contraintes équivalentes, l’option la plus sobre.',
    ],
  },
  {
    title: 'Des activités qui ont un sens, pas des animations',
    paragraphs: [
      'Nous ne proposons pas d’ateliers thématiques déconnectés du lieu qui les accueille. Chaque activité — récolte, transformation, geste agricole, échange avec le producteur — est une tâche réelle qui a une utilité concrète pour l’exploitation elle-même. Les participants ne jouent pas un rôle, ils contribuent, le temps d’une journée, à un travail qui existait avant eux et continuera après eux.',
      'C’est cette réalité qui crée du lien entre collègues, et non un scénario construit pour l’occasion. Un groupe qui aide à une récolte, qui participe à la transformation d’un produit ou qui prépare un repas avec ce que la terre a donné ce jour-là vit une expérience qu’aucun escape game ou atelier de cohésion standard ne peut reproduire.',
    ],
  },
  {
    title: 'Envers nos clients : une transparence assumée',
    paragraphs: [
      'Nous nous engageons à documenter et partager, pour chaque producteur partenaire, la nature de son activité, ses pratiques et ce que représente concrètement notre collaboration pour lui. Les entreprises qui organisent un séminaire avec TerraGo doivent pouvoir dire précisément avec qui elles ont travaillé, et pourquoi ce choix a un impact réel — pas une case RSE cochée, une action qu’elles peuvent expliquer et assumer devant leurs propres équipes ou parties prenantes.',
      'Quand un séminaire nécessite des prestataires externes, nous l’indiquons clairement dans nos devis et nous n’habillons jamais une prestation classique en engagement qu’elle n’est pas.',
    ],
  },
  {
    title: 'Mesurer et progresser',
    paragraphs: [
      'Nous savons que nos pratiques ne sont pas parfaites dès le premier jour. Nous nous engageons à revoir régulièrement nos choix de prestataires, à documenter année après année la part de nos séminaires qui repose intégralement sur des circuits courts, et à corriger ce qui doit l’être à mesure que nous grandissons. Cette charte sera mise à jour au fil de nos progrès, pas figée une fois pour toutes.',
    ],
  },
];

const NEVER_ITEMS = [
  'Nous ne travaillerons pas avec des exploitations dont les pratiques contredisent nos engagements environnementaux.',
  'Nous ne présenterons jamais un partenariat comme plus vertueux qu’il ne l’est.',
  'Nous ne communiquerons jamais un chiffre d’impact que nous ne pouvons pas justifier.',
  'Nous ne construirons jamais un séminaire uniquement pour cocher une case RSE sans expérience réelle derrière.',
];

const CharteRse: React.FC = () => {
  return (
    <div className="overflow-x-hidden bg-white font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* ── HERO ── */}
      <section className="relative w-full overflow-x-clip bg-white pt-[calc(7.5rem+env(safe-area-inset-top))] sm:pt-[calc(9rem+env(safe-area-inset-top))] lg:pt-[calc(10.5rem+env(safe-area-inset-top))]">
        <Image
          src={ASSETS.sOrange}
          alt=""
          aria-hidden
          width={384}
          height={384}
          className="pointer-events-none absolute bottom-0 right-0 z-30 h-52 w-52 translate-x-[42%] translate-y-[42%] object-contain drop-shadow-md sm:h-72 sm:w-72 lg:h-96 lg:w-96"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-2 sm:px-8">
          <div
            className="relative aspect-[5/4] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[2.2/1]"
            style={{ borderRadius: HOME_RADIUS }}
          >
            <Image
              src={ASSETS.hero}
              alt="Mains qui portent le globe – charte d’engagement RSE TerraGo"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 72rem"
            />
            <div className={`${bottomImageGradientClass} z-[1]`} />
            <div
              className="absolute inset-0 z-[2]"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.55) 100%)',
              }}
            />
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 pb-8 pt-10 text-center sm:px-10 sm:pb-10 sm:pt-16">
              <p className="font-sans text-[12px] font-bold tracking-[-0.02em] text-white/90 sm:text-[13px]">
                TerraGo
              </p>
              <h1 className={`mt-2 max-w-3xl font-normal ${homeFramedHeroH1Class}`}>
                Charte d&apos;engagement <span className="font-bold">RSE</span>
              </h1>
              <p className="mt-3 max-w-xl font-sans text-[13px] font-normal leading-[1.5] tracking-[-0.02em] text-white/85 sm:text-[15px]">
                Ce que nous faisons concrètement aujourd&apos;hui, et ce sur quoi nous
                nous engageons à progresser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONVICTION ── */}
      <section
        className="bg-white pb-8 lg:pb-[clamp(5.5rem,11vw,8.5rem)]"
        style={{ paddingTop: homeSectionPadding }}
      >
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <ScrollAnimate>
            <p
              className="font-sans text-[13px] font-bold tracking-[-0.03em] sm:text-[14px]"
              style={{ color: HOME_COLORS.orange }}
            >
              Notre conviction
            </p>
            <h2 className={`mt-3 ${sectionTitleClass}`}>
              Deux causes, <span className="font-bold" style={{ color: HOME_COLORS.orange }}>un même modèle</span>.
            </h2>
            <div className="mt-6 space-y-4">
              <p className={charterParagraphClass}>
                TerraGo est né d&apos;une conviction simple : les entreprises ont besoin de
                reconnecter leurs équipes au réel, et les producteurs de notre pays ont besoin
                d&apos;être vus, soutenus et rémunérés à la juste valeur de leur travail. Chaque
                séminaire que nous organisons sert ces deux causes à la fois. Ce n&apos;est pas un
                supplément d&apos;âme ajouté après coup, c&apos;est notre modèle économique lui-même
                : plus nous organisons de séminaires, plus nous générons de revenus pour des
                producteurs qui en ont besoin.
              </p>
              <p className={charterParagraphClass}>
                Cette charte n&apos;a pas vocation à rester un document d&apos;intention. Elle
                décrit ce que nous faisons concrètement aujourd&apos;hui, et ce sur quoi nous nous
                engageons à progresser.
              </p>
            </div>
          </ScrollAnimate>

          {/* Arbre — mobile : entre conviction et piliers */}
          <Image
            src={ASSETS.arbre}
            alt=""
            aria-hidden
            width={144}
            height={144}
            className="mx-auto mt-10 h-28 w-28 object-contain lg:hidden sm:mt-12 sm:h-36 sm:w-36"
          />
        </div>
      </section>

      {/* ── PILIERS ── */}
      <section
        className="relative pt-10 lg:pt-[clamp(5.5rem,11vw,8.5rem)]"
        style={{
          paddingBottom: homeSectionPadding,
          background: HOME_COLORS.gray,
        }}
      >
        <Image
          src={ASSETS.arbre}
          alt=""
          aria-hidden
          width={224}
          height={224}
          className="pointer-events-none absolute left-12 top-16 z-0 hidden h-56 w-56 object-contain opacity-90 lg:block"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8">
          <div className="flex flex-col gap-12 sm:gap-14">
            {CHARTER_SECTIONS.map((section, i) => (
              <ScrollAnimate key={section.title} delay={i * 40}>
                <article>
                  <div className="flex items-baseline gap-3 sm:gap-4">
                    <span
                      className="shrink-0 font-sans text-[13px] font-bold tabular-nums tracking-[-0.03em]"
                      style={{ color: HOME_COLORS.orange }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="font-sans text-[22px] font-bold leading-[1.2] tracking-[-0.05em] text-[#0c1d22] sm:text-[26px]">
                      {section.title}
                    </h2>
                  </div>
                  <div className="mt-4 space-y-3.5 sm:pl-[calc(2ch+1rem)]">
                    {section.paragraphs.map((p) => (
                      <p key={p.slice(0, 48)} className={charterParagraphClass}>
                        {p}
                      </p>
                    ))}
                  </div>
                </article>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* ── CE QUE NOUS NE FERONS JAMAIS ── */}
      <section
        className="relative"
        style={{
          paddingTop: homeSectionPadding,
          paddingBottom: homeSectionPadding,
          background: HOME_COLORS.orange,
        }}
      >
        <Image
          src={ASSETS.goutte}
          alt=""
          aria-hidden
          width={224}
          height={224}
          className="pointer-events-none absolute bottom-6 right-4 z-0 hidden h-40 w-40 object-contain opacity-90 sm:block sm:right-8 sm:h-48 sm:w-48 lg:h-56 lg:w-56"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8">
          <ScrollAnimate>
            <h2 className="font-sans text-[34px] font-normal leading-[1.08] tracking-[-0.075em] text-white sm:text-[40px] lg:text-[44px]">
              Ce que nous <span className="font-bold">ne ferons jamais</span>.
            </h2>
            <ul className="mt-8 space-y-4">
              {NEVER_ITEMS.map((item) => (
                <li
                  key={item.slice(0, 40)}
                  className="flex items-start gap-3 font-sans text-[15px] font-normal leading-[1.65] tracking-[-0.03em] text-white/95 sm:gap-4 sm:text-[16px]"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </ScrollAnimate>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          paddingTop: homeSectionPadding,
          paddingBottom: homeSectionPadding,
          background: '#ffffff',
        }}
      >
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <ScrollAnimate>
            <h2 className={sectionTitleClass}>
              Envie d&apos;aller <span className="font-bold">plus loin</span>&nbsp;?
            </h2>
            <p className={`mx-auto mt-4 max-w-lg ${charterParagraphClass}`}>
              Découvrez nos séminaires chez des producteurs engagés, ou explorez le réseau
              TerraGo.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link href="/seminaires-entreprise" className={homeCtaOutlineClass}>
                Nos séminaires
              </Link>
              <Link href="/partenaires" className={homeCtaOutlineClass}>
                Nos producteurs
              </Link>
            </div>
            <p className="mt-8">
              <Link
                href="/notre-approche"
                className="font-sans text-[13px] font-semibold tracking-[-0.03em] text-[#0c1d22]/55 transition-colors hover:text-[#ec6435]"
              >
                ← Retour à notre approche
              </Link>
            </p>
          </ScrollAnimate>
        </div>
      </section>
    </div>
  );
};

export default CharteRse;
