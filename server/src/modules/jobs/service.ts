import { db } from '../../../database';
import { job } from '../../../database/schema';
import { DatabaseErr, NotFoundErr } from '../../lib/errors';
import type { JobsModel } from './model';

export abstract class JobsServices {
  static async all() {
    try {
      return await db.query.job.findMany();
    } catch (err) {
      throw new DatabaseErr('Failed to fetch jobs', err);
    }
  }

  static async find(id: string) {
    try {
      const found = await db.query.job.findFirst({
        where: { id }
      });

      if (!found) throw new NotFoundErr('Job not found');

      return found;
    } catch (err) {
      if (err instanceof NotFoundErr) throw err;
      throw new DatabaseErr('Failed to fetch job', err);
    }
  }

  static async store(newJob: JobsModel.createJobSchema) {
    try {
      const result = await db.insert(job).values(newJob).returning().get();

      if (!result) {
        throw new DatabaseErr('Insert returned no data');
      }

      return result;
    } catch (err) {
      throw new DatabaseErr('Failed to create job', err);
    }
  }
}
