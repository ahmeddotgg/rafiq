import { createInsertSchema } from 'drizzle-zod';
import type * as z from 'zod';
import { tables } from '../../../database/schema';

export namespace JobsModel {
  export const createJobSchema = createInsertSchema(tables.job);
  export type createJobSchema = z.infer<typeof createJobSchema>;
}
