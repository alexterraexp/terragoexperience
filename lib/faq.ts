export const FAQ_PATH = '/faq';

export type FaqExcerptKey =
  | 'rse'
  | 'au-vert'
  | 'team-building-original'
  | 'producteur'
  | 'budget';

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
  items: FaqItem[];
};

const PATHS = {
  seminaires: '/seminaires-entreprise',
  rseEnjeu: '/seminaires-entreprise/sensibilisation-rse',
  cohesion: '/seminaires-entreprise/cohesion',
  experiences: '/experiences-entreprise',
  destinations: '/destinations',
  auVert: '/destinations/lieux/en-pleine-nature',
  producteur: '/destinations/lieux/chez-le-producteur',
  partenaires: '/partenaires',
} as const;

export const FAQ_SECTIONS: FaqSection[] = [
  {
    id: 'organisation-budget',
    emoji: '🌱',
    title: 'Organisation & budget',
    items: [
      {
        id: 'quest-ce-quun-seminaire-entreprise',
        question: 'Qu’est-ce qu’un séminaire d’entreprise ?',
        excerpts: [],
        blocks: [
          {
            type: 'p',
            parts: [
              'Un séminaire d\'entreprise est un événement professionnel hors du cadre habituel du bureau. Il rassemble les collaborateurs pour travailler sur des enjeux stratégiques, renforcer la cohésion d\'équipe ou célébrer des réussites dans un environnement propice à la prise de recul. Chez TerraGo, ce format se vit chez des producteurs engagés : découvrez nos ',
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
              'Il permet de briser la routine, d\'aligner la vision des équipes, de stimuler la créativité et d\'améliorer la communication interne. C\'est un levier puissant d\'engagement et de fidélisation des collaborateurs. Pour caler le format à vos enjeux, parcourez nos ',
              { href: PATHS.seminaires, label: 'offres de séminaire' },
              '.',
            ],
          },
        ],
      },
      {
        id: 'seminaire-combien-ca-coute',
        question: 'Séminaire entreprise : combien ça coûte ?',
        excerpts: ['budget'],
        blocks: [
          {
            type: 'p',
            parts: [
              'À partir de 120 € par personne pour une journée classique, et à partir de 200 € par jour par personne pour un format résidentiel complet. Pour un chiffrage adapté à votre groupe, lancez une ',
              { action: 'openSeminaireModal', label: 'demande de séminaire' },
              '.',
            ],
          },
        ],
      },
      {
        id: 'quel-budget-seminaire',
        question: 'Quel budget pour un séminaire d’entreprise ?',
        excerpts: ['budget'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Définissez votre budget en fonction de 4 postes clés : transport, hébergement/restauration, location des espaces et activités. Privilégiez la qualité de la restauration et de l\'expérience plutôt que le superflu. Nous construisons la proposition avec vous via une ',
              { action: 'openSeminaireModal', label: 'demande de séminaire' },
              '.',
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
    items: [
      {
        id: 'comment-choisir-lieu',
        question: 'Comment choisir le lieu d’un séminaire d’entreprise ?',
        excerpts: [],
        blocks: [
          {
            type: 'p',
            parts: [
              'Le choix dépend de vos objectifs, du budget, de l\'accessibilité (transports) et de la taille du groupe. Privilégiez un lieu en adéquation avec la culture de votre entreprise, offrant un bon équilibre entre espaces de travail équipés et zones d\'activités. Explorez nos ',
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
              'La durée varie généralement de 1 à 3 jours. Le format journée d\'étude convient aux besoins ponctuels, tandis que le format résidentiel (2 à 3 jours avec nuitée) est idéal pour de la cohésion et un véritable lâcher-prise. Comparez les formats dans une ',
              { action: 'openSeminaireModal', label: 'demande de séminaire' },
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
              'Le format journée est idéal pour passer des messages rapides et limiter les coûts. Le format résidentiel est indispensable pour créer de vrais cohésions, relâcher la pression et permettre des temps informels riches. Nous vous aidons à trancher dans une ',
              { action: 'openSeminaireModal', label: 'demande de séminaire' },
              '.',
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
    items: [
      {
        id: 'meilleures-idees-seminaire',
        question: 'Quelles sont les meilleures idées de séminaire d’entreprise ?',
        excerpts: ['team-building-original'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Les séminaires les plus marquants misent sur l\'authenticité : ateliers participatifs, immersion dans la nature, activités culinaires du terroir ou défis collectifs axés sur l\'artisanat local plutôt que sur des animations standardisées. Inspirez-vous de nos ',
              { href: PATHS.cohesion, label: 'séminaires de cohésion originaux' },
              '.',
            ],
          },
        ],
      },
      {
        id: '10-idees-seminaire-au-vert',
        question: '10 idées de séminaire au vert pour une entreprise',
        excerpts: ['au-vert'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Voici dix pistes concrètes pour un ',
              { href: PATHS.auVert, label: 'séminaire au vert' },
              ' vraiment immersif :',
            ],
          },
          {
            type: 'ul',
            items: [
              'Immersion dans une ferme agroécologique.',
              'Atelier de co-construction en forêt.',
              'Rallye d\'orientation en mobilité douce (vélo, marche).',
              'Bivouac chic et soirée sous les étoiles.',
              'Vendanges ou récolte participative.',
              'Retraite bien-être et déconnexion digitale.',
              'Chantier participatif d\'éco-construction.',
              'Ateliers zéro déchet et cuisine sauvage.',
              'Hackathon stratégique au milieu des vignes.',
              'Escape game grandeur nature en domaine rural.',
            ],
          },
        ],
      },
      {
        id: '10-idees-seminaire-original',
        question: '10 idées de séminaire original en France',
        excerpts: ['team-building-original'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Pour sortir des formats génériques, misez sur un ',
              { href: PATHS.cohesion, label: 'séminaire original' },
              ' ancré dans le territoire :',
            ],
          },
          {
            type: 'ul',
            items: [
              'Journée d\'immersion dans une ferme engagée.',
              'Séminaire gourmand et local en itinérance.',
              'Séminaire et vendange dans un domaine viticole engagé.',
              'Séminaire dans un domaine oléicole pour fabriquer sa propre huile d’olive.',
              'Olympiades rurales autour du piment.',
              'Réunion CODIR dans une grange réhabilitée.',
              'Séminaire chez un éleveur où l’on apprend à fabriquer son fromage.',
              'Masterclass de cuisine « du champ à l\'assiette ».',
              'Séminaire producteur engagé et miroir d’entreprise.',
            ],
          },
          {
            type: 'p',
            parts: [
              'Pour aller plus loin, parcourez ',
              { href: PATHS.experiences, label: 'nos expériences entreprise' },
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
              'Misez sur les activités immersives : vous initier au maraîchage, fabriquer son propre fromage, participer à une cueillette sauvage ou relever un défi d\'éco-conception en équipe. Découvrez nos ',
              { href: PATHS.experiences, label: 'expériences de team building originales' },
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
              { href: PATHS.cohesion, label: 'séminaire original' },
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
    items: [
      {
        id: 'pourquoi-seminaire-au-vert',
        question: 'Pourquoi choisir un séminaire au vert ?',
        excerpts: ['au-vert'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Le contact avec la nature réduit le stress, favorise la concentration, stimule la créativité et permet une déconnexion rapide des écrans pour reconnecter les collaborateurs entre eux. Organisez un ',
              { href: PATHS.auVert, label: 'séminaire au vert' },
              ' avec TerraGo.',
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
              'Optez pour des activités d\'extérieur équilibrées : balades guidées, observation de la biodiversité, ateliers sensoriels, vélos électriques ou temps de travail en plein air. Voir nos formats ',
              { href: PATHS.auVert, label: 'séminaire en pleine nature' },
              '.',
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
              'Privilégiez les territoires ruraux accessibles en train ou en court trajet depuis les grandes métropoles (Périgord, Touraine, Vexin, Normandie, Provence, Beaujolais...). Parcourez nos ',
              { href: PATHS.destinations, label: 'destinations' },
              ' et nos lieux ',
              { href: PATHS.auVert, label: 'en pleine nature' },
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
              'La randonnée thématique, le Land Art, la reconnaissance des plantes sauvages, les ateliers de jardinage ou la construction collaborative en matériaux naturels. Ces activités s’inscrivent dans un ',
              { href: PATHS.auVert, label: 'séminaire au vert' },
              '.',
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
    items: [
      {
        id: 'quest-ce-seminaire-eco-responsable',
        question: 'Qu’est-ce qu’un séminaire éco-responsable ?',
        excerpts: ['rse'],
        blocks: [
          {
            type: 'p',
            parts: [
              'C\'est un événement pensé pour limiter son empreinte écologique : transports bas carbone, restauration locale et de saison, gestion rigoureuse des déchets et choix de lieux engagés dans la transition. TerraGo conçoit des ',
              { href: PATHS.rseEnjeu, label: 'séminaires RSE et team building éco-responsables' },
              '.',
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
              'Intégrez la dimension RSE à chaque étape : préférez le train au bus/avion, sélectionnez des lieux certifiés ou éco-conçus, éliminez le plastique à usage unique et proposez des repas à dominante végétale et locale. Notre page ',
              { href: PATHS.rseEnjeu, label: 'séminaire RSE' },
              ' détaille le déroulé type.',
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
              'C\'est un séminaire qui va plus loin que le « neutre » en générant un impact positif direct : soutien à l\'économie locale, rémunération juste des producteurs et soutien à des projets écologiques ou sociaux. C’est l’esprit de nos ',
              { href: PATHS.rseEnjeu, label: 'séminaires à impact' },
              '.',
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
              'Vérifiez que l\'activité ne dégrade pas l\'environnement, qu\'elle s\'appuie sur des acteurs locaux et qu\'elle véhicule des valeurs de sobriété, de partage ou de sensibilisation à l\'environnement. Orientations concrètes dans nos ',
              { href: PATHS.experiences, label: 'team buildings RSE' },
              '.',
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
              'En mesurant concrètement l\'impact, en privilégiant la preuve par l\'action (partenariats locaux réels, circuits courts) plutôt que les gadgets « verts », et en restant transparent sur la démarche auprès des équipes. Notre approche ',
              { href: PATHS.rseEnjeu, label: 'séminaire RSE' },
              ' repose sur des partenaires engagés.',
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
              'Des ateliers de sensibilisation (Fresque du Climat, atelier biodiversité), des actions de bénévolat nature (plantation, entretien de sentiers) ou des ateliers d\'artisanat responsable. Voir nos ',
              { href: PATHS.rseEnjeu, label: 'activités de séminaire engagé' },
              '.',
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
    items: [
      {
        id: 'pourquoi-seminaire-chez-producteur',
        question: 'Pourquoi organiser un séminaire chez un producteur ?',
        excerpts: ['producteur'],
        blocks: [
          {
            type: 'p',
            parts: [
              'Pour vivre une expérience authentique et incarnée. C\'est l\'occasion de découvrir un savoir-faire, de soutenir l\'économie locale et de partager des moments conviviaux autour de produits de qualité. Découvrez le format ',
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
              'C\'est un format où les temps de réunion et d\'activités se déroulent directement au sein d\'une ferme, d\'un domaine viticole, d\'une brasserie ou d\'une exploitation agricole aménagée pour recevoir des entreprises. TerraGo sélectionne ces lieux : voir ',
              { href: PATHS.producteur, label: 'chez le producteur' },
              ' et nos ',
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
              'Visites guidées des exploitations, ateliers de transformation (fromage, vin, pain), dégustations commentées, participation aux travaux de la ferme et repas gourmands « de la ferme à la table ». Exemples sur la page ',
              { href: PATHS.producteur, label: 'séminaire chez un producteur' },
              '.',
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
              'Le terroir rassemble autour de valeurs simples et universelles : la gourmandise, le partage, le respect du vivant et l\'authenticité. C\'est un vecteur immédiat de convivialité. Rencontrez nos ',
              { href: PATHS.partenaires, label: 'producteurs partenaires' },
              '.',
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
              'Une animation d\'équipe axée sur les produits locaux : rallye dégustation, concours de cuisine avec produits du marché, ateliers d\'assemblage ou olympiades gastronomiques. À vivre ',
              { href: PATHS.producteur, label: 'chez le producteur' },
              ' ou via nos ',
              { href: PATHS.partenaires, label: 'destinations producteurs' },
              '.',
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
