import { HOME_PRODUCERS, lieuDestinationPath } from './homeStorage';
import { villeSeminairePath } from './villesSeminaire';

const HOME =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME';

/** Hubs internes (pages futures → expériences entreprise en attendant). */
const HUB = {
  seminaires: '/seminaires-entreprise',
  experiences: '/experiences-entreprise',
  destinations: '/destinations',
  auVert: lieuDestinationPath('en-pleine-nature'),
  producteur: lieuDestinationPath('chez-le-producteur'),
  ferme: lieuDestinationPath('a-la-ferme'),
  vignoble: lieuDestinationPath('au-vignoble'),
  eau: lieuDestinationPath('au-bord-de-leau'),
  montagne: lieuDestinationPath('en-montagne'),
  cohesion: '/seminaires-entreprise/cohesion',
  rse: '/seminaires-entreprise/sensibilisation-rse',
  inspiration: '/seminaires-entreprise/inspiration-miroir',
  codir: '/seminaires-entreprise/codir',
  auVertPage: '/seminaires-entreprise/au-vert',
  original: '/seminaires-entreprise/original',
} as const;

export const SEMINAIRE_ENJEU_SLUGS = [
  'cohesion',
  'sensibilisation-rse',
  'inspiration-miroir',
  'codir',
  'au-vert',
  'original',
] as const;

export type SeminaireEnjeuSlug = (typeof SEMINAIRE_ENJEU_SLUGS)[number];

/** Slugs du mega-menu « Selon vos enjeux » (hors envies). */
export const SEMINAIRE_ENJEU_MENU_SLUGS: readonly SeminaireEnjeuSlug[] = [
  'cohesion',
  'sensibilisation-rse',
  'inspiration-miroir',
  'codir',
];

/** Slugs du mega-menu « Selon vos envies ». */
export const SEMINAIRE_ENVIE_SLUGS: readonly SeminaireEnjeuSlug[] = ['au-vert', 'original'];

export type SeminaireEnjeuFAQ = {
  question: string;
  answer: string;
};

export type SeminaireEnjeuProgrammeStep = {
  title: string;
  description: string;
};

export type SeminaireEnjeuExample = {
  producerName: string;
  role: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Slug de l’offre `/exemples-seminaire-entreprise/[slug]` (colonne `slug` Supabase). */
  seminaireSlug: string;
};

export type SeminaireEnjeuWhyHighlight = {
  title: string;
  text: string;
};

export type SeminaireEnjeuTheme = {
  emoji: string;
  title: string;
  description: string;
  /** Lien optionnel (maillage interne). */
  href?: string;
};

export type SeminaireEnjeuCta =
  | { label: string; action: 'modal' }
  | { label: string; href: string };

export type SeminaireEnjeuLinkBlock = {
  title: string;
  text: string;
  href: string;
  linkLabel?: string;
};

export type SeminaireEnjeuCity = {
  name: string;
  href: string;
};

export type SeminaireEnjeu = {
  slug: SeminaireEnjeuSlug;
  name: string;
  menuLabel: string;
  // SEO
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage: string;
  ogImageAlt: string;
  // Contenu
  eyebrow: string;
  title: string;
  /** Titre court pour déroulé / exemple / FAQ (sinon `title`). */
  shortTitle?: string;
  subtitle: string;
  lead: string;
  body: string[];
  experiences: string[];
  /** CTA hero (sinon lien séminaires d'entreprise). */
  heroCta?: SeminaireEnjeuCta;
  /** CTA sous l’intro (sinon aucun). */
  introCta?: SeminaireEnjeuCta;
  /** H2 après l’intro (page au vert). */
  afterIntro?: {
    title: string;
    titleBold?: string;
    paragraphs: string[];
  };
  /** Masquer le CTA de la section orange. */
  hideWhyCta?: boolean;
  /** Fond de la section intro (défaut blanc). */
  introBackground?: string;
  /** Fond de la section thématiques (défaut blanc). */
  themesBackground?: string;
  /** Section expériences dédiée (la liste orange est alors masquée). */
  experiencesSection?: {
    title: string;
    titleBold?: string;
    intro: string;
    body: string[];
    listLead?: string;
    cta?: SeminaireEnjeuCta;
    /** `stacked` = une seule colonne ; `image-left` = photo à gauche, texte à droite. */
    layout?: 'two-column' | 'stacked' | 'image-left';
    image?: string;
    imageAlt?: string;
    background?: string;
  };
  placesSection?: {
    title: string;
    titleBold?: string;
    intro: string;
    items: SeminaireEnjeuLinkBlock[];
    cta?: SeminaireEnjeuCta;
    background?: string;
  };
  formatsSection?: {
    title: string;
    titleBold?: string;
    intro: string;
    items: SeminaireEnjeuLinkBlock[];
    cta?: SeminaireEnjeuCta;
  };
  citiesSection?: {
    title: string;
    titleBold?: string;
    intro: string;
    body?: string;
    cities: SeminaireEnjeuCity[];
    cta?: SeminaireEnjeuCta;
    background?: string;
  };
  exampleCta?: SeminaireEnjeuCta;
  /** Fond de la section exemple (défaut gris). */
  exampleBackground?: string;
  /** Fond de la section programme (défaut blanc). */
  programBackground?: string;
  /** Fond de la section FAQ (défaut gris). */
  faqBackground?: string;
  faqLead?: string;
  closing?: {
    title: string;
    titleBold?: string;
    lead: string;
    cta: SeminaireEnjeuCta;
  };
  /** Fond de la section « pourquoi » (défaut orange). */
  whyBackground?: string;
  /** H2 section « pourquoi » (sinon « Pourquoi choisir ce {title} ? »). */
  whyTitle?: string;
  /** Portion en gras dans whyTitle. */
  whyTitleBold?: string;
  /** Sous-titre sous le H2 « pourquoi ». */
  whyLead?: string;
  /** Blocs argumentaires dédiés (sinon body[2..3] + experiences[0..1]). */
  whyHighlights?: SeminaireEnjeuWhyHighlight[];
  /** CTA section « pourquoi » (sinon « Demander un devis »). */
  whyCta?: SeminaireEnjeuCta;
  /** Intro de la section « déroulé type ». Si absent, texte générique. */
  programIntro?: string;
  /** H2 section programme (sinon « Votre déroulé type pour un {title} »). */
  programTitle?: string;
  /** Portion en gras dans programTitle. */
  programTitleBold?: string;
  /**
   * Emplacement de la section programme.
   * `before-example` (défaut) : juste avant l’exemple de séminaire.
   * `before-faq` : après les villes.
   */
  programPosition?: 'before-example' | 'before-faq';
  programHighlights: SeminaireEnjeuProgrammeStep[];
  /** Sous-titre sous le H2 exemple. */
  exampleLead?: string;
  exampleSeminar: SeminaireEnjeuExample;
  themesTitle?: string;
  /** Portion en gras dans themesTitle. */
  themesTitleBold?: string;
  themesIntro?: string;
  themes?: SeminaireEnjeuTheme[];
  themesCta?: SeminaireEnjeuCta;
  faqTitle?: string;
  /** Portion en gras dans faqTitle. */
  faqTitleBold?: string;
  faq: SeminaireEnjeuFAQ[];
  relatedSlugs: SeminaireEnjeuSlug[];
  heroImage: string;
  heroImageAlt: string;
  /** Image de la section « Pourquoi choisir ce séminaire ». */
  whyImage: string;
  whyImageAlt: string;
};

