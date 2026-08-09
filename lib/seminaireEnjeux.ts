import { HOME_PRODUCERS } from './homeStorage';

const HOME =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME';

export const SEMINAIRE_ENJEU_SLUGS = [
  'cohesion',
  'sensibilisation-rse',
  'inspiration-miroir',
  'codir',
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
  /** Slug de l’offre `/seminaire-exemples/[slug]` (généré depuis le producteur Supabase). */
  seminaireSlug: string;
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
  subtitle: string;
  lead: string;
  body: string[];
  experiences: string[];
  programHighlights: SeminaireEnjeuProgrammeStep[];
  exampleSeminar: SeminaireEnjeuExample;
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

    metaTitle: 'Séminaire cohésion d\u2019équipe chez un producteur | TerraGo',
    metaDescription:
      'Organisez un séminaire cohésion d\u2019équipe original chez un producteur engagé : défis collaboratifs, immersion terroir et souvenirs qui durent. Devis sous 48h.',
    keywords: [
      'séminaire cohésion équipe',
      'séminaire team building original',
      'séminaire entreprise producteur local',
      'activité cohésion équipe entreprise',
      'team building nature entreprise',
    ],
    ogImage: `${HOME}/enjeux/184022935847.jpg`,
    ogImageAlt: 'Équipe en séminaire de cohésion chez un producteur partenaire TerraGo',

    eyebrow: 'Selon vos enjeux',
    title: 'Séminaire cohésion',
    subtitle: 'Créer des liens autrement.',
    lead:
      "Sortir du cadre habituel pour vivre une expérience collective authentique, renforcer la cohésion d'équipe et partager des moments qui marquent durablement les collaborateurs.",
    body: [
      'Un séminaire cohésion TerraGo place vos équipes au contact du réel : gestes concrets, travail partagé et rencontres humaines chez des producteurs engagés.',
      'Loin des icebreakers artificiels, vos collaborateurs vivent une immersion qui crée naturellement du lien, de la fierté collective et des souvenirs communs.',
      'Contrairement à un escape game ou un atelier cuisine générique, le séminaire cohésion TerraGo repose sur une vraie tâche partagée : vendanger, récolter, transformer. C\u2019est cette responsabilité commune, et non un jeu simulé, qui crée le lien entre collègues.',
      'Chaque format est calibré pour des groupes de 15 à 150 personnes, avec un déroulé qui alterne temps collectifs actifs et moments de convivialité autour d\u2019un repas préparé avec les produits du lieu.',
    ],
    experiences: [
      'Immersion chez des producteurs passionnés',
      'Défis collaboratifs autour du terroir',
      'Ateliers participatifs au cœur des exploitations',
      "Activités outdoor favorisant l'esprit d'équipe",
    ],
    programHighlights: [
      {
        title: 'Accueil café & viennoiseries locales',
        description:
          'Arrivée en douceur chez le producteur : café de spécialité, viennoiseries artisanales et brief collectif pour planter le décor et mélanger les équipes dès les premières minutes.',
      },
      {
        title: 'Visite guidée de l\u2019exploitation',
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
        title: 'Mot de fin et cadeau du terroir à emporter',
        description:
          'Remerciements du producteur et petit cadeau local pour chaque collaborateur — un souvenir tangible de la journée, à ramener au bureau ou à la maison.',
      },
    ],
    exampleSeminar: {
      producerName: 'Baptiste',
      role: 'Producteur de piments · Pays basque',
      description:
        'Chez Baptiste, vos équipes vivent une journée rythmée par la culture du piment : visite, challenges collaboratifs, atelier cordage et repas traditionnel basque. Découvrez l\u2019offre à la journée ou en résidentiel.',
      image:
        'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/pimentsbaptiste/baptiste_producteur_piment.jpg',
      imageAlt: 'Baptiste, producteur de piments – exemple de séminaire cohésion TerraGo',
      seminaireSlug: 'avec-baptiste',
    },
    faq: [
      {
        question: 'En quoi ce séminaire cohésion se distingue d\u2019un team building classique ?',
        answer:
          'Ici, vos collaborateurs ne jouent pas à un jeu inventé pour l\u2019occasion : ils partagent une vraie tâche avec le producteur, comme vendanger, récolter ou transformer. C\u2019est cette responsabilité commune, concrète et un peu imperfecte, qui crée le lien, bien plus durablement qu\u2019un escape game ou un atelier cuisine générique.',
      },
      {
        question: 'Pour combien de personnes ce format fonctionne-t-il vraiment ?',
        answer:
          'On le calibre volontiers entre 15 et 150 collaborateurs. En dessous, l\u2019énergie collective manque un peu ; au-dessus, on découpe le groupe en ateliers parallèles pour garder la qualité des échanges avec le producteur et le sens de la mission partagée.',
      },
      {
        question: 'Faut-il être sportif ou habitué au travail manuel ?',
        answer:
          'Non. Les activités sont pensées pour être accessibles à tous les profils, y compris ceux qui ne mettent jamais les pieds dans un champ. On adapte l\u2019intensité physique, les temps debout et les postes selon votre public. L\u2019objectif reste la collaboration, pas la performance sportive.',
      },
      {
        question: 'Que se passe-t-il s\u2019il pleut le jour J ?',
        answer:
          'Chaque lieu a un plan B : hangar, chai, salle de transformation ou atelier couvert. On ne reporte pas une journée pour une averse. On bascule sur une activité indoor tout aussi collaborative, sans perdre le fil de la journée.',
      },
      {
        question: 'Combien de temps faut-il pour organiser un séminaire cohésion ?',
        answer:
          'Comptez idéalement 4 à 6 semaines pour verrouiller le lieu, le déroulé et la logistique. En cas d\u2019urgence, on peut parfois tenir un délai plus court selon la disponibilité du producteur et la taille du groupe. On vous le dit franchement dès le premier échange.',
      },
      {
        question: 'Le séminaire peut-il intégrer des collaborateurs qui ne se connaissent pas encore ?',
        answer:
          'Oui, c\u2019est même un des meilleurs usages : fusion d\u2019équipes, onboarding collectif, rentrée après une réorganisation. Les ateliers en binômes ou petites équipes mêlés forcent naturellement les échanges entre personnes qui ne se croisent jamais au bureau.',
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
    name: 'Sensibilisation & RSE',
    menuLabel: 'Séminaire sensibilisation & RSE',

    metaTitle: 'Séminaire RSE et sensibilisation terrain chez un producteur | TerraGo',
    metaDescription:
      'Séminaire RSE TerraGo : vos équipes rencontrent des producteurs engagés et vivent les enjeux du vivant sur le terrain. Une expérience concrète pour ancrer votre démarche RSE.',
    keywords: [
      'séminaire RSE entreprise',
      'séminaire sensibilisation environnement',
      'team building RSE',
      'séminaire développement durable entreprise',
      'sensibilisation agroécologie entreprise',
    ],
    ogImage: `${HOME}/enjeux/2430570603-31667165.jpg`,
    ogImageAlt: 'Équipe sensibilisée aux enjeux RSE lors d\u2019une récolte avec un producteur',

    eyebrow: 'Selon vos enjeux',
    title: 'Séminaire sensibilisation & RSE',
    subtitle: 'Comprendre les enjeux du vivant.',
    lead:
      'Découvrir les réalités du monde agricole sur le terrain, échanger avec des producteurs engagés et mieux comprendre les défis environnementaux auxquels ils font face au quotidien.',
    body: [
      'Un séminaire RSE TerraGo transforme vos engagements en expérience vécue : circuits courts, agroécologie, adaptation climatique et transmission des savoir-faire.',
      'Vos équipes repartent avec une compréhension concrète des enjeux du vivant — et une motivation renouvelée pour les incarner en entreprise.',
      'Plutôt qu\u2019une conférence RSE descendante, le format TerraGo met vos collaborateurs en situation : ils touchent, récoltent, questionnent directement le producteur sur ses choix et ses contraintes. Cette pédagogie par l\u2019expérience ancre durablement les messages, bien au-delà d\u2019un rapport RSE ou d\u2019un webinaire interne.',
      'Le format s\u2019intègre naturellement dans une démarche CSRD ou un plan d\u2019engagement RSE existant, comme illustration terrain à valoriser en communication interne et externe.',
    ],
    experiences: [
      'Rencontres avec des producteurs engagés',
      'Découverte des pratiques agricoles durables',
      "Comprendre l'adaptation au changement climatique",
      'Immersion dans les circuits courts et les savoir-faire locaux',
    ],
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
        title: 'Débrief & lien avec votre feuille de route RSE',
        description:
          'Temps de restitution pour relier ce qui a été vécu à vos engagements CSRD ou RSE — et repartir avec des idées actionnables en entreprise.',
      },
      {
        title: 'Mot de fin et cadeau du terroir à emporter',
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
    faq: [
      {
        question: 'Ce séminaire remplace-t-il une formation RSE ou une conférence ?',
        answer:
          'Non, et ce n\u2019est pas le but. Une conférence pose le cadre ; ce format le fait vivre : vos équipes touchent, récoltent et questionnent un producteur sur ses arbitrages réels. Beaucoup d\u2019entreprises le placent en complément d\u2019un parcours RSE déjà lancé, pour ancrer ce que les slides n\u2019arrivent pas à transmettre.',
      },
      {
        question: 'Peut-on le valoriser dans notre reporting CSRD ou notre rapport RSE ?',
        answer:
          'Oui. On vous fournit un déroulé clair, des photos et un récit d\u2019expérience que vous pouvez réutiliser en communication interne et, si besoin, dans vos documents RSE. Ce n\u2019est pas un indicateur chiffré à lui seul, mais une preuve concrète d\u2019engagement collaborateur, souvent très attendue par les équipes.',
      },
      {
        question: 'Comment évite-t-on l\u2019effet « greenwashing d\u2019une journée » ?',
        answer:
          'En liant explicitement ce qui est vécu sur le terrain à votre feuille de route RSE, pas en s\u2019arrêtant au coup de com\u2019. Le débrief de fin de journée sert justement à ça : ce qu\u2019on a compris, ce qui résonne avec vos engagements, et ce que chacun peut faire bouger à son niveau au retour.',
      },
      {
        question: 'Faut-il déjà maîtriser les enjeux environnementaux pour participer ?',
        answer:
          'Pas du tout. Le format s\u2019adresse aussi bien à des équipes déjà sensibilisées qu\u2019à des collaborateurs qui découvrent le sujet. Le producteur part du concret (ses cultures, ses contraintes, ses choix), donc tout le monde peut entrer dans la conversation, sans jargon préalable.',
      },
      {
        question: 'Quels producteurs accueillent ce type de séminaire ?',
        answer:
          'Des exploitations engagées en agroécologie, permaculture, circuits courts ou adaptation climatique, capables d\u2019expliquer clairement leurs pratiques. On les choisit aussi pour la qualité de l\u2019accueil : une journée RSE qui se passe mal logistiquement ne convainc personne, même avec le meilleur discours.',
      },
      {
        question: 'Combien de temps dure un séminaire sensibilisation & RSE ?',
        answer:
          'Le plus courant, c\u2019est une journée complète, de l\u2019accueil café au débrief de fin d\u2019après-midi. On peut aussi l\u2019intégrer dans un séminaire plus long (2 jours), avec une demi-journée terrain et le reste consacré à vos ateliers internes sur votre feuille de route.',
      },
    ],
    relatedSlugs: ['inspiration-miroir', 'cohesion'],
    heroImage: `${HOME}/enjeux/2430570603-31667165.jpg`,
    heroImageAlt: 'Séminaire sensibilisation RSE chez un producteur – TerraGo',
    whyImage: `${HOME}/enjeux/5420570603-31667159.jpg`,
    whyImageAlt: 'Récolte immersive lors d\u2019un séminaire sensibilisation RSE – TerraGo',
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
    programHighlights: [
      {
        title: 'Accueil café & viennoiseries locales',
        description:
          'Accueil discret dans un lieu privatisé : café, viennoiseries artisanales et mise en condition pour un CODIR hors les murs, loin des salles de réunion habituelles.',
      },
      {
        title: 'Visite guidée de l\u2019exploitation',
        description:
          'Échange privilégié avec le producteur sur ses arbitrages, sa vision et sa résilience — un prisme rare pour nourrir vos propres décisions de direction.',
      },
      {
        title: 'Session stratégique & immersion',
        description:
          'Temps de travail confidentiel en comité, ponctué d\u2019une immersion terrain courte pour sortir des postures habituelles et fluidifier les échanges.',
      },
      {
        title: 'Repas local en mode guinguette',
        description:
          'Déjeuner intimiste aux produits du lieu : un moment de convivialité soigné qui favorise les conversations franches entre membres du comité.',
      },
      {
        title: 'Synthèse & priorisation des décisions',
        description:
          'Clôture structurée : décisions retenues, prochains pas et alignement du CODIR avant le retour en entreprise — sur une journée ou un format résidentiel 2 jours.',
      },
      {
        title: 'Mot de fin et cadeau du terroir à emporter',
        description:
          'Mot de clôture discret et présent du producteur pour chaque membre du comité — une touche d\u2019attention qui scelle une journée hors cadre.',
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
];

export function getSeminaireEnjeu(slug: string): SeminaireEnjeu | undefined {
  return SEMINAIRE_ENJEUX.find((e) => e.slug === slug);
}

export function seminaireEnjeuPath(slug: string): string {
  return `/seminaires-entreprise/${slug}`;
}
