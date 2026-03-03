import React from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimate from '../components/ScrollAnimate';

const Particuliers: React.FC = () => {
  return (
    <div className="pt-24 font-sans min-h-screen overflow-x-hidden">
      <section className="px-4 sm:px-6 lg:px-10 py-24 sm:py-32 bg-beige-bg scroll-mt-24">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-orange text-white font-bold font-sans tracking-[0.3em] uppercase text-[8px] sm:text-[9px] mb-6 rounded-full shadow-md">
            Particuliers
          </span>
          <ScrollAnimate delay={100}>
          <h1 className="font-bold text-primary leading-tight mb-6">
          <span className="font-sans not-italic text-3xl sm:text-4xl md:text-4xl">
            Nous ne sommes pas encore ouverts aux{" "}
         </span>
          <span className="font-display italic text-4xl sm:text-4xl md:text-5xl">
          particuliers. </span> </h1>
          </ScrollAnimate>
          <p className="text-gray-600 text-base sm:text-lg font-light leading-relaxed mb-10">
            Si un univers vous intéresse, que vous aimez le projet Terrago et que vous souhaitez vivre des expériences au cœur du terroir, écrivez-nous : nous vous enverrons des propositions dès que possible.
          </p>
          <ScrollAnimate delay={200}>
            <a
              href="mailto:terragoexperiences@gmail.com?subject=Particulier - demande de propositions"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-[9px] sm:text-[10px] shadow-lg hover:bg-primary/90 hover:scale-105 transition-all"
            >
              <span className="material-symbols-outlined text-lg">mail</span>
              Nous écrire pour recevoir des propositions
            </a>
          </ScrollAnimate>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 py-16 bg-white border-t border-black/5">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-500 text-sm mb-8">
            En attendant, découvrez notre offre pour les entreprises et les groupes.
          </p>
          <Link
            to="/seminaires"
            className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-[0.2em] text-[10px] hover:text-orange transition-colors"
          >
            Découvrir nos séminaires
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Particuliers;
