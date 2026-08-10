import { HOME_PRODUCERS, REGION_IMAGES, type RegionSlug } from './homeStorage';

const HOME =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME';

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
      'Entre océan, estuaires et campagnes viticoles, la Nouvelle-Aquitaine offre un terrain idéal pour un séminaire d’entreprise hors des sentiers battus.',
      'À moins de 3 h de Paris en train, vos équipes basculent rapidement dans un autre rythme : grand air, producteurs engagés et moments de partage autour du vivant.',
      'TerraGo y imagine des expériences ancrées dans le terroir — de l’huître à la vigne — pour reconnecter vos collaborateurs au sens et à la matière.',
    ],
    prosImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/nouvelleaquitaine/20211025_124532-scaled.webp',
    prosImageAlt: 'Séchage des piments d’Espelette en Nouvelle-Aquitaine',
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
      'Séminaire résidentiel sur 2 ou 3 jours',
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
          'Arrivée et installation dans un lieu au bord de l’eau ou en campagne',
          'Briefing & icebreaker outdoor',
          'Atelier découverte du territoire avec un producteur local',
          'Dîner produit local et soirée conviviale',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Matinée de travail (salle équipée ou outdoor)',
          'Immersion producteur : ostréiculture, vigne ou maraîchage',
          'Dégustation et temps d’échange',
          'Restitution créative en équipe',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Session stratégique courte',
          'Activité nature (balade, kayak ou vélo selon saison)',
          'Déjeuner de clôture',
          'Départs',
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
    },
    logement: {
      title: 'Hébergements au plus près du territoire',
      description:
        'Maisons d’hôtes, domaines ou lodges en bord de bassin : nous sélectionnons des lieux chaleureux, adaptés aux groupes et proches des expériences producteur.',
      images: [
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/nouvelleaquitaine/5284910512984.jpg',
          alt: 'Lodges contemporains au bord d’un lac en forêt des Landes',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/nouvelleaquitaine/b38cb07b.webp',
          alt: 'Pavillon en bois éclairé pour un dîner en forêt',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/nouvelleaquitaine/47183145R.jpg',
          alt: 'Piscine d’un domaine séminaire en Nouvelle-Aquitaine',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/nouvelleaquitaine/542896176891514.png',
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
        a: 'Oui : accessibilité TGV, diversité des paysages et un réseau de producteurs engagés en font une destination idéale pour un séminaire au vert et porteur de sens.',
      },
      {
        q: 'Peut-on organiser une journée seulement ?',
        a: 'Absolument. Journée d’étude, team building ostréicole ou atelier producteur : nous adaptons le format à votre agenda.',
      },
      ...SHARED_FAQ_TAIL,
    ],
  },
{
    ...regionBase('provence'),
    heroImage: regionImage('provence'),
    heroImageAlt: 'Champs de lavande en Provence – séminaire TerraGo',
    intro: [
      'Lumière, garrigue et villages de caractère : la Provence est une destination iconique pour un séminaire d’entreprise inspirant.',
      'Accessible et solaire, elle invite vos équipes à ralentir, partager et se reconnecter au vivant.',
      'TerraGo y crée des programmes autour des producteurs — olives, vin, lavande, maraîchage — pour un impact humain fort.',
    ],
    prosImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/provence/423678569352.jpg',
    prosImageAlt: 'Récolte d’olives vertes en Provence',
    pros: [
      {
        title: 'Un cadre inspirant au cœur du Sud',
        text: 'Paysages emblématiques, lumière généreuse et ambiance méditerranéenne : la Provence ouvre naturellement les esprits.',
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
      'La Provence combine accessibilité, beauté des lieux et richesse du terroir — idéal pour un événement d’entreprise réussi et mémorable.',
    programmeDays: [
      {
        label: 'Jour 1',
        items: [
          'Arrivée et installation dans un mas ou domaine',
          'Ouverture & icebreaker outdoor',
          'Découverte du territoire avec un producteur',
          'Dîner provençal',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Matinée de travail',
          'Atelier olives, vigne ou cuisine producteur',
          'Dégustation et temps d’échange',
          'Restitution créative',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Session stratégique',
          'Balade garrigue ou activité douce',
          'Déjeuner de clôture',
          'Départs',
        ],
      },
    ],
    producer: {
      name: 'Paolo',
      role: 'Producteur d’olives',
      description:
        'Chez Paolo, vos équipes découvrent le métier de l’olive : récolte selon saison, explication du pressage et dégustation d’huiles. Un moment authentique et fédérateur.',
      image: HOME_PRODUCERS[2].image,
      imageAlt: 'Paolo, producteur d’olives en Provence – TerraGo',
    },
    logement: {
      title: 'Mas et domaines pour séminaires',
      description:
        'Mas rénovés, domaines viticoles ou maisons d’hôtes : des cadres élégants et chaleureux, adaptés aux groupes professionnels.',
      images: [
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/provence/537583942.jpg',
          alt: 'Allée de cyprès menant à un domaine en Provence',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/provence/64839245.jpg',
          alt: 'Piscine et vignoble d’un mas pour séminaire en Provence',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/provence/5386930.jpg',
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
        q: 'Pourquoi choisir la Provence pour un séminaire ?',
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
      'À deux pas de Paris, l’Île-de-France révèle campagnes, forêts et producteurs pour un séminaire d’entreprise sans les contraintes du long trajet.',
      'Vos équipes quittent le bureau en quelques minutes et basculent dans un autre rythme — nature, savoir-faire locaux et moments de partage.',
      'TerraGo y imagine des expériences ancrées dans le vivant, idéales pour une journée d’étude, un team building ou un format résidentiel proche de la capitale.',
    ],
    prosImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/iledefrance/8592616.jpg',
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
          'Arrivée et installation près de Paris',
          'Ouverture & icebreaker outdoor',
          'Découverte du territoire avec un producteur',
          'Dîner produit local',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Matinée de travail',
          'Atelier producteur (maraîchage, élevage…)',
          'Dégustation et temps d’échange',
          'Restitution créative',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Session stratégique',
          'Balade nature ou activité douce',
          'Déjeuner de clôture',
          'Retours sur Paris',
        ],
      },
    ],
    producer: {
      name: 'Suzanna',
      role: 'Éleveuse de bufflones',
      description:
        'Chez Suzanna, vos équipes découvrent un élevage engagé : visite, explication du métier et dégustation. Un moment authentique et fédérateur, proche de Paris.',
      image: HOME_PRODUCERS[4].image,
      imageAlt: 'Suzanna, éleveuse – TerraGo',
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
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/iledefrance/758241.png',
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
      'Falaises, vergers et campagnes verdoyantes : la Normandie offre un cadre ressourçant pour un séminaire d’entreprise proche de Paris.',
      'En moins de 2 h, vos équipes changent d’air et retrouvent authenticité, grand air et produits du terroir.',
      'TerraGo y crée des expériences autour des producteurs — cidre, fromage, élevage, maraîchage — pour un impact humain fort.',
    ],
    prosImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/normandie/20409927.jpg',
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
          'Arrivée et installation',
          'Ouverture & icebreaker outdoor',
          'Découverte du territoire avec un producteur',
          'Dîner local',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Matinée de travail',
          'Atelier ferme, cidre ou fromage',
          'Dégustation et échanges',
          'Restitution collective',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Session stratégique',
          'Balade nature ou littoral',
          'Déjeuner de clôture',
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
    },
    logement: {
      title: 'Fermes et maisons normandes',
      description:
        'Manoirs, fermes rénovées ou maisons d’hôtes : des lieux chaleureux, adaptés aux groupes et proches des expériences TerraGo.',
      images: [
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/normandie/185733098130.png',
          alt: 'Manoir anglo-normand avec parc pour séminaire',
        },
        {
          src: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/normandie/4871102398458.png',
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
      'Entre Méditerranée, Causses et Pyrénées, l’Occitanie déploie une diversité de décors pour un séminaire d’entreprise sur mesure.',
      'Soleil, terroirs et producteurs passionnés : vos équipes y trouvent inspiration, convivialité et ancrage.',
      'TerraGo y imagine des expériences qui mêlent travail, découverte et moments de partage autour du vivant.',
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
          'Arrivée et installation',
          'Ouverture du séminaire',
          'Découverte du territoire avec un hôte local',
          'Dîner produit local',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Matinée de travail',
          'Atelier producteur (olives, vigne, pain…)',
          'Dégustation et échanges',
          'Restitution collective',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Session stratégique',
          'Activité nature ou culturelle douce',
          'Déjeuner de clôture',
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
      'Falaises, ports et campagnes verdoyantes : la Bretagne offre un décor puissant pour un séminaire d’entreprise qui marque les esprits.',
      'Facilement accessible, elle invite vos équipes à ralentir, respirer et se reconnecter — entre océan, producteurs et savoir-faire locaux.',
      'TerraGo y crée des programmes où le travail rencontre le vivant : ateliers, rencontres et moments de partage face à l’horizon.',
    ],
    prosImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/Destination/197677686-34666032.jpg',
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
          'Arrivée et installation en bord de mer ou en campagne',
          'Ouverture du séminaire et icebreaker outdoor',
          'Découverte du territoire avec un hôte local',
          'Dîner produit local',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Matinée de travail en salle équipée',
          'Atelier producteur (maraîchage, cidre, huîtres…)',
          'Temps de dégustation et d’échange',
          'Restitution collective',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Session stratégique',
          'Balade nature ou activité maritime selon saison',
          'Déjeuner de clôture',
          'Départs',
        ],
      },
    ],
    producer: {
      name: 'Nathalie & Benjamin',
      role: 'Producteurs engagés',
      description:
        'Partagez le quotidien de Nathalie et Benjamin : visite, atelier les mains dans la terre et dégustation. Une immersion humaine qui renforce le lien d’équipe.',
      image: HOME_PRODUCERS[1].image,
      imageAlt: 'Nathalie et Benjamin, producteurs – TerraGo',
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
      'Châteaux, vignobles et jardins le long du fleuve : les Pays de la Loire offrent un cadre d’exception pour un séminaire d’entreprise inspirant.',
      'À moins de 2 h de Paris, vos équipes basculent dans un autre rythme — patrimoine vivant, producteurs engagés et paysages qui ouvrent les esprits.',
      'TerraGo y imagine des expériences ancrées dans le terroir — vignes, vergers, maraîchage — pour reconnecter vos collaborateurs au sens et au partage.',
    ],
    prosImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/Destination/11680885-17791202.jpg',
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
      'Séminaire résidentiel sur 2 ou 3 jours',
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
          'Arrivée et installation dans un domaine ou demeure de caractère',
          'Ouverture & icebreaker outdoor',
          'Découverte du territoire avec un producteur',
          'Dîner ligérien',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Matinée de travail',
          'Atelier vigne, verger ou cuisine producteur',
          'Dégustation et temps d’échange',
          'Restitution créative',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Session stratégique',
          'Balade le long de la Loire ou dans les jardins',
          'Déjeuner de clôture',
          'Départs',
        ],
      },
    ],
    producer: {
      name: 'Hugues & Marc',
      role: 'Maraîchers',
      description:
        'Chez Hugues et Marc, vos équipes découvrent le métier du maraîchage : visite des cultures, gestes du quotidien et dégustation. Un moment concret, humain et fédérateur.',
      image: HOME_PRODUCERS[3].image,
      imageAlt: 'Hugues et Marc, maraîchers – TerraGo',
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
    ...regionBase('auvergne'),
    heroImage: regionImage('auvergne'),
    heroImageAlt: 'Paysages d’Auvergne – séminaire TerraGo',
    intro: [
      'Volcans, lacs et plateaux : l’Auvergne offre un écrin naturel puissant pour un séminaire d’entreprise au vert.',
      'Loin des distractions urbaines, vos équipes retrouvent concentration, souffle et authenticité au contact du vivant.',
      'TerraGo y conçoit des programmes ancrés dans le territoire — producteurs, nature et moments de partage — pour un impact durable.',
    ],
    prosImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/auvergne/472819.avif',
    prosImageAlt: 'Fromages d’Auvergne en cave d’affinage',
    pros: [
      {
        title: 'Un cadre inspirant au cœur des volcans',
        text: 'Grands espaces, silence et nature préservée : l’Auvergne crée les conditions idéales pour réfléchir et se reconnecter.',
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
      'L’Auvergne est faite pour les séminaires qui veulent du vrai : nature, producteurs et temps de qualité loin du bruit ambiant.',
    programmeDays: [
      {
        label: 'Jour 1',
        items: [
          'Arrivée et installation en pleine nature',
          'Ouverture & icebreaker outdoor',
          'Découverte du territoire avec un producteur',
          'Dîner local et soirée au coin du feu',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Matinée de travail',
          'Atelier immersion (ferme, fromage, forêt…)',
          'Temps de dégustation et d’échange',
          'Restitution en équipe',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Session stratégique courte',
          'Randonnée douce ou activité nature',
          'Déjeuner de clôture',
          'Départs',
        ],
      },
    ],
    producer: {
      name: 'Hugues & Marc',
      role: 'Maraîchers',
      description:
        'Plongez dans le quotidien d’Hugues et Marc au potager : récolte, atelier et partage autour des bons produits. Une expérience concrète et fédératrice.',
      image: HOME_PRODUCERS[3].image,
      imageAlt: 'Hugues et Marc, maraîchers – TerraGo',
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
        q: 'L’Auvergne convient-elle aux séminaires RSE ?',
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
    ...regionBase('bourgogne'),
    heroImage: regionImage('bourgogne'),
    heroImageAlt: 'Vignobles de Bourgogne – séminaire TerraGo',
    intro: [
      'Vignobles, villages de pierre et campagnes généreuses : la Bourgogne incarne l’art de recevoir pour un séminaire d’entreprise d’exception.',
      'À proximité de Paris et Lyon, elle offre un cadre raffiné sans perdre l’authenticité du terroir.',
      'TerraGo y imagine des programmes autour du vin, des producteurs et du partage — pour un événement élégant et porteur de sens.',
    ],
    prosImage:
      'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/bourgogne/5289663206521.jpg',
    prosImageAlt: 'Cave à vin avec fûts de chêne en Bourgogne',
    pros: [
      {
        title: 'Un terroir d’exception',
        text: 'Vignes, caves et savoir-faire : la Bourgogne offre un terrain unique pour des expériences mémorables et structurantes.',
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
      'La Bourgogne réunit accessibilité, prestige du terroir et chaleur humaine — parfait pour un séminaire qui marque durablement.',
    programmeDays: [
      {
        label: 'Jour 1',
        items: [
          'Arrivée et installation dans un domaine',
          'Ouverture du séminaire',
          'Visite et introduction au terroir',
          'Dîner vigneron',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Matinée de travail',
          'Atelier vigne, assemblage ou cuisine du terroir',
          'Dégustation commentée',
          'Restitution en équipe',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Session stratégique',
          'Balade dans les vignes ou village',
          'Déjeuner de clôture',
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
        q: 'La Bourgogne est-elle adaptée aux séminaires d’entreprise ?',
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
      'Montagne, mer et villages perchés : la Corse offre un cadre spectaculaire pour un séminaire d’entreprise hors du commun.',
      'Île de caractère, elle invite vos équipes à une immersion forte — nature, producteurs et hospitalité corse.',
      'TerraGo y imagine des programmes sur mesure, entre travail, exploration et rencontres authentiques.',
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
          'Arrivée et installation',
          'Ouverture du séminaire',
          'Découverte du territoire',
          'Dîner corse',
        ],
      },
      {
        label: 'Jour 2',
        items: [
          'Matinée de travail',
          'Atelier producteur ou artisan local',
          'Temps de dégustation et d’échange',
          'Restitution en équipe',
        ],
      },
      {
        label: 'Jour 3',
        items: [
          'Session stratégique',
          'Activité nature (selon saison et forme du groupe)',
          'Déjeuner de clôture',
          'Départs',
        ],
      },
      {
        label: 'Jour 4',
        items: [
          'Option extension : exploration douce du territoire',
          'Temps libre ou activité surprise',
          'Clôture et départs',
        ],
      },
    ],
    producer: {
      name: 'Nathalie & Benjamin',
      role: 'Producteurs engagés',
      description:
        'Une immersion producteur pour comprendre un métier, partager un geste et créer du lien — au cœur d’un territoire corse authentique.',
      image: HOME_PRODUCERS[1].image,
      imageAlt: 'Producteurs partenaires TerraGo',
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
