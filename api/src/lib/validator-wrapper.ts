import { zValidator as zv } from '@hono/zod-validator';
import type { ValidationTargets } from 'hono';
import type * as z from 'zod';

export const zValidator = <
  T extends z.ZodSchema,
  Target extends keyof ValidationTargets
>(
  target: Target,
  schema: T
) =>
  zv(target, schema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          info: 'invalid request body',
          errors: JSON.parse(result.error.message)
        },
        422
      );
    }
  });
