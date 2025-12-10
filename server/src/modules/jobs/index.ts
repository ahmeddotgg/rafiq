import Elysia from 'elysia';
import { JobsServices } from './service';

export const jobs = new Elysia({ prefix: '/jobs' });

jobs.get('/', async () => await JobsServices.all());
