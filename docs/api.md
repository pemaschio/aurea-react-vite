# Documentação da API

# Documentação da API AUREA

## Visão Geral

A API AUREA é uma plataforma de inteligência financeira que oferece análise macroeconômica, monitoramento de carteira e consultoria de investimentos através de IA conversacional. Esta documentação detalha todos os endpoints disponíveis para integração com o dashboard web e sistema de WhatsApp.

```yaml
openapi: 3.0.3
info:
  title: AUREA - API de Inteligência Financeira
  description: |
    Plataforma de assistente financeiro inteligente que combina análise macroeconômica 
    com monitoramento de carteira pessoal, oferecendo consultoria de investimentos via IA.
  version: 1.0.0
  contact:
    name: Equipe AUREA
    email: api@aurea.com.br
servers:
  - url: https://api.aurea.com.br/v1
    description: Ambiente de produção
  - url: https://staging-api.aurea.com.br/v1
    description: Ambiente de homologação
```

## Autenticação

Todos os endpoints requerem autenticação via Bearer Token JWT fornecido pelo Supabase Auth.

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Endpoints da API

### 1. Autenticação e Usuários

#### 1.1 Registrar Usuário

```yaml
/auth/register:
  post:
    summary: Registra novo usuário na plataforma
    tags: [Autenticação]
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            required: [email, password, name, phone]
            properties:
              email:
                type: string
                format: email
                example: "joao@email.com"
              password:
                type: string
                minLength: 8
                example: "senha123@"
              name:
                type: string
                example: "João Silva"
              phone:
                type: string
                example: "+5511999999999"
    responses:
      201:
        description: Usuário registrado com sucesso
        content:
          application/json:
            schema:
              type: object
              properties:
                user:
                  $ref: '#/components/schemas/User'
                access_token:
                  type: string
                refresh_token:
                  type: string
      400:
        description: Dados inválidos
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Error'
```

#### 1.2 Login do Usuário

```yaml
/auth/login:
  post:
    summary: Autentica usuário na plataforma
    tags: [Autenticação]
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            required: [email, password]
            properties:
              email:
                type: string
                format: email
                example: "joao@email.com"
              password:
                type: string
                example: "senha123@"
    responses:
      200:
        description: Login realizado com sucesso
        content:
          application/json:
            schema:
              type: object
              properties:
                user:
                  $ref: '#/components/schemas/User'
                access_token:
                  type: string
                refresh_token:
                  type: string
      401:
        description: Credenciais inválidas
```

### 2. Perfil do Usuário

#### 2.1 Obter Perfil Completo

```yaml
/users/profile:
  get:
    summary: Retorna o perfil completo do usuário autenticado
    tags: [Usuário]
    security:
      - BearerAuth: []
    responses:
      200:
        description: Perfil do usuário
        content:
          application/json:
            schema:
              allOf:
                - $ref: '#/components/schemas/User'
                - type: object
                  properties:
                    investor_profile:
                      type: string
                      enum: [conservative, moderate, aggressive]
                      example: "moderate"
                    subscription_plan:
                      type: string
                      enum: [free, essential, premium, advisory]
                      example: "premium"
                    onboarding_completed:
                      type: boolean
                      example: true
                    whatsapp_connected:
                      type: boolean
                      example: true
```

#### 2.2 Atualizar Perfil de Investidor

