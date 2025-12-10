import type { job } from '../../../database/schema';

export namespace JobsModel {
  export type NewJob = typeof job.$inferInsert;
}
