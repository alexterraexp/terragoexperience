import { useState, useRef, useEffect } from "react";
import type { ReactNode, Key } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SEMINAIRES = [
  {
    id: "vins", label: "Vins",
    producteur: "Domaine Jean-François Bardin",
    region: "Cognac, Charente",
    couleur: "#5a7a2e", couleurLight: "#eef4e6",
    bestseller: true,
    image: "https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/cognacjf/vigneron.png",
    formats: {
      "1jour": {
        titre: "Immersion Vigne & Terroir",
        sous_titre: "De la taille à la dégustation",
        participants: "8 – 20 pers.", duree: "9h → 18h",
        prix: "À partir de 120€/pers.",
        inclus: ["Repas du midi", "Dégustation guidée", "Panier terroir"],
        programme: [
          { heure: "9h00",  action: "Accueil & café du producteur" },
          { heure: "10h00", action: "Atelier taille de vigne & parcours sensoriel" },
          { heure: "12h30", action: "Déjeuner vigneron au cœur du domaine" },
          { heure: "14h30", action: "Chai & vinification : les secrets de la cave" },
          { heure: "16h30", action: "Dégustation commentée & accord mets-vins" },
        ],
      },
      "2jours": {
        titre: "Vendanges & Nuit en Domaine",
        sous_titre: "Deux jours au rythme de la vigne",
        participants: "8 – 16 pers.", duree: "2 jours / 1 nuit",
        prix: "À partir de 280€/pers.",
        inclus: ["Hébergement 1 nuit", "3 repas", "Vendanges", "Coffret vins"],
        programme: [
          { heure: "J1 – 9h",  action: "Arrivée & tour des parcelles avec le vigneron" },
          { heure: "J1 – 11h", action: "Vendanges manuelles ou taille selon saison" },
          { heure: "J1 – 19h", action: "Dîner vigneron & dégustation verticale" },
          { heure: "J2 – 9h",  action: "Atelier vinification & mise en bouteille" },
          { heure: "J2 – 15h", action: "Accord mets-vins & départ avec sa caisse" },
        ],
      },
      "mesure": {
        titre: "Expérience Signature Vins",
        sous_titre: "Un programme construit autour de votre équipe",
        participants: "De 5 à 120 pers.", duree: "Sur devis",
        prix: "Devis personnalisé",
        inclus: ["Programme sur mesure", "Logistique complète", "Flexibilité totale"],
        programme: [
          { heure: "Étape 1", action: "Brief & cadrage de vos objectifs" },
          { heure: "Étape 2", action: "Sélection du domaine partenaire" },
          { heure: "Étape 3", action: "Conception du programme" },
          { heure: "Étape 4", action: "Coordination logistique" },
          { heure: "Étape 5", action: "Animation & suivi le jour J" },
        ],
      },
    },
  },
  {
    id: "huitres", label: "Huîtres",
    producteur: "Maison Guérin",
    region: "Bassin d'Arcachon",
    couleur: "#1a5276", couleurLight: "#eaf4fb",
    bestseller: false,
    image: "https://images.unsplash.com/photo-1606731219412-3b1f79c78e38?w=900&auto=format&fit=crop",
    formats: {
      "1jour": {
        titre: "Matin en Mer & Dégustation",
        sous_titre: "Ostréiculture & table du pêcheur",
        participants: "6 – 16 pers.", duree: "8h → 15h",
        prix: "À partir de 110€/pers.",
        inclus: ["Sortie en bateau", "Dégustation à bord", "Repas iodé"],
        programme: [
          { heure: "8h00",  action: "Départ en barque avec l'ostréiculteur" },
          { heure: "9h30",  action: "Récolte & tri des huîtres dans les parcs" },
          { heure: "11h00", action: "Dégustation en mer, pieds dans l'eau" },
          { heure: "12h30", action: "Déjeuner plateau de fruits de mer" },
        ],
      },
      "2jours": {
        titre: "Immersion Ostréicole",
        sous_titre: "Du parc à l'assiette, tout comprendre",
        participants: "6 – 12 pers.", duree: "2 jours / 1 nuit",
        prix: "À partir de 320€/pers.",
        inclus: ["Hébergement cabane", "3 repas iodés", "Sortie bateau", "Atelier écaillage"],
        programme: [
          { heure: "J1 – 8h",  action: "Sortie en mer & récolte dans les parcs" },
          { heure: "J1 – 12h", action: "Déjeuner à la cabane ostréicole" },
          { heure: "J1 – 15h", action: "Atelier affinage & calibrage des huîtres" },
          { heure: "J2 – 9h",  action: "Atelier écaillage & accord vins & huîtres" },
          { heure: "J2 – 12h", action: "Dernier repas iodé & départ" },
        ],
      },
      "mesure": {
        titre: "Expérience Signature Huîtres",
        sous_titre: "Un programme taillé pour votre groupe",
        participants: "De 5 à 80 pers.", duree: "Sur devis",
        prix: "Devis personnalisé",
        inclus: ["Programme sur mesure", "Logistique complète", "Flexibilité totale"],
        programme: [
          { heure: "Étape 1", action: "Brief & cadrage de vos objectifs" },
          { heure: "Étape 2", action: "Sélection du producteur partenaire" },
          { heure: "Étape 3", action: "Conception du programme" },
          { heure: "Étape 4", action: "Coordination logistique" },
          { heure: "Étape 5", action: "Animation & suivi le jour J" },
        ],
      },
    },
  },
  {
    id: "truffes", label: "Truffes",
    producteur: "Domaine Laborie",
    region: "Périgord Noir, Dordogne",
    couleur: "#3d1f0a", couleurLight: "#f5ede6",
    bestseller: true,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop",
    formats: {
      "1jour": {
        titre: "Cavage & Table Noire",
        sous_titre: "À la recherche du diamant noir",
        participants: "6 – 14 pers.", duree: "9h → 17h",
        prix: "À partir de 185€/pers.",
        inclus: ["Cavage avec chien", "Repas truffé", "Coffret découverte"],
        programme: [
          { heure: "9h00",  action: "Accueil & introduction à la trufficulture" },
          { heure: "10h00", action: "Cavage en forêt avec le chien truffier" },
          { heure: "12h30", action: "Déjeuner gastronomique autour de la truffe" },
          { heure: "15h00", action: "Atelier cuisine : cuisiner la truffe" },
          { heure: "16h30", action: "Marché aux truffes & repartir avec sa récolte" },
        ],
      },
      "2jours": {
        titre: "Immersion Truffe & Terroir",
        sous_titre: "Deux jours dans le Périgord profond",
        participants: "6 – 12 pers.", duree: "2 jours / 1 nuit",
        prix: "À partir de 380€/pers.",
        inclus: ["Hébergement 1 nuit", "Cavage", "Dîner truffé", "Coffret truffes"],
        programme: [
          { heure: "J1 – 9h",  action: "Arrivée & introduction à la trufficulture" },
          { heure: "J1 – 11h", action: "Cavage en forêt avec le chien truffier" },
          { heure: "J1 – 19h", action: "Dîner gastronomique autour de la truffe" },
          { heure: "J2 – 9h",  action: "Atelier cuisine : intégrer la truffe" },
          { heure: "J2 – 12h", action: "Déjeuner & marché aux truffes local" },
        ],
      },
      "mesure": {
        titre: "Expérience Signature Truffes",
        sous_titre: "Un séminaire d'exception autour du diamant noir",
        participants: "De 5 à 60 pers.", duree: "Sur devis",
        prix: "Devis personnalisé",
        inclus: ["Programme sur mesure", "Chef à disposition", "Flexibilité totale"],
        programme: [
          { heure: "Étape 1", action: "Brief & cadrage de vos objectifs" },
          { heure: "Étape 2", action: "Sélection du domaine partenaire" },
          { heure: "Étape 3", action: "Conception du programme" },
          { heure: "Étape 4", action: "Coordination logistique" },
          { heure: "Étape 5", action: "Animation & suivi le jour J" },
        ],
      },
    },
  },
  {
    id: "fromage", label: "Fromage",
    producteur: "Ferme des Alpages — Famille Morin",
    region: "Haute-Savoie",
    couleur: "#7d6008", couleurLight: "#fef9e7",
    bestseller: false,
    image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=900&auto=format&fit=crop",
    formats: {
      "1jour": {
        titre: "L'Art du Fromager",
        sous_titre: "Du lait à l'affinage, tout faire soi-même",
        participants: "8 – 18 pers.", duree: "9h → 17h",
        prix: "À partir de 115€/pers.",
        inclus: ["Traite manuelle", "Atelier fabrication", "Plateau fromages"],
        programme: [
          { heure: "9h00",  action: "Traite des vaches & découverte de la fromagerie" },
          { heure: "11h00", action: "Atelier : fabriquer son propre fromage" },
          { heure: "13h00", action: "Déjeuner à la ferme avec raclette maison" },
          { heure: "15h00", action: "Visite de la cave d'affinage" },
          { heure: "16h30", action: "Dégustation commentée & emporter son fromage" },
        ],
      },
      "2jours": {
        titre: "Alpages & Fromages d'Exception",
        sous_titre: "Monter en alpage, fabriquer, affiner",
        participants: "6 – 14 pers.", duree: "2 jours / 1 nuit",
        prix: "À partir de 310€/pers.",
        inclus: ["Nuit en chalet d'alpage", "3 repas savoyards", "Fabrication & affinage"],
        programme: [
          { heure: "J1 – 9h",  action: "Montée en alpage avec le fromager" },
          { heure: "J1 – 11h", action: "Traite & fabrication du fromage d'alpage" },
          { heure: "J1 – 19h", action: "Dîner savoyard au chalet" },
          { heure: "J2 – 9h",  action: "Visite de la cave & art de l'affinage" },
          { heure: "J2 – 14h", action: "Dégustation finale & repartir avec ses fromages" },
        ],
      },
      "mesure": {
        titre: "Expérience Signature Fromage",
        sous_titre: "Un programme fromager sur mesure",
        participants: "De 5 à 100 pers.", duree: "Sur devis",
        prix: "Devis personnalisé",
        inclus: ["Programme sur mesure", "Logistique complète", "Flexibilité totale"],
        programme: [
          { heure: "Étape 1", action: "Brief & cadrage de vos objectifs" },
          { heure: "Étape 2", action: "Sélection du producteur partenaire" },
          { heure: "Étape 3", action: "Conception du programme" },
          { heure: "Étape 4", action: "Coordination logistique" },
          { heure: "Étape 5", action: "Animation & suivi le jour J" },
        ],
      },
    },
  },
  {
    id: "lavande", label: "Lavande",
    producteur: "Distillerie Aurore",
    region: "Plateau de Sault, Vaucluse",
    couleur: "#6c3483", couleurLight: "#f5eef8",
    bestseller: false,
    image: "https://images.unsplash.com/photo-1468581264429-2548ef9eb732?w=900&auto=format&fit=crop",
    formats: {
      "1jour": {
        titre: "Bleu Lavande & Distillation",
        sous_titre: "Cueillette & secrets de la distillerie",
        participants: "8 – 20 pers.", duree: "9h → 17h30",
        prix: "À partir de 98€/pers.",
        inclus: ["Cueillette en champ", "Atelier distillation", "Kit huiles essentielles"],
        programme: [
          { heure: "9h00",  action: "Accueil & visite des champs en fleur" },
          { heure: "10h30", action: "Cueillette collective de lavande" },
          { heure: "12h30", action: "Pique-nique provençal au milieu des rangs" },
          { heure: "14h00", action: "Atelier distillation & extraction d'huile essentielle" },
          { heure: "16h30", action: "Fabrication d'un parfum personnalisé à emporter" },
        ],
      },
      "2jours": {
        titre: "Provence & Lavande en Immersion",
        sous_titre: "Deux jours dans les champs de Sault",
        participants: "8 – 16 pers.", duree: "2 jours / 1 nuit",
        prix: "À partir de 245€/pers.",
        inclus: ["Hébergement mas provençal", "3 repas", "2 ateliers", "Coffret arômes"],
        programme: [
          { heure: "J1 – 9h",  action: "Arrivée & tour des champs de lavande" },
          { heure: "J1 – 11h", action: "Cueillette & première distillation" },
          { heure: "J1 – 19h", action: "Dîner provençal sous les étoiles" },
          { heure: "J2 – 9h",  action: "Atelier parfumerie & création de son eau de lavande" },
          { heure: "J2 – 15h", action: "Visite du marché & repartir avec son coffret" },
        ],
      },
      "mesure": {
        titre: "Expérience Signature Lavande",
        sous_titre: "La Provence comme terrain de cohésion",
        participants: "De 5 à 120 pers.", duree: "Sur devis",
        prix: "Devis personnalisé",
        inclus: ["Programme sur mesure", "Logistique complète", "Flexibilité totale"],
        programme: [
          { heure: "Étape 1", action: "Brief & cadrage de vos objectifs" },
          { heure: "Étape 2", action: "Sélection du producteur partenaire" },
          { heure: "Étape 3", action: "Conception du programme" },
          { heure: "Étape 4", action: "Coordination logistique" },
          { heure: "Étape 5", action: "Animation & suivi le jour J" },
        ],
      },
    },
  },
  {
    id: "olives", label: "Olives",
    producteur: "Mas Saint-Antoine",
    region: "Les Baux-de-Provence",
    couleur: "#4a5e0a", couleurLight: "#f2f5e2",
    bestseller: false,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=900&auto=format&fit=crop",
    formats: {
      "1jour": {
        titre: "Récolte & Moulin à Huile",
        sous_titre: "De l'olivier à la bouteille",
        participants: "8 – 22 pers.", duree: "9h → 17h",
        prix: "À partir de 105€/pers.",
        inclus: ["Cueillette à la main", "Visite du moulin", "Bouteille d'huile offerte"],
        programme: [
          { heure: "9h00",  action: "Accueil sous les oliviers & histoire du domaine" },
          { heure: "10h00", action: "Cueillette des olives à la main" },
          { heure: "12h00", action: "Déjeuner provençal à l'ombre des arbres" },
          { heure: "14h30", action: "Visite du moulin & pressage en direct" },
          { heure: "16h30", action: "Dégustation d'huiles & repartir avec sa bouteille" },
        ],
      },
      "2jours": {
        titre: "Olive & Table Provençale",
        sous_titre: "Deux jours dans un mas des Baux",
        participants: "8 – 16 pers.", duree: "2 jours / 1 nuit",
        prix: "À partir de 265€/pers.",
        inclus: ["Nuit au mas", "3 repas", "Pressage", "Coffret huiles"],
        programme: [
          { heure: "J1 – 9h",  action: "Arrivée & tour des oliveraies centenaires" },
          { heure: "J1 – 11h", action: "Cueillette & tri des olives" },
          { heure: "J1 – 19h", action: "Dîner méditerranéen au mas" },
          { heure: "J2 – 9h",  action: "Pressage & filtration au moulin" },
          { heure: "J2 – 14h", action: "Atelier cuisine à l'huile d'olive & départ" },
        ],
      },
      "mesure": {
        titre: "Expérience Signature Olives",
        sous_titre: "Les Baux comme cadre de votre événement",
        participants: "De 5 à 150 pers.", duree: "Sur devis",
        prix: "Devis personnalisé",
        inclus: ["Programme sur mesure", "Logistique complète", "Flexibilité totale"],
        programme: [
          { heure: "Étape 1", action: "Brief & cadrage de vos objectifs" },
          { heure: "Étape 2", action: "Sélection du producteur partenaire" },
          { heure: "Étape 3", action: "Conception du programme" },
          { heure: "Étape 4", action: "Coordination logistique" },
          { heure: "Étape 5", action: "Animation & suivi le jour J" },
        ],
      },
    },
  },
  {
    id: "spiritueux", label: "Spiritueux",
    producteur: "Distillerie du Vieux Moulin",
    region: "Armagnac, Gers",
    couleur: "#784212", couleurLight: "#fdf2e9",
    bestseller: true,
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=900&auto=format&fit=crop",
    formats: {
      "1jour": {
        titre: "L'Alambic en une Journée",
        sous_titre: "Distillation & dégustation commentée",
        participants: "8 – 18 pers.", duree: "10h → 18h",
        prix: "À partir de 145€/pers.",
        inclus: ["Visite distillerie", "Dégustation guidée", "Miniature offerte"],
        programme: [
          { heure: "10h00", action: "Visite de la distillerie & fonctionnement de l'alambic" },
          { heure: "12h30", action: "Déjeuner gascon avec le maître de chai" },
          { heure: "14h30", action: "Dégustation verticale des millésimes" },
          { heure: "16h30", action: "Atelier assemblage express & repartir avec sa sélection" },
        ],
      },
      "2jours": {
        titre: "L'Alambic & l'Assemblage",
        sous_titre: "Au cœur d'une distillerie artisanale",
        participants: "8 – 16 pers.", duree: "2 jours / 1 nuit",
        prix: "À partir de 310€/pers.",
        inclus: ["Hébergement 1 nuit", "3 repas", "Atelier assemblage", "Bouteille personnalisée"],
        programme: [
          { heure: "J1 – 10h", action: "Visite de la distillerie & fonctionnement de l'alambic" },
          { heure: "J1 – 14h", action: "Dégustation verticale : évolution des millésimes" },
          { heure: "J1 – 19h", action: "Dîner gascon avec accords spiritueux" },
          { heure: "J2 – 9h",  action: "Atelier assemblage : créer sa propre cuvée" },
          { heure: "J2 – 12h", action: "Étiquetage & mise en bouteille de sa création" },
        ],
      },
      "mesure": {
        titre: "Expérience Signature Spiritueux",
        sous_titre: "Un programme premium autour de la distillation",
        participants: "De 5 à 80 pers.", duree: "Sur devis",
        prix: "Devis personnalisé",
        inclus: ["Programme sur mesure", "Maître de chai dédié", "Flexibilité totale"],
        programme: [
          { heure: "Étape 1", action: "Brief & cadrage de vos objectifs" },
          { heure: "Étape 2", action: "Sélection de la distillerie partenaire" },
          { heure: "Étape 3", action: "Conception du programme" },
          { heure: "Étape 4", action: "Coordination logistique" },
          { heure: "Étape 5", action: "Animation & suivi le jour J" },
        ],
      },
    },
  },
  {
    id: "noix", label: "Noix",
    producteur: "Verger Delmas",
    region: "Grenoble, Isère",
    couleur: "#5d4037", couleurLight: "#efebe9",
    bestseller: false,
    image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=900&auto=format&fit=crop",
    formats: {
      "1jour": {
        titre: "La Noix sous Toutes ses Formes",
        sous_titre: "Récolte, pressage & gastronomie",
        participants: "10 – 24 pers.", duree: "9h → 17h",
        prix: "À partir de 88€/pers.",
        inclus: ["Récolte en verger", "Pressage d'huile", "Déjeuner & dégustation"],
        programme: [
          { heure: "9h00",  action: "Accueil & histoire de la noix de Grenoble" },
          { heure: "10h00", action: "Récolte en verger & tri des noix" },
          { heure: "12h00", action: "Déjeuner autour des produits du verger" },
          { heure: "14h00", action: "Atelier pressage d'huile de noix artisanale" },
          { heure: "16h00", action: "Dégustation & confection de cadeaux gourmands" },
        ],
      },
      "2jours": {
        titre: "Verger & Table en Isère",
        sous_titre: "Deux jours au pied des Alpes",
        participants: "8 – 18 pers.", duree: "2 jours / 1 nuit",
        prix: "À partir de 220€/pers.",
        inclus: ["Hébergement gîte", "3 repas", "Pressage", "Coffret noix"],
        programme: [
          { heure: "J1 – 9h",  action: "Arrivée & visite des vergers centenaires" },
          { heure: "J1 – 11h", action: "Récolte & première transformation" },
          { heure: "J1 – 19h", action: "Dîner autour des produits du verger" },
          { heure: "J2 – 9h",  action: "Atelier pressage & confiserie de noix" },
          { heure: "J2 – 14h", action: "Dégustation finale & repartir avec son coffret" },
        ],
      },
      "mesure": {
        titre: "Expérience Signature Noix",
        sous_titre: "L'Isère comme décor de votre séminaire",
        participants: "De 5 à 100 pers.", duree: "Sur devis",
        prix: "Devis personnalisé",
        inclus: ["Programme sur mesure", "Logistique complète", "Flexibilité totale"],
        programme: [
          { heure: "Étape 1", action: "Brief & cadrage de vos objectifs" },
          { heure: "Étape 2", action: "Sélection du producteur partenaire" },
          { heure: "Étape 3", action: "Conception du programme" },
          { heure: "Étape 4", action: "Coordination logistique" },
          { heure: "Étape 5", action: "Animation & suivi le jour J" },
        ],
      },
    },
  },
  {
    id: "agrumes", label: "Agrumes",
    producteur: "Domaine des Quatre Saisons",
    region: "Menton, Alpes-Maritimes",
    couleur: "#c0620a", couleurLight: "#fff4e6",
    bestseller: false,
    image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=900&auto=format&fit=crop",
    formats: {
      "1jour": {
        titre: "Cueillette & Zesterie",
        sous_titre: "Du citronnier à la confiture artisanale",
        participants: "8 – 18 pers.", duree: "9h → 17h",
        prix: "À partir de 95€/pers.",
        inclus: ["Cueillette guidée", "Atelier confiture & zestes", "Panier agrumes"],
        programme: [
          { heure: "9h00",  action: "Accueil sous les agrumiers & histoire du domaine" },
          { heure: "10h00", action: "Cueillette de citrons, oranges & kumquats" },
          { heure: "12h00", action: "Déjeuner méditerranéen avec produits du domaine" },
          { heure: "14h00", action: "Atelier confiture, limoncello & zestes confits" },
          { heure: "16h30", action: "Dégustation & repartir avec son panier" },
        ],
      },
      "2jours": {
        titre: "Riviera & Agrumes en Immersion",
        sous_titre: "Deux jours entre mer et agrumiers",
        participants: "6 – 14 pers.", duree: "2 jours / 1 nuit",
        prix: "À partir de 255€/pers.",
        inclus: ["Hébergement bastide", "3 repas", "2 ateliers", "Coffret agrumes"],
        programme: [
          { heure: "J1 – 9h",  action: "Arrivée & visite des vergers en terrasses" },
          { heure: "J1 – 11h", action: "Cueillette & atelier limoncello artisanal" },
          { heure: "J1 – 19h", action: "Dîner méditerranéen aux agrumes" },
          { heure: "J2 – 9h",  action: "Atelier confiture, zestes & pâtes de fruits" },
          { heure: "J2 – 15h", action: "Marché de Menton & départ avec son coffret" },
        ],
      },
      "mesure": {
        titre: "Expérience Signature Agrumes",
        sous_titre: "La Côte d'Azur comme décor de votre séminaire",
        participants: "De 5 à 100 pers.", duree: "Sur devis",
        prix: "Devis personnalisé",
        inclus: ["Programme sur mesure", "Logistique complète", "Flexibilité totale"],
        programme: [
          { heure: "Étape 1", action: "Brief & cadrage de vos objectifs" },
          { heure: "Étape 2", action: "Sélection du producteur partenaire" },
          { heure: "Étape 3", action: "Conception du programme" },
          { heure: "Étape 4", action: "Coordination logistique" },
          { heure: "Étape 5", action: "Animation & suivi le jour J" },
        ],
      },
    },
  },
  {
    id: "piments", label: "Piments",
    producteur: "Ferme Ibarron",
    region: "Espelette, Pays Basque",
    couleur: "#b91c1c", couleurLight: "#fef2f2",
    bestseller: false,
    image: "https://images.unsplash.com/photo-1526346698789-22fd84314424?w=900&auto=format&fit=crop",
    formats: {
      "1jour": {
        titre: "Rouge Espelette",
        sous_titre: "Cueillette, séchage & gastronomie basque",
        participants: "8 – 20 pers.", duree: "9h → 17h",
        prix: "À partir de 105€/pers.",
        inclus: ["Cueillette en champ", "Atelier séchage & poudre", "Coffret piments"],
        programme: [
          { heure: "9h00",  action: "Accueil au domaine & histoire du piment d'Espelette" },
          { heure: "10h00", action: "Cueillette des piments dans les champs" },
          { heure: "12h00", action: "Déjeuner basque traditionnel" },
          { heure: "14h00", action: "Atelier séchage, broyage & fabrication de poudre AOP" },
          { heure: "16h00", action: "Dégustation & accords avec charcuteries basques" },
        ],
      },
      "2jours": {
        titre: "Immersion Basque & Piment",
        sous_titre: "Deux jours au cœur du Pays Basque",
        participants: "6 – 16 pers.", duree: "2 jours / 1 nuit",
        prix: "À partir de 275€/pers.",
        inclus: ["Hébergement ferme basque", "3 repas", "Atelier poudre AOP", "Coffret épices"],
        programme: [
          { heure: "J1 – 9h",  action: "Arrivée & visite des champs de piments rouges" },
          { heure: "J1 – 11h", action: "Cueillette & enfilage en guirlandes" },
          { heure: "J1 – 19h", action: "Dîner basque avec accords piment" },
          { heure: "J2 – 9h",  action: "Atelier fabrication de poudre & condiments" },
          { heure: "J2 – 14h", action: "Marché d'Espelette & repartir avec son coffret" },
        ],
      },
      "mesure": {
        titre: "Expérience Signature Piments",
        sous_titre: "Le Pays Basque comme terrain de cohésion",
        participants: "De 5 à 120 pers.", duree: "Sur devis",
        prix: "Devis personnalisé",
        inclus: ["Programme sur mesure", "Logistique complète", "Flexibilité totale"],
        programme: [
          { heure: "Étape 1", action: "Brief & cadrage de vos objectifs" },
          { heure: "Étape 2", action: "Sélection du producteur partenaire" },
          { heure: "Étape 3", action: "Conception du programme" },
          { heure: "Étape 4", action: "Coordination logistique" },
          { heure: "Étape 5", action: "Animation & suivi le jour J" },
        ],
      },
    },
  },
];

