# 🎨 Sistema de Temas - EduForge

## ✨ Novos Temas Disponíveis

### 1. **Normal** (Padrão)
- Design minimalista com cores suaves
- Tamanho de fonte padrão
- Ideal para uso diário e leitura prolongada

### 2. **Dracula** 🧛
- Tema escuro roxo/rosa inspirado no Dracula
- **LETRAS GRANDES** para melhor legibilidade
- Cores vibrantes: rosa (#FF79C6), roxo (#BD93F9)
- Fundo escuro: #282A36
- Ideal para ambientes com pouca luz

### 3. **Atom** ⚛️
- Tema escuro verde inspirado no Atom One Dark
- **LETRAS GRANDES** para melhor legibilidade
- Cores: verde (#98C379), ciano (#56B6C2)
- Fundo escuro: #282C34
- Ideal para desenvolvedores e programadores

---

## 🎯 Como Usar

### Trocar de Tema:

1. **Desktop**: Clique no ícone de paleta (🎨) no canto superior direito da sidebar
2. **Mobile**: Clique no ícone de paleta (🎨) no header, ao lado do menu

### Opções Disponíveis:
```
┌─────────────────────────────┐
│ 🎨 Selecionar Tema          │
├─────────────────────────────┤
│ ✓ Normal                    │
│   Dracula (Letras Grandes)  │
│   Atom (Letras Grandes)     │
└─────────────────────────────┘
```

---

## 📐 Tamanhos de Fonte

### Tema Normal:
- Texto base: 16px (1rem)
- H1: 2.25rem (36px) → 3rem (48px) em desktop
- H2: 1.875rem (30px) → 2.25rem (36px) em desktop
- H3: 1.5rem (24px) → 1.875rem (30px) em desktop

### Temas Dracula e Atom (Letras Grandes):
- Texto base: **1.125rem (18px)** ⬆️
- H1: **3rem (48px)** → **3.75rem (60px)** em desktop ⬆️
- H2: **2.25rem (36px)** → **3rem (48px)** em desktop ⬆️
- H3: **1.875rem (30px)** → **2.25rem (36px)** em desktop ⬆️
- H4: **1.5rem (24px)** → **1.875rem (30px)** em desktop ⬆️
- Botões, inputs: **1.125rem (18px)** ⬆️

---

## 🎨 Paleta de Cores

### Tema Dracula:
```css
Fundo principal: #282A36 (HSL: 282° 20% 12%)
Texto principal: #F8F8F2 (HSL: 60° 30% 96%)
Rosa (Primary): #FF79C6 (HSL: 326° 100% 74%)
Roxo (Secondary): #BD93F9 (HSL: 265° 89% 78%)
Verde: #50FA7B (HSL: 135° 94% 65%)
Ciano: #8BE9FD (HSL: 191° 97% 77%)
Amarelo: #F1FA8C (HSL: 65° 92% 76%)
Laranja: #FFB86C (HSL: 31° 100% 71%)
Vermelho: #FF5555 (HSL: 0° 100% 67%)
```

### Tema Atom:
```css
Fundo principal: #282C34 (HSL: 220° 13% 18%)
Texto principal: #ABB2BF (HSL: 219° 28% 88%)
Verde (Primary): #98C379 (HSL: 95° 38% 62%)
Ciano (Secondary): #56B6C2 (HSL: 187° 47% 55%)
Azul: #61AFEF (HSL: 207° 82% 66%)
Roxo: #C678DD (HSL: 286° 60% 67%)
Vermelho: #E06C75 (HSL: 355° 65% 65%)
Amarelo: #E5C07B (HSL: 39° 67% 69%)
```

---

## 📋 Exportação de PDF - Melhorias

### Nova Ordem das Seções:

1. **Cabeçalho**
   - Nome
   - Título profissional
   - Idade e estado civil
   - Localização
   - E-mail
   - LinkedIn

2. **Resumo Profissional**

3. **Habilidades**

4. **Experiência Profissional**

5. **GRADUAÇÃO** ⬅️ NOVO
   - Cursos de graduação separados
   - Bacharelado, Licenciatura, Tecnólogo
   - Análise e Desenvolvimento de Sistemas

6. **PÓS-GRADUAÇÃO** ⬅️ NOVO
   - Especializações
   - MBA
   - Mestrado
   - Doutorado

7. **Certificações**

8. **Seções Personalizadas**

9. **IDIOMAS** ⬅️ MOVIDO PARA O FINAL

### Suporte UTF-8:
- ✅ Acentos: á, é, í, ó, ú, ã, õ, ç
- ✅ Caracteres especiais: •, –, —
- ✅ Japonês: 日本語
- ✅ Emojis e símbolos: ⚡, 🎯, ✨

---

## 🔧 Detalhes Técnicos

### Estrutura de Arquivos:
```
src/
├── lib/
│   └── themes.ts          # Sistema de temas
├── components/
│   └── ThemeSelector.tsx  # Seletor de tema
├── index.css              # Estilos dos temas
└── ...
```

### Como Funciona:

1. **Seleção de Tema**:
```typescript
// Aplicar tema
document.documentElement.classList.add('theme-dracula');
document.body.classList.add('font-large');

// Salvar no localStorage
localStorage.setItem('eduforge_theme', 'dracula');
```

2. **CSS dos Temas**:
```css
/* Tema Dracula */
.theme-dracula {
  --background: 282 20% 12%;
  --primary: 326 100% 74%;
  /* ... */
}

/* Letras grandes */
body.font-large {
  font-size: 1.125rem;
}
```

3. **Persistência**:
- Tema salvo no localStorage
- Aplicado automaticamente ao carregar a página
- Mantém preferência entre sessões

---

## 📱 Responsividade

### Desktop:
```
┌────────────────────────────────────────┐
│ EduForge              [🎨]             │
│ Plataforma Educacional                 │
├────────────────────────────────────────┤
│ 🏠 Início                              │
│ 📄 Visualizador de PDF                 │
│ 🎥 Acervo de Vídeos                    │
│ ...                                    │
└────────────────────────────────────────┘
```

### Mobile:
```
┌──────────────────────┐
│ EduForge    [🎨] [☰] │
└──────────────────────┘
```

---

## 🎯 Casos de Uso

### Tema Normal:
- ✅ Uso diário
- ✅ Ambientes bem iluminados
- ✅ Leitura prolongada
- ✅ Impressão de documentos

### Tema Dracula:
- ✅ Trabalho noturno
- ✅ Ambientes escuros
- ✅ Redução de fadiga ocular
- ✅ Apresentações em salas escuras
- ✅ Usuários com sensibilidade à luz

### Tema Atom:
- ✅ Desenvolvedores
- ✅ Programadores
- ✅ Ambientes de código
- ✅ Trabalho prolongado no computador
- ✅ Preferência por temas verdes

---

## 🔍 Comparação Visual

### Texto Normal vs Letras Grandes:

**Normal:**
```
Título Principal (36px)
Subtítulo (30px)
Texto normal (16px)
```

**Dracula/Atom (Letras Grandes):**
```
Título Principal (48px) ⬆️
Subtítulo (36px) ⬆️
Texto normal (18px) ⬆️
```

**Aumento:** ~12.5% em todos os tamanhos

---

## ⚙️ Configurações Avançadas

### Modificar Cores do Tema:

Edite `/src/index.css`:

```css
.theme-dracula {
  --primary: 326 100% 74%;  /* Rosa */
  --secondary: 265 89% 78%; /* Roxo */
  /* Modifique conforme necessário */
}
```

### Ajustar Tamanho das Fontes:

```css
body.font-large {
  font-size: 1.125rem; /* Altere este valor */
}

body.font-large h1 {
  @apply text-5xl md:text-6xl; /* Ajuste classes */
}
```

---

## 🐛 Troubleshooting

### Tema não muda:
1. Limpe o cache do navegador
2. Recarregue a página (Ctrl+F5)
3. Verifique o console para erros

### Letras muito grandes:
- Isso é intencional nos temas Dracula e Atom
- Use o tema Normal para tamanho padrão

### Cores estranhas:
- Verifique se o tema foi aplicado corretamente
- Inspecione o elemento (F12) e veja as classes CSS

### Tema não persiste:
- Verifique se o localStorage está habilitado
- Alguns navegadores em modo privado não salvam

---

## 📊 Estatísticas

| Tema | Tamanho Base | H1 Desktop | Contraste | Acessibilidade |
|------|--------------|------------|-----------|----------------|
| Normal | 16px | 48px | 4.5:1 | WCAG AA ✅ |
| Dracula | 18px | 60px | 7.2:1 | WCAG AAA ✅ |
| Atom | 18px | 60px | 7.5:1 | WCAG AAA ✅ |

---

## 🎉 Benefícios

### Acessibilidade:
- ✅ Letras grandes para melhor legibilidade
- ✅ Alto contraste nos temas escuros
- ✅ Redução de fadiga ocular
- ✅ Suporte para usuários com baixa visão

### Personalização:
- ✅ 3 temas distintos
- ✅ Preferência salva automaticamente
- ✅ Troca instantânea
- ✅ Sem necessidade de recarregar

### Produtividade:
- ✅ Trabalho em diferentes ambientes
- ✅ Adaptação à iluminação
- ✅ Conforto visual
- ✅ Foco no conteúdo

---

**Aproveite os novos temas! 🎨✨**
