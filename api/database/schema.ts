import { createId } from '@paralleldrive/cuid2';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const timestamps = {
  createdAt: integer('created_at', { mode: 'timestamp' }).default(new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(new Date()),
  deletedAt: integer('deleted_at', { mode: 'timestamp' })
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
  stage: text({ enum: ['Saved', 'Applied', 'Interview', 'Offer'] }).notNull(),
  type: text({ enum: ['On-site', 'Hybrid', 'Remote'] }),
  salary: integer(),
  companyUrl: text('company_url'),
  applicationUrl: text('application_url'),
  interviewDate: text('interview_date'),
  interviewType: text('interview_type')
});
