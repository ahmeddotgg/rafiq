import { Link } from '@tanstack/react-router';
import { useEffect } from 'react';
import { buttonVariants } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar
} from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export function DashboardSidebar() {
  const { setOpenMobile } = useSidebar();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) setOpenMobile(false);
  }, [isMobile, setOpenMobile]);

  return (
    <Sidebar collapsible="offExamples" variant="inset">
      <SidebarHeader>
        <Link
          activeOptions={{ includeSearch: false, exact: true }}
          to="/"
          className={cn(
            buttonVariants({
              variant: 'ghost',
              className: 'h-auto justify-start p-2!'
            }),
            'font-black font-mono'
          )}
        >
          <img src="/logo.svg" alt="" className="size-10" />
          <h1 className="bg-linear-to-r from-blue-500 to-indigo-500 bg-clip-text pe-1 text-4xl text-transparent">
            RAFIQ
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2"></SidebarContent>
    </Sidebar>
  );
}
