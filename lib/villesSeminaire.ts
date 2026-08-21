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
  rse: string;
  faqTitle: string;
  faq: [VilleFaq, VilleFaq, VilleFaq];
  cta: string;
  metaTitle: string;
  metaDescription: string;
};

export function villeSeminairePath(slug: string): string {
  return `/seminaire-${slug}`;
}

export const VILLES_SEMINAIRE: VilleSeminaire[] = [
  {
    slug: 'paris',
    name: 'Paris',
    nearLabel: 'près de Paris',
    h1: 'Séminaire nature près de Paris : changez de cadre',
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
    rse: 'La RSE d’un séminaire n’est pas un discours projeté sur un écran. C’est le choix du lieu : entreprise parisienne, producteur, repas issu autant que possible des circuits courts, activité utile à la ferme. L’alimentation, le travail agricole et l’économie locale se tiennent. TerraGo organise ce fil, sans promesse chiffrée ni label inventé.',
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Paris',
    faq: [
      {
        q: 'Comment rejoindre un lieu de séminaire depuis Paris ?',
        a: 'Selon le site, nous combinons gare de départ, correspondance Transilien ou RER, puis transfert groupé. Le brief précise effectif et horaires pour éviter l’éparpillement en voiture.',
      },
      {
        q: 'Quels types de lieux peut-on trouver autour de Paris ?',
        a: 'Fermes maraîchères, fromageries, exploitations céréalières, ateliers de transformation et maisons de producteurs en Seine-et-Marne, Yvelines, Val-d’Oise ou Essonne, selon disponibilités.',
      },
      {
        q: 'Peut-on organiser une restauration locale pour un séminaire ?',
        a: 'Oui : le repas s’appuie autant que possible sur les productions de l’hôte et de ses voisins — légumes, fromages, pain, miel — plutôt que sur un traiteur hors-sol.',
      },
    ],
    cta: 'Vous préparez un séminaire à Paris ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire près de Paris chez un producteur | TerraGo',
    metaDescription:
      'Séminaire d’entreprise près de Paris : campagnes franciliennes, producteurs, team building utile et démarche RSE concrète. Brief et devis.',
  },
  {
    slug: 'lyon',
    name: 'Lyon',
    nearLabel: 'près de Lyon',
    h1: 'Séminaire original à Lyon : partez à la rencontre du terroir',
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
    rse: 'Entreprise lyonnaise, producteur, territoire, assiette, geste collectif : la chaîne est courte. La RSE se joue dans le choix d’acheter une journée de travail agricole plutôt qu’une location de salle. TerraGo relie ces maillons sans inventer d’indicateurs.',
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Lyon',
    faq: [
      {
        q: 'Comment rejoindre un lieu de séminaire depuis Lyon ?',
        a: 'Départ groupé depuis une gare ou un parking relais, puis transfert. Beaujolais, monts du Lyonnais ou Dombes se prêtent à des combinaisons train + navette selon le site retenu.',
      },
      {
        q: 'Quels types de lieux peut-on trouver autour de Lyon ?',
        a: 'Domaines viticoles, fermes d’élevage, maraîchers, ateliers de transformation et salles rustiques chez le producteur — pas des centres de congrès.',
      },
      {
        q: 'Peut-on organiser une restauration locale pour un séminaire ?',
        a: 'Le repas suit les productions du lieu et du voisinage : vin, volaille, légumes, fromages. On travaille avec ce qui est disponible, sans carte figée hors saison.',
      },
    ],
    cta: 'Vous préparez un séminaire à Lyon ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire à Lyon chez les producteurs | TerraGo',
    metaDescription:
      'Séminaire d’entreprise à Lyon et alentours : Beaujolais, Dombes, producteurs, team building terroir et RSE concrète. Demandez un devis.',
  },
  {
    slug: 'marseille',
    name: 'Marseille',
    nearLabel: 'près de Marseille',
    h1: 'Séminaire éco-responsable à Marseille et dans les environs',
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
    rse: 'De l’entreprise marseillaise à l’exploitation, le circuit est géographique et alimentaire. Choisir un producteur, c’est relier RSE, assiette et économie rurale. L’activité n’est pas un à-côté : elle est le contenu de la journée.',
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Marseille',
    faq: [
      {
        q: 'Comment rejoindre un lieu de séminaire depuis Marseille ?',
        a: 'Rendez-vous gare ou parking, puis autocar vers Alpilles, Camargue ou arrière-pays. Nous calons les horaires sur les contraintes de vos collaborateurs, y compris ceux qui viennent d’Aix.',
      },
      {
        q: 'Quels types de lieux peut-on trouver autour de Marseille ?',
        a: 'Oliveraies, domaines viticoles, fermes maraîchères, élevages camarguais, ateliers d’herboristerie — des lieux de production, pas des palaces.',
      },
      {
        q: 'Peut-on organiser une restauration locale pour un séminaire ?',
        a: 'Huile, légumes, vin, riz, fromages de chèvre : le menu s’écrit avec l’hôte et les producteurs voisins, selon la saison.',
      },
    ],
    cta: 'Vous préparez un séminaire à Marseille ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire éco-responsable à Marseille | TerraGo',
    metaDescription:
      'Séminaire à Marseille et en Provence : oliviers, vignerons, team building agricole et RSE. Organisez votre journée chez un producteur.',
  },
  {
    slug: 'bordeaux',
    name: 'Bordeaux',
    nearLabel: 'près de Bordeaux',
    h1: 'Séminaire original près de Bordeaux chez les producteurs',
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
    rse: 'Entreprise, domaine, sol, bouteille, repas, village : tout se tient. Un [[séminaire RSE|/seminaires-entreprise/sensibilisation-rse]] bordelais, ici, c’est payer le travail agricole et rester à table avec ceux qui l’ont fait. TerraGo organise cette rencontre.',
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Bordeaux',
    faq: [
      {
        q: 'Comment rejoindre un lieu de séminaire depuis Bordeaux ?',
        a: 'Départ Saint-Jean ou périphérie, puis navette vers Entre-deux-Mers, Médoc ou campagnes de l’estuaire. Nous évitons le « chacun sa voiture » dès que l’effectif le permet.',
      },
      {
        q: 'Quels types de lieux peut-on trouver autour de Bordeaux ?',
        a: 'Propriétés viticoles à taille humaine, fermes, serres, ateliers de transformation — des lieux de travail, pas uniquement des châteaux de réception.',
      },
      {
        q: 'Peut-on organiser une restauration locale pour un séminaire ?',
        a: 'Oui, autour du vin du domaine, des légumes voisins, des fromages et du pain : une table girondine collée à la production du jour.',
      },
    ],
    cta: 'Vous préparez un séminaire à Bordeaux ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire original près de Bordeaux | TerraGo',
    metaDescription:
      'Séminaire d’entreprise près de Bordeaux : vignobles, maraîchage, producteurs et team building utile. Démarche RSE, devis sur brief.',
  },
  {
    slug: 'toulouse',
    name: 'Toulouse',
    nearLabel: 'près de Toulouse',
    h1: 'Séminaire RSE autour de Toulouse',
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
    rse: 'Le siège toulousain, le producteur, le champ, l’assiette et le village forment une seule chaîne. Organiser le séminaire chez l’agriculteur, c’est déjà une décision RSE. TerraGo la met en programme, sans greenwashing chiffré.',
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Toulouse',
    faq: [
      {
        q: 'Comment rejoindre un lieu de séminaire depuis Toulouse ?',
        a: 'Point de rassemblement Matabiau ou parking d’entreprise, puis transfert vers Lauragais, Frontonnais ou campagnes de Haute-Garonne.',
      },
      {
        q: 'Quels types de lieux peut-on trouver autour de Toulouse ?',
        a: 'Fermes céréalières, domaines du Frontonnais, élevages, ateliers de transformation et salles chez le producteur.',
      },
      {
        q: 'Peut-on organiser une restauration locale pour un séminaire ?',
        a: 'Oui : légumes, fromages, vins, viandes, etc : tous nos séminaires privilégient des repas locaux & de saison plutôt que des buffets standards de centre d’affaires.',
      },
    ],
    cta: 'Vous préparez un séminaire à Toulouse ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire RSE autour de Toulouse | TerraGo',
    metaDescription:
      'Séminaire d’entreprise autour de Toulouse : Lauragais, Frontonnais, producteurs occitans et team building utile. Demandez un devis.',
  },
  {
    slug: 'nantes',
    name: 'Nantes',
    nearLabel: 'près de Nantes',
    h1: 'Séminaire éco-responsable près de Nantes : changez de cadre',
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
    rse: 'De l’entreprise nantaise à la parcelle, le lien est alimentaire et économique. La RSE tient dans le choix d’un hôte producteur, d’un repas local et d’une activité qui sert la ferme. TerraGo assemble ces trois éléments.',
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Nantes',
    faq: [
      {
        q: 'Comment rejoindre un lieu de séminaire depuis Nantes ?',
        a: 'Un départ proche de Nantes ou depuis une gare ? Aucun problème ! Nous organisons les navettes selon vos contraintes, pour vous rendre sur les lieux de votre séminaire.',
      },
      {
        q: 'Quels types de lieux peut-on trouver autour de Nantes ?',
        a: 'Domaines du muscadet, serres et champs, fermes d’élevage, domaine proche de l’océan — des lieux de production ligériens.',
      },
      {
        q: 'Peut-on organiser une restauration locale pour un séminaire ?',
        a: 'Légumes, fromages, vins : tous nos séminaires privilégient des repas locaux & de saison. Lorsque cela est possible nous proposons des repas en grandes tablées généreuses (déjeuner dans les champs, pique-nique en pleine nature, etc) pour favoriser les échanges et l’immersion.',
      },
    ],
    cta: 'Vous préparez un séminaire à Nantes ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire au vert près de Nantes | TerraGo',
    metaDescription:
      'Séminaire d’entreprise près de Nantes : vignoble nantais, maraîchage, producteurs et team building RSE. Brief et devis TerraGo.',
  },
  {
    slug: 'rennes',
    name: 'Rennes',
    nearLabel: 'près de Rennes',
    h1: 'Séminaire nature proche de  Rennes, au plus près des campagnes',
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
    rse: 'Entreprise rennaise, éleveur, haie, lait, repas, commune : la RSE est cette continuité. Pas de promesse carbone inventée. Un choix d’hôte, un repas de ferme, une activité utile.',
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Rennes',
    faq: [
      {
        q: 'Comment rejoindre un lieu de séminaire depuis Rennes ?',
        a: 'Un départ proche de Rennes ou depuis une gare ? Aucun problème ! Nous organisons les navettes selon vos contraintes, pour vous rendre sur les lieux de votre séminaire.',
      },
      {
        q: 'Quels types de lieux peut-on trouver autour de Rennes ?',
        a: 'Fermes laitières, cidreries, maraîchers, ateliers de transformation : des exploitations, pas des salles de séminaire urbaines.',
      },
      {
        q: 'Peut-on organiser une restauration locale pour un séminaire ?',
        a: 'Produits de la mer ou de la terre : tous nos séminaires privilégient des repas locaux & de saison. Lorsque cela est possible nous proposons des repas en grandes tablées généreuses (déjeuner dans les champs, pique-nique en bord de mer, etc) pour favoriser les échanges et l’immersion.',
      },
    ],
    cta: 'Vous préparez un séminaire à Rennes ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire d’entreprise à Rennes | TerraGo',
    metaDescription:
      'Séminaire près de Rennes : élevage, cidre, campagnes d’Ille-et-Vilaine, producteurs et RSE concrète. Demandez votre devis.',
  },
  {
    slug: 'lille',
    name: 'Lille',
    nearLabel: 'près de Lille',
    h1: 'Séminaire original autour de Lille, chez les producteurs',
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
    rse: 'Du siège lillois au champ de Pévèle, la RSE est un trajet court et un repas local. Producteurs, territoire, alimentation, activité, facture : TerraGo tient ce fil, sans indicateur inventé.',
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Lille',
    faq: [
      {
        q: 'Comment rejoindre un lieu de séminaire depuis Lille ?',
        a: 'Rendez-vous Flandres ou Lille-Europe, puis navette vers le logement ou le producteur, selon le lieu d’accueil.',
      },
      {
        q: 'Quels types de lieux peut-on trouver autour de Lille ?',
        a: 'Fermes maraîchères, élevages, brasseries à la ferme, etc : des lieux de production des Hauts-de-France.',
      },
      {
        q: 'Peut-on organiser une restauration locale pour un séminaire ?',
        a: 'Produits de la mer ou de la terre : tous nos séminaires privilégient des repas locaux & de saison. Lorsque cela est possible nous proposons des repas en grandes tablées généreuses (déjeuner dans les champs, dîner sous la serre, etc) pour favoriser les échanges et l’immersion.',
      },
    ],
    cta: 'Vous préparez un séminaire à Lille ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire original autour de Lille | TerraGo',
    metaDescription:
      'Séminaire d’entreprise autour de Lille : Flandre, Pévèle, maraîchers, team building et RSE. Organisez votre journée chez un producteur.',
  },
  {
    slug: 'strasbourg',
    name: 'Strasbourg',
    nearLabel: 'près de Strasbourg',
    h1: 'Séminaire éco-responsable près de Strasbourg',
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
    rse: 'Entreprise strasbourgeoise, producteur, plaine ou coteau, assiette, geste collectif : la RSE est locale. TerraGo refuse les discours vagues ; le programme est une rencontre agricole.',
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Strasbourg',
    faq: [
      {
        q: 'Comment rejoindre un lieu de séminaire depuis Strasbourg ?',
        a: 'Départ gare, puis TER ou autocar vers un village viticole ou une commune maraîchère. Nous regroupons les arrivées transfrontalières si besoin.',
      },
      {
        q: 'Quels types de lieux peut-on trouver autour de Strasbourg ?',
        a: 'Domaines alsaciens, fermes de plaine, ateliers de transformation, maisons de producteurs.',
      },
      {
        q: 'Peut-on organiser une restauration locale pour un séminaire ?',
        a: 'Vin du domaine, légumes, fromages, charcuterie artisanale : nous favorison de repas locaux et de saison.',
      },
    ],
    cta: 'Vous préparez un séminaire à Strasbourg ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire éco-responsable près de Strasbourg | TerraGo',
    metaDescription:
      'Séminaire près de Strasbourg : vignoble alsacien, maraîchage rhénan, producteurs et team building RSE. Demandez un devis.',
  },
  {
    slug: 'montpellier',
    name: 'Montpellier',
    nearLabel: 'près de Montpellier',
    h1: 'Séminaire à impact autour de Montpellier',
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
    rse: 'De l’entreprise montpelliéraine à la garrigue, la RSE est un choix d’hôte et d’assiette. Circuits courts, savoir-faire, économie villageoise : TerraGo les met dans le programme, sans chiffre inventé.',
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Montpellier',
    faq: [
      {
        q: 'Comment rejoindre un lieu de séminaire depuis Montpellier ?',
        a: 'Départ depuis Paris, ou Montpellier et ses alentours ? Aucun problème, nous organisons le train et les navette vers Pic Saint-Loup, ou arrière-pays selon le lieu de séminaire sélectionné.',
      },
      {
        q: 'Quels types de lieux peut-on trouver autour de Montpellier ?',
        a: 'Domaines viticoles, oliveraies, fermes d’élevage, maraîchers — des exploitations méditerranéennes.',
      },
      {
        q: 'Peut-on organiser une restauration locale pour un séminaire ?',
        a: 'Vin, huile, légumes, fromages de brebis : le repas s’appuie sur l’hôte et les producteurs voisins.',
      },
    ],
    cta: 'Vous préparez un séminaire à Montpellier ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire au vert autour de Montpellier | TerraGo',
    metaDescription:
      'Séminaire autour de Montpellier : Pic Saint-Loup, oliviers, producteurs et team building éco-responsable. Brief et devis.',
  },
  {
    slug: 'nice',
    name: 'Nice',
    nearLabel: 'près de Nice',
    h1: 'Séminaire RSE près de Nice, vers l’arrière-pays',
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
    rse: 'Entreprise niçoise, producteur de l’intérieur, colline, alimentation, économie villageoise : la RSE est cette remontée vers ceux qui cultivent encore. TerraGo la programme sans slogan touristique.',
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Nice',
    faq: [
      {
        q: 'Comment rejoindre un lieu de séminaire depuis Nice ?',
        a: 'Départ depuis Nice ou ailleurs ? Aucun problème, nous organisons le train et les navette vers le lieu de séminaire sélectionné.',
      },
      {
        q: 'Quels types de lieux peut-on trouver autour de Nice ?',
        a: 'Oliveraies, vergers d’agrumes, fermes d’élevage, ateliers — des lieux de production des Alpes-Maritimes.',
      },
      {
        q: 'Peut-on organiser une restauration locale pour un séminaire ?',
        a: 'Huile, agrumes, légumes, fromages : le menu suit ce que l’arrière-pays produit réellement. Tous nos séminaires privilégient des repas locaux & de saison. Lorsque cela est possible nous proposons des repas en grandes tablées généreuses (déjeuner dans les champs, dîner sous la grange, etc) pour favoriser les échanges et l’immersion.',
      },
    ],
    cta: 'Vous préparez un séminaire à Nice ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire RSE près de Nice | TerraGo',
    metaDescription:
      'Séminaire près de Nice : arrière-pays, oliviers, agrumes, producteurs et team building utile. Demandez un devis TerraGo.',
  },
  {
    slug: 'grenoble',
    name: 'Grenoble',
    nearLabel: 'près de Grenoble',
    h1: 'Séminaire nature à Grenoble : cap sur les massifs',
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
    rse: 'Du campus ou du siège grenoblois à l’exploitation de massif, la RSE est un choix de territoire. Alimentation de montagne, savoir-faire, économie locale : TerraGo les relie dans le programme.',
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Grenoble',
    faq: [
      {
        q: 'Comment rejoindre un lieu de séminaire depuis Grenoble ?',
        a: 'Départ depuis Grenoble ou ailleurs ? Aucun problème, nous organisons le train et les navette vers le lieu de séminaire sélectionné.',
      },
      {
        q: 'Quels types de lieux peut-on trouver autour de Grenoble ?',
        a: 'Vergers de noyers, fromageries, fermes d’élevage :  des lieux de production en pleine nature.',
      },
      {
        q: 'Peut-on organiser une restauration locale pour un séminaire ?',
        a: 'Noix, fromages, viandes d’élevage local : tous nos séminaires privilégient des repas locaux & de saison. Lorsque cela est possible nous proposons des repas en grandes tablées généreuses (déjeuner dans les champs, dîner sous la serre, etc) pour favoriser les échanges et l’immersion.',
      },
    ],
    cta: 'Vous préparez un séminaire à Grenoble ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire entreprise à Grenoble | TerraGo',
    metaDescription:
      'Séminaire à Grenoble : Vercors, Chartreuse, noix, fromages, producteurs et team building RSE. Organisez votre journée au vert.',
  },
  {
    slug: 'aix-en-provence',
    name: 'Aix-en-Provence',
    nearLabel: 'près d’Aix-en-Provence',
    h1: 'Séminaire original près d’Aix-en-Provence',
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
    rse: 'Entreprise aixoise, producteur, garrigue, assiette, village : la RSE est locale. TerraGo refuse le séminaire « Provence » décoratif ; le contenu, c’est le métier agricole.',
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près d’Aix-en-Provence',
    faq: [
      {
        q: 'Comment rejoindre un lieu de séminaire depuis Aix-en-Provence ?',
        a: 'Point de rendez-vous centre ou TGV, puis navette vers le lieu du séminaire au pays d’Aix. ',
      },
      {
        q: 'Quels types de lieux peut-on trouver autour d’Aix-en-Provence ?',
        a: 'Oliveraies, domaines viticoles, fermes, ateliers de plantes : des lieux de production provençaux.',
      },
      {
        q: 'Peut-on organiser une restauration locale pour un séminaire ?',
        a: 'Huile, légumes, vin, fromages de chèvre : tous nos séminaires privilégient des repas locaux & de saison. Lorsque cela est possible nous proposons des repas en grandes tablées généreuses (déjeuner au milieu des lavandes, dîner sous les oliviers, etc) pour favoriser les échanges et transformer l’expérience.',
      },
    ],
    cta: 'Vous préparez un séminaire à Aix-en-Provence ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire original près d’Aix-en-Provence | TerraGo',
    metaDescription:
      'Séminaire près d’Aix-en-Provence : oliviers, vignes, producteurs et team building RSE. Organisez votre journée chez un acteur local.',
  },
  {
    slug: 'angers',
    name: 'Angers',
    nearLabel: 'près d’Angers',
    h1: 'Séminaire à impact en Anjou, près d’Angers',
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
    rse: 'Du siège angevin à la parcelle, la RSE est végétale et alimentaire. TerraGo relie entreprise, producteur, Loire agricole et repas local, sans promesse chiffrée.',
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près d’Angers',
    faq: [
      {
        q: 'Comment rejoindre un lieu de séminaire depuis Angers ?',
        a: 'Rendez-vous gare, puis transfert vers Layon, Saumurois ou communes maraîchères selon le lieu du séminaire.',
      },
      {
        q: 'Quels types de lieux peut-on trouver autour d’Angers ?',
        a: 'Domaines d’Anjou, serres horticoles, vergers, fermes — des lieux de production, pas des salles urbaines.',
      },
      {
        q: 'Peut-on organiser une restauration locale pour un séminaire ?',
        a: 'Vin d’Anjou, fruits, légumes, fromages : tous nos séminaires privilégient des repas locaux & de saison. Lorsque cela est possible nous proposons des repas en grandes tablées généreuses (déjeuner dans les vignes, dîner sous la serre, etc) pour favoriser les échanges et enrichir l’expérience.',
      },
    ],
    cta: 'Vous préparez un séminaire à Angers ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire au vert près d’Angers | TerraGo',
    metaDescription:
      'Séminaire près d’Angers : Anjou, vignobles, horticulture, producteurs et team building RSE. Demandez un devis.',
  },
  {
    slug: 'tours',
    name: 'Tours',
    nearLabel: 'près de Tours',
    h1: 'Séminaire éco-responsable autour de Tours',
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
    rse: 'Entreprise tourangelle, producteur, Loire, assiette, village : la RSE est un circuit court géographique. TerraGo l’organise en programme de journée.',
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Tours',
    faq: [
      {
        q: 'Comment rejoindre un lieu de séminaire depuis Tours ?',
        a: 'Départ Tours ou Saint-Pierre-des-Corps, puis navette vers une commune viticole ou agricole de Touraine.',
      },
      {
        q: 'Quels types de lieux peut-on trouver autour de Tours ?',
        a: 'Domaines, fermes caprines, maraîchers, ateliers — des lieux de production tourangeaux.',
      },
      {
        q: 'Peut-on organiser une restauration locale pour un séminaire ?',
        a: 'Vin de Loire, rillettes, fromages, légumes : tous nos séminaires privilégient des repas locaux & de saison. Lorsque cela est possible nous proposons des repas en grandes tablées généreuses (déjeuner dans les vignes, dîner sous la serre, etc) pour favoriser les échanges et enrichir l’expérience.',
      },
    ],
    cta: 'Vous préparez un séminaire à Tours ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire éco-responsable autour de Tours | TerraGo',
    metaDescription:
      'Séminaire autour de Tours : Touraine, vignobles, fromages, producteurs et team building RSE. Brief et devis TerraGo.',
  },
  {
    slug: 'valence',
    name: 'Valence',
    nearLabel: 'près de Valence',
    h1: 'Séminaire éco-responsable à Valence et dans la Drôme',
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
    rse: 'Du siège valentinois au verger, la RSE est fruitière et locale. TerraGo relie entreprise, producteur, colline, alimentation et économie villageoise.',
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Valence',
    faq: [
      {
        q: 'Comment rejoindre un lieu de séminaire depuis Valence ?',
        a: 'Rendez-vous Valence-Ville ou TGV, puis transfert vers Drôme des collines ou Ardèche proche selon le site.',
      },
      {
        q: 'Quels types de lieux peut-on trouver autour de Valence ?',
        a: 'Vergers, nuceraies, fermes de plantes, domaines viticoles — des exploitations drômoises et ardéchoises.',
      },
      {
        q: 'Peut-on organiser une restauration locale pour un séminaire ?',
        a: 'Fruits, noix, vins, fromages de chèvre : le repas suit les productions du lieu.',
      },
    ],
    cta: 'Vous préparez un séminaire à Valence ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire d’entreprise à Valence | TerraGo',
    metaDescription:
      'Séminaire à Valence et en Drôme : vergers, noix, plantes, producteurs et team building RSE. Demandez un devis.',
  },
  {
    slug: 'reims',
    name: 'Reims',
    nearLabel: 'près de Reims',
    h1: 'Séminaire original près de Reims, au-delà du champagne',
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
    rse: 'Entreprise rémoise, producteur, craie, assiette, village : la RSE est un choix d’hôte. TerraGo évite le cliché champagne-only et relie événement et économie agricole.',
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Reims',
    faq: [
      {
        q: 'Comment rejoindre un lieu de séminaire depuis Reims ?',
        a: 'Départ gare centre ou TGV, puis navette vers un village viticole ou une exploitation de plaine. Les groupes parisiens se calent sur les trains du matin.',
      },
      {
        q: 'Quels types de lieux peut-on trouver autour de Reims ?',
        a: 'Domaines indépendants, fermes céréalières, ruchers, ateliers — des lieux de production de la Marne.',
      },
      {
        q: 'Peut-on organiser une restauration locale pour un séminaire ?',
        a: 'Vins du producteur, pain, fromages, produits de plaine : le repas s’écrit avec l’hôte.',
      },
    ],
    cta: 'Vous préparez un séminaire à Reims ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire original près de Reims | TerraGo',
    metaDescription:
      'Séminaire près de Reims : Champagne agricole, producteurs, team building et RSE. Organisez votre journée hors des sentiers battus.',
  },
  {
    slug: 'clermont-ferrand',
    name: 'Clermont-Ferrand',
    nearLabel: 'près de Clermont-Ferrand',
    h1: 'Séminaire nature autour de Clermont-Ferrand',
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
    rse: 'Du siège clermontois à l’estive, la RSE est pastorale. TerraGo relie entreprise, éleveur, fromage, territoire et économie de village, sans promesse environnementale inventée.',
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Clermont-Ferrand',
    faq: [
      {
        q: 'Comment rejoindre un lieu de séminaire depuis Clermont-Ferrand ?',
        a: 'Rendez-vous gare, puis autocar vers une commune d’élevage. Nous anticipons la météo de plateau.',
      },
      {
        q: 'Quels types de lieux peut-on trouver autour de Clermont-Ferrand ?',
        a: 'Fermes d’élevage, fromageries, exploitations de plateau — des lieux de production auvergnats.',
      },
      {
        q: 'Peut-on organiser une restauration locale pour un séminaire ?',
        a: 'Fromages, viandes d’élevage, lentilles, pain : le repas s’appuie sur l’hôte et ses voisins.',
      },
    ],
    cta: 'Vous préparez un séminaire à Clermont-Ferrand ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire au vert à Clermont-Ferrand | TerraGo',
    metaDescription:
      'Séminaire autour de Clermont-Ferrand : Auvergne, élevage, fromages, producteurs et team building RSE. Demandez un devis.',
  },
  {
    slug: 'annecy',
    name: 'Annecy',
    nearLabel: 'près d’Annecy',
    h1: 'Séminaire RSE près d’Annecy, chez les producteurs savoyards',
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
    rse: 'Entreprise annecienne, producteur, alpage, fromage, commune de montagne : la RSE est pastorale. TerraGo l’inscrit dans le programme, sans cliché lacustre.',
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près d’Annecy',
    faq: [
      {
        q: 'Comment rejoindre un lieu de séminaire depuis Annecy ?',
        a: 'Départ gare, puis navette vers une vallée d’élevage. Nous tenons compte des équipes basées à Genève ou Grenoble pour un point unique si besoin.',
      },
      {
        q: 'Quels types de lieux peut-on trouver autour d’Annecy ?',
        a: 'Fromageries, fermes d’alpage, ruchers — des lieux de production de Haute-Savoie.',
      },
      {
        q: 'Peut-on organiser une restauration locale pour un séminaire ?',
        a: 'Fromages, viandes d’élevage, miel : le repas suit l’hôte et la saison d’alpage.',
      },
    ],
    cta: 'Vous préparez un séminaire à Annecy ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire RSE près d’Annecy | TerraGo',
    metaDescription:
      'Séminaire près d’Annecy : Haute-Savoie, fromages, élevage, producteurs et team building utile. Organisez votre devis.',
  },
  {
    slug: 'la-rochelle',
    name: 'La Rochelle',
    nearLabel: 'près de La Rochelle',
    h1: 'Séminaire à impact à La Rochelle : du littoral aux terres',
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
    rse: 'Du siège rochelais au parc à huîtres ou au champ, la RSE est littorale et agricole. TerraGo relie entreprise, producteur, marais, assiette et économie locale.',
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de La Rochelle',
    faq: [
      {
        q: 'Comment rejoindre un lieu de séminaire depuis La Rochelle ?',
        a: 'Rendez-vous gare, puis transfert vers un site ostréicole, un marais ou une commune viticole. Les marées peuvent influer sur l’horaire d’une visite de parcs.',
      },
      {
        q: 'Quels types de lieux peut-on trouver autour de La Rochelle ?',
        a: 'Cabanes ostréicoles, fermes de marais, domaines, élevages de l’intérieur — des lieux de production charentais.',
      },
      {
        q: 'Peut-on organiser une restauration locale pour un séminaire ?',
        a: 'Huîtres, légumes de marais, vins : le repas s’écrit avec l’hôte et la marée, sans carte hors-sol.',
      },
    ],
    cta: 'Vous préparez un séminaire à La Rochelle ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire entreprise à La Rochelle | TerraGo',
    metaDescription:
      'Séminaire à La Rochelle : ostréiculture, marais, producteurs et team building RSE. Organisez votre journée chez un acteur local.',
  },
  {
    slug: 'biarritz',
    name: 'Biarritz',
    nearLabel: 'près de Biarritz',
    h1: 'Séminaire original près de Biarritz, au Pays Basque',
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
    rse: 'De l’entreprise côtière à la ferme de l’intérieur, la RSE est un déplacement volontaire. TerraGo relie siège, éleveur, piment, fromage et économie villageoise, sans folklore.',
    faqTitle: 'Vos questions sur l’organisation d’un séminaire près de Biarritz',
    faq: [
      {
        q: 'Comment rejoindre un lieu de séminaire depuis Biarritz ?',
        a: 'Rendez-vous gare de Biarritz ou Bayonne, puis navette vers une commune de l’intérieur. Nous regroupons les équipes Côte Basque sur un seul départ.',
      },
      {
        q: 'Quels types de lieux peut-on trouver autour de Biarritz ?',
        a: 'Fermes d’élevage, producteurs de piment, fromageries, ateliers — des lieux de production du Pays Basque.',
      },
      {
        q: 'Peut-on organiser une restauration locale pour un séminaire ?',
        a: 'Fromages de brebis, piment, cidre, viandes d’élevage : le repas suit l’hôte et la saison.',
      },
    ],
    cta: 'Vous préparez un séminaire à Biarritz ? Donnez-nous vos dates, votre nombre de participants et vos envies : TerraGo vous propose des expériences adaptées auprès de producteurs et acteurs locaux.',
    metaTitle: 'Séminaire original près de Biarritz | TerraGo',
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

const DINER_CADRE: Record<VilleSeminaireSlug, string> = {
  paris: 'dîner sous les arbres',
  lyon: 'dîner sous la treille',
  marseille: 'dîner sous les oliviers',
  bordeaux: 'dîner au chai',
  toulouse: 'dîner sous les platanes',
  nantes: 'dîner sous la serre',
  rennes: 'dîner sous les pommiers',
  lille: 'dîner sous la serre',
  strasbourg: 'dîner sous la treille',
  montpellier: 'dîner sous les oliviers',
  nice: 'dîner sous les oliviers',
  grenoble: 'dîner sous les noyers',
  'aix-en-provence': 'dîner sous les oliviers',
  angers: 'dîner sous la serre',
  tours: 'dîner sous les tilleuls',
  valence: 'dîner sous les vergers',
  reims: 'dîner au chai',
  'clermont-ferrand': 'dîner sous les arbres',
  annecy: 'dîner en alpage',
  'la-rochelle': 'dîner au bord de l’eau',
  biarritz: 'dîner sous les chênes',
};

export function villeFaqItems(ville: VilleSeminaire): VilleFaq[] {
  const diner = DINER_CADRE[ville.slug];
  return [
    {
      q: ville.faq[0].q,
      a: `Vous êtes proche de ${ville.name} ou arrivez d’une autre ville ? Nous privilégions le train dans la plus grande partie de nos séminaires. Une fois arrivés à la gare, nous organisons des navettes pour rejoindre les lieux du séminaire, logement typique ou domaine des producteurs.`,
    },
    ville.faq[1],
    {
      q: ville.faq[2].q,
      a: `Tous nos séminaires privilégient à chaque fois des repas locaux & de saison. Lorsque cela est possible nous proposons des repas en grandes tablées généreuses (déjeuner dans les champs, pique-nique en pleine nature, ${diner}) pour favoriser les échanges et l’immersion.`,
    },
  ];
}
