import { defineRelations } from 'drizzle-orm';
import { tables } from './schema';

export const relations = defineRelations(tables, (r) => ({
  user: {
    jobs: r.many.job({
      from: r.user.id,
      to: r.job.createdBy
    })
  },

  job: {
    creator: r.one.user({
      from: r.job.createdBy,
      to: r.user.id
    })
  }
}));
