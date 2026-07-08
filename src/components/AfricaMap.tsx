import React, { useState } from "react";
import { CountryProfile, RegionHub } from "../data/africaData";
import { 
  Users, Briefcase, Landmark, Trees, Ship, Plane, GraduationCap, MapPin, 
  Building, Globe, ChevronRight, Anchor, Hotel, Sun, Compass, Cpu, Layers, 
  HelpCircle, Award, ShieldAlert, CheckCircle, FileText, Sparkles
} from "lucide-react";

import tunisiaRegions from "../data/countries/tunisia/regions.json";
import tunisiaCities from "../data/countries/tunisia/cities.json";
import tunisiaResources from "../data/countries/tunisia/resources.json";
import tunisiaDossiers from "../data/countries/tunisia/dossiers.json";

interface AfricaMapProps {
  selectedCountry: CountryProfile;
  onSelectHub: (hub: RegionHub) => void;
  selectedHub: RegionHub | null;
  onSelectCity?: (city: any) => void;
  onSelectResource?: (resource: any) => void;
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Sun": return Sun;
    case "Compass": return Compass;
    case "Trees": return Trees;
    case "Hotel": return Hotel;
    case "Anchor": return Anchor;
    case "Ship": return Ship;
    case "Building": return Building;
    case "Cpu": return Cpu;
    case "Award": return Award;
    default: return HelpCircle;
  }
};

