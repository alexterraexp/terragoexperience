import { lieuDestinationPath } from './homeStorage';

export const FAQ_PATH = '/faq';

export type FaqExcerptKey =
  | 'rse'
  | 'au-vert'
  | 'team-building-original'
  | 'producteur'
  | 'budget'
  | 'seminaires';

export type FaqInlinePart =
  | string
  | { href: string; label: string }
  | { action: 'openSeminaireModal'; label: string };

export type FaqBlock =
  | { type: 'p'; parts: FaqInlinePart[] }
  | { type: 'ul'; items: string[] };

export type FaqItem = {
  id: string;
  question: string;
  blocks: FaqBlock[];
  excerpts: FaqExcerptKey[];
};

export type FaqSection = {
  id: string;
  emoji: string;
  title: string;
  /** Partie du titre affichée en gras sur la page FAQ */
  boldPhrase: string;
  items: FaqItem[];
};

const PATHS = {
  seminaires: '/seminaires-entreprise',
  rseEnjeu: '/seminaires-entreprise/sensibilisation-rse',
  cohesion: '/seminaires-entreprise/cohesion',
  experiences: '/experiences-entreprise',
  destinations: '/destinations',
  auVert: '/seminaires-entreprise/au-vert',
  original: '/seminaires-entreprise/original',
  producteur: lieuDestinationPath('chez-le-producteur'),
  partenaires: '/partenaires',
} as const;

