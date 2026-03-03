
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-beige-bg pt-12 pb-10 border-t border-black/10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex flex-row items-center gap-4 mb-4 md:mb-0 md:flex-col md:items-start">
              <div className="flex-shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Terrago" 
                  className="h-20 md:h-40 lg:h-40 w-auto"
                />
              </div>
              <p className="text-gray-600 text-xs max-w-xs leading-relaxed font-medium flex-1">
                Des séminaires et séjours de groupe, au cœur du terroir français.
              </p>
            </div>
          </div>
          <div>
            <h6 className="font-bold text-sm mb-6 uppercase tracking-widest">Plateforme</h6>
            <ul className="flex flex-col gap-4 text-sm text-gray-500">
              <li><Link to="/seminaires" className="hover:text-primary">Séminaires</Link></li>
              <li><Link to="/particuliers" className="hover:text-primary">Entre amis</Link></li>
              <li><Link to="/nous-rejoindre" className="hover:text-primary">Nous rejoindre</Link></li>
              <li><Link to="/recommander-un-producteur" className="hover:text-primary">Recommander un producteur</Link></li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-sm mb-6 uppercase tracking-widest">À propos</h6>
            <ul className="flex flex-col gap-4 text-sm text-gray-500">
              <li><Link to="/notre-engagement" className="hover:text-primary">Notre Engagement</Link></li>
              <li><a href="mailto:terragoexperiences@gmail.com" className="hover:text-primary transition-colors">Nous contacter</a></li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-sm mb-6 uppercase tracking-widest">Légal</h6>
            <ul className="flex flex-col gap-4 text-sm text-gray-500">
              <li><Link to="/mentions-legales" className="hover:text-primary">Mentions Légales</Link></li>
              <li><Link to="/confidentialite" className="hover:text-primary">Confidentialité</Link></li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-sm mb-6 uppercase tracking-widest">Suivez-nous</h6>
            <div className="flex items-center gap-4 mt-1">
              <a
                href="https://www.instagram.com/terrago.experiences/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary transition-all duration-300 flex items-center justify-center w-10 h-10 rounded-lg hover:bg-primary/5"
                aria-label="Instagram Terrago"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/terragoexperiences/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary transition-all duration-300 flex items-center justify-center w-10 h-10 rounded-lg hover:bg-primary/5"
                aria-label="LinkedIn Terrago"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-black/5 gap-6">
          <p className="text-xs text-gray-400">© 2026 Terrago. Fabriqué avec passion pour nos territoires.</p>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Suivez-nous</span>
            <a
              href="https://www.instagram.com/terrago.experiences/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-all duration-300 flex items-center justify-center w-8 h-8"
              aria-label="Instagram Terrago"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/terragoexperiences/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-all duration-300 flex items-center justify-center w-8 h-8"
              aria-label="LinkedIn Terrago"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
