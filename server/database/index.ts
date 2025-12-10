import { drizzle } from 'drizzle-orm/libsql';
import { relations } from './relations';

export const db = drizzle({
  connection: {
    url: process.env.TURSO_DATABASE_URL as string,
    authToken: process.env.TURSO_AUTH_TOKEN as string
  },
  relations: relations
});
