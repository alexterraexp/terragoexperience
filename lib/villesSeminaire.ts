export const VILLE_SEMINAIRE_SLUGS = [
  'paris',
  'lyon',
  'marseille',
  'bordeaux',
  'toulouse',
  'nantes',
  'rennes',
  'lille',
  'strasbourg',
  'montpellier',
  'nice',
  'grenoble',
  'aix-en-provence',
  'angers',
  'tours',
  'valence',
  'reims',
  'clermont-ferrand',
  'annecy',
  'la-rochelle',
  'biarritz',
] as const;

export type VilleSeminaireSlug = (typeof VILLE_SEMINAIRE_SLUGS)[number];

export type VilleFaq = { q: string; a: string };

export type VilleArgument = { title: string; text: string };

export type VilleActivite = { title: string; text: string };

export type VilleRseBlock = { type: 'p'; text: string } | { type: 'h3'; text: string };

export type VilleSeminaire = {
  slug: VilleSeminaireSlug;
  name: string;
  /** Forme « près de Paris » / « près d’Aix-en-Provence » */
  nearLabel: string;
  h1: string;
  intro: string;
  whyTitle: string;
  arguments: [VilleArgument, VilleArgument, VilleArgument];
  experiencesTitle: string;
  activities: VilleActivite[];
  rseTitle: string;
  rse: VilleRseBlock[];
  faqTitle: string;
  faq: [VilleFaq, VilleFaq, VilleFaq];
  cta: string;
  metaTitle: string;
  metaDescription: string;
};

export function villeSeminairePath(slug: string): string {
  return `/seminaire-entreprise-${slug}`;
}

const RSE_CONTRIB =
  'Votre entreprise contribue directement à faire vivre une activité locale, en rémunérant justement le producteur pour son accueil et son savoir-faire.';

const RSE_CLOSING =
  'TerraGo construit ces séminaires avec des producteurs sélectionnés pour la qualité de leur lieu, leur envie de transmettre et leurs pratiques engagées.';

/** Gabarit RSE multi-paragraphes, même ton pour chaque page ville. */
function villeRse(parts: {
  lead: string;
  discovery: string;
  concrete: string;
  team: string;
}): VilleRseBlock[] {
  return [
    { type: 'p', text: parts.lead },
    { type: 'p', text: parts.discovery },
    { type: 'h3', text: 'Une RSE qui se vit, pas qui se raconte' },
    { type: 'p', text: parts.concrete },
    { type: 'p', text: RSE_CONTRIB },
    { type: 'h3', text: 'Et surtout, un vrai moment d’équipe' },
    { type: 'p', text: parts.team },
    { type: 'p', text: RSE_CLOSING },
  ];
}

