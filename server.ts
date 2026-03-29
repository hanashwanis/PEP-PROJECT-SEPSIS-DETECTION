import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Logging middleware
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Mock Auth API
  app.post("/api/auth/login", (req, res) => {
    const { username, password, role } = req.body;
    console.log(`Login attempt: ${username} as ${role}`);
    // Simple mock validation
    if (username === "physician" && password === "Doc@2024") {
      return res.json({ success: true, user: { username: "Dr. Sarah Smith", role: "Attending Physician", id: "dr-smith" } });
    }
    if (username === "nurse" && password === "Nurse@2024") {
      return res.json({ success: true, user: { username: "Nurse Emily Jones", role: "ICU Nurse", id: "nurse-jones" } });
    }
    if (username === "admin" && password === "Admin@2024") {
      return res.json({ success: true, user: { username: "Admin Robert Brown", role: "Clinical Admin", id: "admin-user" } });
    }
    res.status(401).json({ success: false, message: "Invalid credentials" });
  });

  // Mock Audit Log API
  const auditLogs = [
    { id: 1, timestamp: new Date().toISOString(), user: "physician", role: "Attending Physician", action: "Risk analysis run for new patient input", ip: "192.168.1.160", status: "SUCCESS" },
    { id: 2, timestamp: new Date(Date.now() - 10000).toISOString(), user: "nurse01", role: "ICU Nurse", action: "Updated vital signs for Patient ID-10293", ip: "192.168.1.54", status: "SUCCESS" },
    { id: 3, timestamp: new Date(Date.now() - 60000).toISOString(), user: "admin", role: "Clinical Admin", action: "Exported clinical report for Q1 2024", ip: "192.168.1.85", status: "SUCCESS" },
    { id: 4, timestamp: new Date(Date.now() - 120000).toISOString(), user: "physician", role: "Attending Physician", action: "Acknowledged critical alert for Patient ID-10293", ip: "192.168.1.235", status: "SUCCESS" },
    { id: 5, timestamp: new Date(Date.now() - 300000).toISOString(), user: "nurse01", role: "ICU Nurse", action: "Completed Golden Hour Bundle step: Lactate Level", ip: "192.168.1.39", status: "SUCCESS" },
    { id: 6, timestamp: new Date(Date.now() - 600000).toISOString(), user: "admin", role: "Clinical Admin", action: "User 'nurse02' account created", ip: "192.168.1.37", status: "SUCCESS" },
    { id: 7, timestamp: new Date(Date.now() - 900000).toISOString(), user: "physician", role: "Attending Physician", action: "Viewed longitudinal vitals trend", ip: "192.168.1.12", status: "SUCCESS" },
    { id: 8, timestamp: new Date(Date.now() - 1200000).toISOString(), user: "nurse01", role: "ICU Nurse", action: "Login successful", ip: "192.168.1.45", status: "SUCCESS" },
    { id: 9, timestamp: new Date(Date.now() - 1500000).toISOString(), user: "admin", role: "Clinical Admin", action: "System configuration updated: Alert thresholds", ip: "192.168.1.101", status: "SUCCESS" },
    { id: 10, timestamp: new Date(Date.now() - 1800000).toISOString(), user: "physician", role: "Attending Physician", action: "Risk analysis run for new patient input", ip: "192.168.1.23", status: "SUCCESS" },
  ];

  app.get("/api/audit-logs", (req, res) => {
    res.json(auditLogs);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    // Explicitly serve index.html for SPA routing in development
    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const templatePath = path.resolve(__dirname, "index.html");
        let template = await fs.readFile(templatePath, "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        console.error("Vite transform error:", e);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
