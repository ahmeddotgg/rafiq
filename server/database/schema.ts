import { createId } from '@paralleldrive/cuid2';
import { sql } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const timestamps = {
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
  deletedAt: text('deleted_at')
};

export const user = sqliteTable('users', {
  ...timestamps,
  id: text()
    .$defaultFn(() => createId())
    .primaryKey(),
  username: text().notNull().unique(),
  password: text().notNull(),
  email: text().notNull().unique()
});

export const job = sqliteTable('jobs', {
  ...timestamps,
  id: text()
    .$defaultFn(() => createId())
    .primaryKey(),
  createdBy: text('created_by').notNull(),

  company: text().notNull(),
  position: text().notNull(),
  location: text().notNull(),
  stage: text().notNull(),
  salary: int(),
  type: text(),
  companyUrl: text('company_url'),
  applicationUrl: text('application_url'),
  interviewDate: text('interview_date'),
  interviewType: text('interview_type')
});
