# Welcome to Your Miaoda Project
Miaoda Application Link URL
    URL:https://medo.dev/projects/app-aq5fh9is43r5

# EduForge - Plataforma Educacional

Plataforma educacional pessoal para gestão de aulas, conteúdos, alunos e currículo profissional do Professor Milton Carlos Ribeiro.

## 🚀 Funcionalidades

### 📄 Páginas Principais

1. **Início (Home)** - Landing page com apresentação do professor, timeline acadêmica e profissional completa
2. **Visualizador de PDF** - Importe e visualize arquivos PDF das suas aulas
3. **Acervo de Vídeos** - Importe e reproduza vídeos educacionais
4. **Ementa** - Gerencie tópicos da ementa com marcação de conclusão
5. **Questões** - Crie questões de múltipla escolha com proteção por senha e **exportação para PDF**
6. **Gestão de Alunos** - CRUD completo de alunos com trabalhos, provas e notas
7. **Lista de Chamadas** - Registre presença dos alunos por data
8. **Currículo** - Editor completo de currículo com exportação para PDF

### ✨ Características

- ✅ Design minimalista com amplo espaçamento
- ✅ **3 Temas**: Normal, Dracula (letras grandes), Atom (letras grandes)
- ✅ Navegação responsiva (desktop e mobile)
- ✅ Persistência de dados via localStorage
- ✅ Importação de arquivos PDF e vídeo
- ✅ **Rotação de PDF**: 90°, 180°, 270°, 360°
- ✅ **Fullscreen real** para PDFs e vídeos
- ✅ **Exportação de currículo para PDF** com suporte UTF-8
- ✅ **Exportação de provas em PDF** com carimbo digital azul
- ✅ Proteção por senha para respostas de questões
- ✅ Modo fullscreen para PDFs e vídeos
- ✅ Timeline completa com 12 experiências profissionais

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ instalado
- npm ou pnpm

### Passos

1. **Clone ou baixe o projeto**

```bash
cd app-aq5fh9is43r5
```

2. **Instale as dependências**

```bash
npm install
# ou
pnpm install
```

3. **Execute em modo desenvolvimento**

```bash
npm run dev
# ou
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173`

## 🔧 Executar com PM2

Para rodar a aplicação em produção com PM2:

1. **Instale o PM2 globalmente**

```bash
npm install -g pm2
```

2. **Build da aplicação**

```bash
npm run build
```

3. **Instale um servidor estático (serve)**

```bash
npm install -g serve
```

4. **Crie um arquivo ecosystem.config.js**

```javascript
module.exports = {
  apps: [{
    name: 'eduforge',
    script: 'serve',
    args: 'dist -s -p 3000',
    env: {
      NODE_ENV: 'production'
    }
  }]
}
```

5. **Inicie com PM2**

```bash
pm2 start ecosystem.config.js
```

6. **Comandos úteis do PM2**

```bash
# Ver status
pm2 status

# Ver logs
pm2 logs eduforge

# Reiniciar
pm2 restart eduforge

# Parar
pm2 stop eduforge

# Remover
pm2 delete eduforge

# Salvar configuração para iniciar automaticamente
pm2 save
pm2 startup
```

A aplicação estará disponível em `http://localhost:3000`

## 📚 Como Usar

### Trocar Tema

1. Clique no ícone de paleta (🎨) na sidebar (desktop) ou header (mobile)
2. Escolha entre:
   - **Normal**: Design padrão com tamanho de fonte normal
   - **Dracula**: Tema escuro roxo/rosa com letras grandes
   - **Atom**: Tema escuro verde com letras grandes
3. O tema será salvo automaticamente

### Importar Arquivos

#### PDFs
1. Acesse a página "Visualizador de PDF"
2. Clique em "Importar PDF"
3. Selecione um arquivo PDF (limite: 5MB)
4. O arquivo será armazenado localmente no navegador
5. Clique no arquivo para visualizar
6. Use os controles:
   - **Rotação**: Clique no botão 🔄 para rotacionar (90°, 180°, 270°, 360°)
   - **Fullscreen**: Clique no botão ⛶ para tela cheia
   - **Navegação**: Use ◀ ▶ para mudar de página

