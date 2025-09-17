import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import rateLimit from "express-rate-limit";
import { PasswordService } from "./services/passwordService";

// Request validation schemas
const singlePasswordSchema = z.object({
  password: z.string().min(1, "Password is required").max(1000, "Password too long")
});

const batchPasswordSchema = z.object({
  passwords: z.array(z.string().min(1)).max(10, "Maximum 10 passwords allowed")
});

// Rate limiting configurations
const passwordCheckRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: "Too many password check requests. Please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const batchCheckRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 batch requests per windowMs
  message: {
    error: "Too many batch check requests. Please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Single password check endpoint
  app.post("/api/check-password", passwordCheckRateLimit, async (req, res) => {
    try {
      const validation = singlePasswordSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({
          error: validation.error.errors[0]?.message || "Invalid request"
        });
      }

      const { password } = validation.data;
      const result = await PasswordService.checkPassword(password);
      
      // Add privacy headers to prevent caching of password check results
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      
      res.json(result);
    } catch (error: any) {
      console.error("Password check API error:", error);
      res.status(500).json({
        isBreached: false,
        breachCount: 0,
        error: "Internal server error"
      });
    }
  });

  // Batch password check endpoint
  app.post("/api/check-passwords-batch", batchCheckRateLimit, async (req, res) => {
    try {
      const validation = batchPasswordSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({
          error: validation.error.errors[0]?.message || "Invalid request"
        });
      }

      const { passwords } = validation.data;
      const results = await PasswordService.checkPasswordsBatch(passwords);
      
      // Add privacy headers to prevent caching of password check results
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      
      res.json({ results });
    } catch (error: any) {
      console.error("Batch password check API error:", error);
      res.status(500).json({
        error: "Internal server error"
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
