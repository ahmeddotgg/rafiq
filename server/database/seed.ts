import { faker } from '@faker-js/faker';
import { db } from './';
import { job, user } from './schema';

async function main() {
  console.log('🌱 Seeding database...');

  const users = Array.from({ length: 5 }).map(() => ({
    username: faker.internet.username(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password({ length: 12 })
  }));
  await db.insert(user).values(users);
  console.log('👤 Users seeded:', users.length);

  enum JobStage {
    Saved = 'Saved',
    Applied = 'Applied',
    Interview = 'Interview',
    Offer = 'Offer'
  }
  enum JobType {
    Remote = 'Remote',
    OnSite = 'On-site',
    Hybrid = 'Hybrid'
  }
  const jobs = Array.from({ length: 10 }).map(() => ({
    createdBy: 'TEST_USER_ID',
    company: faker.company.name(),
    position: faker.person.jobTitle(),
    companyUrl: faker.internet.url(),
    location: `${faker.location.city()}, ${faker.location.county()}`,
    stage: faker.helpers.enumValue(JobStage).toString(),
    applicationUrl: faker.internet.url(),
    salary: faker.number.int({ min: 10, max: 100000 }),
    type: faker.helpers.enumValue(JobType).toString()
  }));
  await db.insert(job).values(jobs);
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
