export interface Governorate {
  id: string;
  name: string;
  arabicName: string;
  region: 'North' | 'Center' | 'South' | 'Coast';
  population: string;
  workforce: string;
  industries: string[];
  resources: string[];
  transportation: string[];
  airports: number;
  ports: number;
  universities: number;
  industrialZones: number;
  investmentScore: number;
  gdpContribution: string;
  literacyRate: string;
  description: string;
  svgPath?: string; // simplified path for interactive map representation
  centerCoords: { x: number; y: number }; // coordinate on our standard SVG canvas
}

export interface TunisiaStats {
  population: string;
  gdp: string;
  gdpGrowth: string;
  inflation: string;
  currency: string;
  mainIndustries: string[];
  exports: string;
  imports: string;
  naturalResources: string[];
  workforce: string;
  literacyRate: string;
  foreignInvestmentFlow: string;
}

export const tunisiaStats: TunisiaStats = {
  population: "12.5 Million (2026 est.)",
  gdp: "$48.5 Billion USD",
  gdpGrowth: "2.4% (2025/2026)",
  inflation: "7.1%",
  currency: "Tunisian Dinar (TND)",
  mainIndustries: ["Agriculture & Agro-food", "Information & Communication Technology (ICT)", "Automotive Parts & Aerospace Components", "Renewable Energy (Solar/Wind)", "Textiles & Apparel", "Phosphate Mining & Chemicals", "Tourism & Creative Industries"],
  exports: "$16.2 Billion USD (Mainly olive oil, electric machinery, apparel, phosphates)",
  imports: "$19.8 Billion USD (Energy, raw materials, food products)",
  naturalResources: ["Phosphates", "Oil & Gas", "Arable Land (Olives, Dates, Citrus)", "Solar and Wind Energy potential", "Zinc, Lead, Gypsum"],
  workforce: "4.2 Million (highly skilled engineering & tech talent)",
  literacyRate: "81.8% (94%+ for youth 15-24)",
  foreignInvestmentFlow: "$1.2 Billion USD annually"
};

