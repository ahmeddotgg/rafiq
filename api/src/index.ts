import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { jobs } from './modules/jobs';

const app = new Hono({ strict: false }).basePath('/api/v2');

app.use(logger());
app.route('/jobs', jobs);

export default {
  port: process.env.PORT!,
  fetch: app.fetch
};
