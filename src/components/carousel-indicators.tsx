import { cn } from '@/lib/utils';

interface CarouselIndicatorsProps {
  totalImages: number;
  currentIndex: number;
  onIndexChange: (index: number) => void;
  stopPropagation?: boolean;
}

export function CarouselIndicators({
  totalImages,
  currentIndex,
  onIndexChange,
  stopPropagation = false,
}: CarouselIndicatorsProps) {
  return (
    <div
      className="flex gap-1 min-h-2 px-1 glass-subtle rounded-full"
      onClick={stopPropagation ? (e) => e.stopPropagation() : undefined}
    >
      {Array.from({ length: totalImages }, (_, index) => {
        const isActive = index === currentIndex;
        
        return (
          <button
            key={index}
            onClick={(e) => {
              if (stopPropagation) {
                e.preventDefault();
                e.stopPropagation();
              }
              onIndexChange(index);
            }}
            className="px-1.5 py-2 [@media(hover:none)]:min-w-8 [@media(hover:none)]:min-h-8 flex items-center justify-center"
            aria-label={`View image ${index + 1} of ${totalImages}`}
            aria-current={isActive ? 'true' : 'false'}
            title={`Image ${index + 1} of ${totalImages}`}
          >
            <div
              className={cn(
                'transition-all duration-300 ease-out rounded-full motion-reduce:transition-none',
                isActive
                  ? 'w-2 h-2 bg-white shadow-lg shadow-white/50'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
