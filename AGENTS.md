# AGENTS.md — Authentication-Form

Este documento define o contexto, as decisões de arquitetura, a stack, os padrões visuais e as regras de implementação do projeto **Authentication-Form**. Siga estas orientações ao criar, modificar ou revisar o código.

## 1. Informações gerais

- **Nome:** Authentication-Form
- **Objetivo:** criar uma interface de autenticação responsiva com as telas **Sign In** e **Sign Up**.
- **Tipo de aplicação:** front-end de autenticação demonstrativo.
- **Build/dev server:** Vite.
- **Idioma da interface:** inglês, conforme as referências visuais.
- **Backend:** não faz parte desta atividade. O envio dos formulários deve ser validado no front-end e inspecionado pelo console.
- **Referências:** as imagens fornecidas pelo usuário e as especificações visuais deste documento são a fonte de verdade para o layout.

Não invente novas direções visuais nem substitua a composição de fundo por um gradiente genérico. Quando houver divergência, priorize as dimensões e valores explícitos deste documento e, em seguida, as imagens de referência.

## 2. Stack tecnológica

- **React** — interface baseada em componentes.
- **JavaScript** — linguagem principal; não introduzir TypeScript sem solicitação.
- **Vite** — servidor de desenvolvimento e ferramenta de build.
- **Tailwind CSS** — estilos utilitários e implementação dos tokens visuais.
- **`@tailwindcss/vite`** — integração do Tailwind CSS com Vite; utilizar a integração atual, evitando configuração legada sem necessidade.
- **React Material UI (MUI)** — biblioteca de componentes React, quando apropriada. Não permitir que o tema ou os estilos padrão do MUI descaracterizem a referência.
- **React i18n** — internacionalização. Manter os textos da interface preparados para tradução, sem espalhar strings de conteúdo por lógica desnecessária.
- **Zod** — definição e validação de schemas dos formulários.

Antes de adicionar dependências, confira se a funcionalidade já pode ser atendida pela stack instalada. Não introduza bibliotecas extras sem necessidade.

## 3. Arquitetura e composição

A interface deve ser construída por composição. Componentes básicos reutilizáveis devem existir antes da implementação dos formulários completos.

```text
App
└── AuthPage
    ├── BackgroundEffects
    ├── AuthBadge
    ├── SignInForm
    │   ├── Input
    │   ├── Button
    │   ├── AuthDivider
    │   └── SocialLogin
    │       └── SocialButton
    └── SignUpForm
        ├── Input
        ├── Button
        ├── AuthDivider
        └── SocialLogin
            └── SocialButton
```

### Responsabilidades

- **`App`**: ponto de entrada da aplicação; renderiza `AuthPage`.
- **`AuthPage`**: mantém o estado que determina qual formulário está visível (`Sign In` ou `Sign Up`), organiza a página e os elementos de layout.
- **`BackgroundEffects`**: renderiza somente os glows decorativos de fundo; não deve substituir o fundo principal.
- **`AuthBadge`**: exibe a etiqueta fixa `AUTHENTICATION UI`.
- **`Input`**: componente de campo reutilizável com label, controle de valor, tipo, placeholder, estado de erro e mensagem de validação acessível.
- **`Button`**: botão principal reutilizável; recebe texto, tipo, estado de carregamento/desabilitado e callback.
- **`SocialButton`**: botão social quadrado reutilizável, com nome acessível e identificação visual do provedor.
- **`AuthDivider`**: separador com o texto `OR CONTINUE WITH`.
- **`SocialLogin`**: compõe os `SocialButton` necessários, sem duplicar sua estrutura.
- **`SignInForm`**: compõe os componentes básicos para login. Mantém localmente os valores e a validação dos campos do Sign In.
- **`SignUpForm`**: compõe os componentes básicos para cadastro. Mantém localmente os valores e a validação dos campos do Sign Up.

Os formulários devem ser componentes de composição, e não páginas independentes que controlam a navegação global. O estado de alternância entre eles pertence exclusivamente a `AuthPage`. O estado dos campos permanece no formulário correspondente.

## 4. Estrutura de diretórios prevista

Respeite a estrutura abaixo, salvo se uma mudança for necessária e justificada:

