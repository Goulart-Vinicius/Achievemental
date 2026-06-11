# Achievimental

## Visão Geral

A ideia principal do projeto é desenvolver um Web App que reúna as conquistas do Xbox, PlayStation e Steam, proporcionando aos usuários uma visualização unificada e centralizada de todo o seu progresso no mundo dos games.

## Arquitetura

A princípio, o projeto está dividido em duas aplicações principais: uma para o _backend_ e outra para o _frontend_. A arquitetura de infraestrutura final (como _Monolith_ ou _Microservices_) será definida conforme o amadurecimento da plataforma.

### Backend

O _backend_ está sendo construído em Node.js sobre o ecossistema do **Express**, fornecendo comunicação via **API REST**.

#### Design Patterns

Para garantir que o código seja limpo, testável e escalável, o projeto adota rigorosamente padrões de projeto (_Design Patterns_), destacando-se:

- **Facade Pattern:** Para simplificar o consumo das complexas APIs externas.
- **Factory Pattern:** Para instanciar dinamicamente as integrações de cada plataforma.
- **Adapter Pattern:** Para padronizar a comunicação com diferentes serviços de terceiros (como a API do Xbox).

#### Estrutura de Diretórios

O _backend_ utiliza uma arquitetura baseada em _services_ e _routes_, com uma separação clara de responsabilidades. O esquema de pastas organiza-se da seguinte forma:

```txt
src/
├── errors/
├── routes/
├── services/
│   └── xbox/
│       ├── adapter/
│       ├── facade/
│       ├── factory/
│       └── interface/
├── app.ts
└── server.ts

```

## Frontend

O _frontend_ foi projetado como uma Single Page Application (SPA), utilizando a biblioteca **React** em conjunto com o **Vite** para garantir um ambiente de desenvolvimento rápido e otimizado.

#### Estrutura de Diretórios

Até o momento, o esquema de pastas inicial foca em separar os componentes visuais dos serviços de consumo de API:

```txt
src/
├── components/
├── services/
│   └── xbox/
├── App.ts
└── main.ts

```
