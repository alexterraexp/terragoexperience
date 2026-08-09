'use client';

import React from 'react';
import Link from 'next/link';
import { HOME_COLORS, HOME_RADIUS } from '../components/home/homeStyles';
import { HOME_EMOJI } from '../lib/homeStorage';

const EMOJI = {
  ble: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/emoji/ble.png',
  arbre: HOME_EMOJI.arbre,
} as const;

const MentionsLegales: React.FC = () => {
  return (
    <div
      className="min-h-screen overflow-x-hidden font-sans [&_h1]:!font-sans [&_h2]:!font-sans [&_h3]:!font-sans [&_p]:font-sans [&_a]:font-sans"
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: HOME_COLORS.gray,
      }}
    >
      <div className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-[calc(7.5rem+env(safe-area-inset-top))] sm:px-8 sm:pt-[calc(9rem+env(safe-area-inset-top))] lg:pt-[calc(10rem+env(safe-area-inset-top))]">
        {/* Stickers décoratifs — côtés du cadre */}
        <img
          src={EMOJI.ble}
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-2 top-[calc(7.8rem+env(safe-area-inset-top))] z-20 hidden h-40 w-40 rotate-6 object-contain sm:block sm:-left-7 sm:right-auto sm:top-[calc(10.5rem+env(safe-area-inset-top))] sm:h-24 sm:w-24 sm:-rotate-12 lg:-left-9 lg:h-32 lg:w-32"
        />

        <div
          className="relative z-10 overflow-visible bg-white px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16"
          style={{
            borderRadius: HOME_RADIUS,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <img
            src={EMOJI.arbre}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -right-2 z-20 h-44 w-44 -rotate-6 object-contain sm:-right-32 sm:bottom-24 sm:h-52 sm:w-52 sm:rotate-6 lg:-right-40 lg:bottom-32 lg:h-72 lg:w-72"
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
            <span className="font-bold">Mentions</span> légales
          </h1>
          <p
            className="mt-3 font-sans text-[13px] font-normal tracking-[-0.04em]"
            style={{ color: `${HOME_COLORS.primary}66`, fontFamily: "'Poppins', sans-serif" }}
          >
            Dernière mise à jour : Mai 2026
          </p>

          <div
            className="mt-10 space-y-10 font-sans text-[14px] font-normal leading-[1.7] tracking-[-0.04em] sm:text-[15px]"
            style={{ color: `${HOME_COLORS.primary}B3`, fontFamily: "'Poppins', sans-serif" }}
          >
            <section>
              <h2
                className="mb-4 font-sans text-[18px] font-semibold leading-snug tracking-[-0.04em] sm:text-[20px]"
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                <span style={{ color: HOME_COLORS.orange }}>1.</span> Éditeur du site
              </h2>
              <p>
                Le site TerraGo (accessible à l&apos;adresse{' '}
                <a
                  href="https://www.terragoexperiences.fr"
                  className="font-medium underline decoration-1 underline-offset-2 transition-colors hover:opacity-80"
                  style={{ color: HOME_COLORS.orange }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.terragoexperiences.fr
                </a>
                ) est édité par la société TerraGo, Société par Actions Simplifiée (SAS) au capital
                de 8&nbsp;000 euros, dont le siège social est situé au 44 Avenue de Champ Fleuri,
                74000 Annecy, immatriculée au Registre du Commerce et des Sociétés d&apos;Annecy sous
                le numéro 105&nbsp;381&nbsp;743.
              </p>
              <p className="mt-3">
                Immatriculation au registre des opérateurs de voyages et de séjours (Atout France)
                sous le n°&nbsp;IM074260005.
              </p>
              <p className="mt-3">
                Garant financier : ARCUS Solution – Accelerant Insurance Europe SA, Place du Champ
                de Mars 5, 1050 Bruxelles, Belgique.
              </p>
            </section>

            <section>
              <h2
                className="mb-4 font-sans text-[18px] font-semibold leading-snug tracking-[-0.04em] sm:text-[20px]"
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                <span style={{ color: HOME_COLORS.orange }}>2.</span> Directeur de la publication
              </h2>
              <p>
                Le directeur de la publication est M. Jérôme Peyron, en sa qualité de représentant
                légal de TerraGo SAS.
              </p>
            </section>

            <section>
              <h2
                className="mb-4 font-sans text-[18px] font-semibold leading-snug tracking-[-0.04em] sm:text-[20px]"
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                <span style={{ color: HOME_COLORS.orange }}>3.</span> Hébergement
              </h2>
              <p>
                Ce site est hébergé par la société OVH SAS, dont le siège social est situé au 2 rue
                Kellermann, 59100 Roubaix, France.
              </p>
            </section>

            <section>
              <h2
                className="mb-4 font-sans text-[18px] font-semibold leading-snug tracking-[-0.04em] sm:text-[20px]"
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                <span style={{ color: HOME_COLORS.orange }}>4.</span> Accès au site
              </h2>
              <p>
                L&apos;accès au site TerraGo et son utilisation sont réservés à un usage
                strictement personnel. Vous vous engagez à ne pas utiliser ce site et les
                informations ou données qui y figurent à des fins commerciales, politiques,
                publicitaires, ou pour toute forme de sollicitation commerciale.
              </p>
            </section>

            <section>
              <h2
                className="mb-4 font-sans text-[18px] font-semibold leading-snug tracking-[-0.04em] sm:text-[20px]"
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                <span style={{ color: HOME_COLORS.orange }}>5.</span> Propriété intellectuelle
              </h2>
              <p>
                Ce site ainsi que l&apos;ensemble des éléments qui le composent (textes, images,
                vidéos, logos, marques, charte graphique, etc.) sont la propriété exclusive de
                TerraGo SAS ou de ses partenaires, et sont protégés par les législations françaises
                et internationales relatives à la propriété intellectuelle.
              </p>
              <p className="mt-3">
                Toute reproduction, représentation, modification, publication, adaptation de tout
                ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est
                interdite, sauf autorisation écrite préalable de TerraGo SAS. Toute exploitation
                non autorisée du site ou de l&apos;un des éléments qu&apos;il contient sera
                considérée comme constitutive d&apos;une contrefaçon et poursuivie conformément
                aux dispositions du Code de la propriété intellectuelle.
              </p>
            </section>

            <section>
              <h2
                className="mb-4 font-sans text-[18px] font-semibold leading-snug tracking-[-0.04em] sm:text-[20px]"
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                <span style={{ color: HOME_COLORS.orange }}>6.</span> Protection des données
                personnelles
              </h2>
              <p>
                Conformément à la loi n°78-17 du 6 janvier 1978 modifiée relative à
                l&apos;informatique, aux fichiers et aux libertés, ainsi qu&apos;au Règlement
                Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit
                d&apos;accès, de rectification, de suppression, de limitation et d&apos;opposition
                aux données personnelles vous concernant.
              </p>
              <p className="mt-3">
                Pour exercer ces droits, vous pouvez adresser votre demande par email à :{' '}
                <a
                  href="mailto:terragoexperiences@gmail.com"
                  className="font-medium underline decoration-1 underline-offset-2 transition-colors hover:opacity-80"
                  style={{ color: HOME_COLORS.orange }}
                >
                  terragoexperiences@gmail.com
                </a>
              </p>
            </section>

            <section>
              <h2
                className="mb-4 font-sans text-[18px] font-semibold leading-snug tracking-[-0.04em] sm:text-[20px]"
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                <span style={{ color: HOME_COLORS.orange }}>7.</span> Cookies
              </h2>
              <p>
                Le site est susceptible d&apos;utiliser des cookies afin d&apos;améliorer
                l&apos;expérience de navigation des utilisateurs. En poursuivant votre navigation
                sur ce site, vous acceptez l&apos;utilisation de cookies conformément à notre{' '}
                <Link
                  href="/confidentialite"
                  className="font-medium underline decoration-1 underline-offset-2 transition-colors hover:opacity-80"
                  style={{ color: HOME_COLORS.orange }}
                >
                  politique de confidentialité
                </Link>
                .
              </p>
            </section>

            <section>
              <h2
                className="mb-4 font-sans text-[18px] font-semibold leading-snug tracking-[-0.04em] sm:text-[20px]"
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                <span style={{ color: HOME_COLORS.orange }}>8.</span> Responsabilité
              </h2>
              <p>
                TerraGo SAS s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des
                informations diffusées sur ce site, dont elle se réserve le droit de corriger le
                contenu à tout moment sans préavis. Toutefois, TerraGo SAS ne peut garantir
                l&apos;exactitude, la précision ou l&apos;exhaustivité des informations mises à
                disposition sur ce site et décline toute responsabilité pour toute imprécision,
                inexactitude ou omission portant sur des informations disponibles sur le site.
              </p>
            </section>

            <section>
              <h2
                className="mb-4 font-sans text-[18px] font-semibold leading-snug tracking-[-0.04em] sm:text-[20px]"
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                <span style={{ color: HOME_COLORS.orange }}>9.</span> Droit applicable
              </h2>
              <p>
                Les présentes mentions légales sont soumises au droit français. En cas de litige, et
                à défaut de résolution amiable, les tribunaux français seront seuls compétents.
              </p>
            </section>

            <section>
              <h2
                className="mb-4 font-sans text-[18px] font-semibold leading-snug tracking-[-0.04em] sm:text-[20px]"
                style={{ color: HOME_COLORS.primary, fontFamily: "'Poppins', sans-serif" }}
              >
                <span style={{ color: HOME_COLORS.orange }}>10.</span> Contact
              </h2>
              <p>Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter :</p>
              <p className="mt-3">
                Email :{' '}
                <a
                  href="mailto:terragoexperiences@gmail.com"
                  className="font-medium underline decoration-1 underline-offset-2 transition-colors hover:opacity-80"
                  style={{ color: HOME_COLORS.orange }}
                >
                  terragoexperiences@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;
