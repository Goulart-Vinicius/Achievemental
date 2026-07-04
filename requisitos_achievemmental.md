# Documento de Especificação de Requisitos: Achievemental

Este documento detalha os requisitos, regras de negócio, restrições e análise de viabilidade técnica para a aplicação **Achievemental**, que tem como objetivo centralizar e unificar o progresso de conquistas de jogadores nas plataformas Xbox, PlayStation e Steam.

---

## 1. Visão Geral do Projeto

### 1.1 Problema / Oportunidade

Atualmente, jogadores que utilizam múltiplas plataformas de videogame (consoles Xbox, PlayStation e computadores via Steam) sofrem com a fragmentação de seu histórico de conquistas. Para acompanhar seu progresso geral ou buscar o fechamento completo de um jogo ("platinar"), o usuário precisa navegar por interfaces distintas e fragmentadas. Não existe uma solução centralizada e amigável que consolide essas informações em um único perfil unificado.

### 1.2 Concepção e Escopo da Solução

O **Achievemental** será uma aplicação web que consumirá dados das APIs (oficiais e não-oficiais) do Xbox, PlayStation e Steam para consolidar o perfil do usuário, exibindo suas conquistas de forma padronizada, organizada e comparável em um dashboard responsivo.

### 1.3 Benefícios Esperados

- **Centralização:** Um único painel para visualizar o progresso histórico do jogador.
- **Acompanhamento de Completude (100%):** Visualização clara de conquistas obtidas vs. faltantes em cada jogo.
- **Engajamento:** Facilidade de compartilhar e comparar o perfil consolidado com outros jogadores (perfil público).
- **Economia de Tempo:** Eliminação da necessidade de múltiplos logins e acessos a diferentes apps de jogos para consultar conquistas.

---

## 2. Partes Interessadas (Stakeholders) e Usuários

### 2.1 Stakeholders

- **Vinícius A. Goulart:** Solicitante, Dono do Produto (Product Owner) e Desenvolvedor Principal.

### 2.2 Perfis de Usuário

- **Usuário Comum (Jogador):** Qualquer pessoa com acesso à internet que possui contas em plataformas de jogos e deseja centralizar, visualizar e gerenciar suas conquistas pessoais.
- **Visitante (Terceiros):** Usuários que desejam visualizar o perfil público e conquistas de outros jogadores cadastrados no sistema.

---

## 3. Análise de Viabilidade Técnica (Integração com APIs)

A viabilidade técnica do sistema depende da capacidade de ler de forma segura e eficiente os dados de conquistas das três principais redes. A análise a seguir detalha o estado de integração para cada plataforma:

### 3.1 Xbox Live

