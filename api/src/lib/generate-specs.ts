import { app } from '../index';

async function main() {
  const specs = app.getOpenAPI31Document({
    openapi: '3.1.0',
    info: {
      version: '1.0.0',
      title: 'Jobs API'
    }
  });

  await Bun.write('./openapi.json', JSON.stringify(specs, null, 2));
  console.log('OpenAPI specs generated successfully!');
}

main();
