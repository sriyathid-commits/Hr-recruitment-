import React, { useState } from "react";
import { Header } from "./components/Header";
import { RecruiterList } from "./components/RecruiterList";
import { Screener } from "./components/Screener";
import { AssetGenerator } from "./components/AssetGenerator";
import { 
  HYDERABAD_RECRUITMENT_INSIGHTS, 
  MOCK_CONSULTANTS 
} from "./data";
import { 
  Building2, Coins, MapPin, TrendingUp, HelpCircle, 
  Settings, CheckCircle2, FileText, Code2, Calculator
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"candidates" | "recruiters" | "assets">("candidates");

  return (
    <div className="min-h-screen bg-[#FDFCF8] flex flex-col font-sans transition-colors duration-300">
      
      {/* Top Header */}
      <Header 
        activeRoleCount={2}
        consultantCount={MOCK_CONSULTANTS.length}
        candidateCount={3}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome & Scope Overview */}
        <section className="bg-white border border-[#EAE7DF] rounded-none p-8 text-left relative overflow-hidden">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F2EA] border border-[#EAE7DF] text-[#1A1A1A] text-[9px] font-sans font-bold tracking-widest uppercase">
              ◈ ACTIVE RECRUITER DESK
            </span>
            <h2 className="text-4xl font-normal font-serif tracking-tight text-[#1A1A1A] leading-tight">
              Sourcing & Appraisal Suite for High-Value Roles
            </h2>
            <p className="text-[13px] text-slate-600 leading-relaxed max-w-2xl font-serif">
              A comprehensive system designed to analyze candidate dossiers, outline precise Indian taxation mandates, and coordinate with freelance HR consultants for two core openings in Hyderabad:
            </p>

            {/* Micro editorial blocks of the 2 roles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              
              <div className="bg-[#F5F2EA]/40 border border-[#EAE7DF] p-5 flex gap-4 text-left rounded-none">
                <div className="h-10 w-10 shrink-0 border border-[#1A1A1A]/10 bg-white text-[#C48F5B] flex items-center justify-center font-serif text-lg font-semibold">
                  Ⅰ
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-widest font-sans">Accounts & MIS Executive</h4>
                  <p className="text-[11px] text-slate-500 font-serif mt-1 italic">Hyderabad • 3-5 Years • Tally Prime • CA Audits</p>
                </div>
              </div>

              <div className="bg-[#F5F2EA]/40 border border-[#EAE7DF] p-5 flex gap-4 text-left rounded-none">
                <div className="h-10 w-10 shrink-0 border border-[#1A1A1A]/10 bg-white text-[#1A1A1A] flex items-center justify-center font-serif text-lg font-bold">
                  Ⅱ
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-widest font-sans">Full-Stack AI Developer</h4>
                  <p className="text-[11px] text-slate-500 font-serif mt-1 italic">Freelance / FT • React / Next • LLM Co-Architect</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Tab Selection Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-[#EAE7DF] gap-4">
          <nav className="flex space-x-2" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("candidates")}
              className={`px-4 py-3 text-xs uppercase font-sans tracking-widest font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === "candidates"
                  ? "border-[#1A1A1A] text-[#1A1A1A] bg-[#F5F2EA]"
                  : "border-transparent text-slate-400 hover:text-[#1A1A1A] hover:bg-slate-50"
              }`}
            >
              Candidate Appraisal
            </button>
            <button
              onClick={() => setActiveTab("recruiters")}
              className={`px-4 py-3 text-xs uppercase font-sans tracking-widest font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === "recruiters"
                  ? "border-[#1A1A1A] text-[#1A1A1A] bg-[#F5F2EA]"
                  : "border-transparent text-slate-400 hover:text-[#1A1A1A] hover:bg-slate-50"
              }`}
            >
              Sourcing Partners
            </button>
            <button
              onClick={() => setActiveTab("assets")}
              className={`px-4 py-3 text-xs uppercase font-sans tracking-widest font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === "assets"
                  ? "border-[#1A1A1A] text-[#1A1A1A] bg-[#F5F2EA]"
                  : "border-transparent text-slate-400 hover:text-[#1A1A1A] hover:bg-slate-50"
              }`}
            >
              Outreach Asset Creator
            </button>
          </nav>

          <span className="text-[10px] text-slate-400 font-sans uppercase tracking-widest">
            Hiring Jurisdiction: India (TS)
          </span>
        </div>

        {/* Active Workspace View */}
        <div className="transition-all duration-300">
          {activeTab === "candidates" && <Screener />}
          {activeTab === "recruiters" && <RecruiterList />}
          {activeTab === "assets" && <AssetGenerator />}
        </div>

        {/* Hyderabad Sourcing Intelligence & Tax Benchmark Panel */}
        <section className="bg-white border border-[#EAE7DF] rounded-none p-8 text-left">
          <h3 className="text-xl font-normal font-serif text-[#1A1A1A] pb-4 border-b border-[#EAE7DF] flex items-baseline gap-2 mb-6">
            Hyderabad Regional Insights & Compliance Benchmarks
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Salary Scales */}
            <div className="space-y-4 bg-[#F5F2EA]/40 p-5 border border-[#EAE7DF]">
              <h4 className="text-[9px] font-bold text-[#1A1A1A] uppercase tracking-widest flex items-center gap-1.5">
                ◈ REGIONAL SALARY BENCHMARKS
              </h4>
              <div className="space-y-3 leading-relaxed text-xs">
                <div>
                  <span className="font-serif font-semibold text-slate-700 block">Accounts Executive (3-5 Years):</span>
                  <span className="font-mono text-xs text-[#C48F5B] font-bold">{HYDERABAD_RECRUITMENT_INSIGHTS.averageSalary.accounts}</span>
                </div>
                <div>
                  <span className="font-serif font-semibold text-slate-700 block">Full-Stack AI Developer:</span>
                  <span className="font-mono text-xs text-[#C48F5B] font-bold">{HYDERABAD_RECRUITMENT_INSIGHTS.averageSalary.developer}</span>
                </div>
              </div>
            </div>

            {/* Hotspot sourcing corridors */}
            <div className="space-y-3 bg-[#F5F2EA]/40 p-5 border border-[#EAE7DF] text-xs">
              <h4 className="text-[9px] font-bold text-[#1A1A1A] uppercase tracking-widest flex items-center gap-1.5">
                ◈ TALENT GEOGRAPHIES
              </h4>
              <p className="leading-relaxed font-serif text-slate-650">
                Experienced accounting professionals trained within top CA consultancies typically reside or commute from Begumpet, Secunderabad, and Kukatpally. 
                Web and mobile engineering talent is clustered heavily around the IT corridor of <strong className="text-[#1A1A1A]">Hitec City, Madhapur, and Gachibowli</strong>. Settle for hybrid roles to guarantee talent consistency.
              </p>
            </div>

            {/* Consulting contract regulations */}
            <div className="space-y-3 bg-[#F5F2EA]/40 p-5 border border-[#EAE7DF] text-xs">
              <h4 className="text-[9px] font-bold text-[#1A1A1A] uppercase tracking-widest flex items-center gap-1.5">
                ◈ INDIAN CONTRACT COMPLIANCE
              </h4>
              <p className="leading-relaxed font-serif text-slate-650">
                {HYDERABAD_RECRUITMENT_INSIGHTS.recruitmentTaxRules}
              </p>
              <div className="bg-white p-3 border border-[#EAE7DF] mt-1">
                <span className="font-sans font-bold text-[8px] text-slate-400 block uppercase tracking-wider">compliance directive</span>
                <span className="text-[11px] text-slate-600 font-serif block mt-1">Ensure bilateral contract covenants define intellectual property parameters explicitly for generative and AI-assisted workflows.</span>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Workspace Footer */}
      <footer className="bg-white text-slate-450 py-8 text-xs text-center border-t border-[#EAE7DF] mt-16 font-serif">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="italic">
            © {new Date().getFullYear()} Hyderabad Elite Recruiting Suite. Project Code: <code className="bg-[#F5F2EA] text-[#1A1A1A] font-bold font-mono px-1.5 py-0.5 border border-[#EAE7DF]">40530987</code>
          </p>
          <div className="flex gap-4 font-sans text-[10px] uppercase tracking-wider font-bold text-slate-400">
            <span className="hover:text-[#1A1A1A] transition cursor-default">Privacy</span>
            <span className="hover:text-[#1A1A1A] transition cursor-default">Sourcing Covenants</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
