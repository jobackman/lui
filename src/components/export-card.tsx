import { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardAction, CardDescription } from '@/components/ui/card';
import { CopyButton } from '@/components/copy-button';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';
import { formatRelativeTime } from '@/lib/formatRelativeTime';
import { CarouselIndicators } from '@/components/carousel-indicators';
import type { AddonExport } from '@/types/exports';

interface ExportCardProps {
  export: AddonExport;
  addonId: string;
}

export function ExportCard({ export: exportData, addonId }: ExportCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const images = exportData.images || [];
  const hasImages = images.length > 0;
  const hasMultipleImages = images.length > 1;

  // Auto-cycle through images every 5 seconds when not hovered
  useEffect(() => {
    if (!hasMultipleImages || isHovered) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [hasMultipleImages, isHovered, images.length]);

  // Prefers-reduced-motion check
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && hasMultipleImages) {
      // Stop cycling if user prefers reduced motion
      setIsHovered(true);
    }
  }, [hasMultipleImages]);

  return (
    <Card
      ref={cardRef}
      className="relative overflow-hidden group !p-0 min-h-[300px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image Layer */}
      {hasImages ? (
        <div className="absolute inset-0">
          {images.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`${exportData.name} preview ${index + 1}`}
              loading="lazy"
              className={`
                absolute inset-0 w-full h-full object-cover
                transition-opacity duration-700 ease-in-out
                ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}
              `}
            />
          ))}
        </div>
      ) : (
        // Fallback gradient background when no images
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-pink-500/30" />
      )}

      {/* Gradient overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-transparent pointer-events-none" />

      {/* Title and timestamp positioned at top */}
      <CardHeader className="absolute top-0 left-0 right-0 z-10 pt-4">
        <CardTitle className="text-white drop-shadow-lg shadow-black">{exportData.name}</CardTitle>
        <p className="text-white/80 text-sm drop-shadow-md mt-2">
          Updated {formatRelativeTime(exportData.lastUpdated)}
        </p>
      </CardHeader>

      {/* Buttons positioned at center */}
      <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity duration-200 motion-reduce:transition-none">
        {exportData.downloadUrl && (
          <Button variant="default" size="icon" asChild title="Download addon">
            <a
              href={exportData.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download addon"
              onClick={(e) => e.stopPropagation()}
            >
              <Download className="h-4 w-4" />
            </a>
          </Button>
        )}
        {exportData.exportString ? (
          <CopyButton text={exportData.exportString} />
        ) : exportData.externalUrl ? (
          <Button variant="default" size="icon" asChild title="View on external site">
            <a
              href={exportData.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open external guide"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        ) : null}
      </div>

      {/* Image indicator dots */}
      {hasMultipleImages && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
          <CarouselIndicators
            totalImages={images.length}
            currentIndex={currentImageIndex}
            onIndexChange={setCurrentImageIndex}
            size="sm"
            stopPropagation
          />
        </div>
      )}
    </Card>
  );
}
