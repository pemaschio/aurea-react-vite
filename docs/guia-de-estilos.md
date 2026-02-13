# Guia de Estilos - Design System
> **FONTE ÚNICA DE VERDADE** para todos os estilos visuais do projeto.
> Este arquivo é a referência definitiva. Não consulte outros arquivos de estilos.

*Gerado pelo ForgeAI em 13/02/2026*

---

## 1. Paleta de Cores

### Modo de Cores: Light + Dark

O projeto utiliza **dois temas de cores**. O sistema deve implementar alternância entre Light e Dark.

#### Tema Light (Claro)

| Nome | Código Hex | Uso |
|------|------------|-----|
| **Background** | `#0A1628` | Fundo principal da aplicação |
| **Foreground** | `#0D4F4F` | Texto principal |
| **Primary** | `#de3403` | Botões principais, links, ações primárias |
| **Secondary** | `#D4A843` | Botões secundários, elementos de apoio |
| **Accent** | `#00C896` | Elementos de destaque sutil |
| **Muted** | `#E2E8F0` | Fundos suaves, estados desabilitados |
| **Muted Foreground** | `#64748B` | Texto secundário, placeholders |
| **Card** | `#FFFFFF` | Fundo de cartões e painéis |
| **Card Foreground** | `#0F172A` | Texto dentro de cartões |
| **Border** | `#CBD5E1` | Bordas e divisores |
| **Destructive** | `#ef4444` | Erros e ações destrutivas |
| **Success** | `#22c55e` | Confirmações e sucesso |
| **Warning** | `#f59e0b` | Alertas e avisos |

#### Tema Dark (Escuro)

| Nome | Código Hex | Uso |
|------|------------|-----|
| **Background** | `#0A1628` | Fundo principal da aplicação |
| **Foreground** | `#0D4F4F` | Texto principal |
| **Primary** | `#0A1628` | Botões principais, links, ações primárias |
| **Secondary** | `#D4A843` | Botões secundários, elementos de apoio |
| **Accent** | `#00C896` | Elementos de destaque sutil |
| **Muted** | `#F1F5F9` | Fundos suaves, estados desabilitados |
| **Muted Foreground** | `#a1a1aa` | Texto secundário, placeholders |
| **Card** | `#FFFFFF` | Fundo de cartões e painéis |
| **Card Foreground** | `#fafafa` | Texto dentro de cartões |
| **Border** | `#E2E8F0` | Bordas e divisores |
| **Destructive** | `#dc2626` | Erros e ações destrutivas |
| **Success** | `#16a34a` | Confirmações e sucesso |
| **Warning** | `#d97706` | Alertas e avisos |

---

## 2. Variáveis CSS (Implementação)

Copie e cole estas variáveis CSS no seu projeto. **Use `var(--nome)`** para referenciar as cores.

```css
/* Tema Light (padrão) */
:root {
  --background: #0A1628;
  --foreground: #0D4F4F;
  --primary: #de3403;
  --primary-foreground: #ffffff;
  --secondary: #D4A843;
  --secondary-foreground: #ffffff;
  --accent: #00C896;
  --accent-foreground: #000000;
  --muted: #E2E8F0;
  --muted-foreground: #64748B;
  --card: #FFFFFF;
  --card-foreground: #0F172A;
  --border: #CBD5E1;
  --destructive: #ef4444;
  --success: #22c55e;
  --warning: #f59e0b;
  --font-sans: Inter;
  --font-serif: Georgia;
  --font-heading: Inter;
  --font-mono: JetBrains Mono;
  --radius: 8px;
}

/* Tema Dark */
.dark,
[data-theme="dark"] {
  --background: #0A1628;
  --foreground: #0D4F4F;
  --primary: #0A1628;
  --primary-foreground: #000000;
  --secondary: #D4A843;
  --secondary-foreground: #000000;
  --accent: #00C896;
  --accent-foreground: #ffffff;
  --muted: #F1F5F9;
  --muted-foreground: #a1a1aa;
  --card: #FFFFFF;
  --card-foreground: #fafafa;
  --border: #E2E8F0;
  --destructive: #dc2626;
  --success: #16a34a;
  --warning: #d97706;
}
```

---

## 3. Tipografia

### Famílias de Fontes

| Família | Variável CSS | Uso |
|---------|-------------|-----|
| **Inter** | `--font-sans` | Fonte principal para textos e interface |
| **Georgia** | `--font-serif` | Textos longos, relatórios, destaques |
| **Inter** | `--font-heading` | Títulos e cabeçalhos |
| **JetBrains Mono** | `--font-mono` | Código, dados numéricos |

