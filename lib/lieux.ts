import { HOME_PRODUCERS, REGION_IMAGES } from './homeStorage';

const HOME =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME';

export const LIEU_SLUGS = [
  'chez-le-producteur',
  'au-vignoble',
  'a-la-ferme',
  'au-bord-de-leau',
  'en-montagne',
  'en-pleine-nature',
  'domaine-d-exception',
  'au-coeur-des-terroirs',
] as const;

export type LieuSlug = (typeof LIEU_SLUGS)[number];

export type LieuPro = {
  title: string;
  text: string;
};

export type LieuProgrammeDay = {
  label: string;
  items: string[];
};

export type LieuFaqItem = {
  q: string;
  a: string;
};

export type DestinationLieu = {
  slug: LieuSlug;
  /** Libellé menu / cartes : « Chez le producteur » */
  name: string;
  /** Phrase pour titres : « chez le producteur » */
  phrase: string;
  /** Eyebrow hero : « Séminaire chez le producteur » */
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  heroImageAlt: string;
  /** Crédit photo hero (ex. « Youza Ecolodge ») — absente = pas de copyright. */
  heroImageCopyright?: string;
  intro: string[];
  prosImage: string;
  prosImageAlt: string;
  prosImageCopyright?: string;
  pros: LieuPro[];
  formatsLead: string;
  formats: string[];
  prosClosing: string;
  programmeAccent: string;
  programmeSummary: string;
  programmeDays: LieuProgrammeDay[];
  producer: {
    name: string;
    role: string;
    description: string;
    image: string;
    imageAlt: string;
    imageCopyright?: string;
  };
  logement: {
    title: string;
    description: string;
    images: { src: string; alt: string; copyright?: string }[];
    highlights: string[];
  };
  faq: LieuFaqItem[];
};

export function lieuDestinationPath(slug: string): string {
  return `/destinations/lieux/${slug}`;
}

const SHARED_FAQ_TAIL: LieuFaqItem[] = [
  {
    q: 'Combien de participants pouvez-vous accueillir ?',
    a: 'De petits comités à des groupes plus larges : nous adaptons le lieu, l’hébergement et les activités selon la taille de votre équipe.',
  },
  {
    q: 'Quel délai faut-il prévoir pour organiser le séminaire ?',
    a: 'Idéalement plusieurs mois à l’avance pour sécuriser les meilleurs partenaires. Des demandes plus urgentes restent possibles selon les disponibilités.',
  },
  {
    q: 'Comment obtenir un devis ?',
    a: 'Partagez votre brief via le formulaire : nous revenons rapidement avec une proposition sur mesure, adaptée à vos objectifs et à votre budget.',
  },
];

function regionImg(slug: (typeof REGION_IMAGES)[number]['slug']): string {
  return REGION_IMAGES.find((r) => r.slug === slug)!.image;
}

