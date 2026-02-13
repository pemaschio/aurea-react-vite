# Estratégia de Testes

# Estratégia de Testes para AUREA

## 1. Visão Geral da Estratégia

A estratégia de testes para a plataforma AUREA foi desenvolvida considerando os requisitos específicos de uma fintech de consultoria financeira, com foco em confiabilidade, segurança, compliance CVM e experiência do usuário. Devido ao orçamento baixo e desenvolvimento solo, a estratégia prioriza automação inteligente e testes de maior impacto.

### Objetivos Principais
- Garantir conformidade com regulamentações CVM
- Validar integridade dos dados financeiros
- Assegurar funcionamento correto das integrações críticas
- Verificar performance adequada para análise de carteiras
- Confirmar experiência consistente via WhatsApp e dashboard

---

## 2. Tipos de Testes

### 2.1 Testes Funcionais

#### 2.1.1 Testes Unitários
**Escopo:** Funções individuais e componentes isolados
**Responsabilidade:** Desenvolvedor
**Frequência:** Contínua durante desenvolvimento

**Componentes Prioritários:**
- Funções de cálculo financeiro (preço médio, P&L, alocação percentual)
- Validadores de dados de entrada
- Parsers de CSV das corretoras
- Formatadores de moeda e datas
- Lógica de limites de planos (plan limits)

#### 2.1.2 Testes de Integração
**Escopo:** Interação entre módulos e serviços externos
**Responsabilidade:** Desenvolvedor
**Frequência:** A cada sprint/milestone

**Integrações Críticas:**
- Supabase Edge Functions com banco de dados
- APIs de dados financeiros (Yahoo, B3, Alpha Vantage)
- Evolution API para WhatsApp
- Claude API para processamento de IA
- Perplexity API para pesquisas
- Gateway de pagamentos (Stripe/Asaas)

#### 2.1.3 Testes End-to-End (E2E)
**Escopo:** Fluxos completos do usuário
**Responsabilidade:** Desenvolvedor
**Frequência:** Semanal e antes de releases

**Cenários Principais:**
- Processo completo de onboarding
- Sincronização de carteira e cálculo de posições
- Geração e envio de briefing matinal via WhatsApp
- Consulta via chat e resposta da IA
- Upgrade/downgrade de planos
- Configuração de watchlist

### 2.2 Testes Não-Funcionais

#### 2.2.1 Testes de Performance
**Objetivo:** Garantir responsividade adequada
**Métricas-chave:**
- Tempo de resposta da IA: < 10s
- Carregamento do dashboard: < 3s
- Processamento de briefing: < 30s
- Sincronização de carteira: < 15s

#### 2.2.2 Testes de Segurança
**Foco:** Proteção de dados financeiros sensíveis
**Áreas Críticas:**
- Autenticação e autorização (Row Level Security)
- Criptografia de dados sensíveis
- Validação de inputs para prevenir injeção
- Controle de acesso às APIs

#### 2.2.3 Testes de Usabilidade
**Objetivo:** Validar experiência do usuário
**Métodos:**
- Testes com usuários reais da persona-alvo
- Análise de métricas de engajamento
- Avaliação de fluxos via WhatsApp

### 2.3 Testes Específicos da Aurea

#### 2.3.1 Testes de Compliance CVM
**Criticidade:** Alta
**Objetivo:** Garantir conformidade regulatória

**Validações Automáticas:**
- Disclaimers obrigatórios em todas as respostas da IA
- Ausência de verbos imperativos (compre, venda, invista)
- Presença de múltiplos cenários nas análises
- Classificação correta do conteúdo como "informativo/educacional"

#### 2.3.2 Testes de Precisão Financeira
**Criticidade:** Alta
**Objetivo:** Validar cálculos e dados financeiros

**Cenários de Teste:**
- Cálculo de preço médio com diferentes cenários de compra/venda
- Validação de cotações com fontes múltiplas
- Consistência de dados macroeconômicos
- Alertas de variações suspeitas (> 15%)

#### 2.3.3 Testes de Confiabilidade de Webscraping
**Criticidade:** Média-Alta
**Objetivo:** Garantir coleta consistente de dados

**Validações:**
- Circuit breaker funcionando corretamente
- Fallback para fontes alternativas
- Rate limiting respeitado
- Dados coletados dentro dos parâmetros esperados

---

## 3. Casos de Teste Principais

### 3.1 Módulo de Autenticação e Onboarding

