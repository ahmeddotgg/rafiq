import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/jobs/$id')({
  component: RouteComponent
});

function RouteComponent() {
  const navigate = useNavigate();
  const params = Route.useParams();

  navigate({
    to: '/dashboard/jobs/{$id}_modal',
    params: { id: params.id },
    mask: {
      to: '/dashboard/jobs/$id',
      unmaskOnReload: false,
      params: {
        id: params.id
      }
    }
  });

  return null;
}
