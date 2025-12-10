import { db } from '../../../database';
import { job } from '../../../database/schema';
import type { JobsModel } from './model';

export abstract class JobsServices {
  static async all() {
    return await db.query.job.findMany();
  }

  static async find(id: string) {
    return await db.query.job.findFirst({
      where: {
        id: id
      }
    });
  }

  static async store(new_job: JobsModel.NewJob) {
    return await db.insert(job).values(new_job).returning().get();
  }
}
