
import React, { useState, useRef, useEffect } from 'react';

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label?: string;
  icon?: string;
  className?: string;
  required?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ 
  value, 
  onChange, 
  options, 
  label,
  icon,
  className = '',
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      
      // Faire défiler automatiquement pour rendre le dropdown visible
      setTimeout(() => {
        if (buttonRef.current) {
          // Trouver le conteneur scrollable parent (la modal)
          const scrollableContainer = buttonRef.current.closest('.overflow-y-auto') as HTMLElement;
          
          if (scrollableContainer && dropdownRef.current) {
            // Calculer la position du dropdown par rapport au conteneur
            const buttonRect = buttonRef.current.getBoundingClientRect();
            const containerRect = scrollableContainer.getBoundingClientRect();
            const dropdownHeight = dropdownRef.current.offsetHeight;
            const buttonBottom = buttonRect.bottom - containerRect.top + scrollableContainer.scrollTop;
            const containerHeight = scrollableContainer.clientHeight;
            const scrollTop = scrollableContainer.scrollTop;
            
            // Si le dropdown dépasse en bas, faire défiler
            const spaceBelow = containerHeight - (buttonRect.bottom - containerRect.top);
            if (spaceBelow < dropdownHeight + 20) {
              // Calculer le scroll nécessaire pour voir le dropdown
              const scrollNeeded = dropdownHeight + 20 - spaceBelow;
              scrollableContainer.scrollTo({
                top: scrollTop + scrollNeeded,
                behavior: 'smooth'
              });
            }
          } else {
            // Fallback : utiliser scrollIntoView si pas de conteneur scrollable trouvé
            buttonRef.current.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'nearest',
              inline: 'nearest'
            });
          }
        }
      }, 50); // Petit délai pour laisser l'animation se déclencher
      
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {label && (
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2 mb-2">
          {icon && <span className="material-symbols-outlined text-sm">{icon}</span>} {label}
          {required && <span className="text-orange">*</span>}
        </label>
      )}
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-beige-bg/40 border border-black/5 rounded-2xl px-6 py-4 text-[12px] font-sans font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all shadow-sm cursor-pointer flex items-center justify-between text-primary ${
            isOpen ? 'bg-white border-primary/30' : ''
          }`}
        >
          <span className="text-primary font-medium">{value}</span>
          <span className={`material-symbols-outlined text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            expand_more
          </span>
        </button>

        {isOpen && (
          <div 
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-black/5 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(option)}
                className={`w-full px-6 py-3.5 text-left text-[12px] font-sans font-medium transition-all ${
                  value === option
                    ? 'bg-orange/5 text-orange border-l-2 border-orange'
                    : 'text-primary hover:bg-beige-bg'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {value === option && (
                    <span className="material-symbols-outlined text-orange text-base">check</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
