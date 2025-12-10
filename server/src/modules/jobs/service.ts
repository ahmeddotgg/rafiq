import { db } from '../../../database';
import { job } from '../../../database/schema';

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

  static async store(new_job, user_id: string) {
    return await db
      .insert(job)
      .values({ createdBy: user_id, ...new_job })
      .returning()
      .get();
  }
}
