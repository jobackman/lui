import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SnapCarouselProps {
  children: ReactNode[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  label: string;
  className?: string;
  onClick?: () => void;
  onInteract?: () => void;
}

/** Native touch/trackpad scrolling with one full-width snap point per slide. */
export function SnapCarousel({ children, currentIndex, onIndexChange, label, className, onClick, onInteract }: SnapCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const observedIndex = useRef<number | null>(null);
  const initialized = useRef(false);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || observedIndex.current === currentIndex) return;
    observedIndex.current = currentIndex;
    viewport.scrollTo({
      left: currentIndex * viewport.clientWidth,
      behavior: !initialized.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
    initialized.current = true;
  }, [currentIndex]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(() => {
      viewport.scrollTo({ left: (observedIndex.current ?? currentIndex) * viewport.clientWidth, behavior: 'instant' });
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={viewportRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      className={cn('flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden', className)}
      onScroll={(event) => {
        const viewport = event.currentTarget;
        if (!viewport.clientWidth) return;
        const index = Math.max(0, Math.min(children.length - 1, Math.round(viewport.scrollLeft / viewport.clientWidth)));
        observedIndex.current = index;
        if (index !== currentIndex) onIndexChange(index);
      }}
      onPointerDown={(event) => {
        pointerStart.current = { x: event.clientX, y: event.clientY };
        dragged.current = false;
        onInteract?.();
      }}
      onPointerMove={(event) => {
        const start = pointerStart.current;
        if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8) dragged.current = true;
      }}
      onPointerCancel={() => { dragged.current = true; pointerStart.current = null; }}
      onPointerUp={() => { pointerStart.current = null; }}
      onWheel={() => onInteract?.()}
      onFocus={() => onInteract?.()}
      onKeyDown={(event) => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        event.stopPropagation();
        onInteract?.();
        onIndexChange(Math.max(0, Math.min(children.length - 1, currentIndex + (event.key === 'ArrowRight' ? 1 : -1))));
      }}
      onClickCapture={(event) => {
        if (dragged.current) {
          event.preventDefault();
          event.stopPropagation();
        }
      }}
      onClick={onClick}
    >
      {children.map((child, index) => (
        <div key={index} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${children.length}`} className="relative w-full h-full shrink-0 snap-start snap-always">
          {child}
        </div>
      ))}
    </div>
  );
}
