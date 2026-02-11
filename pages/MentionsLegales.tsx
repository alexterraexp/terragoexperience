
import React from 'react';
import { Link } from 'react-router-dom';

const MentionsLegales: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-beige-bg font-sans min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-black/5">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-orange hover:text-primary transition-colors mb-6">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Retour à l'accueil</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary italic mb-4">Mentions Légales</h1>
            <p className="text-gray-400 text-sm italic">Dernière mise à jour : Février 2026</p>
          </div>

          <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-display font-bold text-primary mb-4 italic">1. Éditeur du site</h2>
              <p>
                Le site <strong>Terrago</strong> est édité par Terrago SAS, société par actions simplifiée au capital de 50 000 euros, 
                immatriculée au RCS de Paris sous le numéro 123 456 789, dont le siège social est situé au 123 rue de la Terre, 75001 Paris, France.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-primary mb-4 italic">2. Directeur de publication</h2>
              <p>
                Le directeur de publication est M. [Nom du Directeur], en qualité de représentant légal de Terrago SAS.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-primary mb-4 italic">3. Hébergement</h2>
              <p>
                Le site est hébergé par [Nom de l'hébergeur], [Adresse de l'hébergeur].
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-primary mb-4 italic">4. Propriété intellectuelle</h2>
              <p>
                L'ensemble des contenus présents sur le site (textes, images, vidéos, logos, etc.) sont la propriété exclusive de Terrago SAS 
                ou de ses partenaires et sont protégés par les lois françaises et internationales relatives à la propriété intellectuelle.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-primary mb-4 italic">5. Protection des données personnelles</h2>
              <p>
                Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), 
                vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
              </p>
              <p className="mt-2">
                Pour exercer ces droits, vous pouvez nous contacter à l'adresse : <a href="mailto:contact@terroir-exception.fr" className="text-orange hover:underline">contact@terroir-exception.fr</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-primary mb-4 italic">6. Cookies</h2>
              <p>
                Le site utilise des cookies pour améliorer votre expérience de navigation. En continuant à utiliser ce site, 
                vous acceptez l'utilisation de cookies conformément à notre politique de confidentialité.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-primary mb-4 italic">7. Responsabilité</h2>
              <p>
                Terrago SAS s'efforce de fournir des informations exactes et à jour. Cependant, l'entreprise ne peut garantir l'exactitude, 
                la complétude ou l'actualité des informations diffusées sur le site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-primary mb-4 italic">8. Contact</h2>
              <p>
                Pour toute question concernant ces mentions légales, vous pouvez nous contacter :
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

export default MentionsLegales;