- **API Oficial:** Disponibilizada pela Microsoft exclusivamente para desenvolvedores cadastrados em seus programas de parceiros (ID@Xbox), o que inviabiliza o uso direto em projetos independentes na fase atual.
- **Alternativa Viável (Não-Oficial):** **OpenXBL (https://xbl.io/)** ou a API **xapi.us** (referida como `xapi`). Ambas atuam como wrappers de autenticação do Xbox Live, expondo endpoints REST para consulta de perfis, jogos e conquistas a partir de um token de autorização.

### 3.2 PlayStation Network (PSN)

- **API Oficial:** A Sony não disponibiliza uma API pública oficial para consulta de troféus por aplicações de terceiros.
- **Alternativa Viável (Não-Oficial):** Uso da biblioteca de comunidade **`psn-api`** (Node.js/TypeScript).
  - _Mecanismo de Autenticação:_ Utiliza o código de sessão de login **NPSSO** (obtido via cookie de sessão ativa do usuário após login no site da PlayStation).
  - _Funcionalidades:_ Permite obter a lista de jogos jogados, troféus obtidos, troféus restantes e detalhes da conta do usuário de forma programática.

### 3.3 Steam (Valve)

- **API Oficial:** A Valve fornece uma API pública oficial e documentada (Steamworks Web API).
  - _Mecanismo de Autenticação:_ Chave de API Web do Steam (gerada gratuitamente pelo usuário) combinada com o **SteamID64** (identificador público de 64 bits do usuário).
  - _Endpoints Utilizados:_
    - `ISteamUserStats/GetPlayerAchievements/v1/` para obter os dados de desbloqueio de conquistas.
    - `ISteamUserStats/GetSchemaForGame/v2/` para obter metadados das conquistas (nomes amigáveis, descrições e ícones).
  - _Requisito:_ O perfil do usuário na Steam e os detalhes dos jogos devem estar configurados como "Público" nas opções de privacidade da plataforma para viabilizar a leitura.

---

## 4. Perguntas e Respostas de Negócio (Q&A)

- **Quem está solicitando o sistema?**
  - Vinícius A. Goulart.
- **Quais problemas/necessidades o sistema vai atender?**
  - Centralização e unificação de troféus e conquistas das plataformas de videogame em um único local, permitindo rápida visualização de progresso e estatísticas de completude.
- **Quem irá utilizar o sistema?**
  - Qualquer pessoa com acesso à internet que queira ver as conquistas de sua conta vinculada ou visualizar o perfil público de terceiros.
- **Quais as qualidades fundamentais que o sistema deve possuir?**
  - Login de usuário, vinculação de contas externas com o perfil e visualização de conquistas de forma consolidada e fluida.

---

## 5. Requisitos de Negócio (RN)

| ID        | Requisito de Negócio                                                                                                                          | Tipo | Nível   |
| :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :--- | :------ |
| **RN-01** | A aplicação deve unificar a visualização de conquistas de diferentes plataformas de videogame (Xbox, PlayStation e Steam) em um único portal. | RF   | Negócio |
| **RN-02** | O sistema deve resolver a fragmentação de dados que obriga o jogador a acessar portais individuais para medir seu progresso.                  | RN   | Negócio |
| **RN-03** | O sistema deve fornecer estatísticas consolidadas e métricas de completude gerais (ex: total de jogos completados 100%, progresso médio).     | RF   | Negócio |

---

## 6. Requisitos de Usuário (REQ-U)

| ID           | Requisito (Linguagem Natural)                                                                                                                                      | Tipo | Nível   |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--- | :------ |
| **REQ-U-01** | O usuário deve conseguir visualizar seu perfil consolidado com dados integrados de todas as contas vinculadas.                                                     | RF   | Usuário |
| **REQ-U-02** | O usuário deve visualizar suas conquistas agrupadas por jogo e por plataforma de origem.                                                                           | RF   | Usuário |
| **REQ-U-03** | O usuário deve ser capaz de pesquisar por jogos ou conquistas específicas em seu perfil.                                                                           | RF   | Usuário |
| **REQ-U-04** | O usuário deve conseguir visualizar facilmente quais conquistas ainda faltam ser desbloqueadas para cada jogo.                                                     | RF   | Usuário |
| **REQ-U-05** | O usuário deve ser capaz de vincular suas contas externas (Xbox Live, PSN, Steam) fornecendo as credenciais ou identificadores necessários (Tokens, IDs públicos). | RF   | Usuário |
| **REQ-U-06** | O usuário deve conseguir se cadastrar e realizar login no próprio portal Achievemental para gerenciar suas configurações.                                          | RF   | Usuário |
| **REQ-U-07** | O usuário deve poder escolher se seu perfil unificado será público (visível para outros) ou privado.                                                               | RF   | Usuário |
| **REQ-U-08** | Um visitante deve conseguir visualizar perfis públicos de outros usuários do sistema ao pesquisar por eles ou acessar o link direto.                               | RF   | Usuário |

---

## 7. Requisitos de Sistema (REQ-S)

| ID           | Requisito de Sistema (Técnico / Implementação)                                                                                  | Tipo | Nível   |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------ | :--- | :------ |
| **REQ-S-01** | O sistema deve ter uma arquitetura Client-Server com o Front-end e o Back-end desacoplados.                                     | RNF  | Sistema |
| **REQ-S-02** | O Back-end deve ser uma API REST desenvolvida em Node.js (versão 22) usando o framework Express e linguagem TypeScript.         | RNF  | Sistema |
| **REQ-S-03** | O Front-end deve ser uma aplicação Single Page Application (SPA) desenvolvida com React, Vite e TypeScript.                     | RNF  | Sistema |
| **REQ-S-04** | A interface de usuário (UI) deve ser responsiva, adaptando-se para computadores, tablets e celulares.                           | RNF  | Sistema |
| **REQ-S-05** | O Back-end deve integrar-se à API "OpenXBL" (ou "xapi") para obter e cachear dados de conquistas do Xbox.                       | RF   | Sistema |
| **REQ-S-06** | O Back-end deve usar a biblioteca `psn-api` para obter e cachear dados de troféus da PlayStation via token NPSSO.               | RF   | Sistema |
| **REQ-S-07** | O Back-end deve consumir os endpoints oficiais da Steam Web API usando a chave de API cadastrada e o SteamID64 do usuário.      | RF   | Sistema |
| **REQ-S-08** | O código-fonte do back-end e front-end deve seguir Design Patterns adequados (ex: Clean Architecture, injeção de dependências). | RNF  | Sistema |
| **REQ-S-09** | O projeto deve utilizar ESLint e Prettier para padronização e regras de qualidade/estilo de código.                             | RNF  | Sistema |
| **REQ-S-10** | A aplicação deve possuir uma cobertura de testes unitários mínima de 80% (utilizando ferramentas como Jest ou Vitest).          | RNF  | Sistema |

---

## 8. Regras de Negócio e Domínio (RN)

| ID        | Regra                                                                                                                                                                                                                            | Requisito Associado          |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------- |
| **RN-01** | **Contabilização de Conquistas:** O progresso de conquistas de um jogo (obtidas vs. faltantes) deve ser calculado dinamicamente com base nas conquistas oficiais disponibilizadas pela plataforma de origem.                     | REQ-U-04                     |
| **RN-02** | **Privacidade e Acesso:** A extração de conquistas e exibição só será permitida se o perfil das plataformas de origem estiver público ou se o token de acesso fornecido (OAuth/NPSSO) tiver permissões suficientes para leitura. | REQ-U-05                     |
| **RN-03** | **Unicidade de Vínculo:** Uma conta de plataforma externa (ex: um SteamID específico) só poderá ser vinculada a uma única conta cadastrada no Achievemental por vez.                                                             | REQ-U-05, REQ-U-06           |
| **RN-04** | **Cachê de Dados:** O sistema deve manter um cachê temporário dos dados obtidos das APIs externas para evitar bloqueio por limites de taxa (rate limits) e garantir alta performance de carregamento das páginas.                | REQ-S-05, REQ-S-06, REQ-S-07 |

---

## 9. Restrições e Premissas

| Tipo                       | Descrição                                                                                                                                                 |
| :------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Restrição Técnica**      | Uso exclusivo da stack de tecnologias acordada: Node.js 22, Express, React, Vite, TypeScript, ESLint, e 80% de cobertura de testes.                       |
| **Restrição de Segurança** | Os tokens NPSSO (PlayStation) e chaves de API devem ser armazenados com criptografia forte no banco de dados e nunca expostos no client-side (Front-end). |
| **Premissa**               | O usuário está de acordo em fornecer suas informações de perfil público ou credenciais de sessão (como o NPSSO) para habilitar a extração de dados.       |
| **Premissa**               | As APIs não-oficiais (OpenXBL, psn-api) continuarão operacionais e acessíveis sem bloqueio por parte das detentoras dos consoles.                         |

---

## 10. Critérios de Aceite (para requisitos críticos)

### CA-01: Visualização Agrupada de Jogos (REQ-U-02)

- **Dado** que o usuário está autenticado e possui contas do Xbox e PlayStation vinculadas,
- **Quando** ele acessa o dashboard de jogos,
- **Então** o sistema deve exibir de forma clara e consolidada os jogos jogados (ex: "Halo Infinite" rotulado com a marca/logo do Xbox e "God of War" rotulado com a marca/logo do PlayStation).

### CA-02: Exibição de Conquistas Faltantes (REQ-U-04)

- **Dado** que um jogo possui 40 conquistas totais e o usuário desbloqueou 15 delas,
- **Quando** o usuário abre a página de detalhes daquele jogo,
- **Então** o sistema deve exibir uma barra de progresso em 37.5%, listar as 15 conquistas desbloqueadas (com data/hora se disponível) e destacar visualmente as 25 conquistas restantes com suas respectivas dicas de desbloqueio.

### CA-03: Cobertura e Pipeline de Testes (REQ-S-10)

- **Dado** a execução da rotina de build ou testes (`npm run test`),
- **Quando** os testes unitários forem concluídos,
- **Então** o gerador de cobertura de código deve indicar um percentual global de linhas testadas maior ou igual a 80%, abortando o deploy ou build em caso negativo.
