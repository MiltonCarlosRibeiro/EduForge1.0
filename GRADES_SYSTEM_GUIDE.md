# 📊 Sistema de Gestão de Notas - EduForge

## ✨ Visão Geral

Sistema completo de gestão de notas e avaliações para alunos, com cálculo automático de média final, status de aprovação/reprovação e geração de relatórios em PDF.

---

## 🎯 Funcionalidades Principais

### 1. Gestão de Alunos
- Cadastro de alunos no banco de dados
- Informações: nome, matrícula, e-mail, telefone
- Integração com sistema de notas

### 2. Configuração de Avaliação
- **Média de Aprovação**: Configurável (padrão: 0.60 = 6.0)
- **Pesos das Avaliações**:
  - Trabalhos: 25% (0.250)
  - Provas: 40% (0.400)
  - Atividades em Grupo: 15% (0.150)
  - Questionários: 20% (0.200)
- **Validação**: Soma dos pesos deve ser exatamente 1.000 (100%)

### 3. Tipos de Avaliação

#### Trabalhos
- Título do trabalho
- Nota (0-10)
- Peso individual (decimal)
- Data de entrega
- Status de entrega

#### Provas
- Título da prova
- Nota (0-10)
- Peso individual (decimal)
- Data da prova
- CRUD completo (adicionar/remover)

#### Atividades em Grupo
- Título da atividade
- Nota (0-10)
- Sem peso individual (média simples)

#### Questionários
- Título do questionário
- Número de acertos
- Total de questões
- **Cálculo automático**: (acertos / total) × 10

### 4. Cálculo de Média Final

#### Fórmula:
```
Média Final = 
  (Média Trabalhos × Peso Trabalhos) +
  (Média Provas × Peso Provas) +
  (Média Ativ. Grupo × Peso Ativ. Grupo) +
  (Média Questionários × Peso Questionários)
```

#### Exemplo:
```
Trabalhos: 8.5 × 0.25 = 2.125
Provas: 7.0 × 0.40 = 2.800
Ativ. Grupo: 9.0 × 0.15 = 1.350
Questionários: 8.0 × 0.20 = 1.600
─────────────────────────────
Média Final = 7.875
```

#### Status:
- **Aprovado**: Média Final ≥ Média de Aprovação
- **Reprovado**: Média Final < Média de Aprovação
- **Pendente**: Sem avaliações cadastradas

### 5. Relatórios em PDF

#### Relatório Individual
**Conteúdo**:
- Dados do aluno (nome, matrícula, e-mail)
- Tabela de trabalhos (título, nota, peso, nota ponderada)
- Tabela de provas (título, nota, peso, nota ponderada)
- Tabela de atividades em grupo (título, nota)
- Tabela de questionários (título, acertos/total, nota)
- Resultado final:
  - Médias por categoria
  - Pesos aplicados
  - Contribuição de cada categoria
  - Nota final
  - Status (Aprovado/Reprovado)

**Formato**:
- Cabeçalho: EduForge - Plataforma Educacional
- Data de geração
- Tabelas formatadas com jsPDF-autotable
- Rodapé: © 2026 EduForge - Desenvolvido por Milton Carlos Ribeiro
- Paginação automática

#### Relatório Geral
**Conteúdo**:
- Lista de todos os alunos
- Colunas: Nome, Matrícula, Médias por categoria, Nota Final, Status
- Estatísticas:
  - Total de alunos
  - Aprovados (quantidade e %)
  - Reprovados (quantidade e %)
  - Pendentes (quantidade e %)
  - Média geral da turma

**Formato**:
- Tabela compacta com todas as informações
- Status colorido (verde para Aprovado, vermelho para Reprovado)
- Configuração de avaliação exibida
- Estatísticas resumidas

---

## 🗄️ Estrutura do Banco de Dados

### Tabela: `students`
```sql
id: uuid (PK)
name: text
email: text (unique)
registration_number: text (unique)
phone: text
created_at: timestamptz
updated_at: timestamptz
```

