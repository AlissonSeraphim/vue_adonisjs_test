# Incuca Fullstack Test - Vue.js + AdonisJS

Aplicação fullstack desenvolvida com **Vue.js 3** (Inertia.js) + **AdonisJS 6** para o teste técnico da Incuca.

## 🚀 Início Rápido com Docker (Recomendado)

### Pré-requisitos
- **Docker** e **Docker Compose** instalados
- Porta **3333** disponível

### Executar o Projeto

```bash
# 1. Clonar o repositório
git clone <url-do-repositorio>
cd vue_adonisjs_test

# 2. Subir todo o sistema (PostgreSQL + Aplicação)
docker compose up -d

# 3. Aguardar inicialização (migrations e seeders são executados automaticamente)
docker compose logs -f app

# 4. Acessar a aplicação
# http://localhost:3333
```

**Pronto!** O sistema estará disponível em `http://localhost:3333` com:
- ✅ Banco de dados PostgreSQL configurado
- ✅ Migrations executadas automaticamente
- ✅ Usuário inicial criado via seeder

### Credenciais de Acesso

- **Email:** `cliente@incuca.com.br`
- **Senha:** `seumamesapossuirtrespernaschamadasqualidadeprecobaixoevelocidadeelaseriacapenga`

---

## 🛠️ Desenvolvimento Local (Sem Docker)

### Pré-requisitos
- **Node.js 20+**
- **PostgreSQL 14+** rodando localmente

### Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Copiar arquivo de ambiente
cp .env.example .env

# 3. Gerar APP_KEY
node ace generate:key

# 4. Configurar banco de dados no .env
# Edite DB_HOST, DB_USER, DB_PASSWORD conforme seu PostgreSQL local

# 5. Criar banco de dados PostgreSQL
psql -U postgres -c "CREATE DATABASE incuca_test;"

# 6. Executar migrations
node ace migration:run

# 7. Executar seeder (cria usuário inicial)
node ace db:seed

# 8. Iniciar servidor de desenvolvimento
npm run dev
```

### Configuração do Banco de Dados

Edite o arquivo `.env` com suas credenciais PostgreSQL:

```env
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_DATABASE=incuca_test
```

---

## 📦 Tecnologias Utilizadas

### Frontend
- **Vue.js 3** - Framework JavaScript reativo
- **Inertia.js** - SPA sem API separada
- **Pinia** - Gerenciamento de estado
- **TailwindCSS** - Estilização
- **Vite** - Build tool

### Backend
- **AdonisJS 6** - Framework Node.js
- **PostgreSQL** - Banco de dados
- **Lucid ORM** - ORM para banco de dados
- **Access Tokens** - Autenticação JWT-like
- **VineJS** - Validação de dados

### DevOps
- **Docker** - Containerização
- **Docker Compose** - Orquestração
- **ESLint** - Análise estática de código

## Endpoints da API

### Autenticação

| Método | Endpoint | Descrição | Autenticado |
|--------|----------|-----------|-------------|
| POST | `/api/auth/login` | Login do usuário | Não |
| POST | `/api/auth/logout` | Logout do usuário | Sim |
| GET | `/api/auth/me` | Dados do usuário logado | Sim |

### Piadas

| Método | Endpoint | Descrição | Autenticado |
|--------|----------|-----------|-------------|
| GET | `/api/jokes/random` | Retorna piada aleatória | Sim |

## Autenticação

A API usa **Access Tokens** (semelhante a JWT). Após o login, você receberá um token que deve ser enviado no header `Authorization`:

```
Authorization: Bearer oat_xxxxxxxxxxxx
```

### Exemplo de Login

**Request:**
```bash
curl -X POST http://localhost:3333/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "cliente@incuca.com.br", "password": "seumamesapossuirtrespernaschamadasqualidadeprecobaixoevelocidadeelaseriacapenga"}'
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "cliente@incuca.com.br",
    "fullName": "Cliente Incuca"
  },
  "token": "oat_xxxxxxxxxxxx"
}
```

### Exemplo de Buscar Piada

```bash
curl http://localhost:3333/api/jokes/random \
  -H "Authorization: Bearer oat_xxxxxxxxxxxx"
