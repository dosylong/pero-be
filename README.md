# Pero Backend API

A NestJS-based backend API for the Pero application.

## Features

- 🚀 **NestJS Framework** - Modern, scalable Node.js framework
- 📚 **Swagger Documentation** - Auto-generated API documentation
- 🔐 **JWT Authentication** - Secure authentication system
- 🗄️ **PostgreSQL Database** - Robust relational database
- 🔍 **TypeORM** - Type-safe database operations
- ✅ **Validation** - Request validation with class-validator
- 🛡️ **CORS Support** - Cross-origin resource sharing
- 📝 **Logging** - Comprehensive logging system
- 🧪 **Testing** - Jest testing framework

## Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm
- Docker and Docker Compose (for database setup)
- PostgreSQL database (or use Docker)

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd pero-be
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   # Application
   PORT=3000
   NODE_ENV=development

   # Database
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=pero

   # JWT
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=1d
   ```

4. **Database Setup**

   **Option A: Using Docker (Recommended for development)**

   ```bash
   # Start PostgreSQL database
   docker-compose up -d postgres

   # Check if database is running
   docker-compose ps
   ```

   **Option B: Local PostgreSQL**
   - Create a PostgreSQL database named `pero_db`
   - The application will automatically create tables on first run (in development mode)

## Docker Setup

This project includes Docker Compose configuration for easy database setup.

### Quick Start with Docker

```bash
# Start all services (PostgreSQL + pgAdmin)
docker-compose up -d

# Start only PostgreSQL
docker-compose up -d postgres

# View logs
docker-compose logs postgres

# Stop services
docker-compose down

# Stop and remove volumes (WARNING: This will delete all data)
docker-compose down -v
```

### Services

- **PostgreSQL**: Database server running on port 5432
  - Database: `pero_db`
  - Username: `pero_user`
  - Password: `pero_password`
- **pgAdmin**: Database management interface on port 8080
  - Email: `admin@pero.com`
  - Password: `admin123`

### Environment Variables for Docker

When using Docker, update your `.env` file:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=pero_user
DATABASE_PASSWORD=pero_password
DATABASE_NAME=pero_db
```

**Note**: Use `localhost` even when running in Docker, as your NestJS app will connect to the exposed port.

## Running the Application

### Development Mode

```bash
pnpm run start:dev
```

### Production Mode

```bash
pnpm run build
pnpm run start:prod
```

### Debug Mode

```bash
pnpm run start:debug
```

## API Documentation

Once the application is running, you can access the Swagger documentation at:

- **Swagger UI**: http://localhost:3000/api/docs
- **API Base URL**: http://localhost:3000/api/v1

## Available Scripts

- `pnpm run build` - Build the application
- `pnpm run start` - Start the application
- `pnpm run start:dev` - Start in development mode with hot reload
- `pnpm run start:debug` - Start in debug mode
- `pnpm run start:prod` - Start in production mode
- `pnpm run lint` - Run ESLint
- `pnpm run format` - Format code with Prettier
- `pnpm run test` - Run tests
- `pnpm run test:watch` - Run tests in watch mode
- `pnpm run test:cov` - Run tests with coverage
- `pnpm run test:e2e` - Run end-to-end tests

## Project Structure

```
src/
├── app.controller.ts          # Main application controller
├── app.service.ts             # Main application service
├── app.module.ts              # Root application module
├── main.ts                    # Application entry point
├── config/                    # Configuration files
│   └── configuration.ts       # App configuration
├── common/                    # Shared utilities
│   ├── filters/               # Exception filters
│   └── interceptors/          # Response interceptors
├── modules/                   # Feature modules
│   └── users/                 # Users module
│       ├── dto/               # Data Transfer Objects
│       ├── entities/          # Database entities
│       ├── users.controller.ts
│       ├── users.service.ts
│       └── users.module.ts
├── interfaces/                # TypeScript interfaces
├── dto/                       # Global DTOs
└── entities/                  # Global entities
```

## API Endpoints

### Health Check

- `GET /api/v1/` - Application status

### Users

- `POST /api/v1/users` - Create a new user
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `PATCH /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

## Development Guidelines

### Adding New Modules

1. Create a new directory in `src/modules/`
2. Create the following files:
   - `module-name.module.ts` - Module definition
   - `module-name.controller.ts` - Controller
   - `module-name.service.ts` - Service
   - `dto/` - Data Transfer Objects
   - `entities/` - Database entities

3. Import the new module in `app.module.ts`

### Code Style

- Use TypeScript strict mode
- Follow NestJS conventions
- Use decorators for validation and documentation
- Write unit tests for services
- Write e2e tests for controllers

## Testing

```bash
# Unit tests
pnpm run test

# e2e tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov
```

## Deployment

1. Set `NODE_ENV=production`
2. Update database configuration for production
3. Set secure JWT secret
4. Configure CORS origins
5. Build the application: `pnpm run build`
6. Start in production mode: `pnpm run start:prod`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
