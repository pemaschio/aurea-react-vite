# Aurea - Checklist de Execução

## Objetivo do Projeto
Assistente financeiro inteligente que combina análise macroeconômica com carteira pessoal dos usuários, oferecendo consultoria de investimentos via WhatsApp

## Stack Tecnológica
Frontend: Lovable (React), Backend/DB: Supabase, Automação: n8n, IA: Claude API, Pesquisa: Perplexity API, WhatsApp: Evolution API, Dados: B3/Yahoo/Alpha Vantage, Pagamentos: Stripe/Asaas

## Biblioteca de Componentes UI
shadcn/ui

## Público-Alvo
Investidores ativos autodidatas, 28-45 anos, renda R$ 8-35 mil, patrimônio R$ 30-500 mil, profissionais liberais e empresários

---

## COMO USAR ESTE CHECKLIST

Este documento foi gerado automaticamente pelo ForgeAI para acompanhar o progresso do desenvolvimento.

**Para o Desenvolvedor:**
1. Marque `[x]` nos itens conforme forem sendo implementados
2. Atualize o status de cada fase manualmente
3. Use este documento como referência de progresso

**Para Agentes de IA:**
1. Leia este checklist para entender o que já foi feito
2. Continue a partir dos itens pendentes (`[ ]`)
3. Atualize o checklist conforme progredir

---

## FASES DO PROJETO

### Fase 1: Planejamento

**Duração Estimada:** 2 semanas
**Status:** [ Pendente ]

*Definição de requisitos e arquitetura*

- [ ] Documentação de requisitos
- [ ] Arquitetura do sistema

### Fase 2: Design

**Duração Estimada:** 2 semanas
**Status:** [ Pendente ]

*Criação de wireframes e protótipos*

- [ ] Wireframes
- [ ] Protótipos de alta fidelidade

### Fase 3: Desenvolvimento

**Duração Estimada:** 4 semanas
**Status:** [ Pendente ]

*Implementação das funcionalidades*

- [ ] Código-fonte
- [ ] Testes unitários

### Fase 4: Testes

**Duração Estimada:** 2 semanas
**Status:** [ Pendente ]

*Testes de qualidade e correções*

- [ ] Relatório de testes
- [ ] Correções de bugs

### Fase 5: Deploy

**Duração Estimada:** 1 semana
**Status:** [ Pendente ]

*Implantação e entrega final*

- [ ] Aplicação em produção
- [ ] Documentação final

---

## FUNCIONALIDADES PADRÃO (Obrigatórias em todos os projetos)

### Autenticação
- [ ] Página de Login (email + senha)
- [ ] Página de Cadastro (nome, email, telefone, senha)
- [ ] Página "Esqueci minha senha" com recuperação por email
- [ ] Página de redefinir senha
- [ ] Campo de senha com ícone de olho (mostrar/esconder) em todos os formulários
- [ ] Validação de campos em tempo real

### Perfil do Usuário
- [ ] Página de perfil completa (foto, nome, email, telefone)
- [ ] Upload de foto de perfil com preview
- [ ] Edição de dados pessoais
- [ ] Alterar senha (senha atual + nova senha + confirmação)
- [ ] Avatar com fallback de iniciais no header/sidebar

### Hierarquia de Usuários
- [ ] 3 níveis: Super-Admin, Admin, Usuário Comum
- [ ] Campo `role` no modelo de usuário
- [ ] Middleware de autorização por nível
- [ ] Proteção de rotas no frontend e backend
- [ ] Menu/sidebar adaptativo conforme nível

### Interface Padrão
- [ ] Calendários/DatePicker da biblioteca UI (não usar input nativo)
- [ ] Tabelas com paginação, busca e ordenação
- [ ] Formulários com validação visual (bordas coloridas + mensagens)
- [ ] Toasts/notificações (sucesso, erro, informação)
- [ ] Loading states (spinners) em botões
- [ ] Skeletons para carregamento de conteúdo
- [ ] Modal de confirmação para ações destrutivas

### Navegação e Layout
- [ ] Sidebar responsiva com ícones e item ativo
- [ ] Header com avatar, dropdown do usuário e notificações
- [ ] Toggle tema claro/escuro com persistência

### Segurança
- [ ] Hash de senhas com bcrypt
- [ ] Middleware de autenticação em rotas protegidas
- [ ] Sessões seguras (httpOnly, secure, expiração)

