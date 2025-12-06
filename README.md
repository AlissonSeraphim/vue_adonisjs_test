# Backend - Fullstack Vue + AdonisJS

API REST desenvolvida com **AdonisJS 6**.

## Início Rápido com Docker

```bash
# Subir todo o sistema (PostgreSQL + Backend + Frontend)
docker-compose up -d

# Acessar a aplicação
# http://localhost:3333
```

Pronto! O sistema estará disponível em `http://localhost:3333` com:
- Banco de dados PostgreSQL configurado
- Migrations executadas automaticamente
- Usuário inicial criado via seeder

## Tecnologias

- **AdonisJS 6** - Framework Node.js
- **PostgreSQL** - Banco de dados
- **Lucid ORM** - ORM para banco de dados
- **Access Tokens** - Autenticação JWT-like
- **VineJS** - Validação de dados

## Requisitos

- Node.js 20+
- PostgreSQL 14+

## Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Gerar APP_KEY
node ace generate:key

# Criar banco de dados PostgreSQL
# psql -U postgres -c "CREATE DATABASE incuca_test;"

# Executar migrations
node ace migration:run

# Executar seeder (cria usuário inicial)
node ace db:seed
```

## Configuração do Banco de Dados

Edite o arquivo `.env` com suas credenciais PostgreSQL:

```env
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_DATABASE=incuca_test
```

## Executar

```bash
# Modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
```

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

## Estimativa de Implementação

### Backend (este projeto)
- Configuração inicial: 1h
- Modelo User e migrations: 1h
- Autenticação JWT: 2h
- Controller de piadas: 0.5h
- Rotas e middlewares: 0.5h
- Testes e ajustes: 1h

**Total Backend: ~6h**

### Frontend
- Desenvolvimento com Vue.js, componentes e gerenciamento de estado: 8 horas

### Docker
- Configuração de docker-compose para backend, frontend e banco de dados: 2 horas

### Estimativa Total do Projeto
- Backend: 6 horas
- Frontend: 8 horas
- Docker: 2 horas
- Total: 16 horas

## Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento com HMR
- `npm run build` - Build para produção
- `npm start` - Iniciar servidor de produção
- `npm run lint` - Verificar código com ESLint
- `npm run format` - Formatar código com Prettier
- `npm run typecheck` - Verificar tipos TypeScript
- `npm test` - Executar testes

## Docker

### Arquivos Docker

| Arquivo | Descrição |
|---------|-----------|
| `Dockerfile` | Multi-stage build para produção |
| `docker-compose.yml` | Orquestração de containers |
| `docker-entrypoint.sh` | Script de inicialização |
| `.dockerignore` | Arquivos ignorados no build |

### Comandos Docker

```bash
# Subir containers
docker-compose up -d

# Ver logs
docker-compose logs -f app

# Parar containers
docker-compose down

# Rebuild após alterações
docker-compose build --no-cache
docker-compose up -d

# Limpar volumes (apaga dados do banco)
docker-compose down -v
```

### Variáveis de Ambiente no Docker

As variáveis são configuradas no `docker-compose.yml`. Para produção, crie um arquivo `.env` na raiz:

```env
APP_KEY=sua_chave_secreta_aqui
```
