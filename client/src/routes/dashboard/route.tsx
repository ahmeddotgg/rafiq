import { createFileRoute, Outlet } from '@tanstack/react-router';
import Cookies from 'js-cookie';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { DashboardNavbar } from './-components/navbar';
import { DashboardSidebar } from './-components/sidebar';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  loader: () => ({ crumb: 'Dashboard' }),
  head: () => ({
    meta: [
      {
        title: 'Dashboard - Rafiq'
      }
    ]
  })
});

function RouteComponent() {
  const defaultOpen = Cookies.get('sidebar_state') === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardNavbar />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
