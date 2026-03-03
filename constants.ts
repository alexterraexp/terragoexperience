
import { NavItem, Experience, Host } from './types';

export const NAV_LINKS: NavItem[] = [
  { label: 'Séminaires', path: '/seminaires' },
  { label: 'Entre amis', path: '/particuliers' },
  { label: 'Notre engagement', path: '/notre-engagement' },
];

export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1761839262867-af53d08b0eb5?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  vineyard: "https://images.unsplash.com/photo-1649461513044-bd14c3d44aee?auto=format&fit=crop&q=80&w=2000",
  cognac: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200",
  breeder: "https://images.unsplash.com/photo-1624720114708-0cbd6ee41f4e?auto=format&fit=crop&q=80&w=1200",
  tableVineyard: "https://images.unsplash.com/photo-1592153978217-6913256c7e1e?auto=format&fit=crop&q=80&w=12000",
  seminarPeople: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=1200",
  femaleFarmer: "https://plus.unsplash.com/premium_photo-1676550908367-8f1c20a0a279?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  cookingClass: "https://images.unsplash.com/photo-1683105693841-8c81235be472?auto=format&fit=crop&q=80&w=1200",
  harvest: "https://images.unsplash.com/photo-1758315502352-fb10eb5193d2?auto=format&fit=crop&q=80&w=1200",
  natureLandscape: "https://images.unsplash.com/photo-1574102583554-464eedbdd6a7?auto=format&fit=crop&q=80&w=1200",
  host2: "https://images.unsplash.com/photo-1621002675619-d4989ae4cc8e?auto=format&fit=crop&q=80&w=1200",
  wine: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1200",
  cheese: "https://images.unsplash.com/photo-1485962391905-dc37bb36704b?auto=format&fit=crop&q=80&w=1200",
  truffle: "https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?auto=format&fit=crop&q=80&w=1200",
  peaceful: "https://images.unsplash.com/photo-1675783839515-fb8bc2264a4e?auto=format&fit=crop&q=80&w=1200"
};

const HOSTS: Record<string, Host> = {
  paolo: {
    id: 'paolo',
    name: "Paolo",
    bio: "Héritier d'un domaine familial niché au cœur du plateau de Valensole, je cultive l'olivier et la lavande fine avec passion.",
    avatar: "https://images.unsplash.com/photo-1647794821824-2443e34a84b1?q=80&w=800&auto=format&fit=crop",
    location: "Valensole, Alpes-de-Haute-Provence",
    specialty: "Oléiculteur & Lavandiculteur",
    since: "2010",
    rating: 5,
    reviewCount: 48,
    visitCount: 156
  },
  sylvain: {
    id: 'sylvain',
    name: "Sylvain",
    bio: "Producteur passionné d'agrumes à La Roche-Chalais. Mon domaine offre un terroir unique pour le Citron de Menton IGP.",
    avatar: "https://plus.unsplash.com/premium_photo-1678912126567-9f64488a2b5b?q=80&w=1742&auto=format&fit=crop",
    location: "La Roche-Chalais",
    specialty: "Agrumiculteur",
    since: "1998",
    rating: 4.9,
    reviewCount: 12,
    visitCount: 34
  },
  edouard: {
    id: 'edouard',
    name: "Édouard",
    bio: "Trufficulteur au cœur du Périgord Noir. Avec mes chiens, je parcours mes chênaies pour débusquer le diamant noir.",
    avatar: "https://images.unsplash.com/photo-1763581202086-262952573d26?q=80&w=1742&auto=format&fit=crop",
    location: "Sarlat",
    specialty: "Trufficulteur",
    since: "2005",
    rating: 5.0,
    reviewCount: 89,
    visitCount: 42
  },
  gerard: {
    id: 'gérard',
    name: "Gérard",
    bio: "Maître distillateur à Cognac. Je préserve un savoir-faire séculaire tout en ouvrant mon domaine à des expériences ludiques.",
    avatar: "https://plus.unsplash.com/premium_photo-1664304991089-d351590713f7?q=80&w=860&auto=format&fit=crop",
    location: "Cognac",
    specialty: "Distillateur & Vigneron",
    since: "1992",
    rating: 4.9,
    reviewCount: 342,
    visitCount: 125
  },
  margaux: {
    id: 'margaux',
    name: "Margaux",
    bio: "Productrice de lavande fine et apicultrice dans le Luberon. Je transforme mes fleurs en essences précieuses.",
    avatar: "https://images.unsplash.com/photo-1703180505766-8a8d2588164c?q=80&w=872&auto=format&fit=crop",
    location: "Gordes",
    specialty: "Lavandicultrice",
    since: "2015",
    rating: 4.9,
    reviewCount: 88,
    visitCount: 31
  },
  francois: {
    id: 'francois',
    name: "François",
    bio: "Éleveur de vaches Salers en haute montagne. Je vis au rythme de l'estive et je produis mon fromage au cœur des volcans.",
    avatar: "https://plus.unsplash.com/premium_photo-1664299433804-36b825a11d31?q=80&w=1740&auto=format&fit=crop",
    location: "Mont-Dore",
    specialty: "Éleveur Transhumant",
    since: "1985",
    rating: 5.0,
    reviewCount: 215,
    visitCount: 890
  },
  anthony: {
    id: 'anthony',
    name: "Anthony",
    bio: "Ostréiculteur passionné sur le bassin d'Arcachon. Je perpétue la tradition ostréicole familiale with fierté.",
    avatar: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=1200&auto=format&fit=crop",
    location: "Arcachon",
    specialty: "Ostréiculteur",
    since: "2012",
    rating: 4.8,
    reviewCount: 56,
    visitCount: 92
  }
};

