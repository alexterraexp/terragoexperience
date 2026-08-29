'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  HOME_COLORS,
  HOME_RADIUS,
  homeFramedHeroAspectClass,
  homeFramedHeroSectionClass,
  homeFramedHeroH1Class,
  homeFramedHeroOverlayClass,
  homeFramedHeroOverlayInnerClass,
  homeFramedHeroSubtitleClass,
  homeParagraphClass,
  homeSectionPadding,
  bottomImageGradientClass,
  homeHeroOutlineButtonClass,
  homeCtaOutlineClass,
} from '../components/home/homeStyles';
import FramedHeroImage from '../components/FramedHeroImage';

const HOME =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME';

const ASSETS = {
  hero: `${HOME}/pique-nique-convivial.webp`,
  ble: `${HOME}/emoji/ble.png`,
} as const;

const sectionTitleClass =
  'font-sans text-[34px] font-normal leading-[1.08] tracking-[-0.075em] text-[#0c1d22] sm:text-[40px] lg:text-[48px]';

const CONTACT_EMAIL = 'contact@terragoexperiences.fr';
const MIN_PARTICIPANTS = 8;

const TYPE_DEMANDE_OPTIONS = [
  { label: 'Séjour' },
  { label: 'Activités & immersions' },
  { label: 'Repas du terroir' },
  { label: 'Repas guinguette' },
  { label: 'EVG / EVJF' },
];

const OFFRE_ITEMS = [
  {
    title: 'Séjours',
    titleBold: 'complets.',
    text: 'Les mêmes séjours conçus pour les entreprises, ouverts à votre groupe — logement, rythme et expériences inclus.',
    image: `${HOME}/hotel-typique.jpg`,
    alt: 'Séjour privé TerraGo chez des producteurs',
  },
  {
    title: 'Activités &',
    titleBold: 'immersions.',
    text: 'Récolter, fabriquer, découvrir un savoir-faire : des moments concrets chez des producteurs engagés.',
    image: `${HOME}/Oliviers-recolte.png`,
    alt: 'Immersion et activités chez un producteur – TerraGo',
  },
  {
    title: 'Repas du',
    titleBold: 'terroir.',
    text: 'Tables locales, produits du lieu, cuisine de saison — un repas qui raconte le territoire.',
    image: `${HOME}/repas-convivial.webp`,
    alt: 'Repas du terroir chez un producteur – TerraGo',
  },
  {
    title: 'Repas',
    titleBold: 'guinguette.',
    text: 'Dans les champs, entre les vignes ou au milieu des oliviers — une table longue, conviviale, en plein air.',
    image: `${HOME}/pique-nique-convivial.webp`,
    alt: 'Repas guinguette dans les champs – TerraGo',
  },
] as const;

const COMMENT_CA_MARCHE = [
  {
    step: '01',
    title: 'Sur demande uniquement',
    text: 'Pas de catalogue en ligne pour l’instant : chaque expérience privée se construit avec vous, sur mesure.',
  },
  {
    step: '02',
    title: 'Dès 8 personnes',
    text: 'Tous nos séjours et expériences entreprises peuvent s’ouvrir aux particuliers à partir de 8 participants.',
  },
  {
    step: '03',
    title: 'On compose avec vous',
    text: 'Vous nous dites ce que vous cherchez — séjour, immersion ou repas — on vous propose le format adapté.',
  },
] as const;

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

