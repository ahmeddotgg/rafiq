import { Moon02FreeIcons, Sun02FreeIcons } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '../ui/button';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="secondary"
      size="icon"
      aria-label="Switch theme"
      className="[&_svg]:size-5"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <HugeiconsIcon
        icon={Sun02FreeIcons}
        strokeWidth={2}
        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <HugeiconsIcon
        icon={Moon02FreeIcons}
        strokeWidth={2}
        className="dark:-rotate-90 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0"
      />
    </Button>
  );
}
