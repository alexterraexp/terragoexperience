'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ScrollAnimate from '../components/ScrollAnimate';

/* ─────────────────────────────────────────────
   PRODUCER STACK
───────────────────────────────────────────── */
const ProducerStack: React.FC = () => {
  const producers = [
    { name: 'Jean-François', job: 'Cognac & Pineau', image: '/images/producteurs/cognacJF.png', alt: 'Jean-François, producteur cognac et pineau – Terrago' },
    { name: 'Paolo', job: 'Olives - Lavande - Fruitiers', image: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/OLIVEPAOLO/PAOLO1.jpg', alt: 'Paolo, producteur olives et lavande Provence – Terrago' },
    { name: 'Sabine & Marie-Lise', job: 'Noix - Lavande - Olives', image: '/images/producteurs/noixsabinemarie.jpeg', alt: 'Sabine et Marie-Lise, productrices noix et lavande – Terrago' },
    { name: 'Marie-Sophie & Thomas', job: 'Vins du Ventoux', image: '/images/producteurs/vincombeaumas.png', alt: 'Marie-Sophie et Thomas, vignerons Ventoux – Terrago' },
    { name: 'Nathalie & Benjamin', job: 'Noisettes - Amandes - Yuzu', image: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/solproducteurs.png', alt: 'Nathalie et Benjamin, producteurs noisettes – Terrago' },
    { name: 'Baptiste', job: 'Piments & Pommes ', image: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/pimentsbaptiste/b5.png', alt: 'Baptiste, producteur piments Pays Basque – Terrago' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);

  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const isTouchDevice = useRef(false);

  const goNext = () => {
    if (animating) return;
    setAnimating(true);
    setExitingIndex(activeIndex);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % producers.length);
      setExitingIndex(null);
      setAnimating(false);
    }, 500);
  };

  const goTo = (i: number) => {
    if (animating || i === activeIndex) return;
    setAnimating(true);
    setExitingIndex(activeIndex);
    setTimeout(() => {
      setActiveIndex(i);
      setExitingIndex(null);
      setAnimating(false);
    }, 500);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isTouchDevice.current = true;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > deltaY) {
      goNext();
    }
  };

  return (
    <div
      className="relative flex items-center justify-center w-full"
      style={{ height: '560px' }}
      onMouseEnter={() => { if (!isTouchDevice.current) setHovered(true); }}
      onMouseLeave={() => { if (!isTouchDevice.current) setHovered(false); }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-[360px] mx-auto lg:w-full lg:mx-0" style={{ height: '560px' }}>
      <style>{`
        @keyframes sendToBack {
  0%   { transform: translateX(0px)  translateY(0px)  rotate(0deg)  scale(1);    opacity: 1; z-index: 20; }
  100% { transform: translateX(60px) translateY(40px) rotate(8deg)  scale(0.7);  opacity: 0; z-index: 16; }
}
@keyframes comeForward {
  0%   { transform: translateX(18px)  translateY(20px) rotate(6deg)   scale(0.96); transform-origin: bottom center; }
  60%  { transform: translateX(-3px)  translateY(-4px) rotate(-1deg)  scale(1.01); transform-origin: bottom center; }
  100% { transform: translateX(0px)   translateY(0px)  rotate(0deg)   scale(1);    transform-origin: bottom center; }
}
.card-send-back { animation: sendToBack  0.3s cubic-bezier(0.4, 0, 1, 1) forwards; }
.card-come-fwd  { animation: comeForward 0.4s cubic-bezier(0.2, 0, 0.2, 1) 0.05s both; }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.2; transform: scaleY(0.8); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1); transform-origin: top; }
        }
        @media (max-width: 1023px) {
          .producer-card-hidden-mobile { opacity: 0; visibility: hidden; pointer-events: none; z-index: 0; }
        }
        @media (hover: none) {
          .producer-hover-arrow { display: none !important; }
        }
      `}</style>

      {producers.map((person, i) => {
        const offset = (i - activeIndex + producers.length) % producers.length;
        const isActive    = offset === 0;
        const isExiting   = i === exitingIndex;
        const behind      = offset;
        const isPromoting = animating && !isExiting && offset === 1;

        if (!isActive && !isExiting && behind > 5) return null;

        const staticTransform = isActive && !isExiting
          ? 'translateX(0px) translateY(0px) rotate(0deg) scale(1)'
          : `translateX(${behind * 18}px) translateY(${behind * -4}px) rotate(${behind * 6}deg) scale(${1 - behind * 0.04})`;
 
        const hiddenOnMobile = behind > 0 && !isExiting && !isPromoting;
        return (
          <div
            key={person.name}
            className={`${isExiting ? 'card-send-back' : isPromoting ? 'card-come-fwd' : ''} ${hiddenOnMobile ? 'producer-card-hidden-mobile' : ''}`}
            style={{
              position: 'absolute',
              width: '360px',
              height: '480px',
              borderRadius: '20px',
              overflow: 'hidden',
              transformOrigin: 'bottom center',
              cursor: isActive ? 'pointer' : 'default',
              boxShadow: isActive && !isExiting
                ? '0 32px 80px rgba(0,0,0,0.18)'
                : '0 8px 24px rgba(0,0,0,0.10)',
              zIndex: isExiting ? 20 : isActive ? 20 : 10 - behind,
              transform: isExiting || isPromoting ? undefined : staticTransform,
              transition: isExiting || isPromoting ? 'none' : 'transform 0.5s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease',
            }}
            onClick={isActive ? () => { if (!isTouchDevice.current) goNext(); } : undefined}
          >
            <img
              src={person.image}
              alt={person.alt ?? person.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />

            {isActive && !isExiting && (
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.60) 0%, transparent 100%)',
                padding: '40px 28px 28px',
              }}>
                <p style={{ fontWeight: 700, color: '#fff', fontSize: 16, margin: 0, letterSpacing: '0.01em' }}>
                  {person.name}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', margin: '6px 0 0', fontWeight: 600 }}>
                  {person.job}
                </p>
              </div>
            )}

            {isActive && !isExiting && (
              <div className="producer-hover-arrow" style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                paddingRight: 24,
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none',
              }}>
                <div style={{
                  background: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '50%',
                  width: 44, height: 44,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a2e1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6, zIndex: 30 }}>
        {producers.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === activeIndex ? 24 : 6, height: 6,
              borderRadius: 3,
              background: i === activeIndex ? '#e67e22' : '#c8c0b4',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
      </div>
    </div>
  );
};

const HOME_ROTATING_METIERS = [
  'producteurs.', 'éleveurs.', 'artisans.', 'vignerons.', 'fromagers.',
  'maraîchers.', 'apiculteurs.', 'ostréiculteurs.', 'paysans.', 'brasseurs.',
  'distillateurs.', 'arboriculteurs.', 'oléiculteurs.', 'saliculteurs.',
] as const;

const HERO_IMAGES = [
  { src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/heroimages/lavandepaysage.png', alt: 'Paysage de lavande en Provence – Terrago' },
  { src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/heroimages/olives-recoltes.png', alt: 'Récolte des olives en oliveraie – Terrago' },
  { src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/heroimages/maraichage.png', alt: 'Maraîchage et légumes de saison – Terrago' },
  { src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/heroimages/ostreiculteurs.png', alt: 'Ostréiculture et parcs à huîtres – Terrago' },
  { src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/heroimages/nature-table.png', alt: 'Table et partage autour du terroir – Terrago' },
  { src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/heroimages/fromage-chevre.png', alt: 'Fromage de chèvre artisanal – Terrago' },
] as const;

/* ─────────────────────────────────────────────
   HOME
───────────────────────────────────────────── */
const Home: React.FC = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setHeroImageIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, 10_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const currentText = HOME_ROTATING_METIERS[currentTextIndex];
    let cancelled = false;
    const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

    const runCycle = async () => {
      setDisplayedText('');
      setIsTyping(true);
      for (let i = 1; i <= currentText.length; i++) {
        if (cancelled) return;
        setDisplayedText(currentText.slice(0, i));
        await sleep(160);
      }
      if (cancelled) return;
      setIsTyping(false);
      await sleep(2200);
      if (cancelled) return;
      setIsTyping(true);
      for (let i = currentText.length - 1; i >= 0; i--) {
        if (cancelled) return;
        setDisplayedText(currentText.slice(0, i));
        await sleep(75);
      }
      if (cancelled) return;
      setDisplayedText('');
      setIsTyping(false);
      await sleep(350);
      if (cancelled) return;
      setCurrentTextIndex((prev) => (prev + 1) % HOME_ROTATING_METIERS.length);
    };

    void runCycle();
    return () => {
      cancelled = true;
    };
  }, [currentTextIndex]);

  return (
    <div className="overflow-x-hidden bg-beige-bg">

      {/* ── HERO ── */}
      <section className="relative w-full">
        <div className="relative min-h-screen w-full overflow-hidden flex items-start sm:items-center justify-center pt-32 sm:pt-0">
          {HERO_IMAGES.map((img, i) => (
            <img
              key={img.src}
              src={img.src}
              alt=""
              decoding="async"
              fetchPriority={i <= 2 ? 'high' : 'low'}
              loading={i <= 2 ? 'eager' : 'lazy'}
              className="absolute inset-0 h-full w-full object-cover pointer-events-none transition-opacity duration-[900ms] ease-out"
              style={{
                opacity: i === heroImageIndex ? 1 : 0,
                zIndex: i === heroImageIndex ? 1 : 0,
              }}
              aria-hidden={i !== heroImageIndex}
            />
          ))}
          <span className="sr-only">{HERO_IMAGES[heroImageIndex]?.alt}</span>
          <div className="absolute inset-0 z-[2]" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.09) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.28) 100%)' }} />

          <div className="relative z-10 w-full max-w-5xl mx-auto px-3 sm:px-5 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.40)' }} />
              <span style={{ color: 'rgba(255,255,255,0.60)', fontSize: 10, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase' }}>
                Terroir français
              </span>
              <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.40)' }} />
            </div>

            <h1 className="text-white font-bold leading-[1.18] mb-20 drop-shadow-xl">
              <span className="sm:hidden block text-[2rem] font-sans tracking-tight leading-[1.24]">
              Des séminaires et séjours engagés, à la rencontre de nos{" "}
                <span
                  className="inline-block"
                  style={{
                    background: 'rgba(255,255,255,0.98)',
                    borderRadius: '6px',
                    padding: '3px 2px 2px 4px',
                    color: '#e67e22',
                    fontFamily: 'Poppins, sans-serif',
                    fontStyle: 'italic',
                    fontWeight: 700,
                    lineHeight: 'inherit',
                    fontSize: '0.96em',
                  }}
                >
                  {'\u00A0'}{displayedText}
                  <span style={{ opacity: isTyping ? 1 : 0, transition: 'opacity 0.1s', color: '#e67e22' }}>|</span>
                </span>
              </span>
              <span className="hidden sm:block space-y-2">
                <span className="block font-sans font-bold text-4xl md:text-5xl lg:text-5xl leading-[1.15]" style={{ letterSpacing: '-0.01em' }}>
                Séminaires d'entreprise immersifs,{' '}
                </span>
                <span className="block font-sans text-4xl md:text-5xl lg:text-5xl font-bold italic leading-[1.15]" style={{ letterSpacing: '-0.02em' }}>
                 à la rencontre de nos{'\u00A0'}
                  <span
                    className="relative inline-block"
                    style={{
                      verticalAlign: 'baseline',
                      marginLeft: '0.18em',
                      background: 'rgba(255,255,255,0.98)',
                      borderRadius: '12px',
                      padding: '4px 3px 3px 5px',
                      color: '#e67e22',
                      fontFamily: 'Poppins, sans-serif',
                      fontStyle: 'italic',
                      fontWeight: 700,
                      lineHeight: 'inherit',
                      fontSize: '0.96em',
                    }}
                  >
                    {'\u00A0'}{displayedText}
                    <span style={{ opacity: isTyping ? 1 : 0, transition: 'opacity 0.1s' }}>|</span>
                  </span>
                </span>
              </span>
            </h1>
          <h1 className="sr-only">
            Des séminaires immersifs chez des producteurs du terroir français – Terrago
          </h1>

            <p
              className="hidden sm:block text-sm max-w-xl mx-auto mb-10 leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.72)', fontWeight: 500 }}
            >
            Team buildings, séminaires, ateliers et séjours immersifs au cœur des oliveraies, vignobles, fromageries et maraîchages français.
             </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
              <Link
                href="/seminaires-entreprise"
                className="text-white border border-white/100 hover:border-white/90 px-7 py-3 text-[10px] uppercase tracking-[0.22em] font-bold transition-all duration-300 bg-transparent hover:bg-white/15 hover:backdrop-blur-[1px] rounded-full"
              >
                Séminaires d'entreprise
              </Link>
              <Link
                href="/entre-amis"
                className="text-[10px] uppercase tracking-[0.22em] font-bold transition-all duration-300 px-4 py-3"
                style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgb(255, 255, 255)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)')}
              >
                Séjours entre amis →
              </Link>
            </div>
          </div>

          <div
            className="absolute z-20 flex items-center gap-2.5 bottom-8 sm:bottom-10 right-4 sm:right-6 lg:right-8"
            role="tablist"
            aria-label="Images du bandeau d’accueil"
          >
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === heroImageIndex}
                aria-label={`Image ${i + 1} sur ${HERO_IMAGES.length}`}
                onClick={() => setHeroImageIndex(i)}
                className={`shrink-0 rounded-full p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent transition-[width,background-color,border-color,opacity] duration-300 ease-out ${
                  i === heroImageIndex
                    ? 'h-2 w-8 bg-white border-2 border-white'
                    : 'h-2 w-2 bg-transparent border-2 border-white opacity-90 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── NOTRE VISION ── */}
      <section className="bg-white" style={{ paddingTop: 'clamp(5rem, 10vw, 9rem)', paddingBottom: 'clamp(5rem, 10vw, 9rem)' }} id="notre-vision">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            <div className="relative">
              <div style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '4/5' }} className="shadow-2xl">
                <img src="https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/olivesrecoltes.JPG" alt="Immersion vendange terroir français – Terrago" className="w-full h-full object-cover" />
              </div>
              <div style={{
                position: 'absolute', bottom: -20, right: -20,
                background: '#e67e22', color: 'white',
                borderRadius: '16px', padding: '16px 20px',
                boxShadow: '0 12px 40px rgba(230,126,34,0.25)',
                textAlign: 'center',
              }}>
                <p className="font-display italic font-bold leading-none" style={{ fontSize: 26 }}>100%</p>
                <p style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.22em', fontWeight: 700, marginTop: 6 }}>Terroir français</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-7">
                <div style={{ width: 20, height: 1, background: '#e67e22' }} />
                <span style={{ fontSize: 9, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', color: '#e67e22' }}>Notre vision</span>
              </div>
              <ScrollAnimate delay={100}>
                <h2 className="font-bold text-primary leading-[1.06] mb-7" style={{ letterSpacing: '-0.01em' }}>
                  <span className=" font-sans text-4xl sm:text-5xl">Une envie simple :</span>
                  <span className=" font-display italic text-5xl sm:text-5xl lg:text-6xl"> vivre le terroir pour de vrai.</span>
                </h2>
              </ScrollAnimate>
              <div className="space-y-4" style={{ color: '#7a7060', fontSize: 15, lineHeight: 1.75 }}>
                <p>Terrago est né d'une envie simple : permettre à chacun de vivre des expériences authentiques, humaines et enrichissantes au plus près de celles et ceux qui font le terroir.</p>
                <p>Nous croyons que les plus beaux moments se vivent en groupe, dans des lieux vrais, en partageant des savoir-faire, du temps et des histoires.</p>
                <p>Qu'il s'agisse d'un séminaire au vert, d'un séjour entre amis ou d'une expérience immersive à la journée, Terrago crée des rencontres qui reconnectent à l'essentiel.</p>
              </div>
              <Link
                href="/seminaires-entreprise"
                className="inline-block mt-9 text-[10px] uppercase tracking-[0.22em] font-bold transition-all duration-300"
                style={{ color: '#1a2e1a', borderBottom: '1.5px solid #1a2e1a', paddingBottom: 3 }}
                onMouseEnter={e => { e.currentTarget.style.color = '#e67e22'; e.currentTarget.style.borderBottomColor = '#e67e22'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#1a2e1a'; e.currentTarget.style.borderBottomColor = '#1a2e1a'; }}
              >
                Découvrir nos séminaires d'entreprise →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORMATS ── */}
      <section className="bg-beige-bg" style={{ paddingTop: 'clamp(5rem, 10vw, 9rem)', paddingBottom: 'clamp(5rem, 10vw, 9rem)' }} id="formats">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div style={{ width: 20, height: 1, background: '#e67e22' }} />
              <span style={{ fontSize: 9, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', color: '#e67e22' }}>Formats</span>
            </div>
            <ScrollAnimate delay={100}>
              <h2 className="font-bold text-primary leading-[1.06]" style={{ letterSpacing: '-0.01em' }}>
                <span className=" font-sans text-4xl sm:text-5xl">Des formats pour tous</span>
                <span className=" font-display italic text-5xl sm:text-5xl lg:text-6xl"> les moments de vie</span>
              </h2>
            </ScrollAnimate>
            <p className="mt-4 max-w-md" style={{ color: '#9a9080', fontSize: 14, lineHeight: 1.7 }}>
              Une même philosophie, plusieurs façons de la vivre.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/seminaires-entreprise" className="group relative bg-white overflow-hidden flex flex-col hover:-translate-y-1 transition-all duration-300" style={{ borderRadius: '20px', boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
              <div className="overflow-hidden" style={{ borderRadius: '20px 20px 0 0' }}>
                <div className="aspect-[4/3]">
                  <img src="https://images.unsplash.com/photo-1605673349798-5580680c4dea?q=80&w=800&auto=format&fit=crop" alt="Séminaire nature entreprise chez un producteur – Terrago" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="font-sans font-bold text-primary text-sm mb-1 group-hover:text-orange transition-colors">Séminaires d'entreprise</span>
                <span style={{ fontSize: 11, color: '#9a9080' }}>Séminaire nature &amp; terroir engagé</span>
                <span className="mt-auto pt-4 text-[9px] uppercase tracking-[0.22em] font-bold" style={{ color: '#e67e22' }}>Disponible →</span>
              </div>
            </Link>
            {[
              { label: 'Séjours en groupe', sub: 'Entre amis, en famille', img: 'https://images.unsplash.com/photo-1683772769298-b77177c029d8?q=80&w=800&auto=format&fit=crop', alt: 'Séjour immersif terroir entre amis – Terrago' },
              { label: 'Aventures des terroirs', sub: 'Multi-destinations', img: 'https://images.unsplash.com/photo-1710330336476-d6027e6035cd?q=80&w=800&auto=format&fit=crop', alt: 'Expérience terroir multi-destinations France – Terrago' },
              { label: 'Immersions à la journée', sub: 'Découvertes express', img: 'https://images.unsplash.com/photo-1753703986564-a2aa6e7c2a05?q=80&w=985&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Immersion journée chez un producteur terroir – Terrago' },
            ].map((item) => (
              <div key={item.label} className="relative bg-white overflow-hidden flex flex-col" style={{ borderRadius: '20px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', opacity: 0.72 }}>
                <span className="absolute top-3 right-3 z-10 text-white text-[8px] font-bold uppercase tracking-wider px-3 py-1.5" style={{ background: '#e67e22', borderRadius: '9999px' }}>Bientôt</span>
                <div className="overflow-hidden" style={{ borderRadius: '20px 20px 0 0' }}>
                  <div className="aspect-[4/3]">
                    <img src={item.img} alt={item.alt ?? item.label} className="w-full h-full object-cover" style={{ filter: 'saturate(0.8)' }} />
                  </div>
                </div>
                <div className="p-5">
                  <span className="font-sans font-bold text-primary text-sm block mb-1">{item.label}</span>
                  <span style={{ fontSize: 11, color: '#9a9080' }}>{item.sub}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div style={{ width: 20, height: 1, background: '#e67e22' }} />
              <span style={{ fontSize: 9, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', color: '#e67e22' }}>Univers</span>
            </div>
            <ScrollAnimate delay={100}>
              <h2 className="font-bold text-primary leading-[1.06]" style={{ letterSpacing: '-0.01em' }}>
                <span className=" font-sans text-4xl sm:text-5xl">Des expériences dans tous</span>
                <span className=" font-display italic text-5xl sm:text-5xl lg:text-6xl"> les univers du terroir</span>
              </h2>
            </ScrollAnimate>
            <p className="mt-4 max-w-xl" style={{ color: '#9a9080', fontSize: 14, lineHeight: 1.7 }}>
              Du vin à la truffe, du fromage aux produits de la mer — Terrago développe de réelles expériences humaines dans tous les univers du terroir.
            </p>
          </div>

          <div className="w-full overflow-hidden py-5" style={{ borderTop: '1px solid rgba(26,46,26,0.07)', borderBottom: '1px solid rgba(26,46,26,0.07)' }}>
            <div className="flex w-max animate-marquee-terroir whitespace-nowrap">
              {(() => {
                const produits = ["Huile d'olive", 'Fromages', 'Maraîchage', 'Truffe', 'Huîtres', 'Élevage', 'Vins', 'Miel', 'Céréales', 'Épices', 'Spiritueux', 'Lavande'];
                return [...produits, ...produits].map((label, i) => (
                  <span key={`${label}-${i}`} className="mx-8 font-semibold uppercase" style={{ fontSize: 12, letterSpacing: '0.28em', color: 'rgba(26,46,26,0.30)' }}>
                    {label}
                  </span>
                ));
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* ── RENCONTRES ── */}
      <section className="bg-white" style={{ paddingTop: 'clamp(5rem, 10vw, 9rem)', paddingBottom: 'clamp(5rem, 10vw, 9rem)' }} id="rencontres">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ">
            <div>
              <div className="flex items-center gap-3 mb-7">
                <div style={{ width: 20, height: 1, background: '#e67e22' }} />
                <span style={{ fontSize: 9, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', color: '#e67e22' }}>Rencontres</span>
              </div>
              <ScrollAnimate delay={100}>
                <h2 className="font-bold text-primary leading-[1.06] mb-10" style={{ letterSpacing: '-0.01em' }}>
                  <span className=" font-sans text-4xl sm:text-5xl">Chaque expérience est</span>
                  <span className=" font-display italic text-5xl sm:text-5xl lg:text-6xl"> portée par un humain.</span>
                </h2>
              </ScrollAnimate>
              <div className="space-y-8">
                {[
                  { num: '01', title: 'Des lieux vrais', desc: "Nous visitons et sélectionnons chaque producteur pour son authenticité, son engagement et l'unicité de son lieu." },
                  { num: '02', title: 'Des histoires partagées', desc: 'Chaque producteur ouvre son lieu, raconte son histoire et transmet ses savoir-faire.' },
                  { num: '03', title: 'Une connexion durable', desc: "Bien plus qu'une visite — une rencontre qui marque et donne envie de revenir." },
                ].map(item => (
                  <div key={item.title} className="flex gap-5">
                    <span className="font-display italic font-bold flex-shrink-0 mt-0.5" style={{ fontSize: 13, color: '#e67e22', letterSpacing: '0.05em' }}>{item.num}</span>
                    <div>
                      <h3 className="font-sans font-bold text-primary mb-1.5" style={{ fontSize: 14 }}>{item.title}</h3>
                      <p style={{ color: '#7a7060', fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ProducerStack />
          </div>
        </div>
      </section>

      {/* ── ENGAGEMENT ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#0d1a0d', paddingTop: 'clamp(5rem, 10vw, 9rem)', paddingBottom: 'clamp(5rem, 10vw, 9rem)' }} id="engagement">
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Texte (mobile: en premier | desktop: col 1) */}
            <div className="order-1 lg:order-1">
              <div className="flex items-center gap-3 mb-7">
                <div style={{ width: 20, height: 1, background: '#e67e22' }} />
                <span style={{ fontSize: 9, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', color: '#e67e22' }}>Engagement</span>
              </div>
              <ScrollAnimate delay={100}>
                <h2 className="font-bold text-white leading-[1.06] mb-6" style={{ letterSpacing: '-0.01em' }}>
                  <span className=" font-sans text-4xl md:text-5xl">Un engagement</span>
                  <span className=" font-display italic text-5xl md:text-5xl lg:text-6xl"> simple et concret.</span>
                </h2>
              </ScrollAnimate>
              <p className="mb-10 max-w-md lg:mb-0" style={{ color: 'rgba(255,255,255,0.40)', fontSize: 14, lineHeight: 1.75 }}>
                Chez Terrago, chaque décision est prise en pensant à ceux qui font le terroir et à ceux qui viennent le découvrir.
              </p>
            </div>

            {/* 3 cards (mobile: au milieu | desktop: col 2) */}
            <div className="order-2 lg:row-span-2 space-y-3">
              {[
                { num: '01', title: 'Producteurs engagés', desc: 'Des producteurs de différents univers, tous engagés pour produire bien et bon.' },
                { num: '02', title: 'Rémunération juste', desc: 'Nos séjours représentent un vrai coup de pouce financier pour les producteurs qui nous accueillent.' },
                { num: '03', title: 'Flexibilité totale', desc: 'Chaque producteur gère son calendrier, ses disponibilités et ses tarifs. Nous les accompagnons à chaque étape.' },
              ].map(item => (
                <div
                  key={item.num}
                  className="group flex gap-5 transition-all duration-300 cursor-pointer"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '16px',
                    padding: '20px 24px',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.06)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)'; }}
                >
                  <span className="font-display italic font-bold flex-shrink-0 mt-0.5" style={{ fontSize: 13, color: '#e67e22', letterSpacing: '0.05em' }}>{item.num}</span>
                  <div>
                    <h3 className="font-sans font-bold text-white mb-1" style={{ fontSize: 14 }}>{item.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, lineHeight: 1.7 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Boutons (mobile: en bas | desktop: col 1 sous le texte) */}
            <div className="order-3 flex flex-col sm:flex-row gap-4">
              <Link
                href="/seminaires-entreprise"
                className="text-white border border-white/25 hover:border-white/60 px-7 py-3 text-[10px] uppercase tracking-[0.22em] font-bold transition-all duration-300 hover:bg-white/5 rounded-full text-center"
              >
                Nos séminaires
              </Link>
              <Link
                href="/entre-amis"
                className="text-[10px] uppercase tracking-[0.22em] font-bold transition-all duration-300 px-4 py-3 text-center"
                style={{ color: 'rgba(255,255,255,0.30)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.30)')}
              >
                Séjours entre amis →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="bg-beige-bg relative overflow-hidden" style={{ paddingTop: 'clamp(5rem, 10vw, 9rem)', paddingBottom: 'clamp(5rem, 10vw, 9rem)' }}>
        <div className="max-w-4xl mx-auto px-2 sm:px-4 relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div style={{ width: 20, height: 1, background: '#e67e22' }} />
            <span style={{ fontSize: 9, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', color: '#e67e22' }}>Newsletter</span>
            <div style={{ width: 20, height: 1, background: '#e67e22' }} />
          </div>

          <h2 className="font-bold text-primary leading-[1.06] mb-4" style={{ letterSpacing: '-0.01em' }}>
            <span className=" font-sans text-3xl sm:text-4xl">Restez informé de</span>
            <span className=" font-display italic text-[2.65rem] sm:text-[3rem]"> notre évolution.</span>
          </h2>
          <p className="mb-10" style={{ color: '#9a9080', fontSize: 14, lineHeight: 1.7 }}>
            Laissez-nous votre email, et nous vous enverrons les nouvelles de Terrago.
          </p>

          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 bg-white px-6 py-4 focus:outline-none transition-all"
                style={{
                  border: '1px solid rgba(26,46,26,0.09)',
                  borderRadius: '9999px',
                  color: '#1a2e1a',
                  fontSize: 13,
                }}
                required
              />
              <button
                type="submit"
                className="px-7 py-4 text-white font-bold uppercase transition-all duration-300"
                style={{ background: '#1a2e1a', borderRadius: '9999px', fontSize: 9, letterSpacing: '0.22em' }}
                onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = '#e67e22')}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = '#1a2e1a')}
              >
                Envoyer
              </button>
            </div>
            <p className="mt-5" style={{ fontSize: 9, color: '#b8ad9e', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700 }}>
              100% français & authentique · Pas de spam
            </p>
          </form>
        </div>
      </section>

    </div>
  );
};

export default Home;
