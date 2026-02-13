# Arquitetura do Sistema

# Documentação de Arquitetura - AUREA

## 1. Visão Geral da Arquitetura

A plataforma AUREA é um assistente financeiro inteligente que combina análise macroeconômica com monitoramento de carteiras pessoais. A arquitetura foi projetada para ser escalável, segura e aderente às regulamentações CVM.

```mermaid
graph TB
    subgraph "Frontend"
        A[Dashboard Web<br/>Lovable/React] 
        B[Componentes UI<br/>shadcn/ui]
    end
    
    subgraph "Backend"
        C[Supabase<br/>PostgreSQL + Auth]
        D[Edge Functions<br/>Deno Runtime]
    end
    
    subgraph "Automação"
        E[n8n Workflows<br/>Self-hosted]
        F[Webscraping<br/>Puppeteer]
    end
    
    subgraph "IA & APIs"
        G[Claude API<br/>Análise Financeira]
        H[Perplexity API<br/>Pesquisa de Dados]
        I[Evolution API<br/>WhatsApp Gateway]
    end
    
    subgraph "Dados Financeiros"
        J[Yahoo Finance API<br/>Cotações RT]
        K[B3 API<br/>Dados Oficiais]
        L[Alpha Vantage<br/>Dados Históricos]
    end
    
    subgraph "Pagamentos"
        M[Stripe/Asaas<br/>Assinaturas]
    end
    
    A --> C
    B --> A
    C --> D
    D --> E
    E --> F
    E --> G
    E --> H
    E --> I
    E --> J
    E --> K
    E --> L
    C --> M
    
    classDef frontend fill:#00C896,stroke:#0A1628,color:#0A1628
    classDef backend fill:#0D4F4F,stroke:#0A1628,color:#F1F5F9
    classDef external fill:#D4A843,stroke:#0A1628,color:#0A1628
    
    class A,B frontend
    class C,D,E,F backend
    class G,H,I,J,K,L,M external
```

## 2. Arquitetura de Dados

### 2.1 Modelo de Dados Principal (Supabase)

```mermaid
erDiagram
    users {
        uuid id PK
        text email
        text name
        text whatsapp_number
        text investor_profile
        text investment_horizon
        text subscription_plan
        boolean onboarding_completed
        boolean portfolio_setup
        jsonb preferences
        timestamp created_at
        timestamp updated_at
    }
    
    portfolios {
        uuid id PK
        uuid user_id FK
        uuid asset_id FK
        decimal quantity
        decimal avg_price
        decimal current_value
        decimal pnl_percent
        text source_type
        timestamp last_sync_at
        timestamp created_at
    }
    
    assets {
        uuid id PK
        text ticker
        text name
        text asset_type
        text sector
        decimal current_price
        decimal price_change_pct
        jsonb fundamentals
        timestamp last_updated
    }
    
    watchlist {
        uuid id PK
        uuid user_id FK
        uuid asset_id FK
        boolean active
        decimal target_price
        text alert_type
        timestamp created_at
    }
    
    chat_history {
        uuid id PK
        uuid user_id FK
        text role
        text content
        jsonb metadata
        timestamp created_at
    }
    
    macro_indicators {
        text indicator_code PK
        text name
        text category
        decimal current_value
        decimal previous_value
        decimal expected_value
        decimal variation_pct
        text trend
        jsonb impact_portfolio
        text source_api
        timestamp updated_at
    }
    
    plan_limits {
        text plan_name PK
        text resource_key
        integer limit_value
        text period_type
    }
    
    usage_counters {
        uuid id PK
        uuid user_id FK
        text resource_key
        text period_month
        integer count
        timestamp created_at
    }
    
    users ||--o{ portfolios : has
    users ||--o{ watchlist : has
    users ||--o{ chat_history : has
    users ||--o{ usage_counters : has
    assets ||--o{ portfolios : contains
    assets ||--o{ watchlist : contains
```

### 2.2 Políticas de Row Level Security (RLS)

```sql
-- Exemplo de política RLS para tabela portfolios
CREATE POLICY "Users can only see their own portfolio" 
ON portfolios FOR ALL 
TO authenticated 
USING (auth.uid() = user_id);

-- Política para dados públicos (macro_indicators)
CREATE POLICY "Macro indicators are public" 
ON macro_indicators FOR SELECT 
TO authenticated 
USING (true);
```

## 3. Arquitetura de Microserviços e Workflows

### 3.1 Sistema de Workflows n8n