```text
auth-forms-app/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── AuthBadge.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   └── SocialButton.jsx
│   │   ├── auth/
│   │   │   ├── AuthDivider.jsx
│   │   │   ├── SignInForm.jsx
│   │   │   ├── SignUpForm.jsx
│   │   │   └── SocialLogin.jsx
│   │   └── layout/
│   │       └── BackgroundEffects.jsx
│   ├── pages/
│   │   └── AuthPage.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

Não crie arquivos ou pastas apenas por antecipação. Se forem necessários arquivos de tradução ou schemas, organize-os de forma clara e consistente, por exemplo em `src/locales/` e `src/schemas/`.

## 5. Design tokens

Os valores abaixo devem ser tratados como tokens centrais. Defina-os em um local compartilhado — preferencialmente variáveis CSS em `src/index.css` e/ou tema do Tailwind — e reutilize-os em vez de repetir valores arbitrários.

### 5.1 Cores

| Token | Valor | Uso |
|---|---|---|
| `--color-background` | `#000814` | Fundo principal da página |
| `--color-surface` | `#00152B` | Superfície do card, aproximada pela referência |
| `--color-surface-input` | `#001B38` | Fundo dos campos e botões sociais |
| `--color-primary` | `#FFD60A` | Botão principal, títulos destacados e links de ação |
| `--color-text-primary` | `#F4F7FC` | Texto principal e labels |
| `--color-text-secondary` | `#A8B8CC` | Subtítulos, placeholders e textos auxiliares |
| `--color-border` | `#0B2B4F` | Bordas dos cards, campos e botões sociais |
| `--color-glow-yellow` | `#B8A900` | Glow decorativo superior esquerdo |
| `--color-glow-blue` | `#006BCB` | Glow decorativo inferior direito |
| `--color-text-on-primary` | `#000814` | Texto sobre o botão amarelo |
| `--color-error` | Definir com contraste acessível | Mensagens e bordas de validação |

Os tons de superfície e borda são aproximações de implementação. Ajuste-os para corresponder às imagens de referência sem alterar o background principal `#000814` nem a cor primária `#FFD60A`.

### 5.2 Tipografia

- **Família:** Inter.
- Carregar Inter de forma consistente (por exemplo, por fonte local ou importação apropriada).
- **Labels dos inputs:** `13px`.
- **Texto de input:** aproximadamente `14px`.
- **Títulos dos formulários:** aproximadamente `30px`, peso forte, cor primária.
- **Texto auxiliar:** aproximadamente `14px`.
- **Texto dos botões:** aproximadamente `14px`, peso semibold/bold.
- Manter hierarquia, legibilidade e contraste conforme as referências.

### 5.3 Layout e dimensões

Artboard de referência: **1440 × 1024 px**.

| Elemento | Especificação |
|---|---|
| Fundo | `#000814`, ocupando toda a viewport |
| Glow amarelo | `520 × 520px`; posição aproximada `left: -120px; top: -130px`; blur `100px` |
| Glow azul | `600 × 600px`; parcialmente fora do canto inferior direito; blur `120px` |
| Badge | `left: 56px; top: 48px` na referência de desktop |
| Card | largura `480px`; radius `24px` |
| Padding horizontal do card | `30px` |
| Padding superior do card | `34px` |
| Padding inferior do card | `30px` |
| Espaço entre blocos do card | `18px` |
| Sign In | altura aproximada `594px`, sem erros |
| Sign Up | altura aproximada `652px`, sem erros |
| Input | altura `56px`; radius `12px` |
| Label → campo | gap `8px` |
| Botão principal | altura `56px`; radius `12px` |
| Botão social | `56 × 56px`; radius `14px` |
| Espaço entre botões sociais | `14px` |

As alturas totais dos formulários são referências visuais, não valores que devam ser forçados com conteúdo sobreposto. Preserve os espaçamentos e o fluxo natural do layout.

### 5.4 Badge e navegação superior

- O texto **`AUTHENTICATION UI`** faz parte da interface e deve aparecer desde a versão estática inicial.
- Posicionar no canto superior esquerdo conforme a referência.
- Estilo pill, `border-radius: 999px`, fundo amarelo translúcido, borda amarela sutil e texto amarelo.
- No canto superior direito, exibir **`SIGN IN`** ou **`SIGN UP`**, conforme o formulário ativo.
- A ação de alternância deve ser clara e acessível.

### 5.5 Card e campos

- Card centralizado na viewport em desktop, com fundo azul-marinho escuro, borda azul sutil e radius de `24px`.
- Inputs devem ter fundo azul escuro, borda discreta e radius de `12px`.
- Em foco, usar um indicador visível e consistente com a cor primária.
- Labels devem estar acima dos campos; não depender exclusivamente de placeholders para identificar campos.
- Erros de validação devem ocupar espaço no fluxo normal e não sobrepor elementos.

### 5.6 Botões

- Botão principal: fundo `#FFD60A`, texto `#000814`, altura `56px`, radius `12px`.
- Estados hover, focus-visible, active e disabled devem ser definidos e manter contraste.
- Social buttons: `56 × 56px`, radius `14px`, fundo e borda azul escuros.
- Os botões sociais são elementos de interface demonstrativos nesta atividade; não implementar autenticação real com provedores externos.

