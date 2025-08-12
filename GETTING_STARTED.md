# Getting Started with Pero Backend

## 🎯 What We've Set Up

Your NestJS backend is now configured with the following features:

### ✅ Core Features

- **NestJS Framework** - Modern, scalable Node.js framework
- **TypeScript** - Type-safe development
- **PostgreSQL Database** - With TypeORM for database operations
- **JWT Authentication** - Secure user authentication
- **Swagger Documentation** - Auto-generated API docs
- **Validation** - Request validation with class-validator
- **CORS Support** - Cross-origin resource sharing
- **Global Exception Handling** - Consistent error responses
- **Response Interceptors** - Standardized API responses

### 📁 Project Structure

```
src/
├── app.controller.ts          # Main app controller
├── app.service.ts             # Main app service
├── app.module.ts              # Root module
├── main.ts                    # Entry point
├── config/
│   └── configuration.ts       # App configuration
├── common/
│   ├── filters/               # Exception filters
│   └── interceptors/          # Response interceptors
├── modules/
│   ├── users/                 # Users module
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── entities/         # Database entities
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   └── auth/                  # Authentication module
│       ├── dto/              # Auth DTOs
│       ├── auth.controller.ts
│       ├── auth.service.ts
│       └── auth.module.ts
├── interfaces/                # TypeScript interfaces
└── dto/                       # Global DTOs
```

## 🚀 Quick Start

### 1. Environment Setup

Create a `.env` file in the root directory:

```env
# Application
PORT=3000
NODE_ENV=development

# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=pero_user
DATABASE_PASSWORD=pero_password
DATABASE_NAME=pero_db

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=1d
```

### 2.1. Docker Services (Optional)

If you want to use pgAdmin for database management:

```bash
# Start all services (PostgreSQL + pgAdmin)
docker-compose up -d

# Access pgAdmin at http://localhost:8080
# Email: admin
# Password: admin123
```

````

### 2. Database Setup

**Option A: Using Docker (Recommended for development)**

```bash
# Start all services (PostgreSQL + pgAdmin)
docker-compose up -d

# Or start only PostgreSQL if you don't need pgAdmin
docker-compose up -d postgres

# Check if services are running
docker-compose ps

# View logs
docker-compose logs postgres
````

**Option B: Local PostgreSQL**

- Install PostgreSQL if you haven't already
- Create a database named `pero_db`
- The application will automatically create tables on first run

**Database Connection Details:**

- Host: `localhost`
- Port: `5432`
- Database: `pero_db`
- Username: `pero_user`
- Password: `pero_password`

### 3. Start Development Server

```bash
pnpm run start:dev
```

### 4. Access Your API

- **API Base URL**: http://localhost:3000/api/v1
- **Swagger Documentation**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000/api/v1/

## 📚 Available Endpoints

### Health Check

- `GET /api/v1/` - Application status

### Authentication

- `POST /api/v1/auth/login` - User login

### Users

- `POST /api/v1/users` - Create a new user
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `PATCH /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

## 🛠️ Development Workflow

### Adding New Features

1. **Create a new module**:

   ```bash
   mkdir -p src/modules/your-feature/{dto,entities}
   ```

2. **Create the module files**:
   - `your-feature.module.ts` - Module definition
   - `your-feature.controller.ts` - Controller
   - `your-feature.service.ts` - Service
   - `dto/` - Data Transfer Objects
   - `entities/` - Database entities

3. **Import in app.module.ts**:
   ```typescript
   import { YourFeatureModule } from './modules/your-feature/your-feature.module';
   ```

### Code Style Guidelines

- Use TypeScript strict mode
- Follow NestJS conventions
- Use decorators for validation and documentation
- Write unit tests for services
- Write e2e tests for controllers

## 🧪 Testing

```bash
# Unit tests
pnpm run test

# e2e tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov
```

## 📦 Available Scripts

### Application Scripts

- `pnpm run build` - Build the application
- `pnpm run start` - Start the application
- `pnpm run start:dev` - Start in development mode with hot reload
- `pnpm run start:debug` - Start in debug mode
- `pnpm run start:prod` - Start in production mode
- `pnpm run lint` - Run ESLint
- `pnpm run format` - Format code with Prettier

### Docker Commands

- `docker-compose up -d` - Start all services (PostgreSQL + pgAdmin) - **Recommended**
- `docker-compose up -d postgres` - Start only PostgreSQL database
- `docker-compose down` - Stop all services
- `docker-compose logs postgres` - View database logs
- `docker-compose ps` - Check service status

## 🔧 Configuration

The application uses a centralized configuration system:

- **Environment Variables**: Loaded from `.env` file
- **Configuration Service**: Access config values throughout the app
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT-based authentication
- **Validation**: Global validation pipe with class-validator

### Docker Configuration

The project includes Docker Compose for easy database setup:

- **PostgreSQL**: Version 15 with Alpine Linux
- **pgAdmin**: Database management interface
- **Persistent Storage**: Data persists between container restarts
- **Custom Network**: Isolated network for services

## 🚨 Important Notes

1. **Database**: Make sure PostgreSQL is running and the database exists
   - If using Docker: `docker-compose up -d postgres`
   - If using local PostgreSQL: Ensure service is running
2. **Environment**: Always use environment variables for sensitive data
3. **JWT Secret**: Change the JWT secret in production
4. **CORS**: Update CORS origins for production
5. **Logging**: Enable logging in development, disable in production
6. **Docker**: Use `docker-compose down -v` to reset database data

## 📖 Next Steps

1. **Explore the Swagger Documentation** at http://localhost:3000/api/docs
2. **Test the API endpoints** using the Swagger UI
3. **Add more modules** following the established pattern
4. **Implement authentication guards** for protected routes
5. **Add more validation rules** to your DTOs
6. **Write tests** for your new features

## 🆘 Need Help?

- Check the [NestJS Documentation](https://docs.nestjs.com/)
- Review the Swagger documentation at `/api/docs`
- Look at the existing code examples in the project
- Check the console logs for error messages

Happy coding! 🎉
