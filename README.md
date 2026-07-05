# Meu Projeto - Sistema de Contatos Fullstack

Este é um projeto fullstack que consiste em um formulário de contato no frontend que envia informações para uma API Rest no backend, persistindo os dados em um banco de dados PostgreSQL.

---

## 🏗️ Entidades do Banco de Dados (Prisma)

O sistema possui uma entidade principal chamada **Mensagem**, mapeada no PostgreSQL através do Prisma:

### Mensagem
* `id` (String / UUID): Identificador único do registro (Chave Primária).
* `nome` (String): Nome de quem enviou a mensagem.
* `mensagem` (String): Conteúdo do texto enviado.
* `createdAt` (DateTime): Data e hora automática da criação do registro.

---

## 🔌 Endpoints Principais (API)

A API roda por padrão em `http://localhost:3000` e possui as seguintes rotas para o CRUD:

| Método | Endpoint | Descrição | Parâmetros / Corpo (JSON) |
| :--- | :--- | :--- | :--- |
| **POST** | `/contato` | Cria uma nova mensagem | `{ "nome": "...", "mensagem": "..." }` |
| **GET** | `/contato` | Lista todas as mensagens salvas | Nenhum |
| **PUT** | `/contato/:id` | Atualiza uma mensagem existente | ID na URL + `{ "nome": "...", "mensagem": "..." }` |
| **DELETE** | `/contato/:id` | Remove uma mensagem do banco | ID na URL |

---

## 🔑 Variáveis de Ambiente

O backend depende de um arquivo `.env` localizado na raiz da pasta `/backend` com a seguinte variável configurada:

```env
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/contato?schema=public"