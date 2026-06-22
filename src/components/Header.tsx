import React from "react";
import { Sparkles } from "lucide-react";

interface HeaderProps {
  activeRoleCount: number;
  consultantCount: number;
  candidateCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeRoleCount,
  consultantCount,
  candidateCount,
}) => {
  return (
    <header className="border-b border-[#1A1A1A]/10 bg-[#FDFCF8] sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-none bg-[#1A1A1A] text-white">
              <span className="font-serif text-xl font-light">H</span>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-normal font-serif tracking-tight text-[#1A1A1A]">
                  Hyderabad Talent Scout
                </h1>
                <span className="hidden sm:inline-flex items-center rounded-none bg-[#F5F2EA] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#C48F5B] border border-[#C48F5B]/20">
                  Sourcing Desk
                </span>
              </div>
              <p className="text-[11px] font-sans tracking-wide uppercase text-slate-500 mt-0.5 hidden sm:block">
                Precision Matchmaking & AI Evaluation for India's Elite Sectors
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50 block">Registered Mandates</span>
              <span className="text-xs font-serif font-medium text-[#1A1A1A]">2 Active Openings</span>
            </div>
            <div className="h-8 w-[1px] bg-[#1A1A1A]/10 hidden md:block"></div>
            <div className="bg-[#1A1A1A] text-white px-4 py-2 text-xs font-sans uppercase tracking-widest font-bold">
              ID: 40530987
            </div>
          </div>

        </div>
      </div>

      {/* Thin brand gold division runner */}
      <div className="h-[2px] w-full bg-[#C48F5B]"></div>
    </header>
  );
};