```

## Usuário Inicial

O seeder cria automaticamente o seguinte usuário:

- **Email:** `cliente@incuca.com.br`
- **Senha:** `seumamesapossuirtrespernaschamadasqualidadeprecobaixoevelocidadeelaseriacapenga`

## Estrutura do Projeto

```
app/
├── controllers/
│   ├── auth_controller.ts    # Autenticação
│   └── jokes_controller.ts   # Proxy para API de piadas
├── models/
│   └── user.ts               # Model de usuário
├── middleware/
│   ├── auth_middleware.ts    # Middleware de autenticação
│   └── guest_middleware.ts   # Middleware para rotas públicas
config/
├── auth.ts                   # Configuração de autenticação
├── cors.ts                   # Configuração de CORS
└── database.ts               # Configuração do banco
database/
├── migrations/               # Migrations do banco
└── seeders/                  # Seeders (dados iniciais)
start/
├── routes.ts                 # Rotas da API
└── kernel.ts                 # Middlewares globais
```

## ⏱️ Estimativa de Implementação

### Cumprimento dos Requisitos

| Tarefa | Horas |
|--------|-------|
| Configuração inicial do projeto (AdonisJS + Vue.js + Inertia) | 1h |
| Modelo User, migrations e seeders | 1h |
| Autenticação JWT (login, logout, persistência de sessão) | 2h |
| Telas de login com validação (email + senha 8 chars) | 1.5h |
| Fluxo de humor (inicial → triste → poker-face → feliz) | 2h |
| Integração com Geek Joke API (backend proxy) | 0.5h |
| Modal de piadas com lógica de fechamento | 1h |
| Gerenciamento de estado com Pinia | 1h |
| Estilização e UX | 2h |
| Docker e docker-compose | 2h |
| Testes e ajustes finais | 2h |

**Total Requisitos: ~16h**

### Evoluções Extras

| Tarefa | Horas |
|--------|-------|
| Animações e transições de humor | 1h |
| Responsividade mobile | 1h |
| Documentação detalhada | 1h |

**Total Extras: ~3h**

### Resumo

| Categoria | Horas |
|-----------|-------|
| Backend (AdonisJS) | 6h |
| Frontend (Vue.js + Inertia) | 8h |
| Docker/DevOps | 2h |
| Extras | 3h |
| **Total Geral** | **19h** |

## Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento com HMR
- `npm run build` - Build para produção
- `npm start` - Iniciar servidor de produção
- `npm run lint` - Verificar código com ESLint
- `npm run format` - Formatar código com Prettier
- `npm run typecheck` - Verificar tipos TypeScript
- `npm test` - Executar testes

## 🐳 Docker

### Arquivos Docker

| Arquivo | Descrição |
|---------|-----------|
| `Dockerfile` | Multi-stage build para produção |
| `docker-compose.yml` | Orquestração de containers |
| `docker-entrypoint.sh` | Script de inicialização (migrations + seeders + start) |
| `.dockerignore` | Arquivos ignorados no build |

### Comandos Docker

```bash
# Subir containers (primeira vez ou após alterações)
docker compose up -d

# Ver logs em tempo real
docker compose logs -f app

# Parar containers
docker compose down

# Rebuild após alterações no código
docker compose build --no-cache app
docker compose up -d

# Limpar volumes (apaga dados do banco)
docker compose down -v

# Executar comandos dentro do container
docker compose exec app node ace migration:status
```

### Portas Expostas

| Serviço | Porta | Descrição |
|---------|-------|-----------|
| Aplicação | 3333 | Frontend + Backend (Inertia.js) |
| PostgreSQL | 5432 | Banco de dados (apenas para debug) |

---

## 🎭 Funcionalidades da Aplicação

### Fluxo de Humor

1. **Login** - Tela inicial com validação de email e senha (mínimo 8 caracteres)
2. **Inicial** (`/inicial`) - Humor neutro 😐
3. **Triste** (`/triste`) - Primeiro clique leva para 100% triste 😢
4. **Poker Face** (`/poker-face`) - Clique abre modal com piada da Geek Joke API
5. **Feliz** (`/feliz`) - Após ler piadas suficientes, humor melhora 😊
6. **Fechamento** - Modal só fecha quando 100% feliz, volta para `/inicial`

### Autenticação

- Login via JWT (Access Tokens)
- Token persistido na sessão (recarregar não exige novo login)
- Logout disponível

---

## 📋 Requisitos Atendidos

- [x] Vue.js com componentes de interface gráfica
- [x] Gerenciamento de estado no cliente (Pinia)
- [x] Análise estática de código (ESLint)
- [x] API REST (AdonisJS)
- [x] Autenticação com JWT no backend
- [x] Migrações para criação de tabelas e inserção de dados
- [x] Estimativa de implementação em horas
- [x] README.md explicando a solução
- [x] Docker (rodar `docker compose up` é suficiente)

---

## 🔧 Troubleshooting

### Container não inicia

```bash
# Verificar logs
docker compose logs app

# Rebuild completo
docker compose down -v
docker compose build --no-cache
docker compose up -d
```

### Erro de conexão com banco de dados

```bash
# Verificar se PostgreSQL está rodando
docker compose ps

# Verificar health do PostgreSQL
docker compose logs postgres
```

### Porta 3333 em uso

```bash
# Windows: encontrar processo usando a porta
netstat -ano | findstr :3333

# Parar o processo ou alterar a porta no docker-compose.yml
```
