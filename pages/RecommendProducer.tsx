import React, { useState } from 'react';

const RECOMMEND_EMAIL = 'alexso.terrago@gmail.com';
const FORMSPREE_RECOMMEND_ID = import.meta.env.VITE_FORMSPREE_RECOMMEND_ID as string | undefined;

const RecommendProducer: React.FC = () => {
  const [formData, setFormData] = useState({
    producerName: '',
    yourName: '',
    yourEmail: '',
    producerContact: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    const emailBody = [
      '=== RECOMMANDATION PRODUCTEUR ===',
      '',
      `Nom du producteur / exploitation : ${formData.producerName || '—'}`,
      `Votre nom : ${formData.yourName || '—'}`,
      `Votre email : ${formData.yourEmail || '—'}`,
      `Contact du producteur : ${formData.producerContact || '—'}`,
      '',
      'Message :',
      formData.message || '—',
      '',
      '---',
      'Envoyé depuis le formulaire Recommander un producteur - Terrago'
    ].join('\n');

    try {
      if (FORMSPREE_RECOMMEND_ID) {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_RECOMMEND_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            _replyto: formData.yourEmail || undefined,
            producerName: formData.producerName,
            yourName: formData.yourName,
            yourEmail: formData.yourEmail,
            producerContact: formData.producerContact,
            message: formData.message,
            _subject: `Recommandation producteur : ${formData.producerName || 'Sans nom'}`,
            _format: 'plain',
            body: emailBody
          })
        });
        if (!res.ok) throw new Error('Erreur envoi');
      } else {
        const res = await fetch(`https://formsubmit.co/ajax/${RECOMMEND_EMAIL}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: formData.yourName || 'Anonyme',
            email: formData.yourEmail || RECOMMEND_EMAIL,
            subject: `Recommandation producteur : ${formData.producerName || 'Sans nom'}`,
            message: emailBody,
            _captcha: false,
            _template: 'table'
          })
        });
        if (!res.ok) throw new Error('Erreur envoi');
      }

      setSubmitSuccess(true);
      setFormData({ producerName: '', yourName: '', yourEmail: '', producerContact: '', message: '' });
    } catch {
      setSubmitError('Une erreur est survenue. Veuillez réessayer ou nous contacter par email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20 bg-white font-sans min-h-screen">
      <div className="max-w-[900px] mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8 bg-gold"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Partagez votre réseau</span>
          </div>
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary leading-normal mb-8 inline-block w-max max-w-full">
            <span className="font-sans not-italic">Recommander </span>
            <span className="font-display italic text-lg sm:text-3xl md:text-4xl lg:text-5xl">un producteur</span>
          </h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed max-w-2xl italic">
            Vous connaissez un producteur du terroir qui mérite de rejoindre Terrago ? Transmettez-nous ses coordonnées et nous prendrons contact avec lui.
          </p>
        </div>

        <div className="bg-[#FAF9F6] rounded-[2.5rem] p-8 sm:p-10 shadow-xl border border-black/5">
          {submitSuccess ? (
            <div className="text-center py-8">
              <span className="material-symbols-outlined text-6xl text-primary mb-4 block">check_circle</span>
              <h2 className="text-2xl font-display font-bold text-primary mb-2">Recommandation envoyée</h2>
              <p className="text-gray-500 mb-6">Merci ! Nous prendrons contact avec le producteur si le profil correspond.</p>
              <button
                type="button"
                onClick={() => setSubmitSuccess(false)}
                className="text-primary font-bold text-sm uppercase tracking-widest hover:underline"
              >
                Envoyer une autre recommandation
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-display font-bold text-primary mb-2">Votre recommandation</h2>
              <p className="text-sm text-gray-500 font-light mb-8 leading-relaxed">Tous les champs sont facultatifs, mais plus vous nous en donnez, plus nous pourrons avancer vite.</p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {submitError && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{submitError}</p>
                )}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Nom du producteur ou de l'exploitation</label>
                  <input
                    name="producerName"
                    value={formData.producerName}
                    onChange={(e) => setFormData((d) => ({ ...d, producerName: e.target.value }))}
                    className="w-full bg-white border border-black/5 rounded-xl px-5 py-4 text-sm focus:ring-primary focus:border-primary/20 transition-all placeholder:text-gray-300"
                    placeholder="ex: Domaine des Oliviers"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Votre nom</label>
                    <input
                      name="yourName"
                      value={formData.yourName}
                      onChange={(e) => setFormData((d) => ({ ...d, yourName: e.target.value }))}
                      className="w-full bg-white border border-black/5 rounded-xl px-5 py-4 text-sm focus:ring-primary focus:border-primary/20 transition-all placeholder:text-gray-300"
                      placeholder="ex: Marie Dupont"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Votre email</label>
                    <input
                      type="email"
                      name="yourEmail"
                      value={formData.yourEmail}
                      onChange={(e) => setFormData((d) => ({ ...d, yourEmail: e.target.value }))}
                      className="w-full bg-white border border-black/5 rounded-xl px-5 py-4 text-sm focus:ring-primary focus:border-primary/20 transition-all placeholder:text-gray-300"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Contact du producteur (email ou téléphone si vous l'avez)</label>
                  <input
                    name="producerContact"
                    value={formData.producerContact}
                    onChange={(e) => setFormData((d) => ({ ...d, producerContact: e.target.value }))}
                    className="w-full bg-white border border-black/5 rounded-xl px-5 py-4 text-sm focus:ring-primary focus:border-primary/20 transition-all placeholder:text-gray-300"
                    placeholder="ex: contact@domaine.fr ou 06 12 34 56 78"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Quelques mots (secteur, région, pourquoi vous le recommandez)</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                    className="w-full bg-white border border-black/5 rounded-xl px-5 py-4 text-sm focus:ring-primary focus:border-primary/20 transition-all placeholder:text-gray-300 resize-none"
                    placeholder="ex: Viticulteur en Bourgogne, accueil déjà en place, très investi dans la transmission..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gradient-primary text-white py-5 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl transition-all hover:shadow-orange-glow hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
                >
                  {isSubmitting ? 'Envoi en cours…' : 'Envoyer la recommandation'}
                  <span className="material-symbols-outlined text-base">{isSubmitting ? 'hourglass_empty' : 'send'}</span>
                </button>
              </form>
            </>
          )}

          <p className="text-[9px] text-gray-400 mt-6 leading-relaxed text-center">
            En envoyant ce formulaire, vous acceptez que Terrago utilise ces informations pour contacter le producteur recommandé. Nous ne revendons pas vos données.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecommendProducer;
