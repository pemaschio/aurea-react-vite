# Escopo do Projeto

## Objetivo
Desenvolver uma plataforma SaaS de assistente financeiro inteligente que combine análise macroeconômica com monitoramento de carteiras pessoais, oferecendo consultoria de investimentos através de IA conversacional via WhatsApp. A solução deve atender investidores ativos autodidatas com patrimônio entre R$ 30-500 mil, posicionando-se entre robo-advisors básicos e assessorias tradicionais caras. O projeto será executado em duas fases distintas: Fase 1 focada em conteúdo educacional/informativo sem recomendações personalizadas para compliance com CVM, e Fase 2 com parceria para consultoria registrada oferecendo recomendações personalizadas no plano Advisory.

## Entregáveis
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

## Fora do Escopo
- Recomendações personalizadas de investimentos na Fase 1 (compliance CVM)
- Integração direta com corretoras para execução de ordens
- Aplicativo mobile nativo (iOS/Android)
- Sistema de CRM completo para gestão de clientes
- Análises fundamentalistas detalhadas de empresas
- Sistema de backtesting de estratégias
- Integração com bancos para sincronização automática de contas
- Sistema de alertas via SMS
- Funcionalidades de social trading ou copy trading
- Sistema de educação financeira com cursos estruturados

## Premissas
- Desenvolvedor terá acesso e conhecimento das ferramentas especificadas (Windsurf, Lovable, Supabase)
- APIs externas (Claude, Perplexity, Evolution, B3, Yahoo, Alpha Vantage) estarão disponíveis e estáveis
- Orçamento permitirá custos mensais das APIs e serviços de terceiros
- Público-alvo possui conhecimento básico de investimentos e uso de WhatsApp
- Dados financeiros das APIs serão suficientes para análises propostas
- Fase 1 será suficiente para validação de mercado antes da Fase 2
- Parceria para consultoria CVM será estabelecida antes da Fase 2
- Usuários aceitarão receber consultoria via WhatsApp como canal principal

## Dependências
- Disponibilidade e estabilidade da Evolution API para WhatsApp
- Acesso às APIs de dados financeiros (B3, Yahoo Finance, Alpha Vantage)
- Funcionamento adequado da Claude API para processamento de IA
- Disponibilidade da Perplexity API para pesquisas financeiras
- Configuração adequada do Supabase para backend e banco de dados
- Integração funcional com gateways de pagamento (Stripe/Asaas)
- Estabelecimento de parceria com consultoria registrada na CVM para Fase 2
- Validação jurídica do conteúdo educacional para compliance
- Aprovação de contas nos serviços de pagamento para operação no Brasil

## Riscos Identificados
- Limitações de orçamento baixo podem impactar qualidade e funcionalidades
- Desenvolvimento solo pode gerar atrasos e pontos únicos de falha
- Mudanças nas regulamentações CVM podem afetar escopo e cronograma
- Instabilidade ou descontinuação de APIs essenciais (WhatsApp, dados financeiros)
- Limitações técnicas das ferramentas escolhidas podem exigir retrabalho
- Prazo de 2 meses pode ser insuficiente para desenvolvimento completo
- Concorrência com players estabelecidos no mercado fintech
- Dificuldades na obtenção de parceria CVM qualificada para Fase 2
- Custos operacionais mensais das APIs podem exceder projeções de receita
- Baixa adoção do WhatsApp como canal de consultoria financeira pelo público-alvo

---
*Gerado pelo ForgeAI em 13/02/2026*
