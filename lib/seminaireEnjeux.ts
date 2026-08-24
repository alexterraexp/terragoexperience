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
} as const;

export const SEMINAIRE_ENJEU_SLUGS = [
  'cohesion',
  'sensibilisation-rse',
  'inspiration-miroir',
  'codir',
  'au-vert',
] as const;

export type SeminaireEnjeuSlug = (typeof SEMINAIRE_ENJEU_SLUGS)[number];

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
  /** Section expériences dédiée (la liste orange est alors masquée). */
  experiencesSection?: {
    title: string;
    titleBold?: string;
    intro: string;
    body: string[];
    listLead?: string;
    cta?: SeminaireEnjeuCta;
  };
  placesSection?: {
    title: string;
    titleBold?: string;
    intro: string;
    items: SeminaireEnjeuLinkBlock[];
    cta?: SeminaireEnjeuCta;
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
  };
  exampleCta?: SeminaireEnjeuCta;
  faqLead?: string;
  closing?: {
    title: string;
    titleBold?: string;
    lead: string;
    cta: SeminaireEnjeuCta;
  };
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
    ogImage: `${HOME}/enjeux/184022935847.jpg`,
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
        'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/pimentsbaptiste/baptiste_producteur_piment.jpg',
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
        answer: `TerraGo imagine des [[séminaires originaux|${HUB.experiences}]] qui sortent des formats classiques : immersion [[chez un producteur|${HUB.producteur}]], randonnée, découverte d\u2019un savoir-faire, [[activité nature|${HUB.auVert}]], défi collectif, atelier gastronomique ou expérience autour du terroir. Chaque programme est construit sur mesure.`,
      },
      {
        question: 'Peut-on organiser un team building original avec TerraGo ?',
        answer: `Oui. TerraGo propose des activités de [[team building|${HUB.experiences}]] originales qui privilégient l\u2019expérience vécue, la découverte et la coopération. Elles peuvent se dérouler [[chez un producteur|${HUB.producteur}]], [[en pleine nature|${HUB.auVert}]] ou dans un lieu sélectionné selon votre projet.`,
      },
    ],
    relatedSlugs: ['sensibilisation-rse', 'inspiration-miroir'],
    heroImage: `${HOME}/enjeux/184022935847.jpg`,
    heroImageAlt: 'Séminaire cohésion d\u2019équipe chez un producteur – TerraGo',
    whyImage: `${HOME}/enjeux/8164316.jpg`,
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
    ogImage: `${HOME}/enjeux/2430570603-31667165.jpg`,
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
        'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/clefs%20ferme/Benoit.jpg',
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
    heroImage: `${HOME}/enjeux/2430570603-31667165.jpg`,
    heroImageAlt: 'Séminaire RSE chez un producteur – TerraGo',
    whyImage: `${HOME}/enjeux/5420570603-31667159.jpg`,
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
    ogImage: `${HOME}/enjeux/RSE76311867-28102052.jpg`,
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
        'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/potagermenthon/potager-chateau-menthon.jpg',
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
    heroImage: `${HOME}/enjeux/RSE76311867-28102052.jpg`,
    heroImageAlt: 'Séminaire inspiration et miroir d\u2019entreprise – TerraGo',
    whyImage: `${HOME}/enjeux/003515756747.jpg`,
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
    ogImage: `${HOME}/enjeux/codir4743505-31107445.jpg`,
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
    heroImage: `${HOME}/enjeux/codir4743505-31107445.jpg`,
    heroImageAlt: 'Séminaire CODIR TerraGo chez un producteur',
    whyImage: `${HOME}/enjeux/2334767487164.jpg`,
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

    eyebrow: 'Selon vos enjeux',
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
        'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/potagermenthon/potager-chateau-menthon.jpg',
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
        answer: `Changer d\u2019environnement permet de créer une véritable rupture avec le quotidien. La nature favorise les échanges informels et offre un cadre différent pour travailler, prendre du recul et partager une expérience collective. C\u2019est aussi un format idéal pour un [[séminaire cohésion|${HUB.cohesion}]] ou un [[séminaire original|${HUB.experiences}]].`,
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