export const LIEUX: DestinationLieu[] = [
  {
    slug: 'chez-le-producteur',
    name: 'Chez le producteur',
    phrase: 'chez le producteur',
    eyebrow: 'Séminaire chez le producteur',
    metaTitle: 'Séminaire chez un producteur | TerraGo',
    metaDescription:
      'Organisez un séminaire d’entreprise chez le producteur avec TerraGo : immersion terroir, ateliers concrets, team building RSE et hébergement de caractère partout en France.',
    heroImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/producteur/578192052.jpg',
    heroImageAlt: 'Maison de producteur pour séminaire d’entreprise – TerraGo',
    heroImageCopyright: 'Marine Van-den-Broek',
    intro: [
      'Un séminaire d’entreprise chez le producteur, c’est sortir de la salle de réunion pour vivre le geste, comprendre un métier et fédérer vos équipes autour du réel.',
      'TerraGo sélectionne des exploitations engagées — maraîchers, éleveurs, artisans du goût — capables d’accueillir des groupes et de transmettre un savoir-faire avec authenticité.',
      'Travail stratégique le matin, immersion producteur l’après-midi, dîner produit local le soir : un format qui crée du lien, du sens et des souvenirs durables.',
    ],
    prosImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/producteur/Sol-Sologne-Loiret-table-Marine-Van-den-Broek-responsive.jpg',
    prosImageAlt: 'Table dressée face à la forêt chez un producteur',
    prosImageCopyright: 'Marine Van-den-Broek',
    pros: [
      {
        title: 'Une immersion qui marque les esprits',
        text: 'Vos collaborateurs ne regardent plus un PowerPoint : ils touchent, goûtent, questionnent. L’expérience reste ancrée bien après le séminaire.',
      },
      {
        title: 'Du sens pour vos enjeux RSE',
        text: 'Circuits courts, agroécologie, transmission : un cadre idéal pour incarner vos engagements et aligner discours et pratique.',
      },
    ],
    formatsLead: 'Nous organisons notamment :',
    formats: [
      'Séminaire résidentiel chez le producteur (2 ou 3 jours)',
      'Journée d’étude + atelier immersion',
      'Team building producteur et dégustation',
      'Convention RSE autour du vivant',
    ],
    prosClosing:
      'Chaque programme est cocréé selon vos objectifs, la taille du groupe et le type d’exploitation souhaité.',
    programmeAccent: 'programme type',
    programmeSummary:
      'Un séminaire chez le producteur combine temps de travail efficaces et rencontres humaines fortes — parfait pour cohésion, inspiration et ancrage territorial.',
    programmeDays: [
      {
        label: 'Jour 1',
        items: [
          'Accueil sur l’exploitation et installation',
          'Briefing & icebreaker outdoor',
          'Visite guidée et découverte du métier',
          'Dîner produit local et soirée conviviale',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Matinée de travail (salle ou outdoor)',
          'Atelier les mains dans la terre ou en atelier',
          'Dégustation et temps d’échange avec le producteur',
          'Restitution créative en équipe',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Session stratégique courte',
          'Activité nature ou suite d’atelier',
          'Déjeuner de clôture',
          'Départs',
        ],
      },
    ],
    producer: {
      name: 'Nathalie & Benjamin',
      role: 'Producteurs engagés',
      description:
        'Partagez le quotidien de Nathalie et Benjamin : visite de l’exploitation, atelier concret et dégustation. Une immersion humaine qui renforce le lien d’équipe et donne du sens à votre séminaire.',
      image: HOME_PRODUCERS[1].image,
      imageAlt: 'Nathalie et Benjamin, producteurs partenaires TerraGo',
      imageCopyright: 'Marine Van-den-Broek',
    },
    logement: {
      title: 'Hébergements proches des exploitations',
      description:
        'Gîtes, fermes rénovées ou maisons d’hôtes à proximité des producteurs : des lieux chaleureux, adaptés aux groupes et alignés avec l’esprit TerraGo.',
      images: [
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/producteur/7852905.jpg',
          alt: 'Ferme rénovée au milieu des arbres pour séminaire',
          copyright: 'Marine Van-den-Broek',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/producteur/41906523-Marine-Van-den-Broek',
          alt: 'Salon convivial dans une maison de producteur',
          copyright: 'Marine Van-den-Broek',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/producteur/859241-Marine-Van-den-Broek.webp',
          alt: 'Espace détente extérieur chez un producteur',
          copyright: 'Marine Van-den-Broek',
        },
      ],
      highlights: [
        'Proximité des ateliers producteur',
        'Capacité groupe et espaces de travail',
        'Cuisine locale et circuits courts',
      ],
    },
    faq: [
      {
        q: 'Pourquoi organiser un séminaire d’entreprise chez le producteur ?',
        a: 'Pour sortir du cadre classique, créer une expérience mémorable et ancrer votre événement dans le réel — idéal pour cohésion, RSE et inspiration.',
      },
      {
        q: 'Peut-on travailler sérieusement sur place ?',
        a: 'Oui. Nous sélectionnons des lieux avec salles équipées ou espaces outdoor adaptés, tout en gardant le fil de l’immersion producteur.',
      },
      ...SHARED_FAQ_TAIL,
    ],
  },
  {
    slug: 'au-vignoble',
    name: 'Au vignoble',
    phrase: 'au vignoble',
    eyebrow: 'Séminaire au vignoble',
    metaTitle: 'Séminaire au vignoble | TerraGo',
    metaDescription:
      'Organisez un séminaire d’entreprise au vignoble avec TerraGo : domaines viticoles, ateliers de dégustation, team building et hébergements de caractère en France.',
    heroImage: regionImg('bourgogne'),
    heroImageAlt: 'Séminaire d’entreprise au vignoble – domaine TerraGo',
    intro: [
      'Un séminaire d’entreprise au vignoble allie élégance du terroir, moments de partage et cadre inspirant pour faire avancer vos projets.',
      'Entre rangs de vignes, caves et domaines, TerraGo imagine des programmes où le travail rencontre la culture du vin et la transmission des vignerons.',
      'Idéal pour fédérer une équipe, accueillir des partenaires ou célébrer une étape clé — sans tomber dans le cliché « afterwork dégustation ».',
    ],
    prosImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/vignoble/vign5.jpeg',
    prosImageAlt: 'Allée de cyprès menant à un domaine viticole',
    pros: [
      {
        title: 'Un cadre premium et authentique',
        text: 'Domaines de caractère, paysages viticoles et hospitalité soignée : le vignoble pose naturellement une ambiance qualitative et fédératrice.',
      },
      {
        title: 'Des expériences qui créent du lien',
        text: 'Visite de cave, atelier d’assemblage, balade dans les vignes : des activités concrètes qui font collaborer autrement.',
      },
    ],
    formatsLead: 'Nous organisons notamment :',
    formats: [
      'Séminaire résidentiel au vignoble',
      'Journée d’étude + visite de domaine',
      'Team building viticole et dégustation',
      'Événement partenaires dans un château ou domaine',
    ],
    prosClosing:
      'Nous adaptons le niveau de dégustation, le rythme et les activités à votre culture d’entreprise et à vos objectifs.',
    programmeAccent: 'programme type',
    programmeSummary:
      'Le vignoble offre un équilibre rare entre sérieux du travail, beauté des lieux et expériences sensorielles — parfait pour un événement d’entreprise réussi.',
    programmeDays: [
      {
        label: 'Jour 1',
        items: [
          'Arrivée et installation dans le domaine',
          'Ouverture du séminaire et tour des vignes',
          'Atelier découverte du terroir',
          'Dîner et dégustation commentée',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Matinée de travail en salle équipée',
          'Immersion cave ou atelier d’assemblage',
          'Temps d’échange avec le vigneron',
          'Restitution et soirée conviviale',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Session stratégique courte',
          'Balade dans le vignoble ou activité nature',
          'Déjeuner de clôture',
          'Départs',
        ],
      },
    ],
    producer: {
      name: 'Jean-François',
      role: 'Distillateur & vigneron',
      description:
        'Chez Jean-François, vos équipes plongent dans l’univers du Cognac : visite des chais, transmission du geste et dégustation. Une immersion vignoble élégante et fédératrice, au plus près du savoir-faire.',
      image: '/images/producteurs/cognacJF.png',
      imageAlt: 'Jean-François, distillateur et vigneron – séminaire au vignoble TerraGo',
    },
    logement: {
      title: 'Domaines et chambres d’hôtes viticoles',
      description:
        'Châteaux, maisons de vigneron ou lodges au cœur des appellations : des hébergements élégants, adaptés aux groupes et proches des expériences.',
      images: [
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/vignoble/vign3.jpg',
          alt: 'Domaine viticole au pied d’une colline boisée',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/vignoble/vign4.jpg',
          alt: 'Château de Saint-Martin pour séminaire au vignoble',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/vignoble/vign2.jpg',
          alt: 'Maison en pierre pour hébergement au vignoble',
        },
      ],
      highlights: [
        'Salles de travail dans le domaine',
        'Dégustations et cuisine locale',
        'Cadre premium sans ostentation',
      ],
    },
    faq: [
      {
        q: 'Un séminaire au vignoble convient-il à tous les groupes ?',
        a: 'Oui. Nous proposons aussi des formats sans alcool ou avec dégustations légères, ainsi que des ateliers nature et cuisine complémentaires.',
      },
      {
        q: 'Dans quelles régions organisez-vous des séminaires au vignoble ?',
        a: 'Bourgogne, Provence, Occitanie, Nouvelle-Aquitaine et bien d’autres : nous choisissons le terroir selon votre départ, vos dates et votre budget.',
      },
      ...SHARED_FAQ_TAIL,
    ],
  },
  {
    slug: 'a-la-ferme',
    name: 'À la ferme',
    phrase: 'à la ferme',
    eyebrow: 'Séminaire à la ferme',
    metaTitle: 'Séminaire à la ferme | TerraGo',
    metaDescription:
      'Organisez un séminaire d’entreprise à la ferme avec TerraGo : immersion agricole, ateliers concrets, team building nature et hébergement authentique.',
    heroImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/ferme/8953021.jpg',
    heroImageAlt: 'Maraîcher dans une serre pour séminaire à la ferme – TerraGo',
    heroImageCopyright: 'Pierine di Giacomo',
    intro: [
      'Un séminaire d’entreprise à la ferme reconnecte vos équipes au vivant : grand air, gestes concrets et hospitalité rurale.',
      'TerraGo collabore avec des fermes capables d’accueillir des groupes — élevage, maraîchage, cultures — pour des programmes utiles, chaleureux et mémorables.',
      'Loin des open spaces, vos collaborateurs retrouvent un rythme plus humain, sans perdre en efficacité stratégique.',
    ],
    prosImage: `${HOME}/maraicher-explication.png`,
    prosImageAlt: 'Atelier à la ferme pour séminaire d’entreprise',
    prosImageCopyright: 'Pierine di Giacomo',
    pros: [
      {
        title: 'Une authenticité qui fédère',
        text: 'La ferme crée naturellement de la complicité : on apprend ensemble, on partage un repas, on comprend un métier réel.',
      },
      {
        title: 'Un terrain de jeu pour la RSE',
        text: 'Biodiversité, alimentation durable, lien au territoire : des sujets incarnés, pas théoriques.',
      },
    ],
    formatsLead: 'Nous organisons notamment :',
    formats: [
      'Séminaire résidentiel à la ferme',
      'Journée team building agricole',
      'Atelier maraîchage ou élevage',
      'Événement RSE et circuits courts',
    ],
    prosClosing:
      'Nous veillons au confort, à la logistique et à la qualité des salles tout en préservant l’âme du lieu.',
    programmeAccent: 'programme type',
    programmeSummary:
      'La ferme offre un cadre ressourçant et concret pour un séminaire d’entreprise réussi — idéal pour cohésion et sens partagé.',
    programmeDays: [
      {
        label: 'Jour 1',
        items: [
          'Arrivée et installation à la ferme',
          'Icebreaker outdoor et présentation du lieu',
          'Découverte de l’exploitation',
          'Dîner fermier et soirée conviviale',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Matinée de travail',
          'Atelier agricole (récolte, soin, transformation…)',
          'Temps d’échange avec l’exploitant',
          'Restitution en équipe',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Session stratégique',
          'Balade ou activité nature',
          'Déjeuner de clôture',
          'Départs',
        ],
      },
    ],
    producer: {
      name: 'Benoît',
      role: 'Producteur maraîcher',
      description:
        'Chez Louise & Benoît, vos équipes découvrent une ferme maraîchère engagée près de Paris : circuits courts, gestes durables et immersion terrain. Une expérience ferme authentique et fédératrice pour vos équipes.',
      image:
        'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/clefs%20ferme/Benoit.jpg',
      imageAlt: 'Benoît, producteur maraîcher – séminaire à la ferme TerraGo',
      imageCopyright: 'Pierine di Giacomo',
    },
    logement: {
      title: 'Gîtes et fermes adaptées aux groupes',
      description:
        'Fermes rénovées, gîtes spacieux ou maisons d’hôtes rurales : des hébergements authentiques, confortables et proches des activités.',
      images: [
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/ferme/730507323.jpg',
          alt: 'Bar en bois outdoor pour séminaire à la ferme',
          copyright: 'Pierine di Giacomo',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/ferme/794104642.jpg',
          alt: 'Salon rustique chic dans une ferme rénovée',
          copyright: 'Pierine di Giacomo',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/ferme/723951348.jpg',
          alt: 'Hébergement à la ferme pour séminaire d’entreprise',
          copyright: 'Pierine di Giacomo',
        },
      ],
      highlights: [
        'Espaces groupe et salles de travail',
        'Ambiance chaleureuse',
        'Produits de la ferme à table',
      ],
    },
    faq: [
      {
        q: 'Un séminaire à la ferme est-il confortable pour une entreprise ?',
        a: 'Oui. Nous sélectionnons des fermes équipées pour l’accueil de groupes, avec un niveau de confort adapté à vos standards.',
      },
      {
        q: 'Quelles activités proposez-vous à la ferme ?',
        a: 'Ateliers agricoles, transformation alimentaire, découverte animale, cuisine produit local — toujours sur mesure selon la saison.',
      },
      ...SHARED_FAQ_TAIL,
    ],
  },
  {
    slug: 'au-bord-de-leau',
    name: 'Au bord de l’eau',
    phrase: 'au bord de l’eau',
    eyebrow: 'Séminaire au bord de l’eau',
    metaTitle: 'Séminaire au bord de l’eau | TerraGo',
    metaDescription:
      'Organisez un séminaire d’entreprise au bord de l’eau avec TerraGo : lac, rivière ou océan, activités outdoor, rencontres producteur et hébergements inspirants.',
    heroImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/bord-eau/7859012.avif',
    heroImageAlt: 'Terrasse face au lac pour séminaire au bord de l’eau – TerraGo',
    intro: [
      'Un séminaire d’entreprise au bord de l’eau change immédiatement le tempo : horizon, lumière et respiration pour mieux travailler ensemble.',
      'Lacs, rivières, bassins ou littoral : TerraGo conçoit des programmes où le cadre naturel soutient la réflexion et la cohésion.',
      'Entre sessions stratégiques, activités outdoor et rencontres locales, vos équipes repartent recentrées et reconnectées.',
    ],
    prosImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/bord-eau/8941041.jpg',
    prosImageAlt: 'Élevage d’huîtres au bord de l’eau',
    pros: [
      {
        title: 'Un cadre qui détend et inspire',
        text: 'L’eau apaise naturellement : vos collaborateurs se rendent disponibles pour échanger, décider et créer.',
      },
      {
        title: 'Des activités outdoor mémorables',
        text: 'Kayak, balade, ateliers ostréicoles ou nature : des expériences qui fédèrent sans forcer.',
      },
    ],
    formatsLead: 'Nous organisons notamment :',
    formats: [
      'Séminaire résidentiel en bord de lac ou d’océan',
      'Journée d’étude face à l’eau',
      'Team building nautique ou ostréicole',
      'Événement RSE autour des milieux aquatiques',
    ],
    prosClosing:
      'Nous adaptons le programme à la saison, à la météo et au niveau d’activité souhaité.',
    programmeAccent: 'programme type',
    programmeSummary:
      'Le bord de l’eau offre un décor puissant pour un séminaire d’entreprise réussi : accessibilité, inspiration et activités concrètes.',
    programmeDays: [
      {
        label: 'Jour 1',
        items: [
          'Arrivée et installation face à l’eau',
          'Ouverture outdoor et icebreaker',
          'Découverte du territoire (port, lac, bassin…)',
          'Dîner produit local',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Matinée de travail',
          'Activité outdoor ou immersion producteur',
          'Temps de dégustation / échange',
          'Restitution collective',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Session stratégique courte',
          'Balade ou kayak selon saison',
          'Déjeuner de clôture',
          'Départs',
        ],
      },
    ],
    producer: {
      name: 'Baptiste',
      role: 'Producteur engagé',
      description:
        'Complétez le cadre aquatique par une rencontre producteur forte. Baptiste accueille vos équipes pour une immersion vive et fédératrice, idéale en duo avec un séjour au bord de l’eau.',
      image: HOME_PRODUCERS[0].image,
      imageAlt: 'Producteur partenaire TerraGo – séminaire bord de l’eau',
    },
    logement: {
      title: 'Lodges et maisons face à l’eau',
      description:
        'Maisons d’hôtes, lodges ou domaines en bord de lac, de rivière ou d’océan : des lieux inspirants, adaptés aux groupes et proches des activités.',
      images: [
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/bord-eau/78529510.jpg',
          alt: 'Domaine avec plage et piscine au bord d’un lac',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/bord-eau/789520.avif',
          alt: 'Hôtel face à l’océan au coucher du soleil',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/bord-eau/78539052.jpg',
          alt: 'Hébergement pour séminaire au bord de l’eau',
        },
      ],
      highlights: [
        'Vue et accès à l’eau',
        'Salles de travail équipées',
        'Activités outdoor à proximité',
      ],
    },
    faq: [
      {
        q: 'Peut-on organiser un séminaire au bord de l’eau toute l’année ?',
        a: 'Oui. Nous adaptons les activités outdoor et prévoyons des alternatives couvertes selon la saison et la météo.',
      },
      {
        q: 'Quels types de plans d’eau proposez-vous ?',
        a: 'Lacs, rivières, estuaires, bassins ostréicoles ou littoral atlantique / méditerranéen selon votre brief.',
      },
      ...SHARED_FAQ_TAIL,
    ],
  },
  {
    slug: 'en-montagne',
    name: 'En montagne',
    phrase: 'en montagne',
    eyebrow: 'Séminaire en montagne',
    metaTitle: 'Séminaire en montagne | TerraGo',
    metaDescription:
      'Organisez un séminaire d’entreprise en montagne avec TerraGo : grands espaces, activités outdoor, rencontres producteur et hébergements de caractère.',
    heroImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/MONTAGNE/98317677686-27139098.jpg',
    heroImageAlt: 'Vallée et sommets enneigés pour séminaire en montagne – TerraGo',
    intro: [
      'Un séminaire d’entreprise en montagne offre altitude, silence et grands espaces pour prendre de la hauteur — au sens propre comme au figuré.',
      'TerraGo y conçoit des programmes entre sessions de travail, outdoor et rencontres locales, pour un impact humain fort.',
      'Idéal pour ressourcer une équipe, accélérer une stratégie ou marquer un temps fort hors des sentiers battus.',
    ],
    prosImage: regionImg('auvergne'),
    prosImageAlt: 'Paysage de montagne pour séminaire d’entreprise',
    pros: [
      {
        title: 'Un cadre qui change la perspective',
        text: 'La montagne coupe le bruit ambiant et ouvre l’espace mental : vos décisions gagnent en clarté.',
      },
      {
        title: 'Outdoor et cohésion naturelle',
        text: 'Randonnées, ateliers nature, rencontres producteur d’altitude : des expériences qui soudent sans artifice.',
      },
    ],
    formatsLead: 'Nous organisons notamment :',
    formats: [
      'Séminaire résidentiel en montagne',
      'Journée d’étude + activité outdoor',
      'Team building nature en altitude',
      'Retreat stratégique et RSE',
    ],
    prosClosing:
      'Nous anticipons accessibilité, saisonnalité et niveau sportif pour un déroulé fluide et inclusif.',
    programmeAccent: 'programme type',
    programmeSummary:
      'La montagne est un accélérateur de cohésion : cadre puissant, activités outdoor et moments de partage authentiques.',
    programmeDays: [
      {
        label: 'Jour 1',
        items: [
          'Arrivée et installation en altitude',
          'Ouverture du séminaire face aux paysages',
          'Icebreaker outdoor adapté au groupe',
          'Dîner local et soirée conviviale',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Matinée de travail',
          'Randonnée ou atelier nature / producteur',
          'Temps d’échange et dégustation locale',
          'Restitution collective',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Session stratégique',
          'Activité outdoor douce',
          'Déjeuner de clôture',
          'Départs',
        ],
      },
    ],
    producer: {
      name: 'Hugues & Marc',
      role: 'Producteurs / potager de château',
      description:
        'Rencontrez Hugues et Marc pour une immersion jardin et terroir : un contrepoint vivant au cadre montagne, pour ancrer votre séminaire dans le geste et le partage.',
      image: HOME_PRODUCERS[3].image,
      imageAlt: 'Producteurs partenaires TerraGo – séminaire montagne',
    },
    logement: {
      title: 'Chalets, lodges et maisons de caractère',
      description:
        'Hébergements spacieux en altitude ou en moyenne montagne : confort groupe, salles de travail et accès rapide aux activités outdoor.',
      images: [
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/MONTAGNE/Chalet-les-granges-Auvergne-montagne-responsive.webp',
          alt: 'Chalet avec vue sur les sommets pour séminaire en montagne',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/MONTAGNE/5728195.png',
          alt: 'Balcon de chalet face aux montagnes',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/MONTAGNE/1f3d3862.webp',
          alt: 'Chalet enneigé pour séminaire en montagne',
        },
      ],
      highlights: [
        'Grands espaces et calme',
        'Salles équipées',
        'Accès activités outdoor',
      ],
    },
    faq: [
      {
        q: 'Faut-il être sportif pour un séminaire en montagne ?',
        a: 'Non. Nous calibrons les activités selon le groupe : options douces, alternatives indoor et formats inclusifs.',
      },
      {
        q: 'Quelles saisons sont idéales ?',
        a: 'Printemps et automne sont souvent parfaits. L’hiver et l’été fonctionnent aussi avec un programme adapté.',
      },
      ...SHARED_FAQ_TAIL,
    ],
  },
  {
    slug: 'en-pleine-nature',
    name: 'En pleine nature',
    phrase: 'en pleine nature',
    eyebrow: 'Séminaire en pleine nature',
    metaTitle: 'Séminaire en pleine nature | TerraGo',
    metaDescription:
      'Organisez un séminaire d’entreprise en pleine nature avec TerraGo : forêts, grands espaces, team building outdoor et expériences producteur engagées.',
    heroImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/nature/645728910.webp',
    heroImageAlt: 'Séminaire d’entreprise en pleine nature – TerraGo',
    heroImageCopyright: 'Youza Ecolodge',
    intro: [
      'Un séminaire d’entreprise en pleine nature place vos équipes au cœur des forêts, campagnes et paysages sauvages — loin du bruit, près de l’essentiel.',
      'TerraGo y compose des programmes entre travail stratégique, outdoor et rencontres producteur, pour un impact durable sur la cohésion.',
      'Moins de slides, plus de présence : un format idéal pour inspirer, recentrer et faire avancer vos projets collectifs.',
    ],
    prosImage: `${HOME}/Noisettes-recolte.png`,
    prosImageAlt: 'Séminaire outdoor en pleine nature',
    pros: [
      {
        title: 'Un ressourcement immédiat',
        text: 'La nature baisse le stress et ouvre la créativité : vos sessions de travail gagnent en qualité.',
      },
      {
        title: 'Des expériences outdoor fédératrices',
        text: 'Balades, ateliers forêt, immersions producteur : des moments concrets qui créent du souvenir commun.',
      },
    ],
    formatsLead: 'Nous organisons notamment :',
    formats: [
      'Séminaire résidentiel nature',
      'Journée d’étude outdoor',
      'Team building forêt / campagne',
      'Retreat RSE et biodiversité',
    ],
    prosClosing:
      'Chaque programme reste sur mesure : intensité outdoor, niveau de confort et objectifs business.',
    programmeAccent: 'programme type',
    programmeSummary:
      'La pleine nature est le terrain idéal pour un séminaire d’entreprise porteur de sens — inspiration, cohésion et ancrage.',
    programmeDays: [
      {
        label: 'Jour 1',
        items: [
          'Arrivée et installation au calme',
          'Ouverture outdoor et icebreaker nature',
          'Découverte du territoire',
          'Dîner produit local',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Matinée de travail',
          'Atelier nature ou immersion producteur',
          'Temps d’échange et dégustation',
          'Restitution créative',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Session stratégique',
          'Balade ou activité douce',
          'Déjeuner de clôture',
          'Départs',
        ],
      },
    ],
    producer: {
      name: 'Suzanna',
      role: 'Éleveuse de bufflones',
      description:
        'Rencontrez Suzanna pour une immersion singulière en pleine nature : visite de l’élevage, découverte du métier et dégustation. Une expérience authentique et fédératrice au grand air.',
      image: HOME_PRODUCERS[4].image,
      imageAlt: 'Suzanna, éleveuse – séminaire en pleine nature TerraGo',
    },
    logement: {
      title: 'Écolodges et maisons au calme',
      description:
        'Hébergements nature, lodges ou maisons d’hôtes isolées : confort groupe, silence et proximité immédiate des activités outdoor.',
      images: [
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/nature/674289.jpg',
          alt: 'Lodge en bois au cœur de la forêt pour séminaire en pleine nature',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/nature/74289013.png',
          alt: 'Domaine isolé au milieu des arbres vu du ciel',
          copyright: 'Youza Ecolodge',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/nature/52367489.jpg',
          alt: 'Salle de séminaire avec vue sur la nature',
        },
      ],
      highlights: [
        'Calme et grand air',
        'Espaces de travail',
        'Proximité des expériences',
      ],
    },
    faq: [
      {
        q: 'Un séminaire en pleine nature reste-t-il professionnel ?',
        a: 'Oui. Nous combinons salles équipées (ou setups outdoor sérieux) et expériences nature, sans sacrifier vos objectifs.',
      },
      {
        q: 'Que faire en cas de mauvais temps ?',
        a: 'Nous prévoyons toujours un plan B couvert : ateliers producteur, salles, activités indoor adaptées.',
      },
      ...SHARED_FAQ_TAIL,
    ],
  },
  {
    slug: 'domaine-d-exception',
    name: 'Domaine d’exception',
    phrase: 'dans un domaine d’exception',
    eyebrow: 'Séminaire dans un domaine d’exception',
    metaTitle: 'Séminaire dans un domaine d’exception | TerraGo',
    metaDescription:
      'Organisez un séminaire d’entreprise dans un domaine d’exception avec TerraGo : lieux rares, expériences premium, team building terroir et hébergement inspirant.',
    heroImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/exception/1111.jpg',
    heroImageAlt: 'Soirée d’entreprise dans un domaine d’exception – TerraGo',
    intro: [
      'Un séminaire d’entreprise dans un domaine d’exception pose un cadre rare : architecture, parc, terroir et hospitalité soignée.',
      'TerraGo sélectionne des lieux inspirants — domaines, demeures, propriétés de caractère — pour des événements qui marquent durablement vos équipes et vos partenaires.',
      'Luxe discret, expériences authentiques et programmes sur mesure : l’élégance au service du collectif.',
    ],
    prosImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/exception/111112.jpg',
    prosImageAlt: 'Grande salle en pierre d’un domaine d’exception',
    pros: [
      {
        title: 'Un lieu qui parle pour vous',
        text: 'Recevoir dans un domaine d’exception envoie un signal fort : attention, exigence et sens du détail.',
      },
      {
        title: 'Premium sans perdre l’âme',
        text: 'Chez TerraGo, le cadre exceptionnel s’accompagne toujours d’expériences terroir et de rencontres humaines réelles.',
      },
    ],
    formatsLead: 'Nous organisons notamment :',
    formats: [
      'Séminaire résidentiel dans un domaine',
      'Convention et lancement produit',
      'Événement partenaires premium',
      'Retreat stratégique de direction',
    ],
    prosClosing:
      'Nous cocréons un déroulé à la hauteur du lieu — du premier accueil au dernier détail de table.',
    programmeAccent: 'programme type',
    programmeSummary:
      'Le domaine d’exception est idéal pour les temps forts d’entreprise : cadre rare, confort haut de gamme et expériences mémorables.',
    programmeDays: [
      {
        label: 'Jour 1',
        items: [
          'Accueil et installation dans le domaine',
          'Ouverture du séminaire et visite du lieu',
          'Atelier ou expérience signature',
          'Dîner d’exception et soirée',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Matinée de travail en salle premium',
          'Immersion producteur ou atelier terroir',
          'Temps libre dans le parc / domaine',
          'Restitution et dîner',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Session stratégique',
          'Activité douce ou dégustation',
          'Déjeuner de clôture',
          'Départs',
        ],
      },
    ],
    producer: {
      name: 'Suzanna',
      role: 'Productrice de bufflones',
      description:
        'Ajoutez une rencontre producteur singulière à votre séjour dans un domaine d’exception. Suzanna propose une immersion authentique, surprenante et très fédératrice.',
      image: HOME_PRODUCERS[4].image,
      imageAlt: 'Suzanna, productrice – séminaire domaine TerraGo',
    },
    logement: {
      title: 'Demeures et domaines pour vos équipes',
      description:
        'Chambres d’hôtes d’exception, suites dans le domaine ou propriétés privatisables : confort, intimité et services adaptés aux groupes corporate.',
      images: [
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/exception/1121221.webp',
          alt: 'Terrasse dressée d’un domaine d’exception',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/exception/12213313.jpg',
          alt: 'Domaine viticole vu du ciel pour séminaire',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/exception/12234.jpg',
          alt: 'Domaine avec piscines au milieu des collines',
        },
      ],
      highlights: [
        'Privatisation possible',
        'Salles et services premium',
        'Expériences terroir associées',
      ],
    },
    faq: [
      {
        q: 'Qu’appelez-vous un domaine d’exception ?',
        a: 'Un lieu rare par son architecture, son parc, son histoire ou son hospitalité — capable d’accueillir un groupe dans d’excellentes conditions.',
      },
      {
        q: 'Ces lieux sont-ils adaptés aux séminaires de travail ?',
        a: 'Oui. Nous vérifions salles, wifi, capacité et logistique avant de vous proposer un domaine.',
      },
      ...SHARED_FAQ_TAIL,
    ],
  },
  {
    slug: 'au-coeur-des-terroirs',
    name: 'Au cœur des terroirs',
    phrase: 'au cœur des terroirs',
    eyebrow: 'Séminaire au cœur des terroirs',
    metaTitle: 'Séminaire au cœur des terroirs | TerraGo',
    metaDescription:
      'Organisez un séminaire d’entreprise au cœur des terroirs avec TerraGo : immersion locale, producteurs, gastronomie et hébergements authentiques partout en France.',
    heroImage: regionImg('occitanie'),
    heroImageAlt: 'Séminaire d’entreprise au cœur des terroirs – TerraGo',
    intro: [
      'Un séminaire d’entreprise au cœur des terroirs, c’est plonger vos équipes dans la culture locale : producteurs, saveurs, paysages et savoir-faire.',
      'TerraGo conçoit des itinéraires immersifs où chaque moment — travail, atelier, repas — raconte un territoire vivant.',
      'Le format idéal pour une expérience authentique, fédératrice et alignée avec une démarche RSE ou une culture d’entreprise engagée.',
    ],
    prosImage: `${HOME}/repas-convivial.png`,
    prosImageAlt: 'Immersion terroir pour séminaire d’entreprise',
    pros: [
      {
        title: 'Une immersion locale complète',
        text: 'Plus qu’une activité isolée : un fil narratif autour du territoire, de ses gens et de ses produits.',
      },
      {
        title: 'Du sens partagé durablement',
        text: 'Vos collaborateurs repartent avec des souvenirs concrets et une compréhension vivante de l’ancrage local.',
      },
    ],
    formatsLead: 'Nous organisons notamment :',
    formats: [
      'Séminaire immersif multi-producteurs',
      'Parcours terroir sur 2 ou 3 jours',
      'Team building gastronomique local',
      'Événement RSE et circuits courts',
    ],
    prosClosing:
      'Nous construisons un récit de territoire sur mesure, selon la région et vos objectifs humains.',
    programmeAccent: 'programme type',
    programmeSummary:
      'Au cœur des terroirs, votre séminaire devient une expérience culturelle et humaine — idéale pour fédérer et inspirer.',
    programmeDays: [
      {
        label: 'Jour 1',
        items: [
          'Arrivée et installation dans le territoire',
          'Ouverture et découverte du contexte local',
          'Première rencontre producteur',
          'Dîner terroir',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Matinée de travail',
          'Atelier producteur ou cuisine locale',
          'Dégustation et échange',
          'Restitution collective',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Session stratégique',
          'Seconde immersion ou balade terroir',
          'Déjeuner de clôture',
          'Départs',
        ],
      },
    ],
    producer: {
      name: 'Baptiste',
      role: 'Producteur de piments',
      description:
        'Rencontrez Baptiste pour une immersion colorée et fédératrice au cœur des terroirs : visite, atelier et dégustation. Une expérience vive, concrète et pleine d’énergie pour vos équipes.',
      image: HOME_PRODUCERS[0].image,
      imageAlt: 'Baptiste, producteur de piments – séminaire au cœur des terroirs TerraGo',
    },
    logement: {
      title: 'Maisons et domaines ancrés localement',
      description:
        'Hébergements choisis pour leur lien au territoire : maisons d’hôtes, domaines ou gîtes à proximité des producteurs et des expériences.',
      images: [
        { src: regionImg('occitanie'), alt: 'Hébergement au cœur des terroirs' },
        { src: regionImg('provence'), alt: 'Cadre terroir pour séminaire' },
        { src: `${HOME}/maraicher-explication.png`, alt: 'Rencontre producteur terroir' },
      ],
      highlights: [
        'Ancrage local fort',
        'Proximité producteurs',
        'Cuisine de territoire',
      ],
    },
    faq: [
      {
        q: 'En quoi un séminaire « au cœur des terroirs » est-il différent ?',
        a: 'Il met le territoire au centre du récit : plusieurs rencontres, produits locaux et un fil conducteur culturel, pas seulement une activité isolée.',
      },
      {
        q: 'Peut-on le faire près de notre siège ?',
        a: 'Souvent oui. La France regorge de terroirs accessibles : nous trouvons l’immersion juste à la distance qui vous convient.',
      },
      ...SHARED_FAQ_TAIL,
    ],
  },
];

export function getLieu(slug: string): DestinationLieu | undefined {
  return LIEUX.find((l) => l.slug === slug);
}

export function getRelatedLieux(slug: LieuSlug, count = 2): DestinationLieu[] {
  const index = LIEUX.findIndex((l) => l.slug === slug);
  if (index < 0) return LIEUX.slice(0, count);
  const related: DestinationLieu[] = [];
  for (let offset = 1; related.length < count && offset < LIEUX.length; offset++) {
    related.push(LIEUX[(index + offset) % LIEUX.length]);
  }
  return related;
}
