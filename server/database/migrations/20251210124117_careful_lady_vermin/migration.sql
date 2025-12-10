CREATE TABLE `jobs` (
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text,
	`id` text PRIMARY KEY,
	`created_by` text NOT NULL,
	`company` text NOT NULL,
	`position` text NOT NULL,
	`location` text NOT NULL,
	`stage` text NOT NULL,
	`salary` integer,
	`type` text,
	`company_url` text,
	`application_url` text,
	`interview_date` text,
	`interview_type` text
);
--> statement-breakpoint
CREATE TABLE `users` (
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text,
	`id` text PRIMARY KEY,
	`username` text NOT NULL UNIQUE,
	`password` text NOT NULL,
	`email` text NOT NULL UNIQUE
);