```mermaid
graph TB
    subgraph "Orquestrador Principal"
        A[scraping-orchestrator<br/>5min cron]
    end
    
    subgraph "Coletores de Dados"
        B[price-realtime<br/>15min - horário mercado]
        C[macro-data-collector<br/>1h BCB API]
        D[news-scraper<br/>30min InfoMoney/Valor]
        E[fundamentals-collector<br/>24h Status Invest]
    end
    
    subgraph "Processamento IA"
        F[news-analyzer<br/>Claude Haiku]
        G[portfolio-analyzer<br/>Claude Sonnet]
        H[insight-generator<br/>Claude Opus]
    end
    
    subgraph "Comunicação"
        I[morning-briefing<br/>6h30 diário]
        J[whatsapp-handler<br/>tempo real]
        K[alert-dispatcher<br/>preço/notícias]
    end
    
    A --> B
    A --> C
    A --> D
    A --> E
    
    B --> G
    C --> G
    D --> F
    E --> G
    
    F --> H
    G --> H
    
    H --> I
    H --> J
    H --> K
    
    classDef orchestrator fill:#D4A843,stroke:#0A1628,color:#0A1628
    classDef collector fill:#0D4F4F,stroke:#0A1628,color:#F1F5F9
    classDef ai fill:#00C896,stroke:#0A1628,color:#0A1628
    classDef communication fill:#E74C3C,stroke:#0A1628,color:#F1F5F9
    
    class A orchestrator
    class B,C,D,E collector
    class F,G,H ai
    class I,J,K communication
```

### 3.2 Circuit Breaker Pattern para APIs Externas

```mermaid
stateDiagram-v2
    [*] --> CLOSED
    
    CLOSED --> OPEN: 5 falhas consecutivas
    OPEN --> HALF_OPEN: Cooldown 30min
    HALF_OPEN --> CLOSED: Sucesso
    HALF_OPEN --> OPEN: Falha
    
    note right of CLOSED
        Operação normal
        Requests passam
    end note
    
    note right of OPEN
        Bloqueado
        Usar fallback
        Alertar admin
    end note
    
    note right of HALF_OPEN
        Tentativa de
        recuperação
    end note
```

## 4. Fluxo de Dados e Integrações

### 4.1 Fluxo de Sincronização de Carteira

```mermaid
sequenceDiagram
    participant U as Usuário
    participant F as Frontend
    participant S as Supabase
    participant N as n8n
    participant C as Claude API
    participant Y as Yahoo Finance
    
    U->>F: Upload CSV/Input Manual
    F->>S: Salvar transações
    S->>N: Trigger workflow
    N->>Y: Buscar cotações atuais
    Y-->>N: Preços em tempo real
    N->>S: Atualizar portfolios
    N->>C: Gerar análise carteira
    C-->>N: Insights personalizados
    N->>S: Salvar análise
    S-->>F: Notificar atualização
    F->>U: Exibir carteira atualizada
```

### 4.2 Fluxo de Briefing Matinal

```mermaid
flowchart TD
    A[Cron Job 6h30] --> B[Buscar indicadores macro]
    B --> C[Buscar notícias relevantes]
    C --> D[Analisar carteira usuário]
    D --> E[Gerar briefing personalizado]
    E --> F{Usuário tem WhatsApp?}
    F -->|Sim| G[Enviar via Evolution API]
    F -->|Não| H[Salvar no dashboard]
    G --> I[Marcar como enviado]
    H --> I
    I --> J[Log de entrega]
    
    classDef process fill:#0D4F4F,stroke:#0A1628,color:#F1F5F9
    classDef decision fill:#D4A843,stroke:#0A1628,color:#0A1628
    classDef endpoint fill:#00C896,stroke:#0A1628,color:#0A1628
    
    class A,B,C,D,E process
    class F decision  
    class G,H,I,J endpoint
```

## 5. Segurança e Compliance

### 5.1 Camadas de Segurança

```mermaid
graph TB
    subgraph "Frontend Security"
        A[HTTPS Only]
        B[JWT Token Auth]
        C[Input Validation]
    end
    
    subgraph "Backend Security"
        D[Row Level Security]
        E[API Rate Limiting]
        F[SQL Injection Protection]
    end
    
    subgraph "Data Security"
        G[Encryption at Rest]
        H[Encryption in Transit]
        I[PII Masking]
    end
    
    subgraph "Compliance CVM"
        J[Disclaimer Injection]
        K[Content Validation]
        L[Audit Logs]
    end
    
    A --> D
    B --> E
    C --> F
    D --> G
    E --> H
    F --> I
    G --> J
    H --> K
    I --> L
    
    classDef security fill:#E74C3C,stroke:#0A1628,color:#F1F5F9
    classDef compliance fill:#D4A843,stroke:#0A1628,color:#0A1628
    
    class A,B,C,D,E,F,G,H,I security
    class J,K,L compliance
```

