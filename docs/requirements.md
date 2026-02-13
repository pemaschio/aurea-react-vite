# Especificação de Requisitos

# Especificação de Requisitos - AUREA

## 1. Visão Geral do Produto

**AUREA** é uma plataforma de inteligência financeira brasileira que combina análise macroeconômica em tempo real com monitoramento personalizado de carteiras de investimento. A solução atua como assistente financeiro inteligente, oferecendo consultoria via IA conversacional através do WhatsApp e dashboard web, posicionando-se entre robo-advisors automatizados e assessorias tradicionais.

### 1.1 Objetivo de Negócio
Desenvolver um assistente financeiro inteligente que democratize o acesso à análise financeira sofisticada para investidores ativos autodidatas, combinando proximidade humana com inteligência artificial de última geração.

### 1.2 Público-Alvo
- **Persona Primária**: Investidores ativos autodidatas (28-45 anos)
- **Renda**: R$ 8.000 - R$ 35.000/mês
- **Patrimônio**: R$ 30.000 - R$ 500.000 investidos
- **Perfil**: Profissionais liberais, empresários, área tech/saúde/direito

### 1.3 Posicionamento
"Inteligência sofisticada com proximidade humana" - oferecendo consultoria financeira através de IA disponível 24/7, transmitindo clareza, proximidade, precisão e confiança.

## 2. Requisitos Funcionais

### 2.1 Sistema de Autenticação e Perfil do Usuário

#### RF001 - Cadastro de Usuário
- O sistema deve permitir cadastro via email/senha
- Deve implementar verificação de email obrigatória
- Deve coletar dados básicos: nome, email, telefone (WhatsApp)
- Deve integrar com Supabase Auth para gerenciamento de sessões

**Critérios de Aceitação:**
- Usuário consegue se cadastrar com email válido
- Email de verificação é enviado automaticamente
- Dados são armazenados com segurança no Supabase
- Validação de formato de telefone brasileiro

**Prioridade:** Alta

#### RF002 - Perfil de Investidor (Suitability)
- O sistema deve aplicar questionário de suitability com 6 perguntas
- Deve classificar automaticamente o perfil: conservador/moderado/agressivo
- Deve permitir atualização posterior do perfil
- Deve armazenar histórico de mudanças de perfil

**Critérios de Aceitação:**
- Questionário apresenta perguntas claras sobre objetivos e tolerância a risco
- Classificação automática funciona corretamente
- Perfil influencia nas análises apresentadas
- Interface responsiva e intuitiva

**Prioridade:** Alta

### 2.2 Sistema de Onboarding Guiado

#### RF003 - Fluxo de Onboarding em 5 Etapas
- Etapa 1: Boas-vindas com apresentação da marca
- Etapa 2: Perfil de investidor (suitability)
- Etapa 3: Sincronização inicial de carteira
- Etapa 4: Configuração de watchlist
- Etapa 5: Configuração do WhatsApp

**Critérios de Aceitação:**
- Fluxo completável em 3-5 minutos
- Possibilidade de retomar de onde parou
- Progress bar indicando progresso
- Animações suaves entre etapas

**Prioridade:** Alta

### 2.3 Gerenciamento de Carteira

#### RF004 - Sincronização de Posições
- **Método 1:** Input manual assistido com autocomplete de ativos
- **Método 2:** Upload de extratos CSV/PDF (planos Essential+)
- **Método 3:** Integração com CEI/B3 (planos Premium+, Fase 2)
- **Método 4:** Open Finance (plano Advisory, Fase 3)

**Critérios de Aceitação:**
- Autocomplete funciona com base de ativos brasileiros
- Parser de CSV suporta principais corretoras (XP, Clear, Rico, Inter, BTG, NuInvest)
- PDF parsing extrai corretamente ticker, quantidade, preço, data
- Validação cruzada de preços com ±5% de tolerância

**Prioridade:** Alta

#### RF005 - Cálculo de Preço Médio e Performance
- Deve calcular preço médio ponderado considerando todas as transações
- Deve calcular P&L realizado e não realizado
- Deve suportar desdobramentos e bonificações
- Deve apresentar alocação percentual por ativo/setor

**Critérios de Aceitação:**
- Cálculos matemáticos precisos e auditáveis
- Histórico de transações mantido integralmente
- Relatórios de performance claros e visuais
- Atualização em tempo real com cotações

**Prioridade:** Alta

### 2.4 Sistema de Análise Macroeconômica

