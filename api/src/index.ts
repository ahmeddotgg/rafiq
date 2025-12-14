import { OpenAPIHono } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { jobs } from './modules/jobs';

export const app = new OpenAPIHono({ strict: false }).basePath('/api');
app.use(
  '/*',
  cors({
    origin: 'http://localhost:5173'
  })
);
app.use(logger());
app.route('/jobs', jobs);

app.get('/docs', Scalar({ url: '/api/openapi.json' }));
app.get('/openapi.json', (c) => {
  return c.json(
    app.getOpenAPI31Document({
      openapi: '3.1.0',
      info: {
        version: '1.0.0',
        title: 'Docs'
      }
    })
  );
});

export default {
  port: process.env.PORT!,
  fetch: app.fetch
};
