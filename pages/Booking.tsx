
import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ALL_EXPERIENCES } from '../constants';

const Booking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state as { expId: string, date: string, time: string, guests: number } | null;
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const exp = bookingData ? ALL_EXPERIENCES.find(e => e.id === bookingData.expId) : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!bookingData || !exp) {
      const timer = setTimeout(() => {
        if (!isSuccess) navigate('/experiences');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [bookingData, exp, navigate, isSuccess]);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      window.scrollTo(0, 0);
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="pt-40 pb-20 bg-beige-bg min-h-screen flex items-center justify-center font-sans px-6">
        <div className="max-w-xl w-full bg-white rounded-[3rem] p-12 shadow-2xl text-center border border-black/5 animate-in zoom-in-95 duration-500">
          <div className="size-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-200">
            <span className="material-symbols-outlined text-4xl">check</span>
          </div>
          <h1 className="text-4xl font-display font-bold text-primary italic mb-4">Réservation confirmée !</h1>
          <p className="text-gray-500 italic mb-8">
            Merci pour votre confiance. Un email récapitulatif contenant les détails de votre rencontre avec {exp?.host.name} et l'adresse exacte vous a été envoyé.
          </p>
          <div className="bg-beige-bg rounded-2xl p-6 mb-10 text-left border border-black/5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 text-center">Récapitulatif #TX-{Math.floor(Math.random() * 90000) + 10000}</p>
            <div className="flex justify-between mb-2">
              <span className="text-xs text-gray-400 italic">Expérience</span>
              <span className="text-xs font-bold text-primary">{exp?.title}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-xs text-gray-400 italic">Date & Heure</span>
              <span className="text-xs font-bold text-primary">{new Date(bookingData!.date).toLocaleDateString('fr-FR')} à {bookingData?.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-400 italic">Nombre de places</span>
              <span className="text-xs font-bold text-primary">{bookingData?.guests} participants</span>
            </div>
          </div>
          <Link to="/" className="inline-block bg-primary text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-black transition-all shadow-xl">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  if (!exp || !bookingData) {
    return (
      <div className="pt-40 text-center font-sans">
        <div className="animate-spin size-12 border-4 border-orange border-t-transparent rounded-full mx-auto mb-6"></div>
        <p className="text-gray-400 italic">Redirection vers l'espace de paiement...</p>
      </div>
    );
  }

  const total = exp.price * bookingData.guests;

  return (
    <div className="pt-32 pb-20 bg-beige-bg font-sans min-h-screen px-6">
      <div className="max-w-[1200px] mx-auto">
        
        <div className="flex items-center gap-4 mb-10">
          <button onClick={() => navigate(-1)} className="size-10 rounded-full bg-white flex items-center justify-center border border-black/5 hover:bg-gray-50 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-xl">west</span>
          </button>
          <h1 className="text-3xl font-display font-bold text-primary italic">Finaliser votre réservation</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-black/5">
              <h2 className="text-xl font-display font-bold text-primary mb-8 italic flex items-center gap-3">
                <span className="material-symbols-outlined text-orange">person</span>
                Vos informations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Prénom</label>
                  <input required className="w-full bg-beige-bg/50 border-transparent rounded-2xl px-5 py-3.5 text-xs focus:ring-orange focus:bg-white transition-all shadow-inner" placeholder="Jean" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nom</label>
                  <input required className="w-full bg-beige-bg/50 border-transparent rounded-2xl px-5 py-3.5 text-xs focus:ring-orange focus:bg-white transition-all shadow-inner" placeholder="Dumont" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
                  <input type="email" required className="w-full bg-beige-bg/50 border-transparent rounded-2xl px-5 py-3.5 text-xs focus:ring-orange focus:bg-white transition-all shadow-inner" placeholder="jean.dumont@exemple.com" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-black/5">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-display font-bold text-primary italic flex items-center gap-3">
                  <span className="material-symbols-outlined text-orange">credit_card</span>
                  Paiement sécurisé
                </h2>
                <div className="flex gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4 opacity-40" alt="Visa" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4 opacity-40" alt="Mastercard" />
                </div>
              </div>

              <form id="payment-form" onSubmit={handlePayment} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Numéro de carte</label>
                  <div className="relative">
                    <input 
                      required 
                      maxLength={19}
                      className="w-full bg-beige-bg/50 border-transparent rounded-2xl px-5 py-4 text-sm focus:ring-orange focus:bg-white transition-all shadow-inner tracking-[0.2em]" 
                      placeholder="0000 0000 0000 0000" 
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-300">lock</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Expiration</label>
                    <input required className="w-full bg-beige-bg/50 border-transparent rounded-2xl px-5 py-4 text-sm focus:ring-orange focus:bg-white transition-all shadow-inner" placeholder="MM / YY" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">CVC</label>
                    <input required maxLength={3} className="w-full bg-beige-bg/50 border-transparent rounded-2xl px-5 py-4 text-sm focus:ring-orange focus:bg-white transition-all shadow-inner" placeholder="123" />
                  </div>
                </div>

                <div className="pt-6 border-t border-black/5 mt-8">
                  <button 
                    disabled={isProcessing}
                    className={`w-full py-5 rounded-2xl font-bold uppercase tracking-[0.25em] text-[11px] shadow-2xl transition-all flex items-center justify-center gap-4 ${isProcessing ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-orange text-white hover:bg-black active:scale-[0.98]'}`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Transaction en cours...
                      </>
                    ) : (
                      <>Confirmer l'expérience {total}€ <span className="material-symbols-outlined text-base">shield_check</span></>
                    )}
                  </button>
                  <p className="text-[8px] text-gray-300 text-center font-bold uppercase tracking-widest mt-6">
                    Protégé par cryptage SSL 256-bits • Terrago ne stocke pas vos données bancaires.
                  </p>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-black/5 overflow-hidden">
              <div className="aspect-[16/9] w-full relative">
                <img src={exp.image} className="w-full h-full object-cover" alt={exp.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-orange mb-1">{exp.category}</p>
                  <h3 className="text-xl font-display font-bold italic">{exp.title}</h3>
                </div>
              </div>

              <div className="p-8 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 group">
                    <div className="size-10 rounded-xl bg-beige-bg flex items-center justify-center text-primary group-hover:bg-orange/10 group-hover:text-orange transition-colors">
                      <span className="material-symbols-outlined text-xl">calendar_month</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Date & Heure</p>
                      <p className="text-xs font-bold text-primary italic">
                        {new Date(bookingData.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} à {bookingData.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="size-10 rounded-xl bg-beige-bg flex items-center justify-center text-primary group-hover:bg-orange/10 group-hover:text-orange transition-colors">
                      <span className="material-symbols-outlined text-xl">group</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Participants</p>
                      <p className="text-xs font-bold text-primary italic">{bookingData.guests} {bookingData.guests > 1 ? 'personnes' : 'personne'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="size-10 rounded-xl bg-beige-bg flex items-center justify-center text-primary group-hover:bg-orange/10 group-hover:text-orange transition-colors">
                      <span className="material-symbols-outlined text-xl">location_on</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Lieu</p>
                      <p className="text-xs font-bold text-primary italic">{exp.location}, France</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-black/5 space-y-3">
                   <div className="flex justify-between text-xs text-gray-500 italic">
                      <span>{exp.price}€ x {bookingData.guests} participants</span>
                      <span>{total}€</span>
                   </div>
                   <div className="flex justify-between text-xs text-gray-400 italic">
                      <span>Frais de service (offerts)</span>
                      <span className="text-green-500 line-through">12€</span>
                   </div>
                   <div className="flex justify-between items-end pt-4 border-t border-black/5">
                      <span className="text-lg font-display font-bold italic text-primary">Total TTC</span>
                      <span className="text-2xl font-bold text-primary italic">{total}€</span>
                   </div>
                </div>

                <div className="bg-orange/5 rounded-2xl p-5 border border-orange/10">
                   <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-orange">info</span>
                      <p className="text-[10px] text-gray-500 leading-relaxed italic">
                        Votre réservation est flexible. Annulation gratuite jusqu'à 48h avant le début de l'immersion.
                      </p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