#### RF006 - Monitoramento de Indicadores
- **Tempo real:** Ibovespa, Dólar, Euro, Petróleo, Ouro, Bitcoin, DI Futuro, S&P 500
- **Diário:** Selic, CDI, IPCA, IGP-M, PTAX, EMBI+, CDS Brasil
- **Mensal/Trimestral:** PIB, PMI, Desemprego, Balança Comercial
- **Internacional:** Fed Funds Rate, CPI americano, PMI China, Treasury 10Y, VIX

**Critérios de Aceitação:**
- Ticker tape atualiza a cada 15 segundos durante horário de mercado
- APIs integradas funcionam com failover automático
- Dados históricos armazenados para comparações
- Interface apresenta semáforo verde/amarelo/vermelho por indicador

**Prioridade:** Alta

#### RF007 - Análise Contextualizada
- Deve cruzar indicadores macro com carteira individual do usuário
- Deve gerar insights acionáveis através da Claude API
- Deve apresentar múltiplos cenários (otimista/neutro/pessimista)
- Deve manter histórico de análises para auditoria

**Critérios de Aceitação:**
- Análises consideram perfil de risco do usuário
- Linguagem clara e educacional (não recomendações diretas)
- Múltiplos cenários sempre apresentados
- Tempo de resposta < 10 segundos para análises simples

**Prioridade:** Alta

### 2.5 Sistema de Watchlist

#### RF008 - Gestão de Ativos Acompanhados
- Deve permitir adicionar/remover ativos na watchlist
- Deve monitorar preços em tempo real
- Deve coletar notícias relevantes por ativo
- Deve permitir configurar alertas de preço

**Critérios de Aceitação:**
- Busca de ativos com autocomplete eficiente
- Notificações funcionam conforme configuração do usuário
- Interface organizada por categorias (ações, FIIs, ETFs, etc.)
- Limites respeitados por plano de assinatura

**Prioridade:** Média

### 2.6 Bot Conversacional WhatsApp

#### RF009 - Integração WhatsApp via Evolution API
- Deve enviar briefing matinal automático
- Deve responder perguntas sobre carteira e mercado
- Deve processar comandos estruturados
- Deve manter contexto de conversas

**Critérios de Aceitação:**
- Briefing enviado no horário configurado pelo usuário
- Respostas em tempo real (< 10 segundos)
- Interface conversacional natural e intuitiva
- Disclaimers de compliance sempre incluídos

**Prioridade:** Alta

#### RF010 - Processamento de Linguagem Natural
- Deve entender perguntas sobre ativos específicos
- Deve interpretar comandos de configuração
- Deve responder dúvidas sobre mercado em geral
- Deve redirecionar para dashboard quando necessário

**Critérios de Aceitação:**
- Taxa de acerto > 85% em perguntas comuns
- Fallback gracioso para perguntas não compreendidas
- Integração com Claude API para análises complexas
- Logs completos para melhoria contínua

**Prioridade:** Alta

### 2.7 Sistema de Webscraping e Coleta de Dados

#### RF011 - Orquestração de Coleta
- Deve implementar circuit breaker para APIs instáveis
- Deve ter sistema de fallback entre fontes
- Deve respeitar rate limits por provedor
- Deve validar qualidade dos dados coletados

**Critérios de Aceitação:**
- Circuit breaker funciona após 5 falhas consecutivas
- Fallback automático entre fontes configuradas
- Rate limiting respeitado: Yahoo (5 req/s), Status Invest (2 req/s)
- Dados "stale" marcados visualmente no frontend

**Prioridade:** Alta

#### RF012 - Processamento de Notícias
- Deve coletar notícias de InfoMoney, Valor, Bloomberg BR
- Deve classificar relevância e sentiment através de IA
- Deve associar notícias aos ativos impactados
- Deve resumir notícias em 2 frases máximo

**Critérios de Aceitação:**
- Coleta automatizada a cada 30 minutos para macro, 2h para ativos
- Classificação de sentiment precisa (positive/negative/neutral)
- Score de relevância 0-100 baseado em impacto para investidores
- Resumos claros e objetivos via Claude API

**Prioridade:** Média

### 2.8 Sistema de Planos e Limites

#### RF013 - Enforcement de Limites por Plano
- **Free:** 5 watchlist, 0 chat queries, 3 insights/dia básicos
- **Essential (R$49,90):** 20 watchlist, 10 chat queries/mês, briefing full
- **Premium (R$149,90):** 99 watchlist, ilimitado chat, upload documentos
- **Advisory (R$499,90):** Ilimitado, Open Finance, suporte prioritário

**Critérios de Aceitação:**
- Edge Function check-plan-limit funciona para todos os recursos
- Contadores mensais com reset automático
- Upgrade contextual quando limite atingido
- Interface clara sobre limites e uso atual

