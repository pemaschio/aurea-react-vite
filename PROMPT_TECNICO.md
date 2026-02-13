# PROMPT TÉCNICO - Aurea

## INSTRUÇÕES CRÍTICAS PARA O AGENTE DE IA

> **IMPORTANTE:** Leia COMPLETAMENTE este documento e toda a pasta `/docs` antes de iniciar qualquer desenvolvimento.
> Este projeto foi planejado detalhadamente no ForgeAI e todas as especificações devem ser seguidas.

---

## 1. FLUXO DE TRABALHO OBRIGATÓRIO

### Etapa 1: Planejamento (OBRIGATÓRIO)
1. Leia todos os arquivos da pasta `/docs`
2. Analise o escopo, roadmap e documentação técnica
3. Crie um **plano de execução detalhado** em português brasileiro
4. **APRESENTE O PLANO AO USUÁRIO PARA APROVAÇÃO**
5. Só inicie o desenvolvimento após aprovação explícita

### Etapa 2: Configuração do Banco de Dados
1. Pergunte ao usuário: **"Deseja usar Supabase (banco externo) ou PostgreSQL local (Replit)?"**
2. Se **Supabase**:
   - Solicite a variável `SUPABASE_DATABASE_URL` se não estiver configurada
   - Use o schema em `/infra/database/schema.sql`
   - Execute as migrações conforme `/infra/database/README.md`
3. Se **PostgreSQL local (Replit)**:
   - Crie o banco usando as ferramentas do Replit
   - A variável `DATABASE_URL` será configurada automaticamente
   - Execute o schema inicial

### Etapa 3: Configuração de Variáveis de Ambiente
Verifique se as seguintes variáveis estão configuradas:
- Nenhuma variável adicional identificada no cofre

Se alguma variável estiver faltando, **solicite ao usuário**.

### Etapa 4: Desenvolvimento
- Siga as fases do roadmap na ordem especificada
- Implemente cada funcionalidade conforme documentação
- Teste cada feature antes de prosseguir
- Use os estilos definidos em `/styles`

---

## 2. STACK TECNOLÓGICA (PRIORIDADE MÁXIMA)

**Stack Principal:** React + Vite + TypeScript

**Detalhes do Briefing:**
Frontend: Lovable (React), Backend/DB: Supabase, Automação: n8n, IA: Claude API, Pesquisa: Perplexity API, WhatsApp: Evolution API, Dados: B3/Yahoo/Alpha Vantage, Pagamentos: Stripe/Asaas

**Biblioteca de Componentes UI:** shadcn/ui
- USE OBRIGATORIAMENTE esta biblioteca para todos os componentes visuais
- Consulte a documentação oficial da biblioteca para padrões e boas práticas
- Instale as dependências corretas antes de iniciar a implementação

**Restrições Técnicas:**
Desenvolvimento com Windsurf, desenvolvimento solo

### Arquitetura Obrigatória: React + Vite + TypeScript

#### Dependências Principais
- React 18+ com TypeScript
- Vite como bundler e dev server
- TailwindCSS para estilos
- Shadcn/ui para componentes de interface
- TanStack React Query para gerenciamento de estado do servidor
- React Router DOM (v6) ou Wouter para roteamento
- Express.js para backend API
- Drizzle ORM para banco de dados
- PostgreSQL como banco de dados
- Zod para validação

#### Estrutura de Pastas OBRIGATÓRIA