export const governorates: Governorate[] = [
  {
    id: "tunis",
    name: "Tunis",
    arabicName: "تونس",
    region: "North",
    population: "1,070,000",
    workforce: "450,000",
    industries: ["Financial Services", "IT & Softwares", "Administrative Services", "Retail & Trade", "Tourism & Culture"],
    resources: ["Skilled Tech Talent", "Commercial Infrastructure", "Real Estate"],
    transportation: ["Metro network", "Highway connections", "Train Station"],
    airports: 1, // Tunis-Carthage Airport is adjacent
    ports: 1, // Access to La Goulette & Rades Ports
    universities: 12,
    industrialZones: 4,
    investmentScore: 96,
    gdpContribution: "15%",
    literacyRate: "91%",
    description: "The capital city and political, financial, and cultural heart of Tunisia. It offers premium office spaces, exceptional access to government agencies, and the highest concentration of educated bilingual talent in North Africa.",
    centerCoords: { x: 195, y: 70 }
  },
  {
    id: "ariana",
    name: "Ariana",
    arabicName: "أريانة",
    region: "North",
    population: "680,000",
    workforce: "280,000",
    industries: ["IT & Cybersecurity", "Software Development", "Telecommunications", "Agro-industry", "Biotech"],
    resources: ["El Ghazala Technopark", "Bilingual Tech Graduates", "R&D Centers"],
    transportation: ["Metro network", "Highway to the north & west"],
    airports: 1, // Close proximity to Tunis-Carthage Airport
    ports: 0,
    universities: 8,
    industrialZones: 3,
    investmentScore: 94,
    gdpContribution: "9%",
    literacyRate: "90%",
    description: "Home to the famous 'El Ghazala Technopark', Ariana is the technological hub of Tunisia. Leading multinational tech companies have established their R&D and support centers here.",
    centerCoords: { x: 190, y: 55 }
  },
  {
    id: "ben_arous",
    name: "Ben Arous",
    arabicName: "بن عروس",
    region: "North",
    population: "720,000",
    workforce: "310,000",
    industries: ["Automotive Components", "Mechanical & Electrical", "Food Packaging", "Chemical Industry", "Logistics"],
    resources: ["Rades Port access", "Megrine Industrial Area", "El Mghira Aviation Park"],
    transportation: ["Rades Commercial Seaport", "Major Highway Node", "Freight Rail"],
    airports: 0,
    ports: 1, // Port of Rades - handles 90% of Tunisia's container traffic
    universities: 4,
    industrialZones: 8,
    investmentScore: 92,
    gdpContribution: "11%",
    literacyRate: "87%",
    description: "The industrial backbone of the Tunis greater area, featuring the aerospace hub El Mghira and the Port of Rades, providing unmatched shipping connections to southern Europe.",
    centerCoords: { x: 205, y: 82 }
  },
  {
    id: "manouba",
    name: "Manouba",
    arabicName: "منوبة",
    region: "North",
    population: "420,000",
    workforce: "160,000",
    industries: ["Textiles & Garments", "Artisanal Crafts", "Agro-food Processing", "E-services"],
    resources: ["Agricultural Land", "University of Manouba (Multimedia & IT)"],
    transportation: ["Light rail metro", "Western Highway link"],
    airports: 0,
    ports: 0,
    universities: 5,
    industrialZones: 2,
    investmentScore: 82,
    gdpContribution: "4%",
    literacyRate: "85%",
    description: "Offering a strategic blend of historic university campuses, agricultural lands, and emerging digital service centers. Highly cost-effective compared to central Tunis.",
    centerCoords: { x: 180, y: 73 }
  },
  {
    id: "nabeul",
    name: "Nabeul (Cap Bon)",
    arabicName: "نابل",
    region: "Coast",
    population: "870,000",
    workforce: "360,000",
    industries: ["Agriculture & Citrus", "Coastal Tourism", "Ceramics & Handicrafts", "Plastic Manufacturing", "Software Outsourcing"],
    resources: ["Arable Coastal Soil", "White Sandy Beaches", "Gas pipelines"],
    transportation: ["Coastal Highway", "Regional Rail link"],
    airports: 0,
    ports: 1, // Kelibia fishing & leisure port
    universities: 6,
    industrialZones: 6,
    investmentScore: 90,
    gdpContribution: "8%",
    literacyRate: "86%",
    description: "Known as the Garden of Tunisia, Nabeul boasts a strong agricultural sector (supplying citrus, wine, tomatoes) alongside world-class beach tourism and dynamic plastics manufacturing.",
    centerCoords: { x: 235, y: 85 }
  },
  {
    id: "zaghouan",
    name: "Zaghouan",
    arabicName: "زغوان",
    region: "North",
    population: "190,000",
    workforce: "75,000",
    industries: ["Automotive Cables", "Pharmaceuticals", "Mineral Water Bottling", "Cement Production", "Eco-tourism"],
    resources: ["High-quality Natural Springs", "Limestone & Gypsum", "Sparsely populated industrial plots"],
    transportation: ["Direct national highway routes"],
    airports: 0,
    ports: 0,
    universities: 2,
    industrialZones: 5,
    investmentScore: 83,
    gdpContribution: "3%",
    literacyRate: "80%",
    description: "Zaghouan is highly popular for heavy manufacturing and pharmaceutical firms due to its clean water sources, cheap industrial land, and proximity (1 hour drive) to Tunis.",
    centerCoords: { x: 190, y: 105 }
  },
  {
    id: "bizerte",
    name: "Bizerte",
    arabicName: "بنزرت",
    region: "North",
    population: "590,000",
    workforce: "240,000",
    industries: ["Metallurgical Industry", "Shipbuilding & Maritime Repair", "Oil Refining", "Aviation Components", "Aquaculture"],
    resources: ["Deepwater coastline", "Bizerte Free Zone", "Fishing stocks"],
    transportation: ["Bizerte Commercial Port", "North Highway connection", "Rail"],
    airports: 0,
    ports: 1, // Deepwater port of Bizerte
    universities: 4,
    industrialZones: 5,
    investmentScore: 88,
    gdpContribution: "6%",
    literacyRate: "83%",
    description: "The northernmost point in Africa. Bizerte is a critical maritime gate with its deepwater port and Free Zone (Parc d'Activités Économiques de Bizerte), attracting heavy manufacturing and yacht repair startups.",
    centerCoords: { x: 180, y: 35 }
  },
  {
    id: "beja",
    name: "Béja",
    arabicName: "باجة",
    region: "North",
    population: "310,000",
    workforce: "115,000",
    industries: ["Wheat & Cereal Farming", "Sugar Refining", "Dairy Production", "Automotive Wiring (Kromberg & Schubert)"],
    resources: ["Fertile Medjerda Valley", "Water Reservoirs (Dams)", "Dairy Cattle"],
    transportation: ["Beja Rail Link", "Highway A3 (Tunis-Beja)"],
    airports: 0,
    ports: 0,
    universities: 2,
    industrialZones: 3,
    investmentScore: 80,
    gdpContribution: "4%",
    literacyRate: "79%",
    description: "The agricultural breadbasket of Tunisia. Béja specializes in wheat crops, sugar beets, and cheese manufacturing, while hosting a major automotive wire harness plant employing over 4,000 people.",
    centerCoords: { x: 145, y: 72 }
  },
  {
    id: "jendouba",
    name: "Jendouba",
    arabicName: "جندوبة",
    region: "North",
    population: "405,000",
    workforce: "140,000",
    industries: ["Agro-food Processing", "Cork & Wood Processing", "Eco-tourism (Tabarka)", "Aquaculture"],
    resources: ["Oak Forests (Cork)", "Tabarka Coastline", "Mineral springs"],
    transportation: ["Tabarka International Airport", "Tabarka Fishing Port", "Highway A3 link"],
    airports: 1, // Tabarka-Ain Draham International Airport
    ports: 1, // Leisure and fishing port of Tabarka
    universities: 3,
    industrialZones: 2,
    investmentScore: 78,
    gdpContribution: "3.5%",
    literacyRate: "77%",
    description: "Jendouba offers exceptional potential in eco-tourism, medical wellness centers, and cork processing, framed by the beautiful green mountains of Ain Draham and the beaches of Tabarka.",
    centerCoords: { x: 115, y: 75 }
  },
  {
    id: "kef",
    name: "Le Kef",
    arabicName: "الكاف",
    region: "North",
    population: "250,000",
    workforce: "85,000",
    industries: ["Mining (Phosphate, Iron)", "Agriculture (Olive Oil, Sheep)", "Cultural Tourism"],
    resources: ["Mineral deposits", "Olive plantations", "Archaeological Sites"],
    transportation: ["National highway routes to Algeria"],
    airports: 0,
    ports: 0,
    universities: 2,
    industrialZones: 2,
    investmentScore: 72,
    gdpContribution: "2%",
    literacyRate: "78%",
    description: "Located on the northwestern border. Kef is famous for its majestic Byzantine fortress and cooler climate, with rich potential in agricultural transformation, mining, and border-related commerce.",
    centerCoords: { x: 110, y: 115 }
  },
  {
    id: "siliana",
    name: "Siliana",
    arabicName: "سليانة",
    region: "Center",
    population: "230,000",
    workforce: "80,000",
    industries: ["Fruit Orchards (Apples, Prunes)", "Poultry & Livestock Farming", "Laminated Panels", "Mining (Zinc, Lead)"],
    resources: ["Water springs", "Fertile plains", "Mining ore"],
    transportation: ["Central railway, national roads"],
    airports: 0,
    ports: 0,
    universities: 1,
    industrialZones: 2,
    investmentScore: 70,
    gdpContribution: "2%",
    literacyRate: "75%",
    description: "An agricultural center of Tunisia, Siliana features substantial olive, grain, and fruit fields, offering great incentives for organic food processing and packaging ventures.",
    centerCoords: { x: 150, y: 115 }
  },
  {
    id: "sousse",
    name: "Sousse",
    arabicName: "سوسة",
    region: "Coast",
    population: "750,000",
    workforce: "320,000",
    industries: ["Luxury Beach Resorts", "Textile & Apparel Design", "Electronic Components", "Olive Oil Milling", "Mechatronics"],
    resources: ["Sousse Marina & Port", "Novation City (Tech Hub)", "Olive Groves"],
    transportation: ["Sousse Commercial Port", "Sousse-Tunis Train", "Highway A1"],
    airports: 0, // Very close to Monastir Habib Bourguiba and Enfidha Airports
    ports: 1, // Active commercial port of Sousse
    universities: 10,
    industrialZones: 7,
    investmentScore: 95,
    gdpContribution: "10%",
    literacyRate: "89%",
    description: "The 'Pearl of the Sahel', Sousse is Tunisia's second-largest economic powerhouse. It combines a thriving tourism industry with advanced technology hubs like 'Novation City' focusing on mechatronics and IoT.",
    centerCoords: { x: 215, y: 125 }
  },
  {
    id: "monastir",
    name: "Monastir",
    arabicName: "المنستير",
    region: "Coast",
    population: "610,000",
    workforce: "250,000",
    industries: ["Textiles & Fashion", "Medical & Dental Devices", "Aviation Services", "Plastics", "Tourism"],
    resources: ["Habib Bourguiba Airport", "Monastir Biotech Technopark", "Salt pans"],
    transportation: ["Monastir International Airport", "Metrolink Sahel rail", "Marina port"],
    airports: 1, // Monastir Habib Bourguiba International Airport
    ports: 1, // Coastal marina & fishing port
    universities: 8,
    industrialZones: 5,
    investmentScore: 92,
    gdpContribution: "7%",
    literacyRate: "88%",
    description: "A prominent industrial center specializing in high-value textile manufacturing and biotech research. Monastir has a very high literacy rate and hosts some of the country's best medicine and engineering schools.",
    centerCoords: { x: 232, y: 132 }
  },
  {
    id: "mahdia",
    name: "Mahdia",
    arabicName: "المهدية",
    region: "Coast",
    population: "450,000",
    workforce: "175,000",
    industries: ["Industrial Fishing", "Olive Oil exports", "Seafood Canning", "Textile Weaving", "Boutique Tourism"],
    resources: ["Seafood reserves", "Pristine sandy beaches", "Ancient Silk Weaving tradition"],
    transportation: ["Sahel metro rail, national highway"],
    airports: 0,
    ports: 1, // Major fishing port of Mahdia
    universities: 3,
    industrialZones: 3,
    investmentScore: 85,
    gdpContribution: "4.5%",
    literacyRate: "82%",
    description: "An ancient capital with beautiful coastlines. Mahdia is the national leader in fisheries and canned seafood exports, and offers promising opportunities in boutique tourism and textile crafts.",
    centerCoords: { x: 235, y: 148 }
  },
  {
    id: "sfax",
    name: "Sfax",
    arabicName: "صفاقس",
    region: "Coast",
    population: "1,030,000",
    workforce: "420,000",
    industries: ["Olive Oil Production & Refining", "Chemical Phosphates", "Oil & Gas Engineering", "Mechanical workshops", "Import/Export Hub"],
    resources: ["Millions of Olive Trees", "Phosphate processing complexes", "Natural offshore gas fields"],
    transportation: ["Port of Sfax", "Sfax Thyna International Airport", "Main Railway Node", "A1 Highway"],
    airports: 1, // Sfax-Thyna International Airport
    ports: 1, // Port of Sfax (major industrial export port)
    universities: 12,
    industrialZones: 10,
    investmentScore: 94,
    gdpContribution: "13%",
    literacyRate: "88%",
    description: "The primary industrial and commercial trade hub of southern Tunisia. Sfax produces over 40% of the nation's olive oil exports and is famous for its highly industrious business culture and top-tier tech graduates.",
    centerCoords: { x: 205, y: 185 }
  },
  {
    id: "kairouan",
    name: "Kairouan",
    arabicName: "القيروان",
    region: "Center",
    population: "600,000",
    workforce: "210,000",
    industries: ["Handicrafts (Carpets)", "Olive Cultivation", "Tobacco", "Plastics & Automobile Cables (Yazaki)"],
    resources: ["High-quality wool", "Extensive land tracts", "Arid crops"],
    transportation: ["Major inland transport crossroad"],
    airports: 0,
    ports: 0,
    universities: 4,
    industrialZones: 4,
    investmentScore: 80,
    gdpContribution: "5%",
    literacyRate: "76%",
    description: "A UNESCO World Heritage city and the spiritual capital of Tunisia. It offers vast flat land, central geostrategic routing, and a massive agricultural footprint, now backed by automotive cabling complexes.",
    centerCoords: { x: 180, y: 140 }
  },
  {
    id: "kasserine",
    name: "Kasserine",
    arabicName: "القصرين",
    region: "Center",
    population: "460,000",
    workforce: "150,000",
    industries: ["Esparto Grass Paper Pulp", "Prickly Pear Oil", "Plaster/Gypsum extraction", "Rangeland pastoralism"],
    resources: ["Esparto Grass Plains", "Gypsum quarries", "Chambi National Park"],
    transportation: ["National routes connecting to central Algeria"],
    airports: 0,
    ports: 0,
    universities: 1,
    industrialZones: 1,
    investmentScore: 68,
    gdpContribution: "2.5%",
    literacyRate: "73%",
    description: "Vast landscapes containing organic prickly pear farms and heavy mineral deposits. Highly attractive for raw-material processing factories (gypsum, paper pulp) with maximal state tax incentives.",
    centerCoords: { x: 130, y: 160 }
  },
  {
    id: "sidi_bouzid",
    name: "Sidi Bouzid",
    arabicName: "سيدي بوزيد",
    region: "Center",
    population: "450,000",
    workforce: "145,000",
    industries: ["Dairy Production (Delice)", "Organic Vegetables", "Poultry Farming", "Solar Farm development"],
    resources: ["Underground aquifers", "High solar irradiance", "Arable flatlands"],
    transportation: ["Inland highway networks"],
    airports: 0,
    ports: 0,
    universities: 1,
    industrialZones: 2,
    investmentScore: 75,
    gdpContribution: "3.5%",
    literacyRate: "74%",
    description: "The dairy and organic vegetable capital of the nation. Produces a huge share of Tunisia's milk, tomatoes, and almonds, creating an unmatched field for industrial food brands.",
    centerCoords: { x: 158, y: 170 }
  },
  {
    id: "gabes",
    name: "Gabès",
    arabicName: "قابس",
    region: "South",
    population: "410,000",
    workforce: "155,000",
    industries: ["Chemical Phosphates", "Marine Fishing", "Oasis Agriculture (Pomegranates, Henna)", "Geothermal Greenhouses"],
    resources: ["Coastal oasis", "Industrial chemical complexes", "Warm geothermal springs"],
    transportation: ["Port of Gabes (Chemical-focused)", "Gabes Rail terminus"],
    airports: 0, // Djerba & Sfax airports are close
    ports: 1, // Major chemical port of Gabes
    universities: 4,
    industrialZones: 4,
    investmentScore: 82,
    gdpContribution: "5%",
    literacyRate: "81%",
    description: "The only coastal oasis in the Mediterranean. Gabès is a critical base for Tunisia's phosphate processing chemical industry, alongside promising growth in thermal greenhouse agriculture and sea fisheries.",
    centerCoords: { x: 190, y: 228 }
  },
  {
    id: "medenine",
    name: "Medenine",
    arabicName: "مدنين",
    region: "South",
    population: "520,000",
    workforce: "190,000",
    industries: ["Premium Beach Tourism (Djerba)", "Salt Extraction (Zarzis)", "Olive Oil production", "Boutique Craftsmanship"],
    resources: ["Djerba island", "Zarzis salt pans", "Free trade zone Zarzis"],
    transportation: ["Djerba Zarzis Airport", "Zarzis Commercial Port"],
    airports: 1, // Djerba-Zarzis International Airport
    ports: 1, // Zarzis Industrial Port and Free Trade Zone
    universities: 3,
    industrialZones: 3,
    investmentScore: 89,
    gdpContribution: "6%",
    literacyRate: "83%",
    description: "Boasting the world-famous tourist resort island of Djerba and the highly strategic Zarzis Economic Free Zone. Zarzis offers direct maritime logistics and tax-exempt bases for international investors.",
    centerCoords: { x: 215, y: 250 }
  },
  {
    id: "tataouine",
    name: "Tataouine",
    arabicName: "تطاوين",
    region: "South",
    population: "155,000",
    workforce: "55,000",
    industries: ["Desert Solar Projects", "Oil & Gas Exploration", "Gypsum plaster processing", "Berber Cave Hotels (Eco-tourism)"],
    resources: ["Sahara Desert Solar potential", "Vast Oil reserves", "Substantial Gypsum"],
    transportation: ["Desert trans-border routes"],
    airports: 0,
    ports: 0,
    universities: 1,
    industrialZones: 1,
    investmentScore: 76,
    gdpContribution: "3%",
    literacyRate: "82%",
    description: "The largest governorate in landmass. Tataouine is the desert gateway, containing major petroleum wells and excellent solar radiation factors, making it the perfect frontier for large-scale green hydrogen and photovoltaic fields.",
    centerCoords: { x: 200, y: 310 }
  },
  {
    id: "gafsa",
    name: "Gafsa",
    arabicName: "قفصة",
    region: "South",
    population: "360,000",
    workforce: "125,000",
    industries: ["Phosphate Extraction (CPG)", "Organic Pistachio orchards", "Textiles (Cabling)", "Drip Irrigation Farming"],
    resources: ["Phosphates", "Pistachios", "Desert aquifers"],
    transportation: ["Gafsa Airport", "Mining Rail network"],
    airports: 1, // Gafsa-Ksar International Airport
    ports: 0,
    universities: 3,
    industrialZones: 2,
    investmentScore: 75,
    gdpContribution: "4.5%",
    literacyRate: "78%",
    description: "The world-famous mining district of Tunisia, Gafsa holds the national phosphate reserves. It also has a thriving agricultural industry focusing on pistachios and table grapes.",
    centerCoords: { x: 140, y: 210 }
  },
  {
    id: "tozeur",
    name: "Tozeur",
    arabicName: "توزر",
    region: "South",
    population: "115,000",
    workforce: "40,000",
    industries: ["Deglet Nour Date exports", "Sahara Desert Film Tourism", "Photovoltaic Power Plants", "Oasis Spa resorts"],
    resources: ["Geothermal oases", "Deglet Nour date Palms", "Sahara Landscapes (Star Wars set)"],
    transportation: ["Tozeur-Nefta Airport", "Inland national roads"],
    airports: 1, // Tozeur-Nefta International Airport
    ports: 0,
    universities: 1,
    industrialZones: 1,
    investmentScore: 84,
    gdpContribution: "2%",
    literacyRate: "84%",
    description: "Famous for its vast palm oases producing the ultra-premium 'Deglet Nour' honey date. Tozeur is a world-class desert tourism spot and home to some of the country's first utility-scale desert solar farms.",
    centerCoords: { x: 110, y: 225 }
  },
  {
    id: "kebili",
    name: "Kebili",
    arabicName: "قبلي",
    region: "South",
    population: "170,000",
    workforce: "60,000",
    industries: ["Dates Agriculture", "Geothermal greenhouse farming", "Desert trekking tourism"],
    resources: ["Vast aquifers", "Millions of Palm trees", "Chott El Jerid salt lake"],
    transportation: ["Desert highways linking to Gabes"],
    airports: 0,
    ports: 0,
    universities: 1,
    industrialZones: 1,
    investmentScore: 78,
    gdpContribution: "2.5%",
    literacyRate: "81%",
    description: "Located on the edge of the great sand dunes. Kebili is a leading exporter of organic date varieties and acts as a pioneer in geothermal warm-water agricultural greenhouses.",
    centerCoords: { x: 150, y: 250 }
  }
];

