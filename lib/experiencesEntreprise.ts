export const EXPERIENCES_ENTREPRISE_SLUGS = ['1', '2', '3'] as const;

export type ExperienceEntrepriseSlug = (typeof EXPERIENCES_ENTREPRISE_SLUGS)[number];

export type ExperienceExample = {
  id: string;
  title: string;
  teaser: string;
  description: string;
  image: string;
  imageAlt: string;
};

export type ExperienceCategory = {
  slug: ExperienceEntrepriseSlug;
  number: number;
  /** Image à gauche sur les cartes (sinon panneau orange à gauche). */
  imageLeft: boolean;
  sectionTitle: string;
  ctaLabel: string;
  ctaHref: string;
  detailTitle: string;
  detailLead: string;
  detailBody: string[];
  /** Carte d’intro fixe (non swipable). */
  intro: ExperienceExample;
  /** Titre au-dessus du carrousel d’exemples (optionnel). */
  slidesHeading?: string;
  /** Exemples swipables. */
  examples: ExperienceExample[];
};

const HOME =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME';

export const EXPERIENCES_ENTREPRISE_ASSETS = {
  hero: `${HOME}/travail-pain-pate.png`,
  feu: `${HOME}/emoji/feu.png`,
  piment: `${HOME}/emoji/piment.png`,
  etoile: `${HOME}/etoilecouleurfoncee.png`,
} as const;

