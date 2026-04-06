# 🎬 Guia Visual Rápido - Novas Funcionalidades

## 📄 Visualizador de PDF

### Controles Disponíveis:

```
┌─────────────────────────────────────────────────────────┐
│  [◀] Página 1 [▶]              [🔄] [⛶]                │
└─────────────────────────────────────────────────────────┘
     ↑                              ↑    ↑
  Navegação                      Rotação Fullscreen
```

### Rotação do PDF:
```
Clique 1: 0° → 90°   (Paisagem, rotacionado à direita)
Clique 2: 90° → 180° (De cabeça para baixo)
Clique 3: 180° → 270° (Paisagem, rotacionado à esquerda)
Clique 4: 270° → 0°   (Normal novamente)
```

### Modo Fullscreen:
```
ANTES (Normal):                    DEPOIS (Fullscreen):
┌─────────────────────┐           ┌──────────────────────────┐
│ Sidebar │ Conteúdo  │           │                          │
│         │           │           │                          │
│  Menu   │   PDF     │    →      │         PDF              │
│         │           │           │      (Tela Cheia)        │
│         │           │           │                          │
└─────────────────────┘           └──────────────────────────┘
                                   Pressione ESC para sair
```

---

## 🎥 Player de Vídeo

### Controles:

```
┌─────────────────────────────────────────────────────────┐
│  Nome do Vídeo.mp4                            [⛶]       │
└─────────────────────────────────────────────────────────┘
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │                                                 │    │
│  │              VÍDEO PLAYER                      │    │
│  │         (Controles Nativos)                    │    │
│  │                                                 │    │
│  │  [▶] ━━━━━━━━━━━━━━━━━━━━━━━━━━━ 🔊 [⛶]      │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Fullscreen:
- Clique no botão [⛶] no canto superior direito
- OU clique no botão [⛶] nos controles do vídeo
- Pressione ESC para sair

---

## 📋 Exportar Currículo

### Fluxo:

```
1. Editar Dados          2. Exportar              3. PDF Gerado
┌──────────────┐        ┌──────────────┐         ┌──────────────┐
│ Nome: Milton │        │              │         │ MILTON CARLOS│
│ Idade: 42    │   →    │ [💾] [📥]    │    →    │ RIBEIRO      │
│ Cargo: PM|GD │        │ Salvar Export│         │              │
│ ...          │        │              │         │ Experiências │
└──────────────┘        └──────────────┘         │ Formação     │
                                                  │ ...          │
                                                  └──────────────┘
                                                  Curriculo_Milton_Carlos_Ribeiro.pdf
