import express from "express";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import crypto from "crypto";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const USERS_FILE = path.join(process.cwd(), "users.json");

// Helper to read users from file
function readUsers(): any[] {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Error reading users file:", error);
    return [];
  }
}

// Helper to write users to file
function writeUsers(users: any[]) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing users file:", error);
  }
}

// Password hashing helpers
function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return { hash, salt };
}

function verifyPassword(password: string, hash: string, salt: string): boolean {
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return hash === verifyHash;
}

// In-memory sessions store
const sessions = new Map<string, { userId: string; email: string; fullName: string; expiresAt: number }>();

// Initialize Gemini SDK lazily to prevent crashing if the key is missing at load time.
let aiInstance: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Please add it in your Settings > Secrets panel.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// Ensure database query fails gracefully if key is missing or invalid
app.use((req, res, next) => {
  try {
    if (req.path.startsWith("/api/gemini")) {
      getGeminiClient(); // Quick verification
    }
    next();
  } catch (error: any) {
    console.error("Gemini client initialization error:", error.message);
    if (req.path.startsWith("/api/gemini")) {
      res.status(500).json({ error: error.message });
    } else {
      next();
    }
  }
});

// ==========================================
// API ROUTES
// ==========================================

// AUTH ENDPOINTS
// 1. Auth Signup
app.post("/api/auth/signup", (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;

  if (!fullName || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters long." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  try {
    const users = readUsers();
    const lowerEmail = email.toLowerCase();
    if (users.some((u: any) => u.email.toLowerCase() === lowerEmail)) {
      return res.status(400).json({ error: "An account with this email already exists." });
    }

    const { hash, salt } = hashPassword(password);
    const newUser = {
      id: "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9),
      fullName,
      email: lowerEmail,
      hash,
      salt,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    writeUsers(users);

    // Generate session token
    const token = crypto.randomBytes(32).toString("hex");
    sessions.set(token, {
      userId: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 1 day
    });

    res.json({
      success: true,
      token,
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email
      }
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Failed to create investor account." });
  }
});

// 2. Auth Login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const users = readUsers();
    const lowerEmail = email.toLowerCase();
    const user = users.find((u: any) => u.email.toLowerCase() === lowerEmail);

    if (!user || !verifyPassword(password, user.hash, user.salt)) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    sessions.set(token, {
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 1 day
    });

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email
      }
    });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Failed to authenticate." });
  }
});

// 3. Auth Me (Verify Session)
app.get("/api/auth/me", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  const token = authHeader.split(" ")[1];
  const session = sessions.get(token);

  if (!session || session.expiresAt < Date.now()) {
    if (session) sessions.delete(token); // Clean up expired session
    return res.status(401).json({ error: "Session expired or invalid." });
  }

  res.json({
    success: true,
    user: {
      id: session.userId,
      fullName: session.fullName,
      email: session.email
    }
  });
});

// 4. Auth Logout
app.post("/api/auth/logout", (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    sessions.delete(token);
  }
  res.json({ success: true });
});

