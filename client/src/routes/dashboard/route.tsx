import { createFileRoute, Outlet } from '@tanstack/react-router';
import Cookies from 'js-cookie';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from './-components/sidebar';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent
});

function RouteComponent() {
  const defaultOpen = Cookies.get('sidebar_state') === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <DashboardSidebar />
      <Outlet />
    </SidebarProvider>
  );
}
