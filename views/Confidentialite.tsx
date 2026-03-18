'use client';

import React from 'react';
import Link from 'next/link';

const Confidentialite: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-beige-bg font-sans min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-black/5">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-orange hover:text-primary transition-colors mb-6">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Retour à l'accueil</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary italic mb-4">Politique de Confidentialité</h1>
            <p className="text-gray-400 text-sm italic">Dernière mise à jour : Février 2026</p>
          </div>

          <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-display font-bold text-primary mb-4 italic">1. Introduction</h2>
              <p>
                Terrago, édité par Terrago SAS, s'engage à protéger la confidentialité et la sécurité des données personnelles 
                de ses utilisateurs. Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos informations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-primary mb-4 italic">2. Données collectées</h2>
              <p className="mb-2">Nous collectons les données suivantes :</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Données d'identification (nom, prénom, email, téléphone)</li>
                <li>Données de navigation (adresse IP, cookies, pages visitées)</li>
                <li>Données de réservation (dates, nombre de participants, préférences)</li>
                <li>Données de paiement (gérées par nos prestataires sécurisés)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-primary mb-4 italic">3. Utilisation des données</h2>
              <p className="mb-2">Vos données sont utilisées pour :</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Traiter et gérer vos réservations d'expériences</li>
                <li>Vous contacter concernant vos réservations</li>
                <li>Améliorer nos services et votre expérience utilisateur</li>
                <li>Vous envoyer des communications marketing (avec votre consentement)</li>
                <li>Respecter nos obligations légales et réglementaires</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-primary mb-4 italic">4. Partage des données</h2>
              <p>
                Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos informations uniquement avec :
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>Les producteurs et hôtes pour organiser vos expériences</li>
                <li>Nos prestataires de services (hébergement, paiement) dans le cadre strict de leurs missions</li>
                <li>Les autorités compétentes si la loi l'exige</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-primary mb-4 italic">5. Sécurité des données</h2>
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre 
                tout accès non autorisé, perte, destruction ou altération. Vos données de paiement sont cryptées et gérées par 
                des prestataires certifiés PCI-DSS.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-primary mb-4 italic">6. Vos droits</h2>
              <p className="mb-2">Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification des données inexactes</li>
                <li>Droit à l'effacement de vos données</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité de vos données</li>
                <li>Droit d'opposition au traitement</li>
                <li>Droit de retirer votre consentement à tout moment</li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@terroir-exception.fr" className="text-orange hover:underline">contact@terroir-exception.fr</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-primary mb-4 italic">7. Cookies</h2>
              <p>
                Notre site utilise des cookies pour améliorer votre expérience. Vous pouvez gérer vos préférences de cookies 
                dans les paramètres de votre navigateur. Certains cookies sont essentiels au fonctionnement du site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-primary mb-4 italic">8. Conservation des données</h2>
              <p>
                Nous conservons vos données personnelles uniquement pendant la durée nécessaire aux finalités pour lesquelles 
                elles ont été collectées, ou conformément aux obligations légales applicables.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-primary mb-4 italic">9. Modifications</h2>
              <p>
                Cette politique de confidentialité peut être modifiée à tout moment. Nous vous informerons de tout changement 
                significatif par email ou via une notification sur le site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-primary mb-4 italic">10. Contact</h2>
              <p>
                Pour toute question concernant cette politique de confidentialité ou vos données personnelles :
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Email : <a href="mailto:contact@terroir-exception.fr" className="text-orange hover:underline">contact@terroir-exception.fr</a></li>
                <li>Téléphone : +33 (0)1 89 20 44 00</li>
                <li>Adresse : 123 rue de la Terre, 75001 Paris, France</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confidentialite;