### Hierarquia de Tamanhos

**Tamanho Base**: `16px`
**Escala de Títulos**: `1.25x`

| Nível | Tamanho | Cálculo |
|-------|---------|---------|
| **H1** | `39px` | base x 1.25⁴ |
| **H2** | `31px` | base x 1.25³ |
| **H3** | `25px` | base x 1.25² |
| **H4** | `20px` | base x 1.25¹ |
| **Body** | `16px` | tamanho base |
| **Small** | `14px` | base x 0.875 |

---

## 4. Espaçamento

| Propriedade | Valor | Uso |
|-------------|-------|-----|
| **Border Radius** | `8px` | Cantos arredondados padrão |
| **Padding de Cards** | `16px` | Espaçamento interno de cartões |
| **Padding de Botões** | `12px` | Espaçamento interno de botões |

### Sistema de Espaçamento (baseado em 4px)

| Nome | Valor | Uso |
|------|-------|-----|
| **xs** | `4px` | Espaçamentos mínimos |
| **sm** | `8px` | Espaçamentos pequenos |
| **md** | `16px` | Espaçamento padrão |
| **lg** | `24px` | Espaçamentos grandes |
| **xl** | `32px` | Espaçamentos extra grandes |

---

## 5. Componentes

### Botão Primário
```css
.btn-primary {
  background-color: var(--primary);
  color: var(--primary-foreground);
  padding: 12px;
  border-radius: var(--radius);
  font-family: var(--font-sans);
}
```

### Botão Secundário
```css
.btn-secondary {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
  padding: 12px;
  border-radius: var(--radius);
}
```

### Botão Outline
```css
.btn-outline {
  background-color: transparent;
  border: 1px solid var(--border);
  color: var(--foreground);
  padding: 12px;
  border-radius: var(--radius);
}
```

### Cartão
```css
.card {
  background-color: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
}
```

### Input
```css
.input {
  background-color: var(--muted);
  color: var(--foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 8px 12px;
}
.input::placeholder {
  color: var(--muted-foreground);
}
.input:focus {
  border-color: var(--primary);
  outline: 2px solid var(--primary);
  outline-offset: -2px;
}
```

### Badge
```css
.badge {
  background-color: var(--muted);
  color: var(--muted-foreground);
  padding: 4px 8px;
  border-radius: calc(var(--radius) / 2);
  font-size: 0.875rem;
}
```

---

## 6. Design Tokens (JSON)

```json
{
  "colorMode": "both",
  "colors": {
    "light": {
      "background": "#0A1628",
      "foreground": "#0D4F4F",
      "primary": "#de3403",
      "secondary": "#D4A843",
      "accent": "#00C896",
      "muted": "#E2E8F0",
      "mutedForeground": "#64748B",
      "card": "#FFFFFF",
      "cardForeground": "#0F172A",
      "border": "#CBD5E1",
      "destructive": "#ef4444",
      "success": "#22c55e",
      "warning": "#f59e0b"
    },
    "dark": {
      "background": "#0A1628",
      "foreground": "#0D4F4F",
      "primary": "#0A1628",
      "secondary": "#D4A843",
      "accent": "#00C896",
      "muted": "#F1F5F9",
      "mutedForeground": "#a1a1aa",
      "card": "#FFFFFF",
      "cardForeground": "#fafafa",
      "border": "#E2E8F0",
      "destructive": "#dc2626",
      "success": "#16a34a",
      "warning": "#d97706"
    }
  },
  "typography": {
    "fontFamily": {
      "sans": "Inter",
      "serif": "Georgia",
      "heading": "Inter",
      "mono": "JetBrains Mono"
    },
    "fontSize": {
      "base": "16px",
      "headingScale": 1.25
    }
  },
  "spacing": {
    "borderRadius": "8px",
    "cardPadding": "16px",
    "buttonPadding": "12px"
  }
}
```

---

## 7. Regras de Uso

1. **SEMPRE** use variáveis CSS (`var(--nome)`) em vez de valores hexadecimais diretos
2. **NUNCA** invente cores fora desta paleta
3. Para texto principal, use `var(--foreground)`
4. Para texto secundário, use `var(--muted-foreground)`
5. Elementos interativos usam `var(--primary)` como cor de destaque
6. Bordas sempre com `var(--border)`
7. Implemente alternância entre temas Light e Dark

---

*Este é o arquivo de referência definitiva de estilos. Gerado pelo ForgeAI.*
