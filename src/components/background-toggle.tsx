import { Button } from '@/components/ui/button';
import { Waves, Grid3x3, Sparkles } from 'lucide-react';
import { useBackground } from '@/contexts/background-context';

export const BackgroundToggle = () => {
  const { backgroundStyle, setBackgroundStyle } = useBackground();

  const backgrounds = [
    { style: 'gradient' as const, icon: Sparkles, label: 'Gradient' },
    { style: 'mesh' as const, icon: Grid3x3, label: 'Mesh' },
    { style: 'waves' as const, icon: Waves, label: 'Waves' },
  ];

  const currentIndex = backgrounds.findIndex((bg) => bg.style === backgroundStyle);
  const nextBackground = backgrounds[(currentIndex + 1) % backgrounds.length];

  const handleClick = () => {
    setBackgroundStyle(nextBackground.style);
  };

  const CurrentIcon = backgrounds[currentIndex].icon;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className="glass hover:glass-strong transition-all"
      aria-label={`Current background: ${backgrounds[currentIndex].label}. Click to change to ${nextBackground.label}.`}
      title={`Background: ${backgrounds[currentIndex].label}`}
    >
      <CurrentIcon className="h-5 w-5" />
    </Button>
  );
};
