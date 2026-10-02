import { OpeningHoursDay, RecyclerieDepartment, FAQItem, ItemAcceptanceStatus } from '../types';

export const GRENIER_INFO = {
  name: 'Le Grenier de Mézos',
  legalName: 'Association Le Grenier',
  tagline: 'Recyclerie & Ressourcerie Solidaire au cœur des Landes',
  description: 'Acteur incontournable de l’économie circulaire et solidaire dans le Pays de Born, Le Grenier de Mézos collecte, trie, valorise et redonne vie à vos objets du quotidien.',
  
  // Coordonnées exactes vérifiées
  address: {
    street: '65 rue des artisans',
    postalCode: '40170',
    city: 'Mézos',
    department: 'Landes (40)',
    region: 'Nouvelle-Aquitaine',
    full: '65 rue des artisans, 40170 Mézos',
    accessDetails: 'Facilement accessible avec parking sur place.'
  },
  
  contact: {
    phone: '05 58 42 65 00',
    phoneRaw: '+33558426500',
    emailContact: 'contact@grenier-mezos.fr',
    emailEnlevements: 'enlevements.grenier@gmail.com',
  },
  
  maps: {
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=65+rue+des+artisans+40170+M%C3%A9zos',
    // Latitude et longitude de la rue des artisans à Mézos
    lat: 44.0765,
    lng: -1.1685,
  }
};

export const OPENING_HOURS: OpeningHoursDay[] = [
  {
    day: 'Lundi',
    dayIndex: 1,
    morning: null,
    afternoon: null,
    isOpen: false,
    notes: 'Fermé au public (journée dédiée au tri, réparations et ateliers)'
  },
  {
    day: 'Mardi',
    dayIndex: 2,
    morning: '09h00 - 12h00',
    afternoon: '14h30 - 18h30',
    isOpen: true,
    notes: 'Dépôts & Boutique ouverts'
  },
  {
    day: 'Mercredi',
    dayIndex: 3,
    morning: '09h00 - 12h00',
    afternoon: '14h30 - 18h30',
    isOpen: true,
    notes: 'Dépôts & Boutique ouverts'
  },
  {
    day: 'Jeudi',
    dayIndex: 4,
    morning: '09h00 - 12h00',
    afternoon: '14h30 - 18h30',
    isOpen: true,
    notes: 'Dépôts & Boutique ouverts'
  },
  {
    day: 'Vendredi',
    dayIndex: 5,
    morning: '09h00 - 12h00',
    afternoon: '14h30 - 18h30',
    isOpen: true,
    notes: 'Dépôts & Boutique ouverts'
  },
  {
    day: 'Samedi',
    dayIndex: 6,
    morning: '10h00 - 12h00',
    afternoon: '14h30 - 18h30',
    isOpen: true,
    notes: 'Grande journée chine et dépôts'
  },
  {
    day: 'Dimanche',
    dayIndex: 0,
    morning: null,
    afternoon: '14h30 - 18h30',
    isOpen: true,
    notes: 'Ouvert tout l’après-midi pour chiner'
  }
];

export const DEPARTMENTS: RecyclerieDepartment[] = [
  {
    id: 'mobilier',
    name: 'Meubles & Déco Vintage',
    description: 'Armoires en pin des Landes, tables massives, chaises bistrot, fauteuils, commodes, miroirs anciens et objets de décoration pleins de charme.',
    icon: 'Armchair',
    examples: ['Tables & chaises', 'Buffets & commodes', 'Luminaires rétro', 'Miroirs & cadres'],
    tips: 'Arrivages quotidiens de pièces vintage et contemporaines.'
  },
  {
    id: 'vaisselle',
    name: 'Vaisselle & Arts de la Table',
    description: 'Services en faïence ou porcelaine, verres d’antan, casseroles en fonte, plats régionaux et ustensiles de cuisine traditionnels.',
    icon: 'Utensils',
    examples: ['Assiettes & bols vintage', 'Verres & carafes', 'Marmites & cocottes', 'Appareils de cuisson'],
    tips: 'Idéal pour équiper son premier logement ou sa maison de vacances à petit prix.'
  },
  {
    id: 'friperie',
    name: 'Friperie & Linge de Maison',
    description: 'Vêtements femmes, hommes et enfants soigneusement sélectionnés, manteaux, chaussures, draps anciens en lin ou coton brodé.',
    icon: 'Shirt',
    examples: ['Vêtements toutes saisons', 'Vestes & manteaux', 'Chaussures & maroquinerie', 'Linge ancien brodé'],
    tips: 'Une mode éthique, unique et à prix dérisoire.'
  },
  {
    id: 'culture',
    name: 'Livres, BD & Vinyles',
    description: 'Des milliers d’ouvrages : romans, polars, livres d’histoire locale des Landes, bandes dessinées, 33 tours et CD musicaux.',
    icon: 'BookOpen',
    examples: ['Romans & poches', 'Livres jeunesse & BD', 'Disques vinyles 33T/45T', 'DVD & jeux de société'],
    tips: 'Un paradis pour les lecteurs et collectionneurs curieux.'
  },
  {
    id: 'bricolage',
    name: 'Bricolage, Jardin & Quincaillerie',
    description: 'Outils à main, pots de jardin en terre cuite, matériel pour le bricolage, quincaillerie ancienne et pièces détachées utiles.',
    icon: 'Wrench',
    examples: ['Outils manuels & caisses', 'Pots & jardinières', 'Visserie & quincaillerie', 'Vélos & pièces de rechange'],
    tips: 'Parfait pour vos travaux de rénovation sans vous ruiner.'
  },
  {
    id: 'jouets',
    name: 'Enfance, Jeux & Puériculture',
    description: 'Puzzles complets, jeux en bois, peluches lavées, matériel de puériculture vérifié pour accompagner petits et grands.',
    icon: 'Baby',
    examples: ['Jeux éducatifs', 'Poupées & figurines', 'Poussettes & chaises hautes', 'Vélos enfants & trottinettes'],
    tips: 'Tout le nécessaire pour faire plaisir tout en évitant la surconsommation.'
  }
];