**Prioridade:** Alta

### 2.9 Sistema de Compliance CVM

#### RF014 - Disclaimers Automáticos
- Deve injetar disclaimers em todo conteúdo gerado por IA
- Deve proibir verbos imperativos (comprar, vender, investir)
- Deve sempre apresentar múltiplos cenários
- Deve manter auditoria completa de interações

**Critérios de Aceitação:**
- Sistema de disclaimers impossível de burlar
- Validação automática de linguagem compliance
- Logs auditáveis por 5+ anos
- Termos de uso versionados com aceite obrigatório

**Prioridade:** Crítica

## 3. Requisitos Não-Funcionais

### 3.1 Performance

#### RNF001 - Tempos de Resposta
- Dashboard deve carregar em < 3 segundos
- APIs devem responder em < 500ms (p95)
- WhatsApp bot deve responder em < 10 segundos
- Análises de IA simples em < 10 segundos, complexas < 30 segundos

#### RNF002 - Escalabilidade
- Suportar até 10.000 usuários simultâneos
- Banco de dados otimizado para consultas frequentes
- Cache inteligente para dados de mercado
- CDN para assets estáticos

### 3.2 Segurança

#### RNF003 - Proteção de Dados
- Criptografia AES-256 para dados sensíveis
- Row Level Security (RLS) habilitado no Supabase
- HTTPS obrigatório em todas as comunicações
- Credenciais de corretoras encriptadas via Supabase Vault

#### RNF004 - Conformidade Regulatória
- Compliance com CVM Resolução 19/2021
- Retenção de logs por mínimo 5 anos
- Disclaimers obrigatórios em todo conteúdo
- Auditoria completa de interações usuário-IA

### 3.3 Disponibilidade

#### RNF005 - Uptime e Confiabilidade
- Disponibilidade mínima de 99.5% (uptime)
- Backup automático diário com estratégia 3-2-1
- Disaster recovery com RTO de 4 horas
- Monitoramento 24/7 com alertas automáticos

### 3.4 Usabilidade

#### RNF006 - Interface e Experiência
- Design responsivo seguindo brand board oficial
- Paleta de cores: Navy (#0A1628), Gold (#D4A843), Emerald (#00C896)
- Tipografia: Playfair Display para títulos, DM Sans para interface
- Componentes shadcn/ui com customizações da marca

## 4. Critérios de Aceitação Gerais

### 4.1 Funcionalidade
- ✅ Todos os fluxos principais funcionam conforme especificado
- ✅ Integração WhatsApp estável com Evolution API
- ✅ Sincronização de carteira precisa e confiável
- ✅ Análises de IA relevantes e dentro dos padrões de compliance
- ✅ Sistema de cobrança funcional com Stripe/Asaas

### 4.2 Qualidade
- ✅ Cobertura de testes unitários > 80% em funções críticas
- ✅ Testes E2E automatizados para fluxos principais
- ✅ Performance dentro dos benchmarks estabelecidos
- ✅ Zero vulnerabilidades críticas de segurança

### 4.3 Compliance
- ✅ Auditoria jurídica aprovando linguagem utilizada
- ✅ Disclaimers presentes em 100% do conteúdo gerado
- ✅ Sistema de logs auditáveis implementado
- ✅ Termos de uso e política de privacidade finalizados

## 5. Priorização dos Requisitos

### 5.1 Fase 1 - MVP (Meses 1-2)
**Prioridade Crítica:**
- RF001, RF002, RF003: Sistema básico de usuários e onboarding
- RF004, RF005: Carteira básica com input manual
- RF006, RF007: Análise macro básica
- RF009, RF010: WhatsApp bot funcional
- RF013, RF014: Sistema de planos e compliance

**Prioridade Alta:**
- RF011: Webscraping básico para cotações
- RNF003, RNF004: Segurança e compliance

### 5.2 Fase 2 - Expansão (Meses 3-6)
**Prioridade Média:**
- RF008: Sistema de watchlist completo
- RF012: Processamento avançado de notícias
- Integração CEI/B3 para carteiras
- Dashboard administrativo completo

**Prioridade Baixa:**
- Integrações Open Finance
- Funcionalidades avançadas de análise
- Otimizações de performance

## 6. Dependências Técnicas

### 6.1 Externas
- Evolution API para WhatsApp (crítica)
- Claude API para processamento de IA (crítica)
- Supabase para backend e database (crítica)
- APIs de dados: B3, Yahoo Finance, Alpha

---
*Tipo: requirements*
*Gerado pelo ForgeAI em 13/02/2026*
