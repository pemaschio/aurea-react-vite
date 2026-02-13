# Guia de Instalação

# Guia de Instalação Completo - AUREA

## 📋 Visão Geral

A **AUREA** é uma plataforma SaaS de assistente financeiro inteligente que combina análise macroeconômica com monitoramento de carteiras pessoais. Este guia cobrirá a instalação completa do sistema usando Windsurf como IDE principal.

---

## 🔧 Pré-requisitos

### Sistema Operacional
- **Windows 10/11**, **macOS 10.15+** ou **Ubuntu 18.04+**
- **8GB RAM** mínimo (16GB recomendado)
- **20GB** de espaço livre em disco
- Conexão estável com a internet

### Ferramentas Necessárias

#### 1. Windsurf IDE
```bash
# Download do site oficial
https://windsurf.ai/
```

#### 2. Node.js e npm
```bash
# Versão recomendada: Node.js 18.x ou superior
node --version  # Deve retornar v18.x.x ou superior
npm --version   # Deve retornar 9.x.x ou superior
```

#### 3. Git
```bash
# Verificar instalação
git --version
```

#### 4. Supabase CLI
```bash
npm install -g supabase
supabase --version
```

### Contas e Chaves API Necessárias

| Serviço | Tipo de Conta | Link |
|---------|---------------|------|
| **Supabase** | Projeto gratuito | https://supabase.com |
| **Claude API** | Anthropic | https://console.anthropic.com |
| **Perplexity API** | Conta Pro | https://perplexity.ai |
| **Evolution API** | WhatsApp Gateway | https://evolution-api.com |
| **Stripe/Asaas** | Pagamentos | https://stripe.com ou https://asaas.com |
| **Yahoo Finance** | Gratuita | Sem cadastro necessário |
| **Alpha Vantage** | Gratuita | https://alphavantage.co |

---

## 🚀 Instalação

### Etapa 1: Configuração do Ambiente

#### 1.1 Clonar o Template Base
```bash
# Criar diretório do projeto
mkdir aurea-fintech
cd aurea-fintech

# Inicializar projeto React com Lovable
npx create-lovable-app@latest .
```

#### 1.2 Instalar Dependências Principais
```bash
# Dependências do frontend
npm install @radix-ui/react-* lucide-react
npm install @tanstack/react-query
npm install recharts
npm install date-fns
npm install zustand

# Dependências para shadcn/ui
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input textarea select
npx shadcn-ui@latest add dialog toast table tabs
npx shadcn-ui@latest add dropdown-menu avatar badge
```

#### 1.3 Instalar Dependências do Backend
```bash
# Supabase client
npm install @supabase/supabase-js @supabase/auth-helpers-react

# Utilitários
npm install clsx tailwind-merge
npm install class-variance-authority
```

### Etapa 2: Configuração do Supabase

#### 2.1 Criar Projeto no Supabase
1. Acesse https://supabase.com
2. Clique em "New Project"
3. Configure:
   - **Name**: aurea-fintech
   - **Database Password**: Gere uma senha forte
   - **Region**: South America (São Paulo)

#### 2.2 Configurar Variáveis de Ambiente
```bash
# Criar arquivo .env.local
touch .env.local
```

Adicionar as seguintes variáveis:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# APIs de IA
ANTHROPIC_API_KEY=your_claude_api_key
PERPLEXITY_API_KEY=your_perplexity_api_key

# WhatsApp
EVOLUTION_API_KEY=your_evolution_api_key
EVOLUTION_BASE_URL=your_evolution_base_url

# Dados Financeiros
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key

# Pagamentos
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

#### 2.3 Executar Migrações do Banco
```sql
-- Executar no SQL Editor do Supabase

-- Tabela de usuários
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  investor_profile VARCHAR(20) DEFAULT 'moderate',
  investment_horizon VARCHAR(20) DEFAULT 'medium',
  subscription_plan VARCHAR(20) DEFAULT 'free',
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de carteira
CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  asset_ticker VARCHAR(10) NOT NULL,
  asset_name VARCHAR(100),
  quantity DECIMAL(15,2),
  avg_price DECIMAL(10,2),
  current_price DECIMAL(10,2),
  sector VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de watchlist
CREATE TABLE watchlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  asset_ticker VARCHAR(10) NOT NULL,
  asset_name VARCHAR(100),
  target_price DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de indicadores macro
CREATE TABLE macro_indicators (
  indicator_code VARCHAR(20) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(30) NOT NULL,
  current_value DECIMAL(15,4),
  previous_value DECIMAL(15,4),
  variation_pct DECIMAL(8,4),
  trend VARCHAR(10),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Users can view own data" ON users
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own portfolio" ON portfolios
FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own watchlist" ON watchlist
FOR ALL USING (auth.uid() = user_id);
```

### Etapa 3: Configuração do n8n

#### 3.1 Instalação Local do n8n
```bash
npm install -g n8n

# Inicializar n8n
n8n start --tunnel
```

#### 3.2 Configurar Workflows Base
1. Acesse http://localhost:5678
2. Importe os workflows essenciais:
   - **morning-briefing**: Briefing matinal via WhatsApp
   - **market-data-collector**: Coleta de dados financeiros
   - **alert-dispatcher**: Sistema de alertas
   - **macro-data-scraper**: Webscraping de indicadores

### Etapa 4: Configuração do Frontend

