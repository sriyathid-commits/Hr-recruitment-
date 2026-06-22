import React, { useState } from "react";
import { Candidate, MOCK_CANDIDATES } from "../data";
import { 
  Users, Check, AlertCircle, RefreshCw, Plus, Sparkles, 
  ChevronRight, Calendar, Award, GraduationCap, ArrowUpRight, HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const Screener: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(MOCK_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(MOCK_CANDIDATES[0]);
  const [showAddForm, setShowAddForm] = useState(false);

  // New candidate form states
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState<"ACCOUNTS_MIS" | "FULLSTACK_DEVELOPER">("ACCOUNTS_MIS");
  const [newExperience, setNewExperience] = useState(3);
  const [newLocation, setNewLocation] = useState("Hyderabad, India");
  const [newTitle, setNewTitle] = useState("");
  const [newSkillsInput, setNewSkillsInput] = useState("");
  const [newResumeText, setNewResumeText] = useState("");
  
  // AI state loaders
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleSelectCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setErrorText(null);
  };

  const handleAIScreen = async (candidateToScreen: Candidate) => {
    setLoading(true);
    setErrorText(null);
    try {
      const response = await fetch("/api/screen-candidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roleType: candidateToScreen.roleType,
          name: candidateToScreen.name,
          resumeText: candidateToScreen.rawResume,
          experienceYears: candidateToScreen.experienceYears,
        }),
      });

      if (!response.ok) {
        throw new Error("HTTP error " + response.status + ": Failed to evaluate candidate");
      }

      const report = await response.json();

      // Update in-memory state
      const updatedCandidates = candidates.map(c => {
        if (c.id === candidateToScreen.id) {
          return {
            ...c,
            score: report.score,
            fitCategory: report.fitCategory,
            strengths: report.strengths,
            gaps: report.gaps,
            evaluationSummary: report.evaluationSummary,
            screeningQuestions: report.screeningQuestions
          };
        }
        return c;
      });

      setCandidates(updatedCandidates);
      
      const found = updatedCandidates.find(c => c.id === candidateToScreen.id);
      if (found) {
        setSelectedCandidate(found);
      }
    } catch (err: any) {
      console.error(err);
      setErrorText("Gemini response parsing failed. Please verify that your GEMINI_API_KEY is configured under Settings > Secrets. In the meantime, we've provided fallback review scoring.");
      
      // Fallback fallback mocking if API key is not configured yet
      setTimeout(() => {
        const fallbackResults: Partial<Candidate> = {
          score: candidateToScreen.roleType === "ACCOUNTS_MIS" ? 82 : 75,
          fitCategory: "Potential Match",
          strengths: [
            "Matches basic criteria listed in your job guidelines.",
            "Local residency in Hyderabad district."
          ],
          gaps: [
            "Specific industry certifications need verification during onsite.",
            "Needs real-world code snippet or Excel spreadsheet test for MIS."
          ],
          evaluationSummary: `[Fallback Review] The Gemini API returned an error (likely due to missing API key in .env config). Here is a standard automated checklist: candidate possesses ${candidateToScreen.experienceYears} years experience. Raw background points are aligned with ${candidateToScreen.roleType}. Setup your key under UI Secrets to run actual deep appraisals.`,
          screeningQuestions: [
            {
              question: "Describe your experience matching invoice lists and accounting discrepancies.",
              idealAnswerHint: "Looking for methodical ledger checking on Tally and correct ledger adjustment entries representation."
            },
            {
              question: "How do you coordinate with CAs and partners for TDS assessments?",
              idealAnswerHint: "Expected to describe compiling TDS Form 16s and reconciliation sheets."
            },
            {
              question: "Explain how you use technology in your day to day workflow to solve challenging tasks.",
              idealAnswerHint: "Looks for practical examples of automating repetitive tasks."
            }
          ]
        };

        const updatedFallback = candidates.map(c => {
          if (c.id === candidateToScreen.id) {
            return {
              ...c,
              ...fallbackResults
            } as Candidate;
          }
          return c;
        });

        setCandidates(updatedFallback);
        const f = updatedFallback.find(c => c.id === candidateToScreen.id);
        if (f) setSelectedCandidate(f);
        setLoading(false);
      }, 1000);
    } finally {
      if (!errorText) {
        setLoading(false);
      }
    }
  };

  const submitNewCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newResumeText) {
      alert("Name and Resume Text description are core requirements.");
      return;
    }

    const skillsArray = newSkillsInput
      ? newSkillsInput.split(",").map(s => s.trim())
      : ["General Skills"];

    const newCand: Candidate = {
      id: "candidate-" + Date.now(),
      name: newName,
      roleType: newRole,
      experienceYears: Number(newExperience),
      location: newLocation,
      currentTitle: newTitle || (newRole === "ACCOUNTS_MIS" ? "Accountant" : "Developer"),
      skills: skillsArray,
      rawResume: newResumeText,
      fitCategory: "Pending Review"
    };

    const nextCands = [newCand, ...candidates];
    setCandidates(nextCands);
    setSelectedCandidate(newCand);
    setShowAddForm(false);

    // Reset fields
    setNewName("");
    setNewTitle("");
    setNewSkillsInput("");
    setNewResumeText("");

    // Auto-trigger screen for the newly added candidate
    await handleAIScreen(newCand);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* List Panel */}
      <div className="lg:col-span-5 bg-white border border-[#EAE7DF] rounded-none p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between pb-4 border-b border-[#EAE7DF] mb-5">
            <h3 className="text-xl font-normal font-serif text-[#1A1A1A] flex items-center gap-2">
              Candidate Pipelines
            </h3>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-1 text-[10px] uppercase font-sans tracking-widest font-bold bg-[#1A1A1A] text-white rounded-none px-3.5 py-2 hover:bg-[#C48F5B] transition-colors cursor-pointer"
            >
              {showAddForm ? "View Active" : "Add Candidate"}
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {showAddForm ? (
              <motion.form 
                key="add-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={submitNewCandidate}
                className="space-y-4 text-left"
              >
                <div className="bg-[#F5F2EA] rounded-none p-4 border border-[#EAE7DF] mb-3">
                  <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] block mb-1">AI Screening Desk</span>
                  <p className="text-slate-550 text-[11px] font-serif leading-relaxed">The appraisal model benchmarks candidate qualifications against local Chennai/Hyderabad tax statutes, Tally Prime standards, and cloud engineering setups.</p>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-1.5">Candidate Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Srinivas Reddy"
                    className="w-full p-2.5 border border-[#EAE7DF] rounded-none focus:outline-none focus:border-[#C48F5B] text-xs bg-white text-[#1A1A1A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-1.5">Target Mandate</label>
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value as any)}
                      className="w-full p-2.5 border border-[#EAE7DF] rounded-none focus:outline-none focus:border-[#C48F5B] text-xs bg-white text-[#1A1A1A]"
                    >
                      <option value="ACCOUNTS_MIS">Accounts & MIS Executive</option>
                      <option value="FULLSTACK_DEVELOPER">Full-Stack AI Developer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-1.5">Experience (Years)</label>
                    <input
                      type="number"
                      required
                      min={0}
                      max={25}
                      value={newExperience}
                      onChange={(e) => setNewExperience(Number(e.target.value))}
                      className="w-full p-2.5 border border-[#EAE7DF] rounded-none focus:outline-none focus:border-[#C48F5B] text-xs bg-white text-[#1A1A1A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-1.5">Current Title</label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Senior Accountant"
                      className="w-full p-2.5 border border-[#EAE7DF] rounded-none focus:outline-none focus:border-[#C48F5B] text-xs bg-white text-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-1.5">Location</label>
                    <input
                      type="text"
                      value={newLocation}
                      placeholder="e.g. Gachibowli, Hyderabad"
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full p-2.5 border border-[#EAE7DF] rounded-none focus:outline-none focus:border-[#C48F5B] text-xs bg-white text-[#1A1A1A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-1.5">Key Expertise Tags (Comma separated)</label>
                  <input
                    type="text"
                    value={newSkillsInput}
                    placeholder="e.g. Tally Prime, GST GSTR-3B, TDS reconciliation"
                    onChange={(e) => setNewSkillsInput(e.target.value)}
                    className="w-full p-2.5 border border-[#EAE7DF] rounded-none focus:outline-none focus:border-[#C48F5B] text-xs bg-white text-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-1.5">Raw Dossier details / Resume text *</label>
                  <textarea
                    rows={4}
                    required
                    value={newResumeText}
                    onChange={(e) => setNewResumeText(e.target.value)}
                    placeholder="Paste the candidate's education and corporate history here..."
                    className="w-full p-2.5 border border-[#EAE7DF] rounded-none focus:outline-none focus:border-[#C48F5B] font-sans text-xs bg-white text-[#1A1A1A]"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="w-1/3 py-2 border border-[#EAE7DF] text-slate-600 rounded-none hover:bg-[#F5F2EA] text-[10px] uppercase tracking-widest font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2 bg-[#1A1A1A] hover:bg-[#C48F5B] text-white rounded-none text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-1 px-4 transition-colors cursor-pointer"
                  >
                    Submit & Run AI Appraisal
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="candidate-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {candidates.map((c) => {
                  const isSelected = selectedCandidate?.id === c.id;
                  const hasReview = c.fitCategory !== "Pending Review";
                  
                  return (
                    <div
                      key={c.id}
                      onClick={() => handleSelectCandidate(c)}
                      className={`group cursor-pointer rounded-none border p-5 transition-all duration-200 text-left relative ${
                        isSelected 
                          ? "border-[#1A1A1A] bg-[#F5F2EA] ring-0" 
                          : "border-[#EAE7DF] hover:border-[#1A1A1A] bg-white"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className={`inline-block px-2 py-0.5 rounded-none text-[8px] font-sans tracking-widest uppercase mb-2 text-white font-bold ${
                            c.roleType === "ACCOUNTS_MIS" ? "bg-[#C48F5B]" : "bg-[#1A1A1A]"
                          }`}>
                            {c.roleType === "ACCOUNTS_MIS" ? "Accounts / MIS" : "Full-stack AI Dev"}
                          </span>
                          <h4 className="font-serif text-lg font-normal text-[#1A1A1A] leading-tight group-hover:text-[#C48F5B] transition-colors">
                            {c.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 font-sans mt-1">
                            {c.currentTitle} • {c.experienceYears} Yrs Exp
                          </p>
                        </div>

                        {/* Fit score badge */}
                        <div className="text-right shrink-0">
                          {hasReview ? (
                            <div className="flex flex-col items-end">
                              <span className="text-[10px] font-serif font-bold border border-[#1A1A1A] px-2 py-0.5 bg-white text-[#1A1A1A]">
                                {c.score}% Match
                              </span>
                              <span className="text-[9px] font-sans uppercase tracking-widest text-[#1A1A1A]/50 mt-1">
                                {c.fitCategory}
                              </span>
                            </div>
                          ) : (
                            <span className="inline-block border border-dashed border-[#1A1A1A]/40 text-[9px] uppercase tracking-wider text-slate-500 px-2 py-0.5 bg-[#FDFCF8]">
                              Pending AI Review
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Display a snippet of skills */}
                      <div className="mt-4 flex flex-wrap gap-1">
                        {c.skills.slice(0, 3).map((sk, index) => (
                          <span 
                            key={index} 
                            className="bg-[#F5F2EA] text-[#1A1A1A] px-2 py-0.5 rounded-none text-[9px] border border-[#EAE7DF] font-sans uppercase tracking-wide"
                          >
                            {sk}
                          </span>
                        ))}
                        {c.skills.length > 3 && (
                          <span className="text-[9px] text-slate-400 self-center pl-1 font-mono">
                            +{c.skills.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Relocation indicator */}
                      <div className="mt-4 pt-3 border-t border-[#EAE7DF] flex justify-between items-center text-[10px] uppercase tracking-widest text-slate-400 font-sans font-semibold">
                        <span>📍 {c.location}</span>
                        <ChevronRight className="h-3.5 w-3.5 text-[#1A1A1A] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 pt-5 border-t border-[#EAE7DF] text-left">
          <p className="text-[11px] text-slate-400 leading-relaxed font-serif">
            <strong>Mandate Note:</strong> Candidates with direct corporate billing background in Gachibowli or Madhapur present premium pipeline indicators.
          </p>
        </div>
      </div>

      {/* Screen Report / Appraisal Panel */}
      <div className="lg:col-span-7 bg-[#FDFCF8] border border-[#EAE7DF] rounded-none p-8 flex flex-col justify-between text-left">
        {selectedCandidate ? (
          <div>
            
            {/* Top overview card */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline pb-6 border-b border-[#EAE7DF] gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-none text-[8px] font-bold tracking-widest uppercase text-white ${
                    selectedCandidate.roleType === "ACCOUNTS_MIS" ? "bg-[#C48F5B]" : "bg-[#1A1A1A]"
                  }`}>
                    {selectedCandidate.roleType === "ACCOUNTS_MIS" ? "ACCOUNTS & MIS SPECIALIST" : "FULL-STACK AI BUILDER"}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-serif italic text-[#C48F5B]">
                    ◈ {selectedCandidate.experienceYears} Years Exp
                  </span>
                </div>
                <h3 className="text-4xl font-normal font-serif text-[#1A1A1A] tracking-tight">{selectedCandidate.name}</h3>
                <p className="text-xs font-sans tracking-widest uppercase text-slate-400 mt-1">
                  Current: <strong className="text-[#1A1A1A]">{selectedCandidate.currentTitle}</strong> • {selectedCandidate.location}
                </p>
              </div>

              {selectedCandidate.fitCategory !== "Pending Review" ? (
                <div className="flex items-center gap-4 bg-[#F5F2EA] p-4 rounded-none border border-[#EAE7DF] w-full sm:w-auto justify-between sm:justify-start">
                  <div className="text-left">
                    <span className="text-[9px] text-slate-500 block uppercase tracking-widest font-sans">Appraisal Assessment</span>
                    <span className="text-lg font-serif font-bold text-[#1A1A1A]">
                      {selectedCandidate.score}% Match Score
                    </span>
                  </div>
                  
                  {/* Circular/mini visual feedback */}
                  <div className="h-11 w-11 rounded-none border border-[#1A1A1A] bg-white flex items-center justify-center font-serif text-sm font-semibold text-[#1A1A1A]">
                    {selectedCandidate.score}%
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleAIScreen(selectedCandidate)}
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-none bg-[#1A1A1A] hover:bg-[#C48F5B] text-white font-sans font-bold uppercase tracking-widest text-[10px] transition-colors cursor-pointer"
                >
                  <Sparkles className="h-4 w-4 text-[#C48F5B]" />
                  Verify AI Credentials
                </button>
              )}
            </div>

            {/* Error notifications */}
            {errorText && (
              <div className="mt-4 p-4 bg-[#F5F2EA] border-l-4 border-[#C48F5B] text-xs text-slate-700 flex items-start gap-3">
                <AlertCircle className="h-4 w-4 shrink-0 text-[#C48F5B] mt-0.5" />
                <span className="font-serif leading-relaxed">{errorText}</span>
              </div>
            )}

            {/* Loading Cover */}
            {loading ? (
              <div className="py-24 flex flex-col items-center justify-center space-y-4">
                <div className="h-10 w-10 border-2 border-[#1A1A1A] border-t-transparent rounded-none animate-spin"></div>
                <div className="text-center">
                  <p className="font-serif font-normal text-[#1A1A1A] text-lg">Analyzing with Gemini Intelligence...</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm leading-relaxed font-sans uppercase tracking-widest">
                    Benchmarking ledger accuracy & AI code templates against Hyderabad hiring rulesets
                  </p>
                </div>
              </div>
            ) : (
              <div>
                {selectedCandidate.fitCategory !== "Pending Review" ? (
                  <div className="space-y-8 mt-6 text-left">
                    
                    {/* Suitability summary */}
                    <div>
                      <h4 className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-3 flex items-center gap-2 border-l-2 border-[#C48F5B] pl-3">
                        Professional Suitability Report
                      </h4>
                      <p className="bg-white rounded-none p-6 border border-[#EAE7DF] text-[#1A1A1A]/80 leading-relaxed font-serif text-[15px] whitespace-pre-line shadow-none">
                        {selectedCandidate.evaluationSummary}
                      </p>
                    </div>

                    {/* Strengths & Gaps (Split bento grid layout) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Identified Strengths */}
                      <div className="border border-emerald-100 bg-[#FBFDF8] p-5 rounded-none">
                        <h5 className="text-[10px] uppercase tracking-widest font-sans font-bold text-emerald-800 flex items-center gap-1.5 mb-3">
                          ✓ Key Alignment & Strengths
                        </h5>
                        <ul className="space-y-2 font-serif text-slate-700 text-xs">
                          {selectedCandidate.strengths?.map((str, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-emerald-500">•</span>
                              <span>{str}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Noted Gaps or Concerns */}
                      <div className="border border-amber-100 bg-[#FDFBF2] p-5 rounded-none">
                        <h5 className="text-[10px] uppercase tracking-widest font-sans font-bold text-amber-800 flex items-center gap-1.5 mb-3">
                          ⧉ Noted Gaps / Observations
                        </h5>
                        <ul className="space-y-2 font-serif text-slate-700 text-xs">
                          {selectedCandidate.gaps?.map((gap, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-[#C48F5B]">•</span>
                              <span>{gap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>

                    {/* Tailor-made Interview screening questions */}
                    {selectedCandidate.screeningQuestions && (
                      <div className="pt-2">
                        <h4 className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-4 flex items-center gap-2 border-l-2 border-[#1A1A1A] pl-3">
                          Suggested Structural Screening Questions
                        </h4>
                        <div className="space-y-4">
                          {selectedCandidate.screeningQuestions.map((q, idx) => (
                            <div key={idx} className="bg-white rounded-none p-5 border border-[#EAE7DF]">
                              <p className="font-serif text-sm font-medium text-[#1A1A1A] flex items-start gap-1">
                                <span className="bg-[#1A1A1A] text-white text-[8px] uppercase tracking-widest font-sans font-bold px-1.5 py-0.5 rounded-none mr-2 shrink-0 mt-0.5">Q{idx+1}</span>
                                <span className="leading-relaxed">{q.question}</span>
                              </p>
                              <div className="mt-3 pl-4 border-l-2 border-[#C48F5B] text-slate-600 font-serif text-xs italic leading-relaxed">
                                <strong className="text-slate-500 font-sans not-italic block uppercase tracking-wider text-[8px] mb-1">Ideal Response Criteria:</strong>
                                {q.idealAnswerHint}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Resume Source text block */}
                    <div className="pt-4 border-t border-[#EAE7DF]">
                      <details className="cursor-pointer group">
                        <summary className="text-[10px] font-bold uppercase tracking-widest font-sans text-slate-400 hover:text-[#C48F5B] flex items-center gap-1.5 outline-none select-none">
                          View Raw Portfolio Dossier / CV text
                        </summary>
                        <pre className="mt-3 bg-[#1A1A1A] text-slate-300 text-[11px] p-5 rounded-none overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed max-h-48 border border-[#1A1A1A]">
                          {selectedCandidate.rawResume}
                        </pre>
                      </details>
                    </div>

                  </div>
                ) : (
                  <div className="py-20 text-center font-serif flex flex-col items-center justify-center">
                    <div className="h-12 w-12 bg-[#F5F2EA] border border-[#EAE7DF] flex items-center justify-center text-[#C48F5B] mb-4 text-sm">
                      ◈
                    </div>
                    <p className="text-lg font-normal text-[#1A1A1A]">Review Pending Authentication</p>
                    <p className="text-xs text-slate-500 mt-2 max-w-sm leading-relaxed font-sans uppercase tracking-widest">
                      New addition detected! Click the button below to formulate the structural appraisal report.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleAIScreen(selectedCandidate)}
                      className="mt-6 px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#C48F5B] text-white text-[10px] font-bold uppercase tracking-widest rounded-none transition-colors border border-[#1A1A1A]"
                    >
                      Authenticate Profile
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        ) : (
          <div className="py-24 text-center text-slate-400 font-serif italic text-sm">
            Select a candidate from the left panel pipeline to review their recruitment appraisal.
          </div>
        )}

        {/* Action controls footer */}
        <div className="mt-8 pt-5 border-t border-[#EAE7DF] flex items-center justify-between gap-4">
          <div className="text-[10.5px] text-slate-400 font-mono tracking-wide uppercase">
            File Code: {selectedCandidate?.id || "N/A"}
          </div>
          {selectedCandidate && selectedCandidate.fitCategory !== "Pending Review" && (
            <button
              onClick={() => handleAIScreen(selectedCandidate)}
              disabled={loading}
              className="inline-flex items-center gap-1.5 text-[9px] font-sans uppercase tracking-widest text-[#1A1A1A] hover:text-[#C48F5B] font-bold py-1.5 px-3 rounded-none border border-[#1A1A1A] hover:bg-[#F5F2EA] transition bg-white cursor-pointer"
            >
              <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
              Re-evaluate File
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