export interface InvestmentOpportunity {
  id: string;
  projectName: string;
  category: string;
  score: number;
  expectedRoi: string;
  startupCost: string;
  annualRevenue: string;
  annualProfit: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  timeToProfit: string;
  requiredWorkforce: string;
  suitableRegion: string;
  exportPotential: string;
  growthPotential: string;
  competitionLevel: 'Low' | 'Medium' | 'High';
  advantages: string[];
  challenges: string[];
  whySelected: string;
  description: string;
}

export const sampleOpportunities: InvestmentOpportunity[] = [
  {
    id: "premium_olive_oil_processing",
    projectName: "Advanced Olive Oil Extraction & Premium Brand Packaging",
    category: "Agriculture & Agri-food",
    score: 95,
    expectedRoi: "22% - 26%",
    startupCost: "$250,000",
    annualRevenue: "$180,000",
    annualProfit: "$65,000",
    riskLevel: "Low",
    timeToProfit: "18 Months",
    requiredWorkforce: "15-20 people",
    suitableRegion: "Sfax / Sousse / Nabeul",
    exportPotential: "Extremely High (EU, USA, East Asia)",
    growthPotential: "Strong (High organic global demand)",
    competitionLevel: "Medium",
    advantages: [
      "Access to millions of local high-quality olive groves.",
      "Tunisia is the largest exporter of olive oil outside the EU.",
      "Tax-free export agreements with European markets."
    ],
    challenges: [
      "Securing organic certification requires strict operational standards.",
      "Vulnerability to seasonal climate and rainfall changes."
    ],
    whySelected: "Leverages Tunisia's primary agricultural strength with higher value-added bottling/branding instead of raw bulk exports. Sfax has the historic mills and shipping logistics ready to support operations.",
    description: "Establish a modern, state-of-the-art cold-press extraction mill and automated bottling line to produce premium organic Extra Virgin Olive Oil targeting European and North American high-end supermarkets."
  },
  {
    id: "desert_solar_photovoltaic_farm",
    projectName: "Sahara Edge 10MW Photovoltaic Power Plant",
    category: "Renewable Energy",
    score: 93,
    expectedRoi: "16% - 19%",
    startupCost: "$1,200,000",
    annualRevenue: "$450,000",
    annualProfit: "$210,000",
    riskLevel: "Medium",
    timeToProfit: "3 Years",
    requiredWorkforce: "8 specialized engineers",
    suitableRegion: "Tataouine / Tozeur / Kebili",
    exportPotential: "High potential (under-construction Italy-Tunisia ELMED subsea cable)",
    growthPotential: "Exponential (Tunisia targets 35% renewables by 2030)",
    competitionLevel: "Low",
    advantages: [
      "Unparalleled daily solar irradiance levels in the Sahara gateway.",
      "Government-backed power purchasing contracts (STEG PPA).",
      "Vast tracts of cheap desert land available."
    ],
    challenges: [
      "High initial capital requirement for grid connection.",
      "Sand dust storms require automatic dry cleaning mechanisms."
    ],
    whySelected: "Aligns with Tunisia's national green transition and the ELMED submarine electricity link to Europe, offering long-term guaranteed electricity sales in stable currencies.",
    description: "Launch a 10 Megawatt utility-scale solar photovoltaic farm on the outskirts of Tozeur, providing clean energy to the national grid under the private concession program."
  },
  {
    id: "ai_bilingual_customer_support_hub",
    projectName: "Bilingual AI-Augmented Customer Experience Hub",
    category: "IT & Tech",
    score: 94,
    expectedRoi: "30% - 35%",
    startupCost: "$150,000",
    annualRevenue: "$320,000",
    annualProfit: "$110,000",
    riskLevel: "Low",
    timeToProfit: "12 Months",
    requiredWorkforce: "40-60 tech specialists",
    suitableRegion: "Ariana / Tunis / Sousse",
    exportPotential: "High (Serving France, Belgium, Germany, Middle East)",
    growthPotential: "Rapid (Easy scale-up via digital infrastructure)",
    competitionLevel: "High",
    advantages: [
      "Highly skilled, perfectly bilingual (French/Arabic/English) graduates available at competitive rates.",
      "El Ghazala Technopark provides state-of-the-art telecom backbones.",
      "Startup Act benefits: custom-exempt hardware and tax exemptions."
    ],
    challenges: [
      "High competition in standard call centers requires focus on advanced tech/AI niches.",
      "Talent retention requires competitive workplace culture."
    ],
    whySelected: "Tunisia is a recognized Mediterranean leader in outsourcing. By infusing AI tools into billing, technical, and customer workflows, this project maximizes ROI with minimal starting infrastructure.",
    description: "Form a high-end technical customer support and business process offshoring center, utilising AI co-pilots to deliver multi-language services for European enterprise clients."
  },
  {
    id: "automotive_harness_manufacturing",
    projectName: "Electric Vehicle Cable & Wire Harness Assembly Unit",
    category: "Manufacturing & Industry",
    score: 91,
    expectedRoi: "18% - 22%",
    startupCost: "$800,000",
    annualRevenue: "$1,100,000",
    annualProfit: "$280,000",
    riskLevel: "Medium",
    timeToProfit: "2 Years",
    requiredWorkforce: "150-200 manufacturing workers",
    suitableRegion: "Ben Arous / Bizerte / Sousse / Beja",
    exportPotential: "Extremely High (Direct European EV suppliers)",
    growthPotential: "Strong (European automotive supply chain relocation near-shoring)",
    competitionLevel: "Medium",
    advantages: [
      "Unmatched proximity to European ports (shipping under 30 hours).",
      "Skilled mechatronics engineers and highly disciplined workforce.",
      "Well-developed existing automotive supplier ecosystem."
    ],
    challenges: [
      "Just-In-Time delivery mandates require rock-solid logistics.",
      "High reliance on raw material copper pricing cycles."
    ],
    whySelected: "Relies on the strong automotive pedigree of Ben Arous and Bizerte Free Zone. EV adoption in Europe has triggered near-shoring demand, making Tunisia a premier manufacturing choice.",
    description: "Set up an advanced manufacturing assembly plant inside Bizerte's Free Zone to produce customized electrical wire harnesses for European EV automakers."
  },
  {
    id: "organic_date_transformation_packaging",
    projectName: "Organic Dates Transformation & Deglet Nour Brand Export",
    category: "Agriculture & Agri-food",
    score: 89,
    expectedRoi: "20% - 24%",
    startupCost: "$180,000",
    annualRevenue: "$260,000",
    annualProfit: "$80,000",
    riskLevel: "Low",
    timeToProfit: "14 Months",
    requiredWorkforce: "12-18 people",
    suitableRegion: "Tozeur / Kebili / Gafsa",
    exportPotential: "High (Gourmet stores in Europe, Gulf, Asia)",
    growthPotential: "Medium-High",
    competitionLevel: "Medium",
    advantages: [
      "Access to authentic Tozeur date groves (world leader in Deglet Nour).",
      "Diversified products (date syrup, date sugar, paste) have very high margins.",
      "Well-established trade pathways."
    ],
    challenges: [
      "High standards required for organic certification in export destinations.",
      "Strict packaging requirements to preserve quality in sea transit."
    ],
    whySelected: "Standard date export has tight margins, but organic transformation (turning dates into syrup, powders, and sugar substitutes) adds massive value and is highly popular in health-conscious western markets.",
    description: "Construct a state-of-the-art agricultural collection and processing factory in Tozeur, turning premium dates into date paste, liquid date syrup, and organic date sugar for global healthy food brands."
  },
  {
    id: "eco_lodge_ain_draham",
    projectName: "Eco-Lodge and Forest Wellness Sanctuary",
    category: "Tourism & Hospitality",
    score: 87,
    expectedRoi: "15% - 18%",
    startupCost: "$350,000",
    annualRevenue: "$140,000",
    annualProfit: "$48,000",
    riskLevel: "Medium",
    timeToProfit: "2.5 Years",
    requiredWorkforce: "10-15 hospitality workers",
    suitableRegion: "Jendouba (Ain Draham) / Bizerte",
    exportPotential: "Medium-High (Boutique European travelers)",
    growthPotential: "Strong (Increasing post-pandemic demand for green tourism)",
    competitionLevel: "Low",
    advantages: [
      "Unique cork oak forest environment with cooler alpine climate.",
      "High desire for alternative, non-beach cultural travel.",
      "Abundant traditional thermal springs for wellness services."
    ],
    challenges: [
      "Highly seasonal winter peaks require clever summer retreats marketing.",
      "Stricter environmental building permits in forested regions."
    ],
    whySelected: "Beach tourism is saturated, but forest and eco-wellness tourism in Ain Draham is a high-margin, unsaturated market segment. Capitalizes on the gorgeous scenery and thermal spring resources.",
    description: "Construct an architectural luxury eco-lodge inside the pine forests of Ain Draham (Jendouba), featuring traditional dome architecture, geothermal thermal spa tubs, and curated hiking tours."
  }
];
