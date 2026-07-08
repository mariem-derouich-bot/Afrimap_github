import React, { useRef } from "react";
import { Download, CheckCircle, FileText, X, AlertTriangle, HelpCircle } from "lucide-react";

interface BusinessPlan {
  executiveSummary: string;
  marketAnalysis: string;
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  budgetBreakdown: { category: string; amount: string }[];
  financialForecast: { year: number; revenue: string; profit: string }[];
  roiAnalysis: string;
  risks: string[];
  conclusion: string;
}

interface BusinessPlanViewProps {
  plan: BusinessPlan;
  projectName: string;
  onClose: () => void;
}

export default function BusinessPlanView({ plan, projectName, onClose }: BusinessPlanViewProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = printRef.current?.innerHTML;
    const originalContent = document.body.innerHTML;

    // Create custom print view
    if (printContent) {
      const win = window.open("", "_blank");
      if (win) {
        win.document.write(`
          <html>
            <head>
              <title>${projectName} - Business Plan</title>
              <style>
                body {
                  font-family: 'Helvetica Neue', Arial, sans-serif;
                  color: #1e293b;
                  padding: 40px;
                  line-height: 1.6;
                }
                h1 { color: #0f172a; font-size: 26px; border-bottom: 2px solid #10b981; padding-bottom: 12px; margin-bottom: 24px; }
                h2 { color: #1e293b; font-size: 18px; margin-top: 30px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
                p { font-size: 14px; margin-bottom: 16px; text-align: justify; }
                .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .swot-card { border: 1px solid #cbd5e1; padding: 15px; border-radius: 8px; margin-bottom: 15px; }
                .swot-title { font-weight: bold; font-size: 14px; margin-bottom: 10px; color: #0284c7; text-transform: uppercase; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px; }
                th { background-color: #f1f5f9; text-align: left; padding: 10px; border: 1px solid #cbd5e1; font-weight: bold; }
                td { padding: 10px; border: 1px solid #cbd5e1; }
                ul { padding-left: 20px; margin-bottom: 16px; font-size: 14px; }
                li { margin-bottom: 6px; }
                .footer { margin-top: 50px; font-size: 12px; color: #64748b; border-t: 1px solid #cbd5e1; padding-top: 15px; text-align: center; }
                @media print {
                  body { padding: 20px; }
                }
              </style>
            </head>
            <body>
              ${printContent}
            </body>
          </html>
        `);
        win.document.close();
        win.focus();
        win.print();
      }
    }
  };

  return (
    <div id="business-plan-modal" className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in text-slate-800">
        
        {/* Header toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200">
              <FileText className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 line-clamp-1">Venture Business Plan</h3>
              <p className="text-xs text-slate-550 line-clamp-1">Investor-grade feasibility report</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition duration-150 cursor-pointer shadow-xs"
            >
              <Download className="h-3.5 w-3.5" />
              Export as PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-150 rounded-lg text-slate-500 hover:text-slate-800 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Report Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8 bg-white" ref={printRef}>
          
          {/* Cover Header */}
          <div className="text-center pb-6 border-b border-slate-100">
            <span className="text-[10px] uppercase tracking-widest text-emerald-600 font-mono font-bold">
              CONCESSIONAL ENTERPRISE FEASIBILITY REPORT
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
              {projectName}
            </h1>
            <p className="text-xs text-slate-500 mt-2 font-mono">
              Prepared by Tunisia Investment Explorer • Confidential Report
            </p>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2 mb-3 font-mono">
              1. Executive Summary
            </h2>
            <p className="text-xs text-slate-650 leading-relaxed whitespace-pre-wrap">
              {plan.executiveSummary}
            </p>
          </div>

          {/* Market Analysis */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2 mb-3 font-mono">
              2. Market & Logistics Feasibility
            </h2>
            <p className="text-xs text-slate-650 leading-relaxed whitespace-pre-wrap">
              {plan.marketAnalysis}
            </p>
          </div>

          {/* SWOT Grid */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2 mb-4 font-mono">
              3. Strategic SWOT Analysis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Strengths */}
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide flex items-center gap-1.5 mb-2 font-mono">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  Strengths (Internal)
                </span>
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-750">
                  {plan.swotAnalysis.strengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="bg-red-50 border border-red-100 p-4 rounded-2xl">
                <span className="text-xs font-bold text-red-700 uppercase tracking-wide flex items-center gap-1.5 mb-2 font-mono">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  Weaknesses (Internal)
                </span>
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-750">
                  {plan.swotAnalysis.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>

              {/* Opportunities */}
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wide flex items-center gap-1.5 mb-2 font-mono">
                  <FileText className="h-4 w-4 text-blue-500" />
                  Opportunities (External)
                </span>
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-750">
                  {plan.swotAnalysis.opportunities.map((o, i) => <li key={i}>{o}</li>)}
                </ul>
              </div>

              {/* Threats */}
              <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wide flex items-center gap-1.5 mb-2 font-mono">
                  <HelpCircle className="h-4 w-4 text-amber-500" />
                  Threats & Barriers
                </span>
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-750">
                  {plan.swotAnalysis.threats.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
            </div>
          </div>

          {/* Budget Breakdown */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2 mb-3 font-mono">
              4. Budget Allocation Breakdown
            </h2>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-600">
                    <th className="p-3 font-semibold uppercase tracking-wider font-mono">Budget Category</th>
                    <th className="p-3 text-right font-semibold uppercase tracking-wider font-mono">Allocation Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/65">
                  {plan.budgetBreakdown.map((item, i) => (
                    <tr key={i} className="hover:bg-slate-200/20 text-slate-700">
                      <td className="p-3 font-medium">{item.category}</td>
                      <td className="p-3 text-right font-mono text-emerald-600 font-semibold">{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Financial Forecast */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2 mb-3 font-mono">
              5. 3-Year Financial Forecast
            </h2>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-600">
                    <th className="p-3 font-semibold uppercase tracking-wider font-mono">Operating Year</th>
                    <th className="p-3 font-semibold uppercase tracking-wider font-mono">Estimated Annual Revenue</th>
                    <th className="p-3 text-right font-semibold uppercase tracking-wider font-mono">Estimated Net Profit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/65">
                  {plan.financialForecast.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-200/20 text-slate-700">
                      <td className="p-3 font-mono font-bold">Year {row.year}</td>
                      <td className="p-3 font-mono">{row.revenue}</td>
                      <td className="p-3 text-right font-mono text-emerald-600 font-semibold">{row.profit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ROI Assessment */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2 mb-3 font-mono">
              6. ROI & Payback Assessment
            </h2>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-slate-755">
              <p className="text-xs leading-relaxed mb-0">
                {plan.roiAnalysis}
              </p>
            </div>
          </div>

          {/* Risks */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2 mb-3 font-mono">
              7. Risk Management & Mitigations
            </h2>
            <ul className="space-y-2 text-xs text-slate-700 pl-1">
              {plan.risks.map((risk, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="px-1.5 py-0.5 bg-red-50 border border-red-100 text-red-600 rounded mt-0.5 font-mono font-bold text-[10px]">!</span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Conclusion */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2 mb-3 font-mono">
              8. Strategic Conclusion
            </h2>
            <p className="text-xs text-slate-650 leading-relaxed italic pl-4 border-l-2 border-emerald-500">
              {plan.conclusion}
            </p>
          </div>

          {/* Print Sign-off block */}
          <div className="hidden print:block pt-12 mt-12 border-t border-slate-300 text-center text-xs">
            <p>End of Venture Feasibility Report.</p>
            <p className="text-[10px] text-slate-500">Tunisia Investment Explorer AI Agency • Date: {new Date().toLocaleDateString()}</p>
          </div>

        </div>

        {/* Footer toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50 text-[10px] text-slate-500 font-mono">
          <span>AI-Generated Dynamic Plan</span>
          <span>Tunisia Investment Explorer v2.5</span>
        </div>

      </div>
    </div>
  );
}
