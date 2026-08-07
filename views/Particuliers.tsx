'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  HOME_COLORS,
  HOME_RADIUS,
  homeParagraphClass,
  homeSectionPadding,
  bottomImageGradientClass,
  homeHeroOutlineButtonClass,
  homeCtaOutlineClass,
} from '../components/home/homeStyles';

const HOME =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME';

const ASSETS = {
  hero: `${HOME}/pique-nique-convivial.png`,
  ble: `${HOME}/emoji/ble.png`,
} as const;

const sectionTitleClass =
  'font-sans text-[34px] font-normal leading-[1.08] tracking-[-0.075em] text-[#0c1d22] sm:text-[40px] lg:text-[48px]';

const CONTACT_EMAIL = 'terragoexperiences@gmail.com';

const TYPE_SEJOURS_OPTIONS = [
  { label: 'EVG / EVJF' },
  { label: 'Week-end copains' },
  { label: 'Séjour en famille' },
  { label: 'Séjour nature / gastronomie' },
];

const VIVRE_ITEMS = [
  {
    label: 'Rencontres authentiques',
    text: 'Partez à la rencontre de producteurs passionnés qui vous ouvrent les portes de leur monde avec sincérité.',
    image:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/comte-producteur.jpg',
    alt: 'Rencontre authentique chez un producteur terroir – TerraGo',
  },
  {
    label: 'Les mains dans la terre',
    text: 'Récolter, fabriquer, goûter… Des activités vraies, au rythme des saisons et des savoir-faire locaux.',
    image: `${HOME}/Oliviers-recolte.png`,
    alt: 'Activité mains dans la terre séjour terroir – TerraGo',
  },
  {
    label: 'Repas du terroir',
    text: 'Des repas pensés autour des producteurs locaux. Chaque assiette raconte une histoire.',
    image: `${HOME}/repas-convivial.png`,
    alt: 'Repas gastronomique terroir local – TerraGo',
  },
  {
    label: 'Clé en main',
    text: 'Logement, activités, repas, transport… Une logistique invisible pour une expérience inoubliable.',
    image: `${HOME}/hotel-typique.jpg`,
    alt: 'Séjour clé en main entre amis France – TerraGo',
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
  const [participantsCount, setParticipantsCount] = useState<number>(10);
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

    if (typeSejour.trim() === '' || participantsCount < 1) {
      setSubmitError('Champs obligatoires manquants.');
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
        setParticipantsCount(10);
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
        .part-i {
          width: 100%;
          background: #f4f4f4;
          border: 1px solid rgba(12, 29, 34, 0.08);
          border-radius: 12px;
          padding: 12px 16px;
          font-family: inherit;
          font-size: 13px;
          color: #0c1d22;
          outline: none;
          transition: all .18s ease;
          box-sizing: border-box;
        }
        .part-i:focus {
          border-color: #0c1d22;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(12, 29, 34, 0.06);
        }
        .part-i::placeholder { color: rgba(12, 29, 34, 0.35); }
        @keyframes partSpin { to { transform: rotate(360deg); } }
        .part-type-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .part-type-chips > button {
          width: auto;
          max-width: 100%;
          padding: 6px 14px;
          box-sizing: border-box;
        }
        @media (max-width: 600px) {
          .part-grid-2 { grid-template-columns: 1fr !important; }
          .part-type-chips {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
            align-items: stretch;
          }
          .part-type-chips > button {
            width: 100%;
            max-width: none;
            min-width: 0;
            min-height: 4rem;
            padding: 10px 8px;
            justify-content: center;
            text-align: center;
            line-height: 1.35;
          }
        }
      `}</style>

      {/* ── HERO (même structure que Séminaires) ── */}
      <section className="relative w-full bg-white pt-[calc(7.5rem+env(safe-area-inset-top))] sm:pt-[calc(9rem+env(safe-area-inset-top))] lg:pt-[calc(10.5rem+env(safe-area-inset-top))]">
        <div className="mx-auto max-w-6xl px-5 pb-2 sm:px-8">
          <div
            className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[2.2/1]"
            style={{ borderRadius: HOME_RADIUS }}
          >
            <img
              src={ASSETS.hero}
              alt="Pique-nique convivial chez un producteur – expérience privée TerraGo"
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

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 pt-12 text-center sm:px-10 sm:pt-16 lg:pt-20">
              <h1 className="max-w-3xl text-center font-sans text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.02] tracking-[-0.075em] text-white">
                Des expériences privées
                <br />
                <span className="font-bold">sur mesure.</span>
              </h1>
              <h2 className="mt-4 max-w-xl text-center font-sans text-[15px] font-normal leading-relaxed tracking-[-0.04em] text-white/90 sm:mt-6 sm:text-[17px]">
                Activités et repas authentiques chez des producteurs français — entre amis ou en famille.
              </h2>
              <button
                type="button"
                onClick={scrollToProjet}
                className={`mt-7 ${homeHeroOutlineButtonClass} sm:mt-9`}
                style={{ background: 'rgba(12, 29, 34, 0.12)' }}
              >
                Parler de mon projet
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CE QUE VOUS VIVREZ ── */}
      <section
        id="ce-que-vous-vivrez"
        className="relative scroll-mt-28"
        style={{ paddingTop: homeSectionPadding, paddingBottom: homeSectionPadding, background: '#ffffff' }}
      >
        <img
          src={ASSETS.ble}
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-3 top-0 z-20 h-24 w-24 -translate-y-1/2 object-contain sm:right-8 sm:h-36 sm:w-36 lg:right-12 lg:h-44 lg:w-44"
        />

        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ScrollAnimate>
            <h2 className={`max-w-3xl ${sectionTitleClass}`}>
              Chaque séjour <span className="font-bold">vous garantit.</span>
            </h2>
          </ScrollAnimate>
          <ScrollAnimate delay={80}>
            <p className={`${homeParagraphClass} mt-5 max-w-2xl text-[15px] text-[#0c1d22]/65 sm:mt-6 sm:text-[16px]`}>
              Immersion chez des producteurs engagés, activités vraies et organisation clé en main —
              pour un moment qui reste.
            </p>
          </ScrollAnimate>
        </div>

        <div className="mx-auto mt-10 max-w-6xl px-5 sm:mt-14 sm:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VIVRE_ITEMS.map((item, i) => (
              <ScrollAnimate key={item.label} delay={i * 60}>
                <div
                  className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden sm:min-h-[320px]"
                  style={{ borderRadius: HOME_RADIUS }}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 45%, transparent 70%)',
                    }}
                  />
                  <div className="relative z-10 px-5 pb-6 pt-16">
                    <h3 className="font-sans text-[16px] font-bold leading-snug tracking-[-0.04em] text-white sm:text-[17px]">
                      {item.label}
                    </h3>
                    <p className="mt-2 max-w-[240px] font-sans text-[13px] leading-relaxed tracking-[-0.02em] text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-[14px]">
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
        style={{ paddingTop: homeSectionPadding, paddingBottom: homeSectionPadding, background: HOME_COLORS.gray }}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-10 text-center sm:mb-14">
            <ScrollAnimate>
              <h2 className={sectionTitleClass}>
                Parlons de votre <span className="font-bold">séjour.</span>
              </h2>
            </ScrollAnimate>
            <ScrollAnimate delay={80}>
              <p className={`${homeParagraphClass} mx-auto mt-5 max-w-xl text-[15px] text-[#0c1d22]/65 sm:text-[16px]`}>
                Un message suffit — nous construisons le reste avec vous.
              </p>
            </ScrollAnimate>
          </div>

          <ScrollAnimate delay={120}>
            {submitSuccess ? (
              <div
                className="mx-auto w-full max-w-xl text-center lg:max-w-5xl"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(12, 29, 34, 0.07)',
                  borderRadius: HOME_RADIUS,
                  padding: '48px 32px',
                }}
              >
                <div
                  className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
                  style={{ background: HOME_COLORS.primary }}
                >
                  <svg width="28" height="28" viewBox="0 0 34 34" fill="none" aria-hidden>
                    <path d="M8 17.5L14 23.5L26 11" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-sans text-[26px] font-bold tracking-[-0.04em] text-[#0c1d22]">
                  Demande envoyée !
                </h3>
                <p className={`${homeParagraphClass} mt-2`}>Nous vous recontacterons très prochainement.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mx-auto w-full max-w-xl lg:max-w-5xl xl:max-w-6xl"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(12, 29, 34, 0.06)',
                  borderRadius: HOME_RADIUS,
                  padding: 'clamp(24px, 4vw, 40px)',
                }}
              >
                {submitError && (
                  <div
                    className="mb-5 flex items-center gap-2.5 rounded-full px-4 py-2.5"
                    style={{
                      background: 'rgba(236, 100, 53, 0.07)',
                      border: '1px solid rgba(236, 100, 53, 0.2)',
                    }}
                  >
                    <p className="m-0 text-[11px] font-semibold" style={{ color: HOME_COLORS.orange }}>
                      {submitError}
                    </p>
                  </div>
                )}

                <div className="mb-3.5 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
                  <FieldBlock label="Nom" required>
                    <input className="part-i" placeholder="Dupont" value={nom} onChange={(e) => setNom(e.target.value)} required />
                  </FieldBlock>
                  <FieldBlock label="Prénom" required>
                    <input className="part-i" placeholder="Jean" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                  </FieldBlock>
                  <FieldBlock label="Email" required>
                    <input className="part-i" type="email" placeholder="votre@email.fr" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </FieldBlock>
                  <FieldBlock label="Téléphone">
                    <input className="part-i" type="tel" placeholder="06 12 34 56 78" value={portable} onChange={(e) => setPortable(e.target.value)} />
                  </FieldBlock>
                </div>

                <div className="mb-3.5 grid grid-cols-1 gap-x-5 gap-y-4 lg:grid-cols-12">
                  <div className="lg:col-span-8">
                    <FieldBlock label="Période ou date souhaitée">
                      <input
                        className="part-i"
                        placeholder="Ex. semaine du 15 août, ou dates précises"
                        value={periode}
                        onChange={(e) => setPeriode(e.target.value)}
                      />
                    </FieldBlock>
                  </div>
                  <div className="lg:col-span-4">
                    <FieldBlock label="Nombre de personnes">
                      <div className="flex items-center gap-2.5">
                        <StepperButton
                          label="Diminuer le nombre de personnes"
                          onClick={() => setParticipantsCount((n) => Math.max(1, n - 1))}
                        >
                          -
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
                      <input
                        className="part-i"
                        placeholder="Ex. Lyon, Nantes…"
                        value={villeDepart}
                        onChange={(e) => setVilleDepart(e.target.value)}
                        onFocus={() => setVilleDropdownOpen(villeSuggestions.length > 0)}
                        onBlur={() => {
                          window.setTimeout(() => setVilleDropdownOpen(false), 120);
                        }}
                      />
                      {villeDropdownOpen && villeSuggestions.length > 0 && (
                        <div
                          className="absolute left-0 right-0 z-50 max-h-[260px] overflow-auto bg-white"
                          style={{
                            top: 'calc(100% + 6px)',
                            border: '1px solid rgba(12, 29, 34, 0.10)',
                            borderRadius: 14,
                            boxShadow: '0 18px 60px rgba(0,0,0,0.10)',
                          }}
                        >
                          {villeSuggestions.map((s) => (
                            <button
                              key={s.id ?? s.place_name}
                              type="button"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                pickVille(s.place_name);
                              }}
                              className="w-full cursor-pointer border-none bg-transparent px-3 py-2.5 text-left font-sans text-[13px] text-[#0c1d22]"
                            >
                              {s.place_name}
                            </button>
                          ))}
                        </div>
                      )}
                      {villeLoading && (
                        <div className="absolute right-3 top-3 text-xs text-[#0c1d22]/40">Chargement...</div>
                      )}
                    </div>
                  </FieldBlock>
                  <FieldBlock label="Temps maximum de trajet souhaité">
                    <div className="flex items-center gap-2.5">
                      <StepperButton
                        label="Diminuer le temps de trajet de 30 minutes"
                        onClick={() => setTrajetMaxMinutes((m) => Math.max(0, m - 30))}
                      >
                        -
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
                  <label className="mb-2.5 block text-[9px] font-bold uppercase tracking-[0.18em] text-[#0c1d22]/40">
                    Type de séjour / week-end
                  </label>
                  <div className="part-type-chips">
                    {TYPE_SEJOURS_OPTIONS.map((opt) => {
                      const active = typeSejour === opt.label;
                      return (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => setTypeSejour(active ? '' : opt.label)}
                          className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-[0.06em] transition-all duration-150"
                          style={{
                            border: `1.5px solid ${active ? HOME_COLORS.primary : 'rgba(12, 29, 34, 0.1)'}`,
                            background: active ? HOME_COLORS.primary : '#fff',
                            color: active ? '#fff' : 'rgba(12, 29, 34, 0.55)',
                          }}
                        >
                          {active && <span className="text-[8px]">✓</span>}
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-6">
                  <FieldBlock label="Précisions">
                    <textarea
                      className="part-i"
                      rows={4}
                      style={{ resize: 'none', lineHeight: 1.6 }}
                      placeholder="Type de logement, prix envisagé, éléments importants, activités fun, etc."
                      value={precisions}
                      onChange={(e) => setPrecisions(e.target.value)}
                    />
                  </FieldBlock>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-full border-none px-7 py-3.5 font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-opacity"
                  style={{
                    background: HOME_COLORS.primary,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="inline-block h-3.5 w-3.5 rounded-full"
                        style={{
                          border: '2px solid rgba(255,255,255,.3)',
                          borderTopColor: '#fff',
                          animation: 'partSpin .7s linear infinite',
                        }}
                      />
                      Envoi…
                    </>
                  ) : (
                    <>
                      Envoyer ma demande
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </ScrollAnimate>
        </div>
      </section>

      {/* ── LIEN SÉMINAIRES ── */}
      <section
        style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(3rem, 6vw, 5rem)', background: '#ffffff' }}
      >
        <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
          <p className={`${homeParagraphClass} mb-6 text-[14px]`}>
            En attendant, découvrez notre offre pour les entreprises et les groupes.
          </p>
          <Link href="/seminaires-entreprise" className={homeCtaOutlineClass}>
            Découvrir nos séminaires
          </Link>
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
    <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.18em] text-[#0c1d22]/40">
      {label}
      {required && <span className="ml-1" style={{ color: HOME_COLORS.orange }}>*</span>}
    </label>
    {children}
  </div>
);

const StepperButton: React.FC<{
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ label, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white font-sans text-lg font-bold leading-none text-[#0c1d22]"
    style={{ border: '1.5px solid rgba(12, 29, 34, 0.12)' }}
  >
    {children}
  </button>
);

export default Particuliers;
