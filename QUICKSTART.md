# 🚀 Guia Rápido - EduForge

## Início Rápido

### Opção 1: Script Automático (Recomendado)

#### Linux/Mac:
```bash
./install.sh
```

#### Windows:
```bash
install.bat
```

O script irá:
1. ✅ Verificar Node.js e npm
2. 📦 Instalar dependências
3. 🎯 Perguntar o modo de execução (dev ou produção)
4. 🚀 Iniciar a aplicação

---

### Opção 2: Manual

#### Desenvolvimento:
```bash
npm install
npm run dev
```
Acesse: http://localhost:5173

#### Produção com PM2:
```bash
npm install
npm install -g pm2 serve
npm run build
pm2 start ecosystem.config.js
```
Acesse: http://localhost:3000

---

## 📋 Primeiros Passos

### 1. Importar Conteúdo

#### PDFs (Limite: 5MB)
- Vá para "Visualizador de PDF"
- Clique em "Importar PDF"
- Selecione seus arquivos de aula

#### Vídeos
- Vá para "Acervo de Vídeos"
- Clique em "Importar Vídeo"
- Selecione seus vídeos de aula

### 2. Cadastrar Alunos
- Vá para "Gestão de Alunos"
- Clique em "Adicionar Aluno"
- Preencha os dados (nome, posição, trabalhos, provas)

### 3. Registrar Chamadas
- Vá para "Lista de Chamadas"
- Clique em "Registrar Nova Chamada"
- Selecione a data e marque presença

### 4. Criar Questões
- Vá para "Questões"
- Clique em "Criar Nova Questão"
- Adicione enunciado e alternativas
- Marque a resposta correta
- Senha para revelar: `password`

### 5. Gerenciar Ementa
- Vá para "Ementa"
- Adicione tópicos da sua disciplina
- Clique nos tópicos para marcar como concluído

### 6. Editar Currículo
- Vá para "Currículo"
- Edite seus dados profissionais
- Adicione experiências e formações
- Exporte para PDF quando pronto

---

## 🎯 Funcionalidades Principais

| Página | Função | Dados Persistem |
|--------|--------|-----------------|
| 📄 PDF | Importar e visualizar PDFs | ✅ Sim (5MB max) |
| 🎥 Vídeos | Importar e reproduzir vídeos | ⚠️ Apenas na sessão |
| 📚 Ementa | Gerenciar tópicos | ✅ Sim |
| ❓ Questões | Criar questões com senha | ✅ Sim |
| 👥 Alunos | CRUD de alunos | ✅ Sim |
| 📋 Chamadas | Registrar presença | ✅ Sim |
| 📄 Currículo | Editor de currículo | ✅ Sim |

---

## ⚠️ Importante

### Limitações
- **PDFs**: Máximo 5MB por arquivo
- **Vídeos**: Não persistem após fechar o navegador
- **Dados**: Armazenados localmente (não sincronizam)

### Backup
Para fazer backup dos seus dados:
1. Abra o Console do navegador (F12)
2. Vá para "Application" > "Local Storage"
3. Copie os dados que começam com `eduforge_`

### Limpar Dados
Para resetar a aplicação:
1. Abra o Console do navegador (F12)
2. Vá para "Application" > "Local Storage"
3. Delete os itens que começam com `eduforge_`

---

## 🆘 Problemas Comuns

### Erro ao importar PDF
- Verifique se o arquivo tem menos de 5MB
- Tente um arquivo menor

### Vídeo não aparece após recarregar
- Vídeos não persistem (limitação do navegador)
- Importe novamente quando necessário

### Dados sumiram
- Verifique se não limpou o cache do navegador
- localStorage é específico por navegador/domínio

---

## 📞 Comandos PM2

```bash
pm2 status              # Ver status da aplicação
pm2 logs eduforge       # Ver logs em tempo real
pm2 restart eduforge    # Reiniciar aplicação
pm2 stop eduforge       # Parar aplicação
pm2 delete eduforge     # Remover do PM2
pm2 save                # Salvar configuração
pm2 startup             # Iniciar automaticamente no boot
```

---

## ✅ Checklist de Instalação

- [ ] Node.js 18+ instalado
- [ ] Dependências instaladas (`npm install`)
- [ ] Aplicação rodando (dev ou PM2)
- [ ] Navegador acessando a URL correta
- [ ] PDFs importados
- [ ] Alunos cadastrados
- [ ] Currículo editado

---

**Pronto! Sua plataforma EduForge está configurada! 🎉**
