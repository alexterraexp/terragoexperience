'use client';

import React from 'react';
import Link from 'next/link';
import { HOME_COLORS, HOME_RADIUS } from '../components/home/homeStyles';
import { HOME_EMOJI } from '../lib/homeStorage';

const EMOJI = {
  branche: HOME_EMOJI.branche,
  shoes: HOME_EMOJI.chaussures,
} as const;

const sectionTitleClass =
  'mb-4 font-sans text-[18px] font-semibold leading-snug tracking-[-0.04em] sm:text-[20px]';

const subsectionTitleClass =
  'mb-2 mt-5 font-sans text-[15px] font-semibold leading-snug tracking-[-0.03em] sm:text-[16px]';

const linkClass =
  'font-medium underline decoration-1 underline-offset-2 transition-colors hover:opacity-80';

const Confidentialite: React.FC = () => {
  return (
    <div
      className="min-h-screen overflow-x-hidden font-sans [&_h1]:!font-sans [&_h2]:!font-sans [&_h3]:!font-sans [&_p]:font-sans [&_a]:font-sans [&_li]:font-sans"
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: HOME_COLORS.gray,
      }}
    >
      <div className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-[calc(7.5rem+env(safe-area-inset-top))] sm:px-8 sm:pt-[calc(9rem+env(safe-area-inset-top))] lg:pt-[calc(10rem+env(safe-area-inset-top))]">
        <img
          src={EMOJI.branche}
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-2 top-[calc(7.8rem+env(safe-area-inset-top))] z-20 hidden h-40 w-40 rotate-6 object-contain sm:block sm:-left-24 sm:right-auto sm:top-[calc(9.5rem+env(safe-area-inset-top))] sm:h-52 sm:w-52 sm:-rotate-12 lg:-left-32 lg:h-72 lg:w-72"
        />

        <div
          className="relative z-10 overflow-visible bg-white px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16"
          style={{
            borderRadius: HOME_RADIUS,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <img
            src={EMOJI.shoes}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -right-2 z-20 h-44 w-44 -rotate-6 object-contain sm:-right-32 sm:bottom-24 sm:h-52 sm:w-52 sm:rotate-6 lg:-right-40 lg:bottom-32 lg:h-72 lg:w-72"
          />
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.12em] transition-colors hover:opacity-80"
            style={{ color: HOME_COLORS.orange, fontFamily: "'Poppins', sans-serif" }}
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Retour à l&apos;accueil
          </Link>

          <h1
            className="font-sans text-[34px] font-normal leading-[1.05] tracking-[-0.075em] sm:text-[42px] lg:text-[48px]"
            style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
          >
            <span className="font-bold">Politique</span> de confidentialité
          </h1>
          <p
            className="mt-3 font-sans text-[13px] font-normal tracking-[-0.04em]"
            style={{ color: `${HOME_COLORS.primary}66`, fontFamily: "'Poppins', sans-serif" }}
          >
            Dernière mise à jour : Février 2026
          </p>

          <div
            className="mt-10 space-y-10 font-sans text-[14px] font-normal leading-[1.7] tracking-[-0.04em] sm:text-[15px]"
            style={{ color: `${HOME_COLORS.primary}B3`, fontFamily: "'Poppins', sans-serif" }}
          >
            <section>
              <h2
                className={sectionTitleClass}
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                <span style={{ color: HOME_COLORS.orange }}>1.</span> Introduction
              </h2>
              <p>
                TerraGo, édité par TerraGo SAS, s&apos;engage à protéger la confidentialité et la
                sécurité des données personnelles de ses utilisateurs. Cette politique de
                confidentialité vise à décrire de manière transparente les données que nous
                collectons, la façon dont nous les utilisons et leur finalité, conformément à la
                Loi Informatique et Libertés du 6 janvier 1978 modifiée et au Règlement Général sur
                la Protection des Données (RGPD n°&nbsp;2016-679).
              </p>
            </section>

            <section>
              <h2
                className={sectionTitleClass}
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                <span style={{ color: HOME_COLORS.orange }}>2.</span> Définitions
              </h2>
              <p>
                <strong style={{ color: HOME_COLORS.primary }}>Services</strong> : le site internet
                TerraGo (notamment{' '}
                <a
                  href="https://www.terragoexperiences.fr"
                  className={linkClass}
                  style={{ color: HOME_COLORS.orange }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.terragoexperiences.fr
                </a>
                ) et/ou tout autre moyen mis à disposition par TerraGo SAS pour proposer et
                organiser des séminaires d&apos;entreprise auprès de producteurs locaux.
              </p>
              <p className="mt-3">
                <strong style={{ color: HOME_COLORS.primary }}>Utilisateur</strong> : personne
                physique et/ou morale utilisant les services mis à disposition par TerraGo.
              </p>
              <p className="mt-3">
                <strong style={{ color: HOME_COLORS.primary }}>Client</strong> : personne physique
                et/ou morale ayant acheté (ou ayant l&apos;intention d&apos;acheter) une
                prestation de séminaire auprès de TerraGo.
              </p>
            </section>

            <section>
              <h2
                className={sectionTitleClass}
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                <span style={{ color: HOME_COLORS.orange }}>3.</span> Données collectées
              </h2>

              <h3
                className={subsectionTitleClass}
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                Demande de devis en ligne
              </h3>
              <p>
                En renseignant notre formulaire de demande de devis, vous sollicitez nos services
                pour recevoir une proposition personnalisée pour votre projet de séminaire. Dans ce
                cadre, nous collectons uniquement :
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>Votre prénom</li>
                <li>Votre nom</li>
                <li>Votre numéro de téléphone professionnel</li>
                <li>Votre courrier électronique</li>
              </ul>

              <h3
                className={subsectionTitleClass}
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                Échanges téléphoniques et par email
              </h3>
              <p>
                Une fois votre projet formulé, nous sommes susceptibles de vous recontacter par
                téléphone et/ou par email afin d&apos;affiner notre compréhension de vos besoins
                (dates, destination, nombre de participants, budget, contraintes du projet, etc.).
              </p>

              <h3
                className={subsectionTitleClass}
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                Navigation sur notre site internet
              </h3>
              <p>
                Lorsque vous accédez à nos services, nous enregistrons automatiquement des données
                d&apos;utilisation (mesure d&apos;audience, pages consultées, données techniques de
                connexion) via des outils d&apos;analyse tels que Google Analytics.
              </p>

              <h3
                className={subsectionTitleClass}
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                Organisation d&apos;un séminaire
              </h3>
              <p>
                Lorsqu&apos;un séminaire est confirmé, nous sommes susceptibles de collecter des
                informations complémentaires sur les participants (prénom, nom, régime alimentaire,
                allergies, email professionnel), dans la stricte limite de ce qui est nécessaire à
                la bonne organisation de l&apos;événement.
              </p>
            </section>

            <section>
              <h2
                className={sectionTitleClass}
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                <span style={{ color: HOME_COLORS.orange }}>4.</span> Utilisation de vos données
              </h2>
              <p>Nous utilisons vos données pour :</p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>Traiter votre demande de devis et vous recontacter</li>
                <li>Organiser votre séminaire et coordonner nos producteurs partenaires</li>
                <li>Améliorer nos services à des fins statistiques et marketing</li>
                <li>Respecter nos obligations légales et réglementaires</li>
              </ul>
            </section>

            <section>
              <h2
                className={sectionTitleClass}
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                <span style={{ color: HOME_COLORS.orange }}>5.</span> Partage des données
              </h2>
              <p>
                Nous ne vendons jamais vos données personnelles. Nous pouvons les partager
                uniquement avec :
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>
                  Les producteurs et hôtes concernés, pour l&apos;organisation de votre séminaire
                </li>
                <li>
                  Nos prestataires techniques (hébergement, outils d&apos;analyse) dans la stricte
                  limite de leurs missions
                </li>
                <li>
                  Les autorités compétentes, uniquement sur réquisition légale
                </li>
              </ul>
              <p className="mt-3">
                Nos prestataires et partenaires s&apos;engagent à ne pas réutiliser vos données à
                des fins commerciales propres, et à mettre en œuvre les moyens techniques
                nécessaires pour garantir leur sécurité et leur confidentialité.
              </p>
            </section>

            <section>
              <h2
                className={sectionTitleClass}
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                <span style={{ color: HOME_COLORS.orange }}>6.</span> Responsable de traitement
              </h2>
              <p>
                Le responsable du traitement des données personnelles est TerraGo SAS, représentée
                par M. Jérôme Peyron, en sa qualité de représentant légal.
              </p>
            </section>

            <section>
              <h2
                className={sectionTitleClass}
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                <span style={{ color: HOME_COLORS.orange }}>7.</span> Vos droits
              </h2>
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>Droit d&apos;accès (art. 15) et de rectification (art. 16) de vos données</li>
                <li>Droit à l&apos;effacement de vos données (art. 17)</li>
                <li>Droit de retirer votre consentement à tout moment (art. 13-2c)</li>
                <li>Droit à la limitation du traitement (art. 18)</li>
                <li>Droit d&apos;opposition au traitement (art. 21)</li>
                <li>Droit à la portabilité de vos données (art. 20)</li>
                <li>Droit de définir le sort de vos données après votre décès</li>
              </ul>
              <p className="mt-3">
                Pour exercer ces droits, vous pouvez nous contacter à :{' '}
                <a
                  href="mailto:terragoexperiences@gmail.com"
                  className={linkClass}
                  style={{ color: HOME_COLORS.orange }}
                >
                  terragoexperiences@gmail.com
                </a>
              </p>
              <p className="mt-3">
                Vous pouvez également déposer une réclamation auprès de la CNIL (
                <a
                  href="https://www.cnil.fr/fr/plaintes"
                  className={linkClass}
                  style={{ color: HOME_COLORS.orange }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.cnil.fr/fr/plaintes
                </a>
                ).
              </p>
            </section>

            <section>
              <h2
                className={sectionTitleClass}
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                <span style={{ color: HOME_COLORS.orange }}>8.</span> Durée de conservation
              </h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Les données de contact issues d&apos;une demande de devis sont conservées
                  3&nbsp;ans à compter du dernier échange, sauf conclusion d&apos;un contrat
                </li>
                <li>
                  Les documents et pièces comptables sont conservés 10&nbsp;ans, à titre de preuve
                  comptable
                </li>
                <li>
                  Les données personnelles des participants à un séminaire sont conservées au
                  maximum 3&nbsp;mois après la fin de la prestation
                </li>
              </ul>
            </section>

            <section>
              <h2
                className={sectionTitleClass}
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                <span style={{ color: HOME_COLORS.orange }}>9.</span> Sécurité des données
              </h2>
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour
                protéger vos données contre tout accès non autorisé, perte, destruction ou
                altération.
              </p>
            </section>

            <section>
              <h2
                className={sectionTitleClass}
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                <span style={{ color: HOME_COLORS.orange }}>10.</span> Cookies
              </h2>
              <p>
                Notre site est susceptible d&apos;utiliser des cookies afin d&apos;améliorer
                l&apos;expérience de navigation des utilisateurs (mesure d&apos;audience
                notamment). En poursuivant votre navigation sur le site, vous acceptez
                l&apos;utilisation de ces cookies conformément à la présente politique. Vous
                pouvez à tout moment gérer vos préférences via les paramètres de votre navigateur.
              </p>
              <h3
                className={subsectionTitleClass}
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                Durée de vie des cookies
              </h3>
              <p>
                Les cookies sont déposés sur le terminal de l&apos;utilisateur pour une durée
                maximale de 13&nbsp;mois à compter du recueil de son consentement. Passé ce délai,
                le consentement sera à nouveau sollicité.
              </p>
            </section>

            <section>
              <h2
                className={sectionTitleClass}
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                <span style={{ color: HOME_COLORS.orange }}>11.</span> Modifications
              </h2>
              <p>
                Cette politique de confidentialité peut être modifiée à tout moment. Nous vous
                informerons de tout changement significatif par email ou via une notification sur
                le site.
              </p>
            </section>

            <section>
              <h2
                className={sectionTitleClass}
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                <span style={{ color: HOME_COLORS.orange }}>12.</span> Droit applicable et
                juridiction
              </h2>
              <p>
                Tout litige en lien avec l&apos;utilisation des services de TerraGo est soumis au
                droit français. Il est fait attribution exclusive de juridiction aux tribunaux
                compétents d&apos;Annecy.
              </p>
            </section>

            <section>
              <h2
                className={sectionTitleClass}
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                <span style={{ color: HOME_COLORS.orange }}>13.</span> Contact
              </h2>
              <p>
                Email :{' '}
                <a
                  href="mailto:terragoexperiences@gmail.com"
                  className={linkClass}
                  style={{ color: HOME_COLORS.orange }}
                >
                  terragoexperiences@gmail.com
                </a>
              </p>
              <p className="mt-3">
                Adresse : 44 Avenue de Champ Fleuri, 74000 Annecy, France
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confidentialite;
