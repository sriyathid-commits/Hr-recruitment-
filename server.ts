import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini SDK to prevent crash if key is loaded later
let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please add it via the Settings > Secrets configuration.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Check api health and key presence
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
  });
});

// AI Candidate Screener Endpoint
app.post("/api/screen-candidate", async (req, res) => {
  try {
    const { roleType, name, resumeText, experienceYears } = req.body;

    if (!roleType || !name || !resumeText) {
      return res.status(400).json({ error: "Missing required fields (roleType, name, resumeText)" });
    }

    const ai = getGemini();

    let jobDescriptionDetails = "";
    if (roleType === "ACCOUNTS_MIS") {
      jobDescriptionDetails = `
      Role: Accounts & MIS Executive
      Target Location: Hyderabad, India (Full-time)
      Experience Required: 3-5 years
      Key Requirements:
      - Tally Prime expertise
      - Strong GST filings & compliance
      - TDS process and deposit tracking
      - Microsoft Excel expertise & MIS reports generation
      Key Plus criteria:
      - Trainee or working background with Chartered Accountant (CA) firms
      - Experience in the real-estate/construction industry
      `;
    } else {
      jobDescriptionDetails = `
      Role: Full-Stack Developer
      Target Location: Freelance or Full-time, flexible hybrid/remote
      Key Requirements:
      - Build modern web / mobile applications
      - Highly proficient at leveraging progressive AI coding helpers (e.g. ChatGPT, Claude, Cursor, GitHub Copilot) to accelerate product output and maintain code standards
      - End-to-end frontend and backend development experience (e.g. TypeScript, React, Node.js, databases etc)
      `;
    }

    const systemPrompt = `You are an elite talent acquisition expert and HR consultant specializing in India-based recruitment.
    Your system instructions:
    Analyze the candidate's resume/profile details and evaluate them strictly against the target Role requirements.
    Be thorough, objective, and realistic. Provide scores, identified strengths, critical missing skills/gaps, a professional review, and exactly 3 tailor-made, highly specific screening questions customized for this candidate.
    Ensure to output structured JSON matching the requested schema.`;

    const instructions = `Candidate Name: "${name}"
    Reported Candidate Experience: ${experienceYears ? `${experienceYears} years` : "Not specified"}
    Candidate Resume / LinkedIn Profile text:
    """
    ${resumeText}
    """

    Matched against this Job Spec:
    """
    ${jobDescriptionDetails}
    """

    Please evaluate and respond in JSON with:
    - score: Integer (0 to 100) representing qualification fit.
    - fitCategory: String, one of: "Excellent Match", "Potential Match", "Not Suitable".
    - strengths: Array of strings (highlighting why they fit the criteria, specifically mapping to Tally/GST/Excel/CA background for Accountants OR React/Vite/Server/AI-Helpers for Developers).
    - gaps: Array of strings (highlighting missing skills or areas of concern, e.g., lack of Tally Prime, no Hyderabad location, or low experience).
    - evaluationSummary: A detailed 2-paragraph human-like developer HR consultant summary analyzing their fit, background, and whether we should schedule an interview.
    - screeningQuestions: Array of 3 items, each item:
      - question: String, a high-value interview screening question testing their direct expertise (e.g. asking them about a complex GST/TDS calculation they've done, or how they use prompts in Cursor to handle complex React state).
      - idealAnswerHint: String, guidelines of what answers the interviewer should expect to hear to confirm genuine knowledge.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: instructions,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["score", "fitCategory", "strengths", "gaps", "evaluationSummary", "screeningQuestions"],
          properties: {
            score: { type: Type.INTEGER },
            fitCategory: { type: Type.STRING },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            gaps: { type: Type.ARRAY, items: { type: Type.STRING } },
            evaluationSummary: { type: Type.STRING },
            screeningQuestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["question", "idealAnswerHint"],
                properties: {
                  question: { type: Type.STRING },
                  idealAnswerHint: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("AI Candidate screener error:", error);
    res.status(500).json({ error: error.message || "Failed to process evaluation" });
  }
});

// AI Job Assets Generator
app.post("/api/generate-outreach", async (req, res) => {
  try {
    const { roleType, formatType, customNotes } = req.body;
    
    if (!roleType || !formatType) {
      return res.status(400).json({ error: "Missing roleType or formatType" });
    }

    const ai = getGemini();

    let jobSubject = "";
    if (roleType === "ACCOUNTS_MIS") {
      jobSubject = "Accounts & MIS Executive (Hyderabad/Full-time, 3-5 years, Tally Prime, GST, TDS, Excel)";
    } else {
      jobSubject = "Full-Stack Developer (Vite, React, Node, leveraging AI Coding Assistants e.g. Cursor/GitHub Copilot)";
    }

    const prompt = `Write a premium, professional recruiting asset for our company.
    Role Target: ${jobSubject}
    Asset Type: ${formatType} (Options: JD, LINKEDIN_DM, EMAIL_PITCH)
    Additional context / Custom requests: "${customNotes || "none"}"
    
    Instructions:
    - If JD: Output a beautifully structured Job Description with About the Role, Key Responsibilities, Required Qualifications/Skills, Plus criteria (CA firm experience or real estate counts for Accounts!), and Why join us.
    - If LINKEDIN_DM: Output a highly engaging, high-conversion recruiter direct message (maximum 200 words) that is warm, respectful, highlights Hyderabad location context or AI-assisted dev context, and has a clear call to action.
    - If EMAIL_PITCH: Output a tailored recruiting pitch email (Subject & Body) that a freelance HR consultant can send to top candidates on their behalf.
    
    Output formatting: Format the output nicely in Markdown. Use elegant structure.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an elite, highly converting corporate recruiter writing premium outreach copy and job specifications that attract top Indian talent.",
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Outreach generation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate asset" });
  }
});

// Vite middleware configuration and static file serving
const startViteAndListen = async () => {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Hyderabad recruiting backend server listening on http://localhost:${PORT}`);
  });
};

startViteAndListen();