### Tabela: `grade_config`
```sql
id: uuid (PK)
passing_grade: decimal(3,2) -- Ex: 0.60
assignments_weight: decimal(4,3) -- Ex: 0.250
exams_weight: decimal(4,3) -- Ex: 0.400
group_activities_weight: decimal(4,3) -- Ex: 0.150
quizzes_weight: decimal(4,3) -- Ex: 0.200
created_at: timestamptz
updated_at: timestamptz
CONSTRAINT: soma dos pesos = 1.000
```

### Tabela: `assignments`
```sql
id: uuid (PK)
student_id: uuid (FK → students)
title: text
grade: decimal(5,2) -- 0-10
weight: decimal(4,3) -- Peso individual
delivered: boolean
delivery_date: date
created_at: timestamptz
updated_at: timestamptz
```

### Tabela: `exams`
```sql
id: uuid (PK)
student_id: uuid (FK → students)
title: text
grade: decimal(5,2) -- 0-10
weight: decimal(4,3) -- Peso individual
exam_date: date
created_at: timestamptz
updated_at: timestamptz
```

### Tabela: `group_activities`
```sql
id: uuid (PK)
student_id: uuid (FK → students)
title: text
grade: decimal(5,2) -- 0-10
created_at: timestamptz
updated_at: timestamptz
```

### Tabela: `quiz_grades`
```sql
id: uuid (PK)
student_id: uuid (FK → students)
quiz_title: text
correct_answers: integer
total_questions: integer
grade: decimal(5,2) -- Calculado automaticamente
created_at: timestamptz
```

### Tabela: `student_final_grades`
```sql
id: uuid (PK)
student_id: uuid (FK → students, unique)
assignments_avg: decimal(5,2)
exams_avg: decimal(5,2)
group_activities_avg: decimal(5,2)
quizzes_avg: decimal(5,2)
final_grade: decimal(5,2)
status: text -- 'Aprovado', 'Reprovado', 'Pendente'
created_at: timestamptz
updated_at: timestamptz
```

---

## 💻 Arquitetura do Sistema

### Frontend
```
src/
├── pages/
│   └── GradesPage.tsx          # Página principal de gestão de notas
├── db/
│   ├── supabase.ts             # Cliente Supabase
│   └── api.ts                  # Funções de API (CRUD + cálculos)
├── utils/
│   └── pdfGenerator.ts         # Geração de relatórios PDF
└── types/
    └── types.ts                # Tipos TypeScript
```

### Backend (Supabase)
```
Database:
├── Tables (8 tabelas)
├── RLS Policies (leitura e escrita públicas)
└── Indexes (otimização de queries)
```

### Bibliotecas Utilizadas
- **jsPDF**: Geração de PDF
- **jsPDF-autotable**: Tabelas formatadas em PDF
- **Supabase**: Backend e banco de dados
- **React**: Interface do usuário
- **shadcn/ui**: Componentes UI

---

## 🎨 Interface do Usuário

### Layout da Página

```
┌─────────────────────────────────────────────────────┐
│  Gestão de Notas              [Relatório Geral]    │
├─────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────┐   │
│  │ Selecionar Aluno                            │   │
│  │ [Dropdown com lista de alunos]              │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ Configuração de Avaliação                   │   │
│  │ [Média] [Peso Trab] [Peso Provas] ...       │   │
│  │ [Salvar Configuração]                       │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ Trabalhos                                   │   │
│  │ [Título] [Nota] [Peso] [Adicionar]          │   │
│  │ • Trabalho 1 - Nota: 8.5 - Peso: 1.0  [🗑]  │   │
│  │ • Trabalho 2 - Nota: 9.0 - Peso: 1.0  [🗑]  │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ Provas                                      │   │
│  │ [Título] [Nota] [Peso] [Adicionar]          │   │
│  │ • Prova 1 - Nota: 7.0 - Peso: 1.0     [🗑]  │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ Atividades em Grupo                         │   │
│  │ [Título] [Nota] [Adicionar]                 │   │
│  │ • Atividade 1 - Nota: 9.0             [🗑]  │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ Questionários                               │   │
│  │ [Título] [Acertos] [Total] [Adicionar]      │   │
│  │ • Quiz 1 - 8/10 acertos - Nota: 8.00  [🗑]  │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ Resultado Final - João Silva  [Exportar PDF]│   │
│  │                                             │   │
│  │ Média Trabalhos: 8.75                       │   │
│  │ Média Provas: 7.00                          │   │
│  │ Média Ativ. Grupo: 9.00                     │   │
│  │ Média Questionários: 8.00                   │   │
│  │                                             │   │
│  │ Nota Final: 7.88                            │   │
│  │ Status: APROVADO                            │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

### Cores e Feedback Visual
- **Card de Resultado**:
  - Borda verde: Aprovado
  - Borda vermelha: Reprovado
- **Status**:
  - Verde: Aprovado
  - Vermelho: Reprovado
  - Cinza: Pendente
- **Validação de Pesos**:
  - Alerta vermelho se soma ≠ 1.000

---

## 🔄 Fluxo de Uso

### 1. Configurar Sistema
```
1. Acessar "Gestão de Notas" na sidebar
2. Definir média de aprovação (ex: 0.60)
3. Ajustar pesos das categorias
4. Garantir que soma = 1.000
5. Salvar configuração
```

### 2. Cadastrar Avaliações
```
1. Selecionar aluno no dropdown
2. Adicionar trabalhos (título, nota, peso)
3. Adicionar provas (título, nota, peso)
4. Adicionar atividades em grupo (título, nota)
5. Adicionar questionários (título, acertos, total)
```

### 3. Visualizar Resultado
```
1. Sistema calcula automaticamente:
   - Médias por categoria
   - Média final ponderada
   - Status (Aprovado/Reprovado)
