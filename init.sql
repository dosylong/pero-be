-- Initialize pero database
-- This file runs when the PostgreSQL container starts up
-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- You can add any initial database setup here
-- For example, creating additional schemas, users, or initial data
-- Example: Create a schema for the application
-- CREATE SCHEMA IF NOT EXISTS pero_schema;
-- Example: Grant permissions
-- GRANT ALL PRIVILEGES ON SCHEMA pero_schema TO pero_user;