| ID | Cenário | Entrada | Resultado Esperado | Prioridade |
|----|---------|---------|-------------------|------------|
| AUTH001 | Login com credenciais válidas | Email/senha corretos | Acesso ao dashboard | Alta |
| AUTH002 | Login com credenciais inválidas | Email/senha incorretos | Mensagem de erro clara | Alta |
| ONB001 | Onboarding completo - usuário novo | Dados válidos em todas etapas | Perfil criado, carteira configurada | Alta |
| ONB002 | Onboarding com skip de carteira | Pular etapa 3 | Onboarding concluído, portfolio_setup = pending | Média |
| ONB003 | Verificação WhatsApp | Número válido brasileiro | Código enviado e validado | Alta |

### 3.2 Módulo de Carteira e Sincronização

| ID | Cenário | Entrada | Resultado Esperado | Prioridade |
|----|---------|---------|-------------------|------------|
| CART001 | Adição manual de ativo | PETR4, 100 ações, R$ 25,50 | Ativo adicionado, PM calculado | Alta |
| CART002 | Upload CSV XP Investimentos | Arquivo CSV válido | Transações importadas corretamente | Alta |
| CART003 | Upload PDF nota de corretagem | PDF válido | Operações extraídas e validadas | Média |
| CART004 | Cálculo PM após venda parcial | Venda de 50% da posição | PM mantido, quantidade reduzida | Alta |
| CART005 | Desdobramento de ações | ITUB4 1:1 | Quantidade dobrada, PM ajustado | Média |

### 3.3 Módulo de IA e WhatsApp

| ID | Cenário | Entrada | Resultado Esperado | Prioridade |
|----|---------|---------|-------------------|------------|
| IA001 | Briefing matinal | Usuário com carteira | Mensagem enviada até 6h45 | Alta |
| IA002 | Pergunta sobre ativo na carteira | "Como está o PETR4?" | Análise específica com disclaimer | Alta |
| IA003 | Pergunta sobre macro | "Como está a Selic?" | Contexto macro + impacto na carteira | Alta |
| IA004 | Verificação de compliance | Qualquer resposta da IA | Sem verbos imperativos + disclaimer | Crítica |
| WA001 | Resposta dentro do tempo | Mensagem de usuário | Resposta em < 10 segundos | Alta |

### 3.4 Módulo de Dados e Webscraping

| ID | Cenário | Entrada | Resultado Esperado | Prioridade |
|----|---------|---------|-------------------|------------|
| SCRAP001 | Coleta de preços realtime | Horário de mercado | Preços atualizados a cada 15min | Alta |
| SCRAP002 | Falha na fonte principal | Yahoo Finance indisponível | Fallback para Alpha Vantage | Alta |
| SCRAP003 | Circuit breaker acionado | 5 falhas consecutivas | Scraping pausado, admin notificado | Média |
| MACRO001 | Atualização indicadores BCB | API BCB disponível | Selic, CDI atualizados de hora em hora | Alta |

### 3.5 Módulo de Planos e Pagamentos

| ID | Cenário | Entrada | Resultado Esperado | Prioridade |
|----|---------|---------|-------------------|------------|
| PLAN001 | Upgrade Free para Essential | Usuário Free, pagamento válido | Plano alterado, limites atualizados | Alta |
| PLAN002 | Limite de chat atingido | Usuário Free, 11ª pergunta no mês | Bloqueio com prompt de upgrade | Alta |
| PAG001 | Pagamento recorrente | Cobrança mensal | Renovação automática, plano mantido | Alta |
| PAG002 | Falha no pagamento | Cartão rejeitado | Notificação, downgrade após 3 dias | Média |

---

## 4. Critérios de Aceitação

### 4.1 Critérios Funcionais

#### Onboarding
- ✅ 95% dos usuários completam onboarding em < 5 minutos
- ✅ Perfil de investidor classificado corretamente em 100% dos casos
- ✅ Verificação WhatsApp com taxa de sucesso > 95%

#### Análise de Carteira
- ✅ Cálculo de preço médio com precisão de 2 casas decimais
- ✅ Importação de CSV com taxa de erro < 5%
- ✅ Detecção automática de formato de 5 principais corretoras

#### IA e Chat
- ✅ 100% das respostas contêm disclaimer obrigatório
- ✅ 0% de verbos imperativos nas análises
- ✅ Tempo de resposta médio < 8 segundos

#### Dados Financeiros
- ✅ Uptime de webscraping > 95%
- ✅ Diferença de cotações < 1% entre fontes
- ✅ Atualização de indicadores conforme cronograma definido

### 4.2 Critérios Não-Funcionais

