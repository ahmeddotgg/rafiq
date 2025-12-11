CREATE TABLE `jobs` (
	`created_at` integer DEFAULT 1765473485,
	`updated_at` integer DEFAULT 1765473485,
	`deleted_at` integer,
	`id` text PRIMARY KEY,
	`created_by` text NOT NULL,
	`company` text NOT NULL,
	`position` text NOT NULL,
	`location` text NOT NULL,
	`stage` text NOT NULL,
	`type` text,
	`salary` integer,
	`company_url` text,
	`application_url` text,
	`interview_date` text,
	`interview_type` text
);
--> statement-breakpoint
CREATE TABLE `users` (
	`created_at` integer DEFAULT 1765473485,
	`updated_at` integer DEFAULT 1765473485,
	`deleted_at` integer,
	`id` text PRIMARY KEY,
	`username` text NOT NULL UNIQUE,
	`password` text NOT NULL,
	`email` text NOT NULL UNIQUE
);
