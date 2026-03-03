
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Bloquer le scroll quand le menu est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  // Fermer le menu quand on change de page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      <header className="fixed top-0 w-full z-[80] glass border-b border-black/10 h-20 lg:h-24 font-sans shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-full flex items-center justify-between">
          
          {/* LOGO */}
          <Link 
            to="/" 
            className="flex items-center group shrink-0"
            onClick={() => {
              // Scroll vers le haut quand on clique sur le logo
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img 
              src="/logo.png" 
              alt="Terrago" 
              className="h-16 lg:h-20 w-auto transition-transform group-hover:scale-110 duration-500"
            />
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <div key={link.path} className="flex items-center gap-2">
                <Link
                  to={link.path}
                  className={`text-[12px] uppercase font-bold tracking-[0.2em] transition-all hover:text-clay relative group/nav ${
                    location.pathname === link.path ? 'text-primary' : 'text-gray-400'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-2 left-0 h-[1.5px] bg-clay transition-all duration-500 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover/nav:w-full'}`}></span>
                </Link>
                {link.soon && (
                  <span className="px-2 py-0.5 bg-orange text-white text-[7px] font-bold uppercase tracking-wider rounded-md">
                    soon
                  </span>
                )}
              </div>
            ))}
          </nav>

          {/* ACTIONS & HAMBURGER */}
          <div className="flex items-center gap-3 lg:gap-6">
            <Link
              to="/auth"
              className="hidden"
              aria-hidden="true"
            >
              Se connecter
            </Link>
            
            <Link
              to="/seminaires?openModal=true"
              className="gradient-primary text-white px-4 lg:px-8 py-2 lg:py-2.5 rounded-xl text-[7px] lg:text-[8px] uppercase tracking-[0.2em] font-bold shadow-premium transition-all hover:shadow-orange-glow hover:scale-105 active:scale-95 relative overflow-hidden group"
            >
              <span className="relative z-10">Organiser votre séminaire</span>
              <span className="absolute inset-0 gradient-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>

            {/* BOUTON MENU MOBILE */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden size-10 flex items-center justify-center text-primary rounded-xl bg-beige-bg border border-black/5 active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-2xl">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* OVERLAY MENU MOBILE */}
      <div 
        className={`fixed inset-0 z-[100] bg-white transition-all duration-500 lg:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="h-full flex flex-col p-8 pt-24">
          <div className="flex-1 flex flex-col gap-8 justify-center items-center text-center">
            {NAV_LINKS.map((link, idx) => (
              <div
                key={link.path}
                style={{ transitionDelay: `${idx * 100}ms` }}
                className={`flex items-center gap-3 transition-all ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                <Link
                  to={link.path}
                  className={`text-3xl font-display font-bold italic ${
                    location.pathname === link.path ? 'text-orange' : 'text-primary'
                  }`}
                >
                  {link.label}
                </Link>
                {link.soon && (
                  <span className="px-2.5 py-1 bg-orange text-white text-[8px] font-bold uppercase tracking-wider rounded-md">
                    soon
                  </span>
                )}
              </div>
            ))}
            
            <div className={`h-px w-12 bg-black/5 transition-all duration-700 ${isMenuOpen ? 'scale-x-100' : 'scale-x-0'}`}></div>
            
            <Link
              to="/auth"
              className="hidden"
              aria-hidden="true"
            >
              Se connecter
            </Link>
          </div>

          <div className={`space-y-4 transition-all duration-700 delay-400 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <Link
              to="/seminaires?openModal=true"
              className="w-full bg-primary text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-xl block text-center"
            >
              Envoyer mon brief
            </Link>
            <p className="text-center text-[8px] text-gray-300 uppercase font-bold tracking-[0.3em]">
              L'excellence du terroir • 2026
            </p>
          </div>
        </div>
        
        {/* Bouton fermeture flottant en haut à droite */}
        <button 
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 size-12 rounded-full bg-beige-bg flex items-center justify-center text-primary border border-black/5"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
      </div>
    </>
  );
};

export default Header;
