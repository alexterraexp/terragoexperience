
import React from 'react';
import { IMAGES } from '../constants';
import { Link } from 'react-router-dom';

const Engagement: React.FC = () => {
  return (
    <div className="pt-24 font-sans min-h-screen overflow-x-hidden">
      {/* Hero Section - Mission */}
      <section className="px-4 sm:px-6 lg:px-10 py-16 sm:py-20 bg-beige-bg scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-orange text-white font-bold font-sans tracking-[0.3em] uppercase text-[8px] sm:text-[9px] mb-4 rounded-full shadow-md transform translate-x-1 -translate-y-0.5">
              Notre mission
            </span>
            <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-none sm:leading-tight px-2 sm:px-2 flex flex-col sm:flex-row items-center sm:items-baseline justify-center gap-x-2 gap-y-1 sm:gap-y-0 whitespace-normal sm:whitespace-nowrap">
              <span className="font-sans not-italic text-[0.7em] md:text-[0.7em]">Des expériences qui soutiennent </span>
              <span className="font-display italic">nos terroirs.</span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg font-light max-w-3xl mx-auto mt-6 leading-relaxed">
              Mettre en lumière et soutenir les producteurs passionnés et engagés, transmettre leurs savoir-faire, et reconnecter chacun à la nature à travers des expériences authentiques en mettant les mains dans le terroir.
            </p>
          </div>
        </div>
      </section>

      {/* Les 3 Piliers */}
      <section className="px-4 sm:px-6 lg:px-10 py-16 sm:py-20 bg-white border-y border-black/5 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="inline-block px-3 py-1 bg-orange text-white font-bold font-sans tracking-[0.3em] uppercase text-[8px] sm:text-[9px] mb-4 rounded-full shadow-md transform translate-x-1 -translate-y-0.5">
              Notre engagement
            </span>
            <h2 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-none sm:leading-tight px-2 sm:px-2 flex flex-col sm:flex-row items-center sm:items-baseline justify-center gap-x-2 gap-y-1 sm:gap-y-0 whitespace-normal sm:whitespace-nowrap">
              <span className="font-sans not-italic text-[0.7em] md:text-[0.7em]">Chez Terrago, nous avons une </span>
              <span className="font-display italic">boussole.</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base font-light mt-4 leading-relaxed max-w-ml mx-auto">
              Pas pour trouver le nord, mais pour garder le cap sur ce qui compte :
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <ValueCard 
                icon="groups" 
                title="L'humain" 
                badge="producteurs et artisans"
                desc="Nous collaborons avec des producteurs qui cultivent bien plus que des produits : ils cultivent un lien fort avec la terre, une exigence de qualité et une envie sincère de transmettre leur savoir."
              />
              <ValueCard 
                icon="workspace_premium" 
                title="Le savoir-faire" 
                badge="français"
                desc="Chez Terrago, on part à la rencontre de femmes et d'hommes qui font les choses bien : des artisans qui respectent la terre, travaillent de beaux produits et perpétuent un savoir-faire authentique."
              />
              <ValueCard 
                icon="nature" 
                title="La nature" 
                badge="et votre santé"
                desc="La nature n'est pas un décor, c'est le point de départ de notre santé. On célèbre la terre, les saisons, les paysages vivants et tout ce qu'ils nous apprennent quand on prend le temps d'y prêter attention."
              />
          </div>
        </div>
      </section>

      {/* Stats Minimalistes */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 relative border-y border-black/5 overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 text-center relative z-10">
          <StatMini value="10+" label="Producteurs engagés" />
          <StatMini value="4" label="Régions activées" />
          <StatMini value="100%" label="authentique" />
          <StatMini value="100%" label="Français" />
        </div>
      </section>

      {/* CTA Final Compact */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-beige-bg scroll-mt-24">
        <div className="max-w-4xl mx-auto bg-primary rounded-2xl sm:rounded-[2.5rem] p-8 sm:p-12 md:p-16 text-center text-white relative overflow-hidden shadow-premium">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img src={IMAGES.natureLandscape} className="w-full h-full object-cover" alt="Background" />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-none sm:leading-tight mb-4 flex flex-col sm:flex-row items-center justify-center gap-x-2 gap-y-1 sm:gap-y-0 whitespace-normal sm:whitespace-nowrap">
              <span className="font-sans not-italic text-white/95 text-[0.7em] md:text-[0.7em]">Partagez </span>
              <span className="font-display italic">l'essentiel.</span>
            </h2>
            <p className="text-white/70 text-sm sm:text-base font-light mb-8 sm:mb-10 max-w-lg mx-auto leading-relaxed">
              Que vous soyez une entreprise ou un curieux, nos valeurs de reconnexion sont les vôtres.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="mailto:terragoexperiences@gmail.com" className="bg-orange text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-[9px] shadow-lg hover:scale-105 transition-all inline-block text-center">
                Nous contacter
              </a>
              <Link to="/nous-rejoindre" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-[9px] hover:bg-white/20 transition-all">
                Nous rejoindre
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ValueCard = ({ icon, title, badge, desc }: any) => (
  <div className="group relative bg-white rounded-2xl border border-black/5 shadow-sm p-6 sm:p-8 text-center hover:shadow-md transition-all duration-300 overflow-hidden">
    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 transition-colors duration-300 group-hover:bg-orange group-hover:text-white">
      <span className="material-symbols-outlined text-2xl">{icon}</span>
    </div>
    <h3 className="font-sans font-bold text-primary text-base sm:text-lg mb-1">{title}</h3>
    <span className="inline-block px-2 py-0.5 bg-orange text-white text-[10px] font-bold uppercase tracking-wider rounded-md mb-4">
      {badge}
    </span>
    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{desc}</p>
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
  </div>
);

const StatMini = ({ value, label }: any) => (
  <div className="space-y-2">
    <p className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white italic">{value}</p>
    <p className="text-[9px] sm:text-[10px] font-bold text-white/80 uppercase tracking-widest font-sans">{label}</p>
  </div>
);

export default Engagement;
