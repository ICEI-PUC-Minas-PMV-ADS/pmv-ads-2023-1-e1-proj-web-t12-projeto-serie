# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas

Daniel Silveira tem 17 anos, é estudante, gosta de praticar esportes, viajar, sair com os amigos para ver séries. Ele se frustra quando não consegue as coisas de forma rápida ou suas expectativas não são atendidas. Daniel busca por séries divertidas que  o ajudem a relaxar após um dia de atividades para ver sozinho ou com amigos.

Ana Silva tem 24 anos, é advogada. Ela gosta de ler livros de ficção, ver filmes e séries bem avaliados e gosta de ouvir MPB. Ela se frustra quando não encontra uma série específica na plataforma. Também não gosta quando não consegue achar uma série em seu idioma original sem legenda. Ana é apaixonada por séries e sempre procura por novos séries que sejam sucesso de crítica ou que filmes intrigantes que a faça pensar. 


## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Ana Silva           |encontrar séries elogiadas pela crítica| ver séries que podem estar em premiações|
|Administrador       |Filtro por avaliação da crítica     |Usuarios encontrarem séries aclamados facilmente |
|Ana Silva           |pesquisa de diretores e atores      |poder encontrar séries com artistas que já gosta |
|Administrador       |Filtro por artistas                 |Usuarios encontrarem artistas conhecidos mais facil que podem ser séries que eles já gostem |
|Daniel Silveira     |rápida escolha de séries baseadas em gêneros|ver séries do gênero entre amigos |
|Administrador       |Filtro por genêro                   |Usuarios poderem escolher séries baseadas em uma categoria |

## Requisitos

O escopo funcional do projeto é definido por meio dos requisitos funcionais que descrevem as possibilidades interação dos usuários, bem como os requisitos não funcionais que descrevem os aspectos que o sistema deverá apresentar de maneira geral. Estes requisitos são apresentados a seguir.

### Requisitos Funcionais

A tabela a seguir apresenta os requisitos do projeto, identificando a prioridade em que os mesmos devem ser entregues.

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| O site deverá apresentar, em sua tela inicial, uma lista com variedade de conteúdos de mídia para streaming, populada via APIs externas | ALTA | 
|RF-002| O site deverá seccionar e apresentar, em sua tela inicial, os conteúdos de mídia divididos por idioma de origem, ordenados do idioma mais buscado para o menos buscado | ALTA |
|RF-003| O site deve permitir ao usuário pesquisar por um idioma específico e receber uma lista de mídias relacionadas ao mesmo | ALTA |
|RF-004| O site deve permitir ao usuário visualizar de forma específica cada conteúdo de mídia, seja este um filme, série ou outro formato relacionado, podendo visualizar sua sinopse, dados técnicos, plataforma de streaming onde ele se encontra e avaliação geral do público (de 1 a 5 estrelas) | MÉDIA |
|RF-005| O site deve permitir ao usuário avaliar o filme em uma nota de 1 a 5 estrelas | MÉDIA |
|RF-006| O site deve incluir um sistema de idiomas favoritos para posterior implementação de algoritmo de recomendação | BAIXA |
|RF-007| O site deve incluir um sistema de mídias favoritas para posterior implementação de algoritmo de recomendação | BAIXA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O site deve ser publicado em um ambiente acessível publicamente na Internet (Repl.it, GitHub Pages, Heroku) | ALTA | 
|RNF-002| O site deverá ser responsivo permitindo a visualização em um celular de forma adequada |  ALTA | 
|RNF-003| O site deve ter bom nível de contraste entre os elementos da tela em conformidade |  MÉDIA | 
|RNF-004| O site deve ser compatível com os principais navegadores do mercado (Google Chrome, Firefox, Microsoft Edge) |  ALTA | 
|RNF-005| O site deverá ser performático em desempenhar satisfatoriamente, independentemente dos recursos computacionais ou de rede do usuário |  MÉDIA | 

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue no final do semestre letivo (eixo 1) |
|02| O site deverá ser feito utilizando o ecossistema Javascript |
|03| O site não deverá ter anúncios ou ser monetizado |
|04| O site deverá ser desenvolvido através da metodologia SCRUM, estando vedada a alteração de metodologia durante o desenvolvimento |
|05| O site não deverá depender de acesso a um backend, sendo todo armazenamento feito exclusivamente em Local Storage |
