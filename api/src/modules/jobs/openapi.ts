import { createRoute, z } from '@hono/zod-openapi';
import { JobsModel } from './model';

export const getAllJobsRoute = createRoute({
  method: 'get',
  path: '/',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            info: z.string().openapi({ example: 'success' }),
            data: z.array(JobsModel.JobSchema)
          })
        }
      },
      description: 'Retrieve all jobs'
    }
  }
});

export const getJobByIdRoute = createRoute({
  method: 'get',
  path: '/{id}',
  request: {
    params: z.object({
      id: z.string().openapi({
        param: {
          name: 'id',
          in: 'path'
        },
        example: 'some-job-id'
      })
    })
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            info: z.string().openapi({ example: 'success' }),
            data: JobsModel.JobSchema
          })
        }
      },
      description: 'Retrieve a job by ID'
    },
    404: {
      content: {
        'application/json': {
          schema: JobsModel.ErrorSchema
        }
      },
      description: 'Job not found'
    }
  }
});

export const createJobRoute = createRoute({
  method: 'post',
  path: '/',
  request: {
    body: {
      content: {
        'application/json': {
          schema: JobsModel.CreateJobSchema
        }
      },
      required: true
    }
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: JobsModel.SuccessSchema
        }
      },
      description: 'Create a new job'
    },
    401: {
      content: {
        'application/json': {
          schema: JobsModel.UnauthorizedErrorSchema
        }
      },
      description: 'Unauthorized'
    },
    422: {
      content: {
        'application/json': {
          schema: JobsModel.ValidationErrorSchema
        }
      },
      description: 'Validation error'
    },
    500: {
      content: {
        'application/json': {
          schema: JobsModel.ErrorSchema
        }
      },
      description: 'Internal server error'
    }
  }
});
