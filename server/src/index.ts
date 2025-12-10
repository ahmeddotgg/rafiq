import { Elysia } from 'elysia';
import { jobs } from './modules/jobs';

const app = new Elysia({ prefix: '/api', strictPath: false }).use(jobs);

app.listen(process.env.PORT!, () => {
  console.log(`🦊 Elysia is running at ${app.server?.url}`);
});