export const EXPERIENCES_ENTREPRISE: ExperienceCategory[] = [
  {
    slug: '1',
    number: 1,
    imageLeft: true,
    sectionTitle: 'Team building — les mains dans la terre',
    ctaLabel: 'Découvrez nos team buildings',
    ctaHref: '/seminaires-entreprise/offres',
    detailTitle: 'Team building chez les producteurs',
    detailLead: 'Recréer du lien et se ressourcer au cœur de la nature.',
    detailBody: [
      'Pendant une demi-journée ou une journée, nous vous emmenons à la rencontre de nos producteurs engagés pour vivre une expérience humaine forte autour du travail de la terre et du produit brut.',
      'Au programme : visite de l’exploitation, atelier les mains dans la terre avec le producteur, et dégustation partagée des bons produits.',
    ],
    intro: {
      id: '1-intro',
      title: 'Team building — les mains dans la terre',
      teaser: 'Recréer du lien et se ressourcer au cœur de la nature.',
      description:
        'Vos équipes deviennent actrices d’une expérience authentique : récolter, fabriquer, goûter, et surtout partager aux côtés de producteurs passionnés.',
      image: `${HOME}/Oliviers-recolte.png`,
      imageAlt: 'Récolte d’olives en équipe – team building TerraGo',
    },
    examples: [
      {
        id: '1a',
        title: 'Immersion et récolte',
        teaser: 'Vivre la saison, aux côtés du producteur.',
        description:
          'Plongez dans le quotidien d’une exploitation : récoltez fruits, légumes ou olives et découvrez le rythme réel du métier.',
        image: `https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/olives-recoltes.JPG`,
        imageAlt: 'Récolte de noisettes en équipe – TerraGo',
      },
      {
        id: '1b',
        title: 'Taille et plantations',
        teaser: 'Des gestes concrets, une trace sur le territoire.',
        description:
          'Apprenez la taille et la plantation avec l’hôte, et laissez derrière vous un geste utile pour la saison à venir.',
        image: `${HOME}/producteur-maraicher.png`,
        imageAlt: 'Plantations avec un producteur – TerraGo',
      },
      {
        id: '1c',
        title: 'Ateliers culinaires',
        teaser: 'De la récolte à la transformation, des moments authentiques à partager.',
        description:
          'Cuisinez, pétrissez ou pressez aux côtés d’un producteur passionné : un atelier collectif où chacun repart avec le fruit du travail d’équipe.',
        image: `${HOME}/Oliviers-recolte.png`,
        imageAlt: 'Récolte d’olives pour huile – TerraGo',
      },
      {
        id: '1d',
        title: 'Travail de produit brut',
        teaser: 'Laine, bois et matières premières du territoire.',
        description:
          'Transformez la matière — laine, bois ou autres fibres locales — et découvrez des savoir-faire artisanaux souvent méconnus.',
        image: `${HOME}/travail-pain-pate.png`,
        imageAlt: 'Travail de produit brut – TerraGo',
      },
      {
        id: '1e',
        title: 'Assemblage alcoolisé',
        teaser: 'Vin, spiritueux, bière : créez votre assemblage.',
        description:
          'Composez votre assemblage avec un vigneron, un distillateur ou un brasseur : dégustation, création et partage en équipe.',
        image: `${HOME}/repas-convivial.png`,
        imageAlt: 'Dégustation et assemblage – TerraGo',
      },
    ],
  },
  {
    slug: '2',
    number: 2,
    imageLeft: false,
    sectionTitle: 'Séminaires RSE & expériences au vert',
    ctaLabel: 'Organisez votre séminaire',
    ctaHref: '/seminaires-entreprise',
    detailTitle: 'Séminaires RSE',
    detailLead: 'Renforcez l’engagement de vos collaborateurs grâce à nos séminaires RSE.',
    detailBody: [
      'Participez à des ateliers concrets et impactants qui font sens pour votre entreprise et vos salariés.',
      'De la cuisine anti-gaspillage à la découverte de l’agriculture engagée, découvrez nos programmes conçus pour agir.',
    ],
    intro: {
      id: '2-intro',
      title: 'Séminaires RSE & expériences au vert',
      teaser: 'Donner du sens à vos événements d’entreprise',
      description:
        'Un séminaire peut être bien plus qu’un moment de cohésion : il peut devenir une expérience qui sensibilise, transmet et reconnecte vos équipes aux enjeux actuels. TerraGo imagine des séminaires responsables en lien direct avec les acteurs engagés des territoires.',
      image: `${HOME}/eleveuse.png`,
      imageAlt: 'Éleveuse avec son troupeau – séminaire RSE TerraGo',
    },
    examples: [
      {
        id: '2a',
        title: '🌱 La rencontre avec des agriculteurs engagés',
        teaser: 'Comprendre une agriculture plus durable.',
        description:
          'Échangez avec celles et ceux qui développent une agriculture plus durable et découvrez leurs démarches.',
        image: `${HOME}/producteur-maraicher.png`,
        imageAlt: 'Agriculteur engagé – séminaire RSE TerraGo',
      },
      {
        id: '2b',
        title: '♻️ Les circuits courts et l’économie locale',
        teaser: 'Valoriser les filières de proximité.',
        description:
          'Comprenez l’impact de vos choix de consommation et valorisez les filières locales.',
        image: `${HOME}/maraicher-explication.png`,
        imageAlt: 'Circuits courts et économie locale – TerraGo',
      },
      {
        id: '2c',
        title: '🦋 La biodiversité et la préservation des écosystèmes',
        teaser: 'Agir pour le vivant, sur le terrain.',
        description:
          'Participez à des ateliers autour de la nature, des paysages et de la protection du vivant.',
        image: `${HOME}/eleveuse.png`,
        imageAlt: 'Biodiversité et écosystèmes – TerraGo',
      },
      {
        id: '2d',
        title: '🤝 La transmission des savoir-faire',
        teaser: 'Métiers, gestes et histoires à partager.',
        description:
          'Créez du lien entre générations en découvrant des métiers, des gestes et des histoires souvent méconnus.',
        image: `${HOME}/team-terrago.png`,
        imageAlt: 'Transmission de savoir-faire – TerraGo',
      },
    ],
  },
  {
    slug: '3',
    number: 3,
    imageLeft: true,
    sectionTitle: 'Conventions & événements d’entreprise',
    ctaLabel: 'Imaginez votre événement',
    ctaHref: '/demande-seminaire',
    detailTitle: 'Conventions & événements d’entreprise',
    detailLead: 'Donner du sens et de l’authenticité à vos événements.',
    detailBody: [
      'Nous mettons à votre disposition des lieux de caractère en plein cœur du terroir. Vivez un moment suspendu, entre travail et détente, pour marquer les esprits et fédérer vos équipes.',
    ],
    intro: {
      id: '3-intro',
      title: 'Conventions & événements d’entreprise',
      teaser: 'Donner du sens et de l’authenticité à vos événements.',
      description:
        'Lieux atypiques et chaleureux pour rassembler collaborateurs, clients ou partenaires au cœur du terroir.',
      image: `${HOME}/pique-nique-convivial.png`,
      imageAlt: 'Pique-nique convivial en vignoble – événement TerraGo',
    },
    examples: [
      {
        id: '3a',
        title: '🚀 Lancement de marque',
        teaser: 'Présentez votre nouvelle offre dans un lieu authentique.',
        description:
          'Présentez votre nouvelle offre ou votre nouvelle identité dans un lieu authentique, entouré d’acteurs locaux et d’expériences mémorables.',
        image: `${HOME}/pique-nique-convivial.png`,
        imageAlt: 'Lancement de marque – événement TerraGo',
      },
      {
        id: '3b',
        title: '🎤 Convention entreprise',
        teaser: 'Une convention annuelle devenue expérience collective.',
        description:
          'Transformez votre convention annuelle en véritable expérience collective mêlant temps forts professionnels, découvertes locales et moments de partage.',
        image: `${HOME}/team-terrago.png`,
        imageAlt: 'Convention d’entreprise – TerraGo',
      },
      {
        id: '3c',
        title: '🥂 Soirée corporate',
        teaser: 'Une soirée différente, ancrée dans le terroir.',
        description:
          'Imaginez une soirée différente : dîner chez un producteur, dégustation privée, rencontre avec un artisan ou animation autour du terroir.',
        image: `${HOME}/repas-convivial.png`,
        imageAlt: 'Soirée corporate chez un producteur – TerraGo',
      },
      {
        id: '3d',
        title: '🤝 Événement clients',
        teaser: 'Une expérience exclusive qui reflète vos valeurs.',
        description:
          'Offrez à vos clients une expérience exclusive qui reflète vos valeurs et crée une relation durable.',
        image: `${HOME}/maraicher-explication.png`,
        imageAlt: 'Événement clients – TerraGo',
      },
      {
        id: '3e',
        title: '🌿 Expérience collaborateurs',
        teaser: 'Remercier vos équipes autrement.',
        description:
          'Remerciez vos équipes avec une journée ou un séjour qui combine découverte, convivialité et reconnexion.',
        image: `${HOME}/Oliviers-recolte.png`,
        imageAlt: 'Expérience collaborateurs – TerraGo',
      },
    ],
  },
];

