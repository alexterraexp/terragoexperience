
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../constants';
import ParticipantsSelect from '../components/ParticipantsSelect';

const SEMINAR_OFFERS = [
  { id: 1, type: 'olives', title: 'Le Domaine des Oliviers Millénaires', region: 'Provence', pax: '8 à 24 pax', img: 'https://images.unsplash.com/photo-1644940642314-a310d49a4750?q=80&w=800' },
  { id: 2, type: 'olives', title: 'L\'Oliveraie de Haute-Provence', region: 'Luberon', pax: '10 à 30 pax', img: 'https://plus.unsplash.com/premium_photo-1682129345906-f0d55ec5d0ec?q=80&w=800' },
  { id: 3, type: 'truffe', title: 'Château des Diamants Noirs', region: 'Périgord', pax: '6 à 18 pax', img: 'https://images.unsplash.com/photo-1601170022284-3a8b1eedf844?q=80&w=800' },
  { id: 4, type: 'fromage', title: 'La Bergerie des Sommets', region: 'Auvergne', pax: '12 à 40 pax', img: 'https://images.unsplash.com/photo-1559492302-0669e721a0f9?q=80&w=800' },
  { id: 5, type: 'huitres', title: 'L\'Escale Ostréicole du Bassin', region: 'Arcachon', pax: '8 à 15 pax', img: 'https://images.unsplash.com/photo-1712940124092-820ba444b324?q=80&w=800' },
  { id: 6, type: 'vin', title: 'Les Chais de l\'Excellence', region: 'Cognac', pax: '15 à 60 pax', img: 'https://images.unsplash.com/photo-1542835497-a6813df96ed9?q=80&w=800' },
  { id: 7, type: 'vin', title: 'Le Clos du Terroir Val de Loire', region: 'Chinon', pax: '10 à 32 pax', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800' },
];

const SeminarDomains: React.FC = () => {
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
  const [selectedAccTypes, setSelectedAccTypes] = useState<string[]>([]);
  const [selectedTransport, setSelectedTransport] = useState<string>('');
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  
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
        // Scroll vers le haut lors du changement d'étape
        const modalContent = modalRef.current?.querySelector('.overflow-y-auto') as HTMLElement;
        if (modalContent) {
          modalContent.scrollTo({ top: 0, behavior: 'smooth' });
        }
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
        // Scroll vers le haut lors du changement d'étape
        const modalContent = modalRef.current?.querySelector('.overflow-y-auto') as HTMLElement;
        if (modalContent) {
          modalContent.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setIsTransitioning(false);
        return prevStep;
      });
    }, 200);
  };

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

  const toggleSelection = (list: string[], setList: (l: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const regionsOptions = [
    { name: 'Nouvelle-Aquitaine', icon: 'sailing' },
    { name: 'Auvergne-Rhône-Alpes', icon: 'terrain' },
    { name: 'Provence-Alpes-Côte d\'Azur', icon: 'wb_sunny' }
  ];

  const accTypes = ["Chambre seule", "Chambre partagée", "Insolite", "Moderne", "Chaleureux", "Brut"];
  
  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  return (
    <div className="pt-24 bg-beige-bg font-sans min-h-screen">
      
      {/* ESPACE PRÉSENTATION */}
      <section className="px-6 lg:px-12 py-16 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 space-y-8">
            <span className="text-orange font-bold tracking-[0.4em] uppercase text-[9px]">Destinations 100% locales</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-primary italic leading-tight">
              Où le travail <br /> rencontre l'essentiel.
            </h1>
            <p className="text-gray-500 text-lg font-light leading-relaxed italic">
              Nos domaines ne sont pas de simples salles de réunion. Ce sont des lieux de vie, des exploitations en activité où chaque mur raconte une story et chaque repas célèbre la terre.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-5 py-3 bg-white rounded-2xl border border-black/5 shadow-sm">
                <span className="material-symbols-outlined text-orange text-lg">verified</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">100% Local</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-3 bg-white rounded-2xl border border-black/5 shadow-sm">
                <span className="material-symbols-outlined text-orange text-lg">sensors</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Équipé & Connecté</span>
              </div>
              <button onClick={openModal} className="bg-primary text-white px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-black transition-all font-sans">
                Organiser mon séminaire
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl rotate-2">
                <img src={IMAGES.vineyard} className="w-full h-full object-cover" alt="Domain overview" />
             </div>
             <div className="absolute -bottom-6 -left-6 bg-primary text-white p-8 rounded-[2rem] shadow-xl">
                <p className="text-3xl font-display font-bold italic">7</p>
                <p className="text-[8px] font-bold uppercase tracking-widest">Domaines Privatisables</p>
             </div>
          </div>
        </div>
      </section>

      {/* GRILLE DES OFFRES */}
      <section className="py-24 px-6 bg-white border-y border-black/5">
        <div className="max-w-[1500px] mx-auto">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-primary italic mb-4">Nos pépites du terroir</h2>
              <p className="text-gray-400 text-sm font-light italic">Sélectionnez l'univers qui correspond à votre culture d'entreprise.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {SEMINAR_OFFERS.map((offer) => (
                <div key={offer.id} className="group cursor-pointer">
                   <div className="aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 shadow-sm border border-black/5">
                      <img src={offer.img} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" alt={offer.title} />
                   </div>
                   <div className="px-2 space-y-2">
                      <div className="flex items-center justify-between">
                         <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-orange bg-orange/5 px-2.5 py-1 rounded-full">{offer.type}</span>
                         <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-gray-300 italic">{offer.pax}</span>
                      </div>
                      <h3 className="text-lg font-display font-bold text-primary italic leading-tight group-hover:text-orange transition-colors">{offer.title}</h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{offer.region}, France</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* EXEMPLE DE SÉJOUR & ACTIVITÉS - VERSION CLAIRE AVEC MARGES ACCRUES */}
      <section className="py-24 px-10 lg:px-24 bg-white border-t border-black/5 overflow-hidden">
         <div className="max-w-[1300px] mx-auto">
            
            {/* EXEMPLE SÉJOUR 2 JOURS */}
            <div className="flex flex-col lg:flex-row gap-16 mb-24 items-start">
               <div className="lg:w-2/3 space-y-12">
                  <div className="space-y-4">
                     <span className="text-orange font-bold tracking-[0.3em] uppercase text-[9px] font-sans">S'immerger</span>
                     <h2 className="text-4xl md:text-5xl font-display font-bold text-primary italic leading-tight">Exemple d'un séjour de 2 jours</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                     {/* Ligne de connexion verticale sur desktop */}
                     <div className="absolute left-[50%] top-0 bottom-0 w-px bg-black/5 hidden md:block"></div>
                     
                     <div className="space-y-6 bg-beige-bg/40 p-8 rounded-3xl border border-black/5">
                        <div className="flex items-center gap-4">
                           <div className="size-10 rounded-full border border-orange/50 flex items-center justify-center text-orange font-display italic text-xl">1</div>
                           <h4 className="text-primary font-bold uppercase tracking-widest text-[11px] font-sans">Jour 1 : L'Arrivée & Immersion</h4>
                        </div>
                        <ul className="space-y-4 text-[10px] text-gray-500 font-sans uppercase tracking-widest leading-relaxed">
                           <li className="flex gap-3"><span className="text-orange">•</span> Arrivée au domaine & Café d'accueil</li>
                           <li className="flex gap-3"><span className="text-orange">•</span> Immersion métier avec le producteur</li>
                           <li className="flex gap-3"><span className="text-orange">•</span> Déjeuner champêtre (Produits de la ferme)</li>
                           <li className="flex gap-3"><span className="text-orange">•</span> Session de travail en plein air</li>
                           <li className="flex gap-3"><span className="text-orange">•</span> Dîner gastronomique au coin du feu</li>
                        </ul>
                     </div>

                     <div className="space-y-6 bg-beige-bg/40 p-8 rounded-3xl border border-black/5">
                        <div className="flex items-center gap-4">
                           <div className="size-10 rounded-full border border-orange/50 flex items-center justify-center text-orange font-display italic text-xl">2</div>
                           <h4 className="text-primary font-bold uppercase tracking-widest text-[11px] font-sans">Jour 2 : Cohésion & Départ</h4>
                        </div>
                        <ul className="space-y-4 text-[10px] text-gray-500 font-sans uppercase tracking-widest leading-relaxed">
                           <li className="flex gap-3"><span className="text-orange">•</span> Réveil nature & Petit-déjeuner bio</li>
                           <li className="flex gap-3"><span className="text-orange">•</span> Atelier participatif (Taille, Récolte...)</li>
                           <li className="flex gap-3"><span className="text-orange">•</span> Déjeuner Table Commune</li>
                           <li className="flex gap-3"><span className="text-orange">•</span> Bilan & Temps de connexion</li>
                           <li className="flex gap-3"><span className="text-orange">•</span> Départ en milieu d'après-midi</li>
                        </ul>
                     </div>
                  </div>
               </div>

               {/* PRIX SUR LE COTÉ */}
               <div className="lg:w-1/3 w-full lg:sticky lg:top-32 pt-12 lg:pt-24">
                  <div className="space-y-8">
                     <div className="border-l-2 border-orange pl-8 space-y-2">
                        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.3em] font-sans">À partir de</p>
                        <div className="flex items-baseline gap-2">
                           <p className="text-5xl font-display font-bold text-primary italic">199€</p>
                           <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest font-sans">HT / jour / pers.</p>
                        </div>
                     </div>
                     <button onClick={openModal} className="w-full bg-primary text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] font-sans text-center hover:bg-primary/90 transition-all duration-300 shadow-xl shadow-primary/10">
                        Demander un devis sur mesure
                     </button>
                     <p className="text-[8px] text-gray-300 uppercase tracking-[0.3em] text-center font-sans">Accompagnement logistique complet inclus</p>
                  </div>
               </div>
            </div>

            {/* LISTE DES ACTIVITÉS */}
            <div className="pt-24 border-t border-black/5">
               <div className="space-y-12">
                  <div className="space-y-2 text-center lg:text-left">
                     <span className="text-orange font-bold tracking-[0.3em] uppercase text-[9px] font-sans">L'Art du Geste</span>
                     <h2 className="text-3xl md:text-5xl font-display font-bold text-primary italic leading-tight">Quelques exemples des activités</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
                     <ActivityBrutItem title="Vendanges viticoles" period="Septembre - Octobre" />
                     <ActivityBrutItem title="Récolte des olives" period="Fin Octobre à Janvier" />
                     <ActivityBrutItem title="Cavage truffe" period="Décembre à Février" />
                     <ActivityBrutItem title="Plantations & Taille" period="Toute l'année" />
                     <ActivityBrutItem title="Distillation & Alambic" period="Toute l'année" />
                     <ActivityBrutItem title="Fabrication du Fromage" period="Selon estives" />
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* MODAL AMÉLIORÉE - FLUIDE ET COHÉRENTE */}
      {isModalOpen && (
      <div 
        ref={modalRef}
        className="fixed inset-0 z-[100] flex items-stretch md:items-center justify-center p-4"
        style={{ pointerEvents: isClosing ? 'none' : 'auto' }}
      >
          <div 
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
              isClosing ? 'opacity-0' : 'opacity-100'
            }`}
            onClick={closeModal}
          ></div>
          <div 
            className={`bg-white w-full max-w-5xl h-full max-h-[100dvh] md:h-[85vh] md:max-h-[85vh] rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative z-10 font-sans transition-all duration-300 ${
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
                      <span className="font-display italic">séminaire</span>
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
                               {["Depuis lieu d'arrivée", "Navette Privée"].map(opt => (
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

const ActivityBrutItem = ({ title, period }: { title: string, period: string }) => (
  <div className="flex items-center justify-between py-5 border-b border-black/5 transition-colors">
    <span className="text-[11px] font-bold text-primary uppercase tracking-[0.1em] font-sans">{title}</span>
    <span className="text-[9px] font-bold text-orange/60 tracking-widest font-sans">{period}</span>
  </div>
);

export default SeminarDomains;
