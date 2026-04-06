# 🎓 Guia Visual - Exportação de Provas

## 📝 Fluxo Completo

```
1. CRIAR QUESTÕES          2. EXPORTAR PDF           3. PDF GERADO
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│ Questão 1:       │      │ Instituição: ✓   │      │ ╔═══════════════╗│
│ O que é React?   │      │ Curso: ✓         │      │ ║ UNIVERSIDADE  ║│
│                  │  →   │ Docente: ✓       │  →   │ ║   FEDERAL     ║│
│ a) Biblioteca    │      │                  │      │ ╚═══════════════╝│
│ b) Linguagem     │      │ [Gerar PDF]      │      │                  │
│ c) Banco         │      │                  │      │ 1. O que é...    │
│ d) SO            │      │                  │      │ ○ a) ...         │
└──────────────────┘      └──────────────────┘      │ ○ b) ...         │
                                                     │                  │
                                                     │ NOTA: _______    │
                                                     │ ╔═══════════╗    │
                                                     │ ║ MILTON    ║    │
                                                     │ ║ CARLOS    ║    │
                                                     │ ║PROFESSOR(A)║   │
                                                     │ ╚═══════════╝    │
                                                     └──────────────────┘
```

---

## 🖼️ Layout do PDF

### Cabeçalho (Retângulo com Bordas):
```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│           UNIVERSIDADE FEDERAL DE SÃO PAULO                  │
│                                                              │
│  Curso: Análise e Desenvolvimento de Sistemas               │
│  Turma: D                         Sala: 101                 │
│  Local: São Paulo, SP             Data: 15/01/2025          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Título:
```
─────────────────────────────────────────────────────────────

                         AVALIAÇÃO

Instruções: Leia atentamente cada questão e marque a 
alternativa correta.

─────────────────────────────────────────────────────────────
```

### Questões:
```
1. Qual é a principal característica do React?

   ○ a) É uma linguagem de programação completa
   ○ b) É uma biblioteca JavaScript para interfaces
   ○ c) É um banco de dados NoSQL
   ○ d) É um sistema operacional


2. O que significa JSX?

   ○ a) JavaScript XML
   ○ b) Java Syntax Extension
   ○ c) JSON XML
   ○ d) JavaScript Express


3. Qual hook é usado para gerenciar estado?

   ○ a) useEffect
   ○ b) useState
   ○ c) useContext
   ○ d) useCallback
