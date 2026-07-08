import React, { useState, useEffect } from "react";
import { 
  TrendingUp, Coins, Globe, Users, Award, Shield, ArrowRight, Compass, 
  HelpCircle, Activity, FileText, Heart, History, Sparkles, MapPin, 
  Building2, ChevronRight, Loader2, CheckCircle2, Bookmark, FileCheck, 
  Briefcase, Landmark, Percent, DollarSign, ArrowLeft, HeartOff, PhoneCall,
  MessageSquare
} from "lucide-react";
import { africaCountries, CountryProfile, RegionHub } from "./data/africaData";
import { InvestmentOpportunity } from "./data/tunisiaData";
import AfricaMap from "./components/AfricaMap";
import DashboardCharts from "./components/DashboardCharts";
import ChatAssistant from "./components/ChatAssistant";
import BusinessPlanView from "./components/BusinessPlanView";
import Auth from "./components/Auth";
import InvestmentReportView from "./components/InvestmentReportView";
import afrimapLogo from "./assets/logo.jpg";

export default function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("invest_token"));
  const [isAuthVerifying, setIsAuthVerifying] = useState<boolean>(true);

  // Wizard Result Sub-tab
  const [wizardResultSubTab, setWizardResultSubTab] = useState<"projects" | "report">("projects");

  // Session verification hook
  useEffect(() => {
    const verifySession = async () => {
      const savedToken = localStorage.getItem("invest_token");
      if (!savedToken) {
        setIsAuthenticated(false);
        setIsAuthVerifying(false);
        return;
      }
      try {
        const response = await fetch("/api/auth/me", {
          headers: {
            "Authorization": `Bearer ${savedToken}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data.user);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("invest_token");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Session verification error:", error);
      } finally {
        setIsAuthVerifying(false);
      }
    };
    verifySession();
  }, [token]);

  const handleLogout = async () => {
    try {
      const savedToken = localStorage.getItem("invest_token");
      if (savedToken) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${savedToken}`
          }
        });
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("invest_token");
      setToken(null);
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  };

  // Navigation Tabs: 'landing' | 'map' | 'wizard' | 'dashboard'
  const [activeTab, setActiveTab] = useState<"landing" | "map" | "wizard" | "dashboard">("landing");
  
  // Active selected African country profile
  const [selectedCountry, setSelectedCountry] = useState<CountryProfile>(
    africaCountries.find(c => c.id === "tunisia") || africaCountries[0]
  );

  // Selected hub/region within the country
  const [selectedHub, setSelectedHub] = useState<RegionHub | null>(null);

  // Chat Context for geographic exploration
  const [chatContext, setChatContext] = useState<{
    country: string;
    region?: string;
    city?: string;
    resource?: string;
    category?: string;
  } | null>(null);

  const handleMapRegionSelect = (hub: RegionHub) => {
    setSelectedHub(hub);
    setChatContext({
      country: selectedCountry.name,
      region: hub.name,
      category: hub.region
    });
  };

  const handleMapCitySelect = (city: any) => {
    const gov = selectedCountry.hubs.find(h => h.id === city.governorateId);
    setChatContext({
      country: selectedCountry.name,
      region: gov ? gov.name : undefined,
      city: city.name
    });
    setIsChatOpen(true);
  };

  const handleMapResourceSelect = (res: any) => {
    const gov = selectedCountry.hubs.find(h => h.id === res.governorateId || h.name.toLowerCase().includes(res.governorateId.toLowerCase()));
    setChatContext({
      country: selectedCountry.name,
      region: gov ? gov.name : undefined,
      resource: res.name,
      category: res.category
    });
    setIsChatOpen(true);
  };

  // Sync selectedHub to the country's first hub when the selectedCountry changes
  useEffect(() => {
    if (selectedCountry && selectedCountry.hubs.length > 0) {
      setSelectedHub(selectedCountry.hubs[0]);
    } else {
      setSelectedHub(null);
    }
  }, [selectedCountry]);
  
  // User bookmarks (saved projects)
  const [bookmarks, setBookmarks] = useState<InvestmentOpportunity[]>([]);
  
  // Historical recommendations run
  const [recHistory, setRecHistory] = useState<any[]>([]);

  // Wizard State
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardChoices, setWizardChoices] = useState({
    budget: "$150,000 - $300,000 USD",
    region: "Coastal Regions (Sousse, Nabeul, Sfax)",
    sector: "IT & Tech",
    companySize: "Medium Sized",
    employees: "11-50 Employees",
    goals: "Export-oriented Expansion",
    riskTolerance: "Medium Risk"
  });

  // Recommendation outcome
  const [recResult, setRecResult] = useState<any | null>(null);
  const [isGeneratingRec, setIsGeneratingRec] = useState(false);
  const [recError, setRecError] = useState<string | null>(null);

  // Business plan states
  const [activePlan, setActivePlan] = useState<any | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [planProjectName, setPlanProjectName] = useState("");

  // Chat window open status (default closed floating)
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem("tunisia_invest_bookmarks");
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      } else {
        // Hydrate with some initial samples to make it look ready
        setBookmarks([selectedCountry.sampleOpportunities[0], selectedCountry.sampleOpportunities[1]]);
      }

      const savedHistory = localStorage.getItem("tunisia_invest_history");
      if (savedHistory) {
        setRecHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error("Localstorage loading error:", e);
    }
  }, []);

  // Save Bookmarks Helper
  const toggleBookmark = (opportunity: InvestmentOpportunity) => {
    let updated: InvestmentOpportunity[] = [];
    const exists = bookmarks.some(b => b.id === opportunity.id);
    
    if (exists) {
      updated = bookmarks.filter(b => b.id !== opportunity.id);
    } else {
      updated = [...bookmarks, opportunity];
    }
    
    setBookmarks(updated);
    localStorage.setItem("tunisia_invest_bookmarks", JSON.stringify(updated));
  };

  const removeBookmarkById = (id: string) => {
    const updated = bookmarks.filter(b => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem("tunisia_invest_bookmarks", JSON.stringify(updated));
  };

  // Run AI Recommendation API
  const handleWizardSubmit = async () => {
    setIsGeneratingRec(true);
    setRecError(null);
    setRecResult(null);

    try {
      const response = await fetch("/api/gemini/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...wizardChoices,
          country: selectedCountry.name
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to call AI model");
      }

      const data = await response.json();
      setRecResult(data);
      setWizardResultSubTab("projects");
      
      // Save to recommendation history
      const newHistoryItem = {
        id: "rec_" + Date.now(),
        date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        choices: { ...wizardChoices },
        result: data
      };
      
      const updatedHistory = [newHistoryItem, ...recHistory];
      setRecHistory(updatedHistory);
      localStorage.setItem("tunisia_invest_history", JSON.stringify(updatedHistory));
      
      // Advance step to result display (Step 8)
      setWizardStep(8);
    } catch (err: any) {
      console.error("Recommendation submission error:", err);
      setRecError(err.message || "Could not retrieve investment recommendations. Please make sure GEMINI_API_KEY is configured.");
    } finally {
      setIsGeneratingRec(false);
    }
  };

  // Run AI Business Plan API
  const handleGenerateBusinessPlan = async (project: any) => {
    setIsGeneratingPlan(true);
    setPlanProjectName(project.projectName);
    setActivePlan(null);

    try {
      const response = await fetch("/api/gemini/business-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          project,
          country: selectedCountry.name
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to generate business plan");
      }

      const data = await response.json();
      setActivePlan(data);
    } catch (err: any) {
      console.error("Business Plan API error:", err);
      alert(err.message || "Failed to generate AI Business Plan. Check connection or credentials.");
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  if (isAuthVerifying) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center font-sans gap-4">
        <Loader2 className="h-10 w-10 text-emerald-500 animate-spin" />
        <span className="text-xs font-mono tracking-wider text-slate-400 font-bold uppercase">Verifying Investor Session...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Auth onLoginSuccess={(token, user) => {
      setToken(token);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-emerald-500/10 via-emerald-900/5 to-transparent pointer-events-none z-0"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* TOP HEADER */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("landing")}>
            <img 
              src={afrimapLogo} 
              alt="Afrimap Logo" 
              className="h-10 w-10 rounded-xl object-cover border border-slate-800 shadow-lg shadow-emerald-500/10"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://ai.studio/build/favicon.ico";
              }}
            />
            <div>
              <h1 className="text-sm font-black tracking-wider text-slate-100 uppercase">
                AFRI<span className="text-emerald-400">MAP</span>
              </h1>
              <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Decision Engine</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
            <button
              onClick={() => setActiveTab("landing")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition duration-150 cursor-pointer ${
                activeTab === "landing" ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/15" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("map")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition duration-150 cursor-pointer ${
                activeTab === "map" ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/15" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Governorate Map
            </button>
            <button
              onClick={() => setActiveTab("wizard")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition duration-150 cursor-pointer ${
                activeTab === "wizard" ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/15" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              AI Recommendation
            </button>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition duration-150 cursor-pointer ${
                activeTab === "dashboard" ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/15" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Investor Dashboard
            </button>
          </nav>

          {/* Call to action & Chat bubble */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="relative p-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-slate-300 hover:text-emerald-400 transition cursor-pointer"
              title="AI Investment Assistant"
            >
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <Activity className="h-4 w-4" />
            </button>
            <button
              onClick={() => { setWizardStep(1); setActiveTab("wizard"); }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/10 transition cursor-pointer hidden sm:block"
            >
              Start AI Wizard
            </button>
            <div className="flex items-center gap-2.5 border-l border-slate-800 pl-3">
              <div className="hidden lg:flex flex-col items-end text-right">
                <span className="text-xs font-bold text-slate-250">{currentUser?.fullName}</span>
                <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest">Accredited</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 border border-slate-800 hover:border-red-900/40 hover:bg-red-950/10 text-slate-400 hover:text-red-400 text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* COUNTRY FOCUS BAR */}
      <div className="bg-slate-950 border-b border-slate-900 py-3.5 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">Active Continental Focus:</span>
            <span className="text-xs font-semibold text-emerald-400">{selectedCountry.region} Gateway</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {africaCountries.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCountry(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                  selectedCountry.id === c.id 
                    ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 shadow-sm font-bold" 
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                <span>{c.flag}</span>
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE TAB BAR */}
      <div className="md:hidden border-b border-slate-900 bg-slate-950 flex items-center justify-around py-2.5 px-1.5">
        <button
          onClick={() => setActiveTab("landing")}
          className={`text-[10px] font-semibold flex flex-col items-center gap-1 ${activeTab === "landing" ? "text-emerald-400 font-bold" : "text-slate-500"}`}
        >
          <Compass className="h-4 w-4" />
          Overview
        </button>
        <button
          onClick={() => setActiveTab("map")}
          className={`text-[10px] font-semibold flex flex-col items-center gap-1 ${activeTab === "map" ? "text-emerald-400 font-bold" : "text-slate-500"}`}
        >
          <MapPin className="h-4 w-4" />
          Map
        </button>
        <button
          onClick={() => setActiveTab("wizard")}
          className={`text-[10px] font-semibold flex flex-col items-center gap-1 ${activeTab === "wizard" ? "text-emerald-400 font-bold" : "text-slate-500"}`}
        >
          <Sparkles className="h-4 w-4" />
          AI Wizard
        </button>
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`text-[10px] font-semibold flex flex-col items-center gap-1 ${activeTab === "dashboard" ? "text-emerald-400 font-bold" : "text-slate-500"}`}
        >
          <Award className="h-4 w-4" />
          Dashboard
        </button>
      </div>

      {/* CORE WRAPPER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">

        {/* ========================================== */}
        {/* VIEW 1: LANDING PAGE & COUNTRY OVERVIEW */}
        {/* ========================================== */}
        {activeTab === "landing" && (
          <div className="space-y-16 animate-fade-in">
            
            {/* HERO SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column Content */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span className="text-[10px] uppercase font-bold tracking-wider font-mono">FDI Decision Platform v2.5</span>
                </div>
                
                <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
                  Discover the Best Investment Opportunities in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Tunisia</span>
                </h1>
                
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-lg">
                  AI-powered investment recommendations based on your budget, region, industry, and business goals. Designed for venture capitalists, multinational enterprises, and local founders.
                </p>

                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <button
                    onClick={() => setActiveTab("map")}
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 text-xs font-bold rounded-xl transition duration-150 flex items-center gap-2 cursor-pointer"
                  >
                    Explore Opportunities
                    <ArrowRight className="h-4 w-4 text-emerald-400" />
                  </button>
                  <button
                    onClick={() => { setWizardStep(1); setActiveTab("wizard"); }}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-extrabold rounded-xl shadow-xl shadow-emerald-500/10 transition duration-150 flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="h-4 w-4" />
                    Start AI Recommendation
                  </button>
                </div>

                <div className="flex items-center gap-6 pt-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Double-Tax Agreements</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Startup Act Exemptions</span>
                  </div>
                </div>
              </div>

              {/* Right Column Abstract Illustration / Map */}
              <div className="lg:col-span-6 relative flex justify-center text-slate-800">
                <div className="relative w-full max-w-[420px] bg-white border border-slate-200 p-8 rounded-3xl shadow-md overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">Regional Key Resource Abundance</span>
                      <span className="text-xs font-bold text-emerald-600 font-mono">Common Assets</span>
                    </div>

                    {selectedCountry.hubs.slice(0, 3).map((hub) => (
                      <div key={hub.id} className="space-y-1 pb-1">
                        <span className="text-xs font-bold text-slate-800">{hub.name}</span>
                        <div className="flex flex-wrap gap-1">
                          {hub.resources.slice(0, 2).map((res, i) => (
                            <span key={i} className="text-[9px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100 font-medium">
                              {res}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                      <div className="text-center">
                        <span className="block text-sm font-black text-slate-900 font-mono">{selectedCountry.stats.inflation}</span>
                        <span className="text-[9px] text-slate-500 uppercase tracking-wider font-mono">Inflation</span>
                      </div>
                      <div className="text-center">
                        <span className="block text-sm font-black text-slate-900 font-mono">{selectedCountry.stats.gdpGrowth}</span>
                        <span className="text-[9px] text-slate-500 uppercase tracking-wider font-mono">GDP Growth</span>
                      </div>
                      <div className="text-center">
                        <span className="block text-sm font-black text-slate-900 font-mono">{selectedCountry.stats.foreignInvestmentFlow}</span>
                        <span className="text-[9px] text-slate-500 uppercase tracking-wider font-mono">FDI Flow</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* KEY COUNTRY STATISTICS - DASHBOARD */}
            <div>
              <div className="text-center max-w-xl mx-auto mb-10">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">MACROECONOMIC FOUNDATION</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-1">{selectedCountry.name} Country Dashboard</h2>
                <p className="text-xs text-slate-400 mt-2">Latest verified governmental and international trade metrics</p>
              </div>

              {/* Stats Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-800">
                
                {/* Population */}
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider">Population</span>
                    <Users className="h-4.5 w-4.5 text-blue-500" />
                  </div>
                  <span className="block text-lg sm:text-xl font-bold text-slate-900">{selectedCountry.stats.population}</span>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-1 inline-block">Active Demographic</span>
                </div>

                {/* GDP */}
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider">GDP Nominal</span>
                    <Coins className="h-4.5 w-4.5 text-emerald-500" />
                  </div>
                  <span className="block text-lg sm:text-xl font-bold text-slate-900">{selectedCountry.stats.gdp}</span>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-1 inline-block">{selectedCountry.stats.gdpGrowth} Growth</span>
                </div>

                {/* Inflation */}
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider">Inflation</span>
                    <TrendingUp className="h-4.5 w-4.5 text-amber-500" />
                  </div>
                  <span className="block text-lg sm:text-xl font-bold text-slate-900">{selectedCountry.stats.inflation}</span>
                  <span className="text-[10px] text-slate-500 mt-1 inline-block font-medium">Annual Consumer Index</span>
                </div>

                {/* Workforce */}
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider">Workforce</span>
                    <Award className="h-4.5 w-4.5 text-purple-500" />
                  </div>
                  <span className="block text-lg sm:text-xl font-bold text-slate-900">{selectedCountry.stats.workforce}</span>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-1 inline-block">{selectedCountry.stats.literacyRate} Youth Literacy</span>
                </div>

              </div>

              {/* Extra Stats Detailed Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-slate-800">
                
                {/* Trade & Balance */}
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 font-mono">External Trade Position</h4>
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Total Exports</span>
                      <span className="font-bold text-emerald-600 font-mono">{selectedCountry.stats.exports}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Total Imports</span>
                      <span className="font-bold text-slate-800 font-mono">{selectedCountry.stats.imports}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">FDI Flow</span>
                      <span className="font-bold text-emerald-600 font-mono">{selectedCountry.stats.foreignInvestmentFlow}</span>
                    </div>
                  </div>
                </div>

                {/* Natural Resources */}
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 font-mono">Key Natural Assets</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCountry.stats.naturalResources.map((res, i) => (
                      <span key={i} className="text-[10px] bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-xl font-medium">
                        {res}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Strategic Industries */}
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 font-mono">National Priority Sectors</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCountry.stats.mainIndustries.slice(0, 5).map((ind, i) => (
                      <span key={i} className="text-[10px] bg-emerald-50 border border-emerald-100 text-emerald-700 px-2.5 py-1 rounded-xl font-medium">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Economic Recharts Plots */}
              <DashboardCharts countryName={selectedCountry.name} />

            </div>

            {/* CALL TO WORK FOR HUBS */}
            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-slate-800">
              <div className="max-w-xl">
                <h3 className="text-xl font-bold text-slate-900">Looking for specific regional assets?</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {selectedCountry.name} contains {selectedCountry.hubs.length} key investment hubs offering specific economic privileges, industrial parks, and localized resources. Click below to explore our interactive {selectedCountry.name} regional map.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("map")}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition duration-150 shrink-0 cursor-pointer shadow-md shadow-emerald-500/10"
              >
                Launch Interactive Map
              </button>
            </div>

          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 2: INTERACTIVE MAP EXPLORER */}
        {/* ========================================== */}
        {activeTab === "map" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">GEOGRAPHIC INTEL</span>
                <h2 className="text-2xl font-black text-slate-100">{selectedCountry.name} Hub Readiness Explorer</h2>
                <p className="text-xs text-slate-400">Analyze raw logistics, industrial zones, and investment parameters across {selectedCountry.name}'s key economic centers</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Direct Pan-African FDI Database</span>
              </div>
            </div>

            {/* Map Visual Component */}
            <AfricaMap 
              onSelectHub={handleMapRegionSelect} 
              selectedHub={selectedHub} 
              selectedCountry={selectedCountry}
              onSelectCity={handleMapCitySelect}
              onSelectResource={handleMapResourceSelect}
            />

            {/* Recommended Opportunity Previews based on Selected Hub */}
            {selectedHub && (
              <div className="bg-white border border-slate-200 p-6 rounded-3xl mt-8 text-slate-850 shadow-xs">
                <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-1.5 uppercase font-mono tracking-wider">
                  <Building2 className="h-4.5 w-4.5 text-emerald-500" />
                  Recommended Concessional Ventures for {selectedHub.name} ({selectedCountry.name})
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selectedCountry.sampleOpportunities
                    .filter(opp => opp.suitableRegion.toLowerCase().includes(selectedHub.id.toLowerCase()) || opp.suitableRegion.toLowerCase().includes(selectedHub.name.toLowerCase().split(" ")[0]))
                    .slice(0, 3)
                    .map((opportunity) => {
                      const isBookmarked = bookmarks.some(b => b.id === opportunity.id);
                      return (
                        <div key={opportunity.id} className="bg-slate-50 border border-slate-200/70 p-5 rounded-2xl flex flex-col justify-between hover:border-emerald-500 hover:shadow-xs transition duration-150">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="text-[10px] bg-slate-200/70 text-slate-600 px-2 py-0.5 rounded font-mono uppercase font-medium">
                                {opportunity.category}
                              </span>
                              <span className="text-xs font-bold text-emerald-600 font-mono">{opportunity.expectedRoi} ROI</span>
                            </div>
                            <h5 className="text-xs font-bold text-slate-900 mb-1.5 line-clamp-1">{opportunity.projectName}</h5>
                            <p className="text-[11px] text-slate-550 line-clamp-3 mb-4 leading-relaxed">{opportunity.description}</p>
                          </div>
                          
                          <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 text-[10px]">
                            <button
                              onClick={() => toggleBookmark(opportunity)}
                              className="text-slate-500 hover:text-emerald-600 font-medium flex items-center gap-1 cursor-pointer"
                            >
                              <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? "fill-emerald-500 text-emerald-500" : ""}`} />
                              <span>{isBookmarked ? "Saved" : "Save Plan"}</span>
                            </button>
                            <button
                              onClick={() => handleGenerateBusinessPlan(opportunity)}
                              className="text-emerald-600 hover:text-emerald-500 font-bold flex items-center gap-0.5 cursor-pointer"
                            >
                              Get Business Plan
                              <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                  {/* If no opportunities map directly to this hub, display general ones */}
                  {selectedCountry.sampleOpportunities
                    .filter(opp => opp.suitableRegion.toLowerCase().includes(selectedHub.id.toLowerCase()) || opp.suitableRegion.toLowerCase().includes(selectedHub.name.toLowerCase().split(" ")[0]))
                    .length === 0 && (
                      <div className="col-span-3 text-center py-6 text-slate-500 text-xs">
                        No direct project match in default database. Launch the <span className="text-emerald-400 underline cursor-pointer" onClick={() => setActiveTab("wizard")}>AI Recommendation Wizard</span> to dynamically synthesize customized business plans for {selectedHub.name}!
                      </div>
                    )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 3: AI RECOMMENDATION WIZARD */}
        {/* ========================================== */}
        {activeTab === "wizard" && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            
            <div className="text-center">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">AI CONCIERGE ENGINE</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-1">Investment Advisor Wizard</h2>
              <p className="text-xs text-slate-400 mt-2">Generate tailored, investor-grade enterprise reports using multi-parameter inputs</p>
            </div>

            {/* Progress bar */}
            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono mb-2">
                <span>Step {wizardStep} of 7</span>
                <span className="text-emerald-600 font-bold">{Math.round((wizardStep / 7) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 h-full transition-all duration-300"
                  style={{ width: `${(wizardStep / 7) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Error messaging */}
            {recError && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-red-700 shadow-xs">
                <Shield className="h-5 w-5 shrink-0 text-red-500" />
                <div>
                  <h5 className="font-bold">Model Interface Failure</h5>
                  <p className="mt-1 leading-relaxed">{recError}</p>
                </div>
              </div>
            )}

            {/* WIZARD CARD WRAPPER */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative text-slate-800">
              
              {/* Step 1: Budget */}
              {wizardStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">Step 1: Define Investment Capital (USD)</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Specify the target startup equity or development capital to configure feasibility scoring.</p>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {[
                      "$50,000 - $150,000 USD",
                      "$150,000 - $300,000 USD",
                      "$300,000 - $1,000,000 USD",
                      "$1,000,000+ USD (MNE/Enterprise)"
                    ].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setWizardChoices(prev => ({ ...prev, budget: opt }))}
                        className={`p-4 rounded-2xl text-xs font-semibold border text-left transition duration-150 cursor-pointer ${
                          wizardChoices.budget === opt 
                            ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm" 
                            : "bg-slate-50 border-slate-200/80 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Region */}
              {wizardStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">Step 2: Geostrategic Region Focus</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Choose regional hubs based on logistics (ports/airports), desert resources, or metropolitan density.</p>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {[
                      "Any Region (Tunisia-Wide)",
                      "Greater Tunis Metro Area (Ariana, Tunis, Ben Arous)",
                      "Coastal Regions (Sousse, Nabeul, Sfax)",
                      "Southern Desert Zones (Tozeur, Tataouine, Gafsa)"
                    ].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setWizardChoices(prev => ({ ...prev, region: opt }))}
                        className={`p-4 rounded-2xl text-xs font-semibold border text-left transition duration-150 cursor-pointer ${
                          wizardChoices.region === opt 
                            ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm" 
                            : "bg-slate-50 border-slate-200/80 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Sector */}
              {wizardStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">Step 3: Industry Business Sector</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Align with Tunisia's primary strategic sectors offering specialized FDI tax concessions.</p>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {[
                      "Agriculture & Agri-food",
                      "Manufacturing & Industry",
                      "IT & Tech",
                      "Renewable Energy",
                      "Tourism & Hospitality",
                      "Services"
                    ].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setWizardChoices(prev => ({ ...prev, sector: opt }))}
                        className={`p-4 rounded-2xl text-xs font-semibold border text-left transition duration-150 cursor-pointer ${
                          wizardChoices.sector === opt 
                            ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm" 
                            : "bg-slate-50 border-slate-200/80 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Company Size */}
              {wizardStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">Step 4: Target Enterprise Size</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Determine incorporation legal limits and operational scales.</p>
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {[
                      "Micro Startup",
                      "Medium Sized",
                      "Large Scale Corporation"
                    ].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setWizardChoices(prev => ({ ...prev, companySize: opt }))}
                        className={`p-4 rounded-2xl text-xs font-semibold border text-left transition duration-150 cursor-pointer ${
                          wizardChoices.companySize === opt 
                            ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm" 
                            : "bg-slate-50 border-slate-200/80 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Employees */}
              {wizardStep === 5 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">Step 5: Planned Labor Force Count</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Assess regional employment support requirements and workforce planning parameters.</p>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {[
                      "1-10 Employees",
                      "11-50 Employees",
                      "51-200 Employees",
                      "200+ Employees"
                    ].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setWizardChoices(prev => ({ ...prev, employees: opt }))}
                        className={`p-4 rounded-2xl text-xs font-semibold border text-left transition duration-150 cursor-pointer ${
                          wizardChoices.employees === opt 
                            ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm" 
                            : "bg-slate-50 border-slate-200/80 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 6: Investment Goals */}
              {wizardStep === 6 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">Step 6: Priority Investment Goal</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Direct the recommendation output to target organic growth, export scale, or green impact.</p>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {[
                      "Export-oriented Expansion",
                      "Local Market Penetration",
                      "High-tech Innovation Licensing",
                      "Sustainable Ecological Impact"
                    ].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setWizardChoices(prev => ({ ...prev, goals: opt }))}
                        className={`p-4 rounded-2xl text-xs font-semibold border text-left transition duration-150 cursor-pointer ${
                          wizardChoices.goals === opt 
                            ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm" 
                            : "bg-slate-50 border-slate-200/80 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 7: Risk Tolerance */}
              {wizardStep === 7 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">Step 7: Risk Profile Appetite</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Calibrate payback speeds against volatility indexes in the macroeconomic context.</p>
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {[
                      "Low Risk",
                      "Medium Risk",
                      "High Risk"
                    ].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setWizardChoices(prev => ({ ...prev, riskTolerance: opt }))}
                        className={`p-4 rounded-2xl text-xs font-semibold border text-left transition duration-150 cursor-pointer ${
                          wizardChoices.riskTolerance === opt 
                            ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm" 
                            : "bg-slate-50 border-slate-200/80 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP INTERACTION BUTTONS */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                {wizardStep > 1 && (
                  <button
                    onClick={() => setWizardStep(prev => prev - 1)}
                    className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl transition cursor-pointer"
                  >
                    Back Step
                  </button>
                )}
                <div className="ml-auto">
                  {wizardStep < 7 ? (
                    <button
                      onClick={() => setWizardStep(prev => prev + 1)}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-1 cursor-pointer shadow-xs"
                    >
                      Next Parameter
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleWizardSubmit}
                      disabled={isGeneratingRec}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 disabled:from-slate-200 disabled:to-slate-200 text-white text-xs font-extrabold rounded-xl shadow-md shadow-emerald-500/15 transition flex items-center gap-2 cursor-pointer"
                    >
                      {isGeneratingRec ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-emerald-300" />
                          Analyzing Concession Feasibility...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 text-emerald-100" />
                          Synthesize Investment Plan
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* Displaying Choices Preview */}
            <div className="bg-white/10 border border-slate-200/10 p-4 rounded-2xl">
              <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400 font-mono">Current Query Payload</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2 text-[10px] text-slate-350">
                <div>Sector: <span className="text-slate-100 font-semibold">{wizardChoices.sector}</span></div>
                <div>Budget: <span className="text-slate-100 font-semibold">{wizardChoices.budget}</span></div>
                <div>Goal: <span className="text-slate-100 font-semibold">{wizardChoices.goals}</span></div>
                <div>Risk: <span className="text-slate-100 font-semibold">{wizardChoices.riskTolerance}</span></div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================== */}
        {/* RECOMMENDATION RESULTS BLOCK (STEP 8 OUTCOME) */}
        {/* ========================================== */}
        {activeTab === "wizard" && wizardStep === 8 && recResult && (
          <div className="space-y-12 animate-fade-in pt-6">
            
            {/* Banner block */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-800">
              <div>
                <div className="flex items-center gap-2 text-emerald-600 text-xs font-mono font-bold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  ANALYSIS GENERATED SUCCESSFULLY
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">Your Tunisia Investment Report is Ready</h3>
                <p className="text-xs text-slate-550 mt-1">Tailored recommendations matching {wizardChoices.budget} budget in the {wizardChoices.sector} sector.</p>
              </div>
              <button
                onClick={() => setWizardStep(1)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-semibold text-white rounded-xl transition cursor-pointer"
              >
                Run Another Profile
              </button>
            </div>

            {/* Sub-tab Navigation */}
            <div className="flex border-b border-slate-800 gap-1.5 p-1 rounded-xl bg-slate-900/40 w-fit">
              <button
                onClick={() => setWizardResultSubTab("projects")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition duration-150 cursor-pointer ${
                  wizardResultSubTab === "projects"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/15"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Recommended Projects
              </button>
              <button
                onClick={() => setWizardResultSubTab("report")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition duration-150 cursor-pointer ${
                  wizardResultSubTab === "report"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/15"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Full Investment Report
              </button>
            </div>

            {wizardResultSubTab === "projects" ? (
              <div className="space-y-12">
                {/* General AI Explanation Essay */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm text-slate-800">
                  <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider font-mono mb-3 border-b border-slate-100 pb-2">
                    Strategic Investment Explanation
                  </h3>
                  <p className="text-xs text-slate-650 leading-relaxed whitespace-pre-wrap pl-3 border-l-2 border-emerald-500">
                    {recResult.aiExplanation}
                  </p>
                </div>

                {/* THREE BEST OPPORTUNITIES */}
                <div>
                  <div className="text-center mb-8">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest font-mono">COMPARATIVE ASSESSMENT</span>
                    <h3 className="text-2xl font-black text-slate-100 mt-1">Recommended Venture Portfolios</h3>
                    <p className="text-xs text-slate-400">Synthesized opportunities optimized for maximum regional compatibility and return thresholds</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recResult.opportunities.map((opp: any, idx: number) => {
                      const isBookmarked = bookmarks.some(b => b.projectName === opp.projectName);
                      return (
                        <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:border-emerald-500 transition duration-150 text-slate-800">
                          <div>
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <span className="text-[9px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-mono uppercase font-bold border border-emerald-200/50">
                                  Rank {idx + 1}
                                </span>
                                <h4 className="text-sm font-bold text-slate-900 mt-1.5 line-clamp-2">
                                  {opp.projectName}
                                </h4>
                              </div>
                              <div className="bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-250 text-center font-mono">
                                <span className="block text-[8px] uppercase tracking-wider text-slate-500">Match</span>
                                <span className="text-xs font-bold text-emerald-600">{opp.score}%</span>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-4">
                              {opp.description}
                            </p>

                            {/* KPI Grid */}
                            <div className="grid grid-cols-2 gap-3 mb-6 text-[11px] border-y border-slate-100 py-4">
                              <div>
                                <span className="text-slate-500 block">Startup Cost:</span>
                                <span className="font-semibold font-mono text-slate-800">{opp.startupCost}</span>
                              </div>
                              <div>
                                <span className="text-slate-500 block">Projected ROI:</span>
                                <span className="font-semibold font-mono text-emerald-600">{opp.expectedRoi}</span>
                              </div>
                              <div>
                                <span className="text-slate-500 block">Annual Profit:</span>
                                <span className="font-semibold font-mono text-slate-800">{opp.annualProfit}</span>
                              </div>
                              <div>
                                <span className="text-slate-500 block">Suitable Region:</span>
                                <span className="font-semibold text-slate-800 line-clamp-1">{opp.suitableRegion}</span>
                              </div>
                            </div>

                            {/* Advantage list */}
                            <div className="space-y-1.5 mb-6">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Core Advantage</span>
                              <p className="text-xs text-slate-650 flex items-start gap-1.5 leading-relaxed">
                                <span className="text-emerald-500 font-bold mt-0.5">•</span>
                                <span>{opp.advantages[0]}</span>
                              </p>
                            </div>
                          </div>

                          {/* Call to action */}
                          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                            <button
                              onClick={() => toggleBookmark(opp)}
                              className="text-slate-500 hover:text-emerald-600 font-medium flex items-center gap-1 cursor-pointer"
                            >
                              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-emerald-500 text-emerald-500" : ""}`} />
                              <span>{isBookmarked ? "Saved" : "Save Choice"}</span>
                            </button>
                            <button
                              onClick={() => handleGenerateBusinessPlan(opp)}
                              className="text-emerald-600 hover:text-emerald-500 font-bold flex items-center gap-0.5 cursor-pointer"
                            >
                              Synthesize Business Plan
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <InvestmentReportView report={recResult.report} preferences={wizardChoices} onBack={() => setWizardResultSubTab("projects")} />
            )}

          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 4: INVESTOR DASHBOARD */}
        {/* ========================================== */}
        {activeTab === "dashboard" && (
          <div className="space-y-10 animate-fade-in">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">WORKSPACE</span>
                <h2 className="text-2xl font-black text-slate-100">Investor Dashboard</h2>
                <p className="text-xs text-slate-400">Manage saved ventures, explore profile histories, and download generated PDF business plans</p>
              </div>
              <div className="text-xs text-slate-500 font-mono">
                System Time (UTC): 2026-07-07
              </div>
            </div>

            {/* Dashboard Workspace Hub */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Bookmarked Opportunities */}
              <div className="lg:col-span-8 space-y-6">
                
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-6">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
                      <Heart className="h-4 w-4 text-emerald-500" />
                      Bookmarked Investment Opportunities ({bookmarks.length})
                    </h3>
                    <span className="text-[10px] text-slate-500 font-mono">Persisted locally</span>
                  </div>

                  {bookmarks.length > 0 ? (
                    <div className="space-y-4">
                      {bookmarks.map((opp) => (
                        <div key={opp.id || opp.projectName} className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1.5 max-w-xl text-slate-800">
                            <div className="flex items-center gap-2.5">
                              <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200/50 px-2 py-0.5 rounded-md font-mono uppercase font-bold">
                                {opp.category}
                              </span>
                              <span className="text-xs font-bold text-emerald-600 font-mono">{opp.expectedRoi} ROI</span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900">{opp.projectName}</h4>
                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{opp.description}</p>
                            <div className="flex items-center gap-4 text-[10px] text-slate-500 pt-1 font-mono">
                              <span>Cost: {opp.startupCost}</span>
                              <span>•</span>
                              <span>Risk: {opp.riskLevel}</span>
                              <span>•</span>
                              <span>Region: {opp.suitableRegion}</span>
                            </div>
                          </div>

                          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                            <button
                              onClick={() => removeBookmarkById(opp.id || opp.projectName)}
                              className="p-2 text-slate-400 hover:text-red-500 transition rounded-lg hover:bg-slate-100 cursor-pointer"
                              title="Remove Bookmark"
                            >
                              <HeartOff className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleGenerateBusinessPlan(opp)}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold rounded-xl transition cursor-pointer shadow-xs"
                            >
                              Business Plan
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-slate-500 text-xs flex flex-col items-center justify-center gap-3">
                      <Heart className="h-8 w-8 text-slate-300" />
                      <span className="font-semibold text-slate-700">No saved investments yet.</span>
                      <p className="max-w-xs text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                        Browse the <span className="text-emerald-600 underline cursor-pointer" onClick={() => setActiveTab("map")}>Governorate Map</span> or run the <span className="text-emerald-600 underline cursor-pointer" onClick={() => setActiveTab("wizard")}>AI Recommendation engine</span> to find premium ventures.
                      </p>
                    </div>
                  )}

                </div>

              </div>

              {/* Right Column: Query Recommendation History */}
              <div className="lg:col-span-4 space-y-6">
                
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
                      <History className="h-4 w-4 text-emerald-500" />
                      AI Query History
                    </h3>
                    <span className="text-[10px] text-slate-500 font-mono">{recHistory.length} Runs</span>
                  </div>

                  {recHistory.length > 0 ? (
                    <div className="space-y-3.5 max-h-[360px] overflow-y-auto pr-1">
                      {recHistory.map((hist) => (
                        <div 
                          key={hist.id} 
                          onClick={() => { setRecResult(hist.result); setWizardStep(8); setActiveTab("wizard"); }}
                          className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 hover:border-slate-300 rounded-xl transition duration-100 cursor-pointer text-xs"
                        >
                          <div className="flex items-center justify-between gap-2 text-[10px] text-slate-500 font-mono mb-1.5">
                            <span>{hist.date}</span>
                            <span className="text-emerald-600 font-bold">{hist.choices.sector}</span>
                          </div>
                          <p className="text-[11px] text-slate-800 font-semibold line-clamp-1">Budget: {hist.choices.budget}</p>
                          <span className="text-[9px] text-slate-500 font-mono mt-1 inline-block">Goal: {hist.choices.goals}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500 text-[11px] leading-relaxed">
                      No query history found. Submit your parameters in the AI Recommendation Tab to begin tracking runs.
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>
        )}

      </main>

      {/* FLOAT CHAT TOGGLE BUTTON */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-tr from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white p-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition cursor-pointer flex items-center gap-2 group"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs font-bold max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out whitespace-nowrap">
            Ask FIPA AI
          </span>
        </button>
      )}

      {/* FLOATING CHAT DRAWER */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-[370px] px-4 sm:px-0">
          <ChatAssistant onClose={() => setIsChatOpen(false)} selectedCountry={selectedCountry} chatContext={chatContext} />
        </div>
      )}

      {/* DYNAMIC BUSINESS PLAN MODAL */}
      {isGeneratingPlan && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center max-w-sm w-full shadow-2xl animate-pulse">
            <Loader2 className="h-10 w-10 text-emerald-500 animate-spin mx-auto mb-4" />
            <h4 className="text-sm font-bold text-slate-100">Generating Concessional Business Plan</h4>
            <p className="text-xs text-slate-400 mt-2">
              Our AI is drafting SWOT analysis, 3-year revenue forecasts, and financial budget models for <span className="text-emerald-400 font-bold">{planProjectName}</span>...
            </p>
          </div>
        </div>
      )}

      {activePlan && (
        <BusinessPlanView 
          plan={activePlan} 
          projectName={planProjectName} 
          onClose={() => setActivePlan(null)} 
        />
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950/50 mt-16 text-xs text-slate-500 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
          <div className="flex items-center gap-2">
            <img 
              src={afrimapLogo} 
              alt="Afrimap Mini Logo" 
              className="h-5 w-5 rounded-md object-cover border border-slate-800"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://ai.studio/build/favicon.ico";
              }}
            />
            <span>Tunisia Investment Explorer AI Decision Platform</span>
          </div>
          <div className="flex items-center gap-4 text-[10px]">
            <span>System Health: Live</span>
            <span>•</span>
            <span>FIPA Connected</span>
            <span>•</span>
            <span>System Time (UTC): 2026-07-07</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