```
/
├── client/                         # Frontend React
│   ├── src/
│   │   ├── App.tsx                 # Componente raiz (providers, rotas)
│   │   ├── main.tsx                # Entry point
│   │   ├── index.css               # Estilos globais + variáveis CSS
│   │   ├── components/
│   │   │   ├── ui/                 # Componentes Shadcn/ui
│   │   │   └── [feature]/          # Componentes por funcionalidade
│   │   ├── pages/                  # Páginas/rotas
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── lib/
│   │   │   ├── queryClient.ts      # Configuração do React Query
│   │   │   └── utils.ts            # Funções utilitárias
│   │   └── types/                  # Tipos TypeScript
│   └── index.html
├── server/                         # Backend Express
│   ├── index.ts                    # Entry point do servidor
│   ├── routes.ts                   # Definição de rotas da API
│   ├── storage.ts                  # Camada de acesso a dados
│   ├── auth.ts                     # Autenticação
│   └── db.ts                       # Conexão com banco de dados
├── shared/                         # Código compartilhado
│   └── schema.ts                   # Schema Drizzle + tipos
├── vite.config.ts                  # Configuração do Vite
├── tailwind.config.ts
├── tsconfig.json
├── drizzle.config.ts
└── package.json
```

#### Padrões de Código Obrigatórios

1. **SPA (Single Page Application)** - Todo o roteamento acontece no frontend
2. **API REST** - Backend Express serve API JSON em `/api/*`
3. **React Query** - Use para TODAS as chamadas de API (queryKey, mutations, cache invalidation)
4. **Tipos compartilhados** - Defina schemas no `shared/schema.ts` e importe em ambos os lados
5. **Drizzle ORM** - Use para todas as operações de banco de dados no backend
6. **Zod** - Valide request bodies no backend usando schemas derivados do Drizzle

#### Comandos de Setup

```bash
npm create vite@latest client -- --template react-ts
npm install express drizzle-orm pg @tanstack/react-query
npm install -D drizzle-kit @types/express
npx drizzle-kit push
```

---

## 3. RESUMO DO PROJETO

**Nome:** Aurea
**Objetivo:** Assistente financeiro inteligente que combina análise macroeconômica com carteira pessoal dos usuários, oferecendo consultoria de investimentos via WhatsApp
**Público-alvo:** Investidores ativos autodidatas, 28-45 anos, renda R$ 8-35 mil, patrimônio R$ 30-500 mil, profissionais liberais e empresários
**Prazo:** 2 meses

### Entregáveis Principais
1. Dashboard web responsivo desenvolvido em React (Lovable) com painel de controle do usuário
2. Sistema de monitoramento de carteira pessoal com sincronização de posições
3. Módulo de análise macroeconômica com indicadores econômicos automatizados
4. Bot conversacional inteligente integrado ao WhatsApp via Evolution API
5. Sistema de webscraping para coleta de dados financeiros (B3, Yahoo Finance, Alpha Vantage)
6. Funcionalidade de watchlist personalizada para acompanhamento de ativos
7. Sistema de múltiplos planos de assinatura (Free, Premium, Advisory)
8. Backend completo em Supabase com banco de dados e APIs
9. Integração com Claude API para processamento de IA
10. Integração com Perplexity API para pesquisas financeiras
11. Sistema de pagamentos integrado (Stripe/Asaas)
12. Fluxos de automação via n8n para processamento de dados
13. Sistema de compliance CVM para conteúdo educacional/informativo
14. Documentação técnica e manual do usuário

### Fases do Roadmap
1. **Planejamento** - 2 semanas
2. **Design** - 2 semanas
3. **Desenvolvimento** - 4 semanas
4. **Testes** - 2 semanas
5. **Deploy** - 1 semana

### Marcos (Milestones)
- Kick-off do Projeto
- Aprovação do Design
- MVP Funcional
- Go-Live

---

## 4. ESTRUTURA DE PASTAS DO EXPORT

