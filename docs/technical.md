# Documentação Técnica

# Documentação Técnica da AUREA

## Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Stack Tecnológica](#stack-tecnológica)
4. [Requisitos](#requisitos)
   - [Requisitos Funcionais](#requisitos-funcionais)
   - [Requisitos Não Funcionais](#requisitos-não-funcionais)
5. [Processo de Setup](#processo-de-setup)
6. [Considerações de Segurança](#considerações-de-segurança)

---

## Visão Geral

A **AUREA** é uma plataforma SaaS brasileira de assistente financeiro inteligente voltada para investidores intermediários. Seu objetivo é combinar análise macroeconômica em tempo real com o monitoramento personalizado de carteiras, além de oferecer consultoria acionável através de IA conversacional via WhatsApp. A plataforma busca integrar insights de mercado diretamente no dia a dia de seus usuários, com base em compliance regulatório da CVM.

Principais funcionalidades:
- Análise contínua de indicadores macroeconômicos e financeiros.
- Monitoramento automatizado da carteira de investimentos.
- Consultoria acionável entregue por um bot avançado no WhatsApp.
- Dashboard web responsivo para controle avançado.

Diferenciais competitivos:
- Cruzamento de dados macroeconômicos com carteiras individuais.
- Foco em proximidade humana (via WhatsApp) e sofisticação técnica.
- Planos de assinaturas escalonados para diferentes perfis de investidores.

Prazo de desenvolvimento: **2 meses** com foco inicial na Fase 1 (funções educacionais e informativas, sem recomendações personalizadas).

---

## Arquitetura

### Visão Geral da Arquitetura

A arquitetura da AUREA é baseada em uma abordagem moderna de **SaaS**, utilizando ferramentas escaláveis e de baixo custo para suportar um desenvolvimento ágil e solo. A estrutura é organizada nas seguintes camadas:

1. **Frontend (Dashboard):** Desenvolvido em React utilizando a biblioteca **shadcn/ui** para maximizar customização e aderir à identidade visual premium.
2. **Backend:** Construído sobre o **Supabase** para autenticação, banco de dados e APIs.
3. **Automação:** Gerenciada pelo **n8n** para criação de workflows dinâmicos (webscraping, processamento de dados, notificações).
4. **IA Conversacional:** Integração com a **Claude API** para processamento natural de linguagem e geração de análises.
5. **Gateways de Mensagens e Dados:**
   - WhatsApp usando a **Evolution API**.
   - Dados financeiros via **Yahoo Finance**, **Alpha Vantage**, **B3** e APIs complementares.
6. **Pagamentos:** Processamento de assinaturas por **Stripe/Asaas**.

### Fluxo de Interação

O fluxo principal de operação segue a jornada do usuário:
1. **Onboarding guiado:** Coleta o perfil de investidor e conecta a carteira.
2. **Monitoramento contínuo:** Atualizações de carteira sincronizadas via inputs manuais, CSV ou APIs.
3. **Consultoria:** Insights diários enviados por WhatsApp e acessíveis no dashboard.
4. **Painel Macro:** Apresenta indicadores-chave com variações e impacto na carteira do usuário.
5. **Gestão de dados e inteligência:** Webscraping e APIs fornecem dados atualizados constantemente.

---

## Stack Tecnológica

| **Camada**        | **Tecnologia**          | **Descrição**                             |
|--------------------|-------------------------|-------------------------------------------|
| **Frontend**       | React (Lovable)        | Desenvolvimento do dashboard web.         |
| **UI Library**     | shadcn/ui              | Componentes customizáveis para design premium. |
| **Backend/DB**     | Supabase               | PostgreSQL gerenciado, Auth e APIs.       |
| **Automação**      | n8n                    | Workflows e rotinas de backend.           |
| **IA Principal**   | Claude API             | Geração de insights via NLP.              |
| **Pesquisa/IA**    | Perplexity API         | Busca e análise de dados econômicos.      |
| **Mensageria**     | Evolution API          | Envio de mensagens via WhatsApp.          |
| **Dados Financeiros** | Yahoo Finance / B3 | Cotações e fundamentos de ativos.         |
| **Pagamentos**     | Stripe / Asaas         | Gestão de assinaturas e transações.       |
| **Estilo**         | Tailwind CSS           | Estilização do frontend.                  |

---

## Requisitos

### Requisitos Funcionais

- Dashboard web responsivo que exiba indicadores macroeconômicos e análise de carteira.
- Integração com WhatsApp para envio de insights e alertas.
- Painel administrativo com métricas de usuário, saúde do sistema e administração.
- Sistema de planos de assinatura escalonados com regras dinâmicas.
- Sincronização de carteiras via input manual, upload de documentos e APIs.
- Suporte para coleta contínua de dados financeiros (via webscraping e APIs externas).
- Implementação de disclaimers e conformidade regulatória (CVM).

### Requisitos Não Funcionais

- **Performance:** Métodos de scraping e APIs devem atender requisitos de baixa latência (<500ms para requisições críticas).
- **Segurança:** Dados do cliente encriptados em trânsito e em repouso.
- **Confiabilidade:** Backups automáticos diários com retenção de longo prazo.
- **Escalabilidade:** Suportar crescimento de usuários até o lançamento da Fase 2.
- **Cross-browser**: Compatível com navegadores modernos.

---

## Processo de Setup

1. **Pré-requisitos técnicos:**
   - Acesso à **Windsurf**, **Supabase**, **n8n**, **Claude API**, **Perplexity API**, **Evolution API**, e gateways de pagamento.
   - Ambiente configurado com Node.js 18+, npm, e PostgreSQL.
   - Acesso ao repositório de código e credenciais de APIs.

2. **Configuração inicial do projeto:**
   - Clone o repositório existente e instale as dependências:
     ```bash
     git clone <URL_DO_REPOSITÓRIO>
     cd aurea-project
     npm install
     ```
   - Crie um arquivo **.env.local** e configure as variáveis de ambiente (API keys, credenciais Supabase, Evolution, etc.).

3. **Supabase:**
   - Configure o banco de dados inicial com as tabelas descritas no PRD.
   - Configure políticas de segurança (RLS) e inicialize as Edge Functions (check-plan-limit, calculate-avg-price).

4. **Manutenção dos workflows do n8n:**
   - Instale o n8n localmente ou em um servidor de produção.
   - Importe os workflows fornecidos no repositório.
   - Configure as rotinas no painel do n8n (scraping, análises, notificações).

5. **Iniciar o ambiente local:**
   - Execute o servidor para desenvolvimento local:
     ```bash
     npm run dev
     ```

6. **Teste do ambiente:**
   - Execute os testes unitários e de integração por meio de Vitest e o runner de Edge Functions para Supabase:
     ```bash
     npm run test
     ```

7. **Distribuição:**
   - Configure um pipeline CI/CD para deploys automáticos.
   - Faça deploy do frontend e backend em um provedor cloud (e.g., Vercel para frontend, Supabase para backend).

---

## Considerações de Segurança

1. **Encriptação de dados:**
   - Use TLS para todas as comunicações de rede.
   - Dados sensíveis (credenciais, documentos) devem ser armazenados encriptados com **AES-256**.

2. **Controles de acesso:**
   - Use RLS (Row Level Security) do Supabase para restringir acesso a dados por usuário.
   - Roles diferenciadas: admin (acesso completo), user (acesso limitado à conta própria).

3. **Compliance regulatório:**
   - Disclaimers obrigatórios em insights, dashboard e WhatsApp.
   - Termos de uso devem ser aceitos explicitamente no onboarding.

4. **Auditoria e logs:**
   - Registre todas as atividades sensíveis na tabela `system_logs`.
   - Garanta retenção dos logs por pelo menos 5 anos para fins regulatórios.

5. **Prevenção de abusos e Rate Limiting:**
   - Implemente limites automáticos para consumo de chat queries, acessos à API e sincronização de carteiras.
   - Use circuit breakers no n8n para evitar falhas em cadeia por APIs instáveis.

6. **Recuperação de Desastres:**
   - Backup diário automatizado de banco de dados e configurações.
   - Teste de restauração trimestral para validar integridade dos dados.

Com estas diretrizes, a AUREA está preparada para ser desenvolvida de forma escalável, segura e em conformidade com os requisitos específicos do mercado financeiro.

---
*Tipo: technical*
*Gerado pelo ForgeAI em 13/02/2026*
