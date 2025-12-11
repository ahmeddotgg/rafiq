import { Elysia } from 'elysia';
import { DatabaseErr, NotFoundErr, type ValidationIssue } from './lib/errors';
import { jobs } from './modules/jobs';

const app = new Elysia({ prefix: '/api', strictPath: false })
  .onError(({ error, set, code }) => {
    if (code === 'VALIDATION') {
      set.status = 400;

      const errorData = JSON.parse((error as Error).message) as {
        message: string;
        errors: ValidationIssue[];
      };

      return {
        message: errorData.message || 'Validation failed',
        errors: errorData.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message
        }))
      };
    }

    if (error instanceof NotFoundErr || error instanceof DatabaseErr) {
      set.status = error.status;

      if (error.cause) {
        console.error(`${error.name}:`, error.cause);
      }

      return {
        message: error.message
      };
    }

    console.error('Unhandled error:', error);
    set.status = 500;
    return {
      message: 'Internal server error'
    };
  })
  .use(jobs);

app.listen(process.env.PORT!, () => {
  console.log(`🦊 Elysia is running at ${app.server?.url}`);
});
