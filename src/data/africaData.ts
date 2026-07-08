import { governorates, tunisiaStats, sampleOpportunities, Governorate, TunisiaStats, InvestmentOpportunity } from "./tunisiaData";

export interface CountryStats {
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

export interface RegionHub {
  id: string;
  name: string;
  arabicName?: string; // or localName
  localName?: string;
  region: string;
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
  centerCoords: { x: number; y: number };
}

export interface CountryProfile {
  id: string;
  name: string;
  flag: string;
  capital: string;
  region: 'North Africa' | 'West Africa' | 'East Africa' | 'Southern Africa' | 'Central Africa';
  stats: CountryStats;
  hubs: RegionHub[];
  sampleOpportunities: InvestmentOpportunity[];
  description: string;
  mapCenterCoords: { x: number; y: number }; // Coords on an Africa Map
}

export const africaCountries: CountryProfile[] = [
  {
    id: "tunisia",
    name: "Tunisia",
    flag: "🇹🇳",
    capital: "Tunis",
    region: "North Africa",
    description: "Tunisia stands as a high-potential gateway to European, Middle Eastern, and African markets. With an exceptionally educated, bilingual engineering talent pool, a competitive cost base, and robust sectoral focus on tech, mechatronics, green energy, and agri-exports, Tunisia is a premium near-shore FDI destination.",
    mapCenterCoords: { x: 175, y: 45 },
    stats: {
      population: "12.5 Million (2026 est.)",
      gdp: "$48.5 Billion USD",
      gdpGrowth: "2.4% (2025/2026)",
      inflation: "7.1%",
      currency: "Tunisian Dinar (TND)",
      mainIndustries: [
        "Automotive Components & Aerospace",
        "Information & Communication Technology (ICT)",
        "Premium Olive Oil & Organic Date Exports",
        "Renewable Energy (Solar/Wind)",
        "Textiles & Apparel",
        "Chemicals & Phosphates"
      ],
      exports: "$16.2 Billion USD (Olive oil, electronic machinery, apparel, phosphates)",
      imports: "$19.8 Billion USD (Energy, raw materials, food products)",
      naturalResources: ["Phosphates", "Oil & Gas", "Arable Land", "High Solar Irradiance", "Zinc, Gypsum"],
      workforce: "4.2 Million (high concentration of tech and mechatronics engineers)",
      literacyRate: "81.8% (94%+ for youth 15-24)",
      foreignInvestmentFlow: "$1.2 Billion USD annually"
    },
    hubs: governorates.map(gov => ({
      id: gov.id,
      name: gov.name,
      arabicName: gov.arabicName,
      region: gov.region,
      population: gov.population,
      workforce: gov.workforce,
      industries: gov.industries,
      resources: gov.resources,
      transportation: gov.transportation,
      airports: gov.airports,
      ports: gov.ports,
      universities: gov.universities,
      industrialZones: gov.industrialZones,
      investmentScore: gov.investmentScore,
      gdpContribution: gov.gdpContribution,
      literacyRate: gov.literacyRate,
      description: gov.description,
      centerCoords: gov.centerCoords
    })),
    sampleOpportunities: sampleOpportunities
  },
  {
    id: "morocco",
    name: "Morocco",
    flag: "🇲🇦",
    capital: "Rabat",
    region: "North Africa",
    description: "Morocco boasts a stable, highly progressive business ecosystem with state-of-the-art infrastructure. Known as the industrial gateway of Africa, it features Africa's largest container seaport (Tanger Med) and leads the continent in automotive production, aeronautics assembly, and utility-scale solar-thermal fields.",
    mapCenterCoords: { x: 110, y: 65 },
    stats: {
      population: "38.2 Million",
      gdp: "$145.4 Billion USD",
      gdpGrowth: "3.2%",
      inflation: "4.3%",
      currency: "Moroccan Dirham (MAD)",
      mainIndustries: [
        "Automotive Manufacturing",
        "Aeronautics & Aerospace Assembly",
        "Phosphate Mining & Fertilizers",
        "Offshoring & BPO Services",
        "Renewable Energy & Green Hydrogen",
        "Agro-food Processing"
      ],
      exports: "$36.8 Billion USD (Passenger vehicles, fertilizers, electrical devices)",
      imports: "$52.4 Billion USD (Energy, heavy machinery, cereals)",
      naturalResources: ["70% of World Phosphate reserves", "Fish stocks", "Arable land", "Solar / Wind sites"],
      workforce: "12.4 Million (highly trained in automotive assembly & industrial engineering)",
      literacyRate: "77.5%",
      foreignInvestmentFlow: "$2.5 Billion USD annually"
    },
    hubs: [
      {
        id: "casablanca",
        name: "Casablanca-Settat",
        localName: "الدار البيضاء",
        region: "Coastal West",
        population: "7,400,000",
        workforce: "2,800,000",
        industries: ["Finance & Banking", "Aeronautics Assembly", "IT Offshoring", "Chemicals", "Logistics"],
        resources: ["Casablanca Finance City (CFC)", "Skilled multilingual talent", "Industrial parks"],
        transportation: ["Tramway", "Al Boraq high-speed train", "Casablanca Seaport"],
        airports: 1, // Mohammed V International
        ports: 1,
        universities: 8,
        industrialZones: 6,
        investmentScore: 97,
        gdpContribution: "32%",
        literacyRate: "88%",
        description: "The economic powerhouse of Morocco. Hosts the Casablanca Finance City (CFC), serving as the premium financial and corporate headquarters gateway into sub-Saharan Africa.",
        centerCoords: { x: 130, y: 120 }
      },
      {
        id: "tangier",
        name: "Tanger-Tetouan-Al Hoceima",
        localName: "طنجة",
        region: "North Coast",
        population: "3,800,000",
        workforce: "1,400,000",
        industries: ["Automotive Assembly (Renault)", "Maritime Logistics", "Textiles", "Electronics"],
        resources: ["Tanger Med Seaport", "Tanger Automotive City", "Free Trade Privileges"],
        transportation: ["Tanger Med Port", "High-speed train terminal"],
        airports: 1,
        ports: 1, // Tanger Med - largest port in Africa & Mediterranean
        universities: 4,
        industrialZones: 5,
        investmentScore: 95,
        gdpContribution: "10%",
        literacyRate: "80%",
        description: "Strategically located at the Strait of Gibraltar, just 14km from Europe. Home to Tanger Med, Africa's premier mega-port, driving the continent's most advanced automotive export ecosystems.",
        centerCoords: { x: 160, y: 60 }
      },
      {
        id: "marrakech",
        name: "Marrakech-Safi",
        localName: "مراكش",
        region: "Center South",
        population: "4,600,000",
        workforce: "1,600,000",
        industries: ["Luxury Tourism", "Phosphate Processing", "Agribusiness", "Organic Cosmetic (Argan Oil)"],
        resources: ["Argan forests", "Safi Phosphate complexes", "Cultural Heritage"],
        transportation: ["Double-track railways", "Regional highways"],
        airports: 1, // Marrakech Menara
        ports: 1, // Safi Port
        universities: 3,
        industrialZones: 2,
        investmentScore: 88,
        gdpContribution: "8%",
        literacyRate: "75%",
        description: "A world-renowned cultural and tourist capital offering major development potential in high-end eco-hospitality, organic cosmetic export (Argan), and phosphate-derived manufacturing in Safi.",
        centerCoords: { x: 100, y: 190 }
      }
    ],
    sampleOpportunities: [
      {
        id: "morocco_ev_battery_giga",
        projectName: "Lithium-Ion EV Battery Components Giga-Factory",
        category: "Manufacturing & Industry",
        score: 96,
        expectedRoi: "20% - 25%",
        startupCost: "$2,500,000",
        annualRevenue: "$1,800,000",
        annualProfit: "$480,000",
        riskLevel: "Medium",
        timeToProfit: "3 Years",
        requiredWorkforce: "350 technicians & mechatronic engineers",
        suitableRegion: "Tanger Automotive City",
        exportPotential: "Extremely High (EU Automotive Market)",
        growthPotential: "Exponential (Relocation of European EV supply chain)",
        competitionLevel: "Low",
        advantages: [
          "Morocco is Africa's top auto manufacturer producing 700k+ cars/year.",
          "Duty-free access to USA and EU markets via FTAs.",
          "Local availability of cobalt, manganese, and phosphates."
        ],
        challenges: [
          "Substantial initial capital asset and equipment investment.",
          "Strict global environmental compliance standards."
        ],
        whySelected: "Morocco has positioned itself as the EV manufacturing hub for Europe. An investor in battery materials or component assembly gains immense competitive advantage inside Tangier's tax-exempt industrial zones.",
        description: "Establish a high-capacity assembly and manufacturing plant in Tanger Automotive City to supply lithium-ion battery casings and cable harness systems directly to European electric car brands."
      },
      {
        id: "morocco_green_hydrogen",
        projectName: "Green Hydrogen & Ammonia Production Pilot",
        category: "Renewable Energy",
        score: 92,
        expectedRoi: "15% - 18%",
        startupCost: "$3,000,000",
        annualRevenue: "$900,000",
        annualProfit: "$310,000",
        riskLevel: "High",
        timeToProfit: "4 Years",
        requiredWorkforce: "20 specialized electro-chemical engineers",
        suitableRegion: "Guelmim-Oued Noun / Safi Coast",
        exportPotential: "High (Direct pipeline projects to EU)",
        growthPotential: "Exponential (Underpinned by Morocco's Green Hydrogen Offer)",
        competitionLevel: "Low",
        advantages: [
          "Exceptional combined solar and wind irradiance.",
          "Existing industrial infrastructure for ammonia export in Safi Port.",
          "Aggressive government subsidies and dedicated public land banks."
        ],
        challenges: [
          "High upfront technology and electrolysis equipment cost.",
          "Desalination plant required for feed water supply."
        ],
        whySelected: "Morocco's 'Green Hydrogen Offer' guarantees vast land and simplified permits for clean power investors. This pilot positions early entrants to dominate future ammonia pipelines to Europe.",
        description: "Deploy a 5MW electrolyzer unit coupled with a dedicated solar-wind hybrid array to generate zero-emission green hydrogen, converted to green ammonia for fertilizer production and European export."
      }
    ]
  },
  {
    id: "nigeria",
    name: "Nigeria",
    flag: "🇳🇬",
    capital: "Abuja",
    region: "West Africa",
    description: "Nigeria represents Africa's most populous market and a leading startup powerhouse. Armed with a vibrant, hyper-dynamic digital youth population, the continent's largest ICT tech ecosystem (Lagos/Yaba), and immense agricultural, oil, and gas reserves, Nigeria is the definitive hub for consumer-tech and industrial scale-up.",
    mapCenterCoords: { x: 195, y: 155 },
    stats: {
      population: "235 Million (2026 est.)",
      gdp: "$390 Billion USD",
      gdpGrowth: "3.1%",
      currency: "Nigerian Naira (NGN)",
      inflation: "28.5%",
      mainIndustries: [
        "Petroleum Refining & Liquefied Natural Gas (LNG)",
        "Fintech, Digital Payments & E-commerce",
        "Creative & Telecom Services (Nollywood/Afrobeats)",
        "Agribusiness (Cassava, Cocoa, Palm Oil)",
        "Cement & Heavy Manufacturing"
      ],
      exports: "$58.4 Billion USD (Crude oil, gas, cocoa, cashew nuts)",
      imports: "$45.2 Billion USD (Refined fuel, machinery, transport, chemicals)",
      naturalResources: ["Crude Oil", "Natural Gas", "Coal, Tin, Iron Ore", "Vast Arable Land"],
      workforce: "73 Million (highly entrepreneurial, tech-savvy English-speaking youth)",
      literacyRate: "62% (80%+ in urban tech nodes)",
      foreignInvestmentFlow: "$1.5 Billion USD annually"
    },
    hubs: [
      {
        id: "lagos",
        name: "Lagos State",
        localName: "Eko",
        region: "Coastal West",
        population: "22,000,000",
        workforce: "9,500,000",
        industries: ["Fintech", "E-Commerce", "Digital Payments", "Entertainment & Media", "Light Manufacturing"],
        resources: ["Yaba Silicon Lagoon", "Lekki Free Trade Zone", "Vast local market"],
        transportation: ["Lagos Port Complex (Apapa/Tin Can)", "Lekki Deep Sea Port", "Lagos Rail Mass Transit"],
        airports: 1, // Murtala Muhammed International
        ports: 2,
        universities: 10,
        industrialZones: 4,
        investmentScore: 94,
        gdpContribution: "25%",
        literacyRate: "92%",
        description: "The commercial nerve-center of West Africa. Lagos hosts Africa's most active tech-startup hub and the state-of-the-art Lekki Free Zone with its deepwater port, offering tax exemptions for heavy industries.",
        centerCoords: { x: 190, y: 220 }
      },
      {
        id: "kano",
        name: "Kano State",
        localName: "Kano",
        region: "North",
        population: "14,500,000",
        workforce: "5,200,000",
        industries: ["Agro-processing", "Textile and Leather", "Trading & Wholesale Distribution", "Plastic Products"],
        resources: ["Large agricultural plains", "Historic Sahelian trade links", "Livestock reserves"],
        transportation: ["Northern railway connection", "Trans-Saharan highway nodes"],
        airports: 1, // Mallam Aminu Kano International
        ports: 0,
        universities: 5,
        industrialZones: 3,
        investmentScore: 78,
        gdpContribution: "8%",
        literacyRate: "60%",
        description: "The historic trade capital of Northern Nigeria. Highly strategic for bulk food processing, leather factories, textiles, and shipping routes traversing the Sahel.",
        centerCoords: { x: 230, y: 110 }
      }
    ],
    sampleOpportunities: [
      {
        id: "nigeria_fintech_remit",
        projectName: "Cross-Border Agri-Merchant Payment & Credit Platform",
        category: "IT & Tech",
        score: 95,
        expectedRoi: "28% - 34%",
        startupCost: "$200,000",
        annualRevenue: "$390,000",
        annualProfit: "$120,000",
        riskLevel: "Medium",
        timeToProfit: "15 Months",
        requiredWorkforce: "12 software developers & compliance officers",
        suitableRegion: "Lagos (Yaba Tech District)",
        exportPotential: "High (Pan-African Expansion)",
        growthPotential: "Exponential",
        competitionLevel: "High",
        advantages: [
          "Nigeria is the fintech capital of Africa with high digital payment adoption.",
          "High transaction volumes across agricultural merchant networks.",
          "Dynamic local tech talent ready for recruitment."
        ],
        challenges: [
          "Complex regulatory and licensing environment (CBN approvals).",
          "High competition requires deep customer acquisition marketing."
        ],
        whySelected: "Standard banking is limited for smallholder farmers. Building a niche payment and micro-credit platform for regional trade inside Lagos gives access to Africa's largest consumer base and capital markets.",
        description: "Develop an AI-powered B2B mobile payment wallet and alternative-credit scoring app, allowing agricultural wholesalers and rural merchants to clear invoices instantly and access micro-loans."
      },
      {
        id: "nigeria_cassava_starch",
        projectName: "Industrial-Scale Cassava Processing & Starch Extraction",
        category: "Agriculture & Agri-food",
        score: 91,
        expectedRoi: "22% - 27%",
        startupCost: "$450,000",
        annualRevenue: "$310,000",
        annualProfit: "$95,000",
        riskLevel: "Low",
        timeToProfit: "20 Months",
        requiredWorkforce: "40 production workers & agronomists",
        suitableRegion: "Oyo State / Ogun State",
        exportPotential: "High (Global industrial starch demand)",
        growthPotential: "Strong (Substituting expensive food imports)",
        competitionLevel: "Medium",
        advantages: [
          "Nigeria is the world's largest producer of cassava.",
          "High demand from local pharmaceutical, paper, and food packaging giants.",
          "Federal Pioneer Status tax holidays for agribusinesses."
        ],
        challenges: [
          "Sourcing reliable electricity requires investing in solar/biogas generator.",
          "Logistics of fresh cassava tubers (must be processed within 48h of harvest)."
        ],
        whySelected: "Imported industrial starches are extremely costly due to FX volatility. Establishing high-throughput local processing substitutes imports, securing solid, stable contracts with consumer brands.",
        description: "Construct a mechanized cassava processing plant equipped with pneumatic dryers to refine raw tubers into high-quality food-grade starch for local pharmaceutical and food manufacturing companies."
      }
    ]
  },
  {
    id: "egypt",
    name: "Egypt",
    flag: "🇪🇬",
    capital: "Cairo",
    region: "North Africa",
    description: "Egypt bridges North Africa and the Middle East, offering a massive domestic consumer market, world-class industrial hubs (Suez Canal Economic Zone), and competitive operating costs. Its highly skilled workforce, competitive engineering costs, and extensive free-trade networks with Europe and Africa make it an optimal heavy manufacturing and tech outsourcing center.",
    mapCenterCoords: { x: 260, y: 55 },
    stats: {
      population: "112 Million",
      gdp: "$395 Billion USD",
      gdpGrowth: "3.8%",
      currency: "Egyptian Pound (EGP)",
      inflation: "21.5%",
      mainIndustries: [
        "Suez Canal Logistics & Shipping Services",
        "Natural Gas & Liquefied Petroleum",
        "Global Tech Outsourcing & Call Centers",
        "Textiles, Yarn & Cotton Weaving",
        "Pharmaceuticals & Fertilizers"
      ],
      exports: "$42.1 Billion USD (LNG, gold, electric cables, textiles)",
      imports: "$71.5 Billion USD (Wheat, heavy machinery, motor vehicles)",
      naturalResources: ["Oil & Gas", "Phosphates", "Iron Ore", "Limestone & Silica", "Suez Canal location"],
      workforce: "31 Million (excellent English/German/French bilingual university graduates)",
      literacyRate: "73.1% (90%+ for tech graduates)",
      foreignInvestmentFlow: "$9.8 Billion USD (highest in North Africa)"
    },
    hubs: [
      {
        id: "cairo",
        name: "Greater Cairo",
        localName: "القاهرة الكبرى",
        region: "North Center",
        population: "21,000,000",
        workforce: "6,200,000",
        industries: ["Software Outsourcing", "Fintech", "Telecom Services", "Retail & Commerce", "Light Assembly"],
        resources: ["Smart Village Tech Park", "Massive domestic market", "Administrative Centers"],
        transportation: ["Metro network", "Cairo Ring Road", "International rail terminus"],
        airports: 1, // Cairo International
        ports: 0,
        universities: 15,
        industrialZones: 5,
        investmentScore: 96,
        gdpContribution: "28%",
        literacyRate: "89%",
        description: "The cultural, corporate, and tech administrative heart of the Arab world. Hosts the 'Smart Village' technology park, housing hundreds of global technology and BPO offshore companies.",
        centerCoords: { x: 240, y: 120 }
      },
      {
        id: "suez_canal",
        name: "Suez Canal Zone (SCZONE)",
        localName: "المنطقة الاقتصادية لقناة السويس",
        region: "Suez Coast",
        population: "1,200,000",
        workforce: "450,000",
        industries: ["Maritime Logistics", "Ship Repair & Fueling", "Chemical Processing", "Heavy Machinery Manufacturing"],
        resources: ["SCZONE tax incentives", "Direct canal front access", "Special Economic Privileges"],
        transportation: ["Suez Canal", "East Port Said Port", "Ain Sokhna Port"],
        airports: 0, // Cairo Airport is close
        ports: 2, // Port Said & Ain Sokhna
        universities: 2,
        industrialZones: 6,
        investmentScore: 95,
        gdpContribution: "12%",
        literacyRate: "82%",
        description: "The global maritime transit corridor. The SCZONE provides unmatched customs, corporate tax cuts, and direct ship-to-shore terminals, allowing industrial factories to export globally with zero friction.",
        centerCoords: { x: 280, y: 130 }
      }
    ],
    sampleOpportunities: [
      {
        id: "egypt_smart_village_outsourcing",
        projectName: "Bilingual IT & AI Engineering Nearshore Delivery Center",
        category: "IT & Tech",
        score: 94,
        expectedRoi: "25% - 30%",
        startupCost: "$160,000",
        annualRevenue: "$340,000",
        annualProfit: "$115,000",
        riskLevel: "Low",
        timeToProfit: "12 Months",
        requiredWorkforce: "45 software engineers & linguists",
        suitableRegion: "Cairo (Smart Village)",
        exportPotential: "Extremely High (Serving Europe and GCC)",
        growthPotential: "Strong (Backed by Egypt's digital exports strategy)",
        competitionLevel: "Medium",
        advantages: [
          "Superb supply of affordable software engineering & multilingual talent.",
          "Government cash-back subsidies on digital exports.",
          "Very competitive local operating costs compared to Eastern Europe."
        ],
        challenges: [
          "Currency valuation shifts require holding operational cash in USD/EUR.",
          "Intense global recruitment demands competitive career paths."
        ],
        whySelected: "Cairo is a major hub for near-shore EMEA tech delivery. By using competitive local engineering talent, this project generates premium IT services for high-value European companies under export-incentive structures.",
        description: "Build an agile software delivery and customer operations center inside Cairo's Smart Village, offering multi-language technical customer support and AI training models for European scale-ups."
      },
      {
        id: "egypt_suez_logistics",
        projectName: "Suez Canal Dry Port & Automated Cargo Warehousing",
        category: "Manufacturing & Industry",
        score: 93,
        expectedRoi: "16% - 20%",
        startupCost: "$1,500,000",
        annualRevenue: "$550,000",
        annualProfit: "$220,000",
        riskLevel: "Medium",
        timeToProfit: "3 Years",
        requiredWorkforce: "35 logistics experts & operators",
        suitableRegion: "Ain Sokhna (SCZONE)",
        exportPotential: "High (Global shipping companies container transshipment)",
        growthPotential: "Exponential (Suez expansion and Red Sea port developments)",
        competitionLevel: "Medium",
        advantages: [
          "Direct presence along the world's primary maritime corridor (Suez Canal).",
          "Tax incentives and duty-free import of equipment under SCZONE regulations.",
          "Interconnected rail and highway links across Egypt."
        ],
        challenges: [
          "High capital layout required for custom material handling cranes.",
          "Global supply chain security and maritime insurance requirements."
        ],
        whySelected: "Over 12% of global trade crosses the Suez Canal. Establishing an automated, green-powered bonded warehouse and cold-chain depot inside the SCZONE taps into massive container logistics demand.",
        description: "Deploy an automated bonded warehouse facility with integrated refrigeration units in Ain Sokhna (SCZONE), streamlining transit storage and container assembly for global commercial shipping lines."
      }
    ]
  },
  {
    id: "kenya",
    name: "Kenya",
    flag: "🇰🇪",
    capital: "Nairobi",
    region: "East Africa",
    description: "Kenya, widely dubbed the 'Silicon Savannah', represents the leading financial, commercial, and tech gateway to East Africa. Propelled by the world-famous M-Pesa mobile money infrastructure, a 90%+ green national electricity grid (geothermal and hydro), and highly proactive English-speaking tech-bilingual talent, Kenya is a top destination for green tech and agribusiness.",
    mapCenterCoords: { x: 265, y: 200 },
    stats: {
      population: "56.5 Million",
      gdp: "$110 Billion USD",
      gdpGrowth: "5.2%",
      currency: "Kenyan Shilling (KES)",
      inflation: "6.5%",
      mainIndustries: [
        "Fintech, Agri-Tech & Mobile Telecoms",
        "Horticulture (Fresh Flowers, Tea & Coffee Exports)",
        "Geothermal & Hydroelectric Power Plants",
        "BPO Services & Tech Startups",
        "Wildlife Tourism & Eco-lodges"
      ],
      exports: "$7.5 Billion USD (Tea, cut flowers, refined petroleum, titanium)",
      imports: "$18.4 Billion USD (Industrial machinery, oil, vehicles, plastics)",
      naturalResources: ["Geothermal heat", "Diatomite, Soda Ash, Fluorspar", "Vast Tea & Flower Estates"],
      workforce: "24 Million (exceptionally high English proficiency and mobile literacy)",
      literacyRate: "82.6%",
      foreignInvestmentFlow: "$1.4 Billion USD annually"
    },
    hubs: [
      {
        id: "nairobi",
        name: "Nairobi County",
        localName: "Nairobi",
        region: "Central Highlands",
        population: "4,500,000",
        workforce: "2,200,000",
        industries: ["Fintech & SaaS", "Agri-tech", "Telecom Services", "HQ Corporate Offices", "Horticulture Trade"],
        resources: ["Silicon Savannah ecosystem", "M-Pesa financial integration", "Skilled English-speaking grads"],
        transportation: ["Nairobi Express Way", "Standard Gauge Railway (SGR)"],
        airports: 1, // Jomo Kenyatta International
        ports: 0,
        universities: 8,
        industrialZones: 3,
        investmentScore: 95,
        gdpContribution: "22%",
        literacyRate: "91%",
        description: "The regional commercial capital of East Africa. Hosts major global tech headquarters (Google, Microsoft R&D) and serves as the epicenter of African fintech innovation and impact-investment capital.",
        centerCoords: { x: 250, y: 220 }
      },
      {
        id: "mombasa",
        name: "Mombasa County",
        localName: "Mombasa",
        region: "Coast",
        population: "1,300,000",
        workforce: "550,000",
        industries: ["Maritime Trade Logistics", "Petroleum Refining", "Agro-processing (Tea/Coffee packaging)", "Beach Tourism"],
        resources: ["Port of Mombasa", "Mombasa Special Economic Zone (Dongo Kundu)", "Beaches"],
        transportation: ["Port of Mombasa", "SGR cargo railway terminal"],
        airports: 1, // Moi International
        ports: 1, // Largest deepwater port in East Africa
        universities: 3,
        industrialZones: 2,
        investmentScore: 89,
        gdpContribution: "9%",
        literacyRate: "83%",
        description: "The gateway port for East and Central Africa (serving Uganda, Rwanda, South Sudan). The Dongo Kundu Special Economic Zone offers massive tax and duty-free import incentives for exporters.",
        centerCoords: { x: 270, y: 245 }
      }
    ],
    sampleOpportunities: [
      {
        id: "kenya_agritech_cold_chain",
        projectName: "Off-Grid Solar Cold Chain & Digital Produce Marketplace",
        category: "Agriculture & Agri-food",
        score: 94,
        expectedRoi: "24% - 29%",
        startupCost: "$150,000",
        annualRevenue: "$210,000",
        annualProfit: "$72,000",
        riskLevel: "Low",
        timeToProfit: "14 Months",
        requiredWorkforce: "15 technicians & app administrators",
        suitableRegion: "Nairobi / Rift Valley Hubs",
        exportPotential: "Medium (Expanding to East African Community)",
        growthPotential: "Strong (Mitigating Africa's 40% post-harvest loss)",
        competitionLevel: "Medium",
        advantages: [
          "Coupled with Kenya's exceptional mobile money network (M-Pesa).",
          "Abundant solar power capabilities across farming districts.",
          "Support from international clean-tech impact funds."
        ],
        challenges: [
          "Importation of high-quality lithium batteries and cooling compressors.",
          "Onboarding rural farming cooperatives requires solid local field partnerships."
        ],
        whySelected: "Over 40% of fresh food spoils in Kenya before reaching Nairobi's markets. Establishing off-grid solar cold-storage units and linking them to a mobile app offers massive social and financial ROI.",
        description: "Install solar-powered cold-storage shipping containers in key rural farming areas, allowing cooperative farmers to preserve fresh produce and sell directly to urban buyers via an integrated mobile app."
      },
      {
        id: "kenya_geothermal_greenhouse",
        projectName: "Geothermal-heated Organic Flower & Vegetable Farm",
        category: "Renewable Energy",
        score: 90,
        expectedRoi: "18% - 22%",
        startupCost: "$600,000",
        annualRevenue: "$380,000",
        annualProfit: "$110,000",
        riskLevel: "Medium",
        timeToProfit: "2 Years",
        requiredWorkforce: "50 greenhouse technicians & operators",
        suitableRegion: "Naivasha (Rift Valley)",
        exportPotential: "Extremely High (EU, UK flower auctions)",
        growthPotential: "Strong (Kenya is Europe's primary flower source)",
        competitionLevel: "Medium",
        advantages: [
          "Harnessing low-cost geothermal heat bypasses traditional energy bills.",
          "Direct daily cargo cargo flights from Nairobi to Amsterdam.",
          "Year-round ideal growing conditions in the Great Rift Valley."
        ],
        challenges: [
          "Capital-intensive geothermal pipe connections and glasshouse setups.",
          "Compliance with European pesticide and environmental audits."
        ],
        whySelected: "By tapping directly into low-cost, waste geothermal heat from power plants in Naivasha, this greenhouse project produces high-value roses and vegetables at a fraction of standard heating costs, giving a competitive edge for exports.",
        description: "Establish a modern, automated geothermal-heated glass greenhouse in Naivasha to cultivate premium organic roses and pesticide-free baby vegetables for international auction markets."
      }
    ]
  },
  {
    id: "south_africa",
    name: "South Africa",
    flag: "🇿🇦",
    capital: "Pretoria",
    region: "Southern Africa",
    description: "South Africa features the continent's most sophisticated and diversified economy. Blessed with world-class capital markets, highly developed transport logistics, a robust corporate structure, and abundant mineral resources (PGMs, gold, manganese), South Africa is a supreme industrial assembly, mining technology, and institutional service hub.",
    mapCenterCoords: { x: 215, y: 285 },
    stats: {
      population: "61 Million",
      gdp: "$380 Billion USD",
      gdpGrowth: "1.5%",
      currency: "South African Rand (ZAR)",
      inflation: "5.4%",
      mainIndustries: [
        "Advanced Automotive Manufacturing (BMW, Mercedes)",
        "Platinum, Gold & Coal Mining Technology",
        "Financial Services & Asset Management",
        "BPO, Tech Offshoring & Cloud Data Centers",
        "Premium Wine & Deciduous Fruit Export"
      ],
      exports: "$110 Billion USD (Platinums, gold, diamonds, vehicles, coal)",
      imports: "$95 Billion USD (Crude oil, machinery, electronics, chemicals)",
      naturalResources: ["World's largest Platinum reserves", "Gold, Chromium, Manganese", "Vast coastlines"],
      workforce: "22.5 Million (world-class financial and engineering professionals)",
      literacyRate: "90% (exceptional technical colleges and universities)",
      foreignInvestmentFlow: "$5.2 Billion USD annually"
    },
    hubs: [
      {
        id: "gauteng",
        name: "Gauteng Province",
        localName: "Gauteng",
        region: "Inland North",
        population: "15,800,000",
        workforce: "6,800,000",
        industries: ["Investment Banking", "Corporate HQs", "Data Centers", "Mining Technology", "Advanced Automotive Assembly"],
        resources: ["Johannesburg Stock Exchange (JSE)", "Heavy industrial bases", "Top-tier universities"],
        transportation: ["Gautrain high-speed rail", "OR Tambo International Airport Hub"],
        airports: 1, // OR Tambo - Africa's busiest airport
        ports: 0,
        universities: 6,
        industrialZones: 5,
        investmentScore: 96,
        gdpContribution: "34%",
        literacyRate: "94%",
        description: "The financial capital of the continent. Gauteng generates a massive portion of industrial economic output, hosting the Johannesburg Stock Exchange and serving as the primary commercial launchpad for sub-Saharan Africa.",
        centerCoords: { x: 210, y: 200 }
      },
      {
        id: "western_cape",
        name: "Western Cape Province",
        localName: "Western Cape",
        region: "Coastal South",
        population: "7,200,000",
        workforce: "2,900,000",
        industries: ["Tech Startups & SaaS", "BPO & Customer Offshoring", "Luxury Tourism", "Viticulture (Wine exports)"],
        resources: ["Silicon Cape startup ecosystem", "Stellenbosch Tech incubators", "Premium vineyard land"],
        transportation: ["Port of Cape Town", "Direct national highways"],
        airports: 1, // Cape Town International
        ports: 1,
        universities: 4,
        industrialZones: 3,
        investmentScore: 95,
        gdpContribution: "14%",
        literacyRate: "93%",
        description: "Cape Town is Africa's premier technology startup and BPO hub. Backed by exceptional lifestyle factors and top universities, it attracts huge international digital investment, fintech startups, and green tourism.",
        centerCoords: { x: 190, y: 260 }
      }
    ],
    sampleOpportunities: [
      {
        id: "sa_data_center",
        projectName: "Green-Powered Tier IV Cloud Hyperscale Data Center",
        category: "IT & Tech",
        score: 95,
        expectedRoi: "18% - 22%",
        startupCost: "$2,000,000",
        annualRevenue: "$750,000",
        annualProfit: "$290,000",
        riskLevel: "Medium",
        timeToProfit: "2.5 Years",
        requiredWorkforce: "15 specialized network & security engineers",
        suitableRegion: "Cape Town (Silicon Cape Hub)",
        exportPotential: "High (Serving sub-Saharan digital apps)",
        growthPotential: "Exponential (Driven by enterprise cloud migration)",
        competitionLevel: "High",
        advantages: [
          "Cape Town is the primary landing point for massive subsea cables (Equiano/2Africa).",
          "High corporate demand for secure, local cloud storage.",
          "Tax incentives for investments in green infrastructure."
        ],
        challenges: [
          "Securing stable grid connection (requires dedicated solar-battery farm fallback).",
          "High initial cost for certified cooling systems."
        ],
        whySelected: "Africa's cloud demand is exploding, but data sovereignty rules require files to stay on-shore. Cape Town offers exceptional submarine cable bandwidth and a world-class tech-developer workforce.",
        description: "Build an eco-friendly, carbon-neutral Tier IV colocation and cloud data center, powered by a dedicated solar farm, targeting global SaaS and financial clients."
      },
      {
        id: "sa_premium_wine",
        projectName: "Organic Fair-Trade Winery & Deciduous Fruit Export Platform",
        category: "Agriculture & Agri-food",
        score: 92,
        expectedRoi: "20% - 25%",
        startupCost: "$400,000",
        annualRevenue: "$260,000",
        annualProfit: "$85,000",
        riskLevel: "Low",
        timeToProfit: "18 Months",
        requiredWorkforce: "35 agricultural workers & marketers",
        suitableRegion: "Stellenbosch / Paarl (Western Cape)",
        exportPotential: "Extremely High (EU, USA, China, UK)",
        growthPotential: "Strong (Rising demand for organic boutique brand wines)",
        competitionLevel: "High",
        advantages: [
          "Stellenbosch represents a world-renowned premium terroir.",
          "Strong local logistics and refrigerated container shipping channels.",
          "Excellent currency exchange rate factors (low local cost, high USD export income)."
        ],
        challenges: [
          "Highly competitive market requires highly unique, premium branding.",
          "Vulnerability to seasonal weather and global shipping bottlenecks."
        ],
        whySelected: "South African wines are highly valued globally. By focusing on certified organic and Fair-Trade production, this vineyard project accesses the highest-margin retail markets in the west, generating stable foreign currency returns.",
        description: "Construct an advanced organic processing and bottling winery in Stellenbosch, producing high-value biodynamic wines and dried organic fruit products for elite global exports."
      }
    ]
  }
];
