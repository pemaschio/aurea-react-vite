-- Aurea - Schema Inicial
-- Executar no Supabase SQL Editor

-- Users (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT DEFAULT '',
  phone TEXT,
  plan TEXT NOT NULL DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Portfolios
CREATE TABLE IF NOT EXISTS portfolios (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Carteira Principal',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Portfolio Assets
CREATE TABLE IF NOT EXISTS portfolio_assets (
  id SERIAL PRIMARY KEY,
  portfolio_id INTEGER NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  ticker TEXT NOT NULL,
  name TEXT NOT NULL,
  quantity REAL NOT NULL,
  average_price REAL NOT NULL,
  current_price REAL NOT NULL DEFAULT 0,
  sector TEXT DEFAULT '',
  type TEXT NOT NULL DEFAULT 'acao',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Watchlist
CREATE TABLE IF NOT EXISTS watchlist_items (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  ticker TEXT NOT NULL,
  name TEXT NOT NULL,
  current_price REAL NOT NULL DEFAULT 0,
  change REAL NOT NULL DEFAULT 0,
  change_percent REAL NOT NULL DEFAULT 0,
  target_price REAL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Market Indicators
CREATE TABLE IF NOT EXISTS market_indicators (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  value REAL NOT NULL,
  previous_value REAL NOT NULL DEFAULT 0,
  unit TEXT DEFAULT '',
  source TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Conversations
CREATE TABLE IF NOT EXISTS conversations (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT DEFAULT 'Nova conversa',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Conversation Messages
CREATE TABLE IF NOT EXISTS conversation_messages (
  id SERIAL PRIMARY KEY,
  conversation_id INTEGER NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Subscription Plans
CREATE TABLE IF NOT EXISTS subscription_plans (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price_monthly REAL NOT NULL,
  price_yearly REAL NOT NULL,
  features TEXT NOT NULL DEFAULT '[]',
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- User Subscriptions
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_id INTEGER NOT NULL REFERENCES subscription_plans(id),
  status TEXT NOT NULL DEFAULT 'active',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Alerts
CREATE TABLE IF NOT EXISTS alerts (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'info',
  read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_portfolios_user ON portfolios(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_assets_portfolio ON portfolio_assets(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_watchlist_user ON watchlist_items(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversation_messages_conv ON conversation_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_alerts_user ON alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user ON user_subscriptions(user_id);

-- Seed subscription plans
INSERT INTO subscription_plans (name, price_monthly, price_yearly, features) VALUES
  ('Free', 0, 0, '["Dashboard básico", "1 carteira", "5 ativos na watchlist", "Chat IA limitado"]'),
  ('Premium', 49.90, 479.90, '["Dashboard completo", "Carteiras ilimitadas", "Watchlist ilimitada", "Chat IA ilimitado", "Alertas WhatsApp", "Análise macro"]'),
  ('Advisory', 149.90, 1439.90, '["Tudo do Premium", "Relatórios personalizados", "Suporte prioritário", "API access", "Consultoria mensal"]')
ON CONFLICT DO NOTHING;

-- RLS Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY users_own ON users FOR ALL USING (auth.uid() = id);
CREATE POLICY portfolios_own ON portfolios FOR ALL USING (auth.uid() = user_id);
CREATE POLICY watchlist_own ON watchlist_items FOR ALL USING (auth.uid() = user_id);
CREATE POLICY conversations_own ON conversations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY alerts_own ON alerts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY subscriptions_own ON user_subscriptions FOR ALL USING (auth.uid() = user_id);

-- Portfolio assets accessible via portfolio ownership
CREATE POLICY portfolio_assets_own ON portfolio_assets FOR ALL
  USING (portfolio_id IN (SELECT id FROM portfolios WHERE user_id = auth.uid()));

-- Conversation messages accessible via conversation ownership
CREATE POLICY conversation_messages_own ON conversation_messages FOR ALL
  USING (conversation_id IN (SELECT id FROM conversations WHERE user_id = auth.uid()));

-- Market indicators are public (read-only for all)
ALTER TABLE market_indicators ENABLE ROW LEVEL SECURITY;
CREATE POLICY market_indicators_read ON market_indicators FOR SELECT USING (true);

-- Subscription plans are public
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY subscription_plans_read ON subscription_plans FOR SELECT USING (true);