#### Vídeos
1. Acesse a página "Acervo de Vídeos"
2. Clique em "Importar Vídeo"
3. Selecione um arquivo de vídeo
4. O arquivo ficará disponível durante a sessão
5. Clique no vídeo para reproduzir

### Questões com Senha

1. Crie questões na página "Questões"
2. Defina a alternativa correta
3. Para revelar a resposta, clique em "Mostrar Resposta Correta"
4. Digite a senha: `password`
5. A resposta correta será destacada

### Exportar Prova em PDF

1. Crie suas questões de múltipla escolha
2. Clique em "Exportar Prova em PDF"
3. Preencha os campos obrigatórios:
   - **Instituição** (ex: Universidade Federal)
   - **Nome do Curso** (ex: Análise e Desenvolvimento de Sistemas)
   - **Nome do Docente** (ex: Milton Carlos Ribeiro)
4. Preencha os campos opcionais:
   - Local, Data, Turma, Número da Sala
5. Clique em "Gerar PDF"
6. O PDF incluirá:
   - Cabeçalho com informações da prova
   - Questões numeradas com círculos para marcar
   - Campo para nota
   - **Carimbo digital azul** com nome do professor (bordas estilo antigo)
7. Nome do arquivo: `Prova_NomeDoCurso_Turma.pdf`

### Gestão de Alunos e Chamadas

1. Cadastre alunos na página "Gestão de Alunos"
2. Adicione trabalhos e provas dinamicamente
3. Na página "Lista de Chamadas", registre a presença
4. A lista de alunos é importada automaticamente

### Currículo

1. Edite seus dados pessoais e profissionais
2. Adicione experiências, formações, habilidades
3. Os dados são compartilhados com a página inicial
4. Use "Exportar PDF" para gerar seu currículo
5. **Estrutura do PDF**:
   - Resumo Profissional
   - Habilidades
   - Experiência Profissional
   - **GRADUAÇÃO** (separado)
   - **PÓS-GRADUAÇÃO** (separado)
   - Certificações
   - **IDIOMAS** (no final)
6. Suporte completo para UTF-8 (acentos, japonês, etc.)

## 🗂️ Estrutura de Dados

Todos os dados são armazenados no localStorage do navegador:

- `eduforge_students` - Lista de alunos
- `eduforge_attendance` - Registros de chamada
- `eduforge_questions` - Questões criadas
- `eduforge_syllabus` - Tópicos da ementa
- `eduforge_resume` - Dados do currículo
- `eduforge_pdf_files` - Metadados e conteúdo dos PDFs
- `eduforge_video_files` - Metadados dos vídeos
- `eduforge_theme` - Tema selecionado (normal/dracula/atom)
- `eduforge_exam_info` - Informações da prova para exportação PDF

## ⚠️ Limitações

- **PDFs**: Limite de 5MB por arquivo (localStorage)
- **Vídeos**: Armazenados em memória durante a sessão (não persistem após fechar o navegador)
- **Dados**: Armazenados localmente no navegador (não sincronizam entre dispositivos)

## 🎨 Design

- Tema minimalista com cores suaves
- **3 temas disponíveis**: Normal, Dracula, Atom
- **Letras grandes** nos temas Dracula e Atom
- Espaçamento generoso para leitura confortável
- Tipografia limpa sem sombras
- Responsivo para desktop e mobile
- Suporte UTF-8 completo
- **Rodapé**: Nome da aplicação, desenvolvedor e copyright (©)

## 🔐 Senha Padrão

- Questões: `password`

## 📝 Notas Técnicas

- React 18 + TypeScript
- Vite para build
- Tailwind CSS + shadcn/ui
- localStorage para persistência
- FileReader API para importação de arquivos
- Object URLs para reprodução de vídeos
- jsPDF para exportação de currículo e provas
- Fullscreen API para modo tela cheia
- Sistema de temas com CSS variables
- Carimbo digital com bordas duplas em azul

## 🆘 Suporte

Para problemas ou dúvidas:
1. Verifique se o navegador suporta localStorage
2. Limpe o cache se houver problemas de carregamento
3. Use navegadores modernos (Chrome, Firefox, Edge, Safari)

## 📄 Licença

© 2026 EduForge. Plataforma educacional pessoal.

**Desenvolvido por Milton Carlos Ribeiro**

Todos os direitos reservados.
