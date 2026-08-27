import {
  HOME_PRODUCERS,
  REGION_IMAGES,
  lieuDestinationPath,
  type RegionSlug,
} from './homeStorage';

const HOME =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME';

/** Pages stratégiques pour le maillage interne (ancres dans le contenu). */
const PATH = {
  original: '/seminaires-entreprise/original',
  auVert: '/seminaires-entreprise/au-vert',
  producteur: lieuDestinationPath('chez-le-producteur'),
  vignoble: lieuDestinationPath('au-vignoble'),
  ferme: lieuDestinationPath('a-la-ferme'),
  bordeaux: '/seminaire-entreprise-bordeaux',
  paris: '/seminaire-entreprise-paris',
  marseille: '/seminaire-entreprise-marseille',
  aix: '/seminaire-entreprise-aix-en-provence',
  toulouse: '/seminaire-entreprise-toulouse',
  rennes: '/seminaire-entreprise-rennes',
  nantes: '/seminaire-entreprise-nantes',
  clermont: '/seminaire-entreprise-clermont-ferrand',
  lyon: '/seminaire-entreprise-lyon',
  annecy: '/seminaire-entreprise-annecy',
} as const;

export const DESTINATION_SLUGS = REGION_IMAGES.map((r) => r.slug);

export type DestinationSlug = RegionSlug;

export type DestinationPro = {
  title: string;
  text: string;
};

export type DestinationProgrammeDay = {
  label: string;
  items: string[];
};

export type DestinationFaqItem = {
  q: string;
  a: string;
};

export type DestinationRegion = {
  slug: DestinationSlug;
  name: string;
  prep: string;
  /** Article défini : `la ` ou `l'` */
  article: string;
  heroImage: string;
  heroImageAlt: string;
  intro: string[];
  prosImage: string;
  prosImageAlt: string;
  pros: DestinationPro[];
  formatsLead: string;
  formats: string[];
  prosClosing: string;
  programmeAccent: string;
  programmeSummary: string;
  programmeDays: DestinationProgrammeDay[];
  producer: {
    name: string;
    role: string;
    description: string;
    image: string;
    imageAlt: string;
    /** Exemples de métiers (pas un producteur nommé) */
    generic?: boolean;
    /** Slug `/exemples-seminaire-entreprise/[slug]` pour un producteur nommé */
    seminaireSlug?: string;
  };
  logement: {
    title: string;
    description: string;
    images: { src: string; alt: string }[];
    highlights: string[];
  };
  faq: DestinationFaqItem[];
};

const SHARED_FAQ_TAIL: DestinationFaqItem[] = [
  {
    q: 'Combien de participants pouvez-vous accueillir ?',
    a: 'De petits comités à des groupes plus larges : nous adaptons lieux, hébergements et activités selon la taille de votre équipe.',
  },
  {
    q: 'Quel délai faut-il prévoir pour organiser le séminaire ?',
    a: 'Idéalement plusieurs mois à l’avance pour sécuriser les meilleurs lieux et producteurs. Des demandes plus urgentes restent possibles selon les disponibilités.',
  },
  {
    q: 'Comment obtenir un devis ?',
    a: 'Partagez votre brief via le formulaire : nous revenons rapidement avec une proposition sur mesure, adaptée à vos objectifs et à votre budget.',
  },
];

function regionBase(
  slug: DestinationSlug,
): Pick<DestinationRegion, 'slug' | 'name' | 'prep' | 'article'> {
  const region = REGION_IMAGES.find((r) => r.slug === slug);
  if (!region) throw new Error(`Région inconnue: ${slug}`);
  return {
    slug: region.slug,
    name: region.name,
    prep: region.prep,
    article: region.article,
  };
}

function regionImage(slug: DestinationSlug): string {
  const region = REGION_IMAGES.find((r) => r.slug === slug);
  if (!region) throw new Error(`Région inconnue: ${slug}`);
  return region.image;
}

