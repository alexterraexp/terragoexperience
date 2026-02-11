
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ALL_EXPERIENCES } from '../constants';

const ProducerSpace: React.FC = () => {
  const { hostId } = useParams<{ hostId: string }>();
  const navigate = useNavigate();
  
  const hostExperiences = ALL_EXPERIENCES.filter(exp => exp.host.id === hostId);
  const host = hostExperiences[0]?.host;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [hostId]);

  if (!host) {
    return (
      <div className="pt-32 pb-20 text-center font-sans">
        <h2 className="text-3xl font-display font-bold mb-6">Producteur introuvable</h2>
        <Link to="/experiences" className="text-orange font-bold uppercase tracking-widest text-xs">Retourner aux expériences</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-beige-bg min-h-screen font-sans">
      <section className="bg-white border-b border-black/5 pb-12 sm:pb-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 pt-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">
            
            <div className="w-48 sm:w-64 shrink-0">
               <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative border-4 border-white rotate-2">
                  <img src={host.avatar} className="w-full h-full object-cover" alt={host.name} />
                  <div className="absolute inset-0 bg-primary/5 mix-blend-multiply"></div>
               </div>
               <div className="mt-8 flex flex-col gap-3">
                  {/* Badge de vérification conditionnel sur le profil */}
                  {host.visitCount > 10 && (
                    <div className="flex items-center gap-3 px-4 py-2 bg-orange/5 rounded-xl border border-orange/10">
                       <span className="material-symbols-outlined text-orange text-lg">verified</span>
                       <span className="text-[10px] font-bold uppercase tracking-widest text-orange">Hôte Certifié Terroir</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 px-4 py-2 bg-beige-bg rounded-xl border border-black/5">
                     <span className="material-symbols-outlined text-primary text-lg">star</span>
                     <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{host.rating} • {host.reviewCount} avis</span>
                  </div>
               </div>
            </div>

            <div className="flex-1 text-center md:text-left">
               <span className="inline-block px-3 py-1 bg-primary/5 text-primary text-[9px] uppercase tracking-[0.3em] font-bold mb-4 rounded-full border border-primary/10">
                  Producteur Terrago
               </span>
               <h1 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6 italic">{host.name}</h1>
               
               <div className="flex flex-wrap justify-center md:justify-start gap-8 mb-8 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                  <div className="flex items-center gap-2">
                     <span className="material-symbols-outlined text-sm">location_on</span>
                     {host.location}, France
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="material-symbols-outlined text-sm">work</span>
                     {host.specialty}
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="material-symbols-outlined text-sm">calendar_today</span>
                     Depuis {host.since}
                  </div>
               </div>

               <div className="max-w-2xl">
                  <h3 className="text-xl font-display font-bold italic text-primary mb-4">Mon Histoire</h3>
                  <p className="text-gray-500 font-light italic leading-relaxed mb-8">
                    {host.bio}
                  </p>
               </div>

               <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <button className="bg-primary text-white px-8 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-black transition-all">
                     Contacter {host.name}
                  </button>
                  <button className="px-8 py-4 rounded-xl border border-black/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all">
                     Partager le profil
                  </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 lg:px-12 py-16 sm:py-24">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-display font-bold text-primary italic mb-2">Les immersions de {host.name}</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Découvrez tout mon univers artisan • {hostExperiences.length} activités</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
          {hostExperiences.map((exp) => (
            <div key={exp.id} className="group flex flex-col md:flex-row gap-6 bg-white p-6 rounded-[2rem] border border-black/5 hover:shadow-2xl transition-all cursor-pointer" onClick={() => navigate(`/experience/${exp.id}`)}>
              <div className="w-full md:w-2/5 aspect-[4/3] rounded-2xl overflow-hidden shrink-0">
                <img src={exp.image} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" alt={exp.title} />
              </div>
              <div className="flex flex-col justify-between py-2">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-orange px-2 py-1 bg-orange/5 rounded-md">{exp.category}</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-gray-300">{exp.duration}</span>
                  </div>
                  <h3 className="font-bold text-primary text-xl italic group-hover:text-orange transition-colors mb-2 leading-tight">{exp.title}</h3>
                  <p className="text-xs text-gray-400 font-light italic line-clamp-2">{exp.description}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-bold text-primary italic">{exp.price}€ / pers.</span>
                  <button className="size-10 rounded-full bg-primary text-white flex items-center justify-center group-hover:bg-orange transition-colors">
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 lg:px-12 pb-24">
         <div className="bg-primary rounded-[2.5rem] p-10 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="relative z-10 max-w-lg">
               <h3 className="text-2xl font-display font-bold italic mb-3">L'engagement de {host.name}</h3>
               <p className="text-sm text-white/60 font-light italic leading-relaxed">
                  "Chaque visite est pour moi l'occasion de vous montrer la réalité de mon métier, sans filtre. Votre soutien permet de faire vivre ces traditions."
               </p>
            </div>
            <div className="relative z-10">
               <div className="flex -space-x-4">
                  <div className="size-12 rounded-full bg-orange flex items-center justify-center text-[10px] font-bold border-2 border-primary">
                     +{host.visitCount}
                  </div>
               </div>
               <p className="text-[9px] font-bold uppercase tracking-widest text-white/40 mt-3 text-center">Voyageurs accueillis</p>
            </div>
         </div>
      </section>
    </div>
  );
};

export default ProducerSpace;
