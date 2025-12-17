import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { buttonVariants } from '@/components/ui/button';
import { allJobsQuery } from '@/modules/jobs/api';
import { JobForm } from '@/modules/jobs/components/job-form';

export const Route = createFileRoute('/dashboard/jobs')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(allJobsQuery);
    return { crumb: 'Jobs' };
  },
  head: () => ({
    meta: [
      {
        title: 'Dashboard - Jobs'
      }
    ]
  })
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
        <JobForm />
      </header>

      <div>
        {data.data.map((job) => (
          <div key={job.id}>
            <Link
              to="/dashboard/jobs/{$id}_modal"
              params={{ id: job.id }}
              mask={{
                to: '/dashboard/jobs/$id',
                unmaskOnReload: false,
                params: {
                  id: job.id
                }
              }}
              className={buttonVariants({ variant: 'link', className: 'p-0!' })}
            >
              {job.position}
            </Link>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
