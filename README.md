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

## 📖 Utilizando o Swagger

A documentação interativa da API está disponível através do Swagger UI em `http://localhost:3000/api`. Através desta interface, você pode:

1. **Visualizar Endpoints**
   - Acesse `http://localhost:3000/api`
   - Todos os endpoints estão agrupados por tags e possuem descrições detalhadas

2. **Testar Endpoints**
   - Clique no endpoint que deseja testar
   - Clique no botão "Try it out"
   - Preencha os parâmetros necessários
   - Clique em "Execute" para fazer a requisição

3. **Upload de Arquivo Excel**
   - Localize o endpoint POST /tags/upload
   - Clique em "Try it out"
   - Use o botão "Choose File" para selecionar sua planilha Excel
   - Clique em "Execute" para fazer o upload

4. **Buscar/Atualizar/Deletar Tags**
   - Localize o endpoint desejado (GET, PUT ou DELETE /tags/{tag})
   - Clique em "Try it out"
   - Insira o ID da tag no campo correspondente
   - Para atualizações (PUT), forneça os dados no formato JSON requerido
   - Clique em "Execute"

5. **Respostas e Códigos de Status**
   - Cada endpoint mostra os possíveis códigos de status
   - Exemplos de respostas são fornecidos
   - Schemas completos dos objetos são documentados

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

## 🔍 Exemplos de Uso via Swagger

### Upload de Planilha
1. Acesse `/api` no navegador
2. Localize a seção "tags"
3. Clique em POST /tags/upload
4. Clique em "Try it out"
5. Selecione o arquivo Excel
6. Clique em "Execute"

### Atualizar Tag
1. Acesse `/api` no navegador
2. Localize PUT /tags/{tag}
3. Clique em "Try it out"
4. Insira o ID da tag
5. Forneça o JSON de atualização:
```json
{
  "status": 2,
  "price": 15.50
}
```
6. Clique em "Execute"

## 📫 Contato
Para questões e sugestões, por favor abra uma issue no repositório.