## 6. Regras obrigatórias de implementação

1. Criar os componentes básicos `Input`, `Button` e `SocialButton` antes de compor os formulários.
2. Incluir `AUTHENTICATION UI` desde a versão visual estática.
3. Manter o background `#000814` com dois glows decorativos; não substituir por outro gradiente.
4. Não repetir marcação de `<input>`, estilos de botão ou estruturas de botão social diretamente em `SignInForm` e `SignUpForm`. Reutilizar os componentes.
5. `SignInForm` e `SignUpForm` devem funcionar como componentes de composição.
6. O estado de alternância entre Sign In e Sign Up pertence a `AuthPage`.
7. O estado dos campos pertence ao formulário correspondente.
8. Não implementar backend nesta atividade. Validar os dados no front-end e inspecionar o submit pelo console.
9. Nunca armazenar senhas em `localStorage`, `sessionStorage`, cookies ou qualquer persistência local.
10. Não imprimir senhas no console. Se for necessário inspecionar o submit, registrar apenas dados não sensíveis ou uma indicação de que a validação foi concluída.
11. Usar Zod para schemas e mensagens de validação coerentes.
12. Manter a interface responsiva sem distorcer o layout desktop de referência.
13. Usar elementos HTML semânticos, labels associadas aos campos e estados acessíveis.
14. Não adicionar dependências ou abstrações sem necessidade.

## 7. Formulários, validação e i18n

- Use schemas Zod para validar os campos de cada formulário.
- Apresente erros próximos ao campo correspondente e associe-os com `aria-describedby` quando aplicável.
- Marque campos inválidos com `aria-invalid`.
- Não apresente erro antes de uma interação apropriada, salvo quando o comportamento for explicitamente solicitado.
- O submit deve impedir o envio padrão, validar os dados e exibir no console apenas informações não sensíveis.
- Nunca registrar a senha em logs.
- Centralize textos da interface de forma compatível com React i18n. O idioma inicial da interface é inglês, conforme as referências.
- Textos de erro também devem ser traduzíveis.

## 8. Responsividade

A referência principal é o artboard desktop de `1440 × 1024px`, mas a aplicação deve funcionar em telas menores.

- Em desktop, manter o card com largura de `480px` e centralização visual.
- Em telas estreitas, limitar a largura do card a `calc(100% - 32px)` ou equivalente, sem overflow horizontal.
- Reduzir os recuos laterais do badge e do indicador superior em dispositivos móveis.
- Permitir rolagem vertical quando a altura da tela não comportar o formulário.
- Manter os glows decorativos sutis e evitar que prejudiquem o contraste ou a legibilidade.
- Não fixar a altura do card de modo que campos ou mensagens sejam cortados.

## 9. Acessibilidade e qualidade

- Usar `label` associada ao `input` por `htmlFor`/`id`.
- Usar `type="email"` para e-mail e `type="password"` para senha.
- Botões de submit devem usar `type="submit"`; ações de alternância devem usar `type="button"`.
- Garantir navegação por teclado e foco visível.
- Fornecer nome acessível para cada botão social, mesmo quando o ícone for visualmente suficiente.
- Não usar cor como único indicador de erro.
- Evitar elementos interativos aninhados e HTML inválido.
- Manter componentes pequenos, com responsabilidades claras.

## 10. Ordem recomendada de desenvolvimento

1. Configurar Vite, React e Tailwind CSS usando `@tailwindcss/vite`.
2. Definir fonte, tokens e estilos globais em `index.css`.
3. Implementar `BackgroundEffects` e `AuthBadge`.
4. Implementar e revisar os componentes básicos `Input`, `Button` e `SocialButton`.
5. Criar `AuthDivider` e `SocialLogin`.
6. Compor `SignInForm` e validar seu layout.
7. Compor `SignUpForm` e validar seu layout.
8. Implementar alternância de formulários em `AuthPage`.
9. Adicionar validação Zod e textos preparados para i18n.
10. Conferir fidelidade visual, responsividade, acessibilidade e console.

## 11. Critérios de aceite

- A aplicação inicia com Vite sem erros.
- A interface contém Sign In e Sign Up, com alternância funcional.
- A composição segue a arquitetura definida.
- Os componentes básicos são reutilizados pelos dois formulários.
- A etiqueta `AUTHENTICATION UI` está visível.
- O fundo usa `#000814` e dois glows decorativos, sem gradiente substituto.
- As medidas e cores principais correspondem às especificações e imagens de referência.
- O layout se adapta a telas menores sem overflow ou conteúdo cortado.
- A validação de campos funciona com Zod.
- Nenhuma senha é persistida ou impressa no console.
- Não existe dependência de backend para concluir a atividade.