```yaml
/users/investor-profile:
  put:
    summary: Atualiza o perfil de investidor com base no questionário de suitability
    tags: [Usuário]
    security:
      - BearerAuth: []
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            required: [objective, horizon, risk_tolerance, experience]
            properties:
              objective:
                type: string
                enum: [retirement, passive_income, growth, emergency_fund]
                example: "growth"
              horizon:
                type: string
                enum: [short, medium, long]
                example: "long"
              risk_tolerance:
                type: string
                enum: [sell_all, sell_partial, hold, buy_more]
                example: "hold"
              experience:
                type: string
                enum: [beginner, less_than_1y, 1_to_5y, more_than_5y]
                example: "1_to_5y"
              income_range:
                type: string
                enum: [up_to_5k, 5k_to_15k, 15k_to_35k, above_35k]
                example: "15k_to_35k"
              patrimony_range:
                type: string
                enum: [up_to_30k, 30k_to_100k, 100k_to_500k, 500k_to_1m, above_1m]
                example: "100k_to_500k"
    responses:
      200:
        description: Perfil atualizado com sucesso
        content:
          application/json:
            schema:
              type: object
              properties:
                investor_profile:
                  type: string
                  enum: [conservative, moderate, aggressive]
                  example: "moderate"
                updated_at:
                  type: string
                  format: date-time
```

### 3. Carteira de Investimentos

#### 3.1 Obter Carteira Completa

```yaml
/portfolio:
  get:
    summary: Retorna a carteira completa do usuário com posições atuais
    tags: [Carteira]
    security:
      - BearerAuth: []
    parameters:
      - name: include_history
        in: query
        description: Incluir histórico de transações
        schema:
          type: boolean
          default: false
    responses:
      200:
        description: Carteira do usuário
        content:
          application/json:
            schema:
              type: object
              properties:
                summary:
                  type: object
                  properties:
                    total_invested:
                      type: number
                      format: decimal
                      example: 150000.00
                    current_value:
                      type: number
                      format: decimal
                      example: 165750.00
                    total_return:
                      type: number
                      format: decimal
                      example: 15750.00
                    return_percentage:
                      type: number
                      format: decimal
                      example: 10.50
                    last_updated:
                      type: string
                      format: date-time
                positions:
                  type: array
                  items:
                    $ref: '#/components/schemas/PortfolioPosition'
                allocations:
                  type: object
                  properties:
                    asset_classes:
                      type: array
                      items:
                        type: object
                        properties:
                          category:
                            type: string
                            enum: [stocks, fixed_income, reits, etfs, crypto]
                          percentage:
                            type: number
                            format: decimal
                          value:
                            type: number
                            format: decimal
```

#### 3.2 Adicionar Posição à Carteira

```yaml
/portfolio/positions:
  post:
    summary: Adiciona nova posição à carteira do usuário
    tags: [Carteira]
    security:
      - BearerAuth: []
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            required: [ticker, quantity, average_price]
            properties:
              ticker:
                type: string
                example: "PETR4"
                description: Código do ativo na B3
              quantity:
                type: integer
                minimum: 1
                example: 100
              average_price:
                type: number
                format: decimal
                example: 32.45
              purchase_date:
                type: string
                format: date
                example: "2024-01-15"
              notes:
                type: string
                example: "Compra para diversificação do setor"
    responses:
      201:
        description: Posição adicionada com sucesso
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PortfolioPosition'
      400:
        description: Dados inválidos ou ticker não encontrado
```

#### 3.3 Importar Carteira via CSV

```yaml
/portfolio/import/csv:
  post:
    summary: Importa carteira através de arquivo CSV de corretora
    tags: [Carteira]
    security:
      - BearerAuth: []
    requestBody:
      required: true
      content:
        multipart/form-data:
          schema:
            type: object
            required: [file, broker]
            properties:
              file:
                type: string
                format: binary
                description: Arquivo CSV da corretora
              broker:
                type: string
                enum: [xp, clear, rico, inter, btg, nu_invest, modal]
                example: "xp"
                description: Nome da corretora para aplicar template correto
    responses:
      200:
        description: Importação processada com sucesso
        content:
          application/json:
            schema:
              type: object
              properties:
                processed_transactions:
                  type: integer
                  example: 15
                new_positions:
                  type: integer
                  example: 8
                updated_positions:
                  type: integer
                  example: 7
                warnings:
                  type: array
                  items:
                    type: string
                  example: ["ELET3 - preço diverge do mercado em mais de 5%"]
```