```

### Estrutura do PDF:

```
┌─────────────────────────────────────────┐
│  MILTON CARLOS RIBEIRO                  │
│  PM | GD | SCRUM | IA | TQM | BIGDATA  │
│  42 anos • Casado                       │
│  Santa Bárbara d'Oeste, SP              │
│  mcr.milton@gmail.com                   │
│  linkedin.com/in/milton-carlosribeiro   │
├─────────────────────────────────────────┤
│  RESUMO PROFISSIONAL                    │
│  [Seu resumo aqui...]                   │
├─────────────────────────────────────────┤
│  IDIOMAS                                │
│  • English - Professional Working       │
│  • Português - Native or Bilingual      │
│  • 日本語 - Full Professional            │
├─────────────────────────────────────────┤
│  HABILIDADES                            │
│  • Estratégias de sustentabilidade      │
│  • Desenvolvedor full                   │
│  • Calibração                           │
├─────────────────────────────────────────┤
│  EXPERIÊNCIA PROFISSIONAL               │
│                                         │
│  Process Analyst | BIGDATA              │
│  Pakmatic do Brasil | maio 2025 – pres. │
│  [Descrição...]                         │
│                                         │
│  [Mais experiências...]                 │
├─────────────────────────────────────────┤
│  FORMAÇÃO ACADÊMICA                     │
│                                         │
│  Análise e Desenvolvimento de Sistemas  │
│  FIAP | fev 2024 – jan 2026            │
│                                         │
│  [Mais formações...]                    │
├─────────────────────────────────────────┤
│  CERTIFICAÇÕES                          │
│  • GitHub versionamento de código       │
│  • Aprenda ERP TOTVS Protheus          │
│  • [Mais certificações...]              │
└─────────────────────────────────────────┘
```

---

## ⌨️ Atalhos de Teclado

### PDF Viewer:
- `ESC` - Sair do fullscreen
- `F11` - Fullscreen do navegador (diferente do botão)

### Video Player:
- `ESC` - Sair do fullscreen
- `Space` - Play/Pause
- `←` `→` - Retroceder/Avançar 5s
- `↑` `↓` - Aumentar/Diminuir volume
- `F` - Fullscreen (quando vídeo está em foco)
- `M` - Mute/Unmute

---

## 🎨 Estados Visuais

### Botão de Rotação:
```
Normal:  [🔄]  (Cinza)
Hover:   [🔄]  (Azul claro)
Tooltip: "Rotação: 90°"
```

### Botão Fullscreen:
```
Normal:     [⛶]  (Maximizar)
Fullscreen: [⊟]  (Minimizar)
Tooltip:    "Tela cheia" / "Sair da tela cheia"
```

### Exportar PDF:
```
Idle:     [📥 Exportar PDF]
Loading:  [⏳ Gerando PDF...]
Success:  [✅ PDF gerado!]
Error:    [❌ Erro ao gerar]
```

---

## 📱 Responsividade

### Desktop (≥1024px):
```
┌────────────────────────────────────────┐
│ Sidebar │      Conteúdo Principal      │
│  Menu   │                              │
│         │  [Controles]                 │
│  PDF    │  ┌────────────────────────┐  │
│  Vídeos │  │                        │  │
│  ...    │  │      Visualizador      │  │
│         │  │                        │  │
│         │  └────────────────────────┘  │
└────────────────────────────────────────┘
```

### Mobile (<1024px):
```
┌──────────────────────┐
│ [☰] EduForge         │
├──────────────────────┤
│                      │
│   [Controles]        │
│   ┌────────────────┐ │
│   │                │ │
│   │  Visualizador  │ │
│   │                │ │
│   └────────────────┘ │
│                      │
└──────────────────────┘
```

---

## 🔍 Troubleshooting Visual

### PDF não aparece:
```
❌ ERRO                          ✅ SOLUÇÃO
┌──────────────────┐            ┌──────────────────┐
│                  │            │ [📄] PDF.pdf     │
│  [Tela vazia]    │     →      │ 1.2 MB           │
│                  │            │ [🗑️] Deletar     │
└──────────────────┘            │ [📥] Reimportar  │
                                └──────────────────┘
```

### Vídeo não carrega:
```
❌ ERRO                          ✅ SOLUÇÃO
┌──────────────────┐            ┌──────────────────┐
│ Carregando...    │            │ 1. Fechar página │
│ [Spinner]        │     →      │ 2. Reabrir       │
│                  │            │ 3. Reimportar    │
└──────────────────┘            └──────────────────┘
```

### Fullscreen não funciona:
```
❌ PROBLEMA                      ✅ SOLUÇÃO
Navegador antigo         →      Atualizar navegador
Permissão negada         →      Permitir fullscreen
Tecla F11 travada        →      Usar botão [⛶]
```

---

## 💡 Dicas Profissionais

### PDF:
1. 📏 **Rotação**: Use para PDFs escaneados incorretamente
2. 🖥️ **Fullscreen**: Ideal para apresentações
3. 📜 **Scroll**: Funciona automaticamente em PDFs longos
4. 🔄 **Reset**: 4 cliques na rotação volta ao normal

### Vídeo:
1. ⚡ **Performance**: Vídeos grandes podem demorar a carregar
2. 💾 **Sessão**: Reimporte vídeos após fechar o navegador
3. 🎬 **Controles**: Use controles nativos para melhor experiência
4. 📱 **Mobile**: Fullscreen funciona melhor em landscape

### Currículo:
1. ✏️ **Edite primeiro**: Preencha todos os dados antes de exportar
2. 💾 **Salve sempre**: Clique em "Salvar" antes de exportar
3. 📄 **Preview**: Revise o PDF após exportar
4. 🔄 **Reexporte**: Pode exportar quantas vezes quiser

---

**Aproveite as novas funcionalidades! 🚀**
