import { createFileRoute } from '@tanstack/react-router';
import { SidebarTrigger } from '@/components/ui/sidebar';

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <div>
      Hello nested "/dashboard"!
      <SidebarTrigger />
    </div>
  );
}