export const DESTINATIONS: DestinationRegion[] = [
{
    ...regionBase('nouvelle-aquitaine'),
    heroImage: regionImage('nouvelle-aquitaine'),
    heroImageAlt: 'Ostréiculteurs en Nouvelle-Aquitaine – séminaire TerraGo',
    intro: [
      `Entre océan, estuaires, vignobles et campagnes, la Nouvelle-Aquitaine offre un terrain idéal pour un [[séminaire d’entreprise original|${PATH.original}]], responsable et dépaysant. Une région vaste et contrastée, où les équipes peuvent sortir du cadre habituel et retrouver un autre rythme.`,
      `Accessible notamment depuis [[Bordeaux|${PATH.bordeaux}]], la région permet de rejoindre facilement les vignobles, exploitations agricoles et territoires du littoral. TerraGo imagine des séminaires d’entreprise dans des lieux choisis pour leur environnement, leur histoire et leur capacité à accueillir les équipes.`,
      `Les [[producteurs|${PATH.producteur}]] sont au cœur de l’expérience : immersion chez un ostréiculteur, découverte d’un domaine viticole, rencontre avec un producteur engagé ou atelier autour des produits du terroir. Le programme alterne naturellement temps de travail, immersion sur le terrain et moments de convivialité. Les équipes peuvent ainsi passer d’une plénière en extérieur à une dégustation, puis partager un repas entre les vignes ou au bord de l’océan.`,
    ],
    prosImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/nouvelleaquitaine/pexels-ertabbt-150087708-13678581.webp',
    prosImageAlt:
      "Paysage des fermes ostréicoles et des bateaux dans le bassin d'Arcachon, France.",
    pros: [
      {
        title: 'Un cadre entre terre et océan',
        text: 'Littoral atlantique, bassins ostréicoles, forêts et vignobles : des paysages qui inspirent la réflexion et détendent naturellement les esprits.',
      },
      {
        title: 'Des rencontres producteur authentiques',
        text: 'Huîtres, vins, légumes ou élevage : vos équipes vivent le geste, comprennent le métier et repartent avec une expérience mémorable.',
      },
    ],
    formatsLead: 'Nous organisons notamment :',
    formats: [
      'Séminaire résidentiel de 2 à plusieurs jours',
      'Journée d’étude au bord de l’eau',
      'Team building ostréicole ou viticole',
      'Convention RSE autour du vivant',
    ],
    prosClosing:
      'Chaque programme est conçu sur mesure selon vos objectifs, la taille du groupe et l’ambiance recherchée.',
    programmeAccent: 'programme type',
    programmeSummary:
      'La Nouvelle-Aquitaine combine accessibilité, grands espaces et une culture gastronomique forte — parfait pour fédérer une équipe autour d’expériences concrètes et sensorielles.',
    programmeDays: [
      {
        label: 'Jour 1',
        items: [
          'Accueil de l’équipe dans un domaine, une ferme ou une cabane ostréicole',
          'Découverte du territoire avec un producteur local',
          'Plénière d’ouverture en extérieur au cœur du domaine',
          'Dîner entre les vignes ou face à l’océan',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'VTT dans le vignoble ou randonnée sur le littoral',
          'Atelier ostréicole, viticole ou gastronomique',
          'Temps de réflexion sous une tente ou dans un chai',
          'Soirée dégustation à l’aveugle et produits du terroir',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Temps de travail',
          'Rencontre avec un second producteur',
          'Restitution dans une grange ou un jardin',
          'Grande tablée de produits locaux',
        ],
      },
    ],
    producer: {
      name: 'Baptiste',
      role: 'Producteur de piments',
      description:
        'Rencontrez Baptiste pour une immersion dans la culture du piment : visite de l’exploitation, atelier les mains dans la terre et dégustation. Une expérience vive, colorée et fédératrice pour vos équipes.',
      image: HOME_PRODUCERS[0].image,
      imageAlt: 'Baptiste, producteur de piments – TerraGo',
      seminaireSlug: 'avec-baptiste',
    },
    logement: {
      title: 'Hébergements au plus près du territoire',
      description:
        'Maisons d’hôtes, domaines ou lodges en bord de bassin : nous sélectionnons des lieux chaleureux, adaptés aux groupes et proches des expériences producteur.',
      images: [
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/nouvelleaquitaine/hotel-indarra-arbonne-1.webp',
          alt: 'Hôtel typique basque proche de Biarritz, France',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/nouvelleaquitaine/479767839.jpg',
          alt: 'Château et domaine viticole proche de Bordeaux, France',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/nouvelleaquitaine/5284910512984.jpg',
          alt: 'Lodges contemporains au bord d’un lac en forêt des Landes',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/nouvelleaquitaine/47183145R.webp',
          alt: 'Piscine d’un domaine séminaire en Nouvelle-Aquitaine',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/nouvelleaquitaine/542896176891514.webp',
          alt: 'Table dîner en extérieur au coucher du soleil',
        },
      ],
      highlights: [
        'Capacité groupe et salles de travail',
        'Cuisine locale et circuits courts',
        'Proximité des partenaires TerraGo',
      ],
    },
    faq: [
      {
        q: 'La Nouvelle-Aquitaine est-elle adaptée à un séminaire d’entreprise ?',
        a: `Oui : accessibilité TGV, diversité des paysages et un réseau de producteurs engagés en font une destination idéale pour un [[séminaire au vert|${PATH.auVert}]] et porteur de sens.`,
      },
      {
        q: 'Peut-on organiser une journée seulement ?',
        a: 'Absolument. Journée d’étude, team building ostréicole ou atelier producteur : nous adaptons le format à votre agenda.',
      },
      ...SHARED_FAQ_TAIL,
    ],
  },
{
    ...regionBase('provence-alpes-cote-d-azur'),
    heroImage: regionImage('provence-alpes-cote-d-azur'),
    heroImageAlt: 'Champs de lavande en Provence-Alpes-Côte d’Azur – séminaire TerraGo',
    intro: [
      `Lumière, garrigue, oliviers, vignobles et villages de caractère : la Provence-Alpes-Côte d’Azur est une destination iconique pour un [[séminaire d’entreprise au vert|${PATH.auVert}]], [[original|${PATH.original}]] et responsable.`,
      `Accessible notamment depuis [[Marseille|${PATH.marseille}]] ou [[Aix-en-Provence|${PATH.aix}]], elle offre une grande diversité de paysages et de lieux pour travailler autrement. TerraGo imagine des programmes dans la Provence intérieure, entre domaines, exploitations agricoles et villages où les équipes peuvent ralentir et se retrouver.`,
      `Les producteurs provençaux donnent le ton : récolte des olives, réalisation d’un fuseau de lavande, rencontre avec un maraîcher ou [[découverte d’un domaine viticole|${PATH.vignoble}]]. Le programme alterne naturellement temps de travail, immersion sur le terrain et moments de convivialité. Une réunion peut prendre place dans un jardin, avant de poursuivre par une immersion chez le producteur et un repas sous les oliviers.`,
    ],
    prosImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/provence/423678569352.webp',
    prosImageAlt: 'Récolte d’olives vertes en Provence',
    pros: [
      {
        title: 'Un cadre inspirant au cœur du Sud',
        text: 'Paysages emblématiques, lumière généreuse et ambiance méditerranéenne : la Provence-Alpes-Côte d’Azur ouvre naturellement les esprits.',
      },
      {
        title: 'Des immersions producteur mémorables',
        text: 'Oliviers, vignes, potagers : vos collaborateurs vivent le geste et repartent avec une expérience sensorielle forte.',
      },
    ],
    formatsLead: 'Nous organisons notamment :',
    formats: [
      'Séminaire résidentiel',
      'Journée d’étude',
      'Team building oléicole ou viticole',
      'Séminaire RSE au vert',
    ],
    prosClosing:
      'Chaque détail est pensé pour coller à votre culture d’entreprise et à vos objectifs.',
    programmeAccent: 'programme type',
    programmeSummary:
      'La Provence-Alpes-Côte d’Azur combine accessibilité, beauté des lieux et richesse du terroir — idéal pour un événement d’entreprise réussi et mémorable.',
    programmeDays: [
      {
        label: 'Jour 1',
        items: [
          'Accueil de l’équipe dans un domaine entre oliviers et lavandes',
          'Balade dans les paysages provençaux avec un producteur',
          'Réunion d’ouverture sous les oliviers',
          'Repas provençal et soirée guinguette',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Randonnée ou VTT dans les Alpilles',
          'Récolte des olives et atelier de fabrication d’huile',
          'Temps de réflexion dans un jardin méditerranéen',
          'BBQ convivial et quizz du sud',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Course d’orientation entre vignes et oliviers',
          'Temps de travail en extérieur',
          'Restitution sur une terrasse face aux paysages',
          'Déjeuner sous les oliviers',
        ],
      },
    ],
    producer: {
      name: 'Paolo',
      role: 'Producteur d’olives',
      description:
        'Chez Paolo, vos équipes découvrent le métier de l’olive : récolte selon saison, explication du pressage et dégustation d’huiles. Un moment authentique et fédérateur.',
      image:
        'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/OLIVEPAOLO/paoloolive.png',
      imageAlt: 'Paolo, producteur d’olives en Provence – TerraGo',
      seminaireSlug: 'avec-paolo',
    },
    logement: {
      title: 'Mas et domaines pour séminaires',
      description:
        'Mas rénovés, domaines viticoles ou maisons d’hôtes : des cadres élégants et chaleureux, adaptés aux groupes professionnels.',
      images: [
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/provence/537583942.webp',
          alt: 'Allée de cyprès menant à un domaine en Provence',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/provence/64839245.webp',
          alt: 'Piscine et vignoble d’un mas pour séminaire en Provence',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/provence/5386930.webp',
          alt: 'Champ de lavande et bâtiment en pierre en Provence',
        },
      ],
      highlights: [
        'Espaces outdoor et indoor',
        'Salles de réunion',
        'Cuisine locale',
      ],
    },
    faq: [
      {
        q: 'Pourquoi choisir la Provence-Alpes-Côte d’Azur pour un séminaire ?',
        a: 'Pour la lumière, l’accessibilité et la richesse des rencontres producteur — un cadre qui inspire autant qu’il fédère.',
      },
      {
        q: 'Peut-on venir hors période estivale ?',
        a: 'Oui. Le printemps et l’automne sont souvent les meilleures fenêtres : douceur, couleurs et moins de fréquentation.',
      },
      ...SHARED_FAQ_TAIL,
    ],
  },
{
    ...regionBase('ile-de-france'),
    heroImage: regionImage('ile-de-france'),
    heroImageAlt: 'Tour Eiffel en Île-de-France – séminaire TerraGo',
    intro: [
      `L’Île-de-France ne se résume pas à Paris. Fermes, forêts, domaines et producteurs engagés offrent autour de la capitale de nombreuses possibilités pour organiser un séminaire d’entreprise au vert, responsable et dépaysant.`,
      `À moins de 2h00 de [[Paris|${PATH.paris}]], vos équipes peuvent rejoindre des territoires ruraux où le rythme change rapidement. TerraGo imagine des séminaires dans des lieux à taille humaine, suffisamment proches pour rester accessibles tout en permettant une véritable coupure avec le quotidien professionnel.`,
      `Les producteurs sont au cœur de l’expérience : [[découverte d’une ferme|${PATH.ferme}]], récolte de saison, atelier maraîcher, rencontre avec un agriculteur ou découverte d’un élevage. Le programme alterne naturellement temps de travail, immersion sur le terrain et moments de convivialité. Une plénière peut se tenir dans un jardin ou une grange, avant une activité collective et un repas préparé autour des productions locales.`,
    ],
    prosImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/iledefrance/8592616.webp',
    prosImageAlt: 'Domaine en pierre et brique pour séminaire en Île-de-France',
    pros: [
      {
        title: 'La proximité au service de l’impact',
        text: 'Moins de transport, plus de temps utile : l’Île-de-France permet des formats efficaces, même sur une journée, sans sacrifier l’immersion.',
      },
      {
        title: 'Nature et producteurs aux portes de Paris',
        text: 'Forêts, fermes et domaines : vos collaborateurs vivent le geste et se reconnectent au réel, à quelques kilomètres de la ville.',
      },
    ],
    formatsLead: 'Nous organisons notamment :',
    formats: [
      'Journée d’étude au vert',
      'Team building producteur',
      'Séminaire résidentiel court',
      'Convention RSE proche de Paris',
    ],
    prosClosing:
      'Chaque détail est pensé pour coller à votre culture d’entreprise et à vos objectifs — même avec un agenda serré.',
    programmeAccent: 'programme type',
    programmeSummary:
      'L’Île-de-France combine accessibilité maximale et expériences terroir — parfait pour un événement d’entreprise réussi, sans logistique lourde.',
    programmeDays: [
      {
        label: 'Jour 1',
        items: [
          'Accueil de l’équipe dans une ferme aux portes de Paris',
          'Découverte des cultures et rencontre avec les producteurs',
          'Plénière d’ouverture dans une grange',
          'Dîner fermier et soirée conviviale',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Course d’orientation en forêt',
          'Atelier maraîchage : initiation à la permaculture',
          'Temps de réflexion dans le jardin de la ferme',
          'Dîner local dans une serre, sous les étoiles',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'VTT à travers les paysages agricoles',
          'Découverte d’un second producteur',
          'Restitution sous les arbres',
          'Déjeuner champêtre',
        ],
      },
    ],
    producer: {
      name: 'Benoît',
      role: 'Producteur maraîcher',
      description:
        'Chez Louise & Benoît, vos équipes découvrent une ferme maraîchère engagée près de Paris : circuits courts, gestes durables et immersion terrain. Une expérience authentique et fédératrice, aux portes de la capitale.',
      image:
        'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/clefs%20ferme/Benoit.webp',
      imageAlt: 'Benoît, producteur maraîcher – TerraGo',
      seminaireSlug: 'avec-louise-benoit',
    },
    logement: {
      title: 'Fermes et domaines proches de Paris',
      description:
        'Fermes rénovées, domaines ou maisons d’hôtes : des cadres chaleureux, adaptés aux groupes et accessibles rapidement depuis la capitale.',
      images: [
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/iledefrance/52662594024.jpg',
          alt: 'Allée de cerisiers dans un domaine en Île-de-France',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/iledefrance/758241.webp',
          alt: 'Manoir en pierre pour séminaire en Île-de-France',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/iledefrance/76581962.webp',
          alt: 'Château et miroir d’eau en Île-de-France',
        },
      ],
      highlights: [
        'Accès facile depuis Paris',
        'Salles de réunion',
        'Produits locaux',
      ],
    },
    faq: [
      {
        q: 'Pourquoi organiser un séminaire en Île-de-France ?',
        a: 'Pour gagner du temps de trajet tout en offrant une vraie expérience hors du bureau — nature, producteurs et cohésion, aux portes de Paris.',
      },
      {
        q: 'Peut-on faire un format d’une seule journée ?',
        a: 'Oui, c’est l’un des grands atouts de la région. Nous proposons aussi des formats sur 2 jours pour approfondir l’immersion.',
      },
      ...SHARED_FAQ_TAIL,
    ],
  },
{
    ...regionBase('normandie'),
    heroImage: regionImage('normandie'),
    heroImageAlt: 'Paysages de Normandie – séminaire TerraGo',
    intro: [
      'Entre bocage, vergers, littoral et élevages, la Normandie offre un cadre généreux pour un séminaire d’entreprise au vert, authentique et responsable.',
      'La région permet de quitter facilement les environnements urbains pour rejoindre des domaines, fermes et villages où les équipes peuvent travailler autrement. TerraGo construit des programmes sur mesure, dans des lieux qui associent nature, savoir-faire et convivialité.',
      'Les producteurs sont au centre du séjour : découverte d’un élevage, rencontre avec un producteur laitier, atelier autour des produits normands, visite d’une exploitation ou dégustation. Le programme alterne naturellement temps de travail, immersion sur le terrain et moments de convivialité. Une réflexion collective peut se tenir dans une grange ou un jardin avant une immersion dans l’exploitation et un repas partagé autour des produits du territoire.',
    ],
    prosImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/normandie/20409927.webp',
    prosImageAlt: 'Vaches normandes dans un pré verdoyant',
    pros: [
      {
        title: 'Proximité et changement d’air',
        text: 'Idéale pour un séminaire court ou résidentiel, la Normandie permet de sortir du cadre sans logistique complexe.',
      },
      {
        title: 'Un terroir généreux et accueillant',
        text: 'Vergers, fermes et littoral : des expériences concrètes qui fédèrent naturellement les équipes.',
      },
    ],
    formatsLead: 'Nous organisons notamment :',
    formats: [
      'Séminaire résidentiel',
      'Journée d’étude au vert',
      'Team building à la ferme',
      'Séminaire RSE nature',
    ],
    prosClosing:
      'Nous adaptons le programme à votre rythme, votre budget et vos objectifs d’équipe.',
    programmeAccent: 'programme type',
    programmeSummary:
      'La Normandie est parfaite pour un événement d’entreprise réussi : accessible, verdoyante et riche en rencontres producteur.',
    programmeDays: [
      {
        label: 'Jour 1',
        items: [
          'Accueil de l’équipe dans une ferme normande ou un domaine cidricole',
          'Découverte du verger et rencontre avec le producteur',
          'Plénière d’ouverture dans une grange',
          'Dîner normand autour d’une grande tablée',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Randonnée sur le littoral',
          'Atelier ostréicole ou fabrication de fromage',
          'Temps de réflexion dans un jardin ou face à la mer',
          'Soirée cidre, produits locaux et quiz normand',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Temps de travail dans les espaces du domaine',
          'Activité sportive sur demande',
          'Déjeuner de terroir',
          'Départs',
        ],
      },
    ],
    producer: {
      name: 'Suzanna',
      role: 'Éleveuse de bufflones',
      description:
        'Chez Suzanna, vos équipes découvrent un élevage engagé : visite, explication du métier et dégustation. Une immersion rare et fédératrice.',
      image: HOME_PRODUCERS[4].image,
      imageAlt: 'Suzanna, éleveuse – TerraGo',
      seminaireSlug: 'avec-suzanna',
    },
    logement: {
      title: 'Fermes et maisons normandes',
      description:
        'Manoirs, fermes rénovées ou maisons d’hôtes : des lieux chaleureux, adaptés aux groupes et proches des expériences TerraGo.',
      images: [
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/normandie/185733098130.webp',
          alt: 'Manoir anglo-normand avec parc pour séminaire',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/normandie/4871102398458.webp',
          alt: 'Maison à colombages normande illuminée le soir',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/normandie/657129866165.jpg',
          alt: 'Manoir en pierre et terrasse pour séminaire en Normandie',
        },
      ],
      highlights: [
        'Cadre verdoyant',
        'Espaces de travail',
        'Produits du terroir',
      ],
    },
    faq: [
      {
        q: 'La Normandie convient-elle à un séminaire d’une journée ?',
        a: 'Oui, grâce à sa proximité avec Paris. Nous proposons aussi des formats résidentiels sur 2 jours pour approfondir l’expérience.',
      },
      {
        q: 'Quels types d’activités proposez-vous ?',
        a: 'Ateliers producteur, team building nature, sessions de travail outdoor/indoor et moments de partage autour des produits locaux.',
      },
      ...SHARED_FAQ_TAIL,
    ],
  },
{
    ...regionBase('occitanie'),
    heroImage: regionImage('occitanie'),
    heroImageAlt: 'Paysages d’Occitanie – séminaire TerraGo',
    intro: [
      'Des Pyrénées à la Méditerranée, entre vignobles, garrigues, villages et grands espaces, l’Occitanie offre un terrain particulièrement riche pour un séminaire d’entreprise original, responsable et dépaysant.',
      `Accessible notamment depuis [[Toulouse|${PATH.toulouse}]], la région permet de rejoindre rapidement des territoires ruraux et viticoles où les équipes peuvent changer de rythme. TerraGo imagine des séminaires qui associent travail collectif, découverte du territoire et immersion dans des lieux singuliers.`,
      'Les producteurs donnent une dimension concrète au séjour : découverte d’un domaine viticole, rencontre avec un maraîcher, immersion dans une exploitation ou dégustation à l’aveugle. Le programme alterne naturellement temps de travail, immersion sur le terrain et moments de convivialité. Les temps de réflexion peuvent prendre place dans un domaine ou un jardin, avant un atelier collectif et un dîner autour des produits locaux.',
    ],
    prosImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/occitanie/aligot-geant-aubrac-aligot-les-traces-1.jpg',
    prosImageAlt: 'Préparation d’un aligot géant sur l’Aubrac en Occitanie',
    pros: [
      {
        title: 'Une diversité de territoires',
        text: 'Littoral, garrigue, montagne ou campagne : choisissez l’ambiance qui sert vos objectifs d’équipe.',
      },
      {
        title: 'Des rencontres producteur fortes',
        text: 'Vigne, olives, maraîchage ou élevage : des immersions concrètes qui créent du lien et du sens.',
      },
    ],
    formatsLead: 'Nous organisons notamment :',
    formats: [
      'Séminaire résidentiel',
      'Journée d’étude',
      'Team building chez le producteur',
      'Événement client au cœur du terroir',
    ],
    prosClosing:
      'Votre programme est coconstruit avec vous, du brief à l’accompagnement le jour J.',
    programmeAccent: 'programme type',
    programmeSummary:
      'L’Occitanie offre lumière, chaleur humaine et savoir-faire : un cocktail idéal pour un séminaire qui fédère et inspire.',
    programmeDays: [
      {
        label: 'Jour 1',
        items: [
          'Accueil de l’équipe dans un domaine viticole ou une ferme',
          'Balade dans les vignes avec le producteur',
          'Plénière d’ouverture sous les arbres',
          'Dîner au domaine et soirée guinguette',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Trail ou randonnée dans les paysages viticoles',
          'Atelier de fabrication ou transformation d’un produit local',
          'Temps de réflexion dans le chai ou le jardin',
          'Dégustation à l’aveugle',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Rencontre avec un second producteur ou artisan',
          'Restitution sur une terrasse',
          'Grand déjeuner occitan',
          'Départs',
        ],
      },
    ],
    producer: {
      name: 'Paolo',
      role: 'Producteur d’olives',
      description:
        'Vivez une immersion autour de l’olive avec Paolo : visite du verger, atelier et dégustation d’huile. Une expérience sensorielle et fédératrice.',
      image: HOME_PRODUCERS[2].image,
      imageAlt: 'Paolo, producteur d’olives – TerraGo',
      seminaireSlug: 'avec-paolo',
    },
    logement: {
      title: 'Maisons et domaines pour vos équipes',
      description:
        'Mas, domaines ou maisons d’hôtes : des lieux chaleureux, adaptés aux groupes et proches des expériences TerraGo.',
      images: [
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/occitanie/31G301623-31b4561185744b8d9d8e2e3a95cdecf0.jpg',
          alt: 'Mas rénové avec piscine pour séminaire en Occitanie',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/occitanie/dsc_8361_dxo.avif',
          alt: 'Manoir avec tour et terrasse en Occitanie',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/occitanie/delp-21-0120.avif',
          alt: 'Domaine avec parc pour séminaire en Occitanie',
        },
      ],
      highlights: [
        'Espaces de travail',
        'Ambiance méditerranéenne',
        'Produits locaux',
      ],
    },
    faq: [
      {
        q: 'Peut-on organiser un séminaire en Occitanie hors saison estivale ?',
        a: 'Oui. Printemps et automne sont souvent idéaux : douceur, luminosité et disponibilités plus souples.',
      },
      {
        q: 'Proposez-vous des formats à la journée ?',
        a: 'Oui, ainsi que des formats résidentiels sur 2 jours ou plus, selon vos objectifs.',
      },
      ...SHARED_FAQ_TAIL,
    ],
  },
{
    ...regionBase('bretagne'),
    heroImage: regionImage('bretagne'),
    heroImageAlt: 'Pêche en Bretagne – séminaire TerraGo',
    intro: [
      'Entre côte sauvage, ports, campagnes et terres agricoles, la Bretagne offre un cadre singulier pour un séminaire d’entreprise original, responsable et authentique.',
      `Depuis [[Rennes|${PATH.rennes}]], les équipes peuvent rejoindre facilement les campagnes et le littoral bretons. TerraGo imagine des programmes dans des lieux où l’environnement, les savoir-faire et les rencontres occupent une place centrale.`,
      'Les producteurs bretons sont au cœur des expériences : atelier ostréicole autour de l’huître, découverte d’une ferme, rencontre avec un producteur ou visite d’un atelier. Le programme alterne naturellement temps de travail, immersion sur le terrain et moments de convivialité. Une réunion face à la mer peut laisser place à une immersion ostréicole, une balade sur le littoral et un dîner dans une ancienne grange.',
    ],
    prosImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/Destination/197677686-34666032.webp',
    prosImageAlt: 'Bateau sur la côte bretonne – séminaire TerraGo',
    pros: [
      {
        title: 'Un cadre inspirant face à l’océan',
        text: 'Côtes sauvages, îles et campagnes intérieures : la Bretagne change d’air et ouvre l’espace pour réfléchir autrement.',
      },
      {
        title: 'Des expériences ancrées dans le terroir',
        text: 'Maraîchers, ostréiculteurs, cidriculteurs… vos collaborateurs vivent le geste et comprennent un territoire vivant.',
      },
    ],
    formatsLead: 'Nous organisons notamment :',
    formats: [
      'Séminaire résidentiel littoral',
      'Journée d’étude en bord de mer',
      'Team building producteur',
      'Événement RSE autour du vivant',
    ],
    prosClosing:
      'Chaque séminaire est pensé sur mesure pour coller à vos enjeux humains et stratégiques.',
    programmeAccent: 'programme type',
    programmeSummary:
      'La Bretagne allie accessibilité, caractère et authenticité : un terrain parfait pour fédérer une équipe autour d’expériences concrètes et mémorables.',
    programmeDays: [
      {
        label: 'Jour 1',
        items: [
          'Accueil de l’équipe dans une ferme ou une exploitation ostréicole',
          'Découverte du littoral avec un producteur',
          'Plénière d’ouverture face à la mer',
          'Dîner de produits locaux dans une longère',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Kayak, randonnée côtière ou course d’orientation',
          'Initiation ostréicole autour des savoirs sur l’huître',
          'Temps de réflexion dans une cour de ferme ou sous une tente',
          'Soirée fruits de mer et dégustation',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Vélo le long du littoral',
          'Rencontre avec un producteur ou artisan breton',
          'Déjeuner façon pique-nique convivial',
          'Départs',
        ],
      },
    ],
    producer: {
      name: 'Suzanna',
      role: 'Éleveuse de bufflones',
      description:
        'Chez Suzanna, vos équipes découvrent un élevage engagé : visite, explication du métier et dégustation. Une immersion rare et fédératrice, au cœur de la Bretagne.',
      image: HOME_PRODUCERS[4].image,
      imageAlt: 'Suzanna, éleveuse – TerraGo',
      seminaireSlug: 'avec-suzanna',
    },
    logement: {
      title: 'Des lieux de caractère pour vos équipes',
      description:
        'Maisons bretonnes, domaines ou hébergements en bord de côte : des cadres chaleureux, adaptés aux groupes et proches des expériences TerraGo.',
      images: [
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/bretagne/8492052.webp',
          alt: 'Maison en pierre pour séminaire en Bretagne',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/bretagne/184592R0.jpg',
          alt: 'Cabane en bois sur pilotis en Bretagne',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/bretagne/25490.jpg',
          alt: 'Hébergement de caractère pour séminaire en Bretagne',
        },
      ],
      highlights: [
        'Espaces de travail et de convivialité',
        'Produits locaux à table',
        'Ambiance ressourçante',
      ],
    },
    faq: [
      {
        q: 'Pourquoi organiser un séminaire en Bretagne ?',
        a: 'Pour le changement d’air, la force des paysages et la qualité des rencontres producteur — un cocktail idéal pour cohésion et inspiration.',
      },
      {
        q: 'Les activités sont-elles possibles toute l’année ?',
        a: 'Oui. Nous adaptons les formats à la saison : outdoor, ateliers couverts, expériences producteur en intérieur ou en pleine nature.',
      },
      ...SHARED_FAQ_TAIL,
    ],
  },
{
    ...regionBase('pays-de-la-loire'),
    heroImage: regionImage('pays-de-la-loire'),
    heroImageAlt: 'Château de Chenonceau en Pays de la Loire – séminaire TerraGo',
    intro: [
      'Entre Loire, vignobles, bocages et littoral atlantique, les Pays de la Loire offrent un cadre idéal pour un séminaire d’entreprise au vert, responsable et dépaysant.',
      `Accessible notamment depuis [[Nantes|${PATH.nantes}]], la région permet de rejoindre facilement les vignobles, fermes et domaines qui entourent la métropole. TerraGo imagine des programmes où les temps de travail trouvent naturellement leur place dans des environnements plus ouverts et plus vivants.`,
      'Les producteurs sont au cœur du séjour : découverte d’un domaine, rencontre avec un vigneron, immersion dans une ferme ou atelier autour des productions locales. Le programme alterne naturellement temps de travail, immersion sur le terrain et moments de convivialité. Une plénière peut se tenir dans les vignes ou sous une tente en extérieur, avant une activité collective et un repas dans une grange.',
    ],
    prosImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/Destination/11680885-17791202.webp',
    prosImageAlt: 'Marais salants en Pays de la Loire – séminaire TerraGo',
    pros: [
      {
        title: 'Un cadre entre fleuve et châteaux',
        text: 'Loire, jardins et demeures de caractère : des paysages iconiques qui inspirent la réflexion et créent naturellement de la cohésion.',
      },
      {
        title: 'Des rencontres producteur authentiques',
        text: 'Vignes, vergers ou potagers : vos équipes vivent le geste, comprennent le métier et repartent avec une expérience mémorable.',
      },
    ],
    formatsLead: 'Nous organisons notamment :',
    formats: [
      'Séminaire résidentiel de 2 à plusieurs jours',
      'Journée d’étude au domaine',
      'Team building viticole ou jardins',
      'Convention RSE autour du vivant',
    ],
    prosClosing:
      'Nous cocréons un programme sur mesure, du rythme de travail aux expériences producteur.',
    programmeAccent: 'programme type',
    programmeSummary:
      'Les Pays de la Loire allient proximité de Paris, prestige des lieux et richesse du terroir — idéal pour un événement d’entreprise réussi et mémorable.',
    programmeDays: [
      {
        label: 'Jour 1',
        items: [
          'Accueil de l’équipe dans un domaine viticole ou une ferme ligérienne',
          'Balade dans les vignes ou au bord de la Loire',
          'Plénière d’ouverture sous les arbres',
          'Dîner entre les vignes',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Vélo le long de la Loire',
          'Immersion viticole ou maraîchère',
          'Temps de réflexion dans un jardin ou une grange',
          'Dégustation à l’aveugle et soirée guinguette',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Défi d’orientation autour d’une ferme',
          'Rencontre avec l’éleveur',
          'Déjeuner champêtre',
          'Départs',
        ],
      },
    ],
    producer: {
      name: 'Vignerons, arboriculteurs et maraîchers',
      role: 'Exemples de rencontres possibles',
      description:
        'Le long de la Loire, nous sélectionnons selon votre brief : domaines viticoles (Muscadet, Anjou, Saumur…), vergers de pommes et poires, ou maraîchers engagés. Une immersion terroir à composer sur mesure.',
      image:
        'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/producteur/578192052.jpg',
      imageAlt: 'Rencontre chez un producteur en Pays de la Loire – TerraGo',
      generic: true,
    },
    logement: {
      title: 'Domaines et demeures pour séminaires',
      description:
        'Châteaux, domaines viticoles ou maisons d’hôtes : des cadres élégants et chaleureux, adaptés aux groupes professionnels au plus près du fleuve.',
      images: [
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/paysdelaloire/78419501.jpg',
          alt: 'Piscine et terrasse d’un gîte en Pays de la Loire',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/paysdelaloire/785392042.jpg',
          alt: 'Domaine en pierre avec piscine vu du ciel',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/paysdelaloire/31905132.jpg',
          alt: 'Manoir et vignoble en Pays de la Loire',
        },
      ],
      highlights: [
        'Cadre patrimoine et nature',
        'Salles de réunion',
        'Cuisine locale',
      ],
    },
    faq: [
      {
        q: 'Pourquoi choisir les Pays de la Loire pour un séminaire ?',
        a: 'Pour la proximité de Paris, la beauté des lieux (Loire, châteaux, jardins) et la richesse des rencontres producteur — un cadre qui inspire autant qu’il fédère.',
      },
      {
        q: 'Quelle est la meilleure période pour venir ?',
        a: 'Le printemps et l’automne sont souvent idéaux : douceur, jardins en fleur ou vendanges, et une fréquentation plus sereine.',
      },
      ...SHARED_FAQ_TAIL,
    ],
  },
{
    ...regionBase('auvergne-rhone-alpes'),
    heroImage: regionImage('auvergne-rhone-alpes'),
    heroImageAlt: 'Paysages d’Auvergne-Rhône-Alpes – séminaire TerraGo',
    intro: [
      `Montagnes, alpages, fermes et savoir-faire locaux : l’Auvergne-Rhône-Alpes offre un cadre idéal pour organiser un [[séminaire d’entreprise au vert|${PATH.auVert}]], responsable et dépaysant.`,
      `Depuis [[Lyon|${PATH.lyon}]], [[Annecy|${PATH.annecy}]], [[Clermont-Ferrand|${PATH.clermont}]], ou d’autres villes de la région, vos équipes peuvent rejoindre des territoires où le travail prend une autre dimension. TerraGo construit des séminaires entre réunions au grand air, découverte de producteurs engagés et moments partagés avec les collaborateurs.`,
      'La rencontre avec le terroir est au cœur de l’expérience : fabrication de son propre fromage, rencontre avec un éleveur, balade en alpage avec le berger et son troupeau, découverte d’une ferme ou atelier autour des produits locaux. Le programme peut aussi intégrer une randonnée, une course d’orientation ou une soirée conviviale autour d’un repas du terroir.',
    ],
    prosImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/auvergne/472819.avif',
    prosImageAlt: 'Fromages d’Auvergne en cave d’affinage',
    pros: [
      {
        title: 'Un cadre inspirant au cœur des volcans',
        text: 'Grands espaces, silence et nature préservée : l’Auvergne-Rhône-Alpes crée les conditions idéales pour réfléchir et se reconnecter.',
      },
      {
        title: 'Des expériences concrètes et fédératrices',
        text: 'Fromages, élevage, maraîchage ou forêt : vos collaborateurs vivent le geste et renforcent leur lien d’équipe.',
      },
    ],
    formatsLead: 'Nous organisons notamment :',
    formats: [
      'Séminaire résidentiel nature',
      'Journée d’étude au vert',
      'Team building producteur',
      'Séminaire RSE en pleine nature',
    ],
    prosClosing:
      'Nous ajustons chaque détail à vos objectifs : rythme, intensité outdoor et niveau d’immersion.',
    programmeAccent: 'programme type',
    programmeSummary:
      'L’Auvergne-Rhône-Alpes est faite pour les séminaires qui veulent du vrai : nature, producteurs et temps de qualité loin du bruit ambiant.',
    programmeDays: [
      {
        label: 'Jour 1',
        items: [
          'Accueil de l’équipe dans une ferme d’altitude',
          'Balade en alpage avec le berger et son troupeau',
          'Plénière d’ouverture face aux volcans',
          'Dîner local au logement',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Trail ou randonnée volcanique',
          'Fabrication de son propre fromage',
          'Temps de réflexion dans une bergerie',
          'Soirée raclette et dégustation à l’aveugle',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'VTT ou yoga, au pied des montagnes',
          'Rencontre avec un producteur local',
          'Déjeuner de spécialités auvergnates',
          'Départs',
        ],
      },
    ],
    producer: {
      name: 'Hugues & Marc',
      role: 'Potager en permaculture · Annecy',
      description:
        'Chez Hugues et Marc, au potager en permaculture près d’Annecy, vos équipes découvrent le jardin, les gestes du vivant et les savoir-faire locaux. Une immersion authentique et fédératrice, au cœur de l’Auvergne-Rhône-Alpes.',
      image: HOME_PRODUCERS[3].image,
      imageAlt: 'Hugues et Marc, potager du château près d’Annecy – TerraGo',
      seminaireSlug: 'avec-hugues-marc',
    },
    logement: {
      title: 'Hébergements nature pour séminaires',
      description:
        'Gîtes, fermes rénovées ou lodges au calme : des lieux adaptés aux groupes, avec salles de travail et ambiance chaleureuse.',
      images: [
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/auvergne/2489.jpg',
          alt: 'Hôtel de caractère avec piscine pour séminaire en Auvergne',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/auvergne/8529041.jpg',
          alt: 'Lodges en bois au cœur de la forêt auvergnate',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/auvergne/482931.jpeg',
          alt: 'Cour de ferme en pierre pour séminaire en Auvergne',
        },
      ],
      highlights: [
        'Cadre ressourçant',
        'Salles de réunion équipées',
        'Cuisine locale',
      ],
    },
    faq: [
      {
        q: 'L’Auvergne-Rhône-Alpes convient-elle aux séminaires RSE ?',
        a: 'Oui : nature préservée, rencontres producteur et formats outdoor en font une destination très pertinente pour un séminaire engagé.',
      },
      {
        q: 'Faut-il un bon niveau de forme pour les activités ?',
        a: 'Non. Nous adaptons l’intensité : balades douces, ateliers accessibles ou expériences plus sportives selon votre groupe.',
      },
      ...SHARED_FAQ_TAIL,
    ],
  },
{
    ...regionBase('bourgogne-franche-comte'),
    heroImage: regionImage('bourgogne-franche-comte'),
    heroImageAlt: 'Vignobles de Bourgogne-Franche-Comté – séminaire TerraGo',
    intro: [
      'Vignobles, villages de caractère, élevages et gastronomie : la Bourgogne-Franche-Comté est une destination de choix pour un séminaire d’entreprise original, responsable et gourmand.',
      'Ses domaines et territoires viticoles offrent de nombreux cadres pour travailler autrement, dans des environnements où le patrimoine et les savoir-faire font partie intégrante du séjour. TerraGo imagine des programmes sur mesure, entre immersion et temps de réflexion.',
      'Les producteurs sont au premier plan : découverte d’un domaine viticole, rencontre avec un vigneron, dégustation à l’aveugle, visite des ateliers de production ou découverte des savoir-faire locaux. Le programme alterne naturellement temps de travail, immersion sur le terrain et moments de convivialité. Une plénière peut prendre place dans une grange ou au milieu des vignes, avant une activité collective et un dîner dans le domaine.',
    ],
    prosImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/bourgogne/5289663206521.webp',
    prosImageAlt: 'Cave à vin avec fûts de chêne en Bourgogne',
    pros: [
      {
        title: 'Un terroir d’exception',
        text: 'Vignes, caves et savoir-faire : la Bourgogne-Franche-Comté offre un terrain unique pour des expériences mémorables et structurantes.',
      },
      {
        title: 'Convivialité et excellence',
        text: 'Entre dégustations, ateliers et moments de table, vos équipes vivent une hospitalité rare, ancrée dans le réel.',
      },
    ],
    formatsLead: 'Nous organisons notamment :',
    formats: [
      'Séminaire résidentiel vignoble',
      'Journée d’étude',
      'Team building oenologique responsable',
      'Événement client au domaine',
    ],
    prosClosing:
      'Nous cocréons un programme sur mesure, du rythme de travail aux expériences producteur.',
    programmeAccent: 'programme type',
    programmeSummary:
      'La Bourgogne-Franche-Comté réunit accessibilité, prestige du terroir et chaleur humaine — parfait pour un séminaire qui marque durablement.',
    programmeDays: [
      {
        label: 'Jour 1',
        items: [
          'Accueil de l’équipe dans un domaine viticole',
          'Balade dans les vignes avec le vigneron',
          'Plénière d’ouverture dans le chai',
          'Dîner au cœur du vignoble',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Balade à vélo entre vignes et villages',
          'Atelier d’assemblage et création de sa propre cuvée',
          'Temps de réflexion dans les jardins du domaine',
          'Dégustation à l’aveugle et soirée autour des produits locaux',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Temps de travail en équipe',
          'Déjeuner bourguignon',
          'Restitution sur la terrasse du domaine',
          'Départs',
        ],
      },
    ],
    producer: {
      name: 'Marie-Lise & Sabine',
      role: 'Productrices de noix',
      description:
        'Rencontrez Marie-Lise et Sabine pour une immersion autour de la noix : visite, atelier et dégustation. Une rencontre humaine, concrète et fédératrice.',
      image: HOME_PRODUCERS[5].image,
      imageAlt: 'Marie-Lise et Sabine, productrices – TerraGo',
      seminaireSlug: 'avec-sabine-marie-lise',
    },
    logement: {
      title: 'Domaines et maisons de caractère',
      description:
        'Chambres d’hôtes, domaines viticoles ou demeures bourguignonnes : des lieux élégants, adaptés aux groupes et proches des expériences.',
      images: [
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/bourgogne/582941.jpeg',
          alt: 'Hôtel de caractère en pierre en Bourgogne',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/bourgogne/6a072c957050557772b70b.webp',
          alt: 'Domaine moderne avec piscine au bord de l’eau en Bourgogne',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/bourgogne/28459142.avif',
          alt: 'Manoir avec piscine et parc en Bourgogne',
        },
      ],
      highlights: [
        'Cadre prestigieux et chaleureux',
        'Salles de travail',
        'Gastronomie locale',
      ],
    },
    faq: [
      {
        q: 'La Bourgogne-Franche-Comté est-elle adaptée aux séminaires d’entreprise ?',
        a: 'Oui : proximité des grandes villes, lieux d’exception et expériences terroir en font une destination très demandée.',
      },
      {
        q: 'Peut-on prévoir un format sans alcool ?',
        a: 'Bien sûr. Nous proposons aussi des ateliers nature, cuisine ou producteur non axés sur la dégustation alcoolisée.',
      },
      ...SHARED_FAQ_TAIL,
    ],
  },
{
    ...regionBase('corse'),
    heroImage: regionImage('corse'),
    heroImageAlt: 'Paysages de Corse – séminaire TerraGo',
    intro: [
      'Montagne, mer et villages perchés : la Corse offre un cadre spectaculaire pour un séminaire d’entreprise hors du commun, responsable et profondément dépaysant.',
      'L’île invite les équipes à changer de rythme entre littoral, maquis, montagnes et villages. TerraGo imagine des programmes sur mesure qui associent travail, découverte du territoire et immersion dans la culture insulaire.',
      'Les producteurs corses donnent une vraie profondeur au séjour : rencontre avec un berger, découverte d’une exploitation, atelier autour des produits insulaires, visite d’un domaine ou dégustation de spécialités locales. Le programme alterne naturellement temps de travail, immersion sur le terrain et moments de convivialité. Une réunion peut se tenir en extérieur avant une randonnée dans le maquis, une rencontre avec un producteur et un dîner dans un village.',
    ],
    prosImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/corse/74105.webp',
    prosImageAlt: 'Villa en pierre avec piscine au pied des montagnes corses',
    pros: [
      {
        title: 'Un cadre inspirant entre mer et montagne',
        text: 'Des paysages puissants qui marquent les esprits et créent naturellement un sentiment d’aventure collective.',
      },
      {
        title: 'Une hospitalité et un terroir uniques',
        text: 'Producteurs, artisans et saveurs corses : des expériences rares qui renforcent le lien d’équipe.',
      },
    ],
    formatsLead: 'Nous organisons notamment :',
    formats: [
      'Séminaire résidentiel',
      'Incentive nature',
      'Team building producteur',
      'Événement client d’exception',
    ],
    prosClosing:
      'Nous construisons un itinéraire sur mesure, en tenant compte des temps de trajet et de la saison.',
    programmeAccent: 'programme type',
    programmeSummary:
      'La Corse est idéale pour un événement d’entreprise réussi qui sort vraiment du cadre — intense, beau et mémorable.',
    programmeDays: [
      {
        label: 'Jour 1',
        items: [
          'Accueil de l’équipe dans une bergerie ou un domaine corse',
          'Balade entre maquis, oliviers et châtaigniers',
          'Plénière d’ouverture sous les oliviers',
          'Dîner corse et soirée chants traditionnels',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Randonnée ou canyoning selon le territoire',
          'Fabrication de fromage ou découverte d’un savoir-faire insulaire',
          'Temps de réflexion dans une bergerie ou en pleine nature',
          'Grande tablée corse autour des producteurs',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Temps de travail ou activité sportive',
          'Déjeuner façon pique-nique en bord de mer',
          'Bilan du séminaire',
          'Départs',
        ],
      },
    ],
    producer: {
      name: 'Vignerons, producteurs d’agrumes et éleveurs',
      role: 'Exemples de rencontres possibles',
      description:
        'Sur l’île, nous sélectionnons selon votre brief : domaines viticoles, vergers d’agrumes (clémentines IGP…), élevages et charcuterie artisanale. Une immersion corse authentique, à composer sur mesure.',
      image:
        'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/corse/agrumes-6907269-32078454.jpg',
      imageAlt: 'Agrumes corses – TerraGo',
      generic: true,
    },
    logement: {
      title: 'Lieux de caractère en Corse',
      description:
        'Maisons, domaines ou hôtels de caractère : des cadres adaptés aux groupes, avec une vraie identité locale.',
      images: [
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/corse/318941.jpeg',
          alt: 'Villa en pierre avec piscine au milieu du maquis corse',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/corse/21440451.avif',
          alt: 'Terrasse couverte avec vue sur les montagnes corses',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/corse/a16b3d6ea0f676f0876e93e41c695e57.avif',
          alt: 'Salle de séminaire dans un lieu de caractère en Corse',
        },
      ],
      highlights: [
        'Cadre exceptionnel',
        'Espaces de travail',
        'Cuisine locale',
      ],
    },
    faq: [
      {
        q: 'La Corse est-elle adaptée aux séminaires d’entreprise ?',
        a: 'Oui, surtout pour des formats résidentiels marquants. Nous anticipons logistique et saison pour un déroulé fluide.',
      },
      {
        q: 'Faut-il prévoir plus de temps sur place ?',
        a: 'Souvent oui : 3 à 4 jours permettent de profiter pleinement du territoire sans précipitation.',
      },
      ...SHARED_FAQ_TAIL,
    ],
  }
];

export function getDestination(slug: string): DestinationRegion | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}

/** Title SEO : la région en premier pour éviter un sitelink du type « D'entreprise ». */
export function destinationSeoTitle(
  destination: Pick<DestinationRegion, 'name'>,
): string {
  return `${destination.name} : séminaire chez un producteur | TerraGo`;
}

/** H1 d’un seul tenant, sans fragment orphelin. */
export function destinationHeroHeading(
  destination: Pick<DestinationRegion, 'prep' | 'name'>,
): string {
  return `Séminaire d'entreprise ${destination.prep} ${destination.name} à la rencontre de producteurs`;
}

export function getRelatedDestinations(
  slug: DestinationSlug,
  count = 2,
): DestinationRegion[] {
  const index = DESTINATIONS.findIndex((d) => d.slug === slug);
  if (index < 0) return DESTINATIONS.slice(0, count);
  const related: DestinationRegion[] = [];
  for (let offset = 1; related.length < count && offset < DESTINATIONS.length; offset++) {
    related.push(DESTINATIONS[(index + offset) % DESTINATIONS.length]);
  }
  return related;
}