```
/
├── PROJECT_CHECKLIST.md       # Checklist de progresso (acompanhe o desenvolvimento!)
├── PROMPT_TECNICO.md          # Este arquivo (leia primeiro!)
├── README.md                  # Visão geral do projeto
├── manifest.json              # Metadados do export
├── /docs/                     # Documentação completa
│   ├── 01-briefing.md
│   ├── 02-escopo.md
│   ├── 03-roadmap.md
│   ├── 04-wbs.md             # Work Breakdown Structure
│   ├── guia-de-estilos.md    # FONTE ÚNICA de estilos (cores, fontes, CSS)
│   └── ...                    # Documentos adicionais
├── /infra/                    # Infraestrutura
│   ├── database/
│   │   ├── schema.sql
│   │   ├── seed.sql
│   │   └── README.md
│   └── environment/
│       └── .env.example
└── /src/                      # Código fonte (se gerado)
```

---

## FUNCIONALIDADES PADRÃO OBRIGATÓRIAS

> **ATENÇÃO:** As funcionalidades abaixo devem ser implementadas em TODOS os projetos, independentemente do escopo específico.
> Elas representam o mínimo viável de qualquer aplicação web profissional.

### A. Autenticação Completa

1. **Página de Login**
   - Campos: email e senha
   - Botão "Entrar"
   - Link "Esqueci minha senha"
   - Link "Criar nova conta"
   - Validação de campos em tempo real

2. **Página de Cadastro (Registro)**
   - Campos: nome completo, email, telefone, senha, confirmar senha
   - Validação de senha forte (mínimo 8 caracteres, letras e números)
   - Aceite de termos de uso (checkbox)
   - Link "Já tem conta? Faça login"

3. **Recuperação de Senha**
   - Página "Esqueci minha senha" com campo de email
   - Envio de link/código de recuperação por email
   - Página de redefinir senha com validação

4. **Campo de Senha com Visibilidade**
   - Ícone de olho (aberto/fechado) em TODOS os campos de senha
   - Olho aberto = senha visível (text), olho fechado = senha oculta (password)
   - Implementar em: login, cadastro, redefinir senha, alterar senha no perfil

### B. Perfil do Usuário Completo

1. **Página de Perfil** com:
   - Foto de perfil (upload de imagem com preview)
   - Nome completo (editável)
   - Email (editável com confirmação)
   - Telefone (editável com máscara de formatação)
   - Botão "Salvar Alterações"
   - Seção "Alterar Senha" (senha atual, nova senha, confirmar nova senha)

2. **Avatar/Foto de Perfil**
   - Upload de imagem (JPG, PNG, WebP)
   - Preview da imagem antes de salvar
   - Fallback com iniciais do nome quando não há foto
   - Exibir no header/sidebar da aplicação

### C. Hierarquia de Usuários (Permissões)

Implementar 3 níveis de acesso:

1. **Super-Admin** (nível máximo)
   - Acesso total ao sistema
   - Gerenciar organizações e todos os usuários
   - Configurar parâmetros globais
   - Aprovar/rejeitar contas de novos usuários

2. **Admin** (administrador da organização)
   - Gerenciar membros da sua organização
   - Convidar novos usuários
   - Configurar parâmetros da organização
   - Acesso a relatórios e dashboard administrativo

3. **Usuário Comum**
   - Acesso às funcionalidades básicas do sistema
   - Gerenciar apenas seus próprios dados
   - Sem acesso a áreas administrativas

**Implementação:**
- Campo `role` no modelo de usuário (`super_admin`, `admin`, `user`)
- Middleware de autorização por nível de acesso
- Proteção de rotas no frontend e backend
- Menu/sidebar adaptativo conforme nível do usuário

### D. Componentes de Interface Padrão

Usar shadcn/ui para todos os componentes abaixo:

1. **Calendários e Seletores de Data**
   - DatePicker da biblioteca UI escolhida (NÃO usar input type="date" nativo)
   - Formato brasileiro: DD/MM/AAAA
   - Locale pt-BR configurado
   - Suporte a seleção de intervalo de datas quando necessário

2. **Tabelas com Funcionalidades**
   - Paginação (10, 25, 50 itens por página)
   - Campo de busca/filtro
   - Ordenação por colunas (click no header)
   - Estado vazio com mensagem e ícone