const PRODUITS = [
  { id: "all",        label: "Tous" },
  { id: "olives",     label: "Olives" },
  { id: "spiritueux", label: "Spiritueux" },
  { id: "noix",       label: "Noix" },
  { id: "lavande",    label: "Lavande" },
  { id: "agrumes",    label: "Agrumes" },
  { id: "piments",    label: "Piments" },
  { id: "huitres",    label: "Huîtres",  comingSoon: true },
  { id: "fromage",    label: "Fromage",  comingSoon: true },
  { id: "elevage",    label: "Élevage",  comingSoon: true },
];

const FORMATS = [
  { id: "1jour",  label: "1 journée" },
  { id: "2jours", label: "2 jours" },
  { id: "mesure", label: "Sur mesure" },
];

const MONTHS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const PARTICIPANTS_OPTIONS = ["Moins de 10","10 – 20","20 – 40","40 – 80","80 – 150","150+"];
const REGIONS = [
  { name: "Nouvelle-Aquitaine",         icon: "⛵" },
  { name: "Auvergne-Rhône-Alpes",       icon: "🏔" },
  { name: "Provence-Alpes-Côte d'Azur", icon: "☀️" },
];
const STEPS = [{ label: "Coordonnées" }, { label: "Destination" }, { label: "Logistique" }];

