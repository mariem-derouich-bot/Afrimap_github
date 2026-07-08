import React, { useRef } from "react";
import { Download, CheckCircle, FileText, AlertTriangle, HelpCircle, Shield, TrendingUp, Info, ListOrdered, Award, ArrowLeft } from "lucide-react";
import afrimapLogo from "../assets/logo.jpg";

interface SWOTAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

interface InvestmentReport {
  executiveSummary: string;
  recommendedSector: string;
  suitableRegions: string;
  marketOpportunities: string;
  estimatedInvestmentCost: string;
  expectedRoi: string;
  risks: string;
  governmentIncentives: string;
  infrastructureAvailability: string;
  swotAnalysis: SWOTAnalysis;
  recommendedNextSteps: string[];
  finalRecommendation: string;
}

interface InvestmentReportViewProps {
  report: InvestmentReport;
  preferences: {
    budget: string;
    region: string;
    sector: string;
    companySize: string;
    employees: string;
    goals: string;
    riskTolerance: string;
  };
  onBack?: () => void;
}

export default function InvestmentReportView({ report, preferences, onBack }: InvestmentReportViewProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = () => {
    const printContent = printRef.current?.innerHTML;
    if (!printContent) return;

    const win = window.open("", "_blank");
    if (!win) {
      alert("Please allow popups to export the PDF.");
      return;
    }

    const todayStr = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    win.document.write(`
      <html>
        <head>
          <title>Tunisia Investment Opportunity Report</title>
          <style>
            @page {
              size: A4;
              margin: 20mm 15mm 20mm 15mm;
            }
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              color: #1e293b;
              line-height: 1.5;
              font-size: 11pt;
              margin: 0;
              padding: 0;
            }
            .header-container {
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-bottom: 2px solid #059669;
              padding-bottom: 15px;
              margin-bottom: 30px;
            }
            .logo-img {
              height: 50px;
              width: 50px;
              border-radius: 8px;
              object-fit: cover;
            }
            .header-title-box {
              text-align: right;
            }
            .header-title {
              font-size: 18pt;
              font-weight: 800;
              color: #0f172a;
              margin: 0;
              text-transform: uppercase;
              letter-spacing: -0.5px;
            }
            .header-subtitle {
              font-size: 10pt;
              color: #64748b;
              margin: 5px 0 0 0;
              font-weight: 500;
            }
            .meta-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              background-color: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 10px;
              padding: 15px;
              margin-bottom: 30px;
            }
            .meta-item {
              font-size: 9.5pt;
            }
            .meta-item strong {
              color: #334155;
            }
            h2 {
              font-size: 12pt;
              font-weight: 700;
              color: #0f172a;
              border-left: 4px solid #10b981;
              padding-left: 10px;
              margin-top: 25px;
              margin-bottom: 12px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              page-break-after: avoid;
            }
            p {
              margin-top: 0;
              margin-bottom: 15px;
              text-align: justify;
              color: #334155;
            }
            .swot-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              margin-bottom: 20px;
              page-break-inside: avoid;
            }
            .swot-box {
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 12px;
            }
            .swot-box.strengths { background-color: #f0fdf4; border-color: #bbf7d0; }
            .swot-box.weaknesses { background-color: #fef2f2; border-color: #fca5a5; }
            .swot-box.opportunities { background-color: #eff6ff; border-color: #bfdbfe; }
            .swot-box.threats { background-color: #fffbeb; border-color: #fef08a; }
            .swot-title {
              font-weight: 700;
              font-size: 10pt;
              text-transform: uppercase;
              margin-bottom: 8px;
              display: flex;
              align-items: center;
              gap: 6px;
            }
            .swot-title.strengths { color: #166534; }
            .swot-title.weaknesses { color: #991b1b; }
            .swot-title.opportunities { color: #1e40af; }
            .swot-title.threats { color: #854d0e; }
            .swot-list {
              margin: 0;
              padding-left: 15px;
              font-size: 9pt;
              color: #475569;
            }
            .swot-list li {
              margin-bottom: 4px;
            }
            ul, ol {
              margin-top: 0;
              margin-bottom: 15px;
              padding-left: 20px;
            }
            li {
              margin-bottom: 6px;
              color: #334155;
            }
            .footer {
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              height: 40px;
              border-top: 1px solid #e2e8f0;
              padding-top: 10px;
              display: flex;
              justify-content: space-between;
              font-size: 8pt;
              color: #94a3b8;
            }
            .page-break {
              page-break-before: always;
            }
            @media print {
              body {
                padding-bottom: 50px;
              }
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <!-- PDF Report Body -->
          <div class="header-container">
            <img src="${win.location.origin}${afrimapLogo}" class="logo-img" onerror="this.src='https://ai.studio/build/favicon.ico'" />
            <div class="header-title-box">
              <h1 class="header-title">Investment Feasibility Report</h1>
              <p class="header-subtitle">Tunisia Investment Explorer • Dynamic AI Analysis</p>
            </div>
          </div>

          <div class="meta-grid">
            <div class="meta-item"><strong>Date:</strong> ${todayStr}</div>
            <div class="meta-item"><strong>Target Sector:</strong> ${preferences.sector}</div>
            <div class="meta-item"><strong>Target Region:</strong> ${preferences.region}</div>
            <div class="meta-item"><strong>Investment Budget:</strong> ${preferences.budget}</div>
            <div class="meta-item"><strong>Enterprise Size:</strong> ${preferences.companySize}</div>
            <div class="meta-item"><strong>Planned Workforce:</strong> ${preferences.employees}</div>
          </div>

          <h2>1. Executive Summary</h2>
          <p>${report.executiveSummary.replace(/\n/g, "<br/>")}</p>

          <h2>2. Recommended Investment Sector</h2>
          <p>${report.recommendedSector.replace(/\n/g, "<br/>")}</p>

          <h2>3. Suitable Tunisian Regions & Governorates</h2>
          <p>${report.suitableRegions.replace(/\n/g, "<br/>")}</p>

          <div class="page-break"></div>

          <div class="header-container">
            <img src="${win.location.origin}${afrimapLogo}" class="logo-img" onerror="this.src='https://ai.studio/build/favicon.ico'" />
            <div class="header-title-box">
              <h1 class="header-title">Investment Feasibility Report</h1>
              <p class="header-subtitle">Tunisia Investment Explorer • Dynamic AI Analysis</p>
            </div>
          </div>

          <h2>4. Market Opportunities</h2>
          <p>${report.marketOpportunities.replace(/\n/g, "<br/>")}</p>

          <h2>5. Estimated Investment Cost</h2>
          <p>${report.estimatedInvestmentCost.replace(/\n/g, "<br/>")}</p>

          <h2>6. Expected ROI & Payback</h2>
          <p>${report.expectedRoi.replace(/\n/g, "<br/>")}</p>

          <h2>7. Risk Management & Volatilities</h2>
          <p>${report.risks.replace(/\n/g, "<br/>")}</p>

          <div class="page-break"></div>

          <div class="header-container">
            <img src="${win.location.origin}${afrimapLogo}" class="logo-img" onerror="this.src='https://ai.studio/build/favicon.ico'" />
            <div class="header-title-box">
              <h1 class="header-title">Investment Feasibility Report</h1>
              <p class="header-subtitle">Tunisia Investment Explorer • Dynamic AI Analysis</p>
            </div>
          </div>

          <h2>8. Strategic SWOT Analysis</h2>
          <div class="swot-grid">
            <div class="swot-box strengths">
              <div class="swot-title strengths">✔ Strengths (Internal)</div>
              <ul class="swot-list">
                ${report.swotAnalysis.strengths.map(s => `<li>${s}</li>`).join("")}
              </ul>
            </div>
            <div class="swot-box weaknesses">
              <div class="swot-title weaknesses">✘ Weaknesses (Internal)</div>
              <ul class="swot-list">
                ${report.swotAnalysis.weaknesses.map(w => `<li>${w}</li>`).join("")}
              </ul>
            </div>
            <div class="swot-box opportunities">
              <div class="swot-title opportunities">★ Opportunities (External)</div>
              <ul class="swot-list">
                ${report.swotAnalysis.opportunities.map(o => `<li>${o}</li>`).join("")}
              </ul>
            </div>
            <div class="swot-box threats">
              <div class="swot-title threats">⚠ Threats & Barriers</div>
              <ul class="swot-list">
                ${report.swotAnalysis.threats.map(t => `<li>${t}</li>`).join("")}
              </ul>
            </div>
          </div>

          <h2>9. Government Incentives & Support Policies</h2>
          <p>${report.governmentIncentives.replace(/\n/g, "<br/>")}</p>

          <h2>10. Infrastructure Availability & Logistics</h2>
          <p>${report.infrastructureAvailability.replace(/\n/g, "<br/>")}</p>

          <h2>11. Recommended Next Steps</h2>
          <ol>
            ${report.recommendedNextSteps.map(step => `<li>${step}</li>`).join("")}
          </ol>

          <h2>12. Final Advisory Recommendation</h2>
          <p>${report.finalRecommendation.replace(/\n/g, "<br/>")}</p>

          <div class="footer">
            <span>Tunisia Investment Explorer • FDI Decision Engine</span>
            <span>Generated on ${todayStr} • Confidential Report</span>
            <span>Page 1 of 1</span>
          </div>

          <script>
            window.onload = function() {
              window.focus();
              window.print();
            }
          </script>
        </body>
      </html>
    `);
    win.document.close();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm text-slate-800 space-y-8 animate-fade-in">
      
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition cursor-pointer"
              title="Back to Opportunities"
            >
              <ArrowLeft className="h-4.5 w-4.5" />
            </button>
          )}
          <div>
            <h3 className="text-base font-bold text-slate-900">Professional Investment Advisory Report</h3>
            <p className="text-xs text-slate-500 font-mono">Dynamic Country Feasibility Assessment</p>
          </div>
        </div>
        <button
          onClick={handleExportPDF}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/10"
        >
          <Download className="h-4 w-4" />
          Export Report as PDF
        </button>
      </div>

      {/* Screen Render Report Container */}
      <div className="space-y-8" ref={printRef}>
        
        {/* Executive Summary */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-100 pb-2 flex items-center gap-2">
            <FileText className="h-4.5 w-4.5 text-emerald-600" />
            1. Executive Summary
          </h4>
          <p className="text-xs text-slate-650 leading-relaxed text-justify whitespace-pre-wrap pl-3 border-l-2 border-emerald-500">
            {report.executiveSummary}
          </p>
        </div>

        {/* 2 & 3: Sector and Region */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-100 pb-2 flex items-center gap-2">
              <Award className="h-4.5 w-4.5 text-emerald-600" />
              2. Recommended Sector
            </h4>
            <p className="text-xs text-slate-650 leading-relaxed text-justify whitespace-pre-wrap">
              {report.recommendedSector}
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-100 pb-2 flex items-center gap-2">
              <Info className="h-4.5 w-4.5 text-emerald-600" />
              3. Suitable Regions
            </h4>
            <p className="text-xs text-slate-650 leading-relaxed text-justify whitespace-pre-wrap">
              {report.suitableRegions}
            </p>
          </div>
        </div>

        {/* 4 & 5 & 6: Market, Cost, ROI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-1.5 mb-1">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              4. Market Opportunities
            </h4>
            <p className="text-[11px] text-slate-650 leading-relaxed">
              {report.marketOpportunities}
            </p>
          </div>
          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-1.5 mb-1">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              5. Estimated Cost
            </h4>
            <p className="text-[11px] text-slate-650 leading-relaxed">
              {report.estimatedInvestmentCost}
            </p>
          </div>
          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-1.5 mb-1">
              <Info className="h-4 w-4 text-emerald-600" />
              6. Expected ROI
            </h4>
            <p className="text-[11px] text-slate-650 leading-relaxed">
              {report.expectedRoi}
            </p>
          </div>
        </div>

        {/* 7: Risks */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-100 pb-2 flex items-center gap-2">
            <Shield className="h-4.5 w-4.5 text-red-600" />
            7. Risks & Mitigations
          </h4>
          <p className="text-xs text-slate-650 leading-relaxed text-justify whitespace-pre-wrap pl-3 border-l-2 border-red-500">
            {report.risks}
          </p>
        </div>

        {/* SWOT Grid */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-100 pb-2 flex items-center gap-2">
            <CheckCircle className="h-4.5 w-4.5 text-emerald-600" />
            8. Strategic SWOT Analysis
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-green-50 border border-green-100 p-4 rounded-2xl">
              <span className="font-bold text-green-800 uppercase block mb-2">Strengths</span>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-700">
                {report.swotAnalysis.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-100 p-4 rounded-2xl">
              <span className="font-bold text-red-800 uppercase block mb-2">Weaknesses</span>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-700">
                {report.swotAnalysis.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl">
              <span className="font-bold text-blue-800 uppercase block mb-2">Opportunities</span>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-700">
                {report.swotAnalysis.opportunities.map((o, i) => <li key={i}>{o}</li>)}
              </ul>
            </div>
            <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-2xl">
              <span className="font-bold text-yellow-800 uppercase block mb-2">Threats</span>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-700">
                {report.swotAnalysis.threats.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* 9 & 10: Incentives and Infrastructure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-100 pb-2 flex items-center gap-2">
              <TrendingUp className="h-4.5 w-4.5 text-emerald-600" />
              9. Government Incentives
            </h4>
            <p className="text-xs text-slate-650 leading-relaxed text-justify whitespace-pre-wrap">
              {report.governmentIncentives}
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-100 pb-2 flex items-center gap-2">
              <Info className="h-4.5 w-4.5 text-emerald-600" />
              10. Infrastructure & Logistics
            </h4>
            <p className="text-xs text-slate-650 leading-relaxed text-justify whitespace-pre-wrap">
              {report.infrastructureAvailability}
            </p>
          </div>
        </div>

        {/* 11: Recommended Next Steps */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-100 pb-2 flex items-center gap-2">
            <ListOrdered className="h-4.5 w-4.5 text-emerald-600" />
            11. Recommended Next Steps
          </h4>
          <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-700">
            {report.recommendedNextSteps.map((step, i) => (
              <li key={i} className="leading-relaxed">{step}</li>
            ))}
          </ol>
        </div>

        {/* 12: Final Advisor Recommendation */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-100 pb-2 flex items-center gap-2">
            <AlertTriangle className="h-4.5 w-4.5 text-emerald-600" />
            12. Final Advisory Recommendation
          </h4>
          <p className="text-xs text-slate-650 leading-relaxed text-justify whitespace-pre-wrap italic pl-4 border-l-2 border-emerald-500">
            {report.finalRecommendation}
          </p>
        </div>

      </div>

    </div>
  );
}