export default function AfricaMap({ 
  selectedCountry, 
  onSelectHub, 
  selectedHub,
  onSelectCity,
  onSelectResource
}: AfricaMapProps) {
  // Map Layer Toggles
  const [showRegions, setShowRegions] = useState(true);
  const [showCities, setShowCities] = useState(true);
  const [showResources, setShowResources] = useState(true);

  // Active hover element states (for tooltips)
  const [hoveredHub, setHoveredHub] = useState<any | null>(null);
  const [hoveredCity, setHoveredCity] = useState<any | null>(null);
  const [hoveredResource, setHoveredResource] = useState<any | null>(null);

  // Detail panel active tab: 'profile' | 'dossier'
  const [activeDetailTab, setActiveDetailTab] = useState<"profile" | "dossier">("profile");

  // Determine SVG viewBox based on the selected country
  const getViewBox = () => {
    if (selectedCountry.id === "tunisia") return "0 0 350 420";
    return "0 0 350 320"; 
  };

  // Get regions color styling (for Tunisia, color based on geographic region for beautiful contrast)
  const getRegionFillColor = (region: string, isSelected: boolean, isHovered: boolean) => {
    if (isSelected) {
      return "fill-emerald-600/50 stroke-emerald-800 stroke-[2]";
    }
    if (isHovered) {
      return "fill-emerald-500/35 stroke-emerald-700 stroke-[1.5]";
    }
    switch (region) {
      case "North":
        return "fill-emerald-500/10 hover:fill-emerald-500/20 stroke-emerald-600/40";
      case "Coast":
        return "fill-blue-500/10 hover:fill-blue-500/20 stroke-blue-600/40";
      case "Center":
        return "fill-amber-500/10 hover:fill-amber-500/20 stroke-amber-600/40";
      case "South":
        return "fill-orange-500/10 hover:fill-orange-500/20 stroke-orange-600/40";
      default:
        return "fill-slate-500/10 hover:fill-slate-500/20 stroke-slate-600/40";
    }
  };

  // Safe type conversion for Tunisia specific hubs from regions.json
  const getTunisiaHubData = (hubId: string) => {
    return tunisiaRegions.find(r => r.id === hubId);
  };

  // Fetch dossier details for currently selected hub (if available)
  const activeDossier = selectedHub ? (tunisiaDossiers as any)[selectedHub.id] : null;

  return (
    <div id="africa-interactive-map" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Interactive Map Visual */}
      <div className="lg:col-span-7 bg-white border border-slate-200 shadow-sm rounded-3xl p-6 relative">
        
        {/* Layer Controls Toolbar */}
        <div className="absolute top-4 left-4 z-10 space-y-2.5">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-emerald-600" />
              {selectedCountry.flag} {selectedCountry.name} Geographic Explorer
            </h3>
            <p className="text-[10px] text-slate-500 mt-1">
              {selectedCountry.id === "tunisia" 
                ? "Interact with governorates, cities, and key resource nodes directly on the GIS grid."
                : "Hover or click nodes to analyze regional investment parameters."}
            </p>
          </div>

          {selectedCountry.id === "tunisia" && (
            <div className="flex flex-wrap items-center gap-2 bg-slate-50 border border-slate-200 p-1.5 rounded-2xl shadow-xs">
              <button
                onClick={() => setShowRegions(!showRegions)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  showRegions ? "bg-emerald-600 text-white" : "bg-white text-slate-700 border border-slate-200"
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Boundaries</span>
              </button>

              <button
                onClick={() => setShowCities(!showCities)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  showCities ? "bg-emerald-600 text-white" : "bg-white text-slate-700 border border-slate-200"
                }`}
              >
                <Building className="h-3.5 w-3.5" />
                <span>Cities</span>
              </button>

              <button
                onClick={() => setShowResources(!showResources)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  showResources ? "bg-emerald-600 text-white" : "bg-white text-slate-700 border border-slate-200"
                }`}
              >
                <Compass className="h-3.5 w-3.5" />
                <span>Resource Markers</span>
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Hover Tooltip */}
        {selectedCountry.id === "tunisia" ? (
          <>
            {hoveredHub && !hoveredCity && !hoveredResource && (
              <div className="absolute top-4 right-4 z-20 bg-white border border-slate-200 p-4 rounded-2xl shadow-xl max-w-xs animate-fade-in text-xs text-slate-800">
                <div className="flex items-center justify-between gap-4 font-bold text-slate-900 border-b border-slate-100 pb-1.5 mb-1.5">
                  <span className="text-sm font-black">{hoveredHub.name}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 font-mono">{hoveredHub.region}</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-2">
                  {hoveredHub.description}
                </p>
                <div className="mt-3 space-y-1 text-[10px] font-mono text-slate-600 border-t border-slate-100 pt-1.5">
                  <div className="flex justify-between">
                    <span>Workforce:</span>
                    <span className="font-bold text-slate-800">{hoveredHub.workforce}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GDP Impact:</span>
                    <span className="font-bold text-emerald-600">{hoveredHub.gdpContribution}</span>
                  </div>
                </div>
              </div>
            )}

            {hoveredCity && (
              <div className="absolute top-4 right-4 z-20 bg-white border border-slate-200 p-4 rounded-2xl shadow-xl max-w-xs animate-fade-in text-xs text-slate-800">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 border-b border-slate-100 pb-1.5 mb-1.5">
                  <Building className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-black">{hoveredCity.name}</span>
                </div>
                <div className="space-y-1 text-[10px] text-slate-600">
                  <span className="block font-semibold text-slate-500 font-mono uppercase tracking-wider text-[8px] mb-1">Local Resource Assets:</span>
                  {hoveredCity.resources.map((r: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[8px] font-mono text-emerald-600 mt-3 font-semibold uppercase">Click to open Chat Assistant with City Context</p>
              </div>
            )}

            {hoveredResource && (
              <div className="absolute top-4 right-4 z-20 bg-white border border-slate-200 p-4 rounded-2xl shadow-xl max-w-xs animate-fade-in text-xs text-slate-800">
                <div className="flex items-center gap-2 font-bold text-slate-900 border-b border-slate-100 pb-1.5 mb-1.5">
                  {React.createElement(getIconComponent(hoveredResource.icon), { className: "h-4.5 w-4.5 text-emerald-600" })}
                  <span className="text-sm font-black">{hoveredResource.name}</span>
                </div>
                <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 font-mono">{hoveredResource.category}</span>
                <p className="text-[10px] text-slate-600 leading-relaxed mt-2 pl-2 border-l-2 border-emerald-500">
                  {hoveredResource.description}
                </p>
                <p className="text-[8px] font-mono text-emerald-600 mt-3 font-semibold uppercase">Click to open Chat Assistant with Resource Context</p>
              </div>
            )}
          </>
        ) : (
          /* Default generic hover panel */
          hoveredHub && (
            <div className="absolute top-4 right-4 z-20 bg-white border border-slate-200 p-4 rounded-2xl shadow-xl max-w-xs animate-fade-in text-xs text-slate-800">
              <div className="flex items-center justify-between gap-4 font-bold text-slate-900">
                <span>{hoveredHub.name}</span>
                <span className="text-emerald-600 font-mono">{hoveredHub.gdpContribution} GDP</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                {hoveredHub.description}
              </div>
              <div className="flex gap-2 mt-2 text-[9px] text-emerald-600 font-semibold font-mono">
                <span>Pop: {hoveredHub.population}</span>
                <span>•</span>
                <span>Zones: {hoveredHub.industrialZones}</span>
              </div>
            </div>
          )
        )}

        {/* Vector SVG Grid Mapping */}
        <div className="w-full flex justify-center py-6 mt-16 sm:mt-12">
          <svg
            viewBox={getViewBox()}
            className="w-full max-w-[340px] h-auto drop-shadow-[0_0_20px_rgba(16,185,129,0.04)]"
          >
            {/* Outline background grid */}
            <defs>
              <pattern id="mapGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(183, 228, 198, 0.15)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mapGrid)" rx="24" />

            {/* TUNISIA FULL VECTOR LAYER */}
            {selectedCountry.id === "tunisia" ? (
              <g id="tunisia-boundaries" className="transition-opacity duration-200">
                {/* 1. Base Boundary Polygons from regions.json */}
                {showRegions && tunisiaRegions.map((reg) => {
                  const correspondingHub = selectedCountry.hubs.find(h => h.id === reg.id) || selectedCountry.hubs[0];
                  const isSelected = selectedHub?.id === reg.id;
                  const isHovered = hoveredHub?.id === reg.id;

                  return (
                    <polygon
                      key={reg.id}
                      points={reg.polygonPoints}
                      className={`transition-all duration-150 cursor-pointer ${getRegionFillColor(reg.region, isSelected, isHovered)}`}
                      onClick={() => onSelectHub(correspondingHub)}
                      onMouseEnter={() => setHoveredHub(reg)}
                      onMouseLeave={() => setHoveredHub(null)}
                    />
                  );
                })}

                {/* 2. Cities Layer overlays */}
                {showCities && tunisiaCities.map((city) => {
                  const isHovered = hoveredCity?.id === city.id;
                  return (
                    <g
                      key={city.id}
                      className="cursor-pointer"
                      onClick={() => onSelectCity?.(city)}
                      onMouseEnter={() => setHoveredCity(city)}
                      onMouseLeave={() => setHoveredCity(null)}
                    >
                      {/* Aura */}
                      <circle
                        cx={city.coordinates.x}
                        cy={city.coordinates.y}
                        r={isHovered ? 8 : 4}
                        className={`fill-amber-500/30 transition-all ${isHovered ? "animate-pulse" : "opacity-0"}`}
                      />
                      {/* Inner Dot */}
                      <circle
                        cx={city.coordinates.x}
                        cy={city.coordinates.y}
                        r={3}
                        className="fill-amber-600 stroke-white stroke-[1]"
                      />
                      {/* Miniature Text Labels */}
                      {isHovered && (
                        <text
                          x={city.coordinates.x}
                          y={city.coordinates.y - 7}
                          className="font-sans font-black text-[7.5px] fill-amber-800 pointer-events-none"
                          textAnchor="middle"
                        >
                          {city.name}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* 3. Resource Markers Layer overlays */}
                {showResources && tunisiaResources.map((res) => {
                  const isHovered = hoveredResource?.id === res.id;
                  const size = isHovered ? 9 : 7;
                  return (
                    <g
                      key={res.id}
                      className="cursor-pointer"
                      onClick={() => onSelectResource?.(res)}
                      onMouseEnter={() => setHoveredResource(res)}
                      onMouseLeave={() => setHoveredResource(null)}
                    >
                      {/* Base Marker Circle */}
                      <circle
                        cx={res.coordinates.x}
                        cy={res.coordinates.y}
                        r={size}
                        className={`fill-emerald-600/80 stroke-white stroke-[1] transition-all ${
                          isHovered ? "scale-125" : ""
                        }`}
                        style={{ transformOrigin: `${res.coordinates.x}px ${res.coordinates.y}px` }}
                      />
                      {/* Tiny symbol in center */}
                      <circle
                        cx={res.coordinates.x}
                        cy={res.coordinates.y}
                        r={size - 4.5}
                        className="fill-white"
                      />
                    </g>
                  );
                })}
              </g>
            ) : (
              /* DEFAULT FALLBACK GENERIC POINT RENDERER (Morocco, Nigeria, etc.) */
              <g id="map-hubs" strokeWidth="1.5">
                {selectedCountry.hubs.map((hub) => {
                  const isSelected = selectedHub?.id === hub.id;
                  const isHovered = hoveredHub?.id === hub.id;
                  const size = isSelected ? 12 : isHovered ? 11 : 9;

                  return (
                    <g
                      key={hub.id}
                      className="cursor-pointer transition-all duration-200"
                      onClick={() => onSelectHub(hub)}
                      onMouseEnter={() => setHoveredHub(hub)}
                      onMouseLeave={() => setHoveredHub(null)}
                    >
                      {/* Selection ring */}
                      {isSelected && (
                        <circle
                          cx={hub.centerCoords.x}
                          cy={hub.centerCoords.y}
                          r={size + 6}
                          className="fill-emerald-500/25 stroke-emerald-400/40 animate-ping"
                        />
                      )}

                      <circle
                        cx={hub.centerCoords.x}
                        cy={hub.centerCoords.y}
                        r={size}
                        className={`transition-all duration-200 fill-emerald-100 hover:fill-emerald-200 stroke-emerald-600 ${
                          isSelected ? "fill-emerald-600 stroke-white scale-110" : ""
                        }`}
                        style={{ transformOrigin: `${hub.centerCoords.x}px ${hub.centerCoords.y}px` }}
                      />

                      {/* Hub Label */}
                      <text
                        x={hub.centerCoords.x}
                        y={hub.centerCoords.y - size - 4}
                        className={`font-sans font-medium text-[8px] pointer-events-none fill-slate-700`}
                        textAnchor="middle"
                      >
                        {hub.name.split("-")[0]}
                      </text>
                    </g>
                  );
                })}
              </g>
            )}
          </svg>
        </div>

        {/* Regions / Categories Legend (Replaces Investment Score Legend) */}
        <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-[9px] text-slate-700 shadow-xs">
          <span className="font-bold text-slate-900 mb-0.5 uppercase tracking-wider text-[8px] font-mono">Geographic Legend</span>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-md bg-emerald-500/20 border border-emerald-600 inline-block"></span>
            <span>North Region (Industrial & Tech Centers)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-md bg-blue-500/20 border border-blue-600 inline-block"></span>
            <span>Coastal Sahel (Tourism & Logistics Portals)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-md bg-amber-500/20 border border-amber-600 inline-block"></span>
            <span>Central Region (Agri & Heavy Mining)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-md bg-orange-500/20 border border-orange-600 inline-block"></span>
            <span>South Sahara (Solar Fields & Gas Wells)</span>
          </div>
          <div className="flex items-center gap-1.5 border-t border-slate-200 pt-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block"></span>
            <span>Metropolitan Cities</span>
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block ml-1"></span>
            <span>Resource Anchors</span>
          </div>
        </div>
      </div>

      {/* Selected Hub Detail Card */}
      <div className="lg:col-span-5 h-full">
        {selectedHub ? (
          <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 h-full flex flex-col justify-between text-slate-800">
            <div>
              {/* Header */}
              <div className="flex items-start justify-between mb-4 border-b border-slate-200/80 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider font-bold text-emerald-600 font-mono">
                      {selectedCountry.name} • {selectedHub.region}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">• {selectedHub.gdpContribution} GDP Impact</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mt-1 flex items-baseline gap-2">
                    {selectedHub.name}
                    {selectedHub.localName && (
                      <span className="text-sm font-normal text-slate-400 font-mono" dir="rtl">
                        ({selectedHub.localName})
                      </span>
                    )}
                  </h3>
                </div>
              </div>

              {/* Sidebar Tabs (Hub Profile vs Investment Dossier) */}
              <div className="flex border-b border-slate-200 mb-5">
                <button
                  onClick={() => setActiveDetailTab("profile")}
                  className={`flex-1 pb-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                    activeDetailTab === "profile" 
                      ? "border-emerald-600 text-emerald-700 font-black" 
                      : "border-transparent text-slate-400 hover:text-slate-700"
                  }`}
                >
                  Regional Profile
                </button>
                <button
                  onClick={() => setActiveDetailTab("dossier")}
                  className={`flex-1 pb-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                    activeDetailTab === "dossier" 
                      ? "border-emerald-600 text-emerald-700 font-black" 
                      : "border-transparent text-slate-400 hover:text-slate-700"
                  }`}
                >
                  Investment Dossier
                </button>
              </div>

              {/* TAB 1: PROFILE */}
              {activeDetailTab === "profile" && (
                <div className="space-y-4 animate-fade-in">
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 border-l-4 border-emerald-500 pl-3">
                    {selectedHub.description}
                  </p>

                  {/* Demographics Metrics */}
                  <div className="grid grid-cols-2 gap-3.5 mb-5">
                    <div className="bg-slate-50 border border-slate-200/60 p-3 rounded-xl">
                      <div className="flex items-center gap-1.5 text-slate-500 text-[10px] mb-1 font-mono uppercase tracking-wider font-bold">
                        <Users className="h-3.5 w-3.5 text-emerald-600" />
                        Population
                      </div>
                      <span className="text-xs font-bold text-slate-800">{selectedHub.population}</span>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/60 p-3 rounded-xl">
                      <div className="flex items-center gap-1.5 text-slate-500 text-[10px] mb-1 font-mono uppercase tracking-wider font-bold">
                        <Briefcase className="h-3.5 w-3.5 text-emerald-600" />
                        Labor Pool
                      </div>
                      <span className="text-xs font-bold text-slate-800">{selectedHub.workforce}</span>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/60 p-3 rounded-xl">
                      <div className="flex items-center gap-1.5 text-slate-500 text-[10px] mb-1 font-mono uppercase tracking-wider font-bold">
                        <GraduationCap className="h-3.5 w-3.5 text-emerald-600" />
                        Literacy Index
                      </div>
                      <span className="text-xs font-bold text-slate-800">{selectedHub.literacyRate}</span>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/60 p-3 rounded-xl">
                      <div className="flex items-center gap-1.5 text-slate-500 text-[10px] mb-1 font-mono uppercase tracking-wider font-bold">
                        <Landmark className="h-3.5 w-3.5 text-emerald-600" />
                        Industrial Parks
                      </div>
                      <span className="text-xs font-bold text-slate-800">{selectedHub.industrialZones} zones</span>
                    </div>
                  </div>

                  {/* Dynamic Sectoral Industries */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1.5 mb-1.5 font-mono uppercase tracking-wider">
                      <Building className="h-3.5 w-3.5 text-emerald-600" />
                      Economic Core Sectors
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedHub.industries.map((ind, i) => (
                        <span key={i} className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200/65 font-bold">
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Common Resources - High Visibility (Replaces Score) */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1.5 mb-1.5 font-mono uppercase tracking-wider">
                      <Trees className="h-3.5 w-3.5 text-emerald-600" />
                      Common Resource Stocks
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedHub.resources.map((res, i) => (
                        <span key={i} className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-md font-extrabold shadow-2xs">
                          {res}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Cities Within Region List */}
                  {selectedCountry.id === "tunisia" && (
                    <div className="pt-2">
                      <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1.5 mb-1.5 font-mono uppercase tracking-wider">
                        <Building className="h-3.5 w-3.5 text-amber-600" />
                        Metropolitan Cities
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        {tunisiaCities
                          .filter(c => c.governorateId === selectedHub.id)
                          .map((city) => (
                            <div 
                              key={city.id} 
                              onClick={() => onSelectCity?.(city)}
                              className="bg-white border border-slate-200 p-2 rounded-xl flex items-center justify-between cursor-pointer hover:border-emerald-600 hover:shadow-2xs transition"
                            >
                              <span className="font-bold text-slate-800">{city.name}</span>
                              <ChevronRight className="h-3 w-3 text-slate-400" />
                            </div>
                          ))}
                        {tunisiaCities.filter(c => c.governorateId === selectedHub.id).length === 0 && (
                          <span className="text-[9px] text-slate-400 col-span-2">Inland trade routes connect this regional center.</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Logistics Connectivity */}
                  <div className="border-t border-slate-100 pt-3 mt-4">
                    <span className="text-[9px] font-black text-slate-400 flex items-center gap-1.5 mb-2 font-mono uppercase tracking-widest">
                      Connectivity & Sea Lines
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-[9px] text-slate-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Plane className={`h-3.5 w-3.5 ${selectedHub.airports > 0 ? "text-emerald-600" : "text-slate-400"}`} />
                        <span>{selectedHub.airports > 0 ? "Adjacent Airport Access" : "Domestic Ground Link"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Ship className={`h-3.5 w-3.5 ${selectedHub.ports > 0 ? "text-emerald-600" : "text-slate-400"}`} />
                        <span>{selectedHub.ports > 0 ? "Direct Container Port" : "Inland Transit Port"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: DOSSIER DETAILS */}
              {activeDetailTab === "dossier" && (
                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1 animate-fade-in text-xs leading-relaxed text-slate-700">
                  {activeDossier ? (
                    <div className="space-y-5">
                      {/* Overview banner */}
                      <div className="bg-emerald-50/50 border border-emerald-100 p-3 rounded-2xl">
                        <h5 className="font-black text-emerald-800 flex items-center gap-1 text-[11px] uppercase tracking-wider font-mono">
                          <FileText className="h-4 w-4" />
                          Dossier Focus: {activeDossier.overview.sector}
                        </h5>
                        <p className="text-[10px] text-slate-600 mt-1 leading-normal">
                          {activeDossier.overview.description}
                        </p>
                      </div>

                      {/* Strategic Project Opportunities */}
                      <div>
                        <h6 className="font-extrabold text-[10px] uppercase font-mono text-slate-400 tracking-wider mb-2">Concessional Projects</h6>
                        <div className="space-y-2">
                          {activeDossier.opportunities.map((opp: any, idx: number) => (
                            <div key={idx} className="bg-slate-50 border border-slate-200/60 p-2.5 rounded-xl">
                              <span className="block font-black text-[10px] text-slate-900">{opp.title}</span>
                              <p className="text-[9px] text-slate-500 mt-1">{opp.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Advantages vs Challenges */}
                      <div className="grid grid-cols-1 gap-3.5">
                        <div className="space-y-1 bg-emerald-50/20 border border-emerald-100 p-2.5 rounded-xl">
                          <span className="font-bold text-emerald-800 flex items-center gap-1 text-[10px] font-mono">
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                            CORE ADVANTAGES
                          </span>
                          <ul className="list-disc list-inside text-[9px] text-slate-600 space-y-1">
                            {activeDossier.advantages.map((adv: string, idx: number) => (
                              <li key={idx}>{adv}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-1 bg-amber-50/20 border border-amber-100 p-2.5 rounded-xl">
                          <span className="font-bold text-amber-800 flex items-center gap-1 text-[10px] font-mono">
                            <ShieldAlert className="h-3.5 w-3.5 text-amber-600" />
                            KNOWN BOTTLENECKS
                          </span>
                          <ul className="list-disc list-inside text-[9px] text-slate-600 space-y-1">
                            {activeDossier.challenges.map((ch: string, idx: number) => (
                              <li key={idx}>{ch}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Target Investors & First Steps */}
                      <div>
                        <h6 className="font-extrabold text-[10px] uppercase font-mono text-slate-400 tracking-wider mb-1.5">Regulatory Execution Path</h6>
                        <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-2">
                          <span className="block font-bold text-slate-800 text-[10px]">Target Corporate Profile:</span>
                          <div className="flex flex-wrap gap-1">
                            {activeDossier.targetInvestors.map((inv: string, idx: number) => (
                              <span key={idx} className="text-[8px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                                {inv}
                              </span>
                            ))}
                          </div>
                          
                          <div className="border-t border-slate-100 pt-2 mt-2">
                            <span className="block font-bold text-slate-800 text-[10px] mb-1.5">Actionable First Steps:</span>
                            <div className="space-y-1.5 text-[9px] text-slate-600">
                              {activeDossier.firstSteps.map((step: string, idx: number) => (
                                <div key={idx} className="flex items-start gap-1.5">
                                  <span className="bg-emerald-600 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px] shrink-0 font-bold font-mono">
                                    {idx + 1}
                                  </span>
                                  <span>{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-10 space-y-3 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                      <Sparkles className="h-8 w-8 text-emerald-600/60 mx-auto animate-pulse" />
                      <span className="block font-bold text-slate-700">Dynamic AI Dossier Generator</span>
                      <p className="text-[10px] text-slate-500 max-w-[200px] mx-auto leading-normal">
                        Pre-structured regulatory dossiers are defined for Sousse, Bizerte, Nabeul, and Tataouine.
                      </p>
                      <button 
                        onClick={() => onSelectCity?.({ name: selectedHub.name, governorateId: selectedHub.id, resources: selectedHub.resources })}
                        className="px-3.5 py-1.5 bg-emerald-600 text-white font-extrabold text-[9px] rounded-lg cursor-pointer"
                      >
                        Ask AI Assistant for {selectedHub.name} Dossier
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>Universities: {selectedHub.universities}</span>
              <span className="text-emerald-700 font-extrabold flex items-center gap-1 uppercase tracking-wider text-[9px]">
                <CheckCircle className="h-3 w-3" />
                Active Investment Zone
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-dashed border-slate-300 rounded-3xl p-8 shadow-xs h-full flex flex-col items-center justify-center text-center text-slate-500">
            <MapPin className="h-10 w-10 text-emerald-600/60 mb-3 animate-bounce" />
            <span className="text-sm font-bold text-slate-800 font-mono">Select a Regional Hub Node</span>
            <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
              Click any colored area or node on the {selectedCountry.name} vector map to analyze population, resources, and strategic investment readiness.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
