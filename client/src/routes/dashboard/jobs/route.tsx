import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/jobs')({
  component: RouteComponent,
  loader: () => ({ crumb: 'Jobs' }),
  head: () => ({
    meta: [
      {
        title: 'Dashboard - Jobs'
      }
    ]
  })
});

function RouteComponent() {
  return <Outlet />;
}
