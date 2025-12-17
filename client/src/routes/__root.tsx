import { TanStackDevtools } from '@tanstack/react-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import {
  createRootRouteWithContext,
  HeadContent,
  Link,
  Outlet
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { buttonVariants } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/store/theme';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        name: 'description',
        content: 'My App is a web application'
      },
      {
        title: 'Rafiq - Life Discovery'
      }
    ]
  }),
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
      <HeadContent />
      <ThemeProvider>
        <Outlet />
        <Toaster />
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