// RECOMMENDATION ENDPOINT WITH ENHANCED HIGH-FIDELITY INVESTMENT REPORT
app.post("/api/gemini/recommend", async (req, res) => {
  const {
    budget,
    region,
    sector,
    companySize,
    employees,
    goals,
    riskTolerance,
    country
  } = req.body;

  const targetCountry = country || "Tunisia";

  try {
    const ai = getGeminiClient();
    
    const prompt = `You are a world-class Investment Consultant, Financial Advisor, and Economic Analyst specializing in foreign direct investment (FDI) in ${targetCountry}.
A prospective international investor has provided the following profile:
- Selected Country: ${targetCountry}
- Budget: ${budget}
- Region of interest: ${region}
- Target Business Sector: ${sector}
- Target Company Size: ${companySize}
- Planned Number of Employees: ${employees}
- Core Investment Goals: ${goals}
- Risk Tolerance Level: ${riskTolerance}

Based on this investor profile, you must generate a professional, high-fidelity investment analysis that includes:
1. Three (3) highly customized, tailored, and realistic investment opportunities (projects) that suit this investor's profile, located in ${targetCountry}.
2. A comprehensive, objective "AI Explanation" describing why these selections make strategic and economic sense.
3. A highly detailed, realistic, and structured "Professional Investment Report" with exact Tunisian policies, market contexts, and infrastructure statuses.

You must return the result as a raw JSON object matching the following structure. Do not wrap the JSON in markdown code blocks. Just return the JSON text directly.

JSON Schema:
{
  "opportunities": [
    {
      "projectName": "Name of the investment project",
      "score": 95, // integer score from 0-100 based on alignment with the investor profile
      "expectedRoi": "E.g. '18% - 22% annual'",
      "startupCost": "Estimated startup budget required (e.g. '$200,000 USD')",
      "annualRevenue": "E.g. '$150,000 USD'",
      "annualProfit": "E.g. '$45,000 USD'",
      "riskLevel": "Low" | "Medium" | "High",
      "timeToProfit": "E.g. '18 Months'",
      "requiredWorkforce": "E.g. '15-20 bilingual technicians'",
      "suitableRegion": "Specific region/city/hub suited for this project",
      "exportPotential": "E.g. 'Very High (Direct export to Southern Europe)'",
      "growthPotential": "E.g. 'High'",
      "competitionLevel": "Low" | "Medium" | "High",
      "whySelected": "A brief explanation of why this fits the investor's budget, goals, and risk profile.",
      "advantages": ["Advantage 1", "Advantage 2", "Advantage 3"],
      "challenges": ["Challenge 1", "Challenge 2"],
      "description": "A detailed 2-3 sentence overview of the project concept, operations, and business model."
    }
  ],
  "aiExplanation": "A detailed analysis explaining why the AI chose these projects.",
  "report": {
    "executiveSummary": "A highly compelling narrative summarizing the entire recommended investment strategy, regional strengths, and financial prospects in Tunisia.",
    "recommendedSector": "The specific sector recommended, highlighting why Tunisia possesses competitive advantages here.",
    "suitableRegions": "The suggested Tunisian governorates/cities and their strategic positioning for this enterprise.",
    "marketOpportunities": "Analysis of local, regional, and European export market opportunities.",
    "estimatedInvestmentCost": "Clear description of estimated capital expenditures, pre-operating expenses, and working capital requirements.",
    "expectedRoi": "Detailed ROI analysis including payback period and return metrics.",
    "risks": "Identified operational, currency, or regulatory risks with proactive mitigation strategies.",
    "governmentIncentives": "A detailed overview of incentives, including corporate tax relief, social security contribution exemptions, customs duties exemptions, and Startup Act benefits if applicable.",
    "infrastructureAvailability": "Analysis of ports, airports, telecommunications (fiber optics), and industrial park availability in the chosen regions.",
    "swotAnalysis": {
      "strengths": ["Strategic Strength 1", "Strategic Strength 2", "Strategic Strength 3"],
      "weaknesses": ["Identified Limitation 1", "Identified Limitation 2"],
      "opportunities": ["Growth Opportunity 1", "Growth Opportunity 2", "Growth Opportunity 3"],
      "threats": ["Potential Threat 1", "Potential Threat 2"]
    },
    "recommendedNextSteps": [
      "Next Step 1 (e.g., Contact FIPA / APIA)",
      "Next Step 2 (e.g., Company incorporation & local lawyer consultation)",
      "Next Step 3 (e.g., Site selection and licensing applications)"
    ],
    "finalRecommendation": "A strong, definitive final advisory summary on whether to proceed with these Tunisian ventures."
  }
}

Ensure all financial figures, tax references, and infrastructure details are highly realistic and appropriate for ${targetCountry}'s current macroeconomic climate (e.g. including the role of FIPA, the Tunisian Investment Authority, specific Free Zones like Zarzis or Bizerte, mechatronics hubs like Novation City Sousse, or IT hubs like El Ghazala Technopark).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const cleanedText = text.replace(/```json\s?/g, "").replace(/```\s?/g, "").trim();
    const data = JSON.parse(cleanedText);
    res.json(data);
  } catch (error: any) {
    console.error("Error generating recommendations:", error);
    res.status(500).json({ error: error.message || "Failed to generate investment recommendations." });
  }
});

// 2. Chat Assistant Endpoint
app.post("/api/gemini/chat", async (req, res) => {
  const { message, history, country, context } = req.body;
  const targetCountry = country || "Tunisia";

  try {
    const ai = getGeminiClient();

    let contextInstructions = "";
    if (context) {
      contextInstructions = `\n\n[Active Map Context Selected by Investor: ${JSON.stringify(context)}]
The investor is currently exploring this specific map entity in the interactive GIS Explorer. Prioritize and tailor your response to center around this context (e.g. explain the investment benefits, transport links, common resources, or strategic fit of this specific region, city, or resource in ${targetCountry}).`;
    }

    // Map history to the required format
    const formattedContents = [
      {
        role: "user",
        parts: [{ text: `You are 'AFRIMAP Investment Assistant', a highly sophisticated economic concierge and AI advisor for Africa's Foreign Investment promotion, specifically focusing on ${targetCountry}.
You have deep, professional knowledge about ${targetCountry}'s economy, its key regional investment hubs, its legal framework (including investment laws, Startup Acts, and tax-free zones), its strategic sectors (such as Tech, Manufacturing, Agri-exports, Renewable Energy, Tourism, and Logistics), and key transport/infrastructure networks.${contextInstructions}

Rules for your responses:
- Maintain a highly professional, polite, objective, and supportive investor-concierge persona (comparable to Bloomberg or PitchBook advisors).
- Give rich, detailed, factual answers using real ${targetCountry} economic insights.
- Cite specific cities/regions, industrial zones, and competitive advantages (e.g. port access, proximity to Europe or Sub-Saharan trade lanes, skilled bilingual labor pools).
- If an investor shares their budget, region, or industry, proactively give them smart, constructive investment ideas grounded in the target country's economic landscape.
- Always communicate in a clear, structured way using markdown formatting where helpful (bullet points, bold texts).
- Keep answers concise but thoroughly informative.` }]
      }
    ];

    if (history && Array.isArray(history)) {
      history.forEach((turn: any) => {
        formattedContents.push({
          role: turn.role === "user" ? "user" : "model",
          parts: [{ text: turn.text }]
        });
      });
    }

    // Append the latest user message
    formattedContents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Chat API error:", error);
    res.status(500).json({ error: error.message || "Failed to process chat query." });
  }
});

// 3. Business Plan Generator Endpoint
app.post("/api/gemini/business-plan", async (req, res) => {
  const { project, country } = req.body;
  const targetCountry = country || "Tunisia";

  try {
    const ai = getGeminiClient();

    const prompt = `You are an elite Business Analyst and Venture Capital partner specializing in African markets.
Generate a comprehensive, highly professional, investor-grade Business Plan for the following project in ${targetCountry}:

Project Name: ${project.projectName}
Suitable Region: ${project.suitableRegion}
Estimated Startup Cost: ${project.startupCost}
Expected ROI: ${project.expectedRoi}
Required Workforce: ${project.requiredWorkforce}
Description: ${project.description}
Why Selected: ${project.whySelected}

You must return the result as a raw JSON object matching the following structure. Do not wrap the JSON in markdown code blocks. Just return the JSON text directly.

JSON Schema:
{
  "executiveSummary": "A high-level, compelling narrative of the business concept, its strategic fit in ${targetCountry}, and its potential.",
  "marketAnalysis": "A detailed market analysis of the sector in ${targetCountry}, detailing local and global demand, competitor landscape, and shipping/logistics advantages.",
  "swotAnalysis": {
    "strengths": ["Strength 1", "Strength 2", "Strength 3"],
    "weaknesses": ["Weakness 1", "Weakness 2"],
    "opportunities": ["Opportunity 1", "Opportunity 2", "Opportunity 3"],
    "threats": ["Threat 1", "Threat 2"]
  },
  "budgetBreakdown": [
    { "category": "Equipment & Capital Assets", "amount": "Estimated cost" },
    { "category": "Licensing, Permits & Setup", "amount": "Estimated cost" },
    { "category": "Working Capital (First 6 months)", "amount": "Estimated cost" },
    { "category": "Marketing & Brand Launch", "amount": "Estimated cost" },
    { "category": "Personnel recruitment & onboarding", "amount": "Estimated cost" }
  ],
  "financialForecast": [
    { "year": 1, "revenue": "Year 1 Revenue", "profit": "Year 1 Net Profit" },
    { "year": 2, "revenue": "Year 2 Revenue", "profit": "Year 2 Net Profit" },
    { "year": 3, "revenue": "Year 3 Revenue", "profit": "Year 3 Net Profit" }
  ],
  "roiAnalysis": "A short, professional financial assessment explaining the payback period, net profit margins, and ROI feasibility based on ${targetCountry}'s tax structures, double taxation treaties, and local costs.",
  "risks": [
    "Risk 1 (e.g. Climate, currency, or regulatory factors) and its mitigation strategy",
    "Risk 2 and its mitigation strategy",
    "Risk 3 and its mitigation strategy"
  ],
  "conclusion": "A professional concluding statement summarizing why an investor should confidently execute this project today."
}

Make sure all analyses are deeply realistic, citing real ${targetCountry} policies, tax structures, trade zones, or transport links.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const cleanedText = text.replace(/```json\s?/g, "").replace(/```\s?/g, "").trim();
    const data = JSON.parse(cleanedText);
    res.json(data);
  } catch (error: any) {
    console.error("Error generating business plan:", error);
    res.status(500).json({ error: error.message || "Failed to generate business plan." });
  }
});

// ==========================================
// VITE AND ASSETS SERVING MIDDLEWARE
// ==========================================

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT} (http://localhost:${PORT})`);
  });
}

startServer();
