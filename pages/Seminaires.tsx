
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IMAGES } from '../constants';
import CustomSelect from '../components/CustomSelect';
import ParticipantsSelect from '../components/ParticipantsSelect';

// Images de fond pour le hero
const heroImages = [
  'https://images.unsplash.com/photo-1556159991-b4876ad5ef9b?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1761839259494-71caddcdd6b3?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1504224357642-c87eacea1da4?q=80&w=1750&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1586973831237-7d8dd03a996f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1633509928027-f1c3b5dc1f92?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

const Seminaires: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [hasAccommodation, setHasAccommodation] = useState(false);
  const [hasTransport, setHasTransport] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // États pour les champs du formulaire
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    entreprise: '',
    participants: '',
    periode: '',
    message: ''
  });
  
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [autreRegion, setAutreRegion] = useState('');
  const [villeLibre, setVilleLibre] = useState('');
  const [selectedAccTypes, setSelectedAccTypes] = useState<string[]>([]);
  const [selectedTransport, setSelectedTransport] = useState<string>('');
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [plaquetteEmail, setPlaquetteEmail] = useState('');
  const [plaquetteSubmitting, setPlaquetteSubmitting] = useState(false);
  const [plaquetteSuccess, setPlaquetteSuccess] = useState(false);
  const [plaquetteEmailError, setPlaquetteEmailError] = useState('');
  const examplesCarouselRef = useRef<HTMLDivElement>(null);
  const examplesScrollRef = useRef<HTMLDivElement>(null);
  const [examplesCardWidthPx, setExamplesCardWidthPx] = useState(0);
  
  const CAROUSEL_GAP_PX = 32;
  const CAROUSEL_VISIBLE = 3.5;
  const CAROUSEL_VISIBLE_MOBILE = 1; // Afficher 1 carte sur mobile
  
  useEffect(() => {
    const el = examplesCarouselRef.current;
    if (!el) return;
    const updateWidth = () => {
      const w = el.offsetWidth;
      if (w > 0) {
        // Sur mobile (écran < 640px), afficher 1 carte
        const isMobile = window.innerWidth < 640;
        const visibleCards = isMobile ? CAROUSEL_VISIBLE_MOBILE : CAROUSEL_VISIBLE;
        if (isMobile) {
          // Sur mobile, utiliser la largeur du conteneur moins le padding existant (px-4 = 16px de chaque côté)
          // Le conteneur a déjà px-4, donc on soustrait 32px au total (16px de chaque côté)
          const containerPadding = 32; // 16px de chaque côté (px-4)
          const cardWidth = w - containerPadding;
          setExamplesCardWidthPx(cardWidth);
        } else {
          // Sur desktop, calcul normal
          setExamplesCardWidthPx((w - (visibleCards - 1) * CAROUSEL_GAP_PX) / visibleCards);
        }
      }
    };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    const resizeHandler = () => updateWidth();
    window.addEventListener('resize', resizeHandler);
    ro.observe(el);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);
  
  const scrollExamples = (direction: 'left' | 'right') => {
    const el = examplesScrollRef.current;
    if (!el) return;
    const step = (examplesCardWidthPx > 0 ? examplesCardWidthPx : 280) + CAROUSEL_GAP_PX;
    el.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' });
  };

  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('scroll') === 'nos-univers') {
      const el = document.getElementById('nos-univers');
      if (el) {
        const t = setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        return () => clearTimeout(t);
      }
    }
  }, [location.search]);

  // Texte animé pour le titre
  const rotatingTexts = [
    'humains',
    'simples',
    'inspirants',
    'captivants',
    'authentiques',
    'engagés',
    'gourmands',
    'durables',
    'sensoriels'
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
    }, 50); // Vitesse de frappe : 50ms par lettre
    
    return () => clearInterval(typingInterval);
  }, [currentTextIndex]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length);
    }, 3000); // Changement toutes les 3 secondes pour laisser le temps à l'animation
    
    return () => clearInterval(interval);
  }, [rotatingTexts.length]);
  
  // Préchargement des images
  useEffect(() => {
    heroImages.forEach((imageUrl) => {
      const img = new Image();
      img.src = imageUrl;
    });
  }, []);

  // Défilement des images de fond
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3000); // Changement toutes les 3 secondes
    
    return () => clearInterval(interval);
  }, []);
  
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setIsModalOpen(true);
    setIsClosing(false);
    setCurrentStep(1);
    setIsSubmitting(false);
    setSubmitSuccess(false);
    setErrorMessage('');
    // Réinitialiser les sélections
    setSelectedRegions([]);
    setSelectedAccTypes([]);
    setSelectedTransport('');
    setSelectedMonths([]);
    setHasAccommodation(false);
    setHasTransport(false);
    setFormData({
      prenom: '',
      nom: '',
      email: '',
      entreprise: '',
      participants: '',
      periode: '',
      message: ''
    });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsClosing(true);
    document.body.style.overflow = 'unset';
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 300);
  };

  // Gestion de la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    
    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isModalOpen]);

  // Empêcher le scroll du modal de se propager au body
  useEffect(() => {
    const modal = modalRef.current;
    if (modal && isModalOpen) {
      const handleWheel = (e: WheelEvent) => {
        const target = e.target as HTMLElement;
        const scrollableContent = modal.querySelector('.overflow-y-auto') as HTMLElement;
        if (scrollableContent) {
          const { scrollTop, scrollHeight, clientHeight } = scrollableContent;
          const isAtTop = scrollTop === 0;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
          
          if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
            e.preventDefault();
          }
        }
      };
      modal.addEventListener('wheel', handleWheel, { passive: false });
      return () => modal.removeEventListener('wheel', handleWheel);
    }
  }, [isModalOpen]);

  const nextStep = () => {
    // Réinitialiser le message d'erreur
    setErrorMessage('');
    
    // Validation pour l'étape 1 uniquement
    if (currentStep === 1) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmailMissing = !formData.email.trim();
      const isEmailInvalid = formData.email.trim() && !emailPattern.test(formData.email);
      const isOtherMissing = !formData.prenom.trim() || !formData.nom.trim() || !formData.entreprise.trim() || !formData.participants || selectedMonths.length === 0;

      if (isEmailMissing || isEmailInvalid || isOtherMissing) {
        setErrorMessage('Attention, il semblerait que des informations soient manquantes.');
        return;
      }
    }
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(prev => {
        const next = Math.min(prev + 1, 3);
        setIsTransitioning(false);
        return next;
      });
    }, 200);
  };
  
  const prevStep = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(prev => {
        const prevStep = Math.max(prev - 1, 1);
        setIsTransitioning(false);
        return prevStep;
      });
    }, 200);
  };

  // Scroll vers le haut lors du changement d'étape
  useEffect(() => {
    if (isModalOpen && !isTransitioning) {
      const modalContent = modalRef.current?.querySelector('.overflow-y-auto') as HTMLElement;
      if (modalContent) {
        // Petit délai pour s'assurer que le contenu est rendu
        setTimeout(() => {
          modalContent.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [currentStep, isModalOpen, isTransitioning]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Préparer le contenu de l'email
    const emailContent = `
Nouvelle demande de séminaire - Terrago

=== INFORMATIONS CLIENT ===
Prénom: ${formData.prenom}
Nom: ${formData.nom}
Email: ${formData.email}
Entreprise: ${formData.entreprise}
Nombre de participants: ${formData.participants}
Période souhaitée: ${selectedMonths.length > 0 ? selectedMonths.join(', ') : 'Aucun mois sélectionné'}

=== RÉGION(S) SOUHAITÉE(S) ===
${selectedRegions.length > 0 ? selectedRegions.join(', ') : 'Aucune sélectionnée'}
${autreRegion ? `Autre région: ${autreRegion}` : ''}
${villeLibre ? `Ville: ${villeLibre}` : ''}

=== LOGISTIQUE ===
Hébergement: ${hasAccommodation ? 'Oui' : 'Non'}
${hasAccommodation && selectedAccTypes.length > 0 ? `Types d'hébergement: ${selectedAccTypes.join(', ')}` : ''}

Transport: ${hasTransport ? 'Oui' : 'Non'}
${hasTransport && selectedTransport ? `Option transport: ${selectedTransport}` : ''}

=== MESSAGE COMPLÉMENTAIRE ===
${formData.message || 'Aucun message'}

---
Email envoyé depuis le formulaire de séminaire Terrago
    `.trim();

    try {
      // Utiliser FormSubmit (service gratuit) pour envoyer l'email
      const response = await fetch('https://formsubmit.co/ajax/alexso.terrago@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: `${formData.prenom} ${formData.nom}`,
          email: formData.email,
          subject: `Nouvelle demande de séminaire - ${formData.entreprise}`,
          message: emailContent,
          _captcha: false,
          _template: 'table'
        })
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          closeModal();
        }, 2000);
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou nous contacter directement.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePlaquetteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPlaquetteEmailError('');
    
    // Validation de l'email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!plaquetteEmail.trim()) {
      setPlaquetteEmailError('Veuillez renseigner une adresse mail valide');
      return;
    }
    if (!emailPattern.test(plaquetteEmail.trim())) {
      setPlaquetteEmailError('Veuillez renseigner une adresse mail valide');
      return;
    }
    
    setPlaquetteSubmitting(true);
    try {
      const response = await fetch('https://formsubmit.co/ajax/alexso.terrago@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          email: plaquetteEmail.trim(),
          subject: 'Demande plaquette offres 2026 - Terrago',
          message: `Demande de plaquette offres 2026.\nEmail: ${plaquetteEmail.trim()}\n---\nEnvoyé depuis la page Séminaires Terrago`,
          _captcha: false
        })
      });
      if (response.ok) {
        setPlaquetteSuccess(true);
        setPlaquetteEmail('');
        setPlaquetteEmailError('');
      } else {
        throw new Error('Erreur envoi');
      }
    } catch {
      alert('Une erreur est survenue. Veuillez réessayer ou nous contacter.');
    } finally {
      setPlaquetteSubmitting(false);
    }
  };

  const toggleSelection = (list: string[], setList: (l: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const regionsOptions = [
    { name: 'Nouvelle-Aquitaine', icon: 'sailing' },
    { name: 'Auvergne-Rhône-Alpes', icon: 'terrain' },
    { name: 'Provence-Alpes-Côte d\'Azur', icon: 'wb_sunny' }
  ];

  const accTypes = ["Chambres seules", "Chambres partagées"];
  
  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  return (
    <div className="pt-24 font-sans bg-beige-bg min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24 text-center min-h-[60vh] sm:min-h-[65vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden mb-12 sm:mb-16">
        {/* Images de fond avec transition */}
        <div className="absolute inset-0 w-full h-full">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
              }`}
              style={{
                backgroundImage: `url('${image}')`
              }}
            />
          ))}
        </div>
        {/* Overlay sombre pour la lisibilité */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Contenu */}
        <div className="relative z-10 max-w-3xl mx-auto text-white px-0">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-white/10 backdrop-blur-md text-white text-[8px] sm:text-[9px] uppercase tracking-[0.3em] font-bold font-sans mb-4 sm:mb-6 rounded-full shadow-md border border-white/20">
            Immersion & Cohésion
          </span>
          <h1 className="text-white text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold leading-tight mb-4 sm:mb-6 flex flex-col sm:flex-row items-center sm:items-baseline justify-center gap-x-2 gap-y-1 sm:gap-y-0 whitespace-normal sm:whitespace-nowrap sm:flex-nowrap drop-shadow-lg px-0">
            <span className="font-display italic">Optez pour des séminaires</span>
            <span className="font-sans text-[0.7em] md:text-[0.78em] font-semibold tracking-tight not-italic whitespace-nowrap flex items-center gap-1">
              <span>plus</span>
              <span>
                {displayedText}
                {isTyping && <span className="animate-pulse">|</span>}
              </span>
            </span>
          </h1>
          <p className="text-white/90 text-xs sm:text-sm md:text-base font-light mb-6 sm:mb-10 max-w-2xl mx-auto leading-relaxed italic text-balance drop-shadow-md px-2">
            Moins de slides. Plus de sens.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button 
              onClick={openModal}
              className="w-full sm:w-auto bg-white text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center relative overflow-hidden group hover:bg-orange hover:text-white"
            >
              <span className="relative z-10">Organiser mon séminaire</span>
            </button>
            <Link 
              to="/seminaires?scroll=nos-univers"
              className="text-white border-b-2 border-white/50 hover:border-white px-3 py-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center"
            >
              Découvrir nos univers
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-12 sm:py-16 max-w-[1400px] mx-auto px-0 sm:px-0 lg:px-0">
        <div className="text-center mb-6 sm:mb-16">
          <p className="mt-2 mb-2 sm:mb-4 text-primary/90 text-xs tracking-[0.4em]">⭐⭐⭐⭐⭐</p>
          <span className="inline-block px-3 py-1 bg-orange text-white font-bold font-sans tracking-[0.3em] uppercase text-[8px] sm:text-[9px] mb-2 sm:mb-4 rounded-full shadow-md">5 étoiles</span>
          <div className="overflow-x-auto no-scrollbar text-center mb-2 sm:mb-4 pb-2 min-h-[1.4em]">
            <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-primary leading-normal inline-block w-max sm:w-max whitespace-normal sm:whitespace-nowrap px-0">
              <span className="font-sans not-italic text-[0.7em] md:text-[0.7em]">Des séminaires </span><span className="font-display italic">5 étoiles</span>
            </h2>
          </div>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-4xl mx-auto mb-4 text-center px-4">
            Nos "5 étoiles" ne se mesurent pas au luxe, mais aux liens humains, au contact de la terre et à l'engagement des producteurs. Des expériences sincères qui renforcent la cohésion et laissent une trace durable.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-start max-w-[320px] sm:max-w-none mx-auto sm:mx-0">
          <PillarCard icon="diversity_3" title="HUMAIN" text="Découvrir celles et ceux qui nous nourissent, dans la simplicité, l’authenticité et l'écoute." />
          <PillarCard icon="handyman" title="IMMERSIF" text="Participer aux activités manuelles pour s'ancrer réellement dans la réalité des terroirs." />
          <PillarCard icon="restaurant" title="AUTHENTIQUE" text="Des hommmes et femmes authentiques qui produisent des produits de qualité." />
          <PillarCard icon="eco" title="ENGAGÉ" text="Des producteurs, éleveurs, artisans qui s'engagent pour faire les choses bien et avoir le moins d'impact négatif sur notre Terre." />
          <PillarCard icon="handshake" title="PASSIONNANT" text="La nature et le terroir comme fondation, la cohésion comme finalité." />
        </div>
      </section>

      {/* NEW SECTION 1: NOS UNIVERS DE TRAVAIL */}
      <section id="nos-univers" className="py-16 sm:py-20 lg:py-24 px-0 sm:px-0 lg:px-0 bg-gradient-to-b from-white to-beige-bg border-y border-black/10 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-4 sm:mb-6">
            <span className="inline-block px-3 py-1 bg-orange text-white font-bold font-sans tracking-[0.3em] uppercase text-[8px] sm:text-[9px] mb-2 sm:mb-4 rounded-full shadow-md transform translate-x-1 -translate-y-0.5">Univers</span>
            <div className="overflow-x-auto no-scrollbar text-center">
              <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary leading-tight px-0 inline-block w-max sm:w-max whitespace-normal sm:whitespace-nowrap">
                <span className="font-sans not-italic text-[0.7em] md:text-[0.7em]">Nos premiers </span><span className="font-display italic">univers</span>
              </h2>
            </div>
          </div>
          
          {/* Mini-cartes produits */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12 px-4">
            {['le vin', 'la truffe', 'les olives', 'la lavande', 'le fromage de chèvre', 'les noix', 'le cognac'].map((product) => (
              <div
                key={product}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-full border border-black/10 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 cursor-pointer group"
              >
                <span className="text-[9px] sm:text-[10px] font-sans font-medium text-primary uppercase tracking-wider group-hover:text-primary/80">
                  {product}
                </span>
              </div>
            ))}
          </div>
          
          {/* Badge exemples */}
          <div className="mb-4 sm:mb-8 max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6">
            <div className="flex items-center justify-center gap-4 sm:gap-6 relative">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-bold font-sans tracking-[0.2em] uppercase text-[8px] sm:text-[9px] rounded-full border border-primary/20">
                Quelques-uns de nos exemples
              </span>
              {/* Boutons de navigation alignés à droite du badge */}
              <div className="hidden sm:flex gap-3 items-center">
                <button
                  type="button"
                  onClick={() => scrollExamples('left')}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-black/10 shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95"
                  aria-label="Exemples précédents"
                >
                  <span className="material-symbols-outlined text-2xl">chevron_left</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollExamples('right')}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-black/10 shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95"
                  aria-label="Exemples suivants"
                >
                  <span className="material-symbols-outlined text-2xl">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Carousel exemples : scroll natif fluide, scroll-snap */}
          {(() => {
            const exampleCards = [
              { image: "/images/card/cognac-autour.png", title: "Cognac", desc: "Cognac • 40min d'Angoulême TGV", tags: ["Participation aux vendanges", "Fabrication de son propre pineau", "Golf entre les vignes"], producerImage: "/images/producteurs/cognacJF.png" },
              { image: "/images/card/olive-autour.png", title: "Olives et lavande", desc: "Valensole • 45min d'Aix en Provence TGV", tags: ["Apprentissage et récolte des olives", "Fabrication de son huile", "Récolte de lavandes fines", "Distillation de son parfum d'ambiance"], producerImage: "/images/producteurs/olivepaolo.png" },
              { image: "/images/card/noix-autour.png", title: "Noix et compagnie", desc: "Orléans | Valence", tags: ["Apprentissage et récolte des noix", "Fabrication de son huile/vin de noix", "Session Trail dans un cadre magnifique"], producerImage: "/images/producteurs/noixsabinemarie.jpeg" },
              { image: "/images/card/truffe-autour.png", title: "Truffe et terroir", desc: "Chinon • 1h de Tours TGV", tags: ["Cavage et découverte de la truffe", "Atelier cuisine", "Ferme florale et potager"], producerImage: "/images/producteurs/truffeprod.png" },
              { image: "/images/card/fromage-autour.png", title: "Fromage de chèvre", desc: "1h d'Aix-en-Provence TGV", tags: ["Soins aux chèvres", "Fabrication du fromage", "Dégustation à la ferme"], producerImage: "/images/producteurs/chevre-bebe.jpg" },
              { image: "/images/card/vigne-ventoux.png", title: "Vin AOC Ventoux", desc: "1h d'Avignon TGV", tags: ["Les mains dans la terre", "Activité autour de la vigne", "Soirée soleil et guinguette", "Excursion vélo au Mont Ventoux"], producerImage: "/images/producteurs/vincombeaumas.png" },
            ];
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
            // Sur mobile, calculer la largeur pour afficher exactement 2 cartes
            const cardWidthPx = isMobile && examplesCardWidthPx > 0 
              ? examplesCardWidthPx 
              : (examplesCardWidthPx > 0 ? examplesCardWidthPx : 280);
            return (
              <div className="relative w-screen pb-6 sm:pb-8 -ml-2 sm:-ml-4 lg:-ml-6 mr-0">
                <div ref={examplesCarouselRef} className="w-full mb-4 sm:mb-6 py-4 pb-4 sm:pb-6 px-4 sm:pl-14 md:pl-20 lg:pl-24 sm:pr-4 md:pr-6 lg:pr-8">
                  <div
                    ref={examplesScrollRef}
                    className="no-scrollbar flex overflow-x-scroll overflow-y-visible py-2 -my-2 pb-4 sm:pb-6 scroll-smooth snap-x snap-mandatory"
                    style={{
                      gap: isMobile ? 16 : CAROUSEL_GAP_PX,
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                      WebkitOverflowScrolling: 'touch',
                      touchAction: 'pan-x',
                      overscrollBehaviorX: 'contain',
                      WebkitUserSelect: 'none',
                      userSelect: 'none',
                      cursor: 'grab',
                    }}
                    onMouseDown={(e) => {
                      const el = examplesScrollRef.current;
                      if (!el) return;
                      el.style.cursor = 'grabbing';
                      const startX = e.pageX - el.offsetLeft;
                      const scrollLeft = el.scrollLeft;
                      
                      const handleMouseMove = (e: MouseEvent) => {
                        e.preventDefault();
                        const x = e.pageX - el.offsetLeft;
                        const walk = (x - startX) * 1.5;
                        el.scrollLeft = scrollLeft - walk;
                      };
                      
                      const handleMouseUp = () => {
                        el.style.cursor = 'grab';
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                        document.removeEventListener('mouseleave', handleMouseUp);
                      };
                      
                      document.addEventListener('mousemove', handleMouseMove);
                      document.addEventListener('mouseup', handleMouseUp);
                      document.addEventListener('mouseleave', handleMouseUp);
                    }}
                  >
                    {exampleCards.map((card) => (
                      <div
                        key={`${card.title}-${card.desc}`}
                        className="flex-shrink-0 snap-start"
                        style={{ width: cardWidthPx }}
                      >
                        <UniverseCard {...card} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* SECTION: NOS GARANTIES — grille visible d'un coup */}
      <section className="py-16 sm:py-20 lg:py-24 px-0 sm:px-0 lg:px-0 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-6 sm:mb-14">
            <span className="inline-block px-3 py-1 bg-orange text-white font-bold tracking-[0.3em] uppercase text-[8px] sm:text-[9px] font-sans rounded-full shadow-md mb-2 sm:mb-4">Nos garanties</span>
            <div className="overflow-x-auto no-scrollbar text-center mb-2 sm:mb-4 pb-2 min-h-[1.4em]">
              <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary leading-none sm:leading-tight block sm:inline-block w-full sm:w-max whitespace-normal sm:whitespace-nowrap px-2 sm:px-0">
                <span className="font-sans not-italic text-[0.7em] md:text-[0.7em]">Tous nos séminaires </span><span className="font-display italic">vous garantissent</span>
              </h2>
            </div>
          </div>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 list-none p-0 m-0 max-w-[340px] sm:max-w-none mx-auto sm:mx-0">
            {[
              { icon: 'groups', label: 'Rencontres authentiques', text: 'Visites et échanges avec des producteurs engagés.' },
              { icon: 'eco', label: 'Sensibilisation envrionnementale', text: 'Sensibilisation aux valeurs de durabilité, du vivant et du savoir-faire local.' },
              { icon: 'restaurant', label: 'Du champ à l\'assiette', text: 'Tous vos repas deveinnent des expériences gourmandes et locales.' },
              { icon: 'nature', label: 'Cadre ressourçant', text: 'Se réunir au vert dans un lieu inspirant.' },
              { icon: 'diversity_3', label: 'Cohésion sur mesure', text: 'Activités pensées pour renforcer les liens.' },
            ].map((item) => (
              <li key={item.icon} className="group flex items-start gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-beige-bg/60 border border-black/5 hover:border-primary/20 hover:shadow-premium transition-all duration-300">
                <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <div className="min-w-0 pt-0.5">
                  <h3 className="font-sans font-bold text-primary text-sm sm:text-base mb-1 group-hover:text-orange transition-colors">{item.label}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION: NOS OFFRES - PLAQUETTE (style pépites du terroir, plus petit, cadre large) */}
      <section className="py-14 sm:py-20 lg:py-24 px-0 sm:px-0 lg:px-0 bg-beige-bg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-primary/5 rounded-full -mr-24 -mt-24 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-orange/5 rounded-full -ml-24 -mb-24 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="glass rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-12 border border-white/30 shadow-premium text-center hover:shadow-premium-hover transition-all duration-500">
            <span className="inline-block px-2.5 py-1 bg-orange text-white font-bold tracking-[0.25em] uppercase text-[7px] sm:text-[8px] font-sans rounded-full mb-3 sm:mb-6">Nos offres</span>

            <div className="overflow-x-auto no-scrollbar text-center mb-2 sm:mb-4">
            <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary italic leading-tight inline-block w-max sm:w-max whitespace-normal sm:whitespace-nowrap px-0">
              Recevez notre plaquette 2026
            </h2>
          </div>
            <p className="text-xs sm:text-sm text-gray-600 font-sans mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed">
              Laissez-nous votre email et recevez notre plaquette regroupant toutes nos offres. Et tout ça sous 24h, promis !
            </p>

            {plaquetteSuccess ? (
              <div className="inline-block bg-primary/10 border border-primary/20 rounded-2xl px-6 py-5 sm:px-8 sm:py-6">
                <div className="size-10 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-3">
                  <span className="material-symbols-outlined text-xl">check</span>
                </div>
                <p className="text-primary font-sans font-bold text-sm">Merci !</p>
                <p className="text-gray-600 text-xs mt-1">Vous recevrez notre plaquette sous 24h.</p>
              </div>
            ) : (
              <form onSubmit={handlePlaquetteSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <div className="flex-1 min-w-0">
                    <input
                      type="email"
                      required
                      placeholder="jeveuxlaplaquette@email.fr"
                      value={plaquetteEmail}
                      onChange={(e) => {
                        setPlaquetteEmail(e.target.value);
                        setPlaquetteEmailError('');
                      }}
                      className={`w-full bg-white/90 border rounded-xl sm:rounded-2xl px-4 py-3 text-xs sm:text-sm placeholder:text-gray-400 focus:ring-2 focus:bg-white transition-all shadow-sm ${
                        plaquetteEmailError ? 'border-orange focus:ring-orange/30' : 'border-black/10 focus:ring-primary/30'
                      }`}
                    />
                    {plaquetteEmailError && (
                      <p className="text-orange text-[10px] mt-1.5 text-left">{plaquetteEmailError}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={plaquetteSubmitting}
                    className="gradient-primary text-white px-5 py-3 rounded-xl sm:rounded-2xl font-bold uppercase tracking-[0.15em] text-[9px] sm:text-[10px] shadow-premium hover:shadow-orange-glow transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {plaquetteSubmitting ? (
                      <div className="size-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      'Recevoir la plaquette'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* MODAL AMÉLIORÉE - FLUIDE ET COHÉRENTE */}
      {isModalOpen && (
        <div 
          ref={modalRef}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ pointerEvents: isClosing ? 'none' : 'auto' }}
        >
          <div 
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
              isClosing ? 'opacity-0' : 'opacity-100'
            }`}
            onClick={closeModal}
          ></div>
          <div 
            className={`bg-white w-full max-w-[95%] sm:max-w-5xl h-[85vh] max-h-[85vh] sm:h-[90vh] sm:max-h-[90vh] md:h-[85vh] rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative z-10 font-sans transition-all duration-300 ${
              isClosing 
                ? 'opacity-0 scale-95 translate-y-8' 
                : 'opacity-100 scale-100 translate-y-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header Modal - Plus d'espace et typographie soignée */}
            <div className="px-6 md:px-10 py-4 md:py-6 bg-white border-b border-black/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                 <div className="size-8 md:size-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shrink-0">
                    <span className="material-symbols-outlined text-xl md:text-2xl">event_available</span>
                 </div>
                 <div className="min-w-0 flex-1">
                    <h2 className="text-lg md:text-2xl font-bold text-primary leading-tight truncate">
                      <span className="font-sans not-italic text-sm md:text-base">Votre projet de </span>
                      <span className="font-display italic font-black">séminaire</span>
                    </h2>
                    <p className="text-[8px] md:text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1 font-sans hidden sm:block">Parlons d'immersion et de sens</p>
                 </div>
              </div>
              <button 
                onClick={closeModal}
                className="size-11 rounded-full bg-beige-bg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 shadow-sm active:scale-90 focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label="Fermer la modal"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Message d'erreur */}
            {errorMessage && (
              <div className="px-6 md:px-12 pt-4 shrink-0 animate-in fade-in">
                <div className="bg-orange/10 border border-orange/30 rounded-xl px-4 py-3 flex items-center gap-3">
                  <span className="material-symbols-outlined text-orange text-lg">error</span>
                  <p className="text-[11px] font-sans font-medium text-orange flex-1">{errorMessage}</p>
                  <button
                    onClick={() => setErrorMessage('')}
                    className="text-orange hover:text-orange/70 transition-colors"
                    aria-label="Fermer"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                </div>
              </div>
            )}

            {/* Barre de progression - Thinner and more elegant */}
            <div className={`px-6 md:px-12 ${errorMessage ? 'pt-4' : 'pt-6'} md:pt-8 shrink-0`}>
              <div className="flex items-center justify-between mb-3 px-1 gap-2">
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-orange shrink-0">Étape {currentStep} <span className="text-gray-200 mx-1 md:mx-2">/</span> 3</span>
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-primary text-right truncate">
                  {currentStep === 1 ? 'Coordonnées & Participants' : currentStep === 2 ? 'Choix du lieu' : 'Organisation Logistique'}
                </span>
              </div>
              <div className="h-1.5 w-full bg-beige-bg rounded-full overflow-hidden border border-black/5 relative">
                <div 
                  className="absolute top-0 left-0 h-full bg-orange rounded-full transition-all duration-700 ease-in-out shadow-sm" 
                  style={{ width: `${(currentStep / 3) * 100}%`, minWidth: '4px' }} 
                />
              </div>
            </div>

            {/* Message de succès */}
            {submitSuccess && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center z-20 rounded-[1.5rem] md:rounded-[2.5rem]">
                <div className="text-center p-8">
                  <div className="size-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="material-symbols-outlined text-3xl">check</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-primary italic mb-3">Demande envoyée !</h3>
                  <p className="text-gray-500 text-sm">Nous vous recontacterons sous 48h.</p>
                </div>
              </div>
            )}

            {/* Contenu - Plus aéré avec transitions */}
            <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
              <div className="max-w-4xl mx-auto">
                {currentStep === 1 && (
                  <div className={`space-y-10 transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                    <div>
                      <h3 className="text-3xl font-display font-bold text-primary italic mb-2">Commençons par vous.</h3>
                      <p className="text-xs text-gray-400 font-light italic">Dites-nous qui vous êtes pour mieux cerner vos besoins.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <FormInput 
                        label="Prénom" 
                        placeholder="Jean" 
                        icon="person"
                        value={formData.prenom}
                        onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                        required={true}
                      />
                      <FormInput 
                        label="Nom" 
                        placeholder="Dupont"
                        value={formData.nom}
                        onChange={(e) => setFormData({...formData, nom: e.target.value})}
                        required={true}
                      />
                      <FormInput 
                        label="Email Professionnel" 
                        placeholder="contact@entreprise.fr" 
                        type="email" 
                        icon="mail"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required={true}
                      />
                      <FormInput 
                        label="Nom de l'Entreprise" 
                        placeholder="Terroir SAS" 
                        icon="business"
                        value={formData.entreprise}
                        onChange={(e) => setFormData({...formData, entreprise: e.target.value})}
                        required={true}
                      />
                      <ParticipantsSelect
                        label="Nombre de participants"
                        icon="groups"
                        value={formData.participants}
                        onChange={(value) => setFormData({...formData, participants: value})}
                        required={true}
                      />
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">calendar_today</span> Période Souhaitée
                          <span className="text-orange">*</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {months.map((month) => (
                            <button
                              key={month}
                              type="button"
                              onClick={() => toggleSelection(selectedMonths, setSelectedMonths, month)}
                              className={`px-3 py-2 rounded-lg border cursor-pointer transition-all duration-300 flex items-center gap-1.5 ${
                                selectedMonths.includes(month) 
                                  ? 'border-primary bg-primary text-white shadow-md shadow-primary/20' 
                                  : 'border-black/10 bg-white hover:border-primary/40 hover:bg-primary/5 text-gray-600'
                              }`}
                            >
                              <span className={`text-[8px] font-bold uppercase tracking-wider font-sans whitespace-nowrap ${
                                selectedMonths.includes(month) ? 'text-white' : 'text-gray-600'
                              }`}>
                                {month}
                              </span>
                              {selectedMonths.includes(month) && (
                                <span className="material-symbols-outlined text-white text-xs">check</span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className={`space-y-10 transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                    <div>
                      <h3 className="text-3xl font-display font-bold text-primary italic mb-2">Choisissez votre terroir</h3>
                      <p className="text-xs text-gray-400 font-light italic">Où souhaitez-vous vivre l'expérience ? Nos domaines vous accueillent dans les plus belles régions de France.</p>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 border-b border-black/5 pb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        Région(s) souhaitée(s)
                        <span className="text-[7px] font-bold normal-case text-white bg-primary px-2 py-0.5 rounded">plusieurs choix possibles</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {regionsOptions.map((region) => (
                          <button
                            key={region.name}
                            type="button"
                            onClick={() => toggleSelection(selectedRegions, setSelectedRegions, region.name)}
                            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col items-center text-center gap-2 group relative overflow-hidden ${
                              selectedRegions.includes(region.name) 
                                ? 'border-primary bg-primary/10 shadow-xl -translate-y-1' 
                                : 'border-black/10 bg-white hover:border-primary/20 hover:shadow-lg'
                            }`}
                          >
                            <div className={`size-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                              selectedRegions.includes(region.name) ? 'bg-primary text-white shadow-lg' : 'bg-beige-bg text-gray-400 group-hover:text-primary'
                            }`}>
                              <span className="material-symbols-outlined text-2xl">{region.icon}</span>
                            </div>
                            <span className={`text-sm font-bold font-sans leading-tight ${
                              selectedRegions.includes(region.name) ? 'text-primary' : 'text-primary/90'
                            }`}>
                              {region.name}
                            </span>
                            {selectedRegions.includes(region.name) && (
                              <span className="absolute top-3 right-3 size-5 bg-primary rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-xs">check</span>
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                      <div className="space-y-4 pt-4 border-t border-black/5">
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Autre région (précisez)</label>
                          <input
                            type="text"
                            value={autreRegion}
                            onChange={(e) => setAutreRegion(e.target.value)}
                            placeholder="Ex : Bretagne, Occitanie…"
                            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Ville (libre)</label>
                          <input
                            type="text"
                            value={villeLibre}
                            onChange={(e) => setVilleLibre(e.target.value)}
                            placeholder="Ex : Bordeaux, Lyon…"
                            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className={`space-y-10 transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                    <div>
                      <h3 className="text-3xl font-display font-bold text-primary italic mb-2">Logistique & Sur-mesure</h3>
                      <p className="text-xs text-gray-400 font-light italic">Affinez les détails pour une organisation parfaite.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* HÉBERGEMENT */}
                        <div className={`p-8 rounded-[2rem] border-2 transition-all duration-500 ${hasAccommodation ? 'border-orange bg-orange/5' : 'border-beige-bg bg-white shadow-sm'}`}>
                          <div className="flex items-center justify-between mb-8">
                             <div className="flex items-center gap-4">
                                <div className={`size-10 rounded-xl flex items-center justify-center transition-colors ${hasAccommodation ? 'bg-orange text-white' : 'bg-beige-bg text-gray-400'}`}>
                                   <span className="material-symbols-outlined">hotel</span>
                                </div>
                                <h4 className="text-xs font-bold text-primary font-sans uppercase tracking-widest leading-none">Hébergement</h4>
                             </div>
                             <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={hasAccommodation} onChange={(e) => setHasAccommodation(e.target.checked)} />
                                <div className="w-12 h-6 bg-gray-100 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange shadow-inner"></div>
                             </label>
                          </div>
                          {hasAccommodation && (
                            <div className="flex flex-wrap gap-2 animate-fade-in">
                               {accTypes.map(type => (
                                 <button 
                                  key={type}
                                  onClick={() => toggleSelection(selectedAccTypes, setSelectedAccTypes, type)}
                                  className={`px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest border transition-all ${selectedAccTypes.includes(type) ? 'bg-orange text-white border-orange shadow-md' : 'bg-white text-gray-400 border-black/5 hover:border-primary/20'}`}
                                 >
                                   {type}
                                 </button>
                               ))}
                            </div>
                          )}
                        </div>

                        {/* TRANSPORT */}
                        <div className={`p-8 rounded-[2rem] border-2 transition-all duration-500 ${hasTransport ? 'border-orange bg-orange/5' : 'border-beige-bg bg-white shadow-sm'}`}>
                          <div className="flex items-center justify-between mb-8">
                             <div className="flex items-center gap-4">
                                <div className={`size-10 rounded-xl flex items-center justify-center transition-colors ${hasTransport ? 'bg-orange text-white' : 'bg-beige-bg text-gray-400'}`}>
                                   <span className="material-symbols-outlined">directions_car</span>
                                </div>
                                <h4 className="text-xs font-bold text-primary font-sans uppercase tracking-widest leading-none">Transport</h4>
                             </div>
                             <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={hasTransport} onChange={(e) => setHasTransport(e.target.checked)} />
                                <div className="w-12 h-6 bg-gray-100 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange shadow-inner"></div>
                             </label>
                          </div>
                          {hasTransport && (
                            <div className="grid grid-cols-2 gap-3 animate-fade-in">
                               {["Depuis le lieu de départ", "Depuis une gare SNCF proche"].map(opt => (
                                 <button 
                                  key={opt}
                                  onClick={() => setSelectedTransport(opt)}
                                  className={`px-3 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest border transition-all ${selectedTransport === opt ? 'bg-orange text-white border-orange shadow-md' : 'bg-white text-gray-400 border-black/5 hover:border-primary/20'}`}
                                 >
                                   {opt}
                                 </button>
                               ))}
                            </div>
                          )}
                        </div>
                    </div>
                    
                    <div className="space-y-3 pt-4">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                           <span className="material-symbols-outlined text-sm">edit_note</span> Un message particulier ?
                        </label>
                        <textarea 
                          rows={3} 
                          className="w-full bg-beige-bg/40 border border-black/5 rounded-[2rem] px-8 py-6 text-[12px] font-sans font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all shadow-inner outline-none resize-none placeholder:text-gray-300 italic" 
                          placeholder="Besoin de salles de réunion spécifiques, de pauses gourmandes, d'activités team building particulières..."
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                        ></textarea>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Modal - High Contrast and Clear Actions */}
            <div className="px-6 md:px-12 py-6 md:py-8 bg-beige-bg/20 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
               <button 
                disabled={currentStep === 1}
                onClick={prevStep}
                className={`text-[9px] md:text-[10px] font-bold flex items-center gap-2 md:gap-3 tracking-[0.2em] uppercase transition-all font-sans group w-full sm:w-auto justify-center sm:justify-start ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-primary hover:text-primary/70'}`}
               >
                 <span className="material-symbols-outlined text-base md:text-lg transition-transform group-hover:-translate-x-1">west</span> Précédent
               </button>

               <div className="flex gap-3 md:gap-4 w-full sm:w-auto">
                  <button onClick={closeModal} className="flex-1 sm:flex-none px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl border border-black/10 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] font-sans hover:bg-white hover:border-black/20 transition-all active:scale-95 shadow-sm">
                    Annuler
                  </button>
                  <button 
                    onClick={currentStep < 3 ? nextStep : handleSubmit}
                    disabled={isSubmitting}
                    className={`flex-1 sm:flex-none bg-primary text-white px-8 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold uppercase tracking-[0.2em] text-[9px] md:text-[10px] font-sans shadow-xl hover:bg-primary/90 hover:text-white hover:shadow-primary/30 active:bg-primary/90 active:text-white focus:bg-primary/90 focus:text-white focus:outline-none transition-all duration-300 sm:min-w-[180px] active:scale-95 flex items-center justify-center gap-2 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        {currentStep === 3 ? 'Finaliser le brief' : 'Continuer'}
                        {currentStep < 3 && <span className="material-symbols-outlined text-sm md:text-base">east</span>}
                        {currentStep === 3 && <span className="material-symbols-outlined text-sm md:text-base">task_alt</span>}
                      </>
                    )}
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Form Input Component Updated for more polish
const FormInput = ({ label, placeholder, type = "text", icon, value, onChange, required = false }: any) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = type === "email" ? (value === "" || emailPattern.test(value)) : true;
  
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
        {icon && <span className="material-symbols-outlined text-sm">{icon}</span>} {label}
        {required && <span className="text-orange">*</span>}
      </label>
      <input 
        type={type} 
        className={`w-full bg-beige-bg/40 border rounded-2xl px-6 py-4 text-[12px] font-sans font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all shadow-sm outline-none placeholder:text-gray-300 ${
          type === "email" && value && !isValidEmail 
            ? 'border-orange/50 focus:ring-orange/20' 
            : 'border-black/5'
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        pattern={type === "email" ? "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" : undefined}
      />
      {type === "email" && value && !isValidEmail && (
        <p className="text-[9px] text-orange font-medium ml-1">Veuillez entrer une adresse email valide</p>
      )}
    </div>
  );
};

const PillarCard = ({ icon, title, text }: any) => (
  <div className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-black/5 cursor-pointer">
    {/* Contenu : marges égales, carte s'agrandit vers le bas au survol */}
    <div className="p-5 sm:p-6 flex flex-col items-center text-center">
      {/* Icône */}
      <div className="size-6 sm:size-7 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
        <span className="material-symbols-outlined text-sm sm:text-base">{icon}</span>
      </div>
      
      {/* Titre - reste primary au survol */}
      <h3 className="text-xs sm:text-sm font-sans font-semibold text-primary not-italic leading-tight mt-3 sm:mt-4">
        {title}
      </h3>
      
      {/* Description - bloc qui s'agrandit au survol */}
      <div className="max-h-0 overflow-hidden group-hover:max-h-[160px] transition-all duration-500 ease-out">
        <p className="text-xs sm:text-sm font-medium text-gray-700 leading-relaxed group-hover:text-primary pt-3 sm:pt-4">
          {text}
        </p>
      </div>
    </div>
    
    {/* Accent décoratif en bas */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  </div>
);

const UniverseCard = ({ image, title, desc, tags, producerImage }: any) => (
  <div className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 border border-black/5 flex flex-col h-full">
    {/* Image avec overlay au survol */}
    <div className="relative aspect-[16/11] overflow-hidden rounded-t-xl sm:rounded-t-2xl flex-shrink-0">
      <img src={image} className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-95" alt={title} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-xl sm:rounded-t-2xl"></div>
      {/* Badge localisation en haut */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-white/95 backdrop-blur-sm px-2 sm:px-2.5 py-0.5 rounded-full shadow-lg">
        <p className="text-[7px] sm:text-[8px] font-bold text-primary uppercase tracking-wider font-sans">{desc}</p>
      </div>
    </div>
    
    {/* Contenu — hauteur fixe pour aligner les cartes, liste contenue en bas */}
    <div className="relative p-4 sm:p-6 flex flex-col h-[190px] sm:h-[212px] rounded-b-xl sm:rounded-b-2xl">
      {/* Tête du producteur (rond) — à cheval image/contenu */}
      {producerImage && (
        <div className="absolute -top-8 right-4 sm:right-6 z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-4 border-white shadow-xl ring-2 ring-black/5 bg-white">
          <img src={producerImage} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      {/* Titre avec accent coloré */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <div className="w-1 h-6 sm:h-8 bg-primary group-hover:bg-orange rounded-full flex-shrink-0 self-center transition-colors duration-300"></div>
        <h3 className="text-base sm:text-lg font-sans font-bold text-primary not-italic leading-tight group-hover:text-orange transition-colors duration-300">{title}</h3>
      </div>
      
      {/* Tags activités — contenu dans la carte, scroll interne si trop de lignes */}
      <div className="flex flex-col gap-2 sm:gap-2.5 pt-2 min-h-0 overflow-y-auto overflow-x-hidden flex-1 no-scrollbar">
        {tags.map((tag: string) => (
          <div key={tag} className="flex items-start gap-2 sm:gap-3 group/tag flex-shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-orange mt-1.5 flex-shrink-0 group-hover/tag:scale-150 transition-transform duration-300"></div>
            <span className="text-[9px] sm:text-[10px] font-medium text-gray-700 leading-relaxed group-hover/tag:text-primary transition-colors duration-300">{tag}</span>
          </div>
        ))}
      </div>
      {/* Liséré orange en bas, à l'intérieur des bords arrondis */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-xl sm:rounded-b-2xl pointer-events-none"></div>
    </div>
  </div>
);

export default Seminaires;
