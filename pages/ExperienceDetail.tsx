
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ALL_EXPERIENCES } from '../constants';

const ExperienceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dateInputRef = useRef<HTMLInputElement>(null);
  const exp = ALL_EXPERIENCES.find(e => e.id === id);

  const [guestCount, setGuestCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const timeSlots = ["09:30", "14:00", "16:30"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!exp) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h2 className="text-3xl font-display font-bold mb-6">Expérience introuvable</h2>
        <Link to="/experiences" className="text-orange font-bold uppercase tracking-widest text-xs">Retourner aux expériences</Link>
      </div>
    );
  }

  const otherExperiences = ALL_EXPERIENCES.filter(e => e.host.id === exp.host.id && e.id !== id);

  const triggerDatePicker = () => {
    if (dateInputRef.current) {
      try {
        (dateInputRef.current as any).showPicker();
      } catch (err) {
        dateInputRef.current.click();
      }
    }
  };

  return (
    <div className="pt-24 bg-white font-sans">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4">
        
        {/* FIL D'ARIANE */}
        <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-gray-300 mb-6">
           <Link to="/experiences" className="hover:text-primary transition-colors">Expériences</Link>
           <span className="material-symbols-outlined text-[10px]">chevron_right</span>
           <span className="text-primary/60">{exp.location}</span>
        </div>

        {/* TITRE PRINCIPAL (Cormorant) */}
        <h1 className="text-3xl md:text-5xl font-display font-bold text-primary mb-8 italic leading-tight max-w-4xl">
          {exp.title}
        </h1>
        
        {/* GALERIE COMPACTE (Hauteur réduite) */}
        <div className="relative w-full mb-12 group">
          <div className="hidden md:grid grid-cols-4 gap-3 h-[320px] rounded-3xl overflow-hidden shadow-sm">
            <div className="col-span-3 relative overflow-hidden bg-beige-bg">
               <img src={exp.gallery[0]} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-105" alt="Main" />
            </div>
            <div className="col-span-1 grid grid-rows-2 gap-3">
               <div className="relative overflow-hidden bg-beige-bg">
                  <img src={exp.gallery[1]} className="absolute inset-0 w-full h-full object-cover" alt="Detail 1" />
               </div>
               <div className="relative overflow-hidden bg-beige-bg">
                  <img src={exp.gallery[2]} className="absolute inset-0 w-full h-full object-cover" alt="Detail 2" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-white text-[9px] font-bold uppercase tracking-widest bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                      Explorer la galerie
                    </span>
                  </div>
               </div>
            </div>
          </div>
          <div className="md:hidden aspect-[16/9] rounded-2xl overflow-hidden shadow-md">
             <img src={exp.gallery[0]} className="w-full h-full object-cover" alt={exp.title} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
           
           {/* COLONNE INFOS (GAUCHE) */}
           <div className="lg:col-span-8">
              
              <div className="flex flex-col gap-6 pb-10 border-b border-black/5 mb-10">
                 
                 {/* L'HÔTE : NOM + MÉTIER + LIEU */}
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                       <Link to={`/producteur/${exp.host.id}`} className="size-14 rounded-2xl overflow-hidden border border-black/5 shadow-xl hover:scale-105 transition-transform duration-500">
                          <img src={exp.host.avatar} className="w-full h-full object-cover" alt={exp.host.name} />
                       </Link>
                       <div className="flex flex-col gap-0.5">
                          <h2 className="text-lg font-display font-bold italic text-primary leading-tight">Proposé par {exp.host.name}</h2>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                            {exp.host.specialty} • {exp.location}
                          </p>
                       </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-orange/5 rounded-2xl border border-orange/10">
                       <span className="material-symbols-outlined text-orange text-lg fill-orange">star</span>
                       <span className="text-[11px] font-bold text-orange">{exp.host.rating}</span>
                    </div>
                 </div>

                 {/* TITRE POPS RÉDUIT + INFOS TECHNIQUES SUR UNE LIGNE */}
                 <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <h3 className="text-base font-sans font-bold text-primary tracking-tight">
                      {exp.title}
                    </h3>
                    <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-orange/30"></div>
                    <div className="flex items-center gap-4">
                       <span className="text-[11px] font-bold text-gray-400 italic">De 1 à {exp.maxGuests} personnes</span>
                       <span className="text-gray-200">/</span>
                       <span className="text-[11px] font-bold text-gray-400 italic">Durée de l'expérience : {exp.duration}</span>
                    </div>
                 </div>
              </div>

              {/* DESCRIPTION SANS "99" */}
              <div className="space-y-16">
                 <div>
                    <p className="text-lg text-gray-600 font-light leading-relaxed italic">
                       {exp.description}
                    </p>
                 </div>

                 {/* INCLUSIONS AVEC PUCES PUCES PUCES */}
                 <div className="bg-beige-bg/40 rounded-[2.5rem] p-10 border border-black/[0.03]">
                    <div className="flex items-center gap-4 mb-8">
                       <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center">
                          <span className="material-symbols-outlined text-sm">inventory_2</span>
                       </div>
                       <h3 className="text-xl font-display font-bold text-primary italic">L'immersion comprend</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-12">
                       {exp.included.map((item, idx) => (
                         <div key={idx} className="flex items-start gap-4 group">
                            {/* Puces simples */}
                            <span className="size-1.5 rounded-full bg-orange mt-2.5 shrink-0 group-hover:scale-150 transition-transform"></span>
                            <span className="text-[12px] font-medium italic text-primary/80 leading-relaxed">{item}</span>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* AUTRES ACTIVITES HÔTE */}
                 {otherExperiences.length > 0 && (
                   <div className="pt-6">
                      <div className="flex items-center justify-between mb-10">
                         <h3 className="text-2xl font-display font-bold text-primary italic">Aussi proposé par {exp.host.name}</h3>
                         <Link to={`/producteur/${exp.host.id}`} className="text-[9px] font-bold uppercase tracking-widest text-orange border-b border-orange/20 pb-0.5 hover:border-orange transition-all">
                           Tout l'univers
                         </Link>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                         {otherExperiences.map((other) => (
                            <Link key={other.id} to={`/experience/${other.id}`} className="flex gap-5 group p-4 rounded-3xl bg-white hover:bg-beige-bg/30 transition-all border border-transparent hover:border-black/5">
                               <div className="size-24 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                                  <img src={other.image} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" alt={other.title} />
                               </div>
                               <div className="flex flex-col justify-center gap-1">
                                  <h4 className="text-[13px] font-bold text-primary italic leading-tight group-hover:text-orange transition-colors">{other.title}</h4>
                                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{other.price}€ • {other.duration}</p>
                               </div>
                            </Link>
                         ))}
                      </div>
                   </div>
                 )}
              </div>
           </div>

           {/* COLONNE RÉSERVATION */}
           <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="bg-white border border-black/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1.5 bg-orange"></div>
                 
                 <div className="flex items-baseline justify-between mb-10">
                    <div className="flex items-baseline gap-1.5">
                       <span className="text-3xl font-display font-bold italic text-primary">{exp.price}€</span>
                       <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">/ personne</span>
                    </div>
                 </div>

                 <div className="space-y-8">
                    {/* DATE */}
                    <div className="space-y-3">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Date de votre escale</label>
                       <div 
                         onClick={triggerDatePicker}
                         className={`relative w-full bg-beige-bg/50 border rounded-2xl px-6 py-4 transition-all cursor-pointer flex items-center justify-between group hover:border-orange/30 ${selectedDate ? 'border-orange bg-white shadow-md' : 'border-black/5'}`}
                       >
                          <span className={`text-[13px] ${selectedDate ? 'text-primary font-bold' : 'text-gray-300 italic'}`}>
                             {selectedDate ? new Date(selectedDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Sélectionner une date'}
                          </span>
                          <span className="material-symbols-outlined text-gray-400 text-xl group-hover:text-orange transition-colors">calendar_month</span>
                          <input ref={dateInputRef} type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer" min={new Date().toISOString().split('T')[0]} />
                       </div>
                    </div>

                    {/* HORAIRES */}
                    {selectedDate && (
                       <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Créneau disponible</label>
                          <div className="flex flex-wrap gap-2">
                             {timeSlots.map((time) => (
                                <button key={time} onClick={() => setSelectedTime(time)} className={`px-5 py-2.5 rounded-xl text-[11px] font-bold transition-all border ${selectedTime === time ? 'bg-orange text-white border-orange shadow-xl scale-105' : 'bg-white text-gray-400 border-black/5 hover:border-orange/40 hover:text-orange'}`}>
                                   {time}
                                </button>
                             ))}
                          </div>
                       </div>
                    )}

                    {/* PARTICIPANTS */}
                    <div className="space-y-4">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block text-center">Nombre de voyageurs</label>
                       <div className="flex items-center justify-between bg-beige-bg/50 border border-black/5 rounded-2xl px-4 py-2">
                          <button onClick={() => setGuestCount(Math.max(1, guestCount - 1))} className="size-11 rounded-xl bg-white flex items-center justify-center shadow-sm hover:text-orange transition-all font-bold text-xl active:scale-90">-</button>
                          <div className="flex flex-col items-center">
                             <span className="text-sm font-bold text-primary">{guestCount}</span>
                             <span className="text-[8px] font-bold uppercase text-gray-300">Places</span>
                          </div>
                          <button onClick={() => setGuestCount(Math.min(exp.maxGuests, guestCount + 1))} className="size-11 rounded-xl bg-white flex items-center justify-center shadow-sm hover:text-orange transition-all font-bold text-xl active:scale-90">+</button>
                       </div>
                       {/* Réaffichage du nombre de personnes max */}
                       <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest text-center italic">
                         Capacité maximale : {exp.maxGuests} personnes
                       </p>
                    </div>

                    <div className="pt-2">
                      <button 
                        disabled={!selectedDate || !selectedTime}
                        onClick={() => navigate('/reservation', { state: { expId: id, date: selectedDate, time: selectedTime, guests: guestCount }})}
                        className={`w-full py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] shadow-2xl transition-all active:scale-95 ${(!selectedDate || !selectedTime) ? 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none' : 'bg-primary text-white hover:bg-orange hover:shadow-orange/30'}`}
                      >
                         Confirmer l'expérience
                      </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
      <div className="h-20"></div>
    </div>
  );
};

export default ExperienceDetail;