export const ACCEPTANCE_GUIDE: ItemAcceptanceStatus[] = [
  {
    category: 'Mobilier & Literie',
    accepted: [
      'Tables, chaises, tabourets, bancs',
      'Commodes, buffets, étagères, chevets',
      'Fauteuils et canapés en bon état d’assise',
      'Sommiers et matelas propres et non tachés'
    ],
    refused: [
      'Meubles cassés non réparables ou infestés de vrillettes',
      'Matelas souillés, déchirés ou moisis',
      'Mobilier aggloméré gonflé par l’humidité'
    ],
    advice: 'Pensez à apporter toutes les vis ou étagères amovibles lors de votre dépôt.'
  },
  {
    category: 'Électroménager & Électrique',
    accepted: [
      'Petit électroménager fonctionnel (cafetières, grille-pain, fers, aspirateurs)',
      'Gros électroménager en état de marche ou révisable (frigos, lave-linge, cuisinières)',
      'Luminaires et lampes de chevet',
      'Câblerie et petit outillage électrique'
    ],
    refused: [
      'Appareils incomplets ou dangereux (câbles dénudés)',
      'Vieux téléviseurs cathodiques très endommagés'
    ],
    advice: 'Nos équipes effectuent des tests de sécurité électrique avant toute remise en vente.'
  },
  {
    category: 'Textile & Linge',
    accepted: [
      'Vêtements propres et secs (hommes, femmes, enfants)',
      'Linge de maison (draps, rideaux, nappes, serviettes)',
      'Chaussures attachées par paire',
      'Sacs à main, ceintures, chapeaux'
    ],
    refused: [
      'Vêtements mouillés, souillés de peinture ou moisis',
      'Chaussures dépareillées ou trouées'
    ],
    advice: 'Déposez les textiles dans des sacs fermés de taille moyenne pour faciliter la manutention.'
  },
  {
    category: 'Vaisselle & Objets du quotidien',
    accepted: [
      'Assiettes, verres, couverts et casseroles',
      'Bibelots, tableaux, vannerie et vases',
      'Livres en bon état, vinyles, CD, jeux complets',
      'Outils de jardin et de bricolage'
    ],
    refused: [
      'Vaisselle ébréchée coupante',
      'Puzzles ou jeux avec pièces majeures manquantes',
      'Produits chimiques, peintures, solvants, engrais (déchèterie obligatoire)',
      'Pneus, amiante, gravats et déchets verts'
    ],
    advice: 'Protégez la vaisselle fragile dans des cartons ou caissettes lors du transport.'
  }
];

export const FAQS: FAQItem[] = [
  {
    category: 'don',
    question: 'Comment puis-je faire un don au Grenier de Mézos ?',
    answer: 'Vous pouvez vous présenter directement au bric à brac (65 rue des artisans à Mézos) pendant nos heures d’ouverture de dépôt (du mardi au samedi + le dimanche après-midi). Notre équipe vous accueillera avec le sourire et vous aidera au déchargement de votre véhicule.'
  },
  {
    category: 'enlevement',
    question: 'Proposez-vous un service d’enlèvement à domicile pour les gros volumes ?',
    answer: 'Oui ! Si vous avez des meubles lourds, un volume important ou si vous ne disposez pas de moyen de transport dans le secteur de Mézos et communes avoisinantes, contactez-nous par téléphone au 05 58 42 65 00 ou par email à enlevements.grenier@gmail.com pour convenir d’un rendez-vous.'
  },
  {
    category: 'achat',
    question: 'Les prix sont-ils fixés à l’avance et quels sont les moyens de paiement acceptés ?',
    answer: 'Tous les objets en vente portent une étiquette claire à prix solidaire. Nous acceptons les règlements par carte bancaire ainsi qu’en espèces. Chaque achat contribue directement à la pérennité de l’association et de ses emplois solidaires.'
  },
  {
    category: 'general',
    question: 'Quelle est la mission solidaire et écologique du Grenier de Mézos ?',
    answer: 'Le Grenier de Mézos est une association à but non lucratif. Notre mission est double : préserver l’environnement en évitant l’enfouissement de tonnes d’objets réutilisables chaque année dans les Landes, et créer une dynamique solidaire et humaine de proximité.'
  },
  {
    category: 'don',
    question: 'Faut-il trier ses dons avant de venir ?',
    answer: 'Oui, dans la mesure du possible ! Présenter vos objets propres, complets et regroupés par catégorie (vaisselle protégée en carton, textiles en sacs fermés) fait gagner un temps précieux à nos équipes de valoristes.'
  }
];