#### 4.1 Estrutura de Pastas
```
src/
├── components/
│   ├── ui/              # Componentes shadcn/ui
│   ├── layout/          # Header, Sidebar, Footer
│   ├── dashboard/       # Componentes do dashboard
│   └── charts/          # Gráficos financeiros
├── pages/
│   ├── dashboard.tsx    # Dashboard principal
│   ├── portfolio.tsx    # Gestão de carteira
│   ├── watchlist.tsx    # Lista de observação
│   └── settings.tsx     # Configurações
├── lib/
│   ├── supabase.ts      # Cliente Supabase
│   ├── utils.ts         # Utilitários
│   └── constants.ts     # Constantes
├── hooks/
│   ├── useAuth.ts       # Hook de autenticação
│   ├── usePortfolio.ts  # Hook da carteira
│   └── useMarketData.ts # Hook dos dados de mercado
└── styles/
    └── globals.css      # Estilos globais
```

#### 4.2 Configurar Cliente Supabase
```typescript
// lib/supabase.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const supabase = createClientComponentClient()
```

#### 4.3 Implementar Tema Aurea
```css
/* globals.css */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --aurea-navy: #0A1628;
  --aurea-teal: #0D4F4F;
  --aurea-emerald: #00C896;
  --aurea-gold: #D4A843;
  --aurea-slate: #64748B;
  --aurea-ice: #F1F5F9;
  --aurea-alert: #E74C3C;
}

body {
  font-family: 'DM Sans', sans-serif;
  background-color: var(--aurea-navy);
  color: var(--aurea-ice);
}

.font-display {
  font-family: 'Playfair Display', serif;
}

.font-mono {
  font-family: 'JetBrains Mono', monospace;
}
```

---

## ⚙️ Configuração

### Configuração da Evolution API (WhatsApp)

#### 1. Configurar Instância
```bash
curl -X POST \
  'https://your-evolution-api-url/instance/create' \
  -H 'Content-Type: application/json' \
  -H 'apikey: YOUR_API_KEY' \
  -d '{
    "instanceName": "aurea-whatsapp",
    "qrcode": true,
    "integration": "WHATSAPP-BAILEYS"
  }'
```

#### 2. Configurar Webhooks
```javascript
// webhook.js
const webhook = {
  url: 'https://your-n8n-url/webhook/whatsapp',
  events: ['messages.upsert', 'connection.update']
}
```

### Configuração dos Scrapers Financeiros

#### 1. Configurar Coleta B3
```javascript
// n8n workflow: b3-data-collector
{
  "name": "B3 Data Collector",
  "schedule": "0 */15 6-18 * * 1-5", // A cada 15min, 6h-18h, dias úteis
  "nodes": [
    {
      "type": "HTTP Request",
      "url": "https://api.hgbrasil.com/finance/stock_price",
      "authentication": "none"
    }
  ]
}
```

#### 2. Configurar Indicadores Macro
```sql
-- Inserir indicadores base
INSERT INTO macro_indicators (indicator_code, name, category) VALUES
('IBOV', 'Ibovespa', 'market'),
('USDBRL', 'Dólar', 'currency'),
('SELIC', 'Taxa Selic', 'monetary'),
('IPCA', 'IPCA 12M', 'inflation'),
('PIB', 'PIB Trimestral', 'activity');
```

### Configuração do Sistema de Pagamentos

#### Stripe
```javascript
// lib/stripe.ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

// Produtos
const plans = {
  free: { price: 0, priceId: null },
  essential: { price: 4990, priceId: 'price_essential' },
  premium: { price: 14990, priceId: 'price_premium' },
  advisory: { price: 49990, priceId: 'price_advisory' }
}
```

---

## 🧪 Testes

### Testes de Instalação

#### 1. Verificar Conexão Supabase
```javascript
// test-supabase.js
import { supabase } from './lib/supabase'

async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count(*)')
    
    if (error) throw error
    console.log('✅ Supabase conectado com sucesso')
  } catch (error) {
    console.error('❌ Erro na conexão Supabase:', error)
  }
}

testConnection()
```

#### 2. Testar APIs Externas
```bash
# Testar Claude API
curl -X POST \
  'https://api.anthropic.com/v1/messages' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: YOUR_API_KEY' \
  -d '{
    "model": "claude-3-haiku-20240307",
    "max_tokens": 100,
    "messages": [{"role": "user", "content": "Teste"}]
  }'

# Testar Yahoo Finance
curl 'https://query1.finance.yahoo.com/v8/finance/chart/PETR4.SA'
```

#### 3. Testar WhatsApp
```bash
# Verificar status da instância
curl -X GET \
  'https://your-evolution-api-url/instance/connectionState/aurea-whatsapp' \
  -H 'apikey: YOUR_API_KEY'
```

### Validação Funcional

#### 1. Checklist de Funcionalidades
- [ ] Autenticação de usuários funciona
- [ ] Dashboard carrega dados corretamente
- [ ] Carteira sincroniza posições
- [ ] Watchlist adiciona/remove ativos
- [ ] Indicadores macro atualizam
- [ ] WhatsApp recebe/envia mensagens
- [ ] Planos de assinatura funcionam
- [ ] Dados financeiros coletados

#### 2. Teste de Performance
```bash
# Instalar ferramenta de teste
npm install -g lighthouse

# Testar performance do dashboard
lighthouse http://localhost:3000/dashboard
```

---

## 🔧 Troubleshooting

### Problemas Comuns

#### 1. Erro de Conexão Supabase
**Sintoma**: `supabase is not defined`
```bash
# Solução
npm install @supabase/supabase-js
# Verificar arquivo .env.local
```

#### 2. APIs Retornando 401/403
**Sintoma**: Unauthorized na Claude/Perplexity
```bash
# Verificar chaves API

---
*Tipo: installation*
*Gerado pelo ForgeAI em 13/02/2026*