### 5.2 Sistema de Disclaimers CVM

```mermaid
sequenceDiagram
    participant C as Claude API
    participant E as Edge Function
    participant D as Disclaimer Service
    participant U as Usuário
    
    C->>E: Resposta IA gerada
    E->>D: inject-disclaimer()
    D->>D: Validar conteúdo
    D->>D: Adicionar disclaimer apropriado
    D->>E: Conteúdo + disclaimer
    E->>U: Resposta compliant
    
    Note over D: Disclaimers obrigatórios:<br/>- Global (footer)<br/>- Por insight<br/>- WhatsApp<br/>- Dados financeiros
```

## 6. Planos de Assinatura e Enforcement

### 6.1 Sistema de Limites por Plano

```mermaid
graph LR
    A[Request do Usuário] --> B{check-plan-limit}
    B --> C[Consultar usage_counters]
    C --> D[Consultar plan_limits]
    D --> E{Dentro do limite?}
    E -->|Sim| F[Permitir ação]
    E -->|Não| G[Bloquear + upgrade prompt]
    F --> H[Incrementar contador]
    G --> I[Log + analytics]
    
    classDef process fill:#0D4F4F,stroke:#0A1628,color:#F1F5F9
    classDef decision fill:#D4A843,stroke:#0A1628,color:#0A1628
    classDef success fill:#00C896,stroke:#0A1628,color:#0A1628
    classDef blocked fill:#E74C3C,stroke:#0A1628,color:#F1F5F9
    
    class A,C,D,H,I process
    class B,E decision
    class F success
    class G blocked
```

### 6.2 Matriz de Recursos por Plano

| Recurso | Free | Essential (R$49,90) | Premium (R$149,90) | Advisory (R$499,90) |
|---------|------|--------------------|--------------------|-------------------|
| Watchlist | 5 ativos | 20 ativos | 999 ativos | Ilimitado |
| Consultas chat/mês | 0 | 10 | Ilimitado | Ilimitado |
| Insights por dia | 3 (macro) | 10 | Ilimitado | Ilimitado |
| Tipo briefing | Básico | Completo | Completo + alertas | Completo + prioritário |
| Sincronização carteira | Manual | Manual + CSV | Manual + CSV + API | Manual + CSV + API + Open Finance |
| Upload documentos | ❌ | ❌ | ✅ | ✅ |
| Comparação ativos | ❌ | ❌ | ✅ (3 ativos) | ✅ (ilimitado) |
| Relatório PDF semanal | ❌ | ❌ | ✅ | ✅ |
| Modelo IA | Haiku | Sonnet | Sonnet | Opus |
| Suporte | FAQ | Email 48h | Email 24h + chat | Email 4h + WhatsApp |

## 7. Backup e Disaster Recovery

### 7.1 Estratégia 3-2-1

```mermaid
graph TB
    subgraph "Dados Primários"
        A[Supabase PostgreSQL<br/>Auto backup 7 dias]
    end
    
    subgraph "Backup Secundário"
        B[pg_dump diário<br/>n8n workflow 3h]
        C[AWS S3<br/>Compressão gzip]
    end
    
    subgraph "Backup Offsite"
        D[Cloudflare R2<br/>Cross-region]
    end
    
    subgraph "Versionamento"
        E[Workflows n8n<br/>Git repository]
        F[Código Frontend<br/>GitHub]
    end
    
    A --> B
    B --> C
    C --> D
    B --> E
    A --> F
    
    classDef primary fill:#0D4F4F,stroke:#0A1628,color:#F1F5F9
    classDef secondary fill:#D4A843,stroke:#0A1628,color:#0A1628
    classDef offsite fill:#00C896,stroke:#0A1628,color:#0A1628
    
    class A primary
    class B,C secondary
    class D,E,F offsite
```

**Retenção:**
- Diário: 30 dias
- Semanal: 6 meses  
- Mensal: 2 anos

**SLAs:**
- RTO (Recovery Time): 4 horas
- RPO (Recovery Point): 24 

---
*Tipo: architecture*
*Gerado pelo ForgeAI em 13/02/2026*
