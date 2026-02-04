interface CarouselIndicatorsProps {
  totalImages: number;
  currentIndex: number;
  onIndexChange: (index: number) => void;
  size?: 'sm' | 'md';
  stopPropagation?: boolean;
}

export function CarouselIndicators({
  totalImages,
  currentIndex,
  onIndexChange,
  size = 'md',
  stopPropagation = false,
}: CarouselIndicatorsProps) {
  const getDotSizeClasses = (isActive: boolean) => {
    if (size === 'sm') {
      return isActive
        ? 'w-1.5 h-1.5 bg-white shadow-lg shadow-white/50'
        : 'w-1 h-1 bg-white/40 hover:bg-white/60';
    }
    return isActive
      ? 'w-2 h-2 bg-white shadow-lg shadow-white/50'
      : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60';
  };

  const buttonPadding = size === 'sm' 
    ? 'p-1.5 [@media(hover:none)]:p-2 [@media(hover:none)]:min-w-[44px] [@media(hover:none)]:min-h-[44px]'
    : 'px-1.5 py-2 [@media(hover:none)]:min-w-8 [@media(hover:none)]:min-h-8';

  return (
    <div
      className="flex gap-1 min-h-2 px-1 glass-subtle rounded-full"
      onClick={stopPropagation ? (e) => e.stopPropagation() : undefined}
    >
      {Array.from({ length: totalImages }, (_, index) => (
        <button
          key={index}
          onClick={(e) => {
            if (stopPropagation) {
              e.preventDefault();
              e.stopPropagation();
            }
            onIndexChange(index);
          }}
          className={`${buttonPadding} flex items-center justify-center`}
          aria-label={`View image ${index + 1} of ${totalImages}`}
          aria-current={index === currentIndex ? 'true' : 'false'}
          title={`Image ${index + 1} of ${totalImages}`}
        >
          <div
            className={`
              transition-all duration-300 ease-out rounded-full
              motion-reduce:transition-none
              ${getDotSizeClasses(index === currentIndex)}
            `}
          />
        </button>
      ))}
    </div>
  );
}
