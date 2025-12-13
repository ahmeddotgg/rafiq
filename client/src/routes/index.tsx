import { createFileRoute, Link } from '@tanstack/react-router';
import { ThemeSwitcher } from '@/components/shared/theme-switcher';
import { buttonVariants } from '@/components/ui/button';

export const Route = createFileRoute('/')({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <div className="flex items-center">
      <ThemeSwitcher />
      <Link to="/dashboard" className={buttonVariants()}>
        Dasboard
      </Link>
    </div>
  );
}