const Particuliers: React.FC = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [portable, setPortable] = useState('');
  const [periode, setPeriode] = useState('');
  const [typeSejour, setTypeSejour] = useState('');
  const [villeDepart, setVilleDepart] = useState('');
  const [trajetMaxMinutes, setTrajetMaxMinutes] = useState<number>(120);
  const [villeSuggestions, setVilleSuggestions] = useState<Array<{ id?: string; place_name: string }>>([]);
  const [villeLoading, setVilleLoading] = useState(false);
  const [villeDropdownOpen, setVilleDropdownOpen] = useState(false);
  const villeDebounceRef = useRef<number | null>(null);
  const [participantsCount, setParticipantsCount] = useState<number>(MIN_PARTICIPANTS);
  const [precisions, setPrecisions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const q = villeDepart.trim();
    if (q.length < 2) {
      setVilleSuggestions([]);
      setVilleDropdownOpen(false);
      setVilleLoading(false);
      return;
    }

    if (villeDebounceRef.current) window.clearTimeout(villeDebounceRef.current);
    setVilleLoading(true);

    villeDebounceRef.current = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/ville-autocomplete?q=${encodeURIComponent(q)}`, {
          headers: { Accept: 'application/json' },
        });
        const data = (await res.json().catch(() => ({}))) as {
          suggestions?: Array<{ id?: string; place_name: string }>;
        };
        const suggestions = Array.isArray(data.suggestions) ? data.suggestions : [];
        setVilleSuggestions(suggestions);
        setVilleDropdownOpen(suggestions.length > 0);
      } catch {
        setVilleSuggestions([]);
        setVilleDropdownOpen(false);
      } finally {
        setVilleLoading(false);
      }
    }, 250);

    return () => {
      if (villeDebounceRef.current) window.clearTimeout(villeDebounceRef.current);
    };
  }, [villeDepart]);

  const formatMinutesAsHhMm = (totalMinutes: number) => {
    const m = Math.max(0, Math.round(totalMinutes));
    const h = Math.floor(m / 60);
    const mm = m % 60;
    const mmStr = String(mm).padStart(2, '0');
    return `${h}h${mmStr}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (typeSejour.trim() === '' || participantsCount < MIN_PARTICIPANTS) {
      setSubmitError(
        participantsCount < MIN_PARTICIPANTS
          ? `Minimum ${MIN_PARTICIPANTS} personnes pour une expérience privée.`
          : 'Champs obligatoires manquants.',
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          action: 'particuliers',
          nom,
          prenom,
          email,
          portable,
          periode,
          type_sejour: typeSejour,
          ville_depart: villeDepart,
          trajet_max: formatMinutesAsHhMm(trajetMaxMinutes),
          participants: participantsCount,
          precisions,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (response.ok && data.success) {
        setSubmitSuccess(true);
        setNom('');
        setPrenom('');
        setEmail('');
        setPortable('');
        setPeriode('');
        setTypeSejour('');
        setVilleDepart('');
        setTrajetMaxMinutes(120);
        setParticipantsCount(MIN_PARTICIPANTS);
        setPrecisions('');
      } else {
        setSubmitError(
          typeof data.message === 'string'
            ? data.message
            : `Une erreur est survenue. Veuillez réessayer ou nous contacter à ${CONTACT_EMAIL}`,
        );
      }
    } catch {
      setSubmitError(`Une erreur est survenue. Veuillez réessayer ou nous contacter à ${CONTACT_EMAIL}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const pickVille = (placeName: string) => {
    setVilleDepart(placeName);
    setVilleSuggestions([]);
    setVilleDropdownOpen(false);
  };

  const scrollToProjet = () => {
    document.getElementById('projet')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="overflow-x-hidden bg-white font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <style>{`
        @keyframes partSpin { to { transform: rotate(360deg); } }
        @keyframes partFade { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:none } }

        .part-i {
          width: 100%;
          box-sizing: border-box;
          background: #fff;
          border: 1px solid rgba(12, 29, 34, 0.14);
          border-radius: 12px;
          padding: 13px 16px;
          font-family: inherit;
          font-size: 14px;
          color: #0c1d22;
          letter-spacing: -0.02em;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .part-i:focus {
          border-color: #0c1d22;
          box-shadow: 0 0 0 3px rgba(12, 29, 34, 0.06);
        }
        .part-i::placeholder { color: #b3b3b3; }

        .part-pill {
          background: #fff;
          cursor: pointer;
          white-space: nowrap;
          border: 1px solid rgba(12, 29, 34, 0.14);
          border-radius: 10px;
          padding: 9px 16px;
          font-family: inherit;
          font-size: 13px;
          color: #0c1d22;
          letter-spacing: -0.02em;
          transition: all 0.15s ease;
        }
        .part-pill:hover { border-color: rgba(12, 29, 34, 0.35); }
        .part-pill[data-active="true"] {
          background: #0c1d22;
          border-color: #0c1d22;
          color: #fff;
        }

        .part-step {
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          border: none;
          border-radius: 50%;
          background: rgba(12, 29, 34, 0.05);
          color: #0c1d22;
          font-size: 17px;
          line-height: 1;
          cursor: pointer;
          font-family: inherit;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s ease;
        }
        .part-step:hover { background: rgba(12, 29, 34, 0.1); }

        .part-cta {
          border: none;
          border-radius: 9999px;
          background: #ec6435;
          color: #fff;
          font-family: inherit;
          font-size: 14px;
          letter-spacing: -0.03em;
          font-weight: 500;
          padding: 12px 28px;
          cursor: pointer;
          transition: background 0.18s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
        }
        .part-cta:hover { background: #d9552a; }
        .part-cta:disabled { opacity: 0.65; cursor: not-allowed; }

        .part-form-panel {
          width: 100%;
          max-width: 820px;
          margin: 0 auto;
          background: #fff;
          border-radius: 20px;
          padding: clamp(28px, 4vw, 44px);
          box-shadow: 0 24px 70px rgba(12, 29, 34, 0.12);
          animation: partFade 0.3s ease both;
        }
        .part-type-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
        }

        @media (min-width: 861px) {
          .part-cta { font-size: 15px; padding: 13px 36px; }
        }
        @media (max-width: 600px) {
          .part-grid-2 { grid-template-columns: 1fr !important; }
          .part-type-chips {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
          }
          .part-type-chips > .part-pill {
            width: 100%;
            white-space: normal;
            text-align: center;
            min-height: 3.25rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            line-height: 1.3;
          }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className={homeFramedHeroSectionClass}>
        <div className="mx-auto max-w-6xl px-5 pb-2 sm:px-8">
          <div
            className={`relative ${homeFramedHeroAspectClass}`}
            style={{ borderRadius: HOME_RADIUS }}
          >
            <FramedHeroImage
              src={ASSETS.hero}
              alt="Repas guinguette chez un producteur – expérience privée TerraGo"
            />
            <div className={`${bottomImageGradientClass} z-[1]`} />
            <div
              className="absolute inset-0 z-[2]"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.55) 100%)',
              }}
            />

            <div className={homeFramedHeroOverlayClass}>
              <div className={homeFramedHeroOverlayInnerClass}>
              <h1 className={`max-w-3xl text-center font-normal ${homeFramedHeroH1Class}`}>
                Expériences privées
                <br />
                <span className="font-bold">entre amis & en famille.</span>
              </h1>
              <h2 className={homeFramedHeroSubtitleClass}>
                Pour l’instant, uniquement sur demande. Nos séjours entreprises s’ouvrent aux particuliers à partir de 8 personnes.
              </h2>
              <button
                type="button"
                onClick={scrollToProjet}
                className={`mt-7 ${homeHeroOutlineButtonClass} sm:mt-9`}
                style={{ background: 'rgba(12, 29, 34, 0.12)' }}
              >
                Faire une demande
              </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section
        className="relative"
        style={{ paddingTop: homeSectionPadding, paddingBottom: homeSectionPadding, background: '#ffffff' }}
      >
        <Image
          src={ASSETS.ble}
          alt=""
          aria-hidden
          width={176}
          height={176}
          className="pointer-events-none absolute right-3 top-0 z-20 h-24 w-24 -translate-y-1/2 object-contain sm:right-8 sm:h-36 sm:w-36 lg:right-12 lg:h-44 lg:w-44"
        />

        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ScrollAnimate>
            <h2 className={`max-w-3xl ${sectionTitleClass}`}>
              Pour l’instant, <span className="font-bold">sur demande.</span>
            </h2>
          </ScrollAnimate>
          <ScrollAnimate delay={80}>
            <p className={`${homeParagraphClass} mt-5 max-w-2xl text-[15px] text-[#0c1d22]/65 sm:mt-6 sm:text-[16px]`}>
              TerraGo n’ouvre pas encore un catalogue d’expériences privées en ligne. En revanche, tous nos séjours et formats entreprises peuvent s’ouvrir à votre groupe — dès 8 personnes.
            </p>
          </ScrollAnimate>

          <div className="mt-12 grid grid-cols-1 gap-10 sm:mt-16 sm:grid-cols-3 sm:gap-8">
            {COMMENT_CA_MARCHE.map((item, i) => (
              <ScrollAnimate key={item.step} delay={i * 70}>
                <p
                  className="font-sans text-[13px] font-bold tracking-[-0.03em]"
                  style={{ color: HOME_COLORS.orange }}
                >
                  {item.step}
                </p>
                <h3 className="mt-3 font-sans text-[20px] font-bold leading-snug tracking-[-0.05em] text-[#0c1d22] sm:text-[22px]">
                  {item.title}
                </h3>
                <p className={`${homeParagraphClass} mt-3 text-[14px] text-[#0c1d22]/65 sm:text-[15px]`}>
                  {item.text}
                </p>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* ── CE QUE VOUS POUVEZ DEMANDER ── */}
      <section
        id="ce-que-vous-vivrez"
        className="relative scroll-mt-28"
        style={{ paddingTop: homeSectionPadding, paddingBottom: homeSectionPadding, background: HOME_COLORS.gray }}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ScrollAnimate>
            <h2 className={`max-w-3xl ${sectionTitleClass}`}>
              Ce que vous pouvez <span className="font-bold">demander.</span>
            </h2>
          </ScrollAnimate>
          <ScrollAnimate delay={80}>
            <p className={`${homeParagraphClass} mt-5 max-w-2xl text-[15px] text-[#0c1d22]/65 sm:mt-6 sm:text-[16px]`}>
              Séjours, activités, immersions et repas — les mêmes expériences que pour les entreprises, adaptées à votre groupe.
            </p>
          </ScrollAnimate>
        </div>

        <div className="mx-auto mt-10 max-w-6xl px-5 sm:mt-14 sm:px-8">
          <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {OFFRE_ITEMS.map((item, i) => (
              <ScrollAnimate key={`${item.title}-${item.titleBold}`} delay={i * 60} className="h-full">
                <div
                  className="group relative flex h-full min-h-[300px] flex-col items-center justify-center overflow-hidden px-5 text-center sm:min-h-[340px]"
                  style={{ borderRadius: HOME_RADIUS }}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.55) 100%)',
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/60" />
                  <div className="relative z-10 flex w-full flex-col items-center justify-center">
                    <h3 className="min-h-[2.6em] font-sans text-[24px] font-normal leading-[1.15] tracking-[-0.05em] text-white sm:text-[26px] lg:text-[28px]">
                      {item.title}{' '}
                      <span className="font-bold">{item.titleBold}</span>
                    </h3>
                    <p className="mt-3 max-w-[220px] font-sans text-[13px] leading-relaxed tracking-[-0.02em] text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-[14px]">
                      {item.text}
                    </p>
                  </div>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMULAIRE ── */}
      <section
        id="projet"
        className="relative scroll-mt-28"
        style={{ paddingTop: homeSectionPadding, paddingBottom: homeSectionPadding, background: '#ffffff' }}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-10 text-center sm:mb-14">
            <ScrollAnimate>
              <h2 className={sectionTitleClass}>
                Décrivez-nous <span className="font-bold">votre projet.</span>
              </h2>
            </ScrollAnimate>
            <ScrollAnimate delay={80}>
              <p className={`${homeParagraphClass} mx-auto mt-5 max-w-xl text-[15px] text-[#0c1d22]/65 sm:text-[16px]`}>
                À partir de {MIN_PARTICIPANTS} personnes — un message suffit, on revient vers vous avec une proposition.
              </p>
            </ScrollAnimate>
          </div>

          <ScrollAnimate delay={120}>
            <div className="part-form-panel">
                {submitSuccess ? (
                  <div className="flex min-h-[240px] flex-col items-center justify-center text-center">
                    <h3 className="m-0 font-sans text-[28px] font-normal leading-[1.25] tracking-[-0.05em] text-[#0c1d22] sm:text-[32px]">
                      <strong className="font-bold">Merci beaucoup !</strong>
                    </h3>
                    <p className="mt-6 m-0 font-sans text-[24px] font-normal leading-[1.25] tracking-[-0.05em] text-[#0c1d22] sm:text-[28px]">
                      On revient vers vous <strong className="font-bold">au plus vite.</strong>
                    </p>
                    <p className="mt-6 font-sans text-[15px] tracking-[-0.03em] text-[#0c1d22]">
                      L&apos;équipe TERRAGO
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                      <FieldBlock label="Nom" required>
                        <input className="part-i" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
                      </FieldBlock>
                      <FieldBlock label="Prénom" required>
                        <input className="part-i" placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                      </FieldBlock>
                      <FieldBlock label="Email" required>
                        <input className="part-i" type="email" placeholder="Adresse mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      </FieldBlock>
                      <FieldBlock label="Téléphone">
                        <input className="part-i" type="tel" placeholder="Numéro de téléphone" value={portable} onChange={(e) => setPortable(e.target.value)} />
                      </FieldBlock>
                    </div>

                    <div className="mb-3.5 grid grid-cols-1 gap-x-4 gap-y-3.5 sm:grid-cols-12">
                      <div className="sm:col-span-8">
                        <FieldBlock label="Période ou date souhaitée">
                          <input
                            className="part-i"
                            placeholder="Semaine du 15 août, ou dates précises"
                            value={periode}
                            onChange={(e) => setPeriode(e.target.value)}
                          />
                        </FieldBlock>
                      </div>
                      <div className="sm:col-span-4">
                        <FieldBlock label={`Nombre de personnes (min. ${MIN_PARTICIPANTS})`}>
                          <div className="flex items-center gap-2">
                            <StepperButton
                              label="Diminuer le nombre de personnes"
                              onClick={() => setParticipantsCount((n) => Math.max(MIN_PARTICIPANTS, n - 1))}
                            >
                              −
                            </StepperButton>
                            <input
                              className="part-i"
                              value={participantsCount}
                              readOnly
                              aria-label="Nombre de personnes"
                              style={{ textAlign: 'center', flex: 1, minWidth: 0 }}
                            />
                            <StepperButton
                              label="Augmenter le nombre de personnes"
                              onClick={() => setParticipantsCount((n) => Math.min(50, n + 1))}
                            >
                              +
                            </StepperButton>
                          </div>
                        </FieldBlock>
                      </div>
                    </div>

                    <div className="part-grid-2 mb-3.5 grid gap-3.5" style={{ gridTemplateColumns: '1fr 1fr' }}>
                      <FieldBlock label="Ville de départ">
                        <div className="relative">
                          <span className="pointer-events-none absolute left-4 top-4 z-[1] flex text-[#b3b3b3]">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                          </span>
                          <input
                            className="part-i"
                            style={{ paddingLeft: 38 }}
                            placeholder="Ville, région…"
                            value={villeDepart}
                            onChange={(e) => setVilleDepart(e.target.value)}
                            onFocus={() => setVilleDropdownOpen(villeSuggestions.length > 0)}
                            onBlur={() => {
                              window.setTimeout(() => setVilleDropdownOpen(false), 120);
                            }}
                            autoComplete="off"
                          />
                          {villeDropdownOpen && villeSuggestions.length > 0 && (
                            <ul
                              role="listbox"
                              className="absolute left-0 right-0 z-50 m-0 max-h-[220px] list-none overflow-auto bg-white p-1.5"
                              style={{
                                top: 'calc(100% + 4px)',
                                border: '1px solid rgba(12,29,34,0.12)',
                                borderRadius: 12,
                                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                              }}
                            >
                              {villeSuggestions.map((s) => (
                                <li key={s.id ?? s.place_name}>
                                  <button
                                    type="button"
                                    role="option"
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      pickVille(s.place_name);
                                    }}
                                    className="w-full cursor-pointer border-none bg-transparent px-3 py-2.5 text-left font-sans text-[13px] font-semibold tracking-[-0.02em] text-[#0c1d22]"
                                  >
                                    {s.place_name}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                          {villeLoading && (
                            <div className="absolute right-3 top-3 text-[11px] text-[#a5a5a5]">…</div>
                          )}
                        </div>
                      </FieldBlock>
                      <FieldBlock label="Temps de trajet max.">
                        <div className="flex items-center gap-2">
                          <StepperButton
                            label="Diminuer le temps de trajet de 30 minutes"
                            onClick={() => setTrajetMaxMinutes((m) => Math.max(0, m - 30))}
                          >
                            −
                          </StepperButton>
                          <input
                            className="part-i"
                            value={formatMinutesAsHhMm(trajetMaxMinutes)}
                            readOnly
                            aria-label="Temps maximum de trajet souhaité"
                            style={{ textAlign: 'center', flex: 1 }}
                          />
                          <StepperButton
                            label="Augmenter le temps de trajet de 30 minutes"
                            onClick={() => setTrajetMaxMinutes((m) => Math.min(24 * 60, m + 30))}
                          >
                            +
                          </StepperButton>
                        </div>
                      </FieldBlock>
                    </div>

                    <div className="mb-3.5">
                      <p className="mb-2.5 font-sans text-[13px] font-semibold tracking-[-0.02em] text-[#a5a5a5]">
                        Type de demande
                      </p>
                      <div className="part-type-chips">
                        {TYPE_DEMANDE_OPTIONS.map((opt) => (
                          <button
                            key={opt.label}
                            type="button"
                            className="part-pill"
                            data-active={typeSejour === opt.label}
                            onClick={() => setTypeSejour(typeSejour === opt.label ? '' : opt.label)}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-7">
                      <FieldBlock label="Précisions">
                        <textarea
                          className="part-i"
                          rows={3}
                          style={{ resize: 'none', lineHeight: 1.55 }}
                          placeholder="Région souhaitée, ambiance, budget, occasion…"
                          value={precisions}
                          onChange={(e) => setPrecisions(e.target.value)}
                        />
                      </FieldBlock>
                    </div>

                    {submitError && (
                      <p className="mb-3 text-center font-sans text-[13px] tracking-[-0.02em]" style={{ color: HOME_COLORS.orange }}>
                        {submitError}
                      </p>
                    )}

                    <div className="flex justify-center">
                      <button type="submit" disabled={isSubmitting} className="part-cta">
                        {isSubmitting && (
                          <span
                            className="inline-block h-3.5 w-3.5 rounded-full"
                            style={{
                              border: '2px solid rgba(255,255,255,.35)',
                              borderTopColor: '#fff',
                              animation: 'partSpin .7s linear infinite',
                            }}
                          />
                        )}
                        {isSubmitting ? 'Envoi…' : 'Envoyer ma demande'}
                      </button>
                    </div>
                  </form>
                )}
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* ── LIEN SÉMINAIRES ── */}
      <section
        style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(3rem, 6vw, 5rem)', background: HOME_COLORS.gray }}
      >
        <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
          <h2 className={`${sectionTitleClass} text-[28px] sm:text-[34px]`}>
            Envie d’idées <span className="font-bold">concrètes ?</span>
          </h2>
          <p className={`${homeParagraphClass} mx-auto mt-4 mb-8 max-w-lg text-[14px] text-[#0c1d22]/65 sm:text-[15px]`}>
            Parcourez nos séjours et expériences entreprises — ce sont exactement ceux qu’on peut ouvrir à votre groupe, sur demande.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/seminaires-entreprise" className={homeCtaOutlineClass}>
              Voir les séminaires
            </Link>
            <Link href="/experiences-entreprise" className={homeCtaOutlineClass}>
              Voir les expériences
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const FieldBlock: React.FC<{ label: string; required?: boolean; children: React.ReactNode }> = ({
  label,
  required,
  children,
}) => (
  <div className="flex flex-col">
    <label className="mb-2 block font-sans text-[13px] font-semibold tracking-[-0.02em] text-[#a5a5a5]">
      {label}
      {required && <span className="ml-0.5" style={{ color: HOME_COLORS.orange }}>*</span>}
    </label>
    {children}
  </div>
);

const StepperButton: React.FC<{
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ label, onClick, children }) => (
  <button type="button" onClick={onClick} aria-label={label} className="part-step">
    {children}
  </button>
);

export default Particuliers;
