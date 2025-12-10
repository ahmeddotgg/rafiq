import { createInsertSchema } from 'drizzle-zod';
import type * as z from 'zod';
import { job } from '../../../database/schema';

export namespace JobsModel {
  export const createJobSchema = createInsertSchema(job);
  export type createJobSchema = z.infer<typeof createJobSchema>;
}