export const ALL_EXPERIENCES: Experience[] = [
  // PAOLO - OLIVES & FLEURS
  {
    id: 'paolo-olive-1',
    title: "L'Or Vert : Visite & Initiation à l'Huile d'Olive",
    price: 20,
    duration: "1h30",
    location: "Valensole",
    region: "Provence",
    category: "olives",
    image: "https://images.unsplash.com/photo-1644940642314-a310d49a4750?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://plus.unsplash.com/premium_photo-1682129345906-f0d55ec5d0ec?q=80&w=1200",
      "https://images.unsplash.com/photo-1572777856134-4e658bbf3b78?q=80&w=1200",
      "https://images.unsplash.com/photo-1636558253781-70496afe5818?q=80&w=1200"
    ],
    coords: { x: 79, y: 86 },
    host: HOSTS.paolo,
    description: "Parcourez nos oliviers centenaires et apprenez à déguster l'huile d'olive comme un grand cru. Une initiation sensorielle pour comprendre la richesse de nos variétés locales.",
    included: ["Visite des vergers", "Dégustation comparative", "Pain de campagne local"],
    maxGuests: 12
  },
  {
    id: 'paolo-olive-2',
    title: "Récolte de l'Olive & Fabrication au Moulin",
    price: 85,
    duration: "8h",
    location: "Valensole",
    region: "Provence",
    category: "olives",
    image: "https://images.unsplash.com/photo-1666955546775-f39d76308be7?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1602928374389-6eeee0e5e4ff?q=80&w=1200",
      "https://plus.unsplash.com/premium_photo-1686269460458-d54b75d68fbf?q=80&w=1200",
      "https://images.unsplash.com/photo-1572777856134-4e658bbf3b78?q=80&w=1200"
    ],
    coords: { x: 79.5, y: 86.5 },
    host: HOSTS.paolo,
    description: "Participez activement à la récolte à l'ancienne et suivez le processus complet de pressage. Repartez with votre propre bouteille fraîchement extraite.",
    included: ["Matériel de récolte", "Déjeuner provençal", "Bouteille de 25cl offerte"],
    maxGuests: 8
  },
  {
    id: 'paolo-lavande-1',
    title: "Atelier Fuseau : L'Art Floral de la Lavande",
    price: 30,
    duration: "2h",
    location: "Valensole",
    region: "Provence",
    category: "fleurs",
    image: "https://i.f1g.fr/media/eidos/704x396_cropupscale/2021/09/03/XVMc9773aa0-067c-11ec-97f1-bfc6c86f51e0.jpg",
    gallery: [
      "https://images.unsplash.com/photo-1626869409736-bca4925e0cae?q=80&w=1200",
      "https://i.f1g.fr/media/eidos/704x396_cropupscale/2021/09/03/XVMc9773aa0-067c-11ec-97f1-bfc6c86f51e0.jpg",
      "https://images.unsplash.com/photo-1631167777409-d17fb7e3a926?q=80&w=1200"
    ],
    coords: { x: 80, y: 87 },
    host: HOSTS.paolo,
    description: "Apprenez le tressage traditionnel des tiges de lavande fraîche pour créer un fuseau odorant. Un savoir-faire ancestral.",
    included: ["Fleurs de lavande du domaine", "Rubans de satin", "Votre fuseau confectionné"],
    maxGuests: 6
  },

  // ANTHONY - MER
  {
    id: 'mer-1',
    title: "Découverte des Parcs à Huîtres en chaland",
    price: 35,
    duration: "3h",
    location: "Arcachon",
    region: "Nouvelle Aquitaine",
    category: "mer",
    image: "https://images.unsplash.com/photo-1712940124092-820ba444b324?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1746450078162-2a69df9adfcb?q=80&w=1200",
      "https://images.unsplash.com/photo-1680404915561-441754f32ef5?q=80&w=1200",
      "https://images.unsplash.com/photo-1657223984729-f55226e59da6?q=80&w=1200"
    ],
    coords: { x: 15, y: 72 },
    host: HOSTS.anthony,
    description: "Embarquez sur mon chaland pour une marée au cœur des parcs. Je vous expliquerai le cycle de l'huître, du naissain à la dégustation.",
    included: ["Sortie en bateau", "Dégustation d'huîtres", "Vin blanc local"],
    maxGuests: 10
  },
  {
    id: 'mer-2',
    title: "Matinée Pêcheur : Sortie aux filets",
    price: 75,
    duration: "5h",
    location: "Arcachon",
    region: "Nouvelle Aquitaine",
    category: "mer",
    image: "https://images.unsplash.com/photo-1544883549-3ceee3fbfb58?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1544883549-3ceee3fbfb58?q=80&w=1200",
      "https://images.unsplash.com/photo-1680404915561-441754f32ef5?q=80&w=1200",
      "https://images.unsplash.com/photo-1657223984729-f55226e59da6?q=80&w=1200"
    ],
    coords: { x: 14, y: 73 },
    host: HOSTS.anthony,
    description: "Vivez le quotidien d'un petit métier. Lever des filets au lever du soleil et tri du poisson sur le pont.",
    included: ["Sortie en mer", "Petit déjeuner à bord", "Part du poisson pêché"],
    maxGuests: 4
  },

  // SYLVAIN - MARAICHAGE
  {
    id: 'citrus-1',
    title: "Mise en bouture : L'art de la multiplication",
    price: 25,
    duration: "2h",
    location: "La Roche-Chalais",
    region: "Nouvelle Aquitaine",
    category: "maraichage",
    image: "https://images.unsplash.com/photo-1766139455139-86ebad281efa?q=80&w=774&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1766139455139-86ebad281efa?q=80&w=1200",
      "https://plus.unsplash.com/premium_photo-1678912125458-b1ffec18d148?q=80&w=1200",
      "https://plus.unsplash.com/premium_photo-1675011575199-816513af8373?q=80&w=1200"
    ],
    coords: { x: 32, y: 68 },
    host: HOSTS.sylvain,
    description: "Apprenez l'art délicat de la multiplication végétale avec Sylvain.",
    included: ["Matériel de bouturage", "Pot de terre cuite", "Bouture d'agrume rare"],
    maxGuests: 6
  },
  {
    id: 'citrus-2',
    title: "Découverte des agrumes exotiques",
    price: 15,
    duration: "2h",
    location: "La Roche-Chalais",
    region: "Nouvelle Aquitaine",
    category: "maraichage",
    image: "https://images.unsplash.com/photo-1622545499345-a1ebde2e04a0?q=80&w=1744&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1622545499345-a1ebde2e04a0?q=80&w=1200",
      "https://images.unsplash.com/photo-1550503026-663f707f168f?q=80&w=1200",
      "https://images.unsplash.com/photo-1528821128474-27f963b062bf?q=80&w=1200"
    ],
    coords: { x: 33, y: 69 },
    host: HOSTS.sylvain,
    description: "Citron caviar, main de bouddha, yuzu... Plongez dans un univers de saveurs oubliées.",
    included: ["Visite guidée", "Dégustation comparative"],
    maxGuests: 12
  },

  // GERARD - VIGNES
  {
    id: 'cognac-1',
    title: "Distillation du Cognac : l'Ange et l'Alambic",
    price: 80,
    duration: "4h",
    location: "Cognac",
    region: "Nouvelle Aquitaine",
    category: "vignes",
    image: "https://images.unsplash.com/photo-1542835497-a6813df96ed9?q=80&w=1744&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1542835497-a6813df96ed9?q=80&w=1200",
      "https://images.unsplash.com/photo-1729179139145-ef411055ebe3?q=80&w=1200",
      "https://images.unsplash.com/photo-1707249907742-4d4984281f3a?q=80&w=1200"
    ],
    coords: { x: 28, y: 58 },
    host: HOSTS.gerard,
    description: "Au pied des alambics en cuivre, vivez le moment sacré de la distillation.",
    included: ["Visite des chais", "Dégustation"],
    maxGuests: 12
  },
  {
    id: 'cognac-2',
    title: "L'évasion des Anges",
    price: 25,
    duration: "1h00",
    location: "Cognac",
    region: "Nouvelle Aquitaine",
    category: "vignes",
    image: "https://plus.unsplash.com/premium_photo-1749470928275-2058a3d1daf7?q=80&w=800",
    gallery: [
      "https://plus.unsplash.com/premium_photo-1749470928275-2058a3d1daf7?q=80&w=1200",
      "https://images.unsplash.com/photo-1729179139145-ef411055ebe3?q=80&w=1200",
      "https://images.unsplash.com/photo-1707249907742-4d4984281f3a?q=80&w=1200"
    ],
    coords: { x: 28.5, y: 58.5 },
    host: HOSTS.gerard,
    description: "Dans les chais de Cognac, une partie de l’alcool s’évapore naturellement chaque année : la part des Anges. Mais aujourd’hui, quelque chose ne va pas. L’évaporation s’accélère, les fûts se vident anormalement, et un lot d’exception est menacé. Votre mission : comprendre l’origine de cette évaporation inhabituelle et rétablir l’équilibre avant qu’il ne soit trop tard.",
    included: ["Scénario immersif", "Dégustation de plusieurs Cognac"],
    maxGuests: 9
  },
  {
    id: 'cognac-3',
    title: "Golf 9 trous à travers les Vignes",
    price: 30,
    duration: "3h",
    location: "Cognac",
    region: "Nouvelle Aquitaine",
    category: "vignes",
    image: "https://images.unsplash.com/photo-1574252757301-440c0cc8951f?q=80&w=1744&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1574252757301-440c0cc8951f?q=80&w=1200",
      "https://images.unsplash.com/photo-1761461617503-50f7a38659ec?q=80&w=1200",
      "https://images.unsplash.com/photo-1707249907742-4d4984281f3a?q=80&w=1200"
    ],
    coords: { x: 29, y: 59 },
    host: HOSTS.gerard,
    description: "Swinguez entre les rangs d'Ugni Blanc sur un parcours unique.",
    included: ["Location matériel", "Accès parcours"],
    maxGuests: 18
  },

  // EDOUARD - TRUFFE
  {
    id: 'truffle-1',
    title: "Le Diamant Noir : Cavage de la Truffe",
    price: 80,
    duration: "3h",
    location: "Sarlat",
    region: "Occitanie",
    category: "truffe",
    image: "https://images.unsplash.com/photo-1601170022284-3a8b1eedf844?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1601170022284-3a8b1eedf844?q=80&w=1200",
      "https://images.unsplash.com/photo-1589208116980-55cf205b1c63?q=80&w=1200",
      "https://plus.unsplash.com/premium_photo-1667545801351-e18e2c4fed04?q=80&w=1200"
    ],
    coords: { x: 42, y: 70 },
    host: HOSTS.edouard,
    description: "Immersion dans les forêts de chênes du Périgord Noir avec mes chiens truffiers.",
    included: ["Démonstration", "Apéritif truffé"],
    maxGuests: 6
  },
  {
    id: 'truffle-2',
    title: "Dîner Privé : Le Menu 100% Truffe",
    price: 120,
    duration: "3h",
    location: "Sarlat",
    region: "Occitanie",
    category: "truffe",
    image: "https://images.unsplash.com/photo-1600028035145-19e30d5e7595??q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1606419093310-d5ef610cc381?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1600028035145-19e30d5e7595?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1608835291093-394b0c943a75?q=80&w=1200"
    ],
    coords: { x: 42.5, y: 70.5 },
    host: HOSTS.edouard,
    description: "Un festin gastronomique où chaque plat célèbre la Tuber Melanosporum fraîchement cavée.",
    included: ["Menu 5 services", "Accord mets & vins", "Rencontre avec le chef"],
    maxGuests: 4
  },

  // MARGAUX - FLEURS
  {
    id: 'lavande-2',
    title: "Atelier Distillation & Création de Parfum",
    price: 45,
    duration: "3h",
    location: "Luberon",
    region: "Provence",
    category: "fleurs",
    image: "https://images.unsplash.com/photo-1709662369900-130507781728?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1709662369900-130507781728?q=80&w=1200",
      "https://images.unsplash.com/photo-1445510491599-c391e8046a68?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1763789703625-6a08598d0a13?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    coords: { x: 78.5, y: 88.5 },
    host: HOSTS.margaux,
    description: "Apprenez à distiller la lavande fine et repartez avec votre flacon d'huile essentielle bio.",
    included: ["Matériel distillation", "Flacon 10ml personnel"],
    maxGuests: 8
  },

  // FRANCOIS - ÉLEVAGE & FROMAGES
  {
    id: 'auvergne-2',
    title: "La Grande Transhumance des Sommets",
    price: 35,
    duration: "6h",
    location: "Auvergne",
    region: "Rhône-Alpes",
    category: "élevage",
    image: "https://images.unsplash.com/photo-1559492302-0669e721a0f9?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1559492302-0669e721a0f9?q=80&w=1200",
      "https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=1200",
      "https://images.unsplash.com/photo-1533038595180-f2191922880c?q=80&w=1200"
    ],
    coords: { x: 48.5, y: 52.5 },
    host: HOSTS.francois,
    description: "Accompagnez-moi pour monter le troupeau vers les hauts pâturages.",
    included: ["Bâton de marche", "Casse-croûte montagnard"],
    maxGuests: 25
  },
  {
    id: 'auvergne-3',
    title: "Fabrication du Saint-Nectaire Fermier",
    price: 30,
    duration: "3h",
    location: "Auvergne",
    region: "Rhône-Alpes",
    category: "fromages",
    image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1452195100486-9cc805987862?q=80&w=1200",
      "https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?q=80&w=1200",
      "https://images.unsplash.com/photo-1624806994096-7f2015e2e9a1?q=80&w=1200"
    ],
    coords: { x: 49, y: 53 },
    host: HOSTS.francois,
    description: "Suivez le lait de la traite à la cave d'affinage.",
    included: ["Visite de la cave", "Atelier moulage", "Dégustation"],
    maxGuests: 10
  },
  {
    id: 'piment-1',
    title: "Récolte du Piment d'Espelette",
    price: 25,
    duration: "2h",
    location: "Espelette",
    region: "Nouvelle Aquitaine",
    category: "piment",
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?q=80&w=1200",
      "https://images.unsplash.com/photo-1528243097678-739049b92e75?q=80&w=1200",
      "https://images.unsplash.com/photo-1590483736622-39da8caf3581?q=80&w=1200"
    ],
    coords: { x: 12, y: 88 },
    host: HOSTS.sylvain,
    description: "Découvrez la culture du piment AOP, de la cueillette au séchage traditionnel sur les façades des maisons.",
    included: ["Visite des champs", "Atelier de tressage", "Sachet de poudre de piment"],
    maxGuests: 15
  }
];
