import { defineRelations } from 'drizzle-orm';
import * as schema from './schema';

export const relations = defineRelations(schema, (r) => ({
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
