# Getting Started with Pero Backend

## 🎯 What We've Set Up

Your NestJS backend is now configured with the following features:

### ✅ Core Features

- **NestJS Framework** - Modern, scalable Node.js framework
- **TypeScript** - Type-safe development
- **PostgreSQL Database** - With TypeORM for database operations
- **JWT Authentication** - Secure access & refresh token authentication
- **Swagger Documentation** - Auto-generated API docs with JWT authorization
- **Validation** - Request validation with class-validator
- **CORS Support** - Cross-origin resource sharing
- **Global Exception Handling** - Consistent error responses
- **Response Interceptors** - Standardized API responses
- **Role-Based Access Control** - User roles (ADMIN, USER)
- **Token Rotation** - Secure refresh token management

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
│   ├── enums/                 # Enums (UserRole, etc.)
│   ├── filters/               # Exception filters
│   └── interceptors/          # Response interceptors
├── interfaces/                 # TypeScript interfaces
├── modules/
│   ├── users/                 # Users module
│   │   ├── dto/              # Data Transfer Objects
│   │   │   ├── create-user.dto.ts
│   │   │   ├── update-user.dto.ts
│   │   │   ├── update-password.dto.ts
│   │   │   └── user-response.dto.ts
│   │   ├── entities/         # Database entities
│   │   │   └── user.entity.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   └── auth/                  # Authentication module
│       ├── dto/              # Auth DTOs
│       │   ├── login.dto.ts
│       │   ├── refresh-token.dto.ts
│       │   └── logout.dto.ts
│       ├── guards/            # Authentication guards
│       │   └── jwt-auth.guard.ts
│       ├── strategies/        # Passport strategies
│       │   └── jwt.strategy.ts
│       ├── auth.controller.ts
│       ├── auth.service.ts
│       └── auth.module.ts
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

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=1d

# JWT Access Token Configuration
JWT_ACCESS_SECRET=your-access-token-secret-key-change-this-in-production
JWT_ACCESS_EXPIRES_IN=15m

# JWT Refresh Token Configuration
JWT_REFRESH_SECRET=your-refresh-token-secret-key-change-this-in-production
JWT_REFRESH_EXPIRES_IN=7d
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
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user (requires auth)

### Users

- `GET /api/v1/users` - Get all users (requires auth)
- `GET /api/v1/users/:id` - Get user by ID (requires auth)
- `PATCH /api/v1/users/:id` - Update user (requires auth)
- `PATCH /api/v1/users/:id/password` - Update user password (requires auth)
- `DELETE /api/v1/users/:id` - Delete user (requires auth)

## 🛠️ Development Workflow

### Adding New Features

1. **Create a new module**:

   ```bash
   mkdir -p src/modules/your-feature/{dto,entities,guards,strategies}
   ```

2. **Create the module files**:
   - `your-feature.module.ts` - Module definition
   - `your-feature.controller.ts` - Controller
   - `your-feature.service.ts` - Service
   - `dto/` - Data Transfer Objects
   - `entities/` - Database entities
   - `guards/` - Authentication guards (if needed)
   - `strategies/` - Passport strategies (if needed)

3. **Import in app.module.ts**:
   ```typescript
   import { YourFeatureModule } from './modules/your-feature/your-feature.module';
   ```

### Authentication & Authorization

1. **Protected Routes**: Use `@UseGuards(JwtAuthGuard)` decorator
2. **Swagger Documentation**: Add `@ApiBearerAuth()` for protected endpoints
3. **JWT Strategy**: Extend `PassportStrategy(Strategy)` for custom auth logic
4. **Role-Based Access**: Use `UserRole` enum for role management

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
- **Authentication**: JWT-based authentication with access & refresh tokens
- **Validation**: Global validation pipe with class-validator
- **Authorization**: Role-based access control with JWT guards

### Docker Configuration

The project includes Docker Compose for easy database setup:

- **PostgreSQL**: Version 15 with Alpine Linux
- **pgAdmin**: Database management interface
- **Persistent Storage**: Data persists between container restarts
- **Custom Network**: Isolated network for services

## 🔐 JWT Authentication & Swagger Authorization

### How to Use JWT in Swagger

1. **Get Access Token**:
   - Call `POST /api/v1/auth/login` with your credentials
   - Copy the `accessToken` from the response

2. **Authorize in Swagger**:
   - Go to http://localhost:3000/api/docs
   - Click the **🔒 Authorize** button at the top
   - Enter: `Bearer <your-access-token>`
   - Click **Authorize**

3. **Test Protected APIs**:
   - All protected endpoints now automatically include your token
   - Green checkmark ✅ shows authorized requests
   - Lock icons 🔒 indicate protected endpoints

### Token Management

- **Access Token**: 15 minutes expiry (configurable)
- **Refresh Token**: 7 days expiry (configurable)
- **Token Rotation**: Refresh tokens are rotated on each use
- **Secure Storage**: Refresh tokens stored as bcrypt hashes

## 🚨 Important Notes

1. **Database**: Make sure PostgreSQL is running and the database exists
   - If using Docker: `docker-compose up -d postgres`
   - If using local PostgreSQL: Ensure service is running
2. **Environment**: Always use environment variables for sensitive data
3. **JWT Secrets**: Change all JWT secrets in production
4. **CORS**: Update CORS origins for production
5. **Logging**: Enable logging in development, disable in production
6. **Docker**: Use `docker-compose down -v` to reset database data
7. **Token Security**: Never expose refresh tokens in client-side code

## 📖 Next Steps

1. **Explore the Swagger Documentation** at http://localhost:3000/api/docs
2. **Test the API endpoints** using the Swagger UI with JWT authorization
3. **Add more modules** following the established pattern
4. **Implement role-based access control** for different user types
5. **Add more validation rules** to your DTOs
6. **Write tests** for your new features
7. **Customize JWT token expiration** based on your security requirements
8. **Implement refresh token rotation** for enhanced security

## 🆘 Need Help?

- Check the [NestJS Documentation](https://docs.nestjs.com/)
- Review the Swagger documentation at `/api/docs`
- Look at the existing code examples in the project
- Check the console logs for error messages

Happy coding! 🎉
