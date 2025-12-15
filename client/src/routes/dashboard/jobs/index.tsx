import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { allJobsQuery } from '@/modules/jobs/api';
import { CreateJobDialog } from '@/modules/jobs/components/create-job-dialog';
import { JobDialog } from '@/modules/jobs/components/job-dialog';

export const Route = createFileRoute('/dashboard/jobs/')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(allJobsQuery);
  }
});

function RouteComponent() {
  const { data } = useSuspenseQuery(allJobsQuery);

  return (
    <div className="space-y-8 p-4 sm:p-8">
      <header className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-3xl">Jobs</h1>
          <p className="text-muted-foreground text-sm">
            Keep Your Job Search Organized
          </p>
        </div>
        <CreateJobDialog />
      </header>

      <div>
        {data.data.map((job) => (
          <div key={job.id}>
            <JobDialog job={job} />
          </div>
        ))}
      </div>
    </div>
  );
}
