# API de Gerenciamento de Etiquetas

## 📋 Sobre o Projeto
Este projeto é uma API REST desenvolvida com NestJS para gerenciamento de etiquetas (tags). A API permite o processamento de planilhas de etiquetas e oferece operações CRUD (Create, Read, Update, Delete) para manipulação dos dados.

## 🚀 Principais Funcionalidades
- Upload e processamento de planilhas Excel contendo dados de etiquetas
- Listagem de todas as etiquetas
- Busca de etiquetas específicas
- Atualização de informações de etiquetas
- Remoção de etiquetas
- Documentação automática com Swagger

## 🛠️ Tecnologias Utilizadas
- **[NestJS](https://nestjs.com/)**: Framework Node.js progressivo para construção de aplicações escaláveis
- **[TypeScript](https://www.typescriptlang.org/)**: Superset JavaScript que adiciona tipagem estática
- **[xlsx](https://www.npmjs.com/package/xlsx)**: Biblioteca para processamento de arquivos Excel
- **[Swagger/OpenAPI](https://swagger.io/)**: Documentação automática da API
- **[Jest](https://jestjs.io/)**: Framework de testes

## 📦 Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório
```bash
git clone [url-do-repositorio]
cd [nome-do-diretorio]
```

2. Instale as dependências
```bash
# Usando npm
npm install

# Usando yarn
yarn
```

## ⚡ Executando o Projeto

```bash
# Modo desenvolvimento
npm run start:dev
# ou
yarn start:dev

# Modo produção
npm run start
# ou
yarn start
```

A API estará disponível em `http://localhost:3000`
A documentação Swagger estará disponível em `http://localhost:3000/api`

## 📚 Endpoints da API

### Upload de Planilha
```
POST /tags/upload
Content-Type: multipart/form-data
```

### Listar Todas as Etiquetas
```
GET /tags
```

### Buscar Etiqueta Específica
```
GET /tags/:tag
```

### Atualizar Etiqueta
```
PUT /tags/:tag
Content-Type: application/json
```

### Deletar Etiqueta
```
DELETE /tags/:tag
```

## 🧪 Executando Testes

```bash
# Testes unitários
npm run test
# ou
yarn test
```

## 📝 Estrutura do Projeto
```
src/
├── tag/
│   ├── tag.controller.ts
│   ├── tag.service.ts
│   ├── tag.model.ts
│   └── tag.module.ts
├── app.module.ts
└── main.ts
```

## 💡 Formato da Planilha
A API espera uma planilha Excel com as seguintes colunas:
- Tag: Identificador único da etiqueta
- name: Nome do destinatário
- status: Status da etiqueta (número)
- source: Código postal
- price: Preço (número decimal)
