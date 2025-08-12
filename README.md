# Pero Backend API

📖 **For detailed setup instructions, see [GETTING_STARTED.md](./GETTING_STARTED.md)**

## ✨ Key Features

- 🔐 **JWT Authentication** - Access & refresh tokens with secure rotation
- 🗄️ **PostgreSQL + TypeORM** - Type-safe database operations
- 📚 **Swagger UI** - Interactive API docs with JWT authorization
- 🛡️ **Role-Based Access Control** - User roles and protected endpoints
- ✅ **Validation & Security** - Request validation, CORS, exception handling
- 🧪 **Testing** - Jest testing framework with coverage

## Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm
- Docker and Docker Compose (for database setup)
- PostgreSQL database (or use Docker)

## 🚀 Quick Start

1. **Clone & Install**

   ```bash
   git clone <repository-url>
   cd pero-be
   pnpm install
   ```

2. **Environment Setup**

   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Start Database**

   ```bash
   docker-compose up -d postgres
   ```

4. **Run Application**

   ```bash
   pnpm start:dev
   ```

5. **Access API**
   - **API**: http://localhost:3000/api/v1
   - **Swagger Docs**: http://localhost:3000/api/docs

## 🐳 Docker Commands

```bash
# Start database
docker-compose up -d postgres

# Start all services (PostgreSQL + pgAdmin)
docker-compose up -d

# View logs
docker-compose logs postgres

# Stop services
docker-compose down
```

📖 **For detailed Docker setup, see [GETTING_STARTED.md](./GETTING_STARTED.md)**

## 🏃‍♂️ Available Scripts

```bash
# Development
pnpm start:dev          # Start with hot reload
pnpm start:debug        # Start in debug mode

# Production
pnpm build              # Build application
pnpm start:prod         # Start production server

# Testing
pnpm test               # Run tests
pnpm test:watch         # Run tests in watch mode
pnpm test:cov           # Run tests with coverage

# Code Quality
pnpm lint               # Run ESLint
pnpm format             # Format with Prettier
```

## 📚 API Documentation

- **Swagger UI**: http://localhost:3000/api/docs
- **API Base URL**: http://localhost:3000/api/v1

🔐 **JWT Authorization**: Use the Authorize button in Swagger to test protected endpoints

📖 **For detailed structure, see [GETTING_STARTED.md](./GETTING_STARTED.md)**

## 🔗 API Endpoints

- **Health**: `GET /api/v1/` - Application status
- **Auth**: `POST /api/v1/auth/login` - User authentication
- **Users**: `GET /api/v1/users` - User management (protected)

📖 **For complete API documentation, see [GETTING_STARTED.md](./GETTING_STARTED.md)**

## 🛠️ Development

### Adding New Modules

1. Create directory: `src/modules/your-feature/`
2. Add files: `module.ts`, `controller.ts`, `service.ts`
3. Import in `app.module.ts`

### Code Style

- TypeScript strict mode
- NestJS conventions
- Decorators for validation & documentation
- Unit tests for services
- E2E tests for controllers

📖 **For detailed development workflow, see [GETTING_STARTED.md](./GETTING_STARTED.md)**

## 🧪 Testing

```bash
pnpm test               # Unit tests
pnpm test:watch         # Watch mode
pnpm test:cov           # Coverage
pnpm test:e2e           # End-to-end tests
```

## 🚀 Deployment

1. Set `NODE_ENV=production`
2. Configure production database & JWT secrets
3. Build: `pnpm build`
4. Start: `pnpm start:prod`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes & add tests
4. Submit a pull request

## 📄 License

MIT License