export const FAQ_SECTIONS: FaqSection[] = [
  {
    id: 'organisation-budget',
    emoji: '🌱',
    title: 'Organisation & budget',
    boldPhrase: 'Organisation',
    items: [
      {
        id: 'quest-ce-quun-seminaire-entreprise',
        question: 'Qu’est-ce qu’un séminaire d’entreprise TerraGo ?',
        excerpts: [],
        blocks: [
          {
            type: 'p',
            parts: [
              'Un séminaire d’entreprise est un événement professionnel organisé hors du cadre habituel du bureau, pour travailler, prendre du recul, renforcer les liens ou simplement partager un moment d’équipe. Chez TerraGo, ce format se vit chez des ',
              { href: PATHS.partenaires, label: 'producteurs engagés' },
              ', dans des lieux authentiques où travail et expériences mémorables se mêlent. Découvrez nos ',
              { href: PATHS.seminaires, label: 'séminaires d’entreprise' },
              '.',
            ],
          },
        ],
      },
      {
        id: 'pourquoi-organiser-seminaire',
        question: 'Pourquoi organiser un séminaire d’entreprise ?',
        excerpts: [],
        blocks: [
          {
            type: 'p',
            parts: [
              'Un séminaire permet de sortir du quotidien, prendre du recul, renforcer la cohésion et créer de nouveaux échanges au sein des équipes. Chez TerraGo, l’expérience vécue ensemble chez un producteur donne aussi un cadre différent pour réfléchir, apprendre et partager. Explorez nos ',
              { href: PATHS.experiences, label: 'expériences entreprise' },
              ' et formats de ',
              { href: PATHS.cohesion, label: 'séminaire de cohésion' },
              '.',
            ],
          },
        ],
      },
      {
        id: 'quel-budget-seminaire',
        question: 'Quel budget prévoir pour un séminaire d’entreprise ?',
        excerpts: ['budget', 'seminaires'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Le budget dépend notamment du nombre de participants, du lieu, de la durée, de l’hébergement, des activités, de la restauration et du transport. TerraGo construit chaque programme sur mesure et vous transmet une proposition adaptée à votre projet.',
            ],
          },
        ],
      },
      {
        id: 'types-seminaires-entreprise',
        question: 'Quels types de séminaires d’entreprise organisez-vous ?',
        excerpts: ['seminaires'],
        blocks: [
          {
            type: 'p',
            parts: [
              'TerraGo organise notamment des séminaires de cohésion, des séminaires au vert, des séminaires de sensibilisation & RSE, des séminaires d’inspiration et des séminaires CODIR.',
            ],
          },
        ],
      },
      {
        id: 'ou-organiser-seminaire-entreprise',
        question: 'Où organiser un séminaire d’entreprise ?',
        excerpts: ['seminaires'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Nous proposons des lieux partout en France : fermes, vignobles, domaines, lieux en pleine nature, montagnes, littoral et autres cadres authentiques.',
            ],
          },
        ],
      },
      {
        id: 'combien-participants-seminaire',
        question: 'Combien de participants pouvez-vous accompagner ?',
        excerpts: ['seminaires'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Les formats sont adaptés à la taille du groupe. Selon le lieu et le programme, nous pouvons accompagner aussi bien de petites équipes que des groupes plus importants.',
            ],
          },
        ],
      },
      {
        id: 'personnaliser-seminaire',
        question: 'Peut-on personnaliser entièrement son séminaire ?',
        excerpts: ['seminaires'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Oui. Le lieu, les activités, la restauration, l’hébergement, le rythme de la journée et les différents temps collectifs peuvent être adaptés à vos objectifs et à vos contraintes.',
            ],
          },
        ],
      },
      {
        id: 'seminaire-avec-hebergement',
        question: 'Pouvez-vous organiser un séminaire avec hébergement ?',
        excerpts: ['seminaires'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Oui. TerraGo peut organiser des formats résidentiels avec hébergement, restauration, activités et coordination.',
            ],
          },
        ],
      },
      {
        id: 'transport-seminaire',
        question: 'TerraGo prend-il en charge le transport ?',
        excerpts: ['seminaires'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Selon votre projet, nous pouvons intégrer le transport à l’organisation et coordonner les différents prestataires nécessaires au bon déroulement du séjour.',
            ],
          },
        ],
      },
      {
        id: 'delai-organiser-seminaire',
        question: 'Combien de temps faut-il prévoir pour organiser un séminaire ?',
        excerpts: ['seminaires'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Plus vous anticipez, plus le choix de lieux et de dates est important. TerraGo peut néanmoins étudier des demandes plus urgentes selon les disponibilités de ses partenaires.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'format-logistique',
    emoji: '💡',
    title: 'Format & logistique',
    boldPhrase: 'logistique',
    items: [
      {
        id: 'comment-choisir-lieu',
        question: 'Comment choisir le lieu d’un séminaire d’entreprise ?',
        excerpts: [],
        blocks: [
          {
            type: 'p',
            parts: [
              'Le choix dépend de vos objectifs, du budget, de l\'accessibilité (transports) et de la taille du groupe. Privilégiez un lieu en adéquation avec la culture de votre entreprise, offrant un bon équilibre entre espaces de travail équipés et zones d\'activités. Pour vous donner quelques idées, jetez un oeil à nos ',
              { href: PATHS.destinations, label: 'destinations de séminaire en France' },
              '.',
            ],
          },
        ],
      },
      {
        id: 'duree-seminaire',
        question: 'Combien de temps dure un séminaire d’entreprise ?',
        excerpts: [],
        blocks: [
          {
            type: 'p',
            parts: [
              'Un séminaire peut durer une journée, deux jours ou plusieurs jours, selon vos objectifs et le format choisi. La journée d’étude convient à un format concentré, tandis qu’un séminaire résidentiel permet de prendre davantage le temps de travailler, partager et profiter pleinement des lieux et des expériences. Pour connaître les possibilités, ',
              { action: 'openSeminaireModal', label: 'parlons-en ensemble' },
              '.',
            ],
          },
        ],
      },
      {
        id: 'quand-organiser-seminaire',
        question: 'Quand organiser un séminaire d’entreprise ?',
        excerpts: [],
        blocks: [
          {
            type: 'p',
            parts: [
              'Les périodes clés sont le début d\'année (lancement et objectifs), le printemps (dynamique d\'équipe) et la rentrée de septembre. Évitez les périodes de congés scolaires et de clôtures comptables. Pour sécuriser les meilleurs lieux, anticipez via une ',
              { action: 'openSeminaireModal', label: 'demande de séminaire' },
              '.',
            ],
          },
        ],
      },
      {
        id: 'residentiel-ou-journee',
        question: 'Séminaire résidentiel ou séminaire à la journée ?',
        excerpts: ['budget'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Le choix dépend surtout de votre objectif, du temps que vous souhaitez consacrer au séminaire et du budget disponible. Une journée permet de réunir les équipes sur un format efficace et plus accessible, tandis qu’un résidentiel de 2 à plusieurs jours laisse davantage de place au travail, aux activités et aux moments informels.  ',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'idees-team-building',
    emoji: '💡',
    title: 'Idées & team building',
    boldPhrase: '& team building',
    items: [
      {
        id: 'meilleures-idees-seminaire',
        question: 'Quelles sont les meilleures idées de séminaire d’entreprise ?',
        excerpts: ['team-building-original'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Les séminaires les plus marquants sont souvent ceux où l’on fait quelque chose ensemble : atelier chez un producteur, activité manuelle, dégustation, défi collectif, découverte d’un savoir-faire ou immersion en pleine nature. Chez TerraGo, nous privilégions des expériences authentiques, participatives et adaptées à votre équipe, plutôt que des animations standardisées. Inspirez-vous de nos ',
              { href: PATHS.experiences, label: 'expériences entreprise' },
              ' et ',
              { href: PATHS.cohesion, label: 'séminaires de cohésion' },
              '.',
            ],
          },
        ],
      },
      {
        id: '10-idees-seminaire-au-vert',
        question: 'Quelles sont les 10 meilleures idées de séminaire au vert pour une entreprise ?',
        excerpts: ['au-vert'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Voici 10 idées pour sortir du cadre habituel et créer une vraie expérience d’équipe, ',
              { href: PATHS.auVert, label: 'au vert' },
              ' :',
            ],
          },
          {
            type: 'ul',
            items: [
              'Défi agricole : récolte, plantation ou mission collective chez un producteur',
              'Escape game apicole au cœur d’une exploitation',
              'Challenge cuisine du terroir en équipe',
              'Vendanges ou récolte participative',
              'Atelier manuel chez un artisan ou un producteur',
              'Rallye nature à pied ou à vélo',
              'Challenge sportif outdoor en pleine nature',
              'Défi biodiversité : plantation, restauration de haies ou découverte du vivant',
              'Dégustation à l’aveugle et découverte des produits locaux',
              'Jeu grandeur nature ou challenge collectif dans un domaine rural',
            ],
          },
        ],
      },
      {
        id: '10-idees-seminaire-original',
        question: 'Quels séminaires originaux peut-on organiser avec TerraGo ?',
        excerpts: ['team-building-original'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Chez TerraGo, chaque séminaire est construit autour d’un lieu, d’un producteur et d’une expérience. Les formats peuvent aussi mélanger travail, sport, détente, gastronomie et découverte du territoire :',
            ],
          },
          {
            type: 'ul',
            items: [
              'Séminaire pimenté au Pays Basque : défi autour du piment, activité sportive, repas basque et découverte du territoire.',
              'Séminaire vélo & terroir : sortie à vélo entre producteurs, étapes gourmandes, dégustations et grande tablée.',
              'Séminaire vendanges & convivialité : réunion dans un domaine, vendanges participatives, dégustation et dîner au chai.',
              'Séminaire oléicole : balade à vélo ou randonnée dans les oliviers, atelier autour de l’huile, dégustation et repas.',
              'Séminaire fromager : immersion dans une ferme, fabrication de fromage, challenge en équipe et repas fermier.',
              'Séminaire apicole : découverte des ruches, escape game apicole, atelier autour du miel et dégustation.',
              'Séminaire sport & détente : activité outdoor le matin, temps de relaxation ou bien-être l’après-midi et dîner chez le producteur.',
              'Séminaire de la ferme à l’assiette : activité manuelle, challenge cuisine en équipe et repas préparé avec les produits de la ferme.',
              'Séminaire nature & biodiversité : randonnée, défi collectif, activité participative et déjeuner au vert.',
              'Séminaire terroir & challenge : olympiades rurales, dégustations à l’aveugle, défis entre équipes et soirée conviviale.',
            ],
          },
          {
            type: 'p',
            parts: [
              'Le principe : on ne plaque pas une animation sur un lieu. On construit un séminaire cohérent autour du producteur, du territoire et de vos objectifs d’équipe. Découvrez ',
              { href: PATHS.experiences, label: 'nos expériences entreprise' },
              ' ou réalisez une ',
              { action: 'openSeminaireModal', label: 'demande de séminaire' },
              '.',
            ],
          },
        ],
      },
      {
        id: '20-idees-team-building',
        question: '20 idées de team building originales',
        excerpts: ['team-building-original'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Une sélection d’expériences pour sortir du bureau, découvrir un savoir-faire et vivre quelque chose ensemble, directement chez des ',
              { href: PATHS.experiences, label: 'producteurs engagés' },
              ' :',
            ],
          },
          {
            type: 'ul',
            items: [
              'Récolte en équipe — fruits, légumes, plantes aromatiques ou vendanges selon la saison.',
              'Olympiades du producteur — une série de défis inspirés du quotidien de l’exploitation : récolte, tri, précision, rapidité et dégustation.',
              'Défi cuisine du terroir — les équipes cuisinent ensemble à partir de produits récoltés ou fournis par le producteur.',
              'Plantation collective — arbres, haies, vignes, légumes ou plantes aromatiques : chacun met littéralement les mains dans la terre.',
              'Immersion dans une ferme — découvrir les coulisses d’une exploitation et participer aux tâches du jour.',
              'De la terre à l’assiette — récolter les ingrédients, cuisiner puis partager le repas tous ensemble.',
              'Défi récolte — quelle équipe récoltera le plus efficacement sans abîmer les produits ?',
              'Atelier pain au levain — fabriquer son pain de A à Z avec un boulanger ou un producteur de céréales.',
              'Vendanges en équipe — récolte, découverte du domaine et dégustation autour du travail de la vigne.',
              'Défi maraîcher — reconnaître les légumes, récolter, planter et relever des défis autour du potager.',
              'Rallye des producteurs — partir à la rencontre de plusieurs producteurs d’un même territoire à travers des défis gourmands.',
              'Atelier autour du fromage — découverte du métier, fabrication ou affinage, puis dégustation à l’aveugle.',
              'Immersion chez un apiculteur — découverte de la ruche, du rôle des abeilles et atelier autour du miel.',
              'Défi dégustation à l’aveugle — reconnaître produits, arômes et spécialités du territoire en équipe.',
              'Olympiades agricoles — bottes aux pieds, les équipes s’affrontent sur des épreuves inspirées de la vie à la ferme.',
              'Atelier transmission de savoir-faire — apprendre un geste directement auprès d’un producteur : travailler le bois, tresser, cuisiner, transformer…',
              'Chasse au trésor du terroir — explorer un domaine ou un village à travers son histoire, ses paysages et ses producteurs.',
              'Défi zéro déchet — transformer, cuisiner ou valoriser les produits et ressources disponibles sur l’exploitation.',
              'Création collective au naturel — construire une œuvre, un aménagement ou une installation à partir de matériaux présents sur le site.',
              'Le défi du producteur — une journée en équipes pour relever plusieurs missions directement inspirées du métier et repartir avec une production collective.',
            ],
          },
          {
            type: 'p',
            parts: [
              'Toutes ces idées se déclinent dans ',
              { href: PATHS.experiences, label: 'nos expériences entreprise' },
              '.',
            ],
          },
        ],
      },
      {
        id: 'team-building-cohesion',
        question: 'Quel team building pour renforcer la cohésion d’équipe ?',
        excerpts: ['team-building-original'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Les activités fondées sur l\'entraide, le faire-ensemble et le partage d\'expérience — comme la préparation d\'un repas collectif avec des produits bruts ou un chantier participatif — sont les plus efficaces pour créer de vrais liens humains. C’est le cœur de nos ',
              { href: PATHS.cohesion, label: 'séminaires cohésion' },
              '.',
            ],
          },
        ],
      },
      {
        id: 'activites-originales-seminaire',
        question: 'Quelles activités originales pour un séminaire d’entreprise ?',
        excerpts: ['team-building-original'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Misez sur les activités immersives et collectives : vous initier au maraîchage, fabriquer son propre fromage, participer à une cueillette sauvage ou relever un défi d\'éco-conception en équipe.',
              '.',
            ],
          },
        ],
      },
      {
        id: 'sortir-du-classique',
        question: 'Comment sortir du séminaire d’entreprise classique ?',
        excerpts: ['team-building-original'],
        blocks: [
          {
            type: 'p',
            parts: [
              'En supprimant les salles de réunion impersonnelles et les activités génériques au profit d\'immersion dans des lieux incarnés, vivants et tenus par des passionnés (producteurs, artisans, domaines éco-responsables). TerraGo conçoit précisément ce type de ',
              { href: PATHS.original, label: 'séminaire original' },
              '.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'nature-au-vert',
    emoji: '🌿',
    title: 'Nature & séminaire au vert',
    boldPhrase: 'séminaire au vert',
    items: [
      {
        id: 'pourquoi-seminaire-au-vert',
        question: 'Pourquoi choisir un séminaire au vert ?',
        excerpts: ['au-vert'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Sortir du bureau permet de changer de rythme, prendre du recul et partager autrement entre collègues. Chez TerraGo, le ',
              { href: PATHS.auVert, label: 'séminaire au vert' },
              ' se vit dans des lieux authentiques, souvent directement chez des producteurs.',
            ],
          },
        ],
      },
      {
        id: 'activites-seminaire-au-vert',
        question: 'Séminaire au vert : quelles activités choisir ?',
        excerpts: ['au-vert'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Les possibilités vont bien au-delà de la randonnée : vélo, challenge sportif, activité manuelle, découverte de la biodiversité, atelier sensoriel, dégustation ou moment de détente. On peut aussi alterner activité et temps de travail pour garder un vrai équilibre sur la journée.',
            ],
          },
        ],
      },
      {
        id: 'ou-seminaire-au-vert-france',
        question: 'Où organiser un séminaire au vert en France ?',
        excerpts: ['au-vert'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Il n’est pas nécessaire de partir à l’autre bout de la France : de nombreux lieux accessibles depuis les grandes villes permettent de s’immerger rapidement dans la nature. Fermes, domaines viticoles, oliveraies, forêts ou exploitations agricoles : TerraGo sélectionne des lieux qui permettent de sortir réellement du cadre habituel. Parcourez nos ',
              { href: PATHS.destinations, label: 'destinations' },
              '.',
            ],
          },
        ],
      },
      {
        id: 'activites-nature-team-building',
        question: 'Quelles activités nature pour un team building ?',
        excerpts: ['au-vert'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Rallye nature, randonnée, vélo, défi biodiversité, plantation, découverte des plantes, challenge en forêt ou activité agricole : les activités sont choisies selon le lieu et l’énergie recherchée pour votre équipe. L’objectif est de créer un moment collectif, pas simplement de « faire une activité nature ».',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'rse-impact',
    emoji: '🌍',
    title: 'RSE, éco-responsabilité & impact',
    boldPhrase: 'RSE, éco-responsabilité',
    items: [
      {
        id: 'quest-ce-seminaire-eco-responsable',
        question: 'Qu’est-ce qu’un séminaire éco-responsable ?',
        excerpts: ['rse'],
        blocks: [
          {
            type: 'p',
            parts: [
              'C’est un séminaire pensé pour limiter son impact environnemental tout en favorisant l’économie locale : mobilité douce, lieu engagé, produits locaux et de saison, gestion raisonnée des ressources… Chez TerraGo, nous privilégions surtout les pratiques concrètes plutôt que les labels seuls.',
            ],
          },
        ],
      },
      {
        id: 'comment-organiser-seminaire-rse',
        question: 'Comment organiser un séminaire RSE ?',
        excerpts: ['rse'],
        blocks: [
          {
            type: 'p',
            parts: [
              'La RSE peut être intégrée à toute l’expérience : choix du lieu, transport, alimentation, activités et hébergement. Chez TerraGo, elle passe aussi par la rencontre directe avec des producteurs et la découverte de leurs pratiques. Découvrez nos formats de ',
              { href: PATHS.rseEnjeu, label: 'séminaire RSE' },
              '.',
            ],
          },
        ],
      },
      {
        id: 'quest-ce-seminaire-a-impact',
        question: 'Qu’est-ce qu’un séminaire à impact ?',
        excerpts: ['rse'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Un séminaire à impact cherche à générer des retombées positives et concrètes sur le territoire. En travaillant directement avec des producteurs et des acteurs locaux, votre entreprise contribue à faire vivre leurs activités et leurs savoir-faire.',
            ],
          },
        ],
      },
      {
        id: 'choisir-team-building-eco-responsable',
        question: 'Comment choisir une activité de team building éco-responsable ?',
        excerpts: ['rse'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Privilégiez une activité qui a du sens pour le territoire : plantation, découverte de la biodiversité, activité agricole, atelier chez un artisan, cuisine locale ou défi collectif. L’important est que l’activité soit cohérente avec le lieu et réellement utile ou enrichissante pour les participants.',
            ],
          },
        ],
      },
      {
        id: 'eviter-greenwashing',
        question: 'Comment éviter le greenwashing lors d’un séminaire ?',
        excerpts: ['rse'],
        blocks: [
          {
            type: 'p',
            parts: [
              'En privilégiant les actions concrètes plutôt que les gadgets : travailler avec des acteurs locaux, choisir des produits de saison, limiter les déplacements inutiles et pouvoir expliquer clairement ce que votre séminaire apporte au territoire. Chez TerraGo, nous cherchons à rendre cet impact visible et compréhensible.',
            ],
          },
        ],
      },
      {
        id: 'activites-seminaire-engage',
        question: 'Quelles activités pour un séminaire engagé ?',
        excerpts: ['rse'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Plantation d’arbres ou de haies, découverte d’une ferme engagée, chantier biodiversité, atelier zéro déchet, activité agricole, rencontre avec un producteur ou atelier autour des savoir-faire locaux : les possibilités sont nombreuses et adaptées au territoire comme aux objectifs de l’équipe.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'producteurs-terroir',
    emoji: '🌾',
    title: 'Producteurs & terroir',
    boldPhrase: 'Producteurs',
    items: [
      {
        id: 'pourquoi-seminaire-chez-producteur',
        question: 'Pourquoi organiser un séminaire chez un producteur ?',
        excerpts: ['producteur'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Pour vivre une expérience authentique et incarnée, loin des lieux de séminaire traditionnels. On découvre un métier, un savoir-faire et un territoire, tout en partageant des moments simples autour d’une activité ou d’une grande tablée. Découvrez le format ',
              { href: PATHS.producteur, label: 'séminaire chez le producteur' },
              '.',
            ],
          },
        ],
      },
      {
        id: 'quest-ce-seminaire-chez-producteur',
        question: 'Qu’est-ce qu’un séminaire chez un producteur ?',
        excerpts: ['producteur'],
        blocks: [
          {
            type: 'p',
            parts: [
              'C’est un séminaire organisé directement dans une ferme, un domaine viticole, une exploitation agricole, une brasserie ou chez un artisan. Le lieu devient à la fois votre cadre de travail et votre terrain d’expérience, avec des activités, des repas et des rencontres adaptés à votre groupe.',
            ],
          },
        ],
      },
      {
        id: 'comment-selectionnez-producteurs',
        question: 'Comment sélectionnez-vous vos producteurs ?',
        excerpts: ['producteur'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Nous privilégions des lieux charmants, authentiques et adaptés aux groupes, portés par des producteurs qui aiment transmettre leur métier et s’engagent à produire bien et bon. Pas besoin d’un label : nous regardons surtout les pratiques concrètes et l’engagement éco-responsable. Découvrez nos ',
              { href: PATHS.partenaires, label: 'producteurs partenaires' },
              '.',
            ],
          },
        ],
      },
      {
        id: 'activites-chez-producteur',
        question: 'Quelles activités peut-on faire chez un producteur ?',
        excerpts: ['producteur'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Les possibilités dépendent du lieu et de la saison : activité manuelle, visite de l’exploitation, dégustation, atelier cuisine, récolte, fabrication, défi ou challenge en équipe. Le tout peut se terminer autour d’une grande tablée avec les produits du lieu ou du territoire.',
            ],
          },
        ],
      },
      {
        id: 'logements-chez-producteurs',
        question: 'Les logements sont-ils forcément chez les producteurs ?',
        excerpts: ['producteur'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Non. Certains producteurs disposent de 15 à 80/90 couchages sur leur domaine. Lorsque ce n’est pas possible, nous proposons des hébergements partenaires à proximité, avec plusieurs options selon le groupe et le format souhaité.',
            ],
          },
        ],
      },
      {
        id: 'pourquoi-integrer-terroir',
        question: 'Pourquoi intégrer le terroir dans un séminaire d’entreprise ?',
        excerpts: ['producteur'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Parce que le terroir permet de rassembler autour d’une expérience concrète : découvrir un produit, comprendre un métier, partager un repas typique et rencontrer ceux qui font vivre le territoire. C’est une façon simple de créer des moments de convivialité qui sortent du cadre habituel.',
            ],
          },
        ],
      },
      {
        id: 'team-building-terroir',
        question: 'Qu’est-ce qu’un team building autour du terroir ?',
        excerpts: ['producteur'],
        blocks: [
          {
            type: 'p',
            parts: [
              'C’est un team building qui utilise les produits et savoir-faire locaux comme terrain de jeu : challenge cuisine, rallye dégustation, fabrication de fromage, d’huile ou de parfum, olympiades rurales, récolte ou défi chez un producteur. Les activités sont choisies en fonction du lieu, de la saison et de votre équipe.',
            ],
          },
        ],
      },
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = FAQ_SECTIONS.flatMap((section) => section.items);

export function getFaqItem(id: string): FaqItem | undefined {
  return FAQ_ITEMS.find((item) => item.id === id);
}

export function getFaqExcerptItems(key: FaqExcerptKey, limit = 3): FaqItem[] {
  return FAQ_ITEMS.filter((item) => item.excerpts.includes(key)).slice(0, limit);
}

export function faqAnswerPlainText(item: FaqItem): string {
  return item.blocks
    .map((block) => {
      if (block.type === 'p') {
        return block.parts
          .map((part) => (typeof part === 'string' ? part : part.label))
          .join('');
      }
      return block.items.map((line) => `• ${line}`).join('\n');
    })
    .join('\n\n');
}

export function buildFaqPageJsonLd(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faqAnswerPlainText(item),
      },
    })),
    url: `${siteUrl}${FAQ_PATH}`,
    inLanguage: 'fr-FR',
  };
}
