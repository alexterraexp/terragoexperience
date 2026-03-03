
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../constants';
import ScrollAnimate from '../components/ScrollAnimate';
const SECTION_IMAGES = {
  vision: '/images/producteurs/terroir-travail-terrain.png',
  formats: '/images/card/olive-autour.png',
  engagement: '/images/card/vigne-ventoux.png',
};
const PORTRAIT_IMAGES = ['/images/producteurs/vigneron-portrait.png', '/images/producteurs/terroir-travail-terrain.png', '/images/producteurs/equipe-nature.png', '/images/producteurs/vigneron-portrait.png'];

const Home: React.FC = () => {
  // Texte animé pour le titre
  const rotatingTexts = [
    'producteurs',
    'éleveurs',
    'artisans',
    'vignerons',
    'fromagers',
    'maraîchers',
    'apiculteurs',
    'ostréiculteurs',
    'paysans',
    'brasseurs',
    'distillateurs',
    'arboriculteurs',
    'oléiculteurs',
    'saliculteurs'
  ];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  useEffect(() => {
    const currentText = rotatingTexts[currentTextIndex];
    setDisplayedText('');
    setIsTyping(true);
    
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < currentText.length) {
        setDisplayedText(currentText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 100); // Vitesse de frappe : 100ms par lettre (ralenti)
    
    return () => clearInterval(typingInterval);
  }, [currentTextIndex]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length);
    }, 3000); // Changement toutes les 3 secondes pour laisser le temps à l'animation
    
    return () => clearInterval(interval);
  }, [rotatingTexts.length]);

  return (
    <div className="pt-24 lg:pt-18 overflow-x-hidden bg-beige-bg">
      {/* Hero Section */}
      <section className="relative px-2 sm:px-4 lg:px-8 py-4 max-w-[1600px] mx-auto">
        <div className="relative min-h-[85vh] sm:min-h-[78vh] h-[90vh] md:h-[78vh] w-full overflow-hidden rounded-2xl sm:rounded-[2.5rem] md:rounded-[3rem] flex items-center justify-center text-center px-3 sm:px-4 py-8 sm:py-4 group">
          {/* Image de fond mobile */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] group-hover:scale-110 sm:hidden" 
            style={{ backgroundImage: 'url("/images/general/hero.png")' }}
          />
          {/* Image de fond desktop */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] group-hover:scale-110 hidden sm:block" 
            style={{ backgroundImage: 'url("/images/general/herog.png")' }}
          />
          {/* Overlay sombre léger */}
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 w-full text-center max-w-6xl mx-auto px-0 sm:px-0">
            <h1 className="text-white text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-4 sm:mb-6 flex flex-col items-center justify-center gap-y-0.5 sm:gap-y-1 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 drop-shadow-2xl [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
              {/* Mobile : uniquement "Partez à la rencontre de" */}
              <span className="sm:hidden font-sans text-[0.85em] font-semibold tracking-tight not-italic text-center block">
                Partez à la rencontre de nos{" "}
                <span className="bg-orange px-2 py-1 rounded-lg transform -rotate-2 translate-x-0.5 -translate-y-0.5 inline-block">
                  {displayedText}
                  {isTyping && <span className="animate-pulse">|</span>}
                </span>
              </span>
              {/* Desktop : "Plongez au coeur des terroirs, et partez à la rencontre de" */}
              <span className="hidden sm:flex flex-row items-baseline justify-center gap-x-2 flex-wrap">
                <span className="font-display italic">Plongez au coeur des terroirs,</span>
                <span className="font-sans text-[0.72em] md:text-[0.78em] font-semibold tracking-tight not-italic whitespace-nowrap">
                  et partez à la rencontre de{" "}
                  <span className="whitespace-nowrap">
                    nos{" "}
                    <span className="bg-orange px-2 py-1 rounded-lg transform -rotate-2 translate-x-0.5 -translate-y-0.5 inline-block align-baseline">
                      {displayedText}
                      {isTyping && <span className="animate-pulse">|</span>}
                    </span>
                  </span>
                </span>
              </span>
            </h1>
            {/* Version desktop : texte descriptif au-dessus des boutons */}
            <div className="hidden sm:block text-center mb-6 sm:mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
              <p className="text-white text-xs sm:text-[11px] font-medium leading-relaxed mx-auto inline-block whitespace-nowrap w-max max-w-full drop-shadow-lg [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]">
                Vivez des moments suspendus auprès de nos producteurs, éleveurs et artisans d'exception sélectionnés pour leur authenticité, leur engagement et leur savoir-faire.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700">
              <div className="relative w-full max-w-[280px] sm:max-w-none sm:w-auto mt-10 sm:mt-0">
                <Link
                  to="/seminaires"
                  className="w-full sm:w-auto bg-white/30 backdrop-blur-md text-white px-4 sm:px-8 py-3 sm:py-4 rounded-2xl text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold shadow-premium transition-all duration-500 flex items-center gap-1.5 sm:gap-2 justify-center hover:shadow-premium-hover hover:scale-105 active:scale-95 relative overflow-hidden group border border-white/20"
                >
                  <span className="relative z-10 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                    Découvrir nos séminaires
                  </span>
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              </div>
              <Link 
                to="/notre-engagement" 
                className="w-full max-w-[280px] sm:max-w-none sm:w-auto text-white border-b-2 border-white/50 hover:border-white px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-bold transition-all text-center hover:scale-105"
              >
                Notre engagement
              </Link>
            </div>
          {/* Version mobile : texte descriptif en dessous des boutons - MASQUÉ */}
          <div className="hidden">
            <p className="text-white text-[10px] font-medium leading-relaxed mx-auto block max-w-full drop-shadow-lg [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]">
              Vivez des moments suspendus auprès de nos producteurs, éleveurs et artisans d'exception sélectionnés pour leur authenticité, leur engagement et leur savoir-faire.
            </p>
          </div>
          </div>
        </div>
      </section>
 
      {/* Notre vision — style GreenGo : accroche + bloc texte épuré + image */}
      <section className="py-16 sm:py-20 bg-white scroll-mt-24" id="notre-vision">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-block px-3 py-1 bg-orange text-white font-bold font-sans tracking-[0.3em] uppercase text-[8px] sm:text-[9px] mb-4 rounded-full shadow-md transform translate-x-1 -translate-y-0.5">Notre vision</span>
            <ScrollAnimate delay={100}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-primary leading-none sm:leading-tight px-2 sm:px-2 inline-block w-full sm:w-max whitespace-normal text-center sm:text-center">
                <span className="font-sans not-italic text-[0.7em] md:text-[0.7em]">Une envie simple : vivre le terroir </span><span className="font-display italic">pour de vrai.</span>
              </h2>
            </ScrollAnimate>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5 text-gray-600 text-sm sm:text-base leading-relaxed text-center sm:text-center lg:text-left">
              <p>
                Terrago est né d'une envie simple : permettre à chacun de vivre des expériences authentiques, humaines et enrichissantes au plus près de celles et ceux qui font le terroir.
              </p>
              <p>
                Nous croyons que les plus beaux moments se vivent en groupe, dans des lieux vrais, en partageant des savoir-faire, du temps et des histoires.
              </p>
              <p>
                Qu'il s'agisse d'un séminaire, d'un séjour entre amis ou d'une expérience à la journée, Terrago crée des rencontres qui reconnectent à l'essentiel, à l'humain et aux terroirs.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden shadow-md border border-black/5 aspect-[4/3] max-h-[320px] sm:max-h-[380px]">
                <img src= "/images/general/vendange.png" alt="Vendange à la main" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Des formats — deux blocs : moments de vie + produits des terroirs */}
      <section className="py-16 sm:py-20 bg-beige-bg scroll-mt-24" id="formats">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-4">
            <span className="inline-block px-3 py-1 bg-orange text-white font-bold font-sans tracking-[0.3em] uppercase text-[8px] sm:text-[9px] mb-4 rounded-full shadow-md transform translate-x-1 -translate-y-0.5">Formats</span>
          </div>

          {/* 1. Des formats pour tous les moments de vie */}
          <div className="mb-16 sm:mb-20">
            <ScrollAnimate delay={150}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-primary leading-none sm:leading-tight px-2 text-center mb-4 w-full">
                <span className="font-sans not-italic text-[0.7em] md:text-[0.7em]">Des formats pour tous </span><span className="font-display italic">les moments de vie</span>
              </h2>
            </ScrollAnimate>
            <p className="text-gray-600 text-center text-sm sm:text-base mb-10 sm:mb-12 max-w-2xl mx-auto">
              Une même philosophie, plusieurs façons de la vivre.
            </p>
          <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-5 max-w-[320px] sm:max-w-none mx-auto sm:mx-0">
            <Link
              to="/seminaires"
              className="group relative bg-white rounded-xl sm:rounded-2xl border border-black/5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 p-3 sm:p-6 flex flex-col w-full"
            >
              <div className="aspect-[3/2] rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-4 bg-beige-bg">
                <img src="https://images.unsplash.com/photo-1605673349798-5580680c4dea?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Séminaires" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <span className="font-sans font-bold text-primary text-sm sm:text-base group-hover:text-orange transition-colors">Séminaires d'entreprise</span>
              <span className="mt-1 sm:mt-2 text-xs text-gray-500">Immersion dans un terroir</span>
            </Link>
            <div className="grid grid-cols-3 gap-2 sm:contents">
              <div className="relative bg-white rounded-lg sm:rounded-2xl border border-black/5 shadow-sm p-2 sm:p-6 flex flex-col opacity-90 min-w-0">
                <span className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 z-10 px-1.5 py-0.5 sm:px-2 bg-orange text-white text-[7px] sm:text-[9px] font-bold uppercase tracking-wider rounded-md">soon</span>
                <div className="aspect-[3/2] rounded-md sm:rounded-xl overflow-hidden mb-2 sm:mb-4 bg-beige-bg">
                  <img src="https://images.unsplash.com/photo-1683772769298-b77177c029d8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Entre amis" className="w-full h-full object-cover" />
                </div>
                <span className="font-sans font-bold text-primary text-[10px] sm:text-base leading-tight">Séjours en groupe</span>
                <span className="mt-0.5 sm:mt-2 text-[9px] sm:text-xs text-gray-500">À venir</span>
              </div>
              <div className="relative bg-white rounded-lg sm:rounded-2xl border border-black/5 shadow-sm p-2 sm:p-6 flex flex-col opacity-90 min-w-0">
                <span className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 z-10 px-1.5 py-0.5 sm:px-2 bg-orange text-white text-[7px] sm:text-[9px] font-bold uppercase tracking-wider rounded-md">soon</span>
                <div className="aspect-[3/2] rounded-md sm:rounded-xl overflow-hidden mb-2 sm:mb-4 bg-beige-bg">
                  <img src="https://images.unsplash.com/photo-1710330336476-d6027e6035cd?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Séjours immersifs" className="w-full h-full object-cover" />
                </div>
                <span className="font-sans font-bold text-primary text-[10px] sm:text-base leading-tight">Aventures des terroirs</span>
                <span className="mt-0.5 sm:mt-2 text-[9px] sm:text-xs text-gray-500">À venir</span>
              </div>
              <div className="relative bg-white rounded-lg sm:rounded-2xl border border-black/5 shadow-sm p-2 sm:p-6 flex flex-col opacity-90 min-w-0">
                <span className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 z-10 px-1.5 py-0.5 sm:px-2 bg-orange text-white text-[7px] sm:text-[9px] font-bold uppercase tracking-wider rounded-md">soon</span>
                <div className="aspect-[3/2] rounded-md sm:rounded-xl overflow-hidden mb-2 sm:mb-4 bg-beige-bg">
                  <img src="https://images.unsplash.com/photo-1752606303023-e5b288710422?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Découvertes à la journée" className="w-full h-full object-cover object-bottom" />
                </div>
                <span className="font-sans font-bold text-primary text-[10px] sm:text-base leading-tight">Immersions à la journée</span>
                <span className="mt-0.5 sm:mt-2 text-[9px] sm:text-xs text-gray-500">À venir</span>
              </div>
            </div>
          </div>
          </div>

          {/* 2. Des formats pour tous les produits de nos terroirs */}
          <div className="text-center">
            <ScrollAnimate delay={200}>
              <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-primary leading-none sm:leading-tight px-2 sm:px-2 mb-6 inline-block w-full sm:w-max whitespace-normal text-center">
                <span className="font-sans not-italic text-[0.7em] md:text-[0.7em]">Des formats pour tous les produits de </span><span className="font-display italic font-bold">nos terroirs</span>
              </h2>
            </ScrollAnimate>
            <div className="max-w-3xl mx-auto space-y-4 text-center">
              <p className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed">
                Notre ambition est de rendre les terroirs accessibles, partout en France.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Du vin à la truffe, du fromage aux produits de la mer, Terrago développe de réelles expériences humaines et immersives dans tous les univers du terroir.
              </p>
            </div>
            {/* Bannière défilante — produits du terroir */}
            <div className="mt-10 w-full overflow-hidden border-y border-primary/10 py-4" aria-hidden>
              <div className="flex w-max animate-marquee-terroir whitespace-nowrap [transition:none]">
                {(() => {
                  const produits = ['Huile d\'olive', 'Fromages', 'Maraîchage', 'Truffe', 'Huîtres', 'Élevage', 'Vins', 'Miel', 'Céréales', 'Épices', 'Spiritueux', 'Lavande'];
                  return [...produits, ...produits].map((label, i) => (
                    <span key={`${label}-${i}`} className="mx-6 text-base sm:text-lg font-medium uppercase tracking-widest text-primary/70">
                      {label}
                    </span>
                  ));
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Des rencontres avant tout — style GreenGo : cartes portrait */}
      <section className="py-16 sm:py-20 bg-white scroll-mt-24" id="rencontres">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-4">
            <span className="inline-block px-3 py-1 bg-orange text-white font-bold font-sans tracking-[0.3em] uppercase text-[8px] sm:text-[9px] mb-4 rounded-full shadow-md transform translate-x-1 -translate-y-0.5">Rencontres</span>
            <ScrollAnimate delay={200}>
              <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-primary leading-none sm:leading-tight px-2 sm:px-2 inline-block w-full sm:w-max whitespace-normal text-center">
                <span className="font-sans not-italic text-[0.7em] md:text-[0.7em]">Des rencontres </span><span className="font-display italic">avant tout</span>
              </h2>
            </ScrollAnimate>
          </div>
          <p className="text-gray-600 text-sm sm:text-base text-center mb-10 sm:mb-12 max-w-2xl mx-auto">
            Chaque expérience Terrago est portée par un producteur qui ouvre son lieu, partage histoire et transmet des savoirs-faire.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {[
              { name: 'Jean-François', job: 'Cognac et pineau des charentes', image: "/images/producteurs/cognacJF.png" },
              { name: 'Paolo', job: 'Olives et produits de Provence', image: "/images/producteurs/olivepaolo.png" },
              { name: 'Sabine & Marie-Lise', job: 'Noix, Lavandes et co', image: "/images/producteurs/noixsabinemarie.jpeg" },
              { name: 'Marie-Sophie & Thomas', job: 'Vins du Ventoux, en amphore', image: "/images/producteurs/vincombeaumas.png" },
            ].map((person) => (
              <div key={person.name} className="bg-beige-bg/50 rounded-2xl border border-black/5 shadow-sm p-4 sm:p-5 flex flex-col items-center text-center hover:shadow-md hover:border-primary/10 transition-all duration-300">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-md ring-2 ring-black/5 bg-primary/10 flex items-center justify-center">
                  {person.image ? (
                    <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl sm:text-4xl" aria-hidden>👤</span>
                  )}
                </div>
                <p className="mt-3 font-sans font-bold text-primary text-sm sm:text-base">{person.name}</p>
                <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-medium">{person.job}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Un engagement simple et concret — style GreenGo : 3 blocs confiance type "réserver les yeux fermés" */}
      <section className="py-16 sm:py-20 bg-beige-bg scroll-mt-24" id="engagement">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <span className="inline-block px-3 py-1 bg-orange text-white font-bold font-sans tracking-[0.3em] uppercase text-[8px] sm:text-[9px] mb-4 rounded-full shadow-md transform translate-x-1 -translate-y-0.5">Engagement</span>
            <ScrollAnimate delay={300}>
              <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-primary leading-none sm:leading-tight px-2 sm:px-2 inline-block w-full sm:w-max whitespace-normal text-center">
                <span className="font-sans not-italic text-[0.7em] md:text-[0.7em]">Un engagement </span><span className="font-display italic">simple et concret</span>
              </h2>
            </ScrollAnimate>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-sm md:max-w-none mx-auto md:mx-0">
            <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 sm:p-8 text-center hover:shadow-md transition-all duration-300 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold font-display italic transition-all duration-300 group-hover:bg-orange group-hover:text-white">1</div>
              <h3 className="font-sans font-bold text-primary text-base sm:text-lg mb-2 transition-colors duration-300 group-hover:text-orange">Producteurs engagés</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Des producteurs de différents univers, mais tous engagés pour produire bien et bon.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 sm:p-8 text-center hover:shadow-md transition-all duration-300 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold font-display italic transition-all duration-300 group-hover:bg-orange group-hover:text-white">2</div>
              <h3 className="font-sans font-bold text-primary text-base sm:text-lg mb-2 transition-colors duration-300 group-hover:text-orange">Rémunération juste</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Nos séjours sont un vrai coup de pouce financier pour les producteurs.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 sm:p-8 text-center hover:shadow-md transition-all duration-300 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold font-display italic transition-all duration-300 group-hover:bg-orange group-hover:text-white">3</div>
              <h3 className="font-sans font-bold text-primary text-base sm:text-lg mb-2 transition-colors duration-300 group-hover:text-orange">Flexibilité</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Chaque producteur gère son calendrier, ses disponibilités et ses tarifs. Nous les accompagnons dans le développement de leurs offres.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-10 sm:py-14 bg-beige-bg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full -mr-32 sm:-mr-48 -mt-32 sm:-mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-orange/5 rounded-full -ml-32 sm:-ml-48 -mb-32 sm:-mb-48 blur-3xl"></div>

        <div className="max-w-[1100px] mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
          <div className="glass rounded-[1.75rem] sm:rounded-[2rem] p-5 sm:p-6 md:p-8 border border-white/30 shadow-premium text-center hover:shadow-premium-hover transition-all duration-500">
            <div className="inline-block p-3 sm:p-3.5 rounded-xl bg-orange text-white mb-3 sm:mb-4 shadow-lg animate-float">
              <span className="material-symbols-outlined text-xl sm:text-2xl">mail</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-primary italic mb-2 sm:mb-3">
              Vous voulez être tenu au courant de notre évolution ?
            </h2>
            
            <p className="text-gray-600 text-xs sm:text-sm md:text-base font-medium mb-5 sm:mb-6 max-w-xl mx-auto leading-relaxed">
              Laissez-nous votre email, et nous vous enverrons les news de Terrago.
            </p>

            <form className="max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input 
                  type="email" 
                  placeholder="Votre adresse email" 
                  className="flex-1 bg-white/80 border border-black/10 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all shadow-sm"
                  required
                />
                <button 
                  type="submit" 
                  className="gradient-primary text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-premium hover:shadow-orange-glow transition-all active:scale-95 relative overflow-hidden group"
                >
                  <span className="relative z-10">Envoyer</span>
                  <span className="absolute inset-0 bg-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </div>
              <p className="mt-4 text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                100% français & authentique • Pas de Spam
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
