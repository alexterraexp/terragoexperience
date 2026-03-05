import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      <header className="fixed top-0 w-full z-[80] glass border-b border-black/10 h-20 lg:h-24 font-sans shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 h-full flex items-center justify-between gap-4">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center group shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="/logo.png"
              alt="Terrago"
              className="h-16 sm:h-[4.25rem] md:h-20 lg:h-[5.5rem] xl:h-24 w-auto max-h-[95%] object-contain transition-transform group-hover:scale-105 duration-300"
            />
          </Link>

          {/* NAV DESKTOP — visible uniquement à partir de lg (1024px) */}
          <nav className="hidden lg:flex items-center gap-10 ml-auto mr-10 flex-nowrap">
            {NAV_LINKS.map((link) => (
              <div key={link.path} className="flex items-center gap-2 shrink-0">
                <Link
                  to={link.path}
                  className={`text-[11px] uppercase font-bold tracking-[0.2em] font-sans transition-all hover:text-clay relative group/nav whitespace-nowrap ${
                    location.pathname === link.path ? 'text-primary' : 'text-gray-400'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-[1.5px] bg-clay transition-all duration-500 ${
                      location.pathname === link.path ? 'w-full' : 'w-0 group-hover/nav:w-full'
                    }`}
                  />
                </Link>
                {link.soon && (
                  <span className="px-1.5 py-0.5 bg-orange text-white text-[7px] font-bold uppercase tracking-wider rounded-md shrink-0">
                    soon
                  </span>
                )}
              </div>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3 ml-auto lg:ml-0 shrink-0">

            {/* CTA — caché sur mobile (< 640px), visible sm+ */}
            <Link
              to="/entreprises?openModal=true"
              className="hidden sm:inline-flex gradient-primary text-white
                px-4 sm:px-5 lg:px-8
                py-2 lg:py-2.5
                rounded-xl
                text-[7px] sm:text-[8px]
                uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold shadow-premium
                transition-all hover:shadow-orange-glow hover:scale-105 active:scale-95
                relative overflow-hidden group whitespace-nowrap shrink-0"
            >
              <span className="relative z-10">Organiser votre séminaire</span>
              <span className="absolute inset-0 gradient-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            {/* HAMBURGER — mobile ET tablette (< lg = 1024px) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMenuOpen}
              className="lg:hidden size-10 flex items-center justify-center text-primary rounded-xl bg-beige-bg border border-black/5 active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-2xl">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

        </div>
      </header>

    {/* OVERLAY MENU MOBILE + TABLETTE */}
<div
  className={`fixed inset-0 z-[100] lg:hidden transition-all duration-500 ${
    isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
  }`}
>
  {/* FOND semi-transparent derrière */}
  <div className="absolute inset-0 bg-black/30" onClick={() => setIsMenuOpen(false)} />

  {/* PANNEAU */}
  <div className="absolute inset-x-3 top-3 flex p-0">
    <div className={`w-full bg-white rounded-3xl shadow-2xl transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
      <div className="flex flex-col px-7 sm:px-10 pt-16 pb-15 min-h-[600px]">

        {/* LIENS */}
        <div className="flex flex-col min-w-0">
          {NAV_LINKS.map((link, idx) => (
            <Link
              key={link.path}
              to={link.path}
              style={{ transitionDelay: `${150 + idx * 70}ms` }}
              className={`flex items-center py-3 border-b border-black/[0.06] last:border-0 group transition-all duration-400 ${
                isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <span className={`font-sans text-base font-bold tracking-wide transition-colors duration-200 ${
                location.pathname === link.path ? 'text-orange' : 'text-primary group-hover:text-orange'
              }`}>
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        {/* BAS — CTA */}
        <div className="min-w-0 mt-5">
          <div className="h-px bg-black/8 mb-5" />
          <Link
            to="/entreprises?openModal=true"
            className="block w-full bg-[#071207] text-white text-[8px] font-bold uppercase tracking-[0.18em] py-3.5 rounded-xl text-center transition-all duration-200 hover:bg-orange hover:shadow-orange-glow mb-4"
          >
            Envoyer mon brief
          </Link>
          <p className="text-center text-[7px] font-bold uppercase tracking-[0.2em] text-gray-300">
            Fabriqué avec passion pour nos territoires.
          </p>
        </div>

      </div>
    </div>
  </div>

  {/* BOUTON FERMETURE */}
  <button
    onClick={() => setIsMenuOpen(false)}
    aria-label="Fermer le menu"
    className="absolute top-5 right-5 size-11 rounded-full bg-white/90 border border-black/10 flex items-center justify-center text-primary text-lg transition-all duration-200 hover:bg-white hover:rotate-90 shadow-sm"
  >
    {'✕'}
  </button>
</div>

</> // ← fermeture du fragment React
);    // ← fermeture du return
};      // ← fermeture du composant

export default Header;