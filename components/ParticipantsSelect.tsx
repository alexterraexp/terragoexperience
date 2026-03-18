'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ParticipantsSelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  icon?: string;
  className?: string;
  required?: boolean;
}

const ParticipantsSelect: React.FC<ParticipantsSelectProps> = ({ 
  value, 
  onChange, 
  label,
  icon,
  className = '',
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const predefinedOptions = [
    '5 - 15 participants',
    '15 - 30 participants',
    '30 - 60 participants',
    'Plus de 60 participants'
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsCustomMode(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      
      // Faire défiler automatiquement pour rendre le dropdown visible
      setTimeout(() => {
        if (buttonRef.current) {
          const scrollableContainer = buttonRef.current.closest('.overflow-y-auto') as HTMLElement;
          
          if (scrollableContainer && dropdownRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            const containerRect = scrollableContainer.getBoundingClientRect();
            const dropdownHeight = dropdownRef.current.offsetHeight;
            const containerHeight = scrollableContainer.clientHeight;
            const spaceBelow = containerHeight - (buttonRect.bottom - containerRect.top);
            if (spaceBelow < dropdownHeight + 20) {
              const scrollNeeded = dropdownHeight + 20 - spaceBelow;
              scrollableContainer.scrollTo({
                top: scrollableContainer.scrollTop + scrollNeeded,
                behavior: 'smooth'
              });
            }
          }
        }
      }, 50);
      
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isCustomMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCustomMode]);

  const handleSelect = (option: string) => {
    if (option === 'custom') {
      setIsCustomMode(true);
      setCustomValue('');
    } else {
      onChange(option);
      setIsOpen(false);
      setIsCustomMode(false);
    }
  };

  const handleCustomSubmit = () => {
    if (customValue.trim()) {
      onChange(`${customValue} participants`);
      setIsOpen(false);
      setIsCustomMode(false);
      setCustomValue('');
    }
  };

  const handleCustomKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCustomSubmit();
    }
  };

  const displayValue = value || (required ? '' : 'Sélectionner');

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
          <span className="text-primary font-medium">{displayValue}</span>
          <span className={`material-symbols-outlined text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            expand_more
          </span>
        </button>

        {isOpen && (
          <div 
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-black/5 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            {!isCustomMode ? (
              <>
                {predefinedOptions.map((option, index) => (
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
                <button
                  type="button"
                  onClick={() => handleSelect('custom')}
                  className="w-full px-6 py-3.5 text-left text-[12px] font-sans font-medium transition-all text-primary hover:bg-beige-bg border-t border-black/5"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">edit</span>
                    <span>Nombre personnalisé</span>
                  </div>
                </button>
              </>
            ) : (
              <div className="p-4 border-t border-black/5">
                <div className="flex items-center gap-2 mb-3">
                  <input
                    ref={inputRef}
                    type="number"
                    min="1"
                    placeholder="Ex: 14"
                    value={customValue}
                    onChange={(e) => setCustomValue(e.target.value)}
                    onKeyPress={handleCustomKeyPress}
                    className="flex-1 bg-beige-bg/40 border border-black/5 rounded-xl px-4 py-2.5 text-[12px] font-sans font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all shadow-sm outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleCustomSubmit}
                    className="px-4 py-2.5 bg-primary text-white rounded-xl text-[12px] font-bold uppercase tracking-wider hover:bg-primary/90 transition-all"
                  >
                    Valider
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsCustomMode(false);
                    setCustomValue('');
                  }}
                  className="w-full text-[10px] text-gray-400 hover:text-primary transition-colors"
                >
                  Retour aux options
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticipantsSelect;
