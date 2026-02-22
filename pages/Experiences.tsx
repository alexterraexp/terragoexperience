
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ALL_EXPERIENCES } from '../constants';

const REGIONS = [
  { label: 'Nouvelle Aquitaine', icon: 'forest' },
  { label: 'Occitanie', icon: 'castle' },
  { label: 'Rhône-Alpes', icon: 'landscape' },
  { label: 'Provence', icon: 'sunny' },
  { label: 'Bretagne', icon: 'sailing' },
];

const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const Experiences: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Tous');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [searchDate, setSearchDate] = useState('');
  const [dateMode, setDateMode] = useState<'jour' | 'mois'>('mois');
  const [guests, setGuests] = useState(1);
  const [showMap, setShowMap] = useState(false);
  const [activeSearchTab, setActiveSearchTab] = useState<string | null>(null);

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setActiveSearchTab(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = [
    { label: 'Tous', icon: 'apps' },
    { label: 'Olives', value: 'olives', icon: 'nature' },
    { label: 'Vignes', value: 'vignes', icon: 'wine_bar' },
    { label: 'Truffe', value: 'truffe', icon: 'savings' },
    { label: 'Piment', value: 'piment', icon: 'local_fire_department' },
    { label: 'Mer', value: 'mer', icon: 'waves' },
    { label: 'Fromages', value: 'fromages', icon: 'bakery_dining' },
    { label: 'Élevage', value: 'élevage', icon: 'pets' },
    { label: 'Maraichage', value: 'maraichage', icon: 'agriculture' },
    { label: 'Fleurs', value: 'fleurs', icon: 'local_florist' },
  ];

  const toggleRegion = (region: string) => {
    setSelectedRegions(prev => 
      prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
    );
  };

  const toggleMonth = (month: string) => {
    setSelectedMonths(prev => 
      prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month]
    );
  };

  const clearRegions = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedRegions([]);
  };

  const filteredExperiences = ALL_EXPERIENCES.filter(exp => {
    const matchesCategory = activeCategory === 'Tous' || exp.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesRegion = selectedRegions.length === 0 || selectedRegions.includes(exp.region);
    return matchesCategory && matchesRegion && exp.maxGuests >= guests;
  });

  return (
    <div className="pt-24 min-h-screen bg-white font-sans flex flex-col">
      
      {/* BARRE DE RECHERCHE & CATÉGORIES */}
      <div className="sticky top-20 lg:top-24 w-full bg-white px-4 lg:px-12 py-3 lg:py-4 border-b border-black/5 z-[60]" ref={searchRef}>
        <div className="max-w-[1700px] mx-auto flex flex-col gap-4">
          
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
            <div className="flex-1 flex flex-col lg:flex-row bg-beige-bg rounded-2xl border border-black/5 p-1 h-auto lg:h-14 shadow-inner overflow-hidden">
               
               {/* SÉLECTEUR DESTINATION */}
               <div 
                 className="flex-1 cursor-pointer flex flex-col justify-center px-5 py-3 lg:py-0 relative group border-b lg:border-b-0 lg:border-r border-black/5 hover:bg-black/[0.02] transition-colors"
                 onClick={() => setActiveSearchTab(activeSearchTab === 'destination' ? null : 'destination')}
               >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[8px] lg:text-[7px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Destination(s)</span>
                    {selectedRegions.length > 0 && (
                      <span onClick={clearRegions} className="material-symbols-outlined text-[14px] text-gray-400 hover:text-orange transition-colors">close</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="material-symbols-outlined text-gray-400 text-base shrink-0">location_on</span>
                    <span className={`text-[11px] lg:text-[10px] font-bold truncate ${selectedRegions.length > 0 ? 'text-primary' : 'text-gray-300 italic'}`}>
                      {selectedRegions.length === 0 ? "Où allez-vous ?" : selectedRegions.length === 1 ? selectedRegions[0] : `${selectedRegions.length} régions`}
                    </span>
                  </div>

                  {activeSearchTab === 'destination' && (
                    <div className="absolute top-[105%] lg:top-[120%] left-0 w-full lg:w-64 bg-white rounded-2xl shadow-2xl border border-black/5 p-3 z-[70] animate-in fade-in zoom-in-95 duration-200">
                      {REGIONS.map((region) => (
                        <button 
                          key={region.label}
                          onClick={(e) => { e.stopPropagation(); toggleRegion(region.label); }}
                          className={`flex items-center justify-between w-full p-2.5 rounded-xl transition-all ${selectedRegions.includes(region.label) ? 'bg-orange/5' : 'hover:bg-beige-bg'}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className={`material-symbols-outlined text-base ${selectedRegions.includes(region.label) ? 'text-orange' : 'text-gray-400'}`}>{region.icon}</span>
                            <span className={`text-[10px] font-bold ${selectedRegions.includes(region.label) ? 'text-primary' : 'text-gray-500'}`}>{region.label}</span>
                          </div>
                          {selectedRegions.includes(region.label) && <span className="material-symbols-outlined text-orange text-sm">check_circle</span>}
                        </button>
                      ))}
                    </div>
                  )}
               </div>

               {/* SÉLECTEUR DATES */}
               <div 
                 className="flex-1 cursor-pointer flex flex-col justify-center px-5 py-3 lg:py-0 relative group border-b lg:border-b-0 lg:border-r border-black/5 hover:bg-black/[0.02] transition-colors"
                 onClick={() => setActiveSearchTab(activeSearchTab === 'date' ? null : 'date')}
               >
                  <span className="text-[8px] lg:text-[7px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Quand ?</span>
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="material-symbols-outlined text-gray-400 text-base shrink-0">calendar_month</span>
                    <span className={`text-[11px] lg:text-[10px] font-bold truncate ${selectedMonths.length > 0 || searchDate ? 'text-primary' : 'text-gray-300 italic'}`}>
                      {dateMode === 'jour' ? (searchDate || "Choisir un jour") : (selectedMonths.length === 0 ? "Saison ou mois" : selectedMonths.length === 1 ? selectedMonths[0] : `${selectedMonths.length} mois`)}
                    </span>
                  </div>

                  {activeSearchTab === 'date' && (
                    <div className="absolute top-[105%] lg:top-[120%] left-0 w-full lg:w-72 bg-white rounded-2xl shadow-2xl border border-black/5 p-4 z-[70] animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex bg-beige-bg p-1 rounded-xl mb-4">
                        <button onClick={(e) => { e.stopPropagation(); setDateMode('jour'); }} className={`flex-1 py-1.5 text-[8px] font-bold uppercase rounded-lg transition-all ${dateMode === 'jour' ? 'bg-white shadow-sm text-primary' : 'text-gray-400'}`}>Jour précis</button>
                        <button onClick={(e) => { e.stopPropagation(); setDateMode('mois'); }} className={`flex-1 py-1.5 text-[8px] font-bold uppercase rounded-lg transition-all ${dateMode === 'mois' ? 'bg-white shadow-sm text-primary' : 'text-gray-400'}`}>Mois / Saison</button>
                      </div>
                      {dateMode === 'jour' ? (
                        <input type="date" value={searchDate} onChange={(e) => { setSearchDate(e.target.value); setSelectedMonths([]); setActiveSearchTab(null); }} className="w-full bg-beige-bg border-none rounded-lg text-[10px] focus:ring-orange p-2.5" />
                      ) : (
                        <div className="grid grid-cols-3 gap-1.5">
                          {MONTHS.map(m => (
                            <button 
                              key={m} 
                              onClick={(e) => { e.stopPropagation(); toggleMonth(m); setSearchDate(''); }} 
                              className={`py-2 rounded-lg text-[8px] font-bold uppercase transition-all border ${selectedMonths.includes(m) ? 'bg-orange border-orange text-white shadow-md' : 'hover:bg-beige-bg text-gray-400 border-transparent'}`}
                            >
                              {m.slice(0, 3)}.
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
               </div>

               {/* COMPTEUR INVITÉS */}
               <div className="flex-1 flex items-center justify-between px-5 py-3 lg:py-0 bg-white/30 lg:bg-transparent">
                  <div className="flex flex-col">
                    <span className="text-[8px] lg:text-[7px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nombre de voyageurs</span>
                    <span className="text-[11px] lg:text-[10px] font-bold text-primary">{guests} participant{guests > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setGuests(Math.max(1, guests - 1))} 
                      className="size-8 lg:size-7 rounded-lg bg-white border border-black/5 flex items-center justify-center text-sm hover:text-orange hover:border-orange/20 shadow-sm font-bold active:scale-90 transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <button 
                      onClick={() => setGuests(guests + 1)} 
                      className="size-8 lg:size-7 rounded-lg bg-white border border-black/5 flex items-center justify-center text-sm hover:text-orange hover:border-orange/20 shadow-sm font-bold active:scale-90 transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
               </div>
            </div>

            <button 
              onClick={() => setShowMap(!showMap)} 
              className={`flex items-center justify-center gap-2 h-12 lg:h-14 px-6 rounded-2xl border transition-all shrink-0 font-bold text-[9px] lg:text-[10px] uppercase tracking-widest ${showMap ? 'bg-black text-white border-black shadow-lg' : 'bg-white text-primary border-black/10 hover:bg-beige-bg'}`}
            >
              <span className="material-symbols-outlined text-xl">{showMap ? 'close' : 'map'}</span>
              {showMap ? 'Liste' : 'Voir sur la carte'}
            </button>
          </div>

          {/* CATÉGORIES HORIZONTALES */}
          <div className="flex items-center gap-7 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 lg:mx-0 lg:px-0">
            {categories.map((cat) => (
              <button 
                key={cat.label} 
                onClick={() => setActiveCategory(cat.value || cat.label)} 
                className={`flex flex-col lg:flex-row items-center gap-1.5 lg:gap-2 transition-all shrink-0 group ${activeCategory === (cat.value || cat.label) ? 'text-orange border-b-2 border-orange pb-2 lg:pb-1' : 'text-gray-300 hover:text-primary pb-2 lg:pb-1 border-b-2 border-transparent'}`}
              >
                <span className={`material-symbols-outlined text-xl lg:text-lg ${activeCategory === (cat.value || cat.label) ? 'fill-orange' : ''}`}>{cat.icon}</span>
                <span className="text-[8px] lg:text-[9px] font-bold uppercase tracking-[0.15em]">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-[1700px] mx-auto px-4 lg:px-12 flex flex-col lg:flex-row gap-8">
        
        <div className={`transition-all duration-500 py-6 ${showMap ? 'w-full lg:w-[45%]' : 'w-full'}`}>
          <div className={`grid gap-x-8 gap-y-12 ${showMap ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
            {filteredExperiences.map((exp) => (
              <ExperienceRefinedCard key={exp.id} exp={exp} />
            ))}
          </div>
          
          {filteredExperiences.length === 0 && (
            <div className="py-20 text-center animate-in fade-in">
               <span className="material-symbols-outlined text-5xl text-gray-200 mb-4">search_off</span>
               <h3 className="text-xl font-display font-bold text-primary italic">Aucune escale trouvée</h3>
               <button onClick={() => { setActiveCategory('Tous'); setSelectedRegions([]); setSelectedMonths([]); setGuests(1); }} className="mt-4 text-orange text-[9px] font-bold uppercase tracking-widest border-b border-orange/20">Réinitialiser tous les filtres</button>
            </div>
          )}
        </div>

        {showMap && (
          <div className="hidden lg:block sticky top-[18rem] w-[55%] h-[calc(100vh-20rem)] z-40 bg-beige-bg rounded-[2.5rem] border border-black/5 shadow-inner relative overflow-hidden my-6">
             <div className="absolute inset-0 bg-[#E8E6E1]/40">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,50 Q25,30 50,50 T100,50" stroke="#D1CEC7" fill="none" strokeWidth="0.2" />
                  <path d="M50,0 Q70,25 50,50 T50,100" stroke="#D1CEC7" fill="none" strokeWidth="0.2" />
                </svg>
             </div>

             {filteredExperiences.map((exp) => (
                <div 
                  key={exp.id} 
                  className="absolute transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 hover:z-50" 
                  style={{ left: `${exp.coords.x}%`, top: `${exp.coords.y}%` }}
                >
                  <Link to={`/experience/${exp.id}`} className="px-4 py-2 rounded-xl border shadow-2xl flex items-center gap-2 bg-white text-primary border-black/5 hover:bg-primary hover:text-white transition-all hover:scale-110 font-bold text-[11px] italic">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {exp.price}€
                  </Link>
                </div>
              ))}
          </div>
        )}

        {/* VERSION MOBILE DE LA CARTE (FULL SCREEN TOGGLE) */}
        {showMap && (
          <div className="lg:hidden fixed inset-0 z-[100] bg-beige-bg flex flex-col pt-20">
             <div className="flex-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#E8E6E1]/40"></div>
                {filteredExperiences.map((exp) => (
                  <div 
                    key={exp.id} 
                    className="absolute transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2" 
                    style={{ left: `${exp.coords.x}%`, top: `${exp.coords.y}%` }}
                  >
                    <Link to={`/experience/${exp.id}`} className="px-3 py-1.5 rounded-lg border shadow-lg flex items-center gap-1.5 bg-white text-primary border-black/5 font-bold text-[10px] italic">
                      {exp.price}€
                    </Link>
                  </div>
                ))}
             </div>
             <button 
               onClick={() => setShowMap(false)}
               className="m-6 bg-black text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-2xl"
             >
               Revenir à la liste
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ExperienceRefinedCard: React.FC<{ exp: any }> = ({ exp }) => (
  <Link to={`/experience/${exp.id}`} className="group flex flex-col gap-3 font-sans">
    <div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] shadow-sm border border-black/[0.03]">
      <img 
        src={exp.image} 
        alt={exp.title} 
        className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" 
      />
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[7px] font-bold uppercase tracking-widest text-primary shadow-sm border border-black/5">
        {exp.category}
      </div>
      
      <div className="absolute bottom-3 left-3">
         <div className="size-12 rounded-xl border-[3px] border-white shadow-xl overflow-hidden bg-white group-hover:rotate-0 transition-transform rotate-3">
            <img src={exp.host.avatar} className="w-full h-full object-cover" alt={exp.host.name} />
         </div>
      </div>
    </div>

    <div className="px-1 flex flex-col gap-1">
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-[13px] font-sans font-bold text-primary leading-snug group-hover:text-orange transition-colors line-clamp-2 min-h-[2rem]">
          {exp.title}
        </h3>
        <span className="text-[13px] font-bold text-primary italic shrink-0">{exp.price}€</span>
      </div>
      
      <div className="space-y-0.5">
        <p className="text-[9px] text-gray-500 font-medium italic truncate">{exp.location} ({exp.region})</p>
        <div className="flex items-center justify-between">
           <p className="text-[9px] text-gray-400 font-light italic">
             {exp.maxGuests} pers. max • {exp.duration}
           </p>
           <div className="flex items-center gap-1 opacity-0 lg:group-hover:opacity-100 transition-all transform lg:translate-x-2 lg:group-hover:translate-x-0">
              <span className="text-[7px] font-bold uppercase tracking-widest text-orange">Découvrir</span>
              <span className="material-symbols-outlined text-orange text-[12px]">arrow_forward</span>
           </div>
        </div>
      </div>
    </div>
  </Link>
);

export default Experiences;
