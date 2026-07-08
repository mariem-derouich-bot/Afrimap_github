import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";

// Key economic stats historical timelines
const gdpData = [
  { year: "2021", gdp: 44.2, growth: 1.8 },
  { year: "2022", gdp: 45.8, growth: 2.2 },
  { year: "2023", gdp: 46.5, growth: 1.5 },
  { year: "2024", gdp: 47.3, growth: 1.9 },
  { year: "2025", gdp: 48.5, growth: 2.4 },
  { year: "2026 (P)", gdp: 49.8, growth: 2.8 }
];

const sectorRoiData = [
  { sector: "IT & Tech", roi: 28, cost: "Low" },
  { sector: "Agri-food", roi: 22, cost: "Medium" },
  { sector: "Renewable Energy", roi: 18, cost: "High" },
  { sector: "Manufacturing", roi: 20, cost: "High" },
  { sector: "Tourism", roi: 16, cost: "Medium" },
  { sector: "Services", roi: 15, cost: "Low" }
];

const employmentData = [
  { name: "Services", value: 51, color: "#10b981" },
  { name: "Industry & Mfg", value: 33, color: "#3b82f6" },
  { name: "Agriculture", value: 16, color: "#f59e0b" }
];

const regionalScoreData = [
  { region: "Coastal Hubs", score: 91 },
  { region: "Northern Zones", score: 88 },
  { region: "Southern Desert", score: 81 },
  { region: "Central Plains", score: 76 }
];

interface DashboardChartsProps {
  countryName?: string;
}

export default function DashboardCharts({ countryName = "Tunisia" }: DashboardChartsProps) {
  return (
    <div id="dashboard-intelligence-charts" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      
      {/* 1. GDP Trend & Growth Chart */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">{countryName} GDP Performance Timeline</h4>
            <p className="text-xs text-slate-500 mt-0.5">Annual Gross Domestic Product in Billion USD</p>
          </div>
          <span className="text-[10px] bg-emerald-50 border border-emerald-100 text-emerald-600 font-mono font-bold px-2.5 py-0.5 rounded-full">
            Historical Trend
          </span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={gdpData}>
              <defs>
                <linearGradient id="gdpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="year" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={[40, 52]} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "12px", color: "#0f172a" }}
                labelClassName="font-semibold text-slate-500"
              />
              <Area type="monotone" dataKey="gdp" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#gdpGrad)" name="GDP (Billion $)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. ROI Comparison by Strategic Sector */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Expected Sector ROI Comparison</h4>
            <p className="text-xs text-slate-500 mt-0.5">Yield potentials and estimated risk levels</p>
          </div>
          <span className="text-[10px] bg-blue-50 border border-blue-100 text-blue-600 font-mono font-bold px-2.5 py-0.5 rounded-full">
            IT & Tech leads
          </span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sectorRoiData}>
              <XAxis dataKey="sector" stroke="#64748b" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} unit="%" />
              <Tooltip 
                contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "12px", color: "#0f172a" }}
              />
              <Bar dataKey="roi" name="Projected ROI" radius={[8, 8, 0, 0]}>
                {sectorRoiData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? "#10b981" : "#3b82f6"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Employment Distribution */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Workforce Sector breakdown</h4>
          <p className="text-xs text-slate-500 mt-0.5">Percentage of active {countryName} labor pool</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center mt-4">
          <div className="sm:col-span-6 h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={employmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {employmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "12px", color: "#0f172a" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="sm:col-span-6 space-y-3">
            {employmentData.map((entry, idx) => (
              <div key={idx} className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-slate-600 font-medium">{entry.name}</span>
                </div>
                <span className="text-slate-900 font-bold font-mono">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Regional Investment Score Averages */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Regional Preparedness Score</h4>
          <p className="text-xs text-slate-500 mt-0.5">Average investment readiness score by geographical zones</p>
        </div>
        <div className="h-48 w-full mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={regionalScoreData} layout="vertical">
              <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} domain={[0, 100]} />
              <YAxis dataKey="region" type="category" stroke="#64748b" fontSize={10} tickLine={false} width={80} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "12px", color: "#0f172a" }}
              />
              <Bar dataKey="score" fill="#10b981" radius={[0, 8, 8, 0]} name="Readiness Index" barSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
