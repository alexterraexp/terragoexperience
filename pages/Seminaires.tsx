import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IMAGES } from '../constants';
import CustomSelect from '../components/CustomSelect';
import ParticipantsSelect from '../components/ParticipantsSelect';
import ScrollAnimate from '../components/ScrollAnimate';

// Images de fond pour le hero
const heroImages = [
  'https://images.unsplash.com/photo-1556159991-b4876ad5ef9b?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1761839259494-71caddcdd6b3?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1504224357642-c87eacea1da4?q=80&w=1750&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1586973831237-7d8dd03a996f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1633509928027-f1c3b5dc1f92?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

type UniversData = {
  id: string;
  label: string;
  badge: string;
  description: string;
  activites: string[];
  saison: string;
  couleur: string;
};

const UNIVERS_DATA: Record<string, UniversData> = {
  cognac: {
    id: 'cognac',
    label: 'AUTOUR DU COGNAC',
    badge: "COGNAC • 40 MIN D'ANGOULÊME TGV",
    description: "Des vignes aux alambics de cuivre, vivez la magie de la double distillation dans les chais centenaires de la Charente.",
    activites: ['Participation aux vendanges', 'Fabrication de son propre pineau', 'Visite des chais et alambics', 'Golf entre les vignes'],
    saison: "Toute l'année",
    couleur: '#rgb(92, 42, 9)',
  },
  olive: {
    id: 'olive',
    label: "AUTOUR DE L'OLIVE",
    badge: "VALENSOLE • 45 MIN D'AIX EN PROVENCE TGV",
    description: "Sous les oliviers centenaires de Provence, découvrez comment naît une huile d'exception, entre lavande et soleil.",
    activites: ['Apprentissage et récolte des olives', 'Fabrication de son huile', 'Récolte de lavandes fines', "Distillation de son parfum d'ambiance"],
    saison: 'Octobre – Décembre',
    couleur: 'rgb(72, 107, 9)',
  },
  noix: {
    id: 'noix',
    label: "AUTOUR DE LA NOIX",
    badge: "Romans-sur-Isère • 15 MIN De VALENCE TGV",
    description: "Parmi les noyers centenaires, apprenez la récolte et la fabrication d'une huile de noix artisanale d'une finesse rare.",
    activites: ['Apprentissage et récolte des noix', 'Fabrication de son huile/vin de noix', 'Session Trail dans un cadre magnifique'],
    saison: 'Septembre – Novembre',
    couleur: 'rgb(161, 68, 7)',
  },
  truffe: {
    id: 'truffe',
    label: "AUTOUR DE LA TRUFFE",
    badge: "CHINON • 1H DE TOURS TGV",
    description: "Partez à la découverte du champignon le plus mystérieux de France avec un trufficulteur passionné au cœur du Périgord.",
    activites: ['Cavage et découverte de la truffe', 'Atelier cuisine autour de la truffe', 'Ferme florale et potager', 'Dégustation de produits truffés'],
    saison: 'Décembre – Mars',
    couleur: 'rgb(104, 102, 42)',
  },
  fromage: {
    id: 'fromage',
    label: "AUTOUR DU FROMAGE DE CHÈVRE",
    badge: "1H D'AIX-EN-PROVENCE TGV",
    description: "Vivez une journée complète dans une ferme caprine : soins aux bêtes, fabrication du fromage et dégustation en plein air.",
    activites: ['Soins aux chèvres', 'Fabrication du fromage', 'Dégustation à la ferme', 'Visite de cave'],
    saison: "Toute l'année",
    couleur: 'rgb(177, 146, 7)',
  },
  vin: {
    id: 'vin',
    label: "AUTOUR DU VIN AOC VENTOUX",
    badge: "Bédoin • 1H D'AVIGNON TGV",
    description: "Les mains dans la terre, entre vignes et ciel provençal, vivez l'aventure viticole au pied du Mont Ventoux.",
    activites: ['Les mains dans la terre', 'Activité autour de la vigne', 'Soirée soleil et guinguette', 'Excursion vélo au Mont Ventoux'],
    saison: 'Avril – Octobre',
    couleur: 'rgb(106, 13, 13))',
  },
};

const UNIVERS_TO_FILTER: Record<string, string> = {
  cognac: 'Spiritueux',
  olive: 'Olives',
  noix: 'Noix',
  truffe: 'Truffes',
  fromage: 'Élevages',
  vin: 'Vins',
};

const Seminaires: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [hasAccommodation, setHasAccommodation] = useState(false);
  const [hasTransport, setHasTransport] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [selectedUniversModal, setSelectedUniversModal] = useState<UniversData | null>(null);
  const [isUniversModalClosing, setIsUniversModalClosing] = useState(false);

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
  const [periodType, setPeriodType] = useState<'months' | 'dates'>('months');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [plaquetteEmail, setPlaquetteEmail] = useState('');
  const [plaquetteSubmitting, setPlaquetteSubmitting] = useState(false);
  const [plaquetteSuccess, setPlaquetteSuccess] = useState(false);
  const [plaquetteEmailError, setPlaquetteEmailError] = useState('');
  const examplesCarouselRef = useRef<HTMLDivElement>(null);
  const examplesScrollRef = useRef<HTMLDivElement>(null);
  const [examplesCardWidthPx, setExamplesCardWidthPx] = useState(0);
  const [selectedUniverse, setSelectedUniverse] = useState<string | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const CAROUSEL_GAP_PX = 32;
  const CAROUSEL_VISIBLE_LG = 4.5;
  const CAROUSEL_VISIBLE_TABLET = 2;
  const CAROUSEL_VISIBLE_MOBILE = 1;
  const CARD_MIN_WIDTH_PX = 280;

  // ── FIX : déclaré ici, AVANT les useEffect qui en dépendent ──────────────
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const cardWidthPx = examplesCardWidthPx > 0 ? examplesCardWidthPx : CARD_MIN_WIDTH_PX;

    useEffect(() => {
      const el = examplesCarouselRef.current;
      if (!el) return;
      const updateWidth = () => {
        const w = el.offsetWidth;
        if (w > 0) {
          const winW = typeof window !== 'undefined' ? window.innerWidth : 1200;
          const isMobileLocal = winW < 640;
          if (isMobileLocal) {
            const cardWidth = w * 0.70;
            setExamplesCardWidthPx(Math.max(CARD_MIN_WIDTH_PX, cardWidth));
          } else {
            // Tablette / desktop : nombre de cartes visibles pour éviter compression ; desktop = cartes un peu plus larges
            let visibleCards: number;
            if (winW < 768) visibleCards = 2;
            else if (winW < 1024) visibleCards = 2.5;
            else if (winW < 1280) visibleCards = 3.5;
            else visibleCards = 4;
            const rawWidth = (w - (visibleCards - 1) * CAROUSEL_GAP_PX) / visibleCards;
            setExamplesCardWidthPx(Math.max(CARD_MIN_WIDTH_PX, rawWidth));
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

  // Dots pill — suivi du scroll
  useEffect(() => {
    const el = examplesScrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const isMobileLocal = window.innerWidth < 640;
      const cardWidth = cardWidthPx + (isMobileLocal ? 16 : CAROUSEL_GAP_PX);
      if (cardWidth <= 0) return;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActiveCardIndex(index);
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [cardWidthPx]);

  const scrollExamples = (direction: 'left' | 'right') => {
    const el = examplesScrollRef.current;
    if (!el) return;
    const step = (examplesCardWidthPx > 0 ? examplesCardWidthPx : CARD_MIN_WIDTH_PX) + CAROUSEL_GAP_PX;
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

  const rotatingTexts = [
    'humains', 'simples', 'inspirants', 'captivants', 'authentiques',
    'engagés', 'gourmands', 'durables', 'sensoriels'
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
    }, 50);
    return () => clearInterval(typingInterval);
  }, [currentTextIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [rotatingTexts.length]);

  useEffect(() => {
    heroImages.forEach((imageUrl) => {
      const img = new Image();
      img.src = imageUrl;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3000);
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
    setSelectedRegions([]);
    setSelectedAccTypes([]);
    setSelectedTransport('');
    setSelectedMonths([]);
    setPeriodType('months');
    setStartDate('');
    setEndDate('');
    setHasAccommodation(false);
    setHasTransport(false);
    setFormData({ prenom: '', nom: '', email: '', entreprise: '', participants: '', periode: '', message: '' });
    document.body.style.overflow = 'hidden';
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('openModal') === 'true') {
      openModal();
      window.history.replaceState({}, '', '/entreprises');
    }
  }, [location.search]);

  const closeModal = () => {
    setIsClosing(true);
    document.body.style.overflow = 'unset';
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const openUniversModal = (universId: string) => {
    const data = UNIVERS_DATA[universId];
    if (!data) return;
    setSelectedUniversModal(data);
    setIsUniversModalClosing(false);
    document.body.style.overflow = 'hidden';
  };

  const closeUniversModal = () => {
    setIsUniversModalClosing(true);
    setTimeout(() => {
      setSelectedUniversModal(null);
      setIsUniversModalClosing(false);
      document.body.style.overflow = 'unset';
    }, 250);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedUniversModal) closeUniversModal();
        else if (isModalOpen) closeModal();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen, selectedUniversModal]);

  useEffect(() => {
    const modal = modalRef.current;
    if (modal && isModalOpen) {
      const handleWheel = (e: WheelEvent) => {
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
    setErrorMessage('');
    if (currentStep === 1) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmailMissing = !formData.email.trim();
      const isEmailInvalid = formData.email.trim() && !emailPattern.test(formData.email);
      const isPeriodMissing = periodType === 'months' ? selectedMonths.length === 0 : !startDate || !endDate;
      const isOtherMissing = !formData.prenom.trim() || !formData.nom.trim() || !formData.entreprise.trim() || !formData.participants || isPeriodMissing;
      if (isEmailMissing || isEmailInvalid || isOtherMissing) {
        setErrorMessage('Attention, il semblerait que des informations soient manquantes.');
        return;
      }
    }
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(prev => { const next = Math.min(prev + 1, 3); setIsTransitioning(false); return next; });
    }, 200);
  };

  const prevStep = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(prev => { const p = Math.max(prev - 1, 1); setIsTransitioning(false); return p; });
    }, 200);
  };

  useEffect(() => {
    if (isModalOpen && !isTransitioning) {
      const modalContent = modalRef.current?.querySelector('.overflow-y-auto') as HTMLElement;
      if (modalContent) {
        setTimeout(() => { modalContent.scrollTo({ top: 0, behavior: 'smooth' }); }, 100);
      }
    }
  }, [currentStep, isModalOpen, isTransitioning]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const emailContent = `
Nouvelle demande de séminaire - Terrago

=== INFORMATIONS CLIENT ===
Prénom: ${formData.prenom}
Nom: ${formData.nom}
Email: ${formData.email}
Entreprise: ${formData.entreprise}
Nombre de participants: ${formData.participants}
Période souhaitée: ${periodType === 'dates'
  ? (startDate && endDate ? `Du ${new Date(startDate).toLocaleDateString('fr-FR')} au ${new Date(endDate).toLocaleDateString('fr-FR')}` : 'Dates non renseignées')
  : (selectedMonths.length > 0 ? selectedMonths.join(', ') : 'Aucun mois sélectionné')}

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
    `.trim();

    try {
      const response = await fetch('https://formsubmit.co/ajax/alexso.terrago@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
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
        setTimeout(() => { closeModal(); }, 2000);
      } else {
        throw new Error("Erreur lors de l'envoi");
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous contacter directement.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePlaquetteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPlaquetteEmailError('');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!plaquetteEmail.trim()) { setPlaquetteEmailError('Veuillez renseigner une adresse mail valide'); return; }
    if (!emailPattern.test(plaquetteEmail.trim())) { setPlaquetteEmailError('Veuillez renseigner une adresse mail valide'); return; }
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
    { name: "Provence-Alpes-Côte d'Azur", icon: 'wb_sunny' }
  ];

  const accTypes = ["Chambres seules", "Chambres partagées"];

  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  const exampleCards = [
    {
      image: "https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/cognacjf/alambique.png",
      title: "Cognac & Pineau",
      desc: "Proche de Cognac",
      tags: ["Participation aux vendanges", "Fabrication de son propre pineau", "Golf entre les vignes"],
      producerImage: "/images/producteurs/cognacJF.png",
      universes: ["le cognac"],
      universId: "cognac",
      boldLabel: "AUTOUR DU COGNAC",
    },
    {
      image: "https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/OLIVEPAOLO/PAOLO4.png",
      title: "Olives & lavande",
      desc: "Proche d'Aix-en-Provence",
      tags: ["Apprentissage et récolte des olives", "Fabrication de son huile", "Récolte de lavandes fines", "Distillation de son parfum d'ambiance"],
      producerImage: "/images/producteurs/olivepaolo.png",
      universes: ["les olives", "la lavande"],
      universId: "olive",
      boldLabel: "AUTOUR DE L'OLIVE",
    },
    {
      image: "https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/noix.png",
      title: "Noix & compagnie",
      desc: "Proche de Valence",
      tags: ["Apprentissage et récolte des noix", "Fabrication de son huile/vin de noix", "Session Trail dans un cadre magnifique"],
      producerImage: "/images/producteurs/noixsabinemarie.jpeg",
      universes: ["les noix"],
      universId: "noix",
      boldLabel: "AUTOUR DE LA NOIX",
    },
    {
      image: "https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/truffe.png",
      title: "Truffe & terroir",
      desc: "Proche de Tours",
      tags: ["Cavage et découverte de la truffe", "Atelier cuisine", "Ferme florale et potager"],
      producerImage: "/images/producteurs/truffeprod.png",
      universes: ["la truffe"],
      universId: "truffe",
      boldLabel: "AUTOUR DE LA TRUFFE",
    },
    {
      image: "https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/chevres.png",
      title: "Fromage de chèvre",
      desc: "Proche d'Aix-en-Provence",
      tags: ["Soins aux chèvres", "Fabrication du fromage", "Dégustation à la ferme"],
      producerImage: "/images/producteurs/chevre-bebe.jpg",
      universes: ["le fromage de chèvre"],
      universId: "fromage",
      boldLabel: "AUTOUR DU FROMAGE",
    },
    {
      image: "https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/cognacjf/cognac.jpg",
      title: "Vin AOC Ventoux",
      desc: "Proche de Valence",
      tags: ["Les mains dans la terre", "Activité autour de la vigne", "Soirée soleil et guinguette", "Excursion vélo au Mont Ventoux"],
      producerImage: "/images/producteurs/vincombeaumas.png",
      universes: ["le vin"],
      universId: "vin",
      boldLabel: "AUTOUR DU VIN",
    },
  ];

  const filteredCards = selectedUniverse
    ? exampleCards.filter(card => card.universes.includes(selectedUniverse))
    : exampleCards;

  return (
    <div className="pt-24 font-sans bg-beige-bg min-h-screen">

      {/* ── Hero Section ─────────────────────────────────────────────────────── */}
      <section className="relative w-full px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24 text-center min-h-[60vh] sm:min-h-[65vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden mb-12 sm:mb-16">
        <div className="absolute inset-0 w-full h-full">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
              }`}
              style={{ backgroundImage: `url('${image}')` }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-3xl mx-auto text-white px-0">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-white/10 backdrop-blur-md text-white text-[8px] sm:text-[9px] uppercase tracking-[0.3em] font-bold font-sans mb-4 sm:mb-6 rounded-full shadow-md border border-white/20">
            Immersion & Cohésion
          </span>
          <h1 className="text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 sm:mb-6 flex flex-col sm:flex-row items-center sm:items-baseline justify-center gap-x-2 gap-y-1 sm:gap-y-0 whitespace-normal sm:whitespace-nowrap sm:flex-nowrap drop-shadow-lg px-0">
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
              <span className="relative z-10">Organiser votre séminaire</span>
            </button>
            <Link
              to="/entreprises?scroll=nos-univers"
              className="text-white border-b-2 border-white/50 hover:border-white px-3 py-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center"
            >
              Découvrir nos univers
            </Link>
          </div>
        </div>
      </section>

      {/* ── Pillars Section ───────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 max-w-[1400px] mx-auto px-0 sm:px-0 lg:px-0">
        <div className="text-center mb-6 sm:mb-16">
          <p className="mt-2 mb-2 sm:mb-4 text-primary/90 text-xs tracking-[0.4em]">⭐⭐⭐⭐⭐</p>
          <span className="inline-block px-3 py-1 bg-orange text-white font-bold font-sans tracking-[0.3em] uppercase text-[8px] sm:text-[9px] mb-2 sm:mb-4 rounded-full shadow-md">5 étoiles</span>
          <div className="overflow-x-auto no-scrollbar text-center mb-2 sm:mb-4 pb-2 min-h-[1.4em]">
            <ScrollAnimate delay={150}>
              <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-primary leading-normal inline-block w-max sm:w-max whitespace-normal sm:whitespace-nowrap px-0">
                <span className="font-sans not-italic text-[0.7em] md:text-[0.7em]">Des séminaires </span><span className="font-display italic">5 étoiles</span>
              </h2>
            </ScrollAnimate>
          </div>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-4xl mx-auto mb-4 text-center px-4">
            Nos "5 étoiles" ne se mesurent pas au luxe, mais aux liens humains, au contact de la terre et à l'engagement des producteurs. Des expériences sincères qui renforcent la cohésion et laissent une trace durable.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-start max-w-[320px] sm:max-w-none mx-auto sm:mx-0">
          <PillarCard icon="diversity_3" title="HUMAIN" text="Décrochez et découvrez la richesse de vos équipes par des échanges vrais en rencontrant ceux qui nous nourrissent." />
          <PillarCard icon="handyman" title="IMMERSIF" text="Sortez de votre zone de confort et exprimez-vous en mettant les mains dans la Terre (vendanger, récolter, tailler, presser, effeuiller ...). Vous allez vous en souvenir !" />
          <PillarCard icon="restaurant" title="AUTHENTIQUE" text="Retrouvez le sens de l'essentiel au contact de producteurs qui incarnent la vérité et l'exigence du terrain." />
          <PillarCard icon="eco" title="ENGAGÉ" text="Transformez votre séminaire en acte managérial fort en soutenant directement ceux qui agissent pour la Terre." />
          <PillarCard icon="handshake" title="PASSIONNANT" text="Utilisez le terroir comme fondation pour reconstruire une cohésion d'équipe naturelle et durable. Vous allez créer de beaux souvenirs." />
        </div>
      </section>

      {/* ── NOS GARANTIES ─────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-6 sm:mb-14">
            <span className="inline-block px-3 py-1 bg-orange text-white font-bold tracking-[0.3em] uppercase text-[8px] sm:text-[9px] font-sans rounded-full shadow-md mb-2 sm:mb-4">Nos garanties</span>
            <div className="overflow-x-auto no-scrollbar text-center mb-2 sm:mb-4 pb-2 min-h-[1.4em]">
              <ScrollAnimate delay={200}>
                <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary leading-none sm:leading-tight block sm:inline-block w-full sm:w-max whitespace-normal sm:whitespace-nowrap px-2 sm:px-0">
                  <span className="font-sans not-italic text-[0.7em] md:text-[0.7em]">Tous nos séminaires </span><span className="font-display italic">vous garantissent</span>
                </h2>
              </ScrollAnimate>
            </div>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 list-none p-0 m-0 max-w-[340px] sm:max-w-none mx-auto sm:mx-0">
            {[
              { icon: 'groups', label: 'Rencontres authentiques', text: 'Visites et échanges avec des producteurs engagés.' },
              { icon: 'eco', label: 'Sensibilisation environnementale', text: 'Sensibilisation aux valeurs de durabilité, du vivant et du savoir-faire local.' },
              { icon: 'restaurant', label: "Du champ à l'assiette", text: 'Tous vos repas deviennent des expériences gourmandes et locales.' },
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

      {/* ── NOS FORMATS ───────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 px-0 sm:px-0 lg:px-0 bg-beige-bg">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-block px-3 py-1 bg-orange text-white font-bold tracking-[0.3em] uppercase text-[8px] sm:text-[9px] font-sans rounded-full shadow-md mb-2 sm:mb-4">
              Nos formats
            </span>
            <div className="overflow-x-auto no-scrollbar text-center mb-2 sm:mb-4 pb-2 min-h-[1.4em]">
              <ScrollAnimate delay={200}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-primary leading-none sm:leading-tight inline-block w-full sm:w-max whitespace-normal sm:whitespace-nowrap px-2 sm:px-0">
                  <span className="font-sans not-italic text-[0.8em] md:text-[0.8em]">Des formats pensés </span>
                  <span className="font-display italic">pour vos équipes</span>
                </h2>
              </ScrollAnimate>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: 'calendar_today',
                tag: 'Format court',
                label: 'À la journée',
                text: 'Un format concentré pour (re)mettre du sens dans une journée hors du bureau, au contact direct du terroir.',
                duration: '1 jour',
                people: 'dès 10 pers.',
              },
              {
                icon: 'event',
                tag: 'Format immersif',
                label: 'Sur 2 jours',
                text: 'Deux jours pour alterner temps de travail, immersion dans les exploitations et moments de respiration en équipe.',
                duration: '2 jours',
                people: 'dès 10 pers.',
              },
              {
                icon: 'design_services',
                tag: 'Format plus',
                label: 'Sur mesure',
                text: 'Un séminaire entièrement construit avec vous : rythme, intensité, interventions et producteurs partenaires.',
                duration: 'Durée libre',
                people: 'toute taille',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="h-full rounded-2xl bg-white/80 border border-black/5 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 p-5 sm:p-6 flex flex-col gap-3"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-1">
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-orange">
                  {item.tag}
                </div>
                <h3 className="font-sans font-bold text-primary text-base sm:text-lg">
                  {item.label}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                  {item.text}
                </p>
                <div className="mt-2 pt-4 border-t border-black/6 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span>{item.duration} · {item.people}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOS UNIVERS ───────────────────────────────────────────────────────── */}
      <section id="nos-univers" className="py-16 sm:py-20 lg:py-24 px-0 sm:px-0 lg:px-0 bg-gradient-to-b from-white to-beige-bg border-y border-black/10 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-4 sm:mb-6">
            <span className="inline-block px-3 py-1 bg-orange text-white font-bold font-sans tracking-[0.3em] uppercase text-[8px] sm:text-[9px] mb-2 sm:mb-4 rounded-full shadow-md transform translate-x-1 -translate-y-0.5">Univers</span>
            <div className="overflow-x-auto no-scrollbar text-center">
              <ScrollAnimate delay={150}>
                <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-primary leading-tight px-0 inline-block w-max sm:w-max whitespace-normal sm:whitespace-nowrap">
                  <span className="font-sans not-italic text-[0.7em] md:text-[0.7em]">Nos premiers </span><span className="font-display italic">univers</span>
                </h2>
              </ScrollAnimate>
            </div>
          </div>

          {/* Pills filtres */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12 px-4">
            {['le vin', 'la truffe', 'les olives', 'la lavande', 'le fromage de chèvre', 'les noix', 'le cognac'].map((product) => (
              <div
                key={product}
                onClick={() => setSelectedUniverse(selectedUniverse === product ? null : product)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group ${
                  selectedUniverse === product
                    ? 'bg-orange border-orange text-white'
                    : 'bg-white border-black/10 hover:border-primary/30'
                }`}
              >
                <span className={`text-[9px] sm:text-[10px] font-sans font-medium uppercase tracking-wider ${
                  selectedUniverse === product ? 'text-white' : 'text-primary group-hover:text-primary/80'
                }`}>
                  {product}
                </span>
              </div>
            ))}
          </div>

          {/* Badge + flèches navigation */}
          <div className="mb-4 sm:mb-8 max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6">
            <div className="flex items-center justify-center gap-4 sm:gap-6 relative">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-bold font-sans tracking-[0.2em] uppercase text-[8px] sm:text-[9px] rounded-full border border-primary/20">
                Quelques-uns de nos exemples
              </span>
              <div className="hidden sm:flex gap-3 items-center">
                <button type="button" onClick={() => scrollExamples('left')} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-black/10 shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95" aria-label="Exemples précédents">
                  <span className="material-symbols-outlined text-2xl">chevron_left</span>
                </button>
                <button type="button" onClick={() => scrollExamples('right')} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-black/10 shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95" aria-label="Exemples suivants">
                  <span className="material-symbols-outlined text-2xl">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* Carousel */}
          <div className="relative w-screen left-1/2 -translate-x-1/2 pb-6 sm:pb-8">
            <div ref={examplesCarouselRef} className="w-screen mb-4 sm:mb-6 py-4 pb-4 sm:pb-6">
              <div
                ref={examplesScrollRef}
                className="no-scrollbar flex overflow-x-scroll overflow-y-visible py-2 -my-2 pb-4 sm:pb-6 scroll-smooth"
                style={{
                  gap: isMobile ? 16 : CAROUSEL_GAP_PX,
                  paddingLeft: isMobile ? (window.innerWidth - examplesCardWidthPx) / 2 : 48,
                  paddingRight: isMobile ? (window.innerWidth - examplesCardWidthPx) / 2 : 48, 
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
                {filteredCards.length > 0 ? (
                  filteredCards.map((card) => (
                    <div key={`${card.title}-${card.desc}`} className="flex-shrink-0" style={{ width: cardWidthPx }}>
                      <UniverseCard
                        {...card}
                        onOpenModal={() => openUniversModal(card.universId)}
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex-shrink-0 w-full text-center py-8">
                    <p className="text-gray-500 text-sm">Aucune carte disponible pour cet univers.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Dots pill — mobile uniquement */}
          <div className="sm:hidden flex justify-center items-center gap-1.5 pt-2 pb-4">
            {filteredCards.map((_, idx) => (
              <div
                key={idx}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: idx === activeCardIndex ? 20 : 6,
                  height: 6,
                  background: idx === activeCardIndex ? '#f78d00' : 'rgba(0,0,0,0.12)',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── PLAQUETTE ─────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-primary/5 rounded-full -mr-24 -mt-24 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-orange/5 rounded-full -ml-24 -mb-24 blur-3xl" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="glass rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-12 border border-white/30 shadow-premium text-center hover:shadow-premium-hover transition-all duration-500">
            <span className="inline-block px-2.5 py-1 bg-orange text-white font-bold tracking-[0.25em] uppercase text-[7px] sm:text-[8px] font-sans rounded-full mb-3 sm:mb-6">Nos offres</span>
            <div className="text-center mb-2 sm:mb-4">
              <ScrollAnimate delay={250}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary italic leading-tight w-full sm:w-max sm:mx-auto whitespace-normal sm:whitespace-nowrap break-words sm:break-normal">
                  Recevez notre plaquette 2026
                </h2>
              </ScrollAnimate>
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
                      onChange={(e) => { setPlaquetteEmail(e.target.value); setPlaquetteEmailError(''); }}
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

      {/* ── MODAL UNIVERS ─────────────────────────────────────────────────────── */}
      {selectedUniversModal && (
        <div
          onClick={closeUniversModal}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(10,20,10,0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
            opacity: isUniversModalClosing ? 0 : 1,
            transition: 'opacity 0.25s ease',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: 28,
              maxWidth: 620,
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 40px 100px rgba(0,0,0,0.35)',
              transform: isUniversModalClosing ? 'translateY(20px) scale(0.97)' : 'translateY(0) scale(1)',
              transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            {(() => {
              const card = exampleCards.find(c => c.universId === selectedUniversModal.id);
              return (
                <div style={{ position: 'relative', height: 180, overflow: 'visible', flexShrink: 0 }}>
                  <img
                    src={card?.image ?? ''}
                    alt={selectedUniversModal.label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${selectedUniversModal.couleur} -10%, transparent 0%)` }} />
                  <button
                    onClick={closeUniversModal}
                    style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.95)', border: 'none', borderRadius: '50%', width: 38, height: 38, cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#1e291a' }}
                  >×</button>
                  <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', borderRadius: 20, padding: '5px 12px', fontSize: 9.5, fontWeight: 700, color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'inherit' }}>
                    {selectedUniversModal.badge}
                  </div>
                  <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, fontSize: 'clamp(18px, 3vw, 28px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, textTransform: 'uppercase', letterSpacing: '-0.01em', textShadow: '0 2px 12px rgba(0,0,0,0.4)', fontFamily: 'inherit' }}>
                    {selectedUniversModal.label}
                  </div>
                  {card?.producerImage && (
                    <img
                      src={card.producerImage}
                      alt=""
                      style={{ position: 'absolute', bottom: -36, right: 24, width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                    />
                  )}
                </div>
              );
            })()}
            <div style={{ padding: '32px 28px 28px', fontFamily: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#1e291a' }}>
                  {exampleCards.find(c => c.universId === selectedUniversModal.id)?.title}
                </div>
                <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 5 }}>📅 {selectedUniversModal.saison}</div>
              </div>
              <p style={{ fontSize: 13.5, color: '#6b7280', lineHeight: 1.7, marginBottom: 20 }}>
                {selectedUniversModal.description}
              </p>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#9ca3af', textTransform: 'uppercase', marginBottom: 10 }}>Au programme</div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {selectedUniversModal.activites.map((a) => (
                    <li key={a} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#374151' }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#f78d00', flexShrink: 0, display: 'inline-block' }} />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => { closeUniversModal(); openModal(); }}
                style={{ width: '100%', background: '#1e291a', color: '#fff', border: 'none', borderRadius: 14, padding: '15px', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s' }}
                onMouseOver={e => (e.currentTarget.style.background = '#2b3825')}
                onMouseOut={e => (e.currentTarget.style.background = '#1e291a')}
              >
                Demander un devis pour cet univers →
              </button>
              {UNIVERS_TO_FILTER[selectedUniversModal.id] && (
                <button
                  onClick={() => {
                    const filter = UNIVERS_TO_FILTER[selectedUniversModal.id];
                    closeUniversModal();
                    navigate(`/partenaires?filter=${encodeURIComponent(filter)}`);
                  }}
                  style={{
                    width: '100%', marginTop: 10, background: 'rgba(247,141,0,0.08)', color: '#f78d00',
                    border: '1.5px solid rgba(247,141,0,0.3)', borderRadius: 14, padding: '13px', fontSize: 12,
                    fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
                    fontFamily: 'inherit', transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = '#f78d00'; e.currentTarget.style.color = '#fff'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(247,141,0,0.08)'; e.currentTarget.style.color = '#f78d00'; }}
                >
                  Voir nos producteurs partenaires →
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL SÉMINAIRE ───────────────────────────────────────────────────── */}
      {isModalOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ pointerEvents: isClosing ? 'none' : 'auto' }}
        >
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
            onClick={closeModal}
          />
          <div
            className={`bg-white w-full max-w-[95%] sm:max-w-5xl h-[85vh] max-h-[85vh] sm:h-[90vh] sm:max-h-[90vh] md:h-[85vh] rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative z-10 font-sans transition-all duration-300 ${
              isClosing ? 'opacity-0 scale-95 translate-y-8' : 'opacity-100 scale-100 translate-y-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 md:px-10 py-4 md:py-6 bg-white border-b border-black/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                <div className="size-8 md:size-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shrink-0">
                  <span className="material-symbols-outlined text-xl md:text-2xl">event_available</span>
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg md:text-2xl font-bold text-primary leading-tight truncate">
                    <span className="font-sans not-italic text-sm md:text-base">Votre projet de séminaire </span>
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

            {errorMessage && (
              <div className="px-6 md:px-12 pt-4 shrink-0 animate-in fade-in">
                <div className="bg-orange/10 border border-orange/30 rounded-xl px-4 py-3 flex items-center gap-3">
                  <span className="material-symbols-outlined text-orange text-lg">error</span>
                  <p className="text-[11px] font-sans font-medium text-orange flex-1">{errorMessage}</p>
                  <button onClick={() => setErrorMessage('')} className="text-orange hover:text-orange/70 transition-colors" aria-label="Fermer">
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                </div>
              </div>
            )}

            <div className={`px-6 md:px-12 ${errorMessage ? 'pt-4' : 'pt-6'} md:pt-8 shrink-0`}>
              <div className="flex items-center justify-between mb-3 px-1 gap-2">
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-orange shrink-0">Étape {currentStep} <span className="text-gray-200 mx-1 md:mx-2">/</span> 3</span>
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-primary text-right truncate">
                  {currentStep === 1 ? 'Coordonnées & Participants' : currentStep === 2 ? 'Choix du lieu' : 'Organisation Logistique'}
                </span>
              </div>
              <div className="h-1.5 w-full bg-beige-bg rounded-full overflow-hidden border border-black/5 relative">
                <div className="absolute top-0 left-0 h-full bg-orange rounded-full transition-all duration-700 ease-in-out shadow-sm" style={{ width: `${(currentStep / 3) * 100}%`, minWidth: '4px' }} />
              </div>
            </div>

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

            <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
              <div className="max-w-4xl mx-auto">
                {currentStep === 1 && (
                  <div className={`space-y-10 transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                    <div>
                      <h3 className="text-3xl font-display font-bold text-primary italic mb-2">Commençons par vous.</h3>
                      <p className="text-xs text-gray-400 font-light italic">Dites-nous qui vous êtes pour mieux cerner vos besoins.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <FormInput label="Prénom" placeholder="Jean" icon="person" value={formData.prenom} onChange={(e: any) => setFormData({...formData, prenom: e.target.value})} required />
                      <FormInput label="Nom" placeholder="Dupont" value={formData.nom} onChange={(e: any) => setFormData({...formData, nom: e.target.value})} required />
                      <FormInput label="Email Professionnel" placeholder="contact@entreprise.fr" type="email" icon="mail" value={formData.email} onChange={(e: any) => setFormData({...formData, email: e.target.value})} required />
                      <FormInput label="Nom de l'Entreprise" placeholder="Terroir SAS" icon="business" value={formData.entreprise} onChange={(e: any) => setFormData({...formData, entreprise: e.target.value})} required />
                      <ParticipantsSelect label="Nombre de participants" icon="groups" value={formData.participants} onChange={(value: any) => setFormData({...formData, participants: value})} required />
                      <div className="space-y-3 md:col-span-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">calendar_today</span> Période Souhaitée
                          <span className="text-orange">*</span>
                        </label>
                        <div className="flex gap-2 mb-3">
                          <button type="button" onClick={() => { setPeriodType('dates'); setSelectedMonths([]); }} className={`px-4 py-2 rounded-lg border text-[8px] font-bold uppercase tracking-wider transition-all ${periodType === 'dates' ? 'border-primary bg-primary text-white' : 'border-black/10 bg-white text-gray-600 hover:border-primary/40'}`}>Dates précises</button>
                          <button type="button" onClick={() => { setPeriodType('months'); setStartDate(''); setEndDate(''); }} className={`px-4 py-2 rounded-lg border text-[8px] font-bold uppercase tracking-wider transition-all ${periodType === 'months' ? 'border-primary bg-primary text-white' : 'border-black/10 bg-white text-gray-600 hover:border-primary/40'}`}>Choix du/des mois</button>
                        </div>
                        {periodType === 'dates' ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="relative">
                              <label htmlFor="start-date" className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Date de début</label>
                              <input id="start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full bg-beige-bg/40 border border-black/5 rounded-xl px-4 py-3 text-xs font-sans focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all cursor-pointer" />
                            </div>
                            <div className="relative">
                              <label htmlFor="end-date" className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Date de fin</label>
                              <input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} min={startDate || new Date().toISOString().split('T')[0]} className="w-full bg-beige-bg/40 border border-black/5 rounded-xl px-4 py-3 text-xs font-sans focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all cursor-pointer" />
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {months.map((month) => (
                              <button key={month} type="button" onClick={() => toggleSelection(selectedMonths, setSelectedMonths, month)} className={`px-3 py-2 rounded-lg border cursor-pointer transition-all duration-300 flex items-center gap-1.5 ${selectedMonths.includes(month) ? 'border-primary bg-primary text-white shadow-md shadow-primary/20' : 'border-black/10 bg-white hover:border-primary/40 hover:bg-primary/5 text-gray-600'}`}>
                                <span className={`text-[8px] font-bold uppercase tracking-wider font-sans whitespace-nowrap ${selectedMonths.includes(month) ? 'text-white' : 'text-gray-600'}`}>{month}</span>
                                {selectedMonths.includes(month) && <span className="material-symbols-outlined text-white text-xs">check</span>}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className={`space-y-10 transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                    <div>
                      <h3 className="text-3xl font-display font-bold text-primary italic mb-2">Où partir ?</h3>
                      <p className="text-xs text-gray-400 font-light italic">Où souhaitez-vous vivre l'expérience ? Nos domaines vous accueillent dans les plus belles régions de France.</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 border-b border-black/5 pb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        Région(s) souhaitée(s)
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {regionsOptions.map((region) => (
                          <button key={region.name} type="button" onClick={() => toggleSelection(selectedRegions, setSelectedRegions, region.name)} className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col items-center text-center gap-2 group relative overflow-hidden ${selectedRegions.includes(region.name) ? 'border-primary bg-primary/10 shadow-xl -translate-y-1' : 'border-black/10 bg-white hover:border-primary/20 hover:shadow-lg'}`}>
                            <div className={`size-12 rounded-xl flex items-center justify-center transition-all duration-300 ${selectedRegions.includes(region.name) ? 'bg-primary text-white shadow-lg' : 'bg-beige-bg text-gray-400 group-hover:text-primary'}`}>
                              <span className="material-symbols-outlined text-2xl">{region.icon}</span>
                            </div>
                            <span className={`text-sm font-bold font-sans leading-tight ${selectedRegions.includes(region.name) ? 'text-primary' : 'text-primary/90'}`}>{region.name}</span>
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
                          <input type="text" value={autreRegion} onChange={(e) => setAutreRegion(e.target.value)} placeholder="Ex : Bretagne, Occitanie…" className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Ville (libre)</label>
                          <input type="text" value={villeLibre} onChange={(e) => setVilleLibre(e.target.value)} placeholder="Ex : Bordeaux, Lyon…" className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all" />
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
                              <button key={type} onClick={() => toggleSelection(selectedAccTypes, setSelectedAccTypes, type)} className={`px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest border transition-all ${selectedAccTypes.includes(type) ? 'bg-orange text-white border-orange shadow-md' : 'bg-white text-gray-400 border-black/5 hover:border-primary/20'}`}>{type}</button>
                            ))}
                          </div>
                        )}
                      </div>
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
                            {["De porte à porte", "Depuis gare SNCF proche"].map(opt => (
                              <button key={opt} onClick={() => setSelectedTransport(opt)} className={`px-3 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest border transition-all ${selectedTransport === opt ? 'bg-orange text-white border-orange shadow-md' : 'bg-white text-gray-400 border-black/5 hover:border-primary/20'}`}>{opt}</button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-3 pt-4">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">edit_note</span> Un message particulier ?
                      </label>
                      <textarea rows={3} className="w-full bg-beige-bg/40 border border-black/5 rounded-[2rem] px-8 py-6 text-[12px] font-sans font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all shadow-inner outline-none resize-none placeholder:text-gray-300 italic" placeholder="Besoin de salles de réunion spécifiques, de pauses gourmandes, d'activités team building particulières..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 md:px-12 py-3 md:py-4 bg-beige-bg/20 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <button disabled={currentStep === 1} onClick={prevStep} className={`text-[9px] md:text-[10px] font-bold flex items-center gap-2 md:gap-3 tracking-[0.2em] uppercase transition-all font-sans group w-full sm:w-auto justify-center sm:justify-start ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-primary hover:text-primary/70'}`}>
                <span className="material-symbols-outlined text-base md:text-lg transition-transform group-hover:-translate-x-1">west</span> Précédent
              </button>
              <div className="flex gap-3 md:gap-4 w-full sm:w-auto">
                <button onClick={closeModal} className="flex-1 sm:flex-none px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl border border-black/10 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] font-sans hover:bg-white hover:border-black/20 transition-all active:scale-95 shadow-sm">Annuler</button>
                <button onClick={currentStep < 3 ? nextStep : handleSubmit} disabled={isSubmitting} className={`flex-1 sm:flex-none bg-primary text-white px-8 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold uppercase tracking-[0.2em] text-[9px] md:text-[10px] font-sans shadow-xl hover:bg-primary/90 hover:text-white hover:shadow-primary/30 active:bg-primary/90 active:text-white focus:bg-primary/90 focus:text-white focus:outline-none transition-all duration-300 sm:min-w-[180px] active:scale-95 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                  {isSubmitting ? (
                    <><div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>Envoi en cours...</>
                  ) : (
                    <>{currentStep === 3 ? 'Finaliser le brief' : 'Continuer'}{currentStep < 3 && <span className="material-symbols-outlined text-sm md:text-base">east</span>}{currentStep === 3 && <span className="material-symbols-outlined text-sm md:text-base">task_alt</span>}</>
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
        className={`w-full bg-beige-bg/40 border rounded-2xl px-6 py-4 text-[12px] font-sans font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all shadow-sm outline-none placeholder:text-gray-300 ${type === "email" && value && !isValidEmail ? 'border-orange/50 focus:ring-orange/20' : 'border-black/5'}`}
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
    <div className="p-5 sm:p-6 flex flex-col items-center text-center">
      <div className="size-6 sm:size-7 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
        <span className="material-symbols-outlined text-sm sm:text-base">{icon}</span>
      </div>
      <h3 className="text-xs sm:text-sm font-sans font-semibold text-primary not-italic leading-tight mt-3 sm:mt-4">{title}</h3>
      <div className="max-h-0 overflow-hidden group-hover:max-h-[160px] transition-all duration-500 ease-out">
        <p className="text-xs sm:text-sm font-medium text-gray-700 leading-relaxed group-hover:text-primary pt-3 sm:pt-4">{text}</p>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  </div>
);

const UniverseCard = ({ image, title, desc, tags, producerImage, boldLabel, onOpenModal }: any) => (
  <div
    className="group relative bg-white rounded-xl sm:rounded-2xl transition-all duration-500 border border-black/5 flex flex-col cursor-pointer overflow-hidden"
    style={{ height: 480, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
    onClick={onOpenModal}
  >
    <div className="relative flex-shrink-0 overflow-hidden" style={{ height: 220 }}>
      <img
        src={image}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        alt={title}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-md">
        <p className="text-[7px] sm:text-[8px] font-bold text-primary uppercase tracking-wider font-sans">{desc}</p>
      </div>
      <div className="absolute bottom-10 left-4 right-4">
        <p
          className="font-sans font-black text-white uppercase leading-none"
          style={{ fontSize: 'clamp(15px, 2vw, 20px)', letterSpacing: '-0.01em', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
        >
          {boldLabel}
        </p>
      </div>
    </div>
    {producerImage && (
      <div
        className="absolute z-20 rounded-full border-4 border-white shadow-md ring-2 ring-black/10 bg-white overflow-hidden"
        style={{ width: 60, height: 60, top: 190, right: 16 }}
      >
        <img src={producerImage} alt="" className="w-full h-full object-cover" />
      </div>
    )}
    <div className="relative flex flex-col px-4 sm:px-5 pt-10 pb-4" style={{ flex: 1 }}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-6 bg-primary group-hover:bg-orange rounded-full flex-shrink-0 transition-colors duration-300" />
        <h3 className="text-base font-sans font-bold text-primary not-italic leading-tight group-hover:text-orange transition-colors duration-300">{title}</h3>
      </div>
      <div className="flex flex-col gap-2" style={{ minHeight: 120 }}>
        {tags.map((tag: string) => (
          <div key={tag} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-orange mt-1.5 flex-shrink-0" />
            <span className="text-[9px] sm:text-[10px] font-medium text-gray-600 leading-relaxed">{tag}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-3 border-t border-black/5 flex items-center justify-between">
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Voir le détail</span>
        <span className="text-[10px] font-bold text-orange">→</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  </div>
);

export default Seminaires;
