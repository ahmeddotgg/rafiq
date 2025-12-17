import * as z from 'zod';

export const formSchema = z.object({
  company: z.string().min(2).max(255),
  position: z.string().min(2).max(255),
  location: z.string().min(2).max(255),
  stage: z.enum(['Saved', 'Applied', 'Interview', 'Offer']),
  type: z.enum(['On-site', 'Hybrid', 'Remote']).nullable().optional(),
  salary: z.number().positive().nullable().optional(),
  companyUrl: z.url().nullable().optional(),
  applicationUrl: z.url().nullable().optional(),
  interviewDate: z.string().nullable().optional(),
  interviewType: z.enum(['Phone', 'Video', 'In-person']).nullable().optional()
});

export type FormData = z.infer<typeof formSchema>;
