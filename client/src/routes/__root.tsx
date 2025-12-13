import { TanStackDevtools } from '@tanstack/react-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import {
  createRootRouteWithContext,
  Link,
  Outlet
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { buttonVariants } from '@/components/ui/button';
import { ThemeProvider, ThemeProviderContext } from '@/store/theme';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
        <Link to="/" className={buttonVariants()}>
          Start Over
        </Link>
      </div>
    );
  }
});

function RootComponent() {
  return (
    <>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
      {import.meta.env.DEV && (
        <TanStackDevtools
          plugins={[
            {
              name: 'TanStack Query',
              render: <ReactQueryDevtoolsPanel />,
              defaultOpen: true
            },
            {
              name: 'TanStack Router',
              render: <TanStackRouterDevtoolsPanel />,
              defaultOpen: false
            }
          ]}
        />
      )}
    </>
  );
}