3. **Formulários com Validação Visual**
   - Mensagens de erro abaixo de cada campo
   - Borda vermelha em campos com erro
   - Borda verde em campos válidos (opcional)
   - Botão de submit desabilitado enquanto formulário inválido

4. **Feedback Visual**
   - Toasts/notificações para sucesso, erro e informação
   - Loading states (spinners) em botões durante requisições
   - Skeletons para carregamento de conteúdo
   - Modal de confirmação para ações destrutivas ("Tem certeza?")

### E. Navegação e Layout

1. **Sidebar Responsiva**
   - Menu lateral com links de navegação
   - Ícones ao lado de cada item
   - Indicador visual do item ativo/selecionado
   - Colapsável em telas menores
   - Informações do usuário logado (avatar + nome)

2. **Header**
   - Logo ou nome da aplicação
   - Avatar do usuário com dropdown (Perfil, Configurações, Sair)
   - Notificações (sino com badge de contagem)

3. **Tema Claro/Escuro**
   - Toggle de tema (sol/lua) no header
   - Persistência da preferência do usuário (localStorage)
   - Respeitar preferência do sistema operacional como padrão

### F. Segurança Básica

1. **Senhas**
   - Hash com bcrypt (salt rounds: 10+)
   - NUNCA armazenar senhas em texto puro
   - Validação de força da senha no frontend

2. **Proteção de Rotas**
   - Middleware de autenticação em todas as rotas protegidas
   - Middleware de autorização por nível de acesso (role)
   - Redirecionamento para login quando não autenticado
   - Mensagem de "Acesso negado" quando sem permissão

3. **Sessões Seguras**
   - Tokens de sessão com expiração
   - httpOnly e secure nos cookies
   - Renovação automática de sessão

---

## 5. OBSERVAÇÕES IMPORTANTES

### Valores Monetários
- **TODOS os valores são armazenados em CENTAVOS** no banco de dados
- Para exibir: divida por 100 (ex: 15000 centavos = R$ 150,00)
- Para salvar: multiplique por 100

### Idioma
- Todo o código, comentários e interface devem usar **português brasileiro**
- Use acentuação correta (ç, ã, é, ô, etc.)

### Timer de Projeto
- O tempo decorrido só é contabilizado quando `isStarted = true`
- Calculado a partir do campo `startedAt`

### Formatação de Textos
- Campos de texto longo usam `\n\n` entre parágrafos
- No frontend, use `whitespace-pre-wrap` para preservar formatação

---

## 6. QA E2E - TESTES AUTOMATIZADOS COM PLAYWRIGHT

### 6.1 Instalação do Playwright

```bash
# Inicializar Playwright no projeto
npm init playwright@latest

# Instalar navegadores (Chromium é suficiente para a maioria dos testes)
npx playwright install --with-deps chromium
```

- Configurar `playwright.config.ts` na raiz do projeto
- Criar pasta `e2e/` ou `tests/` para os arquivos de teste

### 6.2 Instalar Extensão Playwright no VS Code / Windsurf

1. Abra o painel de extensões (**Ctrl+Shift+X**)
2. Busque por **"Playwright Test for VSCode"** (ID: `ms-playwright.playwright`)
3. Instale a extensão oficial da Microsoft
4. Recursos da extensão:
   - Botão de play nos testes para execução individual
   - Painel "Testing" na sidebar com todos os testes
   - Debug integrado com breakpoints
   - Pick Locator para selecionar elementos na página

### 6.3 Configurar VS Code Tasks para Playwright

