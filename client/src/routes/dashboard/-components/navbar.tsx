import { isMatch, Link, useMatches } from '@tanstack/react-router';
import React from 'react';
import { ThemeSwitcher } from '@/components/shared/theme-switcher';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function DashboardNavbar() {
  const matches = useMatches();

  const matchesWithCrumbs = matches
    .filter((match) => isMatch(match, 'loaderData.crumb'))
    .map((match) => ({
      to: match.pathname,
      label: match.loaderData!.crumb
    }));

  return (
    <div className="flex items-center gap-2 py-2">
      <SidebarTrigger />
      <div className="flex-1">
        <Breadcrumb className="hidden sm:flex">
          <BreadcrumbList className="*:last:hidden">
            {matchesWithCrumbs.length >= 2 &&
              matchesWithCrumbs.map((item) => (
                <React.Fragment key={item.to}>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      render={
                        <Link
                          to={item.to}
                          activeOptions={{ exact: true, includeSearch: false }}
                          className="[&.active]:font-medium [&.active]:text-foreground"
                        >
                          {item.label}
                        </Link>
                      }
                    />
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </React.Fragment>
              ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ThemeSwitcher />
    </div>
  );
}
