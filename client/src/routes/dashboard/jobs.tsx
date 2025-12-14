import { createFileRoute } from '@tanstack/react-router';
import { $api } from '@/lib/api';

export const Route = createFileRoute('/dashboard/jobs')({
  component: RouteComponent,
  loader: () => ({ crumb: 'Jobs' })
});

function RouteComponent() {
  const { data, error, isLoading } = $api.useQuery('get', '/api/jobs');

  if (isLoading || !data) return 'Loading...';

  if (error) return `An error occured: ${error}`;

  return (
    <div>
      {data.data.map((job) => (
        <div key={job.id}>
          <h1>{job.position}</h1>
        </div>
      ))}
    </div>
  );
}
