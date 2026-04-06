# Documento de Requisitos

## 1. Visão Geral da Aplicação

- **Nome da Aplicação:** EduForge
- **Descrição:** Plataforma educacional pessoal para gestão de aulas, conteúdos, alunos e currículo profissional. Permite importar PDFs e vídeos via botão de upload na interface, visualizá-los de forma atraente, gerenciar ementas, criar questões de múltipla escolha com exportação em PDF formatada, registrar dados de alunos com cálculo de média ponderada e geração de relatórios individuais e coletivos exportáveis em PDF, manter lista de chamadas e montar um currículo exportável em PDF. A página inicial apresenta o professor com uma landing page e timeline acadêmica/profissional completa baseada nos dados fornecidos. Projetada para rodar localmente via Node.js + PM2, com backend Express para servir os arquivos das pastas `dataaulas/videos` e `dataaulas/pdf` e receber uploads.

---

## 2. Arquivos de Referência

1. Relatório de pesquisa (dados do LinkedIn de Milton Carlos Ribeiro): `/workspace/app-aq5fh9is43r5/docs/report.md`

---

## 3. Usuários e Cenário de Uso

- **Usuário principal:** Professor/instrutor Milton Carlos Ribeiro, 42 anos, casado, que ministra aulas de Design Thinking, TI, Negócios, Lógica de Programação, HTML, CSS e JS.
- **Cenário principal:** Uso local via Node.js + PM2 para preparar e conduzir aulas, apresentar-se aos alunos, acompanhar desempenho e manter currículo atualizado.

---

## 4. Estrutura de Páginas

```
EduForge
├── Home (Landing Page de Apresentação)
├── Visualizador de PDF
├── Acervo de Vídeos
├── Ementa
├── Questões de Múltipla Escolha
├── Gestão de Alunos
├── Lista de Chamadas
└── Editor de Currículo
```

---

## 5. Páginas e Funcionalidades

### 5.1 Home — Landing Page de Apresentação