Crie o arquivo `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Playwright: Rodar Todos os Testes",
      "type": "shell",
      "command": "npx playwright test",
      "group": { "kind": "test", "isDefault": true },
      "presentation": { "reveal": "always", "panel": "new" },
      "problemMatcher": []
    },
    {
      "label": "Playwright: Rodar com UI Mode",
      "type": "shell",
      "command": "npx playwright test --ui",
      "group": "test",
      "presentation": { "reveal": "always", "panel": "new" },
      "problemMatcher": []
    },
    {
      "label": "Playwright: Rodar Teste Atual",
      "type": "shell",
      "command": "npx playwright test ${relativeFile}",
      "group": "test",
      "presentation": { "reveal": "always", "panel": "new" },
      "problemMatcher": []
    },
    {
      "label": "Playwright: Gerar Código (Codegen)",
      "type": "shell",
      "command": "npx playwright codegen http://localhost:3000",
      "group": "test",
      "presentation": { "reveal": "always", "panel": "new" },
      "problemMatcher": []
    },
    {
      "label": "Playwright: Ver Relatório",
      "type": "shell",
      "command": "npx playwright show-report",
      "group": "test",
      "presentation": { "reveal": "always", "panel": "new" },
      "problemMatcher": []
    }
  ]
}
```

> Para executar: **Ctrl+Shift+P** > "Tasks: Run Task" > escolha a task desejada.

### 6.4 Configuração do `playwright.config.ts`

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### 6.5 Scripts no package.json

```json
{
  "scripts": {
    "test:e2e": "npx playwright test",
    "test:e2e:ui": "npx playwright test --ui",
    "test:e2e:headed": "npx playwright test --headed",
    "test:e2e:codegen": "npx playwright codegen http://localhost:3000",
    "test:e2e:report": "npx playwright show-report"
  }
}
```

### 6.6 Testes Obrigatórios

Criar testes E2E para **todas** as funcionalidades do projeto. No mínimo:

1. **Autenticação**: Login com credenciais válidas/inválidas, cadastro, logout, esqueci senha
2. **Dashboard**: Verificação de elementos, navegação, dados carregados
3. **CRUD Completo**: Para cada entidade do sistema (ex: clientes, fornecedores, lançamentos, produtos), testar criar, listar, editar e excluir
4. **Navegação**: Todas as páginas acessíveis, sidebar funcional, rotas protegidas
5. **Responsividade**: Testar em viewports desktop e mobile
6. **Tema**: Alternar entre tema claro e escuro

### 6.7 Exemplo de Teste

```typescript
import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test('deve fazer login com credenciais válidas', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[data-testid="input-email"]', 'usuario@email.com');
    await page.fill('[data-testid="input-password"]', 'senha123');
    await page.click('[data-testid="button-login"]');
    await expect(page).toHaveURL('/dashboard');
  });

  test('deve exibir erro com credenciais inválidas', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[data-testid="input-email"]', 'invalido@email.com');
    await page.fill('[data-testid="input-password"]', 'errada');
    await page.click('[data-testid="button-login"]');
    await expect(page.locator('[data-testid="text-error"]')).toBeVisible();
  });
});
```

> **IMPORTANTE:** Todos os elementos interativos devem ter atributo `data-testid` para facilitar os seletores do Playwright. Use o padrão: `{ação}-{alvo}` (ex: `button-submit`, `input-email`, `link-dashboard`).

---

## 7. CHECKLIST DE INÍCIO

- [ ] Li todo o PROMPT_TECNICO.md
- [ ] Li todos os documentos em /docs
- [ ] Revisei os estilos em docs/guia-de-estilos.md
- [ ] Criei plano de execução
- [ ] Apresentei plano ao usuário
- [ ] Recebi aprovação do usuário
- [ ] Configurei banco de dados
- [ ] Configurei variáveis de ambiente
- [ ] Iniciei desenvolvimento da Fase 1
- [ ] Instalei Playwright para QA E2E
- [ ] Criei testes E2E para todas as funcionalidades
- [ ] Configurei scripts de execução de testes

---

*Gerado pelo ForgeAI - Plataforma de Gestão de Projetos com IA*
*Data de geração: 13/02/2026 às 17:00:33*
