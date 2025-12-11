import { createInsertSchema } from 'drizzle-zod';
import type * as z from 'zod';
import * as schema from '@/database/schema';

export namespace JobsModel {
  export const insertJobSchema = createInsertSchema(schema.job);
  export type insertJobSchema = z.infer<typeof insertJobSchema>;
}
