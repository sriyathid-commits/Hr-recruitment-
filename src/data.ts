export interface Consultant {
  id: string;
  name: string;
  company: string;
  location: string;
  rating: number;
  experienceYears: number;
  specialization: "Finance & Accounting" | "Tech & AI Dev" | "Generalist / Both";
  avatar: string;
  hireRate: string;
  successfulPlacements: number;
  expertSkills: string[];
  bio: string;
  contactEmail: string;
  phone: string;
}

export interface Candidate {
  id: string;
  name: string;
  roleType: "ACCOUNTS_MIS" | "FULLSTACK_DEVELOPER";
  experienceYears: number;
  location: string;
  currentTitle: string;
  skills: string[];
  rawResume: string;
  // AI Screen results (pre-computed/mock until evaluated via API)
  score?: number;
  fitCategory?: "Excellent Match" | "Potential Match" | "Not Suitable" | "Pending Review";
  strengths?: string[];
  gaps?: string[];
  evaluationSummary?: string;
  screeningQuestions?: { question: string; idealAnswerHint: string }[];
}

export const MOCK_CONSULTANTS: Consultant[] = [
  {
    id: "consultant-1",
    name: "Srinivas Rao",
    company: "Apex HR Advisors India",
    location: "Gachibowli, Hyderabad",
    rating: 4.9,
    experienceYears: 12,
    specialization: "Finance & Accounting",
    avatar: "👨‍💼",
    hireRate: "₹25,000 / role filled",
    successfulPlacements: 140,
    expertSkills: ["CA Firm Coordination", "Tally Prime", "Indirect Tax Compliance", "Real Estate Financials"],
    bio: "Ex-KPMG recruiter with over a decade of experience filling key financial, accounting, and direct/indirect tax roles for Hyderabad real estate developers and infrastructure startups.",
    contactEmail: "srinivas.rao@apexhradvisors.in",
    phone: "+91 98480 22311"
  },
  {
    id: "consultant-2",
    name: "Priyanka Sen",
    company: "EliteTech Consultants",
    location: "Madhapur, Hyderabad",
    rating: 4.8,
    experienceYears: 8,
    specialization: "Tech & AI Dev",
    avatar: "👩‍💻",
    hireRate: "₹35,000 / retainer or role filled",
    successfulPlacements: 95,
    expertSkills: ["AI Engineering", "React/Node Developer Screening", "Cursor/Copilot Workflows", "Freelance Staffing"],
    bio: "Tech talent acquisition partner specialized in modern web stacks, mobile platforms, and screening developers who maximize output using generative AI tools like GitHub Copilot and Claude-3.5.",
    contactEmail: "priyanka@elitetechrecruiters.co.in",
    phone: "+91 99011 55432"
  },
  {
    id: "consultant-3",
    name: "Komal Naidu",
    company: "Hyderabad Elite Hires",
    location: "Secunderabad, Hyderabad",
    rating: 4.7,
    experienceYears: 10,
    specialization: "Generalist / Both",
    avatar: "👩‍💼",
    hireRate: "10% of annual CTC",
    successfulPlacements: 210,
    expertSkills: ["End-to-End Search", "Salary Benchmarking", "Local Hyderabad Sourcing", "TDS/GST & MIS Roles"],
    bio: "A versatile independent HR practitioner with deep networks across commercial CA firms and emerging technology hubs in Hitec City. Fast turnaround and comprehensive background verifications.",
    contactEmail: "komal.naidu@hyderabadhires.res.in",
    phone: "+91 81234 99002"
  }
];

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: "cand-1",
    name: "Ramesh Korrapati",
    roleType: "ACCOUNTS_MIS",
    experienceYears: 4,
    location: "Kukatpally, Hyderabad",
    currentTitle: "Senior Accountant",
    skills: ["Tally Prime", "GST Returns (GSTR-1, 3B)", "TDS Deposits", "Excel pivot table / VLOOKUP", "Real-estate billing"],
    rawResume: `Ramesh Korrapati
Email: ramesh.k@example.com | Phone: +91 98455 12121
Location: Kukatpally, Hyderabad, India

SUMMARY:
Dedicated accountant with 4 years of solid experience managing core financials, MIS, and direct/indirect tax filings. Worked for 2 years directly under a reputed Chartered Accountant (CA) firm before transitioning to a commercial real estate builder Group in Madhapur.

EXPERIENCE:
1. Senior Executive Accountant | SV Infra Realtors (Nov 2024 - Present)
- Handled complete accounts payables/receivables on Tally Prime.
- Filed monthly GSTR-1, GSTR-3B and quarterly TDS returns with extreme accuracy.
- Prepared end-of-month MIS reports in Excel for management review, using complex formatting, lookups, and pivot charts.

2. Audit Assistant | K.S. Rao & Associates (CA Firm) (Jul 2022 - Oct 2024)
- Managed accounting entries, physical ledger verification, and TDS deposit schedules for 10+ SME clients.
- Assisted CA partners with income tax assessments and compliance drafts.

EDUCATION & SKILLS:
- Bachelor of Commerce (B.Com) from Osmania University, Hyderabad (First Class: 78%)
- Mastery in Tally Prime, MS Excel (advanced formulas & macros), GST Portal, and TDS processing.`,
    score: 94,
    fitCategory: "Excellent Match",
    strengths: [
      "4 years of practical experience directly aligned with expectations.",
      "Dual background: CA Firm training + Real estate construction developer exposure.",
      "High proficiency in Tally Prime, active GST filings, and advanced Excel MIS."
    ],
    gaps: [
      "No major gaps identified; lives locally in Kukatpally, ready for immediate onsite Hyderabad."
    ],
    evaluationSummary: "Ramesh is a perfect archetype for the Accounts & MIS Executive. He has completed the rigorous CA firm audit training as a foundation, worked on construction industry accounting (SV Infra), and performs GST and Excel modeling daily. Definitely shortlist immediately.",
    screeningQuestions: [
      {
        question: "Explain how you handle GST invoicing under RCM (Reverse Charge Mechanism) for construction materials on SV Infra Realtors.",
        idealAnswerHint: "Expected to mention checking specific supplier registration status, mapping GST tax rates on Tally Prime, accounting under RCM ledger, and generating self-invoices and payment voucher entries."
      },
      {
        question: "Can you describe a complex MIS spreadsheet model you built in Excel? How did you automate or protect the summaries?",
        idealAnswerHint: "Expected to highlight using INDEX/MATCH, Dynamic Arrays, Pivot tables, or simple VBA macros, plus locking formulas to prevent data entry errors by non-fiancial personnel."
      },
      {
        question: "Under Section 194C (payments to contractors), what is the TDS rate and how do you track delayed payments on Tally?",
        idealAnswerHint: "Expected to answer: 1% for individuals/HUFs, 2% for others. Delayed deposit tracks through Tally's TDS outstanding reports, matching corresponding tax ledgers."
      }
    ]
  },
  {
    id: "cand-2",
    name: "Vikram Malhotra",
    roleType: "FULLSTACK_DEVELOPER",
    experienceYears: 5,
    location: "Secunderabad, Hyderabad (Open to Freelance)",
    currentTitle: "Full-Stack Software Engineer",
    skills: ["React", "Node.js", "Express", "TypeScript", "Tailwind CSS", "Cursor IDE", "Claude Sonnet", "PostgreSQL"],
    rawResume: `Vikram Malhotra
Website: vikdev.io | GitHub: github.com/vikmalhotra
Location: Hyderabad / Fully Remote

PROFESSIONAL SUMMARY:
Dynamic Full-Stack Web and Mobile Developer with 5 years of software building experience. Extremely efficient developer who adopts modern development tools: I leverage Cursor (IDE), GitHub Copilot, ChatGPT Pro, and Claude 3.5 Sonnet to design, debug, and ship production features twice as fast as classical developers. Specialized in TypeScript, React, Express, Next.js, React Native, and robust API design.

TECH STACK:
- Frontend: React.js, Next.js, React Native, HTML5, Tailwind CSS, Motion/Framer.
- Backend: Node.js (Express), NestJS, PostgreSQL, Prisma, Redis.
- AI Helper Toolchains: Cursor, Claude-3.5-Sonnet custom prompt engineering, GitHub Copilot.

SELECTED COMPLETED PROJECTS:
1. SaaS HR Planner: Designed database structure and multi-tenant authentication in 4 days instead of 2 weeks by utilizing Cursor agentic code execution loops and Claude refactoring.
2. Cross-Platform Fleet Delivery App: Built React Native app targeting logistics riders in Hyderabad. Integrated real-time tracking via Google Maps API.

EXPERIENCE:
- Senior Product Developer (Freelance / Contract) | DevScale LLC (2025 - Present)
- Full-Stack Developer | HitecTech Solutions, Hyderabad (2022 - 2025)`,
    score: 96,
    fitCategory: "Excellent Match",
    strengths: [
      "5 years of rich engineering expertise spanning modern web + mobile apps (React Native).",
      "Explicitly documented workflow leveraging Cursor, Copilot, ChatGPT, and Claude to multiply developer output.",
      "Lives in Hyderabad; highly comfortable with either full-time or flexible freelance arrangements."
    ],
    gaps: [
      "Needs a clear, structured sandbox task to demonstrate that AI assistance results in high-quality, maintainable code rather than sloppy prompt generation."
    ],
    evaluationSummary: "Vikram represents a highly advanced cohort of modern 'AI-powered developers'. Rather than resisting AI, he integrates Cursor and Claude into his core coding stack, leading to highly compressed shipping cycles. Excellent candidate for modern, high-intensity startups.",
    screeningQuestions: [
      {
        question: "How do you use Cursor's Composer or Claude's agentic loop to refactor large legacy React files without breaking complex side effects?",
        idealAnswerHint: "Expected to talk about feeding specific context files, instructing the model to generate TypeScript interfaces first, and performing targeted verification of state dependencies instead of blindly copy-pasting code."
      },
      {
        question: "Describe your strategy for ensuring security when writing backend routes and SQL queries using code suggestions from Copilot.",
        idealAnswerHint: "Should explain that Copilot can generate SQL injection hazards or expose secrets. They must explicitly audits AI findings, enforce SQL parameterization/ORMs, and keep secrets in robust process-level environment configs."
      },
      {
        question: "What is your typical stack for deploying interactive React web apps and a Node server with quick CI/CD turnarounds?",
        idealAnswerHint: "Expected to mention tools like Vite, Docker on Cloud Run/Vercel/Render, custom Github Actions, or self-hosted servers depending on scalability needs."
      }
    ]
  },
  {
    id: "cand-3",
    name: "Sunita Reddy",
    roleType: "ACCOUNTS_MIS",
    experienceYears: 1,
    location: "Secunderabad, Hyderabad",
    currentTitle: "Junior Billing Executive",
    skills: ["Basic Tally ERP 9", "MS Excel basics", "Invoice entry"],
    rawResume: `Sunita Reddy
Hyderabad, India

SUMMARY:
1 year of experience in basic billing and data entry operations. Seeking a role as an accountant with SV real estate or similar group.

EXPERIENCE:
- Billing Assistant | Local Wholesale Grocer (2025 - Present)
  - Logged supplier bills into Tally ERP 9.
  - Calculated simple outstanding balances.
  
EDUCATION:
- B.Com (General), Osmania University (Graduated 2025)`,
    score: 45,
    fitCategory: "Not Suitable",
    strengths: [
      "B.Com graduate based in Hyderabad."
    ],
    gaps: [
      "Inadequate experience (only 1 year vs required 3-5 years).",
      "No proven experience with the GST portal, active returns, or TDS deposit computations.",
      "Lacks CA firm exposure or complex corporate real-estate project billing knowledge.",
      "Excel skills are limited to basic entries (no advanced MIS/reporting)."
    ],
    evaluationSummary: "Sunita is a entry-level candidate who would require extensive training. She lacks the professional financial and tax foundations to manage complex MIS models and active GST compliance under GST laws. Recommend keeping on file for junior/intern openings eventually.",
    screeningQuestions: [
      {
        question: "Under GST, what is the difference between CGST, SGST, and IGST, and when are they applied?",
        idealAnswerHint: "CGST and SGST apply to intra-state transactions, whereas IGST applies to inter-state transactions. Intended to test basic tax geometry."
      },
      {
        question: "In Tally ERP 9, how do you verify if the trial balance is tallying?",
        idealAnswerHint: "Go to Display > Trial Balance. If debits equal credits, it matches. Testing basic Tally UI navigation."
      },
      {
        question: "What Excel formulas are you comfortable using for matching records?",
        idealAnswerHint: "Expected basic answers like VLOOKUP or equal operators, indicating she has not mastered XLOOKUP, INDEX-MATCH, or Pivot Tables."
      }
    ]
  }
];

export const HYDERABAD_RECRUITMENT_INSIGHTS = {
  averageSalary: {
    accounts: "₹4.5L - ₹6.5L per annum (CTC)",
    developer: "₹6L - ₹15L per annum (depending on experience & freelancing contracts)"
  },
  recruitmentTaxRules: "When hiring freelancing developers or consultants, TDS is typically deducted under Section 194J at 2% (Technical Services) or under Section 194C if framed as a general vendor contract.",
  marketHotspots: ["Hitec City", "Gachibowli", "Madhapur", "Kondapur", "Begumpet"]
};