#### Performance
- ✅ Dashboard carrega em < 3 segundos (3G)
- ✅ API responses em < 500ms (p95)
- ✅ Briefing gerado e enviado em < 30 segundos

#### Segurança
- ✅ Todas as senhas criptografadas (bcrypt/Argon2)
- ✅ RLS policies impedem acesso entre usuários
- ✅ Dados sensíveis criptografados at-rest

#### Usabilidade
- ✅ Taxa de conclusão do onboarding > 80%
- ✅ Net Promoter Score (NPS) > 50
- ✅ Tempo médio de resposta de suporte < 4 horas

### 4.3 Critérios de Compliance

#### CVM - Fase 1
- ✅ 100% do conteúdo classificado como "informativo/educacional"
- ✅ Zero recomendações personalizadas de compra/venda
- ✅ Disclaimers em português em 100% das comunicações
- ✅ Auditoria mensal de conteúdo gerado pela IA

---

## 5. Ferramentas de Teste

### 5.1 Frontend (React/Lovable)

#### Testes Unitários
- **Vitest**: Framework de testes rápido e moderno
- **Testing Library**: Para testes de componentes React
- **jsdom**: Ambiente DOM para testes headless

#### Testes E2E
- **Playwright**: Automação de navegador multiplataforma
- **Cypress**: Alternative para testes E2E com debugging visual

### 5.2 Backend (Supabase)

#### Testes de Edge Functions
- **Deno Test**: Runner nativo para funções Deno
- **Supertest**: Para testes de APIs HTTP
- **pg-tap**: Testes específicos para PostgreSQL

#### Testes de Banco
- **Supabase CLI**: Para setup de ambiente de teste
- **Faker.js**: Geração de dados de teste

### 5.3 Integrações e APIs

#### Testes de API
- **Postman/Newman**: Coleções de testes automatizados
- **Jest/Vitest**: Para testes de integração
- **Nock**: Mock de requisições HTTP

#### Webscraping
- **Custom Test Suite**: Scripts específicos para validar scrapers
- **Puppeteer**: Para testes de scraping complexos

### 5.4 WhatsApp e IA

#### Evolution API
- **Custom Scripts**: Validação de envio/recebimento
- **Webhook Testing**: Simulação de mensagens

#### Claude/Perplexity APIs
- **Response Validators**: Análise automática de compliance
- **Token Counter**: Monitoramento de custos

### 5.5 Performance e Monitoramento

#### Performance Testing
- **Lighthouse CI**: Métricas de performance web
- **K6**: Testes de carga para APIs
- **Artillery**: Load testing para cenários específicos

#### Monitoramento
- **Sentry**: Error tracking e performance monitoring
- **Uptime Kuma**: Monitoramento de uptime
- **Custom Dashboards**: Métricas específicas da Aurea

---

## 6. Cronograma de Testes

### 6.1 Semana 1-2: Setup e Testes Unitários
```
Dias 1-3: Configuração do ambiente de testes
- Setup Vitest para frontend
- Configuração Deno Test para Edge Functions
- Criação de database de teste no Supabase

Dias 4-7: Desenvolvimento de testes unitários
- Funções de cálculo financeiro
- Validadores e parsers
- Componentes React críticos

Dias 8-14: Testes de integração básica
- Supabase Edge Functions
- Conexões com APIs externas
- Fluxos de autenticação
```

### 6.2 Semana 3-4: Testes de Integração

```
Dias 15-21: Integrações críticas
- WhatsApp via Evolution API
- Claude API e processamento de IA
- Webscraping e coleta de dados
- Gateways de pagamento

Dias 22-28: Testes E2E principais
- Fluxo de onboarding completo
- Sincronização de carteira
- Geração e envio de briefings
- Sistema de planos e limites
```

### 6.3 Semana 5-6: Testes Especializados

```
Dias 29-35: Compliance e Segurança
- Validação automática de disclaimers
- Auditoria de conteúdo da IA
- Testes de segurança (RLS, autenticação)
- Validação de cálculos financeiros

Dias 36-42: Performance e Estabilidade
- Testes de carga no sistema
- Validação de circuit breakers
- Monitoramento de performance
- Testes de recuperação
```

### 6.4 Semana 7-8: Validação Final e Deploy

```
Dias 43-49: Testes de Aceitação
- Validação com usuários beta
- Ajustes baseados em feedback
- Testes de produção simulada
- Documentação de casos de teste

Dias 50-56: Preparação para Produção
- Testes em ambiente de staging
- Configuração de monitoramento
- Planos de rollback
- Go

---
*Tipo: testing*
*Gerado pelo ForgeAI em 13/02/2026*