### 4. Indicadores Macroeconômicos

#### 4.1 Obter Dashboard Macro

```yaml
/macro/dashboard:
  get:
    summary: Retorna painel com principais indicadores macroeconômicos
    tags: [Análise Macro]
    security:
      - BearerAuth: []
    parameters:
      - name: timeframe
        in: query
        description: Período para análise
        schema:
          type: string
          enum: [1d, 7d, 30d, 90d]
          default: "30d"
    responses:
      200:
        description: Dados macroeconômicos organizados por categoria
        content:
          application/json:
            schema:
              type: object
              properties:
                realtime_indicators:
                  type: array
                  items:
                    $ref: '#/components/schemas/MacroIndicator'
                  example:
                    - code: "IBOV"
                      name: "Ibovespa"
                      current_value: 134567.89
                      variation_pct: 1.23
                      trend: "up"
                      impact_portfolio: "positive"
                monetary_policy:
                  type: array
                  items:
                    $ref: '#/components/schemas/MacroIndicator'
                inflation:
                  type: array
                  items:
                    $ref: '#/components/schemas/MacroIndicator'
                international:
                  type: array
                  items:
                    $ref: '#/components/schemas/MacroIndicator'
                last_updated:
                  type: string
                  format: date-time
```

#### 4.2 Análise de Impacto na Carteira

```yaml
/macro/portfolio-impact:
  get:
    summary: Analisa o impacto dos indicadores macro na carteira do usuário
    tags: [Análise Macro]
    security:
      - BearerAuth: []
    responses:
      200:
        description: Análise de impacto personalizada
        content:
          application/json:
            schema:
              type: object
              properties:
                overall_sentiment:
                  type: string
                  enum: [positive, neutral, negative]
                  example: "positive"
                confidence_score:
                  type: number
                  format: decimal
                  minimum: 0
                  maximum: 100
                  example: 78.5
                impacts_by_asset:
                  type: array
                  items:
                    type: object
                    properties:
                      ticker:
                        type: string
                        example: "PETR4"
                      asset_name:
                        type: string
                        example: "Petrobras PN"
                      impact_score:
                        type: number
                        format: decimal
                        example: 85.2
                      main_factors:
                        type: array
                        items:
                          type: string
                        example: ["Alta do petróleo", "Política de dividendos"]
                key_insights:
                  type: array
                  items:
                    type: string
                  example: 
                    - "Cenário favorável para o setor de commodities"
                    - "Recomenda-se atenção à curva de juros"
```

### 5. Sistema de Watchlist

#### 5.1 Obter Watchlist do Usuário

```yaml
/watchlist:
  get:
    summary: Retorna a lista de ativos monitorados pelo usuário
    tags: [Watchlist]
    security:
      - BearerAuth: []
    responses:
      200:
        description: Watchlist com dados atualizados
        content:
          application/json:
            schema:
              type: object
              properties:
                assets:
                  type: array
                  items:
                    $ref: '#/components/schemas/WatchlistAsset'
                total_assets:
                  type: integer
                  example: 12
                plan_limit:
                  type: integer
                  example: 20
                last_updated:
                  type: string
                  format: date-time
```

#### 5.2 Adicionar Ativo à Watchlist

```yaml
/watchlist/assets:
  post:
    summary: Adiciona novo ativo à watchlist
    tags: [Watchlist]
    security:
      - BearerAuth: []
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            required: [ticker]
            properties:
              ticker:
                type: string
                example: "VALE3"
              target_price:
                type: number
                format: decimal
                example: 65.00
              notes:
                type: string
                example: "Aguardando melhoria dos fundamentos"
    responses:
      201:
        description: Ativo adicionado à watchlist
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/WatchlistAsset'
      400:
        description: Limite do plano atingido ou ticker inválido
        content:
          application/json:

---
*Tipo: api*
*Gerado pelo ForgeAI em 13/02/2026*