export const VILLES_SEMINAIRE: VilleSeminaire[] = [
  {
    slug: 'paris',
    name: 'Paris',
    nearLabel: 'près de Paris',
    h1: 'Séminaire d’entreprise proche de Paris',
    intro:
      'Les journées parisiennes s’enchaînent vite : open space, transports, réunions. Pour un [[séminaire d’entreprise|/seminaires-entreprise]], beaucoup d’équipes veulent simplement sortir de la ville sans s’éloigner trop. Autour de Paris, campagnes d’Île-de-France, Brie, Vexin ou la Sologne restent accessibles. TerraGo vous emmène chez des producteurs : changer de rythme, rencontrer ceux qui font vivre le territoire.',
    whyTitle: 'Pourquoi organiser votre séminaire autour de Paris ?',
    arguments: [
      {
        title: 'Une destination accessible',
        text:
          'Depuis Paris, gares, RER, Transilien et autocars desservent de nombreux bassins ruraux. Un [[séminaire au vert|/seminaires-entreprise]] peut se concevoir en limitant les voitures individuelles : regroupement en gare, navette vers l’exploitation. L’idée n’est pas de « quitter la France », mais de quitter le bitume le temps d’une journée ou de deux.',
      },
      {
        title: 'Un terroir à découvrir',
        text:
          'À quelques kilomètres, maraîchers, fromagers, apiculteurs et céréaliers travaillent encore au plus près de la capitale. Brie et fromages de Seine-et-Marne, cultures maraîchères des Yvelines, miel, pain au levain, vergers : le séminaire devient une lecture concrète de ce que l’Île-de-France produit encore.',
      },
      {
        title: 'Un impact économique local',
        text:
          'Le budget d’un événement professionnel peut aller directement à une ferme, un atelier ou un restaurateur rural plutôt qu’à une salle anonyme. Vous financez un accueil, un repas, un savoir-faire. Pour l’équipe, c’est un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]] lisible : le lien entre facture et territoire se voit.',
      },
    ],
    experiencesTitle: 'Des expériences terroir pour votre équipe',
    activities: [
      {
        title: 'Visite de maraîchage',
        text: 'Les participants suivent le producteur dans les serres ou les champs, comprennent les saisons franciliennes et posent les questions qu’on n’a jamais le temps de poser au marché.',
      },
      {
        title: 'Atelier fromage',
        text: 'Caillage, moulage, affinage : l’équipe met la main à la pâte et relie le fromage du plateau à une exploitation réelle, pas à une étiquette.',
      },
      {
        title: 'Pain au four',
        text: 'Pétrissage et cuisson collective : un geste simple, un résultat partagé, et une conversation autour du blé et du métier de boulanger-paysan.',
      },
    ],
    rseTitle: 'Un séminaire RSE près de Paris',
    rse: villeRse({
      lead:
        'Entreprise, ferme, sol, fromage, pain, village : ici, tout se tient. Un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]] près de Paris, c’est l’occasion de sortir du cadre habituel pour aller à la rencontre de celles et ceux qui font encore vivre les campagnes franciliennes.',
      discovery:
        'Avec TerraGo, vos équipes découvrent une ferme maraîchère, une fromagerie, un boulanger-paysan ou un producteur engagé. On visite, on met les mains dans le travail, on échange sur les pratiques agricoles et on partage un repas préparé avec des produits du territoire.',
      concrete:
        'Pas de conférence sur la transition écologique dans une salle de réunion. Ici, on voit concrètement ce que l’on soutient : le travail du sol, une production de saison, des choix agricoles, parfois des difficultés aussi — à quelques kilomètres de la capitale.',
      team:
        'La RSE devient alors un prétexte pour vivre quelque chose ensemble. Une journée en maraîchage, un atelier fromage, un pain cuit au four ou une rencontre avec un apiculteur : les équipes découvrent, échangent et repartent avec une autre façon de regarder ce qu’elles mangent, ce qu’elles achètent et le territoire qui entoure Paris.',
    }),
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Paris',
    faq: [
      {
        q: 'Quelle est la meilleure saison pour organiser un séminaire à Paris ?',
        a: 'Paris accueille des séminaires toute l’année. Privilégiez le printemps et l’automne pour profiter des parcs, des balades et des activités en extérieur dans de bonnes conditions. L’hiver se prête davantage aux expériences chez les artisans, aux ateliers et aux formats indoor.',
      },
      {
        q: 'Quels cadres choisir pour un séminaire près de Paris ?',
        a: 'Autour de Paris, sortez des salles de réunion pour rejoindre une ferme, une exploitation maraîchère, une brasserie artisanale ou un domaine à la campagne. À moins d’une heure de la capitale, ces lieux permettent de combiner facilement travail, activité collective, repas et découverte d’un savoir-faire local.',
      },
      {
        q: 'Comment se déroule un séminaire chez un producteur ?',
        a: 'Un séminaire chez un producteur peut alterner temps de cohésion, activité manuelle, dégustation et repas autour d’une grande tablée. Lorsque nécessaire, le lieu peut aussi proposer une salle pour travailler dans de bonnes conditions. Le programme est construit sur mesure selon le producteur, vos objectifs et le rythme souhaité.',
      },
    ],
    cta: 'Vous préparez un séminaire à Paris ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire d’entreprise proche de Paris | TerraGo',
    metaDescription:
      'Séminaire d’entreprise près de Paris : campagnes franciliennes, producteurs, team building utile et démarche RSE concrète. Brief et devis.',
  },
  {
    slug: 'lyon',
    name: 'Lyon',
    nearLabel: 'près de Lyon',
    h1: 'Séminaire d’entreprise proche de Lyon',
    intro:
      'Lyon concentre sièges, labos et sièges régionaux. Quand l’équipe a besoin d’air, le réflexe n’est pas forcément la salle du 6e. Beaujolais, Monts du Lyonnais, Dombes ou Bugey restent dans le bassin de vie. Un [[séminaire professionnel|/seminaires-entreprise]] chez un viticulteur, un éleveur ou un maraîcher change le sujet de conversation dès le premier café.',
    whyTitle: 'Pourquoi organiser votre séminaire autour de Lyon ?',
    arguments: [
      {
        title: 'Une destination accessible',
        text: 'Partir de Lyon, c’est s’appuyer sur Part-Dieu, Perrache, le réseau TER et les axes vers le Beaujolais ou les monts. Un autocar depuis un point unique limite les allers-retours individuels. Le format « journée » reste réaliste pour un CODIR ou un service entier.',
      },
      {
        title: 'Un terroir à découvrir',
        text: 'Vignes du Beaujolais, élevage et volaille des Dombes, fromages du Bugey, maraîchage des coteaux : le Rhône n’est pas qu’une métropole gastronomique. Le séminaire remet les producteurs au centre, loin du seul restaurant d’affaires.',
      },
      {
        title: 'Un impact économique local',
        text: 'Réunion + repas + atelier : trois lignes de budget qui peuvent rester dans une exploitation. Artisans, vignerons et restaurateurs de village travaillent le jour J. C’est un [[séminaire responsable|/seminaires-entreprise/sensibilisation-rse]] par construction, pas par slogan.',
      },
    ],
    experiencesTitle: 'Des expériences terroir pour votre équipe',
    activities: [
      {
        title: 'Découverte viticole',
        text: 'Promenade dans les rangs, explication des cépages et dégustation pédagogique : l’équipe comprend le travail de l’année, pas seulement le verre du soir.',
      },
      {
        title: 'Atelier volaille ou élevage',
        text: 'Selon l’hôte, visite d’élevage, discussion sur l’alimentation animale et préparation d’un plat simple à partir du produit de la ferme.',
      },
      {
        title: 'Maraîchage des coteaux',
        text: 'Récolte ou plantation selon la saison, puis cuisine courte avec ce qui vient d’être cueilli.',
      },
    ],
    rseTitle: 'Un séminaire RSE près de Lyon',
    rse: villeRse({
      lead:
        'Entreprise, vignoble, élevage, assiette, village : ici, tout se tient. Un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]] près de Lyon, c’est l’occasion de sortir du cadre habituel pour aller à la rencontre de celles et ceux qui font vivre le Beaujolais, les Monts du Lyonnais ou la Dombes.',
      discovery:
        'Avec TerraGo, vos équipes découvrent un domaine viticole, une ferme d’élevage, un maraîcher ou un artisan engagé. On visite, on met les mains dans le travail, on échange sur les pratiques agricoles et on partage un repas préparé avec des produits du territoire.',
      concrete:
        'Pas de conférence sur la transition écologique dans une salle de réunion. Ici, on voit concrètement ce que l’on soutient : le travail de la vigne, une volaille élevée sur place, une saison de maraîchage, des choix agricoles, parfois des difficultés aussi.',
      team:
        'La RSE devient alors un prétexte pour vivre quelque chose ensemble. Une journée dans les vignes du Beaujolais, un atelier à la ferme, un repas de terroir ou une récolte sur les coteaux : les équipes découvrent, échangent et repartent avec une autre façon de regarder ce qu’elles mangent, ce qu’elles achètent et le territoire qui les entoure.',
    }),
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Lyon',
    faq: [
      {
        q: 'Quelle est la meilleure saison pour organiser un séminaire à Lyon ?',
        a: 'La région lyonnaise accueille des séminaires toute l’année. Pour profiter des vignes du Beaujolais, des monts et des activités outdoor, privilégiez avril à octobre. L’automne et l’hiver se prêtent bien aux ateliers à la ferme, à la gastronomie locale et aux formats plus indoor.',
      },
      {
        q: 'Quels cadres choisir pour un séminaire près de Lyon ?',
        a: 'Autour de Lyon, les séminaires trouvent leur place dans un domaine du Beaujolais, une ferme d’élevage, chez un maraîcher des coteaux ou en pleine nature dans les monts. La journée peut mêler temps de travail, découverte du métier, activité collective et repas chez le producteur.',
      },
      {
        q: 'Comment se déroule un séminaire chez un producteur ?',
        a: 'Un séminaire chez un producteur peut alterner temps de cohésion, activité manuelle, dégustation et repas autour d’une grande tablée. Lorsque nécessaire, le lieu peut aussi proposer une salle pour travailler dans de bonnes conditions. Le programme est construit sur mesure selon le producteur, vos objectifs et le rythme souhaité.',
      },
    ],
    cta: 'Vous préparez un séminaire à Lyon ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire d’entreprise proche de Lyon | TerraGo',
    metaDescription:
      'Séminaire d’entreprise à Lyon et alentours : Beaujolais, Dombes, producteurs, team building terroir et RSE concrète. Demandez un devis.',
  },
  {
    slug: 'marseille',
    name: 'Marseille',
    nearLabel: 'près de Marseille',
    h1: 'Séminaire d’entreprise proche de Marseille',
    intro:
      'Entre collines, calanques et zone portuaire, Marseille vit vite. Pour un événement d’équipe, l’arrière-pays provençal offre un autre rythme : Alpilles, Camargue, oléiculteurs, vignerons, maraîchers et plantes aromatiques. TerraGo organise le [[séminaire éco-responsable|/seminaires-entreprise/sensibilisation-rse]] chez ceux qui cultivent, pas dans une salle vue mer générique.',
    whyTitle: 'Pourquoi organiser votre séminaire autour de Marseille ?',
    arguments: [
      {
        title: 'Une destination accessible',
        text: 'Saint-Charles, cars régionaux et axes vers Salon, Arles ou Aix permettent de regrouper le groupe. Un [[séminaire nature|/experiences-entreprise]] se prépare en limitant les voitures : un point de rendez-vous, un transfert, un lieu unique pour la journée.',
      },
      {
        title: 'Un terroir à découvrir',
        text: 'Olive, huile, vin, riz et taureaux de Camargue, tomates, herbes de garrigue : les productions méditerranéennes se touchent et se goûtent. Le séminaire raconte le climat, l’eau et le travail des saisons, pas une brochure touristique.',
      },
      {
        title: 'Un impact économique local',
        text: 'L’événement fait travailler oléiculteurs, vignerons, éleveurs et cuisiniers du village. Le budget RH devient une commande locale. C’est concret, mesurable à l’échelle de la facture, sans pourcentage inventé.',
      },
    ],
    experiencesTitle: 'Des expériences terroir pour votre équipe',
    activities: [
      {
        title: 'Récolte ou taille d’oliviers',
        text: 'Selon la saison, l’équipe aide aux gestes de l’oliveraie et comprend pourquoi une huile n’est pas un produit anonyme de rayon.',
      },
      {
        title: 'Plantes aromatiques',
        text: 'Cueillette, distillation simple ou atelier cuisine aux herbes : thym, romarin, sarriette deviennent un langage commun.',
      },
      {
        title: 'Découverte viticole provençale',
        text: 'Visite de chai, explication des sols calcaires et dégustation commentée, loin du cocktail d’entreprise standard.',
      },
    ],
    rseTitle: 'Un séminaire RSE près de Marseille',
    rse: villeRse({
      lead:
        'Entreprise, oliveraie, garrigue, huile, repas, village : ici, tout se tient. Un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]] près de Marseille, c’est l’occasion de sortir du cadre habituel pour aller à la rencontre de celles et ceux qui font vivre l’arrière-pays provençal, les Alpilles ou la Camargue.',
      discovery:
        'Avec TerraGo, vos équipes découvrent un domaine oléicole, un vigneron, un éleveur ou un producteur d’herbes aromatiques. On visite, on met les mains dans le travail, on échange sur les pratiques agricoles et on partage un repas préparé avec des produits du territoire.',
      concrete:
        'Pas de conférence sur la transition écologique dans une salle de réunion. Ici, on voit concrètement ce que l’on soutient : le travail de l’olivier, une récolte de saison, des choix agricoles face à la sécheresse, parfois des difficultés aussi.',
      team:
        'La RSE devient alors un prétexte pour vivre quelque chose ensemble. Une journée sous les oliviers, un atelier plantes aromatiques, un repas à la ferme ou une rencontre avec un vigneron : les équipes découvrent, échangent et repartent avec une autre façon de regarder ce qu’elles mangent, ce qu’elles achètent et le territoire qui les entoure.',
    }),
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Marseille',
    faq: [
      {
        q: 'Quelle est la meilleure saison pour organiser un séminaire à Marseille ?',
        a: 'Marseille se prête aux séminaires toute l’année grâce à son climat doux. Pour profiter des calanques, de la mer et des activités outdoor, privilégiez avril à juin puis septembre-octobre. L’hiver permet de profiter plus tranquillement du territoire, des producteurs et des activités indoor.',
      },
      {
        q: 'Quels cadres choisir pour un séminaire près de Marseille ?',
        a: 'Autour de Marseille, les séminaires prennent place entre mer et arrière-pays : domaines viticoles, oliveraies, fermes, producteurs et lieux en pleine nature. Une journée peut ainsi alterner réunion, découverte du territoire, activité outdoor et repas avec les producteurs.',
      },
      {
        q: 'Comment se déroule un séminaire chez un producteur ?',
        a: 'Un séminaire chez un producteur peut alterner temps de cohésion, activité manuelle, dégustation et repas autour d’une grande tablée. Lorsque nécessaire, le lieu peut aussi proposer une salle pour travailler dans de bonnes conditions. Le programme est construit sur mesure selon le producteur, vos objectifs et le rythme souhaité.',
      },
    ],
    cta: 'Vous préparez un séminaire à Marseille ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire d’entreprise proche de Marseille | TerraGo',
    metaDescription:
      'Séminaire à Marseille et en Provence : oliviers, vignerons, team building agricole et RSE. Organisez votre journée chez un producteur.',
  },
  {
    slug: 'bordeaux',
    name: 'Bordeaux',
    nearLabel: 'près de Bordeaux',
    h1: 'Séminaire d’entreprise proche de Bordeaux',
    intro:
      'Bordeaux n’est pas seulement un nom de vin sur une carte. Pour les équipes du centre-ville ou de la rive droite, un [[séminaire original|/experiences-entreprise]] consiste à quitter les quais pour l’Entre-deux-Mers, le Médoc agricole ou le maraîchage girondin. TerraGo vous place chez le producteur : chai, ferme, atelier — pas dans une salle de dégustation hors-sol.',
    whyTitle: 'Pourquoi organiser votre séminaire autour de Bordeaux ?',
    arguments: [
      {
        title: 'Une destination accessible',
        text: 'Gare Saint-Jean, TER girondins et cars : on peut concevoir un départ groupé. Les vignobles et les terres maraîchères se rejoignent sans multiplier les trajets individuels, à condition de fixer un point unique.',
      },
      {
        title: 'Un terroir à découvrir',
        text: 'Vigne, bien sûr, mais aussi maraîchage des barthes, élevage, miel, prunes et productions de l’estuaire. Un séminaire utile montre la Gironde au-delà de l’étiquette grand cru.',
      },
      {
        title: 'Un impact économique local',
        text: 'Viticulteurs indépendants, ouvriers agricoles, restaurateurs de bourg : le brief événementiel devient une commande de journée. L’économie locale se lit dans qui encaisse, pas dans un rapport RSE lissé.',
      },
    ],
    experiencesTitle: 'Des expériences terroir pour votre équipe',
    activities: [
      {
        title: 'Travail à la vigne',
        text: 'Ébourgeonnage, ramassage ou taille selon le calendrier : l’équipe comprend la pénibilité et la précision du métier.',
      },
      {
        title: 'Atelier au chai',
        text: 'Assemblage pédagogique, lecture d’un millésime, questions franches au vigneron — sans posture de club œnologique.',
      },
      {
        title: 'Maraîchage girondin',
        text: 'Récolte de légumes de saison et cuisine partagée, pour rappeler que Bordeaux mange aussi autre chose que du vin.',
      },
    ],
    rseTitle: 'Un séminaire RSE près de Bordeaux',
    rse: villeRse({
      lead:
        'Entreprise, domaine, sol, bouteille, repas, village : ici, tout se tient. Un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]] près de Bordeaux, c’est l’occasion de sortir du cadre habituel pour aller à la rencontre de celles et ceux qui font vivre le territoire.',
      discovery:
        'Avec TerraGo, vos équipes découvrent un domaine viticole, une ferme, un producteur ou un artisan engagé. On visite, on met les mains dans le travail, on échange sur les pratiques agricoles et on partage un repas préparé avec des produits du territoire.',
      concrete:
        'Pas de conférence sur la transition écologique dans une salle de réunion. Ici, on voit concrètement ce que l’on soutient : le travail du sol, une production, une saison, des choix agricoles, parfois des difficultés aussi.',
      team:
        'La RSE devient alors un prétexte pour vivre quelque chose ensemble. Une journée dans les vignes, un atelier chez un producteur, un repas à la ferme ou une rencontre avec un artisan : les équipes découvrent, échangent et repartent avec une autre façon de regarder ce qu’elles mangent, ce qu’elles achètent et le territoire qui les entoure.',
    }),
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Bordeaux',
    faq: [
      {
        q: 'Quelle est la meilleure saison pour organiser un séminaire à Bordeaux ?',
        a: 'La région bordelaise se prête aux séminaires toute l’année. Pour profiter pleinement des vignes, des activités en plein air et du littoral, privilégiez avril à octobre. Septembre et octobre offrent un cadre particulièrement agréable, avec les vendanges et une fréquentation plus douce.',
      },
      {
        q: 'Quels cadres choisir pour un séminaire près de Bordeaux ?',
        a: 'Autour de Bordeaux, les domaines viticoles sont évidemment incontournables, mais pas seulement : fermes, maraîchers, producteurs du bassin et lieux en pleine nature permettent aussi d’imaginer des séminaires très différents. De la visite des vignes au repas partagé chez le producteur, chaque lieu peut devenir le cadre d’une vraie expérience d’équipe.',
      },
      {
        q: 'Comment se déroule un séminaire chez un producteur ?',
        a: 'Un séminaire chez un producteur peut alterner temps de cohésion, activité manuelle, dégustation et repas autour d’une grande tablée. Lorsque nécessaire, le lieu peut aussi proposer une salle pour travailler dans de bonnes conditions. Le programme est construit sur mesure selon le producteur, vos objectifs et le rythme souhaité.',
      },
    ],
    cta: 'Vous préparez un séminaire à Bordeaux ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire d’entreprise proche de Bordeaux | TerraGo',
    metaDescription:
      'Séminaire d’entreprise près de Bordeaux : vignobles, maraîchage, producteurs et team building utile. Démarche RSE, devis sur brief.',
  },
  {
    slug: 'toulouse',
    name: 'Toulouse',
    nearLabel: 'près de Toulouse',
    h1: 'Séminaire d’entreprise proche de Toulouse',
    intro:
      'Aéronautique, labos, sièges : Toulouse avance à un rythme serré. À côté, Lauragais, Frontonnais, campagnes de Haute-Garonne et portes du Gers offrent des terres de céréales, de vigne et d’élevage. Un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]] TerraGo, c’est quitter la ville rose pour une exploitation occitane, le temps de travailler autrement.',
    whyTitle: 'Pourquoi organiser votre séminaire autour de Toulouse ?',
    arguments: [
      {
        title: 'Une destination accessible',
        text: 'Matabiau, réseau TER et cars régionaux desservent le Lauragais et le nord toulousain. Un autocar depuis un site unique (siège, gare) simplifie la logistique RH. Pas besoin d’un voyage au long cours pour changer de décor.',
      },
      {
        title: 'Un terroir à découvrir',
        text: 'Blé, tournesol, vigne du Frontonnais, canard et élevage vers le Gers, maraîchage des vallées : le séminaire parle d’Occitanie productive, pas seulement de cassoulet de carte.',
      },
      {
        title: 'Un impact économique local',
        text: 'Agriculteurs, caves, artisans charcutiers ou boulangers : votre journée les fait travailler. Le budget séminaire reste dans le bassin toulousain rural.',
      },
    ],
    experiencesTitle: 'Des expériences terroir pour votre équipe',
    activities: [
      {
        title: 'Visite d’exploitation céréalière',
        text: 'Lecture d’un assolement, discussion sur l’eau et les sols du Lauragais, puis pain ou farine travaillés en atelier.',
      },
      {
        title: 'Vignoble du Frontonnais',
        text: 'Cépage négrette, chai et dégustation pédagogique : l’équipe sort du réflexe « Bordeaux ou Languedoc » pour un vin de proximité.',
      },
      {
        title: 'Cuisine de ferme',
        text: 'Préparation d’un repas à partir des produits de l’hôte — légumes, volaille, légumineuses — sans démonstration gastronomique hors sujet.',
      },
    ],
    rseTitle: 'Un séminaire RSE près de Toulouse',
    rse: villeRse({
      lead:
        'Entreprise, champ, blé, canard, repas, village : ici, tout se tient. Un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]] près de Toulouse, c’est l’occasion de sortir du cadre habituel pour aller à la rencontre de celles et ceux qui font vivre le Lauragais, le Frontonnais ou les portes du Gers.',
      discovery:
        'Avec TerraGo, vos équipes découvrent une exploitation céréalière, un vignoble, une ferme d’élevage ou un artisan engagé. On visite, on met les mains dans le travail, on échange sur les pratiques agricoles et on partage un repas préparé avec des produits du territoire.',
      concrete:
        'Pas de conférence sur la transition écologique dans une salle de réunion. Ici, on voit concrètement ce que l’on soutient : le travail du sol, une culture de saison, des choix agricoles, parfois des difficultés aussi.',
      team:
        'La RSE devient alors un prétexte pour vivre quelque chose ensemble. Une journée à la ferme, un atelier au chai, une cuisine de ferme ou une rencontre avec un céréalier : les équipes découvrent, échangent et repartent avec une autre façon de regarder ce qu’elles mangent, ce qu’elles achètent et le territoire qui les entoure.',
    }),
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Toulouse',
    faq: [
      {
        q: 'Quelle est la meilleure saison pour organiser un séminaire à Toulouse ?',
        a: 'Le bassin toulousain accueille des séminaires presque toute l’année. Pour profiter des champs du Lauragais, du Frontonnais et des activités outdoor, privilégiez avril à octobre. L’automne et l’hiver restent intéressants pour les rencontres chez les producteurs, la cuisine de ferme et les formats plus abrités.',
      },
      {
        q: 'Quels cadres choisir pour un séminaire près de Toulouse ?',
        a: 'Autour de Toulouse, vous pouvez organiser votre séminaire dans un domaine viticole, une ferme, chez un producteur local ou dans un lieu en pleine nature. Selon le format recherché, la journée peut mêler temps de travail, découverte du savoir-faire, activité collective et repas guinguette directement chez le producteur.',
      },
      {
        q: 'Comment se déroule un séminaire chez un producteur ?',
        a: 'Un séminaire chez un producteur peut alterner temps de cohésion, activité manuelle, dégustation et repas autour d’une grande tablée. Lorsque nécessaire, le lieu peut aussi proposer une salle pour travailler dans de bonnes conditions. Le programme est construit sur mesure selon le producteur, vos objectifs et le rythme souhaité.',
      },
    ],
    cta: 'Vous préparez un séminaire à Toulouse ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire d’entreprise proche de Toulouse | TerraGo',
    metaDescription:
      'Séminaire d’entreprise autour de Toulouse : Lauragais, Frontonnais, producteurs occitans et team building utile. Demandez un devis.',
  },
  {
    slug: 'nantes',
    name: 'Nantes',
    nearLabel: 'près de Nantes',
    h1: 'Séminaire d’entreprise proche de Nantes',
    intro:
      'Nantes oscille entre Loire, océan et ceinture maraîchère. Pour un [[séminaire au vert|/seminaires-entreprise]], inutile d’aller loin : vignoble nantais, élevage, côte atlantique, ou cultures légumières de Loire-Atlantique. TerraGo sort l’équipe du quartier de la création ou d’un siège tertiaire pour la poser chez un producteur ligérien.',
    whyTitle: 'Pourquoi organiser votre séminaire autour de Nantes ?',
    arguments: [
      {
        title: 'Une destination accessible',
        text: 'Gare de Nantes, tram jusqu’à un point relais, cars vers le vignoble ou le bocage : le regroupement est simple. Un seul transfert évite le chassé-croisé sur le périphérique.',
      },
      {
        title: 'Un terroir à découvrir',
        text: 'Muscadet et vins nantais, mâche et légumes, lait, sel de proximité quand le lieu le permet : le séminaire raconte la Loire-Atlantique agricole, pas seulement l’estuaire touristique.',
      },
      {
        title: 'Un impact économique local',
        text: 'Vignerons, maraîchers, éleveurs, restaurateurs de bourg : votre événement leur achète une journée. C’est un [[séminaire d’entreprise|/seminaires-entreprise]] qui reste dans le département.',
      },
    ],
    experiencesTitle: 'Des expériences terroir pour votre équipe',
    activities: [
      {
        title: 'La pêche façon nantaise',
        text: 'En équipe, initiez-vous à la pêche avec un passionné du territoire : préparation du matériel, découverte des techniques locales et défi convivial au bord de l’eau.',
      },
      {
        title: 'Maraîchage ligérien',
        text: 'Initiation à la permaculture et récolte de légumes de saison, puis atelier cuisine court — les mains dans la terre, pas dans un serious game.',
      },
      {
        title: 'Ferme laitière',
        text: 'Visite d’élevage, fabrication simple de fromage frais, discussion sur le bocage et le métier d’éleveur.',
      },
    ],
    rseTitle: 'Un séminaire RSE près de Nantes',
    rse: villeRse({
      lead:
        'Entreprise, parcelle, Muscadet, mâche, repas, village : ici, tout se tient. Un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]] près de Nantes, c’est l’occasion de sortir du cadre habituel pour aller à la rencontre de celles et ceux qui font vivre le vignoble nantais, le bocage et la Loire agricole.',
      discovery:
        'Avec TerraGo, vos équipes découvrent un domaine viticole, une ferme maraîchère, un élevage laitier ou un producteur engagé. On visite, on met les mains dans le travail, on échange sur les pratiques agricoles et on partage un repas préparé avec des produits du territoire.',
      concrete:
        'Pas de conférence sur la transition écologique dans une salle de réunion. Ici, on voit concrètement ce que l’on soutient : le travail de la vigne, une production de saison, des choix agricoles, parfois des difficultés aussi.',
      team:
        'La RSE devient alors un prétexte pour vivre quelque chose ensemble. Une journée en maraîchage, un atelier à la ferme laitière, un repas local ou une rencontre avec un vigneron : les équipes découvrent, échangent et repartent avec une autre façon de regarder ce qu’elles mangent, ce qu’elles achètent et le territoire qui les entoure.',
    }),
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Nantes',
    faq: [
      {
        q: 'Quelle est la meilleure saison pour organiser un séminaire à Nantes ?',
        a: 'La région nantaise se prête aux séminaires toute l’année. Pour profiter du vignoble, du bocage et des activités en extérieur, privilégiez mai à octobre. L’hiver, plus doux qu’ailleurs, convient bien aux ateliers à la ferme, au maraîchage sous serre et aux formats indoor.',
      },
      {
        q: 'Quels cadres choisir pour un séminaire près de Nantes ?',
        a: 'Autour de Nantes, les cadres vont du domaine de Muscadet à la ferme maraîchère, de l’élevage laitier aux lieux en pleine nature le long de la Loire. On y combine facilement réunion, atelier, activité outdoor et repas préparé avec les produits du lieu.',
      },
      {
        q: 'Comment se déroule un séminaire chez un producteur ?',
        a: 'Un séminaire chez un producteur peut alterner temps de cohésion, activité manuelle, dégustation et repas autour d’une grande tablée. Lorsque nécessaire, le lieu peut aussi proposer une salle pour travailler dans de bonnes conditions. Le programme est construit sur mesure selon le producteur, vos objectifs et le rythme souhaité.',
      },
    ],
    cta: 'Vous préparez un séminaire à Nantes ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire d’entreprise proche de Nantes | TerraGo',
    metaDescription:
      'Séminaire d’entreprise près de Nantes : vignoble nantais, maraîchage, producteurs et team building RSE. Brief et devis TerraGo.',
  },
  {
    slug: 'rennes',
    name: 'Rennes',
    nearLabel: 'près de Rennes',
    h1: 'Séminaire d’entreprise proche de Rennes',
    intro:
      'Rennes grandit, les sièges aussi. Autour, l’Ille-et-Vilaine reste un pays d’élevage laitier, de cidre, de maraîchage et de villages. Un [[team building|/experiences-entreprise]] TerraGo n’est pas un escape game en centre-ville : ce sont des immersions chez des éleveurs, marâichers ou cidriculteurs, à parler métier et territoire.',
    whyTitle: 'Pourquoi organiser votre séminaire autour de Rennes ?',
    arguments: [
      {
        title: 'Une destination accessible',
        text: 'Gare de Rennes, et axes vers le bocage : on sort de la métropole sans organisation militaire. Un départ groupé suffit souvent pour une journée complète à la ferme.',
      },
      {
        title: 'Un terroir à découvrir',
        text: 'Lait, beurre, fromages fermiers, cidre, légumes, produits marins : la Bretagne se goûte. Le séminaire montre le travail derrière la barquette du supermarché.',
      },
      {
        title: 'Un impact économique local',
        text: 'Éleveurs, cidriculteurs, boulangers, aubergistes de bourg : votre budget événementiel leur revient. C’est l’économie rurale bretonne, à l’échelle d’une journée d’équipe.',
      },
    ],
    experiencesTitle: 'Des expériences terroir pour votre équipe',
    activities: [
      {
        title: 'Atelier lait et fromage',
        text: 'Traite commentée (selon l’exploitation), caillage, moulage : l’équipe relie le yaourt du petit-déjeuner à une stabulation réelle.',
      },
      {
        title: 'Cidre et verger',
        text: 'Visite de verger, pressurage ou assemblage pédagogique, discussion sur les variétés locales.',
      },
      {
        title: 'Maraîchage breton',
        text: 'Désherbage, récolte, panier collectif puis cuisine simple — un [[séminaire nature|/experiences-entreprise]] sans artifice.',
      },
    ],
    rseTitle: 'Un séminaire RSE près de Rennes',
    rse: villeRse({
      lead:
        'Entreprise, éleveur, haie, lait, cidre, commune : ici, tout se tient. Un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]] près de Rennes, c’est l’occasion de sortir du cadre habituel pour aller à la rencontre de celles et ceux qui font vivre le bocage d’Ille-et-Vilaine.',
      discovery:
        'Avec TerraGo, vos équipes découvrent une ferme laitière, un verger à cidre, un maraîcher ou un producteur engagé. On visite, on met les mains dans le travail, on échange sur les pratiques agricoles et on partage un repas préparé avec des produits du territoire.',
      concrete:
        'Pas de conférence sur la transition écologique dans une salle de réunion. Ici, on voit concrètement ce que l’on soutient : le travail de l’élevage, une production laitière, des choix agricoles, parfois des difficultés aussi.',
      team:
        'La RSE devient alors un prétexte pour vivre quelque chose ensemble. Une journée à la ferme, un atelier fromage ou beurre, un repas de bocage ou une rencontre avec un cidriculteur : les équipes découvrent, échangent et repartent avec une autre façon de regarder ce qu’elles mangent, ce qu’elles achètent et le territoire qui les entoure.',
    }),
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Rennes',
    faq: [
      {
        q: 'Quelle est la meilleure saison pour organiser un séminaire à Rennes ?',
        a: 'La Bretagne intérieure accueille des séminaires presque toute l’année. Pour profiter du bocage, des vergers et des activités outdoor, privilégiez mai à octobre. L’automne et l’hiver se prêtent aux ateliers laitiers, au cidre et aux rencontres plus intimistes chez les producteurs.',
      },
      {
        q: 'Quels cadres choisir pour un séminaire près de Rennes ?',
        a: 'Autour de Rennes, le bocage accueille des séminaires à la ferme laitière, chez un cidriculteur, dans une exploitation maraîchère ou en pleine nature. Ces lieux permettent d’enchaîner travail, immersion dans le savoir-faire, activité collective et repas de ferme.',
      },
      {
        q: 'Comment se déroule un séminaire chez un producteur ?',
        a: 'Un séminaire chez un producteur peut alterner temps de cohésion, activité manuelle, dégustation et repas autour d’une grande tablée. Lorsque nécessaire, le lieu peut aussi proposer une salle pour travailler dans de bonnes conditions. Le programme est construit sur mesure selon le producteur, vos objectifs et le rythme souhaité.',
      },
    ],
    cta: 'Vous préparez un séminaire à Rennes ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire d’entreprise proche de Rennes | TerraGo',
    metaDescription:
      'Séminaire près de Rennes : élevage, cidre, campagnes d’Ille-et-Vilaine, producteurs et RSE concrète. Demandez votre devis.',
  },
  {
    slug: 'lille',
    name: 'Lille',
    nearLabel: 'près de Lille',
    h1: 'Séminaire d’entreprise proche de Lille',
    intro:
      'Lille, Roubaix, Euralille : la densité est le quotidien. À deux pas, Flandre intérieure, Pévèle et Artois restent des terres de maraîchage, d’élevage et de grandes cultures. Un [[séminaire original|/experiences-entreprise]] TerraGo, c’est quitter la métropole européenne pour une ferme des Hauts-de-France, le temps de travailler ensemble autrement.',
    whyTitle: 'Pourquoi organiser votre séminaire autour de Lille ?',
    arguments: [
      {
        title: 'Une destination accessible',
        text: 'Flandres, Lille-Europe, cars et axes vers Tournai ou Arras : le regroupement se fait depuis un nœud ferroviaire. Un autocar évite vingt voitures sur la rocade.',
      },
      {
        title: 'Un terroir à découvrir',
        text: 'Endives, pommes de terre, betteraves, bières de ferme, fromages, volailles : le plat pays a une cuisine de producteurs. Le séminaire la remet sur la table, sans folklore.',
      },
      {
        title: 'Un impact économique local',
        text: 'Maraîchers, brasseurs fermiers, éleveurs : votre journée leur achète du temps. L’événement professionnel irrigue le rural, pas seulement le quartier d’affaires.',
      },
    ],
    experiencesTitle: 'Des expériences terroir pour votre équipe',
    activities: [
      {
        title: 'Maraîchage de Flandre',
        text: 'Récolte d’endives ou de légumes de saison, explication des serres et des sols, puis cuisine collective.',
      },
      {
        title: 'Brasserie locale bio',
        text: 'Malt, houblon, fermentation : l’équipe suit une bière de l’orge au verre, avec le brasseur.',
      },
      {
        title: 'Ferme d’élevage',
        text: 'Visite, discussion sur l’alimentation animale et préparation d’un plat simple — concrète, sans mise en scène.',
      },
    ],
    rseTitle: 'Un séminaire RSE près de Lille',
    rse: villeRse({
      lead:
        'Entreprise, champ, endive, bière, repas, village : ici, tout se tient. Un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]] près de Lille, c’est l’occasion de sortir du cadre habituel pour aller à la rencontre de celles et ceux qui font vivre la Flandre intérieure, la Pévèle ou l’Artois.',
      discovery:
        'Avec TerraGo, vos équipes découvrent une ferme maraîchère, une brasserie fermière, un élevage ou un producteur engagé. On visite, on met les mains dans le travail, on échange sur les pratiques agricoles et on partage un repas préparé avec des produits du territoire.',
      concrete:
        'Pas de conférence sur la transition écologique dans une salle de réunion. Ici, on voit concrètement ce que l’on soutient : le travail du sol, une culture de saison, des choix agricoles, parfois des difficultés aussi.',
      team:
        'La RSE devient alors un prétexte pour vivre quelque chose ensemble. Une journée en maraîchage, un atelier brasserie, un repas de ferme ou une rencontre avec un éleveur : les équipes découvrent, échangent et repartent avec une autre façon de regarder ce qu’elles mangent, ce qu’elles achètent et le territoire qui les entoure.',
    }),
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Lille',
    faq: [
      {
        q: 'Quelle est la meilleure saison pour organiser un séminaire à Lille ?',
        a: 'Les Hauts-de-France accueillent des séminaires toute l’année. Pour profiter des champs de Flandre, de la Pévèle et des activités outdoor, privilégiez avril à octobre. L’hiver convient bien aux brasseries fermières, aux ateliers et aux formats indoor autour des producteurs.',
      },
      {
        q: 'Quels cadres choisir pour un séminaire près de Lille ?',
        a: 'Autour de Lille, quittez les salles classiques pour une ferme de Flandre, une brasserie artisanale, un élevage ou un lieu en pleine nature en Pévèle. La journée peut mêler temps de travail, atelier, découverte du producteur et repas local.',
      },
      {
        q: 'Comment se déroule un séminaire chez un producteur ?',
        a: 'Un séminaire chez un producteur peut alterner temps de cohésion, activité manuelle, dégustation et repas autour d’une grande tablée. Lorsque nécessaire, le lieu peut aussi proposer une salle pour travailler dans de bonnes conditions. Le programme est construit sur mesure selon le producteur, vos objectifs et le rythme souhaité.',
      },
    ],
    cta: 'Vous préparez un séminaire à Lille ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire d’entreprise proche de Lille | TerraGo',
    metaDescription:
      'Séminaire d’entreprise autour de Lille : Flandre, Pévèle, maraîchers, team building et RSE. Organisez votre journée chez un producteur.',
  },
  {
    slug: 'strasbourg',
    name: 'Strasbourg',
    nearLabel: 'près de Strasbourg',
    h1: 'Séminaire d’entreprise proche de Strasbourg',
    intro:
      'Institutions, sièges rhénans, rythme européen : Strasbourg travaille beaucoup en intérieur. Derrière, le vignoble alsacien, la plaine du Rhin et le maraîchage offrent un autre terrain. TerraGo pose votre [[séminaire éco-responsable|/seminaires-entreprise/sensibilisation-rse]] chez un viticulteur, un maraîcher ou un éleveur, pas dans une salle de congrès.',
    whyTitle: 'Pourquoi organiser votre séminaire autour de Strasbourg ?',
    arguments: [
      {
        title: 'Une destination accessible',
        text: 'Gare de Strasbourg, TER vers Sélestat ou Colmar, cars : le vignoble et la plaine se rejoignent en groupe. Un seul transfert, un seul lieu, une journée lisible pour les RH.',
      },
      {
        title: 'Un terroir à découvrir',
        text: 'Riesling et autres cépages alsaciens, choucroute de pays, fromages, miel, légumes de la plaine : le séminaire parle d’Alsace agricole, bilingue et concrète.',
      },
      {
        title: 'Un impact économique local',
        text: 'Vignerons, maraîchers, artisans : votre événement leur commande une journée. L’économie du piémont et de la plaine en bénéficie directement.',
      },
    ],
    experiencesTitle: 'Des expériences terroir pour votre équipe',
    activities: [
      {
        title: 'Vignoble alsacien',
        text: 'Marche sur un sentier viticole, explication des sols, dégustation pédagogique au domaine.',
      },
      {
        title: 'Choucroute et chou',
        text: 'Selon la saison, travail du chou, fermentation expliquée, repas de ferme autour de cette filière.',
      },
      {
        title: 'Maraîchage rhénan',
        text: 'Récolte en plaine, discussion sur l’eau du Rhin et cuisine courte avec les légumes du jour.',
      },
    ],
    rseTitle: 'Un séminaire RSE près de Strasbourg',
    rse: villeRse({
      lead:
        'Entreprise, coteau, riesling, choucroute, repas, village : ici, tout se tient. Un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]] près de Strasbourg, c’est l’occasion de sortir du cadre habituel pour aller à la rencontre de celles et ceux qui font vivre le vignoble alsacien et la plaine du Rhin.',
      discovery:
        'Avec TerraGo, vos équipes découvrent un domaine viticole, une ferme maraîchère, un artisan ou un producteur engagé. On visite, on met les mains dans le travail, on échange sur les pratiques agricoles et on partage un repas préparé avec des produits du territoire.',
      concrete:
        'Pas de conférence sur la transition écologique dans une salle de réunion. Ici, on voit concrètement ce que l’on soutient : le travail de la vigne, une production de saison, des choix agricoles, parfois des difficultés aussi.',
      team:
        'La RSE devient alors un prétexte pour vivre quelque chose ensemble. Une journée dans les vignes, un atelier choucroute, un repas de plaine ou une rencontre avec un maraîcher : les équipes découvrent, échangent et repartent avec une autre façon de regarder ce qu’elles mangent, ce qu’elles achètent et le territoire qui les entoure.',
    }),
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Strasbourg',
    faq: [
      {
        q: 'Quelle est la meilleure saison pour organiser un séminaire à Strasbourg ?',
        a: 'L’Alsace se prête aux séminaires toute l’année. Pour profiter du vignoble, de la plaine et des activités outdoor, privilégiez avril à octobre. Septembre-octobre sont particulièrement agréables avec les vendanges ; l’hiver se prête aux formats indoor, à la gastronomie et aux rencontres chez les producteurs.',
      },
      {
        q: 'Quels cadres choisir pour un séminaire près de Strasbourg ?',
        a: 'Autour de Strasbourg, les séminaires se déroulent dans un domaine alsacien, une ferme de plaine, chez un artisan transformateur ou en pleine nature sur les coteaux. Travail, visite, activité collective et repas chez le producteur s’y articulent naturellement.',
      },
      {
        q: 'Comment se déroule un séminaire chez un producteur ?',
        a: 'Un séminaire chez un producteur peut alterner temps de cohésion, activité manuelle, dégustation et repas autour d’une grande tablée. Lorsque nécessaire, le lieu peut aussi proposer une salle pour travailler dans de bonnes conditions. Le programme est construit sur mesure selon le producteur, vos objectifs et le rythme souhaité.',
      },
    ],
    cta: 'Vous préparez un séminaire à Strasbourg ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire d’entreprise proche de Strasbourg | TerraGo',
    metaDescription:
      'Séminaire près de Strasbourg : vignoble alsacien, maraîchage rhénan, producteurs et team building RSE. Demandez un devis.',
  },
  {
    slug: 'montpellier',
    name: 'Montpellier',
    nearLabel: 'près de Montpellier',
    h1: 'Séminaire d’entreprise proche de Montpellier',
    intro:
      'Montpellier pousse vers la mer et vers la garrigue. Pour un [[séminaire au vert|/seminaires-entreprise]], l’arrière-pays, le Pic Saint-Loup, les vignobles et le maraîchage méditerranéen sont le vrai terrain. TerraGo emmène l’équipe chez l’oléiculteur, le vigneron ou l’éleveur, loin des salles du centre.',
    whyTitle: 'Pourquoi organiser votre séminaire autour de Montpellier ?',
    arguments: [
      {
        title: 'Une destination accessible',
        text: 'Saint-Roch, tram jusqu’à un relais, cars vers le nord montpelliérain : on quitte la ville sans organisation lourde. Un transfert unique calme la logistique.',
      },
      {
        title: 'Un terroir à découvrir',
        text: 'Vins du Pic Saint-Loup et des coteaux, olives, légumes, élevage ovin, plantes de garrigue : le séminaire raconte l’Hérault productif, pas seulement la plage.',
      },
      {
        title: 'Un impact économique local',
        text: 'Vignerons, oléiculteurs, bergers, maraîchers : votre journée les fait vivre. Le budget RH reste dans l’arrière-pays.',
      },
    ],
    experiencesTitle: 'Des expériences terroir pour votre équipe',
    activities: [
      {
        title: 'Coteaux du Pic Saint-Loup',
        text: 'Visite de parcelles, sols calcaires, dégustation commentée — un [[team building|/experiences-entreprise]] qui parle de vin de territoire.',
      },
      {
        title: 'Oliveraie',
        text: 'Taille, récolte ou moulin selon la saison : l’huile cesse d’être un flacon anonyme.',
      },
      {
        title: 'Élevage et garrigue',
        text: 'Rencontre avec un éleveur, marche courte, fromage de brebis ou de chèvre dégusté sur place.',
      },
    ],
    rseTitle: 'Un séminaire RSE près de Montpellier',
    rse: villeRse({
      lead:
        'Entreprise, garrigue, olivier, raisin, repas, village : ici, tout se tient. Un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]] près de Montpellier, c’est l’occasion de sortir du cadre habituel pour aller à la rencontre de celles et ceux qui font vivre le Pic Saint-Loup et l’arrière-pays héraultais.',
      discovery:
        'Avec TerraGo, vos équipes découvrent un domaine viticole, une oliveraie, un élevage ovin ou un producteur engagé. On visite, on met les mains dans le travail, on échange sur les pratiques agricoles et on partage un repas préparé avec des produits du territoire.',
      concrete:
        'Pas de conférence sur la transition écologique dans une salle de réunion. Ici, on voit concrètement ce que l’on soutient : le travail de la garrigue, une production de saison, des choix agricoles face au climat, parfois des difficultés aussi.',
      team:
        'La RSE devient alors un prétexte pour vivre quelque chose ensemble. Une journée au Pic Saint-Loup, un atelier à l’oliveraie, un repas de ferme ou une rencontre avec un berger : les équipes découvrent, échangent et repartent avec une autre façon de regarder ce qu’elles mangent, ce qu’elles achètent et le territoire qui les entoure.',
    }),
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Montpellier',
    faq: [
      {
        q: 'Quelle est la meilleure saison pour organiser un séminaire à Montpellier ?',
        a: 'L’Hérault accueille des séminaires toute l’année grâce à un climat souvent clément. Pour profiter de la garrigue, du Pic Saint-Loup et des activités outdoor sans trop de chaleur, privilégiez avril-juin et septembre-octobre. L’hiver permet de travailler plus tranquillement avec les producteurs et les formats indoor.',
      },
      {
        q: 'Quels cadres choisir pour un séminaire près de Montpellier ?',
        a: 'Autour de Montpellier, les cadres s’étendent du Pic Saint-Loup à la garrigue : domaines viticoles, oliveraies, fermes d’élevage, producteurs et lieux en pleine nature. Une journée peut alterner réunion, immersion agricole, activité outdoor et repas partagé.',
      },
      {
        q: 'Comment se déroule un séminaire chez un producteur ?',
        a: 'Un séminaire chez un producteur peut alterner temps de cohésion, activité manuelle, dégustation et repas autour d’une grande tablée. Lorsque nécessaire, le lieu peut aussi proposer une salle pour travailler dans de bonnes conditions. Le programme est construit sur mesure selon le producteur, vos objectifs et le rythme souhaité.',
      },
    ],
    cta: 'Vous préparez un séminaire à Montpellier ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire d’entreprise proche de Montpellier | TerraGo',
    metaDescription:
      'Séminaire autour de Montpellier : Pic Saint-Loup, oliviers, producteurs et team building éco-responsable. Brief et devis.',
  },
  {
    slug: 'nice',
    name: 'Nice',
    nearLabel: 'près de Nice',
    h1: 'Séminaire d’entreprise proche de Nice',
    intro:
      'Nice vit face à la mer ; l’arrière-pays, lui, vit de l’olivier, des agrumes, du maraîchage de coteau et de l’élevage de montagne. Pour un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]], l’intérêt n’est pas la Promenade mais un producteur des Alpes-Maritimes. TerraGo organise cette sortie de cadre.',
    whyTitle: 'Pourquoi organiser votre séminaire autour de Nice ?',
    arguments: [
      {
        title: 'Une destination accessible',
        text: 'Gare de Nice, cars vers le moyen pays, parfois train des collines : on remonte les vallées en groupe. Un autocar depuis un point unique évite le stationnement impossible du littoral.',
      },
      {
        title: 'Un terroir à découvrir',
        text: 'Olive de Nice, agrumes, mesclun et légumes de coteau, fromages de montagne, miel : le séminaire montre les Alpes-Maritimes agricoles, loin de l’image uniquement balnéaire.',
      },
      {
        title: 'Un impact économique local',
        text: 'Oléiculteurs, agrumiculteurs, éleveurs : des filières fragiles. Votre événement leur achète une journée de travail et de pédagogie.',
      },
    ],
    experiencesTitle: 'Des expériences terroir pour votre équipe',
    activities: [
      {
        title: 'Oliveraie du moyen pays',
        text: 'Gestes de taille ou de récolte, passage au moulin, dégustation d’huile expliquée.',
      },
      {
        title: 'Agréumes',
        text: 'Visite d’une exploitation d’agrumes, dégustation pédagogique, cuisine courte à base de citrons ou d’oranges de saison.',
      },
      {
        title: 'Fromage de montagne',
        text: 'Rencontre d’éleveur, fabrication simple, discussion sur l’estive et le pastoralisme.',
      },
    ],
    rseTitle: 'Un séminaire RSE près de Nice',
    rse: villeRse({
      lead:
        'Entreprise, colline, olive, agrume, fromage, village : ici, tout se tient. Un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]] près de Nice, c’est l’occasion de sortir du cadre habituel pour aller à la rencontre de celles et ceux qui font vivre le moyen pays et l’intérieur des Alpes-Maritimes.',
      discovery:
        'Avec TerraGo, vos équipes découvrent une oliveraie, un verger d’agrumes, une fromagerie de montagne ou un producteur engagé. On visite, on met les mains dans le travail, on échange sur les pratiques agricoles et on partage un repas préparé avec des produits du territoire.',
      concrete:
        'Pas de conférence sur la transition écologique dans une salle de réunion. Ici, on voit concrètement ce que l’on soutient : le travail de l’olivier, une production de coteau, des choix agricoles, parfois des difficultés aussi.',
      team:
        'La RSE devient alors un prétexte pour vivre quelque chose ensemble. Une journée à l’oliveraie, un atelier agrumes, un repas de colline ou une rencontre avec un éleveur : les équipes découvrent, échangent et repartent avec une autre façon de regarder ce qu’elles mangent, ce qu’elles achètent et le territoire qui les entoure.',
    }),
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Nice',
    faq: [
      {
        q: 'Quelle est la meilleure saison pour organiser un séminaire à Nice ?',
        a: 'Le moyen pays niçois se prête aux séminaires toute l’année grâce à un climat doux. Pour profiter des collines, des oliveraies et des activités outdoor, privilégiez avril à juin puis septembre-octobre. L’hiver reste favorable aux ateliers, aux fromages de montagne et aux rencontres chez les producteurs.',
      },
      {
        q: 'Quels cadres choisir pour un séminaire près de Nice ?',
        a: 'Autour de Nice, montez vers le moyen pays : oliveraies, vergers d’agrumes, fermes d’élevage, artisans et lieux en pleine nature sur les collines. Ces cadres permettent de lier travail, découverte du territoire, activité et repas chez le producteur.',
      },
      {
        q: 'Comment se déroule un séminaire chez un producteur ?',
        a: 'Un séminaire chez un producteur peut alterner temps de cohésion, activité manuelle, dégustation et repas autour d’une grande tablée. Lorsque nécessaire, le lieu peut aussi proposer une salle pour travailler dans de bonnes conditions. Le programme est construit sur mesure selon le producteur, vos objectifs et le rythme souhaité.',
      },
    ],
    cta: 'Vous préparez un séminaire à Nice ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire d’entreprise proche de Nice | TerraGo',
    metaDescription:
      'Séminaire près de Nice : arrière-pays, oliviers, agrumes, producteurs et team building utile. Demandez un devis TerraGo.',
  },
  {
    slug: 'grenoble',
    name: 'Grenoble',
    nearLabel: 'près de Grenoble',
    h1: 'Séminaire d’entreprise proche de Grenoble',
    intro:
      'À Grenoble, il suffit de quitter la ville pour changer complètement de décor. Vercors, Chartreuse et Grésivaudan offrent un terrain idéal pour un [[séminaire d’entreprise|/seminaires-entreprise]] chez les producteurs : élevage, fromages, noix, savoir-faire de montagne et repas locaux. Avec TerraGo, vos équipes découvrent un territoire en rencontrant directement celles et ceux qui le font vivre.',
    whyTitle: 'Pourquoi organiser votre séminaire autour de Grenoble ?',
    arguments: [
      {
        title: 'Une destination accessible',
        text: 'Départ depuis Grenoble ou ailleurs ? TGV, navette en car : on regroupe facilement, on supprime les frictions, et on facilite votre organisation.',
      },
      {
        title: 'Un terroir à découvrir',
        text: 'Noix de Grenoble, fromages de Chartreuse ou du Vercors, miel de montagne, élevage : le séminaire parle d’agriculture d’altitude, pas d’un afterwork en centre-ville.',
      },
      {
        title: 'Un impact économique local',
        text: 'Nuciculteurs, fromagers, éleveurs : des filières de massif. Votre budget séminaire les soutient le temps d’une rencontre.',
      },
    ],
    experiencesTitle: 'Des expériences terroir pour votre équipe',
    activities: [
      {
        title: 'Atelier noix',
        text: 'Récolte ou cassage selon la saison, huile ou gâteau collectif, explication de la filière nucicole.',
      },
      {
        title: 'Fromage de montagne',
        text: 'Visite d’alpage ou de fromagerie, fabrication, dégustation pédagogique.',
      },
      {
        title: 'Élevage en Chartreuse ou Vercors',
        text: 'Rencontre d’éleveur, discussion sur le pastoralisme, repas de ferme.',
      },
    ],
    rseTitle: 'Un séminaire RSE près de Grenoble',
    rse: villeRse({
      lead:
        'Entreprise, massif, noix, fromage, repas, village : ici, tout se tient. Un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]] près de Grenoble, c’est l’occasion de sortir du cadre habituel pour aller à la rencontre de celles et ceux qui font vivre le Vercors, la Chartreuse ou le Grésivaudan.',
      discovery:
        'Avec TerraGo, vos équipes découvrent une nuciculture, une fromagerie de montagne, un élevage ou un producteur engagé. On visite, on met les mains dans le travail, on échange sur les pratiques agricoles et on partage un repas préparé avec des produits du territoire.',
      concrete:
        'Pas de conférence sur la transition écologique dans une salle de réunion. Ici, on voit concrètement ce que l’on soutient : le travail de la noix, une production de massif, des choix agricoles, parfois des difficultés aussi.',
      team:
        'La RSE devient alors un prétexte pour vivre quelque chose ensemble. Une journée autour de la noix, un atelier fromage, un repas d’alpage ou une rencontre avec un éleveur : les équipes découvrent, échangent et repartent avec une autre façon de regarder ce qu’elles mangent, ce qu’elles achètent et le territoire qui les entoure.',
    }),
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Grenoble',
    faq: [
      {
        q: 'Quelle est la meilleure saison pour organiser un séminaire à Grenoble ?',
        a: 'Les massifs autour de Grenoble accueillent des séminaires une bonne partie de l’année. Pour profiter du Vercors, de la Chartreuse et des activités outdoor, privilégiez mai à octobre. L’automne et l’hiver se prêtent aux ateliers noix, fromage et aux formats plus abrités chez les producteurs.',
      },
      {
        q: 'Quels cadres choisir pour un séminaire près de Grenoble ?',
        a: 'Autour de Grenoble, les séminaires trouvent leur place dans une nuceraie, une fromagerie de massif, une ferme d’élevage ou en pleine nature dans le Vercors et la Chartreuse. On y combine temps de travail, atelier, immersion et repas de montagne.',
      },
      {
        q: 'Comment se déroule un séminaire chez un producteur ?',
        a: 'Un séminaire chez un producteur peut alterner temps de cohésion, activité manuelle, dégustation et repas autour d’une grande tablée. Lorsque nécessaire, le lieu peut aussi proposer une salle pour travailler dans de bonnes conditions. Le programme est construit sur mesure selon le producteur, vos objectifs et le rythme souhaité.',
      },
    ],
    cta: 'Vous préparez un séminaire à Grenoble ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire d’entreprise proche de Grenoble | TerraGo',
    metaDescription:
      'Séminaire à Grenoble : Vercors, Chartreuse, noix, fromages, producteurs et team building RSE. Organisez votre journée au vert.',
  },
  {
    slug: 'aix-en-provence',
    name: 'Aix-en-Provence',
    nearLabel: 'près d’Aix-en-Provence',
    h1: 'Séminaire d’entreprise proche d’Aix-en-Provence',
    intro:
      'À Aix-en-Provence, changez de cadre sans partir loin. Dans le Pays d’Aix, oliviers, vignes, lavande et maraîchage deviennent le terrain de jeu de votre prochain [[séminaire original|/experiences-entreprise]]. Avec TerraGo, vos équipes rencontrent les producteurs, découvrent leurs savoir-faire et partagent un repas directement ancré dans le territoire.',
    whyTitle: 'Pourquoi organiser votre séminaire autour d’Aix-en-Provence ?',
    arguments: [
      {
        title: 'Une destination accessible',
        text: 'Départ depuis Aix ou ailleurs ? Gare TGV, gare du centre, cars vers le pays d’Aix : on regroupe facilement, on supprime les frictions, et on facilite votre organisation.',
      },
      {
        title: 'Un terroir à découvrir',
        text: 'Huile, vin, plantes aromatiques, légumes, miel : le séminaire montre la Provence cultivée du pays d’Aix, au-delà des calendriers de lavande.',
      },
      {
        title: 'Un impact économique local',
        text: 'Oléiculteurs, vignerons, herboristes, maraîchers : votre journée en immersion participe directement à l’économie agricole.',
      },
    ],
    experiencesTitle: 'Des expériences terroir pour votre équipe',
    activities: [
      {
        title: 'Olivier et moulin',
        text: 'Gestes de l’oliveraie, extraction, dégustation d’huiles d’intensités différentes.',
      },
      {
        title: 'Plantes et lavande',
        text: 'Selon la saison, récolte ou distillation, atelier autour des plantes — concret, pas cosmétique hors sujet.',
      },
      {
        title: 'Vigne du pays d’Aix',
        text: 'Parcelles, chai, vendange, dégustation pédagogique avec le vigneron.',
      },
    ],
    rseTitle: 'Un séminaire RSE près d’Aix-en-Provence',
    rse: villeRse({
      lead:
        'Entreprise, garrigue, oliveraie, lavande, repas, village : ici, tout se tient. Un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]] près d’Aix-en-Provence, c’est l’occasion de sortir du cadre habituel pour aller à la rencontre de celles et ceux qui font vivre le Pays d’Aix.',
      discovery:
        'Avec TerraGo, vos équipes découvrent un domaine oléicole, un vigneron, un producteur de plantes aromatiques ou un artisan engagé. On visite, on met les mains dans le travail, on échange sur les pratiques agricoles et on partage un repas préparé avec des produits du territoire.',
      concrete:
        'Pas de conférence sur la transition écologique dans une salle de réunion. Ici, on voit concrètement ce que l’on soutient : le travail de l’olivier, une production de saison, des choix agricoles, parfois des difficultés aussi — loin d’une Provence décorative.',
      team:
        'La RSE devient alors un prétexte pour vivre quelque chose ensemble. Une journée au moulin, un atelier plantes aromatiques, un repas de garrigue ou une rencontre avec un vigneron : les équipes découvrent, échangent et repartent avec une autre façon de regarder ce qu’elles mangent, ce qu’elles achètent et le territoire qui les entoure.',
    }),
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près d’Aix-en-Provence',
    faq: [
      {
        q: 'Quelle est la meilleure saison pour organiser un séminaire à Aix-en-Provence ?',
        a: 'Le Pays d’Aix se prête aux séminaires toute l’année grâce à un climat doux. Pour profiter de la garrigue, des oliviers et des activités outdoor sans les fortes chaleurs, privilégiez avril-juin et septembre-octobre. L’hiver permet de profiter plus tranquillement des producteurs et des formats indoor.',
      },
      {
        q: 'Quels cadres choisir pour un séminaire près d’Aix-en-Provence ?',
        a: 'Autour d’Aix-en-Provence, les séminaires s’installent dans une oliveraie, un domaine viticole, chez un producteur de plantes aromatiques ou en pleine nature dans la garrigue. Réunion, découverte du savoir-faire, activité outdoor et repas chez le producteur composent la journée.',
      },
      {
        q: 'Comment se déroule un séminaire chez un producteur ?',
        a: 'Un séminaire chez un producteur peut alterner temps de cohésion, activité manuelle, dégustation et repas autour d’une grande tablée. Lorsque nécessaire, le lieu peut aussi proposer une salle pour travailler dans de bonnes conditions. Le programme est construit sur mesure selon le producteur, vos objectifs et le rythme souhaité.',
      },
    ],
    cta: 'Vous préparez un séminaire à Aix-en-Provence ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire d’entreprise proche d’Aix-en-Provence | TerraGo',
    metaDescription:
      'Séminaire près d’Aix-en-Provence : oliviers, vignes, producteurs et team building RSE. Organisez votre journée chez un acteur local.',
  },
  {
    slug: 'angers',
    name: 'Angers',
    nearLabel: 'près d’Angers',
    h1: 'Séminaire d’entreprise proche d’Angers',
    intro:
      'Angers vit au fil de la Loire et du végétal. Anjou viticole, horticulture, maraîchage, arboriculture : le département est un bassin de production. TerraGo transforme un [[séminaire au vert|/seminaires-entreprise]] angevin en journée chez un vigneron, un horticulteur ou un maraîcher, pas en location de château anonyme.',
    whyTitle: 'Pourquoi organiser votre séminaire autour d’Angers ?',
    arguments: [
      {
        title: 'Une destination accessible',
        text: 'Gare d’Angers, TER vers Saumur ou le Layon, cars : le vignoble et les serres se rejoignent en groupe. On regroupe facilement, on supprime les frictions, et on facilite votre organisation..',
      },
      {
        title: 'Un terroir à découvrir',
        text: 'Anjou blanc et rouge, horticulture, fruits, légumes, champignons des caves quand le lieu s’y prête : le séminaire parle d’Anjou productif.',
      },
      {
        title: 'Un impact économique local',
        text: 'Vignerons, horticulteurs, maraîchers : votre événement soutient directement l’économie ligérienne rurale.',
      },
    ],
    experiencesTitle: 'Des expériences terroir pour votre équipe',
    activities: [
      {
        title: 'Vignoble d’Anjou',
        text: 'Parcelles de chenin, chai, dégustation pédagogique — un [[team building|/experiences-entreprise]] ancré dans le vin de Loire.',
      },
      {
        title: 'Horticulture',
        text: 'Serres, bouturage ou rempotage collectif, discussion sur le métier d’horticulteur.',
      },
      {
        title: 'Arboriculture',
        text: 'Verger, récolte selon la saison, atelier jus ou cuisine aux fruits.',
      },
    ],
    rseTitle: 'Un séminaire RSE près d’Angers',
    rse: villeRse({
      lead:
        'Entreprise, parcelle, chenin, verger, repas, village : ici, tout se tient. Un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]] près d’Angers, c’est l’occasion de sortir du cadre habituel pour aller à la rencontre de celles et ceux qui font vivre l’Anjou, le Layon et le Saumurois.',
      discovery:
        'Avec TerraGo, vos équipes découvrent un domaine viticole, une exploitation horticole, un verger ou un producteur engagé. On visite, on met les mains dans le travail, on échange sur les pratiques agricoles et on partage un repas préparé avec des produits du territoire.',
      concrete:
        'Pas de conférence sur la transition écologique dans une salle de réunion. Ici, on voit concrètement ce que l’on soutient : le travail de la vigne, une production végétale, des choix agricoles, parfois des difficultés aussi.',
      team:
        'La RSE devient alors un prétexte pour vivre quelque chose ensemble. Une journée dans les vignes d’Anjou, un atelier horticulture, un repas de Loire ou une rencontre avec un arboriculteur : les équipes découvrent, échangent et repartent avec une autre façon de regarder ce qu’elles mangent, ce qu’elles achètent et le territoire qui les entoure.',
    }),
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près d’Angers',
    faq: [
      {
        q: 'Quelle est la meilleure saison pour organiser un séminaire à Angers ?',
        a: 'L’Anjou accueille des séminaires toute l’année. Pour profiter des vignes, des vergers et des activités outdoor, privilégiez avril à octobre. L’automne, avec les vendanges et les récoltes, est particulièrement intéressant ; l’hiver se prête aux ateliers et aux formats plus indoor.',
      },
      {
        q: 'Quels cadres choisir pour un séminaire près d’Angers ?',
        a: 'Autour d’Angers, les cadres vont du domaine d’Anjou aux serres horticoles, des vergers aux fermes et lieux en pleine nature le long de la Loire. Ces lieux permettent d’imaginer travail, atelier, immersion et repas directement chez le producteur.',
      },
      {
        q: 'Comment se déroule un séminaire chez un producteur ?',
        a: 'Un séminaire chez un producteur peut alterner temps de cohésion, activité manuelle, dégustation et repas autour d’une grande tablée. Lorsque nécessaire, le lieu peut aussi proposer une salle pour travailler dans de bonnes conditions. Le programme est construit sur mesure selon le producteur, vos objectifs et le rythme souhaité.',
      },
    ],
    cta: 'Vous préparez un séminaire à Angers ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire d’entreprise proche d’Angers | TerraGo',
    metaDescription:
      'Séminaire près d’Angers : Anjou, vignobles, horticulture, producteurs et team building RSE. Demandez un devis.',
  },
  {
    slug: 'tours',
    name: 'Tours',
    nearLabel: 'près de Tours',
    h1: 'Séminaire d’entreprise proche de Tours',
    intro:
      'Tours est au cœur du Val de Loire. Autour de la ville, la Touraine vit au rythme de ses vignes, de son maraîchage et de ses élevages. Avec TerraGo, votre [[séminaire éco-responsable|/seminaires-entreprise/sensibilisation-rse]] quitte les salles de réunion pour partir à la rencontre des producteurs : découverte d’un domaine à Montlouis ou Vouvray, atelier maraîcher, rencontre avec un éleveur et repas issus du territoire.',
    whyTitle: 'Pourquoi organiser votre séminaire autour de Tours ?',
    arguments: [
      {
        title: 'Une destination accessible',
        text: 'Gare de Tours ou Saint-Pierre-des-Corps, TER le long de la Loire, cars : les communes viticoles et agricoles se rejoignent sans flotte de voitures.',
      },
      {
        title: 'Un terroir à découvrir',
        text: 'Vouvray, Montlouis, Chinon à portée selon le site, fromages de chèvre, fruits, légumes des varennes : le séminaire montre la Touraine cultivée, pas seulement les châteaux.',
      },
      {
        title: 'Un impact économique local',
        text: 'Vignerons, fromagers, maraîchers : votre journée leur revient. L’économie des villages ligériens se nourrit de ce type de commande.',
      },
    ],
    experiencesTitle: 'Des expériences terroir pour votre équipe',
    activities: [
      {
        title: 'Vignoble tourangeau',
        text: 'Chenin, tuffeau, chai troglodytique ou classique selon l’hôte, dégustation pédagogique.',
      },
      {
        title: 'Fromage de chèvre',
        text: 'Visite d’élevage, fabrication, plateau expliqué par le producteur.',
      },
      {
        title: 'Maraîchage des varennes',
        text: 'Récolte en bord de Loire, cuisine courte, discussion sur les crues et les sols.',
      },
    ],
    rseTitle: 'Un séminaire RSE près de Tours',
    rse: villeRse({
      lead:
        'Entreprise, Loire, Vouvray, chèvre, repas, village : ici, tout se tient. Un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]] près de Tours, c’est l’occasion de sortir du cadre habituel pour aller à la rencontre de celles et ceux qui font vivre la Touraine et les varennes.',
      discovery:
        'Avec TerraGo, vos équipes découvrent un domaine viticole, une fromagerie de chèvre, un maraîcher ou un producteur engagé. On visite, on met les mains dans le travail, on échange sur les pratiques agricoles et on partage un repas préparé avec des produits du territoire.',
      concrete:
        'Pas de conférence sur la transition écologique dans une salle de réunion. Ici, on voit concrètement ce que l’on soutient : le travail de la vigne, une production de saison, des choix agricoles, parfois des difficultés aussi.',
      team:
        'La RSE devient alors un prétexte pour vivre quelque chose ensemble. Une journée dans les vignes tourangelles, un atelier fromage de chèvre, un repas de Loire ou une rencontre avec un maraîcher : les équipes découvrent, échangent et repartent avec une autre façon de regarder ce qu’elles mangent, ce qu’elles achètent et le territoire qui les entoure.',
    }),
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Tours',
    faq: [
      {
        q: 'Quelle est la meilleure saison pour organiser un séminaire à Tours ?',
        a: 'La Touraine se prête aux séminaires toute l’année. Pour profiter de la Loire, des vignobles et des activités outdoor, privilégiez avril à octobre. Septembre-octobre offrent un cadre agréable avec les vendanges ; l’hiver convient aux ateliers fromage, aux caves et aux formats indoor.',
      },
      {
        q: 'Quels cadres choisir pour un séminaire près de Tours ?',
        a: 'Autour de Tours, les séminaires prennent place dans un domaine tourangeau, une fromagerie de chèvre, chez un maraîcher des varennes ou en pleine nature le long de la Loire. La journée peut mêler travail, découverte, activité collective et repas chez le producteur.',
      },
      {
        q: 'Comment se déroule un séminaire chez un producteur ?',
        a: 'Un séminaire chez un producteur peut alterner temps de cohésion, activité manuelle, dégustation et repas autour d’une grande tablée. Lorsque nécessaire, le lieu peut aussi proposer une salle pour travailler dans de bonnes conditions. Le programme est construit sur mesure selon le producteur, vos objectifs et le rythme souhaité.',
      },
    ],
    cta: 'Vous préparez un séminaire à Tours ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire d’entreprise proche de Tours | TerraGo',
    metaDescription:
      'Séminaire autour de Tours : Touraine, vignobles, fromages, producteurs et team building RSE. Brief et devis TerraGo.',
  },
  {
    slug: 'valence',
    name: 'Valence',
    nearLabel: 'près de Valence',
    h1: 'Séminaire d’entreprise proche de Valence',
    intro:
      'Valence ouvre sur la Drôme et l’Ardèche : vergers, noix, plantes aromatiques, vigne. Pour un [[séminaire d’entreprise|/seminaires-entreprise]], c’est un bassin agricole dense, à quitter le centre en un transfert. TerraGo place l’équipe chez un arboriculteur, un producteur de plantes ou un vigneron.',
    whyTitle: 'Pourquoi organiser votre séminaire autour de Valence ?',
    arguments: [
      {
        title: 'Une destination accessible',
        text: 'Gare de Valence-Ville ou TGV, cars vers la Drôme des collines ou l’Ardèche proche : le regroupement est naturel. Un autocar unique suffit souvent.',
      },
      {
        title: 'Un terroir à découvrir',
        text: 'Abricots, pêches, noix, lavande et plantes, vins des collines : le séminaire raconte la vallée du Rhône agricole, pas seulement l’autoroute.',
      },
      {
        title: 'Un impact économique local',
        text: 'Arboriculteurs, nuciculteurs, distillateurs, vignerons : votre événement leur achète une journée de pédagogie et d’accueil.',
      },
    ],
    experiencesTitle: 'Des expériences terroir pour votre équipe',
    activities: [
      {
        title: 'Verger',
        text: 'Taille, éclaircissage ou récolte selon le calendrier, puis atelier confiture ou jus.',
      },
      {
        title: 'Noix',
        text: 'Vergers de noyers, cassage, huile — une filière drômoise expliquée les mains occupées.',
      },
      {
        title: 'Plantes aromatiques',
        text: 'Cueillette, distillation ou sachet collectif, discussion sur les cultures de plantes.',
      },
    ],
    rseTitle: 'Un séminaire RSE près de Valence',
    rse: villeRse({
      lead:
        'Entreprise, verger, abricot, noix, repas, village : ici, tout se tient. Un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]] près de Valence, c’est l’occasion de sortir du cadre habituel pour aller à la rencontre de celles et ceux qui font vivre la Drôme des collines et la vallée du Rhône.',
      discovery:
        'Avec TerraGo, vos équipes découvrent un verger, une nuciculture, un producteur de plantes aromatiques ou un artisan engagé. On visite, on met les mains dans le travail, on échange sur les pratiques agricoles et on partage un repas préparé avec des produits du territoire.',
      concrete:
        'Pas de conférence sur la transition écologique dans une salle de réunion. Ici, on voit concrètement ce que l’on soutient : le travail du fruit, une saison de récolte, des choix agricoles, parfois des difficultés aussi.',
      team:
        'La RSE devient alors un prétexte pour vivre quelque chose ensemble. Une journée au verger, un atelier noix, un repas de colline ou une rencontre avec un distillateur : les équipes découvrent, échangent et repartent avec une autre façon de regarder ce qu’elles mangent, ce qu’elles achètent et le territoire qui les entoure.',
    }),
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Valence',
    faq: [
      {
        q: 'Quelle est la meilleure saison pour organiser un séminaire à Valence ?',
        a: 'La Drôme des collines accueille des séminaires presque toute l’année. Pour profiter des vergers, des collines et des activités outdoor, privilégiez avril à octobre. L’été des récoltes fruitières et l’automne sont particulièrement riches ; l’hiver se prête aux ateliers et aux rencontres chez les producteurs.',
      },
      {
        q: 'Quels cadres choisir pour un séminaire près de Valence ?',
        a: 'Autour de Valence, les cadres s’ouvrent sur les vergers, les nuceraies, les fermes de plantes aromatiques, les domaines des collines ou la pleine nature drômoise. On y enchaîne facilement réunion, immersion, activité outdoor et repas avec les producteurs.',
      },
      {
        q: 'Comment se déroule un séminaire chez un producteur ?',
        a: 'Un séminaire chez un producteur peut alterner temps de cohésion, activité manuelle, dégustation et repas autour d’une grande tablée. Lorsque nécessaire, le lieu peut aussi proposer une salle pour travailler dans de bonnes conditions. Le programme est construit sur mesure selon le producteur, vos objectifs et le rythme souhaité.',
      },
    ],
    cta: 'Vous préparez un séminaire à Valence ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire d’entreprise proche de Valence | TerraGo',
    metaDescription:
      'Séminaire à Valence et en Drôme : vergers, noix, plantes, producteurs et team building RSE. Demandez un devis.',
  },
  {
    slug: 'reims',
    name: 'Reims',
    nearLabel: 'près de Reims',
    h1: 'Séminaire d’entreprise proche de Reims',
    intro:
      'Reims vit avec le champagne ; la Marne vit aussi de céréales, d’élevage et de producteurs hors grandes maisons. Un [[séminaire original|/experiences-entreprise]] TerraGo peut passer par un vigneron indépendant ou une ferme de plaine : autre chose qu’une visite d’enseigne. Sortir du bureau, rencontrer ceux qui font le territoire.',
    whyTitle: 'Pourquoi organiser votre séminaire autour de Reims ?',
    arguments: [
      {
        title: 'Une destination accessible',
        text: 'Gare de Reims, Champagne-Ardenne TGV, cars vers la Montagne de Reims ou la plaine : on regroupe facilement, y compris les équipes parisiennes qui descendent le matin.',
      },
      {
        title: 'Un terroir à découvrir',
        text: 'Vigne, bien sûr, mais aussi blé, betterave, fromages, miel : le séminaire élargit le regard au-delà de la flûte. La Marne agricole est plus large que l’image festive.',
      },
      {
        title: 'Un impact économique local',
        text: 'Vignerons indépendants, céréaliers, éleveurs : votre journée leur revient, plutôt qu’à une salle de réception hors-sol.',
      },
    ],
    experiencesTitle: 'Des expériences terroir pour votre équipe',
    activities: [
      {
        title: 'Vigneron indépendant',
        text: 'Parcelles, pressoir, explication des vins de Champagne chez un producteur à taille humaine.',
      },
      {
        title: 'Ferme céréalière',
        text: 'Lecture d’un assolement champenois, farine, pain collectif.',
      },
      {
        title: 'Miel et pollinisateurs',
        text: 'Ruche pédagogique, dégustation, lien entre cultures et abeilles — sans spectacle.',
      },
    ],
    rseTitle: 'Un séminaire RSE près de Reims',
    rse: villeRse({
      lead:
        'Entreprise, coteau, craie, blé, repas, village : ici, tout se tient. Un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]] près de Reims, c’est l’occasion de sortir du cadre habituel pour aller à la rencontre de celles et ceux qui font vivre la Montagne de Reims et la plaine champenoise — au-delà du seul cliché champagne.',
      discovery:
        'Avec TerraGo, vos équipes découvrent un vigneron indépendant, une ferme céréalière, un apiculteur ou un producteur engagé. On visite, on met les mains dans le travail, on échange sur les pratiques agricoles et on partage un repas préparé avec des produits du territoire.',
      concrete:
        'Pas de conférence sur la transition écologique dans une salle de réunion. Ici, on voit concrètement ce que l’on soutient : le travail de la vigne ou du champ, une production de saison, des choix agricoles, parfois des difficultés aussi.',
      team:
        'La RSE devient alors un prétexte pour vivre quelque chose ensemble. Une journée chez un vigneron indépendant, un atelier à la ferme, un repas de plaine ou une rencontre avec un apiculteur : les équipes découvrent, échangent et repartent avec une autre façon de regarder ce qu’elles mangent, ce qu’elles achètent et le territoire qui les entoure.',
    }),
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Reims',
    faq: [
      {
        q: 'Quelle est la meilleure saison pour organiser un séminaire à Reims ?',
        a: 'La Champagne accueille des séminaires toute l’année. Pour profiter des coteaux, de la plaine et des activités outdoor, privilégiez avril à octobre. Septembre-octobre sont marqués par les vendanges ; l’hiver se prête aux chais, aux fermes et aux formats plus indoor.',
      },
      {
        q: 'Quels cadres choisir pour un séminaire près de Reims ?',
        a: 'Autour de Reims, au-delà des caves, vous pouvez organiser votre séminaire chez un vigneron indépendant, dans une ferme céréalière, chez un apiculteur ou en pleine nature sur les coteaux. Travail, visite, activité collective et repas chez le producteur s’y combinent.',
      },
      {
        q: 'Comment se déroule un séminaire chez un producteur ?',
        a: 'Un séminaire chez un producteur peut alterner temps de cohésion, activité manuelle, dégustation et repas autour d’une grande tablée. Lorsque nécessaire, le lieu peut aussi proposer une salle pour travailler dans de bonnes conditions. Le programme est construit sur mesure selon le producteur, vos objectifs et le rythme souhaité.',
      },
    ],
    cta: 'Vous préparez un séminaire à Reims ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire d’entreprise proche de Reims | TerraGo',
    metaDescription:
      'Séminaire près de Reims : Champagne agricole, producteurs, team building et RSE. Organisez votre journée hors des sentiers battus.',
  },
  {
    slug: 'clermont-ferrand',
    name: 'Clermont-Ferrand',
    nearLabel: 'près de Clermont-Ferrand',
    h1: 'Séminaire d’entreprise proche de Clermont-Ferrand',
    intro:
      'Clermont travaille au pied des volcans. Autour, l’Auvergne d’élevage, de fromages et d’agriculture de montagne reste le vrai paysage. Un [[séminaire au vert|/seminaires-entreprise]] TerraGo, c’est une journée chez un éleveur ou un fromager, pas une salle de zone industrielle. Changer de cadre, rencontrer le métier.',
    whyTitle: 'Pourquoi organiser votre séminaire autour de Clermont-Ferrand ?',
    arguments: [
      {
        title: 'Une destination accessible',
        text: 'Gare de Clermont, cars vers les Combrailles, le Livradois ou la chaîne des Puys : le regroupement se fait depuis le bassin. Un transfert unique évite la dispersion.',
      },
      {
        title: 'Un terroir à découvrir',
        text: 'Fromages d’Auvergne, salers, lentilles, miel, charcuterie fermière : le séminaire parle d’estive et de fromagerie, pas d’un cocktail d’entreprise générique.',
      },
      {
        title: 'Un impact économique local',
        text: 'Éleveurs, fromagers, aubergistes de plateau : votre budget événementiel reste dans le massif. C’est lisible pour les RH.',
      },
    ],
    experiencesTitle: 'Des expériences terroir pour votre équipe',
    activities: [
      {
        title: 'Fromagerie',
        text: 'Caillage, affinage, dégustation pédagogique des pâtes pressées auvergnates.',
      },
      {
        title: 'Estive et élevage',
        text: 'Rencontre d’éleveur, discussion sur l’herbe et les races, repas de ferme.',
      },
      {
        title: 'Lentille et grandes cultures de plateau',
        text: 'Selon l’hôte, visite de parcelle, cuisine collective autour de la lentille ou des céréales locales.',
      },
    ],
    rseTitle: 'Un séminaire RSE près de Clermont-Ferrand',
    rse: villeRse({
      lead:
        'Entreprise, estive, fromage, lentille, repas, village : ici, tout se tient. Un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]] près de Clermont-Ferrand, c’est l’occasion de sortir du cadre habituel pour aller à la rencontre de celles et ceux qui font vivre les volcans, les Combrailles et le Livradois.',
      discovery:
        'Avec TerraGo, vos équipes découvrent une fromagerie, une estive, une ferme d’élevage ou un producteur engagé. On visite, on met les mains dans le travail, on échange sur les pratiques agricoles et on partage un repas préparé avec des produits du territoire.',
      concrete:
        'Pas de conférence sur la transition écologique dans une salle de réunion. Ici, on voit concrètement ce que l’on soutient : le travail pastoral, une production de plateau, des choix agricoles, parfois des difficultés aussi.',
      team:
        'La RSE devient alors un prétexte pour vivre quelque chose ensemble. Une journée en fromagerie, une rencontre d’estive, un repas de ferme ou un atelier autour des lentilles : les équipes découvrent, échangent et repartent avec une autre façon de regarder ce qu’elles mangent, ce qu’elles achètent et le territoire qui les entoure.',
    }),
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Clermont-Ferrand',
    faq: [
      {
        q: 'Quelle est la meilleure saison pour organiser un séminaire à Clermont-Ferrand ?',
        a: 'L’Auvergne accueille des séminaires une bonne partie de l’année. Pour profiter des estives, des plateaux et des activités outdoor, privilégiez mai à octobre. L’automne et l’hiver se prêtent bien aux fromageries, aux fermes et aux formats plus abrités chez les producteurs.',
      },
      {
        q: 'Quels cadres choisir pour un séminaire près de Clermont-Ferrand ?',
        a: 'Autour de Clermont-Ferrand, les séminaires trouvent leur place dans une fromagerie, une ferme d’estive, une exploitation de plateau ou en pleine nature sur les volcans. Ces cadres permettent de mêler travail, immersion pastorale, activité outdoor et repas de ferme.',
      },
      {
        q: 'Comment se déroule un séminaire chez un producteur ?',
        a: 'Un séminaire chez un producteur peut alterner temps de cohésion, activité manuelle, dégustation et repas autour d’une grande tablée. Lorsque nécessaire, le lieu peut aussi proposer une salle pour travailler dans de bonnes conditions. Le programme est construit sur mesure selon le producteur, vos objectifs et le rythme souhaité.',
      },
    ],
    cta: 'Vous préparez un séminaire à Clermont-Ferrand ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire d’entreprise proche de Clermont-Ferrand | TerraGo',
    metaDescription:
      'Séminaire autour de Clermont-Ferrand : Auvergne, élevage, fromages, producteurs et team building RSE. Demandez un devis.',
  },
  {
    slug: 'annecy',
    name: 'Annecy',
    nearLabel: 'près d’Annecy',
    h1: 'Séminaire d’entreprise proche d’Annecy',
    intro:
      'Annecy attire pour le lac ; l’agriculture savoyarde, elle, vit dans les massifs : élevage, fromages, alpages. Un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]] TerraGo n’est pas un séminaire « vue lac » : c’est une journée chez un producteur de Haute-Savoie, à parler lait, herbe et métier.',
    whyTitle: 'Pourquoi organiser votre séminaire autour d’Annecy ?',
    arguments: [
      {
        title: 'Une destination accessible',
        text: 'Gare d’Annecy, cars vers les vallées, parfois train vers La Roche-sur-Foron : on quitte le bord du lac en groupe. Un transfert unique évite le stationnement estival.',
      },
      {
        title: 'Un terroir à découvrir',
        text: 'Reblochon, tome, autres fromages d’alpage, miel de montagne, élevage : le séminaire montre la Savoie agricole, pas seulement le tourisme.',
      },
      {
        title: 'Un impact économique local',
        text: 'Éleveurs, fromagers coopérateurs ou fermiers : votre journée leur achète de l’accueil. L’économie de montagne en a besoin hors saison ski.',
      },
    ],
    experiencesTitle: 'Des expériences terroir pour votre équipe',
    activities: [
      {
        title: 'Fromage d’alpage',
        text: 'Visite, fabrication, dégustation : l’équipe relie la croûte à une traite et à une prairie.',
      },
      {
        title: 'Élevage savoyard',
        text: 'Rencontre d’éleveur, discussion sur l’herbe et les races, marche courte si le site le permet.',
      },
      {
        title: 'Miel de montagne',
        text: 'Rucher pédagogique, miels d’altitude, lien avec la flore alpine.',
      },
    ],
    rseTitle: 'Un séminaire RSE près d’Annecy',
    rse: villeRse({
      lead:
        'Entreprise, alpage, reblochon, tome, repas, commune : ici, tout se tient. Un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]] près d’Annecy, c’est l’occasion de sortir du cadre habituel pour aller à la rencontre de celles et ceux qui font vivre les massifs — loin du seul cliché lacustre.',
      discovery:
        'Avec TerraGo, vos équipes découvrent une fromagerie d’alpage, une ferme d’élevage, un apiculteur de montagne ou un producteur engagé. On visite, on met les mains dans le travail, on échange sur les pratiques agricoles et on partage un repas préparé avec des produits du territoire.',
      concrete:
        'Pas de conférence sur la transition écologique dans une salle de réunion. Ici, on voit concrètement ce que l’on soutient : le travail pastoral, une production d’alpage, des choix agricoles, parfois des difficultés aussi.',
      team:
        'La RSE devient alors un prétexte pour vivre quelque chose ensemble. Une journée en fromagerie, une rencontre d’élevage savoyard, un repas de montagne ou une visite chez un apiculteur : les équipes découvrent, échangent et repartent avec une autre façon de regarder ce qu’elles mangent, ce qu’elles achètent et le territoire qui les entoure.',
    }),
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près d’Annecy',
    faq: [
      {
        q: 'Quelle est la meilleure saison pour organiser un séminaire à Annecy ?',
        a: 'Les massifs autour d’Annecy accueillent des séminaires surtout hors cœur d’hiver en altitude. Pour profiter des alpages et des activités outdoor, privilégiez mai à octobre. L’automne et l’hiver se prêtent aux fromageries, aux ateliers et aux formats indoor chez les producteurs de montagne.',
      },
      {
        q: 'Quels cadres choisir pour un séminaire près d’Annecy ?',
        a: 'Autour d’Annecy, privilégiez les massifs plutôt que le seul bord de lac : fromageries d’alpage, fermes d’élevage, ruchers et lieux en pleine nature. Une journée peut alterner réunion, découverte du savoir-faire, activité outdoor et repas chez le producteur.',
      },
      {
        q: 'Comment se déroule un séminaire chez un producteur ?',
        a: 'Un séminaire chez un producteur peut alterner temps de cohésion, activité manuelle, dégustation et repas autour d’une grande tablée. Lorsque nécessaire, le lieu peut aussi proposer une salle pour travailler dans de bonnes conditions. Le programme est construit sur mesure selon le producteur, vos objectifs et le rythme souhaité.',
      },
    ],
    cta: 'Vous préparez un séminaire à Annecy ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire d’entreprise proche d’Annecy | TerraGo',
    metaDescription:
      'Séminaire près d’Annecy : Haute-Savoie, fromages, élevage, producteurs et team building utile. Organisez votre devis.',
  },
  {
    slug: 'la-rochelle',
    name: 'La Rochelle',
    nearLabel: 'près de La Rochelle',
    h1: 'Séminaire d’entreprise proche de La Rochelle',
    intro:
      'La Rochelle vit du port et du tertiaire. Derrière les tours, la Charente-Maritime cultive l’huître, le maraîchage, la vigne et l’élevage. Un [[séminaire d’entreprise|/seminaires-entreprise]] TerraGo quitte les Minimes pour un ostréiculteur, un maraîcher ou un vigneron : le littoral au travail, pas en décor.',
    whyTitle: 'Pourquoi organiser votre séminaire autour de La Rochelle ?',
    arguments: [
      {
        title: 'Une destination accessible',
        text: 'Gare de La Rochelle, cars vers Marennes, l’île ou les terres : on regroupe depuis un point unique. Un autocar évite le stationnement du centre historique.',
      },
      {
        title: 'Un terroir à découvrir',
        text: 'Huîtres, sel, maraîchage des marais, vins des côtes, élevage de l’intérieur : le séminaire raconte la Charente-Maritime productive.',
      },
      {
        title: 'Un impact économique local',
        text: 'Ostréiculteurs, sauniers, maraîchers, vignerons : votre journée leur commande du temps. L’économie du littoral et des terres en bénéficie.',
      },
    ],
    experiencesTitle: 'Des expériences terroir pour votre équipe',
    activities: [
      {
        title: 'Ostréiculture',
        text: 'Visite de parcs (selon marées et hôte), explication du cycle, dégustation pédagogique.',
      },
      {
        title: 'Marais et maraîchage',
        text: 'Récolte en marais, discussion sur l’eau douce et salée, cuisine courte.',
      },
      {
        title: 'Vignoble charentais',
        text: 'Parcelles, chai, dégustation commentée — pineau ou vins locaux selon le producteur.',
      },
    ],
    rseTitle: 'Un séminaire RSE près de La Rochelle',
    rse: villeRse({
      lead:
        'Entreprise, marais, huître, sel, repas, village : ici, tout se tient. Un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]] près de La Rochelle, c’est l’occasion de sortir du cadre habituel pour aller à la rencontre de celles et ceux qui font vivre le littoral, Marennes et les terres intérieures charentaises.',
      discovery:
        'Avec TerraGo, vos équipes découvrent un parc à huîtres, un marais salant, un maraîcher ou un producteur engagé. On visite, on met les mains dans le travail, on échange sur les pratiques et on partage un repas préparé avec des produits du territoire.',
      concrete:
        'Pas de conférence sur la transition écologique dans une salle de réunion. Ici, on voit concrètement ce que l’on soutient : le travail de l’estran ou du marais, une production de saison, des choix professionnels, parfois des difficultés aussi.',
      team:
        'La RSE devient alors un prétexte pour vivre quelque chose ensemble. Une journée en ostréiculture, un atelier au marais, un repas local ou une rencontre avec un vigneron charentais : les équipes découvrent, échangent et repartent avec une autre façon de regarder ce qu’elles mangent, ce qu’elles achètent et le territoire qui les entoure.',
    }),
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de La Rochelle',
    faq: [
      {
        q: 'Quelle est la meilleure saison pour organiser un séminaire à La Rochelle ?',
        a: 'La Charente-Maritime se prête aux séminaires toute l’année grâce à un climat souvent doux. Pour profiter des marais, du littoral et des activités outdoor, privilégiez avril à octobre. L’hiver reste intéressant pour l’ostréiculture, les producteurs et les formats plus abrités.',
      },
      {
        q: 'Quels cadres choisir pour un séminaire près de La Rochelle ?',
        a: 'Autour de La Rochelle, les séminaires se déroulent entre cabanes ostréicoles, fermes de marais, domaines de l’intérieur et lieux en pleine nature. On y combine temps de travail, découverte du métier, activité outdoor et repas avec les producteurs.',
      },
      {
        q: 'Comment se déroule un séminaire chez un producteur ?',
        a: 'Un séminaire chez un producteur peut alterner temps de cohésion, activité manuelle, dégustation et repas autour d’une grande tablée. Lorsque nécessaire, le lieu peut aussi proposer une salle pour travailler dans de bonnes conditions. Le programme est construit sur mesure selon le producteur, vos objectifs et le rythme souhaité.',
      },
    ],
    cta: 'Vous préparez un séminaire à La Rochelle ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire d’entreprise proche de La Rochelle | TerraGo',
    metaDescription:
      'Séminaire à La Rochelle : ostréiculture, marais, producteurs et team building RSE. Organisez votre journée chez un acteur local.',
  },
  {
    slug: 'biarritz',
    name: 'Biarritz',
    nearLabel: 'près de Biarritz',
    h1: 'Séminaire d’entreprise proche de Biarritz',
    intro:
      'Biarritz attire pour l’océan ; le Pays Basque intérieur vit d’élevage, de fromage, de piment d’Espelette et de polyculture. Un [[séminaire original|/experiences-entreprise]] TerraGo quitte la côte pour une ferme basque : rencontre, savoir-faire, repas. Pas un séminaire « vue surf ».',
    whyTitle: 'Pourquoi organiser votre séminaire autour de Biarritz ?',
    arguments: [
      {
        title: 'Une destination accessible',
        text: 'Gare de Biarritz ou Bayonne, cars vers l’intérieur : Espelette, collines, fermes d’élevage. Un transfert unique évite les voitures sur la côte saturée.',
      },
      {
        title: 'Un terroir à découvrir',
        text: 'Piment d’Espelette, fromages de brebis, charcuterie, cidre basque, élevage : le séminaire parle du Pays Basque agricole, bilingue et concret.',
      },
      {
        title: 'Un impact économique local',
        text: 'Éleveurs, producteurs de piment, fromagers : votre événement leur achète une journée. L’économie de l’intérieur, souvent moins visible que la côte, en profite.',
      },
    ],
    experiencesTitle: 'Des expériences terroir pour votre équipe',
    activities: [
      {
        title: 'Piment d’Espelette',
        text: 'Parcelle, séchage, poudre : l’équipe comprend une AOP par le geste, pas par une boutique.',
      },
      {
        title: 'Fromage de brebis',
        text: 'Élevage, fabrication, dégustation pédagogique d’ossau-iraty ou de tomes fermières selon l’hôte.',
      },
      {
        title: 'Ferme basque',
        text: 'Visite d’exploitation mixte, cuisine collective, discussion sur le pastoralisme et les collines.',
      },
    ],
    rseTitle: 'Un séminaire RSE près de Biarritz',
    rse: villeRse({
      lead:
        'Entreprise, colline, piment, fromage de brebis, repas, village : ici, tout se tient. Un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]] près de Biarritz, c’est l’occasion de sortir du cadre habituel pour aller à la rencontre de celles et ceux qui font vivre l’intérieur du Pays Basque — loin du seul folklore côtier.',
      discovery:
        'Avec TerraGo, vos équipes découvrent une ferme de piment d’Espelette, une fromagerie de brebis, un élevage ou un producteur engagé. On visite, on met les mains dans le travail, on échange sur les pratiques agricoles et on partage un repas préparé avec des produits du territoire.',
      concrete:
        'Pas de conférence sur la transition écologique dans une salle de réunion. Ici, on voit concrètement ce que l’on soutient : le travail de la colline, une production de saison, des choix agricoles, parfois des difficultés aussi.',
      team:
        'La RSE devient alors un prétexte pour vivre quelque chose ensemble. Une journée autour du piment d’Espelette, un atelier fromage de brebis, un repas de ferme ou une rencontre avec un éleveur : les équipes découvrent, échangent et repartent avec une autre façon de regarder ce qu’elles mangent, ce qu’elles achètent et le territoire qui les entoure.',
    }),
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Biarritz',
    faq: [
      {
        q: 'Quelle est la meilleure saison pour organiser un séminaire à Biarritz ?',
        a: 'Le Pays Basque accueille des séminaires toute l’année. Pour profiter des collines de l’intérieur, des fermes et des activités outdoor, privilégiez avril à octobre. L’automne et l’hiver, souvent doux, se prêtent aux ateliers fromage, piment et aux rencontres chez les producteurs.',
      },
      {
        q: 'Quels cadres choisir pour un séminaire près de Biarritz ?',
        a: 'Autour de Biarritz, quittez la côte pour l’intérieur basque : fermes d’élevage, producteurs de piment d’Espelette, fromageries de brebis et lieux en pleine nature. Ces cadres permettent de lier travail, immersion, activité collective et repas chez le producteur.',
      },
      {
        q: 'Comment se déroule un séminaire chez un producteur ?',
        a: 'Un séminaire chez un producteur peut alterner temps de cohésion, activité manuelle, dégustation et repas autour d’une grande tablée. Lorsque nécessaire, le lieu peut aussi proposer une salle pour travailler dans de bonnes conditions. Le programme est construit sur mesure selon le producteur, vos objectifs et le rythme souhaité.',
      },
    ],
    cta: 'Vous préparez un séminaire à Biarritz ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire d’entreprise proche de Biarritz | TerraGo',
    metaDescription:
      'Séminaire près de Biarritz : Pays Basque, éleveurs, piment d’Espelette, team building et RSE. Demandez un devis TerraGo.',
  },
];

const BY_SLUG = Object.fromEntries(
  VILLES_SEMINAIRE.map((v) => [v.slug, v]),
) as Record<VilleSeminaireSlug, VilleSeminaire>;

export function getVilleSeminaire(slug: string): VilleSeminaire | undefined {
  if (!VILLE_SEMINAIRE_SLUGS.includes(slug as VilleSeminaireSlug)) return undefined;
  return BY_SLUG[slug as VilleSeminaireSlug];
}

export function villeFaqItems(ville: VilleSeminaire): VilleFaq[] {
  return [ville.faq[0], ville.faq[1], ville.faq[2]];
}
