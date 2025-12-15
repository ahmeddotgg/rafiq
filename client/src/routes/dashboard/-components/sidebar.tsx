import {
  DashboardSquare03Icon,
  JobSearchIcon
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Link } from '@tanstack/react-router';
import { useEffect } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

export function DashboardSidebar() {
  const { setOpenMobile } = useSidebar();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) setOpenMobile(false);
  }, [isMobile, setOpenMobile]);

  return (
    <Sidebar collapsible="offExamples" variant="inset">
      <SidebarHeader>
        <SidebarMenuButton
          size="default"
          className="h-auto w-fit rounded-full p-1.5!"
          render={
            <Link to="/">
              <img src="/logo.svg" alt="" className="size-10" />
            </Link>
          }
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="rounded-full px-4 font-medium text-[15px] tracking-wide [&.active]:bg-primary/10 [&.active]:text-primary [&.active]:hover:bg-primary/20 [&_svg]:size-[18px]"
                render={
                  <Link
                    to="/dashboard"
                    activeOptions={{ exact: true, includeSearch: false }}
                  >
                    <HugeiconsIcon
                      icon={DashboardSquare03Icon}
                      strokeWidth={2.6}
                    />
                    <span>Dashboard</span>
                  </Link>
                }
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="rounded-full px-4 font-medium text-[15px] tracking-wide [&.active]:bg-primary/10 [&.active]:text-primary [&.active]:hover:bg-primary/20 [&_svg]:size-[18px]"
                render={
                  <Link
                    to="/dashboard/jobs"
                    activeOptions={{ exact: false, includeSearch: false }}
                  >
                    <HugeiconsIcon icon={JobSearchIcon} strokeWidth={2.6} />
                    <span>Jobs</span>
                  </Link>
                }
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
