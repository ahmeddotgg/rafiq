import { Hono } from 'hono';
import { zValidator } from '@/src/lib/validator-wrapper';
import { JobsModel } from './model';
import { JobsServices } from './service';

export const jobs = new Hono();

jobs.get('/', async (c) => {
  const jobs = await JobsServices.all();

  return c.json({
    info: 'success',
    data: jobs
  });
});

jobs.get('/:id', async (c) => {
  const id = c.req.param('id');
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

  return c.json({
    info: 'success',
    data: job
  });
});

jobs.post(
  '/',
  zValidator(
    'json',
    JobsModel.insertJobSchema.omit({
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      id: true
    })
  ),
  (c) => {
    const data = c.req.valid('json');

    return c.json({
      info: 'success',
      data: data
    });
  }
);