2. Resultado exibido em card destacado
```

### 4. Gerar Relatórios
```
Relatório Individual:
1. Clicar em "Exportar PDF" no card do aluno
2. PDF gerado com todas as informações
3. Arquivo salvo: relatorio_NomeAluno_timestamp.pdf

Relatório Geral:
1. Clicar em "Relatório Geral" no topo
2. PDF gerado com todos os alunos
3. Arquivo salvo: relatorio_geral_timestamp.pdf
```

---

## 📊 Exemplos de Cálculo

### Exemplo 1: Aluno Aprovado
```
Configuração:
- Média de aprovação: 0.60 (6.0)
- Trabalhos: 25% | Provas: 40% | Ativ. Grupo: 15% | Questionários: 20%

Notas do Aluno:
- Trabalhos: 8.5 (peso 1.0), 9.0 (peso 1.0) → Média: 8.75
- Provas: 7.0 (peso 1.0), 6.5 (peso 1.0) → Média: 6.75
- Ativ. Grupo: 9.0 → Média: 9.0
- Questionários: 8/10 → Nota: 8.0

Cálculo:
8.75 × 0.25 = 2.1875
6.75 × 0.40 = 2.7000
9.00 × 0.15 = 1.3500
8.00 × 0.20 = 1.6000
─────────────────────
Média Final = 7.84

Status: APROVADO (7.84 ≥ 6.0)
```

### Exemplo 2: Aluno Reprovado
```
Configuração:
- Média de aprovação: 0.60 (6.0)
- Trabalhos: 25% | Provas: 40% | Ativ. Grupo: 15% | Questionários: 20%

Notas do Aluno:
- Trabalhos: 5.0 → Média: 5.0
- Provas: 4.5, 5.0 → Média: 4.75
- Ativ. Grupo: 6.0 → Média: 6.0
- Questionários: 5/10 → Nota: 5.0

Cálculo:
5.00 × 0.25 = 1.2500
4.75 × 0.40 = 1.9000
6.00 × 0.15 = 0.9000
5.00 × 0.20 = 1.0000
─────────────────────
Média Final = 5.05

Status: REPROVADO (5.05 < 6.0)
```

### Exemplo 3: Pesos Diferentes
```
Configuração:
- Trabalhos: 30% | Provas: 50% | Ativ. Grupo: 10% | Questionários: 10%

Notas:
- Trabalhos: 8.0 × 0.30 = 2.40
- Provas: 7.0 × 0.50 = 3.50
- Ativ. Grupo: 9.0 × 0.10 = 0.90
- Questionários: 8.0 × 0.10 = 0.80
─────────────────────────────
Média Final = 7.60
```

---

## 🎯 Casos de Uso

### Caso 1: Professor Avaliando Turma
```
Objetivo: Calcular notas finais de todos os alunos