### QA E2E - Testes Automatizados com Playwright
- [ ] Instalar Playwright: `npm init playwright@latest && npx playwright install --with-deps chromium`
- [ ] Instalar extensão "Playwright Test for VSCode" (ID: `ms-playwright.playwright`)
- [ ] Criar arquivo `.vscode/tasks.json` com tasks do Playwright (rodar testes, UI mode, codegen, relatório)
- [ ] Configurar `playwright.config.ts` com baseURL, webServer e reporter
- [ ] Configurar scripts no package.json: `test:e2e`, `test:e2e:ui`, `test:e2e:headed`, `test:e2e:codegen`, `test:e2e:report`
- [ ] Criar testes de autenticação (login válido/inválido, cadastro, logout)
- [ ] Criar testes do dashboard (elementos visíveis, dados carregados)
- [ ] Criar testes CRUD para cada entidade (clientes, fornecedores, lançamentos, etc.)
- [ ] Criar testes de navegação (sidebar, rotas protegidas, páginas acessíveis)
- [ ] Criar testes de responsividade (viewports desktop e mobile)
- [ ] Criar testes de tema (alternar claro/escuro)
- [ ] Garantir `data-testid` em todos os elementos interativos
- [ ] Executar todos os testes e corrigir falhas

---

## ETAPAS DO PROJETO (WBS)

| # | Etapa | Peso | Status |
|---|-------|------|--------|
| 1 | Planejamento | 15% | Pendente |
| 2 | Design | 20% | Pendente |
| 3 | Desenvolvimento | 35% | Pendente |
| 4 | Testes | 20% | Pendente |
| 5 | Deploy | 10% | Pendente |

---

## ENTREGÁVEIS PRINCIPAIS

- [ ] Dashboard web responsivo desenvolvido em React (Lovable) com painel de controle do usuário
- [ ] Sistema de monitoramento de carteira pessoal com sincronização de posições
- [ ] Módulo de análise macroeconômica com indicadores econômicos automatizados
- [ ] Bot conversacional inteligente integrado ao WhatsApp via Evolution API
- [ ] Sistema de webscraping para coleta de dados financeiros (B3, Yahoo Finance, Alpha Vantage)
- [ ] Funcionalidade de watchlist personalizada para acompanhamento de ativos
- [ ] Sistema de múltiplos planos de assinatura (Free, Premium, Advisory)
- [ ] Backend completo em Supabase com banco de dados e APIs
- [ ] Integração com Claude API para processamento de IA
- [ ] Integração com Perplexity API para pesquisas financeiras
- [ ] Sistema de pagamentos integrado (Stripe/Asaas)
- [ ] Fluxos de automação via n8n para processamento de dados
- [ ] Sistema de compliance CVM para conteúdo educacional/informativo
- [ ] Documentação técnica e manual do usuário

---

## RESUMO DE PROGRESSO

| Fase | Concluído | Pendente | % |
|------|-----------|----------|---|
| Planejamento | 0 | 2 | 0% |
| Design | 0 | 2 | 0% |
| Desenvolvimento | 0 | 2 | 0% |
| Testes | 0 | 2 | 0% |
| Deploy | 0 | 2 | 0% |
| **TOTAL** | **0** | **10** | **0%** |

---

## PRÓXIMOS PASSOS RECOMENDADOS

1. Leia toda a documentação em `/docs`
2. Configure o banco de dados conforme `infra/database/README.md`
3. Configure as variáveis de ambiente (`.env.example`)
4. Inicie o desenvolvimento pela Fase 1
5. Atualize este checklist conforme progredir

---

## ARQUIVOS IMPORTANTES

- `PROMPT_TECNICO.md` - Instruções técnicas para agentes de IA
- `docs/01-briefing.md` - Contexto e requisitos do projeto
- `docs/02-escopo.md` - Funcionalidades e entregáveis
- `docs/03-roadmap.md` - Fases e cronograma
- `docs/04-wbs.md` - Estrutura analítica do trabalho
- `docs/guia-de-estilos.md` - **FONTE ÚNICA** de cores, fontes e espaçamentos

---

*Gerado automaticamente por ForgeAI em 13/02/2026 às 17:00:33*
*Atualize este documento manualmente conforme o progresso do projeto*
