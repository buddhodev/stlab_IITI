import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Global transient state for connection logs
interface WebHookLog {
  id: string;
  timestamp: string;
  source: string;
  payloadType: string;
  data: any;
  status: "success" | "warning" | "error";
}

let syncLogs: WebHookLog[] = [
  {
    id: "log-initial",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    source: "IITI Main Campus Portal (PHP)",
    payloadType: "Bioreactor Calibration",
    data: { temperature: 30.0, pH: 6.8, oxygenFlow: 0.85, biomassYield: 14.2 },
    status: "success",
  },
  {
    id: "log-seed",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    source: "LCA Secondary Client (HTML/JS)",
    payloadType: "Sustainability Metric Pull",
    data: { carbonFootprint: -1.25, renewableRatio: 0.88, paybackPeriod: 4.2 },
    status: "success",
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Essential Middlewares
  app.use(express.json());
  
  // Custom CORS headers to allow connection from other PHP/HTML local or public sites
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  // Lazy-loaded GenAI SDK instance as per environment guidelines
  let aiClient: any = null;
  function getGenAI() {
    if (!aiClient) {
      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        throw new Error("GEMINI_API_KEY environment variable is not defined. Please set it in Settings > Secrets.");
      }
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return aiClient;
  }

  // API Route: AI chatbot assistant for site visitors
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Missing message field in request." });
      }

      const ai = getGenAI();

      const systemInstruction = `You are "Susty", the friendly and professional AI Chatbot for the Sustainable Technologies Laboratory (STLab) at IIT Indore. 
STLab is led by Prof. Ganti S. Murthy.
The lab specializes in bridging systems engineering, bioprocesses, Life Cycle Assessment (LCA), Techno-Economic Analysis (TEA), bioreactor modeling, and Traditional Knowledge.

Key Sections / Tabs on this website to guide visitors to:
- Home: Welcome page featuring the lab's mission, key banners, and a beautiful Sanskrit Shloka.
- News: Active and Archived announcements (e.g., Dagguganta Mohan Chaitanya Reddy elected as Institute PhD Senator and Head of Biocrats BSBE Club, Buddhodev Ghosh securing awards at Youth for Social Change Summit 2026 / Adani Global Indology Conclave, etc.)
- People: Details about Prof. Ganti S. Murthy, Ph.D. scholars (e.g. Buddhodev Ghosh, Dagguganta Mohan Chaitanya Reddy, Abhishek D. Kalbande, etc.), and notable academic alumni.
- Research: Major areas like Bioprocess Engineering, LCA, TEA, Systems Biology, and Traditional Knowledge integration.
- Publications: Journal articles, books, patents, conference contributions.
- Learning: Educational courses & workshops.
- Contact: Lab location, contact details, IIT Indore campus map.
- Gallery: Photos of lab life, celebrations, and events like Prof. Murthy's Birthday 2025.
- Weather: Real-time / simulated IIT Indore campus weather forecasting.

Keep responses concise, welcoming, human, and professional. Since you are speaking to academic researchers, prospective students, and general visitors, maintain an elegant and enthusiastic academic tone. Try to highlight specific lab achievements when relevant! Do NOT output markdown code blocks for simple text responses, keep it clean. Avoid any robotic self-referencing. Focus on helping users explore the lab's work!`;

      // Process conversation history
      const contents: any[] = [];
      if (history && Array.isArray(history)) {
        history.forEach((h: any) => {
          contents.push({
            role: h.role === "user" ? "user" : "model",
            parts: [{ text: h.text }]
          });
        });
      }
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.warn("Chat API Warning:", error.message || error);
      res.status(500).json({ 
        error: "Failed to communicate with AI model", 
        details: error.message || String(error)
      });
    }
  });

  // API Route: Get all sync logs & state
  app.get("/api/iiti-server", (req, res) => {
    res.json({
      status: "online",
      environment: "IIT Indore Campus Grid (Simulated)",
      endpoint: "/api/iiti-server",
      totalLogs: syncLogs.length,
      logs: syncLogs,
    });
  });

  // API Route: Let the external PHP / HTML clients post simulated or real bioreactor/LCA values
  app.post("/api/iiti-server", (req, res) => {
    const { source, payloadType, data } = req.body;
    
    if (!payloadType || !data) {
      return res.status(400).json({ 
        error: "Bad Request", 
        message: "Incoming packet must contain 'payloadType' and 'data' fields." 
      });
    }

    const newLog: WebHookLog = {
      id: "log-" + Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      source: source || "External PHP Client",
      payloadType: payloadType,
      data: data,
      status: "success",
    };

    // Limit log storage to prevent memory overflow
    syncLogs = [newLog, ...syncLogs].slice(0, 50);

    res.status(201).json({
      message: "Packet successfully synchronized with IITI Core Repository",
      savedLog: newLog
    });
  });

  // Serve static assets directory directly in both dev and production
  app.use("/assets", express.static(path.join(process.cwd(), "assets")));

  // Serve static dist or mount Vite middleware
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode (Vite HMR/Middleware)...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode (Static Serving)...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[IITI SERVER] Running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("FATAL: Failed to start server", err);
});