- Exibe uma landing page profissional voltada à apresentação do professor aos alunos.
- Seções da página:
  - **Cabeçalho/Hero:** nome completo (Milton Carlos Ribeiro), idade (42 anos), estado civil (casado), título profissional (PM | GD | SCRUM | IA | TQM | BIGDATA | JAVA | KOTLIN), localização (Santa Bárbara d'Oeste, São Paulo, Brasil), e-mail (mcr.milton@gmail.com) e link para LinkedIn (www.linkedin.com/in/milton-carlosribeiro-62635959).
  - **Idiomas:** English (Professional Working), Português (Native or Bilingual), 日本語 (Full Professional).
  - **Principais Competências:** Estratégias de sustentabilidade, Desenvolvedor full, Calibração.
  - **Timeline Acadêmica e Profissional:** linha do tempo visual e resumida, exibindo toda a trajetória acadêmica e profissional. Itens da timeline:
    - Formação acadêmica:
      - FIAP — Curso Superior de Tecnologia, Análise e Desenvolvimento de Sistemas (fevereiro de 2024 – janeiro de 2026)
      - Anhanguera Educacional — Pós-graduação Lato Sensu - MBA, Gestão da Qualidade (fevereiro de 2025 – agosto de 2025)
      - Centro Universitário Salesiano de São Paulo — Pós-graduação Lato Sensu - MBA, Gestão de Projetos (2015 – 2017)
      - Anhanguera Educacional — Bacharelado em Administração, Administração e Negócios (fevereiro de 2009 – dezembro de 2013)
    - Certificações:
      - GitHub versionamento de código
      - Aprenda ERP TOTVS Protheus na prática Compras
      - Inspetor de Qualidade
      - Corporate Systems
      - Cloud Fundamentals, Administration and Solution Architect
    - Experiências profissionais completas:
      - Pakmatic do Brasil — Process Analyst | BIGDATA (maio de 2025 – presente), Santa Bárbara d'Oeste, São Paulo, Brasil
      - OTICS USA, Inc. — Electric trolley operator (agosto de 2023 – agosto de 2024), Japão. Abastecimento de linhas de produção e gestão de materiais para envio ao cliente.
      - Justec Ltd. (contract agent) / Shibaoka製作所 — Mechanical Designer (dezembro de 2020 – junho de 2023), Aichi — Nagoia/Okazaki, Japão. Projeto de equipamentos de soldagem de robôs e layouts de manufatura; estrutura geral do veículo, longarinas e toda a estrutura do chassi.
      - Ishikawa製作所 — CNC machine operator (março de 2020 – novembro de 2020), Aichi, Japão. Fabricação de peças.
      - Futaba Manufacturing — Operator of robotic welding cells, Toyota car sheet structure (agosto de 2018 – outubro de 2018), Aichi, Japão. Operação de robôs FANUC e MOTOMAN para soldagem de conjuntos estruturais de chassi automotivo.
      - Sony Electronics — Mounting lenses for professional cameras (outubro de 2017 – agosto de 2018), Japão. Operador de linha, montagem de lentes intercambiáveis profissionais. Linha: Sony 70-200mm f/2.8 G Series II.
      - AISIN — Automated device bending machine operator (julho de 2017 – outubro de 2017), Toyota, Japão. Operador de linha de produção robótica, fábrica Shintoyo Toyota. Linha de guarnições de portas para veículos, corte e dobramento.
      - Showa Manufacturing — Welding operator and inspection of gas spring shock absorbers (agosto de 2016 – junho de 2017), Shizuoka, Japão. Soldagem a ponto, máquinas automáticas e inspeção final de amortecedores automotivos de mola a gás.
      - Pakmatic do Brasil — Mechanical Designer (novembro de 2015 – julho de 2016), Rua Henrique Wiezel. Designer mecânico vinculado ao Planejamento e Desenvolvimento de linha para elaboração de novos produtos e projetos de painéis de baixa e alta tensão.
      - SRP Industrial Automation — Project leader and Mechanical Designer (junho de 2014 – maio de 2015), Americana, São Paulo. Coordenação de projetos de automação de linhas de produção contínua com robôs de soldagem e manuseio (KUKA).
      - INDUSTRIAS NARDINI S.A — Production control leader for sheet metal cutting and bending / Sheet metal planning development (abril de 2010 – maio de 2014), Americana, SP. Responsável pelo planejamento de produção no setor de corte e conformação de chapas metálicas, produção lean com elementos pré-acabados.
      - CDG cutting and fabrication — Sheet metal planning development / Programmer for laser cutting, waterjet and punching (agosto de 2008 – abril de 2010), Nova Odessa. Projetos de chapas metálicas para painéis elétricos CCM, racks e carenagens para máquinas. Domínio de AutoCAD e SolidWorks.
  - Cada item da timeline exibe: período, título/nome da formação, certificação ou cargo e instituição/empresa.
  - **Botão LinkedIn:** link para `www.linkedin.com/in/milton-carlosribeiro-62635959`.
- Navegação para todas as demais telas da aplicação.
- Botão de destaque com link direto para a tela de Visualizador de PDF.
- Botão secundário com link direto para o Acervo de Vídeos.
- Os dados de nome, cargo, e-mail, LinkedIn e competências são compartilhados com o módulo de Currículo via localStorage.

---

### 5.2 Visualizador de PDF

- **Botão Importar PDF:** permite ao usuário selecionar um ou mais arquivos PDF do sistema de arquivos local via input de arquivo (`<input type=\"file\" accept=\".pdf\">`). Os arquivos selecionados são enviados ao backend via requisição multipart/form-data e salvos na pasta `dataaulas/pdf` no servidor.
- Lê arquivos PDF da pasta local `dataaulas/pdf` servida pelo backend Node.js.
- Lista os PDFs disponíveis na pasta para seleção.
- Exibe o PDF selecionado em um visualizador estilizado, com tipografia atraente e layout semelhante a uma apresentação (estilo PowerPoint turbinado):
  - Fonte legível e agradável
  - Fundo escuro ou claro com contraste elevado
  - Navegação entre páginas com setas ou miniaturas laterais
- **Botão de troca de tema:** reposicionado para fora da área principal do visualizador, posicionado em uma barra de controles superior ou em painel de configurações lateral separado, de forma que não interfira na área de leitura do PDF. O botão deve ser claramente identificável e acessível.
- **Rotação do PDF:** o visualizador disponibiliza botões de rotação que permitem girar o documento em incrementos de 90°, com os ângulos disponíveis sendo 0°, 90°, 180° e 270°. A rotação é aplicada visualmente à página exibida sem recarregar o arquivo.
- **Modo Fullscreen do PDF:**
  - Botão de tela cheia que oculta completamente a interface da aplicação (barra de navegação, menus laterais e demais elementos do layout).
  - No modo fullscreen, o PDF ocupa toda a área da janela do navegador, respeitando a proporção original do documento (aspect ratio preservado).
  - Uma barra de rolagem vertical é exibida quando o conteúdo do PDF exceder a altura da tela, permitindo navegação pelo documento sem distorção.
  - Botão ou tecla de atalho (ex.: Esc) para sair do modo fullscreen e retornar à interface normal da aplicação.
- **Temas de visualização do PDF:** o visualizador oferece três opções de tema, selecionáveis pelo usuário:
  - **Tema Normal (padrão):** mantém o estilo atual do visualizador, sem alterações de esquema de cores ou tamanho de fonte.
  - **Tema Dracula:** aplica esquema de cores inspirado no tema Dracula (fundo escuro em tons de roxo/cinza escuro, texto em branco/creme, destaques em roxo, rosa e verde). As letras são exibidas em tamanho grande para facilitar a leitura.
  - **Tema Atom:** aplica esquema de cores inspirado no tema Atom One Dark (fundo escuro em tons de cinza azulado, texto em branco/cinza claro, destaques em azul, laranja e verde). As letras são exibidas em tamanho grande para facilitar a leitura.
  - A seleção de tema é aplicada imediatamente ao visualizador sem recarregar o arquivo PDF.
  - A preferência de tema é salva no localStorage e restaurada na próxima sessão.
- **Suporte a codificação UTF-8:** o visualizador aceita e renderiza corretamente arquivos PDF com conteúdo em UTF-8, incluindo caracteres especiais, acentuação e alfabetos não-latinos.
- **Seletor de idioma do visualizador:** posicionado como último elemento da interface do visualizador de PDF (após todos os demais controles). O seletor permite ao usuário escolher entre os seguintes modos de categorização/exibição:
  - **GRADUAÇÃO**
  - **PÓS GRADUAÇÃO**
- Botão de link/atalho para navegar à tela de Acervo de Vídeos.

---

### 5.3 Acervo de Vídeos

- **Botão Importar Vídeo:** permite ao usuário selecionar um ou mais arquivos de vídeo do sistema de arquivos local via input de arquivo (`<input type=\"file\" accept=\"video/*\">`). Os arquivos selecionados são enviados ao backend via requisição multipart/form-data e salvos na pasta `dataaulas/videos` no servidor.
- Lê arquivos de vídeo da pasta local `dataaulas/videos` servida pelo backend Node.js.
- Lista os vídeos disponíveis na pasta para seleção.
- Exibe o vídeo selecionado em um player estilizado (caixa com bordas arredondadas, sombra, controles personalizados).
- **Reprodução de vídeo:** ao selecionar um vídeo da lista, o player carrega e inicia a reprodução corretamente. Os controles padrão de play, pause, barra de progresso e volume devem funcionar de forma estável e independente do modo de exibição.
- **Modo Fullscreen do Vídeo:**
  - O botão de tela cheia do player de vídeo deve funcionar de forma confiável, acionando o modo fullscreen nativo do navegador para o elemento de vídeo.
  - No modo fullscreen, o vídeo ocupa toda a área da tela respeitando a proporção original (aspect ratio preservado), sem distorção.
  - O botão de fullscreen permanece funcional mesmo após o vídeo ter sido reproduzido, pausado ou trocado, não perdendo seu comportamento em nenhum estado do player.
  - Ao sair do fullscreen (via botão ou tecla Esc), o player retorna ao layout normal da página sem interromper a reprodução.
- Cada página (PDF e Vídeo) é independente e separada.

---

### 5.4 Ementa

- Campo de texto para o professor digitar e salvar a ementa da instituição.
- Cada tópico da ementa é exibido como um item de lista.
- O professor pode clicar em cada tópico para marcá-lo como concluído (texto tachado).
- Possibilidade de desmarcar tópicos já tachados.
- Dados salvos no localStorage.

---

### 5.5 Questões de Múltipla Escolha

- **Layout de criação de questões:**
  - Cada questão é exibida dentro de um card com largura e altura suficientes para acomodar enunciado e todas as alternativas sem overflow.
  - O enunciado da questão ocupa a parte superior do card.
  - As alternativas (radio buttons com texto) são posicionadas abaixo do enunciado, cada uma em linha própria, com espaçamento adequado para evitar sobreposição ou extravasamento do card.
  - O layout do card se ajusta dinamicamente à quantidade de alternativas e ao tamanho do texto, garantindo que todo o conteúdo permaneça dentro dos limites do card.
- **Campos de criação:**
  - Campo de texto para o enunciado da questão.
  - Campos para as alternativas (radio buttons).
  - Indicação de qual alternativa é a correta (definida pelo professor ao criar).
- **Posicionamento do formulário de cabeçalho e carimbo no PDF exportado:**
  - No PDF exportado, a área de cabeçalho (Instituição, Local, Data, Curso, Turma, Sala), o campo de Nota e o carimbo digital do docente são posicionados acima das questões, logo abaixo do cabeçalho do documento, antes da listagem das questões.
- Botão **Mostrar Resposta Correta**:
  - Ao clicar, solicita a senha `password`.
  - Somente após validação da senha, destaca a alternativa correta.
  - Sem a senha correta, o botão permanece bloqueado.
- Possibilidade de criar múltiplas questões na mesma tela.
- Dados salvos no localStorage.
- **Exportação das Questões em PDF:**
  - Botão **Exportar Questões em PDF** disponível na tela de Questões de Múltipla Escolha.
  - A geração do PDF é realizada inteiramente no frontend utilizando JavaScript puro (.js puro), sem dependência de bibliotecas externas de geração de PDF no lado do cliente que não sejam compatíveis com JS puro, e sem envolvimento do backend.
  - Antes de exportar, o professor preenche um formulário de cabeçalho com os seguintes campos:
    - **Instituição:** nome da instituição de ensino (campo de texto livre).
    - **Local:** cidade ou local de aplicação da prova (campo de texto livre).
    - **Data:** data da prova (campo de data, formato dd/mm/aaaa).
    - **Nome do Curso:** nome do curso ao qual a prova se destina (campo de texto livre).
    - **Turma:** identificação da turma (ex.: D) (campo de texto livre).
    - **Número da Sala:** número ou identificação da sala (campo de texto livre).
    - **Campo de Nota:** área reservada para nota do aluno, exibida no documento exportado como um espaço em branco rotulado 「Nota: ___________」.
    - **Nome do Docente:** nome completo do professor (nome e sobrenome), utilizado para gerar o carimbo digital.
  - O PDF exportado apresenta layout agradável e organizado com a seguinte ordem de conteúdo:
    1. **Cabeçalho:** exibe os campos preenchidos (Instituição, Local, Data, Curso, Turma, Sala) de forma estruturada e visualmente clara.
    2. **Campo de Nota:** área destacada para preenchimento da nota do aluno.
    3. **Carimbo Digital do Docente:** posicionado logo abaixo do campo de nota, antes das questões. Gerado automaticamente a partir do campo Nome do Docente. O carimbo imita a aparência de um carimbo físico antigo com as seguintes características visuais:
       - Borda em formato retangular ou oval com estilo de carimbo antigo (bordas duplas ou tracejadas simulando desgaste).
       - Texto interno exibindo o nome completo do docente (nome e sobrenome conforme digitado).
       - Toda a arte do carimbo (borda e texto) é renderizada na cor azul.
       - O carimbo é gerado e incorporado diretamente no PDF exportado usando JS puro, sem necessidade de imagem externa.
    4. **Corpo:** lista de todas as questões criadas, com enunciado e alternativas formatados de forma legível. As respostas corretas não são exibidas no PDF exportado.

---

### 5.6 Gestão de Alunos

- Cadastro de alunos com os seguintes campos:
  - Nome completo
  - Posicionamento na sala: coluna (ex.: `1 direita`) e carteira (ex.: `carteira 1`)
  - Entregas de trabalhos: lista de trabalhos com checkbox (ex.: Trabalho 1 [ ], Trabalho 2 [ ])
  - Notas de provas: campos para Prova 1, Prova 2 (com opção de adicionar mais campos de prova e trabalho dinamicamente)
  - Apresentou trabalho em grupo: sim/não
  - Faltou: sim/não
  - Notas adicionais: campo de texto livre
- CRUD completo: criar, visualizar, editar e excluir alunos.
- Dados salvos no localStorage.
- **Aba lateral com texto reduzido:** os rótulos dos itens de navegação lateral são exibidos de forma compacta (texto abreviado ou apenas ícone com tooltip), reduzindo o espaço ocupado pela aba lateral e ampliando a área de conteúdo principal.

#### 5.6.1 Módulo de Cálculo de Média por Aluno

Cada card de aluno exibe um painel de cálculo de média com os seguintes elementos:

**Configuração de Trabalhos:**
- Lista de trabalhos cadastrados para o aluno (os mesmos do campo de entregas).
- Para cada trabalho: campo para inserir o peso em decimal (ex.: 0,3) que será atribuído àquele trabalho no cálculo da média.
- Apenas os trabalhos marcados como entregues (checkbox marcado) são considerados no cálculo.
- Campo para inserir a nota obtida em cada trabalho entregue.

**Configuração de Provas:**
- CRUD para adicionar ou remover quantidades de provas: o professor pode adicionar novas provas ou remover provas existentes diretamente no card do aluno.
- Para cada prova: campo para inserir o valor da nota obtida pelo aluno naquela prova.
- Campo para inserir o peso em decimal de cada prova no cálculo da média (ex.: 0,4).

**Configuração de Atividades em Grupo:**
- Campo para inserir a porcentagem (peso em decimal) que as atividades em grupo representam na composição da nota final.
- O campo 「Apresentou trabalho em grupo」 (sim/não) já existente no cadastro é utilizado para determinar se o aluno recebe a pontuação correspondente.

**Configuração de Questionários:**
- Campo para inserir a quantidade total de perguntas dos questionários criados.
- O sistema divide automaticamente 100% pela quantidade de perguntas para calcular o valor de cada pergunta, de modo que o total some 100%.
- O resultado (valor por pergunta) é exibido de forma informativa no painel.

**Campo de Composição da Nota (soma de pesos = 100%):**
- Painel de resumo exibindo a soma atual de todos os pesos configurados (trabalhos + provas + atividades em grupo + questionários).
- O total deve somar 100% (ou 1,0 em decimal). O sistema exibe alerta visual caso a soma não atinja ou ultrapasse 100%.

**Cálculo e Exibição da Média:**
- Botão ou cálculo automático que computa a média ponderada do aluno com base em todos os pesos e notas configurados.
- A média calculada é exibida de forma destacada no card do aluno.

**Status de Aprovação/Reprovação:**
- Campo de texto pré-configurado 「Média de Aprovação:」 com valor padrão 0,6 (editável pelo professor).
- Se a média calculada do aluno for menor que a média de aprovação configurada, o card do aluno exibe automaticamente o status **「Reprovado」** em destaque visual.
- Se a média calculada for igual ou superior à média de aprovação, o card exibe o status **「Aprovado」** em destaque visual.
- Todos os dados de pesos, notas e média de aprovação são salvos no localStorage.

#### 5.6.2 Relatório Individual do Aluno (Exportação em PDF)

- Cada card de aluno possui um botão **「Exportar Relatório PDF」**.
- Ao acionar, gera um relatório em PDF do aluno contendo:
  - Dados pessoais: nome completo, posicionamento na sala.
  - Entregas de trabalhos: lista de todos os trabalhos com indicação de entregue/não entregue e nota de cada trabalho entregue.
  - Notas de provas: lista de todas as provas com respectivas notas.
  - Participação em atividade em grupo: sim/não.
  - Resultado dos questionários (se configurado): valor por pergunta e pontuação obtida.
  - Média final calculada.
  - Status: Aprovado ou Reprovado.
  - Notas adicionais do professor.
- A geração do PDF é realizada inteiramente no frontend utilizando **JavaScript puro (.js puro)**, sem dependência do backend.

#### 5.6.3 Relatório Coletivo (Todos os Alunos)

- Na página de Gestão de Alunos, há um botão **「Exportar Relatório Geral PDF」** que gera um único documento PDF contendo o relatório de todos os alunos cadastrados, com as mesmas informações do relatório individual para cada aluno.
- O documento é organizado de forma que cada aluno ocupe uma seção claramente delimitada.
- A geração do PDF é realizada inteiramente no frontend utilizando **JavaScript puro (.js puro)**, sem dependência do backend.
- Destinado à entrega à diretoria da instituição.

---

### 5.7 Lista de Chamadas

- Página dedicada ao registro de chamadas por data.
- Cada registro de chamada contém:
  - Data no formato dd/mm/aa
  - Lista de alunos (importada do cadastro de alunos) com marcação de presença (presente/ausente) por aluno
- CRUD completo para registros de chamada:
  - **Criar:** botão para adicionar nova chamada, informando a data e marcando a presença de cada aluno
  - **Visualizar:** listagem de todas as chamadas registradas, ordenadas por data, com possibilidade de expandir cada registro para ver o detalhe de presença por aluno
  - **Editar:** alterar a data ou a marcação de presença de uma chamada já registrada
  - **Excluir:** remover um registro de chamada
- Dados salvos no localStorage.

---

### 5.8 Editor de Currículo

- Campos pré-definidos mais comuns de um currículo, pré-populados com os dados de Milton Carlos Ribeiro:
  - Dados pessoais: nome (Milton Carlos Ribeiro), idade (42 anos), estado civil (casado), cargo/título (PM | GD | SCRUM | IA | TQM | BIGDATA | JAVA | KOTLIN), e-mail (mcr.milton@gmail.com), LinkedIn (www.linkedin.com/in/milton-carlosribeiro-62635959), localização (Santa Bárbara d'Oeste, São Paulo, Brasil), foto, resumo profissional
  - Experiências profissionais pré-populadas (CRUD): todas as experiências listadas na seção 5.1, com campos empresa, cargo, período e descrição
  - Formação acadêmica pré-populada (CRUD): todas as formações listadas na seção 5.1
  - Habilidades (CRUD) — pré-populada com Estratégias de sustentabilidade, Desenvolvedor full, Calibração
  - Certificações (CRUD) — pré-populada com GitHub versionamento de código, Aprenda ERP TOTVS Protheus na prática Compras, Inspetor de Qualidade, Corporate Systems, Cloud Fundamentals Administration and Solution Architect
  - Idiomas (CRUD) — pré-populado com English (Professional Working), Português (Native or Bilingual), 日本語 (Full Professional)
- Opção de inserir colunas/seções adicionais personalizadas pelo usuário.
- Todos os dados salvos no localStorage.
- **Botão Imprimir / Exportar PDF:** a funcionalidade de exportação do currículo em PDF está em desenvolvimento e ainda não está disponível nesta versão. O botão deve ser exibido na interface com indicação visual clara de que está desabilitado (ex.: estado desabilitado com tooltip ou rótulo informando 「Em desenvolvimento」), impedindo qualquer ação ao ser clicado.
- Os dados de nome, cargo, e-mail, LinkedIn e competências são compartilhados com a Home (landing page).

---

## 6. Arquitetura de Execução Local

- A aplicação é executada localmente via **Node.js** com gerenciamento de processos pelo **PM2**.
- Um servidor **Express** é responsável por:
  - Servir os arquivos estáticos do frontend.
  - Expor endpoints de API para:
    - Listar arquivos da pasta `dataaulas/pdf` (GET).
    - Listar arquivos da pasta `dataaulas/videos` (GET).
    - Servir os arquivos de PDF e vídeo para o frontend (GET por nome de arquivo).
    - Receber upload de arquivos PDF e salvá-los em `dataaulas/pdf` (POST multipart/form-data).
    - Receber upload de arquivos de vídeo e salvá-los em `dataaulas/videos` (POST multipart/form-data).
- As pastas `dataaulas/pdf` e `dataaulas/videos` são criadas automaticamente pelo servidor caso não existam.
- O frontend consome os endpoints do backend para listar e exibir os arquivos, e para enviar novos arquivos via botão de importação.
- A exportação de questões em PDF, relatórios individuais e relatório coletivo de alunos são realizados inteiramente no frontend usando JavaScript puro, sem envolvimento do backend.

---

## 7. Regras de Negócio e Lógica

| Regra | Descrição |
|---|---|
| Servidor local Node.js + PM2 | A aplicação roda via servidor Express gerenciado pelo PM2, substituindo o acesso direto via MeDo |
| Upload de arquivos | O botão Importar PDF envia arquivos para `dataaulas/pdf` e o botão Importar Vídeo envia para `dataaulas/videos` via API do backend |
| Listagem de arquivos | O frontend consulta o backend para obter a lista atualizada de PDFs e vídeos após cada upload |
| Criação automática de pastas | O servidor cria `dataaulas/pdf` e `dataaulas/videos` automaticamente se não existirem |
| Senha para resposta correta | O botão de mostrar resposta nas questões só é habilitado após validação da senha `password` |
| Tachado de ementa | Clicar no tópico alterna entre tachado e não tachado |
| Persistência local | Todos os dados (ementa, questões, alunos, chamadas, currículo, tema do visualizador, pesos e médias) são salvos no localStorage |
| Compartilhamento de dados | Dados do currículo (nome, cargo, e-mail, LinkedIn, competências) alimentam automaticamente a landing page da Home |
| Campos dinâmicos de alunos | O professor pode adicionar novos campos de prova e trabalho além dos padrões |
| CRUD de provas por aluno | O professor pode adicionar ou remover provas diretamente no card do aluno |
| Alunos na chamada | A lista de alunos disponível na chamada é importada do cadastro de alunos |
| Formato de data na chamada | A data de cada chamada deve ser registrada e exibida no formato dd/mm/aa |
| Dados pré-populados | Home e Editor de Currículo são inicializados com todos os dados reais de Milton Carlos Ribeiro, incluindo nome, 42 anos, casado, e toda a experiência profissional completa |
| Rotação do PDF | A rotação é aplicada visualmente em incrementos de 90° (0°, 90°, 180°, 270°) sem recarregar o arquivo |
| Fullscreen do PDF | No modo fullscreen, a interface da aplicação é ocultada; o PDF ocupa toda a tela respeitando o aspect ratio, com barra de scroll vertical quando necessário |
| Fullscreen do vídeo | O botão de fullscreen do player aciona o modo fullscreen nativo do navegador; permanece funcional em qualquer estado do player (reproduzindo, pausado ou após troca de vídeo) |
| Exportação de currículo em PDF | Funcionalidade em desenvolvimento; botão exibido como desabilitado com indicação visual clara |
| Suporte UTF-8 no visualizador de PDF | O visualizador aceita e renderiza corretamente arquivos PDF com codificação UTF-8, incluindo caracteres especiais e acentuação |
| Seletor de categoria do visualizador de PDF | Posicionado como último elemento da interface do visualizador; permite selecionar entre GRADUAÇÃO e PÓS GRADUAÇÃO |
| Tema Dracula no visualizador de PDF | Aplica esquema de cores Dracula (fundo escuro roxo/cinza, texto claro, destaques em roxo/rosa/verde) com letras em tamanho grande |
| Tema Atom no visualizador de PDF | Aplica esquema de cores Atom One Dark (fundo cinza azulado, texto claro, destaques em azul/laranja/verde) com letras em tamanho grande |
| Tema Normal no visualizador de PDF | Mantém o estilo padrão do visualizador sem alterações de esquema de cores ou tamanho de fonte |
| Persistência de tema | A preferência de tema selecionada pelo usuário é salva no localStorage e restaurada na próxima sessão |
| Botão de troca de tema reposicionado | O botão de troca de tema é exibido fora da área principal de leitura do PDF, em barra de controles superior ou painel lateral separado |
| Aba lateral compacta | Os rótulos da navegação lateral são exibidos de forma reduzida (texto abreviado ou ícone com tooltip) |
| Layout de card de questões | O card de cada questão se ajusta dinamicamente para conter enunciado e alternativas sem overflow; alternativas posicionadas abaixo do enunciado em linhas separadas |
| Formulário de cabeçalho para exportação de questões | Antes de exportar, o professor preenche os campos: Instituição, Local, Data, Nome do Curso, Turma, Número da Sala, Campo de Nota e Nome do Docente |
| Ordem no PDF de questões exportado | Cabeçalho → Campo de Nota → Carimbo Digital do Docente → Questões |
| Campo de Nota no PDF de questões | O PDF exportado inclui área reservada rotulada 「Nota: ___________」 para preenchimento manual pelo aluno |
| Respostas corretas no PDF exportado | As respostas corretas não são incluídas no PDF exportado de questões |
| Carimbo digital do docente | Gerado automaticamente a partir do campo Nome do Docente; posicionado acima das questões no PDF exportado; borda estilo carimbo antigo e texto em azul |
| Exportação de questões em PDF no frontend | A geração do PDF de questões é realizada inteiramente no lado do cliente usando JavaScript puro (.js puro), sem envolvimento do backend |
| Cálculo de média ponderada do aluno | A média é calculada somando (nota × peso) de cada trabalho entregue, cada prova e atividades em grupo, respeitando os pesos configurados pelo professor |
| Peso dos trabalhos | Apenas trabalhos marcados como entregues participam do cálculo; cada trabalho possui campo de peso em decimal |
| Peso das provas | Cada prova possui campo de nota e campo de peso em decimal; o professor pode adicionar ou remover provas via CRUD |
| Peso das atividades em grupo | Campo de porcentagem/peso em decimal para atividades em grupo; considera o campo 「Apresentou trabalho em grupo」 do cadastro |
| Cálculo por questionário | O professor informa a quantidade de perguntas; o sistema divide 100% pela quantidade para obter o valor de cada pergunta |
| Soma de pesos = 100% | O painel de composição da nota exibe a soma atual dos pesos; alerta visual se a soma não for 100% |
| Média de aprovação configurável | Campo pré-configurado com valor padrão 0,6; editável pelo professor; usado para determinar status do aluno |
| Status automático do aluno | Média abaixo da média de aprovação → status 「Reprovado」 no card; igual ou acima → status 「Aprovado」 |
| Relatório individual em PDF | Gerado por JS puro no frontend; contém dados do aluno, entregas, notas, média e status |
| Relatório coletivo em PDF | Gerado por JS puro no frontend; contém relatório de todos os alunos em um único documento; destinado à diretoria |

---

## 8. Exceções e Casos de Borda

| Situação | Comportamento esperado |
|---|---|
| Pasta `dataaulas/pdf` ou `dataaulas/videos` vazia | Exibir mensagem informativa: nenhum arquivo encontrado na pasta |
| Pasta inacessível ou erro no servidor | Exibir mensagem de erro de comunicação com o servidor |
| Upload de arquivo com nome duplicado | Sobrescrever o arquivo existente ou adicionar sufixo numérico para evitar conflito |
| Upload de arquivo com formato inválido | Exibir mensagem de erro indicando que o formato não é suportado |
| PDF com muitas páginas | Navegação paginada, sem travamento da interface |
| Senha incorreta em questões | Exibir mensagem de erro, manter botão bloqueado |
| localStorage cheio ou indisponível | Exibir aviso ao usuário sobre falha ao salvar |
| Aluno sem nota preenchida | Campo exibido como vazio, sem valor padrão; não participa do cálculo de média |
| Exportação de PDF do currículo | Botão exibido como desabilitado; nenhuma ação executada ao clicar |
| Nenhum aluno cadastrado ao criar chamada | Exibir mensagem informativa indicando que não há alunos cadastrados |
| Data de chamada inválida | Exibir mensagem de erro e impedir o salvamento |
| Rotação do PDF com documento de múltiplas páginas | A rotação é aplicada à página atualmente exibida; ao navegar entre páginas, a rotação selecionada é mantida |
| Saída do fullscreen do PDF via tecla Esc | A interface da aplicação é restaurada normalmente sem perda de estado do visualizador |
| Troca de vídeo durante reprodução | O player interrompe o vídeo atual, carrega o novo vídeo e o botão de fullscreen permanece funcional |
| Tentativa de acionar fullscreen do vídeo sem vídeo carregado | Botão de fullscreen permanece inativo ou exibe mensagem indicando que nenhum vídeo está selecionado |
| PDF com caracteres especiais ou acentuação (UTF-8) | O visualizador renderiza corretamente todos os caracteres sem distorção ou substituição por símbolos inválidos |
| Troca de tema durante exibição de PDF | O novo tema é aplicado imediatamente sem recarregar o arquivo; a página e rotação atuais são preservadas |
| localStorage indisponível ao restaurar tema | O visualizador inicia com o Tema Normal como padrão |
| Exportação de questões com formulário de cabeçalho incompleto | Exibir mensagem de erro indicando os campos obrigatórios não preenchidos e impedir a exportação |
| Nenhuma questão criada ao tentar exportar | Exibir mensagem informativa indicando que não há questões para exportar |
| Campo Nome do Docente vazio ao exportar | Exibir mensagem de erro e impedir a exportação; o carimbo não pode ser gerado sem o nome do docente |
| Falha na geração do PDF de questões no frontend | Exibir mensagem de erro genérica informando que a exportação falhou e orientando o usuário a tentar novamente |
| Soma dos pesos diferente de 100% | Exibir alerta visual no painel de composição da nota; o cálculo pode ser executado mas o professor é avisado da inconsistência |
| Aluno sem nenhuma nota ou entrega registrada | Média calculada como zero; status exibido conforme a média de aprovação configurada |
| Quantidade de perguntas do questionário igual a zero | Exibir mensagem de erro indicando que a quantidade deve ser maior que zero |
| Nenhum aluno cadastrado ao tentar exportar relatório geral | Exibir mensagem informativa indicando que não há alunos cadastrados |
| Falha na geração do relatório PDF individual ou coletivo | Exibir mensagem de erro genérica orientando o usuário a tentar novamente |
| Texto do enunciado ou alternativas muito longo no card de questão | O card expande verticalmente para acomodar o conteúdo sem overflow; não há truncamento de texto |

---

## 9. Critérios de Aceitação

- A aplicação inicia corretamente via PM2 com Node.js e fica acessível no navegador via endereço local.
- O servidor Express cria automaticamente as pastas `dataaulas/pdf` e `dataaulas/videos` caso não existam.
- O botão Importar PDF na tela de Visualizador de PDF permite selecionar arquivos PDF locais, enviá-los ao servidor e atualizá-los na listagem imediatamente após o upload.
- O botão Importar Vídeo na tela de Acervo de Vídeos permite selecionar arquivos de vídeo locais, enviá-los ao servidor e atualizá-los na listagem imediatamente após o upload.
- PDFs da pasta `dataaulas/pdf` são listados e exibidos no visualizador estilizado.
- Os botões de rotação do PDF permitem girar o documento em 90°, 180°, 270° e retornar a 0°, com a rotação aplicada visualmente sem recarregar o arquivo.
- O modo fullscreen do PDF oculta completamente a interface da aplicação, exibe o documento ocupando toda a área da tela com aspect ratio preservado e barra de scroll vertical disponível quando necessário; o botão ou tecla Esc retorna à interface normal.
- O visualizador de PDF aceita e renderiza corretamente arquivos com codificação UTF-8, incluindo caracteres especiais e acentuação.
- O seletor de categoria (GRADUAÇÃO / PÓS GRADUAÇÃO) é exibido como último elemento da interface do visualizador de PDF e funciona corretamente.
- O botão de troca de tema está posicionado fora da área principal de leitura do PDF (barra de controles superior ou painel lateral separado), sem interferir na visualização do documento.
- O Tema Dracula aplica esquema de cores escuro em tons de roxo/cinza com destaques em roxo, rosa e verde, e exibe as letras em tamanho grande.
- O Tema Atom aplica esquema de cores escuro em tons de cinza azulado com destaques em azul, laranja e verde, e exibe as letras em tamanho grande.
- O Tema Normal mantém o estilo padrão do visualizador sem alterações de esquema de cores ou tamanho de fonte.
- A troca de tema é aplicada imediatamente sem recarregar o arquivo PDF, preservando a página e rotação atuais.
- A preferência de tema é salva no localStorage e restaurada corretamente na próxima sessão.
- Vídeos da pasta `dataaulas/videos` são listados e reproduzidos corretamente no player estilizado, com controles de play, pause, barra de progresso e volume funcionando de forma estável.
- O botão de fullscreen do player de vídeo aciona o modo fullscreen nativo do navegador com o vídeo ocupando toda a tela e aspect ratio preservado; o botão permanece funcional independentemente do estado do player.
- O botão de exportação de currículo em PDF é exibido como desabilitado com indicação visual de 「Em desenvolvimento」, sem executar nenhuma ação ao ser clicado.
- A Home exibe a landing page de apresentação do professor com os dados corretos: nome Milton Carlos Ribeiro, 42 anos, casado, título PM | GD | SCRUM | IA | TQM | BIGDATA | JAVA | KOTLIN, e-mail mcr.milton@gmail.com, LinkedIn www.linkedin.com/in/milton-carlosribeiro-62635959, localização Santa Bárbara d'Oeste, São Paulo, Brasil.
- A timeline da Home exibe toda a trajetória profissional completa (11 experiências), formações acadêmicas e certificações conforme os dados fornecidos.
- Cada funcionalidade principal está em uma tela separada.
- A aba lateral exibe os rótulos de navegação de forma compacta (texto reduzido ou ícone com tooltip).
- A ementa permite digitar, salvar e tachar/destachar tópicos individualmente.
- Os cards de questões de múltipla escolha exibem enunciado e alternativas completamente dentro dos limites do card, sem overflow, com alternativas posicionadas abaixo do enunciado em linhas separadas.
- As questões de múltipla escolha exibem a resposta correta somente após validação da senha `password`.
- O PDF exportado de questões apresenta a seguinte ordem: cabeçalho → campo de nota → carimbo digital do docente → questões.
- O carimbo digital é renderizado em azul com borda estilo carimbo antigo e exibe o nome completo do docente conforme digitado, posicionado acima das questões no PDF.
- As respostas corretas não aparecem no PDF exportado de questões.
- A exportação de questões em PDF é realizada inteiramente no frontend usando JavaScript puro, sem dependência do backend.
- O cadastro de alunos permite CRUD completo com todos os campos descritos, incluindo adição dinâmica de campos de prova e trabalho.
- O CRUD de provas no card do aluno permite adicionar e remover provas individualmente.
- O painel de cálculo de média exibe campos de peso em decimal para cada trabalho entregue e para cada prova.
- O campo de porcentagem de atividades em grupo está disponível no painel de cálculo.
- O campo de quantidade de perguntas do questionário calcula e exibe o valor por pergunta automaticamente.
- O painel de composição da nota exibe a soma atual dos pesos e alerta visualmente quando a soma difere de 100%.
- O campo 「Média de Aprovação」 está pré-configurado com 0,6 e é editável pelo professor.
- O status 「Aprovado」 ou 「Reprovado」 é exibido automaticamente no card do aluno com base na média calculada e na média de aprovação configurada.
- O botão 「Exportar Relatório PDF」 no card do aluno gera corretamente o relatório individual em PDF usando JavaScript puro, contendo dados pessoais, entregas, notas, média e status.
- O botão 「Exportar Relatório Geral PDF」 na página de Gestão de Alunos gera corretamente o relatório coletivo em PDF usando JavaScript puro, com todos os alunos cadastrados.
- A página de Lista de Chamadas permite CRUD completo de registros de chamada com data no formato dd/mm/aa e marcação de presença por aluno.
- O editor de currículo permite CRUD em todas as seções e salva no localStorage.
- Os dados do currículo são refletidos na landing page da Home.
- Toda a navegação entre telas é fluida e funcional.

---

## 10. Funcionalidades Fora do Escopo desta Versão

- Exportação do currículo em PDF (em desenvolvimento, não disponível nesta versão).
- Autenticação de usuários ou sistema de login.
- Armazenamento em nuvem ou banco de dados remoto.
- Compartilhamento de conteúdo com alunos via link.
- Correção automática de questões ou geração de relatórios de desempenho automatizados além dos descritos.
- Suporte a múltiplos professores ou perfis.
- Aplicativo mobile ou PWA.