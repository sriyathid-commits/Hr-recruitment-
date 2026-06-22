import React, { useState } from "react";
import { Sparkles, Copy, Check, FileText, Send, HelpCircle, FileCheck, ArrowRight, MessageSquare, Briefcase } from "lucide-react";

export const AssetGenerator: React.FC = () => {
  const [roleType, setRoleType] = useState<"ACCOUNTS_MIS" | "FULLSTACK_DEVELOPER">("ACCOUNTS_MIS");
  const [formatType, setFormatType] = useState<"JD" | "LINKEDIN_DM" | "EMAIL_PITCH">("JD");
  const [customNotes, setCustomNotes] = useState("");
  
  // AI states
  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  // Set nice default prompts for user inspiration
  const getPromptPlaceholder = () => {
    if (roleType === "ACCOUNTS_MIS") {
      return "e.g. Highlight construction industry / real-estate background, location in Kukatpally, and 5L per annum package range.";
    }
    return "e.g. Focus on immediate availability, mastery over Next.js/Tailwind CSS, and candidate having an active portfolio utilizing Cursor IDE.";
  };

  const handleGenerate = async () => {
    setLoading(true);
    setErrorText(null);
    setCopied(false);
    
    try {
      const response = await fetch("/api/generate-outreach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roleType,
          formatType,
          customNotes,
        }),
      });

      if (!response.ok) {
        throw new Error("HTTP error " + response.status + ": Failed to generate outreach asset");
      }

      const report = await response.json();
      setGeneratedText(report.text);
    } catch (err: any) {
      console.error(err);
      setErrorText("Generation failed because your Gemini key isn't active or server was unreachable. Here is a high-grade default preview template.");
      
      // Fallback pre-composed copy if Gemini API isn't online
      setTimeout(() => {
        let fallback = "";
        if (roleType === "ACCOUNTS_MIS") {
          if (formatType === "JD") {
            fallback = `# JOB SPECIFICATION: Accounts & MIS Executive\n\n**Location**: Hyderabad, India (Full-Time, Onsite)\n**Experience**: 3 to 5 Years\n**Salary**: ₹4.5L - ₹6.5L CTC based on expertise\n\n## Core Objective\nWe are looking for a rigorous, detailed Accounts & MIS Executive to handle daily financial bookkeeping, tax filings, and prepare critical executive reports on our commercial properties division.\n\n## Key Responsibilities\n* **Ledger Entries**: Manage complete cash flows, journal ledgers, and voucher bookings in **Tally Prime**.\n* **Indirect Taxes**: File monthly GST returns (GSTR-1, GSTR-3B) and perform quarterly reconciliations.\n* **TDS Withholding**: Calculate and deduct correct TDS parameters under Section 194I / 194C / 194J, depositing taxes on schedule.\n* **Executive MIS Reports**: Construct advanced monthly spreadsheets containing pivots, cash projections, and cost-center allocations in MS Excel.\n\n## Added Advantages\n* Prior working exposure inside a Chartered Accountant (CA) firm leading audits.\n* Experience representing developers in the Real-Estate / Construction niche.`;
          } else if (formatType === "LINKEDIN_DM") {
            fallback = `Hi [Candidate Name],\n\nI came across your profile and noticed your strong background in Tally, GST returns, and Chartered Accountant firm coordination in Hyderabad.\n\nWe are currently sourcing for an Accounts & MIS Executive to join an active real estate team in Hyderabad (3-5 yrs experience required). Given your hands-on work with complex MIS reports and TDS calculations, I felt you'd be a stellar match!\n\nWould you be open to a quick 10-minute callback tomorrow with our freelance HR consultant partner to discuss the package and role milestones?\n\nBest regards,\n[Your Name]`;
          } else {
            fallback = `Subject: Recruiting Partner Briefing: Accounts & MIS Executive (Hyderabad)\n\nDear Recruiter,\n\nWe are ready to initiate sourcing for a full-time Accounts & MIS Executive based in Hyderabad. Here are our strict qualification criteria:\n\n1. Experience: 3 to 5 years.\n2. Compulsory Tooling: Mastery of Tally Prime and advanced formatting, pivot tables in Excel.\n3. Tax Compliance: Hands-on filing of GSTR-1, GSTR-3B and TDS deposits.\n4. Educational/Work Foundation: Candidates with prior CA firm internship/staffing background are highly preferred.\n\nPlease share candidate CVs along with active CTC details, Hyderabad region commute times, and notice periods.`;
          }
        } else {
          // Dev
          if (formatType === "JD") {
            fallback = `# JOB HIGHLIGHT: Full-Stack Developer (AI-Leveraged Environment)\n\n**Position**: Freelance or Full-Time Senior Developer\n**Location**: Hyderabad, India (Hybrid office or Remote)\n**Stack**: TypeScript, React, Next.js, Node.js, Tailwind CSS\n\n## Core Objective\nWe are looking for an innovative software engineer who embraces modern software engineering productivity. You will build and scale web apps while explicitly leveraging productivity assistants (Cursor IDE, Claude 3.5 Sonnet, Copilot, ChatGPT) to ship code 2-3x faster than classical devs.\n\n## Key Duties\n* Design, write, and bundle responsive React modules styled with modern Tailwind layers.\n* Build highly robust REST and WebSocket backend routes within Node.js.\n* Adopt AI prompt workflows purposefully to speed up documentation, test writing, and bug hunting.\n\n## Requirements\n* Proven full-stack portfolio of deployed React applications.\n* Documented mastery of engineering tools (Cursor, Claude etc).`;
          } else if (formatType === "LINKEDIN_DM") {
            fallback = `Hey [Candidate Name],\n\nI was highly impressed by your GitHub projects, especially your React and cloud backend endpoints. Your mention of leveraging AI-assisted workflows (Cursor, Copilot, Claude) really stood out!\n\nWe're searching for a freelance or full-time Full-Stack Developer in Hyderabad who treats AI assistants to double their productivity. It's a high-impact, modern role making full use of progressive tools.\n\nIf you're eager to build next-gen apps at 2x velocity, let's connect! I'd love to schedule a brief call to share details.\n\nBest,\n[Your Name]`;
          } else {
            fallback = `Subject: Recruiting Briefing: AI-Powered Full-Stack Software Developer\n\nHello Sourcing Partner,\n\nWe are looking to contract or hire a modern, tech-forward Full-Stack Developer who utilizes Generative AI tools (ChatGPT, Claude, Cursor, GitHub Copilot) to accelerate product shipping cycles.\n\nRequired Specifications:\n- TypeScript, React/Vite, Node.js.\n- Demonstrated ability to ship production features at highly compressed timelines.\n- Open to freelance contract or permanent position.\n\nPlease evaluate profiles for their 'AI agility' and share active Git links during submission.`;
          }
        }
        setGeneratedText(fallback);
        setLoading(false);
      }, 1000);
    } finally {
      if (!errorText) {
        setLoading(false);
      }
    }
  };

  const handleCopy = () => {
    if (!generatedText) return;
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-[#EAE7DF] rounded-none p-8 text-left">
      <div className="border-b border-[#EAE7DF] pb-5 mb-6">
        <h2 className="text-2xl font-normal font-serif text-[#1A1A1A] flex items-center gap-2">
          AI Copywriting & Job Spec Workspace
        </h2>
        <p className="text-xs font-sans uppercase tracking-widest text-slate-400 mt-1">
          Formulate fine-tuned job descriptions, personalized pitches, or agency briefs instantly
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Controls Column */}
        <div className="lg:col-span-2 space-y-6 text-xs text-slate-600">
          
          {/* Target job */}
          <div>
            <label className="block text-[9px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-2.5">
              Target Opening Mandate
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRoleType("ACCOUNTS_MIS")}
                className={`py-2 px-3 border rounded-none font-bold text-[10px] uppercase tracking-wider text-center transition-colors cursor-pointer ${
                  roleType === "ACCOUNTS_MIS"
                    ? "border-[#1A1A1A] bg-[#F5F2EA] text-[#1A1A1A]"
                    : "border-[#EAE7DF] bg-white hover:bg-slate-50 text-slate-550"
                }`}
              >
                Accounts & MIS
              </button>
              <button
                type="button"
                onClick={() => setRoleType("FULLSTACK_DEVELOPER")}
                className={`py-2 px-3 border rounded-none font-bold text-[10px] uppercase tracking-wider text-center transition-colors cursor-pointer ${
                  roleType === "FULLSTACK_DEVELOPER"
                    ? "border-[#1A1A1A] bg-[#F5F2EA] text-[#1A1A1A]"
                    : "border-[#EAE7DF] bg-white hover:bg-slate-50 text-slate-550"
                }`}
              >
                Full-Stack Dev
              </button>
            </div>
          </div>

          {/* Formats */}
          <div>
            <label className="block text-[9px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-2.5">
              Select Output Channel Format
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded-none border border-[#EAE7DF] cursor-pointer hover:bg-[#F5F2EA] bg-white transition-all select-none">
                <input
                  type="radio"
                  name="formatType"
                  checked={formatType === "JD"}
                  onChange={() => setFormatType("JD")}
                  className="h-4 w-4 accent-[#1A1A1A]"
                />
                <span className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-slate-400" />
                  <div>
                    <span className="font-serif text-sm text-[#1A1A1A] block">Job Specification (JD)</span>
                    <span className="text-[10px] text-slate-400 block font-serif italic">Role scope, tax rules, and system constraints</span>
                  </div>
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-none border border-[#EAE7DF] cursor-pointer hover:bg-[#F5F2EA] bg-white transition-all select-none">
                <input
                  type="radio"
                  name="formatType"
                  checked={formatType === "LINKEDIN_DM"}
                  onChange={() => setFormatType("LINKEDIN_DM")}
                  className="h-4 w-4 accent-[#1A1A1A]"
                />
                <span className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-slate-400" />
                  <div>
                    <span className="font-serif text-sm text-[#1A1A1A] block">LinkedIn Connect Pitch</span>
                    <span className="text-[10px] text-slate-400 block font-serif italic">Clean, engaging copy for cold direct messaging</span>
                  </div>
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-none border border-[#EAE7DF] cursor-pointer hover:bg-[#F5F2EA] bg-white transition-all select-none">
                <input
                  type="radio"
                  name="formatType"
                  checked={formatType === "EMAIL_PITCH"}
                  onChange={() => setFormatType("EMAIL_PITCH")}
                  className="h-4 w-4 accent-[#1A1A1A]"
                />
                <span className="flex items-center gap-2">
                  <Send className="h-4 w-4 text-slate-400" />
                  <div>
                    <span className="font-serif text-sm text-[#1A1A1A] block">Partner Briefing Email</span>
                    <span className="text-[10px] text-slate-400 block font-serif italic">Executive guidelines shared for your HR freelancer</span>
                  </div>
                </span>
              </label>
            </div>
          </div>

          {/* Custom specifications */}
          <div>
            <label className="text-[9px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-2 justify-between flex">
              <span>Specific Mandate Directives</span>
              <span className="text-slate-400 normal-case font-serif italic font-normal">Optional</span>
            </label>
            <textarea
              rows={4}
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder={getPromptPlaceholder()}
              className="w-full p-3 border border-[#EAE7DF] rounded-none focus:outline-none focus:border-[#C48F5B] text-xs text-[#1A1A1A] placeholder-slate-400 bg-white"
            />
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={handleGenerate}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-none bg-[#1A1A1A] hover:bg-[#C48F5B] text-white font-sans font-bold uppercase tracking-widest text-[10px] transition-colors cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4 text-[#C48F5B]" />
            {loading ? "Authoring copy details..." : "Draft Verified outreach"}
          </button>

        </div>

        {/* Output Column */}
        <div className="lg:col-span-3 flex flex-col justify-between bg-[#FDFCF8] border border-[#EAE7DF] rounded-none p-6 min-h-[420px] relative">
          
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE7DF] mb-5">
              <span className="text-[9px] font-bold text-[#1A1A1A] uppercase tracking-widest flex items-center gap-1">
                Output Appraisal View
              </span>
              {generatedText && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 text-[9px] font-sans uppercase tracking-widest font-bold text-[#1A1A1A] hover:text-[#C48F5B] bg-white border border-[#EAE7DF] py-1 px-3 rounded-none transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-600" />
                      COPIED!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 text-[#C48F5B]" />
                      COPY SPEC
                    </>
                  )}
                </button>
              )}
            </div>

            {errorText && (
              <div className="mb-4 p-4 bg-[#F5F2EA] border-l-2 border-[#C48F5B] text-xs font-serif leading-relaxed text-slate-700">
                {errorText}
              </div>
            )}

            {loading ? (
              <div className="py-24 flex flex-col items-center justify-center space-y-4">
                <div className="h-8 w-8 border-2 border-[#1A1A1A] border-t-transparent rounded-none animate-spin"></div>
                <div className="text-center">
                  <p className="text-sm font-serif text-[#1A1A1A]">Authoring copy with Gemini...</p>
                  <p className="text-[9px] text-slate-400 mt-1 uppercase tracking-wider font-sans">Leveraging premium location & taxation criteria</p>
                </div>
              </div>
            ) : generatedText ? (
              <div className="text-xs text-slate-750 leading-relaxed font-serif bg-white border border-[#EAE7DF] p-6 rounded-none max-h-[360px] overflow-y-auto whitespace-pre-wrap select-text text-left">
                {generatedText}
              </div>
            ) : (
              <div className="py-24 text-center text-slate-400 flex flex-col items-center justify-center">
                <p className="text-sm font-serif font-normal text-slate-700">No Copy Generated</p>
                <p className="text-xs text-slate-400 mt-1.5 max-w-sm uppercase tracking-wider font-sans leading-relaxed">
                  Specify details on the left and click the button to draft standard recruitment assets.
                </p>
                <button
                  onClick={handleGenerate}
                  className="mt-5 inline-flex items-center gap-1.5 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#F5F2EA] rounded-none py-1.5 px-3.5 text-[9px] font-sans font-bold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Apply Default Spec
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-[#EAE7DF] flex items-center justify-between text-[10px] text-slate-400 font-sans tracking-tight uppercase">
            <span>Type: {formatType === "JD" ? "Job Specification" : formatType === "LINKEDIN_DM" ? "LinkedIn Outbox" : "Partner Brief"}</span>
            <span className="font-mono text-[#1A1A1A]/40 lowercase">gemini-3.5-flash</span>
          </div>

        </div>

      </div>
    </div>
  );
};