```

### Rodapé:
```
┌──────────────────┐                    ╔═══════════════════════╗
│                  │                    ║                       ║
│  NOTA:           │                    ║  MILTON CARLOS        ║
│                  │                    ║  RIBEIRO              ║
│  _____________   │                    ║                       ║
│                  │                    ║    PROFESSOR(A)       ║
│                  │                    ║                       ║
└──────────────────┘                    ╚═══════════════════════╝
```

---

## 🎨 Carimbo Digital - Detalhes

### Estrutura:
```
╔═══════════════════════════════════╗  ← Borda externa (azul, 0.8mm)
║ ┌───────────────────────────────┐ ║  ← Borda interna (azul, 0.3mm)
║ │                               │ ║
║ │     MILTON CARLOS RIBEIRO     │ ║  ← Nome (8pt, negrito, azul)
║ │                               │ ║
║ │        PROFESSOR(A)           │ ║  ← Cargo (6pt, normal, azul)
║ │                               │ ║
║ └───────────────────────────────┘ ║
╚═══════════════════════════════════╝
```

### Dimensões:
- Largura: 65mm
- Altura: 20mm
- Posição: Canto inferior direito
- Cor: Azul (#0000FF / RGB: 0, 0, 255)

### Variações de Nome:

**Nome Curto:**
```
╔═══════════════════╗
║                   ║
║   JOÃO SILVA      ║
║                   ║
║   PROFESSOR(A)    ║
║                   ║
╚═══════════════════╝
```

**Nome Médio:**
```
╔═══════════════════════╗
║                       ║
║  MARIA SANTOS LIMA    ║
║                       ║
║    PROFESSOR(A)       ║
║                       ║
╚═══════════════════════╝
```

**Nome Longo (Quebra Automática):**
```
╔═══════════════════════════╗
║                           ║
║  JOSÉ EDUARDO FERREIRA    ║
║  SANTOS OLIVEIRA          ║
║                           ║
║      PROFESSOR(A)         ║
║                           ║
╚═══════════════════════════╝
```

---

## 📋 Formulário de Exportação

### Desktop (2 Colunas):
```
┌─────────────────────────────────────────────────────┐
│  Exportar Prova em PDF                              │
│  Preencha as informações da prova para gerar o PDF  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Instituição *              Local                   │
│  [________________]         [________________]      │
│                                                     │
│  Nome do Curso *            Data                    │
│  [________________]         [________________]      │
│                                                     │
│  Turma                      Número da Sala          │
│  [________________]         [________________]      │
│                                                     │
│  Nome do Docente (Nome e Sobrenome) *               │
│  [_____________________________________________]    │
│  Este nome aparecerá no carimbo digital azul       │
│                                                     │
│  ℹ️ O PDF incluirá: cabeçalho com informações da   │
│     prova, 3 questão(ões) com alternativas, campo  │
│     para nota e carimbo digital do professor.      │
│                                                     │
│                          [Cancelar]  [Gerar PDF]   │
└─────────────────────────────────────────────────────┘
```

### Mobile (1 Coluna):
```
┌──────────────────────┐
│ Exportar Prova       │
├──────────────────────┤
│                      │
│ Instituição *        │
│ [______________]     │
│                      │
│ Local                │
│ [______________]     │
│                      │
│ Nome do Curso *      │
│ [______________]     │
│                      │
│ Data                 │
│ [______________]     │
│                      │
│ Turma                │
│ [______________]     │
│                      │
│ Número da Sala       │
│ [______________]     │
│                      │
│ Nome do Docente *    │
│ [______________]     │
│                      │
│ [Cancelar]           │
│ [Gerar PDF]          │
└──────────────────────┘
```

---

## 🎯 Exemplo Real

### Dados Preenchidos:
```
Instituição: FIAP - Faculdade de Informática e Administração Paulista
Local: Aclimação, São Paulo - SP
Data: 15/01/2025
Curso: Análise e Desenvolvimento de Sistemas
Turma: 2ADS-D
Sala: Lab 305
Docente: Milton Carlos Ribeiro
```

### PDF Resultante (Página 1):
```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  FIAP - Faculdade de Informática e Administração Paulista   │
│                                                              │
│  Curso: Análise e Desenvolvimento de Sistemas               │
│  Turma: 2ADS-D                    Sala: Lab 305             │
│  Local: Aclimação, São Paulo - SP Data: 15/01/2025          │
│                                                              │
└─────────────────────────────────────────────────────────────┘

─────────────────────────────────────────────────────────────

                         AVALIAÇÃO

Instruções: Leia atentamente cada questão e marque a 
alternativa correta.

─────────────────────────────────────────────────────────────


1. O que é React?

   ○ a) Uma biblioteca JavaScript para construir interfaces
   ○ b) Uma linguagem de programação
   ○ c) Um banco de dados
   ○ d) Um sistema operacional


2. Qual é o hook para gerenciar estado no React?

   ○ a) useEffect
   ○ b) useState
   ○ c) useContext
   ○ d) useRef


3. O que significa JSX?

   ○ a) JavaScript XML
   ○ b) Java Syntax Extension
   ○ c) JSON XML
   ○ d) JavaScript Express


┌──────────────────┐                    ╔═══════════════════════╗
│                  │                    ║                       ║
│  NOTA:           │                    ║  MILTON CARLOS        ║
│                  │                    ║  RIBEIRO              ║
│  _____________   │                    ║                       ║
│                  │                    ║    PROFESSOR(A)       ║
│                  │                    ║                       ║
└──────────────────┘                    ╚═══════════════════════╝
```

---

## 🔄 Fluxo de Uso

### 1. Preparação:
```
Professor cria questões
    ↓
