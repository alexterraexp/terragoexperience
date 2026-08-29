import {
  HOME_PRODUCERS,
  REGION_IMAGES,
  regionDestinationPath,
  type LieuSlug,
} from './homeStorage';

export { LIEU_SLUGS, type LieuSlug, LIEU_PATH_SLUGS, lieuDestinationPath } from './homeStorage';

const HOME =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME';

/** Pages stratégiques pour le maillage interne (ancres dans le contenu). */
const PATH = {
  rse: '/seminaires-entreprise/sensibilisation-rse',
  provence: regionDestinationPath('provence-alpes-cote-d-azur'),
  nouvelleAquitaine: regionDestinationPath('nouvelle-aquitaine'),
  ileDeFrance: regionDestinationPath('ile-de-france'),
  bourgogne: regionDestinationPath('bourgogne-franche-comte'),
  auvergne: regionDestinationPath('auvergne-rhone-alpes'),
  bretagne: regionDestinationPath('bretagne'),
  paris: '/seminaire-entreprise-paris',
  laRochelle: '/seminaire-entreprise-la-rochelle',
  clermont: '/seminaire-entreprise-clermont-ferrand',
} as const;

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
    /** Slug `/exemples-seminaire-entreprise/[slug]` pour ce producteur */
    seminaireSlug?: string;
  };
  logement: {
    title: string;
    description: string;
    images: { src: string; alt: string; copyright?: string }[];
    highlights: string[];
  };
  faq: LieuFaqItem[];
};

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
    metaTitle: 'Séminaire à la rencontre d’un producteur | TerraGo',
    metaDescription:
      'Organisez un séminaire d’entreprise à la rencontre d’un producteur avec TerraGo : immersion terroir, ateliers concrets, team building RSE et hébergement de caractère partout en France.',
    heroImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/producteur/578192052.jpg',
    heroImageAlt: 'Maison de producteur pour séminaire d’entreprise – TerraGo',
    heroImageCopyright: 'Marine Van-den-Broek',
    intro: [
      'Un séminaire d’entreprise chez le producteur, c’est sortir de la salle de réunion pour découvrir un métier, vivre un savoir-faire et fédérer vos équipes autour du réel.',
      `TerraGo sélectionne des exploitations engagées capables d’accueillir des groupes et de transmettre leur métier. Du [[séminaire en Provence-Alpes-Côte d’Azur|${PATH.provence}]] aux exploitations de [[Nouvelle-Aquitaine|${PATH.nouvelleAquitaine}]], chaque lieu permet de créer une expérience différente.`,
      'Fabrication de son propre fromage, récolte des olives, atelier ostréicole, cordage de piments, découverte des ateliers de production ou immersion dans une ferme : le programme alterne naturellement temps de travail, immersion sur le terrain et moments de convivialité. Une matinée peut être consacrée à une réflexion stratégique avant de laisser place à l’immersion et à un repas préparé autour des productions du lieu.',
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
        text: `Circuits courts, agroécologie, transmission : un cadre idéal pour incarner vos engagements de [[sensibilisation RSE|${PATH.rse}]] et aligner discours et pratique.`,
      },
    ],
    formatsLead: 'Nous organisons notamment :',
    formats: [
      'Séminaire résidentiel chez le producteur (2 jours ou plus)',
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
          'Accueil de l’équipe chez le producteur et découverte de l’exploitation',
          'Visite des espaces de production et rencontre avec le producteur',
          'Plénière d’ouverture dans la grange ou sous une tente en extérieur',
          'Grande tablée fermière et soirée conviviale',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Défi sportif & course d’orientation dans les chemins agricoles',
          'Atelier TerraGo : fabrication de fromage, pain, miel ou autre spécialité locale',
          'Temps de réflexion en sous-groupes dans le jardin ou au milieu des cultures',
          'Dégustation à l’aveugle et quiz terroir',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Balade à vélo entre fermes, villages et paysages agricoles',
          'Immersion dans les gestes du quotidien de l’exploitation',
          'Restitution et priorisation autour d’une grande table sous les arbres',
          'Déjeuner de terroir dans la grange',
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
      seminaireSlug: 'avec-nathalie-benjamin',
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
    heroImage: regionImg('bourgogne-franche-comte'),
    heroImageAlt: 'Séminaire d’entreprise au vignoble – domaine TerraGo',
    intro: [
      'Réunir une équipe au milieu des vignes permet de donner une autre dimension au séminaire d’entreprise, avec un cadre propice à la réflexion, aux échanges et à la découverte.',
      `TerraGo imagine des [[séminaires responsables|${PATH.rse}]] dans des domaines capables d’accueillir les équipes pour travailler et vivre une véritable immersion. La [[Bourgogne-Franche-Comté|${PATH.bourgogne}]] comme la [[Provence-Alpes-Côte d’Azur|${PATH.provence}]] offrent des terroirs particulièrement adaptés.`,
      'Rencontre avec le vigneron, découverte des parcelles, visite du chai, dégustation à l’aveugle ou participation à un geste de production : le programme alterne naturellement temps de travail, immersion sur le terrain et moments de convivialité. Une plénière peut se tenir dans une grange ou sous les arbres avant une découverte du domaine et un dîner entre les vignes.',
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
          'Accueil de l’équipe dans un domaine viticole et balade dans les vignes',
          'Rencontre avec le vigneron et découverte des chais',
          'Réunion d’ouverture entre les vignes',
          'Dîner au domaine et soirée autour du raisin',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Rally VTT à travers les paysages viticoles',
          'Atelier d’assemblage et création de sa propre cuvée',
          'Atelier stratégique installé dans le chai',
          'Dégustation à l’aveugle et soirée Quizz',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Temps de travail sur la terrasse du domaine',
          'Balade et pique-nique en forêt',
          'Session de synthèse sur la terrasse du domaine',
          'Départs',
        ],
      },
    ],
    producer: {
      name: 'Jean-François',
      role: 'Distillateur & vigneron',
      description:
        'Chez Jean-François, vos équipes plongent dans l’univers du Cognac : visite des chais, transmission du geste et dégustation. Une immersion vignoble élégante et fédératrice, au plus près du savoir-faire.',
      image: '/images/producteurs/cognacJF.webp',
      imageAlt: 'Jean-François, distillateur et vigneron – séminaire au vignoble TerraGo',
      seminaireSlug: 'avec-jean-francois',
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
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/vignoble/vign4.webp',
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
        a: `[[Séminaire en Bourgogne-Franche-Comté|${PATH.bourgogne}]], [[séminaire en Provence-Alpes-Côte d’Azur|${PATH.provence}]], Occitanie, Nouvelle-Aquitaine et bien d’autres : nous choisissons le terroir selon votre départ, vos dates et votre budget.`,
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
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/ferme/8953021.webp',
    heroImageAlt: 'Maraîcher dans une serre pour séminaire à la ferme – TerraGo',
    heroImageCopyright: 'Pierine di Giacomo',
    intro: [
      'Une ferme offre un cadre particulièrement adapté au séminaire d’entreprise au vert, avec de l’espace, du vivant et des activités qui permettent de faire réellement autre chose ensemble.',
      `TerraGo sélectionne des fermes capables d’accueillir des groupes et de proposer une immersion dans leur quotidien. Ces lieux permettent d’imaginer des séminaires en [[Île-de-France|${PATH.ileDeFrance}]] tout en restant facilement accessibles depuis [[Paris|${PATH.paris}]].`,
      'Fabrication de fromage, découverte d’un élevage, récolte de saison, atelier maraîcher ou rencontre avec l’agriculteur : le programme alterne naturellement temps de travail, immersion sur le terrain et moments de convivialité. Une réflexion collective peut se tenir dans le jardin ou la grange avant une immersion dans l’exploitation et un repas autour des productions de la ferme.',
    ],
    prosImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/ferme/730507119.jpg',
    prosImageAlt: 'Outils de jardinage à la ferme pour séminaire d’entreprise',
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
          'Accueil de l’équipe à la ferme et rencontre avec l’éleveur',
          'Découverte des animaux, des pâturages et des installations',
          'Plénière d’ouverture dans la grange',
          'Dîner fermier autour d’une grande tablée',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Randonnée ou trail sur les chemins ruraux',
          'Fabrication de son propre fromage',
          'Temps de réflexion dans le jardin ou au milieu des pâturages',
          'Soirée barbecue fermier',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Course d’orientation à travers les chemins agricoles',
          'Participation aux gestes du quotidien de l’éleveur',
          'Restitution dans la cour de la ferme',
          'Déjeuner de produits locaux',
        ],
      },
    ],
    producer: {
      name: 'Benoît',
      role: 'Producteur maraîcher',
      description:
        'Chez Louise & Benoît, vos équipes découvrent une ferme maraîchère engagée près de Paris : circuits courts, gestes durables et immersion terrain. Une expérience ferme authentique et fédératrice pour vos équipes.',
      image:
        'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/clefs%20ferme/Benoit.webp',
      imageAlt: 'Benoît, producteur maraîcher – séminaire à la ferme TerraGo',
      imageCopyright: 'Pierine di Giacomo',
      seminaireSlug: 'avec-louise-benoit',
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
      'Organiser un séminaire d’entreprise au bord de l’eau, c’est offrir aux équipes un cadre qui change immédiatement le rythme de la journée.',
      `Littoral, rivière, lac ou estuaire : TerraGo imagine des programmes dans des lieux où l’environnement devient une véritable partie de l’expérience. La [[Nouvelle-Aquitaine|${PATH.nouvelleAquitaine}]] offre notamment de nombreuses possibilités, notamment autour de [[La Rochelle|${PATH.laRochelle}]].`,
      'Les producteurs restent au cœur du programme : atelier ostréicole autour de l’huître, découverte d’une exploitation maritime, rencontre avec un producteur local ou dégustation de produits de la mer. Le programme alterne naturellement temps de travail, immersion sur le terrain et moments de convivialité. Une réunion peut prendre place face à l’eau avant une immersion ostréicole, une balade sur le littoral ou un repas partagé au bord de la mer.',
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
          'Accueil de l’équipe dans une cabane ostréicole ou un lieu face à l’eau',
          'Balade sur le littoral et découverte du territoire',
          'Plénière d’ouverture face à l’océan ou sous une tente',
          'Dîner local et soirée maritime',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Kayak, paddle ou sortie en bateau',
          'Atelier ostréicole autour de l’huître',
          'Atelier de réflexion sur une terrasse face à l’eau',
          'Dégustation d’huîtres et soirée dans une cabane de producteur',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Course d’orientation entre dunes, marais et littoral',
          'Rencontre avec une association de protection des océans',
          'Restitution les pieds dans le sable ou face à l’océan',
          'Déjeuner de produits locaux au bord de l’eau',
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
      seminaireSlug: 'avec-baptiste',
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
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/MONTAGNE/98317677686-27139098.webp',
    heroImageAlt: 'Vallée et sommets enneigés pour séminaire en montagne – TerraGo',
    intro: [
      'Un séminaire d’entreprise en montagne permet de prendre de la hauteur et d’offrir aux équipes un environnement radicalement différent du bureau.',
      `Des Alpes aux massifs volcaniques, TerraGo imagine des programmes qui associent travail collectif, découverte du territoire et immersion dans les savoir-faire locaux. Les équipes peuvent notamment découvrir les paysages et producteurs autour de [[Clermont-Ferrand|${PATH.clermont}]] et en [[Auvergne-Rhône-Alpes|${PATH.auvergne}]].`,
      'Les producteurs et éleveurs donnent une dimension authentique au séjour : balade en alpage avec le berger et son troupeau, fabrication de fromage, rencontre avec un éleveur ou découverte d’une exploitation de montagne. Le programme alterne naturellement temps de travail, immersion sur le terrain et moments de convivialité. Une réunion peut se tenir face aux montagnes avant une randonnée, un atelier producteur et une soirée dans un chalet.',
    ],
    prosImage: regionImg('auvergne-rhone-alpes'),
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
          'Accueil de l’équipe dans une ferme ou un domaine d’altitude',
          'Balade en alpage avec un berger et son troupeau',
          'Réunion d’ouverture sur une terrasse face aux sommets',
          'Dîner montagnard dans une ferme-auberge',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Trail ou randonnée sur les sentiers de montagne',
          'Fabrication de son propre fromage',
          'Temps de réflexion dans une bergerie ou sous une tente en altitude',
          'Soirée raclette et quiz des sommets',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'VTT ou yoga, au pied des montagnes',
          'Temps de travail en extérieur',
          'Restitution face aux montagnes',
          'Déjeuner de terroir dans une auberge',
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
      seminaireSlug: 'avec-hugues-marc',
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
      'Un séminaire d’entreprise en pleine nature permet de sortir du cadre professionnel classique et de créer les conditions d’un autre rapport au travail et au collectif.',
      `TerraGo sélectionne des lieux où la nature n’est pas simplement un décor, mais une véritable composante du séjour. De l’[[Auvergne-Rhône-Alpes|${PATH.auvergne}]] à la [[Bretagne|${PATH.bretagne}]], chaque territoire apporte son propre environnement.`,
      'La rencontre avec les producteurs reste au centre de l’expérience : découverte d’une ferme, immersion dans une exploitation, atelier autour d’un savoir-faire ou rencontre avec un artisan local. Le programme alterne naturellement temps de travail, immersion sur le terrain et moments de convivialité. Une réunion peut se tenir dans un jardin avant une course d’orientation, une découverte du territoire ou une soirée collective en extérieur.',
    ],
    prosImage: `${HOME}/Noisettes-recolte.webp`,
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
          'Accueil de l’équipe dans un domaine au cœur de la nature',
          'Plénière d’ouverture sous une tente en extérieur',
          'Randonnée découverte avec un guide naturaliste',
          'Dîner autour d’un feu de camp',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Course d’orientation dans les chemins forestiers',
          'Atelier de reconnaissance des plantes sauvages',
          'Temps de travail en sous-groupes dans le jardin',
          'Night escape game en équipes',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Trail ou yoga matinale',
          'Chantier collectif de plantation d’arbres ou de haies',
          'Restitution et priorisation sous les arbres',
          'Déjeuner champêtre',
        ],
      },
    ],
    producer: {
      name: 'Nathalie & Benjamin',
      role: 'Producteurs engagés',
      description:
        'Rencontrez Nathalie et Benjamin pour une immersion en pleine nature : visite de l’exploitation, atelier concret et dégustation. Une expérience authentique et fédératrice, au grand air et au plus près du vivant.',
      image: HOME_PRODUCERS[1].image,
      imageAlt: 'Nathalie et Benjamin, producteurs – séminaire en pleine nature TerraGo',
      imageCopyright: 'Marine Van-den-Broek',
      seminaireSlug: 'avec-nathalie-benjamin',
    },
    logement: {
      title: 'Écolodges et maisons au calme',
      description:
        'Hébergements nature, lodges ou maisons d’hôtes isolées : confort groupe, silence et proximité immédiate des activités outdoor.',
      images: [
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/nature/674289.webp',
          alt: 'Lodge en bois au cœur de la forêt pour séminaire en pleine nature',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/nature/74289013.png',
          alt: 'Domaine isolé au milieu des arbres vu du ciel',
          copyright: 'Youza Ecolodge',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/nature/52367489.webp',
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
      'Un domaine d’exception apporte au séminaire d’entreprise un cadre singulier, propice à la réflexion comme aux moments de partage.',
      `TerraGo recherche des propriétés avec une véritable identité : domaine viticole, maison de caractère, ancienne ferme, propriété entourée de nature ou lieu chargé d’histoire. La [[Provence-Alpes-Côte d’Azur|${PATH.provence}]] offre notamment de nombreux cadres adaptés à ce type de séjour.`,
      'La découverte du lieu et de ceux qui le font vivre reste au cœur du programme : rencontre avec un producteur, découverte des ateliers, visite du domaine ou dégustation des productions locales. Le programme alterne naturellement temps de travail, immersion sur le terrain et moments de convivialité. Une réunion peut prendre place dans une bibliothèque ou un jardin avant une découverte du domaine et un dîner dans un cadre remarquable.',
    ],
    prosImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/exception/111112.webp',
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
          'Accueil de l’équipe dans un domaine remarquable et découverte de son histoire',
          'Balade dans les jardins et espaces du domaine',
          'Plénière d’ouverture dans une orangerie, une cour ou sous les arbres',
          'Dîner dans un cadre exceptionnel',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Course d’orientation dans le domaine',
          'Atelier autour d’un savoir-faire local',
          'Atelier stratégique dans un salon, une bibliothèque ou sous une tente',
          'Soirée enquête ou escape game dans le domaine',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Randonnée ou balade à vélo dans les paysages environnants',
          'Rencontre avec un producteur partenaire',
          'Restitution dans les jardins',
          'Déjeuner de terroir sous les arbres',
        ],
      },
    ],
    producer: {
      name: 'Marie-Sophie & Thomas',
      role: 'Vignerons – domaine au pied du Ventoux',
      description:
        'Sur le domaine de Marie-Sophie et Thomas, au pied du Mont Ventoux, vos équipes plongent dans l’univers du vin en amphore : visite, vendanges selon saison et dégustation. Une immersion élégante et fédératrice, à la hauteur d’un séjour dans un domaine d’exception.',
      image:
        'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/Combe%20au%20mas/mariesophie-julien.jpg',
      imageAlt: 'Marie-Sophie et Thomas, vignerons – séminaire domaine TerraGo',
      seminaireSlug: 'avec-marie-sophie-thomas',
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
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/exception/12213313.webp',
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
      'Un séminaire d’entreprise au cœur des terroirs permet de donner du sens au déplacement en allant directement à la rencontre de ceux qui cultivent, produisent et transforment.',
      `TerraGo imagine des programmes dans des territoires où l’agriculture, l’artisanat et la gastronomie occupent une place centrale. De la [[Provence-Alpes-Côte d’Azur|${PATH.provence}]] à la [[Nouvelle-Aquitaine|${PATH.nouvelleAquitaine}]], chaque destination raconte une histoire différente.`,
      'Les équipes découvrent les savoir-faire directement sur le terrain : récolte des olives, fabrication de fromage, cordage de piments, réalisation d’un fuseau de lavande, atelier ostréicole ou découverte des ateliers de production. Le programme alterne naturellement temps de travail, immersion sur le terrain et moments de convivialité. Les temps de réflexion peuvent prendre place dans un jardin, une grange ou au milieu des vignes, avant de partager un repas issu du terroir.',
    ],
    prosImage: `${HOME}/repas-convivial.webp`,
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
          'Accueil de l’équipe chez un producteur et découverte du territoire',
          'Balade à travers les paysages agricoles',
          'Plénière d’ouverture dans une grange ou en extérieur',
          'Grande tablée de terroir et soirée conviviale',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'VTT ou course d’orientation entre producteurs',
          'Atelier récolte, fabrication ou transformation',
          'Temps de réflexion dans un jardin ou au cœur des cultures',
          'Soirée marché des producteurs et dégustation à l’aveugle',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Temps de travail en équipe',
          'Rencontre avec un second producteur ou artisan',
          'Restitution sous les arbres ou dans une cour de ferme',
          'Grand déjeuner de terroir',
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
      seminaireSlug: 'avec-baptiste',
    },
    logement: {
      title: 'Maisons et domaines ancrés localement',
      description:
        'Hébergements choisis pour leur lien au territoire : maisons d’hôtes, domaines ou gîtes à proximité des producteurs et des expériences.',
      images: [
        { src: regionImg('occitanie'), alt: 'Hébergement au cœur des terroirs' },
        { src: regionImg('provence-alpes-cote-d-azur'), alt: 'Cadre terroir pour séminaire' },
        { src: `${HOME}/maraicher-explication.webp`, alt: 'Rencontre producteur terroir' },
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
