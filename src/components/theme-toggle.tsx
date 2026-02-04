import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme, type Theme } from '@/contexts/theme-context';

const themes: { value: Theme; icon: typeof Sun; label: string }[] = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'system', icon: Monitor, label: 'System' },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    const currentIndex = themes.findIndex((t) => t.value === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].value);
  };

  const currentTheme = themes.find((t) => t.value === theme) || themes[2]; // Default to system
  const Icon = currentTheme.icon;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="bg-glass backdrop-blur-glass border-glass hover:bg-glass-strong hover:backdrop-blur-glass-strong transition-all"
      aria-label={`Current theme: ${currentTheme.label}. Click to cycle themes.`}
      title={`Theme: ${currentTheme.label}`}
    >
      <Icon className="h-5 w-5" />
    </Button>
  );
}
