import type { Express } from "express";
import { authMiddleware } from "./auth";
import { storage } from "./storage";

export function registerRoutes(app: Express) {
  // Profile
  app.get("/api/profile", authMiddleware, async (req, res) => {
    try {
      const profile = await storage.getProfile(req.userId!);
      res.json(profile ?? { id: req.userId, email: req.userEmail, name: "", plan: "free" });
    } catch (err) {
      res.status(500).json({ message: "Erro ao buscar perfil" });
    }
  });

  app.put("/api/profile", authMiddleware, async (req, res) => {
    try {
      const updated = await storage.updateProfile(req.userId!, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: "Erro ao atualizar perfil" });
    }
  });

  // Dashboard
  app.get("/api/dashboard", authMiddleware, async (req, res) => {
    try {
      res.json({
        totalPatrimony: 0,
        totalReturn: 0,
        totalReturnPercent: 0,
        monthlyReturn: 0,
        monthlyReturnPercent: 0,
        assetCount: 0,
        alerts: [],
      });
    } catch (err) {
      res.status(500).json({ message: "Erro ao buscar dashboard" });
    }
  });

  // Portfolio
  app.get("/api/portfolio", authMiddleware, async (req, res) => {
    try {
      const assets = await storage.getPortfolioAssets(req.userId!);
      res.json(assets);
    } catch (err) {
      res.status(500).json({ message: "Erro ao buscar carteira" });
    }
  });

  // Market
  app.get("/api/market/indicators", authMiddleware, async (_req, res) => {
    try {
      const indicators = await storage.getMarketIndicators();
      res.json(indicators);
    } catch (err) {
      res.status(500).json({ message: "Erro ao buscar indicadores" });
    }
  });

  // Watchlist
  app.get("/api/watchlist", authMiddleware, async (req, res) => {
    try {
      const items = await storage.getWatchlist(req.userId!);
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: "Erro ao buscar watchlist" });
    }
  });

  // Assistant
  app.get("/api/assistant/messages", authMiddleware, async (req, res) => {
    try {
      const messages = await storage.getConversationMessages(req.userId!);
      res.json(messages);
    } catch (err) {
      res.status(500).json({ message: "Erro ao buscar mensagens" });
    }
  });

  app.post("/api/assistant/chat", authMiddleware, async (req, res) => {
    try {
      const { message } = req.body;
      // TODO: Integrar com Claude/Perplexity API
      res.json({
        id: Date.now(),
        role: "assistant",
        content: `Recebi sua mensagem: "${message}". A integração com IA será implementada em breve.`,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      res.status(500).json({ message: "Erro ao processar mensagem" });
    }
  });

  // Analytics
  app.get("/api/analytics", authMiddleware, async (_req, res) => {
    try {
      res.json(null);
    } catch (err) {
      res.status(500).json({ message: "Erro ao buscar analytics" });
    }
  });

  // Settings
  app.get("/api/settings", authMiddleware, async (_req, res) => {
    try {
      res.json({
        notifications: true,
        emailAlerts: true,
        whatsappAlerts: false,
        theme: "light",
        plan: "Free",
      });
    } catch (err) {
      res.status(500).json({ message: "Erro ao buscar configurações" });
    }
  });
}