Passos:
1. Configurar pesos das avaliações
2. Para cada aluno:
   a. Selecionar aluno
   b. Cadastrar todas as avaliações
   c. Verificar média final e status
3. Gerar relatório geral da turma
4. Exportar PDF para diretoria
```

### Caso 2: Aluno Consultando Desempenho
```
Objetivo: Ver detalhamento de notas

Passos:
1. Professor seleciona o aluno
2. Sistema exibe:
   - Todas as avaliações
   - Médias por categoria
   - Nota final
   - Status de aprovação
3. Exportar relatório individual
4. Entregar ao aluno
```

### Caso 3: Ajuste de Pesos
```
Objetivo: Mudar critérios de avaliação

Passos:
1. Acessar configuração
2. Ajustar pesos (ex: aumentar peso de provas)
3. Garantir soma = 1.000
4. Salvar
5. Sistema recalcula automaticamente todas as médias
```

---

## 🔒 Segurança e Validações

### Validações de Entrada
- **Notas**: Devem estar entre 0 e 10
- **Pesos**: Devem ser decimais positivos
- **Soma de Pesos**: Deve ser exatamente 1.000
- **Questionários**: Acertos ≤ Total de questões

### Políticas RLS (Row Level Security)
- Leitura: Todos podem ler
- Escrita: Todos podem escrever
- Deleção: Cascata ao deletar aluno

### Integridade de Dados
- Foreign Keys: Garantem relacionamentos
- Constraints: Validam valores
- Índices: Otimizam consultas

---

## 📈 Performance

### Otimizações
- **Índices**: Em todas as foreign keys
- **Cálculo sob demanda**: Apenas quando necessário
- **Upsert**: Evita duplicação de registros finais
- **Queries otimizadas**: Uso de `.maybeSingle()` e `.limit()`

### Escalabilidade
- Suporta centenas de alunos
- Geração de PDF assíncrona
- Paginação em queries (preparado para futuro)

---

## 🐛 Tratamento de Erros

### Erros Comuns
1. **Soma de pesos ≠ 1.000**
   - Alerta visual em vermelho
   - Impede salvamento

2. **Aluno sem avaliações**
   - Status: "Pendente"
   - Média: 0.00

3. **Nota fora do intervalo**
   - Validação no banco (CHECK constraint)
   - Erro ao tentar salvar

4. **Divisão por zero**
   - Tratado no cálculo de médias
   - Retorna 0 se não houver avaliações

---

## 🚀 Melhorias Futuras

### Funcionalidades Planejadas
- [ ] Histórico de alterações de notas
- [ ] Comentários do professor por avaliação
- [ ] Gráficos de desempenho
- [ ] Comparação com média da turma
- [ ] Exportação para Excel
- [ ] Notificações de aprovação/reprovação
- [ ] Sistema de recuperação
- [ ] Pesos por aluno (casos especiais)
- [ ] Integração com sistema de presença
- [ ] Dashboard de estatísticas

### Melhorias Técnicas
- [ ] Cache de cálculos
- [ ] Paginação de alunos
- [ ] Filtros e busca
- [ ] Ordenação de tabelas
- [ ] Modo offline
- [ ] Sincronização automática

---

## 📚 Referências

### Documentação
- [jsPDF](https://github.com/parallax/jsPDF)
- [jsPDF-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable)
- [Supabase](https://supabase.com/docs)
- [React](https://react.dev/)
- [shadcn/ui](https://ui.shadcn.com/)

### Fórmulas
- Média Ponderada: Σ(nota × peso) / Σ(peso)
- Média Simples: Σ(nota) / quantidade
- Porcentagem: (valor / total) × 100

---

## 🎉 Conclusão

O Sistema de Gestão de Notas do EduForge é uma solução completa e profissional para gerenciamento de avaliações acadêmicas, oferecendo:

✅ **Cálculo automático** de médias ponderadas
✅ **Configuração flexível** de pesos e critérios
✅ **CRUD completo** para todos os tipos de avaliação
✅ **Relatórios profissionais** em PDF
✅ **Interface intuitiva** e responsiva
✅ **Validações robustas** de dados
✅ **Performance otimizada** com Supabase

**Desenvolvido com ❤️ por Milton Carlos Ribeiro**

---

**© 2026 EduForge - Todos os direitos reservados**
