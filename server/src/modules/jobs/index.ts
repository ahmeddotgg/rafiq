import Elysia, { t } from 'elysia';
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
