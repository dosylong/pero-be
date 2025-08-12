export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'pero',
  },
  jwt: {
    access: {
      secret:
        process.env.JWT_ACCESS_SECRET ||
        process.env.JWT_SECRET ||
        'your-access-secret',
      expiresIn:
        process.env.JWT_ACCESS_EXPIRES_IN ||
        process.env.JWT_EXPIRES_IN ||
        '15m',
    },
    refresh: {
      secret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    },
  },
  swagger: {
    title: 'Pero API',
    description: 'The Pero API description',
    version: '1.0',
  },
});
