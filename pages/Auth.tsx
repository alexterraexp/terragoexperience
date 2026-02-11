
import React from 'react';
import { Link } from 'react-router-dom';

const Auth: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-beige-bg relative overflow-hidden font-sans pt-40 pb-16">
      {/* Éléments de décoration */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-orange/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full max-w-[440px] mx-6 relative z-10 space-y-6">
        {/* Main Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-black/[0.03] overflow-hidden p-8 md:p-12">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary italic mb-3">
              Mon Compte
            </h1>
            <p className="text-[11px] text-gray-400 font-light italic uppercase tracking-widest">
              Accédez à vos immersions favorites
            </p>
          </div>

          {/* Social Logins */}
          <div className="space-y-4 mb-10">
            <SocialButton 
              icon="https://www.google.com/favicon.ico" 
              label="Continuer avec Google" 
            />
            <SocialButton 
              icon="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" 
              label="Continuer avec Apple" 
            />
          </div>

          <div className="relative flex items-center mb-10">
            <div className="flex-grow border-t border-black/5"></div>
            <span className="flex-shrink mx-4 text-[8px] uppercase tracking-[0.3em] font-bold text-gray-300">Ou par email</span>
            <div className="flex-grow border-t border-black/5"></div>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-primary uppercase tracking-[0.2em] opacity-40 ml-1">Adresse Email</label>
              <input 
                type="email"
                className="w-full bg-beige-bg/30 border border-black/5 rounded-2xl px-6 py-4 text-xs focus:ring-primary/10 focus:border-primary/20 transition-all placeholder:text-gray-300 italic" 
                placeholder="votre@email.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-primary uppercase tracking-[0.2em] opacity-40 ml-1">Mot de passe</label>
              <input 
                type="password"
                className="w-full bg-beige-bg/30 border border-black/5 rounded-2xl px-6 py-4 text-xs focus:ring-primary/10 focus:border-primary/20 transition-all placeholder:text-gray-300" 
                placeholder="••••••••••••"
              />
            </div>

            <button className="w-full bg-primary text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-primary/10 hover:bg-black hover:scale-[1.02] active:scale-95 transition-all mt-6">
              Continuer
            </button>
          </form>

          <p className="mt-10 text-center text-[9px] text-gray-300 font-light leading-relaxed">
            En continuant, vous accédez à votre espace membre Terrago et acceptez nos <span className="underline cursor-pointer hover:text-primary">Conditions</span>.
          </p>
        </div>

        {/* PRODUCER ENCART */}
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 md:p-8 group hover:bg-white hover:shadow-xl transition-all duration-500">
           <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                 <span className="material-symbols-outlined text-2xl">agriculture</span>
              </div>
              <div className="flex-1">
                 <h3 className="text-lg font-display font-bold text-primary italic leading-tight">Espace Producteur</h3>
                 <p className="text-[10px] text-gray-500 font-light italic leading-relaxed mt-1">
                    Vous êtes déjà partenaire ou vous souhaitez nous rejoindre ?
                 </p>
              </div>
           </div>
           <div className="mt-6 flex flex-col gap-3">
              <Link 
                to="/nous-rejoindre" 
                className="w-full py-3 bg-white border border-primary/20 text-primary text-center rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                 Accéder à mon espace pro
              </Link>
              <Link 
                to="/nous-rejoindre" 
                className="text-center text-[8px] font-bold uppercase tracking-widest text-primary/40 hover:text-primary transition-colors py-1"
              >
                 Pas encore partenaire ? Nous rejoindre
              </Link>
           </div>
        </div>

        <div className="text-center">
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-xs">verified_user</span>
            Espace Sécurisé • Terrago
          </p>
        </div>
      </div>
    </div>
  );
};

const SocialButton = ({ icon, label }: { icon: string, label: string }) => (
  <button className="w-full flex items-center justify-center gap-4 bg-white border border-black/5 py-4 rounded-2xl hover:bg-stone-50 transition-all shadow-sm group">
    <img src={icon} alt={label} className="size-5 object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary">{label}</span>
  </button>
);

export default Auth;
