import { z } from '@hono/zod-openapi';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import * as schema from '@/database/schema';

export namespace JobsModel {
  export const insertJobSchema = createInsertSchema(schema.job);
  export type insertJobSchema = z.infer<typeof insertJobSchema>;

  export const JobSchema = createSelectSchema(schema.job).openapi('Job');
  export const CreateJobSchema = insertJobSchema
    .omit({
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      id: true
    })
    .openapi('CreateJob');

  export const ErrorSchema = z
    .object({
      info: z.string().openapi({ example: 'error' }),
      error: z.string().openapi({ example: 'Job not found' })
    })
    .openapi('Error');

  export const ValidationErrorSchema = z
    .object({
      info: z.string().openapi({ example: 'validation error' }),
      errors: z
        .array(
          z.object({
            code: z.string().openapi({ example: 'invalid_type' }),
            message: z.string().openapi({ example: 'Required' }),
            path: z.string().openapi({ example: ['company'] })
          })
        )
        .openapi({ description: 'Validation errors' })
    })
    .openapi('ValidationError');

  export const UnauthorizedErrorSchema = z
    .object({
      info: z.string().openapi({ example: 'error' }),
      error: z.string().openapi({ example: 'Unauthorized' })
    })
    .openapi('UnauthorizedError');

  export const SuccessSchema = z
    .object({
      info: z.string().openapi({ example: 'success' }),
      data: z.any().openapi({ description: 'Response data' })
    })
    .openapi('Success');
}
