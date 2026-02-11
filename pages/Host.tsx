import React, { useState } from 'react';

const HOST_FORM_EMAIL = 'alexso.terrago@gmail.com';

const Host: React.FC = () => {
  const [activeTab, setActiveTab] = useState('benefices');
  const [formData, setFormData] = useState({
    responsable: '',
    exploitation: '',
    secteur: '',
    email: '',
    telephone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    const exploitation = formData.exploitation.trim();
    const email = formData.email.trim();
    const telephone = formData.telephone.trim();
    if (!exploitation) {
      setSubmitError('Le nom de l\'exploitation est obligatoire.');
      return;
    }
    if (!email) {
      setSubmitError('L\'email professionnel est obligatoire.');
      return;
    }
    if (!telephone) {
      setSubmitError('Le numéro de téléphone est obligatoire.');
      return;
    }
    setIsSubmitting(true);
    const body = [
      '=== CANDIDATURE NOUS REJOINDRE ===',
      '',
      `Responsable: ${formData.responsable || '—'}`,
      `Exploitation: ${exploitation}`,
      `Secteur: ${formData.secteur || '—'}`,
      `Email: ${email}`,
      `Téléphone: ${telephone}`,
      '',
      '---',
      'Envoyé depuis la page Nous rejoindre - Terrago'
    ].join('\n');

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${HOST_FORM_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.responsable || 'Candidature',
          email: formData.email || HOST_FORM_EMAIL,
          subject: `Candidature Nous rejoindre - ${formData.exploitation || 'Sans nom'}`,
          message: body,
          _captcha: false,
          _template: 'table'
        })
      });
      if (!res.ok) throw new Error('Erreur envoi');
      setSubmitSuccess(true);
      setFormData({ responsable: '', exploitation: '', secteur: '', email: '', telephone: '' });
    } catch {
      setSubmitError('Une erreur est survenue. Veuillez réessayer ou nous contacter par email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20 bg-white font-sans min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-8">
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-8 bg-gold"></div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Programme Partenaires 2026</span>
              </div>
              <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary leading-normal mb-8 inline-block w-max max-w-full">
                <span className="font-sans not-italic">Partagez votre savoir-faire </span><span className="font-display italic text-lg sm:text-3xl md:text-4xl lg:text-5xl">et votre passion.</span>
              </h1>
              <p className="text-xl text-gray-500 font-light leading-relaxed max-w-3xl italic">
                Rejoignez le réseau Terrago, dédié au tourisme du terroir français. Accueillez du public, transmettez votre passion et votre savoir-faire, en toute liberté.
              </p>
            </div>

            {/* Tabs */}
            <div className="border-b border-black/5 mb-12 flex gap-12">
              <TabButton 
                label="BÉNÉFICES" 
                isActive={activeTab === 'benefices'} 
                onClick={() => setActiveTab('benefices')} 
              />
              <TabButton 
                label="PROCESSUS" 
                isActive={activeTab === 'processus'} 
                onClick={() => setActiveTab('processus')} 
              />
            </div>

            {/* Benefits Content */}
            {activeTab === 'benefices' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <BenefitItem 
                  icon="trending_up" 
                  title="Diversification des revenus"
                  points={[
                    "Développez une nouvelle source de revenus liée aux expériences",
                    "Ventes additionnelles (boutique physique & e-com)",
                    "Canal de distribution premium sans intermédiaire lourd"
                  ]}
                />
                <BenefitItem 
                  icon="verified_user" 
                  title="Gestion Risque & Assurance"
                  points={[
                    "Couverture pour l'accueil de public",
                    "Filtrage rigoureux en amont",
                    "Gestion des litiges par nos conseillers dédiés"
                  ]}
                />
                <BenefitItem 
                  icon="auto_awesome" 
                  title="Image de Marque"
                  points={[
                    "Reportage photo & vidéo professionnel sur demande",
                    "Accompagnement et visibilité sur les réseaux sociaux",
                    "Aide à la création de contenu"
                  ]}
                />
                <BenefitItem 
                  icon="hub" 
                  title="Efficacité Opérationnelle"
                  points={[
                    "Synchronisation automatique de votre calendrier",
                    "Facturation et reporting automatisés",
                    "Support technique 7j/7"
                  ]}
                />
              </div>
            )}

            {activeTab === 'processus' && (
              <div className="p-8 bg-beige-bg rounded-3xl animate-in fade-in duration-500 italic text-gray-500">
                <p>Notre processus de sélection garantit l'excellence du réseau. Nous vous accompagnons de l'audit initial à la mise en ligne de votre première expérience.</p>
              </div>
            )}

          </div>

          {/* Sidebar Form (Right) */}
          <div className="lg:col-span-4 lg:sticky lg:top-36">
            <div className="bg-[#FAF9F6] rounded-[2.5rem] p-10 shadow-xl border border-black/5">
              <h2 className="text-3xl font-display font-bold text-primary mb-3">Candidature rapide</h2>
              <p className="text-sm text-gray-500 font-light mb-10 leading-relaxed">Recevez un retour de nos équipes sous 72h.</p>
              
              {submitSuccess ? (
                <div className="text-center py-6">
                  <span className="material-symbols-outlined text-5xl text-primary mb-3 block">check_circle</span>
                  <h3 className="text-xl font-display font-bold text-primary mb-2">Demande envoyée</h3>
                  <p className="text-gray-500 text-sm mb-6">Nous vous recontacterons sous 72h.</p>
                  <button
                    type="button"
                    onClick={() => setSubmitSuccess(false)}
                    className="text-primary font-bold text-xs uppercase tracking-widest hover:underline"
                  >
                    Envoyer une autre candidature
                  </button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {submitError && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{submitError}</p>
                  )}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Nom du responsable</label>
                    <input
                      value={formData.responsable}
                      onChange={(e) => setFormData((d) => ({ ...d, responsable: e.target.value }))}
                      className="w-full bg-white border border-black/5 rounded-xl px-5 py-4 text-sm focus:ring-primary focus:border-primary/20 shadow-inner"
                      placeholder="ex: Marc Dumont"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Nom de l'exploitation <span className="text-orange">*</span></label>
                    <input
                      value={formData.exploitation}
                      onChange={(e) => setFormData((d) => ({ ...d, exploitation: e.target.value }))}
                      className="w-full bg-white border border-black/5 rounded-xl px-5 py-4 text-sm focus:ring-primary focus:border-primary/20 shadow-inner"
                      placeholder="ex: Château de la Roche"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Secteur d'activité</label>
                    <select
                      value={formData.secteur}
                      onChange={(e) => setFormData((d) => ({ ...d, secteur: e.target.value }))}
                      className="w-full bg-white border border-black/5 rounded-xl px-5 py-4 text-sm focus:ring-primary focus:border-primary/20 shadow-inner appearance-none cursor-pointer"
                    >
                      <option value="">Sélectionnez un secteur</option>
                      <option value="Viticulture">Viticulture</option>
                      <option value="Oléiculture">Oléiculture</option>
                      <option value="Horticulture">Horticulture</option>
                      <option value="Maraîchage">Maraîchage</option>
                      <option value="Apiculture">Apiculture</option>
                      <option value="Élevage">Élevage</option>
                      <option value="Ostréiculture">Ostréiculture</option>
                      <option value="Trufficulture">Trufficulture</option>
                      <option value="Fromagerie / Crèmerie">Fromagerie / Crèmerie</option>
                      <option value="Charcuterie artisanale">Charcuterie artisanale</option>
                      <option value="Distillation">Distillation</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email professionnel <span className="text-orange">*</span></label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                      className="w-full bg-white border border-black/5 rounded-xl px-5 py-4 text-sm focus:ring-primary focus:border-primary/20 shadow-inner"
                      placeholder="contact@domaine.fr"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Téléphone <span className="text-orange">*</span></label>
                    <input
                      type="tel"
                      value={formData.telephone}
                      onChange={(e) => setFormData((d) => ({ ...d, telephone: e.target.value }))}
                      className="w-full bg-white border border-black/5 rounded-xl px-5 py-4 text-sm focus:ring-primary focus:border-primary/20 shadow-inner"
                      placeholder="ex: 06 12 34 56 78"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold hover:bg-primary text-white py-5 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl transition-all mt-4 disabled:opacity-70 disabled:pointer-events-none"
                  >
                    {isSubmitting ? 'Envoi en cours…' : 'Soumettre ma demande'}
                    <span className="material-symbols-outlined text-base">{isSubmitting ? 'hourglass_empty' : 'send'}</span>
                  </button>
                </form>
              )}
              
              <p className="text-[9px] text-gray-400 mt-6 leading-relaxed text-center">
                En soumettant ce formulaire, vous acceptez d'être recontacté par téléphone. Rassurez-vous, vos données seront uniquement utilisées pour vous contacter.
              </p>

              <div className="mt-12 pt-8 border-t border-black/5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300 text-center mb-6 italic">Ils nous font confiance</p>
                <div className="flex items-center justify-center gap-8 opacity-20 grayscale">
                  <div className="h-6 w-20 bg-gray-400 rounded-md"></div>
                  <div className="h-6 w-20 bg-gray-400 rounded-md"></div>
                </div>
              </div>
            </div>
            
          </div>

        </div>
      </div>
    </div>
  );
};

const TabButton = ({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`pb-4 text-[11px] font-bold uppercase tracking-[0.3em] relative transition-all ${isActive ? 'text-gold' : 'text-gray-300 hover:text-gray-500'}`}
  >
    {label}
    <div className={`absolute bottom-0 left-0 h-[2px] bg-gold transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`}></div>
  </button>
);

const BenefitItem = ({ icon, title, points }: { icon: string, title: string, points: string[] }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <div className="size-10 rounded-xl bg-beige-bg flex items-center justify-center text-primary shadow-sm">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <h3 className="text-xl font-display font-bold italic leading-tight">{title}</h3>
    </div>
    <ul className="space-y-4">
      {points.map((p, i) => (
        <li key={i} className="flex items-start gap-4 text-sm text-gray-500 font-light leading-relaxed">
          <div className="size-1.5 rounded-full bg-gold/30 mt-1.5 shrink-0"></div>
          {p}
        </li>
      ))}
    </ul>
  </div>
);

export default Host;
