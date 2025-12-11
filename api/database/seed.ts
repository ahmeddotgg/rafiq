import { faker } from '@faker-js/faker';
import { db } from './';
import * as schema from './schema';

async function main() {
  console.log('🌱 Seeding database...');

  const users: (typeof schema.user.$inferInsert)[] = Array.from({
    length: 5
  }).map(() => ({
    username: faker.internet.username(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password({ length: 12 })
  }));
  await db.insert(schema.user).values(users);
  console.log('👤 Users seeded:', users.length);

  const jobs: (typeof schema.job.$inferInsert)[] = Array.from({
    length: 10
  }).map(() => ({
    createdBy: 'TEST_USER_ID',
    company: faker.company.name(),
    position: faker.person.jobTitle(),
    companyUrl: faker.internet.url(),
    location: `${faker.location.city()}, ${faker.location.county()}`,
    applicationUrl: faker.internet.url(),
    salary: faker.number.int({ min: 10, max: 100000 }),
    stage: 'Applied',
    type: 'Remote'
  }));
  await db.insert(schema.job).values(jobs);
  console.log('💡 Ideas seeded:', jobs.length);
}

main()
  .then(() => {
    console.log('Seeding complete! ✅');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error seeding database:', err);
    process.exit(1);
  });
