# 🚀 Fullstack Portfolio & Admin Dashboard

Aplicação web fullstack composta por um **Portfólio com Formulário de Contato**, um **Painel de Administração Protegido** e uma **API RESTful com Autenticação baseada em Sessões/Cookies**.

O projeto foi totalmente containerizado utilizando **Docker** e preparado para deploy na nuvem (**Railway**).

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**
* **HTML5 & JavaScript (ES6+)**: Estruturação e lógica assíncrona com Fetch API.
* **Tailwind CSS**: Estilização moderna e responsiva via CDN.
* **Nginx**: Web server em container para servir as páginas estáticas.

### **Backend**
* **Node.js & TypeScript**: Ambiente de execução e tipagem estática.
* **Express.js**: Framework para construção da API RESTful.
* **Express Session & Cookies**: Gerenciamento de sessões de autenticação seguras (Cross-Site support).
* **CORS**: Segurança e controle de acesso a origens cruzadas.
* **Prisma ORM**: Modelagem de dados e comunicação com o banco de dados.

### **Banco de Dados & Infraestrutura**
* **PostgreSQL**: Banco de dados relacional.
* **Docker & Docker Compose**: Containerização e orquestração dos serviços em ambiente local.
* **Railway**: Plataforma para deploy e hospedagem contínua do banco de dados, backend e frontend.

---

## 📂 Estrutura do Projeto

```text
meu-projeto/
├── backend/
│   ├── src/
│   │   ├── routes/        # Definição de rotas da API
│   │   └── server.ts      # Servidor Express, CORS e autenticação
│   ├── prisma/            # Schema e migrações do banco de dados
│   ├── Dockerfile         # Instruções de build do container backend
│   └── package.json
│
├── frontend/
│   ├── index.html         # Portfólio principal e formulário de contato
│   ├── login.html         # Tela de autenticação do painel admin
│   ├── admin.html         # Painel administrativo de mensagens
│   ├── scripts.js         # Lógica de envio do formulário
│   ├── apigithub.js       # Integração com a API do GitHub
│   └── Dockerfile         # Container Nginx para servir o frontend
│
└── docker-compose.yml     # Orquestração local (Postgres, Backend, Frontend)

🔑 Variáveis de Ambiente (.env)
Para rodar o backend localmente ou em produção, configure as seguintes variáveis:

# Banco de Dados
DATABASE_URL="postgresql://postgres:postgrespassword@localhost:5432/contato?schema=public"

# Configurações do Servidor
NODE_ENV="development" # Ou "production" na nuvem
PORT=3000
FRONTEND_URL="http://localhost:8080" # URL permitida no CORS
SESSION_SECRET="sua_chave_secreta_aqui_123"

🐳 Como Rodar Localmente com Docker

1. Clone o repositório:

git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
cd seu-repositorio

2. Suba o ambiente completo com Docker Compose:

docker-compose up --build

3. Acesse as aplicações no seu navegador:

Frontend / Portfólio: http://localhost:8080

Login Admin: http://localhost:8080/login.html
email: admin@email.com
senha: admin123

API Backend: http://localhost:3000

🌐 Deploy na Nuvem (Railway)

O projeto está configurado para deploy contínuo via Railway:

Database: Instância gerenciada do PostgreSQL.

Backend: Build automático via Dockerfile / TypeScript com suporte a HTTPS e proxy reverso.

Frontend: Servido via Nginx com requisições dinâmicas apontando para o backend na nuvem.