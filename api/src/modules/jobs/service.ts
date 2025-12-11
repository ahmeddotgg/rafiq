import { db } from '@/database';
import * as schema from '@/database/schema';
import type { JobsModel } from './model';

export abstract class JobsServices {
  static async all() {
    return await db.query.job.findMany();
  }

  static async find(id: string) {
    return await db.query.job.findFirst({
      where: { id }
    });
  }

  static async store(newJob: JobsModel.insertJobSchema) {
    return await db.insert(schema.job).values(newJob).returning().get();
  }
}
