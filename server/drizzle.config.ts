import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './database/migrations',
  schema: './database/schema.ts',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL as string,
    authToken: process.env.TURSO_AUTH_TOKEN as string
  }
});
