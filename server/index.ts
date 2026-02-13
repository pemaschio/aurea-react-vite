import "dotenv/config";
import express from "express";
import cors from "cors";
import { registerRoutes } from "./routes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

registerRoutes(app);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`[Aurea] Server running on http://localhost:${PORT}`);
});