export const SEMINAIRE_ENJEUX: SeminaireEnjeu[] = [
  {
    slug: 'cohesion',
    name: 'Cohésion',
    menuLabel: 'Séminaire cohésion',

    metaTitle: 'Séminaire cohésion et team building d\u2019équipe | TerraGo',
    metaDescription:
      'Organisez un séminaire cohésion TerraGo : team building original, défis collaboratifs, activités outdoor et immersion chez un producteur. Devis sous 48h.',
    keywords: [
      'séminaire cohésion',
      'séminaire cohésion équipe',
      'team building entreprise',
      'team building cohésion',
      'team building original',
      'activité cohésion équipe entreprise',
      'team building nature',
      'team building outdoor',
      'séminaire team building',
      'séminaire original entreprise',
    ],
    ogImage: `${HOME}/enjeux/184022935847.webp`,
    ogImageAlt: 'Équipe en séminaire de cohésion chez un producteur partenaire TerraGo',

    eyebrow: 'Selon vos enjeux',
    title: 'Séminaire cohésion',
    shortTitle: 'séminaire cohésion',
    subtitle: 'Créer des liens autrement.',
    lead:
      'Sortir du cadre habituel pour vivre une expérience collective authentique, renforcer la cohésion d\u2019équipe et partager des moments qui marquent durablement les collaborateurs.',
    body: [
      `Un séminaire de cohésion TerraGo place vos équipes au contact du réel : gestes concrets, défis collectifs, [[activités de plein air|${HUB.auVert}]] et rencontres humaines [[chez des producteurs|${HUB.producteur}]] ou au cœur des territoires.`,
      `Loin des activités de [[team building|${HUB.experiences}]] standardisées, vos collaborateurs vivent une expérience qui crée naturellement du lien, de la fierté collective et des souvenirs communs.`,
    ],
    experiences: [
      'Défis collaboratifs',
      'Activités outdoor',
      'Immersion chez des producteurs',
      'Ateliers participatifs',
      'Randonnées et activités nature',
      'Moments de convivialité',
    ],
    whyTitle: 'Pourquoi organiser un séminaire de cohésion ?',
    whyTitleBold: 'séminaire de cohésion',
    whyLead:
      'Parce que la cohésion se construit en faisant, en partageant et en vivant quelque chose ensemble.',
    whyHighlights: [
      {
        title: 'Des expériences qui font vraiment participer',
        text: `Plutôt qu\u2019un [[team building|${HUB.experiences}]] basé uniquement sur des jeux ou des animations, TerraGo propose des expériences où chacun trouve sa place : récolter, cuisiner, construire, explorer, relever un défi ou découvrir un savoir-faire.`,
      },
      {
        title: 'Des défis à relever ensemble',
        text:
          'Les activités sont pensées pour favoriser la coopération, la communication et l\u2019entraide, avec des objectifs communs et un résultat concret à partager.',
      },
      {
        title: 'Des moments qui prolongent l\u2019expérience',
        text:
          'Après l\u2019activité, place à la convivialité autour d\u2019un repas, d\u2019une dégustation ou d\u2019une grande tablée. Ces moments informels permettent aux équipes de se retrouver autrement.',
      },
    ],
    whyCta: {
      label: 'Découvrir nos expériences pour entreprise',
      href: HUB.experiences,
    },
    programIntro:
      'Une journée pensée pour alterner activité, coopération et convivialité.',
    programHighlights: [
      {
        title: 'Accueil café & viennoiseries locales',
        description:
          'Arrivée en douceur chez le producteur : café de spécialité, viennoiseries artisanales et brief collectif pour planter le décor et mélanger les équipes dès les premières minutes.',
      },
      {
        title: 'Découverte du lieu',
        description:
          'Le producteur ouvre les portes de son univers : gestes, saisons, contraintes du vivant. Une immersion concrète qui crée immédiatement un terrain commun entre collaborateurs.',
      },
      {
        title: 'Activité collaborative sur le terrain',
        description:
          'Récolte, transformation ou défi en petites équipes mêlées : une vraie mission partagée, loin des icebreakers artificiels, qui fait naître fierté collective et souvenirs durables.',
      },
      {
        title: 'Repas local en mode guinguette',
        description:
          'Table longue, produits du lieu, ambiance guinguette : un déjeuner généreux et convivial pour prolonger les échanges et célébrer ce que l\u2019équipe a construit ensemble.',
      },
      {
        title: 'Partage, restitution & clôture',
        description:
          'Temps de feedback léger, anecdotes et clôture chaleureuse — pour ancrer l\u2019expérience et repartir avec un récit commun à raconter en entreprise.',
      },
      {
        title: 'Mot de fin & cadeau du terroir',
        description:
          'Remerciements du producteur et petit cadeau local pour chaque collaborateur — un souvenir tangible de la journée, à ramener au bureau ou à la maison.',
      },
    ],
    exampleLead:
      'Découvrez concrètement ce que vos équipes peuvent vivre avec TerraGo.',
    exampleSeminar: {
      producerName: 'Baptiste',
      role: 'Producteur de piments · Pays Basque',
      description:
        'Chez Baptiste, vos équipes vivent une journée rythmée par la culture du piment : visite, challenges collaboratifs, atelier cordage et repas traditionnel basque. Une expérience entre découverte, coopération et convivialité, proposée à la journée ou en format résidentiel.',
      image:
        'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/pimentsbaptiste/baptiste_producteur_piment.webp',
      imageAlt: 'Baptiste, producteur de piments – exemple de séminaire cohésion TerraGo',
      seminaireSlug: 'avec-baptiste',
    },
    themesTitle: 'Quel team building choisir pour votre équipe ?',
    themesTitleBold: 'Quel team building choisir',
    themesIntro:
      'Sport, nature, gastronomie, savoir-faire ou défis collectifs : choisissez une expérience adaptée à votre équipe.',
    themes: [
      {
        emoji: '🧑‍🌾',
        title: 'Faire ensemble',
        description:
          'Récolter, cuisiner, fabriquer, transformer… Des expériences concrètes chez des producteurs où chacun participe et contribue au résultat collectif.',
        href: HUB.producteur,
      },
      {
        emoji: '🏆',
        title: 'Se challenger',
        description:
          'Défis, challenges et jeux collectifs pour stimuler l\u2019entraide, la communication et l\u2019esprit d\u2019équipe.',
        href: HUB.experiences,
      },
      {
        emoji: '🍷',
        title: 'Partager',
        description:
          'Dégustation, atelier gastronomique, repas local ou grande tablée : des moments conviviaux pour prolonger les échanges et simplement profiter ensemble.',
        href: HUB.experiences,
      },
      {
        emoji: '🌿',
        title: 'Prendre l\u2019air',
        description:
          'Randonnée, orientation, vélo, découverte d\u2019un territoire… Des activités en plein air pour sortir du quotidien et créer du lien autrement.',
        href: HUB.auVert,
      },
    ],
    themesCta: {
      label: 'Voir toutes nos idées de team building',
      href: HUB.experiences,
    },
    faqTitle: 'Questions fréquentes sur les séminaires de cohésion.',
    faqTitleBold: 'séminaires de cohésion',
    faq: [
      {
        question:
          'En quoi un séminaire de cohésion se distingue-t-il d\u2019un team building classique ?',
        answer:
          'Un séminaire de cohésion TerraGo combine activité collective, découverte et convivialité dans un cadre qui sort du quotidien. Plutôt que de proposer uniquement une animation, nous construisons une expérience autour d\u2019un lieu, d\u2019un territoire et d\u2019une activité réellement vécue ensemble.',
      },
      {
        question: 'Pour combien de personnes ce format fonctionne-t-il ?',
        answer:
          'TerraGo accompagne des groupes de différentes tailles. Certains formats peuvent accueillir une dizaine de participants, tandis que d\u2019autres sont adaptés à des groupes de 100 personnes ou plus. Le choix du lieu et des activités dépend notamment de la taille de votre équipe.',
      },
      {
        question: 'Faut-il être sportif ou habitué au travail manuel ?',
        answer:
          'Non. Les activités sont choisies et adaptées au profil du groupe. L\u2019objectif n\u2019est pas la performance sportive ou physique, mais la participation, la coopération et le plaisir de vivre une expérience ensemble.',
      },
      {
        question: 'Que se passe-t-il s\u2019il pleut le jour J ?',
        answer:
          'Chaque expérience est préparée avec une solution adaptée aux conditions météo. Selon le lieu, l\u2019activité peut être déplacée dans un hangar, un chai, un atelier ou un espace couvert, afin de préserver le programme et la dynamique du groupe.',
      },
      {
        question: 'Combien de temps faut-il pour organiser un séminaire de cohésion ?',
        answer:
          'Nous recommandons idéalement de nous contacter plusieurs semaines à l\u2019avance afin d\u2019avoir davantage de choix sur les lieux, les activités et les hébergements. Nous pouvons également étudier les demandes plus urgentes selon les disponibilités de nos partenaires.',
      },
      {
        question:
          'Le séminaire peut-il intégrer des collaborateurs qui ne se connaissent pas encore ?',
        answer:
          'Oui. Les activités sont justement conçues pour créer des interactions naturelles entre les participants. Les défis collectifs, ateliers et moments de convivialité permettent de favoriser les échanges, même lorsque les équipes se connaissent peu.',
      },
      {
        question: 'Quelles sont les meilleures idées de séminaire d\u2019entreprise ?',
        answer: `Il n\u2019existe pas une activité idéale pour toutes les équipes. Randonnée, atelier cuisine, défi collectif, découverte d\u2019un producteur, activité sportive ou expérience nature : le meilleur choix dépend de vos objectifs, du profil de vos collaborateurs et du territoire choisi. Explorez nos [[expériences entreprise|${HUB.experiences}]] et [[séminaires d\u2019entreprise|${HUB.seminaires}}].`,
      },
      {
        question: 'Quels séminaires originaux peut-on organiser avec TerraGo ?',
        answer: `TerraGo imagine des [[séminaires originaux|${HUB.original}]] qui sortent des formats classiques : immersion [[chez un producteur|${HUB.producteur}]], randonnée, découverte d\u2019un savoir-faire, [[activité nature|${HUB.auVert}]], défi collectif, atelier gastronomique ou expérience autour du terroir. Chaque programme est construit sur mesure.`,
      },
      {
        question: 'Peut-on organiser un team building original avec TerraGo ?',
        answer: `Oui. TerraGo propose des activités de [[team building|${HUB.experiences}]] originales qui privilégient l\u2019expérience vécue, la découverte et la coopération. Elles peuvent se dérouler [[chez un producteur|${HUB.producteur}]], [[en pleine nature|${HUB.auVert}]] ou dans un lieu sélectionné selon votre projet.`,
      },
    ],
    relatedSlugs: ['sensibilisation-rse', 'inspiration-miroir'],
    heroImage: `${HOME}/enjeux/184022935847.webp`,
    heroImageAlt: 'Séminaire cohésion d\u2019équipe chez un producteur – TerraGo',
    whyImage: `${HOME}/enjeux/8164316.webp`,
    whyImageAlt: 'Équipe en séminaire de cohésion chez un producteur – TerraGo',
  },
  {
    slug: 'sensibilisation-rse',
    name: 'RSE & sensibilisation',
    menuLabel: 'Séminaire RSE & sensibilisation',

    metaTitle: 'Séminaire RSE et sensibilisation aux enjeux du vivant | TerraGo',
    metaDescription:
      'Organisez un séminaire RSE TerraGo chez un producteur : immersion terrain, agroécologie, circuits courts et sensibilisation aux enjeux environnementaux. Devis sous 48h.',
    keywords: [
      'séminaire RSE',
      'séminaire RSE entreprise',
      'séminaire éco-responsable',
      'séminaire à impact',
      'sensibilisation RSE',
      'team building RSE',
      'activité RSE entreprise',
      'séminaire environnement',
      'séminaire agriculture',
      'séminaire biodiversité',
      'agroécologie entreprise',
      'circuits courts entreprise',
      'démarche RSE',
      'sensibilisation changement climatique entreprise',
    ],
    ogImage: `${HOME}/enjeux/2430570603-31667165.webp`,
    ogImageAlt: 'Équipe sensibilisée aux enjeux RSE lors d\u2019une récolte avec un producteur',

    eyebrow: 'Selon vos enjeux',
    title: 'Séminaire RSE & sensibilisation',
    shortTitle: 'séminaire RSE & sensibilisation',
    subtitle:
      'Une expérience de terrain pour comprendre les enjeux environnementaux, rencontrer des producteurs engagés et donner du sens à vos engagements.',
    lead:
      'Découvrir les réalités du monde agricole sur le terrain, échanger avec des producteurs engagés et mieux comprendre les défis environnementaux auxquels ils font face au quotidien.',
    body: [
      'Un séminaire RSE TerraGo transforme vos engagements en expérience vécue : circuits courts, agroécologie, adaptation climatique et transmission des savoir-faire.',
    ],
    experiences: [
      'Rencontres avec des producteurs engagés',
      'Découverte des pratiques agricoles durables',
      'Compréhension des enjeux liés au changement climatique',
      'Immersion dans les circuits courts',
      'Découverte des savoir-faire locaux',
    ],
    whyTitle: 'Pourquoi organiser un séminaire RSE sur le terrain ?',
    whyTitleBold: 'séminaire RSE sur le terrain',
    whyLead:
      'Parce que certains enjeux se comprennent mieux lorsqu\u2019on les découvre directement auprès de celles et ceux qui les vivent.',
    whyHighlights: [
      {
        title: 'Rencontrer des producteurs engagés',
        text:
          'Plutôt qu\u2019une conférence RSE descendante, TerraGo met vos collaborateurs en situation. Ils observent, touchent, récoltent et échangent directement avec les producteurs sur leurs choix, leurs contraintes et les solutions qu\u2019ils mettent en place.',
      },
      {
        title: 'Découvrir les pratiques agricoles durables',
        text:
          'Agroécologie, circuits courts, biodiversité, adaptation climatique, gestion de l\u2019eau… Vos équipes découvrent concrètement les pratiques qui transforment aujourd\u2019hui les territoires agricoles.',
      },
    ],
    programIntro:
      'Une journée immersive qui alterne découverte, expérience collective et temps de réflexion.',
    programHighlights: [
      {
        title: 'Accueil café & viennoiseries locales',
        description:
          'Un démarrage chaleureux pour poser le cadre RSE de la journée : café, produits locaux et introduction aux enjeux que vos équipes vont vivre sur le terrain.',
      },
      {
        title: 'Visite guidée de l\u2019exploitation',
        description:
          'Le producteur partage ses pratiques durables, ses arbitrages climatiques et la réalité des circuits courts — une pédagogie incarnée, bien loin d\u2019un webinaire.',
      },
      {
        title: 'Activité immersive & geste durable',
        description:
          'Atelier pratique (récolte, compost, transformation…) pour toucher du doigt les enjeux du vivant et ancrer les messages RSE par l\u2019expérience.',
      },
      {
        title: 'Repas local en mode guinguette',
        description:
          'Un déjeuner de saison, préparé avec les produits du lieu : l\u2019occasion de prolonger les échanges sur l\u2019alimentation, les filières et l\u2019impact concret.',
      },
      {
        title: 'Débrief & lien avec votre démarche RSE',
        description:
          'Temps de restitution pour relier ce qui a été vécu à vos engagements RSE — et repartir avec des idées actionnables en entreprise.',
      },
      {
        title: 'Mot de fin & cadeau du terroir',
        description:
          'Clôture chaleureuse et produit du lieu offert à chaque participant — un ancrage concret de l\u2019expérience RSE, bien au-delà de la journée.',
      },
    ],
    exampleSeminar: {
      producerName: 'Benoît',
      role: 'Ferme maraîchère · Île-de-France',
      description:
        'Chez Louise & Benoît, vos équipes découvrent une ferme maraîchère engagée près de Paris : circuits courts, gestes durables et immersion terrain pour ancrer concrètement votre démarche RSE.',
      image:
        'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/clefs%20ferme/Benoit.webp',
      imageAlt: 'Benoît, producteur maraîcher – exemple de séminaire RSE TerraGo',
      seminaireSlug: 'avec-louise-benoit',
    },
    themesTitle: 'Quelles thématiques aborder lors d\u2019un séminaire RSE ?',
    themesTitleBold: 'Quelles thématiques aborder',
    themesIntro:
      'Le contenu de votre séminaire s\u2019adapte à vos enjeux et au territoire qui vous accueille.',
    themes: [
      {
        emoji: '🌱',
        title: 'Agriculture durable',
        description:
          'Agroécologie, vie des sols et pratiques régénératives : vos équipes voient concrètement comment un producteur cultive autrement.',
        href: HUB.ferme,
      },
      {
        emoji: '💧',
        title: 'Adaptation climatique',
        description:
          'Eau, sécheresse, nouvelles cultures : comprendre sur le terrain comment les exploitations s\u2019adaptent au climat qui change.',
        href: HUB.auVert,
      },
      {
        emoji: '🥕',
        title: 'Alimentation & circuits courts',
        description:
          'Saisonnalité, filières locales et assiette du jour : relier ce que l\u2019on mange à ceux qui le produisent, à quelques kilomètres.',
        href: HUB.producteur,
      },
      {
        emoji: '🐝',
        title: 'Biodiversité',
        description:
          'Haies, pollinisateurs, sols vivants : observer un écosystème agricole et le rôle de chaque geste pour le faire durer.',
        href: HUB.experiences,
      },
      {
        emoji: '🤝',
        title: 'Territoires & savoir-faire',
        description:
          'Transmission, métiers agricoles et économie locale : mesurer l\u2019impact d\u2019une entreprise qui choisit de soutenir un territoire.',
        href: HUB.destinations,
      },
    ],
    themesCta: {
      label: 'Composer votre séminaire RSE',
      action: 'modal',
    },
    faqTitle: 'Questions fréquentes sur les séminaires RSE.',
    faqTitleBold: 'séminaires RSE',
    faq: [
      {
        question: 'Qu\u2019est-ce qu\u2019un séminaire RSE ?',
        answer:
          'Un séminaire RSE permet de sensibiliser vos équipes aux enjeux environnementaux et sociaux à travers une expérience concrète. Avec TerraGo, vos collaborateurs découvrent notamment l\u2019agriculture, les circuits courts, la biodiversité ou l\u2019adaptation climatique directement sur le terrain, auprès de producteurs engagés.',
      },
      {
        question: 'Comment organiser un séminaire RSE ?',
        answer:
          'Commencez par définir les enjeux que vous souhaitez aborder et les objectifs pour vos équipes. TerraGo sélectionne ensuite un lieu, un producteur et des activités adaptés à votre démarche : visite d\u2019exploitation, atelier immersif, activité collective, découverte des pratiques durables ou temps d\u2019échange.',
      },
      {
        question: 'Qu\u2019est-ce qu\u2019un séminaire éco-responsable ?',
        answer:
          'Un séminaire éco-responsable cherche à limiter l\u2019impact environnemental de l\u2019événement tout en favorisant les acteurs et ressources du territoire. Cela peut passer par un lieu engagé, une restauration locale et de saison, des déplacements raisonnés et des activités en lien avec la nature et les savoir-faire locaux.',
      },
      {
        question: 'Qu\u2019est-ce qu\u2019un séminaire à impact ?',
        answer:
          'Un séminaire à impact associe l\u2019expérience collective à une contribution positive pour un territoire, un producteur ou une cause. Il peut par exemple permettre de découvrir une exploitation engagée, participer à une action concrète ou mieux comprendre les enjeux liés à l\u2019agriculture, à la biodiversité ou à l\u2019alimentation.',
      },
      {
        question: 'Ce séminaire peut-il inclure une formation ou une intervention RSE ?',
        answer:
          'Oui. Le séminaire peut être complété par une formation, une conférence ou une intervention spécifique selon vos objectifs. Nous pouvons intégrer des experts et des formats pédagogiques adaptés à vos enjeux pour aller plus loin dans la sensibilisation de vos équipes.',
      },
      {
        question: 'Peut-on intégrer le séminaire à une démarche RSE existante ?',
        answer:
          'Oui. Le séminaire peut s\u2019inscrire dans une démarche RSE ou une feuille de route déjà définie par votre entreprise. Nous adaptons les rencontres, les activités et les temps d\u2019échange aux sujets que vous souhaitez aborder avec vos équipes.',
      },
      {
        question: 'Comment éviter l\u2019effet « greenwashing d\u2019une journée » ?',
        answer:
          'En faisant du séminaire une expérience cohérente avec les engagements réels de l\u2019entreprise. L\u2019objectif n\u2019est pas de faire une simple animation « verte », mais de permettre à vos équipes de comprendre des enjeux concrets, de rencontrer des acteurs engagés et de réfléchir à leur propre rôle.',
      },
      {
        question: 'Faut-il déjà connaître les enjeux environnementaux pour participer ?',
        answer:
          'Non. Le séminaire est accessible à tous, quel que soit le niveau de connaissance des participants. Les producteurs et intervenants partagent leur réalité de terrain de manière concrète et accessible, avec des échanges adaptés au groupe.',
      },
      {
        question: 'Quels producteurs accueillent ce type de séminaire ?',
        answer:
          'TerraGo travaille notamment avec des maraîchers, agriculteurs, éleveurs, vignerons, apiculteurs et autres producteurs engagés dans leur territoire. Le choix du partenaire dépend des thématiques souhaitées, de la localisation, de la taille du groupe et du format du séminaire.',
      },
      {
        question: 'Combien de temps dure un séminaire RSE ?',
        answer:
          'Un séminaire RSE peut être organisé sur une demi-journée, une journée ou plusieurs jours avec hébergement. Le format dépend de vos objectifs et du niveau d\u2019immersion souhaité. Une journée permet déjà de combiner découverte, expérience collective et temps d\u2019échange.',
      },
    ],
    relatedSlugs: ['inspiration-miroir', 'cohesion'],
    heroImage: `${HOME}/enjeux/2430570603-31667165.webp`,
    heroImageAlt: 'Séminaire RSE chez un producteur – TerraGo',
    whyImage: `${HOME}/enjeux/5420570603-31667159.webp`,
    whyImageAlt: 'Récolte immersive lors d\u2019un séminaire RSE – TerraGo',
  },
  {
    slug: 'inspiration-miroir',
    name: 'Inspiration & miroir d\u2019entreprise',
    menuLabel: 'Séminaire inspiration & miroir d\u2019entreprise',

    metaTitle: 'Séminaire inspiration et miroir d\u2019entreprise | TerraGo',
    metaDescription:
      'Séminaire inspiration TerraGo : prenez du recul auprès de producteurs qui incarnent adaptation, résilience et prise de décision. Un miroir concret pour vos enjeux d\u2019entreprise.',
    keywords: [
      'séminaire inspiration entreprise',
      'séminaire miroir entreprise agriculture',
      'séminaire prise de recul dirigeants',
      'séminaire résilience organisation',
      'team building inspirant nature',
    ],
    ogImage: `${HOME}/enjeux/RSE76311867-28102052.webp`,
    ogImageAlt: 'Producteur expliquant son métier lors d\u2019un séminaire inspiration TerraGo',

    eyebrow: 'Selon vos enjeux',
    title: 'Séminaire inspiration & miroir d\u2019entreprise',
    subtitle: 'Prendre du recul pour mieux avancer.',
    lead:
      "S'inspirer de femmes et d'hommes qui produisent, s'adaptent, innovent et transmettent leur passion. Leurs défis quotidiens offrent un miroir concret des enjeux auxquels les entreprises font face aujourd'hui.",
    body: [
      'Adaptation, résilience, gestion des ressources, prise de décision : le terrain agricole devient un miroir puissant pour vos enjeux d\u2019organisation.',
      'TerraGo conçoit des expériences où l\u2019inspiration naît du réel — pour ouvrir de nouvelles perspectives et aligner vos équipes autour d\u2019un sens partagé.',
      'Un producteur gère l\u2019incertitude climatique, les arbitrages de ressources et la transmission de son savoir-faire avec des contraintes très concrètes. Confronter vos managers à ces réalités, hors de tout cadre corporate, fait souvent émerger des analogies directes avec leurs propres enjeux de pilotage.',
      'Ce format fonctionne particulièrement bien en amont d\u2019un séminaire de réflexion stratégique ou d\u2019un séminaire managers, comme sas de décompression et de prise de hauteur.',
    ],
    experiences: [
      "Vos enjeux d'entreprise vécus sur le terrain",
      'Des expériences miroir entre agriculture et entreprise',
      'Immersion autour des défis qui résonnent avec votre organisation',
      'Décryptage de vos enjeux à travers des situations réelles',
    ],
    programHighlights: [
      {
        title: 'Accueil café & viennoiseries locales',
        description:
          'Un sas de décompression soigné pour sortir du cadre corporate : accueil chaleureux, produits du terroir et mise en condition pour une journée de prise de hauteur.',
      },
      {
        title: 'Visite guidée de l\u2019exploitation',
        description:
          'Rencontre approfondie avec un producteur inspirant : comment il gère l\u2019incertitude, les ressources et la transmission — un miroir immédiat pour vos enjeux d\u2019organisation.',
      },
      {
        title: 'Activité miroir & réflexion collective',
        description:
          'Atelier terrain puis mise en parallèle guidée entre ses défis et les vôtres : des analogies concrètes pour éclairer décisions, résilience et leadership.',
      },
      {
        title: 'Repas local en mode guinguette',
        description:
          'Autour d\u2019une table généreuse, les échanges se poursuivent dans un cadre informel — souvent le moment où les insights les plus justes émergent.',
      },
      {
        title: 'Synthèse des enseignements applicables',
        description:
          'Restitution collective des apprentissages et priorisation de ce qui peut nourrir votre organisation dès le retour en entreprise.',
      },
      {
        title: 'Mot de fin et cadeau du terroir à emporter',
        description:
          'Dernier échange avec le producteur et cadeau du terroir pour prolonger l\u2019inspiration — un geste simple qui ancre le miroir vécu sur le terrain.',
      },
    ],
    exampleSeminar: {
      producerName: 'Hugues & Marc',
      role: 'Potager en permaculture · Annecy',
      description:
        'Chez Hugues & Marc, le potager devient miroir d\u2019entreprise : résilience, gestion du temps et stratégies naturelles. Un format inspiration puissant, à la journée ou en résidentiel 2 jours.',
      image:
        'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/potagermenthon/potager-chateau-menthon.webp',
      imageAlt: 'Hugues et Marc, potager du château – exemple de séminaire inspiration TerraGo',
      seminaireSlug: 'avec-hugues-marc',
    },
    faq: [
      {
        question: 'Qu\u2019entend-on concrètement par « miroir d\u2019entreprise » ?',
        answer:
          'Le producteur raconte comment il gère l\u2019incertitude, les ressources, les arbitrages et la transmission, des sujets que vos managers vivent aussi, dans un autre vocabulaire. On guide ensuite la mise en parallèle : ce n\u2019est pas une métaphore poétique, c\u2019est un atelier de réflexion qui part de situations réelles vécues sur place.',
      },
      {
        question: 'À qui s\u2019adresse vraiment ce format ?',
        answer:
          'Plutôt aux managers, équipes projet et comités qui ont besoin de prendre du recul, pas uniquement de « faire groupe ». Si votre enjeu principal est le lien entre collègues qui ne se connaissent pas, le séminaire cohésion sera plus adapté ; ici, on vise la réflexion et les analogies utiles au pilotage.',
      },
      {
        question: 'En quoi ce format diffère-t-il d\u2019un séminaire cohésion ?',
        answer:
          'La cohésion crée du lien par une mission partagée. L\u2019inspiration & miroir utilise le même terrain et souvent les mêmes producteurs, mais le déroulé et l\u2019animation poussent vers la prise de hauteur : ce que l\u2019on observe, ce que cela dit de nos propres enjeux, et ce que l\u2019on veut emporter.',
      },
      {
        question: 'Faut-il un animateur externe pour la partie réflexion ?',
        answer:
          'On peut le faire avec TerraGo et le producteur, ou avec votre facilitateur interne / coach habituel. Dans tous les cas, on prépare en amont les angles de miroir qui collent à vos sujets du moment (transformation, charge, décisions, résilience) pour éviter un débrief trop générique.',
      },
      {
        question: 'Peut-on enchaîner avec un temps de travail stratégique le même jour ?',
        answer:
          'Oui, c\u2019est même un usage fréquent : immersion et rencontre le matin, atelier sur vos enjeux l\u2019après-midi. Le terrain sert alors de sas avant une séquence plus « business », et les équipes arrivent souvent plus ouvertes et moins dans leurs postures habituelles.',
      },
      {
        question: 'Quelle taille de groupe fonctionne le mieux ?',
        answer:
          'Le format donne le meilleur de lui-même entre 10 et 40 personnes environ, pour que chacun puisse vraiment échanger avec le producteur. Au-delà, on scinde le groupe ou on resserre la partie miroir sur un cercle de managers, pour ne pas diluer la qualité de la réflexion.',
      },
    ],
    relatedSlugs: ['codir', 'sensibilisation-rse'],
    heroImage: `${HOME}/enjeux/RSE76311867-28102052.webp`,
    heroImageAlt: 'Séminaire inspiration et miroir d\u2019entreprise – TerraGo',
    whyBackground: '#0c1d22',
    faqBackground: '#ffffff',
    whyImage: `${HOME}/enjeux/003515756747.webp`,
    whyImageAlt: 'Échange lors d\u2019un séminaire inspiration et miroir d\u2019entreprise – TerraGo',
  },
  {
    slug: 'codir',
    name: 'CODIR',
    menuLabel: 'Séminaire CODIR',

    metaTitle: 'Séminaire CODIR chez un producteur engagé | TerraGo',
    metaDescription:
      'Séminaire CODIR TerraGo : un format confidentiel et stratégique pour aligner votre comité de direction hors du cadre habituel, chez des producteurs engagés partout en France.',
    keywords: [
      'séminaire CODIR',
      'séminaire comité de direction',
      'séminaire dirigeants nature',
      'séminaire stratégique entreprise',
      'séminaire codir hors les murs',
    ],
    ogImage: `${HOME}/enjeux/codir4743505-31107445.webp`,
    ogImageAlt: 'Comité de direction en séminaire stratégique chez un producteur TerraGo',

    eyebrow: 'Selon vos enjeux',
    title: 'Séminaire CODIR',
    subtitle: 'Aligner et inspirer votre comité de direction.',
    lead:
      'Offrez à votre CODIR un cadre rare pour prendre de la hauteur : travail stratégique, rencontres authentiques et inspiration terrain, loin des salles de réunion classiques.',
    body: [
      'Un séminaire CODIR TerraGo combine temps de décision, immersion chez un producteur et moments de recul collectif — pour aligner vision, culture et priorités.',
      'Le format reste agile et confidentiel : idéal pour un comité restreint qui veut avancer concrètement tout en se ressourçant.',
      'Contrairement à un séminaire de plus grande ampleur, le format CODIR privilégie un lieu unique, un groupe restreint (6 à 15 personnes en général) et une logistique discrète, pensée pour des dirigeants qui doivent aussi traiter des sujets sensibles en toute confidentialité.',
      'L\u2019alternance entre séquences de travail stratégique et immersion terrain permet de sortir des postures habituelles de direction, ce qui favorise souvent des échanges plus francs entre membres du comité.',
    ],
    experiences: [
      'Sessions stratégiques dans un lieu inspirant',
      'Rencontre exclusive avec un producteur engagé',
      'Temps de recul et d\u2019alignement pour le comité',
      'Restitution et priorisation des prochaines décisions',
    ],
    programIntro:
      'une journée où l\u2019on prend de la hauteur, où l\u2019on travaille autrement et où l\u2019on partage une vraie expérience du territoire. Du café chez le producteur à la grande tablée, chaque temps est pensé pour faire avancer le collectif.',
    programHighlights: [
      {
        title: 'Café d\u2019accueil chez le producteur',
        description:
          'Café, viennoiseries locales et première rencontre avec celles et ceux qui font vivre le lieu.',
      },
      {
        title: 'Immersion dans le territoire',
        description:
          'Visite de l\u2019exploitation, découverte d\u2019un savoir-faire et échanges avec le producteur.',
      },
      {
        title: 'CODIR au vert',
        description:
          'Votre temps de travail stratégique dans un cadre qui change des salles de réunion traditionnelles.',
      },
      {
        title: 'Grande tablée & déjeuner guinguette',
        description:
          'Un repas local, convivial et généreux pour prolonger les échanges autrement.',
      },
      {
        title: 'Prendre de la hauteur',
        description:
          'Une activité ou une expérience collective pour sortir du cadre, créer du lien et faire émerger de nouvelles perspectives.',
      },
      {
        title: 'Décisions & souvenir du terroir',
        description:
          'Synthèse des décisions, mot de fin et produit local à emporter pour prolonger l\u2019expérience.',
      },
    ],
    exampleSeminar: {
      producerName: 'Nathalie & Benjamin',
      role: 'Producteurs engagés · Centre-Val de Loire',
      description:
        'Chez Nathalie et Benjamin, un CODIR restreint trouve un cadre inspirant pour prendre de la hauteur : immersion sur l\u2019exploitation, sessions stratégiques et moments authentiques autour du terroir. Disponible à la journée ou en résidentiel.',
      image: HOME_PRODUCERS[1].image,
      imageAlt: 'Nathalie et Benjamin, producteurs – exemple de séminaire CODIR TerraGo',
      seminaireSlug: 'avec-nathalie-benjamin',
    },
    faq: [
      {
        question: 'Pour combien de personnes un séminaire CODIR est-il pensé ?',
        answer:
          'Pour un comité restreint, en général entre 6 et 15 personnes. Au-delà, on perd la confidentialité et la qualité des échanges stratégiques. Mieux vaut alors un autre format, ou scinder le temps CODIR du temps élargi managers.',
      },
      {
        question: 'Comment gérez-vous la confidentialité des sujets abordés ?',
        answer:
          'Les lieux sont choisis pour leur discrétion et privatisation : pas de salle partagée avec d\u2019autres groupes le jour J. L\u2019équipe TerraGo et le producteur restent en retrait pendant vos séquences de travail ; seuls les moments d\u2019immersion et de repas sont partagés.',
      },
      {
        question: 'Qui anime les sessions stratégiques du comité ?',
        answer:
          'Souvent votre DG, votre facilitateur ou votre coach habituel. TerraGo n\u2019impose pas d\u2019intervenant. On structure le cadre (lieu, timing, immersion, pauses) pour que vos séquences de décision se tiennent dans de bonnes conditions, sans bruit logistique.',
      },
      {
        question: 'Pourquoi emmener un CODIR chez un producteur plutôt qu\u2019en salle de séminaire ?',
        answer:
          'Parce que le cadre change la qualité des échanges : hors open space et hors PowerPoint, les postures se desserrent. L\u2019immersion courte chez le producteur sert aussi de rupture utile entre deux séquences de travail. Beaucoup de comités en ressortent avec des conversations plus franches.',
      },
      {
        question: 'Peut-on faire un format résidentiel sur deux jours ?',
        answer:
          'Oui. Une journée suffit pour un CODIR dense ; deux jours permettent d\u2019alterner plus largement travail stratégique, immersion et temps informels du soir. On ajuste le dosage selon ce que vous devez trancher : priorités, organisation, feuille de route.',
      },
      {
        question: 'Quel délai pour organiser un séminaire CODIR ?',
        answer:
          'Quatre à six semaines donnent de la marge pour trouver un lieu discret et caler les agendas. Pour un créneau plus serré, on regarde d\u2019abord la disponibilité des producteurs partenaires les plus adaptés. On vous dit rapidement ce qui est réaliste ou non.',
      },
    ],
    relatedSlugs: ['inspiration-miroir', 'cohesion'],
    heroImage: `${HOME}/enjeux/codir4743505-31107445.webp`,
    heroImageAlt: 'Séminaire CODIR TerraGo chez un producteur',
    whyBackground: '#0c1d22',
    faqBackground: '#ffffff',
    whyImage: `${HOME}/enjeux/2334767487164.webp`,
    whyImageAlt: 'Salle de travail pour un séminaire CODIR hors les murs – TerraGo',
  },
  {
    slug: 'au-vert',
    name: 'Au vert',
    menuLabel: 'Séminaire au vert',

    metaTitle: 'Séminaire au vert en pleine nature | TerraGo',
    metaDescription:
      'Organisez un séminaire au vert avec TerraGo : randonnée, activités outdoor, découverte locale et moments partagés en pleine nature. Devis sous 48h.',
    keywords: [
      'séminaire au vert',
      'séminaire au vert entreprise',
      'séminaire nature entreprise',
      'séminaire outdoor',
      'séminaire en pleine nature',
      'team building nature',
      'team building outdoor',
      'séminaire randonnée entreprise',
      'séminaire à la ferme',
      'séminaire original entreprise',
    ],
    ogImage: `${HOME}/EXPERIENCES IMG/184912-seminaire-entreprise`,
    ogImageAlt: 'Paysage rural pour un séminaire au vert – TerraGo',

    eyebrow: 'Selon vos envies',
    title: 'Séminaire au vert',
    shortTitle: 'séminaire au vert',
    subtitle:
      'Sortez du cadre habituel et offrez à vos équipes un séminaire en pleine nature, entre activités de plein air, découvertes locales et moments partagés.',
    lead:
      'Quitter les bureaux, prendre l\u2019air et vivre une expérience collective dans un environnement qui change vraiment du quotidien.',
    body: [
      `Avec TerraGo, vos équipes partent au vert pour découvrir un territoire, pratiquer des [[activités en plein air|${HUB.auVert}]] et partager des moments simples, loin des salles de réunion impersonnelles.`,
      `Randonnée, découverte de la nature, défi collectif, [[atelier chez un producteur|${HUB.producteur}]], repas local ou activité de pleine nature : chaque séminaire est construit sur mesure selon votre équipe, votre [[destination|${HUB.destinations}]] et vos envies.`,
    ],
    experiences: [
      'Activités outdoor et pleine nature',
      'Défis et challenges collectifs',
      'Immersion chez un producteur',
      'Découverte de la gastronomie locale',
      'Ateliers autour du terroir et du savoir-faire',
      'Randonnée et découverte de la nature',
      'Moments de convivialité en extérieur',
    ],
    heroCta: {
      label: 'Parlons de votre séminaire au vert',
      action: 'modal',
    },
    afterIntro: {
      title: 'Et si votre prochain séminaire sortait vraiment du cadre ?',
      titleBold: 'sortait vraiment du cadre',
      paragraphs: [
        'Un séminaire au vert, ce n\u2019est pas seulement changer de lieu. C\u2019est donner à vos équipes l\u2019occasion de ralentir, de respirer et de vivre quelque chose ensemble.',
        `TerraGo imagine des journées où l\u2019on alterne [[activités|${HUB.experiences}]], découverte du territoire, temps de travail et moments de convivialité. Un cadre plus naturel pour favoriser les échanges et créer des souvenirs communs.`,
        'Ici, on vient au vert pour vivre une expérience, pas simplement pour travailler ailleurs.',
      ],
    },
    hideWhyCta: true,
    whyTitle: 'Pourquoi choisir un séminaire au vert ?',
    whyTitleBold: 'séminaire au vert',
    whyHighlights: [
      {
        title: 'Changer de décor',
        text: 'Sortir des bureaux permet de créer une vraie rupture avec le quotidien. Forêt, montagne, campagne, littoral ou vignoble : vos équipes découvrent un environnement qui invite à prendre du recul.',
      },
      {
        title: 'Créer du lien autrement',
        text: `Une randonnée, un défi collectif, un atelier ou une activité en plein air crée naturellement des occasions d\u2019échanger et de collaborer, loin des habitudes professionnelles. Découvrez aussi nos [[séminaires cohésion|${HUB.cohesion}]].`,
      },
      {
        title: 'Prendre le temps de se retrouver',
        text: 'Un séminaire au vert laisse davantage de place aux échanges informels : autour d\u2019un repas, pendant une balade ou simplement lors d\u2019un moment partagé en extérieur.',
      },
      {
        title: 'Découvrir un territoire',
        text: `Chaque destination possède ses paysages, ses savoir-faire, sa gastronomie et ses histoires. Nous construisons le séjour autour de ce qui rend le lieu unique. Explorez nos [[destinations|${HUB.destinations}]].`,
      },
    ],
    experiencesSection: {
      title: 'Des expériences au vert à vivre ensemble',
      titleBold: 'expériences au vert',
      intro:
        'Nature, gastronomie, découverte ou défi collectif : nous construisons un programme adapté à votre équipe.',
      body: [
        `Une randonnée pour découvrir un territoire. Un parcours d\u2019orientation pour apprendre à avancer ensemble. Une récolte [[chez un producteur|${HUB.producteur}]]. Un atelier cuisine. Une sortie à vélo. Une activité autour de la biodiversité. Une dégustation ou une grande tablée pour terminer la journée.`,
        `Vos équipes ne sont pas simplement spectatrices : elles participent, découvrent et vivent [[l\u2019expérience|${HUB.experiences}]] ensemble.`,
      ],
      listLead: 'Ce que vos équipes peuvent vivre :',
      cta: {
        label: 'Découvrir nos expériences',
        href: HUB.experiences,
      },
    },
    placesSection: {
      title: 'Où organiser votre séminaire au vert ?',
      titleBold: 'séminaire au vert',
      intro:
        'Du littoral aux montagnes, nous sélectionnons des lieux qui permettent de sortir du quotidien sans perdre le confort nécessaire à un événement d\u2019entreprise.',
      items: [
        {
          title: 'En pleine nature',
          text: 'Forêts, prairies, bocages ou grands espaces : des cadres propices à la déconnexion et aux activités en extérieur.',
          href: HUB.auVert,
          linkLabel: 'Découvrir les séminaires en pleine nature',
        },
        {
          title: 'À la ferme',
          text: 'Un environnement authentique pour combiner nature, savoir-faire, gastronomie et activités participatives.',
          href: HUB.ferme,
          linkLabel: 'Découvrir les séminaires à la ferme',
        },
        {
          title: 'Au vignoble',
          text: 'Entre paysages viticoles, découverte du terroir et moments de convivialité.',
          href: HUB.vignoble,
          linkLabel: 'Découvrir les séminaires au vignoble',
        },
        {
          title: 'Au bord de l\u2019eau',
          text: 'Littoral, lac ou rivière : un cadre idéal pour associer activités outdoor et temps de respiration.',
          href: HUB.eau,
          linkLabel: 'Découvrir les séminaires au bord de l\u2019eau',
        },
        {
          title: 'En montagne',
          text: 'Des paysages qui invitent à prendre de la hauteur, avec des activités adaptées à la saison et au niveau du groupe.',
          href: HUB.montagne,
          linkLabel: 'Découvrir les séminaires en montagne',
        },
      ],
      cta: {
        label: 'Découvrir tous nos lieux',
        href: HUB.destinations,
      },
    },
    formatsSection: {
      title: 'Un séminaire au vert pensé autour de vos enjeux',
      titleBold: 'pensé autour de vos enjeux',
      intro: 'Le cadre change, mais votre objectif reste au centre du séjour.',
      items: [
        {
          title: 'Cohésion',
          text: 'Renforcer les liens grâce à des expériences collectives.',
          href: HUB.cohesion,
          linkLabel: 'Nos séminaires cohésion',
        },
        {
          title: 'Sensibilisation & RSE',
          text: 'Découvrir concrètement les enjeux du vivant, de l\u2019agriculture et des territoires.',
          href: HUB.rse,
          linkLabel: 'Nos séminaires RSE & sensibilisation',
        },
        {
          title: 'Inspiration & miroir d\u2019entreprise',
          text: 'Prendre du recul et offrir un environnement propice aux échanges.',
          href: HUB.inspiration,
          linkLabel: 'Nos séminaires inspiration',
        },
        {
          title: 'CODIR',
          text: 'Alterner temps de réflexion, travail stratégique et moments de respiration.',
          href: HUB.codir,
          linkLabel: 'Nos séminaires CODIR',
        },
        {
          title: 'Team building',
          text: 'Relever des défis et partager une activité qui sort du quotidien.',
          href: HUB.experiences,
          linkLabel: 'Nos séminaires team building',
        },
      ],
      cta: {
        label: 'Découvrir nos formats de séminaires',
        href: HUB.seminaires,
      },
    },
    programIntro:
      'Une journée pensée pour alterner découverte, activité, échanges et convivialité — et adaptable à votre groupe.',
    programHighlights: [
      {
        title: 'Accueil café & produits locaux',
        description:
          'Commencer la journée tranquillement autour de produits du territoire.',
      },
      {
        title: 'Découverte du lieu et du territoire',
        description:
          'Visite, balade ou rencontre pour comprendre l\u2019environnement dans lequel vous êtes accueillis.',
      },
      {
        title: 'Activité en pleine nature',
        description:
          'Randonnée, défi collectif, atelier ou expérience immersive adaptée au groupe.',
      },
      {
        title: 'Déjeuner local',
        description:
          'Une pause conviviale autour de produits locaux et, lorsque c\u2019est possible, directement sur le lieu.',
      },
      {
        title: 'Temps collectif ou activité',
        description:
          'Poursuivre l\u2019expérience avec une activité de cohésion, une découverte ou un temps de travail.',
      },
      {
        title: 'Clôture & moment partagé',
        description:
          'Faire le bilan de la journée et repartir avec un souvenir du territoire.',
      },
    ],
    exampleLead:
      'Découvrez concrètement ce que TerraGo peut imaginer pour votre équipe.',
    exampleSeminar: {
      producerName: 'Hugues & Marc',
      role: 'Potager en permaculture · Annecy',
      description:
        'Chez Hugues & Marc, au potager en permaculture près d\u2019Annecy, vos équipes vivent une journée au vert entre découverte du territoire, activité collective, repas local et temps de convivialité. Un format imaginé pour sortir du quotidien tout en vivant une expérience profondément ancrée dans le lieu.',
      image:
        'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/potagermenthon/potager-chateau-menthon.webp',
      imageAlt: 'Hugues et Marc, potager du château – exemple de séminaire au vert TerraGo',
      seminaireSlug: 'avec-hugues-marc',
    },
    citiesSection: {
      title: 'Organisez votre séminaire au vert partout en France',
      titleBold: 'partout en France',
      intro:
        'Pas besoin de partir à l\u2019autre bout du pays pour changer de cadre. TerraGo construit des séminaires au vert à proximité des grandes villes françaises.',
      body: 'À quelques kilomètres des grandes villes comme au cœur des territoires ruraux, nous recherchons des lieux adaptés à votre groupe, à votre budget et à votre programme.',
      cities: [
        { name: 'Nantes', href: villeSeminairePath('nantes') },
        { name: 'Bordeaux', href: villeSeminairePath('bordeaux') },
        { name: 'Lyon', href: villeSeminairePath('lyon') },
        { name: 'Paris', href: villeSeminairePath('paris') },
        { name: 'Rennes', href: villeSeminairePath('rennes') },
        { name: 'Lille', href: villeSeminairePath('lille') },
        { name: 'Strasbourg', href: villeSeminairePath('strasbourg') },
        { name: 'Toulouse', href: villeSeminairePath('toulouse') },
        { name: 'Annecy', href: villeSeminairePath('annecy') },
        { name: 'Biarritz', href: villeSeminairePath('biarritz') },
        { name: 'La Rochelle', href: villeSeminairePath('la-rochelle') },
      ],
      cta: {
        label: 'Découvrir nos destinations',
        href: HUB.destinations,
      },
    },
    faqLead:
      'Une question sur l\u2019organisation d\u2019un séminaire au vert ? Consultez notre [[FAQ|/faq]] ou contactez-nous directement.',
    faq: [
      {
        question: 'Qu\u2019est-ce qu\u2019un séminaire au vert ?',
        answer: `Un séminaire au vert consiste à organiser un événement d\u2019entreprise dans un environnement naturel ou rural, à l\u2019écart du cadre de travail habituel. Il peut associer temps de travail, activités de plein air, découverte du territoire et moments de convivialité — [[en pleine nature|${HUB.auVert}]], [[à la ferme|${HUB.ferme}]], [[au vignoble|${HUB.vignoble}]] ou [[chez un producteur|${HUB.producteur}]].`,
      },
      {
        question: 'Pourquoi organiser un séminaire au vert ?',
        answer: `Changer d\u2019environnement permet de créer une véritable rupture avec le quotidien. La nature favorise les échanges informels et offre un cadre différent pour travailler, prendre du recul et partager une expérience collective. C\u2019est aussi un format idéal pour un [[séminaire cohésion|${HUB.cohesion}]] ou un [[séminaire original|${HUB.original}]].`,
      },
      {
        question: 'Où organiser un séminaire au vert ?',
        answer: `[[En pleine nature|${HUB.auVert}]], [[à la ferme|${HUB.ferme}]], [[au vignoble|${HUB.vignoble}]], [[au bord de l\u2019eau|${HUB.eau}]], [[en montagne|${HUB.montagne}]] ou dans un domaine au cœur d\u2019un territoire. TerraGo sélectionne des lieux dans différentes [[régions françaises|${HUB.destinations}]] selon le format recherché.`,
      },
      {
        question: 'Quelles activités proposer lors d\u2019un séminaire au vert ?',
        answer: `Randonnée, orientation, vélo, activités nature, défis collectifs, [[ateliers chez un producteur|${HUB.producteur}]], découverte du terroir, gastronomie ou activités sportives accessibles à tous. Le programme est adapté à votre équipe. Découvrez nos [[expériences entreprise|${HUB.experiences}]].`,
      },
      {
        question: 'Peut-on organiser un séminaire au vert avec hébergement ?',
        answer:
          'Oui. TerraGo peut construire des formats résidentiels sur plusieurs jours, avec hébergement, restauration, activités et organisation logistique.',
      },
      {
        question: 'Un séminaire au vert peut-il intégrer une démarche RSE ?',
        answer: `Oui. Le choix du lieu, les modes de transport, la restauration, les activités et les rencontres proposées peuvent être intégrés à une démarche RSE. TerraGo propose également des [[séminaires RSE|${HUB.rse}]] spécifiquement consacrés à la sensibilisation aux enjeux environnementaux.`,
      },
      {
        question: 'Combien coûte un séminaire au vert ?',
        answer:
          'Le budget dépend notamment du nombre de participants, de la durée, du lieu, de l\u2019hébergement, du transport et des activités choisies. Chaque programme est construit sur mesure et fait l\u2019objet d\u2019un devis.',
      },
      {
        question: 'Que faire en cas de mauvais temps ?',
        answer:
          'Chaque programme est pensé avec une alternative adaptée lorsque les conditions météo ne permettent pas de maintenir une activité extérieure. Atelier, visite, dégustation, activité couverte ou rencontre avec un producteur peuvent notamment prendre le relais.',
      },
    ],
    relatedSlugs: [],
    closing: {
      title: 'Et si votre prochain séminaire prenait l\u2019air ?',
      titleBold: 'prenait l\u2019air',
      lead: 'Une journée, deux jours ou davantage : racontez-nous ce que vous souhaitez faire vivre à votre équipe. Nous imaginons le reste.',
      cta: {
        label: 'Parlons de votre projet',
        action: 'modal',
      },
    },
    heroImage: `${HOME}/EXPERIENCES IMG/184912-seminaire-entreprise`,
    heroImageAlt: 'Paysage rural pour un séminaire au vert – TerraGo',
    whyImage: `${HOME}/EXPERIENCES%20IMG/apicutlure-au-vert.png`,
    whyImageAlt: 'Ruchers en forêt pour un séminaire au vert – TerraGo',
  },
  {
    slug: 'original',
    name: 'Original',
    menuLabel: 'Séminaire original',

    metaTitle: 'Séminaire d\u2019entreprise original | TerraGo',
    metaDescription:
      'Organisez un séminaire d\u2019entreprise original avec TerraGo : immersion chez un producteur, défi collectif, gastronomie, nature et expériences sur mesure. Devis sous 48h.',
    keywords: [
      'séminaire original',
      'séminaire d\u2019entreprise original',
      'séminaire original entreprise',
      'idée séminaire entreprise',
      'activité originale séminaire',
      'team building original',
      'séminaire immersif',
      'séminaire chez un producteur',
      'séminaire gastronomique entreprise',
      'séminaire défi collectif',
    ],
    ogImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/03782491.webp',
    ogImageAlt: 'Table de séminaire d\u2019entreprise original en extérieur – TerraGo',

    eyebrow: 'Selon vos envies',
    title: 'Séminaire d\u2019entreprise original',
    shortTitle: 'séminaire d\u2019entreprise original',
    subtitle:
      'Sortez des formats habituels et faites vivre à vos équipes une expérience qu\u2019elles n\u2019auront pas déjà vécue.',
    lead:
      'Un séminaire original, ce n\u2019est pas simplement changer de salle ou ajouter une activité à votre programme. C\u2019est proposer à vos équipes une expérience qui crée de la surprise, de la curiosité et surtout des souvenirs communs.',
    body: [
      `Avec TerraGo, nous imaginons des séminaires qui sortent des formats standardisés : immersion [[chez un producteur|${HUB.producteur}]], activité [[en pleine nature|${HUB.auVert}]], défi collectif, découverte d\u2019un savoir-faire, atelier gastronomique ou expérience inattendue.`,
      `Le programme est construit sur mesure selon votre équipe, votre [[destination|${HUB.destinations}]], votre budget et l\u2019objectif de votre événement.`,
    ],
    experiences: [
      'récolter des produits directement dans une exploitation',
      'participer à un atelier de fabrication',
      'partir en randonnée ou en exploration',
      'relever un défi gastronomique en équipe',
      'découvrir un métier ou un savoir-faire local',
      'participer à un chantier de plantation ou à une action concrète',
      'organiser un rallye à la découverte d\u2019un territoire',
      'partager une dégustation ou un repas directement chez leur hôte',
    ],
    heroCta: {
      label: 'Demander un devis',
      action: 'modal',
    },
    introBackground: '#f4f4f4',
    themesBackground: '#f4f4f4',
    hideWhyCta: true,
    whyTitle: 'Sortez du séminaire d\u2019entreprise classique',
    whyTitleBold: 'séminaire d\u2019entreprise classique',
    whyLead:
      'Hôtel, salle de réunion, déjeuner et activité de team building : vos équipes ont peut-être déjà vécu ce format.',
    whyHighlights: [
      {
        title: 'Changer de décor et de manière de vivre',
        text: `TerraGo propose de changer de décor et surtout de manière de vivre le séminaire. Ici, l\u2019activité devient une véritable expérience et le lieu fait partie intégrante du programme.`,
      },
      {
        title: 'Vivre plutôt qu\u2019assister',
        text: `Mettre les mains dans la terre, partir à la rencontre d\u2019un producteur, relever un défi autour du terroir, explorer un territoire ou partager une grande tablée : l\u2019originalité vient d\u2019abord de ce que vos équipes vont réellement vivre.`,
      },
      {
        title: 'Une expérience mémorable',
        text: `L\u2019objectif n\u2019est pas d\u2019ajouter une animation de plus, mais de créer de la surprise, de la curiosité et des souvenirs communs qui restent bien après le jour J.`,
      },
    ],
    experiencesSection: {
      title: 'Des expériences originales à vivre avec votre équipe',
      titleBold: 'expériences originales',
      intro:
        'Nature, gastronomie, savoir-faire, aventure ou découverte : nous sélectionnons des expériences qui donnent une vraie personnalité à votre séminaire.',
      body: [
        'Vos collaborateurs peuvent par exemple participer à des formats concrets, adaptés au groupe et au niveau d\u2019engagement souhaité.',
        `Chaque [[expérience|${HUB.experiences}]] est construite pour faire vivre quelque chose ensemble — pas seulement pour divertir.`,
      ],
      listLead: 'Vos collaborateurs peuvent par exemple :',
      layout: 'image-left',
      image:
        'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/6006735-31694875.webp',
      imageAlt: 'Récolte d\u2019olives lors d\u2019un séminaire original TerraGo',
      background: '#ffffff',
      cta: {
        label: 'Découvrir nos expériences',
        href: HUB.experiences,
      },
    },
    themesTitle: 'Des idées de séminaires qui changent vraiment',
    themesTitleBold: 'qui changent vraiment',
    themesIntro:
      'Quelques exemples de formats que nous pouvons imaginer pour votre entreprise.',
    themes: [
      {
        emoji: '🌱',
        title: 'Les mains dans la terre',
        description:
          'Récolte, plantation, maraîchage, vendanges ou découverte d\u2019une exploitation : une activité concrète qui permet de faire ensemble plutôt que simplement assister.',
        href: HUB.ferme,
      },
      {
        emoji: '🍽️',
        title: 'Autour du terroir',
        description:
          'Défi cuisine, découverte des produits locaux, dégustation, fabrication ou repas partagé : la gastronomie devient un terrain de jeu collectif.',
        href: HUB.experiences,
      },
      {
        emoji: '🥾',
        title: 'En pleine nature',
        description:
          'Randonnée, orientation, vélo, découverte de la biodiversité ou défi outdoor : sortez les équipes du cadre professionnel pour leur faire découvrir un territoire autrement.',
        href: HUB.auVert,
      },
      {
        emoji: '🧀',
        title: 'À la rencontre d\u2019un savoir-faire',
        description:
          'Fromager, vigneron, brasseur, apiculteur, ostréiculteur, artisan ou producteur : vos équipes découvrent un métier et participent directement à l\u2019expérience.',
        href: HUB.producteur,
      },
      {
        emoji: '🏆',
        title: 'Avec un défi collectif',
        description:
          'Construire, cuisiner, récolter, résoudre, créer ou relever un challenge ensemble : des activités pensées pour favoriser naturellement les échanges et la coopération.',
        href: HUB.cohesion,
      },
    ],
    placesSection: {
      title: 'L\u2019originalité commence par le lieu',
      titleBold: 'commence par le lieu',
      intro:
        'Un séminaire peut prendre une toute autre dimension lorsque le lieu devient une partie de l\u2019expérience. Ferme, vignoble, domaine, montagne, bord de mer, forêt, potager, brasserie artisanale ou lieu d\u2019exception : TerraGo sélectionne des cadres qui permettent de sortir du quotidien et de donner une vraie identité à votre événement.',
      background: '#ffffff',
      items: [
        {
          title: 'Chez le producteur',
          text: 'Immersion dans un savoir-faire vivant, loin des salles de réunion impersonnelles.',
          href: HUB.producteur,
          linkLabel: 'Découvrir les séminaires chez le producteur',
        },
        {
          title: 'À la ferme',
          text: 'Un cadre authentique pour mettre les mains dans la terre et partager le quotidien d\u2019une exploitation.',
          href: HUB.ferme,
          linkLabel: 'Découvrir les séminaires à la ferme',
        },
        {
          title: 'Au vignoble',
          text: 'Paysages viticoles, découverte du terroir et moments de convivialité.',
          href: HUB.vignoble,
          linkLabel: 'Découvrir les séminaires au vignoble',
        },
        {
          title: 'En pleine nature',
          text: 'Forêts, grands espaces et activités outdoor pour changer vraiment de décor.',
          href: HUB.auVert,
          linkLabel: 'Découvrir les séminaires en pleine nature',
        },
        {
          title: 'Dans un domaine d\u2019exception',
          text: 'Des lieux rares et inspirants pour donner une identité forte à votre événement.',
          href: lieuDestinationPath('domaine-d-exception'),
          linkLabel: 'Découvrir les domaines d\u2019exception',
        },
      ],
      cta: {
        label: 'Découvrir nos destinations',
        href: HUB.destinations,
      },
    },
    formatsSection: {
      title: 'Un séminaire original, mais pensé autour de vos objectifs',
      titleBold: 'pensé autour de vos objectifs',
      intro:
        'L\u2019originalité ne doit jamais être une fin en soi. Votre séminaire doit avant tout répondre à ce que vous souhaitez faire vivre à votre équipe.',
      items: [
        {
          title: 'Cohésion',
          text: 'Créer du lien à travers une expérience collective.',
          href: HUB.cohesion,
          linkLabel: 'Nos séminaires cohésion',
        },
        {
          title: 'Sensibilisation & RSE',
          text: 'Découvrir concrètement les enjeux du vivant et des territoires.',
          href: HUB.rse,
          linkLabel: 'Nos séminaires RSE & sensibilisation',
        },
        {
          title: 'Inspiration',
          text: 'Prendre du recul et faire émerger de nouvelles idées.',
          href: HUB.inspiration,
          linkLabel: 'Nos séminaires inspiration',
        },
        {
          title: 'Au vert',
          text: 'Sortir du quotidien et reconnecter les équipes à la nature.',
          href: HUB.auVertPage,
          linkLabel: 'Nos séminaires au vert',
        },
        {
          title: 'CODIR',
          text: 'Alterner réflexion stratégique, échanges et expériences.',
          href: HUB.codir,
          linkLabel: 'Nos séminaires CODIR',
        },
      ],
      cta: {
        label: 'Découvrir nos séminaires selon vos enjeux',
        href: HUB.seminaires,
      },
    },
    programPosition: 'before-example',
    programBackground: '#f4f4f4',
    exampleBackground: '#ffffff',
    faqBackground: '#ffffff',
    programTitle: 'Un séminaire original, de l\u2019idée au jour J',
    programTitleBold: 'de l\u2019idée au jour J',
    programIntro:
      'Vous avez une idée précise ou simplement envie de proposer quelque chose de différent à vos équipes ? Partagez-nous votre brief. Vous nous donnez l\u2019objectif. Nous imaginons l\u2019expérience.',
    programHighlights: [
      {
        title: 'Partagez votre brief',
        description:
          'Objectif, taille du groupe, destination souhaitée, budget et contraintes : nous partons de votre besoin, même s\u2019il n\u2019est encore qu\u2019une envie.',
      },
      {
        title: 'Recherche du lieu',
        description:
          'Nous sélectionnons un cadre qui donne une vraie identité à votre événement — ferme, vignoble, nature, domaine ou lieu d\u2019exception.',
      },
      {
        title: 'Imagination du programme',
        description:
          'Nous construisons un déroulé sur mesure qui alterne découverte, activité, échanges et convivialité.',
      },
      {
        title: 'Sélection des activités',
        description:
          'Expériences immersives, défis collectifs, ateliers et rencontres : chaque activité est adaptée à votre équipe.',
      },
      {
        title: 'Coordination des partenaires',
        description:
          'Producteurs, hôtes, prestataires : nous orchestrons les différents acteurs nécessaires à votre événement.',
      },
      {
        title: 'Hébergement, restauration & transport',
        description:
          'Selon vos besoins, nous intégrons l\u2019hébergement, la restauration, le transport et les différents temps de travail.',
      },
    ],
    exampleLead:
      'Découvrez concrètement ce que TerraGo peut imaginer pour votre équipe.',
    exampleSeminar: {
      producerName: 'Baptiste',
      role: 'Producteur de piments · Pays basque',
      description:
        'Chez Baptiste, vos équipes découvrent l\u2019univers du piment à travers une journée qui mêle visite de l\u2019exploitation, challenges collaboratifs, atelier autour du savoir-faire local et repas traditionnel basque. Un format qui permet de sortir complètement du cadre habituel tout en créant de vrais moments de partage.',
      image:
        'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/pimentsbaptiste/baptiste_producteur_piment.webp',
      imageAlt: 'Baptiste, producteur de piments – exemple de séminaire original TerraGo',
      seminaireSlug: 'avec-baptiste',
    },
    citiesSection: {
      title: 'Où organiser un séminaire original ?',
      titleBold: 'séminaire original',
      intro:
        'Paris, Lyon, Bordeaux, Nantes, Marseille, Toulouse ou ailleurs : l\u2019originalité peut commencer à quelques kilomètres de vos bureaux. TerraGo organise des séminaires partout en France, dans des lieux choisis pour leur caractère et les expériences qu\u2019ils permettent de vivre. Autour des grandes villes comme au cœur des territoires ruraux, nous recherchons le lieu et le programme qui correspondent à votre équipe.',
      background: '#f4f4f4',
      cities: [
        { name: 'Paris', href: villeSeminairePath('paris') },
        { name: 'Lyon', href: villeSeminairePath('lyon') },
        { name: 'Bordeaux', href: villeSeminairePath('bordeaux') },
        { name: 'Nantes', href: villeSeminairePath('nantes') },
        { name: 'Marseille', href: villeSeminairePath('marseille') },
        { name: 'Toulouse', href: villeSeminairePath('toulouse') },
        { name: 'Annecy', href: villeSeminairePath('annecy') },
        { name: 'Montpellier', href: villeSeminairePath('montpellier') },
        { name: 'Biarritz', href: villeSeminairePath('biarritz') },
        { name: 'Valence', href: villeSeminairePath('valence') },
        { name: 'La Rochelle', href: villeSeminairePath('la-rochelle') },
      ],
      cta: {
        label: 'Découvrir toutes nos destinations',
        href: HUB.destinations,
      },
    },
    faqLead:
      'Une question sur l\u2019organisation d\u2019un séminaire original ? Consultez notre [[FAQ|/faq]] ou contactez-nous directement.',
    faq: [
      {
        question: 'Qu\u2019est-ce qu\u2019un séminaire d\u2019entreprise original ?',
        answer: `Un séminaire original sort des formats classiques pour proposer aux équipes une expérience différente, construite autour d\u2019un lieu, d\u2019une activité ou d\u2019une rencontre qui crée de véritables souvenirs communs — [[chez un producteur|${HUB.producteur}]], [[en pleine nature|${HUB.auVert}]] ou autour du terroir.`,
      },
      {
        question: 'Quelles sont les meilleures idées de séminaire d\u2019entreprise ?',
        answer: `Cela dépend de votre équipe et de votre objectif. Parmi les formats possibles : immersion [[chez un producteur|${HUB.producteur}]], défi gastronomique, randonnée, [[activité nature|${HUB.auVert}]], découverte d\u2019un savoir-faire, atelier participatif ou challenge collectif. Explorez nos [[expériences entreprise|${HUB.experiences}]].`,
      },
      {
        question: 'Quelle activité originale choisir pour un séminaire ?',
        answer:
          'L\u2019activité doit être adaptée au nombre de participants, au niveau de forme du groupe, à la saison et surtout à l\u2019objectif du séminaire. TerraGo peut vous proposer plusieurs formats à partir de votre brief.',
      },
      {
        question: 'Peut-on organiser un séminaire original avec hébergement ?',
        answer:
          'Oui. Nous pouvons construire des formats résidentiels sur plusieurs jours avec hébergement, restauration, activités et coordination.',
      },
      {
        question: 'Peut-on personnaliser entièrement un séminaire original ?',
        answer:
          'Oui. Le lieu, les activités, le rythme, la restauration, l\u2019hébergement et les différents temps collectifs peuvent être adaptés à votre entreprise.',
      },
      {
        question: 'Combien coûte un séminaire original ?',
        answer:
          'Le prix dépend notamment du nombre de participants, du lieu, de la durée, des activités, de l\u2019hébergement et du transport. TerraGo établit une proposition sur mesure à partir de votre projet.',
      },
      {
        question: 'Où organiser un séminaire original en France ?',
        answer: `TerraGo propose des expériences dans de nombreuses [[régions françaises|${HUB.destinations}]], à proximité des grandes villes comme dans des territoires ruraux. Le choix du lieu dépend du type d\u2019expérience recherché.`,
      },
      {
        question: 'Combien de participants peut accueillir un séminaire original ?',
        answer:
          'Nous adaptons le programme à la taille du groupe et aux capacités du lieu. Des formats peuvent être imaginés aussi bien pour une petite équipe que pour des groupes plus importants.',
      },
    ],
    relatedSlugs: [],
    closing: {
      title:
        'Et si votre prochain séminaire était celui dont vos équipes parleront encore demain ?',
      titleBold: 'parleront encore demain',
      lead: 'Partagez-nous votre idée, même si elle n\u2019est encore qu\u2019une envie. Nous imaginons avec vous un séminaire différent, cohérent et adapté à votre équipe.',
      cta: {
        label: 'Demander un devis',
        action: 'modal',
      },
    },
    heroImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/03782491.webp',
    heroImageAlt: 'Séminaire d\u2019entreprise original – TerraGo',
    whyImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/vignoble/vign3.jpg',
    whyImageAlt: 'Vignoble pour un séminaire d\u2019entreprise original – TerraGo',
  },
];

export function getSeminaireEnjeu(slug: string): SeminaireEnjeu | undefined {
  return SEMINAIRE_ENJEUX.find((e) => e.slug === slug);
}

export function seminaireEnjeuPath(slug: string): string {
  return `/seminaires-entreprise/${slug}`;
}

/** Retire la syntaxe `[[libellé|/chemin]]` pour le texte brut (JSON-LD, etc.). */
export function stripInlineLinks(text: string): string {
  return text.replace(/\[\[([^\]|]+)\|[^\]]+\]\]/g, '$1');
}
