import Elysia, { t } from 'elysia';
import { JobsModel } from './model';
import { JobsServices } from './service';

export const jobs = new Elysia({ prefix: '/jobs' });

jobs.get('/', async () => {
  const jobs = await JobsServices.all();
  return { info: 'success', data: jobs };
});

jobs.get(
  '/:id',
  async ({ params: { id } }) => {
    const job = await JobsServices.find(id);
    return { info: 'success', data: job };
  },
  {
    params: t.Object({
      id: t.String()
    })
  }
);

jobs.post('/', ({ body }) => body, {
  body: JobsModel.createJobSchema.omit({
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    id: true
  })
});
