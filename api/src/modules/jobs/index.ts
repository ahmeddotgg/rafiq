import { OpenAPIHono } from '@hono/zod-openapi';
import { createJobRoute, getAllJobsRoute, getJobByIdRoute } from './openapi';
import { JobsServices } from './service';

export const jobs = new OpenAPIHono();

jobs.openapi(getAllJobsRoute, async (c) => {
  const allJobs = await JobsServices.all();

  return c.json(
    {
      info: 'success',
      data: allJobs
    },
    200
  );
});

jobs.openapi(getJobByIdRoute, async (c) => {
  const { id } = c.req.valid('param');
  const job = await JobsServices.find(id);

  if (!job) {
    return c.json(
      {
        info: 'error',
        error: `job with id (${id}) not found!`
      },
      404
    );
  }

  return c.json(
    {
      info: 'success',
      data: job
    },
    200
  );
});

jobs.openapi(
  createJobRoute,
  async (c) => {
    const data = c.req.valid('json');

    try {
      const job = await JobsServices.store(data);

      return c.json(
        {
          info: 'success',
          data: job
        },
        201
      );
    } catch (error) {
      console.log(error);
      return c.json(
        {
          info: 'error',
          error: 'Internal server error'
        },
        500
      );
    }
  },
  (result, c) => {
    if (!result.success) {
      return c.json(
        {
          info: 'validation error',
          errors: result.error.issues.map((issue) => ({
            code: issue.code,
            message: issue.message,
            path: issue.path.map(String).toString()
          }))
        },
        422
      );
    }
  }
);