export function getExperienceEntreprise(slug: string): ExperienceCategory | undefined {
  return EXPERIENCES_ENTREPRISE.find((e) => e.slug === slug);
}

export const EXPERIENCES_ENTREPRISE_FAQ = [
  {
    q: 'Les expériences sont-elles entièrement personnalisables ?',
    a: 'Oui. Chaque projet est construit sur mesure selon vos objectifs, la taille du groupe, votre budget et l’ambiance recherchée.',
  },
  {
    q: 'À partir de combien de personnes organisez-vous une expérience ?',
    a: 'Nous accompagnons aussi bien de petits comités que des groupes plus larges. Le format et le lieu s’adaptent au nombre de participants.',
  },
  {
    q: 'Peut-on vous solliciter pour des séminaires d’une seule journée seulement ?',
    a: 'Bien sûr. Nous proposons des formats à la journée, sur deux jours, ou des programmes résidentiels plus longs.',
  },
  {
    q: 'Les producteurs participent-ils aux expériences ?',
    a: 'Oui : c’est le cœur de TerraGo. Vos équipes vivent l’expérience aux côtés de producteurs engagés, qui partagent leur métier et leur passion.',
  },
  {
    q: 'Proposez-vous également de tout organiser (restauration, transport) ?',
    a: 'Oui. TerraGo peut prendre en charge tout ou partie de l’organisation : lieu, hébergement, restauration, transport, activités et coordination sur place.',
  },
  {
    q: 'Les ateliers et expériences sont-ils adaptés à tous les niveaux de forme ?',
    a: 'Oui. Nos ateliers sont conçus pour être accessibles à tous. Nous adaptons l’intensité des activités selon le profil de votre groupe.',
  },
  {
    q: 'Organisez-vous uniquement des événements ?',
    a: 'Nous imaginons séminaires, team buildings, conventions, lancements, événements clients et expériences collaborateurs — toujours ancrés dans le terroir.',
  },
  {
    q: 'Comment obtenir un devis pour une prestation ?',
    a: 'Partagez-nous votre brief via le formulaire : nous revenons vers vous rapidement avec une proposition adaptée à votre projet.',
  },
] as const;