type ModalTagBtnProps = {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  small?: boolean;
  key?: Key;
};

type ModalModeBtnProps = {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
};

type ModalFieldGroupProps = {
  label: string;
  required?: boolean;
  children: ReactNode;
};

type ModalToggleCardProps = {
  icon: ReactNode;
  label: string;
  active: boolean;
  onToggle: () => void;
  children?: ReactNode;
};

// ─── Sous-composants page ──────────────────────────────────────────────────────

function ProgrammeAccordion({ programme, couleur, triggerKey }) {
  const [expanded, setExpanded] = useState(false);
  const prev = useRef(null);
  if (prev.current !== triggerKey) { prev.current = triggerKey; if (expanded) setExpanded(false); }
  return (
    <div style={{ borderTop: "1px solid #f0ebe4", paddingTop: 14 }}>
      <button onClick={() => setExpanded(v => !v)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: expanded ? 14 : 0 }}>
        <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1e291a" }}>Programme</span>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: "50%", background: "#f0ede8", transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.35s ease", flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 5L7 9.5L11.5 5" stroke="#b0a89e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </button>
      <div style={{ maxHeight: expanded ? "500px" : "0", overflow: "hidden", transition: "max-height 0.45s ease" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: 4 }}>
          {programme.map((p, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ color: couleur, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", flexShrink: 0, width: 58, paddingTop: 2 }}>{p.heure}</span>
              <span style={{ color: "#4b5563", fontSize: 13, lineHeight: 1.55 }}>{p.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FooterCta({ prix, couleur, isMesure, onOpenModal }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f0ebe4", paddingTop: 14, marginTop: 14 }}>
      <div>
        <div style={{ fontSize: 10, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Tarif indicatif</div>
        <div style={{ fontSize: 15, fontWeight: 800, color: "#1e291a" }}>{prix}</div>
      </div>
      <button onClick={onOpenModal} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ background: hov ? couleur : "#1e291a", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", padding: "9px 16px", borderRadius: 12, border: "none", textTransform: "uppercase", cursor: "pointer", transition: "background 0.25s ease", whiteSpace: "nowrap", fontFamily: "inherit" }}>
        {isMesure ? "Demander un devis →" : "Nous contacter →"}
      </button>
    </div>
  );
}

// ─── Sous-composants modale ────────────────────────────────────────────────────

function ModalTagBtn({ active, onClick, children, small }: ModalTagBtnProps) {
  return (
    <button onClick={onClick} style={{ padding: small ? "5px 12px" : "7px 14px", borderRadius: 10, border: `1.5px solid ${active ? "#1e291a" : "rgba(10,44,52,0.1)"}`, background: active ? "#1e291a" : "#faf8f5", color: active ? "#fff" : "#6b7280", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit", boxShadow: active ? "0 2px 10px rgba(30,41,26,0.15)" : "none", transition: "all 0.15s ease" }}>
      {active && <span style={{ marginRight: 5, fontSize: 8 }}>✓</span>}{children}
    </button>
  );
}

function ModalModeBtn({ active, onClick, children }: ModalModeBtnProps) {
  return (
    <button onClick={onClick} style={{ padding: "7px 16px", borderRadius: 10, border: `1.5px solid ${active ? "#f78d00" : "rgba(10,44,52,0.1)"}`, background: active ? "#f78d00" : "#faf8f5", color: active ? "#fff" : "#9ca3af", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s ease" }}>
      {children}
    </button>
  );
}

function ModalFieldGroup({ label, required, children }: ModalFieldGroupProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <label style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#b0a89e", display: "block", marginBottom: 8 }}>
        {label}{required && <span style={{ color: "#f78d00", marginLeft: 4 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function ModalToggleCard({ icon, label, active, onToggle, children }: ModalToggleCardProps) {
  return (
    <div style={{ padding: "18px 18px 16px", borderRadius: 16, border: `2px solid ${active ? "#1e291a" : "rgba(10,44,52,0.08)"}`, background: active ? "rgba(30,41,26,0.03)" : "#faf8f5", transition: "all 0.2s ease" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>{icon}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#1e291a", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</span>
        </div>
        <label style={{ position: "relative", display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
          <input type="checkbox" checked={active} onChange={onToggle} style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
          <div style={{ width: 44, height: 24, background: active ? "#1e291a" : "#e5e0d8", borderRadius: 12, position: "relative", transition: "background 0.2s ease" }}>
            <div style={{ position: "absolute", top: 4, left: active ? 24 : 4, width: 16, height: 16, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.15)", transition: "left 0.2s ease" }} />
          </div>
        </label>
      </div>
      {children}
    </div>
  );
}

// ─── Modale séminaire ──────────────────────────────────────────────────────────

function SeminaireModal({ isOpen, onClose }) {
  const [step, setStep]           = useState(1);
  const [closing, setClosing]     = useState(false);
  const [transitioning, setTrans] = useState(false);
  const [submitting, setSubmit]   = useState(false);
  const [success, setSuccess]     = useState(false);
  const [error, setError]         = useState("");
  const [form, setForm]           = useState({ prenom: "", nom: "", email: "", entreprise: "", participants: "", message: "" });
  const [regions, setRegions]     = useState([]);
  const [autreRegion, setAutre]   = useState("");
  const [ville, setVille]         = useState("");
  const [accTypes, setAccTypes]   = useState([]);
  const [transport, setTransport] = useState("");
  const [months, setMonths]       = useState([]);
  const [periodMode, setPeriod]   = useState("months");
  const [startDate, setStart]     = useState("");
  const [endDate, setEnd]         = useState("");
  const [hebergement, setHeberg]  = useState(false);
  const [withTransport, setWithT] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: "smooth" }); }, [step]);
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, []);
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false); setStep(1); setSuccess(false); setError("");
      setForm({ prenom: "", nom: "", email: "", entreprise: "", participants: "", message: "" });
      setRegions([]); setAccTypes([]); setTransport(""); setMonths([]);
      setHeberg(false); setWithT(false); setAutre(""); setVille("");
      onClose();
    }, 280);
  };

  const toggle = (list, setList, item) => setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);

  const goNext = () => {
    setError("");
    if (step === 1) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
      const periodOk = periodMode === "months" ? months.length > 0 : !!startDate && !!endDate;
      if (!form.prenom || !form.nom || !form.email || !emailOk || !form.entreprise || !form.participants || !periodOk) {
        setError("Certains champs obligatoires sont manquants ou invalides.");
        return;
      }
    }
    setTrans(true);
    setTimeout(() => { setStep(s => Math.min(s + 1, 3)); setTrans(false); }, 180);
  };

  const goPrev = () => { setTrans(true); setTimeout(() => { setStep(s => Math.max(s - 1, 1)); setTrans(false); }, 180); };

  const handleSubmit = async () => {
    setSubmit(true);
    try {
      const res = await fetch("https://formsubmit.co/ajax/alexso.terrago@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: `${form.prenom} ${form.nom}`, email: form.email, subject: `Nouvelle demande de séminaire - ${form.entreprise}`, message: `Prénom: ${form.prenom} | Nom: ${form.nom}\nEmail: ${form.email} | Entreprise: ${form.entreprise}\nParticipants: ${form.participants}\nPériode: ${periodMode === "dates" ? `${startDate} → ${endDate}` : months.join(", ")}\nRégions: ${regions.join(", ")} ${autreRegion} ${ville}\nHébergement: ${hebergement ? accTypes.join(", ") : "Non"}\nTransport: ${withTransport ? transport : "Non"}\nMessage: ${form.message}`, _captcha: false }),
      });
      if (res.ok) { setSuccess(true); setTimeout(handleClose, 2200); }
      else throw new Error();
    } catch { alert("Erreur lors de l'envoi. Veuillez réessayer."); }
    finally { setSubmit(false); }
  };

  if (!isOpen) return null;

  const inputStyle = { width: "100%", background: "#faf8f5", border: "1px solid rgba(10,44,52,0.08)", borderRadius: 12, padding: "11px 15px", fontFamily: "inherit", fontSize: 13, color: "#1e291a", outline: "none", transition: "all 0.18s ease", boxSizing: "border-box" };

  return (
    <>
      {/* Backdrop */}
      <div onClick={handleClose} style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(10,20,10,0.72)", backdropFilter: "blur(6px)", opacity: closing ? 0 : 1, transition: "opacity 0.28s ease" }} />

      {/* Panel */}
      <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, pointerEvents: "none" }}>
        <div onClick={e => e.stopPropagation()} style={{ pointerEvents: "auto", width: "100%", maxWidth: 720, maxHeight: "92vh", background: "#fff", borderRadius: 24, display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(10,44,52,0.06)", animation: `${closing ? "modalOut" : "modalIn"} 0.32s cubic-bezier(0.22,1,0.36,1) both`, fontFamily: "'Poppins', sans-serif", position: "relative" }}>

          {/* Header dark */}
          <div style={{ padding: "22px 28px 20px", background: "#1e291a", position: "relative", overflow: "hidden", flexShrink: 0 }}>
            <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(circle at 1px 1px,white 1px,transparent 0)", backgroundSize: "20px 20px", pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: -40, top: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(247,141,0,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
              <div>
                <span style={{ display: "inline-block", padding: "3px 12px", background: "#f78d00", color: "#fff", fontWeight: 700, fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", borderRadius: 30, marginBottom: 10 }}>Votre projet</span>
                <h2 style={{ margin: 0, display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0 8px", lineHeight: 1 }}>
                  <span style={{ fontWeight: 700, fontSize: 17, color: "rgba(255,255,255,0.65)" }}>Votre projet de</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontWeight: 700, fontSize: 28, color: "#fff" }}>séminaire.</span>
                </h2>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, margin: "6px 0 0", letterSpacing: "0.04em" }}>Parlons d'immersion et de sens.</p>
              </div>
              <button onClick={handleClose} style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", color: "#fff", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s ease", fontFamily: "inherit" }}>×</button>
            </div>
            {/* Steps */}
            <div style={{ position: "relative", marginTop: 20, display: "flex", gap: 8 }}>
              {STEPS.map((st, i) => {
                const idx = i + 1; const done = step > idx; const active = step === idx;
                return (
                  <div key={st.label} style={{ flex: 1 }}>
                    <div style={{ height: 3, borderRadius: 2, background: (done || active) ? "#f78d00" : "rgba(255,255,255,0.15)", transition: "background 0.4s ease", marginBottom: 6 }} />
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: active ? "#f78d00" : done ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.25)", transition: "color 0.3s ease" }}>{idx}. {st.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: "rgba(247,141,0,0.08)", borderBottom: "1px solid rgba(247,141,0,0.2)", padding: "10px 28px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
              <span style={{ fontSize: 15 }}>⚠️</span>
              <p style={{ fontSize: 11, color: "#c0620a", fontWeight: 600, margin: 0, flex: 1 }}>{error}</p>
              <button onClick={() => setError("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#c0620a", fontSize: 18, fontFamily: "inherit" }}>×</button>
            </div>
          )}

          {/* Success */}
          {success && (
            <div style={{ position: "absolute", inset: 0, zIndex: 20, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(4px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: 24 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#1e291a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 20, boxShadow: "0 8px 24px rgba(30,41,26,0.2)", color: "#fff" }}>✓</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 28, fontWeight: 700, color: "#1e291a", margin: "0 0 8px" }}>Demande envoyée !</h3>
              <p style={{ color: "#9ca3af", fontSize: 13, margin: 0 }}>Nous vous recontacterons sous 48h.</p>
            </div>
          )}

          {/* Body */}
          <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "28px 28px 0", scrollbarWidth: "none" }}>
            <div style={{ opacity: transitioning ? 0 : 1, transform: transitioning ? "translateY(6px)" : "translateY(0)", transition: "all 0.18s ease" }}>

              {step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 26, fontWeight: 700, color: "#1e291a", margin: "0 0 4px" }}>Commençons par vous.</h3>
                    <p style={{ color: "#b0a89e", fontSize: 12, margin: 0 }}>Dites-nous qui vous êtes pour mieux cerner vos besoins.</p>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <ModalFieldGroup label="Prénom" required><input style={inputStyle} placeholder="Jean" value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })} /></ModalFieldGroup>
                    <ModalFieldGroup label="Nom" required><input style={inputStyle} placeholder="Dupont" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} /></ModalFieldGroup>
                    <ModalFieldGroup label="Email professionnel" required><input style={inputStyle} type="email" placeholder="contact@entreprise.fr" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></ModalFieldGroup>
                    <ModalFieldGroup label="Entreprise" required><input style={inputStyle} placeholder="Terroir SAS" value={form.entreprise} onChange={e => setForm({ ...form, entreprise: e.target.value })} /></ModalFieldGroup>
                  </div>
                  <ModalFieldGroup label="Nombre de participants" required>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {PARTICIPANTS_OPTIONS.map(p => <ModalTagBtn key={p} active={form.participants === p} onClick={() => setForm({ ...form, participants: p })}>{p}</ModalTagBtn>)}
                    </div>
                  </ModalFieldGroup>
                  <ModalFieldGroup label="Période souhaitée" required>
                    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                      <ModalModeBtn active={periodMode === "months"} onClick={() => { setPeriod("months"); setStart(""); setEnd(""); }}>Choisir des mois</ModalModeBtn>
                      <ModalModeBtn active={periodMode === "dates"}  onClick={() => { setPeriod("dates"); setMonths([]); }}>Dates précises</ModalModeBtn>
                    </div>
                    {periodMode === "months" ? (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                        {MONTHS.map(m => <ModalTagBtn key={m} active={months.includes(m)} onClick={() => toggle(months, setMonths, m)}>{m}</ModalTagBtn>)}
                      </div>
                    ) : (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <div>
                          <label style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#b0a89e", display: "block", marginBottom: 6 }}>Date de début</label>
                          <input style={inputStyle} type="date" value={startDate} min={new Date().toISOString().split("T")[0]} onChange={e => setStart(e.target.value)} />
                        </div>
                        <div>
                          <label style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#b0a89e", display: "block", marginBottom: 6 }}>Date de fin</label>
                          <input style={inputStyle} type="date" value={endDate} min={startDate || new Date().toISOString().split("T")[0]} onChange={e => setEnd(e.target.value)} />
                        </div>
                      </div>
                    )}
                  </ModalFieldGroup>
                </div>
              )}

              {step === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 26, fontWeight: 700, color: "#1e291a", margin: "0 0 4px" }}>Où partir ?</h3>
                    <p style={{ color: "#b0a89e", fontSize: 12, margin: 0 }}>Nos domaines vous accueillent dans les plus belles régions de France.</p>
                  </div>
                  <ModalFieldGroup label="Région(s) souhaitée(s)">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                      {REGIONS.map(r => {
                        const active = regions.includes(r.name);
                        return (
                          <button key={r.name} onClick={() => toggle(regions, setRegions, r.name)} style={{ padding: "18px 12px", borderRadius: 16, border: `2px solid ${active ? "#1e291a" : "rgba(10,44,52,0.08)"}`, background: active ? "#1e291a" : "#faf8f5", cursor: "pointer", textAlign: "center", transition: "all 0.2s ease", transform: active ? "translateY(-2px)" : "none", boxShadow: active ? "0 6px 20px rgba(30,41,26,0.18)" : "none", fontFamily: "inherit" }}>
                            <div style={{ fontSize: 24, marginBottom: 8 }}>{r.icon}</div>
                            <div style={{ fontSize: 11, fontWeight: 700, color: active ? "#fff" : "#1e291a", lineHeight: 1.3 }}>{r.name}</div>
                            {active && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f78d00", margin: "8px auto 0" }} />}
                          </button>
                        );
                      })}
                    </div>
                  </ModalFieldGroup>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <ModalFieldGroup label="Autre région"><input style={inputStyle} placeholder="Ex : Bretagne, Occitanie…" value={autreRegion} onChange={e => setAutre(e.target.value)} /></ModalFieldGroup>
                    <ModalFieldGroup label="Ville"><input style={inputStyle} placeholder="Ex : Bordeaux, Lyon…" value={ville} onChange={e => setVille(e.target.value)} /></ModalFieldGroup>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 26, fontWeight: 700, color: "#1e291a", margin: "0 0 4px" }}>Logistique & sur-mesure.</h3>
                    <p style={{ color: "#b0a89e", fontSize: 12, margin: 0 }}>Affinez les détails pour une organisation parfaite.</p>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <ModalToggleCard icon="🏠" label="Hébergement" active={hebergement} onToggle={() => setHeberg(v => !v)}>
                      {hebergement && <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>{["Chambres seules","Chambres partagées"].map(t => <ModalTagBtn key={t} active={accTypes.includes(t)} onClick={() => toggle(accTypes, setAccTypes, t)} small>{t}</ModalTagBtn>)}</div>}
                    </ModalToggleCard>
                    <ModalToggleCard icon="🚗" label="Transport" active={withTransport} onToggle={() => setWithT(v => !v)}>
                      {withTransport && <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>{["De porte à porte","Depuis gare SNCF proche"].map(t => <ModalTagBtn key={t} active={transport === t} onClick={() => setTransport(t)} small>{t}</ModalTagBtn>)}</div>}
                    </ModalToggleCard>
                  </div>
                  <ModalFieldGroup label="Un message particulier ?">
                    <textarea rows={4} style={{ ...inputStyle, resize: "none", lineHeight: 1.6 }} placeholder="Salles de réunion, pauses gourmandes, activités team building particulières…" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                  </ModalFieldGroup>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div style={{ padding: "20px 28px", borderTop: "1px solid rgba(10,44,52,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexShrink: 0, background: "#fff" }}>
            <button onClick={goPrev} disabled={step === 1} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: step === 1 ? "default" : "pointer", color: step === 1 ? "transparent" : "#9ca3af", fontFamily: "inherit", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "8px 0", transition: "color 0.2s ease" }}>← Précédent</button>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={handleClose} style={{ padding: "10px 20px", borderRadius: 12, border: "1px solid rgba(10,44,52,0.1)", background: "#faf8f5", fontFamily: "inherit", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9ca3af", cursor: "pointer" }}>Annuler</button>
              <button onClick={step < 3 ? goNext : handleSubmit} disabled={submitting} style={{ padding: "10px 28px", borderRadius: 12, background: "#1e291a", color: "#fff", border: "none", fontFamily: "inherit", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.7 : 1, display: "flex", alignItems: "center", gap: 8, transition: "background 0.2s ease", minWidth: 160 }}>
                {submitting ? "Envoi en cours…" : step < 3 ? <span>Continuer →</span> : <span>Finaliser ✓</span>}
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

// ─── Page principale ───────────────────────────────────────────────────────────

export default function SeminairesPage() {
  const [activeProduit, setActiveProduit] = useState("all");
  const [activeFormat,  setActiveFormat]  = useState("1jour");
  const [currentIndex,  setCurrentIndex]  = useState(0);
  const [direction,     setDirection]     = useState("Right");
  const [animKey,       setAnimKey]       = useState(0);
  const [modalOpen,     setModalOpen]     = useState(false);
  const touchStart = useRef(null);

  const filtered  = activeProduit === "all" ? SEMINAIRES : (SEMINAIRES.filter(s => s.id === activeProduit).length ? SEMINAIRES.filter(s => s.id === activeProduit) : SEMINAIRES);
  const safeIndex = Math.min(currentIndex, filtered.length - 1);
  const s         = filtered[safeIndex] || filtered[0];
  const fmt       = s?.formats[activeFormat];

  const navigate = (dir) => {
    const next = dir === "next" ? Math.min(safeIndex + 1, filtered.length - 1) : Math.max(safeIndex - 1, 0);
    if (next === safeIndex) return;
    setDirection(dir === "next" ? "Right" : "Left");
    setCurrentIndex(next); setAnimKey(k => k + 1);
  };

  const changeProduit = (p) => { setActiveProduit(p); setCurrentIndex(0); setDirection("Right"); setAnimKey(k => k + 1); };

  if (!s || !fmt) return null;

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: "#faf8f5", minHeight: "100vh" }}>
      <style>{`
        @keyframes slideInRight { from{opacity:0;transform:translateX(32px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideInLeft  { from{opacity:0;transform:translateX(-32px)} to{opacity:1;transform:translateX(0)} }
        @keyframes modalIn      { from{opacity:0;transform:translateY(28px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes modalOut     { from{opacity:1;transform:translateY(0) scale(1)} to{opacity:0;transform:translateY(28px) scale(0.97)} }
        .img-arrow { opacity:0; transition:opacity 0.2s ease; }
        .img-wrap:hover .img-arrow { opacity:1; }
        ::-webkit-scrollbar { display:none; }
        .sem-page-inner { max-width:1100px; margin:0 auto; padding:0 32px 80px; }
        .sem-header { padding-top:120px; padding-bottom:40px; position:relative; overflow:hidden; background:#faf8f5; }
        .sem-layout { display:grid; grid-template-columns:220px 1fr; gap:0; align-items:start; }
        @media (max-width:900px) { .sem-page-inner{padding:0 20px 60px;} .sem-layout{grid-template-columns:180px 1fr;} .sem-header{padding-top:96px;padding-bottom:32px;} }
        @media (max-width:640px) {
          .sem-page-inner{padding:0 16px 60px;} .sem-layout{grid-template-columns:1fr;} .sem-header{padding-top:80px;padding-bottom:24px;}
          .sem-sidebar{position:static!important;border-bottom:1px solid rgba(10,44,52,0.08);margin-bottom:24px;padding-bottom:20px!important;padding-right:0!important;}
          .sem-sidebar-inner{display:flex;flex-direction:column;}
          .sem-filters-wrap{display:flex!important;flex-direction:row!important;flex-wrap:wrap;gap:6px;}
          .sem-filters-wrap button{display:inline-block!important;width:auto!important;padding:5px 13px!important;border-radius:20px!important;}
        }
        .sem-sidebar { position:sticky; top:100px; padding-right:36px; padding-top:8px; }
        .sem-filter-btn { display:block; width:100%; text-align:left; padding:8px 14px; border-radius:10px; border:none; background:transparent; font-family:inherit; font-size:12px; font-weight:600; letter-spacing:0.04em; cursor:pointer; color:#6b7280; transition:all 0.15s ease; margin-bottom:2px; }
        .sem-filter-btn:hover { background:rgba(10,44,52,0.04); color:#1e291a; }
        .sem-filter-btn.active { color:#fff; }
        .sem-cta-section { max-width:1100px; margin:48px auto 0; padding:0 32px 80px; }
        @media (max-width:900px) { .sem-cta-section{padding:0 20px 60px;} }
        @media (max-width:640px) { .sem-cta-section{padding:0 16px 60px;} }
      `}</style>

      {/* Modale */}
      <SeminaireModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* ══ HEADER ══ */}
      <div className="sem-header">
        <div style={{ position:"absolute",inset:0,opacity:0.025,backgroundImage:"radial-gradient(circle at 1px 1px,#1e291a 1px,transparent 0)",backgroundSize:"26px 26px",pointerEvents:"none" }} />
        <div className="sem-page-inner" style={{ paddingBottom:0 }}>
          <span style={{ display:"inline-block",padding:"5px 14px",background:"#f78d00",color:"#fff",fontWeight:700,fontSize:9,letterSpacing:"0.3em",textTransform:"uppercase",borderRadius:30,marginBottom:16,boxShadow:"0 2px 10px rgba(247,141,0,0.25)" }}>Offres packagées</span>
          <h1 className="font-bold text-primary leading-none mb-3 flex flex-row items-baseline flex-wrap gap-x-2 gap-y-1 whitespace-normal animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200" style={{ fontSize:"clamp(24px, 4vw, 52px)" }}>
            <span className="font-sans not-italic" style={{ fontSize:"0.7em" }}>Nos offres</span>
            <span className="font-display italic">séminaires.</span>
          </h1>
          <p style={{ color:"#9ca3af",fontSize:13,maxWidth:460,lineHeight:1.65,margin:0 }}>1 journée, 2 jours ou sur mesure — des expériences pour reconnecter votre équipe au vivant.</p>
        </div>
      </div>

      {/* ══ LAYOUT ══ */}
      <div className="sem-page-inner">
        <div className="sem-layout">

          {/* Sidebar */}
          <aside className="sem-sidebar">
            <div className="sem-sidebar-inner">
              <div style={{ fontSize:9,fontWeight:800,letterSpacing:"0.22em",textTransform:"uppercase",color:"#c4bdb4",marginBottom:10 }}>Filtrer par produit</div>
              <div className="sem-filters-wrap" style={{ display:"flex",flexDirection:"column" }}>
                {PRODUITS.map(p => {
                  const active = activeProduit === p.id;
                  const activeBg = active && s?.couleur ? s.couleur : active ? "#1e291a" : "";
                  return (
                    <div key={p.id} style={{ display:"flex",alignItems:"center",gap:6 }}>
                      <button onClick={() => !p.comingSoon && changeProduit(p.id)} className={`sem-filter-btn${active ? " active" : ""}`} style={{ ...(active ? { background:activeBg } : {}), ...(p.comingSoon ? { opacity:0.45,cursor:"default" } : {}) }}>
                        {active && <span style={{ display:"inline-block",width:5,height:5,borderRadius:"50%",background:"rgba(255,255,255,0.55)",marginRight:8,verticalAlign:"middle",marginTop:-1 }} />}
                        {p.label}
                      </button>
                      {p.comingSoon && <span style={{ fontSize:8.5,fontWeight:700,letterSpacing:"0.05em",color:"#a8a29a",background:"#f0ede8",padding:"2px 7px",borderRadius:5,whiteSpace:"nowrap",border:"1px solid #e5e0d8",flexShrink:0 }}>bientôt</span>}
                    </div>
                  );
                })}
              </div>
              <div style={{ fontSize:10,color:"#c4bdb4",fontWeight:600,marginTop:16,letterSpacing:"0.06em" }}>
                {filtered.length} expérience{filtered.length > 1 ? "s" : ""}
                {safeIndex < filtered.length && <span style={{ color:"#d1cdc8" }}> · {safeIndex + 1}/{filtered.length}</span>}
              </div>
            </div>
          </aside>

          {/* Card */}
          <main style={{ minWidth:0 }}>
            <div key={animKey} style={{ animation:`slideIn${direction} 0.38s cubic-bezier(0.22,1,0.36,1) both` }}>
              {/* Image */}
              <div className="img-wrap" onTouchStart={e => { touchStart.current = e.touches[0].clientX; }} onTouchEnd={e => { if (touchStart.current === null) return; const dx = e.changedTouches[0].clientX - touchStart.current; if (Math.abs(dx) > 44) navigate(dx < 0 ? "next" : "prev"); touchStart.current = null; }} style={{ position:"relative",height:280,overflow:"hidden",cursor:"grab",borderRadius:"20px 20px 0 0" }}>
                <img src={s.image} alt={fmt.titre} style={{ width:"100%",height:"100%",objectFit:"cover",display:"block",pointerEvents:"none",userSelect:"none" }} />
                <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top, rgba(10,44,52,0.6) 0%, transparent 55%)" }} />
                {safeIndex > 0 && (
                  <button className="img-arrow" onClick={() => navigate("prev")} style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.14)",backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,0.28)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7.5 2L3.5 6L7.5 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                )}
                {safeIndex < filtered.length - 1 && (
                  <button className="img-arrow" onClick={() => navigate("next")} style={{ position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.14)",backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,0.28)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2L8.5 6L4.5 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                )}
                {filtered.length > 1 && (
                  <div style={{ position:"absolute",bottom:54,left:"50%",transform:"translateX(-50%)",display:"flex",gap:5 }}>
                    {filtered.map((_, i) => <button key={i} onClick={() => { setDirection(i > safeIndex ? "Right" : "Left"); setCurrentIndex(i); setAnimKey(k => k + 1); }} style={{ width:i===safeIndex?18:6,height:6,borderRadius:3,background:i===safeIndex?"#fff":"rgba(255,255,255,0.4)",border:"none",cursor:"pointer",padding:0,transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)" }} />)}
                  </div>
                )}
                {s.bestseller && <div style={{ position:"absolute",top:14,right:14,background:"#f78d00",borderRadius:20,padding:"4px 10px",fontSize:10,fontWeight:700,color:"#fff",display:"flex",alignItems:"center",gap:4,letterSpacing:"0.08em",textTransform:"uppercase" }}>★ Populaire</div>}
                <div style={{ position:"absolute",bottom:14,left:16,fontSize:11,color:"rgba(255,255,255,0.88)",fontWeight:600,letterSpacing:"0.04em" }}>{s.region}</div>
              </div>

              {/* Body */}
              <div style={{ background:"#fff",borderRadius:"0 0 20px 20px",border:"1px solid rgba(10,44,52,0.06)",borderTop:"none",boxShadow:"0 4px 24px rgba(10,44,52,0.07)",padding:"18px 20px 20px",display:"flex",flexDirection:"column" }}>
                <div style={{ fontSize:10,color:"#9ca3af",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.14em",marginBottom:5 }}>{s.producteur}</div>
                <div style={{ marginBottom:14 }}>
                  <div style={{ fontWeight:700,fontSize:17,color:"#1e291a",lineHeight:1.25,marginBottom:3 }}>{fmt.titre}</div>
                  <div style={{ fontSize:12,color:"#9ca3af",fontStyle:"italic" }}>{fmt.sous_titre}</div>
                </div>
                <div style={{ display:"flex",gap:0,background:"#f0ebe4",borderRadius:10,padding:3,marginBottom:14 }}>
                  {FORMATS.map(f => { const fActive = activeFormat === f.id; return <button key={f.id} onClick={() => setActiveFormat(f.id)} style={{ flex:1,padding:"7px 4px",borderRadius:8,border:"none",background:fActive?"#fff":"transparent",color:fActive?"#1e291a":"#9ca3af",fontSize:10,fontWeight:700,fontFamily:"inherit",letterSpacing:"0.06em",cursor:"pointer",boxShadow:fActive?"0 1px 4px rgba(10,44,52,0.10)":"none",transition:"all 0.18s ease",whiteSpace:"nowrap" }}>{f.label}</button>; })}
                </div>
                <div style={{ display:"flex",flexWrap:"wrap",gap:12,margin:"0 0 12px" }}>
                  <span style={{ fontSize:11,color:"#6b7280",fontWeight:600 }}>{fmt.participants}</span>
                  <span style={{ color:"#d1cdc8" }}>·</span>
                  <span style={{ fontSize:11,color:"#6b7280",fontWeight:600 }}>{fmt.duree}</span>
                </div>
                <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginBottom:16 }}>
                  {fmt.inclus.map(item => <span key={item} style={{ background:`${s.couleur}18`,color:s.couleur,fontSize:10,fontWeight:600,padding:"3px 10px",borderRadius:20,letterSpacing:"0.04em" }}>✓ {item}</span>)}
                </div>
                <ProgrammeAccordion programme={fmt.programme} couleur={s.couleur} triggerKey={animKey + activeFormat} />
                <FooterCta prix={fmt.prix} couleur={s.couleur} isMesure={activeFormat === "mesure"} onOpenModal={() => setModalOpen(true)} />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* ══ CTA SECTION ══ */}
      <div className="sem-cta-section">
        <div style={{ background:"#1e291a",borderRadius:20,padding:"44px 40px",position:"relative",overflow:"hidden" }}>
          <div style={{ position:"absolute",inset:0,opacity:0.04,backgroundImage:"radial-gradient(circle at 1px 1px,white 1px,transparent 0)",backgroundSize:"20px 20px",pointerEvents:"none" }} />
          <div style={{ position:"absolute",right:-60,top:-60,width:260,height:260,borderRadius:"50%",background:"radial-gradient(circle, rgba(247,141,0,0.12) 0%, transparent 70%)",pointerEvents:"none" }} />
          <div style={{ position:"relative",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:24 }}>
            <div style={{ maxWidth:520 }}>
              <h3 style={{ color:"#fff",margin:"0 0 10px",lineHeight:1.3 }}>
                <span style={{ fontWeight:700,fontSize:"clamp(16px, 2vw, 20px)" }}>Votre projet ne rentre pas </span>
                <span style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontWeight:700,fontSize:"clamp(22px, 2.8vw, 30px)" }}>dans une case ?</span>
              </h3>
              <p style={{ color:"rgba(255,255,255,0.6)",fontSize:13,margin:0,lineHeight:1.7 }}>Groupe de 5 à 200 — on construit l'expérience sur mesure pour votre équipe.</p>
            </div>
            <div style={{ display:"flex",gap:10,flexWrap:"wrap",flexShrink:0 }}>
              <button onClick={() => setModalOpen(true)} style={{ background:"#f78d00",color:"#fff",padding:"12px 22px",borderRadius:12,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",border:"none",cursor:"pointer",fontFamily:"inherit",boxShadow:"0 4px 16px rgba(247,141,0,0.35)" }}>Discuter de mon projet →</button>
              <a href="/partenaires" style={{ background:"rgba(255,255,255,0.08)",color:"#fff",padding:"12px 22px",borderRadius:12,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",textDecoration:"none",border:"1px solid rgba(255,255,255,0.2)" }}>Voir nos producteurs →</a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
