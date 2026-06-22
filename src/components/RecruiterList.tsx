import React, { useState } from "react";
import { Consultant, MOCK_CONSULTANTS } from "../data";
import { Star, MapPin, Send, CheckCircle2, MessageSquare, Clipboard, ExternalLink, Mail, PhoneCall } from "lucide-react";

interface RecruiterListProps {
  onSelectedRecruiter?: (consultant: Consultant) => void;
}

export const RecruiterList: React.FC<RecruiterListProps> = () => {
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  
  // Form submission state
  const [inquirySubject, setInquirySubject] = useState("Assistance required for Accounts & Full-Stack roles");
  const [inquiryBody, setInquiryBody] = useState("");
  const [inquirerEmail, setInquirerEmail] = useState("");
  const [inquirerName, setInquirerName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const openInquiry = (consultant: Consultant) => {
    setSelectedConsultant(consultant);
    setInquirerName("");
    setInquirerEmail("");
    
    // Auto-draft an inquiry message based on their expertise
    let details = "";
    if (consultant.specialization.includes("Finance")) {
      details = "I need help sourcing a full-time Accounts & MIS Executive in Hyderabad with 3-5 years experience, strong Tally Prime expertise, GST/TDS filings, and ideal CA firm or real estate background.";
    } else if (consultant.specialization.includes("Tech")) {
      details = "I need help hiring an AI-powered Full-Stack Developer (Vite, React, Node) capable of leveraging modern AI helpers (Cursor, Copilot, ChatGPT, Claude) to accelerate shipping product features.";
    } else {
      details = "I need assistance filling two critical roles in Hyderabad: a full-time Accounts & MIS Executive (3-5 yrs, Tally, GST) and a Full-Stack Developer leveraging generative AI tools (Cursor, Claude, Copilot).";
    }

    setInquiryBody(`Hello ${consultant.name},\n\nI hope you are doing well.\n\nI am currently looking for an experienced freelance HR Consultant matching your profile. ${details}\n\nCould you please let me know your availability for a quick 15-minute call to discuss your sourcing rates, candidate networks in Hyderabad, and placement timeline?\n\nBest regards,\n[Your Name]`);
    setSubmitted(false);
    setShowInquiryModal(true);
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquirerEmail || !inquirerName) {
      alert("Please provide both your name and email so the recruiter can respond back.");
      return;
    }
    // Simulate API delivery
    setSubmitted(true);
    setTimeout(() => {
      // close shortly
    }, 4000);
  };

  return (
    <div className="bg-white rounded-none border border-[#EAE7DF] p-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-8 pb-6 border-b border-[#EAE7DF]">
        <div>
          <h2 className="text-3xl font-normal font-serif text-[#1A1A1A] flex items-center gap-3">
            Local Sourcing Partners & Experts
          </h2>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-sans mt-1">
            Exquisite recruitment advisors verified for deep corporate networks in Hyderabad
          </p>
        </div>
        <div className="border border-[#1A1A1A] bg-[#F5F2EA] text-slate-800 text-[10px] px-4 py-1.5 font-sans uppercase tracking-widest font-bold self-start sm:self-center">
          3 Partners Engaged
        </div>
      </div>

      {/* Grid of Consultants */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {MOCK_CONSULTANTS.map((consultant) => (
          <div 
            key={consultant.id}
            className="flex flex-col justify-between rounded-none border border-[#EAE7DF] bg-white hover:border-[#1A1A1A] p-6 transition-all duration-300 relative group"
          >
            <div>
              {/* Badge for specialization */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center rounded-none px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider bg-[#F5F2EA] text-[#1A1A1A] border border-[#EAE7DF]">
                  {consultant.specialization}
                </span>
                <span className="text-xs font-semibold text-[#C48F5B] flex items-center gap-1 font-serif">
                  ★ {consultant.rating}
                </span>
              </div>

              {/* Avatar & Info */}
              <div className="flex items-start gap-4">
                <div className="text-2xl p-2 bg-[#F5F2EA] rounded-none border border-[#EAE7DF] flex items-center justify-center shrink-0">
                  {consultant.avatar}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-normal text-[#1A1A1A] group-hover:text-[#C48F5B] transition-colors">
                    {consultant.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 font-sans uppercase tracking-wider flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3 text-[#C48F5B]" />
                    {consultant.location}
                  </p>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">
                    {consultant.company}
                  </p>
                </div>
              </div>

              {/* Bio description */}
              <p className="text-xs font-serif italic text-slate-650 mt-5 leading-relaxed">
                "{consultant.bio}"
              </p>

              {/* Expert tags info */}
              <div className="mt-5 flex flex-wrap gap-1">
                {consultant.expertSkills.slice(0, 3).map((skill, index) => (
                  <span 
                    key={index}
                    className="bg-[#F5F2EA] px-2 py-0.5 rounded-none text-[9px] text-[#1A1A1A] font-sans uppercase tracking-wider border border-[#EAE7DF]"
                  >
                    {skill}
                  </span>
                ))}
                {consultant.expertSkills.length > 3 && (
                  <span className="text-[9px] text-slate-400 self-center font-mono pl-1">
                    +{consultant.expertSkills.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Quick Pricing info & CTAs */}
            <div className="mt-6 pt-5 border-t border-[#EAE7DF] flex items-center justify-between gap-2">
              <div className="text-left">
                <span className="text-[9px] uppercase tracking-widest text-[#1A1A1A]/40 block">
                  Agreed Rate
                </span>
                <span className="text-sm font-serif font-bold text-[#1A1A1A]">
                  {consultant.hireRate}
                </span>
              </div>
              <button
                type="button"
                onClick={() => openInquiry(consultant)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-none bg-[#1A1A1A] text-white hover:bg-[#C48F5B] font-sans uppercase tracking-widest text-[10px] font-bold transition-all active:scale-95 cursor-pointer"
              >
                Inquire Pitch
                <Send className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Inquiry Modal */}
      {showInquiryModal && selectedConsultant && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn" id="inquiry-modal">
          <div className="relative w-full max-w-lg bg-[#FDFCF8] rounded-none shadow-2xl overflow-hidden border-2 border-[#1A1A1A] transition-all scale-100">
            
            {/* Modal Header */}
            <div className="bg-[#1A1A1A] p-6 text-white rounded-none">
              <div className="flex justify-between items-start">
                <div className="flex gap-4 items-center">
                  <div className="text-2xl p-1 bg-white/10 rounded-none shrink-0">
                    {selectedConsultant.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-normal font-serif">{selectedConsultant.name}</h3>
                    <p className="text-[10px] uppercase font-sans tracking-widest opacity-60">Consultation Brief Briefing</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowInquiryModal(false)}
                  className="p-1 px-2 border border-white/20 text-slate-400 hover:text-white transition-colors text-xs"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            {submitted ? (
              <div className="p-8 text-center flex flex-col items-center justify-center">
                <div className="h-12 w-12 bg-[#F5F2EA] text-[#C48F5B] border border-[#C48F5B]/30 rounded-none flex items-center justify-center mb-4">
                  ✓
                </div>
                <h4 className="text-xl font-normal font-serif text-[#1A1A1A]">Consultation Request Routed</h4>
                <p className="text-xs text-slate-600 mt-3 max-w-sm leading-relaxed">
                  We've simulated dispatching this mandate summary to <strong className="text-[#1A1A1A]">{selectedConsultant.name}</strong> at <code className="bg-[#F5F2EA] text-[#1A1A1A]/80 px-1 py-0.5 rounded-none text-xs">{selectedConsultant.contactEmail}</code>.
                </p>
                <div className="mt-6 bg-[#F5F2EA] p-4 rounded-none border border-[#EAE7DF] text-left w-full text-xs text-slate-500 font-sans space-y-1">
                  <div className="text-[#1A1A1A] font-bold uppercase tracking-wider text-[10px] mb-2 border-b border-[#1A1A1A]/10 pb-1">Direct Liaison Info</div>
                  <div>Direct Phone: {selectedConsultant.phone}</div>
                  <div>Primary Specialization: {selectedConsultant.specialization}</div>
                </div>
                <button
                  onClick={() => setShowInquiryModal(false)}
                  className="mt-6 w-full bg-[#1A1A1A] hover:bg-[#C48F5B] text-white rounded-none py-3 font-sans text-xs uppercase tracking-widest font-bold transition-colors"
                >
                  Dismiss Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="p-6 space-y-4">
                
                {/* Contact row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={inquirerName}
                      onChange={(e) => setInquirerName(e.target.value)}
                      placeholder="e.g. Sriyath Id"
                      className="w-full px-3 py-2 border border-[#EAE7DF] rounded-none focus:outline-none focus:border-[#C48F5B] text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-1.5">
                      Your Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      value={inquirerEmail}
                      onChange={(e) => setInquirerEmail(e.target.value)}
                      placeholder="e.g. sriyathid@gmail.com"
                      className="w-full px-3 py-2 border border-[#EAE7DF] rounded-none focus:outline-none focus:border-[#C48F5B] text-xs bg-white"
                    />
                  </div>
                </div>

                {/* Email Subject block */}
                <div>
                  <label className="block text-[9px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-1.5">
                    Consultation Subject line
                  </label>
                  <input
                    type="text"
                    value={inquirySubject}
                    onChange={(e) => setInquirySubject(e.target.value)}
                    className="w-full px-3 py-2 border border-[#EAE7DF] rounded-none focus:outline-none focus:border-[#C48F5B] text-xs bg-[#F5F2EA] text-[#1A1A1A]"
                  />
                </div>

                {/* Message text area */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-[9px] font-bold text-[#1A1A1A] uppercase tracking-widest">
                      Consultation Brief
                    </label>
                    <span className="text-[9px] text-[#C48F5B] font-bold uppercase tracking-wider">Preformatted Outline</span>
                  </div>
                  <textarea
                    rows={6}
                    required
                    value={inquiryBody}
                    onChange={(e) => setInquiryBody(e.target.value)}
                    className="w-full px-3 py-2 border border-[#EAE7DF] rounded-none focus:outline-none focus:border-[#C48F5B] text-xs font-sans leading-relaxed bg-white text-[#1A1A1A]"
                  />
                </div>

                {/* Direct recruitment insights tip */}
                <div className="bg-[#F5F2EA] rounded-none p-4 border border-[#EAE7DF] flex items-start gap-3">
                  <span className="text-[#C48F5B] text-lg leading-none shrink-0 font-serif">◈</span>
                  <p className="text-[11px] text-[#1A1A1A]/80 leading-relaxed font-serif">
                    <strong>Hyderabad Market Standard:</strong> Experienced accounts personnel trained inside CA firms maintain high corporate fidelity. Sourcing through local partners guarantees immediate 15-30 day placement velocity.
                  </p>
                </div>

                {/* Button Action */}
                <div className="flex gap-3 justify-end pt-3 border-t border-[#EAE7DF]">
                  <button
                    type="button"
                    onClick={() => setShowInquiryModal(false)}
                    className="px-4 py-2 text-xs font-sans uppercase tracking-widest text-slate-500 hover:bg-[#F5F2EA] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-bold bg-[#1A1A1A] text-white hover:bg-[#C48F5B] rounded-none shadow-sm uppercase tracking-widest transition-all flex items-center gap-1.5"
                  >
                    Send Mandate
                    <Send className="h-3 w-3" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
