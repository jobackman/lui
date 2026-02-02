import { ThemeToggle } from './theme-toggle';
import { BackgroundToggle } from './background-toggle';

export function Hero() {
  return (
    <div className="text-center py-12 px-4 border-b-0 relative">
      {/* Theme and Background Toggles - Positioned in top right */}
      <div className="absolute top-4 right-4 flex gap-2">
        <BackgroundToggle />
        <ThemeToggle />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-purple-500 via-pink-500 via-orange-500 via-yellow-500 to-green-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_4s_ease-in-out_infinite]">
        lui
      </h1>
    </div>
  );
}
