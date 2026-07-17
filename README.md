# Protótipo SIG

Protótipo desenvolvido com **Next.js**, **React Leaflet**, **React Flow**, **Ant Design** e **JSON Server** para experimentação de funcionalidades de geoprocessamento, manipulação de entidades geográficas e visualização de grafos. O projeto foi desenvolvido no âmbito de um projeto de pesquisa do Governo Federal voltado à exploração de conceitos de Sistemas de Informação Geográfica (SIG).

## Tecnologias

- Next.js 16
- React 19
- TypeScript
- Ant Design
- React Leaflet / Leaflet
- React Flow
- Axios
- JSON Server

## Estrutura do projeto

```
components/
├── Graph/
├── Layout/
├── Location/
├── Map/
├── Relation/
├── Sidebar/
└── Zone/

services/
types/
utils/

mocks/
└── db.json
```

## Instalação

Clone o repositório:

```bash
git clone <url-do-repositorio>
```

Instale as dependências:

```bash
npm install
```

## Executando o projeto

O projeto utiliza dois servidores:

- Frontend (Next.js)
- API simulada (JSON Server)

### 1. Inicie a API

```bash
npm run server
```

A API ficará disponível em:

```
http://localhost:3001
```

### 2. Inicie o frontend

Em outro terminal:

```bash
npm run dev
```

A aplicação ficará disponível em:

```
http://localhost:3000
```

## Scripts

```bash
npm run dev       # Executa o frontend
npm run server    # Executa o JSON Server
npm run build     # Gera a build de produção
npm run start     # Executa a build
npm run lint      # Executa o ESLint
```

## Funcionalidades implementadas

### Locais

- Cadastro de novos locais
- Visualização dos locais no mapa
- Modal com informações do local
- Persistência dos dados utilizando JSON Server

### Zonas

- Criação de zonas por meio de polígonos
- Visualização das zonas no mapa
- Listagem dos locais contidos em uma zona utilizando o algoritmo **Ray Casting**

### Relações

- Criação de relações entre dois locais
- Nomeação das relações
- Representação das relações por linhas (Polyline)
- Exibição do nome da relação por meio de Tooltip

### Grafo

- Visualização dos mesmos locais e relações utilizando React Flow
- Nós arrastáveis
- Relações representadas como arestas

## Organização

A aplicação foi dividida em componentes independentes para facilitar manutenção e reutilização, enquanto os serviços centralizam a comunicação com a API simulada através do Axios.
