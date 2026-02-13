import {
  pgTable,
  text,
  integer,
  timestamp,
  real,
  serial,
  uuid,
  boolean,
} from "drizzle-orm/pg-core";

// Users
export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").default(""),
  phone: text("phone"),
  plan: text("plan").notNull().default("free"), // free | premium | advisory
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Portfolios
export const portfolios = pgTable("portfolios", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull().default("Carteira Principal"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Portfolio Assets
export const portfolioAssets = pgTable("portfolio_assets", {
  id: serial("id").primaryKey(),
  portfolioId: integer("portfolio_id")
    .notNull()
    .references(() => portfolios.id),
  ticker: text("ticker").notNull(),
  name: text("name").notNull(),
  quantity: real("quantity").notNull(),
  averagePrice: real("average_price").notNull(),
  currentPrice: real("current_price").notNull().default(0),
  sector: text("sector").default(""),
  type: text("type").notNull().default("acao"), // acao | fii | etf | renda_fixa | cripto
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Watchlist
export const watchlistItems = pgTable("watchlist_items", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  ticker: text("ticker").notNull(),
  name: text("name").notNull(),
  currentPrice: real("current_price").notNull().default(0),
  change: real("change").notNull().default(0),
  changePercent: real("change_percent").notNull().default(0),
  targetPrice: real("target_price"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Market Indicators
export const marketIndicators = pgTable("market_indicators", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  value: real("value").notNull(),
  previousValue: real("previous_value").notNull().default(0),
  unit: text("unit").default(""),
  source: text("source").default(""),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Conversations (AI Assistant)
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  title: text("title").default("Nova conversa"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const conversationMessages = pgTable("conversation_messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id")
    .notNull()
    .references(() => conversations.id),
  role: text("role").notNull(), // user | assistant
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Subscription Plans
export const subscriptionPlans = pgTable("subscription_plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // Free | Premium | Advisory
  priceMonthly: real("price_monthly").notNull(),
  priceYearly: real("price_yearly").notNull(),
  features: text("features").notNull().default("[]"), // JSON array
  isActive: boolean("is_active").notNull().default(true),
});

// User Subscriptions
export const userSubscriptions = pgTable("user_subscriptions", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  planId: integer("plan_id")
    .notNull()
    .references(() => subscriptionPlans.id),
  status: text("status").notNull().default("active"), // active | canceled | past_due
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  currentPeriodStart: timestamp("current_period_start"),
  currentPeriodEnd: timestamp("current_period_end"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Alerts
export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  type: text("type").notNull(), // price | dividend | macro | news
  title: text("title").notNull(),
  message: text("message").notNull(),
  severity: text("severity").notNull().default("info"), // info | warning | success | error
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
