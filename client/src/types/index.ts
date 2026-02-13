export interface PortfolioAsset {
  id: number;
  ticker: string;
  name: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  sector: string;
  type: "acao" | "fii" | "etf" | "renda_fixa" | "cripto";
}

export interface MarketIndicator {
  id: number;
  name: string;
  value: number;
  previousValue: number;
  unit: string;
  source: string;
  updatedAt: string;
}

export interface WatchlistItem {
  id: number;
  ticker: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  targetPrice?: number;
  notes?: string;
}

export interface ConversationMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone?: string;
  plan: "free" | "premium" | "advisory";
  createdAt: string;
}

export interface DashboardSummary {
  totalPatrimony: number;
  totalReturn: number;
  totalReturnPercent: number;
  monthlyReturn: number;
  monthlyReturnPercent: number;
  assetCount: number;
  alerts: Alert[];
}

export interface Alert {
  id: number;
  type: "price" | "dividend" | "macro" | "news";
  title: string;
  message: string;
  severity: "info" | "warning" | "success" | "error";
  createdAt: string;
  read: boolean;
}
