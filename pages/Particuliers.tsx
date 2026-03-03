import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimate from '../components/ScrollAnimate';

const CONTACT_EMAIL = 'terragoexperiences@gmail.com';

const Particuliers: React.FC = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [portable, setPortable] = useState('');
  const [periode, setPeriode] = useState('');
  const [univers, setUnivers] = useState('');
  const [precisions, setPrecisions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    const message = [
      'Bonjour,',
      '',
      'Je suis intéressé(e) par une expérience ou un séjour avec Terrago. Voici les détails de ma demande :',
      '',
      `Nom : ${nom}`,
      `Prénom : ${prenom}`,
      `Email : ${email || '—'}`,
      `Téléphone : ${portable || '—'}`,
      `Période ou date souhaitée : ${periode || '—'}`,
      `Produits / univers à découvrir : ${univers || '—'}`,
      precisions ? `Précisions : ${precisions}` : '',
      '',
      'Merci pour votre retour.',
      '',
      `${prenom} ${nom}`
    ].filter(Boolean).join('\n');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: `${prenom} ${nom}`,
          email: email,
          subject: `Entre amis - Demande de ${prenom} ${nom}`,
          message,
          _captcha: false,
          _template: 'table'
        })
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setNom('');
        setPrenom('');
        setEmail('');
        setPortable('');
        setPeriode('');
        setUnivers('');
        setPrecisions('');
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch {
      setSubmitError('Une erreur est survenue. Veuillez réessayer ou nous contacter à terragoexperiences@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 font-sans min-h-screen overflow-x-hidden">
      <section className="px-4 sm:px-8 lg:px-12 py-16 sm:py-24 bg-beige-bg scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="inline-block px-3 py-1 bg-orange text-white font-bold font-sans tracking-[0.3em] uppercase text-[8px] sm:text-[9px] mb-6 rounded-full shadow-md">
              Entre amis
            </span>
            <ScrollAnimate delay={100}>
              <h1 className="font-bold text-primary leading-tight mb-6">
                <span className="font-sans not-italic text-3xl sm:text-4xl md:text-4xl">
                  Des expériences et séjours uniques et 100% personnalisés,{" "}
                </span>
                <span className="font-display italic text-4xl sm:text-4xl md:text-5xl">
                  entre amis ou en famille.
                </span>
              </h1>
            </ScrollAnimate>
            <p className="text-gray-600 text-base sm:text-mg font-light leading-relaxed max-w-2xl mx-auto">
              Vous souhaitez vivre des expériences uniques et authentiques au cœur du terroir ? Remplissez le formulaire ci-dessous : nous vous recontactons pour vous proposer des pépites sur mesure.
            </p>
          </div>

          <ScrollAnimate delay={200}>
            {submitSuccess ? (
              <div className="max-w-xl mx-auto bg-white rounded-2xl sm:rounded-[2rem] p-8 sm:p-10 shadow-premium border border-black/5 text-center">
                <span className="material-symbols-outlined text-5xl text-orange mb-4 block">check_circle</span>
                <h2 className="font-bold text-primary text-xl mb-2">Demande envoyée</h2>
                <p className="text-gray-600 text-sm">
                  Merci ! Nous avons bien reçu votre demande et vous recontacterons très prochainement à l'adresse indiquée.
                </p>
              </div>
            ) : (
            <form
              onSubmit={handleSubmit}
              className="max-w-xl mx-auto bg-white rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 shadow-premium border border-black/5"
            >
              {submitError && (
                <p className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs">{submitError}</p>
              )}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
                <label className="block">
                  <span className="block text-primary font-semibold text-[11px] uppercase tracking-wider mb-1.5">Nom</span>
                  <input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                    className="w-full bg-beige-bg/60 border border-black/10 rounded-xl px-4 py-3 text-primary text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="Votre nom"
                  />
                </label>
                <label className="block">
                  <span className="block text-primary font-semibold text-[11px] uppercase tracking-wider mb-1.5">Prénom</span>
                  <input
                    type="text"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    required
                    className="w-full bg-beige-bg/60 border border-black/10 rounded-xl px-4 py-3 text-primary text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="Votre prénom"
                  />
                </label>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
                <label className="block">
                  <span className="block text-primary font-semibold text-[11px] uppercase tracking-wider mb-1.5">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-beige-bg/60 border border-black/10 rounded-xl px-4 py-3 text-primary text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="votre@email.fr"
                  />
                </label>
                <label className="block">
                  <span className="block text-primary font-semibold text-[11px] uppercase tracking-wider mb-1.5">Téléphone</span>
                  <input
                    type="tel"
                    value={portable}
                    onChange={(e) => setPortable(e.target.value)}
                    className="w-full bg-beige-bg/60 border border-black/10 rounded-xl px-4 py-3 text-primary text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="06 12 34 56 78"
                  />
                </label>
              </div>
              <label className="block mb-4 sm:mb-5">
                <span className="block text-primary font-semibold text-[11px] uppercase tracking-wider mb-1.5">Période ou date précise</span>
                <input
                  type="text"
                  value={periode}
                  onChange={(e) => setPeriode(e.target.value)}
                  className="w-full bg-beige-bg/60 border border-black/10 rounded-xl px-4 py-3 text-primary text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="Ex. semaine du 15 août, ou dates précises"
                />
              </label>
              <label className="block mb-4 sm:mb-5">
                <span className="block text-primary font-semibold text-[11px] uppercase tracking-wider mb-1.5">Produits / univers à découvrir</span>
                <input
                  type="text"
                  value={univers}
                  onChange={(e) => setUnivers(e.target.value)}
                  className="w-full bg-beige-bg/60 border border-black/10 rounded-xl px-4 py-3 text-primary text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="Ex. vignes, fromages, mer, truffe, lavande…"
                />
              </label>
              <label className="block mb-6 sm:mb-8">
                <span className="block text-primary font-semibold text-[11px] uppercase tracking-wider mb-1.5">Précisions</span>
                <textarea
                  value={precisions}
                  onChange={(e) => setPrecisions(e.target.value)}
                  rows={4}
                  className="w-full bg-beige-bg/60 border border-black/10 rounded-xl px-4 py-3 text-primary text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-y min-h-[100px] transition-all"
                  placeholder="Nombre de personnes, envies particulières, région préférée…"
                />
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-[9px] sm:text-[10px] shadow-premium hover:bg-orange hover:shadow-orange-glow transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                    Envoi en cours…
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">send</span>
                    Envoyer ma demande !
                  </>
                )}
              </button>
            </form>
            )}
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