Adiciona alternativas
    ↓
Marca resposta correta
    ↓
Salva questão
```

### 2. Exportação:
```
Clica "Exportar Prova em PDF"
    ↓
Preenche dados da prova
    ↓
Clica "Gerar PDF"
    ↓
PDF é gerado e baixado
```

### 3. Aplicação:
```
Abre PDF
    ↓
Revisa conteúdo
    ↓
Imprime cópias
    ↓
Distribui para alunos
```

### 4. Correção:
```
Alunos respondem
    ↓
Professor corrige
    ↓
Preenche campo NOTA
    ↓
Devolve aos alunos
```

---

## 📊 Comparação: Antes vs Depois

### Antes (Sem Exportação):
```
❌ Criar questões manualmente no Word
❌ Formatar layout da prova
❌ Adicionar cabeçalho
❌ Criar campo de nota
❌ Fazer carimbo (imagem ou físico)
❌ Salvar como PDF
⏱️ Tempo: 30-60 minutos
```

### Depois (Com Exportação):
```
✅ Criar questões na plataforma
✅ Preencher formulário (1 vez)
✅ Clicar "Gerar PDF"
✅ Layout automático
✅ Carimbo digital automático
✅ PDF pronto para impressão
⏱️ Tempo: 2-5 minutos
```

**Economia de tempo: 90%** 🚀

---

## 🎨 Cores e Estilos

### Carimbo:
- **Cor**: Azul (#0000FF)
- **Bordas**: Duplas (0.8mm + 0.3mm)
- **Fonte**: Helvetica Bold (nome) + Normal (cargo)
- **Estilo**: Vintage/Antigo

### Questões:
- **Círculos**: Preto, 2mm de raio
- **Numeração**: Negrito, 11pt
- **Alternativas**: Normal, 10pt
- **Espaçamento**: 7mm entre linhas

### Cabeçalho:
- **Retângulo**: Preto, 0.5mm
- **Instituição**: 16pt, negrito, centralizado
- **Informações**: 9pt, normal

---

## 💡 Dicas Profissionais

### Para Melhor Resultado:

1. **Nome da Instituição**:
   - Use nome completo oficial
   - Evite abreviações não oficiais
   - Exemplo: ✅ "Universidade Federal de São Paulo"
   - Exemplo: ❌ "UNIFESP" (use nome completo)

2. **Nome do Docente**:
   - Use nome completo (nome + sobrenome)
   - Evite títulos (Prof., Dr.) no carimbo
   - Exemplo: ✅ "Milton Carlos Ribeiro"
   - Exemplo: ❌ "Prof. Milton" (incompleto)

3. **Curso**:
   - Use nome oficial do curso
   - Pode incluir período/semestre
   - Exemplo: ✅ "Análise e Desenvolvimento de Sistemas - 2º Semestre"

4. **Turma**:
   - Use código oficial da turma
   - Pode ser letra, número ou combinação
   - Exemplo: ✅ "D", "3A", "2ADS-D"

5. **Data**:
   - Use data da aplicação da prova
   - Formato: DD/MM/AAAA
   - Preenche automaticamente com data atual

---

## 🖨️ Impressão

### Configurações Recomendadas:
```
Tamanho: A4 (210mm x 297mm)
Orientação: Retrato
Margens: Padrão (20mm)
Qualidade: Alta (300 DPI)
Cor: Preto e Branco (carimbo em azul)
Frente e Verso: Não (apenas frente)
```

### Quantidade de Cópias:
```
Número de alunos + 2 extras
Exemplo: 30 alunos = 32 cópias
```

---

## 📱 Responsividade

### Desktop:
- Formulário em 2 colunas
- Campos lado a lado
- Melhor para preenchimento rápido

### Tablet:
- Formulário em 2 colunas (landscape)
- Formulário em 1 coluna (portrait)
- Scroll vertical

### Mobile:
- Formulário em 1 coluna
- Campos empilhados
- Teclado virtual otimizado

---

**Crie provas profissionais em minutos! 📝✨**
