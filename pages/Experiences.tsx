
import React from 'react';
import { Link } from 'react-router-dom';

const Experiences: React.FC = () => {
  // Page temporairement inaccessible - affichage d'un message "bientôt disponible"
  const bgImage = "https://images.unsplash.com/photo-1651490542545-35a1b4862c0d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center justify-center font-sans relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${bgImage}")` }}
      />
      <div className="absolute inset-0 bg-beige-bg/85" />
      <div className="max-w-2xl mx-auto px-8 md:px-12 text-center relative z-10">
        <div className="flex flex-col items-center">
          <h1 className="text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 flex flex-col sm:flex-row items-center sm:items-baseline justify-center gap-x-2 gap-y-1 sm:gap-y-0 sm:whitespace-nowrap sm:flex-nowrap">
            <span className="font-display italic">La page sera bientôt </span>
            <span className="font-sans text-[0.72em] md:text-[0.78em] font-semibold tracking-tight not-italic">disponible.</span>
          </h1>
          <p className="text-[10px] md:text-xs text-primary font-sans font-bold mb-10 leading-relaxed">
            En attendant, découvrez nos séminaires d'exception.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/seminaires"
              className="bg-primary text-white px-6 py-3 rounded-xl text-[9px] uppercase tracking-[0.2em] font-bold shadow-lg hover:bg-orange transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Découvrir les séminaires
            </Link>
            <Link
              to="/"
              className="text-primary border-b border-primary/20 hover:border-primary px-2 py-1 text-[9px] uppercase tracking-[0.2em] font-bold transition-all"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

/* 
  CODE ORIGINAL COMMENTÉ - À réactiver quand la page sera disponible
  
  Tout le code original est préservé ci-dessous pour réactivation future.
*/

export default Experiences;
